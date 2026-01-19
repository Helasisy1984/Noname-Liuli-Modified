game.import("extension",function(lib,game,ui,get,ai,_status){
    //马上调整屏幕比例
    //window.moveTo(0, 0);
    //window.resizeTo(1080, 580);
return {name:"电脑适配",content:function(config,pack){
    //去掉手杀结算提示
    game.saveConfig('shouShaJieSuanInfo', true);
    //有问题先禁了
    game.saveConfig('extension_雷霆万钧_UIpatch', false);
    //666东西都给我移到app/menu.js去了
    lib.skill._fixCAILANZI = {
        trigger: {
            global: 'gameStart',
        },
        filter: function(event, player) {
            return lib.config.extension_手杀ui_enable;
        },
        silent: true,
        firstDo: true,
        forced: true,
        popup: false,
        content: function() {
            game.filterPlayer2().forEach(player => {
                if (!player.touchSetupEmoji_PC) {
                    let touchStartX, touchStartY; // 记录触摸起点坐标
                    let canUse = true;
                    if(!player.touchSetupEmoji) player.touchSetupEmoji = ui.create.div(player);
                    player.touchSetupEmoji_PC = true;
                    game.createCss(`.cailanzi_click_player {
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        z-index: 1000;
                    }`);
                    player.touchSetupEmoji.classList.add('cailanzi_click_player');

                    // 监听触摸开始（记录起点）
                    player.touchSetupEmoji.addEventListener(
                        'mousedown',
                            function (e) {
                            if(game.isMine(player)||player.isDead()||_status.over||!game.use_throw_emoji) {
                                canUse = false;
                                return;
                            }
                            const touch = e;
                            touchStartX = touch.clientX;
                            touchStartY = touch.clientY;
                            // 可选：阻止默认行为（如页面滚动）
                            // e.preventDefault();
                        },
                        { capture: true } // 捕获阶段触发
                    );

                    // 监听触摸结束（判断距离）
                    player.touchSetupEmoji.addEventListener(
                        'mouseup',
                        function (e) {
                            if (!touchStartX || !touchStartY || !canUse || !game.use_throw_emoji) return;

                            const touch = e;
                            const deltaX = touch.clientX - touchStartX;
                            const deltaY = touch.clientY - touchStartY;
                            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

                            // 移动距离小于阈值视为点击（推荐 5-10px）
                            if (distance < 10) {
                                game.use_throw_emoji(player);
                                // 可选：阻止后续事件（如 click 事件）
                                // e.preventDefault();
                            }

                            touchStartX = touchStartY = null; // 重置坐标
                        },
                        { capture: true } // 捕获阶段触发
                    );
                }
            });
        }
    }
},precontent:function(){
    //马上变成手机
    lib.device = "android";
    //修一下，别被lib.device蒙了
    game.export = function(textToWrite,name){
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = name||'noname';
        fileNameToSaveAs=fileNameToSaveAs.replace(/\\|\/|\:|\?|\"|\*|<|>|\|/g,'.');

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    };
},config:{},help:{},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
        },
        translate:{
        },
    },
    intro:"就是帮你在电脑环境中尽量还原手机的配置，以达到最佳游玩体验",
    author:"Helasisy",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}})