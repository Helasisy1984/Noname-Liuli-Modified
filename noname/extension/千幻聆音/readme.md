千幻聆音使用说明
# 2023/8/6 4.13.5版本
# What's New
1. 修复了两个可能导致弹窗的BUG。
2. 新增插件管理功能，在千幻聆音设置最下方可以点击打开插件管理列表，可以禁用或启用某些插件。
3. 新增插件：AI优化。此插件需要配合《AI优化》扩展使用。可以在千幻大界面使用《AI优化》扩展的AI禁将功能，令AI无法在特定的模式和身份下选择该武将。
4. 将之前的战绩页逻辑修改为插件的形式。
5. 修改插件的解析格式。

# 2023/8/6 4.13.3版本
# What's New
1. 制卡器插件更新，在制卡界面制卡完成并生成图片后，返回原千幻大页面点击刷新可以查看图片，点击分享可将图片分享到QQ群内。（分享功能仅诗笺版无名杀有效）
2. 新增兼容性设置：预启动加载。此兼容性设置将可以兼容一些重写了启动页的美化扩展。在安装《如真似幻》扩展时，此设置将强制开启。
3. 将在非对局状态下打开千幻皮肤小窗强制锁定为龙头样式，对于《太虚幻境》模式生效，以防止出现弹窗终止游戏。在游玩《太虚幻境》模式时，建议将【替换默认资料卡】选项改成【千幻资料卡】。
4. 修复了【海克斯科技】UI套装下，简介小箭头不显示的问题。
5. 新增设置：选将界面显示原皮。打开此选项后，在选将界面上将显示角色的原皮肤。

# 2023/7/30 4.13.2版本
# What's New
1. 新增插件功能。目前仅支持【角色介绍附加页】功能的插件。插件可安装在千幻聆音plugins目录下。你可以为千幻页面编写插件，自由编辑自己想显示的内容。
2. 新增默认插件：制卡器。此插件需要安装DIYEditor扩展才可使用。扩展作者为钫酸酱，可加入群828182346下载此扩展。在千幻角色附加页点击【制卡】后，可以链接到DIYEditor，使用当前皮肤进行制卡。
3. 修复了水墨龙吟在未开启【纵向拉伸】情况下，背景露出边缘的问题。
4. 更改了排序规则，皮肤图片文件名（不包括拓展名）为阿拉伯数字时，将按照此数字的数值而不是字典序排序。
5. 修复了角色被移除游戏时，自动换肤抛出异常的问题。
6. 修复了播放胜利语音可能导致游戏卡死的问题。
7. 修复了皮切参数有可能导致的bug。


# 2023/6/26 4.13.1版本
# What's New
1. 修复手杀主题中国战野心家势力没有边框的问题
2. 修复手杀主题中国战键势力武将`冈崎汐`没有势力框的问题
3. 修复了一个打开自动转换动皮参数可能导致重复转换而报错的问题
4. 修复了一个因为转换参数而导致保存动皮调整参数失效的问题
5. 修复了手杀主题中汉仪中隶字体缺失的问题
6. 增加了一个全局变量`window.qhly_forbidPlayerWindow`用于给其他扩展临时禁用千幻点击人物呼出换肤菜单的功能（执行完你的功能后记得设为false）




