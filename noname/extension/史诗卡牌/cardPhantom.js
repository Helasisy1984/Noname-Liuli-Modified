'use strict';
EpicFX.module.import(function (lib, game, ui, get, ai, _status) {
  if (window.process) {
    const {versions} = process;
    const electronVersion = parseFloat(versions.electron);
    let remote;
    if (electronVersion >= 14) {
      remote = require('@electron/remote');
    } else {
      remote = require('electron').remote;
    }

    const currentWindow = remote.getCurrentWindow();

    currentWindow.on('focus', () => {
      var elements = document.querySelectorAll(".phantom");
      if (elements.length) {
        const fragment = document.createDocumentFragment();
        elements.forEach((element) => fragment.appendChild(element));
        fragment.childNodes.forEach((node) => node.remove());
      }
    });
  }

  EpicFX.card.phantom3 = function (card) {
    if (!card || !card.phantom || card.phantom.length < 2) return;
    var cards = card.phantom;
    var t = card.style.transform;
    var n = -1;
    requestAnimationFrame(function () {
      cards.playPhantom = setInterval((cards, t) => {
        n++;
        if (n >= cards.length - 1) clearInterval(cards.playPhantom);
        if (cards[n]&&cards[n].followParent) {
            //cards[n].style.transform = cards[n].parentCard.style.transform;//t;
            cards[n].followParent();
        }
      }, 28, cards, t);
    })
  };
  EpicFX.card.phantom4 = function (card) {
    if (!card) return;
    // if (card.judge) return;
    if (!card.judge) {
      card.phantom = [];
      //card.style.zIndex = 1 + 6;
      let frag = document.createDocumentFragment();
      for (var j = 2; j >= 1; j--) {
        var temp = this.copy(card);
        //temp.style.transition = "all 0.46s";
        temp.classList.add("phantom")
        temp.classList.remove("thrown")
        //temp.style.opacity = j === 1 ? 0.5 : 0.8;
        temp.style.opacity = j === 1 ? 0.3 : 0.5;
        if(j === 1) {
            temp.isShade2=true;
        }
        temp.followParent=function(nowait){
            var wait=(this.isShade2)?100:50;
            if(nowait) wait=0;
            setTimeout(function(me){
                if(!me||!me.parentCard) return;
                me.style.transform=me.parentCard.style.transform;
            }, wait, this);
        }
        //temp.style.filter = j === 1 ? 'blur(2px)' : 'blur(1px)';
        //temp.style.zIndex = 1 + 6 - j;
        temp.style.zIndex = 5;
        temp.style.transform = card.style.transform;
        temp.parentCard=card;
        frag.appendChild(temp);
        card.phantom.push(temp);
      }
      ui.arena.appendChild(frag);
    }
  };
  EpicFX.card.clearPhantom2 = function (card, time) {
    if (!card || !card.phantom) return;
    /*if (time != 0) {
      card.style.zIndex = 1 + 5;
    }*/
    setTimeout((c) => {
      for (let i = 0; i < c.length; i++) {
        c[i].style.opacity=0;
        c[i].followParent();
        //c[i].style.transform=c[i].parentCard.style.transform;
        setTimeout(function(){
            if(c[i]?.remove) c[i].remove();
        },500);
      }
    }, time, card.phantom);
  };
  EpicFX.card.copy = function (card) {
    if (!card) return;
    var outerHTML = card.outerHTML;
    var c = document.createElement('div');
    // Convert to a DOM using "DOMParser"
    c.innerHTML = outerHTML;
    return c.childNodes[0];
  };

  let Player = {};
  Player.$draw = function (num, init, config) {
    // epicfx
    if (game.chess)
      return this._super.$draw.call(this, num, init, config);

    if (init !== false && init !== 'nobroadcast') {
      game.broadcast(function (player, num, init, config) {
        player.$draw(num, init, config);
      }, this, num, init, config);
    }

    var cards;
    var isDrawCard;
    if (get.itemtype(num) == 'cards') {
      cards = num.concat();
      isDrawCard = true;
    } else if (get.itemtype(num) == 'card') {
      cards = [num];
      isDrawCard = true;
    } else if (typeof num == 'number') {
      cards = new Array(num);
    } else {
      cards = new Array(1);
    }

    if (init !== false) {
      if (isDrawCard) {
        game.addVideo('drawCard', this, get.cardsInfo(cards));
      } else {
        game.addVideo('draw', this, num);
      }
    }

    if (game.me == this)
      return;

    var fragment = document.createDocumentFragment();
    var card;
    for (var i = 0; i < cards.length; i++) {
      card = cards[i];
      if (card == null)
        card = dui.element.create('card thrown drawingcard');
      else
        card = card.copy('thrown', 'drawingcard', false);

      card.fixed = true;
      cards[i] = card;
      fragment.appendChild(card);
    }

    var player = this;
    dui.layoutDrawCards(cards, player, true, "ready");

    ui.arena.appendChild(fragment);
    dui.queueNextFrameTick(function () {
      dui.layoutDrawCards(cards, player, false, "draw");
      dui.delayRemoveCards(cards, 460, 220);
    });
  };
  Player.$give = function (cards, target, log, record) {
    // epicfx
    var itemtype;
    var duiMod = (cards.duiMod && game.me == target);
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
        return;
      }
    }

    if (record !== false) {
      var cards2 = cards;
      if (itemtype == 'number') {
        cards2 = cards.length;
        game.addVideo('give', this, [cards2, target.dataset.position]);
      } else {
        game.addVideo('giveCard', this, [get.cardsInfo(cards2), target.dataset.position]);
      }

      game.broadcast(function (source, cards2, target, record) {
        source.$give(cards2, target, false, record);
      }, this, cards2, target, record);
    }

    if (log != false) {
      if (itemtype == 'number')
        game.log(target, '从', this, '获得了' + get.cnNumber(cards.length) + '张牌');
      else
        game.log(target, '从', this, '获得了', cards);
    }

    if (this.$givemod) {
      this.$givemod(cards, target);
      return;
    }

    if (duiMod)
      return;

    var card;
    var hand = dui.boundsCaches.hand;
    hand.check();

    var draws = [];
    var player = this;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      card = cards[i];
      if (card) {
        var cp = card.copy('card', 'thrown', 'gainingcard', false);
        var hs = player == game.me;
        if (hs) {
          if (card.throwWith)
            hs = card.throwWith == 'h' || card.throwWith == 's';
          else
            hs = card.parentNode == player.node.handcards1;
        }

        if (hs) {
          cp.tx = Math.round(hand.x + card.tx);
          cp.ty = Math.round(hand.y + 30 + card.ty);
          cp.scaled = true;
          cp.style.transform = 'translate(' + cp.tx + 'px,' + cp.ty + 'px) scale(' + hand.cardScale + ')';
        } else {
          draws.push(cp);
        }
        card = cp;
      } else {
        card = dui.element.create('card thrown gainingcard');
        draws.push(card);
      }

      cards[i] = card;
      cards[i].fixed = true;
      fragment.appendChild(cards[i]);
    }

    if (draws.length)
      dui.layoutDrawCards(draws, player, false, "ready");

    ui.arena.appendChild(fragment);
    dui.queueNextFrameTick(function () {
      dui.layoutDrawCards(cards, target, false, "draw");
      dui.delayRemoveCards(cards, 460, 220);
    });
  };
  Player.$gain2 = function (cards, log) {
    // epicfx
    var type = get.itemtype(cards);
    if (type != 'cards') {
      if (type != 'card')
        return;

      type = 'cards';
      cards = [cards];
    }

    if (log === true)
      game.log(this, '获得了', cards);

    game.broadcast(function (player, cards) {
      player.$gain2(cards);
    }, this, cards);

    var gains = [];
    var draws = [];

    var card;
    var clone;
    for (var i = 0; i < cards.length; i++) {
      clone = cards[i].clone;
      card = cards[i].copy('thrown', 'gainingcard');
      card.fixed = true;
      if (clone && clone.parentNode == ui.arena) {
        card.scaled = true;
        card.style.transform = clone.style.transform;
        gains.push(card);
      } else {
        draws.push(card);
      }
    }

    if (gains.length)
      game.addVideo('gain2', this, get.cardsInfo(gains));

    if (draws.length)
      game.addVideo('drawCard', this, get.cardsInfo(draws));


    if (cards.duiMod && this == game.me)
      return;

    cards = gains.concat(draws);
    dui.layoutDrawCards(draws, this, true, "ready");

    var player = this;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      if (!draws.length) EpicFX.card.phantom4(cards[i]);

      fragment.appendChild(cards[i]);
    }

    ui.arena.appendChild(fragment);
    dui.queueNextFrameTick(function () {
      dui.layoutDrawCards(cards, player, false, "draw");
      dui.delayRemoveCards(cards, 460, 220);
    });
  };
  ;

  EpicFX.watchTriggers(function () {
    return window.dui && window.decadeModule;
  }, function () {
    EpicFX.overrides(lib.element.player, Player);
    for (let i = 0; i < game.players.length; i++) {
      let player = game.players[i];
      EpicFX.overrides(player, Player);
    }
    
   
    
    EpicFX.checks.push("lib.element.player");
  });

  EpicFX.watchTriggers(function () {
    return window.dui && window.decadeModule;
  }, function () {
    dui.layoutDrawCards = function (cards, player, center, timing) {
      // epicfx
      var bounds = dui.boundsCaches.arena;
      if (!bounds.updated)
        bounds.update();

      player.checkBoundsCache();
      var playerX = player.cacheLeft;
      var playerY = player.cacheTop;
      var playerW = player.cacheWidth;
      var playerH = player.cacheHeight;

      var pw = bounds.width;
      var ph = bounds.height;
      var cw = bounds.cardWidth;
      var ch = bounds.cardHeight;
      var cs = bounds.cardScale;
      var csw = cw * cs;

      var xMargin = 27;
      var xStart = (center ? (pw - playerW) / 2 : playerX) - csw / 2 - (cw - csw) / 2;
      var totalW = xMargin * cards.length + (csw - xMargin);
      var limitW = playerW + csw;

      if (totalW > limitW) {
        xMargin = csw - Math.abs(limitW - csw * cards.length) / (cards.length - 1);
      } else {
        xStart += (limitW - totalW) / 2;
      }

      var x;
      var y;
      if (center)
        y = Math.round((ph - ch) / 2);
      else
        y = Math.round(playerY + (playerH - ch) / 2);

      var card;
      for (var i = 0; i < cards.length; i++) {
        x = Math.round(xStart + i * xMargin);
        card = cards[i];
        card.tx = x;
        card.ty = y;
        card.scaled = true;
        card.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + cs + ')';
        if (timing == "ready") {
          EpicFX.card.phantom4(card);
        } else {
          if (timing == "draw") {
            EpicFX.card.phantom3(card);
          }
        }
      }
    };
    dui.delayRemoveCards = function (cards, delay, delay2) {
      // epicfx
      if (!Array.isArray(cards))
        cards = [cards];

      setTimeout(function (cards, delay2) {
        var remove = function (cards) {
          for (var i = 0; i < cards.length; i++) {
            EpicFX.card.clearPhantom2(cards[i], 0);
            //delete cards[i].phantom;
            cards[i].remove();
          }
        };

        if (delay2 == null) {
          remove(cards);
          return;
        }

        for (var i = 0; i < cards.length; i++)
          cards[i].classList.add('removing');

        setTimeout(remove, delay2, cards);
      }, delay, cards, delay2);
    };
    EpicFX.checks.push("layoutDrawCards");
  })
})