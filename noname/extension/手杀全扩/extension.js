game.import("extension",function(lib,game,ui,get,ai,_status)
{
    return {name:"手杀全扩",content:function(config,pack){

//手杀全扩
var changePlayer={
    //风林火山:
            //标准:
           "liubei":"刘备",
           "guanyu":"关羽",
           "huanggai":"黄盖",
           "ganning":"甘宁",
           "machao":"马超",
           "zhangfei":"张飞",
           "zhaoyun":"赵云",
           "caocao":"曹操",
           "sunquan":"孙权",
           "xuzhu":"许褚",
           "luxun":"陆逊",
           "daqiao":"大乔",
           "xiahoudun":"夏侯惇",
           "zhangliao":"张辽",
           "zhugeliang":"诸葛亮",
           "lvmeng":"吕蒙",
           "zhouyu":"周瑜",
           "huaxiong":"华雄",
           "re_yuanshu":"袁术",
           "sunshangxiang":"孙尚香",
           "huatuo":"华佗",
           "diaochan":"貂蝉",
           "simayi":"司马懿",
           "huangyueying":"黄月英",
           "zhenji":"甄姬",
           "guojia":"郭嘉",
           "lvbu":"吕布",
           //风:
           "huangzhong":"黄忠",
           "xiaoqiao":"小乔",
           "zhangjiao":"张角",
           "weiyan":"魏延",
           //移动版曹仁本体没有//
           "xiahouyuan":"夏侯渊",
           //移动版周泰本体也没有//
           "yuji":"于吉",
           //火:
           "xunyu":"荀彧",
           "dianwei":"典韦",
           "pangtong":"庞统",
           "sp_zhugeliang":"卧龙诸葛",
           "taishici":"太史慈",
           "pangde":"庞德",
           "yanwen":"颜良文丑",
           "re_yuanshao":"袁绍",
           //林:
           "xuhuang":"徐晃",
           "caopi":"曹丕",
           "sunjian":"孙坚",
           "dongzhuo":"董卓",
           "zhurong":"祝融",
           "menghuo":"孟获",
           "jiaxu":"贾诩",
           "re_lusu":"鲁肃",
           //山:
           "zhanghe":"张郃",
           "dengai":"邓艾",
           "jiangwei":"姜维",
           "liushan":"刘禅",
           "sunce":"孙策",
           "zhangzhang":"张昭张纮",
           "zuoci":"左慈",
           "caiwenji":"蔡文姬",
           //阴:
           "yanyan":"严颜",
           "wangping":"王平",
           "luji":"陆绩",
           "xin_sunliang":"孙亮",
           "kuailiangkuaiyue":"蒯良蒯越",
           "xuyou":"许攸",
           "yl_luzhi":"卢植",
           "wangji":"王基",
           //雷:
           "chendao":"陈到",
           "haozhao":"郝昭",
           "yl_yuanshu":"仲帝袁术",
           "lukang":"陆抗",
           "re_guanqiujian":"毌丘俭",
           "zhoufei":"周妃",
           "zhugezhan":"诸葛瞻",
           "zhangxiu":"张绣",
      //谋攻篇
           //知:
           "sb_caocao":"谋曹操",
           "sb_zhouyu":"谋周瑜",
           "sb_zhenji":"谋甄姬",
           "sb_liubei":"谋刘备",
           "sb_sunquan":"谋孙权",
           "sb_pangtong":"谋庞统",
           //识:
           "sb_xuhuang":"谋徐晃",
           "sb_machao":"谋马超",
           "sb_daqiao":"谋大乔",
           "sb_fazheng":"谋法正",
           //同:
           "sp_yangwan":"谋杨婉",
           "liucheng":"谋刘赪",
           "sb_zhangfei":"谋张飞",
           "sb_zhaoyun":"谋赵云",
           "sb_xiahoushi":"谋夏侯氏",
           "sb_yuanshao":"谋袁绍",
           "sb_zhurong":"谋祝融",
           //虞:
           "sb_lvmeng":"谋吕蒙",
           "sb_yujin":"谋于禁",
           "sb_huangzhong":"谋黄忠",
           "sb_huanggai":"谋黄盖",
           "sb_caoren":"谋曹仁",
           "sb_diaochan":"谋貂蝉",
           "sb_zhangjiao":"谋张角",
           //能:
           "sb_huaxiong":"谋华雄",
           "sb_sunshangxiang":"谋孙尚香",
           "sb_jiangwei":"谋姜维",
           "sb_chengong":"谋陈宫",
           "sb_menghuo":"谋孟获",
           "sb_zhanghe":"谋张郃",
           //新加：
           "sb_luzhi":"谋卢植",
           "sb_xiaoqiao":"谋小乔",
           "sb_caopi":"谋曹丕",
           "sb_sp_zhugeliang":"谋卧龙",
           "sb_ganning":"谋甘宁",
           "sb_sunce":"谋孙策",
           "sb_liubiao":"谋刘表",
           "sb_guanyu":"谋关羽",
           "sb_huangyueying":"谋黄月英",
           "sb_luxun": "谋陆逊",
           "sb_xiahoudun": "谋夏侯惇",
           "sb_gaoshun": "谋高顺",
           "sb_handang": "谋韩当",
           "sb_gongsunzan": "谋公孙瓒",
           "sb_jiaxu": "谋贾诩",
      //始计篇
            //智:
            "sp_wangcan":"王粲",
            "sp_chenzhen":"陈震",
            "sp_xunchen":"荀谌",
            "feiyi":"费祎",
            "luotong":"骆统",
            "sp_duyu":"杜预",
            "sp_sunshao":"孙邵",
            "sp_bianfuren":"卞夫人",
            //信:
            "sp_xinpi":"辛毗",
            "zhouchu":"周处",
            "wujing":"吴景",
            "wangfuzhaolei":"王甫赵累",
            "sp_yanghu":"羊祜",
            "sp_mifuren":"糜夫人",
            "sp_machao":"sp马超",
            "ol_wangling":"王凌",
            "sp_kongrong":"孔融",
            //仁:
            "sp_xujing":"许靖",
            "xiangchong":"向宠",
            "liuzhang":"刘璋",
            "sp_huaxin":"华歆",
            "zhangzhongjing":"张仲景",
            "sp_zhangwen":"张温",
            "caizhenji":"蔡贞姬",
            "qiaogong":"桥公",
            //勇:
            "sunyi":"孙翊",
            "sp_gaolan":"高览",
            "sp_zongyu":"宗预",
            "sp_huaman":"花鬘",
            "sp_chendong":"陈武董袭",
            "db_wenyang":"文鸯",
            "yuanhuan":"袁涣",
            "sp_wangshuang":"王双",
            //严:
            "sp_jiangwan":"蒋琬",
            "sp_jiangqing":"蒋钦",
            "sp_cuiyan":"崔琰",
            "sp_zhangchangpu":"张昌蒲",
            "sp_lvfan":"吕范",
            "sp_huangfusong":"皇甫嵩",
            "sp_zhujun":"朱儁",
            "liuba":"刘巴",
      //界限突破
             //标准:
             "re_liubei":"界刘备",
             "re_guanyu":"界关羽",
             "xin_zhangfei":"界张飞",
             "old_zhaoyun":"界赵云",
             "re_machao":"界马超",
             "re_ganning":"界甘宁",
             "re_lvmeng":"界吕蒙",
             "re_huanggai":"界黄盖",
             "re_zhouyu":"界周瑜",
             "re_daqiao":"界大乔",
             "re_luxun":"界陆逊",
             "re_caocao":"界曹操",
             "re_simayi":"界司马懿",
             "xin_xiahoudun":"界夏侯惇",
             "re_zhangliao":"界张辽",
             "re_xuzhu":"界许褚",
             "re_guojia":"界郭嘉",
             "re_huatuo":"界华佗",
             "re_lvbu":"界吕布",
             "ol_huaxiong":"界华雄",
             "old_yuanshu":"界袁术",
             "re_zhugeliang":"界诸葛亮",
             "re_sunquan":"界孙权",
             "re_diaochan":"界貂蝉",
             "re_huangyueying":"界黄月英",
             "re_zhenji":"界甄姬",
             "re_sunshangxiang":"界孙尚香",
             "xf_yiji":"界伊籍",
             //风:
             "re_huangzhong":"界黄忠",
             "re_weiyan":"界魏延",
             "re_xiahouyuan":"界夏侯渊",
             "caoren":"界曹仁",
             "re_xiaoqiao":"界小乔",
             "old_zhoutai":"界周泰",
             "sp_zhangjiao":"界张角",
             "re_yuji":"界于吉",
             //火:
             "re_sp_zhugeliang":"界卧龙诸葛",
             "re_dianwei":"界典韦",
             "re_xunyu":"界荀彧",
             "re_pangde":"界庞德",
             "re_pangtong":"界庞统",
             "re_yanwen":"界颜良文丑",
             "xin_yuanshao":"界袁绍",
             //林:
             "re_xuhuang":"界徐晃",
             "re_menghuo":"界孟获",
             "re_zhurong":"界祝融",
             "re_caopi":"界曹丕",
             "re_sunjian":"界孙坚",
             "re_dongzhuo":"界董卓",
             //山:
             "re_dengai":"界邓艾",
             "re_zuoci":"界左慈",
             "re_jiangwei":"界姜维",
             "re_sunben":"界孙策",
             "re_caiwenji":"界蔡文姬",
             "re_zhangzhang":"界张昭张纮",
             "re_liushan":"界刘禅",
     //一将成名:
              //2011:
              "caozhi":"曹植",
              "gaoshun":"高顺",
              "chengong":"陈宫",
              "fazheng":"法正",
              "lingtong":"凌统",
              "xin_masu":"马谡",
              "wuguotai":"吴国太",
              "xusheng":"徐盛",
              "xin_xushu":"徐庶",
              "xin_yujin":"于禁",
              "zhangchunhua":"张春华",
              //2012:
              "caozhang":"曹彰",
              "old_wangyi":"王异",
              "xunyou":"荀攸",
              "old_guanzhang":"关兴张苞",
              "liaohua":"廖化",
              "madai":"马岱",
              "bulianshi":"步练师",
              "chengpu":"程普",
              "handang":"韩当",
              "liubiao":"刘表",
              "zhonghui":"钟会",
              //移动版公孙瓒没有//
              //2013:
              "caochong":"曹冲",
              "guohuai":"郭淮",
              "manchong":"满宠",
              "guanping":"关平",
              "jianyong":"简雍",
              "liufeng":"刘封",
              "panzhangmazhong":"潘璋马忠",
              "yufan":"虞翻",
              "zhuran":"朱然",
              "fuhuanghou":"伏皇后",
              "xin_liru":"李儒",
              //2014:
              "old_caozhen":"曹真",
              "hanhaoshihuan":"韩浩史涣",
              "old_chenqun":"陈群",
              "wuyi":"吴懿",
              "zhoucang":"周仓",
              "zhangsong":"张松",
              "sunluban":"孙鲁班",
              "zhuhuan":"朱桓",
              "guyong":"顾雍",
              "yj_jushou":"沮授",
              "caifuren":"蔡夫人",
              //2015:
              "caorui":"曹叡",
              "caoxiu":"曹休",
              "zhongyao":"钟繇",
              "liuchen":"刘谌",
              "xiahoushi":"夏侯氏",
              "zhangyi":"张嶷",
              "sunxiu":"孙休",
              "old_zhuzhi":"朱治",
              "quancong":"全琮",
              "gongsunyuan":"公孙渊",
              "guotufengji":"郭图逢纪",
     //界一将成名:
              //2011:
              "re_xusheng":"界徐盛",
              "re_wuguotai":"界吴国太",
              "re_gaoshun":"界高顺",
              "ol_yujin":"界于禁",
              "xin_fazheng":"界法正",
              "re_caozhi":"界曹植",
              "re_lingtong":"界凌统",
              //2012:
              "re_wangyi":"界王异",
              "guanzhang":"界关兴张苞",
              "old_madai":"界马岱",
              "xin_gongsunzan":"界公孙瓒",
              "re_zhonghui":"界钟会",
              "re_liubiao":"界刘表",
              "re_handang":"界韩当",
              "xin_chengpu":"界程普",
              "re_bulianshi":"界步练师",
              "xin_liaohua":"界廖化",
              "xin_caozhang":"界曹彰",
              //2013:
              "xin_zhuran":"界朱然",
              "xin_jianyong":"界简雍",
              "re_yufan":"界虞翻",
              "re_manchong":"界满宠",
              "xin_fuhuanghou":"界伏皇后",
              "re_liru":"界李儒",
              "xin_guohuai":"界郭淮",
              "xin_panzhangmazhong":"界潘璋马忠",
              //2014:
              "re_chenqun":"界陈群",
              "xin_zhoucang":"界周仓",
              "xin_caozhen":"界曹真",
              "xin_guyong":"界顾雍",
              "xin_sunluban":"界孙鲁班",
              "xin_caifuren":"界蔡夫人",
              //2015:
              "xin_sunxiu":"界孙休",
              "xin_quancong":"界全琮",
             
              "xin_wuyi":"界吴懿",
              "xin_zhuzhi":"界朱治",
              "xin_zhuhuan":"界朱桓",
              "xin_caoxiu":"界曹休",
       //乱世英杰:
              //2016:
              "guohuanghou":"郭皇后",
              "liyan":"李严",
              "sundeng":"孙登",
              "ol_liuyu":"刘虞",
              "cenhun":"岑昏",
              "sunziliufang":"孙资刘放",
              "huanghao":"黄皓",
              "zhangrang":"张让",
              //2017:
              "wuxian":"吴苋",
              "xushi":"徐氏",
              "qinmi":"秦宓",
              "xuezong":"薛综",
              "caojie":"曹节",
              "re_jikang":"嵇康",
              "caiyong":"蔡邕",
              "xinxianying":"辛宪英",
            //sp
              //魏:
              "zhugedan":"诸葛诞",
              "caoang":"曹昂",
              "jsp_guanyu":"sp关羽",
              "sp_jiangwei":"sp姜维",
              "wenpin":"文聘",
              "sp_jiaxu":"sp贾诩",
              "yuejin":"乐进",
              "simalang":"司马朗",
              "caohong":"曹洪",
              "sp_caiwenji":"sp蔡文姬",
              "sp_caoren":"sp曹仁",
              "sp_pangde":"sp庞德",
              "litong":"李通",
              "re_lidian":"李典",
              "chengyu":"程昱",
              "lvqian":"吕虔",
              "xizhicai":"戏志才",
              "yangxiu":"杨修",
              "duji":"杜畿",
              "chenlin":"陈琳",
              "luzhi":"鲁芝",
              "jiakui":"贾逵",
              "re_zhanggong":"张恭",
              "caoying":"曹婴",
              "ol_wanglang":"王朗",
              "sp_maojie":"毛玠",
              "ruanhui":"阮慧",
              "sp_caosong":"曹嵩",
              //蜀:
              "ol_maliang":"马良",
              "xiahouba":"夏侯霸",
              "sp_sunshangxiang":"sp孙尚香",
              "guanyinping":"关银屏",
              "mizhu":"糜竺",
              "re_xushu":"sp徐庶",
              "mayunlu":"马云騄",
              "sunqian":"孙乾",
              "mazhong":"马忠",
              "old_zhangxingcai":"张星彩",
              "dongyun":"董允",
              "zhaoxiang":"赵襄",
              "yangyi":"杨仪",
              "ol_guansuo":"关索",
              "lvkai":"吕凯",
              "shamoke":"沙摩柯",
              "re_baosanniang":"鲍三娘",
              "furong":"傅肜",
              "dengzhi":"邓芝",
              "zhangyis":"张翼",
              "zhouqun":"周群",
              "qiaozhou":"谯周",
              "fuqian":"傅佥",
              //吴:
              "dingfeng":"丁奉",
              "zhugejin":"诸葛瑾",
              "sunluyu":"孙鲁育",
              "zumao":"祖茂",
              "zhugeke":"诸葛恪",
              "daxiaoqiao":"大小乔",
              "re_heqi":"贺奇",
              "re_jsp_pangtong":"sp庞统",
              "panjun":"潘濬",
              "buzhi":"步骘",
              "re_weiwenzhugezhi":"卫温诸葛直",
              "lvdai":"吕岱",
              "sunhao":"孙皓",
              "kanze":"阚泽",
              "re_xugong":"许贡",
              "yanjun":"严畯",
              //群:
              "yangfu":"杨阜",
              "panfeng":"潘凤",
              "fuwan":"伏完",
              "hetaihou":"何太后",
              "zhangbao":"张宝",
              //移动版sp马超没有//
              "sp_diaochan":"sp貂蝉",
              "sp_zhaoyun":"sp赵云",
              "liuxie":"刘协",
              "jsp_huangyueying":"sp_黄月英",
              "yanbaihu":"严白虎",
              "tadun":"蹋顿",
              "zhanglu":"张鲁",
              "sp_liuqi":"刘琦",
              "dongbai":"董白",
              "dongcheng":"董承",
              "fanchou":"樊稠",
              "quyi":"麴义",
              "sp_taishici":"sp太史慈",
              "taoqian":"陶谦",
              "liuyao":"刘繇",
              "lijue":"李傕",
              "shixie":"士燮",
              "simahui":"司马徽",
              "shenpei":"审配",
              "beimihu":"卑弥呼",
              "zhangji":"张济",
              "re_zhangliang":"张梁",
              "liuyan":"刘焉",
              "re_wangyun":"王允",
              "sp_sufei":"苏飞",
              "xurong":"徐荣",
              "guosi":"郭汜",
              "dingyuan":"丁原",
              "chendeng":"陈登",
              "zhangqiying":"张琪瑛",
              "hucheer":"胡车儿",
              "gongsunkang":"公孙康",
              "wutugu":"兀突骨",
              "yanpu":"阎圃",
              "mayuanyi":"马元义",
              "xin_mamidi":"马日磾",
              "xin_guozhao":"郭照",
              "mb_caomao":"曹髦",
              "mb_epic_caomao":"曹髦",
              "mb_zhangfen":"张奋",
          //神将: 
               "shen_luxun":"神陆逊",
               "shen_liubei":"神刘备",
               "shen_zhaoyun":"神赵云",
               "shen_guanyu":"神关羽",
               "shen_lvmeng":"神吕蒙",
               "shen_simayi":"神司马懿",
               "shen_caocao":"神曹操",
               "shen_zhugeliang":"神诸葛亮",
               "shen_zhouyu":"神周瑜",
               "shen_lvbu":"神吕布",
               "shen_ganning":"神甘宁",
               "shen_zhangliao":"神张辽",
               "shen_taishici":"神太史慈",
               "shen_guojia":"神郭嘉",
               "shen_xunyu":"神荀彧",
               "shen_sunce":"神孙策",
               "shen_huatuo":"神华佗",
               "shen_lusu":"神鲁肃",
       //稀有专属:
               //手机:
               "shichangshi":"十常侍",
               "liuye":"刘晔",
               "qianzhao":"牵招",
               "sunru":"孙茹",
               "old_lingju":"灵雎",
               "lingcao":"凌操",
               "liuzan":"留赞",
               "lifeng":"李丰",
               "zhuling":"朱灵",
               "zhugeguo":"诸葛果",
               "caochun":"曹纯",
               "miheng":"祢衡",
               "zhaotongzhaoguang":"赵统赵广",
               "wangyuanji":"王元姬",
               "simazhao":"司马昭",
               "hujinding":"胡金定",
               "yj_zhaoliao":"星张辽",
               "yj_ganning":"星甘宁",
               "yj_xuhuang":"星徐晃",
               "yj_zhanghe":"星张郃",
               "yj_weiyan":"星魏延",
               "yj_caoren":"星曹仁",
               "yj_zhangliao":"星张辽",
               "yj_yuanshu":"星袁术",
               "friend_cuijun": "友崔均",
               "friend_shitao": "友石韬",
               "friend_pangtong": "友庞统",
               "friend_xushu": "友徐庶",
               "friend_zhugeliang": "友诸葛亮",
               "pot_taishici": "势太史慈",
               "pot_yuji": "势于吉",
               "pot_weiyan": "势魏延",
               "mb_qinghegongzhu": "清河公主",
               "yanghuiyu":"羊徽瑜",
               "simashi":"司马师",
               "sp_pengyang":"彭羕",
               "yangbiao":"杨彪",
               "peixiu":"裴秀",
               "xin_zhoutai": "界周泰",
               "yj_huangzhong":"星黄忠",
               "simafu": "司马孚",
               /*"th_sunhanhua":"孙寒华",
               "th_pangdegong":"庞德公",
               "th_nanhualaoxian":"南华老仙",
               "th_zhengxuan":"郑玄",
               "th_majun":"马钧",
               "th_mamidi":"马日磾",
               "th_shen_zhouyu":"神周瑜",*/
               //小游戏武将
               "sunhanhua":"孙寒华",
               "nanhualaoxian":"南华老仙",
               "zhengxuan":"郑玄",
               "pangdegong":"庞德公",
               "zhengxuan":"郑玄",
               "majun":"马钧",
              //补充
               "jlsg_simazhao":"司马昭",
               "tw_yanxiang":"阎象",
               "mb_wangjing":"王经",
               "wangjun":"王濬",
               "tw_baoxin":"鲍信",
               "xin_hansui":"韩遂",
               "jiling":"纪灵",
               "xin_jushou":"界沮授",
               "xin_zhangyi":"界张嶷",
               "tw_jiangji":"蒋济",
               "sp_jianggan":"蒋干",
};
/*斗地主专属武将*/
var doudizhuZS = {
        sunwukong:"孙悟空",
        longwang:"东海龙王",
        taoshen:"涛神",
        nezha:"哪吒",
        xiaoyuehankehan:"小约翰可汗",
        wu_zhutiexiong:"朱铁雄",
        libai:"李白",
        dc_noname:"无名",
        dc_liubei:"经典刘备",
        dc_sunquan:"经典孙权",
        dc_caocao:"经典曹操",
        /*shen_dianwei:"神典韦",*/
        /*boss_zhaoyun:"高达一号"*/
};

if(config.jinjiang){
    lib.translate['re_sunben']='界孙策';
    for(var i in lib.character){
        var tra=config.unseen?config.unseen:'unseen';
        if(!(changePlayer[i]||(get.mode()=='doudizhu'&&doudizhuZS[i]))) {
            lib.character[i][4].add(tra);
            //lib.character[i][4].add('unShouSha');
        }
    };
    var characterPacks={
		standard:'标准',
		extra:'神将',
		//old:'怀旧',
		refresh:'界限突破',
		shenhua:'神话再临',
		xinghuoliaoyuan:'星火燎原',
		yijiang:'一将成名',
		sp:'璀璨星河',
		//yingbian:'文德武备',
		//clan:'门阀士族',
		huicui:'群英荟萃',
		//xianding:'限定专属',
		sp2:'系列专属',
		mobile:'移动版',
		shiji:'始计篇',
		sb:'谋攻篇',
		//collab:'联动卡',
		//tw:'外服武将',
		//offline:'线下武将',
		//jsrg:'江山如故',
		//ddd:'精选武将',
	};
    if(config.packs) lib.arenaReady.push(function(){
        window.SSJJ_allCharacters=lib.config.all.characters;
        var list=[];
        /*for(var a in characterPacks) {
            if(lib.config.all.characters.contains(a)) list.add(a);
        }*/
        for(var a of lib.config.all.characters) {
            if(characterPacks[a]) list.add(a);
        }
        /*if(lib.config.all.characters.contains("standard")) list.add("standard");//标准包
        if(lib.config.all.characters.contains("refresh")) list.add("refresh");//界限突破
        if(lib.config.all.characters.contains("sp")) list.add("sp");//sp包
        if(lib.config.all.characters.contains("sp2")) list.add("sp2");//系列专属
        if(lib.config.all.characters.contains("extra")) list.add("extra");//移动版
        if(lib.config.all.characters.contains("mobile")) list.add("mobile");//神将
        if(lib.config.all.characters.contains("shenhua")) list.add("shenhua");//神话再临
        if(lib.config.all.characters.contains("yijiang")) list.add("yijiang");//一将成名
        if(lib.config.all.characters.contains("shiji")) list.add("shiji");//始计篇
        //if(lib.config.all.characters.contains("yingbian")) list.add("yingbian");//文武兼备
        if(lib.config.all.characters.contains("xinghuoliaoyuan")) list.add("xinghuoliaoyuan");//星火燎原
        if(lib.config.all.characters.contains("sb")) list.add("sb");//谋攻*/
        lib.config.all.characters=list;
    });  
};	
/*if(config.changeGroup){ 
    for(var i in changePlayer) {
        if(lib.character[i]) lib.character[i][1]=changePlayer[i];
    };
};*/
        if(config.jinjiang2) {
            let exclude = {
				extra: [
					"tw_shen_guanyu","shen_machao","shen_sunquan","shen_jiangwei","key_kagari","key_shiki","db_key_hina","shen_diaochan","ol_zhangliao","shen_caopi","shen_zhenji","boss_zhaoyun"
				],
				refresh: [
					"ol_xiaoqiao","ol_caiwenji","ol_sp_zhugeliang","ol_yuanshao","ol_liushan","ol_jiangwei","ol_caiwenji",
					"ol_xiahouyuan","ol_pangtong","ol_weiyan","ol_sunjian","ol_pangde","ol_dongzhuo","ol_dengai","ol_zhurong",
					"ol_lusu","ol_xuhuang","ol_xunyu","re_sunce", "xin_yuji", "xin_gaoshun","xin_xusheng","xin_lingtong","xin_liubiao",
					"xin_handang","xin_zhonghui","xin_yufan","xin_wuguotai","re_guohuai","re_xiahoudun","re_zhangfei","re_jiaxu",
					"yujin_yujin","re_zhangchunhua","re_fazheng","re_masu","dc_xushu","re_caozhang","re_liaohua","re_madai","dc_bulianshi",
					"re_chengpu","re_guanping","re_jianyong","re_panzhangmazhong","re_zhuran","re_fuhuanghou","re_caozhen","re_hanhaoshihuan",
					"re_wuyi","re_zhoucang","re_guyong","re_sunluban","re_caifuren","re_jushou","re_caoxiu","re_liuchen","re_xiahoushi","re_zhangyi",
					"re_quancong","re_sunxiu","re_gongsunyuan","re_guotufengji","re_guohuanghou","dc_gongsunzan","re_duji"
				],
				sp: [
					'old_maliang', 'ol_bianfuren', 'qinghegongzhu', 'ganfuren', 'ruiji', 'tengfanglan', 'caoxiancaohua', 'ol_wangrong', 'zuofen',
					'ol_dongzhao', 'duxi', 'jianggan', 'zhaoyǎn', 'ol_dengzhi', 'ol_yangyi', 'ol_chendeng', 'sunshao', 'jin_yanghu', 'gaogan', 'huangzu',
					'ol_zhangchangpu', 'ol_xinxianying', 'ol_puyuan', 'xujing', 'huangchengyan', 'zhangling', 'cuiyan', 'huangfusong', 'sp_jiben', 'sp_fuhuanghou',
					'jin_zhouchu', 'yuantanyuanshang', 'fengfangnv', 'panshu', 'wolongfengchu', 'caohong', 'tianyu', 'ol_zhuling', 'fanjiangzhangda', 'wuyan', 'weizi',
					'sp_menghuo', 'sp_ol_zhanghe', 'sp_zhangliao', 'caoshuang', 'hanba'
				]
			}

			let add = [
				"fanchou","guosi","lijue","xurong","zhangji","zhanggong","lvkai","zhangqiying","sp_liuqi","beimihu"
			]

			// 允许使用的武将包
			let packs = ["mobile","extra","refresh","sb","yijiang","shenhua","standard","xinghuoliaoyuan","sp","jsrg","shiji"];
			if (lib.config["extension_手杀禁将_BT"]) {
				exclude.extra = [
					"tw_shen_guanyu","shen_machao","shen_sunquan","shen_jiangwei","key_kagari","key_shiki","db_key_hina","shen_diaochan","ol_zhangliao","shen_caopi","shen_zhenji","boss_zhaoyun",
					"shen_zhouyu","shen_zhugeliang","shen_lvbu","shen_guanyu","shen_lvmeng","shen_caocao","shen_zhangliao","shen_liubei"
				];
				add = [
					"caoying","caochun","xurong","liuyan","liuzan","re_xusheng","shen_ganning","shen_xunyu","xizhicai","shen_luxun","shen_taishici","shen_guojia","quyi","shen_zhugeliang","sb_machao","sb_caoren","sb_huanggai","sb_huangzhong","xuyou","db_wenyang","luotong","re_zhonghui","re_sunquan","re_xuchu","re_guanyu","re_liubei","maliang","caorui","zhangrang","sb_xiahoushi","xin_jushou",,"shen_zhaoyun","re_huangyueying","zhangzhongjing","sb_sunce","shen_sunce","wujing","sp_duyu","re_guojia","re_xunyu","sunluyu","xin_xiahoudun","yangbiao","sp_sufei","xin_zhangfei","ol_yujin","re_wuhuotai","miheng","peixiu","re_bulianshi","sp_caosong","xin_wuyi","xin_zhuzhi","zhouchu","re_liru","sb_liubei","shamoke","sp_huangfusong","jy_xuhuang","sb_sunce","shichangshi","nanhualaoxian","majun","sunhanhua","zhouqun","re_caocao","lusu","caopi","xuanshao","sunru","pangdegong","wanglang","dengxuan","sb_daqiao","sb_zhurong","sb_chengong","luxun","sb_diaochan"
				];
				packs = ["extra"];
			}
			// let packs = ["mobile","extra","refresh","sb","xinghuoliaoyuan","sp"];
			let keys = Object.keys(lib.character);
			let c = [];
			for (let i = 0; i < packs.length; i++) {
				let pack = Object.keys(lib.characterPack[packs[i]]);
				let clude = exclude[packs[i]];
				if (clude) {
					for (let j = 0; j < pack.length; j++) {
						if (clude.indexOf(pack[j]) != -1) {
							pack.splice(j,1);
							j--;
						};
					}
				}
				c = c.concat(pack);
			}
			c = c.concat(add);

			for (let j = 0; j < keys.length; j++) {
				if (c.indexOf(keys[j]) == -1 && keys[j].indexOf("boss_") == -1) {
					lib.config.forbidai.push(keys[j]);
				}
			}
		}
		if(config.huanyuan){
var changePlayer={
                   //标准:
           "liubei":"刘备",
           "ganning":"甘宁",
           "machao":"马超",
           "zhangfei":"张飞",
           "zhaoyun":"赵云",
           "caocao":"曹操",
           "sunquan":"孙权",
           "xuzhu":"许褚",
           "luxun":"陆逊",
           "daqiao":"大乔",
           "xiahoudun":"夏侯惇",
           "zhangliao":"张辽",
           "zhugeliang":"诸葛亮",
           "lvmeng":"吕蒙",
           "zhouyu":"周瑜",
           "huaxiong":"华雄",
           "re_yuanshu":"袁术",
           "sunshangxiang":"孙尚香",
           "huatuo":"华佗",
           "diaochan":"貂蝉",
           "simayi":"司马懿",
           "huangyueying":"黄月英",
           "zhenji":"甄姬",
           "guojia":"郭嘉",
           "lvbu":"吕布",
           //风:
           "huangzhong":"黄忠",
           "xiaoqiao":"小乔",
           "zhangjiao":"张角",
           "weiyan":"魏延",
           //移动版曹仁本体没有//
           "xiahouyuan":"夏侯渊",
           //移动版周泰本体也没有//
           //火:
           "dianwei":"典韦",
           "pangtong":"庞统",
           "taishici":"太史慈",
           "pangde":"庞德",
           "yanwen":"颜良文丑",
           "re_yuanshao":"袁绍",
           //林:
           "xuhuang":"徐晃",        
           "sunjian":"孙坚",
           "dongzhuo":"董卓",
           "zhurong":"祝融",
           "menghuo":"孟获",
           "jiaxu":"贾诩",        
           //山:
           "zhanghe":"张郃",
           "dengai":"邓艾",
           "jiangwei":"姜维",
           "sunce":"孙策",
           "zuoci":"左慈",
           "caiwenji":"蔡文姬",
      //始计篇
            //智:
            "sp_sunshao":"孙邵",
            //信:
            "sp_xinpi":"辛毗",
            "sp_yanghu":"羊祜",
            "sp_mifuren":"糜夫人",
            "sp_machao":"sp马超",
            "ol_wangling":"王凌",
            //勇:
            "sunyi":"孙翊",
            "sp_zongyu":"宗预",
            "sp_chendong":"陈武董袭",
            "yuanhuan":"袁涣",
            "sp_wangshuang":"王双",
            //严:
            "sp_jiangwan":"蒋琬",
            "sp_jiangqing":"蒋钦",             
            "sp_lvfan":"吕范",     
            "liuba":"刘巴",
     //一将成名:
              //2011:
              "caozhi":"曹植",
              "gaoshun":"高顺",
              "chengong":"陈宫",
              "fazheng":"法正",
              "lingtong":"凌统",
              "xin_masu":"马谡",
              "wuguotai":"吴国太",
              "xusheng":"徐盛",
              "xin_xushu":"徐庶",
              "xin_yujin":"于禁",           
              //2012:
              "caozhang":"曹彰",
              "old_wangyi":"王异",
              "xunyou":"荀攸",
              "old_guanzhang":"关兴张苞",
              "liaohua":"廖化",
              "madai":"马岱",
              "bulianshi":"步练师",
              "chengpu":"程普",
              "handang":"韩当",
              "liubiao":"刘表",
              "zhonghui":"钟会",
              //移动版公孙瓒没有//
              //2013:          
              "guohuai":"郭淮",
              "manchong":"满宠",
              "guanping":"关平",
              "jianyong":"简雍",
              "liufeng":"刘封",
              "panzhangmazhong":"潘璋马忠",
              "yufan":"虞翻",
              "zhuran":"朱然",
              "fuhuanghou":"伏皇后",
              "xin_liru":"李儒",
              //2014:
              "old_caozhen":"曹真",
              "hanhaoshihuan":"韩浩史涣",
              "old_chenqun":"陈群",
              "wuyi":"吴懿",
              "chendao":"陈到",
              "zhoucang":"周仓",
              "zhangsong":"张松",
              "sunluban":"孙鲁班",
              "zhuhuan":"朱桓",
              "guyong":"顾雍",
              "yj_jushou":"沮授",
              "caifuren":"蔡夫人",
              //2015:
              "caoxiu":"曹休",
              "zhongyao":"钟繇",
              "liuchen":"刘谌",
              "xiahoushi":"夏侯氏",
              "zhangyi":"张嶷",
              "sunxiu":"孙休",
              "old_zhuzhi":"朱治",
              "quancong":"全琮",
              "gongsunyuan":"公孙渊",
              "guotufengji":"郭图逢纪",
       //乱世英杰:
              //2016:
              "guohuanghou":"郭皇后",
              "liyan":"李严",
              "sundeng":"孙登",
              "ol_liuyu":"刘虞",
              "cenhun":"岑昏",
              "sunziliufang":"孙资刘放",
              "huanghao":"黄皓",
              //2017:
              "wuxian":"吴苋",                
              "xuezong":"薛综",                 
              "caiyong":"蔡邕",
              "xinxianying":"辛宪英",
            //sp
              //魏:         
              "sp_jiangwei":"sp姜维",
              "wenpin":"文聘",
              "yuejin":"乐进",
              "simalang":"司马朗",
              "caohong":"曹洪",
              "sp_caiwenji":"sp蔡文姬",
              "sp_caoren":"sp曹仁",
              "sp_pangde":"sp庞德",
              "litong":"李通",
              "re_lidian":"李典",
              "duji":"杜畿",
              "chenlin":"陈琳",    
              //蜀:
              "xiahouba":"夏侯霸",
              "guanyinping":"关银屏",
              "sunqian":"孙乾",
              "mazhong":"马忠",
              "dongyun":"董允",
              "lvkai":"吕凯",           
              "dengzhi":"邓芝",      
              //吴:
              "dingfeng":"丁奉",
              "zumao":"祖茂",
              "zhangzhang":"张昭张纮",
              "re_jsp_pangtong":"sp庞统",
              "panjun":"潘濬",
              "buzhi":"步骘",
              "lvdai":"吕岱",
              "sunhao":"孙皓",
              //群:
              "panfeng":"潘凤",
              "fuwan":"伏完",
              "hetaihou":"何太后",
              "zhangbao":"张宝",
              //移动版sp马超没有//
              "tadun":"蹋顿",
              "dongcheng":"董承",
              "liuyao":"刘繇",
              "dingyuan":"丁原",
              "hucheer":"胡车儿",         
       //稀有专属:
               //手机:
               /*"th_sunhanhua":"孙寒华",
               "th_pangdegong":"庞德公",
               "th_nanhualaoxian":"南华老仙",
               "th_zhengxuan":"郑玄",
               "th_majun":"马钧",
               "th_mamidi":"马日磾",
               "th_shen_zhouyu":"神周瑜",*/
               //小游戏武将
               "wangjun":"王濬",         
               "xin_hansui":"韩遂",
               "jiling":"纪灵",
               "dc_noname":"无名",
               
    
}
    for(var i in lib.character){
        if(changePlayer[i]) lib.character[i][4].add("forbidai");
        
    };
    lib.arenaReady.push(function(){
        var list=[];
       
        if(lib.config.all.characters.contains("standard")) list.add("standard");//标准包
        if(lib.config.all.characters.contains("refresh")) list.add("refresh");//界限突破
        if(lib.config.all.characters.contains("jiangshan")) list.add("jiangshan");//江山如故
        if(lib.config.all.characters.contains("refresh")) list.add("shiji");//始计篇  
        if(lib.config.all.characters.contains("sp")) list.add("sp");//sp包
        if(lib.config.all.characters.contains("sp")) list.add("tw");//外服武将
        if(lib.config.all.characters.contains("sp2")) list.add("sp2");//系列专属
        if(lib.config.all.characters.contains("extra")) list.add("extra");//移动版
        if(lib.config.all.characters.contains("mobile")) list.add("mobile");//神将
        if(lib.config.all.characters.contains("shenhua")) list.add("shenhua");//神话再临
        if(lib.config.all.characters.contains("yijiang")) list.add("yijiang");//一将成名
        if(lib.config.all.characters.contains("yingbian")) list.add("yingbian");//文武兼备
        if(lib.config.all.characters.contains("xinghuoliaoyuan")) list.add("xinghuoliaoyuan");//星火燎原
        if(lib.config.all.characters.contains("sb")) list.add("sb");//谋攻
        var sortList=[];
        for(var a of lib.config.all.characters) {
            if(list.contains(a)) sortList.add(a);
        }
        lib.config.all.characters=sortList;
  
    });  
    if(config.changeGroup){ 
    for(var i in changePlayer) {
        if(lib.character[i]) lib.character[i][1]=changePlayer[i];
    };
};	
};
if(config.yinjian){
var changePlayer={
    //风林火山:
            //标准:
           "liubei":"刘备",
         
           "huanggai":"黄盖",
           "ganning":"甘宁",
           "machao":"马超",
           "zhangfei":"张飞",
           "zhaoyun":"赵云",
           "caocao":"曹操",
           "sunquan":"孙权",
           "xuzhu":"许褚",
           "luxun":"陆逊",
           "daqiao":"大乔",
           "xiahoudun":"夏侯惇",
           "zhangliao":"张辽",
           "zhugeliang":"诸葛亮",
           "lvmeng":"吕蒙",
           "zhouyu":"周瑜",
           "huaxiong":"华雄",
           "re_yuanshu":"袁术",
           "sunshangxiang":"孙尚香",
           "huatuo":"华佗",
           "diaochan":"貂蝉",
           "simayi":"司马懿",
           "huangyueying":"黄月英",
           "zhenji":"甄姬",
           "guojia":"郭嘉",
           "lvbu":"吕布",
           //风:
           "huangzhong":"黄忠",
           "xiaoqiao":"小乔",
           "zhangjiao":"张角",
           "weiyan":"魏延",
           //移动版曹仁本体没有//
           "xiahouyuan":"夏侯渊",
           //移动版周泰本体也没有//
           "yuji":"于吉",
           //火:
           "xunyu":"荀彧",
           "dianwei":"典韦",
           "pangtong":"庞统",
           "sp_zhugeliang":"卧龙诸葛",
           "taishici":"太史慈",
           "pangde":"庞德",
           "yanwen":"颜良文丑",
           "re_yuanshao":"袁绍",
           //林:
           "xuhuang":"徐晃",
           "caopi":"曹丕",
           "sunjian":"孙坚",
           "dongzhuo":"董卓",
           "zhurong":"祝融",
           "menghuo":"孟获",
           "jiaxu":"贾诩",
           "re_lusu":"鲁肃",
           //山:
           "zhanghe":"张郃",
           "dengai":"邓艾",
           "jiangwei":"姜维",
           "liushan":"刘禅",
           "sunce":"孙策",
           "zhangzhang":"张昭张纮",
           "zuoci":"左慈",
           "caiwenji":"蔡文姬",
           //阴:
           "yanyan":"严颜",
           "wangping":"王平",
           "luji":"陆绩",
           "xin_sunliang":"孙亮",
           "kuailiangkuaiyue":"蒯良蒯越",
           "xuyou":"许攸",
           "yl_luzhi":"卢植",
           "wangji":"王基",
           //雷:
           "chendao":"陈到",
           "haozhao":"郝昭",
           "yl_yuanshu":"仲帝袁术",
           "lukang":"陆抗",
           "re_guanqiujian":"毌丘俭",
           "zhoufei":"周妃",
           "zhugezhan":"诸葛瞻",
           "zhangxiu":"张绣",
      //谋攻篇
           //知:
        
      
    
           "sb_pangtong":"谋庞统",
           //识:
          
         
          
         
           //同:
         
          
         
           "sb_zhaoyun":"谋赵云",
         
           "sb_yuanshao":"谋袁绍",
       
           //虞:
           
          
         
         
          

       
          
     
         
          
    
       
        
        
      //始计篇
            //智:
            "sp_wangcan":"王粲",
            "sp_chenzhen":"陈震",
            "sp_xunchen":"荀谌",
            "feiyi":"费祎",   
            "sp_sunshao":"孙邵",
            "sp_bianfuren":"卞夫人",
            //信:
            "sp_xinpi":"辛毗",         
            "wujing":"吴景",
            "wangfuzhaolei":"王甫赵累",
            "sp_yanghu":"羊祜",
            "sp_mifuren":"糜夫人",
            "sp_machao":"sp马超",
            "ol_wangling":"王凌",
            "sp_kongrong":"孔融",
            //仁:
            "sp_xujing":"许靖",
            "xiangchong":"向宠",         
            "sp_huaxin":"华歆",
            "sp_zhangwen":"张温",
            "caizhenji":"蔡贞姬",   
            //勇:
            "sunyi":"孙翊",
            "sp_gaolan":"高览",
            "sp_zongyu":"宗预",   
            "sp_chendong":"陈武董袭",
            "yuanhuan":"袁涣",
            "sp_wangshuang":"王双",
            //严:
            "sp_jiangwan":"蒋琬",
            "sp_jiangqing":"蒋钦",
            "sp_cuiyan":"崔琰",     
            "sp_lvfan":"吕范",
            "sp_huangfusong":"皇甫嵩",
            "sp_zhujun":"朱儁",
            "liuba":"刘巴",
      //界限突破
             //标准:
             "re_liubei":"界刘备",
             "re_guanyu":"界关羽",
             "xin_zhangfei":"界张飞",
             "old_zhaoyun":"界赵云",
             "re_machao":"界马超",
             "re_ganning":"界甘宁",
             "re_lvmeng":"界吕蒙",
             "re_huanggai":"界黄盖",
             "re_zhouyu":"界周瑜",
             "re_daqiao":"界大乔",
             "re_luxun":"界陆逊",
             "re_caocao":"界曹操",
             "re_simayi":"界司马懿",
             "xin_xiahoudun":"界夏侯惇",
             "re_zhangliao":"界张辽",
             "re_xuzhu":"界许褚",
             "re_guojia":"界郭嘉",
             "re_huatuo":"界华佗",
             "re_lvbu":"界吕布",
             "ol_huaxiong":"界华雄",
             "old_yuanshu":"界袁术",
             "re_zhugeliang":"界诸葛亮",       
             "re_diaochan":"界貂蝉",
             "re_huangyueying":"界黄月英",
             "re_zhenji":"界甄姬",
             "re_sunshangxiang":"界孙尚香",
             "xf_yiji":"界伊籍",
             //风:
             "re_huangzhong":"界黄忠",
             "re_weiyan":"界魏延",
             "re_xiahouyuan":"界夏侯渊",
             "caoren":"界曹仁",
             "re_xiaoqiao":"界小乔",
             "old_zhoutai":"界周泰",
             "sp_zhangjiao":"界张角",
             "re_yuji":"界于吉",
             //火:
             "re_sp_zhugeliang":"界卧龙诸葛",
             "re_dianwei":"界典韦",
             "re_xunyu":"界荀彧",
             "re_pangde":"界庞德",
             "re_pangtong":"界庞统",
             "re_yanwen":"界颜良文丑",
             "xin_yuanshao":"界袁绍",
             //林:
             "re_xuhuang":"界徐晃",
             "re_menghuo":"界孟获",
             "re_zhurong":"界祝融",
             "re_caopi":"界曹丕",
             "re_sunjian":"界孙坚",
             "re_dongzhuo":"界董卓",
             //山:
             "re_dengai":"界邓艾",
             "re_zuoci":"界左慈",
             "re_jiangwei":"界姜维",
             "re_sunben":"界孙策",     
             "re_zhangzhang":"界张昭张纮",
     //一将成名:
              //2011:
              "caozhi":"曹植",
              "gaoshun":"高顺",
              "chengong":"陈宫",
              "fazheng":"法正",
              "lingtong":"凌统",
              "xin_masu":"马谡",
              "wuguotai":"吴国太",
              "xusheng":"徐盛",
              "xin_xushu":"徐庶",
              "xin_yujin":"于禁",
              "zhangchunhua":"张春华",
              //2012:
              "caozhang":"曹彰",
              "old_wangyi":"王异",
              "xunyou":"荀攸",
              "old_guanzhang":"关兴张苞",
              "liaohua":"廖化",
              "madai":"马岱",
              "bulianshi":"步练师",
              "chengpu":"程普",
              "handang":"韩当",
              "liubiao":"刘表",
              "zhonghui":"钟会",
              //移动版公孙瓒没有//
              //2013:
              "caochong":"曹冲",
              "guohuai":"郭淮",
              "manchong":"满宠",
              "guanping":"关平",
              "jianyong":"简雍",
              "liufeng":"刘封",
              "panzhangmazhong":"潘璋马忠",
              "yufan":"虞翻",
              "zhuran":"朱然",
              "fuhuanghou":"伏皇后",
              "xin_liru":"李儒",
              //2014:
              "old_caozhen":"曹真",
              "hanhaoshihuan":"韩浩史涣",
              "old_chenqun":"陈群",
              "wuyi":"吴懿",
              "zhoucang":"周仓",
              "zhangsong":"张松",
              "sunluban":"孙鲁班",
              "zhuhuan":"朱桓",
              "guyong":"顾雍",
              "yj_jushou":"沮授",
              "caifuren":"蔡夫人",
              //2015:  
              "caoxiu":"曹休",
              "zhongyao":"钟繇",
              "liuchen":"刘谌",
              "xiahoushi":"夏侯氏",
              "zhangyi":"张嶷",
              "sunxiu":"孙休",
              "old_zhuzhi":"朱治",
              "quancong":"全琮",
              "gongsunyuan":"公孙渊",
              "guotufengji":"郭图逢纪",
     //界一将成名:
              //2011:      
              "re_gaoshun":"界高顺",   
              "xin_fazheng":"界法正",
              "re_caozhi":"界曹植",
              "re_lingtong":"界凌统",
              //2012:
              "re_wangyi":"界王异",
              "guanzhang":"界关兴张苞",
              "old_madai":"界马岱",
              "xin_gongsunzan":"界公孙瓒",     
              "re_liubiao":"界刘表",
              "re_handang":"界韩当",
              "xin_chengpu":"界程普",
              "re_bulianshi":"界步练师",
              "xin_liaohua":"界廖化",
              "xin_caozhang":"界曹彰",
              //2013:
              "xin_zhuran":"界朱然",
              "xin_jianyong":"界简雍",
              "re_yufan":"界虞翻",        
              "xin_fuhuanghou":"界伏皇后",
              "re_liru":"界李儒",
              "xin_guohuai":"界郭淮",
              "xin_panzhangmazhong":"界潘璋马忠",
              //2014:
              "re_chenqun":"界陈群",
              "xin_zhoucang":"界周仓",
              "xin_caozhen":"界曹真",
              "xin_guyong":"界顾雍",
              "xin_sunluban":"界孙鲁班",
              "xin_caifuren":"界蔡夫人",
              //2015:
              "xin_sunxiu":"界孙休",
              "xin_quancong":"界全琮",         
              "xin_wuyi":"界吴懿",
              "xin_zhuzhi":"界朱治",
              "xin_zhuhuan":"界朱桓",
              "xin_caoxiu":"界曹休",
       //乱世英杰:
              //2016:
              "guohuanghou":"郭皇后",
              "liyan":"李严",
              "sundeng":"孙登",
              "ol_liuyu":"刘虞",
              "cenhun":"岑昏",
              "sunziliufang":"孙资刘放",
              "huanghao":"黄皓",
              "zhangrang":"张让",
              //2017:
              "wuxian":"吴苋",
              "xushi":"徐氏",         
              "xuezong":"薛综",
              "caojie":"曹节",
              "re_jikang":"嵇康",
              "caiyong":"蔡邕",
              "xinxianying":"辛宪英",
            //sp
              //魏:
              "zhugedan":"诸葛诞",          
              "jsp_guanyu":"sp关羽",
              "sp_jiangwei":"sp姜维",
              "wenpin":"文聘",
              "sp_jiaxu":"sp贾诩",
              "yuejin":"乐进",
              "simalang":"司马朗",
              "caohong":"曹洪",
              "sp_caiwenji":"sp蔡文姬",
              "sp_caoren":"sp曹仁",
              "sp_pangde":"sp庞德",
              "litong":"李通",
              "re_lidian":"李典",
              "chengyu":"程昱",
              "lvqian":"吕虔",       
              "duji":"杜畿",
              "chenlin":"陈琳",
              "luzhi":"鲁芝",       
              "re_zhanggong":"张恭",           
              "ol_wanglang":"王朗",          
              "ruanhui":"阮慧",
              "sp_caosong":"曹嵩",
              //蜀:
              "ol_maliang":"马良",
              "xiahouba":"夏侯霸",
              "sp_sunshangxiang":"sp孙尚香",
              "guanyinping":"关银屏",
              "mizhu":"糜竺",
              "re_xushu":"sp徐庶",        
              "sunqian":"孙乾",
              "mazhong":"马忠",    
              "dongyun":"董允",         
              "lvkai":"吕凯",         
              "re_baosanniang":"鲍三娘",
              "furong":"傅肜",
              "dengzhi":"邓芝",
              "zhangyis":"张翼",
              "zhouqun":"周群",
              "qiaozhou":"谯周",       
              //吴:
              "dingfeng":"丁奉",
              "zhugejin":"诸葛瑾",
              "sunluyu":"孙鲁育",
              "zumao":"祖茂",         
              "daxiaoqiao":"大小乔",
              "re_heqi":"贺奇",
              "re_jsp_pangtong":"sp庞统",
              "panjun":"潘濬",
              "buzhi":"步骘",
              "re_weiwenzhugezhi":"卫温诸葛直",
              "lvdai":"吕岱",
              "sunhao":"孙皓",
              "kanze":"阚泽",
              "re_xugong":"许贡",
              "yanjun":"严畯",
              //群:
              "yangfu":"杨阜",
              "panfeng":"潘凤",
              "fuwan":"伏完",
              "hetaihou":"何太后",
              "zhangbao":"张宝",
              //移动版sp马超没有//
              "sp_diaochan":"sp貂蝉",       
              "liuxie":"刘协",
              "jsp_huangyueying":"sp_黄月英",
              "yanbaihu":"严白虎",
              "tadun":"蹋顿",
              "zhanglu":"张鲁",
              "sp_liuqi":"刘琦",
              "dongbai":"董白",
              "dongcheng":"董承",
              "fanchou":"樊稠",       
              "sp_taishici":"sp太史慈",
              "taoqian":"陶谦",
              "liuyao":"刘繇",
              "lijue":"李傕",
              "shixie":"士燮",
              "simahui":"司马徽",        
              "beimihu":"卑弥呼",
              "zhangji":"张济",
              "re_zhangliang":"张梁",       
              "re_wangyun":"王允",
              "sp_sufei":"苏飞",         
              "guosi":"郭汜",
              "dingyuan":"丁原",
              "chendeng":"陈登",            
              "hucheer":"胡车儿",
              "gongsunkang":"公孙康",          
              "yanpu":"阎圃",
              "mayuanyi":"马元义",
              "xin_mamidi":"马日磾",
       
       
          
          
          //神将: 

          
           
            
           
            
             
       //稀有专属:
               //手机:       
               "liuye":"刘晔",
               "qianzhao":"牵招",
               "sunru":"孙茹",
               "old_lingju":"灵雎",
               "lingcao":"凌操",          
               "lifeng":"李丰",
               "zhuling":"朱灵",
               "zhugeguo":"诸葛果",          
              "zhaotongzhaoguang":"赵统赵广", 
               "simazhao":"司马昭",
               "hujinding":"胡金定",
               "yj_zhaoliao":"星张辽",           
               "yj_zhanghe":"星张郃",           
               "simashi":"司马师",
               "sp_pengyang":"彭羕",
               "friend_zhugeliang": "友诸葛亮",
               "pot_taishici": "势太史慈",
               "pot_yuji": "势于吉",
               "pot_weiyan": "势魏延",
               "mb_qinghegongzhu": "清河公主",
       
            
             
               /*"th_sunhanhua":"孙寒华",
               "th_pangdegong":"庞德公",
               "th_nanhualaoxian":"南华老仙",
               "th_zhengxuan":"郑玄",
               "th_majun":"马钧",
               "th_mamidi":"马日磾",
               "th_shen_zhouyu":"神周瑜",*/
               //小游戏武将
             
           
             
              
            
            
              
          
               "wangjun":"王濬",          
               "xin_hansui":"韩遂",
               "jiling":"纪灵",
               "xin_zhangyi":"界张嶷",
    
}
    for(var i in lib.character){
        if(changePlayer[i]) lib.character[i][4].add("forbidai");
        
    };
    lib.arenaReady.push(function(){
        var list=[];
       
        if(lib.config.all.characters.contains("standard")) list.add("standard");//标准包
        if(lib.config.all.characters.contains("refresh")) list.add("refresh");//界限突破
        if(lib.config.all.characters.contains("jiangshan")) list.add("jiangshan");//江山如故
        if(lib.config.all.characters.contains("refresh")) list.add("shiji");//始计篇  
        if(lib.config.all.characters.contains("sp")) list.add("sp");//sp包
        if(lib.config.all.characters.contains("sp")) list.add("tw");//外服武将
        if(lib.config.all.characters.contains("sp2")) list.add("sp2");//系列专属
        if(lib.config.all.characters.contains("extra")) list.add("extra");//移动版
        if(lib.config.all.characters.contains("mobile")) list.add("mobile");//神将
        if(lib.config.all.characters.contains("shenhua")) list.add("shenhua");//神话再临
        if(lib.config.all.characters.contains("yijiang")) list.add("yijiang");//一将成名
        if(lib.config.all.characters.contains("yingbian")) list.add("yingbian");//文武兼备
        if(lib.config.all.characters.contains("xinghuoliaoyuan")) list.add("xinghuoliaoyuan");//星火燎原
        if(lib.config.all.characters.contains("sb")) list.add("sb");//谋攻
        var sortList=[];
        for(var a of lib.config.all.characters) {
            if(list.contains(a)) sortList.add(a);
        }
        lib.config.all.characters=sortList;
  
    });  
    if(config.changeGroup){ 
    for(var i in changePlayer) {
        if(lib.character[i]) lib.character[i][1]=changePlayer[i];
    };
};	
};
if(config.txhj&&get.mode()!='taixuhuanjing') {
    for(var i in lib.character){
        if(i.indexOf('txhj_')!=-1) lib.character[i][4].add('unseen');
    };
}
if(config.sexforbid&&['male','female'].contains(config.sexforbid)) {
    for(var i in lib.character){
        if(lib.character[i][0]!=config.sexforbid) lib.character[i][4].add('forbidai');
    };
}
if(config.nailong){
    game.helaAudio('../extension/手杀全扩/audio/wsnl.mp3');
            
            game.stopAudio();
            if(get.mode()!='taixuhuanjing') {
                game.playAudio('../extension/手杀全扩/audio/wsnl.mp3');
                game.loopAudio('../extension/手杀全扩/audio/wsnl.mp3', 142);
            }else {
                game.playAudio('../extension/手杀全扩/audio/wsnl.mp3');
            }
            event.list = game.players.slice().sortBySeat(event.player);
    };
if(config.shoushanameX!='none') {
//if(config.renames=='shousha'){
    lib.translate['re_sunben']='界孙策';
    /*var relist={
        '手杀':'界',
        '旧':'',
        'OL':'',
        '新杀':'',
        白给
    };*/
    var relist=['手杀','旧','OL','新杀','TW','DC'];
    if(config.shoushanameX=='shousha') {
        relist=['手杀','新杀'];
    }
    var tralist=[];
    for(var i in lib.character) {
        //if(lib.character[i][4]&&lib.character[i][4].contains('forbidai')) continue;
        //if(lib.character[i][4]&&lib.character[i][4].contains('umseen')) continue;
        //手杀包判定
        if(!changePlayer[i]) continue;
        if(lib.translate[i]) {
            tralist.add(lib.translate[i]);
        }
    }
    for(var i in lib.character) {
        var name=lib.translate[i];
        for(var j=0;j<relist.length;j++) {
            var a=relist[j];
            if(name.indexOf(a)!=0) continue;
            var prename='';
            var realname=name.slice(a.length);
            if(name.indexOf('手杀')=='0'&&tralist.contains(realname)) prename='界';
            lib.translate[i]=prename+realname;
        }
    };
}
/*if(config.renames=='pack'){
    var prename={
        standard:'',
        refresh:'界',
        shenhua:'',
        old:'旧',
        sb:'谋',
    };
    for(var p in lib.characterPack) {
        var pack=lib.characterPack[i];
        //var name=lib.translate[i];
        if(!prename[p]) continue;
        for(var i in pack) {
            lib.translate[i]=prename[p]+get.characterName(i);
        }
    };
}*/
    if(lib.config['extension_手杀全扩_infofix']&&lib.translate) {
         var lasts=['。','；','）',')','}','>'];
         //var str='';
         for(var a in lib.skill) {
             var info=lib.translate[a+'_info'];
             if(!info) continue;
             if(a.indexOf('_map')!=-1) continue;
             //if(info.indexOf('_info')==-1) continue;
             var last=info.trim().slice(-1);
             if(last&&lasts.indexOf(last)==-1) {
                 //str+=lib.translate[a]+'：'+lib.translate[a+'_info']+'\n';
                 lib.translate[a+'_info']=info+'。';
             }
         }
         //alert(str);
    }
},precontent:function(){
    if(lib.config['extension_手杀全扩_infofix']&&lib.translate) {
         var lasts=['。','；','）',')','}','>'];
         for(var a in lib.skill) {
             var info=lib.translate[a+'_info'];
             if(!info) continue;
             if(a.indexOf('_map')!=-1) continue;
             //if(info.indexOf('_info')==-1) continue;
             var last=info.trim().slice(-1);
             if(last&&lasts.indexOf(last)==-1) {
                 lib.translate[a+'_info']=info+'。';
             }
         }
    }
},config:{
    "jinjiang":{
        "name":"<b><font color=\"#FF6020\">手杀全扩",
        "intro": "全手杀武将，完美还原手杀",
        "init":true
    },
    "jinjiang2":{
        "name":"手杀禁将",
        "intro": "来自EngJ.K的“手杀禁将”。这是一个动态禁将框架(默认配置是禁用除手杀武将以外的武将，可以自行修改禁用范围)，系统不会给你和人机推送本扩展禁用的武将，关闭选项即可恢复",
        "init":false
    },
    "huanyuan":{
        "name":"<b><font color=\"#0080FF\">过滤将池",
        "intro": "在手杀全扩的基础上进一步过滤将池，排除了大部分标将和大部分玩家基本不会选择的武将，提高对局质量",
        "init":false
    },
    "yinjian":{
        "name":"<b><font color=\"#96FED1\">全阴将池",
        "intro": "我一路向北 离开有你的季节 你说你好累 已无法再爱上谁 风在山路吹 过往的画面全都是我不对 细数惭愧 我伤你几回 停止狼狈 就让错纯粹",
        "init":false
    },
    "unseen":{
        "name":"屏蔽方式",
        "intro": "屏蔽除手杀外其他武将的方式",
        "init":'forbidai',
        'item':{
            'forbidai':'对局选将屏蔽',
            'unseen':'武将直接消失',
        },
    },
    "packs":{
        "name":"将包屏蔽",
        "intro": "屏蔽武将的同时把将包也屏蔽了",
        "init":true
    },
    "txhj":{
        "name":"太虚禁将",
        "intro": "禁掉太虚幻境模式的武将，防止自由选将刷到",
        "init":true
    },
    "sexforbid":{
        "name":"同性专场",
        "intro": "特殊需求使用，可以让全场保持同一性别的禁将",
        "init":'none',
        'item':{
            'none':'不限',
            'male':'男性',
            'female':'女性',
        },
    },
    /*"renames":{
        "name":"规范命名",
        "intro": "<li>手杀：将“手杀XXX”改成“界XXX”、去掉“OL”、“旧”、“新杀”等前缀<li>将包：按武将包批量进行重命名",
        "init":'pack',
        'item':{
            'none':'关闭',
            'shousha':'手杀',
            'pack':'将包',
        },
    },*/
    "shoushanameX":{
        "name":"手杀改名",
        "intro": "将“手杀XXX”改成“界XXX”、去掉“OL”、“旧”、“新杀”等前缀",
        "init":'shousha',
        onclick:function(item){
            game.saveConfig('extension_手杀全扩_shoushanameX',item);
            game.clsPrefixName();
        },
        'item':{
            'none':'关闭',
            'shousha':'仅手杀',
            'all':'全部前缀',
        },
    },

    "nailong":{
        "name":"<b><font color=\"#FFDC35\">我是奶龙",
        "intro": "喜欢奶龙的小朋友你们好呀,开启后可以得到奶龙的激励",
        "init":false,
    },
    "infofix":{
        "name":"符号补充",
        "intro": "补充部分结尾处缺少标点符号的技能描述，给它一个完整的句子",
        "init":true
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
    intro:"",
    author:"自书叁无中 & EngJ.K<br>修改：<img style=width:50px;border-radius:100%; src="+lib.assetURL+"extension/手杀全扩/bg.jpg></img>白给",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}})