###### 千幻聆音常用功能使用方法 ######
# 一、皮肤共享功能
# 通过在扩展根目录下建立`skinShare.js`文件来设置多个武将共用一份皮肤，`skinShare.js`文件内代码如下
```js
'use strict';
// 此文件为填写皮肤共享对应关系的文件，这里提供一个模板：
// ol_xiaoqiao: {                                  //需要共享皮肤的角色id
//     name: 'xiaoqiao',                           //共享谁的皮肤 （*必填，否则报错）共享关系建立后，该角色将会共享目标角色的所有皮肤，以及皮肤对应的阵亡语音、技能台词、原画以及动皮。
//     skills: {                                   //技能对应关系 （如果不写的话，不会共享技能语音）
//         oltianxiang: 'tianxiang',               //格式为左边是需要共享人的技能名，右边是提供共享的人的技能名
//         olhongyan: 'hongyan', 
//     },
// },
// 那么出现一个问题，如果需要共享皮肤的人技能与被共享人技能不能完全一一对应怎么办？
// 比如ol_xiaoqiao比xiaoqiao多一个技能飘零(piaoling)。
// 此时做法为将飘零的技能语音文件全部移动至xiaoqiao的语音文件夹内，那么在寻找飘零的语音时会自动匹配。
// 最后，重新设置过皮肤共享的角色需要在游戏里手动更换一下皮肤，才能令新的语音映射生效。

// 如果是扩展武将想共享本体武将的皮肤也是可以的
// 只需要在扩展的skin.js文件里加上skinShare部分即可（具体可参照Thunder小游戏武将的skin.js文件）

window.qhly_import(function (lib, game, ui, get, ai, _status) {
    lib.qhly_skinShare = {
        ol_xiaoqiao: {//---------------例子1---------------
            name: 'xiaoqiao',
            skills: {
                oltianxiang: 'tianxiang',
                olhongyan: 'hongyan',
            },
        },
        re_xiaoqiao: {//---------------例子2---------------
            name: 'xiaoqiao',
            skills: {
                retianxiang: 'tianxiang',
                xinhongyan: 'hongyan',
            },
        },
        sp_bianfuren: {//---------------例子3---------------
            name: 'bianfuren',
            skills: {
                spwanwei: 'wanwei',
                spyuejian: 'yuejian',             //sp_bianfuren多一个技能语音fuwei，不用写，直接把fuwei的语音文件放在bianfuren相应的皮肤语音文件夹内即可自动读取。
            }                                     //如果还有一个xx_bianfuren，他的技能语音有xxfuwei，只需要在她的skills里写xxfuwei:'fuwei'即可。
        },
        re_jiangwei: {//---------------例子4---------------
            name: 'jiangwei',                     //1.75版本后新增，带有audioname形式的技能写法，将所有的技能（包含觉醒技能等）全部写一遍对照表。
            skills: {                             //以ol姜维和界姜维共享姜维的皮肤为例。
                retiaoxin: 'tiaoxin',
                zhiji: 'zhiji',
                reguanxing: 'guanxing',
            }
        },
        ol_jiangwei: {//---------------例子5---------------
            name: 'jiangwei',
            skills: {
                oltiaoxin: 'tiaoxin',
                olzhiji: 'zhiji',
                reguanxing: 'guanxing',
            }
        },
    }
});
```
 **扩展武将也可以使用此项功能，只需要在扩展的`skin.js`文件中添加下列代码段即可（拿`Thunder`小游戏扩展举例）**
```js
        skinShare: {
            th_majun: {
                name: 'majun',
                skills: {
                    th_jingxie: 'xinfu_jingxie1',
                    th_qiaosi: 'qiaosi',
                }
            },
            th_guanning: {
                name: 'guanning',
                skills: {
                    th_dunshi: 'dunshi',
                }
            },
            th_sunhanhua: {
                name: 'sunhanhua',
                skills: {
                    th_chongxu: 'chongxu',
                }
            },
            th_lukai: {
                name: 'lukai',
                skills: {
                    th_bushi: 'lkbushi',
                    th_zhongzhuang: 'lkzhongzhuang',
                }
            },
            th_caohua: {
                name: 'caohua',
                skills: {
                    th_caiyi: 'caiyi',
                    th_guili: 'guili',
                }
            },
            th_puyuan: {
                name: 'ol_puyuan',
                skills: {
                    th_shengong: 'olshengong',
                }
            },
            th_pangdegong: {
                name: 'pangdegong',
                skills: {
                    th_pingcai: 'xinfu_pingcai',
                    th_pcaudio_wolong_card: 'pcaudio_wolong_card',
                    th_pcaudio_fengchu_card: 'pcaudio_fengchu_card',
                    th_pcaudio_shuijing_card: 'pcaudio_shuijing_card',
                    th_pcaudio_xuanjian_card: 'pcaudio_xuanjian_card',
                }
            },
        },
```

