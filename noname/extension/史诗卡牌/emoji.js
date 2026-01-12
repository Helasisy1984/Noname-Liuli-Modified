EpicFX.module.import(function (lib, game, ui, get, ai, _status) {
  EpicFX.emoji = {};
  EpicFX.emoji.path = "../../../史诗卡牌/asset/skel/emoji/";
  EpicFX.emoji.iconPath = `${EpicFX.extensionPath}asset/img/emoji/`;
  /**
   * 手杀表情有很多实现的方法，纯骨骼、纯序列帧、混合使用的也有，我实现的方式有很多个，可能会删错，以你为准.
   * @type {{jiubei: {path: string, data: [{name: string, scale: number},{name: string, scale: number}], func: EpicFX.emoji.data.jiubei.func, level: number, icon: string, skel: boolean, text: string}, caideng: {path: string, data: [{name: string, scale: number}], func: EpicFX.emoji.data.caideng.func, level: number, descIcon: string, icon: string, skel: boolean, text: string}, tuoxie: {path: string, data: [{name: string, action: string, angle: number, scale: number},{name: string, scale: number},{name: string, scale: number}], func: EpicFX.emoji.data.tuoxie.func, level: number, icon: string, func1: EpicFX.emoji.data.tuoxie.func1, skel: boolean, text: string}, lipao: {path: string, data: [{name: string, scale: number}], func: EpicFX.emoji.data.lipao.func, level: number, descIcon: string, icon: string, skel: boolean, text: string}, egg: {func: EpicFX.emoji.data.egg.func, level: number, icon: string, count: number, name: string, fps: number, text: string}, hua: {func: EpicFX.emoji.data.hua.func, level: number, icon: string, count: number, name: string, fps: number, text: string}}}
   */
  EpicFX.emoji.data = {
    "tuoxie": {
      text: "鸡蛋拖鞋",
      path: "tuoxie/",
      icon: "620255",
      skel: true,
      level: 2,
      data: [{
        name: "Ss_BiaoQing_huiqi",
        action: "play3",
        angle: 120,
        scale: 0.6,
      }, {
        name: "Ss_BiaoQing_TuoXie",
        scale: 0.8
      }, {
        name: "Ss_BiaoQing_TuoXie1",
        scale: 0.6
      }],
      func: function (source, target, data) {
        let rect = source ? EpicFX.getElementCenterRect(source.getBoundingClientRect()) : EpicFX.getRect(ui.handcards1Container.getBoundingClientRect());
        let {...d0} = data[0];
        d0.x = rect.x;
        d0.y = rect.y;
        d0.loop = true;
        let targetRect = EpicFX.getElementCenterRect(target.getBoundingClientRect());
        for (let i = 0; i < 8; i++) {
          setTimeout((ii) => {
            let sp = dcdAnim.playSpine(d0);
            const resX = targetRect.x + EpicFX.utils.getRandomNumber(-40, 40);
            const resY = targetRect.y + EpicFX.utils.getRandomNumber(-60, 60);
            sp.moveTo(resX, resY, 300);
            setTimeout((s, iii) => {
              game.playAudio(`../extension/史诗卡牌/asset/audio/game/Egg0${EpicFX.utils.getRandomNumber(1, 2)}.mp3`);
              s.angle = 0;
              s.loop = false;
              s.skeleton.state.setAnimation(0, "play2", s.loop);
              if (iii == 7) {
                rect = source ? EpicFX.getCenterRect(source.getBoundingClientRect()) : EpicFX.getRect2(ui.handcards1Container.getBoundingClientRect());
                let targetRect = target.getBoundingClientRect();
                let targetX = targetRect.left + targetRect.width / 2 - 63;
                let targetY = targetRect.top + targetRect.height / 2 - 106;
                let imgs = [];
                for (let i = 0; i < 3; i++) {
                  setTimeout((j) => {
                    let tuoxie = new Image();
                    ui.arena.appendChild(tuoxie);
                    if (source) tuoxie.style.transform = `translate(${rect.x - rect.width / 2}px, ${rect.y - rect.height / 2}px) scale(0.1) rotate(180deg)`;
                    else tuoxie.style.transform = `translate(${rect.x}px, ${rect.y}px) scale(0.1) rotate(180deg)`;
                    if (j == 0) {
                      tuoxie.classList.add("emojiTuoxie1");
                      tuoxie.src = `${EpicFX.extensionPath}asset/img/emoji/emoji_tuoxie.png`;
                    } else {
                      tuoxie.classList.add("emojiTuoxie2");
                      tuoxie.src = `${EpicFX.extensionPath}asset/img/emoji/emoji_tuoxie2.png`;
                    }
                    if (j == 2) {
                      tuoxie.style.opacity = "0.4";
                    }
                    tuoxie.onload = function () {
                      setTimeout(() => {
                        if (j == 0) {
                          this.style.transform = `translate(${targetX}px, ${targetY + 18}px) scale(0.85) rotate(360deg)`;
                          game.playAudio(`../extension/史诗卡牌/asset/audio/game/Tuoxie1.mp3`);
                          setTimeout(() => {
                            for (let k = imgs.length - 1; k >= 0; k--) {
                              imgs[k].remove();
                            }
                            let {...d} = data[1];
                            d.referNode = target;
                            game.playAudio(`../extension/史诗卡牌/asset/audio/game/Tuoxie2.mp3`);
                            dcdAnim.playSpine(d);
                          }, 800);
                        } else {
                          this.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.55) rotate(367deg)`;
                        }
                      }, 50);
                    };
                    imgs.push(tuoxie);
                  }, 70 * i * 1.5, i);
                }
              }
            }, 250, sp, ii);
          }, 120 * i, i);
        }
      },
      func1: function (source, target, data) {
        let rect = source ? EpicFX.getCenterRect(source.getBoundingClientRect()) : EpicFX.getRect2(ui.handcards1Container.getBoundingClientRect());

        let targetRect = target.getBoundingClientRect();
        let targetX = targetRect.left + targetRect.width / 2 - 50;
        let targetY = targetRect.top + targetRect.height / 2 - 42;

        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            let image = new Image();
            ui.arena.appendChild(image);
            if (source) image.style.transform = `translate(${rect.x - 50}px, ${rect.y - 42}px)`;
            else image.style.transform = `translate(${rect.x}px, ${rect.y}px)`
            image.classList.add("emojiEgg");
            image.src = `${EpicFX.extensionPath}asset/img/emoji/egg.png`;
            image.onload = function () {
              let {...d} = data[2];
              setTimeout(() => {
                const resX = targetX + EpicFX.utils.getRandomNumber(-37, 45);
                const resY = targetY + EpicFX.utils.getRandomNumber(-60, 73);
                this.style.transform = `translate(${resX}px, ${resY}px)`;
                d.x = resX + 50;
                d.y = decadeUI.get.bodySize().height - (resY + 42);
                setTimeout(() => {
                  this.remove();
                }, 250);
                setTimeout((e) => {
                  game.playAudio(`../extension/史诗卡牌/asset/audio/game/Egg0${EpicFX.utils.getRandomNumber(1, 2)}.mp3`);
                  dcdAnim.playSpine(e);
                }, 300, d);
              }, 50);
            }
          }, 120 * i);
        }
        let imgs = [];
        setTimeout(() => {
          for (let i = 0; i < 3; i++) {
            setTimeout((j) => {
              let tuoxie = new Image();
              ui.arena.appendChild(tuoxie);
              if (source) tuoxie.style.transform = `translate(${rect.x - rect.width / 2}px, ${rect.y - rect.height / 2}px) scale(0.1) rotate(180deg)`;
              else tuoxie.style.transform = `translate(${rect.x}px, ${rect.y}px) scale(0.1) rotate(180deg)`;
              if (j == 0) {
                tuoxie.classList.add("emojiTuoxie1");
                tuoxie.src = `${EpicFX.extensionPath}asset/img/emoji/emoji_tuoxie.png`;
              } else {
                tuoxie.classList.add("emojiTuoxie2");
                tuoxie.src = `${EpicFX.extensionPath}asset/img/emoji/emoji_tuoxie2.png`;
              }
              if (j == 2) {
                tuoxie.style.opacity = "0.4";
              }
              tuoxie.onload = function () {
                setTimeout(() => {
                  if (j == 0) {
                    tuoxie.style.transform = `translate(${targetX - 13}px, ${targetY - 64}px) scale(0.8) rotate(360deg)`;
                    game.playAudio(`../extension/史诗卡牌/asset/audio/game/Tuoxie1.mp3`);
                    setTimeout(() => {
                      game.playAudio(`../extension/史诗卡牌/asset/audio/game/Tuoxie2.mp3`);
                      imgs.forEach((e) => {
                        e.remove();
                      });
                    }, 980);
                  } else {
                    tuoxie.style.transform = `translate(${targetX - 13}px, ${targetY - 64}px) scale(0.55) rotate(367deg)`;
                  }
                }, 50);
              };
              imgs.push(tuoxie);
            }, 70 * i * 1.5, i);
          }
        }, 120 * 8);

      }
    },
    "hua": {
      text: "小红花",
      icon: "620253",
      level: 1,
      count: 3,
      name: "flower",
      fps: 24,
      func: function (source, target, data) {
        let rect = source ? EpicFX.getCenterRect(source.getBoundingClientRect()) : EpicFX.getRect2(ui.handcards1Container.getBoundingClientRect());
        let that = this;
        let targetRect = target.getBoundingClientRect();
        let targetX = targetRect.left + targetRect.width / 2 - 55;
        let targetY = targetRect.top + targetRect.height / 2 - 42;
        let image = new Image();
        ui.arena.appendChild(image);
        image.classList.add("emojiFlowerFly");

        if (source) image.style.transform = `translate(${rect.x - 55}px, ${rect.y - 42}px)`;
        else image.style.transform = `translate(${rect.x + 55}px, ${rect.y + 42}px)`;
        image.src = `${EpicFX.emoji.iconPath}flower_fly_small.png`;
        image.onload = function () {
          setTimeout((s, rect, targetX, targetY) => {
            this.style.opacity = 0;
            this.classList.add("SequenceFrameOver");
            setTimeout(() => {
              this.remove();
            }, 1000);
            game.playAudio(`../extension/史诗卡牌/asset/audio/game/Flying0${EpicFX.utils.getRandomNumber(1, 2)}.mp3`);
            let fly = new Image();
            ui.arena.appendChild(fly);
            fly.classList.add("emojiFlowerFly");
            if (s) fly.style.transform = `translate(${rect.x - 55}px, ${rect.y - 42}px)`;
            else fly.style.transform = `translate(${rect.x + 55}px, ${rect.y + 42}px)`;
            fly.src = this.src;
            fly.onload = function () {
              setTimeout(() => {
                let angle2 = EpicFX.utils.getAngle2(target, source ? source : ui.handcards1Container);
                const duration = 3000;
                let startTime = null;
                let scale = 1;
                let x = s ? rect.x - 55 : rect.x + 55;
                let y = s ? rect.y - 42 : rect.y + 42;

                function p(timestamp) {
                  if (!startTime) startTime = timestamp;
                  const progress = Math.min((timestamp - startTime) / duration, 1);
                  x = (targetX - x) * progress + x;
                  y = (targetY - y) * progress + y;
                  scale -= 0.005;
                  if (scale < 0.5) {
                    scale = 0.5;
                  }
                  fly.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${angle2}deg)`;
                  if (x == targetX && y == targetY) {
                    fly.remove();
                    EpicFX.utils.playSequenceFrame({
                      frames: that.data,
                      rect: {
                        width: "80px",
                        height: "76px",
                        x: x - 5,
                        y: y - 15
                      },
                      fps: that.fps,
                      end: function (img) {
                        img.style.opacity = 0;
                        img.classList.add("SequenceFrameOver");
                        setTimeout((e) => {
                          e.remove();
                        }, 1000, img);
                      },
                      before: function () {
                        game.playAudio(`../extension/史诗卡牌/asset/audio/game/Flowers0${EpicFX.utils.getRandomNumber(1, 2)}.mp3`);
                      }
                    })
                    return;
                  }
                  requestAnimationFrame(p);
                }

                requestAnimationFrame(p);
              }, 50);
            }
          }, 200, source, rect, targetX, targetY);
        }

      }
    },
    "egg": {
      text: "鸡蛋",
      icon: "620256",
      level: 1,
      count: 3,
      name: "egg",
      fps: 30,
      func: function (source, target, data) {
        let that = this;
        let me = source ? false : true;
        let sourceRect = me ? ui.window.getBoundingClientRect() : source.getBoundingClientRect();
        const sourceX = sourceRect.x + sourceRect.width / 2;
        const sourceY = sourceRect.y + sourceRect.height / (me ? 1.5 : 2);

        let targetRect = target.getBoundingClientRect();
        let targetX = targetRect.x + targetRect.width / 2;
        let targetY = targetRect.y + targetRect.height / 2;

        let image = new Image();
        image.classList.add("emojiFlowerFly");
        image.src = `${EpicFX.emoji.iconPath}egg_fly.png`;
        image.style.transform = `translate(${sourceX - 65 / 1.25}px, ${sourceY - 55 / 1.35}px)`;
        image.onload = function () {
          const imgRect = this.getBoundingClientRect();
          setTimeout(() => {
            this.style.opacity = 0;
            this.classList.add("SequenceFrameOver");
            setTimeout(() => {
              this.remove();
            }, 900);
            game.playAudio(`../extension/史诗卡牌/asset/audio/game/Flying0${EpicFX.utils.getRandomNumber(1, 2)}.mp3`);
            const fly = new Image();
            fly.classList.add("emojiFlowerFly");
            fly.src = this.src;
            fly.style.transform = `translate(${sourceX - 65 / 1.25}px, ${sourceY - 55 / 1.35}px)`;
            fly.onload = function () {
              // this.style.transform = `translate(${sourceX - imgRect.width / 2}px, ${sourceY - imgRect.height / 2}px)`;
              this.style.setProperty("--x1", `${sourceX - imgRect.width / 1.25}px`);
              this.style.setProperty("--y1", `${sourceY - imgRect.height / 1.35}px`);
              setTimeout(() => {
                let x = targetX - imgRect.width / 1.35;
                let y = targetY - imgRect.height;
                this.style.setProperty("--x", x + "px");
                this.style.setProperty("--y", y + "px");
                this.style.setProperty("--rotate", "1080deg");
                this.classList.add("emojiEggFly");

                setTimeout(() => {
                  this.remove();
                  EpicFX.utils.playSequenceFrame({
                    frames: that.data,
                    rect: {
                      width: "120px",
                      height: "115px",
                      x: targetX - 81,
                      y: targetY - 72
                    },
                    fps: that.fps,
                    end: function (img, x, y) {
                      img.style.setProperty("--x", x + "px");
                      img.style.setProperty("--y", y + "px");
                      img.classList.add("emojiEggFlyOver");
                      setTimeout((e) => {
                        e.remove();
                      }, 1000, img);
                    },
                    before: function () {
                      game.playAudio(`../extension/史诗卡牌/asset/audio/game/Egg0${EpicFX.utils.getRandomNumber(1, 2)}.mp3`);
                    }
                  })

                }, 1000);
              }, 50);
            }
            ui.arena.appendChild(fly);
          }, 50);
        }
        ui.arena.appendChild(image);
      }
    },
    "jiubei": {
      skel: true,
      text: "鲜花酒杯",
      path: "8连送花酒杯/",
      icon: "620252",
      level: 3,
      data: [{
        name: "Ss_BiaoQing_PengBei_meigui",
        scale: 0.5
      }, {
        name: "Ss_BiaoQing_PengBei",
        scale: 0.7
      }],
      func: function (source, target, data) {
        let that = this;
        let me = source ? false : true;
        let sourceRect = me ? ui.window.getBoundingClientRect() : source.getBoundingClientRect();
        const sourceX = sourceRect.x + sourceRect.width / 2;
        const sourceY = sourceRect.y + sourceRect.height / (me ? 1.5 : 2);

        let targetRect = target.getBoundingClientRect();
        let targetX = targetRect.x + targetRect.width / 2;
        let targetY = targetRect.y + targetRect.height / 2;

        game.playAudio("../extension/史诗卡牌/asset/audio/game/renghuahuanhu.mp3");
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            const image = new Image();
            image.classList.add("emojiFlowerFly");
            image.src = `${EpicFX.emoji.iconPath}flower_fly.png`;
            image.style.transform = `translate(${sourceX - 71 / 1.25}px, ${sourceY - 85 / 1.35}px)`;
            image.onload = function () {
              const imgRect = this.getBoundingClientRect();
              let angle4 = EpicFX.utils.getAngle4(targetRect, imgRect, "up", me);
              angle4 = EpicFX.utils.fixAngle(angle4);
              setTimeout(() => {
                let x = targetX - imgRect.width / 1.35;
                let y = targetY - imgRect.height / 1.25;
                let tx = x + EpicFX.utils.getRandomNumber(-39, 25);
                let ty = y + EpicFX.utils.getRandomNumber(-39, 59);
                this.style.setProperty("--x1", `${sourceX - 71 / 1.25}px`);
                this.style.setProperty("--y1", `${sourceY - 85 / 1.35}px`);
                // this.style.setProperty("--x", `${x}px`);
                this.style.setProperty("--x", tx + "px");
                // this.style.setProperty("--y", `${y}px`);
                this.style.setProperty("--y", ty + "px");
                this.style.setProperty("--rotate", angle4 + "deg");
                this.classList.add("emojiFlowerFlying");
                setTimeout(() => {
                  this.remove();
                  let {...data} = that.data[0];
                  data.x = tx + 70;
                  data.y = decadeUI.get.bodySize().height - (ty + 42);
                  dcdAnim.playSpine(data);
                  if (i == 9) {
                    let image1 = new Image();
                    image1.src = `${EpicFX.emoji.iconPath}jiuhu.png`;
                    image1.classList.add("emojiJiuHu");
                    image1.style.transform = `translate(${sourceX - imgRect.width / 1.25}px, ${sourceY - imgRect.height / 1.35}px)`;
                    image1.onload = function () {
                      this.style.setProperty("--x1", `${sourceX - 71 / 1.25}px`);
                      this.style.setProperty("--y1", `${sourceY - 85 / 1.35}px`);
                      this.style.setProperty("--x", x + 65 + "px");
                      this.style.setProperty("--y", y + -56 + "px");
                      this.style.setProperty("--rotate", "0deg");
                      this.classList.add("emojiJiuHuFly");
                      setTimeout(() => {
                        this.remove();
                      }, 500);
                      setTimeout(() => {
                        let duration1 = 0.4333333373069763;
                        let {...data} = that.data[1];
                        data.referNode = target;
                        data.loop = true;
                        let n = dcdAnim.playSpine(data);
                        setTimeout((e) => {
                          e.skeleton.state.setAnimation(0, "play2", false);
                          game.playAudio(`../extension/史诗卡牌/asset/audio/game/ganbeiqingzhu.mp3`);
                          e.loop = false;
                        }, duration1 * 1000 - 50, n);
                      }, 100);
                    }
                    ui.arena.appendChild(image1);
                  }
                }, 500);
                // this.style.transform = `translate(${x}px,${y}px) rotate(${angle4}deg)`;
              }, 50);
            }
            ui.arena.appendChild(image);
          }, 215 * i);
        }

      }
    },
    "caideng": {
      skel: true,
      text: "彩灯",
      path: "彩灯/",
      icon: "620310",
      level: 1,
      descIcon: "609021",
      data: [{
        name: "SS_LiaoTian_Denglong",
        scale: 0.6
      }],
      func: function (source, target, data) {
        let that = this;
        let me = source ? false : true;
        let sourceRect = me ? ui.window.getBoundingClientRect() : source.getBoundingClientRect();
        const sourceX = sourceRect.x + sourceRect.width / 2;
        const sourceY = decadeUI.get.bodySize().height - (sourceRect.y + sourceRect.height / (me ? 1.5 : 2));

        let targetRect = target.getBoundingClientRect();
        let targetX = targetRect.x + targetRect.width / 2;
        let targetY = decadeUI.get.bodySize().height - (targetRect.y + targetRect.height / 2);

        let {...d} = data[0];
        d.x = sourceX;
        d.y = sourceY;
        d.loop = true;
        d.action = "play1";
        let t = dcdAnim.playSpine(d);
        t.moveTo(targetX, targetY, 500);
        setTimeout((e) => {
          game.playAudio(`../extension/史诗卡牌/asset/audio/game/effect_emoji_denglong.mp3`);
          e.skeleton.state.setAnimation(0, "play2", false);
          e.loop = false;
        }, 450, t);
      }
    },
    "lipao": {
      skel: true,
      text: "礼炮",
      path: "lipao/",
      icon: "620309",
      level: 2,
      descIcon: "609021",
      data: [{
        name: "SS_LiaoTian_Lipao",
        scale: 0.65
      }],
      func: function (source, target, data) {
        let that = this;
        let me = source ? false : true;
        let sourceRect = me ? ui.window.getBoundingClientRect() : source.getBoundingClientRect();
        const sourceX = sourceRect.x + sourceRect.width / 2;
        const sourceY = decadeUI.get.bodySize().height - (sourceRect.y + sourceRect.height / (me ? 1.5 : 2));

        let targetRect = target.getBoundingClientRect();
        let targetX = targetRect.x + targetRect.width / 2;
        let targetY = decadeUI.get.bodySize().height - (targetRect.bottom - 20);

        let {...d} = data[0];
        d.x = sourceX;
        d.y = sourceY;
        d.loop = true;
        d.action = "play";
        let t = dcdAnim.playSpine(d);
        t.moveTo(targetX, targetY, 500);
        setTimeout((e) => {
          game.playAudio(`../extension/史诗卡牌/asset/audio/game/effect_emoji_lipao.mp3`);
          e.skeleton.state.setAnimation(0, "play" + EpicFX.utils.getRandomNumber(1, 5), false);
          e.loop = false;
        }, 480, t);
      }
    }
  }
  EpicFX.emoji.humiliationList = ["tuoxie", "egg"];
  EpicFX.emoji.praiseList = ["hua", "jiubei", "caideng", "lipao"];

  function load(data) {
    let len = data.length;

    function l() {
      dcdAnim.loadSpine(data[len - 1].name, "skel", function () {
        dcdAnim.prepSpine(data[len - 1].name);
        len -= 1;
        if (len > 0) l();
      })
    }

    l();
  }

  function load2(data, key) {
    EpicFX.utils.preloadImages({
      count: data.count,
      name: data.name,
      key
    }, EpicFX.emoji.iconPath).then(function (datas) {
      EpicFX.emoji.data[datas.key].data = datas.images;
    });
  }

  EpicFX.emoji.playEmoji = function (source, target, key) {
    if (source != target && key) {
      let datum = EpicFX.emoji.data[key];
      datum.func(source, target, datum.data.slice());
    }
  }

  EpicFX.emoji.createEmoji = function (player) {
    if (!player) player = game.me;
    let btn = document.createElement("div");
    btn.classList.add("emojiBtn");

    let emojiDiv = document.createElement("div");
    emojiDiv.classList.add("emojiDiv");
    emojiDiv.onclick = function (event) {
      event.stopPropagation();
      let display = getComputedStyle(this).display;
      if (display != "none") {
        this.style.display = "none";
        document.querySelectorAll(".emojiTarget").forEach((e) => {
          e.style.display = "none";
        });
      }
    }

    let event = dui.isMobile() ? "touchstart" : "click";
    ui.arena.addEventListener(event, function (e) {
      if (EpicFX.emoji.isSelect && e.target && e.target != game.me) {
        // if (EpicFX.emoji.isSelect && e.target) {
        console.log("e.target: ", e.target);
        let players = game.players.concat(game.dead);
        let player;
        players.forEach(p => {
          if (p != game.me && (p == e.target || p == e.target.parentNode)) player = p;
        });

        if (player) {
          EpicFX.emoji.playEmoji(null, player, EpicFX.emoji.nowPlay);
        }
        document.querySelectorAll(".emojiTarget").forEach((e) => {
          e.style.display = "none";
        });
        EpicFX.emoji.isSelect = false;
        setTimeout(function(){
            window.qhly_forbidPlayerWindow = false;
        },500);
      }
    })

    let emojiBox = document.createElement("div");
    emojiDiv.appendChild(emojiBox);
    emojiBox.classList.add("emojiBox");
    emojiBox.onclick = function (event) {
      event.stopPropagation();
    }

    let emojiContent = document.createElement("div");
    emojiContent.onclick = function (event) {
      event.stopPropagation();
    }
    emojiContent.classList.add("emojiContent");
    emojiBox.appendChild(emojiContent);
    let data = EpicFX.emoji.data;
    let keys = Object.keys(data);
    let frag = document.createDocumentFragment();
    keys.forEach((e) => {
      let icon = document.createElement("div");
      icon.classList.add("emojiIcon");
      icon.style.backgroundImage = `url("${EpicFX.extensionPath}asset/img/emoji/emoji_bg.png")`;
      icon.onclick = function (event) {
        event.stopPropagation()
        document.querySelectorAll(".emojiTarget").forEach((e) => {
          e.style.display = "block";
        });
        EpicFX.emoji.nowPlay = this.emojiName;
        emojiDiv.style.display = "none";
        EpicFX.emoji.isSelect = true;
        window.qhly_forbidPlayerWindow = true;
      }
      icon.emojiName = e;
      if (data[e].descIcon) {
        let descIcon = new Image();
        descIcon.classList.add("emojiDescIcon");
        descIcon.src = `${EpicFX.emoji.iconPath + data[e].descIcon}.png`;
        icon.appendChild(descIcon);
      }

      let img = new Image();
      img.classList.add("emojiImg");
      img.src = `${EpicFX.emoji.iconPath + data[e].icon}.png`;
      icon.appendChild(img);

      let p = document.createElement("p");
      p.classList.add("emojiText");
      p.innerText = data[e].text;
      icon.appendChild(p);
      if (data[e].level) {
        let image = new Image();
        image.classList.add("emojiLevel");
        image.src = `${EpicFX.emoji.iconPath}level_${data[e].level}.png`;
        icon.appendChild(image);
      }
      frag.appendChild(icon);
    });
    emojiContent.appendChild(frag);

    btn.onclick = function () {
      emojiDiv.style.display = "block";
    }
    document.body.appendChild(emojiDiv);
    player.appendChild(btn);
    game.filterPlayer(function (current) {
      return current != game.me;
    }).forEach((e) => {
      let p = document.createElement("p");
      p.classList.add("emojiTarget");
      p.innerText = "目标▲";
      e.appendChild(p);
    });
  }

  EpicFX.watchTriggers(function () {
    return window.dui && window.dcdAnim;
  }, function () {
    let keys = Object.keys(EpicFX.emoji.data);
    keys.forEach((key) => {
      let element = EpicFX.emoji.data[key];
      if (element.skel) {
        for (let i = 0; i < element.data.length; i++) {
          let datum = element.data[i].name;
          element.data[i].name = EpicFX.emoji.path + element.path + datum;
        }
        load(element.data);
      } else {
        load2(element, key);
      }
    })
  });

  EpicFX.watchTriggers(function () {
    return game.me
  }, function () {
    EpicFX.emoji.createEmoji();
  });

  // EpicFX.createTestImg = function (url) {
  //   let img = document.createElement("img");
  //   img.classList.add("testIMG");
  //   img.src = url;
  //   ui.arena.appendChild(img);
  // }
  //
  // EpicFX.playTest = function (source, target) {
  //   let image = new Image();
  //   image.src = `${EpicFX.emoji.iconPath}line.png`;
  //   image.classList.add("testPP");
  //   image.onload = function () {
  //     let rect = source.getBoundingClientRect();
  //     const sourceX = rect.x + rect.width / 2;
  //     const sourceY = rect.y + rect.height / 1.5;
  //     let angle2 = EpicFX.utils.getAngle3(target, source, "r");
  //     let res = EpicFX.utils.checkElementPosition(target);
  //     angle2 += res == 0 ? 0 : -3;
  //     this.style.transform = `translate(${sourceX}px,${sourceY}px) rotate(${angle2}deg)`;
  //   }
  //   ui.arena.appendChild(image);
  // }

  lib.skill._emojiRebate1 = {
    trigger: {player: ['recoverAfter','dying','gainAfter','turnOverAfter']},
    forced: true,
    filter: function (event, player) {
      if (!event.source || event.source == player) return false;
      return true;
    },
    content: function () {
      switch (trigger.name) {
        case "recover":
          let save = trigger.getParent("_save");
          let keys = Object.keys(save);
          if (keys.length) {
            if (player.getEnemies().contains(save.player)) {
              EpicFX.emoji.playEmoji(player, save.player, EpicFX.emoji.humiliationList.randomGet());
            } else {
              EpicFX.emoji.playEmoji(player, save.player, EpicFX.emoji.praiseList.randomGet());
            }
          }
          break;
        case "dying":
          if (trigger.source) {
            if (player.getEnemies().contains(trigger.source)) {
              EpicFX.emoji.playEmoji(player, trigger.source, EpicFX.emoji.humiliationList.randomGet());
            }
          }
          break;
        case "turnOver":
          if (trigger.parent) {
            if (player.getEnemies().contains(trigger.parent.player)) {
              EpicFX.emoji.playEmoji(player, trigger.parent.player, EpicFX.emoji.humiliationList.randomGet());
            } else {
              EpicFX.emoji.playEmoji(player, trigger.parent.player, EpicFX.emoji.praiseList.randomGet());
            }
          }
          break;
        case "gain":
          if (trigger.giver && trigger.cards.length >= 2 && player.getFriends().contains(trigger.giver) ) {
            EpicFX.emoji.playEmoji(player, trigger.giver, EpicFX.emoji.praiseList.randomGet());
          }
          break;
      }
    }
  }
});