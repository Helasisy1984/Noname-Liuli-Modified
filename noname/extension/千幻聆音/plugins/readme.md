# 声明
插件为无名杀玩家自行编纂，如发生相关问题，请联系插件作者。由非千幻聆音开发组编写的插件引起的任何纠纷与千幻聆音本体无关。
# 插件模板
## 角色介绍附加页插件
```js
'use strict';
window.qhly_import(function(lib, game, ui, get, ai, _status){
    if(!lib.qhlyPlugins){
        lib.qhlyPlugins = [];
    }
    lib.qhlyPlugins.push({
        id:"xxxxxx",//为插件指定一个ID。最好用一个随机字符串，防止与别的插件重复。
        author:"作者",//作者
        pluginType:'角色介绍附加页',//表示插件类型
        name:'插件',//“角色介绍附加页”显示的名字，限制两个字。
        label:"插件正式命名，名字较长",
        intro:"插件介绍。",
        enable:function(){
            return true;//插件是否可用
        },
        characterFilter:function(name){
            return true;//限制插件只对某些角色生效
        },
        content:function(){
            //附加页内显示的内容。
            var str = "显示内容";
            return str;
        },
        handleView:function(view,name){
            //为附加页内的元素添加点击事件和其它逻辑。
        }
    });
});
```