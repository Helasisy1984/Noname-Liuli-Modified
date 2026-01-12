'use strict';
window.qhly_import(function(lib, game, ui, get, ai, _status){
    if(!lib.qhlyPlugins){
        lib.qhlyPlugins = [];
    }
    lib.qhlyPlugins.push({
        id:"ai_777213231",
        pluginType:'角色介绍附加页',
        name:'AI',
        author:'寰宇星城',
        label:"AI优化插件",
        intro:"此插件仅在安装了《AI优化》扩展时生效。《AI优化》扩展下载可加群：715181494。",
        enable:function(){
            return game.qhly_hasExtension('AI优化');//插件是否可用
        },
        characterFilter:function(name){
            return true;
        },
        models:[{
            name:"主公禁将",
            key:"zhu",
        }
        ,{
            name:"忠臣禁将",
            key:"zhong",
        },{
            name:"反贼禁将",
            key:'fan',
        }
        ,{
            name:"内奸禁将",
            key:"nei",
        }
        ,{
            name:"地主禁将",
            key:"dizhu",
        }
        ,{
            name:"农民禁将",
            key:"nongmin",
        }/*,{
            name:"地主禁将",
            key:"yi",
        },{
            name:"二号位农民禁将",
            key:"er",
        },{
            name:"三号位农民禁将",
            key:"san",
        }*/],
        content:function(name){
            var str = "<h2>AI禁将设置</h2>";
            var models = this.models;
            for(var i=0;i<models.length;i++){
                (function(i){
                    var model = models[i];
                    str += "<p><span style='display:inline-block;height:30px;'>"
                    +"<img id='qhplugin_ai_ban_"+model.key+"'/><span id='qhplugin_ai_ban_text_"+model.key+
                    "' style='display:inline-block;position:relative;bottom:25%;'>"+model.name+"</span></span></p>";
                })(i);
            }
            str += "<h2>技能AI设置</h2>";
            var skills = game.qhly_getViewSkills(name);
            for(var skill of skills){
                str += "<h3>【"+get.translation(skill)+"】</h3>";
                str += "威胁度："+"<span id='qhly_aiyh_cf_text_"+skill+"'></span>";
                str += "<span style='width:100%;height:100px;' id='qhly_aiyh_silder_"+skill+"'></span>";
                str += "<br><br><span style='text-decoration:underline;color:green;' id='qhly_aiyh_cf_del_"+skill+"'>删除威胁度覆盖</span>"
                str += "<br><br>";
                if(lib.aiyh && lib.aiyh.skillModify && lib.aiyh.skillModify[skill]){
                    (function(skill){
                        var ayh = lib.aiyh.skillModify[skill];
                        for(var ay of ayh){
                            str += "<p><span style='display:inline-block;height:30px;'>"
                        +"<img id='qhplugin_aiyh_skill_"+ay.id+"'/><span id='qhplugin_aiyh_skill_text_"+ay.id+
                        "' style='display:inline-block;position:relative;bottom:25%;'>"+ay.info+"</span></span></p>";
                        }
                    })(skill);
                }
            }
            str += "<font size='2' color='gray'>此页面功能来自《AI优化》扩展，部分设置可能需要重启游戏后生效。</font>";
            return str;
        },
        getThreaten:function(skill){
            if(lib.config.extension_AI优化_cf && lib.config.extension_AI优化_cf[skill]){
                return parseFloat(lib.config.extension_AI优化_cf[skill]);
            }
            if(lib.skill && lib.skill[skill] && lib.skill[skill].ai && lib.skill[skill].ai.threaten){
                var threaten = lib.skill[skill].ai.threaten;
                if(typeof threaten == 'function'){
                    return 1;
                }
                return threaten;
            }
            return 1;
        },
        threatenType:function(skill){
            if(lib.config.extension_AI优化_cf && lib.config.extension_AI优化_cf[skill]){
                return "AI优化覆盖";
            }
            if(lib.skill && lib.skill[skill] && lib.skill[skill].ai && lib.skill[skill].ai.threaten){
                var threaten = lib.skill[skill].ai.threaten;
                if(typeof threaten == 'function'){
                    return "动态嘲讽，由场上局势决定";
                }else{
                    return "定值";
                }
            }else{
                return "默认值";
            }
        },
        setThreaten:function(skill,threaten){
            if (Object.prototype.toString.call(lib.config.extension_AI优化_cf) !== '[object Object]') lib.config.extension_AI优化_cf = {};
            lib.config.extension_AI优化_cf[skill] = threaten;
            game.saveExtensionConfig('AI优化', 'cf', lib.config.extension_AI优化_cf);
        },
        handleView:function(view,name){
            var models = this.models;
            for(var model of models){
                (function(model){
                    var check = document.getElementById("qhplugin_ai_ban_"+model.key);
                    var text = document.getElementById("qhplugin_ai_ban_text_"+model.key);
                    var list = lib.config["extension_AI优化_"+model.key];
                    if(!list){
                        list = [];
                    }
                    ui.qhly_initCheckBox(check,list.contains(name));
                    ui.qhly_bindCheckBoxAndSpanText(check,text);
                    check.qhly_onchecked=function(c){
                        if(c){
                            list.add(name);
                        }else{
                            list.remove(name);
                        }
                        game.saveConfig("extension_AI优化_"+model.key,list);
                    };
                })(model);
            }
            var skills = game.qhly_getViewSkills(name);
            var that = this;
            for(var skill of skills){
                (function(skill){
                    var span = document.getElementById('qhly_aiyh_silder_'+skill);
                    if(span){
                        var silder = game.qhly_createSilder(1,100,Math.round(that.getThreaten(skill)*10.0));
                        span.appendChild(silder);
                        var text = document.getElementById('qhly_aiyh_cf_text_'+skill);
                        text.innerHTML = that.getThreaten(skill)+"（"+that.threatenType(skill)+"）";
                        silder.onchange=function(){
                            that.setThreaten(skill,silder.value/10);
                            text.innerHTML = silder.value/10 +"（"+that.threatenType(skill)+"）";
                        };
                        var lk = document.getElementById('qhly_aiyh_cf_del_'+skill);
                        if(lk){
                            ui.qhly_addListenFunc(lk);
                            lk.listen(function(){
                                if(lib.config.extension_AI优化_cf && lib.config.extension_AI优化_cf[skill]){
                                    delete lib.config.extension_AI优化_cf[skill];
                                    game.saveExtensionConfig('AI优化', 'cf', lib.config.extension_AI优化_cf);
                                }
                                silder.value = Math.round(that.getThreaten(skill)*10.0);
                                text.innerHTML = that.getThreaten(skill)+"（"+that.threatenType(skill)+"）";
                            });
                        }
                    }
                    if(lib.aiyh && lib.aiyh.skillModify && lib.aiyh.skillModify[skill]){
                        var ayh = lib.aiyh.skillModify[skill];
                        for(var ay of ayh){
                            (function(ay){
                                var check = document.getElementById('qhplugin_aiyh_skill_'+ay.id);
                                var ctext = document.getElementById('qhplugin_aiyh_skill_text_'+ay.id);
                                ui.qhly_initCheckBox(check,lib.config['aiyh_character_skill_id_'+ay.id]);
                                ui.qhly_bindCheckBoxAndSpanText(check,ctext);
                                check.qhly_onchecked=function(c){
                                    game.saveConfig('aiyh_character_skill_id_'+ay.id,c);
                                };
                            })(ay);
                        }
                    }
                })(skill);
            }
        }
    });
});