# 二、达成条件自动换肤功能
# 适用于某些武将血量降低或觉醒后自动换肤的功能
# 通过在扩展根目录下建立`skinChange.js`文件来设置，`skinChange.js`文件内代码如下：
```js
'use strict';
window.qhly_import(function (lib, game, ui, get, ai, _status) {
    lib.qhly_skinChange = {
        caochun: {                                                   //武将id
            虎啸龙渊: {                                               //皮肤名
                source: 'hp_2',                                      //*必填属性，变身原因，"hp_x"表示血量低于x变身，高于x变回来(变身只能有一种原因！)
                phase: true,                                         //加上此行会让回血换肤效果在当前回合结束才触发
                audio: '虎啸龙渊/虎啸龙渊2/',                          //*必填属性，变身后的音效文件夹，从sanguoaudio/caochun/后面写
                image: 'caochun/虎啸龙渊/虎啸龙渊2.jpg',               //*必填属性，变身后的皮肤文件，从sanguoskin/或者sanguolutouskin/后面写（注：新版本因要判断路径所以只支持jpg格式的变身皮肤文件）
            }
        },
        shen_guojia: {
            倚星折月: {
                cardaudio: true,                                     //使用专属卡牌音效（现在专属卡牌音效也分变身前和变身后了，请分别放在变身前后的音效文件夹内）
                source: 'stianyi',                                   //变身原因为发动某技能，直接写技能名，不管是转换技、限定技、觉醒技甚至是普通技能都可以触发，用一次变身，再用一次变回来
                audio: '倚星折月/倚星折月2/',
                image: 'shen_guojia/倚星折月/倚星折月2.jpg',
            }
        },
        test: {                                                      //这只是个例子
            测试: {
                source: 'kill',                                      //变身原因为造成击杀
                return: true,                                        //加上此行会在每次造成击杀时来回换肤，否则只会在第一次击杀后换肤就不再换回来了
                audio: '测试/测试2/',
                image: 'test/测试/测试2.jpg',
            }
        },
    }
});
```
**多形态武将的台词录入方法为在两种形态台词之间使用+号**
**如我需要编辑曹纯虎啸龙渊两种形态的皮肤台词，只需要在编辑台词时输入“形态1技能台词1/形态1技能台词2+形态2技能台词1/形态2技能台词2”即可**
**如果是直接在skin.js里编辑台词，则将两种形态的台词分别录入为content1和content2，content的内容同content1，如下：**
```js
"虎啸龙渊": {
            "info": "",
            "translation": "虎啸龙渊",
            "skill": {
                "xinshanjia": {
                    "content": "百锤锻甲，披之可陷靡阵，断神兵，破坚城！/千炼成兵，邀天下群雄引颈，且试我剑利否！",
                    "content1": "百锤锻甲，披之可陷靡阵，断神兵，破坚城！/千炼成兵，邀天下群雄引颈，且试我剑利否！",
                    "content2": "兵皆精锐，选八尺之躯，砺数九之寒，成万胜之军。/ 士皆骁勇，衣三属之甲，操五石之弓，破百倍之敌。"
                },
                "die": {
                    "content": "不胜即亡，唯一死而已！",
                    "content1": "不胜即亡，唯一死而已！",
                    "content2": "将军死马背，罹魂犹战野！"
                }
            }
        },
```

# 三、武将扩展在手杀主题中使用自定义边框和自定义血量框颜色
# 同样是在扩展的`skin.js`文件中添加下列代码段即可（拿`时空枢纽`扩展举例）
```js
        ssborder:'../../时空枢纽/image/border/',    //手杀边框路径，边框命名规范为`势力id.png`，边框顶框的命名规范为`势力id_top.png`
        sshpBorder:{                               //自定义血条框颜色，purple紫色，red红色，green绿色，blue蓝色，yellow1群雄黄色，yellow2神将黄色，不指定（默认）为灰色
            SK_demon:'purple',
            SK_east:'red',
            SK_qun:'green',
            SK_sea:'blue',
            SK_shen:'yellow2',
        },
```