'use strict';
window.qhly_import(function(lib, game, ui, get, ai, _status){
    if(!lib.qhlyPlugins){
        lib.qhlyPlugins = [];
    }
    lib.qhlyPlugins.push({
        id:"code_999888",
        pluginType:'角色介绍附加页',
        name:'代码',
        author:'寰宇星城',
        label:"代码插件",
        intro:"此插件为千幻聆音自带，用于查看角色代码。",
        enable:function(){
            return true;
        },
        characterFilter:function(name){
            return true;
        },
        content:function(name){
            var str = "";
            var skills = game.qhly_getViewSkills(name);
            for(var skill of skills){
                str += "技能："+get.translation(skill)+"<br>";
                var skillInfo = get.info(skill);
                if(skillInfo){
                    str += "<br>技能描述：<br>";
                    str += lib.translate[skill+"_info"];
                    str += "<br><br>代码：<br>";
                    str += "<textarea id='qh_input_skill_"+skill+"'>";
                    str += "</textarea>";
                }else{
                    str += "暂无代码";
                }
                str += "<br><br>";
            }
            return str;
        },
        handleView:function(view,name){
            var func = function(){
                var skills = game.qhly_getViewSkills(name);
                for(var skill of skills){
                    var input = document.getElementById('qh_input_skill_'+skill);
                    if(input){
                        var argi="lib.skill['"+skill+"']="+get.stringify(get.info(skill));
                        var editor = window.CodeMirror.fromTextArea(input,{
                            mode:'javascript',
                            lineNumbers: true,     
                            indentUnit: 4,         
                            styleActiveLine: true, 
                            matchBrackets: true,   
                            lineWrapping: true,     
                        });
                        editor.setValue(argi);
                        editor.setSize("100%","300px");
                        //lib.setScroll(input);
                    }
                }
            };
            if(window.CodeMirror){
                func();
            }else{
                lib.init.css(lib.assetURL+'layout/default','codemirror');
                lib.init.js(lib.assetURL+'game','codemirror',func);
            }
        }
    });
});