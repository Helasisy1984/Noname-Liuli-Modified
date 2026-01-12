// 原代码：
/* 
            'clickPlayerDynamic': {
                name: "点击角色换肤",
                "init": true,
                "intro": "点击角色弹出换肤功能",
            },
            'enableQianhuanAudio': {
                name: "启用千幻语音集成",
                "init": true,
                "intro": "皮肤切换后自动读取千幻聆音的语音资源，需要安装千幻聆音扩展",
            },

            'showTopArc': {
                name: "显示顶部圆弧",
                "init": true,
                "intro": "是否显示顶部圆弧",
                onchange: function(value) {
                    window.showTopArc = value;
                    // 为所有已存在的角色重新检查圆弧显示
                    game.players.concat(game.dead).forEach(function(player) {
                        if(player) skinSwitch.skinSwitchCheckYH(player);
                    });
                }
            },
*/

// 修改后的代码（已删除千幻语音集成功能）：
/*
            'clickPlayerDynamic': {
                name: "点击角色换肤",
                "init": true,
                "intro": "点击角色弹出换肤功能",
            },

            'showTopArc': {
                name: "显示顶部圆弧",
                "init": true,
                "intro": "是否显示顶部圆弧",
                onchange: function(value) {
                    window.showTopArc = value;
                    // 为所有已存在的角色重新检查圆弧显示
                    game.players.concat(game.dead).forEach(function(player) {
                        if(player) skinSwitch.skinSwitchCheckYH(player);
                    });
                }
            },
*/ 