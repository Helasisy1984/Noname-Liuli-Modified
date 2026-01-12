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
//鯡鯋鯐鮖自用版本，以re为主，sp技能完全不同的和shen单独分离。

window.qhly_import(function (lib, game, ui, get, ai, _status) {
    lib.qhly_skinShare = {
        baosanniang: {//鲍三娘
            name: 're_baosanniang',
            skills: {
                olwuniang: 'meiyong',
                olxushen: 'rexushen',
                olzhennan: 'rezhennan',
            },
        },
        xin_baosanniang: {//鲍三娘
            name: 're_baosanniang',
            skills: {
                decadewuniang: 'meiyong',
                decadexushen: 'rexushen',
                decadezhennan: 'rezhennan',
            },
        },
        tw_beimihu: {//卑弥呼
            name: 'beimihu',
            skills: {
                zongkui: 'zongkui',
                guju: 'guju',
                baijia: 'baijia',
                bmcanshi: 'bmcanshi',
                bingzhao: 'bingzhao',//多一个主公技
            },
        },
        ol_bianfuren: {//卞夫人
            name: 'sp_bianfuren',
            skills: {
                fuwei: 'spwanwei',
                yuejian: 'spyuejian',
            },
        },
        tw_bianfuren: {//卞夫人
            name: 'sp_bianfuren',
            skills: {
                twwanwei: 'spwanwei',
                twyuejian: 'spyuejian',
            },
        },
        dc_bulianshi: {//步练师
            name: 're_bulianshi',
            skills: {
                dcanxu: 'reanxu',
                dczhuiyi: 'zhuiyi',
            },
        },
        bulianshi: {//步练师
            name: 're_bulianshi',
            skills: {
                old_anxu: 'reanxu',
                zhuiyi: 'zhuiyi',
            },
        },
        old_bulianshi: {//步练师
            name: 're_bulianshi',
            skills: {
                anxu: 'reanxu',
                zhuiyi: 'zhuiyi',
            },
        },
        caifuren: {//蔡夫人
            name: 're_caifuren',
            skills: {
                qieting: 'reqieting',
                xianzhou: 'rexianzhou',
            },
        },
        xin_caifuren: {//蔡夫人
            name: 're_caifuren',
            skills: {
                xinqieting: 'reqieting',
                xianzhou: 'rexianzhou',
            },
        },
        ol_caiwenji: {//蔡文姬
            name: 're_caiwenji',
            skills: {
                olbeige: 'rebeige',
                duanchang: 'duanchang',
            },
        },
        caiwenji: {//蔡文姬
            name: 're_caiwenji',
            skills: {
                beige: 'rebeige',
                duanchang: 'duanchang',
            },
        },
        caiyong: {//蔡邕
            name: 're_caiyong',
            skills: {
                bizhuan: 'rebizhuan',
                tongbo: 'retongbo',
            },
        },
        tw_caoang: {//曹昂
            name: 'caoang',
            skills: {
                twxiaolian: 'kaikang',
            },
        },
        caocao: {//曹操
            name: 're_caocao',
            skills: {
                jianxiong: 'new_rejianxiong',
                hujia: 'rehujia',
            },
        },
        sb_caocao: {//曹操
            name: 're_caocao',
            skills: {
                sbjianxiong: 'new_rejianxiong',
                sbqingzheng: 'sbqingzheng',//谋曹操多一个技能
                sbhujia: 'rehujia',
            },
        },
        tw_caocao: {//曹操
            name: 're_caocao',
            skills: {
                twlingfa: 'new_rejianxiong',
                twzhian: 'rehujia',
            },
        },
        old_caochong: {//曹冲
            name: 'caochong',
            skills: {
                oldrenxin: 'renxin',
                oldchengxiang: 'chengxiang',
            },
        },
        old_caochun: {//曹纯
            name: 'caochun',
            skills: {
                shanjia: 'xinshanjia',
            },
        },
        caopi: {//曹丕
            name: 're_caopi',
            skills: {
                xingshang: 'rexingshang',
                fangzhu: 'refangzhu',
                songwei: 'songwei',
            },
        },
        new_caoren: {//曹仁
            name: 'caoren',
            skills: {
                jushou: 'xinjushou',
            },
        },
        sb_caoren: {//曹仁
            name: 'caoren',
            skills: {
                sbjushou: 'xinjushou',
                sbjiewei: 'xinjiewei',
            },
        },
        old_caoren: {//曹仁
            name: 'caoren',
            skills: {
                moon_jushou: 'xinjushou',
                jiewei: 'xinjiewei',
            },
        },
        sp_caoren: {//曹仁
            name: 'caoren',
            skills: {
                weikui: 'xinjiewei',
                lizhan: 'xinjushou',
            },
        },
        jsp_caoren: {//曹仁
            name: 'caoren',
            skills: {
                kuiwei: 'xinjiewei',
                yanzheng: 'xinjushou',
            },
        },
        old_caorui: {//曹叡
            name: 'caorui',
            skills: {
                huituo: 'huituo',
                oldmingjian: 'mingjian',
                xingshuai: 'xingshuai',
            },
        },
        caoxiu: {//曹休
            name: 're_caoxiu',
            skills: {
                qianju: 'qianju',
                qingxi: 'reqingxi',
            },
        },
        xin_caoxiu: {//曹休
            name: 're_caoxiu',
            skills: {
                qianju: 'qianju',
                xinqingxi: 'reqingxi',
            },
        },
        old_caoxiu: {//曹休
            name: 're_caoxiu',
            skills: {
                taoxi: 'reqingxi',
            },
        },
        tw_caoxiu: {//曹休
            name: 're_caoxiu',
            skills: {
                twqianju: 'qianju',
                twqingxi: 'reqingxi',
            },
        },
        caozhang: {//曹彰
            name: 're_caozhang',
            skills: {
                new_jiangchi: 'xinjiangchi',
            },
        },
        xin_caozhang: {//曹彰
            name: 're_caozhang',
            skills: {
                rejiangchi: 'xinjiangchi',
            },
        },
        caozhen: {//曹真
            name: 're_caozhen',
            skills: {
                xinsidi: 'residi',
            },
        },
        xin_caozhen: {//曹真
            name: 're_caozhen',
            skills: {
                discretesidi: 'residi',
            },
        },
        old_caozhen: {//曹真
            name: 're_caozhen',
            skills: {
                sidi: 'residi',
            },
        },
        caozhi: {//曹植
            name: 're_caozhi',
            skills: {
                luoying: 'reluoying',
                jiushi: 'rejiushi',
            },
        },
        dc_caozhi: {//曹植
            name: 're_caozhi',
            skills: {
                reluoying: 'reluoying',
                dcjiushi: 'rejiushi',
            },
        },
        old_chendao: {//陈到
            name: 'chendao',
            skills: {
                drlt_wanglie: 'dcwanglie',
            },
        },
        ol_chendeng: {//陈登
            name: 're_chendeng',
            skills: {
                olfengji: 'refuyuan',
            },
        },
        chendeng: {//陈登
            name: 're_chendeng',
            skills: {
                fengji: 'refuyuan',
                zhouxuan: 'reyingshui',
            },
        },
        sb_chengong: {//陈宫
            name: 're_chengong',
            skills: {
                sbmingce: 'remingce',
                sbzhichi: 'zhichi',
            },
        },
        chengong: {//陈宫
            name: 're_chengong',
            skills: {
                mingce: 'remingce',
                zhichi: 'zhichi',
            },
        },
        chengpu: {//程普
            name: 're_chengpu',
            skills: {
                lihuo: 'ollihuo',
                chunlao: 'rechunlao',
            },
        },
        xin_chengpu: {//程普
            name: 're_chengpu',
            skills: {
                relihuo: 'ollihuo',
                chunlao: 'rechunlao',
            },
        },
        ns_chengpu: {//程普
            name: 're_chengpu',
            skills: {
                decadelihuo: 'ollihuo',
                decadechunlao: 'rechunlao',
            },
        },
        dc_chenqun: {//陈群
            name: 're_chenqun',
            skills: {
                repindi: 'redingpin',
                refaen: 'refaen',
            },
        },
        chenqun: {//陈群
            name: 're_chenqun',
            skills: {
                pindi: 'redingpin',
                faen: 'refaen',
            },
        },
        old_chenqun: {//陈群
            name: 're_chenqun',
            skills: {
                dingpin: 'redingpin',
                oldfaen: 'refaen',
            },
        },
        daqiao: {//大乔
            name: 're_daqiao',
            skills: {
                guose: 'reguose',
                liuli: 'liuli',
            },
        },
        sp_daqiao: {//大乔
            name: 're_daqiao',
            skills: {
                yanxiao: 'reguose',
                anxian: 'liuli',
            },
        },
        sb_daqiao: {//大乔
            name: 're_daqiao',
            skills: {
                sbguose: 'reguose',
                sbliuli: 'liuli',
            },
        },
        tw_daxiaoqiao: {//大小乔
            name: 'daxiaoqiao',
            skills: {
                twxingwu: 'new_xingwu',
                twpingting: 'new_luoyan',
                tianxiang: 'oltianxiang',
                liuli: 'liuli',
            },
        },
        ol_dengai: {//邓艾
            name: 're_dengai',
            skills: {
                oltuntian: 'retuntian',
                olzaoxian: 'zaoxian',
                jixi: 'jixi',
            },
        },
        dengai: {//邓艾
            name: 're_dengai',
            skills: {
                tuntian: 'retuntian',
                zaoxian: 'zaoxian',
                jixi: 'jixi',
            },
        },
        dengzhi: {//邓芝
            name: 're_dengzhi',
            skills: {
                shuaiyan: 'jianliang',
                jimeng: 'weimeng',
            },
        },
        tw_dengzhi: {//邓芝
            name: 're_dengzhi',
            skills: {
                shuaiyan: 'jianliang',
                twjimeng: 'weimeng',
            },
        },
        ol_dengzhi: {//邓芝
            name: 're_dengzhi',
            skills: {
                olsujian: 'jianliang',
                olxiuhao: 'weimeng',
            },
        },
        ol_dianwei: {//典韦
            name: 're_dianwei',
            skills: {
                olqiangxi: 'reqiangxi',
                olningwu: 'olningwu',
            },
        },
        dianwei: {//典韦
            name: 're_dianwei',
            skills: {
                qiangxi: 'reqiangxix',
            },
        },
        xia_dianwei: {//典韦
            name: 're_dianwei',
            skills: {
                twliexi: 'reqiangxi',
                twshezhong: 'olningwu',
            },
        },
        diaochan: {//貂蝉
            name: 're_diaochan',
            skills: {
                lijian: 'lijian',
                biyue: 'rebiyue',
            },
        },
        sp_diaochan: {//貂蝉
            name: 're_diaochan',
            skills: {
                lihun: 'lijian',
                rebiyue: 'rebiyue',
            },
        },
        sb_diaochan: {//貂蝉
            name: 're_diaochan',
            skills: {
                sblijian: 'lijian',
                sbbiyue: 'rebiyue',
            },
        },
        old_dingfeng: {//丁奉
            name: 'dingfeng',
            skills: {
                duanbing: 'reduanbing',
                fenxun: 'refenxun',
            },
        },
        tw_dingfeng: {//丁奉
            name: 'dingfeng',
            skills: {
                twqijia: 'reduanbing',
                twzhuchen: 'refenxun',
            },
        },
        dingyuan: {//丁原
            name: 'ol_dingyuan',
            skills: {
                beizhu: 'xianshuai',
            },
        },
        dongbai: {//董白
            name: 're_dongbai',
            skills: {
                lianzhu: 'relianzhu',
                xiehui: 'rexiahui',
            },
        },
        dongcheng: {//董承
            name: 're_dongcheng',
            skills: {
                chengzhao: 'xuezhao',
            },
        },
        ol_dongzhuo: {//董卓
            name: 're_dongzhuo',
            skills: {
                oljiuchi: 'rejiuchi',
                roulin: 'roulin',
                benghuai: 'benghuai',
                olbaonue: 'baonue',
            },
        },
        dongzhuo: {//董卓
            name: 're_dongzhuo',
            skills: {
                jiuchi: 'rejiuchi',
                roulin: 'roulin',
                benghuai: 'benghuai',
                baonue: 'baonue',
            },
        },
        sp_dongzhuo: {//董卓
            name: 're_dongzhuo',
            skills: {
                hengzheng: 'benghuai',
            },
        },
        duji: {//杜畿
            name: 're_duji',
            skills: {
                xinfu_andong: 'reandong',
                xinfu_yingshi: 'reyingshi',
            },
        },
        sp_duyu: {//杜预
            name: 'duyu',
            skills: {
                spsanchen: 'sanchen',
                spwuku: 'zhaotao',
                spmiewu: 'pozhu',
            },
        },
        rw_fanchou: {//樊稠
            name: 'fanchou',
            skills: {
                twxingluan: 'xinxingluan',
            },
        },
        xin_fazheng: {//法正
            name: 're_fazheng',
            skills: {
                oljiuchi: 'reenyuan',
                roulin: 'rexuanhuo',
            },
        },
        xin_fazheng: {//法正
            name: 're_fazheng',
            skills: {
                xinenyuan: 'reenyuan',
                xinxuanhuo: 'rexuanhuo',
            },
        },
        sb_fazheng: {//法正
            name: 're_fazheng',
            skills: {
                sbenyuan: 'reenyuan',
                sbxuanhuo: 'rexuanhuo',
            },
        },
        fazheng: {//法正
            name: 're_fazheng',
            skills: {
                enyuan: 'reenyuan',
                xuanhuo: 'rexuanhuo',
            },
        },
        tw_re_fazheng: {//法正
            name: 're_fazheng',
            skills: {
                rwenyuan: 'reenyuan',
                twxuanhuo: 'rexuanhuo',
            },
        },
        tw_feiyi: {//费祎
            name: 'feiyi',
            skills: {
                twshengxi: 'mjshengxi',
                twkuanji: 'fyjianyu',
            },
        },
        fengfangnv: {//冯妤
            name: 're_fengfangnv',
            skills: {
                chuiti: 'tiqi',
                zhuangshu: 'baoshu',
            },
        },
        fuhuanghou: {//伏皇后
            name: 're_fuhuanghou',
            skills: {
                zhuikong: 'rezhuikong',
                qiuyuan: 'reqiuyuan',
            },
        },
        sp_fuhuanghou: {//伏皇后
            name: 're_fuhuanghou',
            skills: {
                spcangni: 'rezhuikong',
                spmixin: 'reqiuyuan',
            },
        },
        xin_fuhuanghou: {//伏皇后
            name: 're_fuhuanghou',
            skills: {
                xinzhuikong: 'rezhuikong',
                xinqiuyuan: 'reqiuyuan',
            },
        },
        old_fuhuanghou: {//伏皇后
            name: 're_fuhuanghou',
            skills: {
                oldzhuikong: 'rezhuikong',
                oldqiuyuan: 'reqiuyuan',
            },
        },
        tw_fuwan: {//伏完
            name: 'fuwan',
            skills: {
                twmoukui: 'moukui',
            },
        },
        dc_fuwan: {//伏完
            name: 'fuwan',
            skills: {
                dcmoukui: 'moukui',
            },
        },
        dc_ganfuren: {//甘夫人
            name: 'ganfuren',
            skills: {
                dcshushen: 'shushen',
                dcshenzhi: 'shenzhi',
            },
        },
        ganning: {//甘宁
            name: 're_ganning',
            skills: {
                qixi: 'qixi',
            },
        },
        sb_ganning: {//甘宁
            name: 're_ganning',
            skills: {
                sbqixi: 'qixi',
                sbfenwei: 'fenwei',
            },
        },
        dc_gaolan: {//高览
            name: 'gaolan',
            skills: {
                xizhen: 'xiying',
            },
        },
        xin_gaoshun: {//高顺
            name: 're_gaoshun',
            skills: {
                decadexianzhen: 'rexianzhen',
                decadejinjiu: 'rejinjiu',
            },
        },
        gaoshun: {//高顺
            name: 're_gaoshun',
            skills: {
                xinxianzhen: 'rexianzhen',
                jinjiu: 'rejinjiu',
            },
        },
        old_gaoshun: {//高顺
            name: 're_gaoshun',
            skills: {
                xianzhen: 'rexianzhen',
                jinjiu: 'rejinjiu',
            },
        },
        gongsunyuan: {//公孙渊
            name: 're_gongsunyuan',
            skills: {
                huaiyi: 'rehuaiyi',
            },
        },
        gongsunzan: {//公孙瓒
            name: 're_gongsunzan',
            skills: {
                reyicong: 'reyicong',
            },
        },
        dc_gongsunzan: {//公孙瓒
            name: 're_gongsunzan',
            skills: {
                dcqiaomeng: 'reqiaomeng',
                dcyicong: 'reyicong',
            },
        },
        xin_gongsunzan: {//公孙瓒
            name: 're_gongsunzan',
            skills: {
                qiaomeng: 'reqiaomeng',
                xinyicong: 'reyicong',
            },
        },
        sp_gongsunzan: {//公孙瓒
            name: 're_gongsunzan',
            skills: {
                sptuji: 'reqiaomeng',
                spyicong: 'reyicong',
            },
        },
        guanping: {//关平
            name: 're_guanping',
            skills: {
                longyin: 'relongyin',
            },
        },
        guanqiujian: {//毌丘俭
            name: 're_guanqiujian',
            skills: {
                zhengrong: 'rezhengrong',
                hongju: 'rehongju',
                qingce: 'reqingce',
            },
        },
        old_guanqiujian: {//毌丘俭
            name: 're_guanqiujian',
            skills: {
                drlt_zhengrong: 'rezhengrong',
                drlt_hongju: 'rehongju',
                drlt_qingce: 'reqingce',
            },
        },
        tw_guanqiujian: {//毌丘俭
            name: 're_guanqiujian',
            skills: {
                twzhengrong: 'rezhengrong',
                twhongju: 'rehongju',
                twqingce: 'reqingce',
                twsaotao: 'twsaotao',
            },
        },
        ol_guansuo: {//关索
            name: 'guansuo',
            skills: {
                zhengnan: 'xinzhengnan',
                xiefang: 'xiefang',
                new_rewusheng: 'new_rewusheng',
                dangxian: 'xindangxian',
                rezhiman: 'rezhiman',
            },
        },
        guanyu: {//关羽
            name: 're_guanyu',
            skills: {
                wusheng: 'new_rewusheng',
            },
        },
        dc_jsp_guanyu: {//关羽
            name: 'jsp_guanyu',
            skills: {
                new_rewusheng: 'new_rewusheng',
                dcdanji: 'danji',
                mashu: 'mashu',
                dcnuzhan: 'nuzhan',
            },
        },
        guanzhang: {//关兴张苞
            name: 're_guanzhang',
            skills: {
                fuhun: 'fuhun',
                new_rewusheng: 'new_rewusheng',
                olpaoxiao: 'olpaoxiao',
            },
        },
        old_guanzhang: {//关兴张苞
            name: 're_guanzhang',
            skills: {
                old_fuhun: 'fuhun',
            },
        },
        guohuai: {//郭淮
            name: 're_guohuai',
            skills: {
                rejingce: 'decadejingce',
            },
        },
        xin_guohuai: {//郭淮
            name: 're_guohuai',
            skills: {
                mobilejingce: 'decadejingce',
            },
        },
        ol_guohuai: {//郭淮
            name: 're_guohuai',
            skills: {
                rejingce: 'decadejingce',
            },
        },
        tw_guohuai: {//郭淮
            name: 're_guohuai',
            skills: {
                twjingce: 'decadejingce',
                yuzhang: 'yuzhang',
            },
        },
        guohuanghou: {//郭皇后
            name: 're_guohuanghou',
            skills: {
                jiaozhao: 'rejiaozhao',
                danxin: 'redanxin',
            },
        },
        guojia: {//郭嘉
            name: 're_guojia',
            skills: {
                tiandu: 'tiandu',
                yiji: 'new_reyiji',
            },
        },
        guotufengji: {//郭图逢纪
            name: 're_guotufengji',
            skills: {
                jigong: 'rejigong',
                shifei: 'shifei',
            },
        },
        guyong: {//顾雍
            name: 're_guyong',
            skills: {
                shenxing: 'reshenxing',
                olbingyi: 'rebingyi',
            },
        },
        xin_guyong: {//顾雍
            name: 're_guyong',
            skills: {
                xinshenxing: 'reshenxing',
                xinbingyi: 'rebingyi',
            },
        },
        tw_guyong: {//顾雍
            name: 're_guyong',
            skills: {
                twgyshenxing: 'reshenxing',
                twbingyi: 'rebingyi',
            },
        },
        handang: {//韩当
            name: 're_handang',
            skills: {
                gongqi: 'regongqi',
                jiefan: 'jiefan',
            },
        },
        xin_handang: {//韩当
            name: 're_handang',
            skills: {
                xingongqi: 'regongqi',
                xinjiefan: 'jiefan',
            },
        },
        old_handang: {//韩当
            name: 're_handang',
            skills: {
                oldgongqi: 'regongqi',
                oldjiefan: 'jiefan',
            },
        },
        tw_handang: {//韩当
            name: 're_handang',
            skills: {
                twgongqi: 'regongqi',
                twjiefan: 'jiefan',
            },
        },
        hanhaoshihuan: {//韩浩史涣
            name: 're_hanhaoshihuan',
            skills: {
                shenduan: 'reshenduan',
                yonglve: 'reyonglve',
            },
        },
        xin_hansui: {//韩遂
            name: 're_hansui',
            skills: {
                xinniluan: 'spniluan',
                xiaoxi_hansui: 'spweiwu',
            },
        },
        heqi: {//贺齐
            name: 're_heqi',
            skills: {
                olqizhou: 'reqizhou',
                olshanxi: 'reshanxi',
            },
        },
        old_huangfusong: {//皇甫嵩
            name: 'huangfusong',
            skills: {
                fenyue: 'xinfenyue',
            },
        },
        huanggai: {//黄盖
            name: 're_huanggai',
            skills: {
                kurou: 'rekurou',
            },
        },
        sb_huanggai: {//黄盖
            name: 're_huanggai',
            skills: {
                sbkurou: 'rekurou',
                sbzhaxiang: 'zhaxiang',
            },
        },
        huanghao: {//黄皓
            name: 'dc_huanghao',
            skills: {
                qinqing: 'dcqinqing',
                huisheng: 'huisheng',
            },
        },
        old_huanghao: {//黄皓
            name: 'dc_huanghao',
            skills: {
                oldqinqing: 'dcqinqing',
                oldhuisheng: 'huisheng',
            },
        },
        huangyueying: {//黄月英
            name: 're_huangyueying',
            skills: {
                jizhi: 'rejizhi',
                qicai: 'reqicai',
            },
        },
        jsp_huangyueying: {//黄月英
            name: 're_jsp_huangyueying',
            skills: {
                jiqiao: 'rejiqiao',
                linglong: 'relinglong',
            },
        },
        huangzhong: {//黄忠
            name: 're_huangzhong',
            skills: {
                liegong: 'xinliegong',
            },
        },
        ol_huangzhong: {//黄忠
            name: 're_huangzhong',
            skills: {
                xinliegong: 'xinliegong',
                remoshi: 'remoshi',
            },
        },
        sb_huangzhong: {//黄忠
            name: 're_huangzhong',
            skills: {
                sbliegong: 'xinliegong',
            },
        },
        huatuo: {//华佗
            name: 're_huatuo',
            skills: {
                jijiu: 'jijiu',
                qingnang: 'new_reqingnang',
            },
        },
        old_huatuo: {//华佗
            name: 're_huatuo',
            skills: {
                jijiu: 'jijiu',
                chulao: 'new_reqingnang',
            },
        },
        ol_huaxin: {//华歆
            name: 'huaxin',
            skills: {
                caozhao: 'spwanggui',
                olxibing: 'xibing',
            },
        },
        huaxiong: {//华雄
            name: 're_huaxiong',
            skills: {
                yaowu: 'reyaowu',
            },
        },
        old_huaxiong: {//华雄
            name: 're_huaxiong',
            skills: {
                shiyong: 'reyaowu',
            },
        },
        sb_huaxiong: {//华雄
            name: 're_huaxiong',
            skills: {
                new_reyaowu: 'reyaowu',
                sbyangwei: 'shizhan',
            },
        },
        ol_huaxiong: {//华雄
            name: 're_huaxiong',
            skills: {
                new_reyaowu: 'reyaowu',
            },
        },
        hucheer: {//胡车儿
            name: 're_hucheer',
            skills: {
                daoji: 'redaoji',
            },
        },
        rw_hucheer: {//胡车儿
            name: 're_hucheer',
            skills: {
                twdaoji: 'redaoji',
                twshenxing: 'fuzhong',
            },
        },
        dc_hujinding: {//胡金定
            name: 'hujinding',
            skills: {
                dcdeshi: 'renshi',
                dcwuyuan: 'wuyuan',
                huaizi: 'huaizi',
            },
        },
        sp_jianggan: {//蒋干
            name: 'jianggan',
            skills: {
                spdaizui: 'weicheng',
                spdaoshu: 'daoshu',
            },
        },
        jiangwei: {//姜维
            name: 're_jiangwei',
            skills: {
                tiaoxin: 'retiaoxin',
                zhiji: 'zhiji',
            },
        },
        ol_jiangwei: {//姜维
            name: 're_jiangwei',
            skills: {
                oltiaoxin: 'retiaoxin',
                olzhiji: 'zhiji',
            },
        },
        sb_jiangwei: {//姜维
            name: 're_jiangwei',
            skills: {
                sbtiaoxin: 'retiaoxin',
                sbzhiji: 'zhiji',
            },
        },
        jianyong: {//简雍
            name: 're_jianyong',
            skills: {
                qiaoshui: 'reqiaoshui',
                jyzongshi: 'jyzongshi',
            },
        },
        xin_jianyong: {//简雍
            name: 're_jianyong',
            skills: {
                xinqiaoshui: 'reqiaoshui',
                xinjyzongshi: 'jyzongshi',
            },
        },
        jiaxu: {//贾诩
            name: 're_jiaxu',
            skills: {
                wansha: 'rewansha',
                luanwu: 'reluanwu',
                weimu: 'reweimu',
            },
        },
        dc_sp_jiaxu: {//贾诩
            name: 'sp_jiaxu',
            skills: {
                zhenlue: 'zhenlue',
                dcjianshu: 'jianshu',
                dcyongdi: 'yongdi',
            },
        },
        dc_jiling: {//纪灵
            name: 'jiling',
            skills: {
                dcshuangren: 'shuangren',
            },
        },
        tw_jiling: {//纪灵
            name: 'jiling',
            skills: {
                twshuangren: 'shuangren',
            },
        },
        xin_jushou: {//沮授
            name: 're_jushou',
            skills: {
                xinjianying: 'dcjianying',
                shibei: 'dcshibei',
            },
        },
        yj_jushou: {//沮授
            name: 're_jushou',
            skills: {
                jianying: 'dcjianying',
                shibei: 'dcshibei',
            },
        },
        kanze: {//阚泽
            name: 're_kanze',
            skills: {
                xiashu: 'xiashu',
                kuanshi: 'rekuanshi',
            },
        },
        liaohua: {//廖化
            name: 're_liaohua',
            skills: {
                dangxian: 'xindangxian',
                fuli: 'xinfuli',
            },
        },
        xin_liaohua: {//廖化
            name: 're_liaohua',
            skills: {
                redangxian: 'xindangxian',
                refuli: 'xinfuli',
            },
        },
        old_lingju: {//灵雎
            name: 'lingju',
            skills: {
                jieyuan: 'jieyuan',
                fenxin_old: 'fenxin',
            },
        },
        lingtong: {//凌统
            name: 're_lingtong',
            skills: {
                xuanfeng: 'rexuanfeng',
            },
        },
        xin_lingtong: {//凌统
            name: 're_lingtong',
            skills: {
                decadexuanfeng: 'rexuanfeng',
                yongjin: 'yongjin',
            },
        },
        old_lingtong: {//凌统
            name: 're_lingtong',
            skills: {
                oldxuanfeng: 'rexuanfeng',
            },
        },
        liru: {//李儒
            name: 're_liru',
            skills: {
                juece: 'rejuece',
                mieji: 'remieji',
                fencheng: 'xinfencheng',
            },
        },
        dc_liru: {//李儒
            name: 're_liru',
            skills: {
                xinjuece: 'rejuece',
                dcmieji: 'remieji',
                dcfencheng: 'xinfencheng',
            },
        },
        xin_liru: {//李儒
            name: 're_liru',
            skills: {
                xinjuece: 'rejuece',
                xinmieji: 'remieji',
                xinfencheng: 'xinfencheng',
            },
        },
        dc_liuba: {//刘巴
            name: 'liuba',
            skills: {
                dczhubi: 'duanbi',
                dcliuzhuan: 'tongduo',
            },
        },
        ol_liuba: {//刘巴
            name: 'liuba',
            skills: {
                olzhubi: 'duanbi',
                oltongduo: 'tongduo',
            },
        },
        liubei: {//刘备
            name: 're_liubei',
            skills: {
                rende: 'rerende',
                jijiang: 'rejijiang',
            },
        },
        sb_liubei: {//刘备
            name: 're_liubei',
            skills: {
                abrende: 'rerende',
                sbjijiang: 'rejijiang',
                sbzhangwu: 'sbzhangwu',
            },
        },
        liubiao: {//刘表
            name: 're_liubiao',
            skills: {
                rezishou: 'zishou',
                zongshi: 'rezongshi',
            },
        },
        xin_liubiao: {//刘表
            name: 're_liubiao',
            skills: {
                decadezishou: 'zishou',
                decadezongshi: 'rezongshi',
            },
        },
        sb_liubiao: {//刘表
            name: 're_liubiao',
            skills: {
                sbzishou: 'zishou',
                sbzongshi: 'rezongshi',
            },
        },
        oldre_liubiao: {//刘表
            name: 're_liubiao',
            skills: {
                zishou: 'zishou',
                zongshi: 'rezongshi',
            },
        },
        old_liubiao: {//刘表
            name: 're_liubiao',
            skills: {
                oldzishou: 'zishou',
                zongshi: 'rezongshi',
            },
        },
        liuchen: {//刘谌
            name: 're_liuchen',
            skills: {
                zhanjue: 'rezhanjue',
                qinwang: 'reqinwang',
            },
        },
        liufeng: {//刘封
            name: 're_liufeng',
            skills: {
                xiansi: 'rexiansi',
            },
        },
        tw_liuhong: {//刘宏
            name: 'liuhong',
            skills: {
                twyujue: 'yujue',
                rwgezhi: 'tuxing',
                twfengqi: 'zhihu',
            },
        },
        liushan: {//刘禅
            name: 're_liushan',
            skills: {
                xiangle: 'xiangle',
                fangquan: 'refangquan',
                ruoyu: 'ruoyu',
            },
        },
        ol_liushan: {//刘禅
            name: 're_liushan',
            skills: {
                xiangle: 'xiangle',
                olfangquan: 'refangquan',
                olruoyu: 'ruoyu',
            },
        },
        dc_liuye: {//刘晔
            name: 'liuye',
            skills: {
                dcpoyuan: 'polu',
                dchuace: 'choulve',
            },
        },
        ol_liuyu: {//刘虞
            name: 'liuyu',
            skills: {
                zhige: 'xinzhige',
                zongzuo: 'xinzongzuo',
            },
        },
        liuzan: {//留赞
            name: 're_liuzan',
            skills: {
                fenyin: 'refenyin',
            },
        },
        ol_lusu: {//鲁肃
            name: 're_lusu',
            skills: {
                olhaoshi: 'haoshi',
                oldimeng: 'dimeng',
            },
        },
        luxun: {//陆逊
            name: 're_luxun',
            skills: {
                qianxun: 'reqianxun',
                lianying: 'relianying',
            },
        },
        lvbu: {//吕布
            name: 're_lvbu',
            skills: {
                wushuang: 'wushuang',
            },
        },
        dc_lvkuanglvxiang: {//吕旷吕翔
            name: 'lvkuanglvxiang',
            skills: {
                dcliehou: 'liehou',
                dcshuhe: 'qigong',
            },
        },
        lvmeng: {//吕蒙
            name: 're_lvmeng',
            skills: {
                keji: 'keji',
            },
        },
        sb_lvmeng: {//吕蒙
            name: 're_lvmeng',
            skills: {
                sbkeji: 'keji',
                sbdujiang: 'qinxue',
                sbduojing: 'sbduojing',
            },
        },
        machao: {//马超
            name: 're_machao',
            skills: {
                mashu: 'mashu',
                tieji: 'retieji',
            },
        },
        sb_machao: {//马超
            name: 're_machao',
            skills: {
                mashu: 'mashu',
                sbtieji: 'retieji',
            },
        },
        old_machao: {//马超
            name: 'sp_machao',
            skills: {
                zhuiji: 'olzhuiji',
                oldcihuai: 'ol_shichou',
            },
        },
        old_madai: {//马岱
            name: 're_madai',
            skills: {
                mashu: 'mashu',
                qianxi: 'reqianxi',
            },
        },
        tw_madai: {//马岱
            name: 're_madai',
            skills: {
                mashu: 'mashu',
                twqianxi: 'reqianxi',
            },
        },
        madai: {//马岱
            name: 're_madai',
            skills: {
                mashu: 'mashu',
                oldqianxi: 'reqianxi',
            },
        },
        old_majun: {//马钧
            name: 'majun',
            skills: {
                xinfu_jingxie1: 'xinfu_jingxie1',
                xinfu_qiaosi: 'qiaosi',
            },
        },
        ol_maliang: {//马良
            name: 'maliang',
            skills: {
                zishu: 'zishu',
                xinyingyuan: 'yingyuan',
            },
        },
        old_maliang: {//马良
            name: 're_maliang',
            skills: {
                xiemu: 'rexiemu',
                naman: 'heli',
            },
        },
        manchong: {//满宠
            name: 're_manchong',
            skills: {
                junxing: 'rejunxing',
                yuce: 'yuce',
            },
        },
        xin_masu: {//马谡
            name: 're_masu',
            skills: {
                olsanyao: 'resanyao',
                rezhiman: 'rezhiman',
            },
        },
        tw_mayunlu: {//马云騄
            name: 'mayunlu',
            skills: {
                mashu: 'mashu',
                twfengpo: 'fengpo',
            },
        },
        mazhong: {//马忠
            name: 're_mazhong',
            skills: {
                fuman: 'refuman',
            },
        },
        menghuo: {//孟获
            name: 're_menghuo',
            skills: {
                huoshou: 'huoshou',
                zaiqixx: 'rezaiqi',
            },
        },
        sb_menghuo: {//孟获
            name: 're_menghuo',
            skills: {
                sbhuoshou: 'huoshou',
                sbzaiqi: 'rezaiqi',
            },
        },
        miheng: {//祢衡
            name: 're_miheng',
            skills: {
                kuangcai: 'rekuangcai',
                shejian: 'reshejian',
            },
        },
        ol_bianfuren: {//卞夫人
            name: 'sp_bianfuren',
            skills: {
                fuwei: 'spwanwei',
                yuejian: 'spyuejian',
            },
        },
        panfeng: {//潘凤
            name: 're_panfeng',
            skills: {
                kuangfu: 'xinkuangfu',
            },
        },
        std_panfeng: {//潘凤
            name: 're_panfeng',
            skills: {
                stdkuangfu: 'xinkuangfu',
            },
        },
        pangde: {//庞德
            name: 're_pangde',
            skills: {
                mashu: 'mashu',
                mengjin: 'jianchu',
            },
        },
        ol_pangde: {//庞德
            name: 're_pangde',
            skills: {
                mashu: 'mashu',
                rejianchu: 'jianchu',
            },
        },
        sp_pangde: {//庞德
            name: 're_pangde',
            skills: {
                mashu: 'mashu',
                juesi: 'jianchu',
            },
        },
        pangtong: {//庞统
            name: 're_pangtong',
            skills: {
                lianhuan: 'xinlianhuan',
                oldniepan: 'niepan',
            },
        },
        ol_pangtong: {//庞统
            name: 're_pangtong',
            skills: {
                ollianhuan: 'xinlianhuan',
                olniepan: 'niepan',
            },
        },
        sb_pangtong: {//庞统
            name: 're_pangtong',
            skills: {
                sblianhuan: 'xinlianhuan',
                sbniepan: 'niepan',
                sblianhuan_lv2: 'sblianhuan_lv2',
            },
        },
        zhangjiao: {//张角
            name: 're_zhangjiao',
            skills: {
                leiji: 'xinleiji',
                guidao: 'xinguidao',
                huangtian: 'xinhuangtian',
            },
        },
        sb_zhangjiao: {//谋张角
            name: 're_zhangjiao',
            skills: {
                sbleiji: 'xinleiji',
                sbguidao: 'xinguidao',
                sbhuangtian: 'xinhuangtian',
            },
        },
        sp_zhangjiao: {//旧张角
            name: 're_zhangjiao',
            skills: {
                releiji: 'xinleiji',
                guidao: 'xinguidao',
                huangtian: 'xinhuangtian',
            },
        },
        panshu: {//潘淑
            name: 're_panshu',
            skills: {
                jinzhi: 'zhiren',
                weiyi: 'yaner',
            },
        },
        panzhangmazhong: {//潘璋马忠
            name: 're_panzhangmazhong',
            skills: {
                duodao: 'reduodao',
                anjian: 'reanjian',
            },
        },
        xin_panzhangmazhong: {//潘璋马忠
            name: 're_panzhangmazhong',
            skills: {
                xinduodao: 'reduodao',
                xinanjian: 'reanjian',
            },
        },
        tw_qiaogong: {//桥公
            name: 'qiaogong',
            skills: {
                twyizhu: 'yizhu',
                twluanchou: 'luanchou',
                twgonghuan: 'gonghuan',
            },
        },
        yanwen: {//颜良文丑
            name: 're_yanwen',
            skills: {
                shuangxiong: 'reshuangxiong',
            },
        },
        ol_yanwen: {//颜良文丑
            name: 're_yanwen',
            skills: {
                olshuangxiong: 'reshuangxiong',
            },
        },
        pangde: {//庞德
            name: 're_pangde',
            skills: {
                mengjin: 'jianchu',
            },
        },
        ol_pangde: {//庞德
            name: 're_pangde',
            skills: {
                mengjin: 'rejianchu',
            },
        },
    }
});