game.import("extension", function (lib, game, ui, get, ai, _status) {
  if (!window.qhlyUI) window.qhlyUI = {};
  if(lib.config.qhly_lutou==undefined) {
      game.saveConfig('extension_千幻聆音_qhly_lutou', true);
      game.saveConfig('qhly_lutou', true);
  }
  window.qhlyUI.assets = {
    huanpifu: {
      name: '../../../千幻聆音/assets/huanpifu',
    },
    pinzhi: {
      name: '../../../千幻聆音/assets/SF_pifu_pinzhiUI',
    },
    huanfu: {
      name: '../../../千幻聆音/assets/huanfu',
    },
  }
  //Helasisy：我糙我简直就是甜菜
  game.createCss(`.qh_lutou_refreshview:not(.d-skin) {
      height: 104% !important;
      background-position: center top;
  }`);
  game.qhIsNotPause=function(){
      return typeof _status=='object'&&!_status.isQhPaused;
  };
  //出框调整
  //皮切用自己函数播放出框
  //getSkinFile,setOriginSkin,syncChange
  window.qhly_extension_package = {
    //提示：本扩展源代码基于GPL协议向无名杀社区开放，欢迎大家借鉴和参考代码。
    name: "千幻聆音", content: function (config, pack) {
      //查看是否存在某扩展，用来处理兼容事宜
      if(lib.config.qhly_funcLoadInPrecontent === undefined) {
          lib.config.qhly_funcLoadInPrecontent=true;
          game.saveConfig('extension_千幻聆音_qhly_funcLoadInPrecontent', true);
          game.saveConfig('qhly_funcLoadInPrecontent', true);
      }
      if((lib.config.qhly_funcLoadInPrecontent || game.qhly_hasExtension("如真似幻")) && !window.qhly_inPercontent){
        return;
      }
      const qhlyLib = ['qhly_skinShare', 'qhly_skinEdit', 'qhly_skinChange', 'qhly_changeSkillSkin'];
      for (let l of qhlyLib) if (!lib[l]) lib[l] = {};
      qhly_DynamicPlayer = (function () {
        function DynamicPlayer(pathPrefix) {
          this.id = duilib.BUILT_ID++;
          this.dpr = 1;
          this.width = 120;
          this.height = 180;
          this.dprAdaptive = false;
          this.BUILT_ID = 0;
          var offscreen = self.OffscreenCanvas != undefined;
          if (offscreen) {
            offscreen = false;
            var workers = duilib.DynamicWorkers;
            for (var i = 0; i < workers.length; i++) {
              if (workers[i] == undefined) {
                workers[i] = new Worker(lib.qhly_path + '/data/dw.js');
                workers[i].capacity = 0;
              } else if (workers[i].capacity >= 4) {
                continue;
              }

              this.renderer = workers[i];
              this.canvas = document.createElement('canvas');
              this.canvas.className = 'animation-player';
              duilib.observeSize(this.canvas, duilib.throttle(function (newSize) {
                this.height = Math.round(newSize.height);
                this.width = Math.round(newSize.width);
                this.update();
              }, 100, this));

              var canvas = this.canvas.transferControlToOffscreen();
              if (decadeUI.isMobile()) {
                pathPrefix = '../../..//十周年UI/' + pathPrefix
              } else {
                pathPrefix = '../../../十周年UI/' + pathPrefix
              }
              workers[i].postMessage({
                message: 'CREATE',
                id: this.id,
                canvas: canvas,
                pathPrefix: pathPrefix,
              }, [canvas]);

              workers[i].capacity++;
              this.offscreen = offscreen = true;
              break;
            }
          }
          if (!offscreen) {
            var renderer = new duilib.AnimationPlayer(decadeUIPath + pathPrefix);
            this.canvas = renderer.canvas;
            this.renderer = renderer;
            dui.bodySensor.addListener(duilib.throttle(function () {
              this.renderer.resized = false;
            }, 100, this), true);
          }
        }
        DynamicPlayer.prototype.play = function (sprite) {
          var sprite = (typeof sprite == 'string') ? { name: sprite } : sprite;
          sprite.id = this.BUILT_ID++;
          sprite.loop = true;

          if (this.offscreen) {
            if (!this.initialized) {
              this.initialized = true;
              this.dpr = Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1);
              this.height = this.canvas.clientHeight;
              this.width = this.canvas.clientWidth;
            }

            if (typeof sprite.oncomplete == 'function')
              sprite.oncomplete = sprite.oncomplete.toString();

            this.renderer.postMessage({
              message: 'PLAY',
              id: this.id,
              dpr: this.dpr,
              dprAdaptive: this.dprAdaptive,
              outcropMask: this.outcropMask,
              useMipMaps: this.useMipMaps,
              width: this.width,
              height: this.height,
              sprite: sprite,
            });
          } else {
            var dynamic = this.renderer;
            dynamic.useMipMaps = this.useMipMaps;
            dynamic.dprAdaptive = this.dprAdaptive;
            dynamic.outcropMask = this.outcropMask;
            var run = function () {
              var t = dynamic.playSpine(sprite);
              t.opacity = 0;
              t.fadeTo(1, 600);
            };

            if (dynamic.hasSpine(sprite.name)) {
              run();
            } else {
              dynamic.loadSpine(sprite.name, 'skel', run);
            }
          }

          return sprite;
        };

        DynamicPlayer.prototype.stop = function (sprite) {
          if (this.offscreen) {
            this.renderer.postMessage({
              message: 'STOP',
              id: this.id,
              sprite: sprite,
            });
            return;
          }

          this.renderer.stopSpine(sprite);
        };

        DynamicPlayer.prototype.stopAll = function () {
          if (this.offscreen) {
            this.renderer.postMessage({
              message: 'STOPALL',
              id: this.id
            });
            return;
          }

          this.renderer.stopSpineAll();
        };

        DynamicPlayer.prototype.update = function (force) {
          if (!this.offscreen) {
            this.renderer.resized = false;
            this.renderer.useMipMaps = this.useMipMaps;
            this.renderer.dprAdaptive = this.dprAdaptive;
            this.renderer.outcropMask = this.outcropMask;
            return;
          }

          this.dpr = Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1);
          if (force === false)
            return;

          this.renderer.postMessage({
            message: 'UPDATE',
            id: this.id,
            dpr: this.dpr,
            dprAdaptive: this.dprAdaptive,
            outcropMask: this.outcropMask,
            useMipMaps: this.useMipMaps,
            width: this.width,
            height: this.height,
          });
        }
        return DynamicPlayer;
      })();
      lib.arenaReady.push(function () {
        const oldLogSkill = lib.element.player.logSkill;
        lib.element.player.logSkill = function (name, targets, nature, logv) {
          game.qhly_changeSkillSkin(this, name);
          oldLogSkill.apply(this, arguments);
        }
        if (!window.decadeUI) {
          let viewConfig = lib.config['extension_千幻聆音_qhly_currentViewSkin'];
          if ((viewConfig == 'decade' || viewConfig == 'shousha') && !lib.config['extension_千幻聆音_qhly_decadeCloseDynamic']) {
            //不墨迹了
            /*let cfm = confirm("千幻聆音：检测到十周年UI并未正常开启，无法正常使用千幻聆音中的十周年和手杀主题的动皮功能，点击【确定】将关闭所有动皮功能，点击【取消】将为您切换至默认主题并重启。");
            if (cfm) {*/
              game.saveConfig('extension_千幻聆音_qhly_decadeCloseDynamic', true);
            /*} else {
              lib.config.qhly_currentViewSkin = 'xuanwujianghu';
              game.saveConfig('qhly_currentViewSkin', lib.config.qhly_currentViewSkin);
              game.saveConfig('extension_千幻聆音_qhly_currentViewSkin', lib.config.qhly_currentViewSkin);
              game.reload();
            }*/
          }
        } else {
          decadeUI.animation.loadSpine(window.qhlyUI.assets.huanpifu.name, "skel");
          decadeUI.animation.loadSpine(window.qhlyUI.assets.pinzhi.name, "skel");
          decadeUI.animation.loadSpine(window.qhlyUI.assets.huanfu.name, "skel");
          /*if (!lib.config.qhly_mentionDynamic2) {
            let viewConfig = lib.config['extension_千幻聆音_qhly_currentViewSkin'];
            if ((viewConfig == 'decade' || viewConfig == 'shousha') && lib.config['extension_千幻聆音_qhly_decadeCloseDynamic']) {
              if (confirm("千幻聆音：检测到您开启了千幻聆音设置中的“关闭所有动皮效果”，这将无法正常使用千幻聆音的动皮功能（并有可能造成其它错误），点击【确定】关闭该选项，点击【取消】将不再提醒。")) {
                game.saveConfig('extension_千幻聆音_qhly_decadeCloseDynamic', false);
              } else {
                game.saveConfig('qhly_mentionDynamic2', true);
              }
            }
          }*/
          if (game.qhly_hasExtension('皮肤切换') && lib.config[skinSwitch.configKey.useDynamic]) {
            window.dynamicExt = window.skinSwitch;
            skinSwitch.dynamic.transformDst = function (player, isPrimary, dstInfo, extraParams = { isOrigin: false, huanfuEffect: null }) {
              const avatar = isPrimary ? player.dynamic.primary : player.dynamic.deputy
              let { isOrigin, huanfuEffect } = extraParams
              // 标明这时转换播放骨骼
              dstInfo = game.qhly_formatDS(dstInfo, player.name);
              dstInfo = Object.assign({}, dstInfo)
              dstInfo._transform = true
              if (dstInfo.name == null || dstInfo.name === avatar.name) {
                if (dstInfo.action) {
                  skinSwitch.postMsgApi.changeAvatarAction(player, isPrimary, dstInfo, isOrigin)
                }
                if (dstInfo.skin) {
                  skinSwitch.postMsgApi.changeSkelSkin(player, dstInfo.skin, isPrimary)
                }
              } else {
                dstInfo.player = dstInfo
                let huanfuEff = {
                  name: '../../../皮肤切换/effects/transform/default',
                  scale: 0.7,
                  speed: 0.6,
                  delay: 0.3, // 默认设置的延迟是0.2秒
                }
                const changeEffects = skinSwitch.effects.transformEffects
                if (huanfuEffect) {
                  if (typeof huanfuEffect === 'string') {
                    if (huanfuEffect in changeEffects) {
                      huanfuEffect = changeEffects[huanfuEffect]
                    } else {
                      huanfuEffect = { name: huanfuEffect };
                    }
                  }
                  huanfuEff = Object.assign(huanfuEff, huanfuEffect)
                  huanfuEff.name = '../../../皮肤切换/effects/transform/' + huanfuEffect.name
                }
                skinSwitch.chukuangWorkerApi.playEffect(huanfuEff, { parent: player })
                dstInfo.deputy = !isPrimary
                setTimeout(() => {
                  player.stopDynamic(isPrimary, !isPrimary)
                  player.playDynamic(dstInfo, !isPrimary);
                }, (huanfuEff.delay || 0) * 1000)
                if (dstInfo.background) {
                  player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + dstInfo.background + '")';
                }
                player.classList.add(!isPrimary ? 'd-skin2' : 'd-skin');
                skinSwitch.dynamic.startPlay2Random(player)
                // 皮肤变化了, 修改编辑的全局变量
                if (isPrimary && window.dynamicEditBox && player === game.me) {
                  dynamicEditBox.updateGlobalParams()
                }
              }
            }
          } else if (game.qhly_hasExtension('EpicFX') && lib.config['extension_EpicFX_skinEffects']) {
            //以下为适配EpicFX做的函数修改
            window.dynamicExt = window.EpicFX;
            window.qhly_newDynamicExt = true;
            EpicFX.canAction2 = function (player, action) {
              let skin;
              let bool1 = false;
              if (get.itemtype(player) == 'player') {
                if (!player.isUnseen(0) && player.skinPack.zhuSkinType == "decade") bool1 = true;
              } else bool1 = true;
              if (bool1 && player.dynamic && player.dynamic.primary) {
                skin = player.dynamic.primary;
              }
              if (!skin) return false;
              if (skin.effects) {
                let res = skin.effects[action];
                if (res) return res;
                else return false;
              } else {
                return false;
              }
            };
            EpicFX.playDynamic = (player, character, character2, play, transform, cutdybg) => {
              if (!cutdybg) cutdybg = ui.arena.dataset.dynamicSkinOutcrop == 'on' && ui.arena.dataset.newDecadeStyle == 'on';
              let res2 = {
                status: false,
                zhu: "default",
                fu: "default"
              }
              if (get.mode() == "guozhan" && !play) return res2;
              let CUR_DYNAMIC = decadeUI.CUR_DYNAMIC;
              let MAX_DYNAMIC = decadeUI.MAX_DYNAMIC;
              if (player.dynamic && !play)
                player.stopDynamic();
              var showDynamic = (player.dynamic || CUR_DYNAMIC < MAX_DYNAMIC) && duicfg.dynamicSkin;
              if (showDynamic && _status.mode != null) {
                var skins;
                var dskins = decadeUI.dynamicSkin;
                var avatars = player.doubleAvatar ? [character, character2] : [character];
                var increased;
                for (var i = 0; i < avatars.length; i++) {
                  if (!play && EpicFX.hasHiddenSkill(avatars[i], player)) continue;
                  // if (get.mode() == 'guozhan' && lib.config['extension_千幻聆音_qhly_guozhanDS']) {
                  //     if (avatars[i] && avatars[i].indexOf('gz_') == 0) {
                  //         let extend = { [avatars[i]]: decadeUI.dynamicSkin[avatars[i].slice(3)] };
                  //         decadeUI.get.extend(decadeUI.dynamicSkin, extend);
                  //     }
                  // }
                  // if (lib.qhly_skinShare[avatars[i]] && lib.qhly_skinShare[avatars[i]].name) {
                  //     let extend = { [avatars[i]]: decadeUI.dynamicSkin[lib.qhly_skinShare[avatars[i]].name] };
                  //     decadeUI.get.extend(decadeUI.dynamicSkin, extend);
                  // }
                  skins = dskins[avatars[i]];
                  if (skins == undefined)
                    continue;
                  var keys = Object.keys(skins);
                  if (keys.length == 0) {
                    console.error('player.init: ' + avatars[i] + ' 没有设置动皮参数');
                    continue;
                  }
                  var skin;
                  var namex = i == 0 ? character : character2;
                  if (transform) skin = transform;
                  else if (lib && lib.config && lib.config.qhly_skinset && lib.config.qhly_skinset.djtoggle && lib.config.extensions && lib.config.extensions.contains('千幻聆音') && lib.config['extension_千幻聆音_enable']) {
                    skin = null;
                    var value = game.qhly_getSkin(namex);
                    if (value) value = value.substring(0, value.lastIndexOf('.'));
                    else value = '经典形象';
                    //value=game.qhly_rename(value);
                    if (lib.config.qhly_skinset.djtoggle &&
                      lib.config.qhly_skinset.djtoggle[namex] &&
                      lib.config.qhly_skinset.djtoggle[namex][value]) continue;
                    for (var j of Object.keys(skins)) {
                      if (j == value) skin = skins[value];
                    }
                  } else skin = skins[Object.keys(skins)[0]];
                  if (skin == null) continue;
                  skin = game.qhly_formatDS(skin, namex);
                  var editArgument1 = 'dynamic', editArgument2 = 'beijing';
                  skin.zhu = character == avatars[i];
                  var skinCopy = game.qhly_deepClone(skin);
                  let hide = [];
                  if (lib.character[avatars[i]] && lib.character[avatars[i]][4]) hide = lib.character[avatars[i]][4];
                  let isHide;
                  if (hide.length > 0 && hide[0] == "hiddenSkill" || get.mode() == 'guozhan') {
                    isHide = true;
                  }
                  if (skinCopy.speed == undefined) skinCopy.speed = 1;
                  var forces = 'qun';
                  if (lib.character[character]) forces = lib.character[character][1];
                  var editArgument1 = 'dynamic', editArgument2 = 'beijing';
                  if (game.qhly_getPlayerStatus(player, i == 1) == 2) {
                    editArgument1 = 'dynamic2';
                    editArgument2 = 'beijing2';
                  }
                  if (transform) {
                    dcdAnim.playSpine({
                      name: "SF_pifu_eff_juexing",
                      scale: 1,
                      referNode: player,
                    })
                  }
                  if (skinCopy.transform) {
                    res2["transform" + (i == 0 ? "Zhu" : "Fu")] = skinCopy.transform;
                    if (player._inits === undefined) {
                      player._inits = [];
                    }
                    if (skinCopy.transform.skillName) {
                      if (!lib.skill[skinCopy.transform.skillName]) EpicFX.setTransformSkill(skinCopy.transform.skill);
                      if (player.hp !== undefined) {
                        player.addSkill(skinCopy.transform.skillName);
                        if (EpicFX.filterSkills.indexOf(skinCopy.transform.skillName) == -1) {
                          EpicFX.filterSkills.push(skinCopy.transform.skillName);
                        }
                      }
                      else {
                        player._inits.push(function (p) {
                          p.addSkill(skinCopy.transform.skillName);
                          if (EpicFX.filterSkills.indexOf(skinCopy.transform.skillName) == -1) {
                            EpicFX.filterSkills.push(skinCopy.transform.skillName);
                          }
                        })
                      }
                    } else {
                      if (player.hp !== undefined) {
                        player.addSkill("changeSkin");
                      }
                      else {
                        player._inits.push(function (p) {
                          p.addSkill("changeSkin");
                        })
                      }
                    }
                  }
                  var editSkin = game.qhly_getSkin(game.qhly_getRealName(avatars[i]));
                  var theme = ui.arena.dataset.newDecadeStyle == 'on' ? 'decade' : 'shousha';
                  if (lib.config['extension_千幻聆音_qhly_editDynamic'] && lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])] && lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])][editSkin] && lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])][editSkin]['player'] && lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])][editSkin]['player'][editArgument1] && lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])][editSkin]['player'][editArgument1][theme]) {
                    var resetDynamic = lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])][editSkin].player[editArgument1][theme];
                    skinCopy.x = resetDynamic.x;
                    skinCopy.y = resetDynamic.y;
                    skinCopy.scale = resetDynamic.scale;
                    skinCopy.angle = resetDynamic.angle;
                    if (skinCopy.dynamicBackground && lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])][editSkin].player[editArgument2] && lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])][editSkin].player[editArgument2][theme]) {
                      var resetBeijing = lib.qhly_skinEdit[game.qhly_getRealName(avatars[i])][editSkin].player[editArgument2][theme];
                      if (typeof skinCopy.dynamicBackground === 'string') {
                        skinCopy.dybg = {
                          name: skinCopy.dynamicBackground,
                          zhu: skinCopy.zhu,
                          dybg: true,
                          loop: true,
                          x: resetBeijing.x,
                          y: resetBeijing.y,
                          scale: resetBeijing.scale,
                          angle: resetBeijing.angle,
                        };
                      } else {
                        skinCopy.dybg = skinCopy.dynamicBackground;
                        skinCopy.dybg.dybg = true;
                        skinCopy.dybg.loop = true;
                        skinCopy.dybg.zhu = skinCopy.zhu;
                        skinCopy.dybg.x = resetBeijing.x;
                        skinCopy.dybg.y = resetBeijing.y;
                        skinCopy.dybg.scale = resetBeijing.scale;
                        skinCopy.dybg.angle = resetBeijing.angle;
                      }
                    }
                  }
                  else {
                    if (skinCopy.dynamicBackground) {
                      if (typeof skinCopy.dynamicBackground === 'string') {
                        skinCopy.dybg = {
                          name: skinCopy.dynamicBackground,
                          scale: skinCopy.scale,
                          zhu: skinCopy.zhu,
                          dybg: true,
                          loop: true
                        };
                      } else {
                        skinCopy.dybg = skinCopy.dynamicBackground;
                        skinCopy.dybg.dybg = true;
                        skinCopy.dybg.loop = true;
                        skinCopy.dybg.zhu = skinCopy.zhu;
                        skinCopy.dybg.scale = skinCopy.scale;
                      }
                    }
                  }
                  player.playDynamic(skinCopy, i == 1, cutdybg, lib.config['extension_千幻聆音_ignoreClips']);
                  if (i == 0 && skinCopy.decade) res2.zhu = "decade";
                  else if (skinCopy.decade) res2.fu = "decade";
                  res2.status = true;
                  if (!isHide) {
                    game.qhly_checkYH(player, forces);
                  }
                  // player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinCopy.background + '")';
                  if (!skinCopy.dynamicBackground) player.$dynamicWrap.style.backgroundImage = `url(${lib.assetURL}extension/十周年UI/assets/dynamic/${skinCopy.background}`;
                  if (!increased) {
                    increased = true;
                    decadeUI.CUR_DYNAMIC++;
                  }
                }
                return res2;
              }
              return res2;
            };
            EpicFX.playDynamicEffect = (player, action, s, flip) => {
              if (!player && !action) return;
              function play(data) {
                EpicFX.player.renderer.postMessage({
                  message: "PLAY",
                  id: player.dynamic.id,
                  sprite: data,
                  skin: EpicFX.player.getSkinState(player.dynamic.id, data.name)
                });
                // game.playAudio("..", "extension", "D/audio/effect", data.name + ".mp3");
                if (get.itemtype(player) == 'player') {
                  if (EpicFX.attackings.length) {
                    for (let i = 0; i < EpicFX.attackings.length; i++) {
                      let temp = EpicFX.attackings[i];
                      if (temp.player == data.player) return game.playAudio(`../extension/EpicFX/asset/audio/effect/${temp.name}.mp3`);
                    }
                  }
                  game.playAudio(`../extension/EpicFX/asset/audio/effect/${data.name}.mp3`);
                  EpicFX.attackings.push({
                    player: data.player,
                    zhu: data.zhu,
                    name: data.name
                  })
                } else game.playAudio(`../extension/EpicFX/asset/audio/effect/${data.name}.mp3`);
                if (player.dynamic.renderer.postMessage) player.dynamic.renderer.postMessage({
                  message: "HIDE",
                  id: player.dynamic.id,
                  name: data.name,
                  zhu: data.zhu
                })
              }

              let { ...sprite } = s;
              if (!sprite) return;

              sprite.player = player.playerid;
              // sprite.player = game.players.indexOf(player);
              if (action == "GongJi") {
                if (sprite) {
                  function getGongJiPos() {
                    let width = EpicFX.player.canvas.clientWidth / 2;
                    let pos = getBackPos();
                    let isLeft = pos.x >= width ? false : true;
                    if (isLeft) {
                      return { x: [0, 0.4], y: [0, 0.5], isLeft: isLeft, backPos: pos };
                    } else return { x: [0, 0.63], y: [0, 0.5], isLeft: isLeft, backPos: pos };
                  }

                  function getBackPos(me) {
                    var rect = player.getBoundingClientRect();
                    if (me) {
                      return {
                        x: rect.left,
                        y: decadeUI.get.bodySize().height - rect.top,
                        width: rect.width,
                        height: rect.height
                      }
                    } else {
                      return {
                        x: rect.left + (rect.width / 2),
                        y: decadeUI.get.bodySize().height - rect.bottom + (rect.height / 2),
                        width: rect.width,
                        height: rect.height
                      }
                    }
                  }

                  let me = player == game.me;
                  if (me) {
                    if (sprite.effects && sprite.effects.gongji) {
                      sprite.x = sprite.effects.gongji.x;
                      sprite.y = sprite.effects.gongji.y;
                      sprite.scale = sprite.effects.gongji.scale || sprite.scale;
                    } else if (sprite.pos) {
                      sprite.x = sprite.pos.x;
                      sprite.y = sprite.pos.y;
                    } else {
                      sprite.x = undefined;
                      sprite.y = undefined;
                    }
                    sprite.backPos = getBackPos(me);
                  } else {
                    let pos = getGongJiPos();
                    sprite.x = pos.x;
                    sprite.y = pos.y;
                    if (sprite.mirror && pos.isLeft) {
                      if (get.itemtype(player) == 'player') sprite.flipX = pos.isLeft;
                      else sprite.flipX = flip;
                    }
                    sprite.backPos = pos.backPos;
                  }
                  sprite.isMe = me;
                  sprite.clip = undefined;
                  sprite.angle = undefined;
                  sprite.action = "GongJi";
                  sprite.loop = false;
                  play(sprite);
                }
              }
            }
            EpicFX.playDynamicEffect2 = function (player, action, res, flip) {
              if (res) {
                // console.log(res)
                // 武将待机时的name
                let has = false;
                let realName = res.name;
                if (typeof res.effects[action] === 'string') {
                  var { ...sprite } = res;
                  sprite.name = res.effects[action];
                } else if (res.effects[action].constructor === Object) {
                  // 如果是一个对象，则视为配置了参数
                  var { ...sprite } = res.effects[action];
                  has = true;
                }
                if (!sprite) return;
                if (!sprite.decade) sprite.decade = true;
                sprite.player = player.playerid;
                function getGongJiPos() {
                  let width = EpicFX.player.canvas.clientWidth / 2;
                  let rect = player.getBoundingClientRect();
                  let isLeft = (rect.left + (rect.width / 2)) >= width ? false : true;
                  if (isLeft) {
                    return { x: [0, 0.4], y: [0, 0.5], isLeft: isLeft };
                  } else return { x: [0, 0.63], y: [0, 0.5], isLeft: isLeft };
                }

                function getPlayerPos(me) {
                  var rect = player.getBoundingClientRect();
                  if (me) {
                    return {
                      x: rect.left,
                      y: decadeUI.get.bodySize().height - rect.top,
                      width: rect.width,
                      height: rect.height
                    }
                  } else {
                    return {
                      x: rect.left + (rect.width / 2),
                      y: decadeUI.get.bodySize().height - rect.bottom + (rect.height / 2),
                      width: rect.width,
                      height: rect.height
                    };
                  }
                }
                let me = player == game.me;
                if (action == "gongji" || action == "jineng") {
                  if (me) {
                    if (!has) {
                      sprite.x = undefined;
                      sprite.y = undefined;
                    }
                  } else {
                    let pos = getGongJiPos();
                    if (get.itemtype(player) != 'player') sprite.scale = sprite.scale * player.offsetHeight * 0.0035;
                    sprite.x = pos.x;
                    sprite.y = pos.y;
                    if (sprite.mirror && pos.isLeft) {
                      if (get.itemtype(player) == 'player') sprite.flipX = pos.isLeft;
                      else sprite.flipX = flip;
                    }
                  }
                  if (sprite.name.indexOf("/") == -1) {
                    sprite.name += "_chuchang2";
                  }
                  sprite.action = action;
                } else {
                  let pos = getPlayerPos(me);
                  sprite.x = pos.x + (pos.width / 2);
                  sprite.y = pos.y;
                  if (sprite.name.indexOf("/") == -1) {
                    sprite.name += "_chuchang";
                  }
                  sprite.action = "play";
                  sprite.hhks = true;
                }

                sprite.realName = realName;
                sprite.isMe = me;
                sprite.clip = undefined;
                sprite.angle = undefined;
                sprite.loop = false;
                sprite.zhu = res.zhu;

                EpicFX.player.renderer.postMessage({
                  message: "PLAY2",
                  id: player.dynamic.id,
                  sprite: sprite,
                  skin: EpicFX.player.getSkinState(player.dynamic.id, player.dynamic.primary.name)
                });
                if (player.dynamic.renderer.postMessage) player.dynamic.renderer.postMessage({
                  message: "HIDE",
                  id: player.dynamic.id,
                  name: realName,
                  zhu: sprite.zhu
                })

                if (get.itemtype(player) == 'player') {
                  if (EpicFX.attackings.length) {
                    for (let i = 0; i < EpicFX.attackings.length; i++) {
                      let temp = EpicFX.attackings[i];
                      if (temp.player == sprite.player && temp.action == action) return;
                    }
                  }
                }

                EpicFX.attackings.push({
                  player: sprite.player,
                  zhu: sprite.zhu,
                  name: sprite.name,
                  action: action
                })
              }
            }
            EpicFX.initAnimationMessage = (animationPlayer) => {
              if (!animationPlayer) return;
              let { renderer } = animationPlayer;
              renderer.onmessage = (e) => {
                let data = e.data;
                if (data) {
                  if (data.message == "ACTIONDONE") {
                    let player = game.filterPlayer(function (current) {
                      return current.playerid == data.player;
                    })[0];
                    if (!player) {
                      player = document.getElementsByClassName('qh-isBigAvatar');
                      if (player.length) player = player[0];
                    }
                    if (player && player.dynamic) {
                      let { renderer: r } = player.dynamic;
                      if (EpicFX.attackings.length) {
                        for (let i = 0; i < EpicFX.attackings.length; i++) {
                          let temp = EpicFX.attackings[i];
                          if (temp.player == data.player && temp.zhu == data.zhu) {
                            EpicFX.attackings.splice(i, 1);
                          }
                        }
                      };
                      if (r.postMessage) r.postMessage({
                        message: "RECOVER",
                        id: player.dynamic.id,
                        zhu: data.zhu,
                        name: data.name
                      });
                    }
                    return;
                  } else if (data.message == 'LINEDATA') {
                    EpicFX.lineBuffer.push(data.obj);
                    console.log(`%c${data.obj.name}\n%c loaded successfully!`, 'color: green; background: yellow; font-size: 30px', 'color: blue; font-size: 15px;',);
                  } else {
                    console.log(data)
                  }
                }
              }
            }
            EpicFX.initAnimationMessage(EpicFX.player);
            EpicFX.playAction = (player, action) => {
              let res = EpicFX.canAction(false, player.dynamic.primary, player.dynamic.deputy, action);
              if (!res.ok) return;
              let id = player.playerid;
              // let index = game.players.indexOf(player);
              if (EpicFX.attackings.length) {
                for (let i = 0; i < EpicFX.attackings.length; i++) {
                  let temp = EpicFX.attackings[i];
                  if (temp.player == id && (temp.zhu == res.zhu || temp.zhu == !res.fu)) {
                    return;
                  }
                }
              }
              if (player.dynamic.renderer.postMessage) player.dynamic.renderer.postMessage({
                message: "ACTION",
                id: player.dynamic.id,
                zhu: res.zhu,
                fu: res.fu,
                action: action
              })
            };
            EpicFX.playAction2 = function (player, action) {
              let res = EpicFX.canAction3(player, action);
              if (!res.ok && !(res.action1 || res.action2)) return;
              for (let i = 1; i < 3; i++) {
                if (res["action" + i]) {
                  play(res["action" + i]);
                }
              }

              function play(data) {
                if (player.dynamic.renderer.postMessage) player.dynamic.renderer.postMessage({
                  message: "ACTION",
                  id: player.dynamic.id,
                  zhu: data.zhu,
                  fu: data.fu,
                  action: action
                })
              }
            }
            //EpicFX的函数修改到此为止
          } else {
            if (game.qhly_hasExtension('EngEX')) window.dynamicExt = window.eng;
            else window.dynamicExt = null;
            duilib.DynamicPlayer = qhly_DynamicPlayer;
          }
        }
        if (window.decadeUI && !lib.config['extension_千幻聆音_qhly_decadeCloseDynamic'] && (lib.config.qhly_currentViewSkin == 'decade' || lib.config.qhly_currentViewSkin == 'shousha')) {
          if (Object.defineProperties) {
            Object.defineProperties(lib.element.player, {
              init: {
                get: function () {
                  return this.qhly_init || qhly_init;
                },
                set: function (d) {
                  var newInit = d.toString();
                  if (newInit.indexOf('playDynamic') == -1) this.qhly_init = d;
                  else if (!lib.config.qhly_mentionDynamic) {
                    /*if (confirm("千幻聆音：检测到有扩展修改武将登场动皮播放，这将与千幻聆音“十周年”或“手杀”样式冲突，点击【确定】为您切换为其他样式。若点击【取消】，将不再对此消息进行提示。")) {
                      lib.config.qhly_currentViewSkin = 'xuanwujianghu';
                      game.saveConfig('qhly_currentViewSkin', lib.config.qhly_currentViewSkin);
                      game.saveConfig('extension_千幻聆音_qhly_currentViewSkin', lib.config.qhly_currentViewSkin);
                      game.reload();
                    } else {*/
                      game.saveConfig('qhly_mentionDynamic', true);
                    //}
                  }
                },
                enumerable: true,
                configurable: true,
              },
              uninit: {
                get: function () {
                  return qhly_uninit;
                },
                set: function () {
                },
                enumerable: true,
                configurable: true,
              },
              reinit: {
                get: function () {
                  return qhly_reinit;
                },
                set: function () {
                },
                enumerable: true,
                configurable: true,
              },
              stopDynamic: {
                get: function () {
                  return qhly_stopdynamic;
                },
                set: function () {
                },
                enumerable: true,
                configurable: true,
              },
              playDynamic: {
                get: function () {
                  return qhly_playdynamic;
                },
                set: function () {
                },
                enumerable: true,
                configurable: true,
              },
              showCharacter: {
                get: function () {
                  return qhly_showcharacter;
                },
                set: function () {
                },
                enumerable: true,
                configurable: true,
              },
            });
          } else {
            lib.element.player.init = qhly_init;
            lib.element.player.uninit = qhly_uninit;
            lib.element.player.reinit = qhly_reinit;
            lib.element.player.playDynamic = qhly_playdynamic;
            lib.element.player.stopDynamic = qhly_stopdynamic;
            lib.element.player.showCharacter = qhly_showcharacter;
          }
          for (var i = 0; i < game.players.length; i++) {
            if (Object.defineProperties) {
              Object.defineProperties(game.players[i], {
                init: {
                  get: function () {
                    return this.qhly_init || qhly_init;
                  },
                  set: function (d) {
                    var newInit = d.toString();
                    if (newInit.indexOf('playDynamic') == -1) this.qhly_init = d;
                    else if (!lib.config.qhly_mentionDynamic) {
                      /*if (confirm("千幻聆音：检测到有扩展修改武将登场动皮播放，这将与千幻聆音“十周年”或“手杀”样式冲突，点击【确定】为您切换为其他样式。若点击【取消】，将不再对此消息进行提示。")) {
                        lib.config.qhly_currentViewSkin = 'xuanwujianghu';
                        game.saveConfig('qhly_currentViewSkin', lib.config.qhly_currentViewSkin);
                        game.saveConfig('extension_千幻聆音_qhly_currentViewSkin', lib.config.qhly_currentViewSkin);
                        game.reload();
                      } else {*/
                        game.saveConfig('qhly_mentionDynamic', true);
                      //}
                    }
                  },
                  enumerable: true,
                  configurable: true,
                },
                uninit: {
                  get: function () {
                    return qhly_uninit;
                  },
                  set: function () {
                  },
                  enumerable: true,
                  configurable: true,
                },
                reinit: {
                  get: function () {
                    return qhly_reinit;
                  },
                  set: function () {
                  },
                  enumerable: true,
                  configurable: true,
                },
                stopDynamic: {
                  get: function () {
                    return qhly_stopdynamic;
                  },
                  set: function () {
                  },
                  enumerable: true,
                  configurable: true,
                },
                playDynamic: {
                  get: function () {
                    return qhly_playdynamic;
                  },
                  set: function () {
                  },
                  enumerable: true,
                  configurable: true,
                },
                showCharacter: {
                  get: function () {
                    return qhly_showcharacter;
                  },
                  set: function () {
                  },
                  enumerable: true,
                  configurable: true,
                },
              });
            } else {
              game.players[i].init = qhly_init;
              game.players[i].uninit = qhly_uninit;
              game.players[i].reinit = qhly_reinit;
              game.players[i].playDynamic = qhly_playdynamic;
              game.players[i].stopDynamic = qhly_stopdynamic;
              game.players[i].showCharacter = qhly_showcharacter;
            }
          }
        }
      });
      var qhly_oldinit = function (character, character2, skill) {
        if (typeof character == 'string' && !lib.character[character]) {
          lib.character[character] = get.character(character);
        }
        if (typeof character2 == 'string' && !lib.character[character2]) {
          lib.character[character2] = get.character(character2);
        }
        if (!lib.character[character]) return;
        if (get.is.jun(character2)) {
          var tmp = character;
          character = character2;
          character2 = tmp;
        }
        if (character2 == false) {
          skill = false;
          character2 = null;
        }
        var info = lib.character[character];
        if (!info) {
          info = ['', '', 1, [], []];
        }
        if (!info[4]) {
          info[4] = [];
        }
        var skills = info[3].slice(0);
        this.clearSkills(true);
        this.classList.add('fullskin');
        if (!game.minskin && get.is.newLayout() && !info[4].contains('minskin')) {
          this.classList.remove('minskin');
          this.node.avatar.setBackground(character, 'character');
        }
        else {
          this.node.avatar.setBackground(character, 'character');
          if (info[4].contains('minskin')) {
            this.classList.add('minskin');
          }
          else if (game.minskin) {
            this.classList.add('minskin');
          }
          else {
            this.classList.remove('minskin');
          }
        }

        var hp1 = get.infoHp(info[2]);
        var maxHp1 = get.infoMaxHp(info[2]);
        var hujia1 = get.infoHujia(info[2]);

        this.node.avatar.show();
        this.node.count.show();
        this.node.equips.show();
        this.name = character;
        this.name1 = character;
        this.sex = info[0];
        this.group = info[1];
        this.hp = hp1;
        this.maxHp = maxHp1;
        this.hujia = hujia1;
        this.node.intro.innerHTML = lib.config.intro;
        this.node.name.dataset.nature = get.groupnature(this.group);
        lib.setIntro(this);
        this.node.name.innerHTML = get.prefixBoldName(character,'character');
        if (this.classList.contains('minskin') && this.node.name.querySelectorAll('br').length >= 4) {
          this.node.name.classList.add('long');
        }
        var infoArray = [false, false];
        if (info[4].contains('hiddenSkill') && !this.noclick) {
          infoArray[0] = true;
          if (!this.hiddenSkills) this.hiddenSkills = [];
          this.hiddenSkills_1 = [];
          this.hiddenSkills.addArray(skills);
          this.hiddenSkills_1.addArray(skills);
          skills = [];
          this.classList.add(_status.video ? 'unseen_v' : 'unseen');
          this.name = 'unknown';
          if (!this.node.name_seat && !_status.video) {
            this.node.name_seat = ui.create.div('.name.name_seat', get.qhly_verticalStr(get.translation(this.name)), this);
            this.node.name_seat.dataset.nature = get.groupnature(this.group);
          }
          this.sex = 'male';
          //this.group='unknown';
          this.storage.nohp = true;
          skills.add('g_hidden_ai');
        }else {
          if(this.hiddenSkills_1?.length) {
            this.hiddenSkills.removeArray(this.hiddenSkills_1);
          }
          this.hiddenSkills_1 = [];
          this.classList.remove('unseen');
          this.classList.remove('unseen_v');
        }
        if (character2 && lib.character[character2]) {
          var info2 = lib.character[character2];
          if (!info2) {
            info2 = ['', '', 1, [], []];
          }
          if (!info2[4]) {
            info2[4] = [];
          }
          this.classList.add('fullskin2');
          this.node.avatar2.setBackground(character2, 'character');

          this.node.avatar2.show();
          this.name2 = character2;
          var hp2 = get.infoHp(info2[2]);
          var maxHp2 = get.infoMaxHp(info2[2]);
          var hujia2 = get.infoHujia(info2[2]);
          this.hujia += hujia2;
          var double_hp;
          if (_status.connectMode || get.mode() == 'single') {
            double_hp = 'pingjun';
          }
          else {
            double_hp = get.config('double_hp');
          }
          switch (double_hp) {
            case 'pingjun': {
              this.maxHp = Math.floor((maxHp1 + maxHp2) / 2);
              this.hp = Math.floor((hp1 + hp2) / 2);
              this.singleHp = ((maxHp1 + maxHp2) % 2 === 1);
              break;
            }
            case 'zuidazhi': {
              this.maxHp = Math.max(maxHp1, maxHp2);
              this.hp = Math.max(hp1, hp2);
              break;
            }
            case 'zuixiaozhi': {
              this.maxHp = Math.min(maxHp1, maxHp2);
              this.hp = Math.min(hp1, hp2);
              break;
            }
            case 'zonghe': {
              this.maxHp = maxHp1 + maxHp2;
              this.hp = hp1 + hp2;
              break;
            }
            default: {
              this.maxHp = maxHp1 + maxHp2 - 3;
              this.hp = hp1 + hp2 - 3;
            };
          }
          this.node.count.classList.add('p2');
          if (info2[4].contains('hiddenSkill') && !this.noclick) {
            infoArray[1] = true;
            if (!this.hiddenSkills) this.hiddenSkills = [];
            this.hiddenSkills_2 = [];
            this.hiddenSkills.addArray(info2[3]);
            this.hiddenSkills_2.addArray(info2[3]);
            this.classList.add(_status.video ? 'unseen2_v' : 'unseen2');
            this.storage.nohp = true;
            skills.add('g_hidden_ai');
          }else {
            skills = skills.concat(info2[3]);
            if(this.hiddenSkills_2?.length) {
              this.hiddenSkills.removeArray(this.hiddenSkills_2);
            }
            this.hiddenSkills_2 = [];
            this.classList.remove('unseen2');
            this.classList.remove('unseen2_v');
          }

          this.node.name2.innerHTML = get.prefixBoldName(character2,'character');
        }
        //Helasisy修：隐匿技可逆化
        if(!infoArray[0]&&!infoArray[1]){
          this.storage.nohp = false;
          skills.remove('g_hidden_ai');
        }
        if (this.storage.nohp) {
          this.storage.rawHp = this.hp;
          this.storage.rawMaxHp = this.maxHp;
          this.hp = 1;
          this.maxHp = 1;
          this.node.hp.hide();
        }
        if (skill != false) {
          for (var i = 0; i < skills.length; i++) {
            this.addSkill(skills[i]);
          }
          this.checkConflict();
        }
        lib.group.add(this.group);
        if (this.inits) {
          for (var i = 0; i < lib.element.player.inits.length; i++) {
            lib.element.player.inits[i](this);
          }
        }
        if (this._inits) {
          for (var i = 0; i < this._inits.length; i++) {
            this._inits[i](this);
          }
        }
        this.update();
        return this;
      };
      function qhly_init(character, character2, skill) {
        //if(window.doubleKuang) window.doubleKuang(this);
        var isYh = this.getElementsByClassName("skinYh");
        if (isYh.length > 0) {
          isYh[0].remove();
        }
        var bj = this.getElementsByClassName("gain-skill flex");
        if (bj.length > 0) {
          bj[0].innerHTML = null;
        }
        this.doubleAvatar = (character2 && lib.character[character2]) != undefined;

        var CUR_DYNAMIC = decadeUI.CUR_DYNAMIC;
        var MAX_DYNAMIC = decadeUI.MAX_DYNAMIC;
        if (CUR_DYNAMIC == undefined) {
          CUR_DYNAMIC = 0;
          decadeUI.CUR_DYNAMIC = CUR_DYNAMIC;
        }
        if (MAX_DYNAMIC == undefined) {
          MAX_DYNAMIC = decadeUI.isMobile() ? 2 : 10;
          if (window.OffscreenCanvas)
            MAX_DYNAMIC += 8;
          decadeUI.MAX_DYNAMIC = MAX_DYNAMIC;
        }
        var avatars = this.doubleAvatar ? [character, character2] : [character];
        for (var i = 0; i < avatars.length; i++) {
          if (get.mode() == 'guozhan' && lib.config['extension_千幻聆音_qhly_guozhanDS']) {
            if (avatars[i] && avatars[i].indexOf('gz_') == 0) {
              let extend = { [avatars[i]]: decadeUI.dynamicSkin[avatars[i].slice(3)] };
              decadeUI.get.extend(decadeUI.dynamicSkin, extend);
            }
          }
          if (lib.qhly_skinShare[avatars[i]] && lib.qhly_skinShare[avatars[i]].name) {
            let extend = { [avatars[i]]: decadeUI.dynamicSkin[lib.qhly_skinShare[avatars[i]].name] };
            decadeUI.get.extend(decadeUI.dynamicSkin, extend);
          }
        }
        if (window.qhly_newDynamicExt && lib.config['extension_EpicFX_skinEffects']) {
          let res = EpicFX.playDynamic(this, character, character2, undefined, undefined, ui.arena.dataset.dynamicSkinOutcrop == 'on' && ui.arena.dataset.newDecadeStyle == 'on');
          EpicFX.initSkinPackOrRefreshAll(this, {
            doubleAvatar: this.doubleAvatar,
            name: character,
            name1: character,
            name2: character2,
            clear: "init",
            state: res
          });
          if (!this.initialChar) {
            this.initialChar = [
              character
            ];
            if (this.doubleAvatar) this.initialChar.push(character2);
          }
          var forces = 'qun';
          if (lib.character[character]) forces = lib.character[character][1];
          game.qhly_checkYH(this, forces);
        } else {
          if (this.dynamic) {
            if (this.dynamic.primary) this.stopDynamic(true, false)
            if (this.dynamic.deputy) this.stopDynamic(false, true)
            // this.stopDynamic();
          }
          var showDynamic = (this.dynamic || CUR_DYNAMIC < MAX_DYNAMIC) && duicfg.dynamicSkin;
          if (showDynamic && _status.mode != null) {
            var skins;
            var dskins = decadeUI.dynamicSkin;
            var increased;
            for (var i = 0; i < avatars.length; i++) {
              let hide = [];
              if (lib.character[avatars[i]] && lib.character[avatars[i]][4]) hide = lib.character[avatars[i]][4];
              let isHide;
              if (hide.length > 0 && hide[0] == "hiddenSkill" || get.mode() == 'guozhan') {
                isHide = true;
              }
              if (isHide) continue;
              skins = dskins[avatars[i]];
              if (skins == undefined) continue;
              var keys = Object.keys(skins);
              if (keys.length == 0) {
                console.error('player.init: ' + avatars[i] + ' 没有设置动皮参数');
                continue;
              }
              var skin, skinName;
              var realName = game.qhly_getRealName(avatars[i]);
              if (lib && lib.config && lib.config.qhly_skinset && lib.config.qhly_skinset.djtoggle && lib.config.extensions && lib.config.extensions.contains('千幻聆音') && lib.config['extension_千幻聆音_enable']) {
                skin = null;
                var namex = avatars[i];
                var value = game.qhly_getSkin(namex);
                skinName = game.qhly_getSkin(namex);
                if (skinName == null) skinName = '经典形象.jpg';
                if (value) value = value.substring(0, value.lastIndexOf('.'));
                //if (value) value = game.qhly_rename(value);
                else {
                  value = '经典形象';
                  realName = avatars[i];
                }
                if (lib.config.qhly_skinset.djtoggle &&
                  lib.config.qhly_skinset.djtoggle[namex] &&
                  lib.config.qhly_skinset.djtoggle[namex][value]) continue;
                for (var j of Object.keys(skins)) {
                  if (j == value) skin = skins[value];
                }
              } else skin = skins[Object.keys(skins)[0]];
              if (skin == null) continue;
              skin = game.qhly_formatDS(skin, avatars[i]);
              var skinCopy = game.qhly_deepClone(skin);
              if (skinCopy.action && skinCopy.pos) skinCopy.action = "ChuChang";
              if (skinCopy.speed == undefined) skinCopy.speed = 1;
              if (!skinCopy.skinName) skinCopy.skinName = keys[i];
              skinCopy.player = skinCopy;
              if (!this.doubleAvatar && dynamicExt) {
                if (this == game.me) {
                  if (dynamicExt.selectSkinData && dynamicExt.selectSkinData.value) dynamicExt.selectSkinData.value = keys[i];
                }
              }
              var theme = ui.arena.dataset.newDecadeStyle == 'on' ? 'decade' : 'shousha';
              if (lib.config['extension_千幻聆音_qhly_editDynamic'] && lib.qhly_skinEdit[realName] && lib.qhly_skinEdit[realName][skinName] && lib.qhly_skinEdit[realName][skinName].player && lib.qhly_skinEdit[realName][skinName].player.dynamic && lib.qhly_skinEdit[realName][skinName].player.dynamic[theme]) {
                var resetDynamic = lib.qhly_skinEdit[realName][skinName].player.dynamic[theme];
                skinCopy.x = resetDynamic.x;
                skinCopy.y = resetDynamic.y;
                skinCopy.scale = resetDynamic.scale;
                skinCopy.angle = resetDynamic.angle;
                if (skinCopy.beijing && lib.qhly_skinEdit[realName][skinName].player.beijing && lib.qhly_skinEdit[realName][skinName].player.beijing[theme]) {
                  var resetBeijing = lib.qhly_skinEdit[realName][skinName].player.beijing[theme];
                  skinCopy.beijing.x = resetBeijing.x;
                  skinCopy.beijing.y = resetBeijing.y;
                  skinCopy.beijing.scale = resetBeijing.scale;
                  skinCopy.beijing.angle = resetBeijing.angle;
                }
              }
              this.playDynamic(skinCopy, i == 1, ui.arena.dataset.dynamicSkinOutcrop == 'on' && ui.arena.dataset.newDecadeStyle == 'on', lib.config['extension_千幻聆音_ignoreClips']);
              // 修改3 start  此处修改是因为动皮和背景加载需要时间, 在动皮加载好之前用一个默认背景代替, 防止武将框黑一片
              if (i == 0 || !this.dynamic.primary) {
                if (skinCopy.background) {
                  this.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinCopy.background + '")';
                } else {
                  this.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/皮肤切换/images/card/card.png")'
                }
              }
              // 修改3 end
              if (!increased) {
                increased = true;
                decadeUI.CUR_DYNAMIC++;
              }

              var forces = 'qun';
              if (lib.character[character]) forces = lib.character[character][1];
              if (!isHide) {
                game.qhly_checkYH(this, forces);
              }

            }
            if (game.qhly_hasExtension('皮肤切换') && lib.config[skinSwitch.configKey.useDynamic]) {
              // 开启自动播放play2模式
              skinSwitch.dynamic.startPlay2Random(this)
            }
          }
        }
        var timer = null;
        this.invisibleSkills = [];
        this.node.avatar.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", function (e) {
          e.preventDefault();
          if (e.button && e.button != 0) return;
          clearTimeout(timer);
          this._qhlyClickTime = Date.now();
        });
        this.node.avatar.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", function (e) {
          if (!this._qhlyClickTime || Date.now() - this._qhlyClickTime > 400 || this.parentNode.classList.contains('selectable') || this.parentNode.classList.contains('target') || this.parentNode.isUnseen(0)) return;
          timer = setTimeout(function () {
            if(this.parentNode&&this.parentNode.cailanzi) {
              this.parentNode.cailanzi();
            }else {
              if (lib.config['extension_千幻聆音_qhly_playerwindow']) game.qhly_playerWindow(this);
            }
          }.bind(this), 220);
        });
        this.node.avatar2.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", function (e) {
          e.preventDefault();
          if (!this.parentNode.doubleAvatar || e.button && e.button != 0) return;
          clearTimeout(timer);
          this._qhlyClickTime = Date.now();
        });
        this.node.avatar2.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", function (e) {
          if (!this.parentNode.doubleAvatar || !this._qhlyClickTime || Date.now() - this._qhlyClickTime > 400 || this.parentNode.classList.contains('selectable') || this.parentNode.classList.contains('target') || this.parentNode.isUnseen(1)) return;
          timer = setTimeout(function () {
            if(this.parentNode&&this.parentNode.cailanzi) {
              this.parentNode.cailanzi();
            }else {
              if (lib.config['extension_千幻聆音_qhly_playerwindow']) game.qhly_playerWindow(this);
            }
          }.bind(this), 220);
        });
        var jie;
        if (character && duicfg.showJieMark) {
          if (lib.characterPack.refresh)
            jie = lib.characterPack.refresh[character];
          if (jie == null) {
            jie = character.substr(0, 3);
            jie == 're_' || jie == 'ol_' || jie == 'xin' || jie == 'old';
          }

          if (jie != null) {
            jie = lib.translate[character][0];
            if (jie == '界') {
              if (this.$jieMark == undefined)
                this.$jieMark = dui.element.create('jie-mark', this);
              else
                this.appendChild(this.$jieMark);
            }
          }
        }
        var result = qhly_oldinit.apply(this, arguments);
        if (jie == '界') {
          var text = result.node.name.innerText;
          if (text[1] == '\n')
            text = text.substr(2);
          else
            text = text.substr(1);

          result.node.name.innerText = text;
        }
        if(window.doubleKuang) window.doubleKuang(this);
        return result;
      }
      function qhly_uninit() {
        if(window.doubleKuang) window.doubleKuang(this,true);
        if (this.$jieMark) {
          this.$jieMark.remove();
          this.$jieMark.undefined;
        }
        this.stopDynamic();
        this.doubleAvatar = false;
        this.node.campWrap.dataset.camp = null;
        this.node.campWrap.node.campName.innerHTML = '';
        this.node.campWrap.node.campName.style.backgroundImage = '';
        this.node.name2.innerHTML = '';

        for (var i = 1; i < 6; i++) if (this.isDisabled(i)) this.$enableEquip('equip' + i);

        if (this.storage._disableJudge) {
          game.broadcastAll(function (player) {
            player.storage._disableJudge = false;
            for (var i = 0; i < player.node.judges.childNodes.length; i++) {
              if (player.node.judges.childNodes[i].name == 'disable_judge') {
                player.node.judges.removeChild(player.node.judges.childNodes[i]);
                break;
              }
            }
          }, this);
        }
        var hujiat=this.node.hpWrap.querySelector('.hujia');
		if(hujiat) hujiat.remove();
        this.node.avatar.hide();
        this.node.count.hide();
        if (this.node.wuxing) {
          this.node.wuxing.hide();
        }
        if (this.node.name_seat) {
          this.node.name_seat.remove();
          this.node.name_seat = undefined;
        }

        if (this.storage.nohp) this.node.hp.show();
        this.classList.remove('unseen');
        this.classList.remove('unseen2');
        this.name = undefined;
        this.name1 = undefined;
        this.sex = undefined;
        this.group = undefined;
        this.hp = undefined;
        this.maxHp = undefined;
        this.hujia = undefined;

        this.clearSkills(true);
        this.node.identity.style.backgroundColor = '';
        this.node.intro.innerHTML = '';
        this.node.name.innerHTML = '';
        this.node.hp.innerHTML = '';
        this.node.count.innerHTML = '0';
        if (this.name2) {
          this.singleHp = undefined;
          this.node.avatar2.hide();
          this.node.name2.innerHTML = '';
          this.classList.remove('fullskin2');
          this.name2 = undefined;
        }

        for (var mark in this.marks) this.marks[mark].remove();
        ui.updatem(this);

        this.skipList = [];
        this.skills = this.skills.contains('cangji_yozuru') ? ['cangji_yozuru'] : [];
        this.initedSkills = [];
        this.additionalSkills = {};
        this.disabledSkills = {};
        this.hiddenSkills = [];
        this.awakenedSkills = [];
        this.forbiddenSkills = {};
        this.phaseNumber = 0;
        this.stat = [{
          card: {},
          skill: {}
        }];
        this.tempSkills = {};
        this.storage = {};
        this.marks = {};
        this.ai = {
          friend: [],
          enemy: [],
          neutral: []
        };
        var forces = 'qun';
        if (lib.character[this]) forces = lib.character[this][1];
        game.qhly_checkYH(this, forces);
        this.fixShadow();
        //if(window.doubleKuang) window.doubleKuang(this,true);
        return this;
      }
      function qhly_reinit(from, to, maxHp, online) {
        //if(window.doubleKuang) window.doubleKuang(this,true);
        var info1 = lib.character[from];
        var info2 = lib.character[to];
        var smooth = true;
        if (maxHp == 'nosmooth') {
          smooth = false;
          maxHp = null;
        }
        let data;
        if (get.mode() == 'guozhan' && lib.config['extension_千幻聆音_qhly_guozhanDS']) {
          if (to.indexOf('gz_') == 0) {
            let extend = { [to]: decadeUI.dynamicSkin[to.slice(3)] };
            decadeUI.get.extend(decadeUI.dynamicSkin, extend);
          }
        }
        if (lib.qhly_skinShare[to] && lib.qhly_skinShare[to].name) {
          let extend = { [to]: decadeUI.dynamicSkin[lib.qhly_skinShare[to].name] };
          decadeUI.get.extend(decadeUI.dynamicSkin, extend);
        }
        if (window.qhly_newDynamicExt) {
          data = {
            doubleAvatar: this.doubleAvatar,
            name: this.name,
            name1: this.name1,
            name2: this.name2,
            clear: "reinit"
          }
        }
        if (this.name2 == from) {
          this.name2 = to;
          if (this.isUnseen(0) && !this.isUnseen(1)) {
            this.sex = info2[0];
            this.name = to;
          }
          if (smooth) this.smoothAvatar(true);
          this.node.avatar2.setBackground(to, 'character');
          this.node.name2.innerHTML = get.prefixBoldName(to,'character');
          if (window.qhly_newDynamicExt) {
            data.zhu = false;
            data.to = to;
            this.stopDynamic(false, true);
            data.state = EpicFX.playDynamic(this, undefined, to, true, undefined, ui.arena.dataset.dynamicSkinOutcrop == 'on' && ui.arena.dataset.newDecadeStyle == 'on');
          }
        } else if (this.name == from || this.name1 == from) {
          if (this.name1 == from) {
            this.name1 = to;
          }
          if (!this.classList.contains('unseen2')) {
            this.name = to;
            this.sex = info2[0];
          }
          if (smooth) this.smoothAvatar(false);
          this.node.avatar.setBackground(to, 'character');
          this.node.name.innerHTML = get.prefixBoldName(to,'character');

          if (this == game.me && ui.fakeme) {
            ui.fakeme.style.backgroundImage = this.node.avatar.style.backgroundImage;
          }
          if (window.qhly_newDynamicExt) {
            data.zhu = true;
            data.to = to;
            this.stopDynamic(true, false);
            data.state = EpicFX.playDynamic(this, to, undefined, true, undefined, ui.arena.dataset.dynamicSkinOutcrop == 'on' && ui.arena.dataset.newDecadeStyle == 'on');
          }
        } else {
          if(window.doubleKuang) window.doubleKuang(this);
          return this;
        }
        if (window.qhly_newDynamicExt && lib.config['extension_EpicFX_skinEffects']) EpicFX.initSkinPackOrRefreshAll(this, data);
        if (online) {
          if(window.doubleKuang) window.doubleKuang(this);
          return;
        }
        for (var i = 0; i < info1[3].length; i++) {
          this.removeSkill(info1[3][i]);
        }
        for (var i = 0; i < info2[3].length; i++) {
          this.addSkill(info2[3][i]);
        }
        if (Array.isArray(maxHp)) {
          this.maxHp = maxHp[1];
          this.hp = maxHp[0];
        } else {
          var num;
          if (maxHp === false) {
            num = 0;
          } else {
            if (typeof maxHp != 'number') {
              maxHp = get.infoMaxHp(info2[2]);
            }
            num = maxHp - get.infoMaxHp(info1[2]);
          }
          if (typeof this.singleHp == 'boolean') {
            if (num % 2 != 0) {
              if (this.singleHp) {
                this.maxHp += (num + 1) / 2;
                this.singleHp = false;
              } else {
                this.maxHp += (num - 1) / 2;
                this.singleHp = true;
                if (!game.online) {
                  this.doubleDraw();
                }
              }
            } else {
              this.maxHp += num / 2;
            }
          } else {
            this.maxHp += num;
          }
        }
        game.broadcast(function (player, from, to, skills) {
          player.reinit(from, to, null, true);
          player.applySkills(skills);
        }, this, from, to, get.skillState(this));
        game.addVideo('reinit3', this, {
          from: from,
          to: to,
          hp: this.maxHp,
          avatar2: this.name2 == to
        });
        this.update();
        if (!window.qhly_newDynamicExt) {
          var skin = game.qhly_getDynamicSkin(null, to), skinName;
          var realName = game.qhly_getRealName(to);
          if (skin) {
            skinName = game.qhly_getSkin(to);
            var skinCopy = game.qhly_deepClone(skin);
            if (skinCopy.action && skinCopy.pos) skinCopy.action = "ChuChang";
            if (skinCopy.speed == undefined) skinCopy.speed = 1;
            skinCopy.player = skinCopy;
            var theme = ui.arena.dataset.newDecadeStyle == 'on' ? 'decade' : 'shousha';
            if (lib.config['extension_千幻聆音_qhly_editDynamic'] && lib.qhly_skinEdit[realName] && lib.qhly_skinEdit[realName][skinName] && lib.qhly_skinEdit[realName][skinName].player && lib.qhly_skinEdit[realName][skinName].player.dynamic && lib.qhly_skinEdit[realName][skinName].player.dynamic[theme]) {
              var resetDynamic = lib.qhly_skinEdit[realName][skinName].player.dynamic[theme];
              skinCopy.x = resetDynamic.x;
              skinCopy.y = resetDynamic.y;
              skinCopy.scale = resetDynamic.scale;
              skinCopy.angle = resetDynamic.angle;
              if (skinCopy.beijing && lib.qhly_skinEdit[realName][skinName].player.beijing && lib.qhly_skinEdit[realName][skinName].player.beijing[theme]) {
                var resetBeijing = lib.qhly_skinEdit[realName][skinName].player.beijing[theme];
                skinCopy.beijing.x = resetBeijing.x;
                skinCopy.beijing.y = resetBeijing.y;
                skinCopy.beijing.scale = resetBeijing.scale;
                skinCopy.beijing.angle = resetBeijing.angle;
              }
            }
          }
          if (this.doubleAvatar) {
            let primary = true;
            let deputy = true;
            if (this.name2 == to) primary = false;
            else deputy = false;
            if (this.dynamic) {
              this.stopDynamic(primary, deputy);
              decadeUI.CUR_DYNAMIC--;
            }
            if (skin) {
              this.playDynamic(skinCopy, deputy, ui.arena.dataset.dynamicSkinOutcrop == 'on' && ui.arena.dataset.newDecadeStyle == 'on', lib.config['extension_千幻聆音_ignoreClips']);
              decadeUI.CUR_DYNAMIC++;
            }
            var forces = 'qun';
            if (lib.character[this.name1]) forces = lib.character[this.name1][1];
          } else {
            if (this.dynamic) {
              this.stopDynamic();
              decadeUI.CUR_DYNAMIC--;
            }
            if (skin) {
              this.playDynamic(skinCopy, false, ui.arena.dataset.dynamicSkinOutcrop == 'on' && ui.arena.dataset.newDecadeStyle == 'on', lib.config['extension_千幻聆音_ignoreClips']);
              decadeUI.CUR_DYNAMIC++;
              this.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skin.background + '")';
            }
            var forces = 'qun';
            if (lib.character[to]) forces = lib.character[to][1];
          }
          game.qhly_checkYH(this, forces);
        }
        if(window.doubleKuang) window.doubleKuang(this);
      }
      function qhly_stopdynamic(primary, deputy) {
        var dynamic = this.dynamic;
        if (!dynamic) return;

        primary = primary === true;
        deputy = deputy === true;
        if (primary && dynamic.primary) {
          dynamic.stop(dynamic.primary);
          dynamic.primary = null;
        } else if (deputy && dynamic.deputy) {
          dynamic.stop(dynamic.deputy);
          dynamic.deputy = null;
        } else if (!primary && !deputy) {
          dynamic.stopAll();
          dynamic.primary = null;
          dynamic.deputy = null;
        }

        if (!dynamic.primary && !dynamic.deputy) {
          this.classList.remove('d-skin');
          this.classList.remove('d-skin2');
          this.$dynamicWrap.remove();
        }
      }
      function qhly_playdynamic(animation, deputy, cutdybg, ignoreClip) {
        deputy = deputy === true;
        if (animation == undefined) return console.error('playDynamic: 参数1不能为空');
        var dynamic = this.dynamic;
        if (!dynamic) {
          dynamic = new duilib.DynamicPlayer('assets/dynamic/');
          dynamic.dprAdaptive = true;
          this.dynamic = dynamic;
          this.$dynamicWrap.appendChild(dynamic.canvas);
        } else {
          if (deputy && dynamic.deputy) {
            dynamic.stop(dynamic.deputy);
            dynamic.deputy = null;
          } else if (!deputy && dynamic.primary) {
            dynamic.stop(dynamic.primary);
            dynamic.primary = null;
          }
        }

        if (typeof animation == 'string') animation = { name: animation };
        const dybgxishu = (lib.config.extension_千幻聆音_qhly_lutouType && lib.config.extension_千幻聆音_qhly_lutouType == 'shousha') ? 0.873 : 0.9;
        if (this.doubleAvatar) {
          function clip(anim, cut) {
            if (Array.isArray(anim.x)) {
              anim.x = anim.x.concat();
              anim.x[1] += deputy ? 0.25 : -0.25;
            } else {
              if (anim.x == undefined) {
                anim.x = [0, deputy ? 0.75 : 0.25];
              } else {
                anim.x = [anim.x, deputy ? 0.25 : -0.25];
              }
            }

            anim.clip = {
              x: [0, deputy ? 0.5 : 0],
              y: 0,
              width: [0, 0.5],
              height: [0, cutdybg && cut ? dybgxishu : 1],
              clipParent: true
            };
          }
          if (window.qhly_newDynamicExt) {
            let num = (animation.dybg ? 2 : 1);
            for (let i = 0; i < num; i++) {
              if (i == 0 && num == 2) {
                clip(animation.dybg, true);
              } else {
                clip(animation);
              }
            }
          } else {
            let num = (animation.player.beijing ? 2 : 1);
            for (let i = 0; i < num; i++) {
              if (i == 0 && num == 2) {
                clip(animation.player.beijing, true);
              } else {
                clip(animation);
              }
            }
          }
        } else {
          if (window.qhly_newDynamicExt && animation.dybg && cutdybg) animation.dybg.clip = { x: 0, y: 0, width: [0, 1], height: [0, dybgxishu], clipParent: true };//切动态背景
          else if (animation.player && animation.player.beijing && cutdybg) animation.player.beijing.clip = { x: 0, y: 0, width: [0, 1], height: [0, dybgxishu], clipParent: true } //切动态背景
          else if (animation.player && animation.player.beijing && !cutdybg) animation.player.beijing.clip = null;
        }
        if (this.$dynamicWrap.parentNode != this) this.appendChild(this.$dynamicWrap);

        dynamic.outcropMask = duicfg.dynamicSkinOutcrop;
        if (ignoreClip) animation.clipSlots = undefined;
        var avatar = dynamic.play(animation, deputy);
        if (deputy === true) {
          dynamic.deputy = avatar;
        } else {
          dynamic.primary = avatar;
        }
        this.classList.add(deputy ? 'd-skin2' : 'd-skin');
        if (game.qhly_hasExtension('皮肤切换') && lib.config[skinSwitch.configKey.useDynamic]) {
          skinSwitch.chukuangPlayerInit(this, !deputy, animation.player)
        }
      }
      function qhly_showcharacter(num, log) {
        var toShow = [];
        if ((num == 0 || num == 2) && this.isUnseen(0)) toShow.add(this.name1);
        if ((num == 1 || num == 2) && this.isUnseen(1)) toShow.add(this.name2);
        if (!toShow.length) return;
        if (window.qhly_newDynamicExt && lib.config['extension_EpicFX_skinEffects']) {
          EpicFX.showCharacterSkin(this, num);
          if (this.skinPack && this.skinPack.btn && this != game.me) {
            if (!this.isUnseen()) {
              this.skinPack.btn.style.display = "block";
            }
          }
        } else {
          if (num == 0 && !this.isUnseen(0)) {
            return;
          }
          if (num == 1 && (!this.name2 || !this.isUnseen(1))) {
            return;
          }
          if (!this.isUnseen(2)) {
            return;
          }
          switch (num) {
            case 0: game.qhly_changeDynamicSkin(this, undefined, this.name1); break;
            case 1: game.qhly_changeDynamicSkin(this, undefined, this.name2, true); break;
            default: {
              game.qhly_changeDynamicSkin(this, undefined, this.name1);
              if (this.doubleAvatar) game.qhly_changeDynamicSkin(this, undefined, this.name2, true);
            }
          }
        }
        lib.element.player.$showCharacter.apply(this, arguments);
        var next = game.createEvent('showCharacter', false);
        next.player = this;
        next.num = num;
        next.toShow = toShow;
        next._args = arguments;
        next.setContent('showCharacter');
        game.qhly_checkYH(this);
        return next;
      }
      lib.qhly_stopdynamic = qhly_stopdynamic;
      lib.qhly_playdynamic = qhly_playdynamic;
      lib.qhly_showcharacter = qhly_showcharacter;
      lib.skill._qhcreateYH = {
        trigger: {
          global: ['showCharacter', 'die'],
        },
        direct: true,
        forced: true,
        charlotte: true,
        forceDie: true,
        filter: function () {
          return window.decadeUI;
        },
        content: function () {
          if (player.isDead()) player.stopDynamic();
          game.qhly_checkYH(player);
        }
      }
      lib.skill._qhlyChangeSkin = {
        trigger: {
          player: 'changeHp',
          global: 'phaseEnd',
        },
        filter: function (event, player) {
          return lib.qhly_skinChange[game.qhly_getRealName(player.name1)] || lib.qhly_skinChange[game.qhly_getRealName(player.name2)];
        },
        direct: true,
        forced: true,
        charlotte: true,
        content: function () {
          for (let i = 0; i < 2; i++) {
            if (!player['name' + (i + 1)]) continue;
            let playerName = game.qhly_getRealName(player['name' + (i + 1)]);
            let skin = game.qhly_getSkin(playerName);
            if (lib.qhly_skinChange[playerName] && lib.qhly_skinChange[playerName][game.qhly_earse_ext(skin)] && lib.qhly_skinChange[playerName][game.qhly_earse_ext(skin)].source && lib.qhly_skinChange[playerName][game.qhly_earse_ext(skin)].source.indexOf('hp_') == 0) {
              if (!player._qhly_gonnaChange) player._qhly_gonnaChange = [0, 0];
              if (trigger.num > 0) {
                player._qhly_gonnaChange[i] = 1;
              }
              if (lib.qhly_skinChange[playerName][game.qhly_earse_ext(skin)].phase && trigger.name == 'recover' || trigger.name == 'phase' && player._qhly_gonnaChange[i] != 1) continue;
              if (trigger.name == 'phase') player._qhly_gonnaChange[i] = 0;
              game.qhly_checkPlayerImageAudio(playerName, skin, player, function () {
                player.node['avatar' + (i ? '2' : '')].qhly_origin_setBackgroundImage(player._qhly_skinChange[i]);
                if (!_status.qhly_replaceSkin[playerName]) _status.qhly_replaceSkin[playerName] = {};
                _status.qhly_replaceSkin[playerName][skin] = player._qhly_skinChange[i];
                if (!player._qhlyIsChanged) player._qhlyIsChanged = [0, 0];
                if (trigger.num < 0) player._qhlyIsChanged[i] = 1;
                else player._qhlyIsChanged[i] = 0;
                if (window.decadeUI && !game.qhly_hasExtension('皮肤切换') && !game.qhly_hasExtension('EpicFX')) game.qhly_changeDynamicSkin(player, undefined, undefined, i == 1);
              });
            }
          }
        }
      }
      lib.skill._qhlyChageKillingSkin = {
        trigger: { global: 'die' },
        filter: function (event, player) {
          if (!event.source || !event.source.name1 || event._qhlyChangeKillSkin) return false;
          return lib.qhly_skinChange[game.qhly_getRealName(event.source.name1)] || lib.qhly_skinChange[game.qhly_getRealName(event.source.name2)];
        },
        direct: true,
        forced: true,
        charlotte: true,
        content: function () {
          var current = trigger.source;
          game.qhly_changeSkillSkin(current, 'kill');
        }
      }
      lib.skill._qhlyCheckSkin = {
        trigger: { global: 'gameStart' },
        direct: true,
        forced: true,
        charlotte: true,
        firstDo: true,
        content: function () {
          game.qhly_checkYH(player);
          if (lib.qhly_skinChange[player.name1] || lib.qhly_skinChange[player.name2]) {
            if (!_status.qhly_replaceSkin) _status.qhly_replaceSkin = {};
            var num = player.name2 == undefined ? 1 : 2;
            for (var i = 0; i < num; i++) {
              game.qhly_setCurrentSkin(game.qhly_getRealName(player['name' + (i + 1)]), game.qhly_getSkin(game.qhly_getRealName(player['name' + (i + 1)])));
            }
          }
        }
      }

      game.qhly_changeSkillSkin = function (player, skill) {
        if (!skill || !player) return;
        if (skill != 'kill') {
          if (lib.qhly_changeSkillSkin[skill]) {
            if (Date.now() - lib.qhly_changeSkillSkin[skill] < 400) {
              lib.qhly_changeSkillSkin[skill] = Date.now();
              return;
            }
          }
          lib.qhly_changeSkillSkin[skill] = Date.now();
        }
        for (let i = 0; i < 2; i++) {
          let playerName = game.qhly_getRealName(player['name' + (i + 1)]);
          if (!playerName) continue;
          let skin = game.qhly_getSkin(player['name' + (i + 1)]);
          if (lib.qhly_skinChange[playerName] && lib.qhly_skinChange[playerName][game.qhly_earse_ext(skin)] && lib.qhly_skinChange[playerName][game.qhly_earse_ext(skin)].source && lib.qhly_skinChange[playerName][game.qhly_earse_ext(skin)].source == skill) {
            game.qhly_setPlayerStatus(player, i == 1, 3 - game.qhly_getPlayerStatus(player, i == 1));
            game.qhly_checkPlayerImageAudio(playerName, skin, player, function () {
              if (!player._qhlyIsChanged) player._qhlyIsChanged = [0, 0];
              player._qhlyIsChanged[i] = 1 - player._qhlyIsChanged[i];
              player.node['avatar' + (i ? '2' : '')].qhly_origin_setBackgroundImage(player._qhly_skinChange[i]);
              if (!_status.qhly_replaceSkin[playerName]) _status.qhly_replaceSkin[playerName] = {};
              _status.qhly_replaceSkin[playerName][skin] = player._qhly_skinChange[i];
              if (window.decadeUI && !game.qhly_hasExtension('皮肤切换') && !game.qhly_hasExtension('EpicFX')) game.qhly_changeDynamicSkin(player, undefined, undefined, i == 1);
            }, undefined);
          }
        }
      }
      if (!lib.config.qhly_decadeBigBak) {
        lib.config.qhly_decadeBigBak = 1;
        game.saveConfig('qhly_decadeBigBak', 1);
      }
      game.thunderFileExist = function (url) {
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
      if (lib.config.qhly_jianghun === undefined) lib.config.qhly_jianghun = 100000;
      if (!lib.config.qhly_shoushadengjie) lib.config.qhly_shoushadengjie = {};
      _status.qhly_shoushajinjie = [100, 6300, 23600, 160000/* , 442000 */];
      _status.qhly_jinjietiao = null;
      game.qhly_getShoushajinjie = function (name) {
        if (!name || typeof name != 'string') return [0, 0, 0];
        if (!lib.config.qhly_shoushadengjie[name]) lib.config.qhly_shoushadengjie[name] = 0;
        var dengjie = 0, current = lib.config.qhly_shoushadengjie[name], need = 190000;
        for (var i = 0; i < _status.qhly_shoushajinjie.length; i++) {
          if (current >= _status.qhly_shoushajinjie[i]) {
            dengjie++;
            current -= _status.qhly_shoushajinjie[i];
            need -= _status.qhly_shoushajinjie[i];
          };
        }
        need -= current;
        if (current == 0 && !_status.qhly_shoushajinjie[dengjie]) current = _status.qhly_shoushajinjie[dengjie - 1]
        return [dengjie, current, need];
      }
      var QHLY_DEBUGMODE = true;
      var jianghunUp = function () {
        lib.config.qhly_jianghun += 50000;
        lib.config.qhly_jianghun = Math.min(800000, lib.config.qhly_jianghun);
        game.saveConfig('qhly_jianghun', lib.config['qhly_jianghun']);
      }
      var qhly_mvp = function (result) {
        if (!lib.config['extension_千幻聆音_qhly_mvp']) return;
        function isEmpty(obj) {
          // 确保传入的是对象且不为null，并排除数组等其他对象类型
          return typeof obj === 'object' && 
                 obj !== null && 
                 !Array.isArray(obj) && 
                 Object.keys(obj).length === 0;
        }
        var mvpplayers = game.players.concat(game.dead), list = [];
        for (var i = 0; i < mvpplayers.length; i++) {
          list[i] = [mvpplayers[i]];
          var score = 0;
          for (j = 0; j < mvpplayers[i].stat.length; j++) {
            if (mvpplayers[i].stat[j].damage != undefined) score += mvpplayers[i].stat[j].damage;
            if (mvpplayers[i].stat[j].damaged != undefined) score += mvpplayers[i].stat[j].damaged;
            if (mvpplayers[i].stat[j].gain != undefined) score += mvpplayers[i].stat[j].gain;
            /*if (JSON.stringify(mvpplayers[i].stat[j].skill) != '{}')*/
            if (isEmpty(mvpplayers[i].stat[j].skill)) score += Object.keys(mvpplayers[i].stat[j].skill).length;
            for (k in mvpplayers[i].stat[j].card) {
              score += mvpplayers[i].stat[j].card[k];
            }
            if (mvpplayers[i].stat[j].kill != undefined) score += mvpplayers[i].stat[j].kill * 2;
          }
          list[i].push(score);
        }
        list.sort(function (a, b) {
          return b[1] - a[1];
        })
        while (result == !list[0][0].isFriendsOf(game.me) && list.length) list.shift();
        if (list.length && list[0][1]) window.qhly_playVictoryAudio(list[0][0].name1);
      }
      lib.onover.push(jianghunUp);
      lib.onover.push(qhly_mvp);
      if (lib.config.qhly_skinset) {
        if (!lib.config.qhly_skinset.djtoggle) lib.config.qhly_skinset.djtoggle = {}
        game.saveConfig('qhly_skinset', lib.config.qhly_skinset);
      }
      game.qhly_getDengJie = function (name) { //十周年样式中通过game.getRarity获取css中的属性等阶
        var playerDengjie = 'one';
        if (!lib.config['extension_千幻聆音_qhly_decadeDengjie'] || lib.config['extension_千幻聆音_qhly_decadeDengjie'] == 'auto') {
          switch (game.getRarity(name)) {
            case 'common': playerDengjie = 'two'; break;
            case 'junk': playerDengjie = 'one'; break;
            case 'rare': playerDengjie = 'three'; break;
            case 'epic': playerDengjie = 'four'; break;
            default: playerDengjie = 'five';
          }
        }
        else playerDengjie = lib.config['extension_千幻聆音_qhly_decadeDengjie'];
        return playerDengjie;
      }
      game.qhly_getCurrentPlayer = function (str) {
        var list = [];
        var players = game.players.concat(game.dead);
        for (var i = 0; i < players.length; i++) {
          if (players[i].name1 == str) list.push([players[i], 'name1']);
          if (players[i].name2 == str) list.push([players[i], 'name2']);
        }
        if (list.length) return list;
        return [[null, 'name1']];
      }
      game.qhly_hasDynamicSkin = function (character, name) {               //判断character的名为name的皮肤是否有动皮
        if (!window.decadeUI) return false;
        var dskins = decadeUI.dynamicSkin;
        var skins = dskins[character];
        if (skins == undefined) return false;
        var keys = Object.keys(skins);
        if (keys.length == 0) return false;
        for (var i of Object.keys(skins)) {
          if (i == name) return true;
        }
        return false;
      }
      game.qhly_getSkinLevel = function (name, skin, decade, dongtai) {
        if (!skin) return decade ? 'yuanhua' : '原画';
        if (skin && skin.indexOf('.') == -1) skin += '.jpg';
        if ((!lib.config.qhly_level || !lib.config.qhly_level[name + '_' + skin]) && !decade) return '原画';
        if (!lib.config.qhly_level && decade) return 'yuanhua';
        if (!lib.config.qhly_level[name + '_' + skin] && decade) {
          if (skin && skin.indexOf('绝版') != -1) return 'jueban';
          var skinkey = skin.substring(0, skin.lastIndexOf('.'));
          if (window.decadeUI && decadeUI.dynamicSkin[name] && decadeUI.dynamicSkin[name][skinkey]) return 'dongtai';
          return dongtai ? 'dongtai' : 'yuanhua';
        }
        switch (lib.config.qhly_level[name + '_' + skin]) {
          case '稀有': return decade ? 'xiyou' : '稀有';
          case '史诗': return decade ? 'shishi' : '史诗';
          case '精良': return decade ? 'xiyou' : '精良';
          case '传说': return decade ? 'chuanshuo' : '传说';
          case '精品': return decade ? 'xiyou' : '稀有';
          case '绝版': return decade ? 'jueban' : '传说';
          case '动态': return decade ? 'dongtai' : '传说';
          case '普通': return decade ? 'putong' : '稀有';
          case '限定': return decade ? 'xianding' : '传说';
          default: return decade ? 'dongtai' : '原画';
        }
      }
      game.qhly_changeDynamicSkin = function (str, name, character, character2, play) {          //str主体，如果为字符串是名称中带有str的所有玩家，name指定更换为某种动皮，character玩家姓名id，character2是否为副将
        if (!window.decadeUI) return;
        if (lib.config['extension_千幻聆音_qhly_decadeCloseDynamic']) return;
        let res2;
        if (window.qhly_newDynamicExt) {
          res2 = {
            status: false,
            zhu: "default",
            fu: "default"
          }
          if (get.mode() == "guozhan" && !play) return res2;
        }
        var nodes;
        var increased;
        if (typeof str == 'object') nodes = [[str, character2 ? 'name2' : 'name1']];
        else nodes = game.qhly_getCurrentPlayer(str);
        for (var dy = 0; dy < nodes.length; dy++) {
          var node = nodes[dy][0];
          if (!node) continue;
          if (!node.playDynamic || !node.stopDynamic) {
            node.playDynamic = qhly_playdynamic;
            node.stopDynamic = qhly_stopdynamic;
          }

          if (!character) character = node[nodes[dy][1]];
          var nodeType = get.itemtype(node) == 'player' ? 'player' : 'bigAvatar';

          var bool1 = true, bool2 = false;
          if (character2) {
            bool1 = false, bool2 = true;
          } else if (nodes[dy][1] == 'name2') bool1 = false, bool2 = true;
          node.stopDynamic(bool1, bool2);
          game.qhly_checkYH(node);
          if (_status.mode != null) {
            var skins;
            var dskins = decadeUI.dynamicSkin;

            skins = dskins[character];
            if (skins == undefined)
              return;

            var keys = Object.keys(skins);

            if (keys.length == 0) {
              console.error('player.init: ' + character + ' 没有设置动皮参数');
              return;
            }

            var skin, cutdybg;
            if (name) {
              for (var i of Object.keys(skins)) {
                if (i == name) skin = skins[name];
              }
            }
            else {
              var value = game.qhly_getSkin(character);
              if (value) value = value.substring(0, value.lastIndexOf('.'));
              else value = '经典形象';
              //value=game.qhly_rename(value);
              if (lib.config.qhly_skinset.djtoggle && lib.config.qhly_skinset.djtoggle[character] && lib.config.qhly_skinset.djtoggle[character][value]) value = null;
              for (var i of Object.keys(skins)) {
                if (i == value) skin = skins[i];
              }
            }
            if (nodeType == 'player') {
              if (window.dynamicExt && window.dynamicExt != window.skinSwitch) {
                if (window.dynamicExt == window.eng) {
                  if (lib.config['extension_EngEX_dynamicSkin']) {
                    if (skin) lib.config['extension_EngEX_dynamicSkin'][character] = value;
                    else if (lib.config['extension_EngEX_dynamicSkin'][character]) delete lib.config['extension_EngEX_dynamicSkin'][node];
                    game.saveConfig('extension_EngEX_dynamicSkin', lib.config['extension_EngEX_dynamicSkin']);
                  } else {
                    if (skin) {
                      lib.config['extension_EngEX_dynamicSkin'] = {};
                      lib.config['extension_EngEX_dynamicSkin'][character] = value;
                      game.saveConfig('extension_EngEX_dynamicSkin', lib.config['extension_EngEX_dynamicSkin']);
                    }
                  }
                } else {

                }
              }
            } else if (lib.config.qhly_smallwindowstyle == 'shousha') {
              if (skin && node.campBack && name) {
                if (!['史诗', '传说'].contains(game.qhly_getSkinLevel(character, name))) node.campBack.setAttribute("data-pinzhi", '史诗');
                else node.campBack.setAttribute("data-pinzhi", game.qhly_getSkinLevel(character, name));
                node.campBack.classList.add('dong');
              }
            }
            if (!skin) {
              if (bool2) {
                node.classList.remove('d-skin2');
              } else {
                node.classList.remove('d-skin');
              }
              return;
            }
            skin = game.qhly_formatDS(skin, character);
            var editArgument1 = 'dynamic', editArgument2 = 'beijing';
            if (game.qhly_getPlayerStatus(node, character2, character) == 2) {
              if (skin.special && skin.special.condition && (skin.special.condition.lowhp || skin.special.condition.juexingji)) {
                var value;
                var changeType = 'lowhp';
                if (skin.special.condition.juexingji) changeType = 'juexingji';
                var special = skin.special.condition[changeType].transform;
                if (Array.isArray(special)) special = special[0];
                if (skin.special[special]) value = skin.special[special].name ? skin.special[special].name : skin.name.slice(0, skin.name.lastIndexOf('/'));
                value = value.split('/');
                skins = dskins[value[0]];
                for (var i of Object.keys(skins)) {
                  if (i == value[1]) {
                    skin = skins[value[1]];
                  }
                }
              } else if (skin.transform) {
                if (skin.transform.low) skin = eval(skin.transform.low);
                else if (skin.transform.juexingji) skin = eval(skin.transform.juexingji);
              }
              editArgument1 = 'dynamic2';
              editArgument2 = 'beijing2';
            }
            var skinCopy = game.qhly_deepClone(skin);
            if (skinCopy.speed == undefined) skinCopy.speed = 1;
            skinCopy.zhu = !bool2;
            if (skinCopy.action && skinCopy.pos && nodeType == 'player') skinCopy.action = "ChuChang";
            // 动态背景切割 4 -> 判断提前
            if (nodeType == 'player') {
              cutdybg = ui.arena.dataset.dynamicSkinOutcrop == 'on' && ui.arena.dataset.newDecadeStyle == 'on';
            } else {
              cutdybg = lib.config.qhly_lutou && node.className.indexOf('shousha') < 0 && node.className.indexOf('qh-image') < 0;
            }
            //太虚幻境时没有game.me的bug
            var gamemeoff=game.me?game.me.offsetHeight:216;
            skinCopy.qhly_resizeRatio = node.offsetHeight * (1 / gamemeoff);
            // 动态背景切割 4 -> 判断提前 end
            var editSkin = name || game.qhly_getSkin(character);
            if (editSkin == null) editSkin = '经典形象';
            if (editSkin.indexOf('.') < 0) editSkin += '.jpg';
            var themeType = ui.arena.dataset.newDecadeStyle == 'on' ? 'decade' : 'shousha';
            if (!node.classList.contains('qh-isBigAvatar') && nodeType != 'player') nodeType = 'player';
            var theme = nodeType == 'player' ? themeType : lib.config.qhly_currentViewSkin;
            if (lib.config['extension_千幻聆音_qhly_editDynamic'] && lib.qhly_skinEdit[game.qhly_getRealName(character)] && lib.qhly_skinEdit[game.qhly_getRealName(character)][editSkin] && lib.qhly_skinEdit[game.qhly_getRealName(character)][editSkin][nodeType] && lib.qhly_skinEdit[game.qhly_getRealName(character)][editSkin][nodeType][editArgument1] && lib.qhly_skinEdit[game.qhly_getRealName(character)][editSkin][nodeType][editArgument1][theme]) {
              var resetDynamic = lib.qhly_skinEdit[game.qhly_getRealName(character)][editSkin][nodeType][editArgument1][theme];
              skinCopy.x = resetDynamic.x;
              skinCopy.y = resetDynamic.y;
              skinCopy.scale = resetDynamic.scale * skinCopy.qhly_resizeRatio;
              skinCopy.angle = resetDynamic.angle;
              if ((skinCopy.beijing || skinCopy.dynamicBackground) && lib.qhly_skinEdit[game.qhly_getRealName(character)][editSkin][nodeType][editArgument2] && lib.qhly_skinEdit[game.qhly_getRealName(character)][editSkin][nodeType][editArgument2][theme]) {
                var resetBeijing = lib.qhly_skinEdit[game.qhly_getRealName(character)][editSkin][nodeType][editArgument2][theme];
                if (skinCopy.dynamicBackground) {
                  if (typeof skinCopy.dynamicBackground === 'string') {
                    skinCopy.dybg = {
                      name: skinCopy.dynamicBackground,
                      zhu: skinCopy.zhu,
                      dybg: true,
                      loop: true,
                      x: resetBeijing.x,
                      y: resetBeijing.y,
                      scale: resetBeijing.scale * skinCopy.qhly_resizeRatio,
                      angle: resetBeijing.angle,
                    };
                  } else {
                    skinCopy.dybg = skinCopy.dynamicBackground;
                    skinCopy.dybg.dybg = true;
                    skinCopy.dybg.loop = true;
                    skinCopy.dybg.zhu = skinCopy.zhu;
                    skinCopy.dybg.x = resetBeijing.x;
                    skinCopy.dybg.y = resetBeijing.y;
                    skinCopy.dybg.scale = resetBeijing.scale * skinCopy.qhly_resizeRatio;
                    skinCopy.dybg.angle = resetBeijing.angle;
                  }
                }
                if (skinCopy.beijing) {
                  skinCopy.beijing.x = resetBeijing.x;
                  skinCopy.beijing.y = resetBeijing.y;
                  skinCopy.beijing.scale = resetBeijing.scale * skinCopy.qhly_resizeRatio;
                  skinCopy.beijing.angle = resetBeijing.angle;
                }
              }
            } else {
              skinCopy.scale = skinCopy.scale * skinCopy.qhly_resizeRatio;
              if (skinCopy.beijing) skinCopy.beijing.scale = (skinCopy.beijing.scale || 1) * skinCopy.qhly_resizeRatio;
              if (skinCopy.dynamicBackground) {
                if (typeof skinCopy.dynamicBackground === 'string') {
                  skinCopy.dybg = {
                    name: skinCopy.dynamicBackground,
                    scale: skinCopy.scale * skinCopy.qhly_resizeRatio,
                    zhu: skinCopy.zhu,
                    dybg: true,
                    loop: true
                  };
                } else {
                  skinCopy.dybg = skinCopy.dynamicBackground;
                  skinCopy.dybg.dybg = true;
                  skinCopy.dybg.loop = true;
                  skinCopy.dybg.zhu = skinCopy.zhu;
                  skinCopy.dybg.scale = (skinCopy.dybg.scale || skinCopy.scale) * skinCopy.qhly_resizeRatio;
                }
              }
            }
            if (window.qhly_newDynamicExt) {
              if (bool1 && skinCopy.decade) res2.zhu = "decade";
              else if (skinCopy.decade) res2.fu = "decade";
              res2.status = true;
              if (get.itemtype(node) == 'player') {
                node.skinPack.zhuSkinType = res2.zhu;
                node.skinPack.fuSkinType = res2.fu;
              } else {
                if (skinCopy.dybg) skinCopy.dybg.clip = undefined;
              }
              node.playDynamic(skinCopy, bool2, cutdybg, lib.config['extension_千幻聆音_ignoreClips']);
              node.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinCopy.background + '")';
              game.qhly_checkYH(node);
              // player.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinCopy.background + '")';
              if (!skinCopy.dynamicBackground) { } node.$dynamicWrap.style.backgroundImage = `url(${lib.assetURL}extension/十周年UI/assets/dynamic/${skinCopy.background}`;
              if (!increased) {
                increased = true;
                decadeUI.CUR_DYNAMIC++;
              }
              return res2;
            } else {
              skinCopy.player = skinCopy;
              // 动态背景切 2  -> start, 此处需要把cutdybg参数提到外面初始化
              node.playDynamic(skinCopy, bool2, cutdybg, lib.config['extension_千幻聆音_ignoreClips']);
              // 动态背景切 2  -> end
              //if (get.itemtype(node) != 'player' && !_status.qhly_dynamic[character][skinCopy.name]) _status.qhly_dynamic[character][skinCopy.name] = node.dynamic;
              if (skinCopy.background) {
                if (node.doubleAvatar && ui.arena.dataset.newDecadeStyle == 'on') {
                  let background1, background2;
                  if (character2) {
                    background1 = node.dynamic.primary && node.dynamic.primary != null && node.dynamic.primary.background ? (lib.assetURL + 'extension/十周年UI/assets/dynamic/' + node.dynamic.primary.background) : '';
                    background2 = lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinCopy.background;
                  } else {
                    background1 = lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinCopy.background;
                    background2 = node.dynamic.deputy && node.dynamic.deputy != null && node.dynamic.deputy.background ? (lib.assetURL + 'extension/十周年UI/assets/dynamic/' + node.dynamic.deputy.background) : '';
                  }
                  node.$dynamicWrap.style.backgroundImage = 'url("' + background1 + '"),url("' + background2 + '")';
                  node.$dynamicWrap.style['background-size'] = '50% 100%';
                  node.$dynamicWrap.style['background-position'] = 'left, right';
                }
                else node.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/十周年UI/assets/dynamic/' + skinCopy.background + '")';
              } else {
                node.$dynamicWrap.style.backgroundImage = 'url("' + lib.assetURL + 'extension/皮肤切换/images/card/card.png")'
              }
              game.qhly_checkYH(node);
              // 修改9 start
              if (game.qhly_hasExtension('皮肤切换') && lib.config[skinSwitch.configKey.useDynamic]) {
                // 出框worker的初始化
                skinSwitch.chukuangPlayerInit(node, !bool2, skinCopy)
              }
              // 开启当前角色的定时播放动作
              if (get.itemtype(node) == 'player') {
                if (game.qhly_hasExtension('皮肤切换') && lib.config[skinSwitch.configKey.useDynamic]) {
                  skinSwitch.dynamic.startPlay2Random(node)
                }
              }
              // 修改10 end
            }
          }
        }
      }
      game.qhly_checkPlayerImageAudio = function (name, skin, player, callbacka, callbackb, force) {
        var skinName = game.qhly_earse_ext(skin);
        if (!player) {
          var players = game.filterPlayer(function (current) {
            return current.name1 == name || current.name2 == name;
          })
          if (players.length) player = players[0];
        }
        if (!player) return;
        var imageChanged = false;   //皮肤改变
        var audioChanged = false;   //语音映射改变
        var pkg = game.qhly_foundPackage(name);
        var avatar2 = false;
        if (get.itemtype(player) == 'player' && player.name2 && player.name2 == name) avatar2 = true;
        var pkgPath = (pkg.isExt && game.qhly_getRealName(name) != name && skin) ? DEFAULT_PACKAGE.skin.standard : pkg.skin.standard;
        if (lib.qhly_skinChange[name] && lib.qhly_skinChange[name][skinName] && lib.qhly_skinChange[name][skinName].source) {
          if (!player._qhly_skinChange) player._qhly_skinChange = ['', ''];
          if (lib.qhly_skinChange[name][skinName].source.indexOf('hp_') == 0) {
            let hp = parseInt(lib.qhly_skinChange[name][skinName].source.slice(3));
            if (player.hp <= hp) {
              if (game.qhly_getPlayerStatus(player, avatar2) != 2) {
                imageChanged = true;
                player._qhly_skinChange[avatar2 ? 1 : 0] = pkgPath + lib.qhly_skinChange[game.qhly_getRealName(name)][skinName].image1;
              }
              if (!window.qhly_audio_redirect[name + '-' + skinName] || window.qhly_audio_redirect[name + '-' + skinName] != lib.qhly_skinChange[name][skinName].audio1) {
                audioChanged = true;
                window.qhly_audio_redirect[name + '-' + skinName] = lib.qhly_skinChange[name][skinName].audio1;
              }
            } else if (player.hp > hp) {
              if (player._qhly_gonnaChange && player._qhly_gonnaChange[avatar2 ? 1 : 0]) {
                if (game.qhly_getPlayerStatus(player, avatar2) != 2) {
                  imageChanged = true;
                  player._qhly_skinChange[avatar2 ? 1 : 0] = pkgPath + lib.qhly_skinChange[game.qhly_getRealName(name)][skinName].image1;
                }
                if (!window.qhly_audio_redirect[name + '-' + skinName] || window.qhly_audio_redirect[name + '-' + skinName] != lib.qhly_skinChange[name][skinName].audio1) {
                  audioChanged = true;
                  window.qhly_audio_redirect[name + '-' + skinName] = lib.qhly_skinChange[name][skinName].audio1;
                }
              } else {
                if (game.qhly_getPlayerStatus(player, avatar2) != 1) {
                  imageChanged = true;
                  player._qhly_skinChange[avatar2 ? 1 : 0] = pkgPath + lib.qhly_skinChange[game.qhly_getRealName(name)][skinName].image2;
                }
                if (window.qhly_audio_redirect[name + '-' + skinName]) {
                  audioChanged = true;
                  delete window.qhly_audio_redirect[name + '-' + skinName];
                }
              }
            }
          } else {
            if (game.qhly_getPlayerStatus(player, avatar2) == 1) {
              if (!player._qhly_skinChange[avatar2 ? 1 : 0] || player._qhly_skinChange[avatar2 ? 1 : 0] != pkgPath + lib.qhly_skinChange[game.qhly_getRealName(name)][skinName].image2) {
                imageChanged = true;
                player._qhly_skinChange[avatar2 ? 1 : 0] = pkgPath + lib.qhly_skinChange[game.qhly_getRealName(name)][skinName].image2;
              }
              if (window.qhly_audio_redirect[name + '-' + skinName]) {
                audioChanged = true;
                delete window.qhly_audio_redirect[name + '-' + skinName];
              }
            } else {
              if (!player._qhly_skinChange[avatar2 ? 1 : 0] || player._qhly_skinChange[avatar2 ? 1 : 0] != pkgPath + lib.qhly_skinChange[game.qhly_getRealName(name)][skinName].image1) {
                imageChanged = true;
                player._qhly_skinChange[avatar2 ? 1 : 0] = pkgPath + lib.qhly_skinChange[game.qhly_getRealName(name)][skinName].image1;
              }
              if (!window.qhly_audio_redirect[name + '-' + skinName] || window.qhly_audio_redirect[name + '-' + skinName] != lib.qhly_skinChange[name][skinName].audio1) {
                audioChanged = true;
                window.qhly_audio_redirect[name + '-' + skinName] = lib.qhly_skinChange[name][skinName].audio1;
              }
            }
          }
        }
        if (imageChanged && callbacka) callbacka();
        if (audioChanged) game.qhly_setCurrentSkin(name, skin, callbackb);
      }
      game.qhly_getPlayerStatus = function (player, avatar2, name) {
        var num = 1;
        if (name) name = game.qhly_getRealName(name);
        else if (!name && get.itemtype(player) == 'player') name = game.qhly_getRealName(player['name' + (avatar2 ? '2' : '1')]);
        else if (!name) return 1;
        if (player) {
          if (player._qhly_skinStatus) return player._qhly_skinStatus[avatar2 ? 1 : 0];
          if (player._qhlyIsChanged && player._qhlyIsChanged[avatar2 ? 1 : 0]) return 2;
          if (get.itemtype(player) == 'player') node = player.node['avatar' + (avatar2 ? '2' : '')];
          else node = player;
          const support = ['.jpg', '.png', '.webp'];
          const bg = node.style.backgroundImage || node.style.getPropertyValue('background-image');
          if (lib.qhly_skinChange[name] && lib.qhly_skinChange[name][game.qhly_earse_ext(game.qhly_getSkin(name))]) {
            if (bg) {
              for (var s of support) {
                var index = bg.indexOf(s);
                if (index > 0) {
                  var frIndex = bg.indexOf(name);
                  if (frIndex > 0) {
                    var str = bg.slice(frIndex, index + 4);
                    if (lib.qhly_skinChange[name][game.qhly_earse_ext(game.qhly_getSkin(name))].image1 && str == lib.qhly_skinChange[name][game.qhly_earse_ext(game.qhly_getSkin(name))].image1) num = 2;
                  }
                }
              }
            }
          }
        }
        return num;
      }
      game.qhly_setPlayerStatus = function (player, avatar2, num) {
        if (typeof player == 'object') {
          if (!player._qhly_skinStatus) player._qhly_skinStatus = [1, 1];
          player._qhly_skinStatus[avatar2 ? 1 : 0] = num;
        }
      }
      game.qhly_deepClone = function (obj, newObj) {
        var newObj = newObj || {};
        for (let key in obj) {
          if (Array.isArray(obj[key])) {
            newObj[key] = [...obj[key]];
          } else if (typeof obj[key] == 'object' && obj[key] != null) {
            if (obj[key] === obj) {
              newObj[key] = newObj;
              continue;
            }
            newObj[key] = {};
            game.qhly_deepClone(obj[key], newObj[key]);
          } else {
            newObj[key] = obj[key]
          }
        }
        return newObj;
      }
      lib.element.player.playChangeSkinEffect = function (avatar2, first) {
        //alert(window.notPlayChangeSkinEffect);
        //展开其他窗口时不展示特效
        if(window.notPlayChangeSkinEffect) return;
        //大窗口被占用时也不展示
        if(!game.qhIsNotPause()) return;
        
        game.qhly_playQhlyAudio('qhly_voc_dec_fanshu', null, true);
        if (!window.decadeUI) return;
        var str = 'huanpifu_', act = '';
        var huanfuType = lib.config['extension_十周年UI_newDecadeStyle'] == 'on' ? 'huanpifu' : 'huanfu';
        if (!decadeUI.animation.hasSpine(window.qhlyUI.assets[huanfuType]['name'])) return;
        var currentScale = 0.7;
        var name = avatar2 ? this.name2 : this.name1;
        var allPlayers=game.players.concat(game.dead);
        
        //所有同名武将一起换（加特效）
        var me=this;
        if(!first) allPlayers.forEach(function(current){
           if(current==me) return;
           if(current.name1==name) {
               current.playChangeSkinEffect(false,true);
           }else if(current.name2==name) {
               current.playChangeSkinEffect(true,true);
           }
        });
        
        if (huanfuType == 'huanpifu') {
          switch (game.qhly_getSkinLevel(name, game.qhly_getSkin(name), true)) {
            case 'xiyou': str += 'purple'; act = 2; break;
            case 'shishi': str += 'yellow'; act = 3; break;
            case 'putong': str += 'white'; break;
            case 'yuanhua': str += 'white'; act = 6; break;
            case 'chuanshuo': str += 'gules'; act = 4; break;
            case 'xianding': str += 'gules'; act = 5; break;
            case 'jueban': str += 'gules'; act = 7; break;
            default: str += 'gules'; act = 8; break;
          }
        } else {
          str = 'play';
          currentScale *= 0.65;
        }
        let bool1 = lib.config['extension_十周年UI_newDecadeStyle'] == 'on' ? true : false;
        if (this.doubleAvatar) {
          var currentWidth = bool1 ? 0.068 : 0.06;
          if (avatar2) {   //副将
            window.qhlyUI.assets[huanfuType].clip = {
              x: [0, this.offsetLeft / document.body.offsetWidth + currentWidth + (bool1 ? 0 : 0.02)],
              y: 0,
              width: [0, currentWidth],
              height: [0, 1],
              clipParent: true
            };
            decadeUI.animation.playSpine({ name: window.qhlyUI.assets[huanfuType].name, action: str }, { scale: currentScale, y: [0, 0.5], parent: this });
            decadeUI.animation.playSpine({ name: window.qhlyUI.assets.pinzhi.name, action: 'play' + act }, { scale: 0.3, x: [0, 0.75], y: [0, 0.15], parent: this });
          } else {   //主将
            window.qhlyUI.assets[huanfuType].clip = {
              x: [0, this.offsetLeft / document.body.offsetWidth + (bool1 ? 0 : 0.02)],
              y: 0,
              width: [0, currentWidth],
              height: [0, 1],
              clipParent: true
            }
            decadeUI.animation.playSpine({ name: window.qhlyUI.assets[huanfuType].name, action: str }, { scale: currentScale, x: [0, 0.5], y: [0, 0.5], parent: this });
            decadeUI.animation.playSpine({ name: window.qhlyUI.assets.pinzhi.name, action: 'play' + act }, { scale: 0.3, x: [0, 0.25], y: [0, 0.15], parent: this });
          }
        } else {
          decadeUI.animation.playSpine({ name: window.qhlyUI.assets[huanfuType].name, action: str }, { scale: currentScale, y: [0, 0.5], parent: this });
          if (huanfuType == 'decade') decadeUI.animation.playSpine({ name: window.qhlyUI.assets.pinzhi.name, action: 'play' + act }, { scale: 0.5, y: [0, 0.15], parent: this });
        }
      }

      game.qhly_getDynamicSkin = function (skinName, playerName) {
        if (!window.decadeUI) return false;
        if (!playerName) return false;
        var dskins = dui.dynamicSkin;
        var skins = dskins[playerName];
        if (skins) {
          if (skinName) return skins[skinName];
          else {
            var skin;
            var value = game.qhly_getSkin(playerName);
            if (value) value = value.substring(0, value.lastIndexOf('.'));
            else value = '经典形象';
            if (lib.config.qhly_skinset.djtoggle &&
              lib.config.qhly_skinset.djtoggle[playerName] &&
              lib.config.qhly_skinset.djtoggle[playerName][value]) return false;
            for (var j of Object.keys(skins)) {
              if (j == value) skin = skins[value];
            }
            if (skin) return skin;
            else return false;
          }
        } else return false;
      }
      game.qhly_checkYH = function (player, group) {
        if (lib.config['extension_十周年UI_newDecadeStyle'] == "on") return;
        if (!player || get.itemtype(player) != 'player') return;
        let gro = player.group || group;
        if (!gro) gro = 'weizhi';
        let isYh = false;
        if (player.dynamic) {
          if (player.dynamic.primary && player.dynamic.primary != null && !player.isUnseen(0)) isYh = true;
          if (player.dynamic.deputy && player.dynamic.deputy != null && !player.isUnseen(1)) isYh = true;
          if (player.isDead()) isYh = false;
        }
        let skinYh = player.getElementsByClassName("skinYh");
        if (skinYh.length > 0) skinYh[0].remove();
        if (isYh && skinYh.length == 0) {
          let yh = document.createElement("img");
          yh.classList.add("skinYh");
          yh.src = lib.qhly_path + "image/border/" + gro + ".png";
          yh.onerror = function () {
            yh.src = lib.qhly_path + "image/border/weizhi.png"
          }
          player.appendChild(yh);
        }
      }
      game.playShoushaAvatar = function (node, flip, name) {
        if (!lib.config['extension_千幻聆音_qhly_shoushaTexiao'] || !window.decadeUI) return;
        if (window.dynamicExt == window.eng && !lib.config['extension_EngEX_SSSEffect']) return;
        var mainPlayer = document.getElementById('mainView');
        if (!mainPlayer || !node.dynamic || !node.dynamic.primary || node.dynamic.primary.name != _status.currentTexiao || _status.bigEditing) {
          clearInterval(_status.texiaoTimer);
          clearTimeout(_status.texiaoTimer2);
          return;
        }
        if (game.qhly_hasExtension('皮肤切换') && lib.config[skinSwitch.configKey.useDynamic]) {
          node.isQhlx = true // 表示当前动皮角色是千幻雷修版本的
          window.skinSwitch.postMsgApi.actionGongJi(node)  // 直接调用封装的播放动皮
        } else {
          let res;
          if (window.qhly_newDynamicExt && lib.config['extension_EpicFX_skinEffects']) {
            res = EpicFX.canAction4(node, "GongJi");
            if (!res.ok) return;
            if (res.skin1 && res.skin2) {
              let skin = res["skin" + (Math.ceil(2 * Math.random()))];
              if (skin.decade) EpicFX.playDynamicEffect2(node, "gongji", skin, flip);
              else EpicFX.playDynamicEffect(node, "GongJi", skin, flip);
            } else {
              for (let i = 1; i < 3; i++) {
                let skin = res["skin" + i];
                if (skin) {
                  if (skin.decade) {
                    EpicFX.playDynamicEffect2(node, "gongji", skin, flip);
                  } else {
                    EpicFX.playDynamicEffect(node, "GongJi", skin, flip);
                  }
                }
              }
            }
            return;
          } else {
            function canBeAction(player) {
              let isPrimary = player.dynamic.primary;
              let res = {
                isDouble: false,
                deputy: false,
                needHide: false
              }
              res.dynamic = isPrimary;
              return res;
            }
            res = canBeAction(node);
            if (res) {
              var renderer = node.dynamic.renderer;
              var canvas = node.getElementsByClassName("animation-player")[0];
              //var dynamicWrap = node.getElementsByClassName("qhdynamic-big-wrap")[0];
              renderer.onmessage = function (e) {
                if (e.data) {
                  //if (dynamicWrap) dynamicWrap.style.zIndex = "64";
                  if (canvas) {
                    canvas.style.position = "fixed";
                    canvas.style.height = "100%";
                    canvas.style.width = "100%";
                  }
                  node.style.zIndex = 64;

                  renderer.onmessage = function (e) {
                    if (e.data) {
                      game.playAudio("..", "extension", "EngEX/audio/effect", res.dynamic.name + ".mp3");
                      renderer.onmessage = function (e) {
                        //if (dynamicWrap) dynamicWrap.style.zIndex = "62";
                        if (canvas) {
                          canvas.style.height = null;
                          canvas.style.width = null;
                          canvas.style.position = null;
                        }
                        node.style.zIndex = 62;
                        node.GongJi = false;
                      };
                    }
                  };
                } else {
                  //dynamicWrap = null;
                  canvas = null;
                  renderer = null;
                  res = null;
                }
              };
              var tempX = node.dynamic.primary.x, chukuangX = tempX;
              var tempY = node.dynamic.primary.y, chukuangY = tempY;
              var tempA = node.dynamic.primary.angle || 0, chukuangA = tempA;
              var tempS = node.dynamic.primary.scale || 1, chukuangS = tempS;
              var realName = game.qhly_getRealName(name);
              var skin = game.qhly_getSkin(name);
              var theme = lib.config.qhly_currentViewSkin;
              if (lib.qhly_skinEdit[realName] && lib.qhly_skinEdit[realName][skin] && lib.qhly_skinEdit[realName][skin].bigAvatar && lib.qhly_skinEdit[realName][skin].bigAvatar.chukuang && lib.qhly_skinEdit[realName][skin].bigAvatar.chukuang[theme]) {
                let res2 = lib.qhly_skinEdit[realName][skin].bigAvatar.chukuang[theme];
                if (res2.x != undefined) chukuangX = res2.x;
                if (res2.y != undefined) chukuangY = res2.y;
                if (res2.angle != undefined) chukuangA = res2.angle;
                if (res2.scale != undefined) chukuangS = res2.scale;
              }
              if (renderer.postMessage) renderer.postMessage({
                message: "ACTION",
                id: node.dynamic.id,
                action: "Qhly",
                skinID: res.dynamic.id,
                x: tempX,
                y: tempY,
                scale: tempS,
                angle: tempA,
                chukuangX: chukuangX,
                chukuangY: chukuangY,
                chukuangA: chukuangA,
                chukuangS: chukuangS,
                flipX: flip,
              });
            }
          }
        }
      }
      game.qhly_getRealName = function (name) {
        if (name === undefined) return undefined;
        if (!name) return;
        var realName = name;
        if (lib.qhly_skinShare[name] && lib.qhly_skinShare[name].name) realName = lib.qhly_skinShare[name].name;
        return realName;
      }
      game.qhly_getCoordinate = function (domNode, subtr) {
        if (!domNode && !window.decadeUI) return false;
        var rect = domNode.getBoundingClientRect();
        return {
          x: rect.left,
          y: decadeUI.get.bodySize().height - (subtr ? rect.bottom : 0),
          width: rect.width,
          height: rect.height
        };
      }
      game.qhly_postMessage = function (node, data, mode, noAlert) {
        if (!node.dynamic || !node.dynamic.renderer) return;
        if (!node.dynamic.renderer.postMessage) {
          if (!noAlert) alert('开启过太多动皮，无法调整，请重启游戏！');
          return;
        }
        switch (window.dynamicExt) {
          case window.skinSwitch: {
            skinSwitch.postMsgApi.resizePos(node, mode, data);
          }
            break;
          default: {
            if (mode == 'daiji') node.dynamic.renderer.postMessage(data);
            else if (window.qhly_newDynamicExt) {
              if (mode == 'beijing') node.dynamic.renderer.postMessage(data);
            }
          }
        }
      }
      game.qhly_syncChangeSkinButton = function (name, skin, state) {
        var player = game.filterPlayer(function (current) {
          return current.name1 == name || current.name2 == name;
        })
        if (player.length) player = player[0];
        var skinName = game.qhly_earse_ext(skin), num = 0;
        for (var i = 0; i < 2; i++) {
          var button = document.getElementById('qhlySkinChangebutton' + i);
          if (button) button.remove();
        }
        if (lib.qhly_skinChange[name] && lib.qhly_skinChange[name][skinName]) {
          if (!document.getElementById('qhlySkinChangebutton1')) {
            var buttons = [];
            for (let i = 0; i < 2; i++) {
              buttons[i] = ui.create.div('.qhly-skinChangebutton' + i, state.mainView.skinBar);
              buttons[i].id = 'qhlySkinChangebutton' + i;
              buttons[i].listen(function () {
                if (this.classList.contains('sel')) return;
                for (var j = 0; j < 2; j++) {
                  buttons[j].classList.remove('sel');
                }
                this.classList.add('sel');
                var index = 2 - parseInt(this.id.slice(20));
                window.qhly_audio_redirect[game.qhly_getRealName(name) + '-' + skinName] = lib.qhly_skinChange[game.qhly_getRealName(name)][skinName]['audio' + index];
                game.qhly_setCurrentSkin(name, skin, function () {
                  game.qhly_setOriginSkin(name, skin, state.mainView.avatarImage, state, this.id.slice(20) == '1');
                }.bind(this))
                if (this.id == 'qhlySkinChangebutton1') game.qhly_setPlayerStatus(state.mainView.avatarImage, undefined, 2);
                else game.qhly_setPlayerStatus(state.mainView.avatarImage, undefined, 1);
                if (lib.config.qhly_currentViewSkin == 'shousha') state.mainView.page.skin.refresh(name, state);
                if (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name][skinName]) game.qhly_changeDynamicSkin(state.mainView.avatarImage, skinName, name);
                if (state.mainView.avatarImage.dynamic && state.mainView.avatarImage.dynamic.primary != null) _status.currentTexiao = state.mainView.avatarImage.dynamic.primary.name;
              })
            }
            num = game.qhly_getPlayerStatus(state.mainView.avatarImage, null, name) == 2 ? 1 : 0;
            buttons[num].classList.add('sel');
          } else {
            if (button && button.classList.contains('sel')) {
              window.qhly_audio_redirect[game.qhly_getRealName(name) + '-' + skinName] = lib.qhly_skinChange[game.qhly_getRealName(name)][skinName].audio1;
            } else {
              delete window.qhly_audio_redirect[game.qhly_getRealName(name) + '-' + skinName];
            }
            game.qhly_setCurrentSkin(name, skin);
          }
        }
      }
      //--------------------------------------新增
      if (!lib.qhly_callbackList) {
        lib.qhly_callbackList = [];
      }
      lib.qhly_dirskininfo = {};
      if (!lib.config.qhly_changeSex) lib.config.qhly_changeSex = {};
      game.qhly_importSkinInfo = function (obj) {
        lib.qhly_dirskininfo[obj.name] = obj;
      };
      lib.qhly_filterPlainText = function (str) {
        if (!str) return "";
        var regex = /(<([^>]+)>)/ig;
        return str.replace(regex, "");
      };
      lib.qhly_getSkillKeyWordColorList = function () {
        if (!lib.config.qhly_keymark) return null;
        if (lib.config.qhly_keymark.length == 0) return null;
        var pairs = lib.config.qhly_keymark.split(";");
        var obj = {};
        for (var pair of pairs) {
          var us = pair.split(":");
          if (us[0] && us[1] && us[0].length && us[1].length) {
            obj[us[0]] = us[1];
          }
        }
        return obj;
      };
      String.prototype.replaceAll = function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
      };
      lib.qhly_keyMark = function (str) {
        if (!lib.config.qhly_keymarkopen) return str;
        var obj = lib.qhly_getSkillKeyWordColorList();
        if (!obj) return str;
        for (var k in obj) {
          var v = obj[k];
          if (k.indexOf("#") == 0) {
            var k2 = k.slice(1);
            str = str.replaceAll(k2, "<b style='color:" + v + "'>" + k2 + "</b>");
          } else {
            str = str.replace(k, "<b style='color:" + v + "'>" + k + "</b>");
          }
        }
        return str;
      };
      game.qhly_earseExt = function (path) {
        if (!path) return null;
        var foundDot = path.lastIndexOf('.');
        if (foundDot < 0) return path;
        return path.slice(0, foundDot);
      };
      window.qhly_createConfigWindow = function(title,buttonText,html,idList){
          var window = ui.create.div('.qh-config-win');
          window.qhv = {};
          window.qhv.title = ui.create.div('.qh-config-win-title',window);
          window.qhv.title.innerHTML = title;
          window.qhv.button = ui.create.div('.qh-config-win-button',window);
          window.qhv.button.innerHTML = buttonText;
          window.qhv.text = ui.create.div('.qh-config-win-text',window);
          window.qhv.text.innerHTML = html;
          lib.setScroll(window.qhv.text);
          document.body.appendChild(window);
          if(idList){
            for(var key of idList){
              (function(key){
                var m = document.getElementById(key);
                window.qhv[key] = m;
              })(key);
            }
          }
          return window;
      };
      window.qhly_openPluginWindow = function(){
        var html = "";
        var list = [];
        var plugins = game.qhly_getPlugins(null,false);
        var count = 0;
        var map = {};
        for(var plugin of plugins){
          (function(plugin){
            var name = plugin.label;
            if(!name){
              name = plugin.name;
            }
            var ph = "<h2>"+name+"</h2>";
            ph += "<p>";
            if(plugin.author){
              ph = ph + "插件作者："+plugin.author+"<br>";
            }else{
              ph = ph + "插件作者：未知<br>";
            }
            if(plugin.pluginType){
              ph = ph +"插件类型："+ plugin.pluginType+"<br>";
            }
            if(plugin.intro){
              ph = ph + "<br><font size='2' color='gray'>"+plugin.intro+"</font>";
            }
            ph += ("<br><img id='qhly_pluginwindow_plugin_"+count+"'/>"+
            "<span id='qhly_pluginwindow_plugin_text_"+count+"' style='bottom:10px;'>插件启用</span>");
            list.push("qhly_pluginwindow_plugin_"+count);
            list.push("qhly_pluginwindow_plugin_text_"+count);
            ph += "<br>------------------------------<br>";
            html = html+ph;
            map[count] = plugin;
            count++;
          })(plugin);
        }
        var win = window.qhly_createConfigWindow("插件管理","",html,list);
        var qhv = win.qhv;
        qhv.button.setBackgroundImage('extension/千幻聆音/image/qhly_ok2.png');
        qhv.button.listen(function(){
          win.delete();
          game.qhly_playQhlyAudio('qhly_voc_press', null, true);
        });
        var bindFunc = function (checkbox, text) {
          if (!text) return;
          ui.qhly_addListenFunc(text);
          text.listen(function () {
            game.qhly_playQhlyAudio('qhly_voc_check', null, true);
            checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
          });
        };
        for(var num in map){
          (function(num){
            var plugin = map[num];
            var check = qhv['qhly_pluginwindow_plugin_'+num];
            var isOpen = lib.config.qhly_disabledPlugins?(!lib.config.qhly_disabledPlugins.contains(game.qhly_getPluginId(plugin))):true;
            ui.qhly_initCheckBox(check,isOpen);
            bindFunc(check,qhv['qhly_pluginwindow_plugin_text_'+num]);
            check.qhly_onchecked=function(check){
              if(check){
                if(lib.config.qhly_disabledPlugins){
                  lib.config.qhly_disabledPlugins.remove(game.qhly_getPluginId(plugin));
                  game.saveConfig('qhly_disabledPlugins',lib.config.qhly_disabledPlugins);
                }
              }else{
                if(!lib.config.qhly_disabledPlugins){
                  lib.config.qhly_disabledPlugins = [];
                }
                lib.config.qhly_disabledPlugins.push(game.qhly_getPluginId(plugin));
                game.saveConfig('qhly_disabledPlugins',lib.config.qhly_disabledPlugins);
              }
            };
          })(num);
        }
        return win;
      };
      HTMLDivElement.prototype.qhly_listen = function (func) {
        if (lib.config.touchscreen) {
          this.addEventListener('touchend', function (e) {
            func.call(this, e);
          });
          var fallback = function (e) {
            this.removeEventListener('click', fallback);
          }
          this.addEventListener('click', fallback);
        }
        else {
          this.addEventListener('click', func);
        }
        return this;
      };
      game.saveConfig('qhly_forceall', true);
      if (!lib.qhly_callbackList) {
        lib.qhly_callbackList = [];
      }
      var originGetRarity = game.getRarity;

      game.getRarity = function (name) {
        if (lib.config.qhly_rarity) {
          if (lib.config.qhly_rarity[name]) {
            return lib.config.qhly_rarity[name];
          }
        }
        if (originGetRarity) {
          return originGetRarity(name);
        }
        return 'common';
      };

      if (!get.infoHujia) {
        get.infoHujia = function () {
          return 0;
        }
      }

      ui.qhly_fixTextSize = function (node, size) {
        if (!size) size = 25;
        node.style.fontSize;
        var base = lib.config.qhly_fontsize1;
        if (!base) {
          base = 5;
        }
        if (typeof base == 'string') {
          base = parseInt(base);
        }
        if (base == 5) return size;
        var min = size / 2;
        var middle = size;
        var max = size * 2;
        var unit1 = (middle - min) / 4;
        var unit2 = (max - middle) / 4;
        if (base < 5) {
          node.style.fontSize = (middle - unit1 * (5 - base)).toFixed(2) + "px";
        } else {
          node.style.fontSize = (middle + unit2 * (base - 5)).toFixed(2) + "px";
        }
      };
      //判断文件、文件夹是否存在
      game.qhly_checkFileExist = function (path, callback) {
        if (lib.node && lib.node.fs) {
          try {
            var stat = lib.node.fs.statSync(__dirname + '/' + path);
            callback(stat);
          } catch (e) {
            callback(false);
            return;
          }
        } else {
          resolveLocalFileSystemURL(lib.assetURL + path, (function (name) {
            return function (entry) {
              callback(true);
            }
          }(name)), function () {
            callback(false);
          });
        }
      };
      game.qhly_setOriginSkin = function (name, skin, node, state, skin2, defaultBlur) {
        if (skin != null) {//国战兼容
          if (name.indexOf('gz_') == 0) {
            if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanSkin(name)) {
              var subname = name.slice(3);
              if (get.character(subname)) {
                name = subname;
              }
            }
          }
        }
        var realName = game.qhly_getRealName(name);
        var originFrom = (state.pkg.isExt && realName != name && skin) ? DEFAULT_PACKAGE.skin.standard : state.pkg.skin.standard;
        var originFrom1 = (state.pkg.isExt && realName != name && skin) ? DEFAULT_PACKAGE.skin.origin : state.pkg.skin.origin;
        var originFrom2;
        var position = '50%';
        var setTrue = lib.qhly_skinChange[name] && lib.qhly_skinChange[name][game.qhly_earse_ext(skin)];
        if (skin) {
          if (skin2 && setTrue) {
            originFrom2 = realName + '/' + skin.substr(0, skin.length - 4) + '/' + skin.substr(0, skin.length - 4) + '2';
          }
          else {
            originFrom2 = realName + '/' + skin.substr(0, skin.length - 4);
          }
        }
        else {
          originFrom2 = name + '/' + name;
          skin = '经典形象.jpg';
        }
        originFrom2 += '.jpg';
        let image = new Image();
        image.src = lib.assetURL + originFrom1 + originFrom2;
        let theme = lib.config.qhly_currentViewSkin == 'decade' ? true : false;
        let rarity = document.getElementsByClassName('qh-avatarrarity');
        image.onload = function () {
          let landscape = false;
          if (this.width > this.height && theme) landscape = true;
          node.classList.remove('qh-image-lutou');
          node.classList.add('qh-image-standard');
          if(!defaultBlur&&lib.config.extension_千幻聆音_lutouFixx&&lib.config.extension_千幻聆音_lutouFixx=='all'&&node.classList.contains('qh-image-lutou')) {
            node.classList.add('qh_lutou_refreshview');
          }else {
            node.classList.remove('qh_lutou_refreshview');
          }
          if (theme) {
            node.classList.add('decadeBig');
            if (landscape) {
              node.classList.add('landscape');
              if (rarity) {
                rarity[0].classList.remove('stand');
                rarity[0].classList.add('landscape');
              }
              position = '62%';
            }
            else {
              node.classList.remove('landscape');
              if (rarity) {
                rarity[0].classList.remove('landscape');
                rarity[0].classList.add('stand');
              }
            }
            state.mainView.avatar.classList.add('noBorder');
            state.mainView.avatarBorder.classList.add('noBorder');
          }
          node.style.backgroundImage = 'url(' + image.src + ')';
          node.style.backgroundSize = 'cover';
          var positionArgument = lib.config.qhly_currentViewSkin;
          if (game.qhly_getPlayerStatus(state.mainView.avatarImage, null, state.name) == 2) {
            positionArgument = lib.config.qhly_currentViewSkin + '2';
          }
          if (lib.qhly_skinEdit[realName] && lib.qhly_skinEdit[realName][skin] && lib.qhly_skinEdit[realName][skin][positionArgument]) {
            position = lib.qhly_skinEdit[realName][skin][positionArgument];
          }
          node.style.setProperty('--p', position);
        }
        image.onerror = function () {
          if (state.pkg.isLutou || lib.config.qhly_lutou) {
            node.classList.remove('qh-image-standard');
            node.classList.add('qh-image-lutou');
          }
          if(!defaultBlur&&lib.config.extension_千幻聆音_lutouFixx&&lib.config.extension_千幻聆音_lutouFixx=='all'&&node.classList.contains('qh-image-lutou')) {
            node.classList.add('qh_lutou_refreshview');
          }else {
            node.classList.remove('qh_lutou_refreshview');
          }
          if (theme) {
            node.classList.remove('decadeBig');
            node.classList.remove('landscape');
            if (rarity) {
              rarity[0].classList.remove('stand');
              rarity[0].classList.remove('landscape');
            }
            state.mainView.avatar.classList.remove('noBorder');
            state.mainView.avatarBorder.classList.remove('noBorder');
          }
          if (skin2 && setTrue) {
            node.qhly_origin_setBackgroundImage(originFrom + lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)].image1);
            node.style.backgroundSize = 'cover';
          }
          else node.setBackground(name, 'character');
        }
      }
      game.qhly_playerWindow = function (node) {
        if(get.mode()=='brawl') return;
        if (window.qhly_forbidPlayerWindow) return;             //给其他扩展一个变量接口，方便临时禁用单击武将弹出菜单功能（记得执行完你的功能后设为false哦）
        if (window.all_cailanzi) return;
        const player = node.parentNode;
        //const playerName = node.className == 'primary-avatar' ? player.name1 : player.name2;
        //终于修好了
        const playerName = node.className.indexOf('primary-avatar')!=-1 ? player.name1 : player.name2;
        if (_status.qhly_open || _status.bigEditing || _status.qhly_playerWindowing) return;
        _status.qhly_playerWindowing = true;
        function exit(e) {
          if (e) e.stopPropagation();
          var touch = document.getElementById('qhly_bigBackground');
          var black = document.getElementById('qhly_playerwindowbg');
          _status.qhly_playerWindowing = false;
          if (touch) touch.remove();
          if (black) black.remove();
        }
        var touchbg = ui.create.div('.qhly_bigBackground', document.body);
        touchbg.id = 'qhly_bigBackground';
        touchbg.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', exit);
        var blackbg = ui.create.div('.qhly-playerwindowbg', player);
        if (ui.arena.dataset.newDecadeStyle != 'on' && player.dynamic && (player.dynamic.primary != null || player.dynamic.deputy != null)) blackbg.style.cssText += 'top:-11%;width:104.7%;height:114.5%;border-radius: 300px 182px 30px 30px/80px 65px 30px 30px;'
        //if (ui.arena.dataset.newDecadeStyle != 'on' && player.dynamic && (player.dynamic.primary != null || player.dynamic.deputy != null)) blackbg.style.cssText += 'top:-12%;width:101%;height:113%;border-radius: 300px 182px 20px 20px/80px 65px 20px 20px;'
        blackbg.id = 'qhly_playerwindowbg';
        blackbg.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', exit);
        var buttons = new Array(3);
        for (var i = 0; i < 3; i++) {
          if (player.doubleAvatar || !player.dynamic || player.dynamic && player.dynamic.primary == null) {
            if (i == 2) continue;
          }
          buttons[i] = ui.create.div('.qhly-playerwindowbtn' + i, blackbg);
          buttons[i].id = 'qhly_playerwindowbtn' + i;
          buttons[i].addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function (e) {
            e.stopPropagation();
            exit();
            game.qhly_playQhlyAudio('qhly_voc_dec_press', null, true);
            switch (this.id) {
              case 'qhly_playerwindowbtn0': {//武将信息
                game.qhly_open_new(playerName, lib.config.qhly_doubledefaultpage ? lib.config.qhly_doubledefaultpage : 'skill', node);
              }
                break;
              case 'qhly_playerwindowbtn1': {//换肤小窗
                game.qhly_open_small(playerName, null, node);
              }
                break;
              case 'qhly_playerwindowbtn2': {//调整动皮
                if (player.doubleAvatar) {
                  alert('双将暂不支持编辑动皮');
                  return;
                }
                game.qhly_bigEdit(player);
              }
                break;
            }
          });
        }
      }
      game.qhly_formatDS = function (obj, namex) {
        if (!lib.config['extension_千幻聆音_qhly_formatDS'] || obj._hasFormated) return obj;
        var keys = Object.keys(obj);
        var bianshenFlag = false, texiaoFlag = false;
        for (var key of keys) {
          if (key == 'dynamicBackground') obj.beijing = { name: obj.dynamicBackground };
          if (key == 'beijing') obj.dynamicBackground = obj.beijing.name;
          if (key == 'decade') obj.shizhounian = true;
          if (key == 'shizhounian') obj.decade = true;
          if (key == 'transform' && (obj.transform.low && obj.transform.high || obj.transform.juexingji) && !bianshenFlag) {
            bianshenFlag = true;
            if (obj.transform.low) {
              //let To = eval(obj.transform.low);
              let index = obj.transform.low.indexOf('.') + 1;
              index = obj.transform.low.indexOf('.', index) + 1;
              let To = obj.transform.low.substring(index, obj.transform.low.length).replace('.', '/');
              //let From = eval(obj.transform.high);
              obj.special = {
                变身1: {
                  hp: 2,
                  name: To,
                },
                condition: {
                  lowhp: {
                    transform: ['变身1'],
                    recover: true,
                  },
                }
              }
            } else if (obj.transform.juexingji) {
              let index = obj.transform.juexingji.indexOf('.') + 1;
              index = obj.transform.juexingji.indexOf('.', index) + 1;
              let To = obj.transform.juexingji.substring(index, obj.transform.juexingji.length).replace('.', '/');
              obj.special = {
                变身: {
                  name: To,
                },
                condition: {
                  juexingji: {
                    transform: "变身",
                  },
                }
              }
            }
          }
          else if (key == 'special' && obj.special.condition && !bianshenFlag) {
            bianshenFlag = true;
            if (obj.special.condition.lowhp) {
              let str = obj.special.condition.lowhp.transform;
              if (Array.isArray(str)) str = str[0];
              let To = obj.special[str].name ? obj.special[str].name : obj.name.slice(0, obj.name.lastIndexOf('/'));
              To = 'decadeUI.dynamicSkin.' + To.replace('/', '.');
              let currentSkin = game.qhly_getSkin(namex);
              if (currentSkin) currentSkin = game.qhly_earse_ext(currentSkin);
              let From = 'decadeUI.dynamicSkin.' + namex + '.' + currentSkin;
              obj.transform = {
                low: To,
                high: From,
              }
            } else if (obj.special.condition.juexingji) {
              let str = obj.special.condition.juexingji.transform;
              if (Array.isArray(str)) str = str[0];
              let To = obj.special[str].name ? obj.special[str].name : obj.name.slice(0, obj.name.lastIndexOf('/'));
              To = 'decadeUI.dynamicSkin.' + To.replace('/', '.');
              obj.transform = {
                juexingji: To,
              }
            }
          }
          if (key == 'effects' && !texiaoFlag) {
            texiaoFlag = true;
            if (obj.effects.chuchang) {
              obj.chuchang = {
                name: obj.effects.chuchang,
                action: 'play'
              }
            }
            obj.gongji = obj.effects.gongji;
            if (obj.gongji) obj.gongji.action = 'gongji';
            obj.teshu = obj.effects.jineng;
            if (obj.teshu) obj.teshu.action = 'jineng';
          }
          else if ((key == 'chuchang' || key == 'teshu' || key == 'gongji') && !texiaoFlag) {
            texiaoFlag = true;
            obj.effects = {
              gongji: obj.gongji,
              jineng: obj.teshu,
              chuchang: obj.chuchang,
            }
          }
          if ((obj.shizhounian || obj.decade) && (obj.gongji || obj.teshu)) obj.shan = 'play3';
        }
        obj._hasFormated = true;
        return obj;
      }
      game.qhly_setDoubleGroup = function (state) {
        var group, dg;
        if (lib.config.qhly_doubleGroup && lib.config.qhly_doubleGroup[state.name]) {
          if (lib.config.doubleGroupCharacter && lib.config.doubleGroupCharacter.contains(state.name) || get.is.double(state.name)) {
            dg = true;
            group = lib.config.qhly_doubleGroup[state.name][0] + lib.config.qhly_doubleGroup[state.name][1];
          }
          else group = state.intro[1];
        }
        else {
          const groupList = ['jin', 'wei', 'shu', 'wu', 'qun', 'jin'];
          group = state.intro[1];
          state.group = group;
          if (lib.config.doubleGroupCharacter && lib.config.doubleGroupCharacter.contains(state.name) || get.is.double(state.name)) {
            dg = true;
            if (!lib.config.qhly_doubleGroup) game.saveConfig('qhly_doubleGroup', {});
            if (lib.config.qhly_doubleGroup[state.name]) group = lib.config.qhly_doubleGroup[state.name];
            else if (get.is.double(state.name)) {
              group = get.is.double(state.name, true);
            } else {
              if (groupList.contains(group)) group = [group, groupList[groupList.indexOf(group) + 1]];
              else group = ['jin', 'wei'];
            }
            state.group = [...group];
            group = group[0] + group[1];
          }
        }
        var path;
        switch (group) {
          //“西”势力的修改
          //case 'western': path = 'detail_cong'; group = 'detail_cong'; break;
          case 'western': case 'shu': case 'wu': case 'wei': case 'qun': case 'jin': case 'key': case 'shen': case 'devil': case 'ye': path = group; break;
          default: if (state.pkg.ssborder) path = state.pkg.ssborder;
          else if (dg) path = group;
        }
        if (path) {
          var url1 = `url('${state.pkg.ssborder || 'shousha/'}${group}.png')`;
          var url2 = `url('${state.pkg.ssborder || 'shousha/'}${group}_top.png')`;
          state.mainView.avatarLabel.style.setProperty('--u', url2);
          state.mainView.avatarLabelOther.style.setProperty('--u', url1);
        }
        game.qhly_refreshSShp(state);
      }
      game.qhly_refreshSShp = function (state) {
        var hp = state.intro[2], group;
        if (state.group && Array.isArray(state.group)) group = state.group[1];
        else if (lib.config.qhly_doubleGroup && lib.config.qhly_doubleGroup[state.name]) {
          if (lib.config.doubleGroupCharacter && lib.config.doubleGroupCharacter.contains(state.name) || get.is.double(state.name)) {
            group = lib.config.qhly_doubleGroup[state.name][1];
          }
          else group = state.intro[1];
        }
        else group = state.intro[1];
        var hpBorder;
        switch (group) {
          case 'shu': hpBorder = 'red'; break;
          case 'wu': hpBorder = 'green'; break;
          case 'wei': hpBorder = 'blue'; break;
          case 'qun': hpBorder = 'yellow1'; break;
          case 'shen': hpBorder = 'yellow2'; break;
          case 'jin': case 'ye': hpBorder = 'purple'; break;
          default: hpBorder = state.pkg.sshpBorder && state.pkg.sshpBorder[group];
        }
        var HP = 0, MAXHP = 0, hpNode;//血量 空血量
        if (typeof hp == 'string') {
          hp2 = hp.split('/');
          if (hp2.length > 1) {
            HP = hp2[0];
            MAXHP = hp2[1];
          } else {
            HP = hp2[0];
          }
        } else HP = hp;
        function getWidth(str, index) {
          let len = str.length;
          let words = str.charAt(index);
          let onenum = str.match(/1/g);
          if (onenum) {
            onenum = onenum.length;
            let result = 0;
            result = 2 / (onenum + (len - onenum) * 1.64);
            if (words == '1') return result.toFixed(2) + 'em';
            else return (1.64 * result).toFixed(2) + 'em';
          } else return 2 / len.toFixed(2) + 'em';
        }
        state.mainView.hp.innerHTML = '';
        var slimName = state.name.split('_');
        slimName = slimName[slimName.length - 1];
        const excludeName = ['xiahouyuan', 'guanyu', 'sunjian', 'simashi', 'lvbu'];
        if (state.mainView.skinTypeGuozhan) {  //显示国战血量
          if (get.mode() != 'guozhan' && excludeName.contains(slimName) && state.name != 're_lvbu') HP++;//非国战模式下除界吕布以外角色显示普通模式血量+1
          HP = HP *= 0.5;
          if (HP <= 5) {
            for (var i = 0; i < Math.floor(HP); i++) {
              hpNode = ui.create.div('.qh-hpGZtext', state.mainView.hp);
              if (hpBorder) {
                var url1 = `url('shousha/chr_detail_guo_hp_${hpBorder}.png')`;
                hpNode.style.setProperty('--u', url1);
              }
            }
            if (HP % 1 != 0) {
              var url2 = `url('shousha/chr_detail_guo_hp_${hpBorder}_2.png')`;
              hpNode = ui.create.div('.qh-hpGZtext.blank', state.mainView.hp);
              hpNode.style.setProperty('--ub', url2);
            }
          } else {
            HP = HP + '';
            hpNode = ui.create.div('.qh-hptextnumber', state.mainView.hp);
            for (var i = 0; i < HP.length; i++) {
              var hpNumber = ui.create.div('.qh-hpnumber', hpNode);
              hpNumber.style.backgroundImage = 'url(' + lib.qhly_path + 'theme/shousha/hp_num_' + HP.substr(i, 1) + '.png)';
            }
            hpNode = ui.create.div('.qh-hpGZtext', state.mainView.hp);
            hpNode.style.backgroundImage = 'url(' + lib.qhly_path + 'theme/shousha/hp_num_x.png)';
            hpNode = ui.create.div('.qh-hpGZtext', state.mainView.hp);
            if (hpBorder) {
              var url = `url('shousha/chr_detail_guo_hp_${hpBorder}.png')`;
              hpNode.style.setProperty('--u', url);
            }
          }
        } else {  //显示其他模式血量
          if (get.mode() == 'guozhan' && HP == 5) {
            if (state.name != 'gz_jin_simashi') HP--;//国战模式下5血角色显示普通模式血量-1
            else {
              HP = 3;
              MAXHP = 4;
            }
          }
          if (HP > 5 || MAXHP > 5) {
            HP = HP + '';
            if (MAXHP) MAXHP = MAXHP + '';
            hpNode = ui.create.div('.qh-hptextnumber', state.mainView.hp);
            if (MAXHP) {
              for (var i = 0; i < MAXHP.length; i++) {
                var hpNumber = ui.create.div('.qh-hpnumber', hpNode);
                hpNumber.style.backgroundImage = 'url(' + lib.qhly_path + 'theme/shousha/hp_num_' + MAXHP.substr(i, 1) + '.png)';
                hpNumber.style.setProperty('--w', getWidth(MAXHP, i));
              }
              ui.create.div('.qh-hpsplit', state.mainView.hp);
            }
            hpNode = ui.create.div('.qh-hptextnumber', state.mainView.hp);
            for (var i = 0; i < HP.length; i++) {
              var hpNumber = ui.create.div('.qh-hpnumber', hpNode);
              hpNumber.style.backgroundImage = 'url(' + lib.qhly_path + 'theme/shousha/hp_num_' + HP.substr(i, 1) + '.png)';
              hpNumber.style.setProperty('--w', getWidth(HP, i));
            }
            if (!MAXHP) {
              hpNode = ui.create.div('.qh-hptext', state.mainView.hp);
              hpNode.style.cssText = `width:1.5em;height:1.5em;margin-bottom:0.4em;background-image:url(${lib.qhly_path}theme/shousha/hp_num_x.png)`
            }
            hpNode = ui.create.div('.qh-hptext', state.mainView.hp);
            if (hpBorder) {
              var url1 = `url('shousha/chr_detail_hp_${hpBorder}.png')`;
              var url2 = `url('shousha/chr_detail_hp_${hpBorder}_none.png')`;
              hpNode.style.setProperty('--u', url1);
              hpNode.style.setProperty('--ub', url2);
            }
          } else {
            for (var i = 0; i < HP; i++) {
              hpNode = ui.create.div('.qh-hptext', state.mainView.hp);
              if (hpBorder) {
                var url1 = `url('shousha/chr_detail_hp_${hpBorder}.png')`;
                var url2 = `url('shousha/chr_detail_hp_${hpBorder}_none.png')`;
                hpNode.style.setProperty('--u', url1);
                hpNode.style.setProperty('--ub', url2);
              }
            }
            if (MAXHP) {
              for (var i = 0; i < (MAXHP - HP); i++) {
                hpNode = ui.create.div('.qh-hptext.blank', state.mainView.hp);
                if (hpBorder) {
                  var url1 = `url('shousha/chr_detail_hp_${hpBorder}.png')`;
                  var url2 = `url('shousha/chr_detail_hp_${hpBorder}_none.png')`;
                  hpNode.style.setProperty('--u', url1);
                  hpNode.style.setProperty('--ub', url2);
                }
              }
            }
          }
        }
      }
      window.qhly_checkObject = function (str, parent) {
        if (!parent) {
          parent = window;
        }
        var arr = [];
        if (typeof str == 'string') {
          if (str.indexOf(".") < 0) {
            return parent[str];
          }
          arr = str.split(".");
          return window.qhly_checkObject(arr, parent);
        } else {
          arr = str;
        }
        if (arr.length == 0) return false;
        if (arr.length == 1) return parent[arr[0]];
        var m = arr[0];
        var n = parent[m];
        if (!n) return false;
        return window.qhly_checkObject(arr.slice(1), n);
      };
      if (window.qhly_checkObject("configMenu.appearence.config.name_font.item", lib)) {
        var fontConfigs = [lib.configMenu.appearence.config.name_font.item,
        lib.configMenu.appearence.config.identity_font.item,
        lib.configMenu.appearence.config.cardtext_font.item,
        lib.configMenu.appearence.config.global_font.item];
        var fonts = {
          'qh_heiti': "黑体",
          'qh_zhunyuan': '准圆',
          'qh_youyuan': '幼圆',
          'qh_weili': "魏隶",
          'qh_songhei': '宋黑',
        };
        for (var i of fontConfigs) {
          for (var j in fonts) {
            i[j] = fonts[j];
          }
        }
      }


      if (!lib.config.qhly_currentMusic) {
        lib.config.qhly_currentMusic = 'system';
      }

      //if(lib.config.qhly_newui === undefined){
      lib.config.qhly_newui = true;
      game.saveConfig('qhly_newui', true);
      //}
      if (ui && ui.css && ui.css.fontsheet && ui.css.fontsheet.sheet && ui.css.fontsheet.sheet.insertRule) {
        ui.css.fontsheet.sheet.insertRule("@font-face {font-family: 'qh_heiti';src: url('" + lib.qhly_path + "font/heiti.ttf');}", 0);
        ui.css.fontsheet.sheet.insertRule("@font-face {font-family: 'qh_zhunyuan';src: url('" + lib.qhly_path + "font/zhunyuan.ttf');}", 0);
        ui.css.fontsheet.sheet.insertRule("@font-face {font-family: 'qh_youyuan';src: url('" + lib.qhly_path + "font/youyuan.ttf');}", 0);
        ui.css.fontsheet.sheet.insertRule("@font-face {font-family: 'qh_songhei';src: url('" + lib.qhly_path + "font/songhei.ttf');}", 0);
        ui.css.fontsheet.sheet.insertRule("@font-face {font-family: 'qh_weili';src: url('" + lib.qhly_path + "font/weili.ttf');}", 0);
      } else {
        ui.qhlycss = lib.init.sheet();
        ui.qhlycss.sheet.insertRule("@font-face {font-family: 'qh_heiti';src: url('" + lib.qhly_path + "font/heiti.ttf');}", 0);
        ui.qhlycss.sheet.insertRule("@font-face {font-family: 'qh_zhunyuan';src: url('" + lib.qhly_path + "font/zhunyuan.ttf');}", 0);
        ui.qhlycss.sheet.insertRule("@font-face {font-family: 'qh_youyuan';src: url('" + lib.qhly_path + "font/youyuan.ttf');}", 0);
        ui.qhlycss.sheet.insertRule("@font-face {font-family: 'qh_songhei';src: url('" + lib.qhly_path + "font/songhei.ttf');}", 0);
        ui.qhlycss.sheet.insertRule("@font-face {font-family: 'qh_weili';src: url('" + lib.qhly_path + "font/weili.ttf');}", 0);
      }
      //关闭无名杀原有的换肤功能
      if (lib.config.change_skin) {
        game.saveConfig('change_skin', false);
        //alert("请注意：本扩展功能将替代无名杀原生的换肤设置，为你带来更优秀的角色信息浏览体验。");
      }

      var originDiv = ui.create.div;
      ui.create.div = function () {
        try {
          return originDiv.apply(this, arguments);
        } catch (e) {
          console.log(e);
          if (QHLY_DEBUGMODE) {
            throw e;
          }
          return originDiv.apply(this, []);
        }
      };

      //将无名杀原有的换肤数据存档，并清空。
      if (lib.config.skin && lib.config.skin.qhly_config != 'yes') {
        game.saveConfig('qhly_save_offical_skin', lib.config.skin);
        game.saveConfig('skin', { 'qhly_config': 'yes' });
      }

      lib.qhly_lihui = {};

      if (game.getFileList && lib.config.qhly_lihuiSupport) {
        game.qhly_checkFileExist('extension/千幻聆音/lihui', function (s) {
          var earseExt = function (path) {
            if (!path) return null;
            var foundDot = path.lastIndexOf('.');
            if (foundDot < 0) return path;
            return path.slice(0, foundDot);
          };
          if (s) {
            game.getFileList('extension/千幻聆音/lihui', function (folders, files) {
              if (files) {
                for (var file of files) {
                  lib.qhly_lihui[earseExt(file)] = file;
                }
              }
            });
          }
        });
      }
      if (get.mode() == 'guozhan' && game.getFileList && lib.config.qhly_guozhan !== false) {
        var cpath = lib.config.qhly_originSkinPath == 'extension/千幻聆音/sanguolutouskin/' ? 'extension/千幻聆音/sanguolutouskin' : 'extension/千幻聆音/sanguoskin';
        game.qhly_checkFileExist(cpath, function (s) {
          if (s) {
            game.getFileList(cpath, function (folders, files) {
              lib.config.qhly_gzskinList = [];
              if (folders && folders.length) {
                for (var n of folders) {
                  if (n.indexOf('gz_') == 0) {
                    lib.config.qhly_gzskinList.add(n);
                  }
                }
              }
              game.saveConfig('qhly_gzskinList', lib.config.qhly_gzskinList);
            });
          }
        });
        game.qhly_checkFileExist('extension/千幻聆音/sanguoaudio', function (s) {
          if (s) {
            game.getFileList('extension/千幻聆音/sanguoaudio', function (folders, files) {
              lib.config.qhly_gzaudioList = [];
              if (folders && folders.length) {
                for (var n of folders) {
                  if (n.indexOf('gz_') == 0) {
                    lib.config.qhly_gzaudioList.add(n);
                  }
                }
              }
              game.saveConfig('qhly_gzaudioList', lib.config.qhly_gzaudioList);
            });
          }
        });
      }
      game.qhly_hasGuozhanSkin = function (name) {
        if (lib.config.qhly_gzskinList && lib.config.qhly_guozhan !== false) {
          return lib.config.qhly_gzskinList.contains(name);
        }
        return false;
      };
      game.qhly_editDialog = function (title, detail, initValue, onok, onclose) {
        if (!_status.qhly_editDialogId) {
          _status.qhly_editDialogId = 0;
        }
        var id = _status.qhly_editDialogId;
        _status.qhly_editDialogId++;

        var dialog = ui.create.div('.qh-editdialog');
        if (lib.config.qhly_currentViewSkin == 'decade') dialog.classList.add('decade')
        var content = ui.create.div('.qh-editdialog-inner', dialog);
        var below = ui.create.div('.qh-editdialog-below', dialog);
        var text = "<h2>" + title + "</h2>";
        if (detail) {
          text += "<p>" + detail + "</p>";
        }
        text += '<textarea id="qhly_edit_text' + id + '" style="width:100%;height:80px;"></textarea><br><br>'
        var belowButton = "";
        belowButton += '<img src="' + lib.qhly_path + 'image/qhly_ok2.png" id="qhly_edit_okbutton' + id + '"/>&nbsp;&nbsp;&nbsp;&nbsp;';
        belowButton += '<img src="' + lib.qhly_path + 'image/qhly_cancel2.png" id="qhly_edit_cancelbutton' + id + '"/>';
        content.innerHTML = text;
        below.innerHTML = belowButton;
        document.body.appendChild(dialog);
        var img1 = document.getElementById('qhly_edit_okbutton' + id);
        var img2 = document.getElementById('qhly_edit_cancelbutton' + id);
        var input = document.getElementById('qhly_edit_text' + id);
        if (initValue) input.value = initValue;
        ui.qhly_addListenFunc(img1);
        ui.qhly_addListenFunc(img2);
        img1.listen(function () {
          if (onok) {
            onok(input.value, dialog);
          }
        });
        img2.listen(function () {
          if (onclose) {
            if (onclose(dialog)) {
              dialog.delete();
            }
          } else {
            dialog.delete();
          }
        });
        input.focus();
        return dialog;
      };
      game.qhly_hasGuozhanAudio = function (name) {
        if (lib.config.gzaudioList && lib.config.qhly_guozhan !== false) {
          return lib.config.qhly_gzaudioList.contains(name);
        }
        return false;
      };
      if (!lib.config.qhly_order) {
        game.saveConfig('qhly_order', {});
      }
      game.qhly_handleRect = function (rect) {
        if (game.qhly_hasExtension('十周年UI')) return rect;
        return {
          width: rect.width / game.documentZoom,
          height: rect.height / game.documentZoom,
          left: rect.left / game.documentZoom,
          top: rect.top / game.documentZoom,
          bottom: rect.bottom / game.documentZoom,
          right: rect.right / game.documentZoom,
        };
      };
      game.qhly_isForbidAI = function (name) {
        if (lib.config.forbidai && lib.config.forbidai.contains(name)) return true;
        if (lib.config.forbidai_user && lib.config.forbidai_user.contains(name)) return true;
        return false;
      };
      game.qhly_setForbidAI = function (name, forbid) {
        if (forbid !== false) {
          if (lib.config.forbidai) {
            lib.config.forbidai.add(name);
          } else {
            lib.config.forbidai = [name];
          }
          if (lib.config.forbidai_user) {
            lib.config.forbidai_user.add(name);
          } else {
            lib.config.forbidai_user = [name];
          }
        } else {
          if (lib.config.forbidai) {
            lib.config.forbidai.remove(name);
          } else {
            lib.config.forbidai = [];
          }
          if (lib.config.forbidai_user) {
            lib.config.forbidai_user.remove(name);
          } else {
            lib.config.forbidai_user = [];
          }
        }
        game.saveConfig('forbidai', lib.config.forbidai);
        game.saveConfig('forbidai_user', lib.config.forbidai_user);
      };
      game.qhly_getSkillSkin = function (name, skin, skill, pkg) {
        if (!pkg) pkg = game.qhly_foundPackage(name);
        if (!pkg) return null;
        if (!pkg.skillSkin) return null;
        if (typeof pkg.skillSkin != 'function') return null;
        var ret = pkg.skillSkin(name, skin, skill);
        if (!ret) return null;
        return ret;
      };
      game.qhly_getOrder = function (name, skin, pkg) {
        var ord = 0;
        if (lib.config.qhly_order[name + '-' + skin]) {
          ord = lib.config.qhly_order[name + '-' + skin];
        }
        if (ord !== 0) {
          ord = parseInt(ord);
          if (!isNaN(ord)) {
            return ord;
          }
        }
        if (!pkg) pkg = game.qhly_foundPackage(name);
        var info = game.qhly_getSkinInfo(name, skin, pkg);
        if (info && info.order) {
          return info.order;
        }
        ord = parseInt(game.qhly_earse_ext(skin));
        if (!isNaN(ord)) {
          return ord;
        }
        return 0;
      };
      game.qhly_setOrder = function (name, skin, order) {
        if (order === undefined) {
          delete lib.config.qhly_order[name + '-' + skin];
          game.saveConfig('qhly_order', lib.config.qhly_order);
          return;
        }
        lib.config.qhly_order[name + '-' + skin] = order;
        game.saveConfig('qhly_order', lib.config.qhly_order);
      };
      game.qhly_genId = function () {
        if (!_status.qhly_genId) {
          _status.qhly_genId = 1;
        } else {
          _status.qhly_genId++;
        }
        return _status.qhly_genId;
      };
      game.qhly_parseConfig = function (obj) {
        if (!_status.qhly_config_selfedit_id) {
          _status.qhly_config_selfedit_id = 1;
        } else {
          _status.qhly_config_selfedit_id++;
        }
        var str = "";
        var image = obj.image ? obj.image : "extension/千幻聆音/image/qhly_pic_config.png";
        var title = obj.title ? obj.title : "自定义设置";
        var text = obj.text ? obj.text : "";
        str += "<h2><img src='";
        str += lib.assetURL + image + "' style='width:50px'/>";
        str += title;
        str += "</h2>";
        if (text.length) {
          str += "<p>" + text + "</p>";
        }
        var onfinish = function () {

        };
        if (['checkboxList', '复选框'].contains(obj.type)) {
          var items = obj.items ? obj.items : [];
          var oncheck = obj.oncheck ? obj.oncheck : function () { };
          var checkboxRef = {};
          for (var item of items) {
            var id = "qhly_selfedit_checkbox_" + game.qhly_genId();
            checkboxRef[id] = item;
            str += "<p><span style='display:inline-block;height:30px;'><img id='" + id + "'/><span id='" + id + "_text' style='display:inline-block;position:relative;bottom:25%;'>";
            if (typeof item == 'string') {
              str += item;
            } else {
              str += item.name;
            }
            str += "</span></span></p>";
          }
          var bindFunc = function (checkbox, text) {
            if (!text) return;
            ui.qhly_addListenFunc(text);
            text.listen(function () {
              game.qhly_playQhlyAudio('qhly_voc_check', null, true);
              checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
            });
          };
          onfinish = function (view) {
            for (var id in checkboxRef) {
              var item = checkboxRef[id];
              var current = item.current;
              if (typeof current == 'function') {
                current = current();
              }
              var checkbox = document.getElementById(id);
              var checkboxText = document.getElementById(id + "_text");
              ui.qhly_initCheckBox(checkbox, current ? true : false);
              bindFunc(checkbox, checkboxText);
              (function (checkbox, item) {
                checkbox.qhly_onchecked = function (check) {
                  oncheck(item, check);
                };
              })(checkbox, item);
            }
          };
        } else if (['selectList', '下拉列表'].contains(obj.type)) {
          var id = "qhly_selfedit_select_" + game.qhly_genId();
          str += "<p><select style='font-size:22px;font-family:'qh_youyuan';' id='" + id + "'></select></p>";
          onfinish = function (view) {
            var select = document.getElementById(id);
            var items = obj.items ? obj.items : {};
            var current = typeof obj.current == 'function' ? obj.current() : obj.current;
            for (var key in items) {
              var opt = document.createElement('option');
              opt.innerHTML = items[key];
              opt.setAttribute('key', key);
              if (current == key) {
                opt.selected = 'selected';
              }
              select.appendChild(opt);
            }
            select.onchange = function (e) {
              var event = e ? e : window.event;
              if (event.target) {
                target = event.target;
                var opt = target[target.selectedIndex];
                if (opt) {
                  var key = opt.getAttribute('key');
                  if (obj.onchange) {
                    obj.onchange(key);
                  }
                }
              }
            };
          };
        }
        return {
          content: str,
          onfinish: onfinish,
        };
      };
      //默认皮肤包
      window.DEFAULT_PACKAGE = {
        isExt: false,//不是扩展武将
        fromExt: false,
        filterCharacter: function (name) {
          return true;//对所有角色生效
        },
        skininfo: function (name, skinname) {
          if (lib.qhly_sanguoskininfo) {
            return lib.qhly_sanguoskininfo[name + '-' + skinname];
          }
          return null;
        },
        characterTaici: function (name) {
          if (lib.qhly_sanguotaici) {
            return lib.qhly_sanguotaici[name];
          }
          return null;
        },
        characterLihui: function (name, skin) {
          if (!lib.config.qhly_lihuiSupport) return null;
          skin = game.qhly_earse_ext(skin);
          if (skin) {
            if (lib.qhly_lihui[name + '-' + skin]) {
              return 'extension/千幻聆音/lihui/' + lib.qhly_lihui[name + '-' + skin];
            }
            if (!lib.config.qhly_nolihuiOrigin) return null;
          }
          if (lib.qhly_lihui[name]) {
            return 'extension/千幻聆音/lihui/' + lib.qhly_lihui[name];
          }
          return null;
        },
        prefix: 'image/character/',//武将原图在image/character内
        skin: {
          standard: (lib.config.qhly_originSkinPath ? lib.config.qhly_originSkinPath : 'extension/千幻聆音/sanguoskin/'),//皮肤图片在千幻聆音扩展内的位置。
          origin: 'extension/千幻聆音/sanguoyuanhua/',//皮肤原画在千幻聆音扩展内的位置。
        },
        //ssborder: 'shousha/',//手杀边框
        audioOrigin: '',
        audio: 'extension/千幻聆音/sanguoaudio/',//皮肤配音文件在千幻聆音扩展内的位置。
      };

      //初始化一个皮肤包的数组，后面会经常扫描这个数组以找到武将的皮肤。
      if (!lib.qhlypkg) {
        lib.qhlypkg = [];
      }

      if (!lib.qhlyMusic) {
        lib.qhlyMusic = {};
      }

      if (!lib.qhlyPlugins) {
        lib.qhlyPlugins = [];
      }
      var systemMusics = {
        'music_default': '默认',
        'music_danji': '千里走单骑',
        'music_jifeng': '祭风',
        'music_jilve': '极略',
        'music_phliosophy': 'Phliosophy Of Ours',
        'music_shezhan': '舌战群儒',
        'music_diaochan': '貂蝉',
        'aozhan_chaoming': '潮鸣',
        'aozhan_online': 'Online鏖战',
        'aozhan_rewrite': 'Rewrite',
      };

      for (var k in systemMusics) {
        lib.qhlyMusic['audio/background/' + k + '.mp3'] = {
          name: systemMusics[k],
          path: 'audio/background/' + k + '.mp3',
        };
      }

      if (!lib.qhlyDefaultMusic) {
        lib.qhlyDefaultMusic = {};
      }

      if (!lib.config.qhly_characterMusic) {
        lib.config.qhly_characterMusic = {};
      }

      if (!lib.qhly_characterMusicMapper) {
        lib.qhly_characterMusicMapper = [];
      }

      lib.qhly_characterMusicMapper.push(function (name) {
        if (get.character(name, 1) == 'key') {
          return 'audio/background/aozhan_chaoming.mp3';
        }
      });
      game.qhly_getCharacterPackage = function (name) {
        for (var i in lib.characterPack) {
          if (lib.characterPack[i] && lib.characterPack[i][name]) {
            return i;
          }
        }
        return null;
      };

      game.qhly_getCharacterMusic = function (name) {
        var ret = lib.config.qhly_characterMusic[name];
        if (ret) return ret;
        ret = lib.qhlyDefaultMusic[name];
        var priority = -Infinity;
        for (var func of lib.qhly_characterMusicMapper) {
          var rf = func(name);
          if (!rf) continue;
          if (typeof rf == 'string') {
            var p = rf;
            rf = {
              path: p,
              priority: 1,
            };
          }
          if (!rf.priority) {
            rf.priority = 1;
          }
          if (rf.priority > priority) {
            priority = rf.priority;
            ret = rf.path;
          }
        }
        return ret;
      };

      game.qhly_getCurrentMusic = function () {
        var ret = null;
        if (lib.config['qhly_modemusicconfig_' + get.mode()] && lib.config['qhly_modemusicconfig_' + get.mode()] != 'system') {
          ret = lib.config['qhly_modemusicconfig_' + get.mode()];
        }
        if (lib.config.qhly_enableCharacterMusic) {
          if (game.me) {
            var m = null;
            if (game.me.name && game.me.name.indexOf('unknown') != 0) {
              m = game.qhly_getCharacterMusic(game.me.name);
            } else if (game.me.name1) {
              m = game.qhly_getCharacterMusic(game.me.name1);
            }
            if (m) {
              ret = m;
            }
          }
        }
        if (!ret) {
          ret = lib.config.qhly_currentMusic;
        }
        if (ret && ret != 'system' && ret != 'random') {
          return ret;
        }
        if (ret == 'random') {
          return Object.keys(lib.qhlyMusic).randomGet();
        }
        return 'audio/background/music_default.mp3';
      };

      if (lib.config.qhly_enableCharacterMusic || lib.config.qhly_currentMusic != 'system') {
        game.playBackgroundMusic = function () {
          if (!ui.qhly_backgroundMusic) {
            ui.qhly_backgroundMusic = document.createElement('audio');
            if (ui.backgroundMusic) {
              ui.backgroundMusic.remove();
            }
            ui.backgroundMusic = ui.qhly_backgroundMusic;
            ui.backgroundMusic.volume = lib.config.volumn_background / 8;
            ui.backgroundMusic.autoplay = true;
            ui.backgroundMusic.addEventListener('ended', game.playBackgroundMusic);
          }
          if (_status.qhly_tempBgm) {
            ui.backgroundMusic.src = lib.assetURL + _status.qhly_tempBgm;
          } else {
            ui.backgroundMusic.src = lib.assetURL + game.qhly_getCurrentMusic();
          }
          //alert(ui.backgroundMusic.src);
        };
      }

      get.qhly_urldecode = function (zipStr) {
        var uzipStr = '';
        for (var i = 0; i < zipStr.length; i += 1) {
          var chr = zipStr.charAt(i);
          if (chr === '+') {
            uzipStr += ' ';
          } else if (chr === '%') {
            var asc = zipStr.substring(i + 1, i + 3);
            if (parseInt('0x' + asc) > 0x7f) {
              uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i + 3, i + 9).toString());
              i += 8;
            } else {
              uzipStr += String.fromCharCode(parseInt('0x' + asc));
              i += 2;
            }
          } else {
            uzipStr += chr;
          }
        }
        return uzipStr;
      };

      game.qhly_switchBgm = function (path, replay) {
        if (path) {
          _status.qhly_tempBgm = path;
        } else {
          delete _status.qhly_tempBgm;
          path = game.qhly_getCurrentMusic();
        }
        if (!replay && ui.backgroundMusic.src && get.qhly_urldecode(ui.backgroundMusic.src).endsWith(path)) {
          return;
        }
        game.playBackgroundMusic();
      };
      lib.translate.victory = '胜利';
      lib.skill._qhly_bgm = {
        popup: false,
        forced: true,
        lastDo: true,
        trigger: {
          global: 'gameStart',
        },
        filter: function (event, player) {
          if (event.qhly_bgmflag) return false;
          return lib.config.qhly_enableCharacterMusic;
        },
        content: function () {
          trigger.qhly_bgmflag = true;
          game.playBackgroundMusic();
        }
      };

      if (!lib.qhly_groupimage) {
        lib.qhly_groupimage = {};
      }
      lib.qhly_groupimage['wei'] = 'extension/千幻聆音/image/name_wei.webp';
      lib.qhly_groupimage['shu'] = 'extension/千幻聆音/image/name_shu.webp';
      lib.qhly_groupimage['wu'] = 'extension/千幻聆音/image/name_wu.webp';
      lib.qhly_groupimage['qun'] = 'extension/千幻聆音/image/name_qun.webp';
      lib.qhly_groupimage['jin'] = 'extension/千幻聆音/image/name_jin.webp';
      lib.qhly_groupimage['shen'] = 'extension/千幻聆音/image/name_shen.webp';
      lib.qhly_groupimage['daqin'] = 'extension/千幻聆音/image/name_daqin.webp';
      lib.qhly_groupimage['key'] = 'extension/千幻聆音/image/name_key.webp';

      if (!lib.qhly_groupcolor) {
        lib.qhly_groupcolor = {};
      }
      lib.qhly_groupcolor['wei'] = "#0000CD";
      lib.qhly_groupcolor['shu'] = "#B22222";
      lib.qhly_groupcolor['wu'] = "#32CD32";
      lib.qhly_groupcolor['qun'] = "#B5B5B5";
      lib.qhly_groupcolor['jin'] = "#68228B";
      lib.qhly_groupcolor['shen'] = "#FFFF00";
      lib.qhly_groupcolor['daqin'] = "#FFD700";
      lib.qhly_groupcolor['key'] = "#9400D3";


      if (!lib.config.qhly_currentViewSkin) {
        lib.config.qhly_currentViewSkin = 'shousha';
        game.saveConfig('qhly_currentViewSkin', lib.config.qhly_currentViewSkin);
      }



      get.qhly_getIf = function (originValue, fallback) {
        if (originValue) return originValue;
        return fallback;
      };

      game.qhly_changeViewSkin = function (view) {
        var skin = lib.qhly_viewskin[lib.config.qhly_currentViewSkin];
        if (skin) {
          skin.changeViewSkin(view);
        }
      };

      game.qhly_changeViewPageSkin = function (page, view) {
        var skin = lib.qhly_viewskin[lib.config.qhly_currentViewSkin];
        if (skin) {
          skin.skinPage(page, view);
        }
      }


      get.qhly_viewSkinSet = function () {
        var ret = {};
        for (var k in lib.qhly_viewskin) {
          if (lib.qhly_viewskin[k].name) {
            ret[k] = lib.qhly_viewskin[k].name;
          } else {
            ret[k] = k;
          }
        }
        return ret;
      };
      game.qhly_bigEdit = function (state, bg) {
        _status.bigEditing = true;
        const editObject = get.itemtype(state) == 'player' ? 'player' : 'bigAvatar';
        var name = game.qhly_getRealName(state.name);
        //Helasisy修：如真列表编辑动皮报错
        let themeType = 'shousha';
        if(ui.arena) themeType = ui.arena.dataset.newDecadeStyle == 'on' ? 'decade' : 'shousha';
        const theme = editObject == 'player' ? themeType : lib.config.qhly_currentViewSkin;
        var skin = game.qhly_getSkin(state.name);
        if (skin == null) {
          name = state.name;
          skin = '经典形象.jpg';
        }
        var editDynamic = true;//编辑动态还是静态
        var editMode = "daiji";//调整人物、背景还是出框
        _status.qhly_editMode = editMode;
        _status.qhly_disAble = true;//初始手势可调整距离，不可调整角度
        _status.qhly_rotaAble = false;
        var gestureS, gestureA;
        var focus = editObject == 'player' ? state : state.mainView.avatarImage;
        if (editObject != 'player') focus.style.setProperty('--w', (1 / game.documentZoom) + 'vw');//适配屏幕缩放
        var originPostion = focus.style.getPropertyValue('--p');
        var blackbg = ui.create.div('.qhly_blackbg', bg || document.body);
        blackbg.setAttribute('theme', themeType);
        var touchTimer = null;
        var tempPosition = originPostion;
        var temp = {
          daiji: {},
          beijing: {},
          chukuang: {},
        };
        if (!focus.dynamic || focus.dynamic && focus.dynamic.primary == null) editDynamic = false;
        if (editDynamic) {
          var editArgument1 = 'dynamic', editArgument2 = 'beijing';
          if (game.qhly_getPlayerStatus(focus, null, name) == 2) {
            editArgument1 = 'dynamic2';
            editArgument2 = 'beijing2';
          }
          var pp = game.qhly_getCoordinate(focus, true);
          var canvas = focus.getElementsByClassName("animation-player")[0];
          temp.qhly_resizeRatio = focus.dynamic.primary.qhly_resizeRatio || 1;
          temp.daiji.x = focus.dynamic.primary.x;
          if (Array.isArray(temp.daiji.x)) temp.daiji.x[0] = 0;
          temp.daiji.y = focus.dynamic.primary.y;
          if (Array.isArray(temp.daiji.y)) temp.daiji.y[0] = 0;
          temp.daiji.scale = focus.dynamic.primary.scale || 1;
          temp.daiji.angle = focus.dynamic.primary.angle || 0;
          var dynamicX = [...temp.daiji.x], dynamicY = [...temp.daiji.y], dynamicS = temp.daiji.scale, dynamicA = temp.daiji.angle;
          if (focus.dynamic.primary.beijing) {
            temp.beijing.x = focus.dynamic.primary.beijing.x || [0, 0.5];
            if (Array.isArray(temp.beijing.x)) temp.beijing.x[0] = 0;
            temp.beijing.y = focus.dynamic.primary.beijing.y || [0, 0.5];
            if (Array.isArray(temp.beijing.y)) temp.beijing.y[0] = 0;
            temp.beijing.scale = focus.dynamic.primary.beijing.scale || 1;
            temp.beijing.angle = focus.dynamic.primary.beijing.angle || 0;
            var beijingX = [...temp.beijing.x], beijingY = [...temp.beijing.y], beijingS = temp.beijing.scale, beijingA = temp.beijing.angle;
          }
          else if (focus.dynamic.primary.dybg) {
            temp.beijing.x = focus.dynamic.primary.dybg.x || [0, 0.5];
            if (Array.isArray(temp.beijing.x)) temp.beijing.x[0] = 0;
            temp.beijing.y = focus.dynamic.primary.dybg.y || [0, 0.5];
            if (Array.isArray(temp.beijing.y)) temp.beijing.y[0] = 0;
            temp.beijing.scale = focus.dynamic.primary.dybg.scale || 1;
            temp.beijing.angle = focus.dynamic.primary.dybg.angle || 0;
            var beijingX = [...temp.beijing.x], beijingY = [...temp.beijing.y], beijingS = temp.beijing.scale, beijingA = temp.beijing.angle;
          }
          if (focus.dynamic.primary.gongji) {
            temp.chukuang.x = focus.dynamic.primary.gongji.x || [0, 0.5];
            temp.chukuang.y = focus.dynamic.primary.gongji.y || [0, 0.5];
            temp.chukuang.scale = focus.dynamic.primary.gongji.scale || 1;
            temp.chukuang.angle = focus.dynamic.primary.gongji.angle || 0;
            var chukuangX = [...temp.chukuang.x], chukuangY = [...temp.chukuang.y], chukuangS = temp.chukuang.scale, chukuangA = temp.chukuang.angle;
          }
        }
        const parent = focus.parentNode;
        const subling = focus.nextSibling;
        if (!bg) {
          if(editObject == 'player' && game.createCss) {
            game.createCss(`.qhly_dynamicSkinFixed {
              z-index: 35 !important;
              top: calc(50% - ${focus.offsetHeight * 0.5}px) !important;
              left: calc(30% - ${focus.offsetWidth * 0.5}px) !important;
              pointer-events: none;
              transform: scale(1.2) !important;
            }
            .qhly_blackbgFixed {
              left: -3% !important;
              top: -3% !important;
              height: 106% !important;
              width: 106% !important;
            }`);
            focus.classList.add('qhly_dynamicSkinFixed');
            focus.parentNode.appendChild(blackbg);
            blackbg.classList.add('qhly_blackbgFixed');
          }else {
            blackbg.appendChild(focus);
          }
        } else state.mainView.nopoints.style.pointerEvents = 'none';
        var buttonbar = ui.create.div('.qhly_bigeditbar', blackbg);
        var buttons = new Array(8);
        function enlarge() {
          temp[editMode].scale += 0.01;
          game.qhly_postMessage(focus, {
            message: 'RESIZE',
            id: focus.dynamic.id,
            scale: temp[editMode].scale,
            player: pp,
            zhu: true,
            dybg: editMode == 'beijing' ? true : undefined,
          }, editMode)
        }
        function shrink() {
          temp[editMode].scale -= 0.01;
          game.qhly_postMessage(focus, {
            message: 'RESIZE',
            id: focus.dynamic.id,
            scale: temp[editMode].scale,
            player: pp,
            zhu: true,
            dybg: editMode == 'beijing' ? true : undefined,
          }, editMode)
        }
        function clockwise() {
          temp[editMode].angle--;
          game.qhly_postMessage(focus, {
            message: 'RESIZE',
            id: focus.dynamic.id,
            angle: temp[editMode].angle,
            player: pp,
            zhu: true,
            dybg: editMode == 'beijing' ? true : undefined,
          }, editMode)
        }
        function anticlockwise() {
          temp[editMode].angle++;
          game.qhly_postMessage(focus, {
            message: 'RESIZE',
            id: focus.dynamic.id,
            angle: temp[editMode].angle,
            player: pp,
            zhu: true,
            dybg: editMode == 'beijing' ? true : undefined,
          }, editMode)
        }
        for (var i = 0; i < 8; i++) {
          buttons[i] = ui.create.div('.qhly_bigeditbutton' + i, buttonbar);
          buttons[i].id = 'qhly_bigedit' + i;
          if (!editDynamic && i < 6 || i == 5 && editObject == 'player') buttons[i].classList.add('forbid');
          buttons[i].addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            if (this.classList.contains('forbid')) return;
            game.qhly_playQhlyAudio('qhly_voc_click3', null, true);
            var currentType = null;
            switch (this.id) {
              case 'qhly_bigedit0': {
                enlarge();
                currentType = enlarge;
                break;
              }
              case 'qhly_bigedit1': {
                shrink();
                currentType = shrink;
                break;
              }
              case 'qhly_bigedit2': {
                clockwise();
                currentType = clockwise;
                break;
              }
              case 'qhly_bigedit3': {
                anticlockwise();
                currentType = anticlockwise;
                break;
              }
              case 'qhly_bigedit4': {
                if (!focus.dynamic.primary.beijing && !focus.dynamic.primary.dynamicBackground) {
                  alert('无可调节的动态背景');
                  return;
                }
                if (this.classList.contains('sel')) {
                  this.classList.remove('sel');
                  editMode = "daiji";
                }
                else {
                  this.classList.add('sel');
                  editMode = "beijing";
                }
                if (game.qhly_hasExtension('皮肤切换')) skinSwitch.postMsgApi.debug(focus, editMode);
                if (game.qhly_hasExtension('EpicFX') && lib.config['extension_EpicFX_skinEffects']) {
                  game.qhly_postMessage(focus, {
                    message: 'RESIZE',
                    id: focus.dynamic.id,
                    opacity: editMode == 'daiji' ? 1 : 0,
                    player: pp,
                    zhu: true,
                    dybg: undefined,
                  }, editMode);
                  game.qhly_postMessage(focus, {
                    message: 'RESIZE',
                    id: focus.dynamic.id,
                    speed: editMode == 'daiji' ? 0 : 1,
                    player: pp,
                    zhu: true,
                    dybg: true,
                  }, editMode);
                }
                _status.qhly_editMode = editMode;
                break;
              }
              case 'qhly_bigedit5': {
                if (!focus.dynamic.primary.gongji) {
                  alert('无可调节的出框');
                  return;
                }
                var btn = document.getElementById('qhly_bigedit4');
                if (this.classList.contains('sel')) {
                  this.classList.remove('sel');
                  if (btn) btn.classList.remove('forbid');
                  editMode = _status.qhly_editMode;
                  if (canvas) canvas.style.position = 'absolute';
                }
                else {
                  this.classList.add('sel');
                  if (btn) btn.classList.add('forbid');
                  _status.qhly_editMode = editMode;
                  editMode = "chukuang";
                  if (canvas) canvas.style.position = "fixed";
                }
                if (game.qhly_hasExtension('皮肤切换')) skinSwitch.postMsgApi.debug(focus, editMode);
                break;
              }
              case 'qhly_bigedit6': {
                if (editDynamic) {
                  if (canvas) canvas.style.position = 'absolute';
                  if (!lib.qhly_skinEdit[name]) lib.qhly_skinEdit[name] = {};
                  if (!lib.qhly_skinEdit[name][skin]) lib.qhly_skinEdit[name][skin] = {};
                  if (!lib.qhly_skinEdit[name][skin][editObject]) lib.qhly_skinEdit[name][skin][editObject] = {};
                  if (!lib.qhly_skinEdit[name][skin][editObject][editArgument1]) lib.qhly_skinEdit[name][skin][editObject][editArgument1] = {};
                  if (!lib.qhly_skinEdit[name][skin][editObject][editArgument1][theme]) lib.qhly_skinEdit[name][skin][editObject][editArgument1][theme] = {};
                  lib.qhly_skinEdit[name][skin][editObject][editArgument1][theme].x = temp.daiji.x;
                  lib.qhly_skinEdit[name][skin][editObject][editArgument1][theme].y = temp.daiji.y;
                  lib.qhly_skinEdit[name][skin][editObject][editArgument1][theme].scale = temp.daiji.scale / temp.qhly_resizeRatio;
                  lib.qhly_skinEdit[name][skin][editObject][editArgument1][theme].angle = temp.daiji.angle;
                  focus.dynamic.primary.scale = temp.daiji.scale;
                  focus.dynamic.primary.angle = temp.daiji.angle;
                  if (focus.dynamic.primary.beijing || focus.dynamic.primary.dybg) {
                    if (!lib.qhly_skinEdit[name][skin][editObject][editArgument2]) lib.qhly_skinEdit[name][skin][editObject][editArgument2] = {};
                    if (!lib.qhly_skinEdit[name][skin][editObject][editArgument2][theme]) lib.qhly_skinEdit[name][skin][editObject][editArgument2][theme] = {};
                    lib.qhly_skinEdit[name][skin][editObject][editArgument2][theme].x = temp.beijing.x;
                    lib.qhly_skinEdit[name][skin][editObject][editArgument2][theme].y = temp.beijing.y;
                    lib.qhly_skinEdit[name][skin][editObject][editArgument2][theme].scale = temp.beijing.scale / temp.qhly_resizeRatio;
                    lib.qhly_skinEdit[name][skin][editObject][editArgument2][theme].angle = temp.beijing.angle;
                    if (focus.dynamic.primary.dybg) {
                      focus.dynamic.primary.dybg.scale = temp.beijing.scale;
                      focus.dynamic.primary.dybg.angle = temp.beijing.angle;
                    } else {
                      focus.dynamic.primary.beijing.scale = temp.beijing.scale;
                      focus.dynamic.primary.beijing.angle = temp.beijing.angle;
                    }
                  }
                  if (focus.dynamic.primary.gongji && editObject != 'player') {
                    if (!lib.qhly_skinEdit[name][skin].bigAvatar) lib.qhly_skinEdit[name][skin].bigAvatar = {};
                    if (!lib.qhly_skinEdit[name][skin].bigAvatar.chukuang) lib.qhly_skinEdit[name][skin].bigAvatar.chukuang = {};
                    if (!lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme]) lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme] = {};
                    lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme].x = temp.chukuang.x;
                    lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme].y = temp.chukuang.y;
                    lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme].scale = temp.chukuang.scale;
                    lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme].angle = temp.chukuang.angle;
                    focus.dynamic.primary.gongji.scale = temp.chukuang.scale;
                    focus.dynamic.primary.gongji.angle = temp.chukuang.angle;
                  }
                  if (game.qhly_hasExtension('皮肤切换')) skinSwitch.postMsgApi.debug(focus, 'daiji');
                  if (game.qhly_hasExtension('EpicFX') && lib.config['extension_EpicFX_skinEffects']) {
                    game.qhly_postMessage(focus, {
                      message: 'RESIZE',
                      id: focus.dynamic.id,
                      opacity: 1,
                      player: pp,
                      zhu: true,
                      dybg: undefined,
                    }, 'daiji');
                    game.qhly_postMessage(focus, {
                      message: 'RESIZE',
                      id: focus.dynamic.id,
                      speed: 0,
                      player: pp,
                      zhu: true,
                      dybg: true,
                    }, 'beijing');
                  }
                } else {
                  originPostion = tempPosition;
                  var editArgument = theme;
                  if (game.qhly_getPlayerStatus(focus, null, name) == 2) {
                    editArgument = theme + '2';
                  }
                  if (originPostion) {
                    if (!lib.qhly_skinEdit[name]) lib.qhly_skinEdit[name] = {};
                    if (!lib.qhly_skinEdit[name][skin]) lib.qhly_skinEdit[name][skin] = {}
                    lib.qhly_skinEdit[name][skin][editArgument] = originPostion;
                  }
                }
                var strobj = JSON.stringify(lib.qhly_skinEdit, null, 4);
                game.qhly_readFileAsText("extension/千幻聆音/data/skineditmodel.txt", function (ret, str) {
                  if (ret) {
                    str = str.replace("_REPLACE_OBJECT_", strobj);
                    game.qhly_writeTextFile(str, "extension/千幻聆音", "skinEdit.js", function (err) {
                      if (!err) {
                        console.log("保存成功");
                      } else {
                        console.log("保存失败：" + JSON.stringify(err));
                      }
                    });
                  } else {
                    console.log("保存失败：无法读取模板。");
                  }
                });
                exit();
                break;
              }
              case 'qhly_bigedit7': {
                if (editDynamic) {
                  if (canvas) canvas.style.position = 'absolute';
                  game.qhly_postMessage(focus, {
                    message: 'RESIZE',
                    id: focus.dynamic.id,
                    x: dynamicX,
                    y: dynamicY,
                    scale: dynamicS,
                    angle: dynamicA,
                    player: pp,
                    zhu: true,
                    dybg: undefined,
                  }, 'daiji', true);
                  if (!lib.qhly_skinEdit[name]) lib.qhly_skinEdit[name] = {};
                  if (!lib.qhly_skinEdit[name][skin]) lib.qhly_skinEdit[name][skin] = {};
                  if (!lib.qhly_skinEdit[name][skin][editObject]) lib.qhly_skinEdit[name][skin][editObject] = {};
                  if (!lib.qhly_skinEdit[name][skin][editObject].dynamic) lib.qhly_skinEdit[name][skin][editObject].dynamic = {};
                  if (!lib.qhly_skinEdit[name][skin][editObject].dynamic[theme]) lib.qhly_skinEdit[name][skin][editObject].dynamic[theme] = {};
                  lib.qhly_skinEdit[name][skin][editObject].dynamic[theme].x = dynamicX;
                  lib.qhly_skinEdit[name][skin][editObject].dynamic[theme].y = dynamicY;
                  lib.qhly_skinEdit[name][skin][editObject].dynamic[theme].scale = dynamicS / focus.offsetHeight / (1 / game.me.offsetHeight);
                  lib.qhly_skinEdit[name][skin][editObject].dynamic[theme].angle = dynamicA;
                  focus.dynamic.primary.x = dynamicX;
                  focus.dynamic.primary.y = dynamicY;
                  if (focus.dynamic.primary.beijing || focus.dynamic.primary.dybg) {
                    game.qhly_postMessage(focus, {
                      message: 'RESIZE',
                      id: focus.dynamic.id,
                      x: beijingX,
                      y: beijingY,
                      scale: beijingS,
                      angle: beijingA,
                      player: pp,
                      zhu: true,
                      dybg: true,
                    }, 'beijing', true);
                    if (!lib.qhly_skinEdit[name][skin][editObject].beijing) lib.qhly_skinEdit[name][skin][editObject].beijing = {};
                    if (!lib.qhly_skinEdit[name][skin][editObject].beijing[theme]) lib.qhly_skinEdit[name][skin][editObject].beijing[theme] = {};
                    lib.qhly_skinEdit[name][skin][editObject].beijing[theme].x = beijingX;
                    lib.qhly_skinEdit[name][skin][editObject].beijing[theme].y = beijingY;
                    lib.qhly_skinEdit[name][skin][editObject].beijing[theme].scale = beijingS / focus.offsetHeight / (1 / game.me.offsetHeight);
                    lib.qhly_skinEdit[name][skin][editObject].beijing[theme].angle = beijingA;
                    if (focus.dynamic.primary.dybg) {
                      focus.dynamic.primary.dybg.x = beijingX;
                      focus.dynamic.primary.dybg.y = beijingY;
                    } else {
                      focus.dynamic.primary.beijing.x = beijingX;
                      focus.dynamic.primary.beijing.y = beijingY;
                    }

                  }
                  if (focus.dynamic.primary.gongji) {
                    game.qhly_postMessage(focus, {
                      message: 'RESIZE',
                      id: focus.dynamic.id,
                      x: chukuangX,
                      y: chukuangY,
                      scale: chukuangS,
                      angle: chukuangA,
                      player: pp,
                      zhu: true,
                      dybg: editMode == 'beijing' ? true : undefined,
                    }, 'chukuang', true);
                    if (!lib.qhly_skinEdit[name][skin].bigAvatar) lib.qhly_skinEdit[name][skin].bigAvatar = {};
                    if (!lib.qhly_skinEdit[name][skin].bigAvatar.chukuang) lib.qhly_skinEdit[name][skin].bigAvatar.chukuang = {};
                    if (!lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme]) lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme] = {};
                    lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme].x = chukuangX;
                    lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme].y = chukuangY;
                    lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme].scale = chukuangS;
                    lib.qhly_skinEdit[name][skin].bigAvatar.chukuang[theme].angle = chukuangA;
                    focus.dynamic.primary.gongji.x = chukuangX;
                    focus.dynamic.primary.gongji.y = chukuangY;
                  }
                  if (game.qhly_hasExtension('皮肤切换')) skinSwitch.postMsgApi.debug(focus, 'daiji');
                  if (game.qhly_hasExtension('EpicFX') && lib.config['extension_EpicFX_skinEffects']) {
                    game.qhly_postMessage(focus, {
                      message: 'RESIZE',
                      id: focus.dynamic.id,
                      opacity: 1,
                      player: pp,
                      zhu: true,
                      dybg: undefined,
                    }, 'daiji');
                    game.qhly_postMessage(focus, {
                      message: 'RESIZE',
                      id: focus.dynamic.id,
                      speed: 0,
                      player: pp,
                      zhu: true,
                      dybg: true,
                    }, 'beijing');
                  }
                } else {
                  focus.style.setProperty('--p', originPostion);
                }
                exit();
              }
            }
            if (typeof currentType == 'function') touchTimer = setInterval(currentType, 50);
          })
          buttons[i].addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(touchTimer);
          })
          buttons[i].addEventListener(lib.config.touchscreen ? 'touchcancel' : 'mouseleave', function () {
            clearInterval(touchTimer);
          })
        }
        if (lib.config.touchscreen && editDynamic) {
          var distanceBtn = ui.create.div('.qh-distancebtn', blackbg);
          var rotateBtn = ui.create.div('.qh-rotatebtn', blackbg);
          rotateBtn.classList.add('lock');
          distanceBtn.listen(function () {
            if (this.classList.contains('lock')) {
              this.classList.remove('lock');
              game.qhly_playQhlyAudio('unlocked', null, true);
              _status.qhly_disAble = true;
            } else {
              if (rotateBtn.classList.contains('lock')) return;
              game.qhly_playQhlyAudio('locked', null, true);
              this.classList.add('lock');
              _status.qhly_disAble = false;
            }
          });
          rotateBtn.listen(function () {
            if (this.classList.contains('lock')) {
              this.classList.remove('lock');
              game.qhly_playQhlyAudio('unlocked', null, true);
              _status.qhly_rotaAble = true;
            } else {
              if (distanceBtn.classList.contains('lock')) return;
              game.qhly_playQhlyAudio('locked', null, true);
              this.classList.add('lock');
              _status.qhly_rotaAble = false;
            }
          });
        }
        blackbg.addEventListener('touchstart', mousedownEvent, true);
        blackbg.addEventListener('touchend', mouseupEvent, true);
        blackbg.addEventListener('touchcancel', mouseupEvent, true);
        blackbg.addEventListener('touchmove', mousemoveEvent, true);
        blackbg.addEventListener('mousedown', mousedownEvent, true);
        blackbg.addEventListener('mouseup', mouseupEvent, true);
        blackbg.addEventListener('mouseleave', mouseupEvent, true);
        blackbg.addEventListener('mousemove', mousemoveEvent, true);
        function exit() {
          clearInterval(touchTimer);
          //清除这个毛病
          if (!bg) {
            if(focus.classList.contains('qhly_dynamicSkinFixed')) {
              focus.classList.remove('qhly_dynamicSkinFixed');
            }else {
              parent.insertBefore(focus, subling);
            }
          } else state.mainView.nopoints.style.pointerEvents = 'auto';
          buttonbar.remove();
          if (distanceBtn) distanceBtn.remove();
          if (rotateBtn) rotateBtn.remove();
          blackbg.remove();
          focus.classList.remove('selected');
          _status.bigEditing = false;
          return;
        }
        function getDistance(x1, y1, x2, y2) {
          return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
        }
        function getAngle(x1, y1, x2, y2) {
          return Math.atan2((y2 - y1), (x2 - x1));
        }
        function mouseupEvent(event) {
          focus.mouseup(event);
        }
        function mousemoveEvent(event) {
          if (event) {
            if (event.touches && event.touches.length) {
              if (event.touches.length == 2) {
                focus.mousegesture(event.touches[0].clientX, event.touches[0].clientY, event.touches[1].clientX, event.touches[1].clientY);
              } else focus.mousemove(event.touches[0].clientX, event.touches[0].clientY);
            }
            else focus.mousemove(event.clientX, event.clientY);
          }
        }
        function mousedownEvent(event) {
          if (event) {
            if (event.touches && event.touches.length) focus.mousedown(event.touches[0].clientX, event.touches[0].clientY);
            else focus.mousedown(event.clientX, event.clientY);
          }
        }
        focus.mousedown = function (x, y) {
          this.qhly_bigeditX = x;
          this.qhly_bigeditY = y;
          // this.qhly_position = tempPosition;
          this.qhly_isTouching = true;
        }
        focus.mousegesture = function (x1, y1, x2, y2) {
          if (!editDynamic) return;
          if (_status.qhly_disAble) {
            if (!this.qhly_distance) this.qhly_distance = getDistance(x1, y1, x2, y2);
            var scale = getDistance(x1, y1, x2, y2) - this.qhly_distance;
            gestureS = scale * 0.01;
          }
          if (_status.qhly_rotaAble) {
            if (!this.qhly_angle) this.qhly_angle = getAngle(x1, y1, x2, y2);
            var angle = getAngle(x1, y1, x2, y2) - this.qhly_angle;
            gestureA = angle * 100;
          }
          game.qhly_postMessage(focus, {
            message: 'RESIZE',
            id: focus.dynamic.id,
            scale: _status.qhly_disAble ? (temp[editMode].scale + gestureS) : undefined,
            angle: _status.qhly_rotaAble ? (temp[editMode].angle - gestureA) : undefined,
            player: pp,
            zhu: true,
            dybg: editMode == 'beijing' ? true : undefined,
          }, editMode)
        }
        focus.mousemove = function (x, y) {
          if (!this.qhly_isTouching) return;
          var slideX = x - this.qhly_bigeditX;
          var slideY = y - this.qhly_bigeditY;
          if (editDynamic) {
            temp[editMode].x[1] += slideX * 0.003;
            temp[editMode].y[1] -= slideY * 0.003;
            game.qhly_postMessage(focus, {
              message: 'RESIZE',
              id: focus.dynamic.id,
              x: temp[editMode].x,
              y: temp[editMode].y,
              player: pp,
              zhu: true,
              dybg: editMode == 'beijing' ? true : undefined,
            }, editMode)
          }
          else if (tempPosition) {
            var position = tempPosition.split('%')[0];
            position -= slideX * 0.5;
            if (position > 100) position = 100;
            if (position < 0) position = 0;
            this.style.setProperty('--p', position + '%');
            tempPosition = position + '%';
          }
          this.qhly_bigeditX = x;
          this.qhly_bigeditY = y;
        }
        focus.mouseup = function (event) {
          if (event.touches && event.touches.length == 1) {
            if (this.qhly_distance) delete this.qhly_distance;
            if (this.qhly_angle) delete this.qhly_angle;
            //if (this.qhly_newAngle) delete this.qhly_newAngle;
            if (gestureS) {
              temp[editMode].scale += gestureS;
              gestureS = null;
            }
            if (gestureA) {
              temp[editMode].angle -= gestureA;
              gestureA = null;
            }
            if (event.touches) {
              this.qhly_bigeditX = event.touches[0].clientX;
              this.qhly_bigeditY = event.touches[0].clientY;
            }
          }
          if (event.touches && event.touches.length == 0 || !lib.config.touchscreen) {
            if (this.qhly_isTouching) this.qhly_isTouching = false;
            if (this.qhly_bigeditX) delete this.qhly_bigeditX;
            if (this.qhly_bigeditY) delete this.qhly_bigeditY;
          }
        }
      };
      lib.extensionMenu['extension_千幻聆音']['qhly_currentViewSkin'] = {
        "name": "UI套装",
        "intro": "设置UI套装样式。",
        "item": get.qhly_viewSkinSet(),
        "init": lib.config.qhly_currentViewSkin === undefined ? 'shousha' : lib.config.qhly_currentViewSkin,
        onclick: function (item) {
          if (lib.qhly_viewskin[item] && lib.qhly_viewskin[item].onchange) {
            lib.qhly_viewskin[item].onchange();
          }
          game.saveConfig('qhly_currentViewSkin', item);
          game.saveConfig('extension_千幻聆音_qhly_currentViewSkin', item);
          /*if (confirm("是否重启游戏以应用新UI？")) {
            game.reload();
          }*/
          navigator.notification.confirm(
          	'是否重启游戏以应用新UI？',
          	function(index){
          	  if(index==1) {
          		game.reload();
              }
          	},
          	'三国杀·琉璃版',
          	['重启','取消']
          );
        },
        unshow:true,//隐藏这个设置
      };

      var bgmConfigs = {
        'system': '不特别配置',
        'random': '随机',
      };

      for (var p in lib.qhlyMusic) {
        bgmConfigs[p] = lib.qhlyMusic[p].name;
      }

      lib.qhly_bgmConfigs = bgmConfigs;

      game.qhly_refreshBgmConfigs = function () {
        for (var p in lib.qhlyMusic) {
          lib.qhly_bgmConfigs[p] = lib.qhlyMusic[p].name;
        }
      };

      lib.extensionMenu['extension_千幻聆音']['qhly_currentMusic'] = {
        "name": "设置BGM",
        "intro": "设置此选项，可以选择游戏背景音乐。将覆盖系统的配置。",
        "init": lib.config.qhly_currentMusic ? lib.config.qhly_currentMusic : 'system',
        "item": lib.qhly_bgmConfigs,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_currentMusic', item);
          game.saveConfig('qhly_currentMusic', item);
          game.qhly_switchBgm();
        }
      };
      lib.config.extension_千幻聆音_qhly_modemusicconfig =
        lib.config['qhly_modemusicconfig_' + get.mode()] ?
          lib.config['qhly_modemusicconfig_' + get.mode()] : 'system';

      lib.extensionMenu['extension_千幻聆音']['qhly_modemusicconfig'] = {
        "name": "模式BGM",
        "intro": "设置当前模式的BGM。",
        "init": lib.config['qhly_modemusicconfig_' + get.mode()] ? lib.config['qhly_modemusicconfig_' + get.mode()] : 'system',
        "item": lib.qhly_bgmConfigs,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_modemusicconfig', item);
          game.saveConfig('qhly_modemusicconfig_' + get.mode(), item);
          game.qhly_switchBgm();
        }
      };


      if (lib.qhly_viewskin[lib.config.qhly_currentViewSkin] && lib.qhly_viewskin[lib.config.qhly_currentViewSkin].onchange) {
        lib.qhly_viewskin[lib.config.qhly_currentViewSkin].onchange();
      }

      lib.qhly_level = lib.config.qhly_level ? lib.config.qhly_level : {};
      //初始化千幻聆音皮肤相关的数据
      if (!lib.config.qhly_skinset) {
        game.saveConfig('qhly_skinset', {
          skin: {
            //key-value方式，存放武将皮肤名
          },
          skinAudioList: {
            //key-value方式，存放武将皮肤配音
          },
          audioReplace: {
            //key-value方式，存放配音映射逻辑。
          },
          djtoggle: {

          },
        });
      }
      if (!lib.config.qhly_skinset.djtoggle) lib.config.qhly_skinset.djtoggle = {};
      if (!lib.config.qhly_winrecord) {
        game.saveConfig('qhly_winrecord', {

        });
      }

      game.qhly_recordGameOver = function (name, win, player) {
        if (win !== true && win !== false) return;
        var record = lib.config.qhly_winrecord[name];
        if (!record) {
          record = {};
          lib.config.qhly_winrecord[name] = record;
        }
        var recordMode = record[get.mode()];
        if (!recordMode) {
          recordMode = {};
          record[get.mode()] = recordMode;
        }
        var identity = get.mode() == 'guozhan' ? player.group : player.identity;
        if (!identity) {
          identity = "未知身份";
        } else {
          identity = get.translation(identity + '2');
        }
        var wlr = recordMode[identity];
        if (!wlr) {
          wlr = {};
          recordMode[identity] = wlr;
        }
        if (win === true) {
          if (!wlr.win) {
            wlr.win = 0;
          }
          wlr.win++;
        } else if (win === false) {
          if (!wlr.lose) {
            wlr.lose = 0;
          }
          wlr.lose++;
        }
        game.saveConfig('qhly_winrecord', lib.config.qhly_winrecord);
      };

      lib.onover.push(function (ret) {
        if (game.zhu) {
          let skinYh = game.zhu.getElementsByClassName("skinYh");
          if (skinYh.length > 0 && game.zhu.classList.contains('dead')) skinYh[0].remove();
        }
        var name = game.me.name ? game.me.name : game.me.name1;
        if (name) {
          game.qhly_recordGameOver(name, ret, game.me);
        }
        var name2 = game.me.name2;
        if (name2) {
          game.qhly_recordGameOver(name2, ret, game.me);
        }
      });

      //持久化存储皮肤数据
      game.qhlySyncConfig = function () {
        game.saveConfig('qhly_skinset', lib.config.qhly_skinset);
      };

      //修改播放音频的函数。
      game.qhly_originPlayAudio = game.playAudio;
      game.qhly_playAudioPlus = function(){
        if(_status.video&&arguments[1]!='video'&&!_status.qh_volmode) return;
        var str='';
        var onerror=null;
        for(var i=0;i<arguments.length;i++){
          if(typeof arguments[i]==='string'||typeof arguments[i]=='number'){
            str+='/'+arguments[i];
          }
          else if(typeof arguments[i]=='function'){
            onerror=arguments[i]
          }
          if(_status.video) break;
        }
        if(!lib.config.repeat_audio&&_status.skillaudio.contains(str)) return;
        _status.skillaudio.add(str);
        game.addVideo('playAudio',null,str);
        setTimeout(function(){
          _status.skillaudio.remove(str);
        },1000);
        var audio=document.createElement('audio');
        audio.autoplay=true;
        var volumn = lib.config.volumn_audio/8;
        if(lib.config.qhly_volumnAudio){
          var num = lib.config.qhly_volumnAudio['audio'+str];
          if(num !== undefined){
            num = parseInt(num);
            if(!isNaN(num)){
              audio.volume=num/8;
            }
          }
        }
        audio.volume = volumn;
        if(str.indexOf('.mp3')!=-1||str.indexOf('.ogg')!=-1){
          audio.src=lib.assetURL+'audio'+str;
        }
        else{
          audio.src=lib.assetURL+'audio'+str+'.mp3';
        }
        audio.addEventListener('ended',function(){
          this.remove();
          if(_status.qh_volmode){
            game.qhly_openVolumnDialog('audio'+str);
            _status.qh_volmode = false;
          }
        });
        audio.onerror=function(e){
          if(this._changed){
            this.remove();
            if(onerror){
              onerror(e);
            }
          }
          else{
            this.src=lib.assetURL+'audio'+str+'.ogg';
            this._changed=true;
          }
        };
        //Some browsers do not support "autoplay", so "oncanplay" listening has been added
        audio.oncanplay=function(){
          this.play();
        };
        ui.window.appendChild(audio);
        return audio;
      };
      game.playAudio = function () {
        var string = '';
        var others = [];
        for (var arg of arguments) {//将参数拼接成一个字符串，方便查找映射
          if (typeof arg == 'string' || typeof arg == 'number') {
            string = string + "/" + arg;
          } else {
            others.push(arg);
          }
        }
        var replace = string.slice(1);
        if (replace.length) {
          if (lib.config.qhly_notbb && lib.config.qhly_notbb != 'none' && !_status.qhly_previewAudio) {
            var keySkill = replace;
            while (keySkill.length && keySkill[keySkill.length - 1].charCodeAt() >= '0'.charCodeAt() && keySkill[keySkill.length - 1].charCodeAt() <= '9'.charCodeAt()) {
              keySkill = keySkill.slice(0, keySkill.length - 1);
            }
            if (!_status.qhly_bbkey) {
              _status.qhly_bbkey = {};
            }
            if (lib.config.qhly_notbb_range == 'all') {
              keySkill = 'all';
            } else {
              var playerP = game.findPlayer(function (current) {
                return current.hasSkill(keySkill);
              });
              if (playerP) {
                keySkill = playerP.playerid;
              }
            }
            var time = _status.qhly_bbkey[keySkill];
            if (!time) time = 0;
            var ctime = (new Date()).valueOf();
            if (ctime - time > parseInt(lib.config.qhly_notbb) * 1000) {
              _status.qhly_bbkey[keySkill] = ctime;
            } else {
              return;
            }
          }
          var rp = lib.config.qhly_skinset.audioReplace[replace];
          if (rp) {
            //如果存在映射，用映射的路径替换原有的路径，并调用原来的音频播放函数，以达到替换配音的效果。
            var args = rp.split("/");
            args.addArray(others);
            if(lib.config.qhly_audioPlus){
              game.qhly_playAudioPlus.apply(this, args);
            }else{
              return game.qhly_originPlayAudio.apply(this, args);
            }
          }
        }
        if(lib.config.qhly_audioPlus){
          game.qhly_playAudioPlus.apply(this, arguments);
        }else{
          return game.qhly_originPlayAudio.apply(this, arguments);
        }
      };

      game.qhly_playQhlyAudio = function (name, num, repeat) {
        if (lib.config.qhly_closeVoice) {
          return;
        }
        if (!repeat) {
          if (num === undefined || num === null) {
            game.playAudio('..', 'extension', '千幻聆音', 'audio', name);
          } else {
            game.playAudio('..', 'extension', '千幻聆音', 'audio', name + Math.ceil(Math.random() * num));
          }
        } else {
          if (num === undefined || num === null) {
            game.qhly_playAudioRepeatable('..', 'extension', '千幻聆音', 'audio', name);
          } else {
            game.qhly_playAudioRepeatable('..', 'extension', '千幻聆音', 'audio', name + Math.ceil(Math.random() * num));
          }
        }
      };

      game.qhly_playAudioRepeatable = function () {
        if (_status.video && arguments[1] != 'video') return;
        var str = '';
        var onerror = null;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] === 'string' || typeof arguments[i] == 'number') {
            str += '/' + arguments[i];
          }
          else if (typeof arguments[i] == 'function') {
            onerror = arguments[i]
          }
          if (_status.video) break;
        }
        //if(!lib.config.repeat_audio&&_status.skillaudio.contains(str)) return;
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
        }
        else {
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
          }
          else {
            this.src = lib.assetURL + 'audio' + str + '.ogg';
            this._changed = true;
          }
        };
        ui.window.appendChild(audio);
        return audio;
      };

      game.qhly_originPlaySkillAudio = game.playSkillAudio;
      game.playSkillAudio = function (name, index) {
        var replaceKey = "skill/" + name;
        if (!index) {
          index = Math.ceil(Math.random() * 2);
        }
        replaceKey = replaceKey + index;
        var rp = lib.config.qhly_skinset.audioReplace[replaceKey];
        if (rp) {
          var args = rp.split("/");
          if(lib.config.qhly_audioPlus){
            return game.qhly_playAudioPlus.apply(this, args);
          }else{
            return game.qhly_originPlayAudio.apply(this, args);
          }
        }
        if(lib.config.qhly_audioPlus){
          return game.qhly_playAudioPlus.apply(this, arguments);
        }else{
          return game.qhly_originPlaySkillAudio.apply(this, arguments);
        }
      };

      //在设置完皮肤后，刷新界面，检测场上的角色是否是设置的角色，并更换其皮肤。
      game.qhly_refresh = function (name) {
        if (_status.qh_sourceNode) {
          _status.qh_sourceNode.setBackground(_status.qh_sourceNodeName, 'character');
        }
        var players = game.players;
        if (players) {
          players = players.slice(0);
        } else {
          return;
        }
        if (game.dead) {
          players = players.concat(game.dead);
        }
        if (!players.length) return;
        players = players.filter(function (player) {
          if (player.name1 == name || player.name2 == name) {
            return true;
          }
          var name2 = name;
          //关于国战武将特别配置。
          if (name2.indexOf('gz_') < 0) {
            name2 = 'gz_' + name2;
          } else {
            name2 = name.slice(3);
          }
          return player.name1 == name2 || player.name2 == name2;
        });
        if (!players.length) return;
        for (var player of players) {
          var avatar;
          var fakeavatar;
          var name2 = "";
          if (name.indexOf('gz_') < 0) {
            name2 = 'gz_' + name;
          } else {
            name2 = name.slice(3);
          }
          if (player.name1 == name || player.name1 == name2) {
            avatar = player.node.avatar;
            fakeavatar = avatar.cloneNode(true);
            if (player.node.qhly_skinButton1) {
              if (lib.config.qhly_dragButtonPosition === 'no') {
                var key = 'qhly_dragButtonPositionOf_' + player.name1;
                var skin = game.qhly_getSkin(player.name1);
                if (skin) {
                  key = key + '_' + skin;
                }
                if (lib.config[key]) {
                  for (var s in lib.config[key]) {
                    player.node.qhly_skinButton1.style[s] = lib.config[key][s];
                  }
                }
              }
            }
          } else if (player.name2 == name || player.name2 == name2) {
            avatar = player.node.avatar2;
            fakeavatar = avatar.cloneNode(true);
            if (player.node.qhly_skinButton2) {
              if (lib.config.qhly_dragButtonPosition === 'no') {
                var key = 'qhly_dragButtonPositionOf_' + player.name2;
                var skin = game.qhly_getSkin(player.name2);
                if (skin) {
                  key = key + '_' + skin;
                }
                if (lib.config[key]) {
                  for (var s in lib.config[key]) {
                    player.node.qhly_skinButton2.style[s] = lib.config[key][s];
                  }
                }
              }
            }
          } else {
            continue;
          }
          var finish = function (bool, fakeavatar) {
            var player = avatar.parentNode;
            if (bool) {
              fakeavatar.style.boxShadow = 'none';
              player.insertBefore(fakeavatar, avatar.nextSibling);
              setTimeout(function () {
                fakeavatar.delete();
              }, 100);
            }
            //if (bool && lib.config['extension_千幻聆音_qhly_decadeChangeEffect'] && (lib.config.qhly_smallwindowstyle == 'decade' || lib.config.qhly_smallwindowstyle == 'shousha')) player.playChangeSkinEffect(avatar == player.node.avatar2)
            else if (bool && !lib.config.low_performance) {
              player.$rare();
            }
          }
          avatar.setBackground(name, 'character');
          finish(true, fakeavatar);
        }
      };

      //修改设置背景图片的函数，以达到替换皮肤的效果。
      HTMLDivElement.prototype.qhly_origin_setBackgroundImage = HTMLDivElement.prototype.setBackgroundImage;
      HTMLDivElement.prototype.setBackgroundImage = function (name) {
        // if (window.qhly_setBackground_inCharacter) {
        //     this.qhly_origin_setBackgroundImage.apply(this, arguments);
        //     return;
        // }
        if(lib.config.qhly_chooseButtonOrigin||(lib.config['extension_千幻聆音_qhly_chooseButtonOrigin_guozhan']&&get.mode()=='guozhan')){
          if(this.classList.contains('character') && this.classList.contains('button')){
            return this.qhly_origin_setBackgroundImage.apply(this, arguments);
          }
        }
        if (this.classList.contains('qh-must-replace') || (!this.classList.contains('qh-not-replace') && (lib.config.qhly_forceall || (this.classList.contains('avatar') || this.classList.contains('avatar2'))))) {
          //判断当前的div是否是人物avatar。
          var setByName = function (cname, opath) {
            if (lib.config.qhly_skinset.skin[cname]) {
              var skin = lib.config.qhly_skinset.skin[cname];
              if (!skin) return false;
              var skinPackage = game.qhly_foundPackage(cname);
              if (opath) {
                var lutouPrefix = skinPackage.lutouPrefix;
                if (typeof lutouPrefix == 'function') {
                  lutouPrefix = lutouPrefix(cname);
                }
                var prefix = skinPackage.prefix;
                if (typeof prefix == 'function') {
                  prefix = prefix(cname);
                }
                if (skinPackage.isLutou) {
                  if (lutouPrefix + cname != game.qhly_earse_ext(opath) && prefix + cname != game.qhly_earse_ext(opath)) {
                    return false;
                  }
                } else if (prefix + cname != game.qhly_earse_ext(opath)) {
                  return false;
                }
              }
              //获取相应的皮肤包，并修改图片路径。
              var dest = null;
              if (skinPackage.isLutou) {
                dest = skinPackage.skin.lutou;
                if (!dest) {
                  dest = skinPackage.skin.standard;
                }
              } else {
                dest = skinPackage.skin.standard;
              }
              if (typeof dest == 'function') {
                dest = dest(cname, skin);
              }
              //Helasisy修：woc终于找到你了把我gz_caocao国战皮肤弄没的罪灰祸首
              var destpath = dest + game.qhly_getRealName(cname) + "/" + skin;
              if (skinPackage.replaceAvatarDestination) {
                var dp = skinPackage.replaceAvatarDestination(cname, skin);
                if (dp) {
                  destpath = dp;
                }
              }
              this.qhly_origin_setBackgroundImage(destpath);
              return true;
            }
          }.bind(this);
          //if (lib.qhly_skinShare[name]) name = lib.qhly_skinShare[name].name;
          if (name && name.indexOf('image/character/') == 0) {
            var cname = name.replace('image/character/', '');
            if (cname.indexOf('/') < 0) {
              var found = cname.lastIndexOf('.');
              if (found >= 0) {
                cname = cname.slice(0, found);
              }
              if (setByName(cname)) {
                return;
              }
            }
          } else if (name && name.indexOf('extension/') == 0) {
            var cname = name.replace('extension/', '');
            var foundS = cname.lastIndexOf("/");
            var foundDot = cname.lastIndexOf(".");
            if (foundS >= 0) {
              if (foundDot < 0) {
                foundDot = cname.length;
              }
              cname = cname.slice(foundS + 1, foundDot);
            }
            if (cname.length) {
              if (setByName(cname, name)) {
                return;
              }
            }
          }
        }
        this.qhly_origin_setBackgroundImage.apply(this, arguments);
      };

      HTMLDivElement.prototype.qhly_origin_setBackground = HTMLDivElement.prototype.setBackground;
      //标记一个异步（看我加一个promise，有更好的想法，先拿着）
      //Helasisy修：我简直就是个甜菜
      //思路，A和B先后放进来，但是跑着去打饭，所以最后谁先打到饭顺序未知
      HTMLDivElement.prototype.setBackground = function (name, type, ext, subfolder) {
        //让B写名字到桌上（A先进先写，B后进把A的盖住了）
        this.currentSkinName = name;
        //放变量里方便传递
        let avatarMe = this;
        //留住我的卡牌武将！只要是卡牌类的图片一律送到原版处理器那里，那里有人接收
		if(type&&type=='character'&&get.type(this)!=undefined&&!this.style['backgroundImage']) {
		    return this.qhly_origin_setBackground.apply(this, arguments);
		}
        if(type == 'character'){
          if(lib.config.qhly_chooseButtonOrigin||(lib.config['extension_千幻聆音_qhly_chooseButtonOrigin_guozhan']&&get.mode()=='guozhan')){
            if(this.classList.contains('character') && this.classList.contains('button')){
              return this.qhly_origin_setBackground.apply(this, arguments);
            }
          }
        }
        if (type == 'character' && (this.classList.contains('qh-must-replace') || (!this.classList.contains('qh-not-replace') && (lib.config.qhly_forceall || (this.classList.contains('avatar') || this.classList.contains('avatar2') || this.classList.contains('primary-avatar') || this.classList.contains('deputy-avatar') || this.classList.contains('button')))))) {
          let that = this;
          var setByName = function (cname) {
            if (lib.config.qhly_skinset.skin[cname]) {
              var realName = game.qhly_getRealName(cname);
              var skin = lib.config.qhly_skinset.skin[cname];
              if (!skin) return false;
              var skinPackage = game.qhly_foundPackage(realName);
              //获取相应的皮肤包，并修改图片路径。
              var dest = null;
              if (skinPackage.isLutou) {
                dest = skinPackage.skin.lutou;
                if (!dest) {
                  dest = skinPackage.skin.standard;
                }
              } else {
                dest = skinPackage.skin.standard;
              }
              if (typeof dest == 'function') {
                dest = dest(realName, skin);
              }
              var destpath = dest + realName + "/" + skin;
              if (skinPackage.replaceAvatarDestination) {
                var dp = skinPackage.replaceAvatarDestination(realName, skin);
                if (dp) {
                  destpath = dp;
                }
              }
              //这个老登整了个异步，就是可以乱插队了，这不好
              game.qhly_checkFileExist(destpath, function (s) {
                //呐，规矩：如果你打到饭时桌子上不是写你的名字（最后一个进的人），你不准上桌
                if(avatarMe.currentSkinName != name) {
                    return false;
                }
                if (s) {
                  that.qhly_origin_setBackgroundImage(destpath);
                } else {
                  var prefix = skinPackage.prefix;
                  if (typeof prefix == 'function') {
                    prefix = prefix(cname);
                  }
                  if (lib.config.qhly_noSkin == 'origin') that.qhly_origin_setBackgroundImage(prefix + realName + '.jpg');//原画
                  else that.qhly_origin_setBackgroundImage('extension/千幻聆音/image/noSkin.png');//noskin
                }
              })
              that.style.backgroundSize = "cover";
              return true;
            }
          };
          if (!setByName(name)) {
            return that.qhly_origin_setBackground(name, type, ext, subfolder);
          }
          return this;
        } else {
          return this.qhly_origin_setBackground(name, type, ext, subfolder);
        }
      };
      game.qhly_banSkin = function (name, skin, ban) {
        if (ban === undefined) ban = true;
        if (!skin) {
          skin = "[original]";
        }
        if (!lib.config.qhly_banskinlist) {
          lib.config.qhly_banskinlist = [];
        }
        if (ban) {
          lib.config.qhly_banskinlist.add(name + '-' + skin);
        } else {
          lib.config.qhly_banskinlist.remove(name + '-' + skin);
        }
        game.saveConfig('qhly_banskinlist', lib.config.qhly_banskinlist);
      };
      game.qhly_skinIsBanned = function (name, skin) {
        if (!lib.config.qhly_banskinlist) {
          return false;
        }
        if (!skin) {
          skin = "[original]";
        }
        return lib.config.qhly_banskinlist.contains(name + '-' + skin);
      };
      //获取皮肤文件。参数为武将名称和皮肤名称。注意需要包含扩展名。
      game.qhly_getSkinFile = function (name, skin) {
        if (name.indexOf('gz_') == 0) {
          if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanSkin(name)) {
            var subname = name.slice(3);
            if (get.character(subname)) {
              name = subname;
            }
          }
        }
        var realName = game.qhly_getRealName(name);
        var skinPackage = game.qhly_foundPackage(realName);
        if (!skin) {
          return skinPackage.prefix + name + ".jpg";
        }
        var dest = null;
        if (skinPackage.isLutou) {
          dest = skinPackage.skin.lutou;
          if (!dest) {
            dest = skinPackage.skin.standard;
          }
        } else {
          dest = skinPackage.skin.standard;
        }
        if (skinPackage.replaceAvatarDestination) {
          var r = skinPackage.replaceAvatarDestination(realName, skin);
          if (r) return r;
        } else if (lib.qhly_skinChange[realName] && _status.qhly_replaceSkin && _status.qhly_replaceSkin[realName] && _status.qhly_replaceSkin[realName][skin]) {
          return _status.qhly_replaceSkin[realName][skin];
        }
        return dest + realName + "/" + skin;
      };
      //竖排文字原版
      get.qhly_verticalStr=function(str,sp){
        if(typeof str!='string') return '';
        str=str.toUpperCase();
        var str2='';
        var nobreak=false;
        for(var i=0;i<str.length;i++){
            if(str[i]=='`'){
                nobreak=!nobreak;continue;
            }
            str2+=str[i];
            if(nobreak) continue;
            if(sp&&str[i]=='S'&&str[i+1]=='P') continue;
            if(/[0-9]/.test(str[i])&&/[0-9]/.test(str[i+1])) continue;
            if(i<str.length-1){
                str2+='<br>';
            }
        }
        return str2;
    };
      //皮肤名字格式修正
      game.qhly_rename = function(name,all) {
          var name2=name;
          if(all==true) {
              name2=name2.replace('2','Ⅱ');
              return name2;
          }
          //if(name2.indexOf('2')!=0) name2=name2.replace('2','');
          if(name2.length>4) name2=name2.slice(0,4);
          return name2;
      }
      //获取皮肤名称。
      game.qhly_getSkin = function (name) {
        if (name.indexOf('gz_') == 0) {
          if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanSkin(name)) {
            var subname = name.slice(3);
            if (get.character(subname)) {
              name = subname;
            }
          }
        }
        if (lib.config.qhly_skinset.skin[name]) {
          return lib.config.qhly_skinset.skin[name];
        }
        return null;
      };
      game.qhly_skinIs = function (name, skinname) {
        var ret = game.qhly_getSkin(name);
        if (!ret && !skinname) return true;
        return skinname == ret;
      };

      //搜索武将的皮肤包。
      game.qhly_foundPackage = function (name) {
        var skinPackage = null;
        for (var pkg of lib.qhlypkg) {
          if (pkg.skinShare) {
            lib.qhly_skinShare = Object.assign(lib.qhly_skinShare, pkg.skinShare);
          }
          if (pkg.characterList && pkg.characterList.contains(name)) {
            skinPackage = pkg;
            break;
          }
          if (pkg.filterCharacter && pkg.filterCharacter(name)) {
            skinPackage = pkg;
            break;
          }
        }
        if (skinPackage == null) {
          if (lib.config.qhly_extcompat !== 'false') {
            skinPackage = game.qhly_foundPackageExt(name);
          }
        }
        if (skinPackage == null) {
          skinPackage = DEFAULT_PACKAGE;
        }
        return skinPackage;
      };
      game.qhly_getAvatarSrc = function (name) {
        if (!name) return null;
        var src = null;
        var ext = '.jpg';
        var subfolder = 'default';
        var type = 'character';
        if (type) {
          var dbimage = null, extimage = null, modeimage = null;
          var nameinfo;
          var gzbool = false;
          var mode = get.mode();
          if (type == 'character') {
            if (lib.characterPack['mode_' + mode] && lib.characterPack['mode_' + mode][name]) {
              if (mode == 'guozhan') {
                nameinfo = lib.character[name];
                if (name.indexOf('gz_shibing') == 0) {
                  name = name.slice(3, 11);
                }
                else {
                  if (lib.config.mode_config.guozhan.guozhanSkin && lib.character[name] && lib.character[name][4].contains('gzskin')) gzbool = true;
                  name = name.slice(3);
                }
              }
              else {
                modeimage = mode;
              }
            }
            else if (lib.character[name]) {
              nameinfo = lib.character[name];
            }
            else if (name.indexOf('::') != -1) {
              name = name.split('::');
              modeimage = name[0];
              name = name[1];
            }
          }
          if (!modeimage && nameinfo && nameinfo[4]) {
            for (var i = 0; i < nameinfo[4].length; i++) {
              if (nameinfo[4][i].indexOf('ext:') == 0) {
                extimage = nameinfo[4][i]; break;
              }
              else if (nameinfo[4][i].indexOf('db:') == 0) {
                dbimage = nameinfo[4][i]; break;
              }
              else if (nameinfo[4][i].indexOf('mode:') == 0) {
                modeimage = nameinfo[4][i].slice(5); break;
              }
              else if (nameinfo[4][i].indexOf('character:') == 0) {
                name = nameinfo[4][i].slice(10); break;
              }
            }
          }
          if (extimage) {
            src = extimage.replace(/ext:/, 'extension/');
          }
          else if (dbimage) {
            return null;
          }
          else if (modeimage) {
            src = 'image/mode/' + modeimage + '/character/' + name + ext;
          }
          else if (type == 'character' && lib.config.skin[name] && arguments[2] != 'noskin') {
            src = 'image/skin/' + name + '/' + lib.config.skin[name] + ext;
          }
          else {
            if (type == 'character') {
              src = 'image/character/' + (gzbool ? 'gz_' : '') + name + ext;
            }
            else {
              src = 'image/' + type + '/' + subfolder + '/' + name + ext;
            }
          }
        }
        else {
          src = 'image/' + name + ext;
        }
        return src;
      };
      game.qhly_foundPackageExt = function (name) {
        var cp = game.qhly_getCharacterPackage(name);
        var picSrc = game.qhly_getAvatarSrc(name);
        if (picSrc && picSrc.indexOf('image/character/') == 0) {
          return null;
        }
        var extNameInPic = picSrc.replace('extension/', '');
        if (extNameInPic.indexOf('/') >= 0) {
          extNameInPic = extNameInPic.slice(0, extNameInPic.indexOf('/'));
        }
        if (cp) {
          var cpkg = lib.characterPack[cp];
          if (!cpkg) return null;
          return {
            isExt: true,
            fromExt: false,
            filterCharacter: function (name) {
              return cpkg[name] !== false;
            },
            skininfo: function (name, skinname) {
              return null;
            },
            characterTaici: function (name) {
              return null;
            },
            characterLihui: function (name, skin) {
              return null;
            },
            prefix: function (cname) {
              var src = game.qhly_getAvatarSrc(cname);
              if (src) {
                return src.replace(cname + '.jpg', '');
              }
              return 'extension/' + cp + '/';
            },
            skin: {
              standard: ((lib.config.qhly_extSkinPath == undefined || lib.config.qhly_extSkinPath == 'default') ? 'extension/' + extNameInPic + '/skin/image/' : lib.config.qhly_extSkinPath),
              origin: 'extension/' + extNameInPic + '/skin/yuanhua/',
            },
            //ssborder:,
            audioOrigin: function (cname) {
              var info = get.character(cname);
              var extName = null;
              if (info) {
                var skills = info[3];
                if (skills) {
                  for (var skill of skills) {
                    var sinfo = lib.skill[skill];
                    if (sinfo && sinfo.audio !== undefined) {
                      if (typeof sinfo.audio == 'number') {
                        return '';
                      } else if (typeof sinfo.audio == 'string' && sinfo.audio.indexOf('ext:') == 0) {
                        var infos = sinfo.audio.split(':');
                        if (infos.length >= 2) {
                          extName = infos[1];
                          return 'extension/' + extName + "/";
                        }
                      }
                    }
                  }
                }
              }
              if (get.translation(cp + '_character_config')) {
                return 'extension/' + get.translation(cp + '_character_config') + '/';
              }
              return '';
            },
            audio: ((lib.config.qhly_extSkinPath == undefined || lib.config.qhly_extSkinPath == 'default') ? 'extension/' + extNameInPic + '/skin/audio/' : 'extension/千幻聆音/sanguoaudio/'),//皮肤配音文件在千幻聆音扩展内的位置。
          };
        }
        return null;
      };

      game.qhly_findAdditionSkins = function (name) {
        var list = [];
        for (var pkg of lib.qhlypkg) {
          if (pkg.getAdditionalSkins) {
            list.addArray(pkg.getAdditionalSkins(name));
          }
        }
        return list;
      };

      game.qhly_findAdditionSkinsName = function (name) {
        var list = game.qhly_findAdditionSkins();
        var ret = [];
        for (var l of list) {
          ret.push("add::" + l.name + "::" + l.skinName);
        }
        return ret;
      };

      game.qhly_skinLock = function (name, skin) {
        var pkg = game.qhly_foundPackage(name);
        if (pkg && pkg.lockSkin) {
          var ret = pkg.lockSkin(name, skin);
          if (ret && ret.isLocked()) {
            return ret;
          }
        }
        return false;
      };
      //获取某武将的皮肤列表。
      game.qhly_getSkinAudioList = function (name, callback, locked) {
        var pkg = game.qhly_foundPackage(name);
        if (!pkg.audio) {
          if (callback) {
            callback(false);
          }
          return;
        }
        game.qhly_getSkinList(name, function (ret, list) {
          if (!ret || !list || !list.length) {
            if (callback) {
              callback(false);
            }
            return;
          }
          var path = pkg.audio;
          game.qhly_checkFileExist(path, function (s) {
            if (s) {
              game.getFileList(path, function (folders) {
                var retList = [];
                var retList2 = [];
                for (var item of list) {
                  var nm = game.qhly_earseExt(item);
                  if (folders.contains(nm)) {
                    retList.add(nm);
                    retList2.add(item);
                  }
                }
                if (callback) {
                  callback(true, retList, retList2);
                }
              });
            } else {
              if (callback) {
                callback(false);
              }
            }
          });
        }, locked);
      };
      game.qhly_getSkinList = function (name, callback, locked, loadInfoJs) {
        if (locked === undefined) {
          locked = true;
        }
        if (name.indexOf('gz_') == 0) {
          if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanSkin(name)) {
            var subname = name.slice(3);
            if (get.character(subname)) {
              name = subname;
            }
          }
        }
        var realName = game.qhly_getRealName(name);
        var skinPackage = game.qhly_foundPackage(realName);
        //var skinPackageOrigin = game.qhly_foundPackage(name);
        var handleHide = function (list) {
          var ret = [];
          for (var skin of list) {
            if (skinPackage.hideSkin && skinPackage.hideSkin(name, skin)) {
              continue;
            }
            if (!locked && game.qhly_skinLock(name, skin)) {
              continue;
            }
            var supportExt = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.ico'];
            for (var ext of supportExt) {
              if (skin.endsWith(ext)) {
                ret.add(skin);
                break;
              }
              if (skin.endsWith(ext.toUpperCase())) {
                ret.add(skin);
                break;
              }
            }
          }
          return ret;
        };
        if (_status.qhly_skinListCache) {
          var list = _status.qhly_skinListCache[name];
          if (list) {
            var path = '';
            if (skinPackage.isLutou) {
              path = skinPackage.skin.lutou;
            } else {
              path = skinPackage.skin.standard;
            }
            path = path + realName;
            if (loadInfoJs && list.contains('skininfo.js') && !lib.qhly_dirskininfo[name]) {
              lib.init.js(lib.assetURL + path + "/skininfo.js", null, function () {
                callback(true, handleHide(list.slice(0)));
              }, function (err) {
                callback(true, handleHide(list.slice(0)));
              });
            } else {
              callback(true, handleHide(list.slice(0)));
            }
            return;
          }
          if (list === false) {
            callback(false);
            return;
          }
        }
        if (game.getFileList) {
          var path = '';
          if (skinPackage.isLutou) {
            path = skinPackage.skin.lutou;
          } else {
            path = skinPackage.skin.standard;
          }
          path = path + realName;
          // if (realName != name) {
          //     var path2 = '';
          //     if (skinPackageOrigin.isLutou) {
          //         path2 = skinPackageOrigin.skin.lutou;
          //     } else {
          //         path2 = skinPackageOrigin.skin.standard;
          //     }
          //     path2 = path2 + name;
          //     lib.init.js(lib.assetURL + path2 + "/skininfo.js")
          // }
          game.qhly_checkFileExist(path, function (s) {
            if (s) {
              game.getFileList(path, function (folders, files) {
                if (!_status.qhly_skinListCache) _status.qhly_skinListCache = {};
                var ret = files.slice(0);
                _status.qhly_skinListCache[name] = ret;
                if (loadInfoJs && files.contains('skininfo.js')) {
                  lib.init.js(lib.assetURL + path + "/skininfo.js", null, function () {
                    callback(true, handleHide(files));
                  }, function () {
                    callback(true, handleHide(files));
                  });
                } else {
                  callback(true, handleHide(files));
                }
              });
            } else {
              if (!_status.qhly_skinListCache) _status.qhly_skinListCache = {};
              _status.qhly_skinListCache[name] = false;
              callback(false);
            }
          });
        } else {
          if (!_status.qhly_skinListCache) _status.qhly_skinListCache = {};
          _status.qhly_skinListCache[name] = false;
          callback(false);
        }
      };
      //根据武将ID，皮肤文件名，查找皮肤的翻译命名。
      game.qhly_getSkinName = function (plname, filename, skinPackage) {
        var foundDot = filename.lastIndexOf('.');
        if (foundDot == -1) {
          foundDot = filename.length;
        }
        var sname = filename.slice(0, foundDot);
        if (!plname) {
          return sname;
        }
        if (!skinPackage) {
          //4VrLPyXM/UwVl3SXOMoDpBLQcoJHwBtPcxBNF1VM6oxC7qONebCO4KekZdetP8Zs
          skinPackage = game.qhly_foundPackage(plname);
        }
        if (skinPackage.skininfo) {
          var info;
          if (typeof skinPackage.skininfo == 'function') {
            info = skinPackage.skininfo(plname, sname);
          } else {
            var tname = plname + '-' + sname;
            info = skinPackage.skininfo[tname];
            if (!info) {
              info = skinPackage.skininfo[sname];
            }
          }
          if (info && info.translation) {
            return info.translation;
          }
        }
        return sname;
      };

      //获取皮肤信息。
      game.qhly_getSkinInfo = function (plname, filename, skinPackage) {//direct控制直接读取name的台词
        if (plname.indexOf('gz_') == 0) {
          if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanSkin(plname)) {
            var subplname = plname.slice(3);
            if (get.character(subplname)) {
              plname = subplname;
            }
          }
        }
        var realName = game.qhly_getRealName(plname);
        if (!filename) {
          return {
            info: '',
          };
        }
        var foundDot = filename.lastIndexOf('.');
        if (foundDot == -1) {
          foundDot = filename.length;
        }
        var sname = filename.slice(0, foundDot);
        if (!plname) {
          return {
            info: '',
            translation: sname
          };
        }
        var dinfo = lib.qhly_dirskininfo[realName];
        if (dinfo && dinfo.skin && dinfo.skin[sname]) {
          return dinfo.skin[sname];
        }
        if (!skinPackage) {
          skinPackage = game.qhly_foundPackage(realName);
        }
        if (skinPackage.skininfo) {
          var info;
          if (typeof skinPackage.skininfo == 'function') {
            info = skinPackage.skininfo(realName, sname);
          } else {
            var tname = realName + "-" + sname;
            info = skinPackage.skininfo[tname];
            if (!info) {
              info = skinPackage.skininfo[sname];
            }
          }
          if (info) {
            return info;
          }
        }
        return {
          info: '',
          translation: sname
        };
      };
      game.qhly_getSkinImagePath = function (name, pkg) {
        if (!pkg) pkg = game.qhly_foundPackage(name);
        var realName = game.qhly_getRealName(name);
        if (realName != name) pkg = game.qhly_foundPackage(realName);
        var path = null;
        if (pkg.isLutou) {
          path = pkg.skin.lutou;
        }
        if (!path) {
          path = pkg.skin.standard;
        }
        return path;
      };
      //将某个文件路径抹除扩展名。如file.txt -> file
      game.qhly_earse_ext = function (path) {
        if (!path) return path;
        var foundDot = path.lastIndexOf('.');
        if (foundDot < 0) return path;
        return path.slice(0, foundDot);
      };

      game.qhly_readFileAsText = function (path, callback) {
        game.qhly_checkFileExist(path, function (ret) {
          if (!ret) {
            if (callback) {
              callback(false);
            }
          } else {
            game.readFile(path, function (result) {
              if (callback) {
                if (lib.device) {
                  var ret2 = String.fromCharCode.apply(null, new Uint8Array(result));
                  callback(true, ret2);
                } else {
                  callback(true, result.toString());
                }
              }
            }, function () {
              if (callback) {
                callback(false);
              }
            });
          }
        });
      };

      game.qhly_writeTextFile = function (str, path, filename, callback) {
        if (lib.device) {
          game.ensureDirectory(path, function () {
            window.resolveLocalFileSystemURL(lib.assetURL + path, function (entry) {
              entry.getFile(filename, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                  fileWriter.onwriteend = function () {
                    if (callback) {
                      callback(false);
                    }
                  }
                  var textFileAsBlob = new Blob([str], { type: 'text/plain' });
                  fileWriter.write(textFileAsBlob);
                });
              });
            });
          });
        } else if (typeof window.require == 'function') {
          game.ensureDirectory(path, function () {
            lib.node.fs.writeFile(__dirname + '/' + path + '/' + filename, str, null, callback);
          });
        }
      };

      game.qhly_writeImageFile = function (str, path, filename, callback) {
        if (lib.device) {
          game.ensureDirectory(path, function () {
            window.resolveLocalFileSystemURL(lib.assetURL + path, function (entry) {
              entry.getFile(filename, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                  fileWriter.onwriteend = function () {
                    if (callback) {
                      callback(false);
                    }
                  }
                  var textFileAsBlob = new Blob([str], { type: 'image/png' });
                  fileWriter.write(textFileAsBlob);
                });
              });
            });
          });
        } else if (typeof window.require == 'function') {
          const reader = new FileReader();
          reader.readAsArrayBuffer(str);
          reader.onload = () => {
            const arr = reader.result;
            game.ensureDirectory(path, function () {
              lib.node.fs.writeFile(__dirname + '/' + path + '/' + filename, Buffer.from(arr), null, callback);
            });
          }
        }
      };
      game.qhly_dom2image = function (from, name, node, path, state) {
        var zoom;
        switch (lib.config.ui_zoom) {
          case 'esmall': zoom = 0.8; break;
          case 'vsmall': zoom = 0.9; break;
          case 'small': zoom = 0.93; break;
          case 'big': zoom = 1.05; break;
          case 'vbig': zoom = 1.1; break;
          case 'ebig': zoom = 1.2; break;
          default: zoom = 1;
        }
        game.documentZoom = game.deviceZoom * 0.8;
        ui.updatez();
        const parent = node.parentNode;
        const realName = game.qhly_getRealName(name);
        const bg = ui.create.div('.qh-domtoimagebg', document.body);
        const text = ui.create.div('.qh-domtoimagenode', bg,);
        text.innerHTML = '观察左边动皮运行到满意状态时<br>点击下方“生成”按钮<br>黑框内为最终静皮采样范围<br>';
        text.innerHTML += '长按动皮可进行调整\t\t<button id=qh-d2icreate>生成</button>\t\t<button id=qh-d2icancel>取消</button>';
        // const player = game.qhly_getCurrentPlayer(name)[0][0];
        // const change = from ? from : player.node.avatar;
        const bg2 = ui.create.div('.qh-domtoimagebg2', bg);
        const bg4 = ui.create.div('.qh-domtoimagebg4', bg2);
        bg4.$dynamicWrap = ui.create.div('.qh-domtoimagebg3', bg4);
        let timer = null;
        bg2.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", function () {
          timer = setTimeout(function () {
            if (_status.bigEditing) return;
            game.qhly_bigEdit({ name: name, mainView: { avatarImage: bg4, nopoints: bg2 } }, bg);
          }, 800);
        });
        bg2.addEventListener(lib.config.touchscreen ? "touchmove" : 'mousemove', function () {
          clearTimeout(timer);
        });
        bg2.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", function () {
          clearTimeout(timer);
        });
        if (!lib.config.qhly_lutou) {
          bg4.$dynamicWrap.style.setProperty('--h', '472px');
          bg4.$dynamicWrap.classList.add('standard');
        }
        else if (lib.config.extension_千幻聆音_qhly_lutouType && lib.config.extension_千幻聆音_qhly_lutouType == 'shousha') {
          bg2.style.setProperty('--w', '276px');
          bg2.style.setProperty('--h', '506px');
          bg4.$dynamicWrap.style.setProperty('--w', '276px');
          bg4.$dynamicWrap.style.setProperty('--h', '442px');
          bg4.$dynamicWrap.style.setProperty('--l', '0px');
          bg4.$dynamicWrap.style.setProperty('--l', '0px');
          bg4.$dynamicWrap.classList.add('shousha');
        }
        const fileName = parent.belowText.innerText.split('*')[0];
        game.qhly_changeDynamicSkin(bg4, fileName, name);
        const btn1 = document.getElementById('qh-d2icreate');
        btn1.onclick = function () {
          text.innerHTML = '正在生成静皮，请稍后。。。<br>请勿进行其他操作！！！<br>（依据机器性能不同，<br>此过程可能耗费较长时间）';
          window.qhly_d2i.toBlob(bg4).then(function (url) {
            game.qhly_writeImageFile(url, path + realName + '/', fileName + '.jpg', function () {
              //parent.insertBefore(that, sibling);
              parent.toImageBtn.setAttribute('single', false);
              const file = game.qhly_getSkinFile(name, fileName + '.jpg');
              parent.avatar.qhly_origin_setBackgroundImage(file);
              parent.dynamicToggle && parent.dynamicToggle.setAttribute('toggle', true);
              if (state) {
                if (state.pkg.isExt) {
                  if (realName != name && fileName != '经典形象') path = DEFAULT_PACKAGE.skin.standard;
                }
                if (state.mainView.dynamicToggle) state.mainView.dynamicToggle.setAttribute('toggle', true);
                if (game.qhly_skinIs(name, fileName + '.jpg')) game.qhly_setOriginSkin(name, fileName + '.jpg', state.mainView.avatarImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage, null, state.name) == 2);
              }
              if (from && game.qhly_skinIs(name, fileName + '.jpg')) from.qhly_origin_setBackgroundImage(file);
              if (_status.qhly_skinListCache && _status.qhly_skinListCache[name]) delete _status.qhly_skinListCache[name];
              exit();
            })
          });
        }
        function exit() {
          bg4.stopDynamic();
          if (bg4.dynamic && bg4.dynamic.renderer.postMessage) {
            bg4.dynamic.renderer.postMessage({
              message: "DESTROY",
              id: bg4.dynamic.id,
            })
            bg4.dynamic.renderer.capacity--;
          }
          game.documentZoom = game.deviceZoom * zoom;
          ui.updatez();
          bg.remove();
        }
        const btn2 = document.getElementById('qh-d2icancel');
        btn2.onclick = exit;
      }

      game.qhly_isForbidEditTaici = function (name) {
        var pkg = game.qhly_foundPackage(name);
        if (pkg && pkg.forbidEditTaici) {
          if (typeof pkg.forbidEditTaici == 'function') {
            return pkg.forbidEditTaici(name);
          }
          return pkg.forbidEditTaici;
        }
        return false;
      };
      game.qhly_getViewSkills = function (name) {
        var viewSkills = [];
        var skills = get.character(name, 3);
        for (var skill of skills) {
          var info = get.info(skill);
          if (!info || info.nopop || !get.translation(skill + '_info') || !lib.skill[skill]) continue;
          viewSkills.add(skill);
          if (info.derivation) {
            if (typeof info.derivation === 'string' && lib.skill[info.derivation]) viewSkills.add(info.derivation);
            else {
              for (var s of info.derivation) {
                if (lib.skill[s]) viewSkills.add(s);
              }
            }
          }
        }
        return viewSkills;
      }
      //设置当前的皮肤。
      game.qhly_setCurrentSkin = function (name, skin, callback, save) {
        if (name.indexOf('gz_') == 0) {//国战兼容
          if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanSkin(name)) {
            const subname = name.slice(3);
            if (get.character(subname)) {
              name = subname;
            }
          }
        }
        const realName = game.qhly_getRealName(name);//添加皮肤共享
        const [skinPackage, skinPackage2] = [game.qhly_foundPackage(realName), game.qhly_foundPackage(name)];
        let extAudioPath = skinPackage2.audioOrigin;
        if (typeof extAudioPath == 'function') extAudioPath = extAudioPath(name);
        if (skin) {
          if (game.getFileList) {
            let path;
            if (window.qhly_audio_redirect && window.qhly_audio_redirect[realName + "-" + game.qhly_earse_ext(skin)]) {
              path = skinPackage.audio + realName + "/" + window.qhly_audio_redirect[realName + "-" + game.qhly_earse_ext(skin)];
            } else {
              path = skinPackage.audio + realName + "/" + skin;
              path = game.qhly_earse_ext(path);
            }
            game.qhly_checkFileExist(path, function (success) {
              if (success) {
                game.getFileList(path, function (folders, files) {
                  if (files.contains('audio-redirect.js')) {
                    lib.init.js(lib.assetURL + path + '/audio-redirect.js', null, function () {
                      game.qhly_setCurrentSkin(name, skin, callback);
                    });
                    return;
                  }
                  let arr = [];
                  let list = lib.config.qhly_skinset.skinAudioList[name];
                  if (list) {
                    for (let m of list) {
                      if (skinPackage2.isExt && m.indexOf('skill/') == 0) {
                        delete lib.config.qhly_skinset.audioReplace["../" + extAudioPath + m.slice(6)];
                      }
                      else delete lib.config.qhly_skinset.audioReplace[m];//删除原有的音频映射。
                    }
                  }
                  if (skinPackage2.isExt) {
                    delete lib.config.qhly_skinset.audioReplace["../" + extAudioPath + name];
                    delete lib.config.qhly_skinset.audioReplace["../" + extAudioPath + 'victory'];
                    delete lib.config.qhly_skinset.audioReplace["../" + skinPackage2.audio + name + '/victory'];
                  }
                  else {
                    delete lib.config.qhly_skinset.audioReplace['die/' + name];
                    delete lib.config.qhly_skinset.audioReplace['victory/' + name];
                  }
                  for (let file of files) {
                    file = game.qhly_earse_ext(file);
                    if (!skinPackage.isExt || realName != name) {
                      if (file == realName) {
                        arr.push("die/" + name);
                        if (skinPackage2.isExt) lib.config.qhly_skinset.audioReplace["../" + extAudioPath + name] = "../" + path + "/" + realName;
                        else lib.config.qhly_skinset.audioReplace["die/" + name] = "../" + path + "/" + realName;
                      } else if (file == 'victory') {
                        arr.push("victory/" + name);
                        if (skinPackage2.isExt) lib.config.qhly_skinset.audioReplace["../" + path + '/victory'] = "../" + path + '/victory';
                        else lib.config.qhly_skinset.audioReplace["victory/" + name] = "../" + path + "/victory";
                      } else {
                        let skills = [], file2 = '', skillAudio = '', flag = false;
                        let str = file;
                        let fileNum = file.charAt(file.length - 1);
                        if (isNaN(fileNum)) {
                          str = file;
                          fileNum = ''
                        }
                        else str = file.slice(0, file.length - 1);
                        if (lib.qhly_skinShare[name] && lib.qhly_skinShare[name].skills) {
                          if (lib.character[name]) {
                            skills = game.qhly_getViewSkills(name);
                            for (let i of skills) {
                              if (lib.qhly_skinShare[name].skills[i]) {
                                skillAudio = game.qhly_getSkillAudioName(i, { name: name })
                                file2 = game.qhly_getSkillAudioName(lib.qhly_skinShare[name].skills[i], { name: realName });

                                if (file2 == str) {
                                  arr.push("skill/" + skillAudio + fileNum);
                                  flag = true;
                                  break;
                                }
                              }
                            }
                            if (!flag) arr.push("skill/" + file);
                          }
                        }
                        else arr.push("skill/" + file);//创建音频映射。
                        if (skinPackage2.isExt) {
                          if (file2) {
                            lib.config.qhly_skinset.audioReplace["../" + extAudioPath + skillAudio + fileNum] = "../" + path + "/" + file;
                          }
                          else lib.config.qhly_skinset.audioReplace["../" + extAudioPath + file] = "../" + path + "/" + file;
                        }
                        else {
                          if (file2) {
                            lib.config.qhly_skinset.audioReplace["skill/" + skillAudio + fileNum] = "../" + path + "/" + file;
                          }
                          else lib.config.qhly_skinset.audioReplace["skill/" + file] = "../" + path + "/" + file;
                        }
                      }
                    } else {
                      let audioOrigin = skinPackage.audioOrigin;
                      if (typeof audioOrigin == 'function') {
                        audioOrigin = audioOrigin(name);
                      }
                      arr.push("../" + audioOrigin + file);
                      lib.config.qhly_skinset.audioReplace["../" + audioOrigin + file] = "../" + path + "/" + file;
                    }
                  }
                  lib.config.qhly_skinset.skinAudioList[name] = arr;
                  lib.config.qhly_skinset.skin[name] = skin;
                  game.qhlySyncConfig();
                  if (save) game.qhly_refresh(name, skin);
                  if (lib.qhly_callbackList) {
                    for (var pubCallback of lib.qhly_callbackList) {
                      if (pubCallback.onChangeSkin) {
                        pubCallback.onChangeSkin(name, skin);
                      }
                    }
                  }
                  if (callback) {
                    callback();
                  }
                });
              } else {
                let arr = [];
                let list = lib.config.qhly_skinset.skinAudioList[name];
                if (list) {
                  for (let m of list) {
                    delete lib.config.qhly_skinset.audioReplace[m];
                  }
                }
                delete lib.config.qhly_skinset.audioReplace['die/' + name];
                //delete lib.config.qhly_skinset.audioReplace['victory/' + name];
                lib.config.qhly_skinset.skinAudioList[name] = arr;
                lib.config.qhly_skinset.skin[name] = skin;
                game.qhlySyncConfig();
                if (save) game.qhly_refresh(name, skin);
                if (lib.qhly_callbackList) {
                  for (let pubCallback of lib.qhly_callbackList) {
                    if (pubCallback.onChangeSkin) {
                      pubCallback.onChangeSkin(name, skin);
                    }
                  }
                }
                if (callback) {
                  callback();
                }
              }
            });
          } else {
            alert("尚未加载完成！");
          }
        } else {
          let list = lib.config.qhly_skinset.skinAudioList[name];
          if (list) {
            for (let m of list) {
              if (skinPackage2.isExt) delete lib.config.qhly_skinset.audioReplace["../" + extAudioPath + m.slice(6)];
              delete lib.config.qhly_skinset.audioReplace[m];
            }
          }
          if (skinPackage2.isExt) {
            delete lib.config.qhly_skinset.audioReplace["../" + extAudioPath + name];
            delete lib.config.qhly_skinset.audioReplace["../" + extAudioPath + 'victory'];
            delete lib.config.qhly_skinset.audioReplace["../" + skinPackage2.audio + name + '/victory'];
            lib.config.qhly_skinset.audioReplace["../" + skinPackage2.audio + name + '/victory'] = "../" + skinPackage.audio + realName + "/victory";
          }
          else {
            delete lib.config.qhly_skinset.audioReplace['die/' + name];
            delete lib.config.qhly_skinset.audioReplace['victory/' + name];
            lib.config.qhly_skinset.audioReplace["victory/" + name] = "../" + skinPackage.audio + realName + '/victory';
          }
          delete lib.config.qhly_skinset.skin[name];
          delete lib.config.qhly_skinset.skinAudioList[name];
          game.qhlySyncConfig();
          if (save) game.qhly_refresh(name, skin);
          if (lib.qhly_callbackList) {
            for (let pubCallback of lib.qhly_callbackList) {
              if (pubCallback.onChangeSkin) {
                pubCallback.onChangeSkin(name, skin);
              }
            }
          }
          if (callback) {
            callback();
          }
        }
      };
      get.qhly_getCurrentViewSkinValue = function (name, fallback) {
        var skin = lib.qhly_viewskin[lib.config.qhly_currentViewSkin];
        if (!skin) return fallback;
        if (!skin[name]) return fallback;
        return skin[name];
      };
      //播放死亡配音。
      window.qhly_playDieAudio = function (name) {
        if (_status.qhly_audioTry) _status.qhly_audioTry.remove();
        var skinPackage = game.qhly_foundPackage(name);
        if (skinPackage.isExt) {
          var path = skinPackage.audioOrigin;
          if (typeof path == 'function') {
            path = path(name);
          }
          path = path + name;
          var arr = path.split("/");
          var params = [".."];
          params.addArray(arr);
          _status.qhly_audioTry = game.playAudio.apply(game, params);
        } else {
          _status.qhly_audioTry = game.playAudio("die", name, function () {
            _status.qhly_audioTry = game.playAudio('die', name.slice(name.indexOf('_') + 1));
          });
        }
      };
      //播放胜利配音。
      window.qhly_playVictoryAudio = function (name) {
        var skinName = game.qhly_earse_ext(game.qhly_getSkin(name));
        if (_status.qhly_audioTry) _status.qhly_audioTry.remove();
        var skinPackage = game.qhly_foundPackage(name);
        if (skinPackage.isExt) {
          var path = skinPackage.audio;
          if (typeof path == 'function') {
            path = path(name);
          }
          path = path + name;
          if (skinName) path = path + '/' + skinName;
          path += '/victory';
          var arr = path.split("/");
          var params = [".."];
          params.addArray(arr);
          _status.qhly_audioTry = game.playAudio.apply(game, params);
        } else {
          _status.qhly_audioTry = game.playAudio("victory", name, function () {
            _status.qhly_audioTry = game.playAudio('victory', name.slice(name.indexOf('_') + 1));
          });
        }
      };

      game.qhly_getSkillAudioName = function (skill, player) {//获取技能播放的技能语音名
        var info = get.info(skill);
        if (!info) return null;
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
            if (audioinfo.length == 3) return audioname;

          }
        }
        else if (Array.isArray(audioinfo)) {
          audioname = audioinfo[0];
          audioinfo = audioinfo[1];
        }
        if (Array.isArray(info.audioname) && player) {
          if (info.audioname.contains(player.name)) {
            audioname += '_' + player.name;
          }
          else if (info.audioname.contains(player.name1)) {
            audioname += '_' + player.name1;
          }
          else if (info.audioname.contains(player.name2)) {
            audioname += '_' + player.name2;
          }
        }
        if (audioinfo) return audioname;
        else if (info.audio !== false) return audioname;
      }
      window.qhly_getSkillAudioKey=function(skill,player,which){
        var info = get.info(skill);
        if (!info) return "";
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
                  return "../extension/"+audioinfo[1]+"/"+audioname;
                }
                else {
                  audioinfo[2] = parseInt(audioinfo[2]);
                  if (audioinfo[2]) {
                    if (typeof which == 'number') {
                      return "../extension/"+audioinfo[1]+"/"+audioname+(which % audioinfo[2] + 1);
                    } else {
                      return "../extension/"+audioinfo[1]+"/"+audioname+Math.ceil(audioinfo[2] * Math.random());
                    }
                  }
                }
              }
              return "";
            }
          }
          else if (Array.isArray(audioinfo)) {
            audioname = audioinfo[0];
            audioinfo = audioinfo[1];
          }
          if (Array.isArray(info.audioname) && player) {
            if (info.audioname.contains(player.name)) {
              audioname += '_' + player.name;
            }
            else if (info.audioname.contains(player.name1)) {
              audioname += '_' + player.name1;
            }
            else if (info.audioname.contains(player.name2)) {
              audioname += '_' + player.name2;
            }
          }
          if (typeof audioinfo == 'number') {
            if (typeof which == 'number') {
              //alert('4');
              return "skill"+"/"+ audioname + (which % audioinfo + 1);
            } else {
              //alert('5');
              return "skill/"+audioname + Math.ceil(audioinfo * Math.random());
            }
          }
          else if (audioinfo) {
            //alert('6');
            return "skill/"+audioname;
          }
          else if (true && info.audio !== false) {
            return "skill/"+audioname;
          }
        }
        return "";
      };
      //播放技能语音。
      window.qhly_TrySkillAudio = function (skill, player, directaudio, which, skin) {
        //alert(skill+" "+player.name);
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
                }
                else {
                  audioinfo[2] = parseInt(audioinfo[2]);
                  if (audioinfo[2]) {
                    if (typeof which == 'number') {
                      game.playAudio('..', 'extension', audioinfo[1], audioname + (which % audioinfo[2] + 1));
                    } else {
                      //4VrLPyXM/UwVl3SXOMoDpBLQcoJHwBtPcxBNF1VM6oxC7qONebCO4KekZdetP8Zs
                      game.playAudio('..', 'extension', audioinfo[1], audioname + Math.ceil(audioinfo[2] * Math.random()));
                    }
                  }
                }
              }
              delete _status.qhly_previewAudio;
              return;
            }
          }
          else if (Array.isArray(audioinfo)) {
            audioname = audioinfo[0];
            audioinfo = audioinfo[1];
          }
          if (Array.isArray(info.audioname) && player) {
            if (info.audioname.contains(player.name)) {
              audioname += '_' + player.name;
            }
            else if (info.audioname.contains(player.name1)) {
              audioname += '_' + player.name1;
            }
            else if (info.audioname.contains(player.name2)) {
              audioname += '_' + player.name2;
            }
          }
          if (typeof audioinfo == 'number') {
            if (typeof which == 'number') {
              //alert('4');
              game.playAudio('skill', audioname + (which % audioinfo + 1));
            } else {
              //alert('5');
              game.playAudio('skill', audioname + Math.ceil(audioinfo * Math.random()));
            }
          }
          else if (audioinfo) {
            //alert('6');
            game.playAudio('skill', audioname);
          }
          else if (true && info.audio !== false) {
            game.playSkillAudio(audioname);
          }
        }
      };
      get.qhly_characterInfo = function (name) {
        var ret = '';
        for (var obj of lib.qhlypkg) {
          if (obj.characterInfo) {
            var m = obj.characterInfo(name);
            if (m) {
              ret += m;
              ret += "<br><br>";
            }
          }
        }
        if (ret.length == 0) {
          ret = "<br><br>" + get.characterIntro(name) + "<br><br><br>";
        }
        return ret;
      }

      lib.qhly_getEventPosition = function (event) {
        var x = event.clientX;
        var y = event.clientY;
        if (lib.config.touchscreen && event.touches && event.touches.length) {
          x = event.touches[0].clientX;
          y = event.touches[0].clientY;
        }
        return { x: x / game.documentZoom, y: y / game.documentZoom };
      };
      lib.qhly_computeDistance = function (x0, y0, x1, y1) {
        var dx = x0 - x1;
        var dy = y0 - y1;
        return Math.sqrt(dx * dx + dy * dy);
      };
      lib.qhly_setPosition = function (div, x, y) {
        div.style.left = x.toFixed(3) + 'px';
        div.style.top = y.toFixed(3) + 'px';
      };
      game.qhly_open_small_dragon = function (name, from, ingame) {
        if (_status.qhly_open) return;
        _status.qhly_open = true;
        game.qhly_playQhlyAudio('qhly_voc_click3', null, true);
        var baseHeight = ui.window.offsetHeight * 0.7;
        if (lib.config.qhly_dragonsize) {
          baseHeight = baseHeight * parseFloat(lib.config.qhly_dragonsize);
        }
        baseHeight = baseHeight.toFixed(3);
        var background = ui.create.div('.qhly-dragonwin-out');
        document.body.appendChild(background);
        var dragonwin = ui.create.div('.qhly-dragonback');
        ui.create.div('.qhly-dragonback-backgroundimage', dragonwin);
        var dragonhead = ui.create.div('.qhly-dragonhead');
        dragonwin.style.height = baseHeight + 'px';
        dragonwin.style.width = baseHeight + 'px';
        if (lib.config.qhly_dragonlocation && lib.config.qhly_dragonlocation != 'center') {
          dragonwin.style.transform = 'translate(0%, 0%)';
          if (lib.config.qhly_dragonlocation == 'head') {
            var player = from;
            if (!player) {
              var players = game.players.slice(0);
              players.addArray(game.dead);
              players = players.filter(function (current) {
                return current.name == name || current.name1 == name || current.name2 == name;
              });
              if (players.length) {
                player = players[0];
              }
            }
            if (player) {
              var rect = player.getBoundingClientRect();
              rect = game.qhly_handleRect(rect);
              var posx = rect.left - baseHeight / 2 + rect.width / 2;
              var posy = rect.top - baseHeight / 2 + rect.height / 2;
              //lib.qhly_setPosition(dragonhead,posx,posy);
              lib.qhly_setPosition(dragonwin, posx, posy);
            } else {
              dragonwin.style.left = 'calc(50% - ' + (baseHeight / 2).toFixed(2) + 'px)';
              dragonwin.style.top = 'calc(50% - ' + (baseHeight / 2).toFixed(2) + 'px)';
              //dragonhead.style.left = 'calc(50% - '+(baseHeight/2).toFixed(2)+'px)';
              //dragonhead.style.top = 'calc(50% - '+(baseHeight/2).toFixed(2)+'px)';
            }
          } else {
            if (!lib.config.qhly_dragonlocationValue) {
              dragonwin.style.left = 'calc(50% - ' + (baseHeight / 2).toFixed(2) + 'px)';
              dragonwin.style.top = 'calc(50% - ' + (baseHeight / 2).toFixed(2) + 'px)';
              //dragonhead.style.left = 'calc(50% - '+(baseHeight/2).toFixed(2)+'px)';
              //dragonhead.style.top = 'calc(50% - '+(baseHeight/2).toFixed(2)+'px)';
            } else {
              dragonwin.style.left = lib.config.qhly_dragonlocationValue.x;
              dragonwin.style.top = lib.config.qhly_dragonlocationValue.y;
              //dragonhead.style.left = lib.config.qhly_dragonlocationValue.x;
              //dragonhead.style.top = lib.config.qhly_dragonlocationValue.y;
            }
          }
        }
        background.appendChild(dragonwin);
        dragonwin.appendChild(dragonhead);
        var state = {
          preclicktime: 0,
          lastSpinTime: 0,
          skinWidthRate: 0.20754,
          skinHeightRate: 0.23095,
          curAngle: 0,
          visibleAngleStart: -180,
          visibleAngleEnd: 180,
          fadeAngleAreaStart: -160,
          fadeAngleAreaEnd: 160,
          skinCircleRaduisRate: 0.23017,
          skins: [],
          skinViews: [],
          skinOrder: function (view) {
            if (view.skinOrder === undefined) {
              for (var i = 0; i < this.skinViews.length; i++) {
                this.skinViews[i].skinOrder = i;
              }
            }
            return view.skinOrder;
          },
          angleLocationOf: function (view) {
            return this.curAngle + this.skinOrder(view) * this.perAngle();
          },
          perAngle: function () {
            if (this.skins.length >= 8 || this.skins.length <= 1) {
              return 45;
            }
            return 360 / this.skins.length;
          },
          refreshSkins: function () {
            for (var skinView of this.skinViews) {
              this.refreshLocation(skinView);
            }
          },
          handleRect: function (rect) {
            if (game.qhly_hasExtension('十周年UI')) return rect;
            return {
              width: rect.width / game.documentZoom,
              height: rect.height / game.documentZoom,
              left: rect.left / game.documentZoom,
              top: rect.top / game.documentZoom,
            };
          },
          refreshLocation: function (view) {
            if (!this.isVisible(view)) {
              view.hide();
              return;
            } else {
              view.show();
            }
            var rect = dragonwin.getBoundingClientRect();
            rect = this.handleRect(rect);
            var opacity = this.opacity(view);
            view.style.opacity = opacity;
            var angleLocation = this.angleLocationOf(view);
            var radius = this.skinCircleRaduisRate * rect.width;
            var angleArc = angleLocation / 180 * Math.PI;
            var xFromCenter = radius * Math.sin(angleArc);
            var yFromCenter = radius * Math.cos(angleArc);
            var x = xFromCenter + rect.width / 2 - this.skinWidthRate * rect.width / 2;
            var y = yFromCenter + rect.height / 2 - this.skinHeightRate * rect.width / 2;
            view.style.left = x.toFixed(3) + 'px';
            view.style.top = y.toFixed(3) + 'px';
            view.style.width = (this.skinWidthRate * rect.width).toFixed(3) + 'px';
            view.style.height = (this.skinHeightRate * rect.height).toFixed(3) + 'px';
            var skin = this.skins[this.skinOrder(view)];
            var currentSkinId = game.qhly_getSkin(name);
            if (skin == currentSkinId || (!skin && !currentSkinId)) {
              view.setBackgroundImage('extension/千幻聆音/theme/shuimo/newui_skin_background_shuimo.png');
            } else {
              view.setBackgroundImage('');
            }
          },
          isVisible: function (view) {
            if (this.skins.length <= 8) return true;
            var angle = this.angleLocationOf(view);
            return angle >= this.visibleAngleStart && angle <= this.visibleAngleEnd;
          },
          opacity: function (view) {
            if (!this.isVisible(view)) return 0;
            if (this.skins.length <= 8) return 1;
            var angle = this.angleLocationOf(view);
            if (angle > this.fadeAngleAreaStart && angle < this.fadeAngleAreaEnd) {
              return 1;
            }
            if (angle < this.fadeAngleAreaStart) {
              return Math.abs((angle - this.fadeAngleAreaStart) / (this.visibleAngleStart - this.fadeAngleAreaStart)) / 2;
            }
            return Math.abs((angle - this.fadeAngleAreaEnd) / (this.visibleAngleEnd - this.fadeAngleAreaEnd)) / 2;
          },
          onClickSkin: function (event, name, skin, skinView) {
            if (this.opacity(skinView) != 1) return;
            var currentSkinId = game.qhly_getSkin(name);
            if (skin == currentSkinId || (!skin && !currentSkinId)) {
              return;
            }
            game.qhly_setCurrentSkin(name, skin, function () {
              game.qhly_playQhlyAudio('qhly_voc_click2', null, true);
              this.refresh();
              if (lib.config.qhly_smallwinclosewhenchange) {
                background.delete();
                _status.qhly_open = false;
              }
            }.bind(this), true);
          },
          refresh: function () {
            this.refreshSkins();
          },
          maxAngle: function () {
            return 0;
          },
          minAngle: function () {
            return -(this.skins.length - 1) * this.perAngle();
          },
          onSpinBegin: function (e) {
            var pos = lib.qhly_getEventPosition(e);
            var rect = dragonwin.getBoundingClientRect();
            rect = this.handleRect(rect);
            var centerX = rect.left + rect.width / 2;
            var centerY = rect.top + rect.height / 2;
            var distance = lib.qhly_computeDistance(pos.x, pos.y, centerX, centerY);
            if (distance >= rect.width * 0.1717 && distance < rect.width * 0.3758) {
              e.stopPropagation();
              delete this.spinDirection;
              this.isSpin = true;
              this.spinStartPosition = pos;
              this.spinStartAngle = this.curAngle;
            }
          },
          computeSpinDirection: function (pos0, pos1) {
            var rect = dragonwin.getBoundingClientRect();
            rect = this.handleRect(rect);
            var centerX = rect.left + rect.width / 2;
            var centerY = rect.top + rect.height / 2;
            var posA = { x: pos0.x - centerX, y: pos0.y - centerY };
            var posB = { x: pos1.x - centerX, y: pos1.y - centerY };
            var toAngle = function (pos) {
              var cos = pos.x / Math.sqrt(pos.x * pos.x + pos.y * pos.y);
              if (pos.y > 0) return Math.acos(cos) / Math.PI * 180;
              return 360 - Math.acos(cos) / Math.PI * 180;
            };
            var angleA = toAngle(posA);
            var angleB = toAngle(posB);
            var ret = angleB - angleA;
            if (ret <= 180 && ret >= -180) {
              return ret;
            }
            if (ret < -180) return ret + 360;
            if (ret > 180) return ret - 360;
          },
          onSpinMove: function (e) {
            if (!this.isSpin) return;
            var pos = lib.qhly_getEventPosition(e);
            var direction = this.computeSpinDirection(this.spinStartPosition, pos);
            if (Math.abs(direction) >= 5) {
              this.lastSpinTime = (new Date()).valueOf();
            }
            var newCur = this.curAngle - direction;
            if (this.skins.length <= 8) {
              while (newCur < -180) {
                newCur += 360;
              }
              while (newCur > 180) {
                newCur -= 360;
              }
            } else {
              if (newCur > this.maxAngle()) {
                newCur = this.maxAngle();
              } else if (newCur < this.minAngle()) {
                newCur = this.minAngle();
              }
            }
            this.curAngle = newCur;
            this.spinStartPosition = pos;
            this.refresh();
          },
          onSpinEnd: function (e) {
            if (this.isSpin) {
              e.stopPropagation();
              delete this.isSpin;
            }
          },
          onSpinCancel: function (e) {
            if (this.isSpin) {
              e.stopPropagation();
              delete this.isSpin;
            }
          },
          init: function () {
            var currentSkinId = game.qhly_getSkin(name);
            if (!currentSkinId) {
              this.curAngle = -90;
            } else {
              for (var i = 0; i < this.skins.length; i++) {
                if (this.skins[i] == currentSkinId) {
                  this.curAngle = -this.perAngle() * i;
                  break;
                }
              }
            }
            if (this.skins.length <= 2) {
              this.skinWidthRate *= 1.35;
              this.skinHeightRate *= 1.35;
            } else if (this.skins.length <= 4) {
              this.skinWidthRate *= 1.2;
              this.skinHeightRate *= 1.2;
            }
            if (this.skins.length <= 8) {
              dragonhead.style.zIndex = 4;
            } else {
              dragonhead.style.zIndex = 10;
            }
            for (var i = 0; i < this.skins.length; i++) {
              var skinView = ui.create.div('.qhly-dragonskin');
              this.skinViews.push(skinView);
              var skinCover = ui.create.div('.qhly-dragonskincover', skinView);
              skinCover.classList.add('qh-not-replace')
              skinView.skinCover = skinCover;
              skinView.skinOrder = i;
              skinView.hide();
              var skin = this.skins[i];
              if (skin) {
                var file = game.qhly_getSkinFile(name, skin);
                skinCover.qhly_origin_setBackgroundImage(file);
              } else {
                skinCover.qhly_origin_setBackground(name, 'character');
              }
              var that = this;
              (function (name, skin, skinView) {
                skinCover.qhly_listen(function (e) {
                  that.onClickSkin(e, name, skin, skinView);
                });
              }.bind(this))(name, skin, skinView);
              dragonwin.appendChild(skinView);
              this.refreshLocation(skinView);
            }
          },
        };
        var clickOutBegin = function (event) {
          var pos = lib.qhly_getEventPosition(event);
          var rect = dragonwin.getBoundingClientRect();
          rect = state.handleRect(rect);
          var centerX = rect.left + rect.width / 2;
          var centerY = rect.top + rect.height / 2;
          var distance = lib.qhly_computeDistance(pos.x, pos.y, centerX, centerY);
          if (distance < rect.width * 0.3758) {
            return;
          }
          background.qh_startClick = true;
        };
        var clickOutLeave = function (event) {
          delete background.qh_startClick;
        };
        var clickOutUp = function (event) {
          if (background.qh_startClick || lib.config.touchscreen) {
            if (lib.config.touchscreen) {
              var pos = lib.qhly_getEventPosition(event);
              var rect = dragonwin.getBoundingClientRect();
              rect = state.handleRect(rect);
              var centerX = rect.left + rect.width / 2;
              var centerY = rect.top + rect.height / 2;
              var distance = lib.qhly_computeDistance(pos.x, pos.y, centerX, centerY);
              if (distance < rect.width * 0.3758) {
                return;
              }
            }
            background.delete();
            _status.qhly_open = false;
            game.qhly_playQhlyAudio('qhly_voc_click3', null, true);
          }
          delete background.qh_startClick;
        };
        if (lib.config.touchscreen) {
          background.addEventListener('touchstart', clickOutBegin);
          background.addEventListener('touchend', clickOutUp);
          background.addEventListener('touchcancel', clickOutLeave);
        } else {
          background.addEventListener('mousedown', clickOutBegin);
          background.addEventListener('mouseup', clickOutUp);
          background.addEventListener('mouseleave', clickOutLeave);
        }
        if (lib.config.touchscreen) {
          dragonwin.addEventListener('touchstart', function (e) {
            state.onSpinBegin(e);
          });
          dragonwin.addEventListener('touchend', function (e) {
            state.onSpinEnd(e);
          });
          dragonwin.addEventListener('touchmove', function (e) {
            state.onSpinMove(e);
          });
          dragonwin.addEventListener('touchcancel', function (e) {
            state.onSpinCancel(e);
          });
        } else {
          dragonwin.addEventListener('mousedown', function (e) {
            state.onSpinBegin(e);
          });
          dragonwin.addEventListener('mouseup', function (e) {
            state.onSpinEnd(e);
          });
          dragonwin.addEventListener('mousemove', function (e) {
            state.onSpinMove(e);
          });
          dragonwin.addEventListener('mouseleave', function (e) {
            state.onSpinCancel(e);
          });
        }
        dragonwin.listen(function (e) {
          var pos = lib.qhly_getEventPosition(e);
          var rect = dragonwin.getBoundingClientRect();
          rect = state.handleRect(rect);
          var centerX = rect.left + rect.width / 2;
          var centerY = rect.top + rect.height / 2;
          var distance = lib.qhly_computeDistance(centerX, centerY, pos.x, pos.y);
          if (distance < rect.width * 0.3758) {
            e.stopPropagation();
          }
          if (distance > rect.width * 0.1717) {
            return;
          }
          var time = (new Date()).valueOf();
          if (time - state.preclicktime < 250) {
            background.delete();
            _status.qhly_open = false;
            game.qhly_open_new(name, lib.config.qhly_doubledefaultpage ? lib.config.qhly_doubledefaultpage : 'skill', ingame);
          }
          state.preclicktime = time;
          e.stopPropagation();
        });
        if (lib.config.qhly_dragonlocation == 'drag' || lib.config.qhly_dragonlocation == 'head') {
          var dragMouseDown = function (e) {
            var pos = lib.qhly_getEventPosition(e);
            var rect = dragonwin.getBoundingClientRect();
            rect = game.qhly_handleRect(rect);
            var centerX = rect.left + rect.width / 2;
            var centerY = rect.top + rect.height / 2;
            var distance = lib.qhly_computeDistance(centerX, centerY, pos.x, pos.y);
            if (distance < rect.width * 0.1717) {
              state.isDragging = true;
              state.beginPosition = {
                x: rect.left,
                y: rect.top
              };
              state.beginMousePosition = {
                x: pos.x,
                y: pos.y
              };
            }
          };
          var dragMouseMove = function (e) {
            if (state.isDragging) {
              var pos = lib.qhly_getEventPosition(e);
              if (lib.qhly_computeDistance(pos.x, pos.y, state.beginMousePosition.x, state.beginMousePosition.y) > 10) {
                var baisx = pos.x - state.beginMousePosition.x;
                var baisy = pos.y - state.beginMousePosition.y;
                var newx = state.beginPosition.x + baisx;
                var newy = state.beginPosition.y + baisy;
                dragonwin.style.left = newx.toFixed(3) + "px";
                dragonwin.style.top = newy.toFixed(3) + "px";
                //dragonhead.style.left = newx.toFixed(3)+"px";
                //dragonhead.style.top = newy.toFixed(3)+"px";
              }
              e.stopPropagation();
            }
          };
          var dragMouseUp = function (e) {
            if (state.isDragging) {
              var pos = lib.qhly_getEventPosition(e);
              var baisx = pos.x - state.beginMousePosition.x;
              var baisy = pos.y - state.beginMousePosition.y;
              var newx = state.beginPosition.x + baisx;
              var newy = state.beginPosition.y + baisy;
              dragonwin.style.left = newx.toFixed(3) + "px";
              dragonwin.style.top = newy.toFixed(3) + "px";
              //dragonhead.style.left = newx.toFixed(3)+"px";
              //dragonhead.style.top = newy.toFixed(3)+"px";
              game.saveConfig('qhly_dragonlocationValue', { x: dragonwin.style.left, y: dragonwin.style.top });
              delete state.isDragging;
              e.stopPropagation();
            }
          };
          var dragMouseCancel = function (e) {
            if (state.isDragging) {
              delete state.isDragging;
              e.stopPropagation();
            }
          };
          if (lib.config.touchscreen) {
            dragonwin.addEventListener('touchstart', dragMouseDown);
            dragonwin.addEventListener('touchend', dragMouseUp);
            dragonwin.addEventListener('touchmove', dragMouseMove);
            dragonwin.addEventListener('touchcancel', dragMouseCancel);
          } else {
            dragonwin.addEventListener('mousedown', dragMouseDown);
            dragonwin.addEventListener('mouseup', dragMouseUp);
            dragonwin.addEventListener('mousemove', dragMouseMove);
            dragonwin.addEventListener('mouseleave', dragMouseCancel);
          }
        }
        game.qhly_getSkinList(name, function (ret, list) {
          var pkg = game.qhly_foundPackage(name);
          if (!list) list = [];
          list.sort(function (a, b) {
            var orderA = game.qhly_getOrder(name, a, pkg);
            var orderB = game.qhly_getOrder(name, b, pkg);
            if (orderA > orderB) return 1;
            if (orderA == orderB) return 0;
            return -1;
          });
          var skinList = [null];
          if (list && list.length) {
            skinList.addArray(list);
          }
          state.skins = skinList;
          state.init();
          state.refreshSkins();
        }, false);

      };
      game.qhly_open_small = function (name, from, ingame) {
        if(!from){
          from = game.qhly_getCurrentPlayer(name)[0][0];
        }
        if (lib.config.qhly_smallwindowstyle == 'dragon' || !lib.config.qhly_smallwindowstyle) {
          game.qhly_open_small_shousha(name, from, ingame);
          return;
        }
        if(!from && ['decade','shousha'].contains(lib.config.qhly_smallwindowstyle)){
          game.qhly_open_small_dragon(name, from, ingame);
          return;
        }
        else if (lib.config.qhly_smallwindowstyle == 'decade') {
          game.qhly_open_small_decade(name, from, ingame);
          return;
        }
        else if (lib.config.qhly_smallwindowstyle == 'shousha') {
          game.qhly_open_small_shousha(name, from, ingame);
          return;
        }
        try {
          if (_status.qhly_open) return;
          _status.qhly_open = true;
          var background = ui.create.div('.qh-skinchange-background', document.body);
          var backgroundBack = ui.create.div('.qh-skinchange-background', background);
          var dialog = ui.create.div('.qh-skinchange-dialog', background);
          var exit = ui.create.div('.qh-skinchange-exit', dialog);
          var cover = ui.create.div('.qh-skinchange-cover', dialog);
          var content = ui.create.div('.qh-skinchange-area', cover);
          var enlarge = ui.create.div('.qh-skinchange-enlarge', dialog);
          var swipe_up = lib.config.swipe_up;
          lib.config.swipe_up = '';
          var swipe_down = lib.config.swipe_down;
          lib.config.swipe_down = '';
          var swipe_left = lib.config.swipe_left;
          lib.config.swipe_left = '';
          var swipe_right = lib.config.swipe_right;
          lib.config.swipe_right = '';
          var exitListener = function () {
            lib.config.swipe_up = swipe_up;
            lib.config.swipe_down = swipe_down;
            lib.config.swipe_left = swipe_left;
            lib.config.swipe_right = swipe_right;
            if (!_status.qhly_open) return;
            background.delete();
            game.qhly_playQhlyAudio('qhly_voc_press', null, true);
            delete _status.qhly_open;
          };
          var viewState = {
            offset: 0,
            skinTotalWidth: 500,
            skinPerWidth: 150,
            skinGap: 10,
            skins: [],
            skinViews: [],
            visibleWidth: function () {
              var rect = cover.getBoundingClientRect();
              return rect.width;
            },
            content: content,
            refresh: function () {
              this.content.style.width = Math.round(this.skinTotalWidth) + 'px';
              this.content.style.left = Math.round(this.offset) + "px";
            },
            refreshSkins: function () {
              for (var i = 0; i < this.skinViews.length; i++) {
                var skinView = this.skinViews[i];
                var skin = this.skins[i];
                if (game.qhly_skinIs(name, skin)) {
                  skinView.style.filter = "saturate(100%)";
                  skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                } else {
                  skinView.style.filter = "saturate(40%)";
                  skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                }
              }
            },
            handleMouseDown: function (x, y) {
              if (this.skinTotalWidth <= this.visibleWidth()) {
                return;
              }
              this.mouseDownX = x;
              this.mouseDownY = y;
              this.isTouching = true;
              this.cancelClick = false;
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
                return true;
              }
            },
            handleMouseUp: function (x, y) {
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
                this.offset = this.tempoffset;
              } else {
                this.cancelClick = false;
              }
              this.previousX = this.mouseDownX;
              this.previousY = this.mouseDownY;
              delete this.mouseDownX;
              delete this.mouseDownY;
            }
          };
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
          game.qhly_getSkinList(name, function (ret, list) {
            var pkg = game.qhly_foundPackage(name);
            if (!list) list = [];
            list.sort(function (a, b) {
              var orderA = game.qhly_getOrder(name, a, pkg);
              var orderB = game.qhly_getOrder(name, b, pkg);
              if (orderA > orderB) return 1;
              if (orderA == orderB) return 0;
              return -1;
            });
            var skinList = [null];
            if (list && list.length) {
              skinList.addArray(list);
            }
            viewState.skins = skinList;
            viewState.skinTotalWidth = (viewState.skinPerWidth + viewState.skinGap) * skinList.length - viewState.skinGap;
            for (var i = 0; i < skinList.length; i++) {
              var skin = skinList[i];
              var skinView = ui.create.div('.qh-skinchange-skin', content);
              viewState.skinViews.push(skinView);
              skinView.style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i) + "px";
              skinView.style.width = Math.round(viewState.skinPerWidth) + "px";
              skinView.classList.add('qh-not-replace');
              skinView.belowText = ui.create.div('.qh-skinchange-skin-text', skinView);
              if (i != skinList.length - 1) {
                var border = ui.create.div('.qh-skinchange-border', content);
                border.style.width = Math.round(viewState.skinGap) + "px";
                border.style.left = Math.round((viewState.skinPerWidth + viewState.skinGap) * i + viewState.skinPerWidth) + "px";
              }
              if (skin) {
                var info = game.qhly_getSkinInfo(name, skin);
                if (info) {
                  skinView.belowText.innerHTML = info.translation;
                }
              } else {
                skinView.belowText.innerHTML = "初始皮肤";
              }
              //skinView.belowText.innerHTML=game.qhly_rename(skinView.belowText.innerHTML);
              if (game.qhly_skinIs(name, skin)) {
                skinView.style.filter = "saturate(100%)";
                skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
              } else {
                skinView.style.filter = "saturate(40%)";
                skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
              }
              (function (name, skin, view) {
                view.listen(function () {
                  if (viewState.cancelClick) return;
                  if (game.qhly_skinIs(name, skin)) return;
                  game.qhly_playQhlyAudio('qhly_voc_fanshu', null, true);
                  game.qhly_setCurrentSkin(name, skin, function () {
                    viewState.refreshSkins();
                    if (lib.config.qhly_smallwinclosewhenchange) {
                      exitListener();
                    }
                  }, true);
                });
              })(name, skin, skinView);
              if (skin) {
                var file = game.qhly_getSkinFile(name, skin);
                skinView.qhly_origin_setBackgroundImage(file);
              } else {
                skinView.qhly_origin_setBackground(name, 'character');
              }
            }
            viewState.refresh();
          }, false);
          backgroundBack.listen(function (event) {
            exitListener();
          });
          exit.listen(exitListener);
          enlarge.listen(function () {
            exitListener();
            game.qhly_open_new(name, lib.config.qhly_doubledefaultpage ? lib.config.qhly_doubledefaultpage : 'skill', ingame);
          });
        } catch (e) {
          if (QHLY_DEBUGMODE) {
            throw e;
          }
        }
      };
      if(!lib.config.qhly_autoChangeSkin) {
         lib.config.qhly_autoChangeSkin="random";
         game.saveConfig('extension_千幻聆音_qhly_autoChangeSkin', 'random');
         game.saveConfig('qhly_autoChangeSkin', 'random');
         lib.config.qhly_smallwinclosewhenchange=true;
         game.saveConfig('extension_千幻聆音_qhly_smallwinclosewhenchange', true);
         game.saveConfig('qhly_smallwinclosewhenchange', true);
      }
      //------------------------------十周年小窗口换肤--decadesmall-------------------------
      game.qhly_open_small_decade = function (name, from, ingame) {
        try {
          if (_status.qhly_open) return;
          _status.qhly_open = true;
          var cPlayer = from;
          if (!cPlayer) cPlayer = game.qhly_getCurrentPlayer(name)[0][0];
          //let rareceshi = ui.create.div('.qh-skinchange-rare', cPlayer);
          var background = ui.create.div('.qh-skinchange-background', document.body);
          var backgroundBack = ui.create.div('.qh-skinchange-background', background);
          var dialog = ui.create.div('.qh-skinchange-decade-dialog', background);
          if (lib.config.extension_千幻聆音_qhly_lutouType && lib.config.extension_千幻聆音_qhly_lutouType == 'shousha') dialog.classList.add('shousha');
          if (lib.config.qhly_lutou) dialog.setAttribute('data-outcrop-skin', 'on');
          //var exit = ui.create.div('.qh-skinchange-decade-exit', dialog);
          var cover = ui.create.div('.qh-skinchange-decade-cover', dialog);
          cover.setAttribute('data-visible', 1);
          cover.id = 'data-cover';
          var content1 = ui.create.div('.qh-skinchange-decade-area1', cover);
          content1.id = 'content1';
          var content2 = ui.create.div('.qh-skinchange-decade-area2', cover);
          content2.id = 'content2';
          rArrow1 = ui.create.div('.qh-skinchange-decade-arrow', dialog);
          lArrow1 = ui.create.div('.qh-skinchange-decade-arrow.left', dialog);
          rArrow2 = ui.create.div('.qh-skinchange-decade-arrow', dialog);
          lArrow2 = ui.create.div('.qh-skinchange-decade-arrow.left', dialog);
          var autoskin = ui.create.div('.qh-skinchange-decade-autoskin', dialog);
          ui.create.div('.qh-skinchange-decade-autoskinborder', autoskin);
          ui.create.div('.qh-skinchange-decade-autoskinitem', autoskin);
          var enlarge = ui.create.div('.qh-skinchange-decade-enlarge', dialog);
          if (lib.config.qhly_autoChangeSkin == 'close' || !lib.config.qhly_autoChangeSkin) autoskin.setAttribute('data-auto', false);
          else autoskin.setAttribute('data-auto', true);
          autoskin.listen(function () {
            var open = false, item = 'close';
            if (lib.config.qhly_autoChangeSkin == 'close' || !lib.config.qhly_autoChangeSkin) {
              open = true;
              item = lib.config['extension_千幻聆音_qhly_decadeAuto'];
            }
            game.saveConfig('extension_千幻聆音_qhly_autoChangeSkin', item);
            game.saveConfig('qhly_autoChangeSkin', item);
            if (open) {
              autoskin.setAttribute('data-auto', true);
              game.qhly_autoChangeSkin();
            } else {
              autoskin.setAttribute('data-auto', false);
              if (_status.qhly_changeSkinFunc) {
                clearTimeout(_status.qhly_changeSkinFunc);
              }
            }
          })
          var zhufu = ui.create.div('.qh-skinchange-decade-zhufu', dialog);
          var zhuskinBut = ui.create.div('.qh-zhuskin', zhufu);
          var fuskinBut = ui.create.div('.qh-fuskin', zhufu);
          if (cPlayer && cPlayer.name2) {
            dialog.setAttribute('data-double', true);
            if (cPlayer.name2 == name) {
              fuskinBut.classList.add('sel');
              cover.setAttribute('data-visible', 2);
            }
            else {
              zhuskinBut.classList.add('sel');
              cover.setAttribute('data-visible', 1);
            }
          }
          zhuskinBut.listen(function () {
            if (zhuskinBut.classList.contains('sel')) return;
            if (cPlayer && cPlayer.classList.contains('unseen') && cPlayer != game.me) return;
            fuskinBut.classList.remove('sel');
            zhuskinBut.classList.add('sel');
            cover.setAttribute('data-visible', 1);
            viewState1.refresh();
          })
          fuskinBut.listen(function () {
            if (fuskinBut.classList.contains('sel')) return;
            if (cPlayer && cPlayer.classList.contains('unseen2') && cPlayer != game.me) return;
            zhuskinBut.classList.remove('sel');
            fuskinBut.classList.add('sel');
            cover.setAttribute('data-visible', 2);
            viewState2.refresh();
          })
          var swipe_up = lib.config.swipe_up;
          lib.config.swipe_up = '';
          var swipe_down = lib.config.swipe_down;
          lib.config.swipe_down = '';
          var swipe_left = lib.config.swipe_left;
          lib.config.swipe_left = '';
          var swipe_right = lib.config.swipe_right;
          lib.config.swipe_right = '';
          var exitListener = function () {
            lib.config.swipe_up = swipe_up;
            lib.config.swipe_down = swipe_down;
            lib.config.swipe_left = swipe_left;
            lib.config.swipe_right = swipe_right;
            if (!_status.qhly_open) return;
            for (var i = 0; i < viewState1.skinViews.length; i++) {
              if (viewState1.skinViews[i].dynamic && viewState1.skinViews[i].dynamic.renderer.postMessage) {
                viewState1.skinViews[i].dynamic.renderer.postMessage({
                  message: "DESTROY",
                  id: viewState1.skinViews[i].dynamic.id,
                })
                viewState1.skinViews[i].dynamic.renderer.capacity--;
              }
            }
            if (cPlayer && cPlayer.name2) {
              for (var i = 0; i < viewState2.skinViews.length; i++) {
                if (viewState2.skinViews[i].dynamic && viewState2.skinViews[i].dynamic.renderer.postMessage) {
                  viewState2.skinViews[i].dynamic.renderer.postMessage({
                    message: "DESTROY",
                    id: viewState2.skinViews[i].dynamic.id,
                  })
                  viewState2.skinViews[i].dynamic.renderer.capacity--;
                }
              }
            }
            background.delete();
            game.qhly_playQhlyAudio('qhly_voc_dec_press', null, true);
            delete _status.qhly_open;
          };
          var viewState1 = {
            offset: 0,
            skinTotalWidth: 500,
            skinPerWidth: 120,
            skinGap: 42,
            skins: [],
            skinViews: [],
            visibleWidth: function () {
              var rect = cover.getBoundingClientRect();
              return rect.width;
            },
            cover: cover,
            content1: content1,
            refresh: function () {
              content1.style.width = Math.round(this.skinTotalWidth) + 'px';
              content1.style.left = Math.round(this.offset) + "px";
              if (this.skinTotalWidth + this.offset > 665 && this.cover.getAttribute('data-visible') == '1') this.rArrow.setAttribute('data-visiable', true);
              else {
                if (rTimer1) clearInterval(rTimer1);
                this.rArrow.setAttribute('data-visiable', false);
              }
              if (this.offset < 0 && this.cover.getAttribute('data-visible') == '1') this.lArrow.setAttribute('data-visiable', true);
              else {
                if (lTimer1) clearInterval(lTimer1);
                this.lArrow.setAttribute('data-visiable', false);
              }
            },
            rArrow: rArrow1,
            lArrow: lArrow1,
            refreshSkins: function () {
              for (var i = 0; i < this.skinViews.length; i++) {
                // var skinView = this.skinViews[i].avatar;
                var skin = this.skins[i];
                if (cPlayer && game.qhly_skinIs(cPlayer.name1, skin)) {
                  //skinView.style.filter = "grayscale(0)";
                  //skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                  this.skinViews[i].defaultskin.setAttribute('data-sel', true);
                } else {
                  //skinView.style.filter = "grayscale(100%)";
                  //skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                  this.skinViews[i].defaultskin.setAttribute('data-sel', false);
                }
              }
            },
            handleMouseDown: function (x, y) {
              if (this.skinTotalWidth <= this.visibleWidth()) {
                return;
              }
              this.mouseDownX = x;
              this.mouseDownY = y;
              this.isTouching = true;
              this.cancelClick = false;
              if (!this.offset) this.offset = content1.offsetLeft;
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
                this.content1.style.left = Math.round(this.tempoffset) + "px";
                if (this.skinTotalWidth + this.tempoffset > 665 && this.cover.getAttribute('data-visible') == '1') this.rArrow.setAttribute('data-visiable', true);
                else this.rArrow.setAttribute('data-visiable', false);
                if (this.tempoffset < 0 && this.cover.getAttribute('data-visible') == '1') this.lArrow.setAttribute('data-visiable', true);
                else this.lArrow.setAttribute('data-visiable', false);
                return true;
              }
            },
            handleMouseUp: function (x, y) {
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
                this.content1.style.left = Math.round(this.tempoffset) + "px";
              } else {
                this.cancelClick = false;
              }
              this.offset = this.tempoffset;
              this.previousX = this.mouseDownX;
              this.previousY = this.mouseDownY;
              delete this.mouseDownX;
              delete this.mouseDownY;
            }
          };
          if (cPlayer && cPlayer.name2) {
            var viewState2 = {
              offset: 0,
              skinTotalWidth: 500,
              skinPerWidth: 120,
              skinGap: 42,
              skins: [],
              skinViews: [],
              visibleWidth: function () {
                var rect = cover.getBoundingClientRect();
                return rect.width;
              },
              cover: cover,
              content2: content2,
              refresh: function () {
                content2.style.width = Math.round(this.skinTotalWidth) + 'px';
                content2.style.left = Math.round(this.offset) + "px";
                if (this.skinTotalWidth + this.offset > 665 && this.cover.getAttribute('data-visible') == '2') this.rArrow.setAttribute('data-visiable', true);
                else {
                  if (rTimer2) clearInterval(rTimer2);
                  this.rArrow.setAttribute('data-visiable', false);
                }
                if (this.offset < 0 && this.cover.getAttribute('data-visible') == '2') this.lArrow.setAttribute('data-visiable', true);
                else {
                  if (lTimer2) clearInterval(lTimer2);
                  this.lArrow.setAttribute('data-visiable', false);
                }
              },
              rArrow: rArrow2,
              lArrow: lArrow2,
              refreshSkins: function () {
                for (var i = 0; i < this.skinViews.length; i++) {
                  // var skinView = this.skinViews[i].avatar;
                  var skin = this.skins[i];
                  if (cPlayer && game.qhly_skinIs(cPlayer.name2, skin)) {
                    //skinView.style.filter = "grayscale(0)";
                    //skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                    this.skinViews[i].defaultskin.setAttribute('data-sel', true);
                  } else {
                    //skinView.style.filter = "grayscale(100%)";
                    //skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                    this.skinViews[i].defaultskin.setAttribute('data-sel', false);
                  }
                }
              },
              handleMouseDown: function (x, y) {
                if (this.skinTotalWidth <= this.visibleWidth()) {
                  return;
                }
                this.mouseDownX = x;
                this.mouseDownY = y;
                this.isTouching = true;
                this.cancelClick = false;
                if (!this.offset) this.offset = content2.offsetLeft;
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
                  this.content2.style.left = Math.round(this.tempoffset) + "px";
                  if (this.skinTotalWidth + this.tempoffset > 665 && this.cover.getAttribute('data-visible') == '2') this.rArrow.setAttribute('data-visiable', true);
                  else this.rArrow.setAttribute('data-visiable', false);
                  if (this.tempoffset < 0 && this.cover.getAttribute('data-visible') == '2') this.lArrow.setAttribute('data-visiable', true);
                  else this.lArrow.setAttribute('data-visiable', false);
                  return true;
                }
              },
              handleMouseUp: function (x, y) {
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
                  this.content2.style.left = Math.round(this.tempoffset) + "px";

                } else {
                  this.cancelClick = false;
                }
                this.offset = this.tempoffset;
                this.previousX = this.mouseDownX;
                this.previousY = this.mouseDownY;
                delete this.mouseDownX;
                delete this.mouseDownY;
              }
            }
          }
          var rTimer1 = null, lTimer1 = null, rTimer2 = null, lTimer2 = null;
          rArrow1.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            rTimer1 = setInterval(function () {
              viewState1.offset -= 20;
              if (viewState1.offset < 665 - viewState1.skinTotalWidth) {
                viewState1.offset = 665 - viewState1.skinTotalWidth;
                clearInterval(rTimer1);
              }
              viewState1.refresh();
            }, 50)
          });
          rArrow1.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(rTimer1);
          });
          lArrow1.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            lTimer1 = setInterval(function () {
              viewState1.offset += 20;
              if (viewState1.offset > 0) {
                clearInterval(lTimer1);
                viewState1.offset = 0;
              }
              viewState1.refresh();
            }, 50)
          });
          lArrow1.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(lTimer1);
          });
          rArrow2.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            rTimer2 = setInterval(function () {
              viewState2.offset -= 20;
              if (viewState2.offset < 665 - viewState2.skinTotalWidth) {
                viewState2.offset = 665 - viewState2.skinTotalWidth;
                clearInterval(rTimer2);
              }
              viewState2.refresh();
            }, 50)
          });
          rArrow2.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(rTimer2);
          });
          lArrow2.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            lTimer2 = setInterval(function () {
              viewState2.offset += 20;
              if (viewState2.offset > 0) {
                clearInterval(lTimer2);
                viewState2.offset = 0;
              }
              viewState2.refresh();
            }, 50)
          });
          lArrow2.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(lTimer2);
          });
          if (lib.config.touchscreen) {
            content1.addEventListener('touchstart', function (event) {
              if (event.touches && event.touches.length) {
                viewState1.handleMouseDown(event.touches[0].clientX, event.touches[0].clientY);
              }
            });
            content1.addEventListener('touchend', function (event) {
              viewState1.handleMouseUp();
            });
            content1.addEventListener('touchcancel', function (event) {
              viewState1.handleMouseUp();
            });
            content1.addEventListener('touchmove', function (event) {
              if (event.touches && event.touches.length)
                viewState1.handleMouseMove(event.touches[0].clientX, event.touches[0].clientY);
            });
            content2.addEventListener('touchstart', function (event) {
              if (event.touches && event.touches.length) {
                viewState2.handleMouseDown(event.touches[0].clientX, event.touches[0].clientY);
              }
            });
            content2.addEventListener('touchend', function (event) {
              viewState2.handleMouseUp();
            });
            content2.addEventListener('touchcancel', function (event) {
              viewState2.handleMouseUp();
            });
            content2.addEventListener('touchmove', function (event) {
              if (event.touches && event.touches.length)
                viewState2.handleMouseMove(event.touches[0].clientX, event.touches[0].clientY);
            });
          } else {
            content1.addEventListener('mousewheel', function (event) {
              viewState1.handleMouseDown(event.clientX, event.clientY);
              if (event.wheelDelta > 0) {
                viewState1.handleMouseMove(event.clientX - 30, event.clientY);
                viewState1.handleMouseUp(event.clientX - 30, event.clientY);
              } else {
                viewState1.handleMouseMove(event.clientX + 30, event.clientY);
                viewState1.handleMouseUp(event.clientX + 30, event.clientY);
              }
            });
            content1.addEventListener('mousedown', function (event) {
              viewState1.handleMouseDown(event.clientX, event.clientY);
            });
            content1.addEventListener('mouseup', function (event) {
              viewState1.handleMouseUp(event.clientX, event.clientY);
            });
            content1.addEventListener('mouseleave', function (event) {
              viewState1.handleMouseUp(event.clientX, event.clientY);
            });
            content1.addEventListener('mousemove', function (event) {
              viewState1.handleMouseMove(event.clientX, event.clientY);
            });
            content2.addEventListener('mousewheel', function (event) {
              viewState2.handleMouseDown(event.clientX, event.clientY);
              if (event.wheelDelta > 0) {
                viewState2.handleMouseMove(event.clientX - 30, event.clientY);
                viewState2.handleMouseUp(event.clientX - 30, event.clientY);
              } else {
                viewState2.handleMouseMove(event.clientX + 30, event.clientY);
                viewState2.handleMouseUp(event.clientX + 30, event.clientY);
              }
            });
            content2.addEventListener('mousedown', function (event) {
              viewState2.handleMouseDown(event.clientX, event.clientY);
            });
            content2.addEventListener('mouseup', function (event) {
              viewState2.handleMouseUp(event.clientX, event.clientY);
            });
            content2.addEventListener('mouseleave', function (event) {
              viewState2.handleMouseUp(event.clientX, event.clientY);
            });
            content2.addEventListener('mousemove', function (event) {
              viewState2.handleMouseMove(event.clientX, event.clientY);
            });
          }

          //-----------------------------------------主将---------------------------------------------
          var namex = cPlayer?cPlayer.name1:name;
          var playZhuDynamic = lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'always' ? false : true;
          game.qhly_getSkinList(namex, function (ret, list) {
            var pkg = game.qhly_foundPackage(namex);
            if (!list) list = [];
            list.sort(function (a, b) {
              var orderA = game.qhly_getOrder(namex, a, pkg);
              var orderB = game.qhly_getOrder(namex, b, pkg);
              if (orderA > orderB) return 1;
              if (orderA == orderB) return 0;
              return -1;
            });
            const path = pkg.skin.standard;//1
            var skinList = [null];
            if (list && list.length) {
              skinList.addArray(list);
            }
            var dynamicSkinList = [], bothSkin = [], singleDynamic = [];//2
            if (window.decadeUI) {
              if (decadeUI.dynamicSkin[namex]) dynamicSkinList = Object.keys(decadeUI.dynamicSkin[namex]);
              singleDynamic = [...dynamicSkinList];//单形态
              for (var i of skinList) {
                if (i) {
                  let skin = i.substring(0, i.lastIndexOf('.'));
                  if (dynamicSkinList.contains(skin)) {
                    bothSkin.push(skin);//双形态
                    singleDynamic.remove(skin);
                  }
                }
              }
              if (dynamicSkinList) {
                if (lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'three' && dynamicSkinList.length > 3) playZhuDynamic = false;
                dynamicSkinList.forEach(function (value, index, array) {
                  array[index] += '.jpg';
                });
                skinList = Array.from(new Set(skinList.concat(dynamicSkinList)));
                skinList.remove('经典形象.jpg');
              }
            }
            viewState1.skins = skinList;
            viewState1.skinTotalWidth = (viewState1.skinPerWidth + viewState1.skinGap) * skinList.length - viewState1.skinGap + 20;
            for (let i = 0; i < skinList.length; i++) {
              var skin = skinList[i];
              var skinView = ui.create.div('.qh-skinchange-decade-skin', content1);
              skinView.avatar = ui.create.div('.primary-avatar', skinView);
              var campWrap = ui.create.div('.qhcamp-wrap', skinView);
              if(cPlayer){
                campWrap.setAttribute("data-camp", cPlayer.group);
              }
              var playerDengjie = 'one';
              if (!lib.config['extension_千幻聆音_qhly_decadeDengjie'] || lib.config['extension_千幻聆音_qhly_decadeDengjie'] == 'auto') {
                if(cPlayer){
                  switch (game.getRarity(cPlayer)) {
                    case 'common': playerDengjie = 'two'; break;
                    case 'junk': playerDengjie = 'one'; break;
                    case 'rare': playerDengjie = 'three'; break;
                    case 'epic': playerDengjie = 'four'; break;
                    default: playerDengjie = 'five';
                  }
                }
              }
              else playerDengjie = lib.config['extension_千幻聆音_qhly_decadeDengjie'];
              campWrap.setAttribute("data-border-level", playerDengjie);
              ui.create.div('.qhcamp-back', campWrap);
              ui.create.div('.qhcamp-border', campWrap);
              var campName = ui.create.div('.qhcamp-name', campWrap);
              campName.style.backgroundImage = 'url("' + lib.qhly_path + 'image/decoration/name_' + campWrap.getAttribute('data-camp') + '.png")';
              var avatarName = ui.create.div('.qhavatar-name', campWrap);
              //avatarName.innerText = get.slimName(name).replace(/<br>/g, '\n');
              avatarName.innerHTML = get.prefixBoldName(name,'justView').replace(/<br>/g, '\n');
              var hpWrap = ui.create.div('.qhhp-wrap', skinView);
              hpWrap.setAttribute("data-border-level", playerDengjie);
              skinView.belowText = ui.create.div('.qh-skinchange-decade-skin-text', hpWrap);
              viewState1.skinViews.push(skinView);
              skinView.style.left = Math.round((viewState1.skinPerWidth + viewState1.skinGap) * i + 16) + "px";
              skinView.style.width = Math.round(viewState1.skinPerWidth) + "px";
              skinView.avatar.classList.add('qh-not-replace');
              //skinView.node = { avatar: skinView.avatar, name1: namex, avatar2: null, name2: null };
              //skinView.belowText = ui.create.div('.qh-skinchange-skin-text', skinView);
              skinView.defaultskin = ui.create.div('.qh-skinchange-skin-default', skinView);
              skinView.$dynamicWrap = ui.create.div('.qhdynamic-wrap', skinView);
              skinView.toImageBtn = ui.create.div('.qh-domtoimage', skinView);
              skinView.toImageBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                game.qhly_dom2image(ingame, namex, this, path);
              });//3
              skinView.dynamicToggle = ui.create.div('.qh-skinchange-dynamicChange', skinView);
              if (!skin && dynamicSkinList.contains('经典形象.jpg')) skinView.dynamicToggle.setAttribute('toggle', true);
              if (skin && lib.config.qhly_skinset.djtoggle[namex]) {
                if (lib.config.qhly_skinset.djtoggle[namex][skin.substring(0, skin.lastIndexOf('.'))]) skinView.dynamicToggle.classList.add('jing');
              }
              skinView.dynamicToggle.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                if (this.classList.contains('jing')) {
                  this.classList.remove('jing');
                  if (playZhuDynamic) game.qhly_changeDynamicSkin(this.parentNode, this.parentNode.belowText.innerText, namex);
                  //game.qhly_changeDynamicSkin(cPlayer, this.parentNode.belowText.innerText, namex);
                  if (lib.config.qhly_skinset.djtoggle[namex] && lib.config.qhly_skinset.djtoggle[namex][this.parentNode.belowText.innerText]) delete lib.config.qhly_skinset.djtoggle[namex][this.parentNode.belowText.innerText];
                }
                else {
                  this.classList.add('jing');
                  if (playZhuDynamic && this.parentNode.stopDynamic) this.parentNode.stopDynamic();

                  //cPlayer.stopDynamic(true, false);

                  if (!lib.config.qhly_skinset.djtoggle[namex]) lib.config.qhly_skinset.djtoggle[namex] = {};
                  lib.config.qhly_skinset.djtoggle[namex][this.parentNode.belowText.innerText] = true;
                }
                game.qhlySyncConfig();
              });
              //var dynamicPlayer = ui.create.div('.animation-player', skinView.$dynamicWrap);
              if (skin) {
                var str = skin.substring(0, skin.lastIndexOf('.'));
                if (bothSkin.contains(str)) skinView.dynamicToggle.setAttribute('toggle', true);
                if (singleDynamic.contains(str) && lib.config['extension_千幻聆音_qhly_dom2image']) skinView.toImageBtn.setAttribute('single', true);//打开快照
                var info = game.qhly_getSkinInfo(namex, skin);
                if (info) {
                  skinView.belowText.innerHTML = info.translation;
                }
                if ((!lib.config.qhly_skinset.djtoggle[namex] || lib.config.qhly_skinset.djtoggle[namex] && !lib.config.qhly_skinset.djtoggle[namex][skin.substring(0, skin.lastIndexOf('.'))]) && window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[namex] && Object.keys(decadeUI.dynamicSkin[namex]).contains(info.translation)) {
                  if (playZhuDynamic) game.qhly_changeDynamicSkin(skinView, info.translation, namex);
                }
                //game.qhly_showSkinQua(skinView, skin);

                //if (info.translation == lib.config.qhly_skinset.skin[name].substring(0, 4)) game.qhly_changeDynamicSkin(skinView, name);
              } else {
                skinView.belowText.innerHTML = "经典形象";
                if (dynamicSkinList.contains('经典形象.jpg') && playZhuDynamic) game.qhly_changeDynamicSkin(skinView, '经典形象', namex);
              }
              //skinView.belowText.innerHTML=game.qhly_rename(skinView.belowText.innerHTML);
              var skinQua = ui.create.div('.qhly-skinQua-decade', skinView);
              var skininfo = game.qhly_getSkinInfo(namex, skin, game.qhly_foundPackage(namex));
              var level = skininfo.level;
              var style = skininfo.levelStyle;
              if (style) {
                if (!skinQua.qh_savedStyle) {
                  skinQua.qh_savedStyle = {};
                  for (var m in skinQua.style) {
                    skinQua.qh_savedStyle[m] = skinQua.style[m];
                  }
                }
                for (var s in style) {
                  skinQua.style[s] = style[s];
                }
                var es = ['left', 'bottom', 'top', 'right'];
                for (var m of es) {
                  if (!style[m]) {
                    skinQua.style[m] = "";
                  }
                }
              } else {
                if (skinQua.qh_savedStyle) {
                  for (var m in skinQua.qh_savedStyle) {
                    skinQua.style[m] = skinQua.qh_savedStyle[m];
                  }
                }
              }
              if (skin) {
                if (lib.qhly_level[namex + '_' + skin]) {
                  level = lib.qhly_level[namex + '_' + skin];
                }
              }
              if (level) {
                var map = {
                  '原画': 'yuanhua',
                  '普通': 'putong',
                  '稀有': 'xiyou',
                  '精良': 'xiyou',
                  '史诗': 'shishi',
                  '传说': 'chuanshuo',
                  '动态': 'dongtai',
                  '限定': 'xianding',
                  '绝版': 'jueban',
                };
                var img = null;
                if (map[level]) {
                  img = "extension/千幻聆音/theme/decade/dc_" + map[level] + ".png";
                } else if (level.indexOf("#") == 0) {
                  var l2 = level.replace("#", "");
                  img = "extension/千幻聆音/image/" + l2 + ".png";
                } else if (level.indexOf("$") == 0) {
                  var l2 = level.replace("$", "");
                  img = l2;
                }
                if (img) {
                  skinQua.show();
                  skinQua.setBackgroundImage(img);
                } else {
                  skinQua.hide();
                }
              } else {
                skinQua.hide();
              }
              // var skinQua = ui.create.div('', skinView);
              // skinQua.style.cssText = 'width:70%;height:29%;left:14%;top:61%;background-size:100% 100%;background-repeat:no-repeat;z-index:88;point-events:none';
              // skinQua.style['background-image'] = 'url(' + lib.qhly_path+'theme/decade/dc_' + game.qhly_getSkinLevel(namex, skin, true) + '.png)';
              if (game.qhly_skinIs(namex, skin)) {
                //skinView.style.filter = "grayscale(0)";
                //skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                skinView.defaultskin.setAttribute('data-sel', true);
                if (skinView.offsetLeft > 600) viewState1.offset = 614 - skinView.offsetLeft;
              } else {
                //skinView.style.filter = "grayscale(100%)";
                //skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                skinView.defaultskin.setAttribute('data-sel', false);
              }
              (function (name, skin, view) {
                view.listen(function () {
                  if (viewState1.cancelClick) return;
                  game.qhly_setCurrentSkin(namex, skin, function () {
                    viewState1.refreshSkins();
                    //if (view.dynamicToggle && view.dynamicToggle.classList && !view.dynamicToggle.classList.contains('jing')) {
                    game.qhly_changeDynamicSkin(namex);
                    //}
                    if (lib.config['extension_千幻聆音_qhly_decadeChangeEffect'] && cPlayer) cPlayer.playChangeSkinEffect(false);
                    game.qhlySyncConfig();
                    if (lib.config.qhly_smallwinclosewhenchange) {
                      exitListener();
                    }
                  }, true);

                });
              })(namex, skin, skinView);
              if (skin) {
                let file = game.qhly_getSkinFile(namex, skin);
                let skinView2 = skinView.avatar;
                game.qhly_checkFileExist(file, function (s) {
                  if (s) {
                    skinView2.qhly_origin_setBackgroundImage(file);
                  } else {
                    let prefix = pkg.prefix;
                    if (typeof prefix == 'function') {
                      prefix = prefix(namex);
                    }
                    if (lib.config.qhly_noSkin == 'origin') skinView2.qhly_origin_setBackgroundImage(prefix + namex + '.jpg');//原画
                    else skinView2.qhly_origin_setBackgroundImage('extension/千幻聆音/image/noSkin.png');//noskin
                  }
                })
              } else {
                skinView.avatar.qhly_origin_setBackground(namex, 'character');
              }
            }
            viewState1.refresh();
          }, false);

          //--------------------------------------副将---------------------------------------------
          if (cPlayer && cPlayer.name2) {
            var namey = cPlayer.name2;
            var playFuDynamic = lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'always' ? false : true;
            game.qhly_getSkinList(namey, function (ret, list) {
              var pkg = game.qhly_foundPackage(namey);
              if (!list) list = [];
              list.sort(function (a, b) {
                var orderA = game.qhly_getOrder(namey, a, pkg);
                var orderB = game.qhly_getOrder(namey, b, pkg);
                if (orderA > orderB) return 1;
                if (orderA == orderB) return 0;
                return -1;
              });
              const path = pkg.skin.standard;
              var skinList = [null];
              if (list && list.length) {
                skinList.addArray(list);
              }
              var dynamicSkinList = [], bothSkin = [], singleDynamic = [];
              if (window.decadeUI) {
                if (decadeUI.dynamicSkin[namey]) dynamicSkinList = Object.keys(decadeUI.dynamicSkin[namey]);
                singleDynamic = [...dynamicSkinList];//单形态
                for (var i of skinList) {
                  if (i) {
                    var skin = i.substring(0, i.lastIndexOf('.'));
                    if (dynamicSkinList.contains(skin)) {
                      bothSkin.push(skin);//双形态
                      singleDynamic.remove(skin);
                    }
                  }
                }
                if (dynamicSkinList) {
                  if (lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'three' && dynamicSkinList.length > 3) playFuDynamic = false;
                  dynamicSkinList.forEach(function (value, index, array) {
                    array[index] += '.jpg';
                  })
                  skinList = Array.from(new Set(skinList.concat(dynamicSkinList)));
                  skinList.remove('经典形象.jpg');
                }
              }
              viewState2.skins = skinList;
              viewState2.skinTotalWidth = (viewState2.skinPerWidth + viewState2.skinGap) * skinList.length - viewState2.skinGap + 20;
              for (let i = 0; i < skinList.length; i++) {
                var skin = skinList[i];
                var skinView = ui.create.div('.qh-skinchange-decade-skin', content2);
                skinView.avatar = ui.create.div('.primary-avatar', skinView);
                var campWrap = ui.create.div('.qhcamp-wrap', skinView);
                if(cPlayer){
                  campWrap.setAttribute("data-camp", cPlayer.group);
                }
                var playerDengjie = 'one';
                if (!lib.config['extension_千幻聆音_qhly_decadeDengjie'] || lib.config['extension_千幻聆音_qhly_decadeDengjie'] == 'auto') {
                  if(cPlayer){
                    switch (game.getRarity(cPlayer)) {
                      case 'common': playerDengjie = 'two'; break;
                      case 'junk': playerDengjie = 'one'; break;
                      case 'rare': playerDengjie = 'three'; break;
                      case 'epic': playerDengjie = 'four'; break;
                      default: playerDengjie = 'five';
                    }
                  }
                }
                else playerDengjie = lib.config['extension_千幻聆音_qhly_decadeDengjie'];
                campWrap.setAttribute("data-border-level", playerDengjie);
                ui.create.div('.qhcamp-back', campWrap);
                ui.create.div('.qhcamp-border', campWrap);
                var campName = ui.create.div('.qhcamp-name', campWrap);
                campName.style.backgroundImage = 'url("' + lib.qhly_path + 'image/decoration/name_' + campWrap.getAttribute('data-camp') + '.png")';
                var avatarName = ui.create.div('.qhavatar-name', campWrap);
                //avatarName.innerText = get.slimName(namey).replace(/<br>/g, '\n');
                avatarName.innerHTML = get.prefixBoldName(namey,'justView').replace(/<br>/g, '\n');
                var hpWrap = ui.create.div('.qhhp-wrap', skinView);
                hpWrap.setAttribute("data-border-level", playerDengjie);
                skinView.belowText = ui.create.div('.qh-skinchange-decade-skin-text', hpWrap);

                viewState2.skinViews.push(skinView);
                skinView.style.left = Math.round((viewState2.skinPerWidth + viewState2.skinGap) * i + 16) + "px";
                skinView.style.width = Math.round(viewState2.skinPerWidth) + "px";
                skinView.avatar.classList.add('qh-not-replace');
                //skinView.node = { avatar: skinView.avatar, name1: namey }
                //skinView.belowText = ui.create.div('.qh-skinchange-skin-text', skinView);
                skinView.defaultskin = ui.create.div('.qh-skinchange-skin-default', skinView);
                skinView.$dynamicWrap = ui.create.div('.qhdynamic-wrap', skinView);
                skinView.toImageBtn = ui.create.div('.qh-domtoimage', skinView);
                skinView.toImageBtn.addEventListener('click', function (e) {
                  e.stopPropagation();
                  game.qhly_dom2image(ingame, namey, this, path);
                });
                skinView.dynamicToggle = ui.create.div('.qh-skinchange-dynamicChange', skinView);
                if (skin && bothSkin.contains(skin.substring(0, skin.lastIndexOf('.')))) skinView.dynamicToggle.setAttribute('toggle', true);
                if (!skin && dynamicSkinList.contains('经典形象.jpg')) skinView.dynamicToggle.setAttribute('toggle', true);
                if (skin && lib.config.qhly_skinset.djtoggle[namey]) {
                  if (lib.config.qhly_skinset.djtoggle[namey][skin.substring(0, skin.lastIndexOf('.'))]) skinView.dynamicToggle.classList.add('jing');
                }
                skinView.dynamicToggle.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                  if (this.classList.contains('jing')) {
                    this.classList.remove('jing');
                    if (playFuDynamic) game.qhly_changeDynamicSkin(this.parentNode, this.parentNode.belowText.innerText, namey);
                    //game.qhly_changeDynamicSkin(cPlayer, this.parentNode.belowText.innerText, namey, true);
                    if (lib.config.qhly_skinset.djtoggle[namey] && lib.config.qhly_skinset.djtoggle[namey][this.parentNode.belowText.innerText]) delete lib.config.qhly_skinset.djtoggle[namey][this.parentNode.belowText.innerText];
                  }
                  else {
                    this.classList.add('jing');
                    if (playFuDynamic && this.parentNode.stopDynamic) this.parentNode.stopDynamic();
                    //if(decadeUI.CUR_DYNAMIC) decadeUI.CUR_DYNAMIC--;
                    //cPlayer.stopDynamic(false, true);
                    //if(decadeUI.CUR_DYNAMIC) decadeUI.CUR_DYNAMIC--;
                    if (!lib.config.qhly_skinset.djtoggle[namey]) lib.config.qhly_skinset.djtoggle[namey] = {};
                    lib.config.qhly_skinset.djtoggle[namey][this.parentNode.belowText.innerText] = true;
                  }
                  game.qhlySyncConfig();
                });

                //var dynamicPlayer = ui.create.div('.animation-player', skinView.$dynamicWrap);
                if (skin) {
                  var str = skin.substring(0, skin.lastIndexOf('.'));
                  if (bothSkin.contains(str)) skinView.dynamicToggle.setAttribute('toggle', true);
                  if (singleDynamic.contains(str) && lib.config['extension_千幻聆音_qhly_dom2image']) skinView.toImageBtn.setAttribute('single', true);//打开快照
                  var info = game.qhly_getSkinInfo(namey, skin);
                  if (info) {
                    skinView.belowText.innerHTML = info.translation;
                  }
                  if ((!lib.config.qhly_skinset.djtoggle[namey] || lib.config.qhly_skinset.djtoggle[namey] && !lib.config.qhly_skinset.djtoggle[namey][skin.substring(0, skin.lastIndexOf('.'))]) && window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[namey] && Object.keys(decadeUI.dynamicSkin[namey]).contains(info.translation)) {
                    if (playFuDynamic) game.qhly_changeDynamicSkin(skinView, info.translation, namey, true);
                  }
                  //game.qhly_showSkinQua(skinView, skin);

                  //if (info.translation == lib.config.qhly_skinset.skin[name].substring(0, 4)) game.qhly_changeDynamicSkin(skinView, name);
                } else {
                  skinView.belowText.innerHTML = "经典形象";
                  if (dynamicSkinList.contains('经典形象.jpg') && playFuDynamic) game.qhly_changeDynamicSkin(skinView, '经典形象', namey);
                }
                //skinView.belowText.innerHTML=game.qhly_rename(skinView.belowText.innerHTML);
                var skinQua = ui.create.div('.qhly-skinQua-decade', skinView);
                var skininfo = game.qhly_getSkinInfo(namey, skin, game.qhly_foundPackage(namey));
                var level = skininfo.level;
                var style = skininfo.levelStyle;
                if (style) {
                  if (!skinQua.qh_savedStyle) {
                    skinQua.qh_savedStyle = {};
                    for (var m in skinQua.style) {
                      skinQua.qh_savedStyle[m] = skinQua.style[m];
                    }
                  }
                  for (var s in style) {
                    skinQua.style[s] = style[s];
                  }
                  var es = ['left', 'bottom', 'top', 'right'];
                  for (var m of es) {
                    if (!style[m]) {
                      skinQua.style[m] = "";
                    }
                  }
                } else {
                  if (skinQua.qh_savedStyle) {
                    for (var m in skinQua.qh_savedStyle) {
                      skinQua.style[m] = skinQua.qh_savedStyle[m];
                    }
                  }
                }
                if (skin) {
                  if (lib.qhly_level[namey + '_' + skin]) {
                    level = lib.qhly_level[namey + '_' + skin];
                  }
                }
                if (level) {
                  var map = {
                    '原画': 'yuanhua',
                    '普通': 'putong',
                    '稀有': 'xiyou',
                    '精良': 'xiyou',
                    '史诗': 'shishi',
                    '传说': 'chuanshuo',
                    '动态': 'dongtai',
                    '限定': 'xianding',
                    '绝版': 'jueban',
                  };
                  var img = null;
                  if (map[level]) {
                    img = "extension/千幻聆音/theme/decade/dc_" + map[level] + ".png";
                  } else if (level.indexOf("#") == 0) {
                    var l2 = level.replace("#", "");
                    img = "extension/千幻聆音/image/" + l2 + ".png";
                  } else if (level.indexOf("$") == 0) {
                    var l2 = level.replace("$", "");
                    img = l2;
                  }
                  if (img) {
                    skinQua.show();
                    skinQua.setBackgroundImage(img);
                  } else {
                    skinQua.hide();
                  }
                } else {
                  skinQua.hide();
                }
                if (game.qhly_skinIs(namey, skin)) {
                  //skinView.style.filter = "grayscale(0)";
                  //skinView.belowText.style.textShadow = '.2rem 0rem .5rem red,-.2rem 0rem .5rem red,0rem .2rem .5rem red,0rem -.2rem .5rem red';
                  skinView.defaultskin.setAttribute('data-sel', true);
                  if (skinView.offsetLeft > 600) viewState2.offset = 614 - skinView.offsetLeft;
                } else {
                  //skinView.style.filter = "grayscale(100%)";
                  //skinView.belowText.style.textShadow = '.2rem 0rem .5rem blue,-.2rem 0rem .5rem blue,0rem .2rem .5rem blue,0rem -.2rem .5rem blue';
                  skinView.defaultskin.setAttribute('data-sel', false);
                }
                (function (name, skin, view) {
                  view.listen(function () {
                    if (viewState2.cancelClick) return;
                    game.qhly_setCurrentSkin(namey, skin, function () {
                      viewState2.refreshSkins();
                      //if (view.dynamicToggle && view.dynamicToggle.classList && !view.dynamicToggle.classList.contains('jing')) {
                      game.qhly_changeDynamicSkin(namey, null, null, true);
                      //}
                      if (lib.config['extension_千幻聆音_qhly_decadeChangeEffect'] && cPlayer) cPlayer.playChangeSkinEffect(true);
                      game.qhlySyncConfig();
                      if (lib.config.qhly_smallwinclosewhenchange) {
                        exitListener();
                      }
                    }, true);

                  });
                })(namey, skin, skinView);
                if (skin) {
                  let file = game.qhly_getSkinFile(namey, skin);
                  let skinView2 = skinView.avatar;
                  game.qhly_checkFileExist(file, function (s) {
                    if (s) {
                      skinView2.qhly_origin_setBackgroundImage(file);
                    } else {
                      var prefix = pkg.prefix;
                      if (typeof prefix == 'function') {
                        prefix = prefix(namey);
                      }
                      if (lib.config.qhly_noSkin == 'origin') skinView2.qhly_origin_setBackgroundImage(prefix + namey + '.jpg');//原画
                      else skinView2.qhly_origin_setBackgroundImage('extension/千幻聆音/image/noSkin.png');//noskin
                    }
                  })
                } else {
                  skinView.avatar.qhly_origin_setBackground(namey, 'character');
                }
              }
              viewState2.refresh();
            }, false);
          }

          backgroundBack.listen(function (event) {
            exitListener();
          });
          //exit.listen(exitListener);
          enlarge.listen(function () {
            exitListener();
            game.qhly_open_new(name, 'skill', ingame);
          });
        } catch (e) {
          if (QHLY_DEBUGMODE) {
            throw e;
          }
        }
      };

      //------------------------------手杀小窗口换肤--decadesmall-------------------------
      game.qhly_open_small_shousha = function (name, from, ingame) {
        try {
          if (_status.qhly_open) return;
          _status.qhly_open = true;
          var cPlayer = from;
          if (!cPlayer && ingame) cPlayer = ingame.parentNode;
          else cPlayer = game.qhly_getCurrentPlayer(name)[0][0];
          var background = ui.create.div('.qh-skinchange-background', document.body);
          var backgroundBack = ui.create.div('.qh-skinchange-shousha-background', background);
          var dialog = ui.create.div('.qh-skinchange-shousha-dialog', background);
          if (lib.config.extension_千幻聆音_qhly_lutouType && lib.config.extension_千幻聆音_qhly_lutouType == 'shousha') dialog.classList.add('shousha');
          if (lib.config.qhly_lutou) {
              //dialog.setAttribute('data-outcrop-skin', 'on');
              if(lib.config.extension_千幻聆音_lutouFixx&&lib.config.extension_千幻聆音_lutouFixx!='off') {
                  dialog.setAttribute('data-outcrop-skin', 'fix');
              }else {
                  dialog.setAttribute('data-outcrop-skin', 'on');
              }
          }
          //var exit = ui.create.div('.qh-skinchange-shousha-exit', dialog);
          var cover = ui.create.div('.qh-skinchange-shousha-cover', dialog);
          cover.setAttribute('data-visible', 1);
          cover.id = 'data-cover';
          var content1 = ui.create.div('.qh-skinchange-shousha-area1', cover);
          content1.id = 'content1';
          var content2 = ui.create.div('.qh-skinchange-shousha-area2', cover);
          content2.id = 'content2';
          rArrow1 = ui.create.div('.qh-skinchange-shousha-arrow', dialog);
          lArrow1 = ui.create.div('.qh-skinchange-shousha-arrow.left', dialog);
          rArrow2 = ui.create.div('.qh-skinchange-shousha-arrow', dialog);
          lArrow2 = ui.create.div('.qh-skinchange-shousha-arrow.left', dialog);
          var autoskin = ui.create.div('.qh-skinchange-shousha-autoskin', dialog);
          ui.create.div('.qh-skinchange-shousha-autoskinborder', autoskin);
          ui.create.div('.qh-skinchange-shousha-autoskinitem', autoskin);
          var enlarge = ui.create.div('.qh-skinchange-shousha-enlarge', dialog);
          enlarge.innerHTML = '切换至大页面';
          if (lib.config.qhly_autoChangeSkin == 'close' || !lib.config.qhly_autoChangeSkin) autoskin.setAttribute('data-auto', false);
          else autoskin.setAttribute('data-auto', true);
          autoskin.listen(function () {
            var open = false, item = 'close';
            if (lib.config.qhly_autoChangeSkin == 'close' || !lib.config.qhly_autoChangeSkin) {
              open = true;
              item = lib.config['extension_千幻聆音_qhly_decadeAuto'];
            }
            game.saveConfig('extension_千幻聆音_qhly_autoChangeSkin', item);
            game.saveConfig('qhly_autoChangeSkin', item);
            if (open) {
              autoskin.setAttribute('data-auto', true);
              game.qhly_autoChangeSkin();
            } else {
              autoskin.setAttribute('data-auto', false);
              if (_status.qhly_changeSkinFunc) {
                clearTimeout(_status.qhly_changeSkinFunc);
              }
            }
          })
          var zhufu = ui.create.div('.qh-skinchange-shousha-zhufu', dialog);
          var zhuskinBut = ui.create.div('.qh-zhuskin', zhufu);
          var fuskinBut = ui.create.div('.qh-fuskin', zhufu);
          if (cPlayer && cPlayer.name2) {
            dialog.setAttribute('data-double', true);
            if (cPlayer.name2 == name) {
              fuskinBut.classList.add('sel');
              cover.setAttribute('data-visible', 2);
            }
            else {
              zhuskinBut.classList.add('sel');
              cover.setAttribute('data-visible', 1);
            }
          }
          zhuskinBut.listen(function () {
            if (zhuskinBut.classList.contains('sel')) return;
            if (cPlayer && cPlayer.classList.contains('unseen') && cPlayer != game.me) return;
            game.qhly_playQhlyAudio('qhly_voc_click2', null, true);
            fuskinBut.classList.remove('sel');
            zhuskinBut.classList.add('sel');
            cover.setAttribute('data-visible', 1);
            if (Math.round(viewState1.skinTotalWidth) >= viewState1.visibleWidth()) cover.setAttribute('data-overstep', true);
            else cover.setAttribute('data-overstep', false);
            lArrow2.setAttribute('data-visiable', false);
            rArrow2.setAttribute('data-visiable', false);
            viewState1.refresh();
          })
          fuskinBut.listen(function () {
            if (fuskinBut.classList.contains('sel')) return;
            if (cPlayer && cPlayer.classList.contains('unseen2') && cPlayer != game.me) return;
            game.qhly_playQhlyAudio('qhly_voc_click2', null, true);
            zhuskinBut.classList.remove('sel');
            fuskinBut.classList.add('sel');
            cover.setAttribute('data-visible', 2);
            if (Math.round(viewState2.skinTotalWidth) >= viewState2.visibleWidth()) cover.setAttribute('data-overstep', true);
            else cover.setAttribute('data-overstep', false);
            lArrow1.setAttribute('data-visiable', false);
            rArrow1.setAttribute('data-visiable', false);
            viewState2.refresh();
          })
          var swipe_up = lib.config.swipe_up;
          lib.config.swipe_up = '';
          var swipe_down = lib.config.swipe_down;
          lib.config.swipe_down = '';
          var swipe_left = lib.config.swipe_left;
          lib.config.swipe_left = '';
          var swipe_right = lib.config.swipe_right;
          lib.config.swipe_right = '';
          var exitListener = function () {
            lib.config.swipe_up = swipe_up;
            lib.config.swipe_down = swipe_down;
            lib.config.swipe_left = swipe_left;
            lib.config.swipe_right = swipe_right;
            if (!_status.qhly_open) return;
            for (var i = 0; i < viewState1.skinViews.length; i++) {
              if (viewState1.skinViews[i].dynamic && viewState1.skinViews[i].dynamic.renderer.postMessage) {
                viewState1.skinViews[i].dynamic.renderer.postMessage({
                  message: "DESTROY",
                  id: viewState1.skinViews[i].dynamic.id,
                })
                viewState1.skinViews[i].dynamic.renderer.capacity--;
              }
            }
            if (cPlayer && cPlayer.name2) {
              for (var i = 0; i < viewState2.skinViews.length; i++) {
                if (viewState2.skinViews[i].dynamic && viewState2.skinViews[i].dynamic.renderer.postMessage) {
                  viewState2.skinViews[i].dynamic.renderer.postMessage({
                    message: "DESTROY",
                    id: viewState2.skinViews[i].dynamic.id,
                  });
                  viewState2.skinViews[i].dynamic.renderer.capacity--;
                }
              }
            }
            background.delete();
            game.qhly_playQhlyAudio('qhly_voc_dec_press', null, true);
            delete _status.qhly_open;
          };
          var viewState1 = {
            offset: 0,
            skinTotalWidth: 500,
            skinPerWidth: 128,
            skinGap: 30,
            skins: [],
            skinViews: [],
            visibleWidth: function () {
              var rect = cover.getBoundingClientRect();
              return rect.width;
            },
            cover: cover,
            content1: content1,
            refresh: function () {
              if (!this.offset) this.offset = 0;
              content1.style.width = Math.round(this.skinTotalWidth) + 'px';
              content1.style.left = Math.round(this.offset) + "px";
              if (this.skinTotalWidth + this.offset > this.visibleWidth() && this.cover.getAttribute('data-visible') == '1') this.rArrow.setAttribute('data-visiable', true);
              else {
                if (rTimer1) clearInterval(rTimer1);
                this.rArrow.setAttribute('data-visiable', false);
              }
              if (this.offset < 0 && this.cover.getAttribute('data-visible') == '1') this.lArrow.setAttribute('data-visiable', true);
              else {
                if (lTimer1) clearInterval(lTimer1);
                this.lArrow.setAttribute('data-visiable', false);
              }
            },
            rArrow: rArrow1,
            lArrow: lArrow1,
            refreshSkins: function () {
              for (var i = 0; i < this.skinViews.length; i++) {
                var skin = this.skins[i];
                if (cPlayer && game.qhly_skinIs(cPlayer.name1, skin)) {
                  this.skinViews[i].defaultskin.setAttribute('data-sel', true);
                } else {
                  this.skinViews[i].defaultskin.setAttribute('data-sel', false);
                }
              }
            },
            handleMouseDown: function (x, y) {
              if (this.skinTotalWidth <= this.visibleWidth()) {
                return;
              }
              this.mouseDownX = x;
              this.mouseDownY = y;
              this.isTouching = true;
              this.cancelClick = false;
              if (!this.offset) this.offset = content1.offsetLeft;
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
                this.content1.style.left = Math.round(this.tempoffset) + "px";
                if (this.skinTotalWidth + this.tempoffset > this.visibleWidth() && this.cover.getAttribute('data-visible') == '1') this.rArrow.setAttribute('data-visiable', true);
                else this.rArrow.setAttribute('data-visiable', false);
                if (this.tempoffset < 0 && this.cover.getAttribute('data-visible') == '1') this.lArrow.setAttribute('data-visiable', true);
                else this.lArrow.setAttribute('data-visiable', false);
                return true;
              }
            },
            handleMouseUp: function (x, y) {
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
                this.content1.style.left = Math.round(this.tempoffset) + "px";
              } else {
                this.cancelClick = false;
              }
              this.offset = this.tempoffset;
              this.previousX = this.mouseDownX;
              this.previousY = this.mouseDownY;
              delete this.mouseDownX;
              delete this.mouseDownY;
            }
          };
          if (cPlayer && cPlayer.name2) {
            var viewState2 = {
              offset: 0,
              skinTotalWidth: 500,
              skinPerWidth: 128,
              skinGap: 30,
              skins: [],
              skinViews: [],
              visibleWidth: function () {
                var rect = cover.getBoundingClientRect();
                return rect.width;
              },
              cover: cover,
              content2: content2,
              refresh: function () {
                if (!this.offset) this.offset = 0;
                content2.style.width = Math.round(this.skinTotalWidth) + 'px';
                content2.style.left = Math.round(this.offset) + "px";
                if (this.skinTotalWidth + this.offset > this.visibleWidth() && this.cover.getAttribute('data-visible') == '2') this.rArrow.setAttribute('data-visiable', true);
                else {
                  if (rTimer2) clearInterval(rTimer2);
                  this.rArrow.setAttribute('data-visiable', false);
                }
                if (this.offset < 0 && this.cover.getAttribute('data-visible') == '2') this.lArrow.setAttribute('data-visiable', true);
                else {
                  if (lTimer2) clearInterval(lTimer2);
                  this.lArrow.setAttribute('data-visiable', false);
                }
              },
              rArrow: rArrow2,
              lArrow: lArrow2,
              refreshSkins: function () {
                for (var i = 0; i < this.skinViews.length; i++) {
                  var skin = this.skins[i];
                  if (cPlayer && game.qhly_skinIs(cPlayer.name2, skin)) {
                    this.skinViews[i].defaultskin.setAttribute('data-sel', true);
                  } else {
                    this.skinViews[i].defaultskin.setAttribute('data-sel', false);
                  }
                }
              },
              handleMouseDown: function (x, y) {
                if (this.skinTotalWidth <= this.visibleWidth()) {
                  return;
                }
                this.mouseDownX = x;
                this.mouseDownY = y;
                this.isTouching = true;
                this.cancelClick = false;
                if (!this.offset) this.offset = content2.offsetLeft;
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

                  this.content2.style.left = Math.round(this.tempoffset) + "px";
                  if (this.skinTotalWidth + this.tempoffset > this.visibleWidth() && this.cover.getAttribute('data-visible') == '2') this.rArrow.setAttribute('data-visiable', true);
                  else this.rArrow.setAttribute('data-visiable', false);
                  if (this.tempoffset < 0 && this.cover.getAttribute('data-visible') == '2') this.lArrow.setAttribute('data-visiable', true);
                  else this.lArrow.setAttribute('data-visiable', false);
                  return true;
                }
              },
              handleMouseUp: function (x, y) {
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
                  this.content2.style.left = Math.round(this.tempoffset) + "px";
                } else {
                  this.cancelClick = false;
                }
                this.offset = this.tempoffset;
                this.previousX = this.mouseDownX;
                this.previousY = this.mouseDownY;
                delete this.mouseDownX;
                delete this.mouseDownY;
              }
            }
          }
          var rTimer1 = null, lTimer1 = null, rTimer2 = null, lTimer2 = null;
          rArrow1.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            rTimer1 = setInterval(function () {
              viewState1.offset -= 20;
              if (viewState1.offset < 665 - viewState1.skinTotalWidth) {
                viewState1.offset = 665 - viewState1.skinTotalWidth;
                clearInterval(rTimer1);
              }
              viewState1.refresh();
            }, 50)
          });
          rArrow1.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(rTimer1);
          });
          lArrow1.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            lTimer1 = setInterval(function () {
              viewState1.offset += 20;
              if (viewState1.offset > 0) {
                clearInterval(lTimer1);
                viewState1.offset = 0;
              }
              viewState1.refresh();
            }, 50)
          });
          lArrow1.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(lTimer1);
          });
          rArrow2.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            rTimer2 = setInterval(function () {
              viewState2.offset -= 20;
              if (viewState2.offset < 665 - viewState2.skinTotalWidth) {
                viewState2.offset = 665 - viewState2.skinTotalWidth;
                clearInterval(rTimer2);
              }
              viewState2.refresh();
            }, 50)
          });
          rArrow2.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(rTimer2);
          });
          lArrow2.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
            lTimer2 = setInterval(function () {
              viewState2.offset += 20;
              if (viewState2.offset > 0) {
                clearInterval(lTimer2);
                viewState2.offset = 0;
              }
              viewState2.refresh();
            }, 50)
          });
          lArrow2.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            clearInterval(lTimer2);
          });
          if (lib.config.touchscreen) {
            content1.addEventListener('touchstart', function (event) {
              if (event.touches && event.touches.length) {
                viewState1.handleMouseDown(event.touches[0].clientX, event.touches[0].clientY);
              }
            });
            content1.addEventListener('touchend', function (event) {
              viewState1.handleMouseUp();
            });
            content1.addEventListener('touchcancel', function (event) {
              viewState1.handleMouseUp();
            });
            content1.addEventListener('touchmove', function (event) {
              if (event.touches && event.touches.length)
                viewState1.handleMouseMove(event.touches[0].clientX, event.touches[0].clientY);
            });
            content2.addEventListener('touchstart', function (event) {
              if (event.touches && event.touches.length) {
                viewState2.handleMouseDown(event.touches[0].clientX, event.touches[0].clientY);
              }
            });
            content2.addEventListener('touchend', function (event) {
              viewState2.handleMouseUp();
            });
            content2.addEventListener('touchcancel', function (event) {
              viewState2.handleMouseUp();
            });
            content2.addEventListener('touchmove', function (event) {
              if (event.touches && event.touches.length)
                viewState2.handleMouseMove(event.touches[0].clientX, event.touches[0].clientY);
            });
          } else {
            content1.addEventListener('mousewheel', function (event) {
              viewState1.handleMouseDown(event.clientX, event.clientY);
              if (event.wheelDelta > 0) {
                viewState1.handleMouseMove(event.clientX - 30, event.clientY);
                viewState1.handleMouseUp(event.clientX - 30, event.clientY);
              } else {
                viewState1.handleMouseMove(event.clientX + 30, event.clientY);
                viewState1.handleMouseUp(event.clientX + 30, event.clientY);
              }
            });
            content1.addEventListener('mousedown', function (event) {
              viewState1.handleMouseDown(event.clientX, event.clientY);
            });
            content1.addEventListener('mouseup', function (event) {
              viewState1.handleMouseUp(event.clientX, event.clientY);
            });
            content1.addEventListener('mouseleave', function (event) {
              viewState1.handleMouseUp(event.clientX, event.clientY);
            });
            content1.addEventListener('mousemove', function (event) {
              viewState1.handleMouseMove(event.clientX, event.clientY);
            });
            content2.addEventListener('mousewheel', function (event) {
              viewState2.handleMouseDown(event.clientX, event.clientY);
              if (event.wheelDelta > 0) {
                viewState2.handleMouseMove(event.clientX - 30, event.clientY);
                viewState2.handleMouseUp(event.clientX - 30, event.clientY);
              } else {
                viewState2.handleMouseMove(event.clientX + 30, event.clientY);
                viewState2.handleMouseUp(event.clientX + 30, event.clientY);
              }
            });
            content2.addEventListener('mousedown', function (event) {
              viewState2.handleMouseDown(event.clientX, event.clientY);
            });
            content2.addEventListener('mouseup', function (event) {
              viewState2.handleMouseUp(event.clientX, event.clientY);
            });
            content2.addEventListener('mouseleave', function (event) {
              viewState2.handleMouseUp(event.clientX, event.clientY);
            });
            content2.addEventListener('mousemove', function (event) {
              viewState2.handleMouseMove(event.clientX, event.clientY);
            });
          }

          //-----------------------------------------主将---------------------------------------------
          var namex = cPlayer?cPlayer.name1:name;
          var playZhuDynamic = lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'always' ? false : true;
          game.qhly_getSkinList(namex, function (ret, list) {
            var pkg = game.qhly_foundPackage(namex);
            if (!list) list = [];
            list.sort(function (a, b) {
              var orderA = game.qhly_getOrder(namex, a, pkg);
              var orderB = game.qhly_getOrder(namex, b, pkg);
              if (orderA > orderB) return 1;
              if (orderA == orderB) return 0;
              return -1;
            });
            const path = pkg.skin.standard;//1
            var skinList = [null];
            if (list && list.length) {
              skinList.addArray(list);
            }
            var dynamicSkinList = [], bothSkin = [], singleDynamic = [];//2
            if (window.decadeUI) {
              if (decadeUI.dynamicSkin[namex]) dynamicSkinList = Object.keys(decadeUI.dynamicSkin[namex]);
              singleDynamic = [...dynamicSkinList];//单形态
              for (var i of skinList) {
                if (i) {
                  var skin = i.substring(0, i.lastIndexOf('.'));
                  if (dynamicSkinList.contains(skin)) {
                    bothSkin.push(skin);//双形态
                    singleDynamic.remove(skin);
                  }
                }
              }
              if (dynamicSkinList) {
                if (lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'three' && dynamicSkinList.length > 3) playZhuDynamic = false;
                dynamicSkinList.forEach(function (value, index, array) {
                  array[index] += '.jpg';
                })
                skinList = Array.from(new Set(skinList.concat(dynamicSkinList)));
                skinList.remove('经典形象.jpg');
              }
            }
            viewState1.skins = skinList;
            viewState1.skinTotalWidth = (viewState1.skinPerWidth + viewState1.skinGap) * skinList.length - viewState1.skinGap + 20;
            for (let i = 0; i < skinList.length; i++) {
              var skin = skinList[i];
              var skinView = ui.create.div('.qh-skinchange-shousha-skin', content1);
              skinView.avatar = ui.create.div('.primary-avatar', skinView);
              var campWrap = ui.create.div('.qhcamp-wrap.shousha', skinView);
              if(cPlayer){
              campWrap.setAttribute("data-camp", cPlayer.group);
              }
              skinView.campBack = ui.create.div('.qhcamp-shousha-back', skinView);
              skinView.campBack.setAttribute('data-pinzhi', game.qhly_getSkinLevel(namex, skin));
              var campName = ui.create.div('.qhcamp-name', campWrap);
              campName.style.backgroundImage = 'url("' + lib.qhly_path + 'image/decoration/name_' + campWrap.getAttribute('data-camp') + '.png")';
              var avatarName = ui.create.div('.qhavatar-name', campWrap);
              //avatarName.innerText = get.slimName(namex).replace(/<br>/g, '\n');
              avatarName.innerHTML = get.prefixBoldName(namex,'justView').replace(/<br>/g, '\n');
              var hpWrap = ui.create.div('.qhhp-shousha-wrap', skinView);
              skinView.belowText = ui.create.div('.qh-skinchange-shousha-skin-text', hpWrap);
              viewState1.skinViews.push(skinView);
              skinView.style.left = Math.round((viewState1.skinPerWidth + viewState1.skinGap) * i + 16) + "px";
              skinView.style.width = Math.round(viewState1.skinPerWidth) + "px";
              skinView.avatar.classList.add('qh-not-replace');
              skinView.defaultskin = ui.create.div('.qh-skinchange-skin-shousha-default', skinView);
              skinView.$dynamicWrap = ui.create.div('.qhdynamic-shousha-wrap', skinView);
              skinView.toImageBtn = ui.create.div('.qh-domtoimage', skinView);
              skinView.toImageBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                game.qhly_dom2image(ingame, namex, this, path);
              });//3
              skinView.dynamicToggle = ui.create.div('.qh-skinchange-shousha-dynamicChange', skinView);
              //if (skin && bothSkin.contains(skin.substring(0, skin.lastIndexOf('.')))) skinView.dynamicToggle.setAttribute('toggle', true);
              if (!skin && dynamicSkinList.contains('经典形象.jpg')) skinView.dynamicToggle.setAttribute('toggle', true);
              if (skin && lib.config.qhly_skinset.djtoggle[namex]) {
                if (lib.config.qhly_skinset.djtoggle[namex][skin.substring(0, skin.lastIndexOf('.'))]) skinView.dynamicToggle.classList.add('jing');
              }
              skinView.dynamicToggle.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                if (this.classList.contains('jing')) {
                  this.classList.remove('jing');
                  if (playZhuDynamic) game.qhly_changeDynamicSkin(this.parentNode, this.parentNode.belowText.innerText, namex);
                  if (lib.config.qhly_skinset.djtoggle[namex] && lib.config.qhly_skinset.djtoggle[namex][this.parentNode.belowText.innerText]) delete lib.config.qhly_skinset.djtoggle[namex][this.parentNode.belowText.innerText];
                }
                else {
                  this.classList.add('jing');
                  if (playZhuDynamic && this.parentNode.stopDynamic) this.parentNode.stopDynamic();
                  if (lib.config.qhly_smallwindowstyle == 'shousha') {
                    this.parentNode.campBack.setAttribute("data-pinzhi", game.qhly_getSkinLevel(namex, skin));
                    this.parentNode.campBack.classList.remove('dong');
                  }
                  if (!lib.config.qhly_skinset.djtoggle[namex]) lib.config.qhly_skinset.djtoggle[namex] = {};
                  lib.config.qhly_skinset.djtoggle[namex][this.parentNode.belowText.innerText] = true;
                }
                game.qhlySyncConfig();
              });
              if (skin) {
                var str = skin.substring(0, skin.lastIndexOf('.'));
                if (bothSkin.contains(str)) skinView.dynamicToggle.setAttribute('toggle', true);
                if (singleDynamic.contains(str) && lib.config['extension_千幻聆音_qhly_dom2image']) skinView.toImageBtn.setAttribute('single', true);//打开快照
                var info = game.qhly_getSkinInfo(namex, skin);
                if (info) {
                  skinView.belowText.innerHTML = info.translation;
                }
                if ((!lib.config.qhly_skinset.djtoggle[namex] || lib.config.qhly_skinset.djtoggle[namex] && !lib.config.qhly_skinset.djtoggle[namex][skin.substring(0, skin.lastIndexOf('.'))]) && window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[namex] && Object.keys(decadeUI.dynamicSkin[namex]).contains(info.translation)) {
                  if (playZhuDynamic) game.qhly_changeDynamicSkin(skinView, info.translation, namex);
                }
              } else {
                skinView.belowText.innerHTML = "经典形象";
                if (dynamicSkinList.contains('经典形象.jpg') && playZhuDynamic) game.qhly_changeDynamicSkin(skinView, '经典形象', namex);
              }
              //可以用！！！
              skinView.belowText.innerHTML=game.qhly_rename(skinView.belowText.innerHTML);
              var skinQua = ui.create.div('.qhly-skinQua-shousha', skinView);
              var skininfo = game.qhly_getSkinInfo(namex, skin, game.qhly_foundPackage(namex));
              var level = skininfo.level;
              var style = skininfo.levelStyle;
              if (style) {
                if (!skinQua.qh_savedStyle) {
                  skinQua.qh_savedStyle = {};
                  for (var m in skinQua.style) {
                    skinQua.qh_savedStyle[m] = skinQua.style[m];
                  }
                }
                for (var s in style) {
                  skinQua.style[s] = style[s];
                }
                var es = ['left', 'bottom', 'top', 'right'];
                for (var m of es) {
                  if (!style[m]) {
                    skinQua.style[m] = "";
                  }
                }
              } else {
                if (skinQua.qh_savedStyle) {
                  for (var m in skinQua.qh_savedStyle) {
                    skinQua.style[m] = skinQua.qh_savedStyle[m];
                  }
                }
              }
              if (skin) {
                if (lib.qhly_level[namex + '_' + skin]) {
                  level = lib.qhly_level[namex + '_' + skin];
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
                  skinQua.show();
                  skinQua.setBackgroundImage(img);
                } else {
                  skinQua.hide();
                }
              } else {
                skinQua.hide();
              }
              // var skinQua = ui.create.div('.qhly-skinQua-shousha', skinView);
              // skinQua.style['background-image'] = 'url(' + lib.qhly_path+'image/' + game.qhly_getSkinLevel(namex, skin) + '.png)';
              if (game.qhly_skinIs(namex, skin)) {
                skinView.defaultskin.setAttribute('data-sel', true);
                if (skinView.offsetLeft > viewState1.visibleWidth()) viewState1.offset = viewState1.visibleWidth() - (skinView.offsetLeft + viewState1.skinPerWidth);
              } else {
                skinView.defaultskin.setAttribute('data-sel', false);
              }
              (function (name, skin, view) {
                view.listen(function () {
                  if (viewState1.cancelClick) return;
                  game.qhly_setCurrentSkin(namex, skin, function () {
                    viewState1.refreshSkins();
                    game.qhly_changeDynamicSkin(namex);
                    game.qhlySyncConfig();
                    if (lib.config['extension_千幻聆音_qhly_decadeChangeEffect'] && cPlayer) cPlayer.playChangeSkinEffect(false);
                    if (lib.config.qhly_smallwinclosewhenchange) {
                      exitListener();
                    }
                  }, true);

                });
              })(namex, skin, skinView);
              if (skin) {
                let file = game.qhly_getSkinFile(namex, skin);
                let skinView2 = skinView.avatar;
                game.qhly_checkFileExist(file, function (s) {
                  if (s) {
                    skinView2.qhly_origin_setBackgroundImage(file);
                  } else {
                    var prefix = pkg.prefix;
                    if (typeof prefix == 'function') {
                      prefix = prefix(namex);
                    }
                    if (lib.config.qhly_noSkin == 'origin') skinView2.qhly_origin_setBackgroundImage(prefix + namex + '.jpg');//原画
                    else skinView2.qhly_origin_setBackgroundImage('extension/千幻聆音/image/noSkin.png');//noskin
                  }
                })
              } else {
                skinView.avatar.qhly_origin_setBackground(namex, 'character');
              }
            }
            if (cPlayer && cPlayer.name1 == name) {
              if (Math.round(viewState1.skinTotalWidth) >= viewState1.visibleWidth()) cover.setAttribute('data-overstep', true);
              else cover.setAttribute('data-overstep', false);
            }
            viewState1.refresh();
          }, false);

          //--------------------------------------副将---------------------------------------------
          if (cPlayer && cPlayer.name2) {
            var namey = cPlayer.name2;
            var playFuDynamic = lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'always' ? false : true;
            game.qhly_getSkinList(namey, function (ret, list) {
              var pkg = game.qhly_foundPackage(namey);
              if (!list) list = [];
              list.sort(function (a, b) {
                var orderA = game.qhly_getOrder(namey, a, pkg);
                var orderB = game.qhly_getOrder(namey, b, pkg);
                if (orderA > orderB) return 1;
                if (orderA == orderB) return 0;
                return -1;
              });
              const path = pkg.skin.standard;//1
              var skinList = [null];
              if (list && list.length) {
                skinList.addArray(list);
              }
              var dynamicSkinList = [], bothSkin = [], singleDynamic = [];//2
              if (window.decadeUI) {
                if (decadeUI.dynamicSkin[namey]) dynamicSkinList = Object.keys(decadeUI.dynamicSkin[namey]);
                singleDynamic = [...dynamicSkinList];//单形态
                for (var i of skinList) {
                  if (i) {
                    var skin = i.substring(0, i.lastIndexOf('.'));
                    if (dynamicSkinList.contains(skin)) {
                      bothSkin.push(skin);//双形态
                      singleDynamic.remove(skin);
                    }
                  }
                }
                if (dynamicSkinList) {
                  if (lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'three' && dynamicSkinList.length > 3) playFuDynamic = false;
                  dynamicSkinList.forEach(function (value, index, array) {
                    array[index] += '.jpg';
                  })
                  skinList = Array.from(new Set(skinList.concat(dynamicSkinList)));
                  skinList.remove('经典形象.jpg');
                }
              }
              viewState2.skins = skinList;
              viewState2.skinTotalWidth = (viewState2.skinPerWidth + viewState2.skinGap) * skinList.length - viewState2.skinGap + 20;
              for (let i = 0; i < skinList.length; i++) {
                var skin = skinList[i];
                var skinView = ui.create.div('.qh-skinchange-shousha-skin', content2);
                skinView.avatar = ui.create.div('.primary-avatar', skinView);
                var campWrap = ui.create.div('.qhcamp-wrap.shousha', skinView);
                if(cPlayer){
                  campWrap.setAttribute("data-camp", cPlayer.group);
                }
                skinView.campBack = ui.create.div('.qhcamp-shousha-back', skinView);
                skinView.campBack.setAttribute('data-pinzhi', game.qhly_getSkinLevel(namey, skin));
                var campName = ui.create.div('.qhcamp-name', campWrap);
                campName.style.backgroundImage = 'url("' + lib.qhly_path + 'image/decoration/name_' + campWrap.getAttribute('data-camp') + '.png")';
                var avatarName = ui.create.div('.qhavatar-name', campWrap);
                //avatarName.innerText = get.slimName(namey).replace(/<br>/g, '\n');
                avatarName.innerHTML = get.prefixBoldName(namey,'justView').replace(/<br>/g, '\n');
                var hpWrap = ui.create.div('.qhhp-shousha-wrap', skinView);
                skinView.belowText = ui.create.div('.qh-skinchange-shousha-skin-text', hpWrap);
                viewState2.skinViews.push(skinView);
                skinView.style.left = Math.round((viewState1.skinPerWidth + viewState1.skinGap) * i + 16) + "px";
                skinView.style.width = Math.round(viewState1.skinPerWidth) + "px";
                skinView.avatar.classList.add('qh-not-replace');
                skinView.defaultskin = ui.create.div('.qh-skinchange-skin-shousha-default', skinView);
                skinView.$dynamicWrap = ui.create.div('.qhdynamic-shousha-wrap', skinView);
                skinView.toImageBtn = ui.create.div('.qh-domtoimage', skinView);
                skinView.toImageBtn.addEventListener('click', function (e) {
                  e.stopPropagation();
                  game.qhly_dom2image(ingame, namey, this, path);
                });//3
                skinView.dynamicToggle = ui.create.div('.qh-skinchange-shousha-dynamicChange', skinView);
                //if (skin && bothSkin.contains(skin.substring(0, skin.lastIndexOf('.')))) skinView.dynamicToggle.setAttribute('toggle', true);
                if (!skin && dynamicSkinList.contains('经典形象.jpg')) skinView.dynamicToggle.setAttribute('toggle', true);
                if (skin && lib.config.qhly_skinset.djtoggle[namey]) {
                  if (lib.config.qhly_skinset.djtoggle[namey][skin.substring(0, skin.lastIndexOf('.'))]) skinView.dynamicToggle.classList.add('jing');
                }
                skinView.dynamicToggle.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                  if (this.classList.contains('jing')) {
                    this.classList.remove('jing');
                    if (playFuDynamic) game.qhly_changeDynamicSkin(this.parentNode, this.parentNode.belowText.innerText, namey);
                    if (lib.config.qhly_skinset.djtoggle[namey] && lib.config.qhly_skinset.djtoggle[namey][this.parentNode.belowText.innerText]) delete lib.config.qhly_skinset.djtoggle[namey][this.parentNode.belowText.innerText];
                  }
                  else {
                    this.classList.add('jing');
                    if (playFuDynamic && this.parentNode.stopDynamic) this.parentNode.stopDynamic();
                    if (lib.config.qhly_smallwindowstyle == 'shousha') {
                      this.parentNode.campBack.setAttribute("data-pinzhi", game.qhly_getSkinLevel(namey, skin));
                      this.parentNode.campBack.classList.remove('dong');
                    }
                    if (!lib.config.qhly_skinset.djtoggle[namey]) lib.config.qhly_skinset.djtoggle[namey] = {};
                    lib.config.qhly_skinset.djtoggle[namey][this.parentNode.belowText.innerText] = true;
                  }
                  game.qhlySyncConfig();
                });
                if (skin) {
                  var str = skin.substring(0, skin.lastIndexOf('.'));
                  if (bothSkin.contains(str)) skinView.dynamicToggle.setAttribute('toggle', true);
                  if (singleDynamic.contains(str) && lib.config['extension_千幻聆音_qhly_dom2image']) skinView.toImageBtn.setAttribute('single', true);//打开快照
                  var info = game.qhly_getSkinInfo(namey, skin);
                  if (info) {
                    skinView.belowText.innerHTML = info.translation;
                  }
                  if ((!lib.config.qhly_skinset.djtoggle[namey] || lib.config.qhly_skinset.djtoggle[namey] && !lib.config.qhly_skinset.djtoggle[namey][skin.substring(0, skin.lastIndexOf('.'))]) && window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[namey] && Object.keys(decadeUI.dynamicSkin[namey]).contains(info.translation)) {
                    if (playFuDynamic) game.qhly_changeDynamicSkin(skinView, info.translation, namey, true);
                  }
                } else {
                  skinView.belowText.innerHTML = "经典形象";
                  if (dynamicSkinList.contains('经典形象.jpg') && playFuDynamic) game.qhly_changeDynamicSkin(skinView, '经典形象', namey);
                }
                //skinView.belowText.innerHTML=game.qhly_rename(skinView.belowText.innerHTML);
                var skinQua = ui.create.div('.qhly-skinQua-shousha', skinView);
                var skininfo = game.qhly_getSkinInfo(namey, skin, game.qhly_foundPackage(namey));
                var level = skininfo.level;
                var style = skininfo.levelStyle;
                if (style) {
                  if (!skinQua.qh_savedStyle) {
                    skinQua.qh_savedStyle = {};
                    for (var m in skinQua.style) {
                      skinQua.qh_savedStyle[m] = skinQua.style[m];
                    }
                  }
                  for (var s in style) {
                    skinQua.style[s] = style[s];
                  }
                  var es = ['left', 'bottom', 'top', 'right'];
                  for (var m of es) {
                    if (!style[m]) {
                      skinQua.style[m] = "";
                    }
                  }
                } else {
                  if (skinQua.qh_savedStyle) {
                    for (var m in skinQua.qh_savedStyle) {
                      skinQua.style[m] = skinQua.qh_savedStyle[m];
                    }
                  }
                }
                if (skin) {
                  if (lib.qhly_level[namey + '_' + skin]) {
                    level = lib.qhly_level[namey + '_' + skin];
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
                    skinQua.show();
                    skinQua.setBackgroundImage(img);
                  } else {
                    skinQua.hide();
                  }
                } else {
                  skinQua.hide();
                }
                if (game.qhly_skinIs(namey, skin)) {
                  skinView.defaultskin.setAttribute('data-sel', true);
                  if (skinView.offsetLeft > viewState2.visibleWidth()) viewState2.offset = viewState2.visibleWidth() - (skinView.offsetLeft + viewState2.skinPerWidth);
                } else {
                  skinView.defaultskin.setAttribute('data-sel', false);
                }
                (function (name, skin, view) {
                  view.listen(function () {
                    if (viewState2.cancelClick) return;
                    game.qhly_setCurrentSkin(namey, skin, function () {
                      viewState2.refreshSkins();
                      //if (view.dynamicToggle && view.dynamicToggle.classList && !view.dynamicToggle.classList.contains('jing')) {
                      game.qhly_changeDynamicSkin(namey, null, null, true);
                      //}
                      if (lib.config['extension_千幻聆音_qhly_decadeChangeEffect'] && cPlayer) cPlayer.playChangeSkinEffect(true);
                      game.qhlySyncConfig();
                      if (lib.config.qhly_smallwinclosewhenchange) {
                        exitListener();
                      }
                    }, true);
                  });
                })(namey, skin, skinView);
                if (skin) {
                  let file = game.qhly_getSkinFile(namey, skin);
                  let skinView2 = skinView.avatar;
                  game.qhly_checkFileExist(file, function (s) {
                    if (s) {
                      skinView2.qhly_origin_setBackgroundImage(file);
                    } else {
                      var prefix = pkg.prefix;
                      if (typeof prefix == 'function') {
                        prefix = prefix(namey);
                      }
                      if (lib.config.qhly_noSkin == 'origin') skinView2.qhly_origin_setBackgroundImage(prefix + namey + '.jpg');//原画
                      else skinView2.qhly_origin_setBackgroundImage('extension/千幻聆音/image/noSkin.png');//noskin
                    }
                  })
                } else {
                  skinView.avatar.qhly_origin_setBackground(namey, 'character');
                }
              }
              if (cPlayer && cPlayer.name2 == name) {
                if (Math.round(viewState2.skinTotalWidth) >= viewState2.visibleWidth()) cover.setAttribute('data-overstep', true);
                else cover.setAttribute('data-overstep', false);
              }
              viewState2.refresh();
            }, false);
          }
          backgroundBack.listen(function (event) {
            exitListener();
          });
          //exit.listen(exitListener);
          enlarge.listen(function () {
            exitListener();
            game.qhly_open_new(name, 'skill', ingame);
          });
        } catch (e) {
          if (QHLY_DEBUGMODE) {
            throw e;
          }
        }
      };

      function qhly_changeUseSkill(str) {
        let index0 = str.indexOf('{') + 1;
        let index1 = str.indexOf('var');
        let index2 = str.lastIndexOf('}');
        let newStr = str.slice(index0, index1) + 'game.qhly_changeSkillSkin(player, event.skill);\n' + str.slice(index1, index2);
        return newStr;
      }
      function qhly_changeUseCard(str, num) {
        let index0 = str.indexOf('{') + 1;
        let index1 = str.indexOf('if(cardaudio');
        if (index1 < 0) index1 = str.indexOf('if (cardaudio');
        let index2 = str.indexOf('if(event.animate');
        if (index2 < 0) index2 = str.indexOf('if (event.animate');
        if (num == 2) {
          index2 = str.indexOf('if', index1 + 400);
        }
        let index3 = str.lastIndexOf('}');
        function use() {
          game.broadcastAll(function (player, card) {
            if (lib.config.background_audio) {
              if (get.type(card) == 'equip' && !lib.config.equip_audio) return;
              var sex = player.sex == 'female' ? 'female' : 'male';
              var audioinfo = lib.card[card.name].audio;
              var skin = game.qhly_getSkin(player.name1);
              if (lib.config.qhly_changeSex && lib.config.qhly_changeSex[player.name1] && lib.config.qhly_changeSex[player.name1][skin]) sex = (sex == 'female' ? 'male' : 'female');
              var pkg = game.qhly_foundPackage(player.name1);
              var realName = game.qhly_getRealName(player.name1);
              var pkgPath = (pkg.isExt && realName != player.name1 && skin) ? DEFAULT_PACKAGE.audio : pkg.audio;
              var exchangeCA = false;
              var cardURL = pkgPath + (skin ? realName : player.name1) + '/' + game.qhly_earse_ext(skin) + '/';
              if (lib.qhly_skinChange[realName] && lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)] && lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)].cardaudio) {
                if (game.qhly_getPlayerStatus(player) == 2 && lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)].audio1) cardURL = pkgPath + (skin ? realName : player.name1) + '/' + lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)].audio1;
                exchangeCA = true;
              }
              if (card.name == 'sha' && (card.nature == 'fire' || card.nature == 'thunder' || card.nature == 'ice' || card.nature == 'stab')) {
                if (exchangeCA) {
                  cardURL += (card.name + '_' + card.nature);
                  //console.log(cardURL);
                  if (game.thunderFileExist(lib.assetURL + cardURL + '.mp3')) game.playAudio('..', cardURL);
                  else game.playAudio('card', sex, card.name + '_' + card.nature);
                } else game.playAudio('card', sex, card.name + '_' + card.nature);
              } else {
                if (typeof audioinfo == 'string') {
                  if (audioinfo.indexOf('ext:') == 0) game.playAudio('..', 'extension', audioinfo.slice(4), card.name + '_' + sex);
                  else game.playAudio('card', sex, audioinfo);
                }
                else {
                  if (exchangeCA) {
                    cardURL += card.name;
                    //console.log(cardURL);
                    if (game.thunderFileExist(lib.assetURL + cardURL + '.mp3')) game.playAudio('..', cardURL);
                    else game.playAudio('card', sex, card.name);
                  } else game.playAudio('card', sex, card.name);
                }
              }
            }
          }, player, card);
        }
        let f = use.toString();
        let newStr = str.slice(index0, index1) + "if(cardaudio)" + f.slice(19, f.length - 1) + str.slice(index2, index3);
        return newStr;
      }
      lib.element.content.useSkill = new Function(qhly_changeUseSkill(lib.element.content.useSkill.toString()));
      lib.element.content.useCard = new Function(qhly_changeUseCard(lib.element.content.useCard.toString()));
      lib.element.content.respond = function () {
        'step 0'
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
        }
        else if (!event.nopopup) player.tryCardAnimate(card, card.name, 'wood');
        if (cardaudio && event.getParent(3).name == 'useCard') {
          game.broadcastAll(function (player, card) {
            if (lib.config.background_audio) {
              var sex = player.sex == 'female' ? 'female' : 'male';
              var audioinfo = lib.card[card.name].audio;
              var skin = game.qhly_getSkin(player.name1);
              if (lib.config.qhly_changeSex && lib.config.qhly_changeSex[player.name1] && lib.config.qhly_changeSex[player.name1][skin]) sex = (sex == 'female' ? 'male' : 'female');
              var pkg = game.qhly_foundPackage(player.name1);
              var realName = game.qhly_getRealName(player.name1);
              var pkgPath = (pkg.isExt && realName != player.name1 && skin) ? DEFAULT_PACKAGE.audio : pkg.audio;
              var exchangeCA = false;
              var cardURL = pkgPath + (skin ? realName : player.name1) + '/' + game.qhly_earse_ext(skin) + '/';
              if (lib.qhly_skinChange[realName] && lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)] && lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)].cardaudio) {
                if (game.qhly_getPlayerStatus(player) == 2 && lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)].audio1) cardURL = pkgPath + (skin ? realName : player.name1) + '/' + lib.qhly_skinChange[realName][game.qhly_earse_ext(skin)].audio1;
                exchangeCA = true;
              }
              if (typeof audioinfo == 'string' && audioinfo.indexOf('ext:') == 0) {
                game.playAudio('..', 'extension', audioinfo.slice(4), card.name + '_' + sex);
              }
              else {
                if (exchangeCA) {
                  cardURL += card.name;
                  //console.log(cardURL);
                  if (game.thunderFileExist(lib.assetURL + cardURL + '.mp3')) game.playAudio('..', cardURL);
                  else game.playAudio('card', sex, card.name);
                } else game.playAudio('card', sex, card.name);
              }
            }
          }, player, card);
        }
        if (event.skill) {
          if (player.stat[player.stat.length - 1].skill[event.skill] == undefined) {
            player.stat[player.stat.length - 1].skill[event.skill] = 1;
          }
          else {
            player.stat[player.stat.length - 1].skill[event.skill]++;
          }
          var sourceSkill = get.info(event.skill).sourceSkill;
          if (sourceSkill) {
            if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
              player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
            }
            else {
              player.stat[player.stat.length - 1].skill[sourceSkill]++;
            }
          }
        }
        if (cards.length && (cards.length > 1 || cards[0].name != card.name)) {
          game.log(player, '打出了', card, '（', cards, '）');
        }
        else {
          game.log(player, '打出了', card);
        }
        player.actionHistory[player.actionHistory.length - 1].respond.push(event);
        if (window.decadeUI) {
          var cards2 = cards.concat();
          if (cards2.length) {
            var next = player.lose(cards2, ui.ordering, 'visible');
            cards2.removeArray(next.cards);
            if (event.noOrdering)
              next.noOrdering = true;

            if (event.animate != false && event.throw !== false) {
              next.animate = true;
              next.blameEvent = event;
            }

            if (cards2.length) {
              var next2 = game.cardsGotoOrdering(cards2);
              if (event.noOrdering)
                next2.noOrdering = true;

              player.$throw(cards2);
            }
          }
        } else {
          if (cards.length) {
            var owner = (get.owner(cards[0]) || player);
            var next = owner.lose(cards, 'visible', ui.ordering).set('type', 'use');
            var directDiscard = [];
            for (var i = 0; i < cards.length; i++) {
              if (!next.cards.contains(cards[i])) {
                directDiscard.push(cards[i]);
              }
            }
            if (directDiscard.length) game.cardsGotoOrdering(directDiscard);
          }
          if (event.animate != false && event.throw !== false) {
            for (var i = 0; i < cards.length; i++) {
              player.$throw(cards[i]);
              if (event.highlight) {
                cards[i].clone.classList.add('thrownhighlight');
                game.addVideo('highlightnode', player, get.cardInfo(cards[i]));
              }
            }
            if (event.highlight) {
              game.broadcast(function (cards) {
                for (var i = 0; i < cards.length; i++) {
                  if (cards[i].clone) {
                    cards[i].clone.classList.add('thrownhighlight');
                  }
                }
              }, cards);
            }
          }
        }
        event.trigger('respond');
        'step 1'
        game.delayx(0.5);
      }
      game.qhly_checkLoadSuccess = function(){
        if(lib.config.qhly_currentViewSkin == 'shousha' && !game.qhly_initShoushaView){
          return false;
        }
        return true;
      };
      //打开选择皮肤界面。
      game.qhly_open_new = function (name, page, ingame) {
        //配合手杀菜篮子
        if(window.all_cailanzi) return;
        try {
          if(!game.qhly_checkLoadSuccess()){
              return;
          }
          if(typeof txhj=='object'&&txhj.servant) txhj.servant.hide();
          //if(name.indexOf('gz_') == 0){
          //    name = name.slice(3);
          //}
          var cplayer = null;
          if (ingame) {
            if (get.itemtype(ingame) == 'player') {
              cplayer = ingame;
            } else if (ingame.parentNode && get.itemtype(ingame.parentNode) == 'player') {
              cplayer = ingame.parentNode;
            }
          }
          if (_status.qhly_open || _status.bigEditing) return;
          _status.qhly_open = true;
          _status.qhly_skillAudioWhich = {};
          var currentViewSkin = lib.qhly_viewskin[lib.config.qhly_currentViewSkin];
          var gback = ui.create.div('.qh-background');
          var background = ui.create.div('.qh-window', gback);
          game.noReturnMenu=true;
          var backButton = ui.create.div('.qh-back', background);
          if (lib.config.qhly_currentViewSkin == 'shousha') var dibuhuo = ui.create.div('.qh-dibuhuo', background);
          var setSize = function () {
            var screenWidth = ui.window.offsetWidth;
            var screenHeight = ui.window.offsetHeight;
            var whr = currentViewSkin.whr ? currentViewSkin.whr : 1.7198;
            var width;
            var height;
            if (screenWidth / whr > screenHeight) {
              height = screenHeight;
              width = height * whr;
            } else {
              width = screenWidth;
              height = screenWidth / whr;
            }
            if (lib.config.qhly_currentViewSkin != 'decade' && lib.config.qhly_currentViewSkin != 'shousha') {
              if (height < screenHeight && lib.config.qhly_layoutFitY) {
                height = screenHeight;
              }
              if (width < screenWidth && lib.config.qhly_layoutFitX) {
                width = screenWidth;
              }
            }
            if (lib.config.qhly_currentViewSkin == 'shousha') {
              backButton.style.transform = 'translateY(' + (Math.round(height) - document.body.offsetHeight) * 0.5 + 'px)';
              dibuhuo.style.transform = 'translateY(' + (document.body.offsetHeight - Math.round(height)) * 0.5 + 'px)';
            }
            background.style.height = Math.round(height) + "px";
            background.style.width = Math.round(width) + "px";
          };
          setSize();
          var resize = function () {
            setTimeout(setSize, 500);
          };
          lib.onresize.push(resize);
          backButton.listen(function () {
            //如果有开着菜单就呼出菜单
            setTimeout(function(){
                game.noReturnMenu=false;
            },500);
            game.qhly_playQhlyAudio(lib.config.qhly_currentViewSkin == 'decade' ? 'qhly_voc_dec_press' : 'qhly_voc_press', null, true);
            if(typeof txhj=='object'&&txhj.servant) txhj.servant.show();
            gback.delete(500, function () {
              lib.onresize.remove(resize);
              if(!window.hasMenu) game.resume2();
              _status.qhly_open = false;
              if(typeof game.qhly_refresh_temp=='function') {
                  game.qhly_refresh_temp();
                  game.qhly_refresh_temp = undefined;
              }
            });
            delete _status.qhly_skillAudioWhich;
            if (window.inSplash && game.qhly_hasExtension("如真似幻")) { 
              ui.window.remove();
            }
          });
          gback.hide();
          document.body.appendChild(gback);
          if (lib.config.qhly_currentViewSkin == 'decade') game.qhly_initDecadeView(name, background, page, cplayer);
          else if (lib.config.qhly_currentViewSkin == 'shousha') {
            if(game.qhly_initShoushaView){
              game.qhly_initShoushaView(name, background, page, cplayer);
            }
          }
          else game.qhly_initNewView(name, background, page, cplayer);
          gback.show();
          game.pause2();
        } catch (e) {
          if (QHLY_DEBUGMODE) {
            throw e;
          }
        }
      };
      get.qhly_getMp = function (name, pkg) {
        if (!pkg) {
          pkg = game.qhly_foundPackage(name);
        }
        if (pkg && pkg.characterMp) {
          var ret = pkg.characterMp(name);
          return ret;
        }
        return null;
      };
      get.qhly_getIntroduce = function (name, pkg) {
        if (!pkg) {
          pkg = game.qhly_foundPackage(name);
        }
        if (pkg && pkg.characterInfo) {
          var intro = pkg.characterInfo(name);
          if (intro) {
            return intro;
          }
        }
        return get.characterIntro(name);
      };
      ui.qhly_bindCheckBoxAndSpanText = function (checkbox, text) {
        if (!text) return;
        ui.qhly_addListenFunc(text);
        text.listen(function () {
          game.qhly_playQhlyAudio('qhly_voc_check', null, true);
          checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
        });
      };
      ui.qhly_addListenFunc = function (view) {
        view.listen = function (func) {
          if (lib.config.touchscreen) {
            this.addEventListener('touchend', function (e) {
              if (!_status.dragged) {
                func.call(this, e);
              }
            });
            var fallback = function (e) {
              if (!_status.touchconfirmed) {
                func.call(this, e);
              }
              else {
                this.removeEventListener('click', fallback);
              }
            }
            this.addEventListener('click', fallback);
          }
          else {
            this.addEventListener('click', func);
          }
          return this;
        };
      };
      ui.qhly_initCheckBox = function (view, checked, forbid) {
        view.style.width = '30px';
        view.style.height = '30px';
        view.style.display = 'inline';
        view.qhly_checked = checked;
        ui.qhly_addListenFunc(view);
        if (view.qhly_checked) {
          view.src = lib.assetURL + get.qhly_getIf(lib.qhly_viewskin[lib.config.qhly_currentViewSkin].checkBoxCheckedImage, 'extension/千幻聆音/image/newui_checkbox_checked.png');
        } else {
          view.src = lib.assetURL + get.qhly_getIf(lib.qhly_viewskin[lib.config.qhly_currentViewSkin].checkBoxImage, 'extension/千幻聆音/image/newui_checkbox_unchecked.png');
        }
        view.qhly_setChecked = function (checked, trigger) {
          if (trigger === undefined) trigger = true;
          if (checked != this.qhly_checked) {
            this.qhly_checked = checked;
            if (this.qhly_checked) {
              this.src = lib.assetURL + get.qhly_getIf(lib.qhly_viewskin[lib.config.qhly_currentViewSkin].checkBoxCheckedImage, 'extension/千幻聆音/image/newui_checkbox_checked.png');
            } else {
              this.src = lib.assetURL + get.qhly_getIf(lib.qhly_viewskin[lib.config.qhly_currentViewSkin].checkBoxImage, 'extension/千幻聆音/image/newui_checkbox_unchecked.png');
            }
            if (trigger && this.qhly_onchecked) {
              this.qhly_onchecked(this.qhly_checked);
            }
          }
        };
        view.listen(function () {
          if (forbid) return;
          game.qhly_playQhlyAudio('qhly_voc_check', null, true);
          this.qhly_checked = !this.qhly_checked;
          if (this.qhly_checked) {
            this.src = lib.assetURL + get.qhly_getIf(lib.qhly_viewskin[lib.config.qhly_currentViewSkin].checkBoxCheckedImage, 'extension/千幻聆音/image/newui_checkbox_checked.png');
          } else {
            this.src = lib.assetURL + get.qhly_getIf(lib.qhly_viewskin[lib.config.qhly_currentViewSkin].checkBoxImage, 'extension/千幻聆音/image/newui_checkbox_unchecked.png');
          }
          if (this.qhly_onchecked) {
            this.qhly_onchecked(this.qhly_checked);
          }
        });
      };
      game.qhly_getCharacterTaici = function (name, skin, pkg) {
        if (name.indexOf('gz_') == 0) {
          if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanAudio(name)) {
            var subname = name.slice(3);
            if (get.character(subname)) {
              name = subname;
            }
          }
        }
        var realName = game.qhly_getRealName(name);//添加皮肤共享
        if (!pkg) pkg = game.qhly_foundPackage(pkg);
        if (!skin) {
          var dinfo = lib.qhly_dirskininfo[realName];
          if (dinfo && dinfo.origin && dinfo.origin.skill) {
            taici = dinfo.origin.skill;
          } else if (pkg.characterTaici) {
            taici = pkg.characterTaici(name);
          } else {
            taici = undefined;
          }
          return taici;
        } else {
          var skinInfo = game.qhly_getSkinInfo(name, skin, pkg);
          if (skinInfo) {
            return skinInfo.skill;
          }
          return undefined;
        }
      };
      get.qhly_getAudioInfoInSkin = function (name, pkg, skin) {
        if (name.indexOf('gz_') == 0) {
          if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanAudio(name)) {
            var subname = name.slice(3);
            if (get.character(subname)) {
              name = subname;
            }
          }
        }
        if (!pkg) pkg = game.qhly_foundPackage(name);
        var list = [];
        var skills = get.character(name, 3);
        if (!skills) return list;
        for (var skill of skills) {
          if (!lib.translate[skill + "_info"]) continue;
          list.add(skill);
          var info = get.info(skill);
          if (info.derivation) {
            var derivation = [];
            if (typeof info.derivation == 'string') {
              derivation.add(info.derivation);
            } else {
              for (var de of info.derivation) {
                derivation.add(de);
              }
            }
            for (var der of derivation) {
              var info = get.info(der);
              if (info && !info.equipSkill && !info.xwMijiSkill) {
                list.add(der);
              }
            }
          }
        }
        var ret = [];
        if (!skin) {
          var taici;
          var dinfo = lib.qhly_dirskininfo[name];
          if (dinfo && dinfo.origin && dinfo.origin.skill) {
            taici = dinfo.origin.skill;
          } else if (pkg.characterTaici) {
            taici = pkg.characterTaici(name);
          } else {
            taici = undefined;
          }
          for (var skill of list) {
            if (!lib.translate[skill + "_info"]) continue;
            var obj = {
              id: skill,
              name: get.translation(skill),
            };
            if (taici) {
              var skillTaici = taici[skill];
              if (skillTaici) {
                if (skillTaici.hide) continue;
                if (skillTaici.order) obj.order = skillTaici.order;
                if (skillTaici.name) {
                  obj.name = skillTaici.name;
                }
                obj.content = skillTaici.content;
              }
            }
            ret.add(obj);
          }
          ret.sort(function (a, b) {
            var orderA = a.order ? a.order : Infinity;
            var orderB = b.order ? b.order : Infinity;
            return orderA - orderB;
          });
          if (taici) {
            if (taici.die) {
              ret.push({
                id: 'die',
                name: taici.die.name ? taici.die.name : '阵亡',
                content: taici.die.content,
              });
            }
            ret.push({
              id: 'victory',
              name: (taici.victory && taici.victory.name) ? taici.victory.name : '胜利',
              content: taici.victory && taici.victory.content,
            });

          } else {
            ret.addArray([{
              id: 'die',
              name: '阵亡',
            }, {
              id: 'victory',
              name: '胜利',
            }]);
          }
        } else {
          var taici;
          var skinInfo = game.qhly_getSkinInfo(name, skin, pkg);
          for (var skill of list) {
            if (!lib.translate[skill + "_info"]) continue;
            var obj = {
              id: skill,
              name: get.translation(skill),
            };
            if (skinInfo.skill) {
              var skillTaici = skinInfo.skill[skill];
              if (skillTaici) {
                if (skillTaici.hide) continue;
                if (skillTaici.order) obj.order = skillTaici.order;
                if (skillTaici.name) {
                  obj.name = skillTaici.name;
                }
                obj.content = skillTaici.content;
              }
            }
            ret.add(obj);
          }
          ret.sort(function (a, b) {
            var orderA = a.order ? a.order : Infinity;
            var orderB = b.order ? b.order : Infinity;
            return orderA - orderB;
          });
          var die = {
            id: 'die',
            name: '阵亡',
          };

          var victory = {
            id: 'victory',
            name: '胜利',
          }
          ret.addArray([die, victory]);
          if (skinInfo && skinInfo.skill) {
            if (skinInfo.skill.die) {
              die.content = skinInfo.skill.die.content;
              if (skinInfo.skill.die.name) {
                die.name = skinInfo.skill.die.name;
              }
            }
            if (skinInfo.skill.victory) {
              victory.content = skinInfo.skill.victory.content;
              if (skinInfo.skill.victory.name) {
                victory.name = skinInfo.skill.victory.name;
              }
            }
          }
        }
        return ret;
      };
      game.qhly_getPluginId = function(plugin){
        var pluginId = plugin.id;
        if(!pluginId){
          pluginId = plugin.label;
        }
        if(!pluginId){
          pluginId = plugin.name;
        }
        if(!pluginId){
          return false;
        }
        return pluginId;
      };
      game.qhly_pluginIsEnable = function(plugin){
        var pluginId = game.qhly_getPluginId(plugin);
        if(pluginId === false)return false;
        if(lib.config.qhly_disabledPlugins && lib.config.qhly_disabledPlugins.contains(pluginId)){
          return false;
        }
        if(!plugin.enable){
          return true;
        }
        if(typeof plugin.enable == 'function'){
          return plugin.enable();
        }
        return plugin.enable;
      };
      game.qhly_getPlugins = function (type,enabledOnly) {
        if(enabledOnly === undefined){
          enabledOnly = true;
        }
        var ret = [];
        for (var plugin of lib.qhlyPlugins) {
          if(enabledOnly){
            if (!game.qhly_pluginIsEnable(plugin)) continue;
          }
          if (type && plugin.pluginType != type) continue;
          ret.push(plugin);
        }
        return ret;
      };
      game.qhly_getIntroduceExtraPage = function (name, pkg) {
        if (lib.config.qhly_forbidExtPage) {
          return undefined;
        }
        var ret = [];
        if (!pkg) pkg = game.qhly_foundPackage(name);
        if (pkg.characterIntroduceExtra) {
          var extra = pkg.characterIntroduceExtra(name);
          if (extra) {
            ret.addArray(extra);
          }
        }
        if (lib.qhlyPlugins) {
          for (var plugin of game.qhly_getPlugins('角色介绍附加页')) {
            (function (name, plugin) {
              if (!plugin.characterFilter || plugin.characterFilter(name)) {
                ret.push({
                  name: plugin.name,
                  func: function (name) {
                    return {
                      content: plugin.content(name),
                      handleView: function (view, name) {
                        if (plugin.handleView) {
                          plugin.handleView(view, name);
                        }
                      }
                    };
                  }
                });
              }
            })(name, plugin);
          }
        }
        if (ret.length) {
          return ret;
        }
      };
      game.qhly_getCharacterZhanjiPage = function (name) {
        var str = "";
        var record = lib.config.qhly_winrecord;
        if (record && record[name]) {
          var modekeys = Object.keys(record[name]);
          var modeSort = {
            'identity': 1,
            'guozhan': 2,
            'doudizhu': 3,
          };
          modekeys.sort(function (a, b) {
            if (a == b) return 0;
            if (modeSort[a] && modeSort[b]) {
              return modeSort[a] - modeSort[b];
            }
            if (modeSort[a]) {
              return -1;
            }
            if (modeSort[b]) {
              return 1;
            }
            return a < b ? -1 : 1;
          });
          for (var mode of modekeys) {
            str += "<h1>" + get.translation(mode) + "模式：</h1>";
            var identitySort = {
              '主公': 1,
              '盟主': 2,
              '忠臣': 3,
              '侠士': 4,
              '护卫': 5,
              '反贼': 6,
              '乱寇': 7,
              '刺客': 8,
              '逆贼': 9,
              '内奸': 10,
              '细作': 11,
              '僭主': 12,
              '地主': 13,
              '农民': 14,
            };
            var identKeys = Object.keys(record[name][mode]);
            identKeys.sort(function (a, b) {
              if (a == b) return 0;
              if (identitySort[a] && identitySort[b]) {
                return identitySort[a] - identitySort[b];
              }
              if (identitySort[a]) {
                return -1;
              }
              if (identitySort[b]) {
                return 1;
              }
              return a < b ? -1 : 1;
            });
            for (var identity of identKeys) {
              var ri = record[name][mode][identity];
              var win = ri.win ? ri.win : 0;
              var lose = ri.lose ? ri.lose : 0;
              str += "<h2>" + identity + "：</h2>";
              str += "<p>胜利：" + win;
              str += "&nbsp;&nbsp;失败：" + lose;
              str += "&nbsp;&nbsp;总场：" + (win + lose);
              str += "&nbsp;&nbsp;胜率：" + (((win + lose) <= 0) ? 0 : ((win * 100 / (win + lose)).toFixed(2))) + "%";
              str += "</p>";
              str += "<br>";
            }
          }
        } else {
          return "该武将还未进行过对局。";
        }
        return str;
      };
      get.qhly_getOriginSkinInfo = function (name, pkg) {
        if (!pkg) pkg = game.qhly_foundPackage(name);
        if (pkg.originSkinInfo) {
          return pkg.originSkinInfo(name);
        }
        return "";
      };
      game.qhly_createBelowMenu = function (items, parent) {
        var menu = ui.create.div('.qh-below-menu', parent);
        var content = "";
        if (!_status.qhly_belowMenuId) {
          _status.qhly_belowMenuId = 1;
        } else {
          _status.qhly_belowMenuId++;
        }
        var id = _status.qhly_belowMenuId;
        content += "<table style='width:100%;height:auto;' border='0' frame='void' rules='none'>";
        var bid_i = 0;
        for (var item of items) {
          content += "<tr>";
          content += "<td class='qh-below-menu-item' id='qhly_below_menu_" + id + "_" + bid_i + "'>" + item.name + "</td>";
          content += "</tr>";
          bid_i++;
        }
        content += "</table>";
        menu.innerHTML = content;
        lib.setScroll(menu);
        for (var i = 0; i < bid_i; i++) {
          var td = document.getElementById('qhly_below_menu_' + id + "_" + i);
          if (td) {
            ui.qhly_addListenFunc(td);
            (function (i, td) {
              td.listen(function (e) {
                var item = items[i];
                if (item.onchange) {
                  item.onchange();
                }
                e.stopPropagation();
              });
            })(i, td);
          }
        }
        return menu;
      };


      //-------------------------------------------------------------thunder-----------------------------------------------
      game.qhly_initDecadeView = function (name, view, page, cplayer) {
        var currentViewSkin = lib.qhly_viewskin[lib.config.qhly_currentViewSkin];
        var subView = {};
        if (!page) {
          page = 'introduce';
        }
        view.style['background-image'] = 'url(' + lib.qhly_path + 'theme/decade/background/' + lib.config.qhly_decadeBigBak + '.jpg)';
        ui.create.div('.qh-dcdaiji', view);
        var changeBgBtn = ui.create.div('.qh-dcchangebgbtn', view);
        changeBgBtn.listen(function () {
          var bgIndex = parseInt(lib.config.qhly_decadeBigBak);
          bgIndex++;
          var path = lib.qhly_path + 'theme/decade/background/' + bgIndex + '.jpg';
          if (!game.thunderFileExist(path)) bgIndex = 1;
          lib.config.qhly_decadeBigBak = bgIndex;
          game.saveConfig('qhly_decadeBigBak', bgIndex);
          game.qhly_playQhlyAudio('qhly_voc_click3', null, true);
          view.style['background-image'] = 'url(' + lib.qhly_path + 'theme/decade/background/' + lib.config.qhly_decadeBigBak + '.jpg)';
        })
        var refreshRank = function () { };
        subView.avatar = ui.create.div('.qh-shousha-big-avatar', view);
        if (lib.config.extension_千幻聆音_qhly_lutouType && lib.config.extension_千幻聆音_qhly_lutouType == 'shousha') subView.avatar.classList.add('shousha');
        subView.avatar.id = 'mainView';
        subView.avatar.name = name;
        subView.avatar.hide();
        subView.pageButton = {
          introduce: ui.create.div('.qh-button', view),
          skill: ui.create.div('.qh-button.skillB', view),
          skin: ui.create.div('.qh-button.skinB', view),
          config: ui.create.div('.qh-button.configB', view),
        };
        var setSize = function () {
          for (var i in subView.pageButton) {
            subView.pageButton[i].style.setProperty('--w', document.body.offsetWidth);
          }
        };
        setSize();
        var resize = function () {
          setTimeout(setSize, 600);
        };

        lib.onresize.push(resize);
        if (!lib.config.qhly_shoushaBigFlip) lib.config.qhly_shoushaBigFlip = {};
        if (!lib.config.qhly_shoushaBigFlip[name]) lib.config.qhly_shoushaBigFlip[name] = {};
        subView.menuCover = ui.create.div();
        subView.menuCover.style.width = "100%";
        subView.menuCover.style.height = "100%";
        subView.menuCover.style.zIndex = 38;
        subView.nameTitle = ui.create.div('.qh-nametitle', view);
        subView.nameTitle.innerHTML = get.translation(name);
        subView.avatarImage = ui.create.div('.qh-image-standard', subView.avatar);
        if (game.qhly_getPlayerStatus(cplayer, cplayer && cplayer.name2 && cplayer.name2 == name) == 2) game.qhly_setPlayerStatus(subView.avatarImage, undefined, 2);
        subView.avatarImage.stopDynamic = qhly_stopdynamic;
        subView.avatarImage.classList.add('qh-must-replace');
        subView.avatarImage.classList.add('qh-isBigAvatar');
        subView.avatarImage.setAttribute("data-border-level", game.qhly_getDengJie(name));
        subView.avatarImage.$dynamicWrap = ui.create.div('.qhdynamic-decade-big-wrap', subView.avatarImage);
        var timer = null;
        subView.avatarImage.addEventListener(lib.config.touchscreen ? "touchstart" : "mousedown", function (e) {
          if (!subView.avatarImage.dynamic || subView.avatarImage.dynamic && subView.avatarImage.dynamic.primary == null) {
            if (!subView.avatarImage.classList.contains('decadeBig')) return;
          }
          timer = setTimeout(function () {
            e.preventDefault();
            if (_status.bigEditing) return;
            game.qhly_bigEdit(state);
          }, 800);
        });
        subView.avatarImage.addEventListener(lib.config.touchscreen ? "touchmove" : 'mousemove', function (e) {
          clearTimeout(timer);
        });
        subView.avatarImage.addEventListener(lib.config.touchscreen ? "touchend" : "mouseup", function (e) {
          game.playShoushaAvatar(this, lib.config.qhly_shoushaBigFlip[name][game.qhly_getSkin(name)], name); //十周年还需要补充是否翻转X
          clearTimeout(timer);
        });
        subView.skinBar = ui.create.div('.qh-skinchange-big-skinBar', subView.avatar);
        subView.dynamicToggle = ui.create.div('.qh-skinchange-dynamicChange', subView.skinBar);
        subView.dynamicToggle.style.cssText += 'position:relative;top:-39%;width:' + document.body.offsetWidth * 0.08 + 'px;height:' + document.body.offsetWidth * 0.05 + 'px';
        var skinStr = game.qhly_getSkin(name);
        if (skinStr == null) skinStr = '经典形象';
        else skinStr = skinStr.split('.')[0];
        //skinStr=game.qhly_rename(skinStr);
        if (lib.config.qhly_skinset.djtoggle[name] && lib.config.qhly_skinset.djtoggle[name][skinStr]) subView.dynamicToggle.classList.add('jing');
        subView.dynamicToggle.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
          var skinStr = game.qhly_getSkin(name);
          if (skinStr == null) skinStr = '经典形象';
          else skinStr = skinStr.split('.')[0];
          //skinStr=game.qhly_rename(skinStr);
          var djtoggle = document.getElementById('qhlydecadeBigdjtoggle' + game.qhly_getSkin(name));
          if (this.classList.contains('jing')) {
            this.classList.remove('jing');
            if (djtoggle) {
              game.qhly_changeDynamicSkin(djtoggle.parentNode, skinStr, name);
              djtoggle.classList.remove('jing');
            }
            game.qhly_changeDynamicSkin(state.mainView.avatarImage, skinStr, name);
            if (lib.config.qhly_skinset.djtoggle[name] && lib.config.qhly_skinset.djtoggle[name][skinStr]) delete lib.config.qhly_skinset.djtoggle[name][skinStr];
          }
          else {
            this.classList.add('jing');
            if (djtoggle) {
              if (!djtoggle.parentNode.stopDynamic) djtoggle.parentNode.stopDynamic = qhly_stopdynamic;
              djtoggle.parentNode.stopDynamic();
              djtoggle.classList.add('jing');
            }
            if (state.mainView.avatarImage.stopDynamic) state.mainView.avatarImage.stopDynamic();
            if (!lib.config.qhly_skinset.djtoggle[name]) lib.config.qhly_skinset.djtoggle[name] = {};
            lib.config.qhly_skinset.djtoggle[name][skinStr] = true;
          }
          game.qhlySyncConfig();
          if (!_status['qhly_primarySkin_' + name] || _status['qhly_primarySkin_' + name] && _status['qhly_primarySkin_' + name] == game.qhly_getSkin(name)) game.qhly_changeDynamicSkin(name);
        });
        //subView.avatarImage.classList.add('avatar');
        subView.avatarBorder = ui.create.div('.qh-avatarother', subView.avatar);
        subView.rank = ui.create.div('.qh-avatarrarity', subView.avatar);
        subView.rank.style['background-image'] = 'url(' + lib.qhly_path + 'theme/decade/rarity_' + game.getRarity(name) + '.png)';
        //subView.group = ui.create.div('.qh-avatar-label-group', subView.avatarLabel);
        //subView.rank = ui.create.div('.qh-avatar-label-rank', subView.avatarLabel);
        subView.name = ui.create.div('.qh-avatar-label-name', subView.avatarLabel);
        subView.characterTitle = ui.create.div('.qh-avatar-label-title', subView.avatar);
        subView.hp = ui.create.div('.qh-hp', view);
        subView.hpText = ui.create.div('.qh-hptext', subView.hp);
        subView.hp.hide();
        subView.mp = ui.create.div('.qh-mp');
        subView.mpText = ui.create.div('.qh-mptext', subView.mp);
        subView.mp.hide();
        subView.pageButton.introduce.innerHTML = "简介";
        subView.pageButton.skill.innerHTML = "技能";
        subView.pageButton.skin.innerHTML = "皮肤";
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
        subView.backButton.listen(function () {
          lib.config.swipe_up = swipe_up;
          lib.config.swipe_down = swipe_down;
          lib.config.swipe_left = swipe_left;
          lib.config.swipe_right = swipe_right;
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
          if (subView.page.skin.viewState && subView.page.skin.viewState.skinViews) {
            for (var i = 0; i < subView.page.skin.viewState.skinViews.length; i++) {
              if (subView.page.skin.viewState.skinViews[i].dynamic && subView.page.skin.viewState.skinViews[i].dynamic.renderer.postMessage) {
                subView.page.skin.viewState.skinViews[i].dynamic.renderer.postMessage({
                  message: "DESTROY",
                  id: subView.page.skin.viewState.skinViews[i].dynamic.id,
                })
                subView.page.skin.viewState.skinViews[i].dynamic.renderer.capacity--;
              }
            }
          }
          if (_status['qhly_primarySkin_' + name] !== undefined) game.qhly_setCurrentSkin(name, _status['qhly_primarySkin_' + name]);
          delete _status['qhly_primarySkin_' + name];
        });
        subView.page = {
          introduce: {
            pageView: ui.create.div('.qh-page-introduce', view),
            refresh: function (name, state) {
              subView.hp.hide();
              subView.mp.hide();
              subView.avatar.show();
              game.qhly_changeViewPageSkin('introduce', this.pageView);
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
              //game.qhly_syncChangeSkinButton(name, game.qhly_getSkin(name), state);
            },
            init: function (name, state) {
              this.text = ui.create.div('.qh-page-introduce-text', this.pageView);
              if (lib.config.qhly_vMiddle === false && (currentViewSkin.isQiLayout || currentViewSkin.isLolBigLayout)) {
                this.text.style.height = "100%";
                this.text.style.maxHeight = "none";
              }
              lib.setScroll(this.text);
              ui.qhly_fixTextSize(this.text);
              this.inited = true;
            }
          },
          skill: {
            pageView: ui.create.div('.qh-page-skill', view),
            refresh: function (name, state) {
              subView.hp.show();
              if (subView.mp.getAttribute('data-visiable') == 'true') subView.mp.show();
              subView.avatar.show();
              if (_status['qhly_primarySkin_' + name] !== undefined) {
                game.qhly_setCurrentSkin(name, _status['qhly_primarySkin_' + name]);
              }
              if (!this.inited) this.init(name, state);
              //game.qhly_syncChangeSkinButton(name, game.qhly_getSkin(name), state);
            },
            init: function (name, state) {
              this.text = ui.create.div('.qh-page-skill-text', this.pageView);
              var spacialList = ['standard', 'refresh', 'old', 'yijiang'];
              for (var i of spacialList) {
                if (lib.characterPack && lib.characterPack[i] && lib.characterPack[i][name]) {
                  this.text.setAttribute('data-spacial', true);
                }
              }
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
              if (cplayer && lib.config.qhly_skillingame) {
                var skills = cplayer.getSkills(false, false);
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
              for (var skill of viewSkill) {
                if (!lib.translate[skill + "_info"]) continue;
                var detail = get.translation(skill + "_info");
                if (detail) {
                  var skillInfoHead = ui.create.div('.qh-skillinfohead', this.text);
                  skillInfoHead.innerHTML = get.translation(skill);
                  skillInfoHead.innerHTML += "<img style='float:right;width:18%;max-width:48px' id='qhly_skillv_" + skill + "'/>";
                  var skillInfoBody = ui.create.div('.qh-skillinfobody', this.text);
                  var dynamicTranslate = null;
                  var content = '';
                  if (cplayer && lib.config.qhly_skillingame) {
                    var dtrans = lib.dynamicTranslate[skill];
                    if (dtrans) {
                      dtrans = dtrans(cplayer, skill);
                    }
                    if (dtrans && lib.qhly_filterPlainText(dtrans) != lib.qhly_filterPlainText(detail)) {
                      dynamicTranslate = dtrans;
                      content += "<span style=opacity:0.4>";
                    } else {
                      if (dtrans && dtrans.length) {
                        detail = dtrans;
                      }
                    }
                    // if (!cplayer.hasSkill(skill)) {
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
                  ui.create.div('.qh-skillinfotail', this.text);
                }
              }
              var bindFunc = function (checkbox, text) {
                if (!text) return;
                ui.qhly_addListenFunc(text);
                text.listen(function () {
                  game.qhly_playQhlyAudio('qhly_voc_check', null, true);
                  checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
                });
              };
              for (let skill of viewSkill) {
                var detail = get.translation(skill + "_info");
                if (detail) {
                  (function (skill) {
                    var img = document.getElementById('qhly_skillv_' + skill);
                    if (img) {
                      img.src = lib.assetURL + get.qhly_getCurrentViewSkinValue('skillPagePlayAudioButtonImage', 'extension/千幻聆音/image/newui_playaudio.png');
                      ui.qhly_addListenFunc(img);
                      img.listen(function () {
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
                            subView.avatarImage.setBackground(name, 'character');
                          } else if (Array.isArray(skillSkin)) {
                            subView.avatarImage.setBackgroundImage(skillSkin[count % skillSkin.length]);
                          } else {
                            subView.avatarImage.setBackgroundImage(skillSkin);
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
            skinListGot: false,
            firstRefresh: true,
            hideSkinMode: false,
            // getCurrentSkin: function (name) {
            //     var skinId = game.qhly_getSkin(name);
            //     for (var skin of this.skinList) {
            //         if (skin && skin.skinId == skinId) {
            //             return skin;
            //         }
            //         if (!skinId && !skin.skinId) {
            //             return skin;
            //         }
            //     }
            //     return null;
            // },
            onClickSkin: function (num, name, state, father) {
              var skin = this.skinList[num];
              // if (!skin) {
              //     return;
              // }
              if (game.qhly_skinLock(name, skin.skinId)) {
                var lock = game.qhly_skinLock(name, skin.skinId);
                if (lock.tryUnlock) {
                  lock.tryUnlock();
                }
                if (game.qhly_skinLock(name, skin.skinId)) {
                  return;
                }
              }
              for (var i = 0; i < this.viewState.skinViews.length; i++) {
                this.viewState.skinViews[i].defaultskin.setAttribute('data-sel', false);
              }
              if (father) father.setAttribute('data-sel', true);
              game.qhly_playQhlyAudio('qhly_voc_dec_fanshu', null, true);
              var originSkin = skin.skinId;
              game.qhly_setCurrentSkin(name, originSkin, function () {
                _status.qhly_skillAudioWhich = {};
                this.refresh(name, state);
                if (state.onChangeSkin) {
                  state.onChangeSkin();
                }
                game.qhly_changeDynamicSkin(name);
                game.qhly_syncChangeSkinButton(name, originSkin, state);
                var rarity = document.getElementsByClassName('qh-avatarrarity');
                if (rarity) {
                  rarity[0].classList.remove('stand');
                  rarity[0].classList.remove('landscape');
                }
                if (originSkin) {
                  var str = originSkin.substring(0, originSkin.length - 4);
                  if (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name][str]) {
                    game.qhly_changeDynamicSkin(subView.avatarImage, str, name);
                    if (subView.avatarImage.dynamic && subView.avatarImage.dynamic.primary) _status.currentTexiao = subView.avatarImage.dynamic.primary.name;
                  }
                  else if (subView.avatarImage.stopDynamic) subView.avatarImage.stopDynamic();
                } else if (originSkin == null && window.decadeUI && decadeUI.dynamicSkin[name]) {
                  var dyList = Object.keys(decadeUI.dynamicSkin[name]);
                  if (dyList && dyList.contains('经典形象') && (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name]['经典形象']))
                    game.qhly_changeDynamicSkin(subView.avatarImage, '经典形象', name);
                  else if (subView.avatarImage.stopDynamic) subView.avatarImage.stopDynamic();
                }
                if (state.mainView.avatarImage.dynamic && state.mainView.avatarImage.dynamic.primary != null) state.mainView.dynamicToggle.setAttribute('toggle', true);
                else state.mainView.dynamicToggle.setAttribute('toggle', false);
                game.qhly_playQhlyAudio('qhly_voc_dec_fanshu', null, true);
                _status['qhly_primarySkin_' + name] = game.qhly_getSkin(name);
                if (state.pkg.isLutou || lib.config.qhly_lutou) {
                  subView.avatarImage.classList.remove('qh-image-standard');
                  subView.avatarImage.classList.add('qh-image-lutou');
                } else {
                  subView.avatarImage.classList.remove('qh-image-lutou');
                  subView.avatarImage.classList.add('qh-image-standard');
                }
                subView.avatar.classList.remove('noBorder');
                state.mainView.avatarImage.classList.remove('decadeBig');
                subView.avatarBorder.classList.remove('noBorder');
                game.qhly_setOriginSkin(name, originSkin, state.mainView.avatarImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage, null, state.name) == 2);
              }.bind(this), true);
            },
            refresh: function (name, state) {
              subView.hp.hide();
              subView.mp.hide();
              subView.avatar.hide();
              game.qhly_checkPlayerImageAudio(name, game.qhly_getSkin(name), cplayer);
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
              var that = this;
              const path = state.pkg.skin.standard;
              this.viewState.skinTotalWidth = ((this.viewState.skinPerWidth + this.viewState.skinGap) * this.skinList.length - this.viewState.skinGap) * this.viewState.scale;
              var playBigDynamic = lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'always' ? false : true;
              if (this.dynamicSkinMore && lib.config['extension_千幻聆音_qhly_decadeDynamic'] == 'three') playBigDynamic = false;
              if (this.firstRefresh) {
                this.firstRefresh = false;
                for (var k = 0; k < this.skinList.length; k++) {
                  this.viewState.viewCurrentIndex = k;
                  if (game.qhly_skinIs(name, this.skinList[k].skinId)) break;
                }
                for (var i = 0; i < this.skinList.length; i++) {
                  var skin = this.skinList[i].skinId;
                  var skinView = ui.create.div('.qh-skinchange-decade-big-skin', content);
                  if (game.qhly_getPlayerStatus(cplayer, cplayer && cplayer.name2 && cplayer.name2 == name) == 2) game.qhly_setPlayerStatus(skinView, undefined, 2);
                  skinView.avatar = ui.create.div('.primary-avatar', skinView);
                  skinView.avatar.id = 'qh-skillskin-' + i;
                  skinView.belowText = ui.create.div('.qh-skinchange-decade-big-skin-text', skinView);
                  this.viewState.skinViews.push(skinView);
                  skinView.avatar.classList.add('qh-not-replace');
                  //skinView.node = { avatar: skinView.avatar, name1: name }
                  skinView.defaultskin = ui.create.div('.qh-skinchange-skin-big-default', skinView);
                  skinView.defaultskin.id = 'qhly_bigSkin' + i;
                  skinView.defaultskin.listen(function () {
                    if (this.getAttribute('data-sel') === 'true') return;
                    that.onClickSkin(parseInt(this.id.slice(12)), name, state, this);
                  });
                  skinView.$dynamicWrap = ui.create.div('.qhdynamic-big-wrap', skinView);
                  skinView.toImageBtn = ui.create.div('.qh-domtoimage', skinView);
                  skinView.toImageBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    game.qhly_dom2image(cplayer, name, this, path, state);
                  });//3
                  skinView.dynamicToggle = ui.create.div('.qh-skinchange-big-dynamicChange', skinView);
                  skinView.dynamicToggle.id = 'qhlydecadeBigdjtoggle' + skin;
                  if (this.skinList[i].bothSkin) skinView.dynamicToggle.setAttribute('toggle', true);
                  if (this.skinList[i].single && lib.config['extension_千幻聆音_qhly_dom2image']) skinView.toImageBtn.setAttribute('single', true);//6
                  if (skin && lib.config.qhly_skinset.djtoggle[name]) {
                    if (lib.config.qhly_skinset.djtoggle[name][skin.substring(0, skin.lastIndexOf('.'))]) skinView.dynamicToggle.classList.add('jing');
                  }
                  skinView.dynamicToggle.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                    var skinStr = this.parentNode.belowText.innerText.substring(0, this.parentNode.belowText.innerText.lastIndexOf('*'));
                    if (this.classList.contains('jing')) {
                      this.classList.remove('jing');
                      subView.dynamicToggle.classList.remove('jing');
                      if (playBigDynamic) game.qhly_changeDynamicSkin(this.parentNode, skinStr, name);
                      if (this.parentNode.avatar.id == 'qh-skillskin-0' && that.skinList[0].bothSkin || _status['qhly_primarySkin_' + name] && _status['qhly_primarySkin_' + name].substring(0, _status['qhly_primarySkin_' + name].length - 4) == skinStr) game.qhly_changeDynamicSkin(state.mainView.avatarImage, skinStr, name);
                      if (lib.config.qhly_skinset.djtoggle[name] && lib.config.qhly_skinset.djtoggle[name][skinStr]) delete lib.config.qhly_skinset.djtoggle[name][skinStr];
                    }
                    else {
                      this.classList.add('jing');
                      subView.dynamicToggle.classList.add('jing');
                      if (this.parentNode.stopDynamic) this.parentNode.stopDynamic();
                      if (this.parentNode.avatar.id == 'qh-skillskin-0' && that.skinList[0].bothSkin || _status['qhly_primarySkin_' + name] && _status['qhly_primarySkin_' + name].substring(0, _status['qhly_primarySkin_' + name].length - 4) == skinStr) state.mainView.avatarImage.stopDynamic();
                      if (!lib.config.qhly_skinset.djtoggle[name]) lib.config.qhly_skinset.djtoggle[name] = {};
                      lib.config.qhly_skinset.djtoggle[name][skinStr] = true;
                    }
                    game.qhlySyncConfig();
                    if (_status['qhly_primarySkin_' + name] && _status['qhly_primarySkin_' + name] == game.qhly_getSkin(name)) {
                      game.qhly_changeDynamicSkin(name);
                    }
                  });
                  if (skin) {
                    var info = game.qhly_getSkinInfo(name, skin);
                    if (info) {
                      skinView.belowText.innerText = info.translation + '*' + get.rawName2(name);
                    }
                    if ((!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name][skin.substring(0, skin.lastIndexOf('.'))]) && window.decadeUI && decadeUI.dynamicSkin && decadeUI.dynamicSkin[name] && Object.keys(decadeUI.dynamicSkin[name]).contains(info.translation)) {
                      if (playBigDynamic) game.qhly_changeDynamicSkin(skinView, info.translation, name);
                    }
                  } else {
                    skinView.belowText.innerText = "经典形象*" + get.rawName2(name);
                    if (this.skinList[0].skinId == null && this.skinList[0].bothSkin && playBigDynamic) game.qhly_changeDynamicSkin(skinView, '经典形象', name);
                  }
                  //skinView.belowText.innerText=game.qhly_rename(skinView.belowText.innerText);
                  var skinQua = ui.create.div('.qh-page-skinavatarlevel', skinView);
                  var level = this.skinList[i].skinInfo.level;
                  var style = this.skinList[i].skinInfo.levelStyle;
                  if (style) {
                    if (!skinQua.qh_savedStyle) {
                      skinQua.qh_savedStyle = {};
                      for (var m in skinQua.style) {
                        skinQua.qh_savedStyle[m] = skinQua.style[m];
                      }
                    }
                    for (var s in style) {
                      skinQua.style[s] = style[s];
                    }
                    var es = ['left', 'bottom', 'top', 'right'];
                    for (var m of es) {
                      if (!style[m]) {
                        skinQua.style[m] = "";
                      }
                    }
                  } else {
                    if (skinQua.qh_savedStyle) {
                      for (var m in skinQua.qh_savedStyle) {
                        skinQua.style[m] = skinQua.qh_savedStyle[m];
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
                      '原画': 'yuanhua',
                      '普通': 'putong',
                      '稀有': 'xiyou',
                      '精良': 'xiyou',
                      '史诗': 'shishi',
                      '传说': 'chuanshuo',
                      '动态': 'dongtai',
                      '限定': 'xianding',
                      '绝版': 'jueban',
                    };
                    var img = null;
                    if (map[level]) {
                      img = "extension/千幻聆音/theme/decade/dc_" + map[level] + ".png";
                    } else if (level.indexOf("#") == 0) {
                      var l2 = level.replace("#", "");
                      img = "extension/千幻聆音/image/" + l2 + ".png";
                    } else if (level.indexOf("$") == 0) {
                      var l2 = level.replace("$", "");
                      img = l2;
                    }
                    if (img) {
                      skinQua.show();
                      skinQua.setBackgroundImage(img);
                    } /* else {
                                            skinQua.hide();
                                        } */
                  } /* else {
                                        skinQua.hide();
                                    } */
                  //skinQua.style.cssText = 'width:40%;height:16%;right:-2%;top:4%;background-size:100% 100%;background-repeat:no-repeat;z-index:88;point-events:none';
                  //skinQua.style['background-image'] = 'url(' + lib.qhly_path+'theme/decade/dc_' + game.qhly_getSkinLevel(name, skin, true) + '.png)';
                  skinQua.id = 'qhly_skinQua' + i;

                  if (game.qhly_skinIs(name, skin)) {
                    skinView.defaultskin.setAttribute('data-sel', true);
                    if (this.skinList[i].bothSkin) state.mainView.dynamicToggle.setAttribute('toggle', true);
                    else state.mainView.dynamicToggle.setAttribute('toggle', false);
                  } else {
                    skinView.defaultskin.setAttribute('data-sel', false);
                  }
                  this.viewState.offset = Math.round((98 - (this.viewState.skinPerWidth + this.viewState.skinGap) * this.viewState.viewCurrentIndex) * this.viewState.scale);
                  skinView.style.left = Math.round((this.viewState.skinPerWidth + this.viewState.skinGap) * i * this.viewState.scale) + "px";
                  skinView.style.width = Math.round(this.viewState.skinPerWidth * this.viewState.scale) + "px";
                  skinView.style.height = Math.round(396 * this.viewState.scale) + "px";
                  skinView.style.transform = 'scale(' + Math.max(0.3, 1 - 0.4 * Math.abs(i + (this.viewState.offset - 98 * this.viewState.scale) / ((this.viewState.skinPerWidth + this.viewState.skinGap) * this.viewState.scale))) + ')';
                  skinView.style.zIndex = Math.round(Math.max(10, 15 - Math.abs(this.viewState.viewCurrentIndex - i)));
                  skinView.style.opacity = Math.round(Math.min(1, 1.7 - Math.abs(i + (this.viewState.offset - 98 * this.viewState.scale) / ((this.viewState.skinPerWidth + this.viewState.skinGap) * this.viewState.scale))));
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
                    this.skinList[i].isLocked = true;
                    skinView.style.filter = "grayscale(100%)";
                  } else {
                    skinView.style.filter = "grayscale(0%)";
                  }
                }
                this.viewState.refresh();
                if (lib.config.touchscreen) {
                  content.addEventListener('touchstart', function (event) {
                    if (event.touches && event.touches.length) {
                      that.viewState.handleMouseDown(event.touches[0].clientX, event.touches[0].clientY);
                    }
                  });
                  content.addEventListener('touchend', function (event) {
                    that.viewState.handleMouseUp();
                  });
                  content.addEventListener('touchcancel', function (event) {
                    that.viewState.handleMouseUp();
                  });
                  content.addEventListener('touchmove', function (event) {
                    if (event.touches && event.touches.length)
                      that.viewState.handleMouseMove(event.touches[0].clientX, event.touches[0].clientY);
                  });
                } else {
                  content.addEventListener('mousewheel', function (event) {
                    that.viewState.handleMouseDown(event.clientX, event.clientY);
                    if (event.wheelDelta > 0) {
                      that.viewState.handleMouseMove(event.clientX - 30, event.clientY);
                      that.viewState.handleMouseUp(event.clientX - 30, event.clientY);
                    } else {
                      that.viewState.handleMouseMove(event.clientX + 30, event.clientY);
                      that.viewState.handleMouseUp(event.clientX + 30, event.clientY);
                    }
                  });
                  content.addEventListener('mousedown', function (event) {
                    that.viewState.handleMouseDown(event.clientX, event.clientY);
                  });
                  content.addEventListener('mouseup', function (event) {
                    that.viewState.handleMouseUp(event.clientX, event.clientY);
                  });
                  content.addEventListener('mouseleave', function (event) {
                    that.viewState.handleMouseUp(event.clientX, event.clientY);
                  });
                  content.addEventListener('mousemove', function (event) {
                    that.viewState.handleMouseMove(event.clientX, event.clientY);
                  });
                }
              }
              this.viewState.skinAudioList.innerHTML = '';
              var addButton = [];
              var currentSkin = this.skinList[this.viewState.viewCurrentIndex];
              if (!currentSkin) {
                return;
              }
              if (!currentSkin.isLocked) {
                var extInfo = "";
                if (currentSkin.skinInfo.info) {
                  extInfo = currentSkin.skinInfo.info;
                } else {
                  if (state.pkg && state.pkg.originSkinInfo) {
                    var i = state.pkg.originSkinInfo(name);
                    if (i) {
                      extInfo = i;
                    }
                  }
                }
                this.viewState.skinInfoText.innerHTML = extInfo;
                var Vicpath = `${state.pkg.audio}${game.qhly_getRealName(name)}/`;
                if (game.qhly_getSkin(name)) Vicpath += `${game.qhly_earse_ext(game.qhly_getSkin(name))}/`;
                for (var audio of currentSkin.audios) {
                  var cskill;
                  if (audio.name) {
                    cskill = audio.name;
                  } else {
                    cskill = get.translation(audio.id);
                  }
                  if (audio.id == 'victory' && !game.thunderFileExist(lib.assetURL + Vicpath + 'victory.mp3')) continue;
                  var skillAudioInfo = ui.create.div('.qh-skinchange-decade-big-skillaudioinfo', this.viewState.skinAudioList);
                  skillAudioInfo.innerHTML = cskill;
                  var huawen = ui.create.div('.qh-skinchange-decade-big-huawen', skillAudioInfo);
                  if (lib.config.qhly_editmode && !game.qhly_isForbidEditTaici(name)) {
                    huawen.id = "qhly_skin_skill_edit_" + audio.id;
                  }
                  var skillaudioBar = document.createElement('img');
                  skillaudioBar.src = lib.qhly_path + 'theme/decade/skillvoice2.png';
                  skillaudioBar.classList.add('qh-skinchange-decade-big-skillaudiobar');
                  skillaudioBar.id = 'qhly_skin_skill_' + audio.id;
                  skillAudioInfo.appendChild(skillaudioBar);
                  var skillTaici = ui.create.div('.qh-skinchange-decade-big-skilltaici', this.viewState.skinAudioList);
                  var objx = this.packObject(name, state);
                  var initValuex = "";
                  var realSkill = audio.id;
                  if (lib.qhly_skinShare[name] && lib.qhly_skinShare[name].skills && lib.qhly_skinShare[name].skills[audio.id]) realSkill = lib.qhly_skinShare[name].skills[audio.id];
                  if (currentSkin.skinId) {
                    var skinInfox = objx.skin[game.qhly_earseExt(currentSkin.skinId)];
                    if (skinInfox && skinInfox.skill) {
                      if (skinInfox.skill[realSkill] && skinInfox.skill[realSkill].content) {
                        if (skinInfox.skill[realSkill].content2) {
                          initValuex = skinInfox.skill[realSkill]['content' + game.qhly_getPlayerStatus(cplayer, (cplayer && cplayer.name2 && cplayer.name2 == state.name), state.name)];
                        }
                        else initValuex = skinInfox.skill[realSkill].content;
                      }
                    }
                  } else {
                    var sskillx = objx.origin.skill;
                    if (sskillx[realSkill] && sskillx[realSkill].content) {
                      initValuex = sskillx[realSkill].content;
                    }
                  }
                  if (initValuex) {
                    skillTaici.innerHTML = initValuex;
                  }
                  addButton.push(audio.id);
                }
                var skinConfig = ui.create.div('.qh-skinchange-decade-big-skinconfig', this.viewState.skinAudioList);
                var skinConfigContent = '';
                if (lib.config.qhly_skinconfig) {
                  skinConfigContent += "<h2>皮肤配置</h2>";
                  skinConfigContent += "<p><span style='display:inline-block;height:30px;'><span id='qhconfig_checkbox_banInRandom_text' style='display:inline-block;position:relative;bottom:25%;'>随机切换禁用&nbsp;&nbsp;</span><img id='qhconfig_checkbox_banInRandom'/></span></p>";
                  if (currentSkin.skinId) {
                    skinConfigContent += "<p><span style='display:inline-block;height:30px;'><span id='qhconfig_checkbox_changeSex_text' style='display:inline-block;position:relative;bottom:25%;'>性转皮肤&nbsp;&nbsp;</span><img id='qhconfig_checkbox_changeSex'/></span></p>";
                    skinConfigContent += "<p><span style='display:inline-block;height:30px;'><span id='qhconfig_checkbox_dwflip_text' style='display:inline-block;position:relative;bottom:25%;'>出框翻转&nbsp;&nbsp;</span><img id='qhconfig_checkbox_dwflip'/></span></p>";
                    skinConfigContent += "<p><span>皮肤品质&nbsp;&nbsp;</span><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_level_select'></select></p>";
                    skinConfigContent += "<p><span>皮肤顺序&nbsp;&nbsp;</span><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_order_select'></select></p>";
                  }
                  skinConfigContent += "<br><br>";
                }
                skinConfig.innerHTML = skinConfigContent;
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
                        target = event.target;
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
                        var skinQua = document.getElementById('qhly_skinQua' + that.viewState.viewCurrentIndex);
                        if (skinQua) skinQua.style['background-image'] = 'url(' + lib.qhly_path + 'theme/decade/dc_' + game.qhly_getSkinLevel(name, currentSkin.skinId, true) + '.png)';
                      }
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
                        target = event.target;
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
                  if (currentSkin.skinId) {
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
                }
                for (var vid of addButton) {
                  var img = document.getElementById('qhly_skin_skill_' + vid);
                  if (img) {
                    ui.qhly_addListenFunc(img);
                    var that = this;
                    (function (id) {
                      img.listen(function () {
                        that.consumeTextClick = true;
                        if (id == 'die') window.qhly_playDieAudio(name);
                        else if (id == 'victory') window.qhly_playVictoryAudio(name);
                        else {
                          var count = _status.qhly_skillAudioWhich[id];
                          if (!count) {
                            _status.qhly_skillAudioWhich[id] = 0;
                            count = 0;
                          }
                          _status.qhly_skillAudioWhich[id]++;
                          window.qhly_TrySkillAudio(id, { name: name }, null, count);
                          var skillSkin = game.qhly_getSkillSkin(name, game.qhly_getSkin(name), id);
                          if (skillSkin) {
                            var currentAvatar = document.getElementById('qh-skillskin-' + that.viewState.viewCurrentIndex);
                            if (currentAvatar) {
                              if (skillSkin === 1) {
                                currentAvatar.setBackground(name, 'character');
                              } else if (Array.isArray(skillSkin)) {
                                currentAvatar.setBackgroundImage(skillSkin[count % skillSkin.length]);
                              } else {
                                currentAvatar.setBackgroundImage(skillSkin);
                              }
                            }
                          }
                        }
                      });
                    })(vid);
                  }
                  if (lib.config.qhly_editmode && !game.qhly_isForbidEditTaici(name)) {
                    var imgEdit = document.getElementById('qhly_skin_skill_edit_' + vid);
                    if (imgEdit) {
                      ui.qhly_addListenFunc(imgEdit);
                      (function (id) {
                        imgEdit.listen(function () {
                          that.editOpen(name, currentSkin.skinId, id, state);
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
              let dynamicSkinList = [];
              if (window.decadeUI) {
                if (decadeUI.dynamicSkin[name]) dynamicSkinList = Object.keys(decadeUI.dynamicSkin[name]);
                for (var i of this.skinList) {
                  if (i.skinId) {
                    var skin = i.skinId.substring(0, i.skinId.lastIndexOf('.'));
                    if (dynamicSkinList.contains(skin)) i.bothSkin = true;
                  }
                }
                if (dynamicSkinList.length) {
                  let duibiList = [];
                  for (let i of this.skinList) {
                    if (i.skinId && i.skinId != null) duibiList.push(i.skinId.substring(0, i.skinId.lastIndexOf('.')));
                  }
                  for (let i of dynamicSkinList) {
                    if (i == '经典形象') this.skinList['0'].bothSkin = true;
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
              this.text = ui.create.div('.qh-page-skin-text', this.pageView);
              lib.setScroll(this.text);
              ui.qhly_fixTextSize(this.text);
              var dialog = ui.create.div('.qh-skinchange-decade-big-dialog', this.pageView);
              if (lib.config.extension_千幻聆音_qhly_lutouType && lib.config.extension_千幻聆音_qhly_lutouType == 'shousha') dialog.classList.add('shousha');
              var cover = ui.create.div('.qh-skinchange-decade-big-cover', dialog);
              var content = ui.create.div('.qh-skinchange-decade-big-area', cover);
              var skinTitle = ui.create.div('.qh-skinchange-decade-big-title', this.text);
              var skinInfoText = ui.create.div('.qh-skinchange-decade-big-skininfo', this.text);
              var skinAudioList = ui.create.div('.qh-skinchange-decade-big-skinaudiolist', this.text);
              if (lib.config.qhly_lutou) dialog.setAttribute('data-outcrop-skin', 'on');
              if (!_status['qhly_primarySkin_' + name]) _status['qhly_primarySkin_' + name] = game.qhly_getSkin(name);
              var autoskin = ui.create.div('.qh-skinchange-decade-big-autoskin', dialog);
              ui.create.div('.qh-skinchange-decade-big-autoskinborder', autoskin);
              ui.create.div('.qh-skinchange-decade-big-autoskinitem', autoskin);
              if (lib.config.qhly_autoChangeSkin == 'close' || !lib.config.qhly_autoChangeSkin) autoskin.setAttribute('data-auto', false);
              else autoskin.setAttribute('data-auto', true);
              autoskin.listen(function () {
                var open = false, item = 'close';
                if (lib.config.qhly_autoChangeSkin == 'close' || !lib.config.qhly_autoChangeSkin) {
                  open = true;
                  item = lib.config['extension_千幻聆音_qhly_decadeAuto'];
                }
                game.saveConfig('extension_千幻聆音_qhly_autoChangeSkin', item);
                game.saveConfig('qhly_autoChangeSkin', item);
                if (open) {
                  autoskin.setAttribute('data-auto', true);
                  game.qhly_autoChangeSkin();
                } else {
                  autoskin.setAttribute('data-auto', false);
                  if (_status.qhly_changeSkinFunc) {
                    clearTimeout(_status.qhly_changeSkinFunc);
                  }
                }
              })
              var that = this;
              this.viewState = {
                offset: 98,
                viewCurrentIndex: 0,
                skinPerWidth: 274,
                skinGap: -170,
                skins: [],
                skinViews: [],
                skinTitle: skinTitle,
                skinInfoText: skinInfoText,
                skinAudioList: skinAudioList,
                visibleWidth: function () {
                  var rect = cover.getBoundingClientRect();
                  return rect.width;
                },
                scale: document.body.offsetWidth / 1208,
                cover: cover,
                content: content,
                refresh: function () {
                  content.style.width = Math.round(this.skinTotalWidth) + 'px';
                  content.style.left = Math.round(this.offset) + "px";
                  var cskin = this.skins[this.viewCurrentIndex];
                  if (cskin) {
                    var tname = cskin.skinId;
                    if (!tname) {
                      tname = '经典形象';
                    } else if (cskin.skinInfo.translation) {
                      tname = cskin.skinInfo.translation;
                    } else {
                      tname = get.translation(cskin.skinId);
                    }
                    if (tname.indexOf('.') != -1) tname = tname.substring(0, tname.lastIndexOf('.'));
                  } else var tname = '经典形象';
                  //tname=game.qhly_rename(tname);
                  this.skinTitle.innerHTML = tname;
                  // if (that.currentIndex != this.viewCurrentIndex) {
                  //     that.currentIndex = this.viewCurrentIndex;
                  //     that.refresh(name, state);
                  // };
                  //if (!tname) game.qhly_setCurrentSkin(name, null);
                  if (cskin) game.qhly_setCurrentSkin(name, cskin.skinId, function () {
                    that.refreshAfterGot(name, state);
                  });
                },
                handleMouseDown: function (x, y) {
                  if (this.skins.length == 1) {
                    return;
                  }
                  if (!this.offset) this.offset = 98;
                  this.mouseDownX = x;
                  this.mouseDownY = y;
                  this.isTouching = true;
                  this.cancelClick = false;
                  this.tempoffset = this.offset;
                },
                handleMouseMove: function (x, y) {
                  if (!this.isTouching) return;
                  var slideX = x - this.mouseDownX;
                  this.tempoffset = this.offset + slideX;
                  if (this.tempoffset > ((this.skinPerWidth + this.skinGap) * 0.5 + 46) * this.scale) {
                    this.tempoffset = ((this.skinPerWidth + this.skinGap) * 0.5 + 46) * this.scale;
                  } else if ((this.skinTotalWidth - 372 * this.scale) < -this.tempoffset) {
                    this.tempoffset = -(this.skinTotalWidth - 372 * this.scale);
                  }
                  this.content.style.left = Math.round(this.tempoffset) + "px";
                  var current = (this.tempoffset - 98 * this.scale) / ((this.skinPerWidth + this.skinGap) * this.scale);
                  this.viewCurrentIndex = -Math.round(current);
                  for (var i = 0; i < this.skinViews.length; i++) {
                    var zin = Math.max(10, 15 - Math.abs(i + Math.round(current)));
                    this.skinViews[i].style.transform = 'scale(' + Math.max(0.3, 1 - 0.4 * Math.abs(i + current)) + ')';
                    this.skinViews[i].style.zIndex = zin;
                    this.skinViews[i].style.opacity = Math.round(Math.min(1, 1.7 - Math.abs(i + current)));
                  }
                  return true;
                },
                handleMouseUp: function (x, y) {
                  if (this.isTouching) {
                    this.isTouching = false;
                    this.tempoffset = (98 - this.viewCurrentIndex * (this.skinPerWidth + this.skinGap)) * this.scale;
                    var current = (this.tempoffset - 98 * this.scale) / ((this.skinPerWidth + this.skinGap) * this.scale);
                    for (var i = 0; i < this.skinViews.length; i++) {
                      var zin = Math.max(10, 15 - Math.abs(i + Math.round(current)));
                      this.skinViews[i].style.transform = 'scale(' + Math.max(0.3, 1 - 0.4 * Math.abs(i + current)) + ')';
                      this.skinViews[i].style.zIndex = zin;
                      this.skinViews[i].style.opacity = Math.round(Math.min(1, 1.7 - Math.abs(i + current)));
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
            pageView: ui.create.div('.qh-page-config', view),
            refresh: function (name, state) {
              subView.hp.hide();
              subView.mp.hide();
              subView.avatar.show();
              if (!this.inited) this.init(name, state);
              //game.qhly_syncChangeSkinButton(name, game.qhly_getSkin(name), state);
            },
            init: function (name, state) {
              this.innerConfig = ui.create.div('.qh-page-config-text', this.pageView);
              ui.qhly_fixTextSize(this.innerConfig);
              var that = this;
              var content = "";
              content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('favouriteImage', 'extension/千幻聆音/image/newui_fav.png') + "' style='width:50px;margin-bottom:-4px;'/>收藏设置</h2>";
              content += "<p>可以选择收藏此武将。进行自由选将操作时，可以更快找到此武将。</p>";
              content += "<p><span style='display:inline-block;height:30px;'><img id='qhconfig_checkbox_fav'/><span id='qhconfig_checkbox_text_fav' style='display:inline-block;position:relative;bottom:25%;'>收藏" + get.translation(name) + "</span></span></p>";

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
              var bindFunc = function (checkbox, text) {
                if (!text) return;
                ui.qhly_addListenFunc(text);
                text.listen(function () {
                  game.qhly_playQhlyAudio('qhly_voc_check', null, true);
                  checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
                });
              };
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
              var rankList = ['默认', '普通', '精品', '稀有', '史诗', '传说'];
              var rankToEng = {
                '默认': "default",
                '普通': 'junk',
                '史诗': "epic",
                '传说': "legend",
                '稀有': 'rare',
                '精品': "common",
              };
              var rankToIcon = {
                '默认': "",
                '精品': 'A+',
                '史诗': "SS",
                '传说': "SSS",
                '稀有': 'S',
                '普通': "A",
              };
              var rank = null;
              if (lib.config.qhly_rarity && lib.config.qhly_rarity[name]) {
                rank = lib.config.qhly_rarity[name];
              }
              for (var r of rankList) {
                var opt = document.createElement('option');
                opt.innerHTML = r + rankToIcon[r];
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
                  target = event.target;
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
                    target = event.target;
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
        view.appendChild(subView.mp);
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
            if (lib.config.qhly_showrarity) {
              subView.rank.show();
              var rarity = game.getRarity(state.name);
              if (rarity) {
                subView.rank.setBackgroundImage('extension/千幻聆音/theme/decade/rarity_' + game.getRarity(name) + '.png');
              }
            } else {
              subView.rank.hide();
            }
          }
          subView.avatarImage.setAttribute('data-border-level', game.qhly_getDengJie(state.name));
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
            } else {
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

          } else {
            subView.avatarImage.classList.remove('qh-image-lutou');
            subView.avatarImage.classList.add('qh-image-standard');

          }
          // if (lib.qhly_skinChange[name]) {
          //     if (_status.qhly_replaceSkin[name][game.qhly_getSkin(name)]) window.qhly_audio_redirect[name + '-' + game.qhly_earse_ext(game.qhly_getSkin(name))] = _status.qhly_replaceSkin[name][game.qhly_getSkin(name)];
          //     game.qhly_setCurrentSkin(name, game.qhly_getSkin(name));
          // }
          game.qhly_checkPlayerImageAudio(name, game.qhly_getSkin(name));
          game.qhly_setOriginSkin(name, game.qhly_getSkin(name), state.mainView.avatarImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage, null, state.name) == 2);
          if (game.qhly_getSkin(name)) {
            var str = game.qhly_getSkin(name).substring(0, game.qhly_getSkin(name).length - 4);
            if (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name][str]) {
              game.qhly_changeDynamicSkin(subView.avatarImage, str, name);
              if (subView.avatarImage.dynamic && subView.avatarImage.dynamic.primary) _status.currentTexiao = subView.avatarImage.dynamic.primary.name;
            }
          } else if (window.decadeUI && decadeUI.dynamicSkin[name]) {
            var dyList = Object.keys(decadeUI.dynamicSkin[name]);
            if (dyList && dyList.contains('经典形象') && (!lib.config.qhly_skinset.djtoggle[name] || lib.config.qhly_skinset.djtoggle[name] && !lib.config.qhly_skinset.djtoggle[name]['经典形象']))
              game.qhly_changeDynamicSkin(subView.avatarImage, '经典形象', name);
          }
          // }
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
          refreshRank();
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
          subView.name.innerHTML = vname;
          if (chname.length == 5) {
            subView.name.style.fontSize = '2.6em';
          } else if (chname.length >= 6) {
            subView.name.style.fontSize = '2.4em';
          } else {
            subView.name.style.fontSize = '2.8em';
          }
          var hp = state.intro[2];
          if (typeof hp == 'number' && !isFinite(hp)) {
            hp = '∞';
          }
          if (!get.infoHujia(hp)) {
            subView.hpText.innerHTML = hp + '';
          } else {
            var str = '';
            if (get.infoHp(hp) != get.infoMaxHp(hp)) {
              str = get.infoHp(hp) + '/' + get.infoMaxHp(hp);
            } else {
              str = get.infoMaxHp(hp) + '';
            }
            str += "&nbsp;&nbsp;&nbsp;<img style='height:20px;width:20px;' src='" + lib.qhly_path + "theme/decade/shield.png'/>";
            if (get.infoHujia(hp) > 1) {
              str += ("x" + get.infoHujia(hp));
            }
            subView.hpText.innerHTML = str;
            subView.hpText.style.left = "calc(29%)";
            subView.hpText.style.width = "calc(90%)";
          }
          var mp = get.qhly_getMp(state.name, state.pkg);
          if (mp === null || mp === undefined) {
            subView.mp.hide();
          } else {
            subView.mp.show();
            subView.mpText.innerHTML = mp + "";
          }
          var mp = get.qhly_getMp(state.name, state.pkg);
          if (mp === null || mp === undefined) {
            subView.mp.setAttribute('data-visiable', false);
            subView.mp.hide();
          } else {
            subView.mp.setAttribute('data-visiable', true);
            subView.mp.show();
            subView.mpText.innerHTML = mp + "";
          }

        };
        refreshView(state, subView);
        game.qhly_changeViewSkin(subView);
        showPage('skin');
        showPage(page);
        game.qhly_syncChangeSkinButton(name, game.qhly_getSkin(name), state);
        game.qhly_setOriginSkin(name, game.qhly_getSkin(name), state.mainView.avatarImage, state, game.qhly_getPlayerStatus(state.mainView.avatarImage, null, state.name) == 2);
      }


      game.qhly_initNewView = function (name, view, page, cplayer) {
        var currentViewSkin = lib.qhly_viewskin[lib.config.qhly_currentViewSkin];
        var subView = {};
        if (!page) {
          page = 'introduce';
        }
        var refreshRank = function () { };
        subView.avatar = ui.create.div('.qh-avatar', view);
        subView.pageButton = {
          introduce: ui.create.div('.qh-button1', view),
          skill: ui.create.div('.qh-button2', view),
          skin: ui.create.div('.qh-button3', view),
          config: ui.create.div('.qh-button4', view),
        };
        subView.menuCover = ui.create.div();
        subView.menuCover.style.width = "100%";
        subView.menuCover.style.height = "100%";
        subView.menuCover.style.zIndex = 38;
        if (currentViewSkin.isQiLayout) {
          subView.avatarImage = ui.create.div('.qh-image-standard', subView.avatar);
          subView.rank = ui.create.div('.qh-avatar-rank', subView.avatar);
          subView.avatarImage.classList.add('qh-must-replace');
          subView.avatarImage.classList.add('avatar');
          subView.avatarLabel = ui.create.div('.qh-avatar-label', view);
          subView.group = ui.create.div('.qh-avatar-label-group', subView.avatarLabel);
          if (lib.config.qhly_shilizihao) {
            subView.group.style.fontSize = lib.config.qhly_shilizihao + "px";
          }
          subView.doublegroup = ui.create.div('.qh-avatar-label-group-double', subView.avatarLabel);
          subView.doublegroupA = ui.create.div('.qh-avatar-label-group-double-a', subView.doublegroup);
          subView.doublegroupB = ui.create.div('.qh-avatar-label-group-double-b', subView.doublegroup);
          if (lib.config.qhly_shilizihao) {
            subView.doublegroupA.style.fontSize = parseInt(lib.config.qhly_shilizihao) * 0.4 + "px";
            subView.doublegroupB.style.fontSize = parseInt(lib.config.qhly_shilizihao) * 0.4 + "px";
          }
          subView.doublegroup.hide();
          subView.name = ui.create.div('.qh-avatar-label-name', subView.avatarLabel);
          subView.characterTitle = ui.create.div('.qh-avatar-label-title', subView.avatarLabel);
          subView.hp = ui.create.div('.qh-hp', view);
          subView.mp = ui.create.div('.qh-mp');
          subView.mp.hide();
          subView.pageButton.introduce.innerHTML = "简介";
          subView.pageButton.introduce.downButton = ui.create.div('.qh-otherinfoarrow', subView.pageButton.introduce);
          subView.pageButton.skill.innerHTML = "技能";
          subView.pageButton.skin.innerHTML = "皮肤";
          subView.pageButton.config.innerHTML = "选项";
          subView.cover = ui.create.div('.qh-window-cover', view);
          if (lib.config.qhly_hideShuimoCover) {
            subView.cover.setBackgroundImage('extension/千幻聆音/theme/shuimo/newui_shuimo_bg3.png');
          } else {
            subView.cover.setBackgroundImage('extension/千幻聆音/theme/shuimo/newui_shuimo_bg2.png');
          }
          subView.board = ui.create.div('.qh-window-backboard', view);
          var lineHeight = (lib.config.qhly_hanggaoxiufu2 ? lib.config.qhly_hanggaoxiufu2 : '250') + '%';
          subView.pageButton.introduce.style.lineHeight = lineHeight;
          subView.pageButton.skill.style.lineHeight = lineHeight;
          subView.pageButton.skin.style.lineHeight = lineHeight;
          subView.pageButton.config.style.lineHeight = lineHeight;
        } else if (currentViewSkin.isLolBigLayout) {
          subView.avatarImage = ui.create.div('.qh-image-standard', subView.avatar);
          subView.rank = ui.create.div('.qh-avatar-rank', subView.avatar);
          subView.avatarImage.classList.add('qh-must-replace');
          subView.avatarImage.classList.add('avatar');
          subView.avatarLabel = ui.create.div('.qh-avatar-label', view);
          subView.group = ui.create.div('.qh-avatar-label-group', subView.avatarLabel);
          if (lib.config.qhly_lolshilizihao) {
            subView.group.style.fontSize = lib.config.qhly_lolshilizihao + "px";
          }
          subView.doublegroup = ui.create.div('.qh-avatar-label-group-double', subView.avatarLabel);
          subView.doublegroupA = ui.create.div('.qh-avatar-label-group-double-a', subView.doublegroup);
          subView.doublegroupB = ui.create.div('.qh-avatar-label-group-double-b', subView.doublegroup);
          if (lib.config.qhly_lolshilizihao) {
            subView.doublegroupA.style.fontSize = parseInt(lib.config.qhly_lolshilizihao) * 0.4 + "px";
            subView.doublegroupB.style.fontSize = parseInt(lib.config.qhly_lolshilizihao) * 0.4 + "px";
          }
          subView.doublegroup.hide();
          subView.name = ui.create.div('.qh-avatar-label-name', subView.avatarLabel);
          subView.characterTitle = ui.create.div('.qh-avatar-label-title', subView.avatarLabel);
          subView.hp = ui.create.div('.qh-hp', view);
          subView.mp = ui.create.div('.qh-mp');
          subView.mp.hide();
          subView.pageButton.introduce.innerHTML = "简介";
          subView.pageButton.introduce.downButton = ui.create.div('.qh-otherinfoarrow', subView.pageButton.introduce);
          subView.pageButton.skill.innerHTML = "技能";
          subView.pageButton.skin.innerHTML = "皮肤";
          subView.pageButton.config.innerHTML = "选项";
          subView.cover = ui.create.div('.qh-window-cover', view);
          subView.board = ui.create.div('.qh-window-backboard', view);
        }
        else {
          subView.avatarImage = ui.create.div('.qh-image-standard', subView.avatar);
          subView.avatarImage.classList.add('qh-must-replace');
          subView.avatarImage.classList.add('avatar');
          subView.avatarLabel = ui.create.div('.qh-avatar-label', subView.avatar);
          subView.group = ui.create.div('.qh-avatar-label-group', subView.avatarLabel);
          subView.rank = ui.create.div('.qh-avatar-label-rank', subView.avatarLabel);
          subView.name = ui.create.div('.qh-avatar-label-name', subView.avatarLabel);
          subView.hp = ui.create.div('.qh-hp', view);
          subView.hpText = ui.create.div('.qh-hptext', subView.hp);
          subView.mp = ui.create.div('.qh-mp');
          subView.mpText = ui.create.div('.qh-mptext', subView.mp);
          subView.mp.hide();
          subView.dragontail = ui.create.div('.qh-avatar-dragontail', subView.avatar);
          subView.dragontail.hide();
          subView.dragonhead = ui.create.div('.qh-avatar-dragonhead', subView.avatar);
          subView.dragonhead.hide();
          subView.pageButton.introduce.innerHTML = "简 介";
          subView.pageButton.introduce.downButton = ui.create.div('.qh-otherinfoarrow', subView.pageButton.introduce);
          subView.pageButton.skill.innerHTML = "技 能";
          subView.pageButton.skin.innerHTML = "皮 肤";
          subView.pageButton.config.innerHTML = "选 项";
        }
        subView.page = {
          introduce: {
            pageView: ui.create.div('.qh-page-introduce', view),
            refresh: function (name, state) {
              if (!this.inited) this.init(name, state);
              var that = this;
              this.text.refresh = function(){
                that.refresh(name,state);
              };
              if (!state.introduceExtraPage || state.introduceExtraPage == '简介') {
                var intro = get.qhly_getIntroduce(name, state.pkg);
                this.text.innerHTML = "<br>" + intro + "<br><br><br><br><br><br><br>";
                if (currentViewSkin.buttonTextSpace === false) {
                  subView.pageButton.introduce.innerHTML = "简介";
                } else {
                  subView.pageButton.introduce.innerHTML = "简 介";
                }
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
                        ret = "<br>" + fc + "<br><br><br><br><br><br><br>";
                      } else {
                        if (fc.content) {
                          ret = "<br>" + fc.content + "<br><br><br><br><br><br><br>";
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
                if (currentViewSkin.buttonTextSpace !== false && btname.length == 2) {
                  btname = btname.charAt(0) + ' ' + btname.charAt(1);
                }
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
            pageView: ui.create.div('.qh-page-skill', view),
            refresh: function (name, state) {
              if (!this.inited) this.init(name, state);
            },
            init: function (name, state) {
              this.text = ui.create.div('.qh-page-skill-text', this.pageView);
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
              var content = "<br>";
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
              if (cplayer && lib.config.qhly_skillingame) {
                var skills = cplayer.getSkills(false, false);
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
              if (currentViewSkin.isQiLayout) {
                content += "<table border='2' frame='void' rules='none'>";
                for (var skill of viewSkill) {
                  if (!lib.translate[skill + "_info"]) continue;
                  var detail = get.translation(skill + "_info");
                  if (detail) {
                    var cskill = get.translation(skill);
                    content += "<tr>";
                    content += "<td style='text-align:center;";
                    if (cplayer && lib.config.qhly_skillingame) {
                      if (!cplayer.hasSkill(skill)) {
                        content += 'opacity:0.5;'
                      }
                    }
                    content += "vertical-align:top;width:100px;height:100px;background-repeat:no-repeat;background-position:top left;background-size:100px 100px;background-image:url(" + lib.qhly_path + "theme/shuimo/newui_shuimo_skillname.png);";
                    content += "color:";
                    if (derivation.contains(skill)) {
                      content += get.qhly_getIf(currentViewSkin.skillPageDerivationSkillColor, "#0000ff") + ";";
                    } else if (tempSkill.contains(skill)) {
                      content += get.qhly_getIf(currentViewSkin.skillPageTempSkillColor, "#00FF00") + ";";
                    } else {
                      content += get.qhly_getIf(currentViewSkin.skillPageSkillNameColor, "#5B0F00") + ";";
                    }
                    if (cskill.length <= 2) {
                      content += 'font-size:30px;';
                      content += 'line-height:' + (lib.config.qhly_hanggaoxiufu ? lib.config.qhly_hanggaoxiufu : '250') + '%;';
                    } else if (cskill.length <= 3) {
                      content += 'font-size:26px;';
                      content += 'line-height:320%;'
                    } else if (cskill.length <= 4) {
                      content += 'font-size:22px;';
                      content += 'line-height:370%;'
                    } else {
                      content += 'font-size:18px;';
                      content += 'line-height:450%;'
                    }
                    content += 'font-family:qh_songhei;';
                    content += "'>";
                    content += cskill;
                    content += "</td>";
                    content += "<td style='vertical-align:top;";
                    if (cplayer && lib.config.qhly_skillingame) {
                      if (!cplayer.hasSkill(skill)) {
                        content += 'opacity:0.5;'
                      }
                    }
                    content += "'>";
                    content += "<img style='width:135px;height:51px;' id='qhly_skillv_" + skill + "'/><br><span ";
                    var dynamicTranslate = null;
                    if (cplayer && lib.config.qhly_skillingame) {
                      var dtrans = lib.dynamicTranslate[skill];
                      if (dtrans) {
                        dtrans = dtrans(cplayer, skill);
                      }
                      if (dtrans && lib.qhly_filterPlainText(dtrans) != lib.qhly_filterPlainText(detail)) {
                        dynamicTranslate = dtrans;
                        content += "style='opacity:0.5;text-decoration:line-through;'"
                      } else {
                        if (dtrans && dtrans.length) {
                          detail = dtrans;
                        }
                      }
                    }
                    content += '>';
                    content += lib.qhly_keyMark(detail);
                    content += "</span>";
                    if (dynamicTranslate) {
                      content += "<br><br><span style='color:orange;'>";
                      content += dynamicTranslate;
                      content += "</span>";
                    }
                    content += "<br>";
                    var info = get.info(skill);
                    if (info && (info.frequent || info.subfrequent)) {
                      content += "<br>&nbsp;&nbsp;<img style='vertical-align:middle;' id='qhly_autoskill_" + skill + "'/><b id='qhly_autoskill_text_" + skill + "'>自动发动</b>"
                    }
                    content += "<br>"
                    content += "</td>";
                    content += "</tr>";
                  }
                }
                content += "</table>";
              } else {
                for (var skill of viewSkill) {
                  if (!lib.translate[skill + "_info"]) continue;
                  var detail = get.translation(skill + "_info");
                  if (detail) {
                    var skilltitle = get.translation(skill);
                    if (!currentViewSkin.isLolBigLayout) {
                      skilltitle = "【" + skilltitle + "】";
                    } else {
                      var str = "<span style='";
                      str += 'display:flex;justify-content:center;align-items: center;';
                      str += "background-image:url(";
                      str += lib.qhly_path + "theme/lolbig/newui_lol_skill_button.png";
                      str += ");";
                      str += 'font-size:15px;';
                      str += 'width:94px;height:24px;text-align:center;'
                      str += 'background-size:100% 100%;';
                      str += "background-repeat:no-repeat;";
                      str += "background-position:center;";
                      str += "' id='qhly_skillv_" + skill + "'";
                      str += ">";
                      str += skilltitle;
                      str += "</span>";
                      skilltitle = str;
                    }
                    content += "<h3";
                    if (derivation.contains(skill)) {
                      content += " style='color:" + get.qhly_getIf(currentViewSkin.skillPageDerivationSkillColor, "#0000ff") + ";";
                    } else if (tempSkill.contains(skill)) {
                      content += " style='color:" + get.qhly_getIf(currentViewSkin.skillPageDerivationSkillColor, "#00ff00") + ";";
                    } else {
                      content += " style='color:" + get.qhly_getIf(currentViewSkin.skillPageSkillNameColor, "#5B0F00") + ";";
                    }
                    if (cplayer && lib.config.qhly_skillingame) {
                      if (!cplayer.hasSkill(skill)) {
                        content += "opacity:0.5;"
                      }
                    }
                    content += "'>";
                    content += skilltitle;
                    if (!currentViewSkin.isLolBigLayout) {
                      content += "<img style='vertical-align:middle;width:35px;' id='qhly_skillv_" + skill + "'/>";
                    }
                    content += "</h3>";
                    content += "<p";
                    content += ">";
                    content += "<span style='";
                    var dynamicTranslate = null;
                    if (cplayer && lib.config.qhly_skillingame) {
                      var dtrans = lib.dynamicTranslate[skill];
                      if (dtrans) {
                        dtrans = dtrans(cplayer, skill);
                      }
                      if (dtrans && lib.qhly_filterPlainText(dtrans) != lib.qhly_filterPlainText(detail)) {
                        dynamicTranslate = dtrans;
                        content += "opacity:0.5;text-decoration:line-through;"
                      } else {
                        if (dtrans && dtrans.length) {
                          detail = dtrans;
                        }
                      }
                      if (!cplayer.hasSkill(skill)) {
                        content += "opacity:0.5;"
                      }
                    }
                    content += "'>";
                    content += lib.qhly_keyMark(detail);
                    content += "</span>";
                    if (dynamicTranslate) {
                      content += "<br><br><span style='color:orange;'>";
                      content += dynamicTranslate;
                      content += "</span>";
                    }
                    var info = get.info(skill);
                    if (info && (info.frequent || info.subfrequent)) {
                      content += "<br>&nbsp;&nbsp;<img style='vertical-align:middle;' id='qhly_autoskill_" + skill + "'/><b id='qhly_autoskill_text_" + skill + "'>自动发动</b>"
                    }
                    content += "</p>";
                  }
                }
              }
              content += "<br><br><br><br><br><br>";
              this.text.innerHTML = content;

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
                      img.src = lib.assetURL + get.qhly_getCurrentViewSkinValue('skillPagePlayAudioButtonImage', 'extension/千幻聆音/image/newui_playaudio.png');
                      ui.qhly_addListenFunc(img);
                      img.listen(function () {
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
                            subView.avatarImage.setBackground(name, 'character');
                          } else if (Array.isArray(skillSkin)) {
                            subView.avatarImage.setBackgroundImage(skillSkin[count % skillSkin.length]);
                          } else {
                            subView.avatarImage.setBackgroundImage(skillSkin);
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
            getSkinAt: function (num) {
              return this.skinList[num + this.currentIndex];
            },
            onClickSkin: function (num, name, state) {
              var that = this;
              var skin = this.getSkinAt(num);
              if (!skin) {
                return;
              }
              if (skin.skinId == game.qhly_getSkin(name)) {
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
              game.qhly_playQhlyAudio('qhly_voc_fanshu', null, true);
              game.qhly_setCurrentSkin(name, skin.skinId, function () {
                _status.qhly_skillAudioWhich = {};
                if (currentViewSkin.isLolBigLayout) {
                  that.currentIndex = that.currentIndex + num - 1;
                }
                this.refresh(name, state);
                if (state.onChangeSkin) {
                  state.onChangeSkin();
                }
                if ((currentViewSkin.lihuiSupport) && state.pkg.characterLihui) {
                  var lihuiPath = state.pkg.characterLihui(name, lib.config.qhly_skinset.skin[name]);
                  if (lihuiPath) {
                    state.mainView.avatarImage.setBackgroundImage(lihuiPath);
                    state.useLihuiLayout(true);
                  } else {
                    state.mainView.avatarImage.setBackground(name, 'character');
                    state.useLihuiLayout(false);
                  }
                } else {
                  state.mainView.avatarImage.setBackground(name, 'character');
                }
              }.bind(this), true);
            },
            canViewSkin: function (skinId) {
              for (var i = 0; i < 3; i++) {
                var skin = this.getSkinAt(i);
                if (skin) {
                  if (skin.skinId) {
                    if (skin.skinId == skinId) {
                      return true;
                    }
                  } else {
                    if (!skinId) {
                      return true;
                    }
                  }
                }
              }
              return false;
            },
            refresh: function (name, state, forced) {
              if (!this.inited) this.init(name, state);
              if (this.skinListGot && !forced) {
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
              if (skin) {
                var skinInfo = obj.skin[game.qhly_earseExt(skin)];
                if (skinInfo && skinInfo.skill) {
                  if (skinInfo.skill[skill] && skinInfo.skill[skill].content) {
                    initValue = skinInfo.skill[skill].content;
                  }
                }
              } else {
                var sskill = obj.origin.skill;
                if (sskill[skill] && sskill[skill].content) {
                  initValue = sskill[skill].content;
                }
              }
              var that = this;
              game.qhly_editDialog(title, detail, initValue, function (value, dialog) {
                if (!value) value = "";
                while (value.indexOf("/") >= 0) {
                  value = value.replace("/", "<br>");
                }
                if (skin) {
                  var m = obj.skin[game.qhly_earseExt(skin)];
                  if (m) {
                    if (!m.skill) m.skill = {};
                    if (!m.skill[skill]) {
                      m.skill[skill] = {};
                    }
                    m.skill[skill].content = value;
                  }
                } else {
                  if (!obj.origin.skill[skill]) {
                    obj.origin.skill[skill] = { content: '' };
                  }
                  obj.origin.skill[skill].content = value;
                }
                var strobj = JSON.stringify(obj, null, 4);
                game.qhly_readFileAsText("extension/千幻聆音/data/skininfomodel.txt", function (ret, str) {
                  if (ret) {
                    str = str.replace("_REPLACE_OBJECT_", strobj);
                    var path = game.qhly_getSkinImagePath(name, state.pkg);
                    game.qhly_writeTextFile(str, path + name, "skininfo.js", function (err) {
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
              var that = this;
              if (this.firstRefresh) {
                var ret = false;
                for (var i = (currentViewSkin.isLolBigLayout ? -1 : 0); i < this.skinList.length; i++) {
                  var skin = this.skinList[i];
                  this.currentIndex = i;
                  if (this.canViewSkin(game.qhly_getSkin(name))) {
                    if (currentViewSkin.isLolBigLayout) {
                      for (var j = 0; j < 3; j++) {
                        var skinAt = this.getSkinAt(j);
                        if (skinAt && skinAt.skinId == game.qhly_getSkin(name)) {
                          this.currentIndex = i + j - 1;
                        }
                      }
                    }
                    ret = true;
                    break;
                  }
                }
                if (!ret) {
                  this.currentIndex = 0;
                  game.qhly_setCurrentSkin(name, null, undefined, true);
                }
                this.firstRefresh = false;
              }
              if (!this.hideSkinMode) {
                for (var v of this.skinViews) {
                  v.show();
                }
                if (currentViewSkin.isLolBigLayout) {
                  this.text.style.height = "70%";
                }
                else if (currentViewSkin.isQiLayout) {
                  this.text.style.height = "63.61%";
                } else {
                  this.text.style.height = "56.13%";
                }
                if (currentViewSkin.isLolBigLayout) {
                  if (!this.getSkinAt(0)) {
                    this.leftArrow.hide();
                  } else {
                    this.leftArrow.show();
                  }
                } else if (this.currentIndex <= 0) {
                  this.leftArrow.hide();
                } else {
                  this.leftArrow.show();
                }
                if (currentViewSkin.isLolBigLayout) {
                  if (!this.getSkinAt(2)) {
                    this.rightArrow.hide();
                  } else {
                    this.rightArrow.show();
                  }
                } else if (this.currentIndex + 3 < this.skinList.length) {
                  this.rightArrow.show();
                } else {
                  this.rightArrow.hide();
                }
                var currentSkin = game.qhly_getSkin(name);
                for (var i = 0; i < 3; i++) {
                  var currentSkinView = this['skin' + (i + 1)];
                  var levelView = this['skinLevel' + (i + 1)];
                  if (this.getSkinAt(i)) {
                    if (currentViewSkin.isLolBigLayout) {
                      currentSkinView.qhBoard.show();
                    }
                    var skinId = this.getSkinAt(i).skinId;
                    if (game.qhly_skinLock(name, skinId)) {
                      currentSkinView.qh_setLock(true);
                      currentSkinView.style.filter = "grayscale(100%)";
                    } else {
                      currentSkinView.qh_setLock(false);
                      currentSkinView.style.filter = "grayscale(0%)";
                    }
                    if (skinId) {
                      currentSkinView.setBackgroundImage(game.qhly_getSkinFile(name, this.getSkinAt(i).skinId));
                    } else {
                      currentSkinView.setBackground(name, 'character');
                    }
                    currentSkinView.show();
                    if (currentViewSkin.isQiLayout) {
                      if (currentSkin == this.getSkinAt(i).skinId) {
                        currentSkinView.qhBoard.setBackgroundImage('extension/千幻聆音/theme/shuimo/newui_skin_background_shuimo.png');
                        currentSkinView.qhBoard.style.zIndex = 33;
                        currentSkinView.qhBoard.style.filter = "saturate(100%)";
                        currentSkinView.qhTitle.show();
                        var cskin = this.getSkinAt(i);
                        var tname = cskin.skinId;
                        if (!tname) {
                          tname = "初始皮肤";
                        } else if (cskin.skinInfo.translation) {
                          tname = cskin.skinInfo.translation;
                        } else {
                          tname = get.translation(cskin.skinId);
                        }
                        //tname=game.qhly_rename(tname);
                        currentSkinView.qhTitle.qhText.innerHTML = tname;
                      } else {
                        currentSkinView.qhBoard.setBackgroundImage('');
                        currentSkinView.qhBoard.style.zIndex = 34;
                        currentSkinView.qhBoard.style.filter = "saturate(50%)";
                        currentSkinView.qhTitle.hide();
                      }
                    } else if (currentViewSkin.isLolBigLayout) {

                    } else {
                      if (currentSkin == this.getSkinAt(i).skinId) {
                        currentSkinView.qhCover.classList.add('selected');
                        currentSkinView.style.zIndex = 33;
                      } else {
                        currentSkinView.qhCover.classList.remove('selected');
                        currentSkinView.style.zIndex = 34;
                      }
                    }
                    var level = this.getSkinAt(i).skinInfo.level;
                    var style = this.getSkinAt(i).skinInfo.levelStyle;
                    if (style) {
                      if (!levelView.qh_savedStyle) {
                        levelView.qh_savedStyle = {};
                        for (var m in levelView.style) {
                          levelView.qh_savedStyle[m] = levelView.style[m];
                        }
                      }
                      for (var s in style) {
                        levelView.style[s] = style[s];
                      }
                      var es = ['left', 'bottom', 'top', 'right'];
                      for (var m of es) {
                        if (!style[m]) {
                          levelView.style[m] = "";
                        }
                      }
                    } else {
                      if (levelView.qh_savedStyle) {
                        for (var m in levelView.qh_savedStyle) {
                          levelView.style[m] = levelView.qh_savedStyle[m];
                        }
                      }
                    }
                    if (this.getSkinAt(i).skinId) {
                      if (lib.qhly_level[name + '_' + this.getSkinAt(i).skinId]) {
                        level = lib.qhly_level[name + '_' + this.getSkinAt(i).skinId];
                      }
                    }
                    if (level) {
                      var map = {
                        '普通': 'putong',
                        '精品': 'jingpin',
                        '史诗': 'shishi',
                        '传说': 'chuanshuo',
                        '限定': 'xianding',
                      };
                      var img = null;
                      if (map[level]) {
                        img = "extension/千幻聆音/image/level_" + map[level] + ".png";
                      } else if (level.indexOf("#") == 0) {
                        var l2 = level.replace("#", "");
                        img = "extension/千幻聆音/image/" + l2 + ".png";
                      } else if (level.indexOf("$") == 0) {
                        var l2 = level.replace("$", "");
                        img = l2;
                      }
                      if (img) {
                        levelView.show();
                        levelView.setBackgroundImage(img);
                      } else {
                        levelView.hide();
                      }
                    } else {
                      levelView.hide();
                    }
                  } else {
                    currentSkinView.hide();
                    levelView.hide();
                    if (currentViewSkin.isLolBigLayout) {
                      currentSkinView.qhBoard.hide();
                    }
                  }
                }
              } else {
                for (var v of this.skinViews) {
                  v.hide();
                }
                if (currentViewSkin.isLolBigLayout) {
                  this.text.style.height = "70%";
                } else {
                  this.text.style.height = "100%";
                }
              }
              var content = "<br>";
              var currentSkin = this.getCurrentSkin(name);
              if (!currentSkin) {
                return;
              }
              var tname = currentSkin.skinId;
              if (!tname) {
                tname = "原始皮肤";
              } else if (currentSkin.skinInfo.translation) {
                tname = currentSkin.skinInfo.translation;
              } else {
                tname = get.translation(currentSkin.skinId);
              }
              if (this.skinName) {
                this.skinName.innerHTML = tname;
              }
              if (!currentViewSkin.isQiLayout && !currentViewSkin.isLolBigLayout) {
                content += "<h2 style='color:" + get.qhly_getIf(currentViewSkin.skinPageHeadTitleColor, "#783f04") + "'>皮肤名称：<span style='color:" + get.qhly_getIf(currentViewSkin.skinPageHeadSkinNameColor, "black") + "'>" + tname + "</span></h2>";
              }
              var extInfo = "";
              if (currentSkin.skinInfo.info) {
                extInfo = "<h3>" + currentSkin.skinInfo.info + "</h3>";
              } else {
                if (state.pkg && state.pkg.originSkinInfo) {
                  var i = state.pkg.originSkinInfo(name);
                  if (i) {
                    extInfo = "<h3>" + i + "</h3>";
                  }
                }
              }
              if (!currentViewSkin.isQiLayout && !currentViewSkin.isLolBigLayout) {
                content += extInfo;
              }
              var addButton = [];
              var Vicpath = `${state.pkg.audio}${game.qhly_getRealName(name)}/`;
              if (game.qhly_getSkin(name)) Vicpath += `${game.qhly_earse_ext(game.qhly_getSkin(name))}/`;
              if (currentViewSkin.isQiLayout) {
                content += "<table border='2' frame='void' rules='none'>";
                for (var audio of currentSkin.audios) {
                  if (audio.id == 'victory' && !game.thunderFileExist(lib.assetURL + Vicpath + 'victory.mp3')) continue;
                  content += "<tr>";
                  content += "<td style='";
                  content += "text-align:center;vertical-align:top;width:100px;height:100px;background-repeat:no-repeat;background-position:top left;background-size:100px 100px;background-image:url(" + lib.qhly_path + "theme/shuimo/newui_shuimo_skillname.png);";
                  if (audio.id == 'die') {
                    content += "color:#ff0000;";
                  } else if (audio.id == 'victory') {
                    content += "color:#ffea34;";
                  } else {
                    content += "color:" + get.qhly_getIf(currentViewSkin.skinPageSkillNameColor, "#4169E1") + ";";
                  }
                  var cskill;
                  if (audio.name) {
                    cskill = audio.name;
                  } else {
                    cskill = get.translation(audio.id);
                  }
                  if (cskill.length <= 2) {
                    content += 'font-size:30px;';
                    content += 'line-height:' + (lib.config.qhly_hanggaoxiufu ? lib.config.qhly_hanggaoxiufu : '250') + '%;';
                  } else if (cskill.length <= 3) {
                    content += 'font-size:26px;';
                    content += 'line-height:320%;'
                  } else if (cskill.length <= 4) {
                    content += 'font-size:22px;';
                    content += 'line-height:370%;'
                  } else {
                    content += 'font-size:18px;';
                    content += 'line-height:450%;'
                  }
                  content += 'font-family:qh_songhei;';
                  content += "'>";
                  content += cskill;
                  content += "</td>";

                  content += "<td>";
                  content += "<img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('skinPagePlayAudioButtonImage', 'extension/千幻聆音/image/qhly_pic_playaudiobutton.png') + "' style='height:40px;' id='qhly_skin_skill_" + audio.id + "'/>"
                  if (lib.config.qhly_editmode && !game.qhly_isForbidEditTaici(name)) {
                    content += "<img src='" + lib.qhly_path + "image/qhly_editButton.png' style='height:25px;width:25px;'";
                    content += " id='qhly_skin_skill_edit_" + audio.id + "'";
                    content += "/>";
                  }
                  content += "<br>";
                  addButton.push(audio.id);
                  if (audio.content) {
                    var sc = audio.content;
                    content += sc;
                  }
                  content += "<br></td>";
                  content += "</tr>";
                }
                content += "</table>";
              } else {
                for (var audio of currentSkin.audios) {
                  if (audio.id == 'victory' && !game.thunderFileExist(lib.assetURL + Vicpath + 'victory.mp3')) continue;
                  if (audio.id == 'die') {
                    content += "<h3 style='color:#ff0000'>【";
                  } else if (audio.id == 'victory') {
                    content += "<h3 style='color:#ffea34'>【";
                  } else {
                    content += "<h3 style='color:" + get.qhly_getIf(currentViewSkin.skinPageSkillNameColor, "#4169E1") + "'>【";
                  }
                  if (audio.name) {
                    content += audio.name;
                  } else {
                    content += get.translation(audio.id);
                  }
                  content += "】"
                  content += "&nbsp;&nbsp;&nbsp;<img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('skinPagePlayAudioButtonImage', 'extension/千幻聆音/image/qhly_pic_playaudiobutton.png') + "' style='height:23px;vertical-align:middle;' id='qhly_skin_skill_" + audio.id + "'/>"
                  if (lib.config.qhly_editmode && !game.qhly_isForbidEditTaici(name)) {
                    content += "<img src='" + lib.qhly_path + "image/qhly_editButton.png' style='height:25px;width:25px;'";
                    content += " id='qhly_skin_skill_edit_" + audio.id + "'";
                    content += "/>";
                  }
                  content += "</h3>"
                  addButton.push(audio.id);
                  if (audio.content) {
                    content += "<p>";
                    content += audio.content;
                    content += "</p>";
                  }
                }
              }
              if (currentViewSkin.isQiLayout || currentViewSkin.isLolBigLayout) {
                content += extInfo;
              }
              content += "<br><br>";
              if (lib.config.qhly_skinconfig) {
                content += "<h2>皮肤配置</h2>";
                content += "<p><span style='display:inline-block;height:30px;'><span id='qhconfig_checkbox_banInRandom_text' style='display:inline-block;position:relative;bottom:25%;'>随机切换禁用&nbsp;&nbsp;</span><img id='qhconfig_checkbox_banInRandom'/></span></p><br>";
                if (currentSkin.skinId) {
                  content += "<p><span>皮肤品质&nbsp;&nbsp;</span><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_level_select'></select></p>";
                  content += "<p><span>皮肤顺序&nbsp;&nbsp;</span><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_order_select'></select></p>";
                  //content += "<p><span>语音重定向&nbsp;&nbsp;</span><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_audio_redirect_select'></select></p>";
                }
                content += "<br><br>";
              }
              content += "<br><br>";
              this.text.innerHTML = content;
              if (lib.config.qhly_skinconfig) {
                if (currentSkin.skinId) {
                  var levelSelect = document.getElementById('qhconfig_level_select');
                  var opt = document.createElement('option');
                  opt.innerHTML = "默认";
                  opt.setAttribute('name', 'default');
                  levelSelect.appendChild(opt);
                  var levels = ['普通', '精品', '史诗', '传说', '限定'];
                  var map = {
                    '普通': 'putong',
                    '精品': 'jingpin',
                    '史诗': 'shishi',
                    '传说': 'chuanshuo',
                    '限定': 'xianding',
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
                      target = event.target;
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
                    }
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
                      target = event.target;
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
              for (var vid of addButton) {
                var img = document.getElementById('qhly_skin_skill_' + vid);
                if (img) {
                  ui.qhly_addListenFunc(img);
                  var that = this;
                  (function (id) {
                    img.listen(function () {
                      that.consumeTextClick = true;
                      if (id == 'die') window.qhly_playDieAudio(name);
                      else if (id == 'victory') window.qhly_playVictoryAudio(name);
                      else {
                        var count = _status.qhly_skillAudioWhich[id];
                        if (!count) {
                          _status.qhly_skillAudioWhich[id] = 0;
                          count = 0;
                        }
                        _status.qhly_skillAudioWhich[id]++;
                        window.qhly_TrySkillAudio(id, { name: name }, null, count);
                        var skillSkin = game.qhly_getSkillSkin(name, game.qhly_getSkin(name), id);
                        if (skillSkin) {
                          if (skillSkin === 1) {
                            subView.avatarImage.setBackground(name, 'character');
                          } else if (Array.isArray(skillSkin)) {
                            subView.avatarImage.setBackgroundImage(skillSkin[count % skillSkin.length]);
                          } else {
                            subView.avatarImage.setBackgroundImage(skillSkin);
                          }
                        }
                      }
                    });
                  })(vid);
                }
                if (lib.config.qhly_editmode && !game.qhly_isForbidEditTaici(name)) {
                  var imgEdit = document.getElementById('qhly_skin_skill_edit_' + vid);
                  if (imgEdit) {
                    ui.qhly_addListenFunc(imgEdit);
                    (function (id) {
                      imgEdit.listen(function () {
                        that.editOpen(name, currentSkin.skinId, id, state);
                      });
                    })(vid);
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
              this.skinListGot = true;
            },
            init: function (name, state) {
              this.text = ui.create.div('.qh-page-skin-text', this.pageView);
              lib.setScroll(this.text);
              ui.qhly_fixTextSize(this.text);
              if (currentViewSkin.isLolBigLayout) {
                this.skinName = ui.create.div('.qh-page-skin-name', this.pageView);
              }
              this.skinBoard1 = ui.create.div('.qh-page-skinavatar1', this.pageView);
              this.skinBoard2 = ui.create.div('.qh-page-skinavatar2', this.pageView);
              this.skinBoard3 = ui.create.div('.qh-page-skinavatar3', this.pageView);
              this.skinCover1 = ui.create.div('.qh-page-skinavatarcover', this.skinBoard1);
              this.skinCover2 = ui.create.div('.qh-page-skinavatarcover', this.skinBoard2);
              this.skinCover3 = ui.create.div('.qh-page-skinavatarcover', this.skinBoard3);
              this.skin1 = ui.create.div('.qh-page-skinavatarpicture', this.skinCover1);
              this.skin1.classList.add('avatar');
              this.skin1.qhCover = this.skinCover1;
              this.skin1.qhBoard = this.skinBoard1;
              this.skin2 = ui.create.div('.qh-page-skinavatarpicture', this.skinCover2);
              this.skin2.qhCover = this.skinCover2;
              this.skin2.qhBoard = this.skinBoard2;
              this.skin2.classList.add('avatar');
              this.skin3 = ui.create.div('.qh-page-skinavatarpicture', this.skinCover3);
              this.skin3.qhCover = this.skinCover3;
              this.skin3.qhBoard = this.skinBoard3;
              this.skin3.classList.add('avatar');

              var setLock = function (m) {
                if (m) {
                  if (!this.qhCover.skinLock) {
                    this.qhCover.skinLock = ui.create.div('.qh-lock', this.qhCover);
                  }
                  this.qhCover.skinLock.show();
                } else {
                  if (this.qhCover.skinLock) {
                    this.qhCover.skinLock.hide();
                  }
                }
              };

              this.skin1.qh_setLock = setLock;
              this.skin2.qh_setLock = setLock;
              this.skin3.qh_setLock = setLock;

              if (state.pkg.isLutou || lib.config.qhly_lutou) {
                for (var i = 1; i <= 3; i++) {
                  var v = this['skin' + i];
                  v.classList.remove('qh-page-skinavatarpicture');
                  v.classList.add('qh-page-skinavatarpicture-lutou');
                }
              } else {
                for (var i = 1; i <= 3; i++) {
                  var v = this['skin' + i];
                  v.classList.remove('qh-page-skinavatarpicture-lutou');
                  v.classList.add('qh-page-skinavatarpicture');
                }
              }
              this.skinLevel1 = ui.create.div('.qh-page-skinavatarlevel', this.skinBoard1);
              this.skinLevel2 = ui.create.div('.qh-page-skinavatarlevel', this.skinBoard2);
              this.skinLevel3 = ui.create.div('.qh-page-skinavatarlevel', this.skinBoard3);
              this.skinLevel1.style.pointerEvents = 'none';
              this.skinLevel2.style.pointerEvents = 'none';
              this.skinLevel3.style.pointerEvents = 'none';

              this.skin1.classList.add('qh-not-replace');
              this.skin2.classList.add('qh-not-replace');
              this.skin3.classList.add('qh-not-replace');
              if (currentViewSkin.isQiLayout) {
                this.skinTitle1 = ui.create.div('.qh-page-skinavatartitle', this.skinCover1);
                this.skinTitle1.qhText = ui.create.div('.qh-page-skinavatartitle-text', this.skinTitle1);
                this.skinTitle2 = ui.create.div('.qh-page-skinavatartitle', this.skinCover2);
                this.skinTitle2.qhText = ui.create.div('.qh-page-skinavatartitle-text', this.skinTitle2);
                this.skinTitle3 = ui.create.div('.qh-page-skinavatartitle', this.skinCover3);
                this.skinTitle3.qhText = ui.create.div('.qh-page-skinavatartitle-text', this.skinTitle3);
                this.skin1.qhTitle = this.skinTitle1;
                this.skin2.qhTitle = this.skinTitle2;
                this.skin3.qhTitle = this.skinTitle3;
                this.skinTitle1.hide();
                this.skinTitle2.hide();
                this.skinTitle3.hide();
              }
              var that = this;
              this.skin1.listen(function () {
                that.onClickSkin(0, name, state);
              });
              this.skin2.listen(function () {
                that.onClickSkin(1, name, state);
              });
              this.skin3.listen(function () {
                that.onClickSkin(2, name, state);
              });
              this.leftArrow = ui.create.div('.qh-page-skin-leftarrow', this.pageView);
              this.rightArrow = ui.create.div('.qh-page-skin-rightarrow', this.pageView);
              this.leftArrow.listen(function () {
                if (currentViewSkin.isLolBigLayout) {
                  if (that.getSkinAt(0)) {
                    that.onClickSkin(0, name, state);
                  }
                } else if (that.currentIndex > 0) {
                  that.currentIndex--;
                  that.refresh(name, state);
                  game.qhly_playQhlyAudio('qhly_voc_press', null, true);
                }
              });
              this.rightArrow.listen(function () {
                if (currentViewSkin.isLolBigLayout) {
                  if (that.getSkinAt(2)) {
                    that.onClickSkin(2, name, state);
                  }
                } else if (that.currentIndex < that.skinList.length) {
                  that.currentIndex++;
                  that.refresh(name, state);
                  game.qhly_playQhlyAudio('qhly_voc_press', null, true);
                }
              });
              this.skinViews = [this.skinBoard1, this.skinBoard2, this.skinBoard3, this.skin1, this.skin2, this.skin3, this.leftArrow, this.rightArrow];
              this.hideButton = ui.create.div('.qh-hide-skin-button', this.pageView);
              this.hideButton.listen(function () {
                that.hideSkinMode = !that.hideSkinMode;
                that.refresh(name, state);
                game.qhly_playQhlyAudio('qhly_voc_press', null, true);
              });
              this.text.listen(function () {
                if (currentViewSkin.isLolBigLayout) return;
                if (that.consumeTextClick) {
                  that.consumeTextClick = false;
                  return;
                }
                if (!that.hideSkinMode) {
                  that.hideSkinMode = true;
                  that.refresh(name, state);
                }
              });
              game.qhly_changeViewPageSkin('skin', this.pageView);
              this.inited = true;
            }
          },
          config: {
            pageView: ui.create.div('.qh-page-config', view),
            refresh: function (name, state) {
              if (!this.inited) this.init(name, state);
            },
            init: function (name, state) {
              this.innerConfig = ui.create.div('.qh-page-config-text', this.pageView);
              ui.qhly_fixTextSize(this.innerConfig);
              var that = this;
              var content = "";
              content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('favouriteImage', 'extension/千幻聆音/image/newui_fav.png') + "' style='width:50px'/>收藏设置</h2>";
              content += "<p>可以选择收藏此武将。进行自由选将操作时，可以更快找到此武将。</p>";
              content += "<p><span style='display:inline-block;height:30px;'><img id='qhconfig_checkbox_fav'/><span id='qhconfig_checkbox_text_fav' style='display:inline-block;position:relative;bottom:25%;'>收藏" + get.translation(name) + "</span></span></p>";

              content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('forbidImage', 'extension/千幻聆音/image/newui_forbid.png') + "' style='width:50px'/>禁用设置</h2>";
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

              content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('rankImage', 'extension/千幻聆音/image/newui_rank_icon.png') + "' style='width:50px'/>等阶设置</h2>";
              content += "<p>可以设置" + get.translation(name) + "的等阶，重启后生效。</p>";
              content += "<p><select style='font-size:22px;font-family:'qh_youyuan';' id='qhconfig_rank_select'></select></p>";

              if (lib.config.qhly_enableCharacterMusic) {
                content += "<h2><img src='" + lib.assetURL + get.qhly_getCurrentViewSkinValue('musicImage', 'extension/千幻聆音/image/newui_music_icon.png') + "' style='width:50px'/>音乐设置</h2>";
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
              var bindFunc = function (checkbox, text) {
                if (!text) return;
                ui.qhly_addListenFunc(text);
                text.listen(function () {
                  game.qhly_playQhlyAudio('qhly_voc_check', null, true);
                  checkbox.qhly_setChecked(!checkbox.qhly_checked, true);
                });
              };
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
              var rankList = ['默认', '稀有', '史诗', '传说', '精品', '精良'];
              var rankToEng = {
                '默认': "default",
                '稀有': 'common',
                '史诗': "epic",
                '传说': "legend",
                '精品': 'rare',
                '精良': "junk",
              };
              var rankToIcon = {
                '默认': "",
                '稀有': 'A+',
                '史诗': "SS",
                '传说': "SSS",
                '精品': 'S',
                '精良': "A",
              };
              var rank = null;
              if (lib.config.qhly_rarity && lib.config.qhly_rarity[name]) {
                rank = lib.config.qhly_rarity[name];
              }
              for (var r of rankList) {
                var opt = document.createElement('option');
                opt.innerHTML = r + rankToIcon[r];
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
                  target = event.target;
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
                    target = event.target;
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
        subView.pageButton[page].setBackgroundImage(get.qhly_getIf(currentViewSkin.buttonPressedImage, 'extension/千幻聆音/image/newui_button_selected.png'));
        view.appendChild(subView.mp);
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
            if (lib.config.qhly_showrarity) {
              subView.rank.show();
              var rarity = game.getRarity(state.name);
              if (rarity) {
                subView.rank.setBackgroundImage('extension/千幻聆音/image/rarity_' + rarity + ".png");
              }
            } else {
              subView.rank.hide();
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
          state.useLihuiLayout(state.useLihui());
          for (var p in subView.page) {
            if (p == pagename) {
              subView.page[p].pageView.show();
            } else {
              subView.page[p].pageView.hide();
            }
          }
          for (var k in subView.pageButton) {
            if (k == pagename) {
              subView.pageButton[k].setBackgroundImage(get.qhly_getIf(currentViewSkin.buttonPressedImage, 'extension/千幻聆音/image/newui_button_selected.png'));
            } else {
              subView.pageButton[k].setBackgroundImage(get.qhly_getIf(currentViewSkin.buttonImage, 'extension/千幻聆音/image/newui_button.png'));
            }
          }
        };
        state.useLihui = function () {
          if (currentViewSkin.lihuiSupport && state.pkg.characterLihui) {
            var lihuiPath = state.pkg.characterLihui(name, lib.config.qhly_skinset.skin[name]);
            return lihuiPath;
          }
          return false;
        };
        state.useLihuiLayout = function (use) {
          if (use) {
            if (currentViewSkin.isLolBigLayout) {
              if (state.currentPage == 'skin') {
                //subView.rank.style.right="60px";
                if (lib.config.qhly_showrarity) {
                  subView.rank.hide();
                }
                subView.board.setBackgroundImage("extension/千幻聆音/theme/lolbig/newui_lol_bg_center_big.png");
                subView.avatar.style.right = "5%";
                subView.avatarImage.style.backgroundSize = "contain";
                subView.avatarImage.style.backgroundPosition = "100% 50%";
                subView.avatar.style.width = "calc(100%)";
                subView.avatar.style.transform = "";
              } else {
                //subView.rank.style.right="120px";
                if (lib.config.qhly_showrarity) {
                  subView.rank.show();
                }
                subView.board.setBackgroundImage("extension/千幻聆音/theme/lolbig/newui_lol_bg1_big.png");
                subView.avatar.style.right = "0";
                subView.avatarImage.style.backgroundSize = "contain";
                subView.avatarImage.style.backgroundPosition = "100% 50%";
                subView.avatar.style.width = "calc(100%)";
                subView.avatar.style.transform = "";
              }
            }
          } else {
            if (currentViewSkin.isLolBigLayout) {
              if (state.currentPage == 'skin') {
                //subView.rank.style.right="60px";
                if (lib.config.qhly_showrarity) {
                  subView.rank.hide();
                }
                subView.board.setBackgroundImage("extension/千幻聆音/theme/lolbig/newui_lol_bg_center_small.png");
                subView.avatar.style.right = "50%";
                subView.avatar.style.width = "calc(40%)";
                subView.avatarImage.style.backgroundSize = "cover";
                subView.avatarImage.style.backgroundPosition = "50% 50%";
                subView.avatar.style.transform = "translate(50%,0%)";
              } else {
                //subView.rank.style.right="120px";
                if (lib.config.qhly_showrarity) {
                  subView.rank.show();
                }
                subView.board.setBackgroundImage("extension/千幻聆音/theme/lolbig/newui_lol_bg1.png");
                subView.avatar.style.right = "0px";
                subView.avatar.style.width = "calc(50%)";
                subView.avatarImage.style.backgroundSize = "cover";
                subView.avatarImage.style.backgroundPosition = "50% 50%";
                subView.avatar.style.transform = "";
              }
            }
          }
        };
        for (var k in subView.pageButton) {
          (function (m) {
            subView.pageButton[m].listen(function () {
              if (subView.currentPage != m) {
                showPage(m);
                if (state.extraMenu) {
                  state.extraMenu.delete();
                  delete state.extraMenu;
                }
                game.qhly_playQhlyAudio('qhly_voc_press', null, true);
              } else if (m == 'introduce') {
                if (state.extraMenu) {
                  state.extraMenu.delete();
                  delete state.extraMenu;
                } else {
                  var extra = game.qhly_getIntroduceExtraPage(name, state.pkg);
                  if (extra) {
                    game.qhly_playQhlyAudio('qhly_voc_click2', null, true);
                    var arr = [{
                      name: '简介',
                      onchange: function () {
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
            if (currentViewSkin.isQiLayout) {
              subView.board.classList.remove('qh-window-backboard');
              subView.board.classList.add('qh-window-backboard-lutou');
            }
          } else {
            subView.avatarImage.classList.remove('qh-image-lutou');
            subView.avatarImage.classList.add('qh-image-standard');
            if (currentViewSkin.isQiLayout) {
              subView.board.classList.remove('qh-window-backboard-lutou');
              subView.board.classList.add('qh-window-backboard');
            }
          }
          if (currentViewSkin.lihuiSupport && state.pkg.characterLihui) {
            var lihuiPath = state.pkg.characterLihui(name, lib.config.qhly_skinset.skin[name]);
            if (lihuiPath) {
              subView.avatarImage.setBackgroundImage(lihuiPath);
              state.useLihuiLayout(true);
            } else {
              subView.avatarImage.setBackground(name, 'character');
              state.useLihuiLayout(false);
            }
          } else {
            subView.avatarImage.setBackground(name, 'character');
            state.useLihuiLayout(false);
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
            if (currentViewSkin.isQiLayout) {
              if (!lib.config.qhly_titlereplace || lib.config.qhly_titlereplace == 'title') {
                if (ctitle) {
                  subView.characterTitle.innerHTML = ctitle;
                } else {
                  subView.characterTitle.innerHTML = '';
                }
              } else if (lib.config.qhly_titlereplace == 'skin') {
                var skinName = game.qhly_getSkin(name);
                if (!skinName && ctitle) {
                  subView.characterTitle.innerHTML = ctitle;
                } else {
                  var ext = game.qhly_getSkinInfo(name, skinName);
                  if (ext) {
                    if (ext.translation) {
                      subView.characterTitle.innerHTML = ext.translation;
                    } else {
                      subView.characterTitle.innerHTML = game.qhly_earse_ext(skinName);
                    }
                  }
                }
              } else if (lib.config.qhly_titlereplace == 'pkg') {
                var pname = game.qhly_getCharacterPackage(name);
                if (pname) {
                  subView.characterTitle.innerHTML = get.translation(pname + "_character_config");
                }
              }
            } else {
              subView.characterTitle.innerHTML = get.qhly_verticalStr(lib.qhly_filterPlainText(ctitle));
            }
          };
          state.onChangeSkin();
          var group = state.intro[1];
          if (get.is.double(state.name) && (currentViewSkin.isQiLayout || currentViewSkin.isLolBigLayout)) {
            subView.group.hide();
            subView.doublegroup.show();
            var groups = get.is.double(state.name, true);
            subView.doublegroupA.innerHTML = get.translation(groups[0]);
            subView.doublegroupB.innerHTML = get.translation(groups[1]);
          } else if (group) {
            if (subView.doublegroup) {
              subView.doublegroup.hide();
            }
            subView.group.show();
            if (currentViewSkin.isQiLayout || currentViewSkin.isLolBigLayout) {
              if (currentViewSkin.isLolBigLayout) {
                if (lib.qhly_groupimage[group]) {
                  var groupHtml = "<img style='display:block;position:absolute;width:65%;height:65%;left:50%;top:50%;transform:translate(-50%,-50%);' ";
                  groupHtml += "src='" + lib.assetURL + lib.qhly_groupimage[group] + "'/>";
                  subView.group.innerHTML = groupHtml;
                } else {
                  var groupHtml = "<b>";
                  groupHtml += get.translation(group) + "</b>";
                  subView.group.innerHTML = groupHtml;
                }
              } else {
                subView.group.innerHTML = get.translation(group);
              }
            } else {
              if (lib.qhly_groupimage[group]) {
                subView.group.innerHTML = "";
                subView.group.setBackgroundImage(lib.qhly_groupimage[group]);
              } else {
                subView.group.setBackgroundImage('');
                subView.group.innerHTML = get.translation(group);
                if (lib.qhly_groupcolor[group]) {
                  subView.group.style.color = lib.qhly_groupcolor[group];
                } else {
                  subView.group.style.color = 'yellow';
                }
              }
            }
          }
          refreshRank();
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
          if (currentViewSkin.isQiLayout) {
            subView.name.innerHTML = chname;
          } else {
            var vname = get.qhly_verticalStr(chname);
            subView.name.innerHTML = vname;
          }
          if (!currentViewSkin.isQiLayout && !currentViewSkin.isLolBigLayout) {
            if (lib.qhly_groupcolor[group]) {
              subView.name.style.textShadow = "2px 2px 2px " + lib.qhly_groupcolor[group];
            } else {
              subView.name.style.textShadow = "2px 2px 2px #FFFF00";
            }
          }
          if (chname.length == 5) {
            subView.name.style.fontSize = '2.6em';
          } else if (chname.length >= 6) {
            subView.name.style.fontSize = '2.4em';
          } else {
            subView.name.style.fontSize = '2.8em';
          }
          var hp = state.intro[2];
          if (currentViewSkin.isQiLayout || currentViewSkin.isLolBigLayout) {
            while (subView.hp.hasChildNodes()) {
              subView.hp.removeChild(subView.hp.lastChild);
            }
            if (typeof hp == 'number') {
              if (!isFinite(hp)) {
                subView.hp.appendChild(ui.create.div('.qh-hpimg'));
                var hptext = ui.create.div('.qh-hptext');
                subView.hp.appendChild(hptext);
                hptext.innerHTML = "×" + (currentViewSkin.isLolBigLayout ? "<br>" : "") + "∞";
                if (currentViewSkin.isQiLayout) {
                  hptext.style.left = "calc(12.83%)";
                } else if (currentViewSkin.isLolBigLayout) {
                  hptext.style.top = "44px";
                }
              } else {
                if (hp <= 6) {
                  for (var i = 0; i < hp; i++) {
                    var img = ui.create.div('.qh-hpimg');
                    if (currentViewSkin.isQiLayout) {
                      img.style.left = "calc(" + (i * 12.83) + "%)";
                    } else if (currentViewSkin.isLolBigLayout) {
                      img.style.top = (i * 44) + "px";
                    }
                    subView.hp.appendChild(img);
                  }
                } else {
                  subView.hp.appendChild(ui.create.div('.qh-hpimg'));
                  var hptext = ui.create.div('.qh-hptext');
                  if (currentViewSkin.isQiLayout) {
                    hptext.style.left = "calc(12.83%)";
                  } else if (currentViewSkin.isLolBigLayout) {
                    hptext.style.top = "44px";
                  }
                  subView.hp.appendChild(hptext);
                  hptext.innerHTML = "×" + (currentViewSkin.isLolBigLayout ? "<br>" : "") + hp;
                }
              }
            } else if (typeof hp == 'string') {
              var index = hp.indexOf("/");
              if (index >= 0) {
                var hp1 = get.infoHp(hp);
                var hp2 = get.infoMaxHp(hp);
                var hujia = get.infoHujia(hp);
                if (isNaN(hp1) || isNaN(hp2)) {
                  subView.hp.appendChild(ui.create.div('.qh-hpimg'));
                  var hptext = ui.create.div('.qh-hptext');
                  if (currentViewSkin.isQiLayout) {
                    hptext.style.left = "calc(12.83%)";
                  } else if (currentViewSkin.isLolBigLayout) {
                    hptext.style.top = "44px";
                  }
                  subView.hp.appendChild(hptext);
                  hptext.innerHTML = "×" + (currentViewSkin.isLolBigLayout ? "<br>" : "") + hp;
                } else {
                  if (hp2 >= 6) {
                    subView.hp.appendChild(ui.create.div('.qh-hpimg'));
                    var hptext = ui.create.div('.qh-hptext');
                    if (currentViewSkin.isQiLayout) {
                      hptext.style.left = "calc(12.83%)";
                    } else {
                      hptext.style.top = "44px";
                    }
                    subView.hp.appendChild(hptext);
                    var br = (currentViewSkin.isLolBigLayout ? "<br>" : "");
                    hptext.innerHTML = "×" + br + hp1 + br + '/' + br + hp2;
                    if (hujia) {
                      var hujiaDiv = ui.create.div('.qh-hujiaimg');
                      if (currentViewSkin.isQiLayout) {
                        hujiaDiv.style.left = "calc(-12.83%)";
                      } else if (currentViewSkin.isLolBigLayout) {
                        hujiaDiv.style.top = "-44px";
                      }
                      var hujiaInfo = ui.create.div('.qh-hujiaimg-inner');
                      hujiaDiv.appendChild(hujiaInfo);
                      hujiaInfo.innerHTML = '' + hujia;
                      subView.hp.appendChild(hujiaDiv);
                    }
                  } else {
                    for (var i = 0; i < hp2; i++) {
                      var img = ui.create.div('.qh-hpimg');
                      if (currentViewSkin.isQiLayout) {
                        img.style.left = "calc(" + (i * 12.83) + "%)";
                      } else if (currentViewSkin.isLolBigLayout) {
                        img.style.top = (i * 44) + "px";
                      }
                      subView.hp.appendChild(img);
                      if (i >= hp1) {
                        if (currentViewSkin.isQiLayout) {
                          img.setBackgroundImage('extension/千幻聆音/theme/shuimo/newui_shuimo_hpimg_gray.jpg');
                        } else if (currentViewSkin.isLolBigLayout) {
                          img.setBackgroundImage('extension/千幻聆音/theme/lolbig/newui_lol_hpimg_gray.png');
                        }
                      }
                    }
                    if (hujia) {
                      if (hujia + hp2 <= 6) {
                        for (var i = hp2; i < hujia + hp2; i++) {
                          var img = ui.create.div('.qh-hujiaimg');
                          if (currentViewSkin.isQiLayout) {
                            img.style.left = "calc(" + (i * 12.83) + "%)";
                          } else if (currentViewSkin.isLolBigLayout) {
                            img.style.top = (i * 44) + "px";
                            img.style.width = "50.453px";
                            img.style.height = '44px';
                          }
                          subView.hp.appendChild(img);
                        }
                      } else {
                        var hujiaDiv = ui.create.div('.qh-hujiaimg');
                        if (currentViewSkin.isQiLayout) {
                          hujiaDiv.style.left = "calc(" + (i * 12.83) + "%)";
                        } else if (currentViewSkin.isLolBigLayout) {
                          hujiaDiv.style.top = (i * 44) + "px";
                          hujiaDiv.style.width = "50.453px";
                          hujiaDiv.style.height = '44px';
                        }
                        var hujiaInfo = ui.create.div('.qh-hujiaimg-inner');
                        hujiaDiv.appendChild(hujiaInfo);
                        hujiaInfo.innerHTML = '' + hujia;
                        subView.hp.appendChild(hujiaDiv);
                      }
                    }
                  }
                }
              } else {
                subView.hp.appendChild(ui.create.div('.qh-hpimg'));
                var hptext = ui.create.div('.qh-hptext');
                hptext.style.left = "calc(12.83%)";
                subView.hp.appendChild(hptext);
                hptext.innerHTML = "×" + (currentViewSkin.isLolBigLayout ? "<br>" : "") + hp;
              }
            }
            while (subView.mp.hasChildNodes()) {
              subView.mp.removeChild(subView.hp.lastChild);
            }
            var mp = get.qhly_getMp(state.name, state.pkg);
            if (mp === null || mp === undefined) {
              subView.mp.hide();
            } else {
              subView.mp.show();
              if (mp <= 6) {
                for (var i = 0; i < mp; i++) {
                  var img = ui.create.div('.qh-mpimg');
                  if (currentViewSkin.isQiLayout) {
                    img.style.left = "calc(" + (i * 12.83) + "%)";
                  } else if (currentViewSkin.isLolBigLayout) {
                    img.style.top = (i * 44) + 'px';
                  }
                  subView.mp.appendChild(img);
                }
              } else {
                subView.mp.appendChild(ui.create.div('.qh-mpimg'));
                var mptext = ui.create.div('.qh-mptext');
                subView.mp.appendChild(mptext);
                mptext.innerHTML = "×" + (currentViewSkin.isLolBigLayout ? "<br>" : "") + mp;
              }
            }
          } else {
            if (typeof hp == 'number' && !isFinite(hp)) {
              hp = '∞';
            }
            if (!get.infoHujia(hp)) {
              subView.hpText.innerHTML = hp + '';
            } else {
              var str = '';
              if (get.infoHp(hp) != get.infoMaxHp(hp)) {
                str = get.infoHp(hp) + '/' + get.infoMaxHp(hp);
              } else {
                str = get.infoMaxHp(hp) + '';
              }
              str += "&nbsp;&nbsp;&nbsp;<img style='height:40px;weight:40px;' src='" + lib.qhly_path + "image/qhly_hudun.png'/>";
              if (get.infoHujia(hp) > 1) {
                str += ("x" + get.infoHujia(hp));
              }
              subView.hpText.innerHTML = str;
              subView.hpText.style.left = "calc(30%)";
            }
            var mp = get.qhly_getMp(state.name, state.pkg);
            if (mp === null || mp === undefined) {
              subView.mp.hide();
            } else {
              subView.mp.show();
              subView.mpText.innerHTML = mp + "";
            }
          }
        };
        refreshView(state, subView);
        game.qhly_changeViewSkin(subView);
        showPage(page);
      };
      game.qhly_open = function (name, page, ingame) {
        if (name.indexOf('gz_') == 0) {
          if (lib.config.qhly_guozhan === false || get.mode() != 'guozhan' || !game.qhly_hasGuozhanSkin(name)) {
            name = name.slice(3);
          }
        }
        if (lib.config.qhly_newui !== false && (lib.config.qhly_currentViewSkin != 'jingdian')) {
          game.qhly_open_new(name, page ? page : 'skin', ingame);
          return;
        }
        //game.pause();
        if (!lib.config.qhly_huaijiu_mentioned) {
          alert("【经典怀旧】UI套装已经停止维护，如果需要更好的UI体验，建议切换到别的UI套装。");
          game.saveConfig('qhly_huaijiu_mentioned', true);
        }
        var background = ui.create.div('.qhly-chgskin-background', document.body);
        background.animate('start');
        var avatar = ui.create.div('.qhly-skin', background);
        //avatar.setBackground(name,'character');
        avatar.hide();
        ui.create.div('.qhly-biankuang', avatar);
        var belowTitle = ui.create.div('.qhly-belowtitle', avatar);
        belowTitle.innerHTML = get.translation(name);
        var headTitle = ui.create.div('.qhly-headtitle', avatar);
        headTitle.innerHTML = "标准皮肤";
        var leftArrow = ui.create.div('.qhly-leftbutton', avatar);
        var rightArrow = ui.create.div('.qhly-rightbutton', avatar);
        var okButton = ui.create.div('.qhly-okbutton', avatar);
        var infobk = ui.create.div('.qhly-text-bk', background);
        var infoText = ui.create.div('.qhly-text', infobk);
        var levelText = ui.create.div('.qhly-level', avatar);
        var viewAbstract = {
          skin: lib.config.qhly_skinset.skin[name],
          index: 0,
          skinCount: 1,
          skinList: [false],
          //refreshing:false,
        };
        okButton.listen(function () {
          game.qhly_setCurrentSkin(name, viewAbstract.skin, undefined, true);
          //game.resume();
          background.delete();
        });
        var refreshView = function (name, viewAbstract) {
          avatar.show();
          _status.qhly_viewRefreshing = true;
          game.qhly_setCurrentSkin(name, viewAbstract.skin, function () {
            _status.qhly_viewRefreshing = false;
          }, true);
          //viewAbstract.refreshing = true;
          if (viewAbstract.skin) {
            avatar.setBackgroundImage(game.qhly_getSkinFile(name, viewAbstract.skin));
          } else {
            avatar.setBackground(name, 'character');
          }
          if (viewAbstract.index == 0) {
            leftArrow.hide();
          } else {
            leftArrow.show();
          }
          if (viewAbstract.index >= viewAbstract.skinCount - 1) {
            rightArrow.hide();
          } else {
            rightArrow.show();
          }
          var sname;
          if (viewAbstract.skin) {
            sname = game.qhly_getSkinName(name, viewAbstract.skin, null);
          } else {
            sname = "标准皮肤";
          }
          headTitle.innerHTML = sname;
          var info = game.qhly_getSkinInfo(name, viewAbstract.skin, null);
          if (viewAbstract.skin) {
            var title;
            if (lib.qhly_level[name + "_" + viewAbstract.skin]) {
              title = lib.qhly_level[name + "_" + viewAbstract.skin];
            }
            if (!title || title.length == 0) {
              title = info.level ? info.level : info.title;
            }
            if (title) {
              levelText.show();
              if (['精品', '史诗', '传说', '限定'].contains(title)) {
                var obj = {
                  '精品': 'jingpin',
                  '史诗': 'shishi',
                  '传说': 'chuanshuo',
                  '限定': 'xianding'
                };
                levelText.innerHTML = '';
                levelText.setBackgroundImage('extension/千幻聆音/image/level_' + obj[title] + ".png");
              } else {
                levelText.innerHTML = title;
                levelText.setBackgroundImage('');
              }
            } else {
              levelText.hide();
            }
          } else {
            levelText.hide();
          }
          var str = "技能语音：<br><br>";
          if (!window.qhly_audio_which) {
            window.qhly_audio_which = {};
          }
          var skills = get.character(name, 3).slice(0);
          if (skills) {
            skills.remove('xwjh_audiozhenwang');
            for (var skill of skills) {
              var infoString = "";
              window.qhly_audio_which[skill] = 1;
              infoString += "【";
              infoString += get.translation(skill);
              infoString += "】";
              if (window.qhly_TrySkillAudio) {
                infoString += "<a style='color:#ffffff' href=\"javascript:window.qhly_TrySkillAudio('" + skill + "',{name:'" + name + "'},null,window.qhly_audio_which[\'" + skill + "\'],\'" + viewAbstract.skin + "\');window.qhly_audio_which[\'" + skill + "\']++;\"><img style=height:22px src=" + lib.assetURL + get.qhly_getCurrentViewSkinValue('skinPagePlayAudioButtonImage', 'extension/千幻聆音/image/qhly_pic_playaudiobutton.png') + "></a><br>";
              }
              infoString += "<br><br>";
              str += infoString;
            }
          }
          str += "【阵亡】";
          str += "<a style='color:#ffffff' href=\"javascript:window.qhly_playDieAudio(\'" + name + "\');\"><img style=height:22px src=" + lib.qhly_path + "image/qhly_pic_playaudiobutton.png></a><br>";
          if (info.info) {
            str += info.info;
          }
          if (!viewAbstract.skin) {
            str += get.qhly_characterInfo(name);
          }
          infoText.innerHTML = str;
          lib.setScroll(infoText);
        };
        var finishView = function (name, viewAbstract) {
          refreshView(name, viewAbstract);
          leftArrow.listen(function () {
            viewAbstract.index--;
            if (viewAbstract.index <= 0) {
              viewAbstract.index = 0;
            }
            if (viewAbstract.index >= viewAbstract.skinCount - 1) {
              viewAbstract.index = viewAbstract.skinCount - 1;
            }
            viewAbstract.skin = viewAbstract.skinList[viewAbstract.index];
            refreshView(name, viewAbstract);
          });
          rightArrow.listen(function () {
            viewAbstract.index++;
            if (viewAbstract.index <= 0) {
              viewAbstract.index = 0;
            }
            if (viewAbstract.index >= viewAbstract.skinCount - 1) {
              viewAbstract.index = viewAbstract.skinCount - 1;
            }
            viewAbstract.skin = viewAbstract.skinList[viewAbstract.index];
            refreshView(name, viewAbstract);
          });
          levelText.listen(function () {
            background.delete();
            var string = "请输入皮肤的等级";
            if (levelText.innerHTML) {
              string = "###" + string + "###" + levelText.innerHTML;
            }
            game.prompt(string, false, function (str) {
              lib.qhly_level[name + "_" + viewAbstract.skin] = str;
              game.saveConfig('qhly_level', lib.qhly_level);
              game.qhly_open(name);
            });
          });
        };
        game.qhly_getSkinList(name, function (success, skinList) {
          if (!success) {
            viewAbstract.skinCount = 1;
            viewAbstract.skinList = [false];
            viewAbstract.skin = false;
            viewAbstract.index = 0;
            finishView(name, viewAbstract);
            return;
          } else {
            viewAbstract.skinCount = 1 + skinList.length;
            viewAbstract.skinList = [false];
            viewAbstract.skinList.addArray(skinList);
            if (viewAbstract.skin) {
              for (var i = 0; i < viewAbstract.skinList.length; i++) {
                if (viewAbstract.skinList[i] == viewAbstract.skin) {
                  viewAbstract.index = i;
                  break;
                }
              }
            } else {
              viewAbstract.index = 0;
            }
            finishView(name, viewAbstract);
          }
        }, false, true);
      };

      //修改人物卡片界面，显示换肤按钮。
      var originCharacterCardFunciton = ui.click.charactercard;
      var replaceCharacterCardFunction = function () {
        var clickListener = function () {
          if (arguments[1]) {
            _status.qh_sourceNode = arguments[1];
            _status.qh_sourceNodeName = arguments[0];
          } else {
            delete _status.qh_sourceNode;
          }
          if (arguments[4]) {
            if (lib.config.qhly_replaceCharacterCard2 == 'window') {
              game.resume2();
              game.qhly_open_small(arguments[0], null, arguments[4]);
            } else if (lib.config.qhly_currentViewSkin != 'jingdian') {
              game.qhly_open_new(arguments[0], lib.config.qhly_doubledefaultpage ? lib.config.qhly_doubledefaultpage : 'skill', arguments[4]);
            } else {
              game.qhly_open(arguments[0]);
            }
          } else {
            if (lib.config.qhly_currentViewSkin != 'jingdian') {
              game.qhly_open_new(arguments[0], lib.config.qhly_listdefaultpage ? lib.config.qhly_listdefaultpage : 'introduce');
            } else {
              game.qhly_open(arguments[0]);
            }
          }
        };
        if (lib.config.qhly_replaceCharacterCard2 != 'nonereplace' && lib.config.qhly_replaceCharacterCard2 != 'nonereplace2') {
          clickListener.apply(null, arguments);
        } else {
          originCharacterCardFunciton.apply(this, arguments);
          var name = arguments[0];
          var pastArg = arguments;
          if (ui.window.lastChild && ui.window.lastChild.lastChild) {
            var layer = ui.window.lastChild;
            var largeButton = ui.create.div('.qhly-skin-button', ui.window.lastChild.lastChild);
            largeButton.addEventListener('click', function () {
              clickListener.apply(null, pastArg);
              layer.click();
            });
          }
        }
      };
      if (lib.config.qhly_replaceCharacterCard2 != 'nonereplace2') {
        if (Object.defineProperty) {
          Object.defineProperty(ui.click, 'charactercard', {
            get: function () {
              return replaceCharacterCardFunction;
            },
            set: function (value) {
              if (!lib.config.qhly_mentionConflitCC) {
                alert("你安装的扩展中，有扩展试图修改ui.click.charactercard，此行为与《千幻聆音》冲突，你可以关闭有冲突的功能。");
                /*var ret = confirm("你安装的扩展中，有扩展试图修改ui.click.charactercard，此行为与《千幻聆音》冲突，你可以关闭有冲突的功能。若你点击【取消】，将不再对此消息进行提示。");
                if (!ret) {*/
                  game.saveConfig('qhly_mentionConflitCC', true);
                //}
              }
            },
            enumerable: true,
            configurable: true,
          });
        } else {
          ui.click.charactercard = replaceCharacterCardFunction;
        }
      }

      //修改人物信息界面，添加换肤按钮。
      /*
      var normalNodeIntro = get.nodeintro;
      get.nodeintro=function(node,simple,evt){
          var ret = normalNodeIntro.apply(this,arguments);
          if(!ret)return ret;
          if(node.classList.contains('player') && !node.name){
              return ret;
          }
          if(node.name){
              if(get.character(node.name)){
                  var zhu = ui.create.div('.qhly-skin-intro-button-zhu',ret);
                  zhu.innerHTML = "<img style=width:30px src="+lib.assetURL+"extension/千幻聆音/qhly_skin_bt1.png>";
                  zhu.listen(function(){
                      game.qhly_open(node.name);
                  });
              }
          }
          if(node.name2 && get.character(node.name2)){
              var fu = ui.create.div('.qhly-skin-intro-button-fu',ret);
              fu.innerHTML = "<img style=width:30px src="+lib.assetURL+"extension/千幻聆音/qhly_skin_bt2.png>";
              fu.listen(function(){
                  game.qhly_open(node.name2);
              });
          }
          return ret;
      };*/

      //自动换肤逻辑。
      game.qhly_autoChangeSkin = function () {
        var offline=sessionStorage.getItem('Network');
		if(!offline) offline='online';
		if (offline=='offline'&&lib.config.qhly_autoChangeSkin=='random') return;
        if (lib.config.qhly_autoChangeSkin && lib.config.qhly_autoChangeSkin != 'close') {
          _status.qhly_changeSkinFunc = function () {
            if (game && game.players && game.players.length) {
              var pls = game.players.slice(0);
              if(pls.contains(game.me)) pls.remove(game.me);
              var names = [];
              for (var p of pls) {
                if (p.name1) names.push(p.name1);
                if (p.name2) names.push(p.name2);
              }
              names.randomSort();
              var func = function (arr, f) {
                if (arr.length == 0) return;
                var n = arr.shift();
                game.qhly_getSkinList(n, function (ret, list) {
                  if (list && list.length) {
                    var sk = game.qhly_getSkin(n);
                    var players = game.players.concat(game.dead);
                    var player;
                    for (var p of players) {
                      if (p.name1 == n || p.name2 == n) player = p;
                    }
                    var player = game.filterPlayer(function (c) { return c.name1 == n || c.name2 == n })[0];
                    if (list.contains(sk)) {
                      list.remove(sk);
                    }
                    if (sk) {
                      list.push(false);
                    }
                    list = list.filter(function (current) {
                      return !game.qhly_skinIsBanned(n, current);
                    });
                    list = list.filter(function (current) {
                      return current.toString().indexOf('娘化')==-1&&current.toString().indexOf('云涯')==-1;
                    });
                    if (list.length == 0) {
                      f(arr, f);
                      return;
                    }
                    //game.me.say(get.translation(n)+sk+"....."+get.translation(list));
                    if (!_status.qhly_open && !_status.bigEditing && !_status.qhly_playerWindowing) game.qhly_setCurrentSkin(n, list.randomGet(), function () {
                      game.qhly_changeDynamicSkin(n);
                      if (player && lib.config['extension_千幻聆音_qhly_decadeChangeEffect'] && (lib.config.qhly_currentViewSkin == 'decade' || lib.config.qhly_currentViewSkin == 'shousha')) player.playChangeSkinEffect(player.name2 && player.name2 == n);
                    }, true);
                    game.qhly_autoChangeSkin();
                  } else {
                    f(arr, f);
                  }
                }, false);

              };
              func(names, func);
            }
          };
          if(lib.config.qhly_autoChangeSkin=='random') {
            var timenum=[10,30,60,90,120,180,300].randomGet();
          }else {
            var timenum=lib.config.qhly_autoChangeSkin;
          }
          setTimeout(_status.qhly_changeSkinFunc, parseInt(timenum) * 1000);
        }
      };
      game.qhly_createSilder = function (min, max, value) {
        //此方法代码来自十周年UI。
        var slider = document.createElement('input');
        var onchange = function () {
          var percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
          slider.style.backgroundSize = percent + '% ' + '100%';
        };
        slider.style.width = "100%";
        var valueProp = Object.getOwnPropertyDescriptor(slider.__proto__, 'value');
        Object.defineProperties(slider, {
          value: {
            configurable: true,
            get: function () {
              return valueProp.get.call(this);
            },
            set: function (value) {
              valueProp.set.call(this, value);
              onchange();
            }
          }
        });
  
        slider.className = 'slider';
        slider.type = 'range';
        slider.addEventListener('input', onchange);
  
        slider.min = (typeof min == 'number') ? min : 0;
        slider.max = (typeof max == 'number') ? max : 100;
        slider.value = (typeof value == 'number') ? value : ((max - min) * 0.5);
        return slider;
      };
      game.qhly_openVolumnDialog = function(key){
        if(!key){
          alert("取键值发生错误。");
          return;
        }
        try{
          var dialog = ui.create.div('.qh-editdialog');
          if (lib.config.qhly_currentViewSkin == 'decade') dialog.classList.add('decade')
          var content = ui.create.div('.qh-editdialog-inner', dialog);
          var below = ui.create.div('.qh-editdialog-below', dialog);
          var htmlContent = "<h2>"+"音量设置"+"</h2>";
          htmlContent += "<span id='qh_editdialog_slider' style='width:100%;'></span>"
          var fn = key.slice(key.indexOf("/",-1));
          htmlContent += "<br>你可以为此技能设置其音量，仅对此技能有效。<br>文件名："+fn;
          content.innerHTML = htmlContent;
          var belowButton = "";
          belowButton += '<img src="' + lib.qhly_path + 'image/qhly_ok2.png" id="qh_volumn_edit_okbutton"/>';
          below.innerHTML = belowButton;
          document.body.append(dialog);
          var sliderP = document.getElementById('qh_editdialog_slider');
          var vol = lib.config.volumn_audio;
          if(lib.config.qhly_volumnAudio && lib.config.qhly_volumnAudio[key]){
            vol = lib.config.qhly_volumnAudio[key];
          }
          if(typeof vol != 'number'){
            vol = parseInt(vol);
          }
          if(!isNaN(vol)){
            vol = 4;
          }
          var slider = game.qhly_createSilder(0,8,vol);
          sliderP.appendChild(slider);
          slider.onchange=function(){
            if(!lib.config.qhly_volumnAudio){
              lib.config.qhly_volumnAudio = {};
            }
            lib.config.qhly_volumnAudio[key] = slider.value;
            game.saveConfig('qhly_volumnAudio',lib.config.qhly_volumnAudio);
          };
          var img1 = document.getElementById('qh_volumn_edit_okbutton');
          ui.qhly_addListenFunc(img1);
          img1.listen(function(){
            dialog.delete();
          });
        }catch(e){
          alert(e);
        }
      };
      lib.skill._qhly_autoc = {
        forced: true,
        popup: false,
        trigger: {
          global: 'gameStart',
        },
        filter: function (event, player) {
          return !_status.qhly_autoChangeSkinSetted && lib.config.qhly_autoChangeSkin && lib.config.qhly_autoChangeSkin != 'close';
        },
        content: function () {
          _status.qhly_autoChangeSkinSetted = true;
          game.qhly_autoChangeSkin();
        }
      };
      if(lib.config.qhly_randskin === undefined) {
          lib.config.qhly_randskin=true;
          game.saveConfig('extension_千幻聆音_qhly_randskin', true);
          game.saveConfig('qhly_randskin', true);
      }
      lib.skill._qhly_randskin = {
        forced: true,
        popup: false,
        //Helasisy修，调整一下发动时机，防止皮肤错位
        priority: -Infinity,
        lastDo: true,
        trigger: {
          global: 'gameStart',
        },
        filter: function (event, player) {
          if(lib.config['extension_千幻聆音_qhly_randskin_me']&&player==game.me) return false;
          return lib.config.qhly_randskin;
        },
        content: function () {
          if (player.name || player.name1) {
            game.qhly_getSkinList((player.name&&player.name!='unknown') ? player.name : player.name1, function (ret, list) {
              if (list && list.length) {
                list.push(false);
                list = list.filter(function (current) {
                  return !game.qhly_skinIsBanned((player.name&&player.name!='unknown') ? player.name : player.name1, current);
                });
                list = list.filter(function (current) {
                  return current.toString().indexOf('娘化')==-1&&current.toString().indexOf('云涯')==-1;
                });
                if (list && list.length)
                  game.qhly_setCurrentSkin((player.name&&player.name!='unknown') ? player.name : player.name1, list.randomGet(), undefined, true);
              }
            }, false);
          }
          if (player.name2) {
            game.qhly_getSkinList(player.name2, function (ret, list) {
              if (list && list.length) {
                list.push(false);
                list = list.filter(function (current) {
                  return !game.qhly_skinIsBanned(player.name2, current);
                });
                if (list && list.length)
                  game.qhly_setCurrentSkin(player.name2, list.randomGet(), undefined, true);
              }
            }, false);
          }
        }
      };
      lib.qhly_relativePos = function (pos1, pos2) {
        return {
          x: pos2.x - pos1.x,
          y: pos2.y - pos1.y
        };
      };
      lib.qhly_addPos = function (pos1, pos2) {
        return {
          x: pos1.x + pos2.x,
          y: pos1.y + pos2.y
        };
      };
      game.qhly_addDrag = function (button, parent, dragCallback) {
        var state = {};
        button.style.transition = 'transform 0s';
        var boundControl = function (pos) {
          var rect = game.qhly_handleRect(parent.getBoundingClientRect());
          var rectb = game.qhly_handleRect(button.getBoundingClientRect());
          var x = pos.x;
          var y = pos.y;
          if (x < rect.left) {
            x = rect.left;
          }
          if (x + rectb.width > rect.left + rect.width) {
            x = rect.left + rect.width - rectb.width;
          }
          if (y < rect.top) {
            y = rect.top;
          }
          if (y + rectb.height > rect.top + rect.height) {
            y = rect.top + rect.height - rectb.height;
          }
          return { x: x, y: y };
        };
        var onMouseDown = function (event) {
          var pos = lib.qhly_getEventPosition(event);
          state.originPos = pos;
          var rect = game.qhly_handleRect(button.getBoundingClientRect());
          state.originButtonPos = { x: rect.left, y: rect.top };
          state.isDragging = true;
        };
        var onMouseMove = function (event) {
          if (state.isDragging) {
            state.moved = true;
            var pos = lib.qhly_getEventPosition(event);
            var cpos = lib.qhly_relativePos(state.originPos, pos);
            var npos = lib.qhly_addPos(cpos, state.originButtonPos);
            npos = boundControl(npos);
            var rect = game.qhly_handleRect(parent.getBoundingClientRect());
            var fpos = lib.qhly_relativePos({ x: rect.left, y: rect.top }, npos);
            button.style.left = fpos.x.toFixed(2) + 'px';
            button.style.top = fpos.y.toFixed(2) + 'px';
            button.style.bottom = '';
            button.style.right = '';
          }
        };
        var onMouseUp = function (event) {
          if (state.isDragging) {
            if (state.moved) {
              var pos = lib.qhly_getEventPosition(event);
              var cpos = lib.qhly_relativePos(state.originPos, pos);
              var npos = lib.qhly_addPos(cpos, state.originButtonPos);
              npos = boundControl(npos);
              var rect = game.qhly_handleRect(parent.getBoundingClientRect());
              var fpos = lib.qhly_relativePos({ x: rect.left, y: rect.top }, npos);
              button.style.left = fpos.x.toFixed(2) + 'px';
              button.style.top = fpos.y.toFixed(2) + 'px';
              button.style.bottom = '';
              button.style.right = '';
              delete state.moved;
              button.qhly_moveTime = (new Date()).valueOf();
              if (dragCallback) {
                dragCallback({ left: button.style.left, top: button.style.top, bottom: '', right: '' }, button);
              }
            }
          }
          delete state.isDragging;
        }
        if (lib.config.touchscreen) {
          button.addEventListener('touchstart', onMouseDown);
          button.addEventListener('touchend', onMouseUp);
          button.addEventListener('touchcancel', onMouseUp);
          button.addEventListener('touchmove', onMouseMove);
        } else {
          button.addEventListener('mousedown', onMouseDown);
          button.addEventListener('mouseup', onMouseUp);
          button.addEventListener('mouseleave', onMouseUp);
          button.addEventListener('mousemove', onMouseMove);
        }
      };
      lib.skill._qhly_addButton = {
        forced: true,
        popup: false,
        trigger: {
          global: 'gameStart',
        },
        filter: function (event, player) {
          return lib.config.qhly_skinButton;
        },
        content: function () {
          var dragCallback = function (style, node) {
            if (lib.config.qhly_dragButtonPosition !== 'no') {
              var arr = game.qhly_getAllButtons();
              for (var bt of arr) {
                for (var s in style) {
                  bt.style[s] = style[s];
                }
              }
              game.saveConfig('qhly_dragButtonPositionAll', style);
            } else {
              var key = 'qhly_dragButtonPositionOf_' + node.qhly_chname;
              var skin = game.qhly_getSkin(node.qhly_chname);
              if (skin) {
                key = key + '_' + skin;
              }
              game.saveConfig(key, style);
            }
          };
          if (player.name1 || player.name) {
            var button = ui.create.div('.qhly_skinplayerbutton', player.node.avatar);
            button.qhly_chname = player.name1 ? player.name1 : player.name;
            if (lib.config.qhly_dragButtonPosition !== 'no') {
              if (lib.config.qhly_dragButtonPositionAll) {
                for (var s in lib.config.qhly_dragButtonPositionAll) {
                  button.style[s] = lib.config.qhly_dragButtonPositionAll[s];
                }
              }
            } else {
              var key = 'qhly_dragButtonPositionOf_' + button.qhly_chname;
              var skin = game.qhly_getSkin(button.qhly_chname);
              if (skin) {
                key = key + '_' + skin;
              }
              if (lib.config[key]) {
                for (var s in lib.config[key]) {
                  button.style[s] = lib.config[key][s];
                }
              }
            }
            player.node.qhly_skinButton1 = button;
            button.listen(function () {
              if (button.qhly_moveTime) {
                var ctime = (new Date()).valueOf();
                if (ctime - button.qhly_moveTime <= 500) {
                  return;
                }
              }
              if (player.isUnseen(0) && player != game.me) return;
              if (lib.config.qhly_smallwiningame) {
                game.qhly_open_small(player.name1 ? player.name1 : player.name, player, player);
              } else {
                game.qhly_open(player.name1 ? player.name1 : player.name, 'skin', player);
              }
            });
            if (lib.config.qhly_dragButton) {
              game.qhly_addDrag(button, player.node.avatar, dragCallback);
            }
            if (lib.config.qhly_buttons_hide) {
              button.hide();
            }
          }
          if (player.name2) {
            var button = ui.create.div('.qhly_skinplayerbutton2', player.node.avatar2);
            button.qhly_chname = player.name2;
            player.node.qhly_skinButton2 = button;
            button.listen(function () {
              if (player.isUnseen(1) && player != game.me) return;
              if (lib.config.qhly_smallwiningame) {
                game.qhly_open_small(player.name2, player, player);
              } else {
                game.qhly_open(player.name2, 'skin', player);
              }
            });
            if (lib.config.qhly_dragButton) {
              game.qhly_addDrag(button, player.node.avatar2, dragCallback);
            }
            if (lib.config.qhly_buttons_hide) {
              button.hide();
            }
          }
          if (player == game.me && !_status.qhly_initOk) {
            _status.qhly_initOk = true;
            _status.qhly_buttonShowing = !lib.config.qhly_buttons_hide;
            ui.create.system("显示/隐藏皮肤按钮", function () {
              if (_status.qhly_buttonShowing) {
                game.qhly_hideButtons();
              } else {
                game.qhly_showButtons();
              }
            }, true);
          }
        }
      };
      game.qhly_getAllButtons = function () {
        var btarr = [];
        if (game && game.players) {
          var arr = game.players.slice(0);
          arr.addArray(game.dead);
          for (var p of arr) {
            if (p.node.qhly_skinButton1) {
              btarr.add(p.node.qhly_skinButton1);
            }
            if (p.node.qhly_skinButton2) {
              btarr.add(p.node.qhly_skinButton2);
            }
          }
        }
        return btarr;
      };
      game.qhly_hideButtons = function () {
        game.saveConfig('qhly_buttons_hide', true);
        if (game && game.players) {
          var arr = game.players.slice(0);
          arr.addArray(game.dead);
          for (var p of arr) {
            if (p.node.qhly_skinButton1) {
              p.node.qhly_skinButton1.style.transition = '';
              p.node.qhly_skinButton1.hide();
            }
            if (p.node.qhly_skinButton2) {
              p.node.qhly_skinButton2.style.transition = '';
              p.node.qhly_skinButton2.hide();
            }
          }
        }
        _status.qhly_buttonShowing = false;
      };
      game.qhly_showButtons = function () {
        game.saveConfig('qhly_buttons_hide', false);
        if (game && game.players) {
          var arr = game.players.slice(0);
          arr.addArray(game.dead);
          for (var p of arr) {
            if (p.node.qhly_skinButton1) {
              p.node.qhly_skinButton1.show();
              if (lib.config.qhly_dragButton) {
                p.node.qhly_skinButton1.style.transition = 'transform 0s';
              }
            }
            if (p.node.qhly_skinButton2) {
              p.node.qhly_skinButton2.show();
              if (lib.config.qhly_dragButton) {
                p.node.qhly_skinButton2.style.transition = 'transform 0s';
              }
            }
          }
        }
        _status.qhly_buttonShowing = true;
      };

      game.qhly_checkFileExist('extension/千幻聆音/music/', function (s) {
        if (s && game.getFileList) {
          game.getFileList('extension/千幻聆音/music/', function (folders, files) {
            if (files) {
              for (var f of files) {
                if (f.endsWith('.mp3')) {
                  var path = 'extension/千幻聆音/music/' + f;
                  var name = game.qhly_earse_ext(f);
                  lib.qhlyMusic[path] = {
                    name: name,
                    path: path
                  };
                }
              }
              game.qhly_refreshBgmConfigs();
            }
          });
        }
      });

      game.getFileList('extension/千幻聆音/plugins', function (folders, files) {
        if (files) {
          for (var file of files) {
            if (file.endsWith('.js')) {
              lib.init.js(lib.qhly_path + '/plugins/' + file);
            }
          }
        }
      });
//-----Q-----START-----
    }, precontent: function (config) {
//-----Q-----END-----
      game.qhly_hasExtension = function (str) {
        if (!str || typeof str != 'string') return false;
        if (lib.config && lib.config.extensions) {
          for (var i of lib.config.extensions) {
            if (i.indexOf(str) == 0) {
              if (lib.config['extension_' + i + '_enable']) return true;
            }
          }
        }
        return false;
      };
      if (!lib.qhly_viewskin) {
        lib.qhly_viewskin = {};
      }
      lib.qhly_viewskin['xuanwujianghu'] = {
        name: '玄武江湖',
        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui');
        },
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['shikongshuniu'] = {
        name: '时空枢纽',
        buttonImage: 'extension/千幻聆音/theme/sksn/newui_button_sksn.png',
        buttonPressedImage: 'extension/千幻聆音/theme/sksn/newui_button_selected_sksn.png',
        skinPagePlayAudioButtonImage: 'extension/千幻聆音/theme/wz/qhly_pic_playaudiobutton_wz.png',
        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_sksn');
        },
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['sanguo'] = {
        name: '三国',
        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_sanguo');
        },
        skillPageSkillNameColor: '#87CEFA',
        skillPageDerivationSkillColor: '#7FFFD4',
        skinPageSkillNameColor: '#87CEFA',
        skinPageHeadTitleColor: '#90EE90',
        skinPageHeadSkinNameColor: '#EEE9E9',
        changeViewSkin: function (view) {
          view.dragonhead.show();
          view.dragontail.show();
        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['sanguo2'] = {
        name: '三国2',
        buttonImage: 'extension/千幻聆音/theme/sanguo2/newui_button_sanguo2.png',
        buttonPressedImage: 'extension/千幻聆音/theme/sanguo2/newui_button_selected_sanguo2.png',
        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_sanguo2');
        },
        skillPageSkillNameColor: '#87CEFA',
        skillPageDerivationSkillColor: '#7FFFD4',
        skinPageSkillNameColor: '#87CEFA',
        skinPageHeadTitleColor: '#90EE90',
        skinPageHeadSkinNameColor: '#EEE9E9',
        changeViewSkin: function (view) {
          view.dragonhead.show();
          view.dragontail.show();
        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['wangzhe'] = {
        name: '耀世星辉',
        buttonImage: 'extension/千幻聆音/theme/wz/newui_button_wz.png',
        buttonPressedImage: 'extension/千幻聆音/theme/wz/newui_button_selected_wz.png',
        favouriteImage: 'extension/千幻聆音/theme/wz/newui_fav_wz.png',
        forbidImage: 'extension/千幻聆音/theme/wz/newui_forbid_wz.png',
        checkBoxImage: 'extension/千幻聆音/image/newui_checkbox_unchecked.png',
        checkBoxCheckedImage: 'extension/千幻聆音/theme/wz/newui_checkbox_checked_wz.png',
        skillPagePlayAudioButtonImage: 'extension/千幻聆音/theme/wz/newui_playaudio_wz.png',
        skinPagePlayAudioButtonImage: 'extension/千幻聆音/theme/wz/qhly_pic_playaudiobutton_wz.png',

        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_wz');
        },
        skillPageSkillNameColor: '#87CEFA',
        skillPageDerivationSkillColor: '#7FFFD4',
        skinPageSkillNameColor: '#87CEFA',
        skinPageHeadTitleColor: '#90EE90',
        skinPageHeadSkinNameColor: '#EEE9E9',
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['ranqi'] = {
        name: '染柒的世界',
        buttonImage: 'extension/千幻聆音/theme/rq/newui_button_rq.png',
        buttonPressedImage: 'extension/千幻聆音/theme/rq/newui_button_selected_rq.png',
        favouriteImage: 'extension/千幻聆音/theme/rq/newui_fav_rq.png',
        forbidImage: 'extension/千幻聆音/theme/rq/newui_forbid_rq.png',
        checkBoxImage: 'extension/千幻聆音/image/newui_checkbox_unchecked.png',
        checkBoxCheckedImage: 'extension/千幻聆音/theme/wz/newui_checkbox_checked_wz.png',

        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_rq');
        },
        skillPageSkillNameColor: '#87CEFA',
        skillPageDerivationSkillColor: '#7FFFD4',
        skinPageSkillNameColor: '#87CEFA',
        skinPageHeadTitleColor: '#90EE90',
        skinPageHeadSkinNameColor: '#EEE9E9',
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['jingdian'] = {
        name: '经典怀旧',
        onchange: function () {

        },
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };


      lib.qhly_viewskin['shuimo'] = {
        name: '水墨龙吟',
        whr: 2.2028,
        isQiLayout: true,
        buttonTextSpace: false,
        lihuiSupport: true,
        layoutType: 'qi',
        skillPageSkillNameColor: '#FFFFFF',
        skillPageDerivationSkillColor: '#00F5FF',
        skinPageSkillNameColor: '#FFFFFF',
        buttonImage: 'extension/千幻聆音/theme/shuimo/newui_button_shuimo.png',
        buttonPressedImage: 'extension/千幻聆音/theme/shuimo/newui_button_selected_shuimo.png',
        skillPagePlayAudioButtonImage: 'extension/千幻聆音/theme/shuimo/newui_playaudio_shuimo.png',
        skinPagePlayAudioButtonImage: 'extension/千幻聆音/theme/shuimo/qhly_pic_playaudiobutton_shuimo.png',
        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_shuimo');
        },
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['decade'] = {
        name: '十周年',
        whr: 2.22,
        buttonImage: 'extension/千幻聆音/theme/decade/button.jpg',
        buttonPressedImage: 'extension/千幻聆音/theme/decade/buttonsel.jpg',
        favouriteImage: 'extension/千幻聆音/theme/decade/newui_fav_dc.png',
        forbidImage: 'extension/千幻聆音/theme/decade/newui_forbid_dc.png',
        rankImage: 'extension/千幻聆音/theme/decade/newui_rank_dc.png',
        musicImage: 'extension/千幻聆音/theme/decade/newui_music_dc.png',
        checkBoxImage: 'extension/千幻聆音/image/newui_checkbox_unchecked.png',
        checkBoxCheckedImage: 'extension/千幻聆音/theme/wz/newui_checkbox_checked_wz.png',
        skillPagePlayAudioButtonImage: 'extension/千幻聆音/theme/decade/skillvoice.png',
        skinPagePlayAudioButtonImage: 'extension/千幻聆音/theme/wz/qhly_pic_playaudiobutton_wz.png',

        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_dc');
        },
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['shousha'] = {
        name: '手杀',
        whr: 2.22,
        buttonImage: 'extension/千幻聆音/theme/shousha/chr_detail_skill_button_normal.jpg',
        buttonPressedImage: 'extension/千幻聆音/theme/shousha/chr_detail_skill_button_selected.jpg',
        favouriteImage: 'extension/千幻聆音/theme/shousha/newui_fav_ss.png',
        forbidImage: 'extension/千幻聆音/theme/shousha/newui_forbid_ss.png',
        rankImage: 'extension/千幻聆音/theme/shousha/newui_rank_ss.png',
        musicImage: 'extension/千幻聆音/theme/shousha/newui_music_ss.png',
        skinImage: 'extension/千幻聆音/theme/shousha/newui_skin_ss.png',
        checkBoxImage: 'extension/千幻聆音/image/newui_checkbox_unchecked.png',
        checkBoxCheckedImage: 'extension/千幻聆音/theme/wz/newui_checkbox_checked_wz.png',
        skillPagePlayAudioButtonImage: 'extension/千幻聆音/theme/decade/skillvoice.png',
        skinPagePlayAudioButtonImage: 'extension/千幻聆音/theme/wz/qhly_pic_playaudiobutton_wz.png',
        hasJs:true,
        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_ss');
        },
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };

      lib.qhly_viewskin['lolbig'] = {
        name: '海克斯科技',
        whr: 1.77778,
        isLolBigLayout: true,
        buttonTextSpace: false,
        favouriteImage: 'extension/千幻聆音/theme/lolbig/newui_fav_lol.png',
        lihuiSupport: true,
        layoutType: 'lolbig',
        skillPageSkillNameColor: '#C0B588',
        skillPageDerivationSkillColor: '#00F5FF',
        skinPageSkillNameColor: '#FFFFFF',
        buttonImage: 'extension/千幻聆音/theme/lolbig/newui_button_lol.png',
        buttonPressedImage: 'extension/千幻聆音/theme/lolbig/newui_button_selected_lol.png',
        skillPagePlayAudioButtonImage: 'extension/千幻聆音/theme/lolbig/newui_playaudio_lol.png',
        skinPagePlayAudioButtonImage: 'extension/千幻聆音/theme/lolbig/qhly_pic_playaudiobutton_lol.png',
        checkBoxCheckedImage: 'extension/千幻聆音/theme/lolbig/newui_checkbox_checked_lol.png',
        checkBoxImage: 'extension/千幻聆音/theme/lolbig/newui_checkbox_unchecked_lol.png',
        onchange: function () {
          game.saveConfig('qhly_viewskin_css', 'newui_lolbig');
        },
        changeViewSkin: function (view) {

        },
        skinPage: function (pageName, view) {

        }
      };
      if (!lib.config.dev) {
        game.saveConfig('dev', true);
        if (_status.connectMode) return;
        lib.cheat.i();
      }
      if ((lib.config.qhly_currentViewSkin == 'decade' || lib.config.qhly_currentViewSkin == 'shousha') && !lib.config['extension_千幻聆音_qhly_decadeCloseDynamic']) window._qhlyThunder = true;//用于判断是否打开的是千幻聆音雷修版
      window._qhlyThunderKey = ['init', 'uninit', 'reinit', 'playDynamic', 'stopDynamic', 'showCharacter'];
      lib.qhly_path = lib.assetURL + 'extension/千幻聆音/';
      window.qhly_version = 5;
      var cssUrl = lib.assetURL + 'extension/千幻聆音';
      lib.init.css(cssUrl, 'extension');
      lib.init.css(cssUrl + '/theme', lib.config.qhly_viewskin_css ? lib.config.qhly_viewskin_css : 'newui');
      window.qhly_import = function (func) {
        func(lib, game, ui, get, ai, _status);
      };
      window.qhly_import_safe = function (func) {
        try {
          func(lib, game, ui, get, ai, _status);
        } catch (e) {
          alert("JS文件解析失败");
        }
      };
      lib.init.js(lib.qhly_path + '/data/sanguoskininfo.js');
      lib.init.js(lib.qhly_path + 'skinShare.js');
      lib.init.js(lib.qhly_path + 'skinEdit.js');
      lib.init.js(lib.qhly_path + '/data/dom-to-image.js');
      lib.init.js(lib.qhly_path, 'skinChange', function () {
        let str = '千幻聆音：检测到skinChange.js中';
        const keys = ['source', 'audio', 'image'];
        let value = [];
        let alerted = false;
        Object.keys(lib.qhly_skinChange).forEach(character => {
          Object.keys(lib.qhly_skinChange[character]).forEach(skin => {
            Object.keys(lib.qhly_skinChange[character][skin]).forEach(key => {
              if (keys.contains(key)) {
                value.add(key);
                if (typeof lib.qhly_skinChange[character][skin][key] != 'string') {
                  str += (character + '的皮肤“' + skin + '”中的“' + key + '”属性填写错误，请检查！');
                  alert(str);
                  alerted = true;
                }
                if (key != 'source') {
                  lib.qhly_skinChange[character][skin][key + '1'] = lib.qhly_skinChange[character][skin][key];
                  if (key == 'audio') lib.qhly_skinChange[character][skin][key + '2'] = skin + '/';
                  else {
                    lib.qhly_skinChange[character][skin][key + '2'] = character + '/' + skin + '.jpg';
                  }
                }
              }
            })
            if (value.length < 3 && !alerted) {
              str += (character + '的皮肤“' + skin + '”中的属性填写不全，请检查至少包含source、audio、image这3条属性！');
              alert(str);
            }
            str = '千幻聆音：检测到skinChange.js中';
            value = [];
          })
        })
      });
      if(lib.qhly_viewskin[lib.config.qhly_currentViewSkin] && lib.qhly_viewskin[lib.config.qhly_currentViewSkin].hasJs){
        var vsJsPath = lib.qhly_path + 'theme/'+lib.config.qhly_currentViewSkin+"/code/"+lib.config.qhly_currentViewSkin+".js";
        if(lib.init.jsForExtension){
          lib.init.jsForExtension(vsJsPath);
        }else{
          lib.init.js(vsJsPath);
        }
      }
      window.qhly_audio_redirect = {

      };
      if(lib.config.qhly_funcLoadInPrecontent || game.qhly_hasExtension('如真似幻')){
        window.qhly_inPercontent = true;
        window.qhly_extension_package.content(config,window.qhly_extension_package);
        window.qhly_inPercontent = false;
      }
    }, config: {
      /*
      "qhly_newui":{
          "name":"新UI",
          "intro":"打开此选项，将使用新版千幻UI。",
          "init":lib.config.qhly_newui === undefined ? true:lib.config.qhly_newui,
          onclick:function(item){
              game.saveConfig('extension_千幻聆音_qhly_newui',item);
              game.saveConfig('qhly_newui',item);
          }
      },*/
      "qhly_uishezhi": {
        "name": "<font size='5' color='blue'>UI设置》</font>",
        "clear": true,
      },
      "qhly_currentViewSkin": {
        "name": "UI套装",
        "intro": "设置UI套装样式。",
        "item": {},
        "init": lib.config.qhly_currentViewSkin === undefined ? 'shousha' : lib.config.qhly_currentViewSkin,
        onclick: function (item) {
          if (lib.qhly_viewskin[item] && lib.qhly_viewskin[item].onchange) {
            lib.qhly_viewskin[item].onchange();
          }
          game.saveConfig('qhly_currentViewSkin', item);
          game.saveConfig('extension_千幻聆音_qhly_currentViewSkin', item);
          /*if (confirm("是否重启游戏以应用新UI？")) {
            game.reload();
          }*/
          navigator.notification.confirm(
          	'是否重启游戏以应用新UI？',
          	function(index){
          	  if(index==1) {
          		game.reload();
              }
          	},
          	'三国杀·琉璃版',
          	['重启','取消']
          );
        }
      },
      "qhly_layoutFitX": {
        "name": "横向拉伸适应",
        "intro": "打开此选项后，若横向布局未铺满，将拉伸至铺满布局。",
        "init": lib.config.qhly_layoutFitX === undefined ? false : lib.config.qhly_layoutFitX,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_layoutFitX', item);
          game.saveConfig('qhly_layoutFitX', item);
        }
      },
      "qhly_layoutFitY": {
        "name": "纵向拉伸适应",
        "intro": "打开此选项后，若纵向布局未铺满，将拉伸至铺满布局。",
        "init": lib.config.qhly_layoutFitY === undefined ? false : lib.config.qhly_layoutFitY,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_layoutFitY', item);
          game.saveConfig('qhly_layoutFitY', item);
        }
      },
      "qhly_vMiddle": {
        "name": "纵向居中",
        "intro": "打开此选项后，在【水墨龙吟】【海克斯科技】套装中，技能和介绍字数较少时将居中显示。",
        "init": lib.config.qhly_vMiddle === undefined ? true : lib.config.qhly_vMiddle,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_vMiddle', item);
          game.saveConfig('qhly_vMiddle', item);
        }
      },
      "qhly_fontsize1": {
        "name": "正文字号",
        "intro": "打开此选项，可调整字号（仅对新UI生效）。",
        "init": lib.config.qhly_fontsize1 === undefined ? "5" : lib.config.qhly_fontsize1,
        "item": {
          "1": "很微小",
          "2": "微小",
          "3": "较小",
          "4": "小",
          "5": "中",
          "6": "大",
          "7": "较大",
          "8": "巨大",
          "9": "超级大",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_fontsize1', item);
          game.saveConfig('qhly_fontsize1', item);
        }
      },
      "qhly_gongnengshezhi": {
        "name": "<font size='5' color='blue'>功能设置》</font>",
        "clear": true,
      },
      "qhly_replaceCharacterCard2": {
        "name": "替换默认资料卡",
        "intro": "打开此选项，将使用千幻聆音的资料卡替换无名杀默认的资料卡。",
        "init": lib.config.qhly_replaceCharacterCard2 === undefined ? 'info' : lib.config.qhly_replaceCharacterCard2,
        "item": {
          'nonereplace': '不替换',
          'nonereplace2': "系统资料卡不显示换肤",
          'info': '千幻资料卡',
          'window': '千幻皮肤小窗'
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_replaceCharacterCard2', item);
          game.saveConfig('qhly_replaceCharacterCard2', item);
        }
      },
      "qhly_nolihuiOrigin": {
        "name": "无立绘皮肤显示原皮",
        "intro": "设置此选项，支持立绘的套装中，没有立绘资源的皮肤会显示原皮的立绘。",
        "init": lib.config.qhly_nolihuiOrigin === undefined ? false : lib.config.qhly_nolihuiOrigin,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_nolihuiOrigin', item);
          game.saveConfig('qhly_nolihuiOrigin', item);
        }
      },
      "qhly_smallwiningame": {
        "name": "小窗口换皮肤",
        "intro": "打开此选项，游戏内点击皮肤图标将弹出小窗口。",
        "init": lib.config.qhly_smallwiningame === undefined ? false : lib.config.qhly_smallwiningame,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_smallwiningame', item);
          game.saveConfig('qhly_smallwiningame', item);
        }
      },
      "qhly_smallwindowstyle": {
        "name": "小窗口样式",
        "intro": "可切换小窗口的样式。",
        "init": lib.config.qhly_smallwindowstyle === undefined ? 'shousha' : lib.config.qhly_smallwindowstyle,
        "item": {
          'dragon': '龙头',
          'common': '经典',
          'decade': '十周年',
          'shousha': '手杀'
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_smallwindowstyle', item);
          game.saveConfig('qhly_smallwindowstyle', item);
        }
      },
      "qhly_dragonsize": {
        "name": "龙头小窗口大小",
        "intro": "设置小窗口的大小（仅对龙头样式有效）",
        "init": lib.config.qhly_dragonsize === undefined ? '1.00' : lib.config.qhly_dragonsize,
        "item": {
          '0.45': '超级小',
          '0.55': '特小',
          '0.60': '小',
          '0.80': '较小',
          '1.00': '适中',
          '1.20': '较大',
          '1.50': '大',
          '1.65': '特大',
          '1.80': '超级大',
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_dragonsize', item);
          game.saveConfig('qhly_dragonsize', item);
        }
      },
      "qhly_forbidExtPage": {
        "name": "禁用附加页功能",
        "intro": "打开此选项，在千幻资料页将无法通过点击【简介】访问附加页面，也不会有小箭头。",
        "init": lib.config.qhly_forbidExtPage === undefined ? false : lib.config.qhly_forbidExtPage,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_forbidExtPage', item);
          game.saveConfig('qhly_forbidExtPage', item);
        }
      },
      "qhly_dragonlocation": {
        "name": "龙头小窗口位置",
        "intro": "设置小窗口的位置（仅对龙头样式有效）",
        "init": lib.config.qhly_dragonlocation === undefined ? 'center' : lib.config.qhly_dragonlocation,
        "item": {
          'head': '头像上',
          'center': '正中央',
          'drag': '可拖曳',
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_dragonlocation', item);
          game.saveConfig('qhly_dragonlocation', item);
        }
      },
      "qhly_smallwinclosewhenchange": {
        "name": "自动关闭小窗口",
        "intro": "打开此选项，在小窗口内更换皮肤后，小窗口自动关闭。",
        "init": lib.config.qhly_smallwinclosewhenchange === undefined ? true : lib.config.qhly_smallwinclosewhenchange,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_smallwinclosewhenchange', item);
          game.saveConfig('qhly_smallwinclosewhenchange', item);
        }
      },
      /*
      "qhly_recordWin": {
        "name": "展示战绩",
        "intro": "打开此选项，可以在千幻资料页查看战绩。",
        "init": lib.config.qhly_recordWin === undefined ? false : lib.config.qhly_recordWin,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_recordWin', item);
          game.saveConfig('qhly_recordWin', item);
        }
      },*/
      "qhly_randskin": {
        "name": "随机皮肤",
        "intro": "打开此选项，游戏开始时，会随机更换皮肤。",
        "init": lib.config.qhly_randskin === undefined ? true : lib.config.qhly_randskin,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_randskin', item);
          game.saveConfig('qhly_randskin', item);
        }
      },
      "qhly_randskin_me": {
        "name": "不随自己",
        "intro": "上一个选项开启时，不会随机切换玩家自己的武将皮肤。",
        'init':true,
        //"init": lib.config.qhly_randskin === undefined ? true : lib.config.qhly_randskin,
        /*onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_randskin', item);
          game.saveConfig('qhly_randskin', item);
        }*/
      },
      "qhly_extcompat": {
        "name": "扩展兼容",
        "intro": "打开此选项，千幻聆音将在一定程度上兼容大部分带有阵亡配音的扩展。如果不玩扩展武将，关闭此选项可提升性能。",
        "init": lib.config.qhly_extcompat === undefined ? true : lib.config.qhly_extcompat,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_extcompat', item);
          game.saveConfig('qhly_extcompat', item);
        }
      },
      "qhly_lutou": {
        "name": "适配露头",
        "intro": "打开此选项，将外框调整适配露头的情况。",
        "init": lib.config.qhly_lutou === undefined ? false : lib.config.qhly_lutou,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_lutou', item);
          game.saveConfig('qhly_lutou', item);
        }
      },
      /*
      此功能暂且关闭。
      "qhly_audioPlus":{
        "name":"音频功能增强",
        "intro":"打开此选项，将开启一些和音频增强相关的功能。但可能导致和部分修改了playAudio的扩展不兼容。",
        "init":lib.config.qhly_audioPlus === undefined ? false : lib.config.qhly_audioPlus,
        onclick:function(item){
          game.saveConfig('extension_千幻聆音_qhly_audioPlus', item);
          game.saveConfig('qhly_audioPlus', item);
        }
      },*/
      "qhly_lutouType": {
        "name": "露头模式",
        "intro": "仅在适配露头生效时生效。",
        "init": lib.config.extension_千幻聆音_qhly_lutouType === undefined ? 'shousha' : lib.config.extension_千幻聆音_qhly_lutouType,
        item: {
          'decade': '十周年露头',
          'shousha': '手杀露头',
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_lutouType', item);
          game.saveConfig('qhly_lutouType', item);
        }
      },
      "lutouFixx": {
        "name": "露头修复",
        "init": 'all',
        "intro": "修复露头的显示错位问题，仅手杀风格窗口开启露头有效。（选择保留原画可以使原画不露头出框修复而其他修复，一般用于动皮的效果，且会使磨皮滤镜失效）",
        item: {
          'off': '关闭效果',
          'all': '启用效果',
          /*'yuanhua': '保留原画',*/
        },
      },
      "lvjingFixx": {
        "name": "磨皮滤镜",
        "init": false,
        "intro": "资料展示页的武将大图开启磨皮滤镜，可以缓解低清图片的锐化问题，同时增加切换皮肤的过渡效果，仅手杀风格的窗口有效。"
      },
      "qhly_skinButton": {
        "name": "头像显示换肤按钮",
        "intro": "打开此选项，人物头像上会出现换肤按钮。（重启后生效）",
        "init": lib.config.qhly_skinButton === undefined ? false : lib.config.qhly_skinButton,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_skinButton', item);
          game.saveConfig('qhly_skinButton', item);
        }
      },
      "qhly_showrarity": {
        "name": "显示武将等阶",
        "intro": "打开此选项，资料页内会显示武将等阶。",
        "init": lib.config.qhly_showrarity === undefined ? false : lib.config.qhly_showrarity,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_showrarity', item);
          game.saveConfig('qhly_showrarity', item);
        }
      },
      'qhly_dragButton': {
        "name": "换肤按钮可拖曳",
        "intro": "打开此选项，人物头像上的换肤按钮可以拖动位置。（重启后生效）",
        "init": lib.config.qhly_dragButton === undefined ? false : lib.config.qhly_dragButton,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_dragButton', item);
          game.saveConfig('qhly_dragButton', item);
        }
      },
      'qhly_dragButtonPosition': {
        "name": "换肤按钮拖曳同步",
        "intro": "如选择同步，拖动一名角色的换肤按钮时，其他角色将联动拖动。（重启后生效）",
        item: {
          'no': "不同步",
          'yes': '同步',
        },
        "init": lib.config.qhly_dragButtonPosition === undefined ? 'yes' : lib.config.qhly_dragButtonPosition,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_dragButtonPosition', item);
          game.saveConfig('qhly_dragButtonPosition', item);
        }
      },
      "qhly_notbb": {
        "name": "防啰嗦功能",
        "intro": "打开此选项后，在固定的时间内，相同的技能不会触发多次语音。",
        item: {
          'none': '关闭',
          '2': '2秒',
          '3': '3秒',
          '4': '4秒',
          '5': '5秒',
          '6': '6秒',
          '7': '7秒',
          '8': '8秒',
          '9': '9秒',
          '10': '10秒',
        },
        "init": lib.config.qhly_notbb === undefined ? 'none' : lib.config.qhly_notbb,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_notbb', item);
          game.saveConfig('qhly_notbb', item);
        }
      },
      "qhly_notbb_range": {
        "name": "防啰嗦范围",
        "intro": "设置防啰嗦的范围。",
        item: {
          'skill': '相同技能',
          'character': '相同角色',
          'all': "所有角色",
        },
        "init": lib.config.qhly_notbb_range === undefined ? 'skill' : lib.config.qhly_notbb_range,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_notbb_range', item);
          game.saveConfig('qhly_notbb_range', item);
        }
      },
      "qhly_originSkinPath": {
        "name": "本体武将皮肤目录",
        "intro": "可设置本体武将的皮肤目录。",
        "init": lib.config.qhly_originSkinPath === undefined ? "extension/千幻聆音/sanguoskin/" : lib.config.qhly_originSkinPath,
        "item": {
          "extension/千幻聆音/sanguoskin/": "千幻聆音目录",
          "extension/千幻聆音/sanguolutouskin/": "千幻露头目录",
          "image/skin/": "本体目录",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_originSkinPath', item);
          game.saveConfig('qhly_originSkinPath', item);
          /*var s = confirm("是否重启游戏以应用新配置？");
          if (s) {
            game.reload();
          }*/
          navigator.notification.confirm(
          	'是否重启游戏以应用新UI？',
          	function(index){
          	  if(index==1) {
          		game.reload();
              }
          	},
          	'三国杀·琉璃版',
          	['重启','取消']
          );
        }
      },
      "qhly_extSkinPath": {
        "name": "扩展武将皮肤目录",
        "intro": "可设置扩展武将的皮肤目录（仍优先扩展的skin.js设置）。",
        "init": lib.config.qhly_extSkinPath === undefined ? "default" : lib.config.qhly_originSkinPath,
        "item": {
          "default": "扩展skin文件夹",
          "extension/千幻聆音/sanguoskin/": "千幻聆音目录",
          "extension/千幻聆音/sanguolutouskin/": "千幻露头目录",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_extSkinPath', item);
          game.saveConfig('qhly_extSkinPath', item);
          /*var s = confirm("是否重启游戏以应用新配置？");
          if (s) {
            game.reload();
          }*/
          navigator.notification.confirm(
          	'是否重启游戏以应用新UI？',
          	function(index){
          	  if(index==1) {
          		game.reload();
              }
          	},
          	'三国杀·琉璃版',
          	['重启','取消']
          );
        }
      },
      "qhly_autoChangeSkin": {
        "name": "自动切换皮肤",
        "intro": "打开此选项，皮肤会自动随时间随机切换。",
        "init": lib.config.qhly_autoChangeSkin === undefined ? "random" : lib.config.qhly_autoChangeSkin,
        "item": {
          "close": "关闭",
          "10": "每10秒",
          "30": "每半分钟",
          "60": "每1分钟",
          "120": "每2分钟",
          "600": "每10分钟",
          "random": "随机间隔",
        },
        onclick: function (item) {
          var open = false;
          if (lib.config.qhly_autoChangeSkin == 'close' || !lib.config.qhly_autoChangeSkin) {
            if (item !== 'close') {
              open = true;
            }
          }
          game.saveConfig('extension_千幻聆音_qhly_autoChangeSkin', item);
          game.saveConfig('qhly_autoChangeSkin', item);
          if (open) {
            if (game.qhly_autoChangeSkin) {
              game.qhly_autoChangeSkin();
            } else {
              alert("打开扩展才生效。");
            }
          } else {
            if (_status.qhly_changeSkinFunc) {
              clearTimeout(_status.qhly_changeSkinFunc);
            }
          }
        }
      },
      "qhly_listdefaultpage": {
        "name": "列表进入默认页面",
        "intro": "可设置通过武将列表进入千幻聆音目录时，默认显示的页面。",
        "init": lib.config.qhly_listdefaultpage === undefined ? "introduce" : lib.config.qhly_listdefaultpage,
        "item": {
          "introduce": "人物简介",
          "skill": "技能描述",
          "skin": "皮肤信息",
          "config": "相关配置",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_listdefaultpage', item);
          game.saveConfig('qhly_listdefaultpage', item);
        }
      },
      "qhly_doubledefaultpage": {
        "name": "双击默认页面",
        "intro": "可设置通过在游戏内双击武将头像进入千幻聆音目录时，默认显示的页面。",
        "init": lib.config.qhly_doubledefaultpage === undefined ? "skill" : lib.config.qhly_doubledefaultpage,
        "item": {
          "introduce": "人物简介",
          "skill": "技能描述",
          "skin": "皮肤信息",
          "config": "相关配置",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_doubledefaultpage', item);
          game.saveConfig('qhly_doubledefaultpage', item);
        }
      },
      "qhly_guozhan": {
        "name": "国战皮肤",
        "intro": "打开此选项后，国战模式下，皮肤将从gz_开头的文件夹读取。",
        "init": lib.config.qhly_guozhan === undefined ? true : lib.config.qhly_guozhan,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_guozhan', item);
          game.saveConfig('qhly_guozhan', item);
        }
      },
      "qhly_skinconfig": {
        "name": "皮肤配置",
        "intro": "打开此选项后，可以进行一些额外的皮肤配置。",
        "init": lib.config.qhly_skinconfig === undefined ? false : lib.config.qhly_skinconfig,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_skinconfig', item);
          game.saveConfig('qhly_skinconfig', item);
        }
      },
      "qhly_editmode": {
        "name": "编辑模式",
        "intro": "打开此选项后，在千幻详情页可以编辑武将台词。",
        "init": lib.config.qhly_editmode === undefined ? false : lib.config.qhly_editmode,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_editmode', item);
          game.saveConfig('qhly_editmode', item);
        }
      },
      "qhly_skillingame": {
        "name": "显示对局技能",
        "intro": "打开此选项后，对局中查看武将技能界面时，将显示对局中的技能。",
        "init": lib.config.qhly_skillingame === undefined ? false : lib.config.qhly_skillingame,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_skillingame', item);
          game.saveConfig('qhly_skillingame', item);
        }
      },
      "qhly_keymarkopen": {
        "name": "技能关键字高亮",
        "intro": "打开此选项后，技能中相关关键字将会被高亮。",
        "init": lib.config.qhly_keymarkopen === undefined ? false : lib.config.qhly_keymarkopen,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_keymarkopen', item);
          game.saveConfig('qhly_keymarkopen', item);
          if (item) {
            var ori = lib.config.qhly_keymark;
            if (!ori) {
              ori = "锁定技:blue;限定技:orange;觉醒技:red;使命技:gold;#出牌阶段:#00FF00;#摸牌阶段:#00FF00;#弃牌阶段:#00FF00;#准备阶段:#00FF00;#结束阶段:#00FF00;";
            }
            game.qhly_editDialog("关键字高亮设置", "#开头为全部高亮，否则为首次出现高亮。", ori, function (value, dialog) {
              value = value.replaceAll("：", ":");
              value = value.replaceAll("；", ";");
              value = value.replaceAll("\n", "");
              value = value.replaceAll("\r", "");
              value = value.replaceAll(" ", "");
              game.saveConfig("qhly_keymark", value);
              dialog.delete();
            }, function (dialog) {
              return true;
            });
          }
        }
      },
      "qhly_chooseButtonOrigin":{
        "name": "选将界面显示原皮",
        "intro": "设置此选项，选将界面将显示角色的原有皮肤。",
        "init": lib.config.qhly_chooseButtonOrigin === undefined ? false : lib.config.qhly_chooseButtonOrigin,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_chooseButtonOrigin', item);
          game.saveConfig('qhly_chooseButtonOrigin', item);
        }
      },
      "qhly_chooseButtonOrigin_guozhan":{
        "name": "国战选将显示原皮",
        "intro": "设置此选项，国战模式下选将界面只显示原皮（为了避免出现空皮肤的情况）。",
        "init": true,
      },
      "qhly_mvp": {
        "name": "播放MVP武将的胜利语音",
        "init": false,
      },
      "qhly_decadeConfig": {
        "name": "<font size='5' color='blue'>十周年及手杀样式专用设置》</font>",
        "clear": true,
      },
      "qhly_decadeCloseDynamic": {
        "name": "关闭所有动皮效果",
        "init": false,
        onclick: function (item) {
          if (item === true) {
            if (game.players) {
              for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].stopDynamic) game.players[i].stopDynamic();
              }
            }
          } else {
            if (!window.decadeUI) {
              alert("侦测到十周年UI未正常开启，无法使用动皮功能！");
              lib.config['extension_千幻聆音_qhly_decadeCloseDynamic'] = true;
              this.classList.add('on');
              return;
            }
          }
          game.saveConfig('extension_千幻聆音_qhly_decadeCloseDynamic', item);

        }
      },
      "qhly_playerwindow": {
        "name": "单击武将呼出菜单",
        "init": true,
      },
      "qhly_formatDS": {
        "name": "自动调整动皮参数",
        "init": true,
      },
      "qhly_editDynamic": {
        "name": "调节待机及大页面",
        "intro": "使用千幻聆音调节待机及大页面中动皮效果。",
        "init": true,
      },
      "qhly_noSkin": {
        "name": "无静皮时显示",
        "intro": "当只有动皮没有静皮时显示内容。",
        "item": {
          "noSkin": "无相应静皮资源",
          "origin": "原皮",
        },
        "init": lib.config.qhly_noSkin === undefined ? "noSkin" : lib.config.qhly_noSkin,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_noSkin', item);
          game.saveConfig('qhly_noSkin', item);
        }
      },
      "qhly_dom2image": {
        "name": "显示生成静皮按钮",
        "intro": "只有动皮没有静皮时，在右上角显示生成静皮的按钮",
        "init": true,
      },
      "qhly_decadeDynamic": {
        "name": "小窗动皮关闭",
        "init": "three",
        "item": {
          "none": "不关闭",
          "three": "多于3个时关闭",
          "always": "保持关闭",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_decadeDynamic', item);
          if (item == 'none') alert("强烈建议设置为“多于3个时关闭”或“保持关闭”，否则可能因为小窗内动皮过多导致动画丢失！")
        }
      },
      "qhly_decadeChangeEffect": {
        "name": "换肤特效",
        "init": true,
      },
      "qhly_guozhanDS": {
        "name": "国战动皮适配",
        "init": true,
      },
      "qhly_decadeDengjie": {
        "name": "小窗人物等阶",
        "init": lib.config['extension_千幻聆音_qhly_decadeDengjie'] === undefined ? "auto" : lib.config['extension_千幻聆音_qhly_decadeDengjie'],
        "item": {
          "one": "一阶",
          "two": "二阶",
          "three": "三阶",
          "four": "四阶",
          "five": "五阶",
          "auto": "跟随角色评级",
        },
      },
      "qhly_decadeAuto": {
        "name": "自动换肤间隔",
        "intro": "调节自动换肤时间",
        "init": lib.config['extension_千幻聆音_qhly_decadeAuto'] === undefined ? "30" : lib.config['extension_千幻聆音_qhly_decadeAuto'],
        "item": {
          "10": "每10秒",
          "30": "每半分钟",
          "60": "每1分钟",
          "120": "每2分钟",
          "600": "每10分钟",
        },
      },
      "qhly_shoushaTexiao": {
        "name": "大页面出框特效",
        "init": true,
      },
      "qhly_ignoreClips": {
        "name": "忽略clipSlots",
        "init": false,
      },
      "qhly_yinxiaoshezhi": {
        "name": "<font size='5' color='blue'>音效设置》</font>",
        "clear": true,
      },
      "qhly_closeVoice": {
        "name": "关闭点击音效",
        "intro": "打开此选项，可关闭点击音效。",
        "init": lib.config.qhly_closeVoice === undefined ? false : lib.config.qhly_closeVoice,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_closeVoice', item);
          game.saveConfig('qhly_closeVoice', item);
        }
      },
      "qhly_currentMusic": {
        "name": "设置BGM",
        "intro": "设置此选项，可以选择游戏背景音乐。将覆盖系统的配置。",
        "init": lib.config.qhly_currentMusic ? lib.config.qhly_currentMusic : 'system',
        "item": {
          'system': '跟随系统',
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_currentMusic', item);
          game.saveConfig('qhly_currentMusic', item);
        }
      },
      "qhly_enableCharacterMusic": {
        "name": "角色BGM",
        "intro": "打开此选项，可以在设置界面设置角色专属BGM，重启后生效。",
        "init": lib.config.qhly_enableCharacterMusic === undefined ? false : lib.config.qhly_enableCharacterMusic,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_enableCharacterMusic', item);
          game.saveConfig('qhly_enableCharacterMusic', item);
        }
      },
      "qhly_modemusicconfig": {
        "name": "<b>模式BGM</b>",
        "intro": "设置当前模式的BGM。",
        item: {
          'system': '不特别配置',
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_modemusicconfig', item);
          game.saveConfig('qhly_modemusicconfig_' + get.mode(), item);
        }
      },
      "qhly_shuimolingyin": {
        "name": "<font size='5' color='blue'>水墨龙吟相关设置》</font>",
        "clear": true,
      },
      "qhly_titlereplace": {
        "name": "武将旁小字内容",
        "intro": "设置此选项，可调整【水墨龙吟】界面武将旁小字的内容。",
        "init": lib.config.qhly_titlereplace === undefined ? "title" : lib.config.qhly_titlereplace,
        "item": {
          "title": "武将标题",
          "skin": "皮肤名",
          "pkg": "武将包名",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_titlereplace', item);
          game.saveConfig('qhly_titlereplace', item);
        }
      },
      "qhly_hanggaoxiufu": {
        "name": "技能名行高调整",
        "intro": "设置此选项，可调整【水墨龙吟】界面按钮的文字行高。",
        "init": lib.config.qhly_hanggaoxiufu === undefined ? "250" : lib.config.qhly_hanggaoxiufu,
        "item": {
          "250": "250%",
          "260": "260%",
          "270": "270%",
          "280": "280%",
          "290": "290%",
          "300": "300%",
          "310": "310%",
          "320": "320%",
          "330": "330%",
          "340": "340%",
          "350": "350%",
          "360": "360%",
          "370": "370%",
          "380": "380%",
          "390": "390%",
          "400": "400%"
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_hanggaoxiufu', item);
          game.saveConfig('qhly_hanggaoxiufu', item);
        }
      },
      "qhly_hanggaoxiufu2": {
        "name": "按钮行高调整",
        "intro": "设置此选项，可调整【水墨龙吟】界面按钮的文字行高。",
        "init": lib.config.qhly_hanggaoxiufu2 === undefined ? "250" : lib.config.qhly_hanggaoxiufu2,
        "item": {
          "250": "250%",
          "260": "260%",
          "270": "270%",
          "280": "280%",
          "290": "290%",
          "300": "300%",
          "310": "310%",
          "320": "320%",
          "330": "330%",
          "340": "340%",
          "350": "350%",
          "360": "360%",
          "370": "370%",
          "380": "380%",
          "390": "390%",
          "400": "400%",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_hanggaoxiufu2', item);
          game.saveConfig('qhly_hanggaoxiufu2', item);
        }
      },
      "qhly_shilizihao": {
        "name": "势力字号调整",
        "intro": "设置此选项，可调整【水墨龙吟】界面按钮的势力字号。",
        "init": lib.config.qhly_shilizihao === undefined ? "65" : lib.config.qhly_shilizihao,
        "item": {
          "50": "50",
          "55": "55",
          "60": "60",
          "65": "65",
          "70": "70",
          "75": "75",
          "80": "80",
          "85": "85",
          "90": "90",
          "95": "95",
          "100": "100",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_shilizihao', item);
          game.saveConfig('qhly_shilizihao', item);
        }
      },
      "qhly_lihuiSupport": {
        "name": "显示立绘",
        "intro": "设置此选项，【水墨龙吟】套装将显示立绘。",
        "init": lib.config.qhly_lihuiSupport === undefined ? false : lib.config.qhly_lihuiSupport,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_lihuiSupport', item);
          game.saveConfig('qhly_lihuiSupport', item);
        }
      },
      "qhly_hideShuimoCover": {
        "name": "隐藏墨迹",
        "intro": "设置此选项，【水墨龙吟】将隐藏上面的墨迹，以显示全皮肤。",
        "init": lib.config.qhly_hideShuimoCover === undefined ? false : lib.config.qhly_hideShuimoCover,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_hideShuimoCover', item);
          game.saveConfig('qhly_hideShuimoCover', item);
        }
      },
      "qhly_lolconfig": {
        "name": "<font size='5' color='blue'>海克斯科技相关设置》</font>",
        "clear": true,
      },
      "qhly_lolhanggaoxiufu": {
        "name": "技能名行高调整",
        "intro": "设置此选项，可调整【海克斯科技】界面按钮的文字行高。",
        "init": lib.config.qhly_lolhanggaoxiufu === undefined ? "250" : lib.config.qhly_lolhanggaoxiufu,
        "item": {
          "250": "250%",
          "260": "260%",
          "270": "270%",
          "280": "280%",
          "290": "290%",
          "300": "300%",
          "310": "310%",
          "320": "320%",
          "330": "330%",
          "340": "340%",
          "350": "350%",
          "360": "360%",
          "370": "370%",
          "380": "380%",
          "390": "390%",
          "400": "400%"
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_lolhanggaoxiufu', item);
          game.saveConfig('qhly_lolhanggaoxiufu', item);
        }
      },
      "qhly_lolhanggaoxiufu2": {
        "name": "按钮行高调整",
        "intro": "设置此选项，可调整【海克斯科技】界面按钮的文字行高。",
        "init": lib.config.qhly_lolhanggaoxiufu2 === undefined ? "250" : lib.config.qhly_lolhanggaoxiufu2,
        "item": {
          "250": "250%",
          "260": "260%",
          "270": "270%",
          "280": "280%",
          "290": "290%",
          "300": "300%",
          "310": "310%",
          "320": "320%",
          "330": "330%",
          "340": "340%",
          "350": "350%",
          "360": "360%",
          "370": "370%",
          "380": "380%",
          "390": "390%",
          "400": "400%",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_hanggaoxiufu2', item);
          game.saveConfig('qhly_hanggaoxiufu2', item);
        }
      },
      "qhly_lolshilizihao": {
        "name": "势力字号调整",
        "intro": "设置此选项，可调整【海克斯科技】界面按钮的势力字号。",
        "init": lib.config.qhly_lolshilizihao === undefined ? "65" : lib.config.qhly_lolshilizihao,
        "item": {
          "50": "50",
          "55": "55",
          "60": "60",
          "65": "65",
          "70": "70",
          "75": "75",
          "80": "80",
          "85": "85",
          "90": "90",
          "95": "95",
          "100": "100",
        },
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_lolshilizihao', item);
          game.saveConfig('qhly_lolshilizihao', item);
        }
      },
      "qhly_jianrongxing": {
        "name": "<font size='5' color='blue'>兼容性相关设置》</font>",
        "clear": true,
      },
      "qhly_funcLoadInPrecontent": {
        "name": "预处理加载",
        "intro": "设置此选项，将在预处理阶段加载此扩展的函数，可兼容《如真似幻》等美化扩展。",
        "init": lib.config.qhly_funcLoadInPrecontent === undefined ? true : lib.config.qhly_funcLoadInPrecontent,
        onclick: function (item) {
          game.saveConfig('extension_千幻聆音_qhly_funcLoadInPrecontent', item);
          game.saveConfig('qhly_funcLoadInPrecontent', item);
        }
      },
      "qhly_qitashezhi": {
        "name": "<font size='5' color='blue'>其他》</font>",
        "clear": true,
      },
      "qhly_clear": {
        "name": "<b>点击清空皮肤设置</b>",
        "clear": true,
        onclick: function () {
          game.saveConfig('qhly_skinset', {
            skin: {

            },
            skinAudioList: {

            },
            audioReplace: {

            }
          });
          alert("游戏将自动重启。");
          game.reload();
        }
      },
      "qhly_restore": {
        "name": "<b>点击恢复官方的皮肤设置</b>",
        "clear": true,
        onclick: function () {
          if (lib.config.qhly_save_offical_skin) {
            game.saveConfig('skin', lib.config.qhly_save_offical_skin);
            game.saveConfig('change_skin', false);
            game.saveConfig('extension_千幻聆音_enable', true);
            game.reload();
          }
        }
      },
      "qhly_plugin": {
        "name": "<b>点击设置插件</b>",
        "clear": true,
        onclick: function () {
          if(window.qhly_openPluginWindow){
            window.qhly_openPluginWindow();
          }
        }
      },
    }, help: {}, package: {
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
      intro: "版本号："+"4.13.8.1"+"<br>对局内实时换肤换音扩展！<br>感谢七.提供的【水墨龙吟】界面素材。<br>感谢灵徒℡丶提供的【海克斯科技】界面素材。<br>感谢雷开发的十周年、手杀界面。<br>感谢以下群友参与了BUG反馈，并给出了可行的建议：<br>柚子 Empty city° ꧁彥꧂ 折月醉倾城 世中人 ᴀᴅɪᴏs 废城<b><br><br>",
      author: "玄武江湖工作室 & 雷",
      diskURL: "",
      forumURL: "",
      version: "4.13.8.1",
    }, files: { "character": [], "card": [], "skill": [] }
  };
  return window.qhly_extension_package;
});