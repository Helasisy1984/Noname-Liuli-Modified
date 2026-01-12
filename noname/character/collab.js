'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'collab',
		connect:true,
		character:{
			dc_noname: ["male", "qun", 3, ["dcchushan"], []],
			dc_caocao:['male','wei',4,['dcjianxiong']],
			dc_liubei:['male','shu',4,['dcrende']],
			dc_sunquan:['male','wu',4,['dczhiheng']],
			zhutiexiong:['male','qun',3,['dcbianzhuang']],
			wu_zhutiexiong:['male','qun',3,['dcbianzhuang'],['unseen']],
			xiaoyuehankehan:['male','qun',3,['dctongliao','dcwudao']],
			libai:['male','qun',3,['dclbjiuxian','dcshixian']],
			mowukong:['male','qun',3,['dccanying','dcjuemie','dcpoqiong']],
			sunwukong:['male','qun',3,['dcjinjing','dccibei','dcruyi']],
			longwang:['male','qun',3,['dclonggong','dcsitian']],
			taoshen:['male','qun',3,['dcnutao']],
			nezha:['male','qun',2,['dcsantou','dcfaqi']],
			sunyang:['male','wu',4,['clbshuijian']],
			yeshiwen:['female','wu',3,['clbjisu','clbshuiyong']],
			sp_jiben:['male','qun',3,['spduanzhi','spduyi']],
			sp_fuhuanghou:['female','qun',3,['spcangni','spmixin']],
			sp_fuwan:['male','qun',3,['spfengyin','spchizhong']],
			old_lingju:['female','qun',3,['jieyuan','fenxin_old']],
			sp_mushun:['male','qun',4,['dcmoukui']],
            "DE_longdi":["male","jin",4,["DE_pomu","DE_dengdi"],['hiddenSkill']],
            "DE_init_longdi":["male","shu",4,["DE_jisha","DE_lingwei"],["unseen"]],
            "DE_hundun":["male","shen",4,["DE_hundun"],["unseen"]],
            "DE_qiongqi":["male","shen",4,["DE_qiongqi"],["unseen"]],
            "DE_taowu":["male","shen",4,["DE_taowu"],["unseen"]],
            "DE_taotie":["male","shen",4,["DE_taotie"],["unseen"]],
            "DE_malcolmrivers":["male","qun",4,["DE_benglie"]],
        },
		characterFilter:{
			old_lingju:function(mode){
				return mode=='identity';
			}
		},
		characterSort:{
			collab:{
				collab_olympic:['sunyang','yeshiwen'],
				collab_tongque:["sp_fuwan","sp_fuhuanghou","sp_jiben","old_lingju",'sp_mushun'],
				collab_duanwu:['sunwukong','longwang','taoshen','nezha'],
				collab_decade:['libai','xiaoyuehankehan','zhutiexiong','wu_zhutiexiong'],
				collab_remake:['dc_caocao','dc_liubei','dc_sunquan'],
				collab_dcdoudizhui: ["dc_noname"],
				collab_luandou: ["mowukong"],
				collab_movie:['DE_longdi','DE_init_longdi','DE_malcolmrivers'],
			},
		},
		skill:{
			"DE_benglie":{
                dutySkill:true,
                forced:true,
                locked:true,
                audio:1,
                trigger:{
                    global:"phaseBefore",
                    player:"enterGame",
                },
                filter:function (event, player) {
                    return (event.name != 'phase' || game.phaseNumber == 0);
                },
                clues: [
                    {
                        intro: "Tiger! Tiger! burning bright / In the forests of the night",
                        intro_cn: "老虎！老虎！黑夜的森林中…燃烧着的煌煌的火光。",
                        expect: ["rhodes", "maine"],
                        translation: "布莱克《老虎》：“燃烧的虎纹“隐喻显眼的犯罪痕迹，排除专业罪犯",
                    },
                    {
                        intro: "The wind's way in the deep sky's hollow / None hath seen, but the sea's shadows follow",
                        intro_cn: "风在深邃天空中的轨迹无人看见…只有海的影子紧随其后。",
                        expect: ["alice", "george", "paris", "timmy"],
                        translation: "斯温伯恩《回旋曲》：“无形之风“隐喻精准致命手法，排除体力不足者",
                    },
                    {
                        intro: "Take all my loves, my love, yea, take them all",
                        intro_cn: "拿走我所有的爱吧，吾爱…是的，全部带走。",
                        expect: ["rhodes", "edward", "george", "alice"],
                        translation: "莎士比亚十四行诗：“夺走所有爱“隐喻贪婪掠夺，排除道德高尚者",
                    },
                    {
                        intro: "I saw the spider marching through the air / Swimming from tree to tree that magic thread",
                        intro_cn: "我看见蜘蛛在空中行进…魔法丝线在树间游移。",
                        expect: ["alice", "george", "paris", "timmy"],
                        translation: "洛厄尔《蜘蛛》：“魔法丝线“隐喻精密机关，排除无技术能力者",
                    },
                    {
                        intro: "All the world's a stage, / And all the men and women merely players",
                        intro_cn: "整个世界是一座舞台…男男女女都只是演员。",
                        expect: ["george", "alice", "larry", "maine"],
                        translation: "莎士比亚《皆大欢喜》：“世界舞台”隐喻戏剧性行为，排除无表演倾向者",
                    },
                    {
                        intro: "The gray sea and the long black land; / And the yellow half-moon large and low",
                        intro_cn: "灰暗的海，黝黑绵长的陆地…昏黄的下弦月又大又低。",
                        expect: ["alice", "timmy", "maine"],
                        translation: "勃朗宁《夜会》：“黄月低垂”隐喻隐秘下毒，排除行动受限者",
                    },
                    {
                        intro: "Afoot and light-hearted I take to the open road",
                        intro_cn: "我轻松愉快走上大路…健康自由，世界在我面前。",
                        expect: ["alice", "george", "paris", "timmy"],
                        translation: "惠特曼《大路之歌》：“开放道路”隐喻车辆驾驭，排除无驾驶能力者",
                    },
                    {
                        intro: "She walks in beauty, like the night / Of cloudless climes and starry skies",
                        intro_cn: "她走在美的光彩中，如夜晚…皎洁无云而繁星满天。",
                        expect: ["larry", "rhodes", "maine", "edward"],
                        translation: "拜伦《她走在美的光彩中》：“美的光彩”隐喻精致修饰，排除不修边幅者",
                    },
                    {
                        intro: "The lamb misused breeds public strife, / And yet forgives the butcher's knife",
                        intro_cn: "被虐待的羔羊引发纷争…却仍宽恕屠夫的刀锋。",
                        expect: ["rhodes", "maine", "edward", "larry"],
                        translation: "布莱克《羔羊》：“羔羊反抗”隐喻弱小凶手，排除力量强大者",
                    },
                    {
                        intro: "The whisper woke, the silence spoke, / The phantom waited",
                        intro_cn: "低语唤醒，沉默开口…幽灵在等候。",
                        expect: ["alice", "george", "timmy", "larry"],
                        translation: "雪莱《致沉默》：“低语幻影”隐喻心理操控，排除直率单纯者",
                    },
                    {
                        intro: "Something there is that doesn't love a wall, / That sends the frozen-ground-swell under it",
                        intro_cn: "有种东西它不喜欢墙…使冻土在墙下膨胀。",
                        expect: ["rhodes", "maine"],
                        translation: "弗罗斯特《补墙》：“墙基松动”隐喻拙劣破坏，排除专业开锁者",
                    },
                    {
                        intro: "The cordage creaks and rattles; the sails / Throb like a crowd that murmurs",
                        intro_cn: "索具吱嘎作响；船帆…如低语的人群般悸动。",
                        expect: ["gini", "louisiana", "caroline", "paris"],
                        translation: "朗费罗《船的建造》：“绳索呻吟”隐喻专业打结，排除无暴力经验者",
                    },
                    {
                        intro: "Small feet were pattering, wooden shoes clattering, / Little hands clapping",
                        intro_cn: "小脚啪嗒啪嗒，木鞋咔嗒咔嗒…小手拍个不停。",
                        expect: ["rhodes", "maine", "edward", "larry"],
                        translation: "朗费罗《孩子们的时辰》：“小脚啪嗒”隐喻小型足迹，排除成年男性",
                    },
                    {
                        intro: "I know the places where the peacocks dance / And where the cellar holds the key",
                        intro_cn: "我知道孔雀起舞的地方…也知道地窖藏钥匙之处。",
                        expect: ["caroline", "gini", "louisiana", "maine"],
                        translation: "叶芝《尘世的玫瑰》：“孔雀舞处”隐喻熟悉场所，排除外来者",
                    },
                    {
                        intro: "Trust me, I have not earned your dear rebuke, / I love, as you would have me, friend",
                        intro_cn: "相信我，我并非招致你责备…朋友，我如你所愿地爱着。",
                        expect: ["rhodes", "maine", "larry"],
                        translation: "勃朗宁夫人《葡萄牙十四行诗》：“信任责备”隐喻亲密关系，排除敌对者",
                    }
                ],
                init:function(player,skill) {
                    var characters=['timmy','george','alice','caroline','gini','louisiana','larry','rhodes','maine','paris','edward'];
                    var items={
                        'timmy':{
                            name:'提姆西',
                            info:'一个看起来有点自闭的小男孩，很少说话，也不喜欢玩闹，很受父母的疼爱。',
                            skill:'danmo',
                            skill_name:'淡漠',
                            skill_info:'锁定技，你使用的锦囊牌对其他角色无效；其他角色使用的锦囊牌对你无效。',
                            sex:'male',
                        },
                        'george':{
                            name:'乔治',
                            info:'提姆西的父亲，为人木讷不善言谈，从事低收入的工作，很爱他的妻子。',
                            skill:'fuai',
                            skill_name:'父爱',
                            skill_info:'锁定技，你区域内的黑桃牌均视为红桃牌；当你因使用、打出或弃牌阶段外因弃置而失去一张红桃手牌时，你摸一张牌。',
                            sex:'male',
                        },
                        'alice':{
                            name:'艾莉丝',
                            info:'乔治的妻子，很疼爱提姆西。',
                            skill:'muai',
                            skill_name:'母爱',
                            skill_info:'锁定技，你区域内的方块牌均视为红桃牌；当你成为带伤害标签卡牌的目标时，你随机弃置一张红桃牌并取消此牌对你的目标。',
                            sex:'female',
                        },
                        'caroline':{
                            name:'卡洛琳',
                            info:'一个过气的女明星，脾气暴躁，对生活的档次要求非常高，不能忍受稍次的生活条件。',
                            skill:'yanwu',
                            skill_name:'厌恶',
                            skill_info:'锁定技，每当你使用一张牌时，你摸一张牌；出牌阶段内你每个花色的牌只能使用一张。',
                            sex:'female',
                        },
                        'gini':{
                            name:'吉妮',
                            info:'路易斯的女友，较为胆小且迷信鬼神。',
                            skill:'nuoruo',
                            skill_name:'懦弱',
                            skill_info:'锁定技，摸牌阶段你额外摸一张牌；你的【杀】造成伤害时你随机弃置一张手牌。',
                            sex:'female',
                        },
                        'louisiana':{
                            name:'路易斯',
                            info:'吉妮的男友，非常年轻且不太成熟，脾气糟糕。',
                            skill:'baozao',
                            skill_name:'暴躁',
                            skill_info:'锁定技，出牌阶段你可以额外使用一张【杀】；结束阶段时若你本回合内没有使用过【杀】，你摸一张牌，否则你失去一点体力。',
                            sex:'male',
                        },
                        'larry':{
                            name:'赖瑞',
                            info:'一个赌徒，阴差阳错成了汽车旅馆的老板。对金钱很贪婪，特别鄙视妓女，不乐意协助别人。',
                            skill:'tanlan',
                            skill_name:'贪婪',
                            skill_info:'锁定技，你的手牌上限加一；当你于摸牌阶段外摸牌时，你令摸牌数加一；你的回合内你不能使用或打出红色的牌。',
                            sex:'male',
                        },
                        'rhodes':{
                            name:'罗德斯',
                            info:'一名杀人犯，伪装成警察。控制欲很强。',
                            skill:'weishan',
                            skill_name:'伪善',
                            skill_info:'锁定技，你使用【杀】指定一名角色为目标时，你可以摸一张牌并交给该角色一张手牌，然后你令该角色不能响应此牌。',
                            sex:'male',
                        },
                        'maine':{
                            name:'缅因',
                            info:'一名罪犯，与罗德一同被押运。目光凶狠。',
                            skill:'xionge',
                            skill_name:'凶恶',
                            skill_info:'锁定技，你使用【杀】对其他角色造成的伤害加一；每当你于摸牌阶段外摸牌时，你失去一点体力。',
                            sex:'male',
                        },
                        'paris':{
                            name:'帕瑞斯',
                            info:'一名妓女，性格开朗善于言谈。',
                            skill:'shanliang',
                            skill_name:'善良',
                            skill_info:'锁定技，你使用【杀】时需弃置一张红色的牌才能生效；你可以弃置一张红色的牌并指定一名角色，并将此牌当【桃】对其使用。',
                            sex:'female',
                        },
                        'edward':{
                            name:'爱德华',
                            info:'一名司机，曾经做过警察，饱受短暂性失忆的困扰。乐于助人不怕麻烦，敢于承担责任，不惧危险。',
                            skill:'zhengyi',
                            skill_name:'正义',
                            skill_info:'锁定技，当你因弃置而失去一张红色的牌时，你获得一张黑色的牌；出牌阶段限一次/受到伤害后，你可以弃置一张手牌并视为对一名角色/伤害来源使用一张【决斗】。',
                            sex:'male',
                        },
                    };
                    var sub='DE_benglie_';
                    var cards=[];
                    for(var i=0;i<characters.length;i++) {
                        var name=characters[i];
                        lib.translate[sub+items[name].skill]=items[name].skill_name;
                        lib.translate[sub+items[name].skill+'_info']=items[name].skill_info;
                        lib.card['DE_zmid_'+name]={
                            fullborder:"bronze",
                            fullskin:false,
                            skill:sub+items[name].skill,
                            type:items[name].skill,
                            subtype:items[name].skill_name,
                            sex:items[name].sex,
                        };
                        lib.translate['DE_zmid_'+name]=items[name].name;
                        lib.translate['DE_zmid_'+name+'_info']=items[name].skill_info;
                        lib.translate['DE_zmid_'+name+'_append']='“'+items[name].info+'”';
                        var mycard=game.createCard({name:'DE_zmid_'+name,number:"🔔",suit:""});
                        mycard.skill=sub+items[name].skill;
                        cards.push(mycard);
                        lib.translate[sub+items[name].skill+'_intro']=items[name].skill_info;
                        lib.skill[sub+items[name].skill].spiritCard='DE_zmid_'+name;
                        lib.skill[sub+items[name].skill].init=function(player,skill){
                            var card=lib.skill[skill].spiritCard;
                            if(!player.storage.DE_benglie_onuse) {
                                player.storage.DE_benglie_onuse=[];
                            }
                            if(!player.storage.DE_benglie_onuse.contains(card)) {
                                player.storage.DE_benglie_onuse.push(card);
                            }
                        };
                        lib.skill[sub+items[name].skill].onremove=function(player,skill){
                            var card=lib.skill[skill].spiritCard;
                            if(!player.storage.DE_benglie_onuse) {
                                player.storage.DE_benglie_onuse=[];
                            }
                            if(player.storage.DE_benglie_onuse.contains(card)) {
                                player.storage.DE_benglie_onuse.remove(card);
                            }
                        };
                    }
                    var Ecards=game.randomMatrix(cards);
                    var hide=Math.random()<0.25?cards[0]:Ecards.randomGet();
                    player.storage.DE_benglie_hide=hide;
                    player.storage.DE_benglie_characters=characters;
                    game.DE_benglie_all=Ecards;
                    player.storage.DE_benglie=Ecards;
                    player.storage.DE_benglie_onuse=[];
                    player.storage.DE_bebglie_appeared=[];
                },
                content:function(){
                    'step 0'
                    //game.playAudio('..','audio','DE_zmid','benglie.mp3');
                    event.cards = player.storage.DE_benglie;
                    if(!event.cards || !event.cards.length) event.finish();
                    'step 1'
                    player.showCards(event.cards);
                    player.markSkill('DE_benglie');
                    'step 2'
                    player.chooseControl('ok').set('dialog',['你的'+get.cnNumber(event.cards.length)+'个人格',event.cards]);
                },
                derivation:"DE_benglie_show",
                marktext:'人格',
                intro:{
                    name:'精神分裂',
                    content:function(storage,player){
                        var list=storage;
                        var str='';
                        var str2='';
                        var onuse=player.storage.DE_benglie_onuse;
                        if(list.length){
                            if(onuse.contains(list[0].name)) {
                                str2+=get.translation(list[0]);
                            }else {
                                str+=get.translation(list[0]);
                            }
                            for(var i=1;i<list.length;i++){
                                if(onuse.contains(list[i].name)) {
                                    str2+='、'+get.translation(list[i]);
                                }else {
                                    str+='、'+get.translation(list[i]);
                                }
                            }
                        }
                        if(str2!=''){
                            str+='<p>主控人格'+str2;
                        }
                        return str;
                    },
                    mark:function(dialog,content,player){
                        var list=content.slice(0);
                        var list2=[];
                        var onuse=player.storage.DE_benglie_onuse;
                        for(var i=0;i<content.length;i++) {
                            if(onuse.contains(content[i].name)) {
                                list2.push(content[i]);
                                list.remove(content[i]);
                            }
                        }
                        if(list.length){
                            dialog.addSmall([list,'card']);
                        }
                        if(list2.length){
                            dialog.add('主控人格');
                            dialog.addSmall([list2,'card']);
                        }
                    },
                },
                group:["DE_benglie_phase","DE_benglie_kill"],
                subSkill:{
                    phase:{
                        trigger:{
                            player:"phaseZhunbeiBegin",
                        },
                        firstDo:true,
                        forced:true,
                        filter:function(event,player) {
                            var storage=player.storage.DE_benglie;
                            if(!storage) return false;
                            if(!storage.length) return false;
                            return true;
                        },
                        content:function(){
                            'step 0'
                            var storage=player.storage.DE_benglie;
                            if(player.storage.DE_benglie_hide) {
                                event.isAchieve=false;
                                if(storage.length>2) {
                                    event.cards=storage.randomGets(2);
                                }else {
                                    event.cards=storage;
                                }
                            }else {
                                event.isAchieve=true;
                                player.chooseCardButton(storage,'请选择控制的人格',Math.min(2,storage.length),true).set('filterButton',function(button){
                                    return true;
                                }).set('ai',function(button){
                                    return Math.random()+1;
                                });
                            }
                            'step 1'
                            if(event.isAchieve) {
                                event.cards=result.links;
                            }
                            player.showCards(event.cards);
                            'step 2'
                            player.$gain2(event.cards);
                            for(var i=0;i<event.cards.length;i++) {
                                //player.storage.DE_benglie_onuse.push(event.cards[i].name);
                                player.addTempSkill(event.cards[i].skill,{player:'phaseBegin'});
                            }
                        },
                        sub:true,
                    },
                    kill:{
                        trigger:{
                            player:"phaseJieshuBegin",
                        },
                        firstDo:true,
                        forced:true,
                        dutySkill:true,
                        filter:function(event,player) {
                            var storage=player.storage.DE_benglie;
                            if(!storage) return false;
                            if(!storage.length) return false;
                            return player.storage.DE_benglie_hide;
                        },
                        content:function(){
                            'step 0'
                            var storage=player.storage.DE_benglie;
                            player.chooseCardButton(storage,'请指定要对其进行审判的人格',1,true).set('filterButton',function(button){
                                return true;
                            }).set('ai',function(button){
                                return Math.random()+1;
                            });
                            'step 1'
                            if(result.bool){
                                event.kill=result.links[0];
                                player.addSkill('DE_benglie_nextkill');
                                player.storage.DE_benglie_kill=event.kill;
                                game.log(player,'选择于下回合开始审判','#y'+get.translation(event.kill.name),'人格');
                            }
                        },
                        sub:true,
                    },
                    nextkill:{
                        trigger:{
                            player:"phaseBegin",
                        },
                        charlotte:true,
                        firstDo:true,
                        forced:true,
                        silent:true,
                        filter:function(event,player) {
                            return true;
                        },
                        content:function(){
                            'step 0'
                            var storage=player.storage.DE_benglie;
                            var kill=player.storage.DE_benglie_kill;
                            if(!kill) event.goto(4);
                            if(!storage||!storage.length) event.goto(3);
                            if(!storage.contains(kill)) event.goto(3);
                            'step 1'
                            var kill=player.storage.DE_benglie_kill;
                            player.$throw(kill,1000);
                            player.storage.DE_benglie.remove(kill);
                            game.log(player,'审判了','#y'+get.translation(kill.name),'人格');
                            'step 2'
                            var storage=player.storage.DE_benglie.slice(0);
                            var kill=player.storage.DE_benglie_kill;
                            var hide=player.storage.DE_benglie_hide;
                            if(!hide) hide='none';
                            if(kill==hide||hide=='none') {
                                game.playAudio('..','audio','DE_zmid','benglie_achieve.mp3');
                                if(hide!='none') game.log('#y'+get.translation(kill.name),'为','#b隐藏人格');
                                player.storage.DE_benglie_hide=false;
                                player.logSkill('DE_benglie_achieve');
                                game.log(player, '成功完成使命');
                                player.awakenSkill('DE_benglie_kill');
                                player.shixiaoSkill('DE_benglie_kill');
                            }else {
                                if(storage.contains(hide)) storage.remove(hide);
                                if(storage.length>0) {
                                    var die=storage.randomGet();
                                    player.$throw(die,1000);
                                    player.storage.DE_benglie.remove(die);
                                    storage.remove(die);
                                    game.log('#b隐藏人格','杀死了','#y'+get.translation(die.name),'人格');
                                    var title = 'DE_zmid_';
                                    var name = hide.name.slice(title.length);
                                    var clues = lib.skill.DE_benglie.clues.filter(obj=>{
                                        return !obj.expect.contains(name);
                                    });
                                    var log = clues.randomGet();
                                    player.say(log.intro_cn);
                                    if(!player.storage.DE_bebglie_appeared.contains(log)) {
                                        player.storage.DE_bebglie_appeared.add(log);
                                    }else {
                                        game.log(log.translation);
                                    }
                                }
                                if(storage.length<1) {
                                    game.playAudio('..','audio','DE_zmid','benglie_fail.mp3');
                                    player.storage.DE_benglie_hide=false;
                                    game.log(player,'的所有表人格已被消灭');
                                    game.log(player, '使命失败');
                                    player.awakenSkill('DE_benglie_kill');
                                    player.failSkill('DE_benglie_kill');
                                    player.shixiaoSkill('DE_benglie_kill');
                                    player.addSkill('DE_benglie_fail');
                                }else {
                                    game.playAudio('..','audio','DE_zmid','benglie_kill.mp3');
                                }
                            }
                            event.goto(4);
                            'step 3'
                            game.log('对人格的审判失败');
                            'stwp 4'
                            player.removeSkill('DE_benglie_nextkill');
                        },
                        sub:true,
                    },
                    achieve:{
                        animationStr:"痊愈",
                        skillAnimation:true,
                        animationColor:"metal",
                        sub:true,
                    },
                    fail:{
                        group:'mad',
                        mark:true,
                        marktext:"混乱",
                        charlotte:true,
                        intro:{
                            name:"精神错乱",
                            content:"已进入混乱状态",
                        },
                        sub:true,
                    },
                    danmo:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            target:"useCardToBefore",
                            player:"useCardToBefore",
                        },
                        forced:true,
                        priority:15,
                        check:function(event,player){
                            return get.effect(event.target,event.card,event.player,player)<0;
                        },
                        filter:function(event,player){
                            if(!event.target) return false;
                            if(event.player==player&&event.target==player) return false;
                            return (['trick','delay'].contains(get.type(event.card)));
                        },
                        content:function(){
                            trigger.cancel();
                        },
                        ai:{
                            effect:{
                                target:function(card,player,target,current){
                                    if(['trick','delay'].contains(get.type(card))&&player!=target) return 'zeroplayertarget';
                                },
                                player:function(card,player,target,current){
                                    if(['trick','delay'].contains(get.type(card))&&player!=target) return 'zeroplayertarget';
                                },
                            },
                        },
                        sub:true,
                    },
                    fuai:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            player:["loseAfter"],
                        },
                        forced:true,
                        filter:function(event,player){
                            if(!['use','respond','discard'].contains(event.type)) return false;
                            if(event.getParent('phaseDiscard').player==player) return false;
                            var evt=event.getl(player);
                            if(evt&&evt.player==player) {
                                var sumcard=[];
                                if(evt.hs&&evt.hs.length>0) {
                                    var sumcard=sumcard.concat(evt.hs);
                                }
                            }
                            for(var i=0;i<sumcard.length;i++){
                                if(player.getCards('he').contains(sumcard[i])) continue;
                                if(get.suit(sumcard[i],player)=='heart') return true;
                            }
                        },
                        content:function(){
                            'step 0'
                            game.playAudio('..','audio','DE_zmid','fuai.mp3');
                            event.num=0;
                            var evt=trigger.getl(player);
                            var sumcard=[];
                            if(evt.hs&&evt.hs.length>0) {
                                var sumcard=sumcard.concat(evt.hs);
                            }
                            for(var i=0;i<sumcard.length;i++){
                                if(player.getCards('he').contains(sumcard[i])) continue;
                                if(get.suit(sumcard[i],player)=='heart') event.num++;
                            }
                            'step 1'
                            player.draw(event.num);
                        },
                        mod:{
                            suit:function(card,suit){
                                if(suit=='spade') return 'heart';
                            },
                        },
                        sub:true,
                    },
                    muai:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            target:"useCardToTargeted",
                        },
                        forced:true,
                        preHidden:true,
                        filter:function(event,player){
                            return get.tag(event.card,'damage')&&player.countCards('he',{suit:'heart'})>0;
                        },
                        content:function(){
                            "step 0"
                            game.playAudio('..','audio','DE_zmid','muai.mp3');
                            player.discard(player.getCards('he',{suit:'heart'}).randomGet());
                            "step 1"
                            trigger.getParent().excluded.add(player);
                        },
                        mod:{
                            suit:function(card,suit){
                                if(suit=='diamond') return 'heart';
                            },
                        },
                        sub:true,
                    },
                    yanwu:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            player:"useCard",
                        },
                        firstDo:true,
                        forced:true,
                        preHidden:true,
                        filter:function(event){
                            return (event.card.isCard);
                        },
                        content:function(){
                            player.draw();
                            if(!player.hasSkill('DE_benglie_yanwu_forbid')) player.addTempSkill('DE_benglie_yanwu_forbid');
                            if(_status.currentPhase&&_status.currentPhase==player&&_status.event.getParent('phaseUse')) {
                                if(get.suit(trigger.card)) {
                                    var suit=get.suit(trigger.card);
                                    player.storage.DE_benglie_yanwu_forbid.push(suit);
                                }
                                game.playAudio('..','audio','DE_zmid','yanwu_'+player.storage.DE_benglie_yanwu_forbid.length+'.mp3');
                            }
                        },
                        sub:true,
                    },
                    yanwu_forbid:{
                        charlotte:true,
                        locked:true,
                        mark:true,
                        marktext:'厌恶',
                        intro:{
                            name:'爱慕虚荣',
                            content:function(storage,player){
                                return '不能使用'+get.translation(storage)+'花色的牌';
                            },
                        },
                        init:function(player,skill){
                            player.storage.DE_benglie_yanwu_forbid=[];
                        },
                        onremove:function(player,skill){
                            player.storage.DE_benglie_yanwu_forbid=[];
                        },
                        mod:{
                            cardEnabled:function(card,player){
                                var suits=player.storage.DE_benglie_yanwu_forbid;
                                if(suits.contains(get.suit(card))&&_status.currentPhase&&_status.currentPhase==player&&
                                    _status.event.getParent('phaseUse')&&!player.hasSkill('boss_jiding')){
                                    return false;
                                }
                            },
                        },
                    },
                    nuoruo:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            player:"phaseDrawBegin2",
                            source:"damageSource",
                        },
                        forced:true,
                        filter:function(event,player){
                            if(event.name=='phaseDraw') {
                                return !event.numFixed;
                            }else {
                                if(player.countCards('h')<1) return false;
                                return event.card&&event.card.name=='sha';
                            }
                        },
                        content:function(){
                            if(trigger.name=='phaseDraw') {
                                game.playAudio('..','audio','DE_zmid','nuoruo_draw.mp3');
                                trigger.num++;
                            }else if(player.countCards('h')>0){
                                game.playAudio('..','audio','DE_zmid','nuoruo_damage.mp3');
                                player.discard(player.getCards('h').randomGet());
                            }
                        },
                        sub:true,
                    },
                    baozao:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            player:"phaseJieshuBegin",
                        },
                        forced:true,
                        filter:function(event,player){
                            return true;
                        },
                        content:function(){
                            game.playAudio('..','audio','DE_zmid','baozao.mp3');
                            var usesha=false;
                            var history=player.getHistory('useCard').concat(player.getHistory('respond'));
                            for(var i=0;i<history.length;i++){
                                if(history[i].card.name=='sha'&&history[i].isPhaseUsing()) usesha=true;
                            }
                            if(usesha) {
                                player.loseHp();
                            }else {
                                player.draw();
                            }
                        },
                        mod:{
                            cardUsable:function(card,player,num){
                                if(card.name=='sha') return num+1;
                            },
                        },
                        sub:true,
                    },
                    tanlan:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            player:"drawBegin",
                        },
                        forced:true,
                        filter:function(event,player){
                            if(event.getParent('phaseDraw').player==player) return false;
                            return !event.numFixed;
                        },
                        content:function(){
                            game.playAudio('..','audio','DE_zmid','tanlan.mp3');
                            trigger.num++;
                        },
                        mod:{
                            maxHandcardBase:function(player,num){
                                return num+1;
                            },
                            cardSavable:function(card,player){
                                var source=_status.currentPhase;
                                if(source==player&&get.color(card)=='red') return false;
                            },
                            cardEnabled:function(card,player){
                                var source=_status.currentPhase;
                                if(source==player&&get.color(card)=='red') return false;
                            },
                            cardResponsabled:function(card,player){
                                var source=_status.currentPhase;
                                if(source==player&&get.color(card)=='red') return false;
                            },
                        },
                        sub:true,
                    },
                    weishan:{
                        firstDo:true,
                        locked:true,
                        shaRelated:true,
                        trigger:{
                            player:"useCardToPlayered",
                        },
                        check:function(event,player){
                            return get.attitude(player,event.target)<=0;
                        },
                        filter:function(event,player){
                            return event.card.name=='sha';
                        },
                        logTarget:"target",
                        preHidden:true,
                        content:function(){
                            "step 0"
                            game.playAudio('..','audio','DE_zmid','weishan.mp3');
                            player.draw();
                            "step 1"
                            player.chooseCard('选择交给'+get.translation(trigger.target.name)+'一张手牌并令其不可闪避此杀','h',1,true,function(card,player){
                                return true;
                            },function(card,player){
                                return 13-get.value(card);
                            });
                            "step 2"
                            if(result.bool){
                                trigger.target.gain(result.cards,'gain2');
                                trigger.getParent().directHit.add(trigger.target);
                            }
                        },
                        ai:{
                            "directHit_ai":true,
                            skillTagFilter:function(player,tag,arg){
                                if(get.attitude(player,arg.target)>0||arg.card.name!='sha'||!ui.cardPile.firstChild||get.color(ui.cardPile.firstChild,player)!='red') return false;
                            },
                        },
                        sub:true,
                    },
                    xionge:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            player:"drawAfter",
                            source:"damageBegin1",
                        },
                        forced:true,
                        filter:function(event,player){
                            if(event.name=='damage') {
                                return event.card&&event.card.name=='sha';
                            }else {
                                return event.getParent('phaseDraw').player!=player;
                            }
                        },
                        content:function(){
                            if(trigger.name=='damage') {
                                game.playAudio('..','audio','DE_zmid','xionge_damage.mp3');
                                trigger.num++;
                            }else {
                                game.playAudio('..','audio','DE_zmid','xionge_losehp.mp3');
                                player.loseHp();
                            }
                        },
                        sub:true,
                    },
                    shanliang:{
                        group:'DE_benglie_shanliang_sha',
                        firstDo:true,
                        locked:true,
                        enable:["chooseToUse","phaseUse"],
                        filter:function(event,player){
                            return player.countCards('hes',{color:'red'})>0&&game.hasPlayer(function(current){
                                return lib.filter.targetEnabled2({name:'tao',color:'red'},player,current);
                            });
                        },
                        filterTarget:function(card,player,target){
                            var event=_status.event;
                            if(event.type&&event.type=='dying'&&event.dying!=target) return false;
                            return lib.filter.targetEnabled2({name:'tao',color:'red'},player,target)||(player.canSave(target)&&target.isDying());
                        },
                        selectTarget:function(){
                            if(_status.event.type&&_status.event.type=='dying') return -1;
                            return 1;
                        },
                        filterCard:function(card){
                            return get.color(card)=='red';
                        },
                        position:"hes",
                        init:function(player,skill){
                            game.dy_tao_copy=lib.card['tao'].slice(0);
                            game.dy_tao_else=lib.card['tao'].slice(0);
                        },
                        content:function(){
                            game.playAudio('..','audio','DE_zmid','shanliang_tao.mp3');
                            player.useCard({name:'tao'},target,cards);
                        },
                        prompt:"弃置一张红色的牌，并将此牌当桃对一名角色使用",
                        check:function(card){return 9-get.value(card)},
                        mod:{
                            aiValue:function(player,card,num){
                                if(get.name(card)!='tao'&&get.color(card)!='red') return;
                                var cards=player.getCards('hs',function(card){
                                    return get.name(card)=='tao'||get.color(card)=='red';
                                });
                                cards.sort(function(a,b){
                                    return (get.name(a)=='tao'?1:2)-(get.name(b)=='tao'?1:2);
                                });
                                var geti=function(){
                                    if(cards.contains(card)){
                                        return cards.indexOf(card);
                                    }
                                    return cards.length;
                                };
                                return Math.max(num,[6.5,4,3,2][Math.min(geti(),2)]);
                            },
                            aiUseful:function(){
                                return lib.skill.kanpo.mod.aiValue.apply(this,arguments);
                            },
                        },
                        ai:{
                            order:9,
                            result:{
                                target:function(player,target){
                                    if(target.hp==1) return 5;
                                    if(player==target&&player.countCards('h')>player.hp) return 5;
                                    return 2;
                                },
                            },
                        },
                        sub:true,
                    },
                    shanliang_sha:{
                        firstDo:true,
                        trigger:{
                            player:"useCardToPlayered",
                        },
                        forced:true,
                        preHidden:true,
                        filter:function(event,player){
                            return event.card.name=='sha';
                        },
                        init:function(player,skill){
                            lib.translate[skill]="善良";
                        },
                        content:function(){
                            "step 0"
                            game.playAudio('..','audio','DE_zmid','shanliang_sha.mp3');
                            var eff=get.effect(trigger.target,trigger.card,player,player);
                            player.chooseToDiscard('弃置一张红色的牌，否则杀对'+get.translation(trigger.target)+'无效',function(card){
                                return get.color(card)=='red';
                            }).set('ai',function(card){
                                if(_status.event.eff>0){
                                    return 10-get.value(card);
                                }
                                return 0;
                            }).set('eff',eff);
                            "step 1"
                            if(result.bool==false){
                                trigger.getParent().excluded.add(trigger.target);
                            }
                        },
                        ai:{
                            effect:{
                                player:function(card,target,player,current){
                                    if(card.name=='sha'&&get.attitude(player,target)<0){
                                        var bs=player.getCards('h',{color:'red'});
                                        if(bs.length-player.getCards('h',{name:'sha'})<1) return 0;
                                        if(player.hasSkill('jiu')||player.hasSkill('tianxianjiu')) return;
                                        if(bs.length<=3&&player.countCards('h','sha')<=1){
                                            for(var i=0;i<bs.length;i++){
                                                if(bs[i].name!='sha'&&get.value(bs[i])<7){
                                                    return [1,0,1,-0.5];
                                                }
                                            }
                                            return 0;
                                        }
                                        return [1,0,1,-0.5];
                                    }
                                },
                            },
                        },
                        sub:true,
                    },
                    zhengyi:{
                        group:['DE_benglie_zhengyi_draw','DE_benglie_zhengyi_damage'],
                        firstDo:true,
                        locked:true,
                        enable:"phaseUse",
                        filterCard:true,
                        usable:1,
                        check:function(card){
                            return 9-get.value(card);
                        },
                        filter:function(event,player){
                            if(!lib.filter.cardEnabled({name:'juedou'},player)) return false;
                            return player.countCards('h')>0;
                        },
                        filterTarget:function(card,player,target){
                            return player.canUse({name:'juedou'},target);
                        },
                        content:function(){
                            game.playAudio('..','audio','DE_zmid','zhengyi_juedou.mp3');
                            player.useCard({name:'juedou'},target);
                        },
                        ai:{
                            damage:true,
                            order:function (item, player) {
                                if (player.countCards('h', 'tao') > 0) {
                                    return get.order({name: 'tao'}) - 1;
                                }
                                return 0.5;
                            },
                            effect:{
                                player:function (card, player, target) {
                                    if (_status.event.skill == 'zhanjue') {
                                        if (
                                            player.hasSkillTag(
                                                'directHit_ai',
                                                true,
                                                {
                                                    target: target,
                                                    card: card
                                                },
                                                true
                                            )
                                        )
                                            return;
                                        if (player.countCards('h') >= 3 || target.countCards('h') >= 3) return 'zeroplayertarget';
                                        if (player.countCards('h', 'tao')) return 'zeroplayertarget';
                                        if (target.countCards('h', 'sha') > 1) return 'zeroplayertarget';
                                    }
                                },
                            },
                            wuxie:function (target, card, player, viewer) {
                                if (player == game.me && get.attitude(viewer, player) > 0) {
                                    return 0;
                                }
                            },
                            basic:{
                                order:5,
                                useful:1,
                                value:5.5,
                            },
                            result:{
                                target:-1.5,
                                player:function (player, target, card) {
                                    if (
                                        player.hasSkillTag(
                                            'directHit_ai',
                                            true,
                                            {
                                                target: target,
                                                card: card
                                            },
                                            true
                                        )
                                    ) {
                                        return 0;
                                    }
                                    if (get.damageEffect(target, player, target) > 0 && get.attitude(player, target) > 0 && get.attitude(target, player) > 0) {
                                        return 0;
                                    }
                                    var hs1 = target.countCards('hs', 'sha');
                                    var hs2 = player.countCards('hs', 'sha');
                                    if (hs1 > hs2 + 1) {
                                        return -2;
                                    }
                                    if (player.hp == 1 && hs2 == 0 && hs1 >= 1) {
                                        return -2;
                                    }
                                    var hsx = target.countCards('hs');
                                    if (hsx.length == 0) {
                                        return 0;
                                    }
                                    if (hsx > 3 && hs2 == 0) {
                                        return -2;
                                    }
                                    return -0.5;
                                },
                            },
                            tag:{
                                respond:2,
                                respondSha:2,
                                damage:1,
                            },
                        },
                        sub:true,
                    },
                    zhengyi_damage:{
                        trigger:{
                            player:"damageEnd",
                        },
                        filter:function(event,player){
                            if(!player.countCards('h')) return false;
                            return (event.source!=undefined&&player.canUse({name:'juedou'},event.source));
                        },
                        check:function(event,player){
                            return (get.attitude(player,event.source)<=0);
                        },
                        init:function(player,skill){
                            lib.translate[skill]="正义";
                        },
                        logTarget:"source",
                        content:function(){
                            "step 0"
                            var eff=get.effect(trigger.source,{name:'juedou'},player,player);
                            player.chooseToDiscard('弃置一张手牌并视为对'+get.translation(trigger.source)+'使用一张决斗','h',function(card){
                                return true;
                            }).set('ai',function(card){
                                if(_status.event.eff>0){
                                    return 5-get.value(card);
                                }
                                return 0;
                            }).set('eff',eff);
                            "step 1"
                            if(result.bool) {
                                game.playAudio('..','audio','DE_zmid','zhengyi_juedou.mp3');
                                player.useCard({name:'juedou'},trigger.source);
                            }
                        },
                    },
                    zhengyi_draw:{
                        firstDo:true,
                        locked:true,
                        trigger:{
                            player:["loseAfter"],
                        },
                        forced:true,
                        filter:function(event,player){
                            if(event.type!='discard') return false;
                            //if(event.getParent('phaseDiscard').player==player) return false;
                            var evt=event.getl(player);
                            if(evt&&evt.player==player) {
                                var sumcard=[];
                                if(evt.hs&&evt.hs.length>0) {
                                    var sumcard=sumcard.concat(evt.hs);
                                }
                                if(evt.es&&evt.es.length>0) {
                                    var sumcard=sumcard.concat(evt.es);
                                }
                            }
                            for(var i=0;i<sumcard.length;i++){
                                if(player.getCards('he').contains(sumcard[i])) continue;
                                if(get.color(sumcard[i],player)=='red') return true;
                            }
                        },
                        init:function(player,skill){
                            lib.translate[skill]="正义";
                        },
                        content:function(){
                            'step 0'
                            game.playAudio('..','audio','DE_zmid','zhengyi_draw.mp3');
                            event.num=0;
                            var evt=trigger.getl(player);
                            var sumcard=[];
                            if(evt.hs&&evt.hs.length>0) {
                                var sumcard=sumcard.concat(evt.hs);
                            }
                            if(evt.es&&evt.es.length>0) {
                                var sumcard=sumcard.concat(evt.es);
                            }
                            for(var i=0;i<sumcard.length;i++){
                                if(player.getCards('he').contains(sumcard[i])) continue;
                                if(get.color(sumcard[i],player)=='red') event.num++;
                            }
                            'step 1'
                            player.gain(get.cards(event.num,{color:'black'}),'draw');
                        },
                        sub:true,
                    },
                },
            },
			"DE_pomu":{
                audio:1,
                trigger:{
                    player:"showCharacterAfter",
                },
                hiddenSkill:true,
                derivation:["DE_qinyong","DE_suilin"],
                filter:function(event,player){
                    return event.toShow&&event.toShow.contains('DE_longdi');
                },
                locked:false,
                forced:true,
                content:function(){
                    'step 0'
                    player.group='shu';
                    player.update();
                    player.addSkill('DE_qinyong');
                    player.addSkill('DE_suilin');
                    'step 1'
                    var cards=[];
                    for(var i=0;i<2;i++) {
                        cards.push(game.createCard({
                            name:'wuxie',
                            suit:'spade',
                            number:13,
                        }));
                    }
                    if(_status.currentPhase&&_status.currentPhase.isAlive()) {
                        _status.currentPhase.gain(cards, 'gain2');
                    }
                },
            },
            "DE_dengdi":{
                skillAnimation:true,
                animationColor:"fire",
                juexingji:true,
                derivation:["DE_jisha","DE_lingwei"],
                unique:true,
                locked:false,
                //专门适应笨蛋插件
                noChoosingAudio:true,
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                filter:function(event,player){
                    if(player.getExpansions('DE_qinyong').length<window.getStrength(8,6,'DE_longdi')||player.storage["DE_dengdi"]) return false;
                    game.helaAudio('skill','DE_dengdi1.mp3');
                    return true;
                },
                init:function(player,skill){
                    game.createCss(`@keyframes DE_longdi_animation{
				        0% {
				            height: 0%;
				        }
				        5% {
				            height: 40%;
				        }
				        95% {
				            height: 50%;
				        }
				        100% {
				            height: 0%;
				        }
				    }`);
				    game.createCss(`@keyframes DE_longdi_background{
				        0% {
				            opacity: 0;
				        }
				        5% {
				            opacity: 1;
				        }
				        95% {
				            opacity: 1;
				        }
				        100% {
				            opacity: 0;
				        }
				    }`);
                    game.createCss(`.DE_longdi_effect{
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        height: 50%;
                        width: 100%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 500;
                        animation: DE_longdi_animation 7s 1 ease;
                        box-shadow: rgb(0, 0, 0) 0px 0px 8px 8px;
                    }`);
                    game.createCss(`.DE_longdi_shadow{
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        height: 100%;
                        width: 100%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 499;
                        background-color: rgba(0, 0, 0, 0.5);
                        animation: DE_longdi_background 7s 1 ease;
                    }`);
                },
                forced:true,
                //direct:true,
                content:function(){
                    'step 0'
                    /*特效来了*/
                    var image=ui.create.div(ui.window);
                    image.classList.add('DE_longdi_effect');
                    image.style.backgroundImage=`url('${lib.assetURL}image/DE_longdi.gif?t=${Date.now()}')`;
                    var shade=ui.create.div(ui.window);
                    shade.classList.add('DE_longdi_shadow');
                    setTimeout(function(){
                        if(image) image.remove();
                        if(shade) shade.remove();
                    },7000);
                    /*特效走了*/
                    game.delay();
                    'step 1'
                    player.changePlayerTo('DE_longdi','DE_init_longdi');
                    //player.logSkill('DE_dengdi');
                    _status.tempMusic='effect_DE_longdi';
                    //setTimeout(function(){
                    game.playBackgroundMusic();
                    //},200);
                    player.removeSkill('DE_qinyong');
                    player.removeSkill('DE_suilin');
                    player.group='shen';
                    player.update();
                    player.awakenSkill(event.name);
                    player.storage[event.name]=true;
                    'step 2'
                    var rec=player.hujia;
                    if(rec>0) {
                        player.changeHujia(-rec);
                        player.recover(rec);
                    }
                    'step 3'
                    player.link(false);
					'step 4'
					player.turnOver(false);
                    'step 5'
                    game.log(player,'获得了技能','#g〖祭煞〗和〖陵卫〗');
                    player.addSkill('DE_jisha');
                    player.addSkill('DE_lingwei');
                    game.delay(10);
                },
                ai:{
                    threaten:function(player,target){
                        return 0.5+target.countMark('mny_dy_qinyong_quan')*window.getStrength(0.3,0.4,'DE_longdi');
                    },
                },
            },
            "DE_qinyong":{
                subSkill:{
                    recover:{
                        trigger:{
                            player:"phaseJieshuBegin",
                        },
                        firstDo:true,
                        forced:true,
						audio:1,
                        preHidden:true,
                        content:function(){
                            'step 0'
                            game.delay(2);
                            'step 1'
                            player.recover().limited=true;
                        },
                        sub:true,
                    },
                    discard:{
						audio:'DE_qinyong',
						//条件太苛刻了
						/*trigger:{global:['loseAfter','loseAsyncAfter']},
						filter:function(event,player){
							if(player.getExpansions('DE_qinyong').length>=window.getStrength(8,6,'DE_longdi')) return false;
							if(event.type!='discard'||event.getlx===false) return false;
							var cards=event.cards.slice(0);
							var evt=event.getl(player);
							//if(evt&&evt.cards) cards.removeArray(evt.cards);
							for(var i=0;i<cards.length;i++){
								if(cards[i].original!='j'&&get.suit(cards[i],event.player)=='spade'&&get.position(cards[i],true)=='d'){
									return true;
								}
							}
							return false;
						},*/
						trigger:{
                            global:["loseAfter","cardsDiscardAfter","loseAsyncAfter"],
                        },
                        filter:function(event,player){
							if(player.getExpansions('DE_qinyong').length>=window.getStrength(8,6,'DE_longdi')) return false;
                            if(event.name.indexOf('lose')==0){
                                if(event.getlx===false||event.position!=ui.discardPile) return false;
                            }
                            else{
                                var evt=event.getParent();
                                if(evt.relatedEvent&&(evt.relatedEvent.name=='useCard'||evt.relatedEvent.name=='respond')) return false;
                            }
                            event.spadeCards = event.cards.filter(card=>get.suit(card)=='spade');
                            return event.spadeCards.length;
                        },
						forced:true,
						firstDo:true,
						audio:'DE_qinyong_xianhun',
						content:function(){
							"step 0"
							if(trigger.delay==false) game.delay();
							"step 1"
							//条件太苛刻了
							/*var cards=[],cards2=trigger.cards.slice(0),evt=trigger.getl(player);
							//if(evt&&evt.cards) cards2.removeArray(evt.cards);
							for(var i=0;i<cards2.length;i++){
								if(cards2[i].original!='j'&&get.suit(cards2[i],trigger.player)=='spade'&&get.position(cards2[i],true)=='d'){
									cards.push(cards2[i]);
								}
							}*/
							var cards = trigger.spadeCards || [];
							if(cards.length){
							    var num=Math.min(window.getStrength(8,6,'DE_longdi')-player.getExpansions('DE_qinyong').length);
							    var cards2=cards.randomGets(num);
							    player.$gain2(cards2);
								player.addToExpansion('giveAuto',cards2,player).gaintag.add('DE_qinyong');
							}else {
							    event.finish();
							}
							"step 2"
							get.info("lianzhaoEffect").method(player, Math.ceil(60*player.getExpansions('DE_qinyong').length/window.getStrength(8,6,'DE_longdi')), 'DE_qinyong');
						},
						sub:true,
					},
					judge:{
						trigger:{global:'cardsDiscardAfter'},
						forced:true,
						firstDo:true,
						audio:'DE_qinyong_xianhun',
						filter:function(event,player){
							if(player.getExpansions('DE_qinyong').length>=window.getStrength(8,6,'DE_longdi')) return false;
							var evt=event.getParent().relatedEvent;
							if(!evt||evt.name!='judge') return;
							//if(evt.player==player) return false;
							if(get.position(event.cards[0],true)!='d') return false;
							return (get.suit(event.cards[0])=='spade');
						},
						content:function(){
							"step 0"
						    var num=Math.min(8-player.getExpansions('DE_qinyong').length);
						    var cards2=trigger.cards.randomGets(num);
						    player.$gain2(cards2);
							player.addToExpansion('giveAuto',cards2,player).gaintag.add('DE_qinyong');
							"step 1"
							get.info("lianzhaoEffect").method(player, Math.ceil(60*player.getExpansions('DE_qinyong').length/window.getStrength(8,6,'DE_longdi')), 'DE_qinyong');
						},
						sub:true,
					},
					xianhun:{
					    audio:4,
					    sub:true,
					},
					damage:{
					    trigger:{
                            player:["damageSource"],
                        },
                        direct:true,
                        firstDo:true,
                        filter:function(event,player){
                            return event.hujia;
                        },
                        content:function(){
                            game.playAudio('skill','DE_qinyong_damage1.mp3');
                        },
                        sub:true,
					},
                },
                group:['DE_qinyong_discard','DE_qinyong_judge','DE_qinyong_recover','DE_qinyong_damage'],
                trigger:{
                    player:["changeHp"],
                },
                loced:true,
                forced:true,
                firstDo:true,
                filter:function(event,player){
                    return player.getHp()>2;
                },
                content:function(){
                    'step 0'
                    var dam=(player.maxHp-2)-player.hujia;
                    var num=Math.min(dam,player.getHp()-2);
                    player.hp=2;
                    player.update();
                    if(num>0) player.changeHujia(num);
                },
                init:function(player){
                    if(player.getHp()>2) {
                        var dam=(player.maxHp-2)-player.hujia;
                        var num=Math.min(dam,player.getHp()-2);
                        player.hp=2;
                        player.update();
                        if(num>0) player.changeHujia(num);
                    }
                    get.info("lianzhaoEffect").method(player, 0, 'DE_qinyong');
                },
                comboSkill: true,
                onremove:function(player,skill) {
                    get.info("lianzhaoEffect").method(player, false, 'DE_qinyong');
                },
                marktext:"仙魂",
                intro:{
					name:'永生之泉',
					markcount:function(storage,player){
						var cards=player.getExpansions('DE_qinyong');
						return cards.length||"0";
						//"extension";
					},
					mark:function(dialog,storage,player){
						var cards=player.getExpansions('DE_qinyong');
						if(cards.length) {
						    dialog.addAuto(cards);
						}else {
						    return "正在寻找〖仙魂〗";
						}
					},
				},
                effect:{
                    target:function(card,player,target){
                        if(get.tag(card,'recover')&&(target.getHp()+target.hujia>=target.maxHp)) return 0;
                    },
                },
            },
            "DE_suilin":{
                enable:"phaseUse",
                filter:function(event,player){
                    return player.hujia>0;
                },
                locked:false,
                usable:window.getStrength(1,2,'DE_longdi'),
                audio:2,
                filterTarget:function(card,player,target){
                    if(target==player) return false;
                    return true;
                },
                content:function(){
                    'step 0'
                    player.changeHujia(-1);
                    game.delay();
                    'step 1'
                    game.playAudio('skill','DE_qinyong_damage1.mp3');
                    target.damage('fire');
                },
                ai:{
                    order:8.5,
                    fireAttack:true,
                    result:{
                        target:function (player,target){
                            var hps=player.hp+player.Hujia;
                            if(hps<=2) return 0;
                            if(target.hp>=hps) return 0;
                            if(hps==player.maxHp) return 0;
                            return get.damageEffect(target,player,target,'fire');
                        },
                    },
                },
            },
            "DE_jisha":{
                trigger:{
                    player:"phaseUseBegin",
                },
                locked:false,
                direct:true,
                audio:3,
                filter:function(event,player){
                    return true;
                },
                randomGet:function(arr, num){
                    // 如果 num 超过数组长度，则设为数组长度
                    num = Math.min(num, arr.length);
                    let result = [];
                    for (let i = 0; i < num; i++) {
                        let randomIndex = Math.floor(Math.random() * arr.length);
                        result.push(arr.splice(randomIndex, 1)[0]);
                    }
                    return result;
                },
                init:function(player,skill){
                    if(lib.skill['icesha_skill']) lib.skill['icesha_skill'].filter=function(event,player){
    					if(event.notDiscard||player.hasSkill("DE_jisha")) return false;
    					return event.nature=='ice'&&event.notLink()&&event.player.getCards('he').length>0;
    				};
                },
                content:function(){
                    'step 0'
                    event.list={
                        'DE_hundun':{
                            nature:'thunder',
                        },
                        'DE_qiongqi':{
                            nature:'fire',
                        },
                        'DE_taowu':{
                            nature:'ice',
                        },
                        'DE_taotie':{
                            nature:undefined,
                        },
                    };
                    event.bosses=[];
                    for(var s in event.list) {
                        event.bosses.push(s);
                    }
                    player.chooseButton(ui.create.dialog('请选择化形的凶兽',[event.bosses,'character']));
                    'step 1'
                    if(!event.isMine()){
                        result={
                            bool:true,
                            links:[event.bosses.randomGet()],
                        }
                    };
                    if(result.bool) {
                        player.logSkill("DE_jisha");
                        var name=result.links[0];
                        /*player.getCards('h',{name:'sha'}).forEach(card=>{
                            card.init({
                                name:get.name(card),
                                suit:get.suit(card),
                                number:get.number(card),
                                nature:event.list[name].nature,
                            });
                        });*/
                        lib.translate["DE_jisha_"+name]=get.translation(name);
                        player.addTempSkill("DE_jisha_"+name,{player:'phaseUseAfter'});
                    }
                },
                ai:{
                    threaten:1.5,
                },
    			isJisha:function(card){
    			    if(!card||!card.name||!lib.card[card.name].type) return false;
    			    if(get.position(card)!='h'&&get.position(card)!='s') return false;
    			    if(!['trick','delay'].contains(lib.card[card.name].type)&&card.name!='sha') return false;
    			    return true;
    			},
                subSkill:{
                    'audio':{
                        audio:1,
                        sub:true,
                    },
                    'DE_hundun':{
                        audio:'DE_jisha_audio',
                        nature:'thunder',
        				enable:'phaseUse',
        				usable:1,
        				selectCard:2,
        				filterCard:function(card){
        				    return get.color(card)=='black';
        				},
        				check:function(card){
        					return 10-get.value(card);
        				},
        				filterTarget:function(card,player,target){
        					return target!=player;
        				},
        				line:false,
        				multitarget:true,
        				selectTarget:[1,3],
        				onuse:function(result,player){
        				    player.flashAvatar('DE_jisha','DE_hundun');
        				},
        				content:function(){
        					'step 0'
        					event.lastTarget=player;
        					event.allTargets=targets;
        					'step 1'
        					if(event.allTargets.length<1) event.finish();
        					'step 2'
        					event.nextTarget=lib.skill["DE_jisha"].randomGet(event.allTargets,1)[0];
        					event.lastTarget.line(event.nextTarget);
        					event.nextTarget.damage(player,'thunder');
        					'step 3'
        					event.lastTarget=event.nextTarget;
        					event.goto(1);
        				},
        				ai:{
        					order:11,
        					result:{
        						target:function(player,target){
        							return get.damageEffect(target,player,target,'thunder');
        						}
        					},
        				},
        				mod:{
        					cardnature:function(card,player){
        						if(get.info('DE_jisha').isJisha(card)) return 'thunder';
        					},
        					cardname:function(card){
                                if(get.info('DE_jisha').isJisha(card)) return 'sha';
                            },
                            cardnumber:function(card){
                                if(get.info('DE_jisha').isJisha(card)) return 13;
                            },
        					suit:function(card,suit){
                                if(get.info('DE_jisha').isJisha(card)) return 'spade';
                            },
        				},
        				sub:true,
                    },
                    'DE_qiongqi':{
                        audio:'DE_jisha_audio',
                        nature:'fire',
        				enable:'phaseUse',
        				usable:1,
        				selectCard:2,
        				filterCard:function(card){
        				    return get.color(card)=='black';
        				},
        				check:function(card){
        					return 10-get.value(card);
        				},
        				filterTarget:function(card,player,target){
        					return target!=player;
        				},
        				onuse:function(result,player){
        				    player.flashAvatar('DE_jisha','DE_qiongqi');
        				},
        				content:function(){
        					'step 0'
        					target.damage(player,'fire',2);
        				},
        				ai:{
        					order:11,
        					result:{
        						target:function(player,target){
        							return get.damageEffect(target,player,target,'fire');
        						}
        					},
        				},
        				mod:{
        					cardnature:function(card,player){
        						if(get.info('DE_jisha').isJisha(card)) return 'fire';
        					},
        					cardname:function(card){
                                if(get.info('DE_jisha').isJisha(card)) return 'sha';
                            },
                            cardnumber:function(card){
                                if(get.info('DE_jisha').isJisha(card)) return 13;
                            },
        					suit:function(card,suit){
                                if(get.info('DE_jisha').isJisha(card)) return 'spade';
                            },
        				},
                    },
                    'DE_taowu':{
                        audio:'DE_jisha_audio',
                        nature:'ice',
        				enable:'phaseUse',
        				usable:1,
        				selectCard:2,
        				filterCard:function(card){
        				    return get.color(card)=='black';
        				},
        				check:function(card){
        					return 10-get.value(card);
        				},
        				filterTarget:function(card,player,target){
        					return target!=player;
        				},
        				onuse:function(result,player){
        				    player.flashAvatar('DE_jisha','DE_taowu');
        				},
        				content:function(){
        					'step 0'
        					target.damage(player,'ice').set("notDiscard",true);
        					'step 1'
        					target.turnOver(true);
        				},
        				ai:{
        					order:11,
        					result:{
        						target:function(player,target){
        							return get.damageEffect(target,player,target,'ice');
        						}
        					},
        				},
        				mod:{
        					cardnature:function(card,player){
        						if(get.info('DE_jisha').isJisha(card)) return 'ice';
        					},
        					cardname:function(card){
                                if(get.info('DE_jisha').isJisha(card)) return 'sha';
                            },
                            cardnumber:function(card){
                                if(get.info('DE_jisha').isJisha(card)) return 13;
                            },
        					suit:function(card,suit){
                                if(get.info('DE_jisha').isJisha(card)) return 'spade';
                            },
        				},
                    },
                    'DE_taotie':{
                        audio:'DE_jisha_audio',
                        nature:undefined,
        				enable:'phaseUse',
        				usable:1,
        				selectCard:2,
        				filterCard:function(card){
        				    return get.color(card)=='black';
        				},
        				check:function(card){
        					return 10-get.value(card);
        				},
        				filterTarget:function(card,player,target){
        					return target!=player;
        				},
        				onuse:function(result,player){
        				    player.flashAvatar('DE_jisha','DE_taotie');
        				},
        				content:function(){
        					'step 0'
        					target.loseHp();
        					'step 1'
        					if(target.countCards('he')>0) {
        					    var num=Math.min(3,target.countCards('he'));
        					    target.discard(target.getCards('he').randomGets(num));
        					}
        				},
        				ai:{
        					order:11,
        					result:{
        						target:function(player,target){
        							return get.damageEffect(target,player,target);
        						}
        					},
        				},
        				mod:{
        					cardnature:function(card,player){
        						if(get.info('DE_jisha').isJisha(card)) return 'none';
        					},
        					cardname:function(card){
                                if(get.info('DE_jisha').isJisha(card)) return 'sha';
                            },
                            cardnumber:function(card){
                                if(get.info('DE_jisha').isJisha(card)) return 13;
                            },
        					suit:function(card,suit){
                                if(get.info('DE_jisha').isJisha(card)) return 'spade';
                            },
        				},
                    },
                },
            },
            "DE_hundun":{},
            "DE_qiongqi":{},
            "DE_taowu":{},
            "DE_taotie":{},
            "DE_lingwei":{
                group:['DE_lingwei_draw','DE_lingwei_mark','DE_lingwei_wanjian'],
                init:function(player,skill) {
                    get.info("lianzhaoEffect").method(player, 60, 'DE_lingwei');
                },
                comboSkill: true,
                onremove:function(player,skill) {
                    get.info("lianzhaoEffect").method(player, false, 'DE_lingwei');
                },
                subSkill:{
                    mark:{
                        marktext:"战俑",
                        intro:{
                            name:"陵卫军团",
                            content:function (storage,player,skill){
                                var num=Math.min(player.countMark('DE_lingwei_mark'),window.getStrength(4,6,'DE_longdi'));
                                return '军团数量〈'+num+'/'+window.getStrength(4,6,'DE_longdi')+'〉';
                            },
                        },
                        charlotte:true,
                        sub:true,
                    },
                    draw:{
                        audio:1,
                        trigger:{
                            player:"phaseJieshuBegin",
                        },
                        locked:true,
                        forced:true,
                        firstDo:true,
                        filter:function(event,player){
                            if(player.countMark('DE_lingwei_mark')<=player.countCards('h')) return false;
                            return true;
                        },
                        content:function(){
                            var num=player.countMark('DE_lingwei_mark')-player.countCards('h');
                            if(num>0) player.draw(num);
                        },
                        init:function(player){
                            player.addMark('DE_lingwei_mark',window.getStrength(4,6,'DE_longdi'));
                        },
                        ai:{
                            threaten:1.5,
                        },
                        sub:true,
                    },
                    wanjian:{
                        trigger:{
                            player:'phaseZhunbeiBegin',
                        },
        				forced:true,
        				firstDo:true,
        				preHidden:true,
        				filter:function(event,player){
        					return game.filterPlayer(function(current){
        					    return current!=player&&current.countMark('DE_lingwei_mark')>0;
        					}).length;
        				},
        				content:function(){
        					var targets=game.filterPlayer(function(current){
        					    return current!=player&&current.countMark('DE_lingwei_mark')>0;
        					});
        					player.useCard({name:'wanjian'},targets).set('oncard',function(card){
        					    targets.forEach(target=>{
        					        target.addWhen({
        					            firstDo:true,
                                        ai:{
                                            "unequip2":true,
                                        },
                                        init:function(player,skill){
                                            if(!player.storage[skill]) player.storage[skill]=[];
                                        },
                                        onremove:true,
                                        trigger:{
                                            player:["damage","damageCancelled","damageZero"],
                                            source:["damage","damageCancelled","damageZero"],
                                            target:["useCardToExcluded","useCardToEnd"],
                                            global:["useCardEnd"],
                                        },
                                        card:card,
                                        charlotte:true,
                                        filter:function(event,player){
                                            if(!(event.card&&_when.card==event.card&&(event.name!='damage'||event.notLink()))) {
                                                return false;
                                            }else {
                                                return true;
                                            }
                                        },
                                        silent:true,
                                        forced:true,
                                        popup:false,
                                        priority:12,
                                        content:function(){
                                        },
        					        });
        					    });
        					});
        				},
        				ai:{
        					threaten:1.5,
        				},
                        sub:true,
                    },
                },
                enable:'phaseUse',
                filter:function(event,player){
					return player.countMark('DE_lingwei_mark')>0;
				},
                filterTarget:function(card,player,target){
                    if(player==target) return false;
                    if(target.countMark('DE_lingwei_mark')>0) return false;
                    return true;
                },
                audio:2,
                usable:2,
                prompt:"出牌阶段限两次，你可以将一枚“战俑”移至一名其他角色区域内。",
                content:function(){
                    "step 0"
                    player.removeMark('DE_lingwei_mark');
                    "step 1"
                    //target.addSkill('DE_lingwei_mark');
                    target.addMark('DE_lingwei_mark');
                    get.info("lianzhaoEffect").method(player, Math.ceil(60*player.countMark('DE_lingwei_mark')/window.getStrength(4,6,'DE_longdi')), 'DE_lingwei');
                },
                ai:{
                    order:1,
                    result:{
                        target:function(player,target){
                            return get.damageEffect(target,player,target);
                        },
                    },
                },
            },
			//无名
			dcchushan: {
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				filter(event, player) {
					return event.name != "phase" || game.phaseNumber == 0;
				},
				forced: true,
				content: function() {
					'step 0'
					if (!_status.characterlist) lib.skill.pingjian.initList();
					_status.characterlist.randomSort();
					event.characters = _status.characterlist.randomGets(6);
					event.first = event.characters.slice(0, 3);
					event.last = event.characters.slice(3, 6);
					event.skills1 = [];
					event.skills2 = [];
					for (let i of event.first) event.skills1.push(get.character(i, 3).randomGet());
					for (let i of event.last) event.skills2.push(get.character(i, 3).randomGet());
					player
						.chooseControl(event.skills1)
						.set("dialog", [/*无名：*/"请选择姓氏", [event.first, "character"]]);
					'step 1'
					event.gains = [];
					event.surname = event.first[event.skills1.indexOf(result.control)];
					event.gains.add(result.control);
					'step 2'
					player
						.chooseControl(event.skills2)
						.set("dialog", [/*无名：*/"请选择名字", [event.last, "character"]]);
					'step 3'
					event.name = event.last[event.skills2.indexOf(result.control)];
					event.gains.add(result.control);
					let newname = get.characterSurname(event.surname)[0] + get.characterSurname(event.name)[1];
					//if (newname === "某") {
					if (newname.indexOf('某')==0) {
						newname = "无名氏";
						player.chat("终究还是落得藉藉无名...");
					}
					game.broadcastAll(
						(player, name, list) => {
							var ids='dc_noname_'+player.playerid;
							lib.translate[ids]=name;
							lib.character[ids]=lib.character['dc_noname'];
							lib.character[ids][3]=lib.character['dc_noname'][3].concat(event.gains);
							lib.character[ids][4].add('character:dc_noname');
							if (player.name == "dc_noname" || player.name1 == "dc_noname") {
							    player.node.name.innerHTML = name;
							    if(player.name == "dc_noname") player.name=ids;
							    if(player.name1 == "dc_noname") player.name1=ids;
							}
							if (player.name2 == "dc_noname") {
							    player.node.name2.innerHTML = name;
							    player.name2=ids;
							}
							/*player.tempname.addArray(
								list.map(name => {
									while (get.character(name).tempname.length > 0) {
										name = get.character(name).tempname[0];
									}
									return name;
								})
							);*/
						},
						player,
						newname,
						[event.surname, event.name]
					);
					'step 4'
					player.addSkillLog(event.gains);
				},
			},
			//隅泣曹操
			dcjianxiong:{
				audio:'rejianxiong',
				trigger:{
					player:'damageEnd',
				},
				content:function (){
					'step 0'
					if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0],true)=='o'){
						player.gain(trigger.cards,'gain2');
					}
					player.draw(player.countMark('dcjianxiong')+1,'nodelay');
					'step 1'
					if(player.countMark('dcjianxiong')<4) player.addMark('dcjianxiong',1,false);
				},
				marktext:'雄',
				intro:{
					markcount:function(storage,player){
						return player.countMark('dcjianxiong')+1;
					},
					content:function(storage,player){
						return '摸牌数为'+(player.countMark('dcjianxiong')+1);
					},
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function (card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')&&player!=target){
								var cards=card.cards,evt=_status.event;
								if(evt.player==target&&card.name=='damage'&&evt.getParent().type=='card') cards=evt.getParent().cards.filterInD();
								if(target.hp<=1) return;
								if(get.itemtype(cards)!='cards') return;
								for(var i of cards){
									if(get.name(i,target)=='tao') return [1,5+player.countMark('dcjianxiong')/2];
								}
								if(get.value(cards,target)>=(7-player.countMark('dcjianxiong')/2+target.getDamagedHp())) return [1,3+player.countMark('dcjianxiong')/2];
								return [1,0.6+player.countMark('dcjianxiong')/2];
							}
						},
					},
				},
			},
			//缺德刘备
			dcrende:{
				audio:'rerende',
				enable:'phaseUse',
				filter:function(event,player){
					return game.hasPlayer(current=>{
						return lib.skill.dcrende.filterTarget(null,player,current);
					});
				},
				discard:false,
				lose:false,
				delay:false,
				filterTarget:function(card,player,target){
					if(player.getStorage('dcrende_targeted').contains(target)) return false;
					return player!=target&&target.countGainableCards(player,'h')>1;
				},
				content:function(){
					'step 0'
					player.addTempSkill('dcrende_targeted','phaseUseAfter');
					player.markAuto('dcrende_targeted',[target]);
					player.gainPlayerCard(target,'h',true,2);
					'step 1'
					var list=[];
					for(var name of lib.inpile){
						if(get.type(name)!='basic') continue;
						var card={name:name,isCard:true};
						if(lib.filter.cardUsable(card,player,event.getParent('chooseToUse'))&&game.hasPlayer(current=>{
							return player.canUse(card,current);
						})){
							list.push(['基本','',name]);
						}
						if(name=='sha'){
							for(var nature of lib.inpile_nature){
								card.nature=nature;
								if(lib.filter.cardUsable(card,player,event.getParent('chooseToUse'))&&game.hasPlayer(current=>{
									return player.canUse(card,current);
								})){
									list.push(['基本','',name,nature]);
								}
							}
						}
					}
					if(list.length){
						player.chooseButton(['是否视为使用一张基本牌？',[list,'vcard']]).set('ai',function(button){
							var player=_status.event.player;
							var card={name:button.link[2],nature:button.link[3],isCard:true};
							if(card.name=='tao'){
								if(player.hp==1||(player.hp==2&&!player.hasShan())||player.needsToDiscard()){
									return 5;
								}
								return 1;
							}
							if(card.name=='sha'){
								if(game.hasPlayer(function(current){
									return player.canUse(card,current)&&get.effect(current,card,player,player)>0
								})){
									if(card.nature=='fire') return 2.95;
									if(card.nature=='thunder'||card.nature=='ice') return 2.92;
									return 2.9;
								}
								return 0;
							}
							if(card.name=='jiu'){
								return 0.5;
							}
							return 0;
						});
					}
					else{
						event.finish();
					}
					'step 2'
					if(result&&result.bool&&result.links[0]){
						var card={name:result.links[0][2],nature:result.links[0][3],isCard:true};
						player.chooseUseTarget(card,true);
					}
				},
				subSkill:{
					targeted:{
						onremove:true,
						charlotte:true,
					},
				},
				ai:{
					fireAttack:true,
					order:function(skill,player){
						return 10;
					},
					result:{
						target:function(player,target){
							if(target.hasSkillTag('noh')) return -0.1;
							return -2;
						}
					},
					threaten:3,
				},
			},
			//会玩孙权
			dczhiheng:{
				audio:'rezhiheng',
				enable:'phaseUse',
				position:'he',
				filterCard:lib.filter.cardDiscardable,
				discard:false,
				lose:false,
				delay:false,
				selectCard:[1,Infinity],
				filter:function(event,player){
					var skill=player.getStat().skill;
					return !skill.dczhiheng||skill.dczhiheng<1+player.getStorage('dczhiheng_hit').length;
				},
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
						return get.value(card)>=8;
					}))){
						return 1;
					}
					return 6-get.value(card)
				},
				group:'dczhiheng_add',
				content:function(){
					'step 0'
					player.discard(cards);
					event.num=1;
					var hs=player.getCards('h');
					if(!hs.length) event.num=0;
					for(var i=0;i<hs.length;i++){
						if(!cards.contains(hs[i])){
							event.num=0;break;
						}
					}
					'step 1'
					player.draw(event.num+cards.length);
				},
				subSkill:{
					add:{
						audio:2,
						trigger:{
							source:'damageSource',
						},
						forced:true,
						locked:false,
						filter:function(event,player){
							return !player.getStorage('dczhiheng_hit').contains(event.player);
						},
						content:function(){
							player.addTempSkill('dczhiheng_hit');
							player.markAuto('dczhiheng_hit',[trigger.player]);
						}
					},
					hit:{
						charlotte:true,
						onremove:true,
						mark:true,
						marktext:'衡',
						intro:{
							markcount:function(storage,player){
								return player.getStorage('dczhiheng_hit').length;
							},
							content:'本回合已对$造成过伤害',
						},
					}
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.55
				},
			},
			//朱铁雄
			dcbianzhuang:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					var list=[];
					for(var i in lib.skill.dcbianzhuang.characterMap){
						if(Array.isArray(lib.character[i])&&get.is.object(lib.skill[lib.skill.dcbianzhuang.characterMap[i]])) list.push(i);
					}
					var characters=list.randomGets(player.storage.dcbianzhuang_inited?3:2);
					if(!characters.length){
						event.finish();
						return;
					}
					var skills=characters.map(i=>lib.skill.dcbianzhuang.characterMap[i]);
					player.chooseControl(skills).set('dialog',[
						'选择获得一个技能并“变装”',
						[characters,'character']
					]);
					'step 1'
					var skill=result.control;
					player.addTempSkill(skill,'dcbianzhuangAfter');
					for(var i in lib.skill.dcbianzhuang.characterMap){
						if(lib.skill.dcbianzhuang.characterMap[i]==skill){
							player.flashAvatar('dcbianzhuang',i);
							player.popup(skill);
							game.log(player,'“变装”为了','#b'+get.translation(i));
							break;
						}
					}
					player.chooseUseTarget('sha',true,false,'nodistance');
					'step 2'
					if(result.bool&&!player.storage.dcbianzhuang_inited){
						player.addMark('dcbianzhuang',1,false);
						if(player.countMark('dcbianzhuang')>2){
							player.storage.dcbianzhuang_inited=true;
							player.reinit('zhutiexiong','wu_zhutiexiong');
						}
					}
				},
				group:'dcbianzhuang_refresh',
				ai:{
					order:16,
					result:{
						player:function(player){
							if(player.hasValueTarget('sha',false)) return 1;
							return 0;
						},
					},
					effect:{
						target:function(card,player,target,current){
							if(player==target&&player.isPhaseUsing()&&get.type(card)=='equip'){
								if(player.hasValueTarget('sha',false)&&typeof player.getStat('skill').dcbianzhuang=='number') return [1,3];
							}
						},
					},
				},
				subSkill:{
					refresh:{
						trigger:{player:'useCardAfter'},
						forced:true,
						filter:function(event,player){
							return get.type2(event.card,false)=='equip'&&typeof player.getStat('skill').dcbianzhuang=='number';
						},
						content:function(){
							var stat=player.getStat('skill');
							delete stat.dcbianzhuang;
						},
					},
				},
				characterMap:{
					re_zhangchunhua:'rejueqing',
					wangshuang:'spzhuilie',
					re_machao:'retieji',
					ol_weiyan:'xinkuanggu',
					re_lvbu:'wushuang',
					re_huangzhong:'xinliegong',
					ol_pangde:'rejianchu',
					ol_zhurong:'lieren',
					re_masu:'rezhiman',
					re_panzhangmazhong:'reanjian',
					mayunlu:'fengpo',
					re_quyi:'refuqi',
				},
			},
			//小约翰可汗
			dctongliao:{
				audio:3,
				trigger:{player:'phaseDrawAfter'},
				direct:true,
				locked:false,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt('dctongliao'),'选择一张牌标记为“通辽”',function(card,player){
						if(card.hasGaintag('dctongliao')) return false;
						var num=get.number(card,player);
						return !player.hasCard(card2=>{
							return card!=card2&&get.number(card2,player)<num;
						})
					}).set('ai',function(card){
					 var player=_status.event.player;
					 return 1+Math.max(0,player.getUseValue(card,null,true))
					})
					'step 1'
					if(result.bool){
						player.logSkill('dctongliao');
						player.addGaintag(result.cards,'dctongliao');
						game.delayx();
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&card.hasGaintag('dctongliao')) return num+0.6;
					},
				},
				group:'dctongliao_draw',
				subSkill:{
					draw:{
						trigger:{
							player:['loseAfter'],
							global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
						},
						filter:function(event,player){
							var evt=event.getl(player);
							if(!evt||!evt.hs||!evt.hs.length) return false;
							if(event.name=='lose'){
								for(var i in event.gaintag_map){
									if(event.gaintag_map[i].contains('dctongliao')) return true;
								}
								return false;
							}
							return player.hasHistory('lose',function(evt){
								if(event!=evt.getParent()) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('dctongliao')) return true;
								}
								return false;
							});
						},
						forced:true,
						content:function(){
							var num=0;
							var cards=trigger.getl(player).hs,ids=[];
							if(trigger.name=='lose'){
								for(var i in trigger.gaintag_map){
									if(trigger.gaintag_map[i].contains('dctongliao')) ids.push(i);
								}
							}
							else player.getHistory('lose',function(evt){
								if(trigger!=evt.getParent()) return false;
								for(var i in evt.gaintag_map){
									if(evt.gaintag_map[i].contains('dctongliao')) ids.push(i);
								}
							});
							for(var card of cards){
								if(ids.contains(card.cardid)) num+=get.number(card,player);
							}
							if(num>0) player.draw(num);
						}
					},
				},
			},
			dcwudao:{
				audio:3,
				trigger:{player:'useCardAfter'},
				frequent:true,
				filter:function(event,player){
					if(player.getStorage('dcwudao_effect').contains(get.type2(event.card,false))) return false;
					var history=player.getHistory('useCard'),index=history.indexOf(event);
					if(index<1) return false;
					var evt=history[index-1];
					return get.type2(event.card,false)==get.type2(evt.card,false);
				},
				prompt2:function(event){
					return '令你本回合使用'+get.translation(get.type2(event.card,false))+'牌时不可被响应且伤害+1';
				},
				content:function(){
					player.addTempSkill('dcwudao_effect');
					player.markAuto('dcwudao_effect',[get.type2(trigger.card,false)])
				},
				subSkill:{
					effect:{
						trigger:{player:'useCard'},
						forced:true,
						popup:false,
						onremove:true,
						filter:function(event,player){
							return player.getStorage('dcwudao_effect').contains(get.type2(event.card,false));
						},
						content:function(){
							if(get.tag(trigger.card,'damage')>0) trigger.baseDamage++;
							trigger.directHit.addArray(game.filterPlayer());
						},
						intro:{content:'已经悟到了$牌'},
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								if(arg&&arg.card&&player.getStorage('dcwudao_effect').contains(get.type2(arg.card))) return true;
								return false;
							},
						},
					},
				},
			},
			//叶诗文
			clbjisu:{
				audio:2,
				trigger:{player:'phaseJudgeBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check=player.countCards('h')>2;
					player.chooseTarget(get.prompt("clbjisu"),"跳过判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】",function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target,false);
					}).set('check',check).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.effect(target,{name:'sha'},_status.event.player);
					}).setHiddenSkill('clbjisu');
					"step 1"
					if(result.bool){
						player.useCard({name:'sha',isCard:true},result.targets[0],false,'clbjisu');
						trigger.cancel();
						player.skip('phaseDraw');
					}
				}
			},
			clbshuiyong:{
				audio:2,
				trigger:{player:'damageBegin4'},
				filter:function(event){
					return event.nature=='fire';
				},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'fireDamage')) return 'zerotarget';
						}
					}
				}
			},
			//孙杨
			clbshuijian:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				frequent:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					var num=1+Math.floor(player.countCards('e')/2);
					trigger.num+=num;
				},
			},
			//李白
			dclbjiuxian:{
				audio:2,
				enable:'chooseToUse',
				locked:false,
				viewAs:{name:'jiu'},
				check:card=>6.5-get.value(card),
				filterCard:function(card){
					var info=get.info(card);
					if(!info||(info.type!='trick'&&info.type!='delay')) return false;
					if(info.notarget) return false;
					if(info.selectTarget!=undefined){
						if(Array.isArray(info.selectTarget)){
							if(info.selectTarget[0]<0) return !info.toself;
							return info.selectTarget[0]!=1||info.selectTarget[1]!=1;
						}
						else{
							if(info.selectTarget<0) return !info.toself;
							return info.selectTarget!=1;
						}
					}
					return false;
				},
				viewAsFilter:function(player){
					if(_status.connectMode&&player.countCards('hs')>0) return true;
					return player.hasCard(lib.skill.dclbjiuxian.filterCard,'hs')
				},
				ai:{
					order:(item,player)=>get.order({name:'jiu'},player),
				},
				mod:{
					cardUsable:function(card){
						if(card.name=='jiu') return Infinity;
					},
				},
			},
			dcshixian:{
				audio:2,
				trigger:{player:'useCard'},
				//frequent:true,
				//direct:true,
				locked:false,
				filter:function(event,player){
					var history=player.getAllHistory('useCard'),index=history.indexOf(event);
					if(index<1) return false;
					var evt=history[index-1];
					return get.is.yayun(get.translation(event.card.name),get.translation(evt.card.name));
				},
				filterx:function(event){
					if(event.targets.length==0) return false;
					var type=get.type(event.card);
					if(type!='basic'&&type!='trick') return false;
					return true;
				},
				prompt2:function(event,player){
					if(lib.skill.dcshixian.filterx(event)) return '摸一张牌并令'+get.translation(event.card)+'额外结算一次？';
					return '摸一张牌。';
				},
				check:function(event,player){
					if(lib.skill.dcshixian.filterx(event)) return !get.tag(event.card,'norepeat');
					return true;
				},
				content:function(){
					player.draw();
					if(lib.skill.dcshixian.filterx(trigger)){
						trigger.effectCount++;
						game.log(trigger.card,'额外结算一次');
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&!get.tag(card,'norepeat')){
							var history=player.getAllHistory('useCard');
							if(history.length>0){
								var cardx=history[history.length-1].card;
								if(get.is.yayun(get.translation(cardx.name),get.translation(card.name))) return num+20;
							}
						}
					},
				},
				content_old:function(){
					'step 0'
					if(lib.skill.dcshixian.filterx(trigger)){
						player.chooseControl('cancel2').set('choiceList',[
							'摸一张牌',
							'令'+get.translation(trigger.card)+'额外结算一次',
						]).set('prompt',get.prompt('dcsitian'));
					}
					else{
						player.chooseBool('是否发动【诗仙】摸一张牌？').set('frequentSkill','dcshixian');
					}
					'step 1'
					if(result.control){
						if(result.index==0){
							player.logSkill('dcshixian');
							player.draw();
						}
						else if(result.index==1){
							trigger.effectCount++;
						}
					}
					else if(result.bool){
						player.logSkill('dcshixian');
						player.draw();
					}
				},
			},
			//龙王
			dclonggong:{
				audio:2,
				trigger:{player:'damageBegin4'},
				usable:1,
				filter:function(event,player){
					return event.source&&event.source.isIn();
				},
				logTarget:'source',
				check:function(event,player){
					return get.attitude(player,event.source)>=0||player.hp<=Math.max(2,event.num);
				},
				content:function(){
					'step 0'
					trigger.cancel();
					'step 1'
					var card=get.cardPile2(function(card){
						return get.type(card,null,false)=='equip';
					}),source=trigger.source;
					if(card&&source&&source.isIn()) source.gain(card,'gain2');
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player){
						return !player.storage.counttrigger||!player.storage.counttrigger.dclonggong;
					},
				},
			},
			dcsitian:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					var colorx=false,hs=player.getCards('he');
					if(hs.length<2) return false;
					for(var card of hs){
						if(!lib.filter.cardDiscardable(card,player)) continue;
						var color=get.color(card,player);
						if(color=='none') continue;
						if(!colorx) colorx=color;
						else if(colorx!=color) return true;
					}
					return false;
				},
				filterCard:function(card,player){
					var color=get.color(card,player);
					if(color=='none') return false;
					return !ui.selected.cards.length||get.color(ui.selected.cards[0])!=color;
				},
				selectCard:2,
				complexCard:true,
				prompt:'弃置两张颜色不同的牌并改变天气',
				check:(card)=>4.5-get.value(card),
				content:function(){
					'step 0'
					var list=['烈日','雷电','大浪','暴雨','大雾'].randomGets(2);
					player.chooseButton(true,[
						'请选择执行一个天气',
						[list.map(i=>[
							i,
							'<div class="popup text" style="width:calc(100% - 10px);display:inline-block"><div class="skill">【'+i+'】</div><div>'+lib.skill.dcsitian.weathers[i].description+'</div></div>',
						]),'textbutton'],
					]).set('ai',function(button){
						return lib.skill.dcsitian.weathers[button.link].ai(_status.event.player);
					})
					'step 1'
					if(result.bool){
						var choice=result.links[0];
						game.log(player,'将当前天气变更为','#g'+choice);
						var next=game.createEvent('dcsitian_weather',false);
						next.player=player;
						next.setContent(lib.skill.dcsitian.weathers[choice].content);
					}
				},
				ai:{
					order:8,
					result:{
						player:function(player){
							var num1=0,num2=0;
							game.countPlayer(function(current){
								if(player==current) return;
								var att=get.attitude(player,current);
								if(att>0) num1++;
								else num2++;
							});
							return num2-num1;
						},
					},
				},
				subSkill:{
					dawu:{
						trigger:{player:'useCard'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							return get.type2(event.card,false)=='basic';
						},
						content:function(){
							trigger.targets.length=0;
							trigger.all_excluded=true;
							player.removeSkill('dcsitian_dawu');
						},
						mark:true,
						marktext:'雾',
						intro:{
							name:'司天 - 大雾',
							content:'使用的下一张基本牌无效',
						},
					},
				},
				weathers:{
					烈日:{
						description:'你对其他角色造成1点火属性伤害。',
						content:function(){
							var targets=game.filterPlayer(current=>current!=player).sortBySeat();
							player.line(targets,'fire');
							for(var target of targets){
								target.damage('fire');
							}
						},
						ai:function(player){
							var effect=0;
							game.countPlayer(function(current){
								if(current==player) return;
								effect+=get.damageEffect(current,player,player,'fire');
							});
							return effect;
						},
					},
					雷电:{
						description:'你令其他角色各进行一次判定。若结果为♠2~9，则其受到3点无来源雷属性伤害。',
						content:function(){
							'step 0'
							var targets=game.filterPlayer(current=>current!=player).sortBySeat();
							player.line(targets,'thunder');
							event.targets=targets;
							'step 1'
							var target=targets.shift();
							if(!target.isIn()){
								if(targets.length>0) event.redo();
								else{
									event.finish();
									return;
								}
							}
							event.target=target;
							event.judgestr=get.translation('shandian');
							target.judge(lib.card.shandian.judge,event.judgestr).judge2=lib.card.shandian.judge2;
							//game.delayx(1.5);
							'step 2'
							var name='shandian';
							if(event.cancelled&&!event.direct){
								if(lib.card[name].cancel){
									var next=game.createEvent(name+'Cancel');
									next.setContent(lib.card[name].cancel);
									next.cards=[];
									next.card=get.autoViewAs({name:name});
									next.player=target;
								}
							}
							else{
								var next=game.createEvent(name);
								next.setContent(function(){
									if(result.bool==false){
										player.damage(3,'thunder','nosource');
									}
								});
								next._result=result;
								next.cards=[];
								next.card=get.autoViewAs({name:name});
								next.player=target;
							}
							if(targets.length>0) event.goto(1);
						},
						ai:function(player){
							var effect=0;
							game.countPlayer(function(current){
								if(current==player) return;
								effect+=get.damageEffect(current,current,player,'thunder')/5;
							});
							return effect;
						},
					},
					大浪:{
						description:'你弃置其他角色装备区内的所有牌（装备区内没有牌的角色改为失去1点体力）。',
						content:function(){
							'step 0'
							var targets=game.filterPlayer(current=>current!=player).sortBySeat();
							player.line(targets,'green');
							event.targets=targets;
							'step 1'
							var target=targets.shift();
							if(target.isIn()){
								var num=target.countCards('e');
								if(num>0){
								 player.discardPlayerCard(target,true,'e',num)
								}
								else{
								 target.loseHp();
								 game.delayex();
								}
							}
							if(targets.length>0) event.redo();
						},
						ai:function(player){
							var effect=0;
							game.countPlayer(function(current){
								if(current==player) return;
								var es=current.getCards('e');
								if(es.length>0){
									var att=get.attitude(player,current),val=get.value(es,current);
									effect-=Math.sqrt(att)*val;
								}
								else effect+=get.effect(current,{name:'losehp'},player,player);
							});
							return effect;
						},
					},
					暴雨:{
						description:'你弃置一名角色的所有手牌。若其没有手牌，则改为令其失去1点体力。',
						content:function(){
							'step 0'
							player.chooseTarget('请选择【暴雨】的目标','令目标角色弃置所有手牌。若其没有手牌，则其改为失去1点体力。').set('ai',function(current){
								var es=current.getCards('h'),player=_status.event.player;
								if(es.length>0){
									var att=get.attitude(player,current),val=get.value(es,current);
									return -Math.sqrt(att)*val;
								}
								return get.effect(current,{name:'losehp'},player,player);
							})
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.line(target,'green');
								var num=target.countCards('h');
								if(num>0){
								 player.discardPlayerCard(target,true,'h',num)
								}
								else{
								 target.loseHp();
								 game.delayex();
								}
							}
						},
						ai:function(player){
							return Math.max.apply(Math,game.filterPlayer(function(current){
								return current!=player
							}).map(function(current){
								var es=current.getCards('h');
								if(es.length>0){
									var att=get.attitude(player,current),val=get.value(es,current);
									return -Math.sqrt(att)*val;
								}
								return get.effect(current,{name:'losehp'},player,player);
							}));
						},
					},
					大雾:{
						description:'你令所有其他角色获得如下效果：当其使用下一张基本牌时，取消之。',
						content:function(){
							var targets=game.filterPlayer(current=>current!=player).sortBySeat();
							player.line(targets);
							for(var target of targets) target.addSkill('dcsitian_dawu');
						},
						ai:function(player){
							var effect=0;
							game.countPlayer(function(current){
								if(current==player||current.hasSkill('dcsitian_dawu')) return;
								effect-=0.5*get.attitude(player,current);
							});
							return effect;
						},
					},
				},
			},
			//美猴王
			dcjinjing:{
				locked:true,
				ai:{
					viewHandcard:true,
					skillTagFilter:function(player,tag,arg){
						if(player==arg) return false;
					},
				},
			},
			dccibei:{
				audio:2,
				trigger:{source:'damageBegin2'},
				logTarget:'player',
				filter:function(event,player){
					return player!=event.player&&!player.hasHistory('useSkill',function(evt){
						return evt.skill=='dccibei'&&evt.targets.contains(event.player);
					});
				},
				check:function(event,player){
					var target=event.player;
					if(get.attitude(player,target)>=0) return true;
					return (!player.getStat('skill').ruyijingubang_skill||player.storage.ruyijingubang_skill==1);
				},
				content:function(){
					trigger.cancel();
					player.draw(5);
				},
				ai:{
					threaten:4.5,
				},
			},
			dcruyi:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&player.hasEquipableSlot(1)&&!player.getEquips('ruyijingubang').length;
				},
				content:function(){
					var card=game.createCard2('ruyijingubang','heart',9);
					player.$gain2(card,false);
					game.delayx();
					player.equip(card);
				},
				mod:{
					canBeGained:function(card,source,player){
						if(player.getEquips('ruyijingubang').contains(card)) return false;
					},
					canBeDiscarded:function(card,source,player){
						if(player.getEquips('ruyijingubang').contains(card)) return false;
					},
					canBeReplaced:function(card,player){
						if(player.getEquips('ruyijingubang').contains(card)) return false;
					},
					cardname:function(card){
						if(get.subtype(card,false)=='equip1') return 'sha';
					},
					cardnature:function(card){
						if(get.subtypes(card,false).contains('equip1')) return false;
					},
					cardDiscardable:function(card,player){
						if(player.getEquips('ruyijingubang').contains(card)) return false;
					},
					cardEnabled2:function(card,player){
						if(player.getEquips('ruyijingubang').contains(card)) return false;
					},
				},
				group:'dcruyi_blocker',
				subSkill:{
					blocker:{
						trigger:{player:['loseBefore','disableEquipBefore']},
						forced:true,
						filter:function(event,player){
							if(event.name=='disableEquip') return (event.slots.contains('equip1'));
							var cards=player.getEquips('ruyijingubang');
							return event.cards.some(card=>cards.contains(card));
						},
						content:function(){
							if(trigger.name=='lose'){
								trigger.cards.removeArray(player.getEquips('ruyijingubang'));
							}
							else{
								while(trigger.slots.contains('equip1')) trigger.slots.remove('equip1');
							}
						},
					},
				},
			},
			ruyijingubang_skill:{
				equipSkill:true,
				enable:'phaseUse',
				usable:1,
				chooseButton:{
					dialog:function(){
						var dialog=ui.create.dialog(
							'如意金箍棒：选择变化攻击范围',
							[[
								[1,'　　　⒈【杀】无次数限制　　　'],
								[2,'　　　⒉【杀】的伤害值+1　　　'],
							],'tdnodes'],
							[[
								[3,'　　　⒊【杀】不可被响应　　　'],
								[4,'　　　⒋【杀】的目标数+1　　　'],
							],'tdnodes']
						);
						return dialog;
					},
					filter:function(button,player){
						return button.link!=player.storage.ruyijingubang_skill;
					},
					check:function(button){
						if(button.link==1||button.link==3) return 1;
						return 0;
					},
					backup:function(links,player){
						return {
							audio:'dcruyi',
							num:links[0],
							popup:'如意金箍棒',
							content:function(){
								var num=lib.skill.ruyijingubang_skill_backup.num;
								player.storage.ruyijingubang_skill=num;
								var cards=player.getEquips(1);
								for(var card of cards){
									if(card&&card.name=='ruyijingubang'){
										card.storage.ruyijingubang_skill=num;
										game.log(player,'将',card,'的攻击范围改为'+num)
									}
								}
								player.markSkill('ruyijingubang_skill');
							},
						}
					},
				},
				mod:{
					cardUsable:function(card,player,num){
						if(player.storage.ruyijingubang_skill==1&&card.name=='sha') return Infinity;
					},
				},
				ai:{
					order:1,
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return player.storage.ruyijingubang_skill==3;
					},
					effect:{
						player:function(card,player,target,current){
							if(get.tag(card,'damage')>0&&player!=target){
								if(player.getStat('skill').ruyijingubang_skill&&player.storage.ruyijingubang_skill!=1) return;
								if(player.hasSkill('dccibei')&&!player.hasHistory('useSkill',function(evt){
									return evt.skill=='dccibei'&&evt.targets.contains(target);
								})){
									return [1,3];
								}
							}
						},
					},
					result:{
						player:function(player){
							if(player.storage.ruyijingubang_skill==1){
								if(!player.hasSha()) return 1;
								return 0;
							}
							else{
								if(player.hasSha()&&player.getCardUsable('sha')<=0) return 1;
								return 0;
							}
						},
					}
				},
				intro:{
					name:'如意金箍棒',
					content:function(storage){
						if(!storage) storage=3;
						return '<li>攻击范围：'+storage+'<br><li>'+['你使用【杀】无次数限制。','你使用的【杀】伤害+1。','你使用的【杀】不可被响应。','你使用【杀】选择目标后，可以增加一个额外目标。'][storage-1]
					},
				},
				subSkill:{
					backup:{},
				},
			},
			ruyijingubang_effect:{
				equipSkill:true,
				trigger:{player:'useCard2'},
				direct:true,
				locked:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					var num=player.storage.ruyijingubang_skill;
					if(!num||num==1) return false;
					if(num!=4) return true;
					var card=event.card;
					if(game.hasPlayer(function(current){
						return !event.targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&lib.filter.targetInRange(card,player,current);
					})){
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					var num=player.storage.ruyijingubang_skill;
					if(num==4){
						player.chooseTarget(get.prompt('ruyijingubang_effect'),'为'+get.translation(trigger.card)+'额外指定一个目标',function(card,player,target){
							return !_status.event.sourcex.contains(target)&&player.canUse(_status.event.card,target,false);
						}).set('sourcex',trigger.targets).set('ai',function(target){
							var player=_status.event.player;
							return get.effect(target,_status.event.card,player,player);
						}).set('card',trigger.card);
					}
					else{
						player.logSkill('ruyijingubang_effect');
						if(num==2){
							trigger.baseDamage++;
							game.log(trigger.card,'的伤害+1');
						}
						else if(num==3){
							trigger.directHit.addArray(game.filterPlayer());
							game.log(trigger.card,'不可被响应');
						}
						event.finish();
					}
					'step 1'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 2'
					player.logSkill('ruyijingubang_effect',event.targets);
					trigger.targets.addArray(event.targets);
				},
			},
			//涛神
			dcnutao:{
				audio:4,
				trigger:{player:'useCardToPlayer'},
				forced:true,
				group:'dcnutao_add',
				filter:function(event,player){
					if(get.type2(event.card)!='trick') return false;
					return event.isFirstTarget&&event.targets.some(i=>i!=player);
				},
				content:function(){
					var target=trigger.targets.filter(i=>i!=player).randomGet();
					player.line(target,'thunder');
					target.damage('thunder');
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(ui.selected.targets.length) return;
							if(player!=target&&get.type2(card)=='trick') return [1,0,1,-2];
						},
					},
				},
				subSkill:{
					add:{
						audio:'dcnutao',
						trigger:{source:'damageSource'},
						filter:function(event,player){
							return event.nature=='thunder'&&player.isPhaseUsing();
						},
						forced:true,
						content:function(){
							player.addTempSkill('dcnutao_sha','phaseUseAfter');
							player.addMark('dcnutao_sha',1,false);
						}
					},
					sha:{
						charlotte:true,
						onremove:true,
						marktext:'涛',
						intro:{
							content:'此阶段使用【杀】的次数上限+#',
						},
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('dcnutao_sha');
							},
						}
					}
				}
			},
			//哪吒
			dcsantou:{
				audio:2,
				trigger:{player:'damageBegin4'},
				forced:true,
				group:['dcsantou_gain'/*,'dcsantou_chgHp'*/],
				//新增个体力条修改
				init:function(player,skill){
				    var upd=lib.element.player.update.toString();
						    var ret=upd.lastIndexOf('return');
						    window.nezhaHp=function(player){
						        if(player.hasSkill('dcsantou')) {
						            //var player=this;
						            var hps=player.node.hp.childNodes;
						            if(!hps.length) return;
						            //体力样式变成数字了
						            if(player.node.hp.firstChild.innerHTML==undefined) {
						                if(player.node.hp.lastChild && typeof player.node.hp.lastChild.setBackgroundImage == 'function' && player.hp > 0) {
						                    player.node.hp.lastChild.setBackgroundImage('image/nezha_hp/Hp_'+Math.min(player.hp, 3)+'.png');
						                }
						            }else {
    						            for(var i=player.maxHp-player.hp;i<player.maxHp;i++) {
    						                var more=player.maxHp-i;
    						                if(!hps[i] || typeof hps[i].setBackgroundImage != 'function') continue;
    						                //hps[i].style['background-size']='100% 100%';
    						                //if(more>=3) hps[i].style['background']="url('image/nezha_hp/Hp_3.png')";
    						                if(more>=3) hps[i].setBackgroundImage('image/nezha_hp/Hp_3.png');
    						                if(more==2) hps[i].setBackgroundImage('image/nezha_hp/Hp_2.png');
    						                if(more==1) hps[i].setBackgroundImage('image/nezha_hp/Hp_1.png');
    						            }
						            }
						        }
					    	}
					    	var upds='('+upd.slice(0,ret)+'window.nezhaHp(this);'+upd.slice(ret)+')';
					    	window.upds=upds;
					    	//player.update=JSON.parse(upds);
					    	player.update=eval(upds);
						    player.update();
				},
				onremove:function(player,skill){
				    player.update=lib.element.player.update;
				    player.update();
				},
				content:function(){
				//content:function*(event,map){
					//var player=map.player,trigger=map.trigger;
					var source=trigger.source;
					trigger.cancel();
					var hp=player.getHp();
					var lose=false;
					if(hp>=3){
						if(player.hasHistory('useSkill',evt=>{
							var evtx=evt.event;
							return evt.skill=='dcsantou'&&evtx.getTrigger().source==source&&evtx.getParent(2)!=trigger;
						})) lose=true;
					}
					else if(hp==2){
						//if(trigger.hasNature()) lose=true;
						if(trigger.nature) lose=true;
					}
					else if(hp==1){
						if(trigger.card&&get.color(trigger.card)=='red') lose=true;
					}
					if(lose) player.loseHp();
				},
				subSkill:{
					gain:{
						audio:'dcsantou',
						trigger:{
							global:'phaseBefore',
							player:'enterGame',
						},
						forced:true,
						filter:function(event,player){
							if(player.maxHp>=3) return false;
							return (event.name!='phase'||game.phaseNumber==0);
						},
						content:function(){
						//content:function*(event,map){
							//var player=map.player;
							//yield player.gainMaxHp(3-player.maxHp);
							'step 0'
							player.gainMaxHp(3-player.maxHp);
							'step 1'
							var num=3-player.getHp(true);
							if(num>0) player.recover(num);
						}
					},
					/*chgHp:{
					    //game.me.node.hp.childNodes[0].style.opacity=0.3;
					    trigger:{
					        global:'gameDrawBefore',
							player:['enterGame','changeHp'],
						},
						direct:true,
						silent:true,
						content:function(){
						    //if(!window.oldUpdate) window.oldUpdate=player.update();
						    var upd=lib.element.player.update.toString();
						    var ret=upd.lastIndexOf('return');
						    window.nezhaHp=function(player){
						        if(player.hasSkill('dcsantou')) {
						        //var player=this;
						            var hps=player.node.hp.childNodes;
						            for(var i=player.maxHp-player.hp;i<player.maxHp;i++) {
						                var more=player.hp-i;
						                //hps[i].style['background-size']='100% 100%';
						                //if(more>=3) hps[i].style['background']="url('image/nezha_hp/Hp_3.png')";
						                if(more>=3) hps[i].setBackgroundImage('image/nezha_hp/Hp_3.png');
						                if(more==2) hps[i].setBackgroundImage('image/nezha_hp/Hp_2.png');
						                if(more==1) hps[i].setBackgroundImage('image/nezha_hp/Hp_1.png');
						            }
						        }
					    	}
					    	var upds='('+upd.slice(0,ret)+'window.nezhaHp(this);'+upd.slice(ret)+')';
					    	window.upds=upds;
					    	//player.update=JSON.parse(upds);
					    	player.update=eval(upds);
						    player.update();
						},
						sub:true,
					},*/
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.player&&arg.player.hasSkillTag('jueqing',false,player)) return false;
					},
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return;
							if(player._dcsantou_temp) return;
							if(get.tag(card,'damage')){
								const hp=target.getHp();
								if(hp>=3){
									if(target.hasHistory('useSkill',evt=>evt.skill=='dcsantou'&&evt.event.getTrigger().source==player)) return [1,-2];
									else if(get.attitude(player,target)<0){
										if(card.name=='sha') return;
										let sha=false;
										player._dcsantou_temp=true;
										let num=player.countCards('h',card=>{
											if(card.name=='sha'){
												if(sha) return false;
												else sha=true;
											}
											return get.tag(card,'damage')&&player.canUse(card,target)&&get.effect(target,card,player,player)>0;
										});
										delete player._dcsantou_temp;
										if(player.hasSkillTag('damage')){
											num++;
										}
										if(num<2){
											var enemies=player.getEnemies();
											if(enemies.length==1&&enemies[0]==target&&player.needsToDiscard()){
												return;
											}
											return 0;
										}
									}
								}
								else if(hp==2&&get.tag(card,'natureDamage')||hp==1&&get.color(card)=='red'&&get.itemtype(card)=='card') return [1,-2];
								else return 0;
							}
						}
					}
				},
			},
			dcfaqi: {
				audio: 2,
				trigger: { player: 'useCardAfter' },
				init: function (player) {
					if (!player.storage.dcfaqi) player.storage.dcfaqi = [];
				},
				filter: function (event, player) {
					var evt = event.getParent('phaseUse');
					if (!evt || evt.player != player) return false;
					return get.type(event.card) == 'equip';
				},
				content: function () {
					'step 0'
					var list = [];
					//if (!player.storage.dcfaqi) player.storage.dcfaqi = [];
					if(!player.hasSkill('dcfaqi2')) player.storage.dcfaqi = [];
					for (var i of lib.inpile) {
						if (player.storage.dcfaqi.contains(i)) continue;
						var type = get.type(i);
						if (type == 'trick') list.push([type, '', i]);
					}
					if (list.length) {
						player.chooseButton(['法器：视为使用一张普通锦囊牌', [list, 'vcard']], true).set('filterButton', function (button) {
							return player.hasUseTarget({ name: button.link[2], nature: button.link[3], isCard: true }, null, true);
						}).set('ai', function (button) {
							return player.getUseValue({ name: button.link[2], nature: button.link[3], isCard: true });
						});
					}
					else event._result = { bool: false };
					'step 1'
					if (result.bool) {
						player.addTempSkill('dcfaqi2');
						player.storage.dcfaqi.push(result.links[0][2]);
						player.chooseUseTarget(true, { name: result.links[0][2], nature: result.links[0][3], isCard: true });
					}
				},
			},
			dcfaqi2: {
				charlotte: true,
				forced: true,
				popup: false,
				/*onremove: function (player) {
					if(player.storage.dcfaqi) delete player.storage.dcfaqi;
				},*/
			},
			//铜雀台
			spduanzhi:{
				trigger:{target:'useCardToTargeted'},
				logTarget:'player',
				check:function(event,player){
					var target=event.player;
					if(get.attitude(player,target)>=-2||target.countCards('he',function(card){
						return get.value(card,target)>5;
					})<2) return false;
					if(player.hp>2) return true;
					if(player.hp==1){
						if(get.tag(event.card,'respondSha')){
							if(player.countCards('h',{name:'sha'})==0){
								return true;
							}
						}
						else if(get.tag(event.card,'respondShan')){
							if(player.countCards('h',{name:'shan'})==0){
								return true;
							}
						}
						else if(get.tag(event.card,'damage')){
							if(event.card.name=='shuiyanqijunx') return player.countCards('e')==0;
							return true;
						}
					}
					return false;
				},
				filter:function(event,player){
					return player!=event.player&&event.player.countDiscardableCards(player,'he')>0;
				},
				content:function(){
					player.discardPlayerCard(trigger.player,true,'he',[1,2]);
					player.loseHp();
				},
			},
			spduyi:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					event.card=get.cards()[0];
					game.cardsGotoOrdering(event.card);
					player.showCards(event.card);
					'step 1'
					player.chooseTarget('令一名角色获得'+get.translation(card),true).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(_status.event.du){
							if(target.hasSkillTag('nodu')) return 0;
							return -att;
						}
						if(att>0){
							if(target==player) att*=0.6;
							return att+Math.sqrt(Math.max(0,5-target.countCards('h')));
						}
						return att;
					}).set('du',card.name=='du');
					'step 2'
					if(result&&result.bool){
						var target=result.targets[0];
						target.gain(card,'gain2');
						if(get.color(card,false)=='black') target.addTempSkill('spduyi2');
					}
				},
				ai:{
					order:0.1,
					result:{
						player:1,
					},
				},
			},
			spduyi2:{
				mod:{
					cardEnabled2:function(card){
						if(get.position(card)=='h') return false;
					},
				},
				mark:true,
				intro:{
					content:'不能使用或打出手牌',
				},
			},
			spcangni:{
				audio:'zhuikong',
				trigger:{player:'phaseDiscardBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseDrawRecover('###'+get.prompt('spcangni')+'###摸两张牌或回复1点体力，然后将武将牌翻面',2).set('ai',function(){
						return 'cancel2';
					}).logSkill='spcangni';
					'step 1'
					if(result.control!='cancel2') player.turnOver();
				},
				group:['spcangni_gain','spcangni_lose'],
				subSkill:{
					gain:{
						audio:'zhuikong',
						trigger:{
							player:'gainAfter',
							global:'loseAsyncAfter',
						},
						usable:1,
						filter:function(event,player){
							return player.isTurnedOver()&&player!=_status.currentPhase&&event.getg(player).length>0;
						},
						check:function(event,player){
							return get.attitude(player,_status.currentPhase)>0;
						},
						logTarget:function(){
							return _status.currentPhase;
						},
						prompt2:'令该角色摸一张牌',
						content:function(){
							_status.currentPhase.draw();
						},
					},
					lose:{
						audio:'zhuikong',
						trigger:{
							player:'loseAfter',
							global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
						},
						filter:function(event,player){
							if(event.name=='gain'&&player==event.player) return false;
							var evt=event.getl(player);
							if(!evt||!evt.cards2||!evt.cards2.length) return false;
							return player.isTurnedOver()&&player!=_status.currentPhase&&_status.currentPhase.countCards('he')>0;
						},
						check:function(event,player){
							var target=_status.currentPhase;
							var att=get.attitude(player,target);
							if(target.countCards('e',function(card){
								return get.value(card,target)<=0;
							})) return att>0;
							return att<0;
						},
						logTarget:function(){
							return _status.currentPhase;
						},
						prompt2:'令该角色弃置一张牌',
						content:function(){
							_status.currentPhase.chooseToDiscard('he',true);
						},
					},
				},
			},
			spmixin:{
				audio:'qiuyuan',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0&&game.countPlayer()>2;
				},
				filterCard:true,
				filterTarget:lib.filter.notMe,
				position:'h',
				selectTarget:2,
				targetprompt:['拿牌打人','被打'],
				multitarget:true,
				delay:false,
				discard:false,
				lose:false,
				check:function(card){
					if(card.name=='sha') return 4;
					return 4-get.value(card);
				},
				content:function(){
					'step 0'
					player.give(cards,targets[0]);
					'step 1'
					if(!targets[0].isIn()||!targets[1].isIn()){
						event.finish();
						return;
					}
					targets[0].chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'密信：对'+get.translation(targets[1])+'使用一张【杀】，或令其观看并获得你的一张手牌').set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.targetEnabled.apply(this,arguments);
					}).set('sourcex',targets[1]);
					'step 2'
					if(!result.bool&&targets[0].countCards('h')) targets[1].gainPlayerCard(targets[0],'visible','h',true);
				},
				ai:{
					order:1,
					expose:0.1,
					result:{
						target:function(player,target){
							var card=ui.selected.cards[0];
							if(!card) return 0;
							if(ui.selected.targets.length==0){
								if(card.name=='sha'||target.hasSha()) return 2;
								if(get.value(card,target)<0) return -2;
								return 0;
							}
							var target1=ui.selected.targets[0];
							if((card.name=='sha'||target1.hasSha())&&get.effect(target,{name:'sha'},target1,target1)>0) return get.effect(target,{name:'sha'},target1,target);
							return 1.5;
						},
					},
				},
			},
			spfengyin:{
				trigger:{global:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&event.player.hp>=player.hp&&player.countCards('h',function(card){
						if(_status.connectMode) return true;
						return get.name(card,player)=='sha';
					})>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt('spfengyin',trigger.player),'交给该角色一张【杀】并令其跳过出牌阶段和弃牌阶段',function(card,player){
						return get.name(card,player)=='sha';
					}).set('ai',function(card){
						if(_status.event.goon) return 5-get.value(card);
						return 0;
					}).set('goon',function(){
						if(get.attitude(player,trigger.player)>=0) return false;
						if(trigger.player.countCards('hs')<trigger.player.hp) return false;
						return true;
					}());
					'step 1'
					if(result.bool){
						var target=trigger.player;
						player.logSkill('spfengyin',target);
						player.give(result.cards,target,'give');
						target.skip('phaseUse');
						target.skip('phaseDiscard');
					}
				},
			},
			spchizhong:{
				mod:{
					maxHandcardBase:function(player,num){
						return player.maxHp;
					},
				},
				trigger:{global:'dieAfter'},
				forced:true,
				content:function(){
					player.gainMaxHp();
				},
			},
			fenxin_old:{
				audio:'fenxin',
				mode:['identity'],
				trigger:{source:'dieBegin'},
				init:function(player){
					player.storage.fenxin=false;
				},
				intro:{
					content:'limited'
				},
				skillAnimation:'epic',
				animationColor:'fire',
				unique:true,
				limited:true,
				audio:2,
				mark:true,
				filter:function(event,player){
					if(player.storage.fenxin) return false;
					return event.player.identity!='zhu'&&player.identity!='zhu'&&
						player.identity!='mingzhong'&&event.player.identity!='mingzhong';
				},
				check:function(event,player){
					if(player.identity==event.player.identity) return Math.random()<0.5;
					var stat=get.situation();
					switch(player.identity){
						case 'fan':
							if(stat<0) return false;
							if(stat==0) return Math.random()<0.6;
							return true;
						case 'zhong':
							if(stat>0) return false;
							if(stat==0) return Math.random()<0.6;
							return true;
						case 'nei':
							if(event.player.identity=='fan'&&stat<0) return true;
							if(event.player.identity=='zhong'&&stat>0) return true;
							if(stat==0) return Math.random()<0.7;
							return false;
					}
				},
				prompt:function(event,player){
					return '焚心：是否与'+get.translation(event.player)+'交换身份？';
				},
				content:function(){
					game.broadcastAll(function(player,target,shown){
						var identity=player.identity;
						player.identity=target.identity;
						if(shown||player==game.me){
							player.setIdentity();
						}
						target.identity=identity;
					},player,trigger.player,trigger.player.identityShown);
					player.line(trigger.player,'green');
					player.storage.fenxin=true;
					player.awakenSkill('fenxin_old');
				}
			},
			"dccanying":{
                audio:2,
                forced:true,
                lastDo:true,
                trigger:{player:'phaseJieshuBegin'},
                filter:function(event,player){
					var usecard=player.getHistory('useCard').filter(evt=>{
					    if(!evt.targets||evt.targets.filter(current=>current!=player).length<1) return false;
					    return evt.player==player;
					});
					var damage=player.getHistory('sourceDamage').filter(evt=>{
					    if(evt.player==player) return false;
					    return evt.source==player;
					});
					return usecard.length<1&&damage.length<1;
				},
				content:function(){
				    player.addTempSkill('dcyingshen',{player:['phaseBefore','dieAfter']});
				},
            },
			"dcyingshen":{
				mark:true,
				charlotte:true,
                marktext:"隐身",
                locked:false,
                isSneak:true,
				intro:{
					content:'锁定技，你不能成为其他角色的卡牌主动选择的目标'
				},
				mod:{
					targetEnabled:function(card,player,target){
						if(player!=target&&lib.card[card.name].selectTarget!=-1) return false;
					},
				},
                init:function(player){
					game.createCss(`.dcyingshen {
				        opacity: 0.6;
				    }`);
					game.log(player,'获得了','【隐身】');
					player.classList.add('dcyingshen');
				},
                onremove:function(player,skill){
                    player.classList.remove('dcyingshen');
                },
			},
			"dcjuemie":{
			    audio:2,
				enable:'phaseUse',
				filterCard:function(card,player){
				    return get.type2(card) == 'trick';
				},
				filter:function(event,player){
				    return player.countCards('h',{type:'trick'})+player.countCards('h',{type:'delay'})>0;
				},
				usable:1,
				check:function(card){
					return 11-get.value(card);
				},
				filterTarget:function(card,player,target){
					if(target==player) return false;
					return true;
				},
				selectTarget:[1,Infinity],
				selectCard:[1,Infinity],
				multitarget:true,
				line:false,
				content:function(){
					'step 0'
					event.cards=get.cards(5);
					event.list={};
					event.disCards=cards;
					event.getSha=function(num){
					    var cardss=[];
					    for(var i=0;i<num;i++) {
					        cardss.push(game.createCard({name:'sha',suit:'spade',number:13,nature:'thunder'}));
					    }
					    return cardss;
					};
					player.$gain(event.cards);
					game.delay(2);
					'step 1'
					var num=event.cards.filter(card=>get.name(card)=='sha').length+event.disCards.length;
					player.addMark('dcjuemie',num);
					var getNum=Math.floor(5/targets.length)||1;
					event.shaCard=event.getSha(getNum);
					'step 2'
					event.targets=targets.filter(target=>{
					    if(target.isDead()) return false;
					    if(!target.playerid) return false;
					    var num=event.list[target.playerid]||0;
					    num++;
					    return player.countMark('dcjuemie')>=num;
					});
					if(!event.targets.length) {
					    player.clearMark('dcjuemie');
					    event.finish();
					}
					'step 3'
					event.target=event.targets.randomGet();
					var num=event.list[event.target.playerid]||0;
					player.removeMark('dcjuemie',num+1);
					event.list[event.target.playerid]=num+1;
					event.shas=(num==0)?event.shaCard:false;
					/*if(event.shas) {
    					player.$gain2(event.shas);
    					game.delay();
					}*/
					'step 4'
					if(event.shas) player.$give(event.shas,event.target,false);
					event.target.damage(player);
					event.goto(2);
				},
				ai:{
					order:12,
					result:{
						target:function(player,target){
							return -2;
						}
					},
					threaten:1.3
				},
				intro:{
					content:'mark',
				},
			},
			dcpoqiong:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&player.hasEquipableSlot(1)&&!player.getEquips('suiliejingubang').length;
				},
				content:function(){
					var card=game.createCard2('suiliejingubang','spade',9);
					player.$gain2(card,false);
					game.delayx();
					player.equip(card);
				},
				mod:{
					canBeGained:function(card,source,player){
						if(player.getEquips('suiliejingubang').contains(card)) return false;
					},
					canBeDiscarded:function(card,source,player){
						if(player.getEquips('suiliejingubang').contains(card)) return false;
					},
					canBeReplaced:function(card,player){
						if(player.getEquips('suiliejingubang').contains(card)) return false;
					},
					cardname:function(card){
						if(get.subtype(card,false)=='equip1') return 'sha';
					},
					cardnature:function(card){
						if(get.subtypes(card,false).contains('equip1')) return false;
					},
					cardDiscardable:function(card,player){
						if(player.getEquips('suiliejingubang').contains(card)) return false;
					},
					cardEnabled2:function(card,player){
						if(player.getEquips('suiliejingubang').contains(card)) return false;
					},
				},
				group:'dcpoqiong_blocker',
				subSkill:{
					blocker:{
						trigger:{player:['loseBefore','disableEquipBefore']},
						forced:true,
						filter:function(event,player){
							if(event.name=='disableEquip') return (event.slots.contains('equip1'));
							var cards=player.getEquips('suiliejingubang');
							return event.cards.some(card=>cards.contains(card));
						},
						content:function(){
							if(trigger.name=='lose'){
								trigger.cards.removeArray(player.getEquips('suiliejingubang'));
							}
							else{
								while(trigger.slots.contains('equip1')) trigger.slots.remove('equip1');
							}
						},
					},
				},
			},
			suiliejingubang_skill:{
				equipSkill:true,
				usable:1,
				audio:2,
				trigger:{
					player:'useCardAfter',
				},
				forced:true,
				firstDo:true,
				locked:true,
				filter:function(event,player){
					if(!event.card) return false;
					if(event.card.name!='sha') return false;
					if(!player.isPhaseUsing()) return false;
					if(player.getExpansions('suiliejingubang_skill').length>=3) return false;
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i],true)=='o'){
							return true;
						}
					}
				    return false;
				},
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<trigger.cards.length;i++){
						if(get.position(trigger.cards[i],true)=='o'){
							list.push(trigger.cards[i]);
						}
					}
					player.addToExpansion('giveAuto',list,player).gaintag.add('suiliejingubang_skill');
					'step 1'
					player.markSkill('suiliejingubang_skill');
				},
				mod:{
					selectTarget:function(card,player,range){
						if(card.name=='sha'&&range[1]!=-1) range[1]++;
					},
				},
				ai:{
					order:1,
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return player.storage.suiliejingubang_skill==3;
					},
					effect:{
						player:function(card,player,target,current){
							if(get.tag(card,'damage')>0&&player!=target){
								if(player.getStat('skill').suiliejingubang_skill&&player.storage.suiliejingubang_skill!=1) return;
								if(player.hasSkill('dccibei')&&!player.hasHistory('useSkill',function(evt){
									return evt.skill=='dccibei'&&evt.targets.contains(target);
								})){
									return [1,3];
								}
							}
						},
					},
					result:{
						player:function(player){
							if(player.storage.suiliejingubang_skill==1){
								if(!player.hasSha()) return 1;
								return 0;
							}
							else{
								if(player.hasSha()&&player.getCardUsable('sha')<=0) return 1;
								return 0;
							}
						},
					}
				},
				intro:{
					name:'碎裂金箍棒',
					markcount:function(storage,player){
					    return player.getExpansions('suiliejingubang_skill').length||"0";
					},
					mark:function(dialog,storage,player){
						var cards=player.getExpansions('suiliejingubang_skill');
						if(!cards.length) {
						    return "未拥有碎魂";
						}else dialog.addAuto(cards);
					},
				},
				subSkill:{
					backup:{},
				},
			},
			suiliejingubang_unequip:{
				trigger:{
					player:'useCardToPlayered',
				},
				filter:function(event,player){
					if(player.getExpansions('suiliejingubang_skill').length<1) return false;
					return event.card&&event.card.name=='sha';
				},
				equipSkill:true,
				firstDo:true,
				forced:true,
				locked:true,
				silent:true,
				logTarget:'target',
				content:function(){
					trigger.target.addTempSkill('suiliejingubang_unequip2');
					trigger.target.storage.suiliejingubang_unequip2.add(trigger.card);
					trigger.target.markSkill('suiliejingubang_unequip2');
				},
				ai:{
					unequip_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(!player.getExpansions('suiliejingubang_skill').length>=1) return false;
						if(arg&&arg.name=='sha') return true;
						return false;
					}
				}
			},
			suiliejingubang_unequip2:{
				firstDo:true,
				ai:{unequip2:true},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				trigger:{
					player:['damage','damageCancelled','damageZero'],
					source:['damage','damageCancelled','damageZero'],
					target:['shaMiss','useCardToExcluded','useCardToEnd','eventNeutralized'],
					global:['useCardEnd'],
				},
				charlotte:true,
				filter:function(event,player){
					return player.storage.suiliejingubang_unequip2&&event.card&&player.storage.suiliejingubang_unequip2.contains(event.card)&&(event.name!='damage'||event.notLink());
				},
				silent:true,
				forced:true,
				popup:false,
				priority:12,
				content:function(){
					player.storage.suiliejingubang_unequip2.remove(trigger.card);
					if(!player.storage.suiliejingubang_unequip2.length) player.removeSkill('suiliejingubang_unequip2');
				},
				marktext:'※',
				intro:{content:'当前防具技能已失效'},
			},
			suiliejingubang_wushuang:{
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					if(player.getExpansions('suiliejingubang_skill').length<2) return false;
					return event.card.name=='sha'&&event.target&&!event.getParent().directHit.contains(event.target);
				},
				equipSkill:true,
				firstDo:true,
				forced:true,
				locked:true,
				silent:true,
				logTarget:'target',
				content:function(){
					var id=trigger.target.playerid;
					var map=trigger.getParent().customArgs;
					if(!map[id]) map[id]={};
					if(typeof map[id].shanRequired=='number'){
						map[id].shanRequired++;
					}
					else{
						map[id].shanRequired=2;
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(!player.getExpansions('suiliejingubang_skill').length>=2) return false;
						if(arg.card.name!='sha'||arg.target.countCards('h','shan')>1) return false;
					},
				},
			},
			suiliejingubang_damage:{
				trigger:{player:'useCard2'},
				equipSkill:true,
				firstDo:true,
				forced:true,
				locked:true,
				silent:true,
				filter:function(event,player){
					if(player.getExpansions('suiliejingubang_skill').length<3) return false;
					if(!event.card) return false;
					if(event.card.name!='sha') return false;
					return true;
				},
				content:function(){
					trigger.baseDamage++;
					game.log(trigger.card,'的伤害+1');
				},
			},
		},
		characterIntro:{
			DE_malcolmrivers:'在一个漆黑的夜晚，一片无边无际的沙漠荒原，一场肆虐的暴风雨，将矗立在其中的一座汽车旅馆与外界完全隔离，道路不通，通讯中断。11个此前相互完全不了解的陌生人，被迫聚集在这个摇摇欲坠的破汽车旅馆中。拉里·华盛顿是这家汽车旅馆的老板，他的举止异常，似乎潜藏着很多秘密。爱德华·达科塔（艾德）过去曾是个警察，如今则为女影星卡洛琳·苏珊开私家车，他们因在路上撞到了艾莉丝·约克而不得不把她送到了这家汽车旅馆进行治疗。艾莉丝和丈夫乔治及儿子提姆西在开车的途中，车子突然爆胎。他们下车检查时，艾莉丝被艾德的车子撞到了。帕瑞斯·内华达是一个妓女，她在途中找打火机的时候，把一个高跟鞋掉出了车去。结果，正是这个高跟鞋使得艾莉丝的车子爆了胎。艾德想要去找医生，在去的途中，他遇到了路·易斯安那和吉尼，由于雨实在是太大，所以他们只好返回了汽车旅馆。罗德斯·塞姆尔警官押着一个犯人罗伯特·缅因进入了旅馆。这11个人被分在了不同的房间，他们都拿着带有号码的房间钥匙。可怕的事情很快就发生了，女演员卡洛琳·苏珊意外被杀，头颅可怕地出现在了洗衣房的洗衣机里。而且她的手上还有一个带着10号的房间钥匙。随后，路也被人捅死了，他的手上有个带着9号的房间钥匙。大家不禁有些担心，这会不会是按照这个顺序死的啊。他们也发现他们有着共同点：他们的姓氏都是以州名的，出生地相同——内华达州，他们的生日也都在同一天，5月10日。结果证实了他们的猜测。监狱的犯人、乔治以及艾莉丝和吉尼都相继死去，他们正是按照这个顺序死的。而帕瑞斯在警车里面找到了一个犯罪证明，以及原警察的尸体，证明了罗德其实不是警察，他和那个逃犯一起杀死了警察并假冒了警察。罗德知道后非常想要杀帕瑞斯灭口，他杀死了拉里，打伤了艾德。艾德在最后的关头杀死了罗德。最后只有帕瑞斯活了下去 。而当帕瑞斯真正到了她想要去的地方的时候。但其实这些都不是存在的，这11个人（包括小孩）都是麦肯·瑞夫的11个分裂人格。这11个人格互相交替控制着他的身体，而在麦肯·瑞夫幼年时遭受到妓女母亲虐待形成的邪恶人格在现实中的四年前杀害了一幢大楼上的6名住户。在最后被判死刑前夕，他的主治精神病医生马力克发现了一本麦肯·瑞夫小时候的日记，这本日记更加印证了医生对于麦肯·瑞夫杀人是由于他有人格分裂造成的学说，于是医生告知法官要紧急提审麦肯·瑞夫，马力克医生和麦肯·瑞夫在法官面前对话要他消灭身体里所有邪恶的人格，于是上面的故事发生了。没错，他们正是麦肯·瑞夫内心中的十一个人格，其中三个就是那个邪恶灵魂，而那个世界就是麦肯·瑞夫的内心世界，所以这个人的世界观和现实世界稍微有点不同。医生在现实中和其中一个善良勇敢的人格（艾德）对话了，告诉这个人格真相并要他帮助麦肯·瑞夫消灭邪恶的人格。随后善良人格和一个邪恶的人格（罗德）同归于尽，只有一个女性人格（帕瑞斯）逃出了魔掌。故事的结局是隐藏的邪恶人格（提姆西）将帕瑞斯杀害了，原来前面害死六个人格实际上都是提姆西所为。在麦肯·瑞夫小的时候，他的母亲是个妓女，虐待了他，所以提姆西就是麦肯·瑞夫自小培养出的邪恶灵魂的人格。因为麦肯·瑞夫体内存活的人格是邪恶的，所以在影片的最后，这个邪恶的人格杀死了马力克医生和一名狱车司机。',
			DE_longdi:'战国末年，暴君龙帝凭借武力一统六国，施行苛政致民不聊生。为固权长生，他强征战俘修筑长城，痴迷方士五行秘术。命郭明将军遍寻永生法时，昆仑山女术士紫苑被献入宫。因私情败露，郭明遭车裂而亡，紫苑以咒术反噬龙帝，将其与八十万秦军化为兵马俑封于地宫，并预言其苏醒将致神州浩劫。<br>两千载后（1947年），英国隐居的冒险家奥康纳之子亚历克斯于临潼发现龙帝陵，误触机关复活陶俑军团。紫苑之女小林阻挠未果，龙帝棺椁被运至上海。时值奥康纳夫妇护送香格里拉之眼抵沪，军阀杨将军劫夺圣物时永生泉水溅落陶俑，致龙帝彻底苏醒。复活后的龙帝率军阀部队屠戮四方，直指昆仑山永生泉。奥康纳家族被迫与紫苑母女联手追击，终揭晓小林实为郭明后裔的身世真相。<br>最终决战中，龙帝在雪山发动五行之力，以巨型冰锥阻截追兵，借永生泉蜕变为三首应龙恢复真身，于长城下唤醒陶俑大军。紫苑舍命相抗却遭重创，临终前唤醒长城六国亡灵与陶俑血战。奥康纳父子驾战机追至长城，以弑神匕首刺穿龙帝心脏，其躯壳崩解为岩浆，八十万陶俑随之灰飞烟灭。龙帝湮灭之际，六国亡灵化作晨光消散，千年诅咒终告解除。',
			DE_init_longdi:'战国末年，暴君龙帝凭借武力一统六国，施行苛政致民不聊生。为固权长生，他强征战俘修筑长城，痴迷方士五行秘术。命郭明将军遍寻永生法时，昆仑山女术士紫苑被献入宫。因私情败露，郭明遭车裂而亡，紫苑以咒术反噬龙帝，将其与八十万秦军化为兵马俑封于地宫，并预言其苏醒将致神州浩劫。<br>两千载后（1947年），英国隐居的冒险家奥康纳之子亚历克斯于临潼发现龙帝陵，误触机关复活陶俑军团。紫苑之女小林阻挠未果，龙帝棺椁被运至上海。时值奥康纳夫妇护送香格里拉之眼抵沪，军阀杨将军劫夺圣物时永生泉水溅落陶俑，致龙帝彻底苏醒。复活后的龙帝率军阀部队屠戮四方，直指昆仑山永生泉。奥康纳家族被迫与紫苑母女联手追击，终揭晓小林实为郭明后裔的身世真相。<br>最终决战中，龙帝在雪山发动五行之力，以巨型冰锥阻截追兵，借永生泉蜕变为三首应龙恢复真身，于长城下唤醒陶俑大军。紫苑舍命相抗却遭重创，临终前唤醒长城六国亡灵与陶俑血战。奥康纳父子驾战机追至长城，以弑神匕首刺穿龙帝心脏，其躯壳崩解为岩浆，八十万陶俑随之灰飞烟灭。龙帝湮灭之际，六国亡灵化作晨光消散，千年诅咒终告解除。',
			sunwukong:'孙悟空是中国古典小说《西游记》的主人公，也是中国神话中的民俗神祇之一，明代百回本《西游记》书中最为深入人心的形象之一。《西游记》中的孙悟空本是天地生成的一个石猴，率领群猴在花果山水帘洞过着逍遥自在的日子，后来为学习长生的法术而拜菩提祖师为师，学会了七十二变和筋斗云等绝技。后来他前往东海龙宫夺取如意金箍棒，又大闹地府勾了生死簿，惊动天庭，天庭两次派兵征讨花果山，仍然降他不得，只好请西天如来佛祖前来助阵。如来佛祖以五行山将悟空压在山下五百年。五百年后，悟空在观音菩萨的指点下拜唐僧为师，并跟随唐僧前往西天求取真经。路上唐僧又收了猪八戒、沙和尚两个徒弟，众人在途中斩妖除魔、历经磨难，终于取得真经，修成正果。',
			mowukong:'千年之前的花果山中，一只小猴儿应劫而来，破石而出，不敬天地，大闹天宫，下掀地府，三界间历经万年的陈旧规则与秩序眼看就要打破，如来从天而降一掌把小猴压于五指山。如来深知五指山无法困小猴儿一世，最好能以西天之无上佛法将其灵识与三界旧规则秩序融为一体，到那时，若小猴儿仍依宿命而为，只能与三界玉石俱焚。小猴儿洞察先机，看破此局，正欲破局之时，一出真假美猴王的戏码，瞒三界之眼，着六耳猕猴假冒小猴儿随唐玄奘西去取经，而九重天外小猴只能孤零零一人。五百年后，不愿被命运束缚的小猴，由地藏王菩萨亲自护法，助小猴儿意念成形。俺老孙。回来了。尔等来战。',
			longwang:'东海龙王，名敖广，是中国古代神话传说中的龙族之王，为“四海龙王”之首，亦为所有水族之王。统治东海之洋，主宰着雨水、雷鸣、洪灾、海潮、海啸等。曾下陷东京、水淹陈塘关（影视设定）。在中国以东方为尊位，按周易来说东为阳，故此东海龙王排第一便是理所应当。常记载于《西游记》《封神演义》《三教搜神大全》等文学典籍。东海龙王居于东海的海底水晶宫（花果山瀑布顺流可直抵龙宫）。虽为司雨之神，但其保持着较大的特殊自由性，人间降雨由其它江河湖井龙王完成，很少需要东海龙王亲自降雨。海洋管辖之权为龙王所有，天庭一般任其自治。',
			taoshen:'涛神，是司掌钱塘江的神，传说其原型为春秋战国时期的吴国大臣伍子胥。伍子胥从楚国投奔吴国，为吴国立下了汗马功劳；但吴王夫差听信太宰伯嚭的谗言，逐渐疏远了伍子胥，最后还赐死了他。伍子胥含冤身亡，十分悲愤，做出了吴国灭亡的预言后自杀。暴怒的夫差下令用皮革包裹住伍子胥的尸身，在五月五日这天丢进钱塘江。百姓可怜伍子胥忠于吴王却遭受惨死，因此将五月五日这一天定为节日，以此纪念伍子胥，这也是端午节的来历之一。',
			nezha:'哪吒是中国神话中的民俗神之一，在古典名著《西游记》《封神演义》等及其衍生作品中也多有登场。传说中，哪吒是托塔天王李靖的第三子。哪吒之母怀胎三年，而哪吒出生之时是一个肉球，李靖惊怒之下，用剑劈开了肉球，而哪吒就在肉球中。哪吒广泛流传于道教以及民间传说中，被称为三坛海会大神、威灵显圣大将军、中坛元帅等，民间俗称“三太子”，又常冠其父姓，称为“李哪吒”。哪吒的原型为佛教护法神“那咤”。在不同作品的设定中，哪吒的师承关系有所不同，比如《封神演义》中，哪吒是太乙真人的弟子、元始天尊的徒孙，而《西游记》之中，哪吒则是释迦牟尼（如来佛祖）的弟子。在传说中，哪吒的形象常被形容为可化作三头六臂（封神之中是三头八臂），使用多种武器战斗。比如，《封神演义》中哪吒使用的武器（法宝）为乾坤圈、混天绫、火尖枪和风火轮等，西游记中是斩妖剑、砍妖刀、缚妖索、降妖杵、绣球儿、火轮儿。而哪吒第一次死后被其师父（太乙真人或如来佛祖）以莲花和莲藕复活。',
		    libai:'李白（701年2月28日—762年12月），字太白，号青莲居士，祖籍陇西成纪（今甘肃省秦安县），出生于蜀郡绵州昌隆县（一说出生于西域碎叶）。唐朝伟大的浪漫主义诗人，凉武昭王李暠九世孙。<br>为人爽朗大方，乐于交友，爱好饮酒作诗，名列“酒中八仙”。曾经得到唐玄宗李隆基赏识，担任翰林学士，赐金放还，游历全国，先后迎娶宰相许圉师、宗楚客的孙女。唐肃宗即位后，卷入永王之乱，流放夜郎，辗转到达当涂县令李阳冰家。上元二年，去世，时年六十二。<br>著有《李太白集》，代表作有《望庐山瀑布》《行路难》《蜀道难》《将进酒》《早发白帝城》等。李白所作词赋，就其开创意义及艺术成就而言，享有极为崇高的地位，后世誉为“诗仙”，与诗圣杜甫并称“李杜”。',
			sunyang:'孙杨，1991年12月1日生于浙江杭州，男子1500米自由泳世界纪录保持者，男子400米自由泳奥运会纪录保持者。年伦敦奥运会男子400米自由泳、男子1500米自由泳冠军；2016年里约奥运会男子200米自由泳冠军。孙杨是世界泳坛历史上唯一一位男子200米自由泳、男子400米自由泳、男子1500米自由泳的奥运会世锦赛大满贯冠军得主，史上唯一一位男子400米自由泳世锦赛四连冠，唯一一位男子800米自由泳世锦赛三连冠，男子自由泳个人单项金牌数居世界第一。',
			yeshiwen:'叶诗文，1996年3月1日生于浙江省杭州市，中国女子游泳队运动员，女子200米混合泳奥运会纪录保持者。叶诗文是中国泳坛首位集奥运会、长池世锦赛、短池世锦赛、游泳世界杯、亚运会、全运会冠军于一身的运动员，成为中国泳坛首个金满贯。2010年广州亚运会女子200米和400米个人混合泳冠军。2011年上海世界游泳锦标赛女子200米混合泳冠军。2012年伦敦奥运会女子200米混合泳、400米混合泳冠军。2012年伊斯坦布尔短池世锦赛女子200米混合泳冠军。2013年辽宁全运会女子200米、400米混合泳冠军。2016年里约奥运会女子200米混合泳第八名。2017年天津全运会女子200米混合泳冠军。2019年光州世界游泳锦标赛女子200米混合泳亚军、女子400米混合泳亚军。2018年1月30日，当选为浙江省出席第十三届全国人民代表大会代表。2019年7月28日，2019年韩国光州游泳世锦赛，叶诗文以4分32秒07获得亚军。2021年9月19日，叶诗文获得第十四届全国运动会游泳女子4×200米混合泳接力金牌。9月22日，叶诗文获得全运会女子200米个人混合泳银牌。',
			jiben:'吉本（？—218年），东汉末年太医令。建安二十三年春正月，时金祎自以世为汉臣，睹汉祚将移，谓可季兴，乃喟然发愤，遂与太医令本、少府耿纪、司直韦晃、本子邈、邈弟穆等结谋攻许，杀曹公长史王必，南援刘备。后必营，必与典农中郎将严匡讨斩之。在《三国演义》中，吉本在此为吉平或吉太，因字称平，故又唤作吉平。曾参与董承等人刺杀曹操的计划，并企图在为曹操治病时毒死曹操，但被曹操识破而遭处刑。之后其子吉邈和吉穆都参与了由耿纪和韦晃等人所发动的反叛曹操的行动，但都失败被杀。',
			xiaoyuehankehan:'小约翰可汗，知乎答主，<style type="text/css">#xiaoyuehankehan_bilibili:link, #xiaoyuehankehan_bilibili:visited {color:white;}</style><a id="xiaoyuehankehan_bilibili" href="https://space.bilibili.com/23947287" target="_blank">bilibili知识区up主</a>，其视频以介绍冷门国家和名人为主，因其视频极具特色的幽默风格而知名。代表作包括《奇葩小国》系列和《硬核狠人》系列。昵称里的“小约翰”来源于《纸牌屋》里的主角弗朗西斯·厄克特的外号Little John。家乡在内蒙古通辽市，在《奇葩小国》系列视频中，介绍小国面积和人口时，常用通辽市的面积和人口作为计量单位，后简化为T。1T=6万平方公里或287万人（如：阿富汗面积约为64万平方公里，超过10T）。此梗成为该系列视频的特色之一，可汗也因此被称为“通辽可汗”。',
			zhutiexiong:'朱铁雄，福建莆田人，1994年出生，短视频创作者。中国魔法少年的英雄梦，国风变装的热血与浪漫。抖音年度高光时刻作者，国风变装现象级人物。创玩节期间化身三国杀武将，来一场热血变身！',
		},
		characterTitle:{
    		sunyang: '#y逐浪追风',
    		yeshiwen: '#y出水青莲',
    		sp_fuwan: '#y如蹈汤火',
    		sp_fuhuanghou: '#y暗夜密见',
    		sp_jiben: '#y疴龙如鸩',
    		old_lingju: '#y艳艳无双', //铜雀台用的皮肤称号
    		sp_mushun: '#y罹刑不屈',
    		sunwukong: '#y斗战胜佛',
    		longwang: '#y群龙之首',
    		taoshen: '#y怒涛惊天',
    		nezha: '#y三壇海会大神',
    		libai: '#y青莲居士',
    		xiaoyuehankehan: '#y硬核狠人',
    		zhutiexiong: '#y国风变装',
    		wu_zhutiexiong: '#y国风变装',
    		dc_caocao: '#y魏武帝',
    		dc_liubei: '#y乱世的枭雄',
    		dc_sunquan: '#y年轻的贤君',
    		dc_noname: '#y和光同尘',
    		mowukong: '#y叱咤倾峰',
    		DE_longdi: '#y盗墓迷城',
    		DE_init_longdi: '#y盗墓迷城',
    		DE_malcolmrivers: '#y致命身份',
		},
		card:{
			ruyijingubang:{
				fullskin:true,
				derivation:'sunwukong',
				type:'equip',
				subtype:'equip1',
				skills:['ruyijingubang_skill','ruyijingubang_effect'],
				equipDelay:false,
				distance:{
					attackFrom:-2,
					attackRange:(card,player)=>{
						return (player.storage.ruyijingubang_skill||3);
					}
				},
				onEquip:function(){
					if(!card.storage.ruyijingubang_skill) card.storage.ruyijingubang_skill=3;
					player.storage.ruyijingubang_skill=card.storage.ruyijingubang_skill;
					player.markSkill('ruyijingubang_skill');
				},
			},
			suiliejingubang:{
				fullskin:true,
				derivation:'sunwukong',
				type:'equip',
				subtype:'equip1',
				skills:['suiliejingubang_skill','suiliejingubang_unequip','suiliejingubang_wushuang','suiliejingubang_damage'],
				equipDelay:false,
				distance:{
					attackFrom:-1,
				},
				onEquip:function(){
					player.markSkill('suiliejingubang_skill');
				},
			},
		},
		dynamicTranslate:{
			dcjianxiong:function(player){
				return '当你受到伤害后，你可以摸'+get.cnNumber(player.countMark('dcjianxiong')+1)+'张牌并获得对你造成伤害的牌，然后你令此技能摸牌数+1（至多为5）。';
			},
			//修好了，历史使命完成了
			/*DE_benglie:function(player){
			    let info=lib.translate['DE_benglie_info'];
			    if(player.getSkills && player.getSkills(true,false,false)?.length) {
			        player.getSkills(true,false,false).forEach(skill => {
			            if(!lib.skill[skill].spiritCard) return;
			            let adds = lib.translate[skill+'_intro'];
			            if(adds) {
			                info += `<br>🔔<span class="legendtext">【${lib.translate[skill]}】</span><span style="opacity: 0.8;">${adds}</span>`;
			            }
			        });
			    }
			    return info;
			},*/
		},
		translate:{
			old_lingju:'SP灵雎',
			fenxin_old:'焚心',
			fenxin_old_info:'限定技，当你杀死一名非主公角色时，你可以与其交换未翻开的身份牌。（你的身份为主公时不能发动此技能）',
			sp_fuwan:'SP伏完',
			spfengyin:'奉印',
			spfengyin_info:'其他角色的回合开始时，若其体力值不少于你，你可以交给其一张【杀】，令其跳过出牌阶段和弃牌阶段。',
			spchizhong:'持重',
			spchizhong_info:'锁定技，你的手牌上限等于体力上限；其他角色死亡时，你加1点体力上限。',
			sp_fuhuanghou:'SP伏寿',
			spcangni:'藏匿',
			spcangni_info:'弃牌阶段开始时，你可以回复1点体力或摸两张牌，然后将你的武将牌翻面；其他角色的回合内，当你获得（每回合限一次）/失去一次牌时，若你的武将牌背面朝上，你可以令该角色摸/弃置一张牌。',
			spmixin:'密信',
			spmixin_info:'出牌阶段限一次，你可以将一张手牌交给一名其他角色，该角色须对你选择的另一名角色使用一张无距离限制的【杀】，否则你选择的角色观看其手牌并获得其中一张。',
			sp_jiben:'SP吉本',
			spduanzhi:'断指',
			spduanzhi_info:'当你成为其他角色使用的牌的目标后，你可以弃置其至多两张牌，然后失去1点体力。',
			spduyi:'毒医',
			spduyi2:'毒医',
			spduyi_info:'出牌阶段限一次，你可以亮出牌堆顶的一张牌并交给一名角色，若此牌为黑色，该角色不能使用或打出手牌，直到回到结束。',
			sp_mushun:'SP穆顺',
			libai:'李白',
			dclbjiuxian:'酒仙',
			dclbjiuxian_info:'①你可以将额定目标数大于1的锦囊牌当做【酒】使用。②你使用【酒】无次数限制。',
			dcshixian:'诗仙',
			dcshixian_info:'当你使用一张牌时，若此牌的牌名与你于本局游戏使用的上一张牌的牌名押韵，则你可以摸一张牌，并令此牌额外结算一次。',
			taoshen:'涛神',
			dcnutao:'怒涛',
			dcnutao_info:'锁定技。①当你使用锦囊牌指定第一个目标时，若目标角色包含其他角色，你随机对其中一名其他目标角色造成1点雷电伤害。②当你于出牌阶段造成雷电伤害后，你于此阶段使用【杀】的次数上限+1。',
			sunwukong:'孙悟空',
			dcjinjing:'金睛',
			dcjinjing_info:'锁定技。其他角色的手牌对你可见。',
			dccibei:'慈悲',
			dccibei_info:'每回合每名角色限一次。当你对其他角色造成伤害时，你可以防止此伤害，然后摸五张牌。',
			dcruyi:'如意',
			dcruyi_info:'锁定技。①游戏开始时，你将【如意金箍棒】置入装备区。②你手牌区内的武器牌均视为【杀】，且你不是武器牌的合法目标。③当你即将失去【如意金箍棒】或即将废除武器栏时，取消之。④你不能将装备区内的【如意金箍棒】当做其他牌使用或打出。',
			ruyijingubang:'如意金箍棒',
			ruyijingubang_skill:'如意',
			ruyijingubang_skill:'如意金箍棒',
			ruyijingubang_effect:'如意金箍棒',
			ruyijingubang_info:'出牌阶段限一次。你可以将此牌的实际攻击范围调整为1~4内的任意整数。你根据此牌的实际攻击范围拥有对应的效果：<br><li>⑴你使用【杀】无次数限制。<br><li>⑵你使用的【杀】伤害+1。<br><li>⑶你使用的【杀】不可被响应。<br><li>⑷你使用【杀】选择目标后，可以增加一个额外目标。',
			longwang:'龙王',
			dclonggong:'龙宫',
			dclonggong_info:'每回合限一次。当你受到伤害时，你可以防止此伤害，然后令伤害来源从牌堆中获得一张装备牌。',
			nezha:'哪吒',
			dcsantou:'三头',
			dcsantou_info:'锁定技。①当你受到伤害时，防止之，然后若以下有条件成立，你失去1点体力：1.你于本回合此前以此法防止过该伤害来源的伤害，且你的体力值不小于3；2.本次伤害为属性伤害，且你的体力值为2；3.本次伤害的渠道为红色的牌，且你的体力值为1。②游戏开始时，若你的体力上限小于3，你将体力上限加至3并将体力回复至3。',
			dcfaqi:'法器',
			dcfaqi_info:'当你于出牌阶段使用装备牌结算结束后，你视为使用一张本回合未以此法使用过的普通锦囊牌。',
			dcsitian:'司天',
			dcsitian_info:'出牌阶段，你可以弃置两张颜色不同的手牌。系统从所有天气中随机选择两个，你观看这些天气并选择一个执行。<br><li>烈日：你对其他角色依次造成1点火属性伤害。<br><li>雷电：你令其他角色各进行一次判定。若结果为♠2~9，则其受到3点无来源雷属性伤害。<br><li>大浪：你弃置其他角色装备区内的所有牌（装备区内没有牌的角色改为失去1点体力）。<br><li>暴雨：你弃置一名角色的所有手牌。若其没有手牌，则改为令其失去1点体力。<br><li>大雾：你令所有其他角色获得如下效果：当其使用下一张锦囊牌时，取消之。',
			sunyang:'孙杨',
			clbshuijian:'水箭',
			clbshuijian_info:'摸牌阶段开始时，你可以令额定摸牌数+X（X为你装备区内牌数的一半+1，且向下取整）',
			yeshiwen:'叶诗文',
			clbjisu:'急速',
			clbjisu_info:'判定阶段开始前，你可以跳过本回合的判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】。',
			clbshuiyong:'水泳',
			clbshuiyong_info:'锁定技。当你受到火属性伤害时，取消之。',
			xiaoyuehankehan:'小约翰可汗',
			dctongliao:'通辽',
			dctongliao_info:'①摸牌阶段结束时，你可以选择一张点数最小的手牌，将此牌标记为“通辽”。②当你失去一张具有“通辽”标签的牌时，你摸X张牌（X为此牌点数）。',
			dcwudao:'悟道',
			dcwudao_info:'当你使用牌结算结束后，若你使用的上一张牌与此牌类型相同，则你可以于本回合内获得如下效果：当你于回合内使用该类型的牌时，你令此牌不可被响应且伤害值基数+1。',
			zhutiexiong:'朱铁雄',
			wu_zhutiexiong:'朱铁雄',
			dcbianzhuang:'变装',
			dcbianzhuang_info:'①出牌阶段限一次，你可以从系统随机选择的两个技能中获得一个，并视为使用一张【杀】（无距离次数限制），然后失去以此法获得的技能。②当你使用装备牌后，你清空此技能的发动次数记录。③当你发动〖变装①〗后，若你发动〖变装①〗的次数大于2，则你将武将牌变更为诸葛亮，并将系统选择的技能数改为三个。',
			dc_caocao:'经典曹操',
			dc_caocao_ab:'曹操',
			dcjianxiong:'奸雄',
			dcjianxiong_info:'当你受到伤害后，你可以摸一张牌并获得对你造成伤害的牌，然后你令此技能摸牌数+1（至多为5）。',
			dc_liubei:'经典刘备',
			dc_liubei_ab:'刘备',
			dcrende:'仁德',
			dcrende_info:'出牌阶段每名角色限一次。你可以获得一名其他角色两张手牌，然后视为使用一张基本牌。',
			dc_sunquan:'经典孙权',
			dc_sunquan_ab:'孙权',
			dczhiheng:'制衡',
			dczhiheng_info:'①出牌阶段限一次。你可以弃置任意张牌并摸等量的牌，若你在发动〖制衡〗时弃置了所有手牌，则你多摸一张牌。②每回合每名角色限一次。当你对其他角色造成伤害后，你令〖制衡①〗于此回合发动次数上限+1。',
			dc_noname: "无名",
			dcchushan: "出山",
			dcchushan_info: "锁定技，游戏开始时，你获得两个武将的各一个技能，并将你的武将名改为这两个武将的名字组合。",
			
			mowukong:'魔悟空',
			dccanying:'残影',
			dccanying_info:'锁定技。结束阶段，若你于本回合内没有对其他角色使用过牌或造成过伤害，你进入隐身状态直到下个回合开始。',
			dcyingshen:'隐身',
			dcjuemie:'绝灭',
			dcjuemie_info:'出牌阶段限一次，你可弃任意张锦囊牌并指定若干其他角色，执行：①将弃置的牌与牌堆顶5张牌中的【杀】合并为“戮”；②弃置X+1张“戮”（X为目标已受此效果次数），随机令一名指定角色受到1点伤害，循环此项直至无法满足弃牌条件。',
			dcpoqiong:'破穷',
			dcpoqiong_info:'锁定技。①游戏开始时，你将【碎裂金箍棒】置入装备区。②你手牌区内的武器牌均视为【杀】，且你不是武器牌的合法目标。③当你即将失去【碎裂金箍棒】或即将废除武器栏时，取消之。④你不能将装备区内的【碎裂金箍棒】当做其他牌使用或打出。',
			suiliejingubang:'碎裂金箍棒',
			suiliejingubang_skill:'碎裂',
			suiliejingubang_skill:'碎裂金箍棒',
			suiliejingubang_effect:'碎裂金箍棒',
			suiliejingubang_info:'破碎金箍棒：你使用【杀】可以额外指定一个目标。每回合限一次，当你于出牌阶段使用【杀】结算后，你将此牌置于武将牌上，视为“碎魂”。你根据武将牌上“碎魂”的数量拥有以下效果：<br><li>⑴你使用【杀】无视目标防具。<br><li>⑵你使用【杀】需要依次使用两张【闪】响应。<br><li>⑶你使用【杀】造成的伤害+1。',
			
			"DE_longdi":"龙帝",
			"DE_init_longdi":"龙帝",
			"DE_pomu":"破墓",
			"DE_pomu_info":"隐匿技，当你登场后，你将势力变为蜀，获得技能〖秦俑〗、〖碎磷〗，然后当前回合角色获得两张【无懈可击】（♠️K）。",
            "DE_dengdi":"登帝",
            "DE_dengdi_info":window.getStrength("觉醒技，准备阶段，若你拥有“仙魂”的数量达到8张，你失去〖秦俑〗和〖碎磷〗，将所有护甲变成体力值，重置武将牌，将势力变为神，然后获得技能〖祭煞〗和〖陵卫〗。",
            "觉醒技，准备阶段，若你拥有“仙魂”的数量达到6张，你失去〖秦俑〗和〖碎磷〗，将所有护甲变成体力值，重置武将牌，将势力变为神，然后获得技能〖祭煞〗和〖陵卫〗。", 'DE_longdi'),
            "DE_qinyong":"秦俑",
            //"锁定技，①你体力值大于2的部分始终视为护甲值；②结束阶段，你恢复1点体力；③场上一名角色的♠️牌因弃置或判定而进入弃牌堆后，你将此牌置于你的武将牌上，称为“仙魂”（你的“仙魂”最多不能超过8张）。",
            "DE_qinyong_info":window.getStrength("锁定技，①你体力值大于2的部分始终视为护甲值；②结束阶段，你回复1点体力；③当有一张♠️牌不因使用或打出而进入弃牌堆后，你将此牌置于你的武将牌上，称为“仙魂”（你的“仙魂”最多不能超过8张）。",
            "锁定技，①你体力值大于2的部分始终视为护甲值；②结束阶段，你回复1点体力；③当有一张♠️牌不因使用或打出而进入弃牌堆后，你将此牌置于你的武将牌上，称为“仙魂”（你的“仙魂”最多不能超过6张）。", 'DE_longdi'),
            "DE_suilin":"碎磷",
            "DE_suilin_info":window.getStrength("出牌阶段限一次，你可以失去1点护甲，然后对一名其他角色造成1点火属性伤害。",
            "出牌阶段限两次，你可以失去1点护甲，然后对一名其他角色造成1点火属性伤害。", 'DE_longdi'),
            "DE_jisha":"祭煞",
            "DE_jisha_info":`出牌阶段开始时，你可以化身一个凶兽，然后本阶段内，你的锦囊牌和【杀】均视为相应属性的♠️【杀】，本阶段内限一次，你可以弃置两张黑色手牌发动以下属性的效果：
            <br><li>混沌：对至多3名其他角色各造成1点雷电伤害；
            <br><li>穷奇：对一名其他角色造成2点火焰伤害；
            <br><li>梼杌：对一名其他角色造成1点寒冰伤害并令其翻面；
            <br><li>饕餮：令一名其他角色失去1点体力并随机弃置三张牌。`,
            "DE_lingwei":"陵卫",
            "DE_lingwei_info":window.getStrength("锁定技，当你获得此技能时，你获得4枚“战俑”标记：①出牌阶段限两次，你可以将1枚“战俑”移至一名其他角色上；②准备阶段，你视为对区域内有“战俑”的所有其他角色使用一张无视防具的【万箭齐发】；③结束阶段，你将手牌补至“战俑”的数量。",
            "锁定技，当你获得此技能时，你获得6枚“战俑”标记：①出牌阶段限两次，你可以将1枚“战俑”移至一名其他角色上；②准备阶段，你视为对区域内有“战俑”的所有其他角色使用一张无视防具的【万箭齐发】；③结束阶段，你将手牌补至“战俑”的数量。", 'DE_longdi'),
			"DE_hundun":"混沌",
			"DE_qiongqi":"穷奇",
			"DE_taowu":"梼杌",
			"DE_taotie":"饕餮",
			"DE_hundun_info":"出牌阶段限一次，你可以弃置两张黑色手牌，对至多3名其他角色各造成1点雷电伤害。",
			"DE_qiongqi_info":"出牌阶段限一次，你可以弃置两张黑色手牌，对一名其他角色造成2点火焰伤害。",
			"DE_taowu_info":"出牌阶段限一次，你可以弃置两张黑色手牌，对一名其他角色造成1点寒冰伤害并令其翻面。",
			"DE_taotie_info":"出牌阶段限一次，你可以弃置两张黑色手牌，令一名其他角色失去1点体力并随机弃置三张牌。",
			
			"DE_malcolmrivers":"麦肯芮夫",
			"DE_benglie":"崩裂",
            "DE_benglie_info":"使命技，锁定技。①游戏开始时，你获得十一个不同的“人格”，其中随机一个“人格”为隐藏人格（于你不可见）；②准备阶段，你随机展示两个“人格”，然后获得其对应的技能直到下个回合开始；③结束阶段，你需指定一个“人格”，于下个回合开始时对其进行审判，若审判的不是隐藏人格，则隐藏人格会随机抹杀一个其他“人格”，并使角色说出线索；④成功：若你成功审判了隐藏人格，则你的准备阶段可以自主选择展示的人格；⑤失败：若除隐藏人格外你已无其他“人格”，则你进入混乱状态。",
            
			collab_olympic:'OL·伦敦奥运会',
			collab_tongque:'OL·铜雀台',
			collab_duanwu:'新服·端午畅玩',
			collab_decade:'新服·创玩节',
			collab_remake:'新服·共创武将',
			collab_dcdoudizhui: "新服·斗地主",
			collab_luandou: "联动·乱斗西游",
			collab_movie: "联动·电影乱入",
		},
	};
});
