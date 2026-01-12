'use strict';
window.qhly_import(function(lib, game, ui, get, ai, _status){
    if(!lib.qhlyPlugins){
        lib.qhlyPlugins = [];
    }
    lib.qhlyPlugins.push({
        id:"eff_999888",
        pluginType:'角色介绍附加页',
        name:'特效',
        author:'寰宇星城',
        label:"《特效测试》扩展插件",
        intro:"此插件仅当安装了《特效测试》扩展时生效，可通过此页面编辑技能特效。",
        enable:function(){
            return game.qhly_hasExtension('特效测试') && window.txcsanm && lib.config.txcsanm_skillAnimation2 && lib.config.txcsanm_skillAnimation;//插件是否可用
        },
        getSpinEffectOfSkill:function(skill){
            if(!lib.config.txcsanm_skillAnimation2)return [];
            var ret = [];
            for(var info of lib.config.txcsanm_skillAnimation2){
                if(info && info.skills && info.skills.contains(skill)){
                    ret.push({
                        name:info.name,
                        label:info.label,
                        id:"["+info.name+"]["+(info.label?info.label:"")+"]"
                    });
                }
            }
            return ret;
        },
        getAllSpinEff:function(){
            if(!lib.config.txcsanm_skillAnimation2)return [];
            var ret = [];
            for(var info of lib.config.txcsanm_skillAnimation2){
                ret.push({
                    name:info.name,
                    label:info.label,
                    id:"["+info.name+"]["+(info.label?info.label:"")+"]"
                });
            }
            return ret;
        },
        getAllPicEff:function(){
            if(!lib.config.txcsanm_skillAnimation)return [];
            return Object.keys(lib.config.txcsanm_skillAnimation);
        },
        getPicEffectOfSkill:function(skill){
            if(!lib.config.txcsanm_skillAnimation)return [];
            var ret = [];
            for(var eff in lib.config.txcsanm_skillAnimation){
                var info = lib.config.txcsanm_skillAnimation[eff];
                if(info && info.skills && info.skills.contains(skill)){
                    ret.push(eff);
                }
            }
            return ret;
        },
        characterFilter:function(name){
            return true;
        },
        getAllEnabledSkills:function(name){
            var skills = [];
            for(var skill of game.qhly_getViewSkills(name)){
                skills.push(skill);
                var info = get.info(skill);
                if(info && info.subSkill){
                    for(var subSkill in info.subSkill){
                        var skinfo = info.subSkill[subSkill];
                        if(skinfo && (skinfo.trigger || skinfo.enable) && skinfo.popup!==false && !skinfo.slient){
                            skills.push(skill+"_"+subSkill);
                        }
                    }
                }
            }
            return skills;
        },
        content:function(name){
            var skills = this.getAllEnabledSkills(name);
            var str = "";
            for(var skill of skills){
                var info = get.info(skill);
                str += "<h3>【" + get.translation(skill)+"】&nbsp["+skill+"]";
                if(info && info.sub){
                    str += "（子技能）";
                }
                str += "</h3>";
                str += "<h4>图片特效：</h4>";
                str += "<p>";
                var effPics = this.getPicEffectOfSkill(skill);
                if(effPics.length == 0){
                    str += "无";
                }else{
                    for(var effPic of effPics){
                        str += "["+effPic;
                        str += "]&nbsp;";
                    }
                }
                str += "</p>";
                str += "<img id='qh_eff_add_pic_"+skill+"' style='width:30px;height:30px;' src='"+lib.assetURL+"extension/千幻聆音/image/add.png'/>";
                str += "<img id='qh_eff_clear_pic_"+skill+"' style='width:30px;height:30px;' src='"+lib.assetURL+"extension/千幻聆音/image/clear.png'/>";
                str += "<h4>骨骼特效：</h4>";
                str += "<p>";
                var spinPics = this.getSpinEffectOfSkill(skill);
                if(spinPics.length){
                    for(var spinPic of spinPics){
                        str += "[";
                        str += spinPic.name;
                        if(spinPic.label){
                            str += "-";
                            str += spinPic.label;
                        }
                        str += "]";
                        str += "&nbsp;";
                    }
                }else{
                    str += "无";
                }
                str += "</p>";
                str += "<img id='qh_eff_add_spin_"+skill+"' style='width:30px;height:30px;' src='"+lib.assetURL+"extension/千幻聆音/image/add.png'/>";
                str += "<img id='qh_eff_clear_spin_"+skill+"' style='width:30px;height:30px;' src='"+lib.assetURL+"extension/千幻聆音/image/clear.png'/>";
            }
            str += "<br><font size='2' color='gray'>此页面功能来自扩展《特效测试》，如出现部分特效（例如指示线类）在添加后没有生效，可能是此动画不支持该技能，请询问了解《特效测试》扩展的大佬。</font>"
            return str;
        },
        handleView:function(view,name){
            var skills = this.getAllEnabledSkills(name);
            var that = this;
            for(var skill of skills){
                (function(skill){
                    var addPicButton = document.getElementById('qh_eff_add_pic_'+skill);
                    var clearPicButton = document.getElementById('qh_eff_clear_pic_'+skill);
                    var addSpinButton = document.getElementById('qh_eff_add_spin_'+skill);
                    var clearSpinButton = document.getElementById('qh_eff_clear_spin_'+skill);
                    ui.qhly_addListenFunc(addPicButton);
                    ui.qhly_addListenFunc(clearPicButton);
                    ui.qhly_addListenFunc(addSpinButton);
                    ui.qhly_addListenFunc(clearSpinButton);
                    addPicButton.listen(function(){
                        game.qhly_chooseDialog("新增图片特效","请选择特效",null,that.getAllPicEff(),function(id,dialog){
                            if(lib.config.txcsanm_skillAnimation[id] && lib.config.txcsanm_skillAnimation[id].skills){
                                if(lib.config.txcsanm_skillAnimation[id].skills.contains(skill)){
                                    alert("已经绑定了此技能");
                                }else{
                                    lib.config.txcsanm_skillAnimation[id].skills.push(skill);
                                }
                            }else{
                                alert("未查找到此特效");
                            }
                            game.saveConfig('txcsanm_skillAnimation',lib.config.txcsanm_skillAnimation);
                            dialog.delete();
                            view.refresh();
                        });
                    });
                    clearPicButton.listen(function(){
                        for(var eff in lib.config.txcsanm_skillAnimation){
                            if(lib.config.txcsanm_skillAnimation[eff].skills){
                                lib.config.txcsanm_skillAnimation[eff].skills.remove(skill);
                            }
                        }
                        game.saveConfig('txcsanm_skillAnimation',lib.config.txcsanm_skillAnimation);
                        view.refresh();
                    });
                    var spinEffs = that.getAllSpinEff();
                    addSpinButton.listen(function(){
                        game.qhly_chooseDialog("新增骨骼特效","请选择特效",null,spinEffs,function(id,dialog){
                            var eff = null;
                            for(var spin of spinEffs){
                                if(spin.id == id){
                                    eff = spin;
                                    break;
                                }
                            }
                            if(!eff){
                                alert("未查找到此特效");
                            }else{
                                var spine = lib.config.txcsanm_skillAnimation2.findspine(eff.name,eff.label);
                                if(spine && spine.skills){
                                    if(spine.skills.contains(skill)){
                                        alert("已经绑定了此技能");
                                    }else{
                                        spine.skills.push(skill);
                                    }
                                }else{
                                    alert("未查找到此特效");
                                }
                            }
                            window.txcsanm.write(false);
                            dialog.delete();
                            view.refresh();
                        });
                    });
                    clearSpinButton.listen(function(){
                        for(var eff of lib.config.txcsanm_skillAnimation2){
                            if(eff.skills){
                                eff.skills.remove(skill);
                            }
                        }
                        window.txcsanm.write(false);
                        view.refresh();
                    });
                })(skill);
            }
        }
    });
});