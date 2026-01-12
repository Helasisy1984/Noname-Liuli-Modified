app.import(function(lib, game, ui, get, ai, _status, app) {

  var plugin = {
    name: 'card',
    filter: function() {
      return !['chess', 'tafang', 'stone', 'connect'].contains(get.mode());
    },
    content: function(next) {
      return app.waitAllFunction([
        function(next) {
          lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1', next);
        },
      ], next);
    },
    precontent: function () {
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
      app.reWriteFunction(ui.create, {
        card: [null, function(node) {
          node.node.virtualMark = ui.create.div('.virtualMark', node);
       
        }],
      });
    },
  };

  return plugin;
});
