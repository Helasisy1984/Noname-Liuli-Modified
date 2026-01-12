app.import(function(lib, game, ui, get, ai, _status, app) {
  var plugin = {
    name: 'dialog',
    content: function(next) {
      app.waitAllFunction([
        function(next) {
          game.saveConfig('button_press', false);
          next();
        },
        function(next) {
          lib.init.css(lib.assetURL + 'extension/' + app.name +
            '/' + plugin.name, 'main1', next);
        },
      ], next);
    },
    precontent: function() {
      app.reWriteFunction(ui.create, {
        dialog: [null, function(dialog) {
          dialog.classList.add('xdialog');
          app.reWriteFunction(dialog, {
            hide: [null, function() {
              app.emit('dialog:change', dialog);
            }],
          });
        }],
      });

      app.reWriteFunction(lib.element.dialog, {
        open: [null, function() {
          app.emit('dialog:change', this);
        }],
        close: [null, function() {
          app.emit('dialog:change', this);
        }],
      });

      app.reWriteFunction(lib.element.player, {
        
        
        
        markSkill: [function(args, name) {
          var info = lib.skill[name];
          if (!info) return;
          if (info.limited) return this;
          if (info.intro && info.intro.content === 'limited') return this;
        }],
      });

    

      app.reWriteFunction(lib.configMenu.appearence.config, {
        update: [null, function(res, config, map) {
          map.button_press.hide();
        }],
      });

      app.on('playerUpdateE', function(player) {
        plugin.updateMark(player);
      });
    },
    element: {
      mark: {
        delete: function() {
          this.remove();
        },
        setName: function(name) {
          name = get.translation(name) || name;
          if (!name || !name.trim()) {
            this.classList.add('unshow');
            this.node.name.innerHTML = '';
          } else {
            this.classList.remove('unshow');
            this.node.name.innerHTML = get.translation(name) || name;
          }
          return this;
        },
        setCount: function(count) {
          if (typeof count === 'number') {
            this.node.count.innerHTML = count;
            this.node.count.classList.remove('unshow');
          } else {
            this.node.count.innerHTML = '';
            this.node.count.classList.add('unshow');
          }
          return this;
        },
        setExtra: function(extra) {
          var str = '';

          if (!Array.isArray(extra)) extra = [extra]
          extra.forEach(function(item) {
            if (!item || typeof item !== 'string') return this;
            if (item.indexOf('#') === 0) {
              item = item.substr(1);
              str += '<br>';
            }
            str += '<div>' + item + '</div>';
          });

          if (str) {
            this.node.extra.classList.remove('unshow');
            this.node.extra.innerHTML = str;
          } else if (!this._characterMark) {
            this.node.extra.innerHTML = '';
            this.node.extra.classList.add('unshow');
          }
          return this;
        },
        setBackground: function(name, type) {
          var skill = lib.skill[this.name];
          if (skill && skill.intro && skill.intro.markExtra) return this;
          if (type === 'character') {
            name = get.translation(name) || name;
            this._characterMark = true;
            return this.setExtra(name);
          }
          return this;
        },
        _customintro: function(uiintro) {
          var node = this;
          var info = node.info;
          var player = node.parentNode.parentNode;
          if (info.name) {
            if (typeof info.name == 'function') {
              var named = info.name(player.storage[node.skill], player);
              if (named) {
                uiintro.add(named);
              }
            } else {
              uiintro.add(info.name);
            }
          } else if (info.name !== false) {
            uiintro.add(get.translation(node.skill));
          }

          if (typeof info.mark == 'function') {
            var stint = info.mark(uiintro, player.storage[node.skill], player);
            if (stint) {
              var placetext = uiintro.add('<div class="text" style="display:inline">' + stint + '</div>');
              if (stint.indexOf('<div class="skill"') != 0) {
                uiintro._place_text = placetext;
              }
            }
          } else {
            var stint = get.storageintro(info.content, player.storage[node.skill],
              player, uiintro, node.skill);
            if (stint) {
              if (stint[0] == '@') {
                uiintro.add('<div class="caption">' + stint.slice(1) + '</div>');
              } else {
                var placetext = uiintro.add('<div class="text" style="display:inline">' + stint + '</div>');
                if (stint.indexOf('<div class="skill"') != 0) {
                  uiintro._place_text = placetext;
                }
              }
            }
          }
          uiintro.add(ui.create.div('.placeholder.slim'));
        },
      },
    },
    click: {
      mark: function(e) {
        e.stopPropagation();
        delete this._waitingfordrag;
        if (_status.dragged) return;
        if (_status.clicked) return;
        if (ui.intro) return;
        var rect = this.getBoundingClientRect();
        ui.click.touchpop();
        ui.click.intro.call(this, {
          clientX: rect.left + 18,
          clientY: rect.top + 12
        });
        _status.clicked = false;
      },
    },
    updateMark: function(player) {
      var eh = player.node.equips.childNodes.length * 22;
      var bv = Math.max(88, eh) * 0.8 + 1.6;
      player.node.marks.style.bottom = bv + 'px';
    },
  };

  return plugin;
});
