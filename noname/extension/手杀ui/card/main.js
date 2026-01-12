app.import(function(lib, game, ui, get, ai, _status, app) {

  var plugin = {
    name: 'card',
    filter: function() {
      return !['chess', 'tafang', 'stone', 'connect'].contains(get.mode());
    },
    content: function(next) {
      return app.waitAllFunction([
        function (next) {
          game.saveConfig('phonelayout', true);
          game.saveConfig('cardshape', 'default');
          game.saveConfig('fold_card', true);
          next();
        },
        function(next) {
         if (lib.config.extension_手杀ui_yangShi == 'on') {
					if (lib.device == 'ios' || lib.device == 'android') {
						lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1_mobile', next);
					} else {
						lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1_pc', next);
					}
				} else {
					lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main2', next);
				}
        },
      ], next);
    },
    precontent: function () {

      app.reWriteFunction(lib.configMenu.appearence.config, {
        update: [null, function(res, config, map) {
          map.cardshape.hide();
          map.card_style.hide();
          map.cardback_style.hide();
          map.phonelayout.hide();
          map.cardtext_font.hide();
          map.fold_card.hide();
        }],
      });

      app.reWriteFunction(ui, {
        updatehl: [/112/g, '91'],
      });
      app.reWriteFunction(ui, {
        updatehl: [null, function() {
          plugin.getViewCard(game.me.getCards(), game.me);
        }],
      });
      app.reWriteFunction(game, {
        loop: [function() {
          if (game.players && game.players.length) {
            game.players.forEach(function(player) {
              plugin.getViewCard(player.getCards(), player);
            });
          }
        }],
      });

      
      app.reWriteFunction(lib.element.player, {
        $throw: [function(args, cards) {
          if (Array.isArray(cards) && cards.length === 0) {
            var evt = _status.event;
            if (evt && evt.card && evt.cards === cards) {
              var card = ui.create.card().init([
                evt.card.suit,
                evt.card.number,
                evt.card.name,
                evt.card.nature,
              ]);
              card.dataset.virtualCard = true;
              args[0] = card;
            }
          }

          setTimeout(function() {
            var _cards = Array.isArray(cards) ? cards : [cards];
            _cards.forEach(function (item) {
              if (item._xitem) {
                item._xitem.delete();
                delete item._xitem;
              }
            });
          }, 0);
        }],
      });
      app.reWriteFunction(HTMLDivElement.prototype, {
        fix: [function() {
          if (get.itemtype(this) === 'card') {
            plugin.getViewCard(this);
          }
        }],
      });

      app.reWriteFunction(ui.create, {
        card: [null, function(node) {
          node.node.virtualMark = ui.create.div('.virtualMark', node);
       
        }],
      });

    /*  lib.element.player.$throwordered2 = function(node, nosource) {
        node.classList.add('thrown');
        node.classList.add('center');
        node.hide();
        node.style.transitionProperty = 'left,top,opacity,transform';

        if (!nosource) {
          var nx = [50, -52];
          var ny = [50, -52];
          nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
          ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
          var dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
          var dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
        }
        node.style.transform = ' translate(' + dx + 'px,' + dy + 'px)';
        ui.arena.appendChild(node);
        ui.refresh(node);
        for (var i = 0; i < ui.thrown.length; i++) {
          if (ui.thrown[i].parentNode != ui.arena ||
            ui.thrown[i].classList.contains('removing')) {
            ui.thrown.splice(i--, 1);
          }
        }
        ui.thrown.push(node);
        var center = (ui.thrown.length - 1) / 2;
        var offset = 90;
        if (ui.arena.offsetWidth < ui.thrown.length * 90) {
          offset = ui.arena.offsetWidth / ui.thrown.length;
        }

        ui.thrown.forEach(function (item, index) {
          var x = (index - center) * offset;
          item.style.transform = 'translate(' + x + 'px, 0)';
        });
        node.show();
        lib.listenEnd(node);
        return node;
      };*/

      app.on('updatejm', function(player) {
        plugin.updatej(player);
      });
    },
    getViewCard: function(card, player) {
      if (get.itemtype(card) === 'cards') {
        return card.map(function(item) {
          return plugin.getViewCard(item, player);
        });
      }
      if (get.itemtype(card) !== 'card') return;
      var viewName, viewNature, viewSuit;

      /*if (get.itemtype(player) === 'player') {
        var skills = player.getSkills(true, false).concat(lib.skill.global);
        game.expandSkills(skills);
        for (var i = 0; i < skills.length; i++) {
          var info = lib.skill[skills[i]];
          if (info.mod && info.mod.cardname) {
            viewName = info.mod.cardname(card, player, viewName);
          }
          if (info.mod && info.mod.cardnature) {
            viewNature = info.mod.cardnature(card, player, viewName);
          }
          if (info.mod && info.mod.suit) {
            viewSuit = info.mod.suit(card, viewSuit || get.suit(card));
          }
        }
      }*/

      var viewCard = [viewSuit, get.number(card), viewName, viewNature];
      return viewCard;
    },
    updatej: function(player) {
      var node = player.node.xJudges;
      if (!node) return;
      if (!ui.arena) return;
      if (player === game.me && node.parentNode !== ui.arena) {
        node.goto(ui.arena);
      } else if (player !== game.me && node.parentNode !== player) {
        node.goto(player);
      }

      setTimeout(function() {
        
      }, 0);
    },
  };

  return plugin;
});
