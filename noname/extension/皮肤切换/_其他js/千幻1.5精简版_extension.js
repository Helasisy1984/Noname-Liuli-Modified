game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"千幻聆音",content:function(config,pack){
    //提示：本扩展源代码向无名杀社区开放，欢迎大家借鉴和参考代码。（但是对于部分品行卑劣、素质低下、造谣诽谤的扩展作者，工作室保留禁止其复制、借鉴、引用、抄袭本扩展原创代码的权力。）
    
    //判断是否安装了某个扩展，用来处理兼容事宜。目前暂时未遇到。
    game.qhly_hasExtension = function(str){
        return lib.config.extensions && lib.config.extensions.contains(str) && lib.config['extension_'+str+'_enable'];
    };

    //关闭无名杀原有的换肤功能
    if(lib.config.change_skin){
        game.saveConfig('change_skin',false);
        alert("本扩展与无名杀系统自带换肤不兼容。已经自动关闭系统换肤设置，并保存了原配置。关闭【千幻聆音】扩展前，请在扩展界面点击【恢复官方的皮肤设置】。");
    }

    //将无名杀原有的换肤数据存档，并清空。
    if(lib.config.skin && lib.config.skin.qhly_config != 'yes'){
        game.saveConfig('qhly_save_offical_skin',lib.config.skin);
        game.saveConfig('skin',{'qhly_config':'yes'});
    }

    //默认皮肤包
    var DEFAULT_PACKAGE = {
        isExt:false,//不是扩展
        filterCharacter:function(name){
            return true;//对所有角色生效
        },
        prefix:'image/character/',//武将原图在image/character内
        skin:{
            standard:'extension/千幻聆音/sanguoskin/',//皮肤图片在千幻聆音扩展内的位置。
        },
        audioOrigin:'',
        audio:'extension/千幻聆音/sanguoaudio/',//皮肤配音文件在千幻聆音扩展内的位置。
    };

    //初始化一个皮肤包的数组，后面会经常扫描这个数组以找到武将的皮肤。
    if(!lib.qhlypkg){
        lib.qhlypkg = [];
    }

    //初始化千幻聆音皮肤相关的数据
    if(!lib.config.qhly_skinset){
        game.saveConfig('qhly_skinset',{
            skin:{
                //key-value方式，存放武将皮肤名
            },
            skinAudioList:{
                //key-value方式，存放武将皮肤配音
            },
            audioReplace:{
                //key-value方式，存放配音映射逻辑。
            }
        });
    }
    
    //持久化存储皮肤数据
    game.qhlySyncConfig=function(){
        game.saveConfig('qhly_skinset',lib.config.qhly_skinset);
    };

    //修改播放音频的函数。
    game.qhly_originPlayAudio = game.playAudio;
    game.playAudio=function(){
        var string = '';
        var others = [];
        for(var arg of arguments){//将参数拼接成一个字符串，方便查找映射
            if(typeof arg == 'string' || typeof arg == 'number'){
                string = string+"/"+arg;
            }else{
                others.push(arg);
            }
        }
        var replace = string.slice(1);
        if(replace.length){
            var rp = lib.config.qhly_skinset.audioReplace[replace];
            if(rp){
                //如果存在映射，用映射的路径替换原有的路径，并调用原来的音频播放函数，以达到替换配音的效果。
                var args = rp.split("/");
                args.addArray(others);
                return game.qhly_originPlayAudio.apply(this,args);
            }
        }
        return game.qhly_originPlayAudio.apply(this,arguments);
    };

    game.qhly_originPlaySkillAudio = game.playSkillAudio;
    game.playSkillAudio=function(name,index){
        var replaceKey = "skill/"+name;
        if(!index){
            index = Math.ceil(Math.random()*2);
        }
        replaceKey = replaceKey+index;
        var rp = lib.config.qhly_skinset.audioReplace[replaceKey];
        if(rp){
            var args = rp.split("/");
            return game.qhly_originPlayAudio.apply(this,args);
        }
        return game.qhly_originPlaySkillAudio.apply(this,arguments);
    };

    //在设置完皮肤后，刷新界面，检测场上的角色是否是设置的角色，并更换其皮肤。
    game.qhly_refresh=function(name){
        var players = game.players;
        if(players){
            players = players.slice(0);
        }else{
            return;
        }
        if(game.dead){
            players = players.concat(game.dead);
        }
        if(!players.length)return;
        players = players.filter(function(player){
            if(player.name == name || player.name1 == name || player.name2 == name){
                return true;
            }
            var name2 = name;
            //关于国战武将特别配置。
            if(name2.indexOf('gz_') < 0){
                name2 = 'gz_'+name2;
            }else{
                name2 = name.slice(3);
            }
            return player.name == name2 || player.name1 == name2 || player.name2 == name2;
        });
        if(!players.length)return;
        for(var player of players){
            var avatar;
            var fakeavatar;
            var name2 = "";
            if(name.indexOf('gz_') < 0){
                name2 = 'gz_'+name;
            }else{
                name2 = name.slice(3);
            }
            if(player.name == name || player.name1 == name || player.name == name2 || player.name1 == name2){
                avatar = player.node.avatar;
                fakeavatar = avatar.cloneNode(true);
            }else if(player.name2 == name || player.name2 == name2){
                avatar = player.node.avatar2;
                fakeavatar = avatar.cloneNode(true);
            }else{
                break;
            }
            var finish=function(bool){
                var player=avatar.parentNode;
                if(bool){
                    fakeavatar.style.boxShadow='none';
                    player.insertBefore(fakeavatar,avatar.nextSibling);
                    setTimeout(function(){
                        fakeavatar.delete();
                    },100);
                }
                if(bool&&!lib.config.low_performance){
                    player.$rare();
                }
            }
            avatar.setBackground(name,'character');
            finish(true);
        }
    };
    
    //修改设置背景图片的函数，以达到替换皮肤的效果。
    HTMLDivElement.prototype.qhly_origin_setBackgroundImage = HTMLDivElement.prototype.setBackgroundImage;
    HTMLDivElement.prototype.setBackgroundImage = function(name){
        if((this.classList.contains('avatar') || this.classList.contains('avatar2'))){
            //判断当前的div是否是人物avatar。
            var that = this;
            var setByName=function(cname){
                if(lib.config.qhly_skinset.skin[cname]){
                    var skin = lib.config.qhly_skinset.skin[cname];
                    if(!skin)return false;
                    var skinPackage = game.qhly_foundPackage(cname);
                    //获取相应的皮肤包，并修改图片路径。
                    var dest = null;
                    if(skinPackage.isExt){
                        if(skinPackage.isLutou){
                            dest = skinPackage.skin.lutou;
                            if(!dest){
                                dest = skinPackage.skin.standard;
                            }
                        }else{
                            dest = skinPackage.skin.standard;
                        }
                    }else{
                        dest = skinPackage.skin.standard;
                    }
                    that.qhly_origin_setBackgroundImage(dest+cname+"/"+skin);
                    return true;
                }
            };
            if(name.indexOf('image/character/') == 0){
                var that = this;
                var cname = name.replace('image/character/','');
                if(cname.indexOf('/') < 0){
                    var found = cname.lastIndexOf('.');
                    if(found >= 0){
                        cname = cname.slice(0,found);
                    }
                    if(setByName(cname)){
                        return;
                    }
                }
            }else if(name.indexOf('extension/') == 0){
                var that = this;
                var cname = name.replace('extension/','');
                var foundS = cname.lastIndexOf("/");
                var foundDot = cname.lastIndexOf(".");
                if(foundS >= 0){
                    if(foundDot < 0){
                        foundDot = cname.length;
                    }
                    cname = cname.slice(foundS+1,foundDot);
                }
                if(cname.length){
                    if(setByName(cname)){
                        return;
                    }
                }
            }
        }
        this.qhly_origin_setBackgroundImage.apply(this,arguments);
    };
    
    //获取皮肤文件。参数为武将名称和皮肤名称。注意需要包含扩展名。
    game.qhly_getSkinFile=function(name,skin){
        var skinPackage = game.qhly_foundPackage(name);
        var dest = null;
        if(skinPackage.isExt){
            if(skinPackage.isLutou){
                dest = skinPackage.skin.lutou;
                if(!dest){
                    dest = skinPackage.skin.standard;
                }
            }else{
                dest = skinPackage.skin.standard;
            }
        }else{
            dest = skinPackage.skin.standard;
        }
        return dest + name +"/"+skin;
    };

    //获取皮肤名称。
    game.qhly_getSkin=function(name){
        if(lib.config.qhly_skinset.skin[name]){
            return lib.config.qhly_skinset.skin[name];
        }
        return null;
    };

    //搜索武将的皮肤包。
    game.qhly_foundPackage=function(name){
        var skinPackage = null;
        for(var pkg of lib.qhlypkg){
            if(pkg.filterCharacter(name)){
                skinPackage = pkg;
                break;
            }
        }
        if(skinPackage == null){
            skinPackage = DEFAULT_PACKAGE;
        }
        return skinPackage;
    };

    //获取某武将的皮肤列表。
    game.qhly_getSkinList=function(name,callback){
        var skinPackage = game.qhly_foundPackage(name);
        if(game.getFileList){
            var path = '';
            if(skinPackage.isLutou){
                path = skinPackage.skin.lutou;
            }else{
                path = skinPackage.skin.standard;
            }
            path = path + name;
            game.qhly_checkFileExist(path,function(s){
                if(s){
                    game.getFileList(path,function(folders,files){
                        callback(true,files);
                    });
                }else{
                    callback(false);
                }
            });
        }else{
            callback(false);
        }
    };

    //判断文件、文件夹是否存在
    game.qhly_checkFileExist=function(path,callback){
        if(lib.node && lib.node.fs){
            try{
                var stat=lib.node.fs.statSync(__dirname+'/'+path);
                callback(stat);
            }catch(e){
                callback(false);
                return;
            }
        }else{
            resolveLocalFileSystemURL(lib.assetURL+path,(function(name){
                return function(entry){
                    callback(true);
                }
            }(name)),function(){
                callback(false);
            });
        }
    };

    //根据武将ID，皮肤文件名，查找皮肤的翻译命名。
    game.qhly_getSkinName=function(plname,filename,skinPackage){
        var foundDot = filename.lastIndexOf('.');
        if(foundDot == -1){
            foundDot = filename.length;
        }
        var sname = filename.slice(0,foundDot);
        if(!plname){
            return sname;
        }
        if(!skinPackage){
            //4VrLPyXM/UwVl3SXOMoDpBLQcoJHwBtPcxBNF1VM6oxC7qONebCO4KekZdetP8Zs
            skinPackage = game.qhly_foundPackage(plname);
        }
        if(skinPackage.skininfo){
            var info = skinPackage.skininfo[sname];
            if(info && info.translation){
                return info.translation;
            }
        }
        return sname;
    };

    //获取皮肤信息。
    game.qhly_getSkinInfo=function(plname,filename,skinPackage){
        if(plname.indexOf('gz_') == 0){
            plname = plname.slice(3);
        }
        if(!filename){
            return {
                title:'精品',
                info:'',
                translation:sname
            };
        }
        var foundDot = filename.lastIndexOf('.');
        if(foundDot == -1){
            foundDot = filename.length;
        }
        var sname = filename.slice(0,foundDot);
        if(!plname){
            return {
                title:'精品',
                info:'',
                translation:sname
            };
        }
        if(!skinPackage){
            skinPackage = game.qhly_foundPackage(plname);
        }
        if(skinPackage.skininfo){
            var info = skinPackage.skininfo[sname];
            if(info){
                return info;
            }
        }
        return {
            title:'精品',
            info:'',
            translation:sname
        };
    };

    //将某个文件路径抹除扩展名。如file.txt -> file
    game.qhly_earse_ext=function(path){
        var foundDot = path.lastIndexOf('.');
        if(foundDot < 0)return path;
        return path.slice(0,foundDot);
    };
    
    //设置当前的皮肤。
    game.qhly_setCurrentSkin=function(name,skin,callback){
        if(name.indexOf('gz_') == 0){//国战兼容
            name = name.slice(3);
        }
        var skinPackage = game.qhly_foundPackage(name);
        if(skin){
            if(game.getFileList){
                var path = skinPackage.audio+name+"/"+skin;
                path = game.qhly_earse_ext(path);
                game.qhly_checkFileExist(path,function(success){
                    if(success){
                        game.getFileList(path,function(folders,files){
                            var arr = [];
                            var list = lib.config.qhly_skinset.skinAudioList[name];
                            if(list){
                                for(var m of list){
                                    delete lib.config.qhly_skinset.audioReplace[m];//删除原有的音频映射。
                                }
                            }
                            for(var file of files){
                                file = game.qhly_earse_ext(file);
                                if(skinPackage.isExt === false){
                                    arr.push("skill/"+file);//创建音频映射。
                                    lib.config.qhly_skinset.audioReplace["skill/"+file] = "../"+path + "/" + file;
                                }else{
                                    arr.push("../"+skinPackage.audioOrigin+file);
                                    lib.config.qhly_skinset.audioReplace["../"+skinPackage.audioOrigin+file] = "../"+path + "/" + file;
                                }
                            }
                            if(!skinPackage.isExt){
                                lib.config.qhly_skinset.audioReplace["die/"+name] = "../"+path + "/" + name;
                            }
                            lib.config.qhly_skinset.skinAudioList[name] = arr;
                            lib.config.qhly_skinset.skin[name] = skin;
                            game.qhlySyncConfig();
                            game.qhly_refresh(name,skin);
                            if(callback){
                                callback();
                            }
                        });
                    }else{
                        var arr = [];
                        var list = lib.config.qhly_skinset.skinAudioList[name];
                        if(list){
                            for(var m of list){
                                delete lib.config.qhly_skinset.audioReplace[m];
                            }
                        }
                        if(!skinPackage.isExt){
                            lib.config.qhly_skinset.audioReplace["die/"+name] = "../"+path + "/" + name;
                        }
                        lib.config.qhly_skinset.skinAudioList[name] = arr;
                        lib.config.qhly_skinset.skin[name] = skin;
                        game.qhlySyncConfig();
                        game.qhly_refresh(name,skin);
                        if(callback){
                            callback();
                        }
                    }
                });
            }else{
                alert("尚未加载完成！");
            }
        }else{
            var list = lib.config.qhly_skinset.skinAudioList[name];
            if(list){
                for(var m of list){
                    delete lib.config.qhly_skinset.audioReplace[m];
                }
            }
            delete lib.config.qhly_skinset.skin[name];
            delete lib.config.qhly_skinset.skinAudioList[name];
            game.qhlySyncConfig();
            game.qhly_refresh(name,skin);
            if(callback){
                callback();
            }
        }
    };
   
    //播放死亡配音。
    window.qhly_playDieAudio=function(name){
        var skinPackage = game.qhly_foundPackage(name);
        if(skinPackage.isExt){
            var path = skinPackage.audioOrigin;
            path = path + name;
            var arr = path.split("/");
            var params = [".."];
            params.addArray(arr);
            game.playAudio.apply(game,params);
        }else{
            game.playAudio("die",name);
        }
    };

    //播放技能语音。
    window.qhly_TrySkillAudio=function(skill,player,directaudio,which,skin){
        //alert(skill+" "+player.name);
        if(_status.qhly_viewRefreshing)return;
        var info=get.info(skill);
        if(!info) return;
        if(true){
            var audioname=skill;
            if(info.audioname2&&info.audioname2[player.name]){
                audioname=info.audioname2[player.name];
                info=lib.skill[audioname];
            }
            var audioinfo=info.audio;
            if(typeof audioinfo=='string'&&lib.skill[audioinfo]){
                audioname=audioinfo;
                audioinfo=lib.skill[audioname].audio;
            }
            if(typeof audioinfo=='string'){
                if(audioinfo.indexOf('ext:')==0){
                    audioinfo=audioinfo.split(':');
                    if(audioinfo.length==3){
                        if(audioinfo[2]=='true'){
                            game.playAudio('..','extension',audioinfo[1],audioname);
                        }
                        else{
                            audioinfo[2]=parseInt(audioinfo[2]);
                            if(audioinfo[2]){
                                if(which){
                                    game.playAudio('..','extension',audioinfo[1],audioname+(which%audioinfo[2] + 1));
                                }else{
                                    //4VrLPyXM/UwVl3SXOMoDpBLQcoJHwBtPcxBNF1VM6oxC7qONebCO4KekZdetP8Zs
                                    game.playAudio('..','extension',audioinfo[1],audioname+Math.ceil(audioinfo[2]*Math.random()));
                                }
                            }
                        }
                    }
                    return;
                }
            }
            else if(Array.isArray(audioinfo)){
                audioname=audioinfo[0];
                audioinfo=audioinfo[1];
            }
            if(Array.isArray(info.audioname)&&player){
                if(info.audioname.contains(player.name)){
                    audioname+='_'+player.name;
                }
                else if(info.audioname.contains(player.name1)){
                    audioname+='_'+player.name1;
                }
                else if(info.audioname.contains(player.name2)){
                    audioname+='_'+player.name2;
                }
            }
            if(typeof audioinfo=='number'){
                if(which){
                    //alert('4');
                    game.playAudio('skill',audioname+(which%audioinfo + 1));
                }else{
                    //alert('5');
                    game.playAudio('skill',audioname+Math.ceil(audioinfo*Math.random()));
                }
            }
            else if(audioinfo){
                //alert('6');
                game.playAudio('skill',audioname);
            }
            else if(true&&info.audio!==false){
                game.playSkillAudio(audioname);
            }
        }
    };

    //打开选择皮肤界面。
    game.qhly_open=function(name){
        if(name.indexOf('gz_') == 0){
            name = name.slice(3);
        }
        //game.pause();
        var background = ui.create.div('.qhly-chgskin-background',document.body);
        background.animate('start');
        var avatar = ui.create.div('.qhly-skin',background);
        //avatar.setBackground(name,'character');
        avatar.hide();
        ui.create.div('.qhly-biankuang',avatar);
        var belowTitle = ui.create.div('.qhly-belowtitle',avatar);
        belowTitle.innerHTML = get.translation(name);
        var headTitle = ui.create.div('.qhly-headtitle',avatar);
        headTitle.innerHTML = "标准皮肤";
        var leftArrow = ui.create.div('.qhly-leftbutton',avatar);
        var rightArrow = ui.create.div('.qhly-rightbutton',avatar);
        var okButton = ui.create.div('.qhly-okbutton',avatar);
        var infoText = ui.create.div('.qhly-text',background);
        var viewAbstract = {
            skin:lib.config.qhly_skinset.skin[name],
            index:0,
            skinCount:1,
            skinList:[false],
            //refreshing:false,
        };
        okButton.listen(function(){
            game.qhly_setCurrentSkin(name,viewAbstract.skin);
            //game.resume();
            background.delete();
        });
        var refreshView = function(name,viewAbstract){
            avatar.show();
            _status.qhly_viewRefreshing = true;
            game.qhly_setCurrentSkin(name,viewAbstract.skin,function(){
                _status.qhly_viewRefreshing = false;
            });
            //viewAbstract.refreshing = true;
            if(viewAbstract.skin){
                avatar.setBackgroundImage(game.qhly_getSkinFile(name,viewAbstract.skin));
            }else{
                avatar.setBackground(name,'character');
            }
            if(viewAbstract.index == 0){
                leftArrow.hide();
            }else{
                leftArrow.show();
            }
            if(viewAbstract.index >= viewAbstract.skinCount-1){
                rightArrow.hide();
            }else{
                rightArrow.show();
            }
            var sname;
            if(viewAbstract.skin){
                sname = game.qhly_getSkinName(name,viewAbstract.skin,null);
            }else{
                sname = "标准皮肤";
            }
            headTitle.innerHTML = sname;
            var info = game.qhly_getSkinInfo(name,viewAbstract.skin,null);
            var str = "技能语音：<br><br>";
            window.qhly_audio_which = {};
            var skills = get.character(name,3).slice(0);
            if(skills){
                skills.remove('xwjh_audiozhenwang');
                for(var skill of skills){
                    var infoString = "";
                    window.qhly_audio_which[skill] = 1;
                    infoString += "【";
                    infoString += get.translation(skill);
                    infoString += "】";
                    if(window.qhly_TrySkillAudio){
                        infoString += "<a style='color:#ffffff' href=\"javascript:window.qhly_TrySkillAudio('"+skill+"',{name:'"+name+"'},null,window.qhly_audio_which[\'"+skill+"\'],\'"+viewAbstract.skin+"\');window.qhly_audio_which[\'"+skill+"\']++;\"><img style=height:22px src="+lib.assetURL+"extension/千幻聆音/qhly_pic_playaudiobutton.png></a><br>";
                    }
                    infoString += "<br><br>";
                    str += infoString;
                }
            }
            str += "【阵亡】";
            str += "<a style='color:#ffffff' href=\"javascript:window.qhly_playDieAudio(\'"+name+"\');\"><img style=height:22px src="+lib.assetURL+"extension/千幻聆音/qhly_pic_playaudiobutton.png></a><br>";
            if(info.info){
                str += info.info;
            }
            infoText.innerHTML = str;
            lib.setScroll(infoText);
        };
        var finishView = function(name,viewAbstract){
            refreshView(name,viewAbstract);
            leftArrow.listen(function(){
                viewAbstract.index--;
                if(viewAbstract.index <= 0){
                    viewAbstract.index = 0;
                }
                if(viewAbstract.index >= viewAbstract.skinCount-1){
                    viewAbstract.index = viewAbstract.skinCount-1;
                }
                viewAbstract.skin = viewAbstract.skinList[viewAbstract.index];
                refreshView(name,viewAbstract);
            });
            rightArrow.listen(function(){
                viewAbstract.index++;
                if(viewAbstract.index <= 0){
                    viewAbstract.index = 0;
                }
                if(viewAbstract.index >= viewAbstract.skinCount-1){
                    viewAbstract.index = viewAbstract.skinCount-1;
                }
                viewAbstract.skin = viewAbstract.skinList[viewAbstract.index];
                refreshView(name,viewAbstract);
            });
        };
        game.qhly_getSkinList(name,function(success,skinList){
            if(!success){
                viewAbstract.skinCount = 1;
                viewAbstract.skinList = [false];
                viewAbstract.skin = false;
                viewAbstract.index = 0;
                finishView(name,viewAbstract);
                return;
            }else{
                viewAbstract.skinCount = 1 + skinList.length;
                viewAbstract.skinList = [false];
                viewAbstract.skinList.addArray(skinList);
                if(viewAbstract.skin){
                    for(var i=0;i<viewAbstract.skinList.length;i++){
                        if(viewAbstract.skinList[i] == viewAbstract.skin){
                            viewAbstract.index = i;
                            break;
                        }
                    }
                }else{
                    viewAbstract.index = 0;
                }
                finishView(name,viewAbstract);
            }
        });
    };

    //修改人物卡片界面，显示换肤按钮。
    var originCharacterCardFunciton = ui.click.charactercard;
    ui.click.charactercard = function(){
        originCharacterCardFunciton.apply(this,arguments);
        var name = arguments[0];
        if(ui.window.lastChild && ui.window.lastChild.lastChild){
            var layer = ui.window.lastChild;
            var largeButton = ui.create.div('.qhly-skin-button',ui.window.lastChild.lastChild);
            largeButton.addEventListener('click',function(){
                game.qhly_open(name);
                layer.click();
            });
        }
    };

    //修改人物信息界面，添加换肤按钮。
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
    };

    //自动换肤逻辑。
    game.qhly_autoChangeSkin=function(){
        if(lib.config.qhly_autoChangeSkin && lib.config.qhly_autoChangeSkin != 'close'){
            _status.qhly_changeSkinFunc = function(){
                if(game && game.players && game.players.length){
                    var pls = game.players.slice(0);
                    var names = [];
                    for(var p of pls){
                        if(p.name)names.push(p.name);
                        if(p.name2)names.push(p.name2);
                    }
                    names.randomSort();
                    var func = function(arr,f){
                        if(arr.length == 0)return;
                        var n = arr.shift();
                        game.qhly_getSkinList(n,function(ret,list){
                            if(list && list.length){
                                var sk = game.qhly_getSkin(n);
                                if(list.contains(sk)){
                                    list.remove(sk);
                                }
                                if(!sk){
                                    list.push(false);
                                }
                                game.qhly_setCurrentSkin(n,list.randomGet());
                                game.qhly_autoChangeSkin();
                            }else{
                                f(arr,f);
                            }
                        });
                    };
                    func(names,func);
                }
            };
            setTimeout(_status.qhly_changeSkinFunc,parseInt(lib.config.qhly_autoChangeSkin)*1000);
        }
    };
    lib.skill._qhly_autoc={
        forced:true,
        popup:false,
        trigger:{
            global:'gameStart',
        },
        filter:function(event,player){
            return !_status.qhly_autoChangeSkinSetted && lib.config.qhly_autoChangeSkin && lib.config.qhly_autoChangeSkin != 'close';
        },
        content:function(){
            _status.qhly_autoChangeSkinSetted = true;
            game.qhly_autoChangeSkin();
        }
    };
    lib.skill._qhly_addButton={
        forced:true,
        popup:false,
        trigger:{
            global:'gameStart',
        },
        filter:function(event,player){
            return lib.config.qhly_skinButton;
        },
        content:function(){
            if(player.name1 || player.name){
                var button = ui.create.div('.qhly_skinplayerbutton',player.node.avatar);
                player.node.qhly_skinButton1 = button;
                button.listen(function(){
                    game.qhly_open(player.name1 ? player.name1 : player.name);
                });
            }
            if(player.name2){
                var button = ui.create.div('.qhly_skinplayerbutton2',player.node.avatar2);
                player.node.qhly_skinButton2 = button;
                button.listen(function(){
                    game.qhly_open(player.name2);
                });
            }
            if(player == game.me && !_status.qhly_initOk){
                _status.qhly_initOk = true;
                ui.create.system("显示/隐藏皮肤按钮",function(){
                    if(_status.qhly_buttonShowing){
                        game.qhly_hideButtons();
                    }else{
                        game.qhly_showButtons();
                    }
                },true);
            }
        }
    };
    game.qhly_showButtons=function(){
        if(game && game.players){
            var arr = game.players.slice(0);
            arr.addArray(game.dead);
            for(var p of arr){
                if(p.node.qhly_skinButton1){
                    p.node.qhly_skinButton1.hide();
                }
                if(p.node.qhly_skinButton2){
                    p.node.qhly_skinButton2.hide();
                }
            }
        }
        _status.qhly_buttonShowing = true;
    };
    game.qhly_hideButtons=function(){
        if(game && game.players){
            var arr = game.players.slice(0);
            arr.addArray(game.dead);
            for(var p of arr){
                if(p.node.qhly_skinButton1){
                    p.node.qhly_skinButton1.show();
                }
                if(p.node.qhly_skinButton2){
                    p.node.qhly_skinButton2.show();
                }
            }
        }
        _status.qhly_buttonShowing = false;
    };
},precontent:function(){
    var cssUrl = lib.assetURL + 'extension/千幻聆音';
    lib.init.css(cssUrl, 'extension');
},config:{
    "qhly_skinButton":{
        "name":"头像显示换肤按钮",
        "intro":"打开此选项，人物头像上会出现换肤按钮，重启后生效。",
        "init":lib.config.qhly_skinButton === undefined ? false:lib.config.qhly_skinButton,
        onclick:function(item){
            game.saveConfig('extension_玄武江湖_qhly_skinButton',item);
            game.saveConfig('qhly_skinButton',item);
        }
    },
    "qhly_autoChangeSkin":{
        "name":"自动切换皮肤",
        "intro":"打开此选项，皮肤会自动随时间随机切换。",
        "init":lib.config.qhly_autoChangeSkin === undefined ? "close" : lib.config.qhly_autoChangeSkin,
        "item":{
            "close":"关闭",
            "10":"每10秒",
            "30":"每半分钟",
            "60":"每1分钟",
            "120":"每2分钟",
            "600":"每10分钟",
        },
        onclick:function(item){
            var open = false;
            if(lib.config.qhly_autoChangeSkin == 'close' || !lib.config.qhly_autoChangeSkin){
                if(item !== 'close'){
                    open = true;
                }
            }
            game.saveConfig('extension_玄武江湖_qhly_autoChangeSkin',item);
            game.saveConfig('qhly_autoChangeSkin',item);
            if(open){
                if(game.qhly_autoChangeSkin){
                    game.qhly_autoChangeSkin();
                }else{
                    alert("打开扩展才生效。");
                }
            }else{
                if(_status.qhly_changeSkinFunc){
                    clearTimeout(_status.qhly_changeSkinFunc);
                }
            }
        }
    },
    "qhly_clear":{
        "name":"<b>点击清空皮肤设置</b>",
        "clear":true,
        onclick:function(){
            game.saveConfig('qhly_skinset',{
                skin:{
    
                },
                skinAudioList:{
    
                },
                audioReplace:{
    
                }
            });
            alert("游戏将自动重启。");
            game.reload();
        }
    },
    "qhly_restore":{
        "name":"<b>点击恢复官方的皮肤设置</b>",
        "clear":true,
        onclick:function(){
            if(lib.config.qhly_save_offical_skin){
                game.saveConfig('skin',lib.config.qhly_save_offical_skin);
            }
            alert("请关闭千幻聆音扩展，然后重启游戏。");
        }
    },
},help:{},package:{
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
    intro:"对局内实时换肤换音扩展！<br>感谢以下群友参与了BUG反馈，并给出了可行的建议：꧁彥꧂ 不是狗的牧羊犬 笔芯笔芯<br><br><b><font color=\"#FF3030\">推广：无名杀扩展大作《玄武江湖》，是一个原创武侠故事扩展。独特的内力值系统，所有武将均有配音演员配音，精彩的人物故事更增添代入感，欢迎各位朋友下载。</font></b><br><br>BUG反馈，故事讨论，人物客串，意见建议，欢迎做客玄武江湖工作室群 522136249。<br><img style=width:238px src="+lib.assetURL+"extension/千幻聆音/xwjh_pic_erweima.jpg>",
    author:"玄武江湖工作室",
    diskURL:"",
    forumURL:"",
    version:"1.5",
},files:{"character":[],"card":[],"skill":[]}}})