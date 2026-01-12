'use strict';
window.qhly_import(function(lib, game, ui, get, ai, _status){
    if(!lib.qhlyPlugins){
        lib.qhlyPlugins = [];
    }
    lib.qhlyPlugins.push({
        id:"record_999888",
        pluginType:'角色介绍附加页',
        name:'战绩',
        author:'寰宇星城',
        label:"战绩插件",
        intro:"此插件为千幻聆音自带。用于记录并显示战绩。",
        enable:function(){
            return true;
        },
        characterFilter:function(name){
            return true;
        },
        content:function(name){
            return game.qhly_getCharacterZhanjiPage(name);
        },
        handleView:function(view,name){

        }
    });
});