'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	window.helasisyFilter=function(strs,yesno){
	    //如真输入“召唤星云”或者“召唤赫拉西斯”即可把我召唤出来
	    var pass=localStorage.getItem('password_me');
	    if(!pass) pass=' ';
	    var nebula=false;
	    for(var i=0;i<strs.length;i++) {
	        if(pass.indexOf(strs[i])!=-1) {
	            nebula=true;
	            break;
	        }
	    }
	    if(nebula) {
	        return yesno[0];
	    }else {
	        return yesno[1];
	    }
	}
	return {
		name:'extra',
		connect:true,
		connectBanned:['shen_diaochan'],
		characterSort:{
			extra:{
				extra_feng:['shen_guanyu','shen_lvmeng'],
				extra_huo:['shen_zhugeliang','shen_zhouyu'],
				extra_lin:['shen_caocao','shen_lvbu'],
				extra_shan:['shen_zhaoyun','shen_simayi'],
				extra_yin:['shen_liubei','shen_luxun'],
				extra_lei:['shen_ganning','shen_zhangliao'],
				extra_decade:['shen_jiangwei','shen_machao','shen_zhangfei','shen_zhangjiao','shen_dengai','shen_xuzhu','dc_shen_huatuo','dc_shen_huangzhong','shen_pangtong','shen_zhonghui'],
				extra_ol:['ol_zhangliao','shen_caopi','shen_zhenji','shen_sunquan'],
				extra_mobileren:['shen_huatuo','shen_lusu'],
				extra_mobilezhi:['shen_guojia','shen_xunyu'],
				extra_mobilexin:['shen_taishici','shen_sunce'],
				extra_tw:['tw_shen_guanyu','tw_shen_lvmeng'],
				extra_mb: ["xin_shen_simayi", "new_shen_simayi"],
				extra_offline:['shen_huangyueying','shen_diaochan','boss_zhaoyun','shen_dianwei','shen_jiaxu'],
				extra_liuli:['shen_nebula','shen_kk'],
			},
		},
		character:{
			shen_huangyueying: ["female", "shen", 3, ["zc26_cangqiao", "zc26_shenxie", "zc26_huaxiu"],["shu"]],
			shen_zhonghui: ["male", "shen", 4, ["dclinjie", "dcduzhang", "dcjianghuo"]],
            //神鲁肃，感谢 @幻翼幽冥 制作的扩展，代码有参考，有优化
			shen_lusu:['male','shen',3,['dingzhou','tamo','zhimeng'],['wu']],
			//shen_huatuo:['male','shen',3,['wuling','youyi'],['qun']],
			shen_jiaxu:['male','shen',4,['jxlianpo','jxzhaoluan'],['qun']],
			shen_huatuo:['male','shen',3,['mbwuling','mbyouyi'],['qun']],
			shen_dianwei:['male','shen',4,['juanjia','qiexie','cuijue'],['wei']],
			shen_xuzhu:['male','shen',5,['zhengqing','zhuangpo'],['wei']],
			shen_dengai:['male','shen',4,['dctuoyu','dcxianjin','dcqijing'],['wei']],
			shen_zhangjiao:['male','shen',3,['yizhao','sijun','sanshou','tianjie'],['qun']],
			shen_zhangfei:['male','shen',4,['shencai','xunshi'],['shu']],
			new_shen_simayi: ["male", "shen", 4, ["jilin", "yingyou", "yingtian"], ["wei"]],
	        xin_shen_simayi: ["male", "shen", 4, ["xinrenjie", "xinbaiyin", "xinlianpo"], ["wei"]],
            tw_shen_guanyu:['male','shen',4,['twwushen','twwuhun'],['shu']],
			tw_shen_lvmeng:['male','shen',3,['twshelie','twgongxin'],['wu']],
			shen_pangtong:['male','shen',1,['luansuo','fengliao','kunyu'],['shu']],
            dc_shen_huangzhong: ['male', 'shen', 4, ['dclieqiong', 'dczhanjue'], ['shu']],
			dc_shen_huatuo: ["male", "shen", 3, ["jingyu", "lvxin", "huandao"], ["qun"]],
            shen_machao:['male','shen',4,['shouli','hengwu'],['shu']],
			shen_sunquan:['male','shen',4,['junkyuheng','junkdili'],['wu']],
			shen_jiangwei:['male','shen',4,['jiufa','tianren','pingxiang'],['shu']],
			
			shen_sunce:['male','shen','1/6',['yingba','scfuhai','pinghe'],['wu']],
			shen_xunyu:['male','shen',3,['tianzuo','lingce','dinghan'],['wei','clan:颍川荀氏']],
			shen_taishici:['male','shen',4,['dulie','tspowei'],['wu']],
			shen_guojia:['male','shen',3,['reshuishi','stianyi','resghuishi'],['wei']],
			shen_diaochan:['female','shen',3,['meihun','huoxin'],['qun']],
			shen_guanyu:['male','shen',5,window.getStrength(['new_wuhun','wushen'],['pro_wuhun','pro_wushen'],'shen_guanyu'),['shu']],
			shen_zhaoyun:['male','shen',2,window.getStrength(['xinjuejing','relonghun'],['pro_juejing','relonghun'],'shen_zhaoyun'),['shu']],
			shen_zhugeliang:['male','shen',3,window.getStrength(['qixing','kuangfeng','dawu'],['qixing','pro_kuangfeng','pro_dawu'],'shen_zhugeliang'),['shu']],
			shen_lvmeng:['male','shen',3,window.getStrength(['shelie','gongxin'],['pro_shelie','pro_gongxin'],'shen_lvmeng'),['wu']],
			shen_zhouyu:['male','shen',4,window.getStrength(['yeyan','qinyin'],['pro_yeyan','pro_qinyin'],'shen_zhouyu'),['wu']],
			shen_simayi:['male','shen',4,window.getStrength(['renjie','sbaiyin','lianpo'],['pro_renjie','pro_baiyin','lianpo'],'shen_simayi'),['wei']],
			shen_caocao:['male','shen',3,window.getStrength(['new_guixin','feiying'],['pro_guixin','pro_feiying'],'shen_caocao'),['wei']],
			shen_lvbu:['male','shen',5,window.getStrength(['baonu','wumou','ol_wuqian','ol_shenfen'],['pro_baonu','pro_wumou','pro_wuqian','pro_shenfen'],'shen_lvbu'),['qun']],
			
			shen_liubei:["male","shen",6,window.getStrength(["nzry_longnu","nzry_jieying"],["pro_nzry_longnu","pro_nzry_jieying"],'shen_liubei'),["shu"]],
			shen_luxun:["male","shen",4,window.getStrength(["nzry_junlve","nzry_cuike","nzry_dinghuo"],["pro_nzry_junlve","nzry_cuike","pro_nzry_dinghuo"],'shen_luxun'),["wu"]],
			shen_zhangliao:["male","shen",window.getStrength(4,5,'shen_zhangliao'),window.getStrength(["drlt_duorui","drlt_zhiti"],["pro_drlt_duorui","pro_drlt_zhiti"],'shen_zhangliao'),["wei"]],
			shen_ganning:["male","shen","3/6",window.getStrength(["drlt_poxi","drlt_jieying"],["pro_drlt_poxi","pro_drlt_jieying"],'shen_ganning'),["wu"]],
			ol_zhangliao:['male','shen',4,['olduorui','olzhiti'],['wei']],
			shen_caopi:['male','shen',5,['chuyuan','dengji'],['wei']],
			shen_zhenji:['female','shen',3,['shenfu','qixian'],['wei']],
			boss_zhaoyun:['male','shen',1,['boss_juejing','xinlonghun','zhanjiang'],['shu']],
			
			shen_nebula:['female','shen',3,window.helasisyFilter(['召唤星云','召唤赫拉西斯'],[['hlss_xiangxing','hlss_yueyin','hlss_jifeng'],['helasisy_lock']]),['qun',window.helasisyFilter(['召唤星云','召唤赫拉西斯'],['forbidai','unseen'])]],
			shen_kk:['female','shen',3,lib.config.password_kk?['kk_qidong','kk_aiwan','kk_miyou']:['kk_lock'],['qun',lib.config.password_kk?'forbidai':'unseen']],
		},
		characterIntro:{
			shen_guanyu:'关羽，字云长。曾水淹七军、擒于禁、斩庞德、威震华夏，吓得曹操差点迁都躲避，但是东吴偷袭荆州，关羽兵败被害。后传说吕蒙因关羽之魂索命而死。',
			shen_lvmeng:'吕蒙，字子明，汝南富陂人，东吴名将，原有“吴下阿蒙”之贬称，后受孙权劝说，奋发读书，最终成就一代名将。',
			shen_zhouyu:'字公瑾，庐江舒县人。东汉末年名将。有姿貌、精音律，江东有“曲有误，周郎顾”之语。周瑜少与孙策交好，后孙策遇刺身亡，孙权继任。周瑜将兵赴丧，以中护军的身份与长史张昭共掌众事，建安十三年（208年），周瑜率东吴军与刘备军联合，在赤壁击败曹操。此战也奠定了三分天下的基础。',
			shen_zhugeliang:'字孔明、号卧龙，汉族，琅琊阳都人，三国时期蜀汉丞相、杰出的政治家、军事家、发明家、文学家。在世时被封为武乡侯，死后追谥忠武侯，后来东晋政权推崇诸葛亮军事才能，特追封他为武兴王。诸葛亮为匡扶蜀汉政权，呕心沥血、鞠躬尽瘁、死而后已。其代表作有《前出师表》、《后出师表》、《诫子书》等。曾发明木牛流马等，并改造连弩，可一弩十矢俱发。于234年在宝鸡五丈原逝世。',
			shen_jiaxu:'字文和，武威姑臧人。三国时期魏国著名谋士。曾先后担任三国军阀李傕、张绣、曹操的谋士。官至魏国太尉，谥曰肃侯。',
			xin_shen_simayi:'晋宣帝，字仲达，河内温人。曾任职过曹魏的大都督，太尉，太傅。少有奇节，聪明多大略，博学洽闻，伏膺儒教，世之鬼才也。',
			new_shen_simayi:'晋宣帝，字仲达，河内温人。曾任职过曹魏的大都督，太尉，太傅。少有奇节，聪明多大略，博学洽闻，伏膺儒教，世之鬼才也。',
			//shen_nebula:'赫拉西斯，字星云，天地孕育之神女。其姿容绰约，若星辰之光华所凝，得窥其貌者无不神往，终难忘怀。此女精音律，能奏天音，变星辰，呼风唤雨，遮云蔽日，震撼苍生。世时有闻，逢其奏天韵时，众星烁鸣，光华绽放，天地若为其所叹。能汲穹宇之精华，纵日月星辰变化，此术为其独有。其覆掌之下，众星可逆轨而行，日月变辉而照。世人无不叹其术，而众生皆欲一睹芳容。然此女非池中物，其踪飘忽不定，常游于四海，觅知己之音。终，三国归晋之时，与一佚名儒士共遗一著而隐，其题曰：「三国杀·琉璃版」。',
			shen_nebula:'赫拉西斯，字星云，乃玄穹毓秀之神女。其姿皎若云汉萃华，昳丽不可方物，偶现惊鸿之影，见者皆魂授神与，永铭心魄。精于律吕之道，素手调天籁，宫商动则星移斗转，徵羽鸣则风霆骤起，须臾蔽九霄而撼八荒。尝闻其奏钧天广乐时，群星和鸣，光华竞耀，三界为之屏息。尤善摄太虚精魄，纵璇玑玉衡之变，此通天彻地之术，寰宇独绝。素手轻翻，可令参商易轨；广袖漫卷，能使日月交辉。四海八荒慕其神通者众，然欲睹真容犹观镜花水月。此女本姑射仙姿，常御星槎游六合，循太虚遗音觅知心人。及至典午移鼎之际，携佚名鸿儒合撰奇书，名曰《三国杀·琉璃卷》，书成之日，共隐于河汉星渚之间，唯见北斗垂光，空余云台鹤唳。',
			shen_kk:'KK，字猿绳，号璃中客，东海原神县人，自称魏武帝曹操故友“提瓦特游仙”之隔世传人。少时于故纸堆中得《猿神七国奇术录》残卷，通晓元素调和、机关异法，时人目为方士之流。正始初，大将军曹爽广纳奇才，闻其名，征为“猿神都尉”。KK遂以风之翼浮空之理改良军中旗语，依冰雾花寒息之法革新仓储，朝野渐知其能。时帝曹芳年方冲幼，颇好奇异。闻KK有异术，召入清凉殿问以“元素调和之道”。KK对曰：“陛下，猿神之枢，贵乎制衡。今观朝堂气象：岩过刚则廷础易裂，雷过疾则政令骤焚。宜蓄草元素生生之德，徐徐润化，乃得久安。”其言似述异世法则，实暗讽曹爽专权如雷霆压境，司马蛰伏若坚岩待崩，唯以仁政生机方可斡旋。芳虽年幼，闻之怅然，然权不在己，唯默然颔首。高平陵变起，司马氏斥KK之术为“惑乱阴阳”，遂弃官匿迹。后嘉平年间，江湖屡传其踪：或于淮南以水愈疫，或在陇西助商防盗。李丰、张缉谋诛司马师时，曾密访求术，KK拒曰：“元素之力，当润泽生民，非染鼎镬之腥。”赠薄荷清心糕一匣，飘然而去。（以上内容由KK佬设计，赫拉西斯优化，仅供娱乐请勿当真！感谢KK佬的支持和帮助！）',
		},
		characterTitle:{
    		shen_guanyu: '#y鬼神再临',
    		shen_lvmeng: '#y圣光之国士',
    		shen_zhugeliang: '#y赤壁的妖术师',
    		shen_zhouyu: '#y赤壁的火神',
    		shen_caocao: '#y超世之英杰',
    		shen_lvbu: '#y修罗之道',
    		shen_zhaoyun: '#y神威如龙',
    		shen_simayi: '#y晋国之祖',
    		shen_liubei: '#y誓守桃园义',
    		shen_luxun: '#y红莲业火',
    		shen_ganning: '#y江表之力牧',
    		shen_zhangliao: '#y雁门之刑天',
    		shen_jiangwei: '#y怒麟布武',
    		shen_machao: '#y神威天将军',
    		shen_zhangfei: '#y两界大巡环使',
    		shen_zhangjiao: '#y末世的起首',
    		shen_dengai: '#y带砺山河',
    		shen_xuzhu: '#y嗜战的熊罴',
    		dc_shen_huatuo: '#y灵魂的医者',
    		dc_shen_huangzhong: '#y战意破苍穹',
    		shen_pangtong: '#y丹血浴火',
    		shen_zhonghui: '#y荡徊的蜚螭',
    		ol_zhangliao: '#y散敌擒孙',
    		shen_caopi: '#y诰天仰颂',
    		shen_zhenji: '#y洛水凌波',
    		shen_sunquan: '#y坐断东南',
    		shen_huatuo: '#y悬壶济世',
    		shen_lusu: '#y兴吴之邓禹',
    		shen_guojia: '#y星月奇佐',
    		shen_xunyu: '#y洞心先识',
    		shen_taishici: '#y义信天武',
    		shen_sunce: '#y踞江鬼雄',
    		tw_shen_guanyu: '#y魂追弗届',
    		tw_shen_lvmeng: '#y兼资文武',
    		xin_shen_simayi: '#y控权曹魏',
    		new_shen_simayi: '#y权控三势',
    		shen_huangyueying: '#y卧龙的点睛人',
    		shen_diaochan: '#y欲界非天',
    		boss_zhaoyun: '#y天龙乘云',
    		shen_dianwei: '#y襢裼暴虎',
    		shen_jiaxu: '#y文和乱武',
    		shen_nebula:'#y彩蛋武将',
    		shen_kk:'#y彩蛋武将',
		},
		characterReplace:{
			shen_zhangliao:['shen_zhangliao','ol_zhangliao'],
			shen_zhaoyun:['shen_zhaoyun','boss_zhaoyun'],
			shen_guanyu:['shen_guanyu','tw_shen_guanyu'],
			shen_sunquan:['shen_sunquan','junk_sunquan'],
			shen_lvmeng:['tw_shen_lvmeng','shen_lvmeng'],
			shen_machao:['shen_machao','ps_shen_machao'],
			shen_huatuo:['shen_huatuo','dc_shen_huatuo'],
			shen_jiaxu:['zhulu_jiaxu','zombie_jiaxu','shen_jiaxu'],
			shen_simayi: ["shen_simayi", "xin_shen_simayi", "new_shen_simayi"],
		},
		characterFilter:{
			shen_diaochan:function(mode){
				return mode=='identity'||mode=='doudizhu'||mode=='single'||(mode=='versus'&&_status.mode!='standard'&&_status.mode!='three');
			},
			shen_dengai:function(mode){
				if(['boss','chess','tafang','stone'].contains(mode)) return false;
				if(mode=='versus') return _status.mode!='three';
				return true;
			},
		},
		card:{
		},
		skill:{
		    helasisy_lock:{
			    说明:'我是彩蛋 我是彩蛋 我是彩蛋',
			},
			kk_lock:{
			    说明:'我是彩蛋 我是彩蛋 我是彩蛋',
			},
		    //赫拉西斯
		    hlss_yueyin:{
				audio:1,
				derivation:'hlss_yueyin_content',
				group:'hlss_yueyin2',
				unique:true,
				mark:true,
				intro:{
					content:function(storage,player){
					    if(!player.storage.hlss_xiangxing) return '你的武将牌始终正面向上，你的判定区内的牌效果反转。';
						var str='扣减'+(3-player.storage.hlss_xiangxing_count)+'点体力后失去下一枚星；';
						str+='防上「禳星」伤害条件：'+lib.translate['hlss_xiangxing'+player.storage.hlss_xiangxing+'_info']+(lib.skill.hlss_yueyin.skipDamage['x'+player.storage.hlss_xiangxing](player)?'✓':'✘');
						return str;
					},
					markcount:function(storage,player){
					    if(!player.storage.hlss_xiangxing) return 0;
						return Math.max(0,3-player.storage.hlss_xiangxing_count);
					}
				},
				skipDamage:{
					x3:function(player,event){
						return player.storage.hlss_yueyin_damage?.thunder;
						//return event.card&&get.color(event.card)=='black'&&event.nature=='thunder';
					},
					x2:function(player,event){
						return player.storage.hlss_yueyin_damage?.fire;
						//return event.card&&get.color(event.card)=='red'&&event.nature=='fire';
					},
					x1:function(player,event){
						return player.storage.hlss_yueyin_damage?.trick;
						//return !event.nature&&event.card&&get.type(event.card,'trick')=='trick';
					},
				},
				trigger: {
				    player: ['damageBegin4', 'damage'],
				},
				firstDo: true,
				direct: true,
				silent: true,
				init: function(player, skill) {
				    player.storage.hlss_yueyin_damage = {};
				},
				content: function() {
				    if(event.triggername == 'damageBegin4') {
				        trigger.num++;
				    }else {
    				    if(!player.storage.hlss_yueyin_damage) {
    				        player.storage.hlss_yueyin_damage = {};
    				    }
    				    if(trigger.nature) {
    				        player.storage.hlss_yueyin_damage[trigger.nature] = true;
    				    }
    				    if(trigger.card && get.type2(trigger.card)) {
    				        player.storage.hlss_yueyin_damage[get.type2(trigger.card)] = true;
    				    }
				    }
				},
				ai:{
                    effect:{
                        target:function(card,player,target,current){
                            if(!target.hasSkill('hlss_xiangxing') || ![1,2,3].contains(target.storage.hlss_xiangxing || 0)) return;
                            if(lib.skill.hlss_yueyin.skipDamage['x'+target.storage.hlss_xiangxing](target)) return;
                            switch(target.storage.hlss_xiangxing) {
                                case 3:
                                if(card.name=='sha'){
                                    if(card.nature=='thunder') return 2;
                                }
                                if(get.tag(card,'thunderDamage')&&current<0) return 2;
                                case 2:
                                if(card.name=='sha'){
                                    if(card.nature=='fire'||player.hasSkill('zhuque_skill')) return 2;
                                }
                                if(get.tag(card,'fireDamage')&&current<0) return 2;
                                case 1:
                                if(get.type2(card)=='trick'&&get.tag(card,'damage')&&current<0) return 2;
                            }
                            if([1,2].contains(target.storage.hlss_xiangxing || 0) && get.tag(card,'damage') && current<0 && game.hasPlayer(function(current){
                                return current.isIn() && get.attitude(player, current) < 0 && get.attitude(target, current) < 0;
                            })) return [1, 4];
                        },
                    },
                },
			},
			hlss_yueyin2:{
			    unique:true,
				mod:{
					judge:function(player,result){
						if(_status.event.type=='phase'){
							if(result.bool==false){
								result.bool=null;
							}
							else{
								result.bool=false;
							}
						}
					}
				},
				trigger:{player:'turnOverBefore'},
				priority:20,
				forced:true,
				filter:function(event,player){
					return !player.isTurnedOver();
				},
				content:function(){
					trigger.cancel();
					game.log(player,'取消了翻面');
				},
				ai:{
					noturn:true,
					effect:{
						target:function(card,player,target){
							if(get.type(card)=='delay') return 0.5;
						}
					}
				}
			},
			hlss_xiangxing:{
				audio:1,
				unique:true,
				juexingtx:true,
				init:function(player){
					player.storage.hlss_xiangxing=3;
					player.storage.hlss_xiangxing_count=0;
					player.addSkill('hlss_xiangxing3');
					player.update();
					setTimeout(function(){
					if(player.name=='shen_nebula') {
					    player.node.avatar.style.transition='all 1s';
					    player.node.avatar.setBackground('shen_nebula_init','character');
					}
					if(player.name2&&player.name2=='shen_nebula') {
					    player.node.avatar2.style.transition='all 1s';
					    player.node.avatar2.setBackground('shen_nebula_init','character');
					}
					},1000);
				},
				mark:true,
				intro:{
					content:'当前有#枚星'
				},
				group:'hlss_xiangxing_hp',
				trigger:{player:['damageEnd','loseHpEnd']},
				forced:true,
				popup:false,
				content:function(){
					'step 0'
					var num=trigger.num;
					if(num){
						player.storage.hlss_xiangxing_count+=num;
						game.playAudio('skill','hlss_xiangxing1');
					}
					if(player.storage.hlss_xiangxing_count>=3){
						if(player.hasSkill('hlss_yueyin')&&lib.skill.hlss_yueyin.skipDamage['x'+player.storage.hlss_xiangxing](player,trigger)){
							player.logSkill('hlss_yueyin');
							event.goto(3);
						}
						player.storage.hlss_yueyin_damage = {};
						player.removeSkill('hlss_xiangxing'+player.storage.hlss_xiangxing);
						player.storage.hlss_xiangxing--;
						player.storage.hlss_xiangxing_count=0;
						player.updateMarks();
						if(player.storage.hlss_xiangxing){
							player.addSkill('hlss_xiangxing'+player.storage.hlss_xiangxing);
						}
						else{
							player.awakenSkill('hlss_xiangxing');
						}
						player.popup('hlss_xiangxing');
						game.log(player,'失去了一枚星');
					}
					else{
					    //game.playAudio('skill','hlss_xiangxing1');
						player.updateMarks();
						event.finish();
					}
					'step 1'
					//game.playAudio('skill','hlss_yueyin');
					player.logSkill('hlss_xiangxing_epic');
					var list=game.filterPlayer();
					list.remove(player);
					list.sort(lib.sort.seat);
					event.damagePlayers={};
					list.forEach(player=>{
					    event.damagePlayers[player.playerid]=[player,0];
					});
					//暗箱操作：这里最多只能1个队友被击中1点雷伤
					var enemys=game.filterPlayer(function(current){
					    return !current.isFriendsOf(player)&&current!=player;
					});
					//前提：有敌人，没敌人时改回全场
					if(!enemys.length) enemys=game.filterPlayer(function(current){
					    return current!=player;
					});
					event.damagePlayers[list.randomGet().playerid][1]++;
					for(var i=0;i<2;i++){
					    event.damagePlayers[enemys.randomGet().playerid][1]++;
					}
					event.list=list;
					/*var list2=[];
					for(var i=0;i<list.length;i++){
						list2.push(0);
					}
					for(var i=0;i<3;i++){
						list2[Math.floor(Math.random()*list2.length)]++;
					}
					event.list=list;
					event.list2=list2;*/
					'step 2'
					if(event.list.length){
						var target=event.list.shift();
						var num=event.damagePlayers[target.playerid][1];
						target.damage(num,'thunder');
						player.line(target,'thunder');
						event.redo();
					}
					/*if(event.list.length){
						var target=event.list.shift();
						target.damage(event.list2.shift(),'thunder');
						player.line(target,'thunder');
						event.redo();
					}*/
					'step 3'
					if(player.storage.hlss_xiangxing==0){
						//player.maxHp=3;
						player.hp=player.maxHp;
						player.update();
						player.awakenSkill('hlss_xiangxing');
						if(player.name=='shen_nebula') player.node.avatar.setBackground('shen_nebula','character');
					    if(player.name2&&player.name2=='shen_nebula') player.node.avatar2.setBackground('shen_nebula','character');
					}
				},
				subSkill:{
				    epic:{
				        forced:true,
				        skillAnimation:true,
				        animationColor:"thunder",
				        audio:'hlss_yueyin',
				    },
				    hp:{
				        trigger:{
				            player:["changeHp","loseMaxHp","gainMaxHp"],
				        },
				        filter(event,player){
				            return player.getHp()<player.maxHp;
				        },
			         	init:function(player,skill){
						    var upd=lib.element.player.update.toString();
						    var ret=upd.lastIndexOf('return');
						    window.nebulaHp=function(player){
						        if(!player.node) return;
						        if(!player.node.hp) return;
						        if(!player.storage) return;
						        if(player.storage.hlss_xiangxing&&player.storage.hlss_xiangxing>0) {
						            player.node.hp.style.filter='brightness(250%) grayscale(100%)';
						        }else {
						            player.node.hp.style.filter='';
						        }
					    	}
					    	var upds='('+upd.slice(0,ret)+'window.nebulaHp(this);'+upd.slice(ret)+')';
					    	window.upds=upds;
					    	player.update=eval(upds);
						    player.update();
				        },
				        priority:-100,
				        forced:true,
				        forceDie:true,
				        silent:true,
				        charlotte:true,
				        firstDo:true,
				        content:function() {
				            player.hp=player.maxHp;
				            player.update();
				        },
				    },
				},
			},
			hlss_fengqi:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin']},
				direct:true,
				content:function(){
					'step 0'
					if(!player.storage.hlss_fengqi_used) player.storage.hlss_fengqi_used=[];
					var list={basic:[],equip:[],trick:[],delay:[]};
					for(var i=0;i<lib.inpile.length;i++){
						var name=lib.inpile[i];
						var info=lib.card[name];
						if(info.autoViewAs||name=='yuansuhuimie') continue;
						//if(player.storage.hlss_fengqi_used.contains(name)) continue;
						if(lib.filter.cardEnabled({name:name},player)){
							if(!list[info.type]){
								list[info.type]=[];
							}
							list[info.type].push([get.translation(lib.card[name].type),'',name]);
						}
					}
					if(list.trick.length){
					list.trick.sort(lib.sort.name);
					var dialog=ui.create.dialog('风起',[list.trick,'vcard']);
					var rand1=Math.random()<1/3;
					var rand2=Math.random()<0.5;
					var rand3=Math.random()<1/3;
					var rand4=Math.random()<1/3;
					player.chooseButton(dialog).set('filterButton',function(button){
					    var name=button.link[2];
					    if(player.storage.hlss_fengqi_used.contains(name)) return false;
					    return player.hasUseTarget(name);
					}).set('ai',function(button){
						var name=button.link[2];
						var value=get.useful({name:name});
						return value;
						/*if(player.hp<=1){
							switch(name){
								case 'zhiliaobo':return 1;
								case 'dunpaigedang':return 0.8;
								case 'nanman':return 0.5;
								default:return 0;
							}
						}
						if(rand4&&player.countCards('h')<=1){
							switch(name){
								case 'zengbin':return 1;
								case 'wuzhong':return 0.8;
								default:return 0;
							}
						}
						if(player.hasSkill('qinglonglingzhu')){
							if(rand2) return name=='chiyuxi'?0.8:0;
							return name=='jingleishan'?0.8:0;
						}
						if(rand2) return name=='wanjian'?0.8:0;
						return name=='nanman'?0.8:0;*/
					});
					}else {
					    event.finish();
					}
					'step 1'
					if(result.bool){
						player.logSkill('hlss_fengqi');
						player.chooseUseTarget(result.links[0][2],true,false);
						player.storage.hlss_fengqi_used.add(result.links[0][2]);
					}
				},
				ai:{
					threaten:1.5,
				}
			},
			hlss_fengqi2:{
				mod:{
					wuxieRespondable:function(){
						return false;
					}
				}
			},
			hlss_jifeng:{
				audio:'hlss_fengqi',
				trigger:{player:['phaseZhunbeiBegin']},
				direct:true,
				content:function(){
					'step 0'
					if(!player.storage.hlss_jifeng_used) player.storage.hlss_jifeng_used={};
					var list={basic:[],equip:[],trick:[],delay:[]};
					for(var i=0;i<lib.inpile.length;i++){
						var name=lib.inpile[i];
						var info=lib.card[name];
						if(info.autoViewAs||name=='yuansuhuimie') continue;
						//if(player.storage.hlss_jifeng_used.contains(name)) continue;
						if(lib.filter.cardEnabled({name:name},player)){
							if(!list[info.type]){
								list[info.type]=[];
							}
							list[info.type].push([get.translation(lib.card[name].type),'',name]);
						}
					}
					if(list.trick.length){
					list.trick.sort(lib.sort.name);
					var dialog=ui.create.dialog('祭风',[list.trick,'vcard']);
					var rand1=Math.random()<1/3;
					var rand2=Math.random()<0.5;
					var rand3=Math.random()<1/3;
					var rand4=Math.random()<1/3;
					player.chooseButton(dialog).set('filterButton',function(button){
					    var name=button.link[2];
					    if(!player.hasUseTarget(name)) return false;
					    //if(player.storage.hlss_jifeng_used.contains(name)) return false;
					    if(player.storage.hlss_jifeng_used[name]&&player.storage.hlss_jifeng_used[name]==1) {
					        button.style.filter='hue-rotate(180deg)';
					    }
					    return !player.storage.hlss_jifeng_used[name]||player.storage.hlss_jifeng_used[name]<2;
					}).set('ai',function(button){
						var name=button.link[2];
						var value=get.useful({name:name});
						if(player.storage.hlss_jifeng_used[name]) {
						    if(player.storage.hlss_xiangxing&&player.storage.hlss_xiangxing>0) {
						        if(player.storage.hlss_xiangxing_count==2&&!game.hasPlayer(function(current){
						            return current.getHp()<=1&&get.attitude(player,current)>1;
						        })) {
						            value+=1.5;
						        }else {
						            value-=1.5;
						        }
						    }else {
						        if(player.getHp()<4) value-=3;
						        if(player.getHp()<3) value-=3;
						        if(player.getHp()<2) value=-1;
						    }
						}
						return value;
						//get.effect(event.targets2[i],{name:name},player,player);
						/*if(player.hp<=1){
							switch(name){
								case 'zhiliaobo':return 1;
								case 'dunpaigedang':return 0.8;
								case 'nanman':return 0.5;
								default:return 0;
							}
						}
						if(rand4&&player.countCards('h')<=1){
							switch(name){
								case 'zengbin':return 1;
								case 'wuzhong':return 0.8;
								default:return 0;
							}
						}
						if(player.hasSkill('qinglonglingzhu')){
							if(rand2) return name=='chiyuxi'?0.8:0;
							return name=='jingleishan'?0.8:0;
						}
						if(rand2) return name=='wanjian'?0.8:0;
						return name=='nanman'?0.8:0;*/
					});
					}else {
					    event.finish();
					}
					'step 1'
					if(result.bool){
						player.logSkill('hlss_jifeng');
						//player.chooseUseTarget(result.links[0][2],true,false);
						var name=result.links[0][2];
						if(!player.storage.hlss_jifeng_used[name]) {
						    player.chooseUseTarget(result.links[0][2],true,false);
						    player.storage.hlss_jifeng_used[name]=1;
						}else {
						    player.chooseUseTarget(result.links[0][2],true,false).nowuxie=true;;
						    player.storage.hlss_jifeng_used[name]=2;
						    player.loseHp();
						}
						//player.storage.hlss_jifeng_used.add(result.links[0][2]);
					}
				},
				ai:{
					threaten:1.5,
				},
				mod:{
				    targetEnabled:function(card,player,target){
				        if(card.name&&player.storage.hlss_jifeng_used&&player.storage.hlss_jifeng_used[card.name]&&player.storage.hlss_jifeng_used[card.name]>=2&&player!=target) return false;
				    },
				},
			},
			hlss_jifeng2:{
				mod:{
					wuxieRespondable:function(){
						return false;
					}
				}
			},
			hlss_gaiming:{
				trigger:{player:'judgeBefore'},
				direct:true,
				priority:1,
				unique:true,
				content:function(){
					"step 0"
					event.cards=get.cards(7);
					player.chooseCardButton(true,event.cards,'改命：选择一张牌作为你的'+trigger.judgestr+'判定结果').ai=function(button){
						if(get.attitude(player,trigger.player)>0){
							return 1+trigger.judge(button.link);
						}
						if(get.attitude(player,trigger.player)<0){
							return 1-trigger.judge(button.link);
						}
						return 0;
					};
					"step 1"
					if(!result.bool){
						event.finish();
						return;
					}
					player.logSkill('hlss_gaiming',trigger.player);
					var card=result.links[0];
					event.cards.remove(card);
					var judgestr=get.translation(trigger.player)+'的'+trigger.judgestr+'判定';
					event.videoId=lib.status.videoId++;
					event.dialog=ui.create.dialog(judgestr);
					event.dialog.classList.add('center');
					event.dialog.videoId=event.videoId;

					game.addVideo('judge1',player,[get.cardInfo(card),judgestr,event.videoId]);
					for(var i=0;i<event.cards.length;i++) event.cards[i].discard();
					// var node=card.copy('thrown','center',ui.arena).animate('start');
					var node;
					if(game.chess){
						node=card.copy('thrown','center',ui.arena).animate('start');
					}
					else{
						node=player.$throwordered(card.copy(),true);
					}
					node.classList.add('thrownhighlight');
					ui.arena.classList.add('thrownhighlight');
					if(card){
						trigger.cancel();
						trigger.result={
							card:card,
							judge:trigger.judge(card),
							node:node,
							number:get.number(card),
							suit:get.suit(card),
							color:get.color(card),
						};
						if(trigger.result.judge>0){
							trigger.result.bool=true;
							trigger.player.popup('洗具');
						}
						if(trigger.result.judge<0){
							trigger.result.bool=false;
							trigger.player.popup('杯具');
						}
						game.log(trigger.player,'的判定结果为',card);
						trigger.direct=true;
						trigger.position.appendChild(card);
						game.delay(2);
					}
					else{
						event.finish();
					}
					"step 2"
					ui.arena.classList.remove('thrownhighlight');
					event.dialog.close();
					game.addVideo('judge2',null,event.videoId);
					ui.clear();
					var card=trigger.result.card;
					trigger.position.appendChild(card);
					trigger.result.node.delete();
					game.delay();
				},
			},
			//群主Κ
			kk_yuanshen: {
			    trigger:{
                    //player:["useCardToTargeted","phaseZhunbeiBegin"],
                    player:["phaseJieshuBegin"],
                },
                filter:function(event,player,name){
                    //if(name=='phaseZhunbeiBegin') return true;
                    //return event.target&&event.target!=player&&event.target.hasSkill('kk_miyou');
                    return true;
                },
                audio:2,
                firstDo:true,
                forced:true,
                content:function(){
                    'step 0'
                    //if(event.triggername=='phaseZhunbeiBegin') 
                    event.yuanshen=player.hasSkill('kk_miyou');
                    if(event.yuanshen) {
                        game.log(player,'玩原神玩爽了');
                        player.recover();
                    }else {
                        game.log(player,'玩原神玩红温了');
                        var sources=game.filterPlayer(current=>{
                            return current.hasSkill('kk_miyou');
                        });
                        if(sources.length>0) {
                            var source=sources.randomGet();
                            var cards=player.getGainableCards(source, 'h');
        				    if(cards.length>0) {
        				        //var dis=Math.min(num,3);
        				        //player.chooseToDiscard(dis,'h',true,'你卸载了「原神」，需弃置'+get.cnNumber(dis)+'张牌');
        				        //player.discard(cards.randomGets(2));
        				        player.give(cards.randomGets(1),source,true);
        				    }
    				    }
				    }
                    'step 1'
                    if(event.yuanshen) {
                        player.draw();
                    }else {
                        if(player.countCards('h')<1) {
                            game.log(player,'因手机内存不够，不得不卸载原神');
                            player.removeSkill('kk_yuanshen');
                        }
                    }
                },
                mark:true,
                intro:{
                    name:'我玩原神的',
                    content:'你说的对，但是《原神》是由米哈游自主研发的一款全新开放世界冒险游戏。游戏发生在一个被称作「提瓦特」的幻想世界，在这里，被神选中的人将被授予「神之眼」，导引元素之力。你将扮演一位名为「旅行者」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的同伴们，和他们一起击败强敌，找回失散的亲人——同时，逐步发掘「原神」的真相。毫不夸张地说，《原神》是miHoYo迄今为止规模最为宏大，也是最具野心的一部作品。',
                },
                onremove:function(player,skill){
                    var xiezaiYuanShen=game.createEvent('xiezaiYuanShen');
					xiezaiYuanShen.player=player;
					xiezaiYuanShen.skill=skill;
					xiezaiYuanShen.setContent(function(){
					    'step 0'
					    event.trigger('xiezaiYuanShen');
					    player.loseHp(2);
					    'step 1'
					    player.say('原神？卸载！');
					    game.log(player,'卸载了',skill);
					});
                },
                mod:{
                    playerEnabled:function(card,player,target){
                        if(card.name!='sha'&&player!=target) return false;
                    },
                },
                subSkill:{
                    content:{},
                },
			},
			kk_qidong:{
				audio:2,
				//group:['kk_qidong_restore'],
				unique:true,
				enable:'phaseUse',
				limited:true,
				//skillAnimation:'epic',
				//animationColor:'thunder',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				/*init:function(){
				    lib.skill.kk_qidong.skillAnimation=false;
				},*/
				selectTarget:-1,
				multitarget:true,
				multiline:true,
				content:function(){
					'step 0'
				    player.awakenSkill('kk_qidong');
				    player.addSkill('kk_qidong_restore');
				    'step 1'
				    game.playAnimation('extension/标记补充/animation/shenkk.mp4');
				    player.say('奖励你们玩原神');
				    event.targets=targets.sortBySeat(player);
				    'step 2'
				    if(!event.targets.length) {
				        event.finish();
				    }else {
					    event.target=event.targets.shift();
					    game.log(event.target,'正在下载','kk_yuanshen');
					}
					'step 3'
					//target.chooseToDiscard(2,'e',true).delay=false;
					//if(target.countCards('e')) event.delay=true;
					if(event.target.hasSkill('kk_yuanshen')) {
					    game.log('安装失败，',event.target,'已安装过','kk_yuanshen');
					    if(event.target.countGainableCards(player,'he')>0) {
					        var gains=event.target.getGainableCards(player,'he').randomGets(2);
					        player.gain(event.target,gains,'give','bySelf');
					    }
					}else {
					    event.target.say('原神？启动！');
					    event.target.draw();
					    event.target.addSkill('kk_yuanshen');
					    game.log(event.target,'安装了','kk_yuanshen');
					}
					event.goto(2);
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							var basicEff=target.hasSkill('kk_yuanshen')?0:-3;
							return basicEff-Math.min(target.getDiscardableCards(target,'h').length,2);
						}
					}
				},
				subSkill:{
                    restore:{
                        trigger:{
                            global:"die",
                        },
                        firstDo:true,
                        siltent:true,
                        forced:true,
                        charlotte:true,
                        filter:function(event){
                            return event&&event.getParent(3).skill=='kk_yuanshen';
                        },
                        content:function(){
                            player.restoreSkill('kk_qidong');
                            player.removeSkill('kk_qidong_restore');
                        },
                    },
				},
			},
			kk_aiwan: {
			    audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
				    return game.hasPlayer(current=>{
				        return current.hasSkill('kk_yuanshen');
				    });
				},
				filterTarget:function(card,player,target){
					return target.hasSkill('kk_yuanshen');
				},
				//group:'kk_aiwan_draw',
				content:function(){
					'step 0'
					target.say('麻麻再也不让我玩原神了..');
					game.log(player,'令',target,'卸载了','kk_yuanshen');
					event.current=target;
					'step 1'
					target.removeSkill('kk_yuanshen');
					'step 2'
					if(event.current.isIn()||!get.info('kk_aiwan').filter()) {
					    event.finish();
					}else {
					    player.chooseTarget(get.prompt2('kk_aiwan'),function(card,player,target){
					        return target.hasSkill('kk_yuanshen');
					    }).set('ai',function(target){
					        var player=_status.event.player;
					        return -get.attitude(player,target);
					    }).set('player',player);
					}
					'step 3'
					if(result.bool&&result.targets?.length) {
					    event.current=result.targets[0];
					    player.logSkill('kk_aiwan',event.current);
					    event.current.say('麻麻再也不让我玩原神了..');
					    game.log(player,'令',event.current,'卸载了','kk_yuanshen');
					}else {
					    event.finish();
					}
					'step 4'
				    event.current.removeSkill('kk_yuanshen');
				    'step 5'
				    event.goto(2);
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							var basicEff=-2;
							return basicEff-Math.min(target.getDiscardableCards(target,'h').length,2);
						}
					},
					threaten:2,
				},
				subSkill:{
				    draw:{
				        trigger:{
				            global:'xiezaiYuanShen',
				        },
				        frequent:true,
				        content:function(){
				            player.draw();
				        },
				        sub:true,
				    },
				},
			},
			kk_miyou:{
			    trigger:{
		            player:"phaseZhunbeiBegin",
		        },
		        derivation:'kk_yuanshen_content',
		        filter:function(event,player){
		            return player.countCards('h',function(card){
		                return lib.filter.cardDiscardable(card,player);
		            })>=2&&game.hasPlayer(target=>{
		                return target.getDiscardableCards(target,'h').length>=2||!target.hasSkill('kk_yuanshen');
		            });
		        },
		        audio:2,
		        direct:true,
		        content:function(){
		            "step 0"
		            player.chooseCardTarget({
						filterCard:function(card,player){
							return lib.filter.cardDiscardable(card,player);
						},
						filterTarget:function(card,player,target){
							return target.getDiscardableCards(target,'h').length>=2||!target.hasSkill('kk_yuanshen');
						},
						selectCard:2,
						selectTarget:[1,2],
						position:'h',
						ai1:function(card){
							return 9-get.value(card);
						},
						ai2:function(target){
							var eff=-4,player=_status.event.player,att=get.attitude(player,target);
							if(target.getDiscardableCards(target,'h').length>=2) eff=-3;
							if(att>0) {
							    if(target.hasSkill('kk_miyou')&&!target.hasSkill('kk_yuanshen')) return 2*att;
							    return -1;
							}
							return eff*att;
						},
						prompt:get.prompt2('kk_miyou'),
					});
					"step 1"
					if(result.bool&&result.cards?.length&&result.targets?.length){
						player.logSkill('kk_miyou',result.targets);
						player.discard(result.cards);
						event.targets=result.targets.sortBySeat(player);
						
					}else {
					    event.finish();
					}
					"step 2"
					if(event.targets?.length) {
					    event.target=event.targets.shift();
					    var chooseList=[];
						if(!event.target.hasSkill('kk_yuanshen')) chooseList.push('下载原神');
						if(event.target.getDiscardableCards(event.target,'h').length>=2) chooseList.push('坚决不玩');
						event.target.chooseControl(chooseList)
            				.set("choiceList", ['下载原神，获得“原神”标记', '坚决不玩，弃置两张手牌并失去1点体力'])
            				.set("prompt", "米游：请选择一项")
            				.set("ai", () => {
            					if(_status.event.chooseList.contains("下载原神")&&_status.event.target.hasSkill('kk_miyou')) return "下载原神";
            					if(_status.event.chooseList.contains("坚决不玩")) return "坚决不玩";
            					return "下载原神";
            				})
            				.set("target",event.target)
            				.set("chooseList",chooseList);
    				}else {
    				    event.finish();
    				}
					"step 3"
					if(result.control=='下载原神') {
					    game.log(event.target,'正在下载','kk_yuanshen');
					    event.target.addSkill('kk_yuanshen');
					    event.target.say('原神？启动！');
					    game.log(event.target,'安装了','kk_yuanshen');
					    event.goto(2);
					}else if(result.control=='坚决不玩') {
					    event.target.say('打死我也不玩原神！');
					    game.log(event.target,'坚决不玩','kk_yuanshen','已经道心破碎了');
					    event.target.chooseToDiscard(2,'h',true,'米游：请弃置两张手牌，以展示你坚决不玩原神的决心');
					}else {
					    event.goto(2);
					}
					"step 4"
					event.target.loseHp();
					"step 5"
					event.goto(2);
		        },
			},
			//神黄忠
		    dclieqiong: {
				audio: 2,
				trigger: {
					source: 'damageSource',
				},
				forced: true,
				locked: false,
				filter: function (event, player) {
					return event.source != event.player && event.player.isIn();
				},
				//不用了移植到本体作为基本函数了game.playAnimationTitle
				animation: function(show) {
                    const IMG_ID = 'dynamic-animation-image';
                    let imgElement = document.getElementById(IMG_ID);
                
                    // 定义动画关键帧（只会注入一次）
                    if (!document.getElementById('animation-styles')) {
                        const style = document.createElement('style');
                        style.id = 'animation-styles';
                        style.textContent = `
                            @keyframes scaleIn {
                                0% {
                                    opacity: 0;
                                    transform: translate(-70%, -50%);
                                }
                                100% {
                                    opacity: 1;
                                    transform: scale(1) translate(-50%, -50%);
                                }
                            }
                
                            @keyframes fadeOut {
                                0% {
                                    opacity: 1;
                                    transform: translate(-50%, -50%);
                                }
                                100% {
                                    opacity: 0;
                                    transform: translate(-30%, -50%);
                                }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                
                    if (show) {
                        // 如果已存在则先移除旧元素
                        if (imgElement) imgElement.remove();
                
                        // 创建图片元素
                        imgElement = document.createElement('img');
                        imgElement.id = IMG_ID;
                        imgElement.src = `${lib.assetURL}extension/标记补充/animation/shenhuangzhong_effect.png`;
                        
                        // 基础样式
                        Object.assign(imgElement.style, {
                            opacity: '0',
                            position: 'fixed',
                            left: '68%',
                            top: '50%',
                            height: 'auto',
                            width: '70%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: '16',
                            transition: 'left 4s ease',
                            pointerEvents: 'none'
                        });
                
                        // 应用入场动画
                        imgElement.style.animation = 'scaleIn 0.3s ease forwards';
                        document.body.appendChild(imgElement);
                        setTimeout(function() {
                            imgElement.style.left = '77%';
                        }, 10);
                    } else {
                        // 移除元素时执行渐出动画
                        if (imgElement) {
                            imgElement.style.animation = 'fadeOut 0.3s ease forwards';
                            imgElement.addEventListener('animationend', () => {
                                imgElement.remove();
                            }, { once: true });
                        }
                    }
                },
				content: function () {
					'step 0'
					var target = trigger.player;
					event.target = target, event.position = {};
					if(lib.config.effect_shen_huangzhong!='none') {
					    if (target.hasSkill('dclieqiong_hit')) event.position.head = {
    					    name:'天冲',
    					    info:`令${get.translation(target)}失去当前所有体力值。`,
    					    pos:{male:[95,40],female:[85,35]},
    					};
    					event.position.upperLimb = {
    				    	name:'力烽',
    				    	info:`令${get.translation(target)}随机弃置半数手牌（向上取整）。`,
    				    	pos:{male:[30,175],female:[145,165]},
    					};
    					event.position.lowerLimb = {
    				    	name:'地机',
    				    	info:`令${get.translation(target)}下一次受到的伤害+1直到其回合结束。`,
    				    	pos:{male:[130,280],female:[55,280]},
    					};
    					event.position.thorax = {
    				    	name:'中枢',
    				    	info:`令${get.translation(target)}使用的下一张牌无效直到其回合结束。`,
    				    	pos:{male:[115,100],female:[60,80]},
    					};
    					event.position.belly = {
    					    name:'气海',
    					    info:`令${get.translation(target)}不能使用或打出红桃牌直到其回合结束。`,
    					    pos:{male:[95,160],female:[75,135]},
    					};
					    //var title=game.changeToGoldTitle('裂穹');
					    var title='可选择击伤'+get.translation(target)+'的一个部位';
        				event.dialog = ui.create.dialog(title, "hidden");
    				    var buttons=[];
    				    for(var i in event.position) {
    				        var name='shen_huangzhong_yw_'+i;
    				        lib.card[name]={
                                fullskin:true,
                                opacity:1,
                                textShadow:'black 0 0 2px',
                            };
                            lib.translate[name]='击伤'+event.position[i].name;
                            lib.translate[name+'_info']=event.position[i].info;
    				        var button=game.createCard({name:name,suit:'　',number:'　'});
    				        buttons.push(button);
    				    }
    				    var sex=[];
    				    if(target.hasSex('male')) sex.push('male');
    				    if(target.hasSex('female')) sex.push('female');
    				    if(sex.length<1) sex.push('male');
    				    var theSex=sex.randomGet();
    				    var body=ui.create.div('img');
    				    body.style.backgroundSize='contain';
        				body.style.backgroundPosition='top center';
        				body.style.backgroundRepeat='no-repeat';
    				    body.style.height='400px';
                        body.style.width='200px';
                        body.style.backgroundImage='url('+lib.assetURL+'image/skill_yiwu/yiwu_'+theSex+'.png)';
                        var inform=ui.create.div(body);
                        inform.style.height='auto';
                        inform.style.width='250px';
                        inform.style.left='110%';
                        inform.style.top='50%';
                        inform.style.transform='translate(0, -50%)';
                        inform.style.lineHeight='20px';
                        inform.style.textAlign='left';
                        var getInfStr=function(name) {
                            var infstr='';
                            for(var s in event.position) {
                                var opa=name==s?1:0.6;
                                infstr+="<span style='opacity: "+opa+"'>"+event.position[s].name+'：'+event.position[s].info+'</span><br><br>';
                            }
                            return infstr+'<br><br>';
                        }
                        inform.innerHTML=getInfStr();
                        event.dialog.add(body);
    				    event.dialog.add([buttons,"vcard"]);
    				    game.uncheck();
    				    game.check();
    				    player.chooseButton(2).set('selectButton',function(){
                            if(!ui.selected.buttons.length) return 2;
                            return [0,1];
                        }).set('dialog',event.dialog).set('filterButton',function(button){
                            var head='shen_huangzhong_yw_';
                            var name=button.name.slice(head.length);
                            //实锤了就是这个整的点击范围溢出
                            button.node.image.style.pointerEvents='none';
                            button.classList.add('noselect');
        				    button.style.backgroundSize='contain';
        				    button.style.transition='all 0.2s ease';
        				    button.style.boxShadow='none';
        				    button.style.position='absolute';
        				    button.style.left=(event.position[name].pos[theSex][0]-20)+'px';
        				    button.style.top=(event.position[name].pos[theSex][1]-20)+'px';
                            button.style.height='40px';
                            button.style.width='40px';
                            //button.style.transform='translate('+event.position[name].pos[0]+'px, '+event.position[name].pos[0]+'px)';
                            if(!button.initStyle) {
        				        button.initStyle=true;
                                button.innerText='';
        				        body.appendChild(button);
            				    var creatText=function(str) {
            				    	var string=ui.create.div(button);
            				    	string.innerHTML=str;
            				    	string.style.width='60px';
            				    	string.style.height='15px';
            				    	string.style.left='13px';
            				    	string.style.top='calc( 50% - 7.5px)';
            				    	string.style.fontSize='15px';
            				    	string.style.textAlign='center';
            				    	string.style.color='rgba(255,255,200,0.8)';
            				    	return string;
            				    };
            				    button.strText=creatText(event.position[name].name);
        				    }
                            if(ui.selected.buttons.length) {
                                var head='shen_huangzhong_yw_';
                                inform.innerHTML=getInfStr(ui.selected.buttons[0].name.slice(head.length));
                                if(ui.selected.buttons.contains(button)) {
                                    button.style.transform='scale(1.3)';
                                    button.style.opacity=1;
                                    button.style.backgroundImage='url('+lib.assetURL+'image/skill_yiwu/yiwu_click_chosen.png)';
                                    button.strText.style.left='25px';
                                }else {
                                    button.style.transform='scale(1.25)';
                                    button.style.opacity=0.6;
                                    button.style.backgroundImage='url('+lib.assetURL+'image/skill_yiwu/yiwu_click.png)';
                                    button.strText.style.left='13px';
                                }
                            }else {
                                inform.innerHTML=getInfStr();
                                button.style.transform='scale(1.25)';
                                button.style.opacity=1;
                                button.style.backgroundImage='url('+lib.assetURL+'image/skill_yiwu/yiwu_click.png)';
                                button.strText.style.left='13px';
                            }
                            return true;
                        }).set('ai', button => {
    						if(ui.selected.buttons.length) return 0;
    						var player = _status.event.player, target = event.target;
    						if (get.attitude(player, target) > 0) return 0;
    						var head='shen_huangzhong_yw_';
                            var name=button.name.slice(head.length);
    						switch (name) {
    							case 'head':
    								return Math.abs(get.effect(target, { name: 'losehp', target, target }) * target.hp) + 0.1;
    							case 'upperLimb':
    								return get.effect(target, { name: 'guohe_copy2' }, player, player) * 2;
    							case 'lowerLimb':
    								if (target.hp == 1) return 0;
    								return 1.1 + Math.random();
    							case 'thorax':
    								return 1.35 + Math.random();
    							case 'belly':
    								return 1.5 + Math.random();
    						}
    					});
					}else {
    					if (target.hasSkill('dclieqiong_hit')) event.position.head = `天冲：令${get.translation(target)}失去当前所有体力值。`;
    					event.position.upperLimb = `力烽：令${get.translation(target)}随机弃置半数手牌（向上取整）。`;
    					event.position.lowerLimb = `地机：令${get.translation(target)}下一次受到的伤害+1直到其回合结束。`;
    					event.position.thorax = `中枢：令${get.translation(target)}使用的下一张牌无效直到其回合结束。`;
    					event.position.belly = `气海：令${get.translation(target)}不能使用或打出红桃牌直到其回合结束。`;
    					player.chooseButton([`裂穹：你可“击伤”${get.translation(target)}的其中一个“部位”`, [Object.entries(event.position), 'textbutton']]).set('filterButton', button => {
    						var player = _status.event.player, target = event.target;
    						switch (button.link) {
    							case 'upperLimb':
    								return target.countCards('h', function (card) {
    									return lib.filter.cardDiscardable(card, target, 'dclieqiong');
    								});
    							default:
    								return true;
    						}
    					}).set('ai', button => {
    						var player = _status.event.player, target = event.player;
    						if (get.attitude(player, target) > 0) return 0;
    						switch (button.link) {
    							case 'head':
    								return Math.abs(get.effect(target, { name: 'losehp', target, target }) * target.hp) + 0.1;
    							case 'upperLimb':
    								return get.effect(target, { name: 'guohe_copy2' }, player, player) * 2;
    							case 'lowerLimb':
    								if (target.hp == 1) return 0;
    								return 1.1 + Math.random();
    							case 'thorax':
    								return 1.35 + Math.random();
    							case 'belly':
    								return 1.5 + Math.random();
    						}
    						return Math.random();
    					});
					}
					'step 1'
					var isHead=false;
					if (event.dialog) event.dialog.close();
					if (result.bool) {
						if(lib.config.effect_shen_huangzhong=='anim') {
    						const spine = game.playAnimationTitle('shenhuangzhong_effect.png');
    						game.playAnimation('extension/标记补充/animation/shenhuangzhong.mp4',function(){
    						    setTimeout(function() {
    						        //lib.skill.dclieqiong.animation(true);
    						        spine.start();
    						    },2800);
    						},function(){
    						    //lib.skill.dclieqiong.animation(false);
    						    spine.end();
    						});
						}
						var target = event.target, position = event.position;
						target.addTempSkill('dclieqiong_hit');
						if(lib.config.effect_shen_huangzhong!='none') {
						    var head='shen_huangzhong_yw_';
                            var name=result.links[0].name.slice(head.length);
						    event.linkName=name;
						    event.logName=position[event.linkName].name.slice(0, 2);
						}else {
						    event.linkName=result.links[0];
						    event.logName=position[event.linkName].slice(0, 2);
						}
						target.markAuto('dclieqiong_hit', [event.linkName]);
						game.log(target, '的', '#g' + event.logName, '被击伤了');
						//播放语音
						game.playAudio('shen_huangzhong','yiwu_'+event.logName);
						switch (event.linkName) {
							case 'head':
								if (target.hp > 0) {
									target.loseHp(target.hp);
									isHead=true;
								}
								break;
							case 'upperLimb':
								var card = target.getDiscardableCards(target, 'h'), num = Math.ceil(card.length / 2);
								if (card.length) target.discard(card.randomGets(num));
								break;
							case 'lowerLimb':
								target.addTempSkill('dclieqiong_lowerLimb', { player: 'phaseAfter' });
								target.addMark('dclieqiong_lowerLimb', 1, false);
								break;
							case 'thorax':
								target.addTempSkill('dclieqiong_thorax', { player: 'phaseAfter' });
								break;
							case 'belly':
								target.addTempSkill('dclieqiong_belly', { player: 'phaseAfter' });
								break;
						}
					}
					if(isHead) {
					    event.goto(2);
					}else {
					    event.finish();
					}
					'step 2'
					if (!target.isIn()) player.gainMaxHp();
				},
				subSkill: {
					hit: {
						charlotte: true,
						onremove: true,
					},
					lowerLimb: {
						trigger: {
							player: 'damageBegin2',
						},
						forced: true,
						charlotte: true,
						onremove: true,
						content: function () {
							trigger.num++;
							player.removeSkill(event.name);
						},
						mark: true,
						marktext: '地机',
						intro: {
							name: '中伤 - 地机',
							content: '下次受到的伤害+1',
						},
					},
					thorax: {
						trigger: {
							player: 'useCard'
						},
						charlotte: true,
						forced: true,
						mark: true,
						marktext: '中枢',
						intro: {
							name: '中伤 - 中枢',
							content: (_, player) => (_status.currentPhase === player ? '' : '下回合') + '使用的下一张牌无效',
						},
						content: function () {
							trigger.all_excluded = true;
							trigger.targets.length = 0;
							player.removeSkill(event.name);
						}
					},
					belly: {
						charlotte: true,
						mark: true,
						marktext: '气海',
						intro: {
							name: '中伤 - 气海',
							content: '不能使用或打出红桃牌',
						},
						mod: {
							cardEnabled: function (card) {
								if (get.suit(card) == 'heart') return false;
							},
							cardSavable: function (card) {
								if (get.suit(card) == 'heart') return false;
							},
							cardRespondable: function (card) {
								if (get.suit(card) == 'heart') return false;
							},
						},
					},
				},
			},
			dczhanjue: {
				audio: 2,
				trigger: {
					player: 'phaseUseBegin'
				},
				direct:true,
				content: function () {
					'step 0'
					player.chooseControl(['摸损失体力值张牌', '摸体力值张牌', 'cancel2']).set('prompt', get.prompt2("dczhanjue")).set('ai', () => {
						let player = _status.event.player, damaged = player.getDamagedHp();
						if (damaged) damaged += 0.6 * (player.countCards('hs', card => {
							if (card.name == 'sha' || !get.tag(card, 'damage')) return 0;
							let info = get.info(card);
							if (!info || info.type != 'trick') return false;
							if (info.notarget) return false;
							if (info.selectTarget != undefined) {
								if (Array.isArray(info.selectTarget)) {
									if (info.selectTarget[1] == -2) return 1;
									if (info.selectTarget[1] == -1) {
										let func = info.filterTarget;
										if (typeof func != 'function') func = () => true;
										return game.countPlayer(cur => {
											return func(card, player, cur);
										});
									}
									return Math.max(1, info.selectTarget[0], info.selectTarget[1]);
								} else {
									if (info.selectTarget == -2) return 1;
									if (info.selectTarget == -1) {
										let func = info.filterTarget;
										if (typeof func != 'function') func = () => true;
										return game.countPlayer(cur => {
											return func(card, player, cur);
										});
									}
									return Math.max(1, info.selectTarget);
								}
							}
							return 1;
						}) + Math.max(player.getCardUsable('sha'), player.countCards('hs', 'sha')));
						if (damaged > player.hp) return '摸损失体力值张牌';
						return '摸体力值张牌';
					});
					'step 1'
					if (result.control == '摸体力值张牌') {
						player.logSkill(event.name);
						if(player.getHp()>0) player.draw(player.getHp());
						player.addTempSkill('dczhanjue_directHit', { player: 'phaseUseEnd' });
					} else if (result.control == '摸损失体力值张牌') {
					    player.logSkill(event.name);
						if(player.getDamagedHp()>0) player.draw(player.getDamagedHp());
						player.addTempSkill('dczhanjue_recover', { player: 'phaseUseEnd' });
					}
				},
				subSkill: {
					directHit: {
						charlotte: true,
						forced: true,
						mod: {
							targetInRange: function (card) {
								if (card.name == 'sha') return true;
							},
						},
						trigger: {
							player: 'useCard',
						},
						filter(event, player) {
							return event.card.name == 'sha';
						},
						content: function () {
							trigger.directHit.addArray(game.players);
							game.log(trigger.card, '不可被响应');
							player.removeSkill(event.name);
						},
					},
					recover: {
						trigger: {
							source: 'damageSource',
						},
						forced: true,
						charlotte: true,
						content: function () {
							if(player.isDamaged()) player.recover(trigger.num);
							player.removeSkill(event.name);
						},
					},
				},
			},
			//应天司马懿！肯定又要修改
        	jilin: {
        		audio: 5,
        		trigger: {
        			global: "phaseBefore",
        			player: "enterGame",
        		},
        		filter: function(event, player) {
        			return event.name != "phase" || game.phaseNumber == 0;
        		},
        		forced: true,
        		locked: false,
        		logAudio: () => 1,
        		content: function() {
        			const cards = get.cards(get.mode() == "doudizhu" ? 1 : 2);
        			const next = player.addToExpansion(cards, "draw");
        			next.gaintag.add(event.name);
        		},
        		marktext: "志",
        		intro: {
        			markcount: "expansion",
        			mark(dialog, content, player) {
        				const cards = player.getExpansions("jilin"),
        					mingzhi = cards.filter(card => card.storage.jilin),
        					hidden = cards.removeArray(mingzhi);
        				if (mingzhi.length) {
        					dialog.addText("已明之志");
        					dialog.addSmall(mingzhi);
        				}
        				if (hidden.length) {
        					if (player == game.me || player.isUnderControl()) {
        						dialog.addText("未明之志");
        						dialog.addSmall(hidden);
        					} else {
        						return "共有" + get.cnNumber(hidden.length) + "张暗“志”";
        					}
        				}
        			},
        			content(content, player) {
        				const cards = player.getExpansions("jilin"),
        					mingzhi = cards.filter(card => card.storage.jilin),
        					hidden = cards.removeArray(mingzhi);
        				if (mingzhi.length) {
        					dialog.addText("已明之志");
        					dialog.addSmall(mingzhi);
        				}
        				if (hidden.length) {
        					if (player == game.me || player.isUnderControl()) {
        						dialog.addText("未明之志");
        						dialog.addSmall(hidden);
        					} else {
        						return "共有" + get.cnNumber(hidden.length) + "张暗“志”";
        					}
        				}
        			},
        		},
        		group: ["jilin_kanpo", "jilin_change"],
        		subSkill: {
        			kanpo: {
        				audio: "jilin",
        				logAudio: () => ["jilin2.mp3", "jilin3.mp3"],
        				trigger: {
        					target: "useCardToTarget",
        				},
        				filter: function(event, player) {
        					return event.player != player && player.getExpansions("jilin").some(card => !card.storage.jilin);
        				},
        				content: function() {
        					'step 0'
        					event.hidden = player.getExpansions("jilin").filter(card => !card.storage.jilin);
        					event.goon = get.effect(player, trigger.card, trigger.player, player) < 0;
        					event.suits = player
        						.getExpansions("jilin")
        						.filter(card => card.storage.jilin)
        						.map(card => get.suit(card));
        					if (event.hidden.length == 1) {
        						player.chooseBool("戢鳞：明置一张“志”", `令${get.translation(trigger.card)}对你无效`)
        							.set("choice", event.goon);
        						event.goto(1);
        					} else {
        						player.chooseButton(["戢鳞：明置一张“志”", event.hidden])
        							.set("ai", button => {
        								const player = get.player(),
        									card = button.link;
        								if (!event.goon) return 0;
        								if (!event.suits.includes(get.suit(card))) return 10;
        								return 6 - get.value(card);
        							});
        					}
        					'step 1'
        					if(!result.bool) {
        						event.finish();
        					}else {
        						event.cost_data= event.hidden;
        						event.goto(3);
        					}
        					'step 2'
        					if(!result.bool) {
        						event.finish();
        					}else {
        						event.cost_data= result.links;
        						event.goto(3);
        					}
        					'step 3'
        					event.cost_data[0].storage.jilin = true;
        					trigger.getParent().excluded.add(player);
        				},
        			},
        			change: {
        				audio: "jilin",
        				logAudio: () => ["jilin4.mp3", "jilin5.mp3"],
        				trigger: {
        					player: "phaseBegin",
        				},
        				filter: function(event, player) {
        					return player.countCards("h") && player.getExpansions("jilin").some(card => !card.storage.jilin);
        				},
        				content: function() {
        					'step 0'
        					const hidden = player.getExpansions("jilin").filter(card => !card.storage.jilin);
        					var next = player.chooseToMove("戢鳞：是否交换“志”和手牌？");
        					next.set("list", [
        						[get.translation(player) + "（你）的未明之“志”", hidden],
        						["手牌区", player.getCards("h")],
        					]);
        					next.set("filterMove", (from, to) => {
        						return typeof to != "number";
        					});
        					next.set("processAI", list => {
        						let player = get.player(),
        							cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
        								return get.useful(a) - get.useful(b);
        							}),
        							cards2 = cards.splice(0, player.getExpansions("jilin").length);
        						return [cards2, cards];
        					});
        					'step 1'
        					if(!result.bool) event.finish();
        					'step 2'
        					const moved = result.moved;
        					const pushs = moved[0];
        					event.gains = moved[1];
        					pushs.removeArray(player.getExpansions("jilin"));
        					event.gains.removeArray(player.getCards("h"));
        					if (!pushs.length || pushs.length != event.gains.length) return;
        					var next = player.addToExpansion(pushs);
        					next.gaintag.add("jilin");
        					'step 3'
        					player.gain(event.gains, "draw");
        				},
        			},
        		},
        	},
        	yingyou: {
        		audio: 4,
        		trigger: {
        			player: "phaseUseBegin",
        		},
        		filter: function(event, player) {
        			return player.countCards("h") && player.getExpansions("jilin").some(card => !card.storage.jilin);
        		},
        		content: function() {
        			'step 0'
        			const hidden = player.getExpansions("jilin").filter(card => !card.storage.jilin);
        			event.suits = player
        				.getExpansions("jilin")
        				.filter(card => card.storage.jilin)
        				.map(card => get.suit(card));
        			player.chooseButton(["英猷：你可以明志", hidden])
        				.set("ai", button => {
        					const player = get.player(),
        						card = button.link,
        						suits = event.suits;
        					const getNum = player => {
        						var list = [];
        						for (var i of lib.suit) list.push(player.countCards("h", { suit: i }) + 3);
        						return list.sort((a, b) => b - a)[0];
        					};
        					if (!suits.includes(get.suit(card))) return 10;
        					if (get.suit(card) == getNum(player)) return 5;
        					return 0;
        				});
        			'step 1'
        			if(!result.bool) {
        				event.finish();
        			}else {
        				event.cost_data=result.links;
        			}
        			'step 2'
        			event.cost_data[0].storage.jilin = true;
        			const num = player.getExpansions("jilin").filter(card => card.storage.jilin).length;
        			player.draw(num);
        		},
        		logAudio: () => 2,
        		ai: {
        			combo: "jilin",
        		},
        		group: "yingyou_draw",
        		subSkill: {
        			draw: {
        				audio: "yingyou",
        				logAudio: () => ["yingyou3.mp3", "yingyou4.mp3"],
        				trigger: {
        					player: "loseAfter",
        					global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
        				},
        				filter: function(event, player) {
        					const suits = player
        						.getExpansions("jilin")
        						.filter(card => card.storage.jilin)
        						.map(card => get.suit(card));
        					const evt = event.getl(player);
        					if (!evt || !evt.cards2 || !evt.cards2.length) return false;
        					return evt.cards2.some(card => {
        						return suits.includes(get.suit(card, player));
        					});
        				},
        				forced: true,
        				locked: false,
        				content: function() {
        					const suits = player
        						.getExpansions("jilin")
        						.filter(card => card.storage.jilin)
        						.map(card => get.suit(card));
        					const num = trigger.getl(player).cards2.filter(card => {
        						return suits.includes(get.suit(card, player));
        					}).length;
        					player.draw(num);
        				},
        			},
        		},
        	},
        	yingtian: {
        		audio: 2,
        		trigger: {
        			global: "dieAfter",
        		},
        		filter: function(event, player) {
        			return game.countGroup() < 3;
        		},
        		forced: true,
        		juexingji: true,
        		skillAnimation: true,
        		animationColor: "gray",
        		content: function() {
        			'step 0'
        			event.skill = event.name;
        			player.awakenSkill(event.skill);
        			player.changeSkills(get.info(event.skill).derivation, ["yingyou"]);
        			'step 1'
        			player.addSkill(event.skill + "_effect");
        		},
        		derivation: ["reguicai", "rewansha", "lianpo"],
        		subSkill: {
        			effect: {
        				mod: {
        					targetInRange: () => true,
        				},
        			},
        		},
        	},
        	//手杀神司马？
        	//极略神司马！
        	xinrenjie: {
        		audio: 2,
        		trigger: {
        			player: ["chooseToUseAfter", "chooseToRespondAfter"],
        			global: "useCardAfter",
        		},
        		filter: function(event, player) {
        			//if (player.getRoundHistory("useSkill", evt => evt.skill == "xinrenjie").length >= 4) return false;
        			if (player.storage.xinrenjie_round!=game.roundNumber) {
        			    player.storage.xinrenjie_round=game.roundNumber;
        			    player.storage.xinrenjie_used=0;
        			}
        			if(player.storage.xinrenjie_used>=4) return false;
        			if (event.name == "useCard") {
        				//......
        				if (event.player == player || get.type(event.card) != "trick") return false;
        				//const history = game.getGlobalHistory("every个thing", evt => evt.player == player && ["useCard", "respond"].includes(evt.name));
        				const history = player.getHistory("useCard").concat(player.getHistory("respond"));
        				return !history.some(evt => Array.isArray(evt.respondTo) && evt.respondTo[1] == event.card && evt.card.name == "wuxie");
        			}
        			const evt = event.getParent(2);
        			if (!evt || evt.name != "useCard" || evt.player == player) return false;
        			return event.respondTo && !event.result.bool;
        		},
        		forced: true,
        		content: function() {
        			if(!player.storage.xinrenjie_used) {
        			    player.storage.xinrenjie_used=1;
        			}else {
        			    player.storage.xinrenjie_used++;
        			}
        			player.addMark(event.name, 1);
        		},
        		intro: {
        			name2: "忍",
        			content: "mark",
        		},
        		marktext: "忍",
        		global: "xinrenjie_global",
        		subSkill: {
        			global: {
        				hiddenCard: () => true,
        				ai: {
        					respondSha: true,
        					respondShan: true,
        				},
        			},
        		},
        	},
        	xinbaiyin: {
        		audio: 2,
        		inherit: "sbaiyin",
        		filter: function(event, player) {
        			return player.countMark("xinrenjie") >= 4;
        		},
        		content: function() {
        			'step 0'
        			player.awakenSkill("xinbaiyin");
        			'step 1'
        			player.loseMaxHp();
        			'step 2'
        			player.addSkill("xinjilve");
        		},
        		derivation: ["xinjilve", "reguicai", "fangzhu", "rejizhi", "rezhiheng", "rewansha"],
        		ai: {
        			combo: "xinrenjie",
        		},
        	},
        	xinlianpo: {
        		audio: "lianpo",
        		audioname: ['xin_shen_simayi'],
        		trigger: {
        			source: "dieAfter",
        		},
        		content: function() {
        			'step 0'
        			event.skills = get
        				.info("xinbaiyin")
        				.derivation.removeArray(["xinjilve", "reguicai"])
        				.filter(skill => !player.hasSkill(skill, null, null, false));
        			if (event.skills.length && player.hasSkill("xinjilve", null, null, false)) {
        				const next = player.chooseButton(["连破：请选择一项", [event.skills.map(i => [i, `获得【${get.translation(i)}】`]).concat(["于此回合结束后获得一个额外回合"]), "textbutton"]]);
        				next.set("ai", button => {
        					const link = button.link;
        					if ((event.skills.length <= 2 || game.countPlayer() <= 2) && !player.hasSkill("xinlianpo_mark", null, null, false) && link == "于此回合结束后获得一个额外回合") return 6;
        					if (link == "rezhiheng" && player.countCards("h") > 0) return 5;
        					if (link == "rejizhi" && (!event.skills.includes("rezhiheng") || player.countCards("hs", { type: "trick" }))) return 3;
        					if (link == "rewansha" && game.hasPlayer(current => get.attitude(player, current) < 0 && current.getHp() < 2 && (player == _status.currentPhase || player.hasSkill("xinlianpo_mark", null, null, false)))) return 2;
        					return 1;
        				});
        				event.goto(1);
        			} else {
        				player.chooseBool("连破：于此回合结束后获得一个额外回合？");
        				event.goto(2);
        			}
        			'step 1'
        			if(!result.bool) {
        				event.finish();
        			}else {
        				event.cost_data=result.links;
        				event.goto(3);
        			}
        			'step 2'
        			if(!result.bool) {
        				event.finish();
        			}else {
        				event.cost_data=false;
        				event.goto(3);
        			}
        			'step 3'
        			const links = event.cost_data;
        			if (links && get.info("xinbaiyin").derivation.includes(links[0])) player.addSkill(links[0]);
        			else {
        				player.addTempSkill("xinlianpo_mark");
        				player.insertPhase();
        			}
        		},
        		subSkill: {
        			mark: {
        				charlotte: true,
        				mark: true,
        				intro: {
        					content: "本回合结束后执行一个额外回合",
        				},
        			},
        		},
        	},
        	xinjilve: {
        		audio: 2,
        		trigger: {
        			player: "phaseUseBegin",
        		},
        		filter: function(event, player) {
        			return player.countMark("xinrenjie");
        		},
        		content: function() {
        			'step 0'
        			const limit = Math.min(3, player.countMark("xinrenjie"));
        			event.choices = Array.from({
        				length: limit,
        			}).map((_, i) => [i, get.cnNumber(i + 1, true)]);
        			//const history = game.getAllGlobalHistory("every个thing", evt => evt.name == "xinjilve" && evt.player == player && Array.isArray(evt.cost_data) && get.info("xinbaiyin").derivation.includes(evt.cost_data[0]));
        			//event.num = history.length + 1;
        			if(!player.storage.xinjilve_skillcho) {
        			    player.storage.xinjilve_skillcho = 0;
        			}
        			event.num = player.storage.xinjilve_skillcho+1;
        			event.skills = get
        				.info("xinbaiyin")
        				.derivation.removeArray(["xinjilve", "reguicai"])
        				.filter(skill => !player.hasSkill(skill, null, null, false));
        			if (event.skills.length && limit >= event.num) {
        				const next = player.chooseButton(2, ["连破：请选择你要移去的“忍”标记数和相应操作", '<div class="text center">移去“忍”标记数</div>', [event.choices, "tdnodes"], '<div class="text center">执行的操作</div>', [event.skills.map(i => [i, `获得【${get.translation(i)}】`]).concat(["摸牌"]), "tdnodes"]]);
        				next.set("filterButton", button => {
        					const link = button.link;
        					if (!ui.selected.buttons.length && typeof link == "number") return false;
        					if (ui.selected.buttons.length) {
        						if (typeof link !== "number") return false;
        						return ui.selected.buttons[0].link == "摸牌" || link == event.num - 1;
        					}
        					return true;
        				});
        				next.set("ai", button => {
        					const link = button.link;
        					if (!ui.selected.buttons.length) {
        						if (event.num > 2 && link == "摸牌") return 10;
        						if (link == "rezhiheng" && player.countCards("h") > 0) return 10;
        						if (link == "rejizhi" && (!event.skills.includes("rezhiheng") || player.countCards("hs", { type: "trick" }))) return 8;
        						if (player.countMark("xinrenjie") <= 2) return 0;
        					}
        					return ui.selected.buttons.length && ui.selected.buttons[0].link == "摸牌" ? event.num - 1 : 1;
        				});
        				event.goto(1);
        			} else {
        				const draw = Array.from({
        					length: limit,
        				}).map((_, i) => get.cnNumber(i + 1, true));
        				player.chooseControl(draw, "cancel2")
        					.set("prompt", get.prompt("xinrenjie"))
        					.set("prompt2", `你可以摸至多${get.cnNumber(draw.length)}张牌并移去等量枚“忍”标记`)
        					.set("ai", () => {
        						if (!player.hasSkill("jizhi", null, null, false)) return "cancel2";
        							return event.choices.length - 1;
        					});
        				event.goto(2);
        			}
        			'step 1'
        			if(!result.bool) {
        				event.finish();
        			}else {
        				event.cost_data=result.links;
        				event.goto(3);
        			}
        			'step 2'
        			if(!result.control == "cancel2") {
        				event.finish();
        			}else {
        				event.cost_data=result.index;
        				event.goto(3);
        			}
        			'step 3'
        			const choice = event.cost_data;
        			if (typeof choice == "number") {
        				player.removeMark("xinrenjie", choice + 1);
        				player.draw(choice + 1);
        			} else if (get.info("xinbaiyin").derivation.includes(choice[0])) {
        				//const history = game.getAllGlobalHistory("every个thing", evt => evt.name == "xinjilve" && evt.player == player && Array.isArray(evt.cost_data) && get.info("xinbaiyin").derivation.includes(evt.cost_data[0]));
        				//const num = history.length;
        				player.storage.xinjilve_skillcho++;
        				const num = player.storage.xinjilve_skillcho;
        				player.removeMark("xinrenjie", num);
        				player.addSkill(choice[0]);
        			} else {
        				player.removeMark("xinrenjie", choice[1] + 1);
        				player.draw(choice[1] + 1);
        			}
        		},
        		init:function(player,skill) {
        		    let skills = ["reguicai"];
					const groupList = new Map([
						["wei", "fangzhu"],
						["shu", "rejizhi"],
						["wu", "rezhiheng"],
						["qun", "rewansha"],
						["key", "hiroto_zonglve"],
					]);
					if (Array.from(groupList.keys()).includes(player.group)) skills.push(groupList.get(player.group));
					skills = skills.filter(skill => !player.hasSkill(skill, null, null, false));
					if (skills.length) player.addSkill(skills);
        		},
        		//group: "xinjilve_gain",
        		subSkill: {
        			gain: {
        				trigger: {
        					player: "changeSkillsAfter",
        				},
        				filter: function(event, player) {
        					return event.addSkill.includes("xinjilve");
        				},
        				forced: true,
        				content: function() {
        					let skills = ["reguicai"];
        					const groupList = new Map([
        						["wei", "fangzhu"],
        						["shu", "rejizhi"],
        						["wu", "rezhiheng"],
        						["qun", "rewansha"],
        						["key", "hiroto_zonglve"],
        					]);
        					if (Array.from(groupList.keys()).includes(player.group)) skills.push(groupList.get(player.group));
        					skills = skills.filter(skill => !player.hasSkill(skill, null, null, false));
        					if (skills.length) player.addSkill(skills);
        				},
        			},
        		},
        	},
			//十周年神华佗
        	jingyu: {
        		audio: 2,
        		trigger: {
        			global: ["useSkill", "logSkillBegin", "useCard", "respond"],
        		},
        		filter: function(event, player) {
        			if (["global", "equip"].includes(event.type)) return false;
        			let skill = event.sourceSkill || event.skill;
        			if (!skill || skill === "jingyu") return false;
        			let info = get.info(skill);
        			while (true) {
        				if (!info || info.charlotte || info.equipSkill) return false;
        				if (info && !info.sourceSkill) break;
        				skill = info.sourceSkill;
        				info = get.info(skill);
        			}
        			return !player.getStorage("jingyu_used").includes(skill);
        		},
        		forced: true,
        		content: function() {
        			if (!player.storage.jingyu_used) {
        				/*player
        					.when({ global: "roundStart" })
        					.assign({
        						firstDo: true,
        					})
        					.then(() => delete player.storage.jingyu_used);*/
        				player.addWhen({
        				    trigger:{ global: "roundStart" },
        				    content: function() {
        				        delete player.storage.jingyu_used;
        				    },
        				});
        			}
        			let skill = trigger.sourceSkill || trigger.skill,
        				info = get.info(skill);
        			while (true) {
        				if (info && !info.sourceSkill) break;
        				skill = info.sourceSkill;
        				info = get.info(skill);
        			}
        			player.markAuto("jingyu_used", skill);
        			player.draw();
        		},
        		ai: {
        			threaten: 6,
        		},
        	},
        	lvxin: {
        		audio: 2,
        		enable: "phaseUse",
        		usable: 1,
        		filterCard: true,
        		filterTarget: lib.filter.notMe,
        		check: function(card) {
        			const round = game.roundNumber,
        				player = get.player();
        			let valueFix = 0;
        			if (["sha", "shan"].includes(get.name(card, false))) valueFix += 3;
        			if (
        				(round <= 2 &&
        					player.hasCard(card => {
        						return ["sha", "shan"].includes(get.name(card)) && get.value(card) <= 3;
        					})) ||
        				game.hasPlayer(current => {
        					return current !== player && get.attitude(player, current) > 0;
        				})
        			)
        				return 6 - get.value(card) + valueFix;
        			return 4.5 - get.value(card) + valueFix;
        		},
        		delay: false,
        		discard: false,
        		lose: false,
        		content: function() {
        			'step 0'
        			event.round = Math.min(5, game.roundNumber);
        			event.named = get.translation(target);
        			player.give(cards, target);
        			'step 1'
        			player.chooseControl(["摸牌", "弃牌"])
        				.set("choiceList", [`令${event.named}摸${get.cnNumber(event.round)}张牌`, `令${event.named}随机弃置${get.cnNumber(event.round)}张手牌`])
        				.set("prompt", "滤心：请选择一项")
        				.set("ai", () => {
        					//return get.event("choice");
        					return get.attitude(player, target) > 0 ? "摸牌" : "弃牌";
        				});
        				//.set("choice", get.attitude(player, target) > 0 ? "摸牌" : "弃牌");
        			'step 2'
        			event.cards2 = [];
        			event.makeDraw = result.index === 0;
        			if (event.makeDraw) {
        				target.draw(event.round);
        				/*event.cards2=get.cards(event.round);
        				var next=target.gain(event.cards2,'draw2');
        				next.getParent().name='draw';*/
        				event.goto(3);
        			} else {
        				const cards = target.getCards("h", card => {
        					return lib.filter.cardDiscardable(card, target, "lvxin");
        				});
        				if (cards.length > 0) {
        					event.cards2=cards.randomGets(event.round);
        					target.discard(event.cards2).set("discarder", target);
        				}
        				event.goto(4);
        			}
        			'step 3'
        			if(result) event.cards2=result;
        			'step 4'
        			const cardName = get.name(cards[0], player);
        			if (
        				event.cards2.some(card => {
        					return get.name(card, target) === cardName;
        				})
        			) {
        				const skillName = `lvxin_${event.makeDraw ? "recover" : "lose"}`;
        				target.addSkill(skillName);
        				target.addMark(skillName, 1, false);
        			}
        		},
        		subSkill: {
        			recover: {
        				trigger: {
        					player: ["useSkill", "logSkillBegin", "useCard", "respond"],
        				},
        				filter: function(event, player) {
        					if (["global", "equip"].includes(event.type)) return false;
        					if ((get.info(event.skill) || {}).charlotte) return false;
        					const skill = event.sourceSkill || event.skill;
        					const info = get.info(skill);
        					return info && !info.charlotte && !info.equipSkill;
        				},
        				forced: true,
        				onremove: true,
        				charlotte: true,
        				content: function() {
        					player.recover(player.countMark("lvxin_recover"));
        					player.removeSkill("lvxin_recover");
        				},
        				intro: {
        					content: "下次发动技能时回复#点体力",
        				},
        			},
        			lose: {
        				trigger: {
        					player: ["useSkill", "logSkillBegin", "useCard", "respond"],
        				},
        				filter: function(event, player) {
        					if (["global", "equip"].includes(event.type)) return false;
        					if ((get.info(event.skill) || {}).charlotte) return false;
        					const skill = event.sourceSkill || event.skill;
        					const info = get.info(skill);
        					return info && !info.charlotte && !info.equipSkill;
        				},
        				forced: true,
        				onremove: true,
        				charlotte: true,
        				content: function() {
        					player.loseHp(player.countMark("lvxin_lose"));
        					player.removeSkill("lvxin_lose");
        				},
        				intro: {
        					content: "下次发动技能时失去#点体力",
        				},
        			},
        		},
        		ai: {
        			order: 5,
        			result: {
        				target(player, target) {
        					const round = game.roundNumber;
        					if (
        						round <= 2 &&
        						target.countCards("h") > round * 2 &&
        						player.getCards("h").some(card => {
        							return ["sha", "shan"].includes(get.name(card)) && get.value(card) <= 3;
        						})
        					)
        						return 1;
        					if (get.attitude(player, target) > 0) {
        						return round + Math.sqrt(1 + target.getDamagedHp());
        					}
        					return -(round + Math.sqrt(Math.max(0, 2 - target.getHp())));
        				},
        			},
        		},
        	},
        	huandao: {
        		audio: 2,
        		enable: "phaseUse",
        		usable: 1,
        		limited: true,
        		filterTarget: lib.filter.notMe,
        		//filterTarget: true,
        		skillAnimation: true,
        		animationColor: "metal",
        		content: function() {
        			'step 0'
        			player.awakenSkill("huandao");
        			//const { target } = event;
        			target.turnOver(false);
        			'step 1'
        			target.link(false);
        			'step 2'
        			//此处用get.characterName获取的技能更广，但是会卡
        			let names = [target.name1 || target.name];
        			if (target.name2) names.add(target.name2);
        			names = names.map(name => get.rawName(name));
        			if (!_status.characterlist) lib.skill.pingjian.initList();
        			_status.characterlist.randomSort();
        			event.ownedSkills = target.getSkills(null, false, false);
        			event.ownedSkillsName = event.ownedSkills.map(skill => get.translation(skill));
        			event.skillToGain = null;
        			//outer: for (const name of _status.characterlist) {
        			//全扩武将！
        			outer: for (const name in lib.character) {
        				const info = lib.character[name];
        				if (!names.includes(get.rawName(name))) continue;
        				const skills = info[3].slice().randomSort();
        				while (skills.length) {
        					const skill = skills.shift(),
        						skillName = get.translation(skill);
        					if (!event.ownedSkillsName.includes(skillName)) {
        						event.skillToGain = skill;
        						break outer;
        					}
        				}
        			}
        			if (!event.skillToGain||get.translation(event.skillToGain)=="") {
        			    target.chat("失败");
        			    game.log(target,'技能获取失败');
        			    event.finish();
        			    return;
        			}
        			player.popup(event.skillToGain);
        			player.line(target, "green");
        			let prompt2 = "若你选择是，则你于获得此技能后须失去一个其他技能。<br><br>";
        			if (lib.skill[event.skillToGain].nobracket) {
        				//prompt2 += `<div class="skilln">${get.translation(event.skillToGain)}</div><div><span style="font-family: yuanli">${get.skillInfoTranslation(event.skillToGain)}</span></div><br><br>`;
        			    prompt2 += `${get.translation(event.skillToGain)}　${get.skillInfoTranslation(event.skillToGain)}`;
        			} else {
        				const translation = lib.translate[event.skillToGain + "_ab"] || get.translation(event.skillToGain).slice(0, 2);
        				//prompt2 += `<div class="skill">【${translation}】</div><div><span style="font-family: yuanli">${get.skillInfoTranslation(event.skillToGain)}</span></div><br><br>`;
        			    prompt2 += `【${translation}】　${get.skillInfoTranslation(event.skillToGain)}`;
        			}
        			target
        				.chooseBool(`寰道：是否获得技能〖${get.translation(event.skillToGain)}〗？`, prompt2)
        				.set(
        					"choice",
        					(() => {
        						const rank = get.skillRank(event.skillToGain, "inout") + 1;
        						return event.ownedSkills.some(skill => {
        							const info = get.info(skill);
        							if (info) {
        								if (target.awakenedSkills.includes(skill) && (info.limited || info.juexingji || info.dutySkill)) return true;
        								if (info.ai && (info.ai.neg || info.ai.halfneg)) return true;
        							}
        							return get.skillRank(skill, "inout") < rank;
        						});
        					})()
        				);
        			'step 3'
        			if (!result.bool) {
        				target.chat("拒绝");
        				game.log(target, "拒绝获得技能", `#g【${get.translation(event.skillToGain)}】`);
        				//game.asyncDelay();
        				game.delay();
        				//return;
        				event.finish();
        			}
        			'step 4'
        			target.addSkillLog(event.skillToGain);
        			event.ownedSkills = target.getSkills(null, false, false).filter(skill => {
        				if (skill === event.skillToGain) return false;
        				const info = get.info(skill);
        				if (!info || info.charlotte || !get.skillInfoTranslation(skill, player).length) return false;
        				return true;
        			});
        			if (!event.ownedSkills) return;
        			target.chooseControl(event.ownedSkills)
        				.set(
        					"choiceList",
        					event.ownedSkills.map(skill => {
        						return `<div class="skill">【${get.translation(lib.translate[skill + "_ab"] || get.translation(skill).slice(0, 2))}】</div><div>${get.skillInfoTranslation(skill, target)}</div>`;
        					})
        				)
        				.set("displayIndex", false)
        				.set("prompt", "寰道：选择失去一个技能")
        				.set("ai", () => {
    						const uselessSkills = event.ownedSkills.filter(skill => {
    							const info = get.info(skill);
    							if (!info) return false;
    							if (target.awakenedSkills.includes(skill) && (info.limited || info.juexingji || info.dutySkill)) return true;
    							if (info.ai && (info.ai.neg || info.ai.halfneg)) return true;
    							return false;
    						});
    						if (uselessSkills.length) return uselessSkills.randomGet();
    						return event.ownedSkills.sort((a, b) => {
    							return get.skillRank(a, "inout") - get.skillRank(b, "inout");
    						})[0];
    					});
        			'step 5'
        			target.removeSkill(result.control);
        			game.log(target,'失去了','#g【'+get.translation(result.control)+'】');
        		},
        		ai: {
        			order: 5,
        			result: {
        				target(player, target) {
        					if (game.roundNumber * game.countPlayer() <= (1.5 * game.countPlayer2()) / Math.sqrt(player.getDamagedHp() + 1)) return 0;
        					const ownedSkills = target.getSkills(null, false, false).filter(skill => {
        						const info = get.info(skill);
        						if (!info || info.charlotte || !get.skillInfoTranslation(skill, player).length) return false;
        						return true;
        					});
        					const uselessSkills = ownedSkills.filter(skill => {
        						const info = get.info(skill);
        						if (!info) return false;
        						if (target.awakenedSkills.includes(skill) && (info.limited || info.juexingji || info.dutySkill)) return true;
        						if (info.ai && (info.ai.neg || info.ai.halfneg)) return true;
        						return false;
        					});
        					if (uselessSkills.length) return 3;
        					let names = [target.name1 || target.name];
        					if (target.name2) names.add(target.name2);
        					names = names.map(name => get.rawName(name));
        					//不会，直接禁了
        					//if (_status.characterlist.some(name => names.includes(get[event.raws](name)))) return 1;
        					return 0;
        				},
        			},
        		},
        	},
			//神许诸
			zhengqing:{
				audio:2,
				forced:true,
				init:function(player){
					player.storage.zhengqing1=new Map();
					player.storage.zhengqing2=0;
				},
				getMaxKey:function(map) {
					let maxKey = null;
					let maxValue = -Infinity;			
					for (let [key, value] of map) {
						if (value > maxValue) {
							maxKey = key;
							maxValue = value;
						}
					}				
					return maxKey;
				},
				marktext:'擎',
				intro:{
					content:'当前拥有#枚〖擎〗'
				},
				//trigger:{global:'roundFinish'},
				trigger:{global:'roundStart'},
				filter:function(event,player){
				    return game.roundNumber>1;
				},
				content:function(){
					'step 0'
					game.players.forEach(function(c){
						if(c.hasMark('zhengqing')) c.removeMark('zhengqing',c.countMark('zhengqing'));
					})
					'step 1'
					var t=lib.skill.zhengqing.getMaxKey(player.storage.zhengqing1);
					var n=player.storage.zhengqing1.get(t);
					if(t==player&&player.storage.zhengqing1.get(player)>player.storage.zhengqing2){
						player.draw(Math.min(player.storage.zhengqing1.get(player),5));
					}
					else{
						t.addMark('zhengqing',n);
						t.draw();
						player.draw();
					}
					'step 2'
					if(player.storage.zhengqing1.get(player)>player.storage.zhengqing2){
						player.storage.zhengqing2=player.storage.zhengqing1.get(player);
					}
				},
				group:['zhengqing_sub1','zhengqing_sub2'],
				subSkill:{
					sub1:{
						unique:true,
						trigger:{
							global:"phaseBefore",
							player:"enterGame",
						},
						direct:true,
						filter:function(event,player){
							return (event.name!='phase'||game.phaseNumber==0);
						},
						content:function(){
							game.players.forEach(function(c){
								player.storage.zhengqing1.set(c,0);
							})
						}				
					},
					sub2:{
						trigger:{
							global:'phaseEnd',
						},
						direct:true,
						content:function(){
							var dam=0;
							for(var i of trigger.player.getHistory('sourceDamage')){
								if(i.num) dam+=i.num;
							}
							player.storage.zhengqing1.set(trigger.player,dam);
						}
					},
				}
			},
			zhuangpo:{
				audio:2,
				enable:"chooseToUse",
				prompt:'将一张牌面信息中有“杀”的牌当做【决斗】使用',
				viewAs:{
					name:"juedou",
				},
				position:"hes",
				filterCard:function(card,player){
					if(get.name(card)=='sha') return true;
					if(get.translation(get.name(card)+'_info').includes('杀')) return true;
					return false;
				},
				check:function(card){
					return 8-get.value(card);
				},
				init:function(){
				    lib.card['shen_xuzhu_qing']={
                        fullskin:false,
                        image:'card/shen_xuzhu_qing.png',
                        opacity:1,
                        textShadow:'black 0 0 2px',
                    };
                    lib.translate['shen_xuzhu_qing']='标记';
                    lib.translate['shen_xuzhu_qing_info']='来自技能〖争擎〗';
				},
				group:['zhuangpo_1','zhuangpo_2'],
				subSkill:{
					1:{
						trigger:{
							player:"useCardToBegin",
						},
						filter:function(event,player){
							return event.skill=='zhuangpo'&&event.name=='juedou'&&player.countMark('zhengqing')>0&&event.target.countCards('he')>0;
						},
						direct:true,
						content:function(){
							'step 0'
							var list=[];
							for(var i=1;i<=player.countMark('zhengqing');i++){
								//if(i<=trigger.target.countCards('he')) list.add(i);
								if(i<=trigger.target.countCards('he')) {
								    var card=game.createCard({name:'shen_xuzhu_qing',suit:'　',number:'　'});
								    list.push(card);
								}
							}
							//player.chooseControl(list).set('prompt','请选择弃置任意“擎”标记并弃置目标等量张牌');
							player.chooseButton([
								'###壮魄###<div class="text center">请选择弃置任意“擎”标记并弃置目标等量张牌</div>',
								[list,'vcard'],
							],[1,list.length]).set('filterButton',function(button){
							    if(!button.initStyle) {
							        button.initStyle=true;
							        button.innerText='';
							    }
							    //移除标记的卡牌背景noselect，为此专门写的属性
							    button.style.backgroundImage='url('+lib.assetURL+'image/card/shen_xuzhu_qing.png)';
							    button.style.width='120px';
							    button.style.height='120px';
							    //button.style.backgroundImage='none';
							    button.style.boxShadow='none';
							    button.classList.add('noselect');
							    if(ui.selected.buttons.length&&ui.selected.buttons.contains(button)) {
							        button.style.filter='brightness(1.1)';
							        button.style.transform='scale(1)';
							    }else {
							        button.style.filter='brightness(0.5)';
							        button.style.transform='scale(0.9)';
							    }
							    return true;
							}).set('ai',function(button){
							    return 1;
							});
							'step 1'
							//if(result.control==0) result.links
							if(!result.bool||!result.links||!result.links.length) {
							    event.finish();
							}else {
								var num=result.links.length;
								player.removeMark('zhengqing',num);
								player.discardPlayerCard(trigger.target,'he',num,true);
								//player.removeMark('zhengqing',result.control);
								//player.discardPlayerCard(trigger.target,'he',result.control,true);
							}
						}
					},
					2:{
						trigger:{
							source:"damageBegin",
						},
						direct:true,
						filter:function(event,player){
							return event.getParent().skill=='zhuangpo'&&event.getParent().name=='juedou'&&event.getParent().target!=player&&event.getParent().target.hasMark('zhengqing');
						},
						content:function(){
							trigger.num++;
						}
					}
				}			
			},
		    //神鲁肃
			dingzhou:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter(event,player){
					const num=player.countCards('he');
					return game.hasPlayer(current=>{
						const total=current.countCards('ej');
						return total>0&&num>=total;
					});
				},
				filterCard:true,
				selectCard:[1,Infinity],
				check(card){
					return 7-get.value(card);
				},
				filterTarget(card,player,target){
					return ui.selected.cards.length==target.countCards('ej')&&player!=target;
				},
				filterOk(){
					return ui.selected.cards.length==ui.selected.targets[0].countCards('ej');
				},
				position:'he',
				lose:false,
				discard:false,
				delay:false,
				content(event,trigger,player){
					'step 0'
					//const target=event.targets[0];
					player.give(event.cards,target);
					'step 1'
					var cards=target.getGainableCards(player,'ej');
					if(cards.length) player.gain(cards,'give',target);
				},
				ai:{
					order:9,
					result:{
						target(player,target){
							let eff=0;
							if(ui.selected.cards.length) eff-=ui.selected.cards.map(card=>get.value(card)).reduce((p,c)=>p+c,0);
							const es=target.getCards('e'),js=target.getCards('j');
							es.forEach(card=>{
								eff-=get.value(card,target);
							});
							js.forEach(card=>{
								eff-=get.effect(target,{
									name:card.viewAs||card.name,
									cards:[card],
								},target,target);
							});
							return eff;
						}
					},
				},
			},
			tamo:{
				audio:2,
				trigger:{
					global:[/*'phaseBefore',*/'phaseTaMoStart'],
					player:'enterGame',
				},
				filter(event,player){
					if(player.storage.tamo) return false;
					return (event.name!='phaseTaMoStart'||game.phaseNumber==0)&&game.countPlayer(current=>{
						return !current.isZhu2();
					})>1;
				},
				direct:true,
				changeSeat:true,
				content(event,trigger,player){
					'step 0'
					player.storage.tamo=true;
					var prmt=[];
					event.num=1;
					event.sum=game.players.length;
					if(game.countPlayer(current=>{
						return current.isZhu2();
					})>0) {
					    event.num++;
					    event.sum--;
					    game.zhu.newSeatNum=1;
					}
					for(var i=event.num;i<=game.players.length;i++) {
					    prmt.push(get.cnNumber(i,true)+'号位');
					}
					event.choosenum=0;
					player.chooseTarget('榻谟：是否分配所有角色的座次？',function(card,player,target){
                        return !target.isZhu2();
                    })/*.set('selectTarget',event.sum)*/.set('targetprompt',prmt).setHiddenSkill(event.name).set('ai',function(target){
                        return get.attitude(player,target)+100;
                    }).set('selectTarget',function(){
						//取消一个全部重整所有选择
						if(ui.selected.targets.length) {
						    if(ui.selected.targets.length>event.choosenum) {
						        event.choosenum=ui.selected.targets.length;
						    }else if(ui.selected.targets.length<event.choosenum) {
						        event.choosenum=0;
						        game.uncheck();
						        game.check();
						    }
						}
						return event.sum;
					});
                    'step 1'
                    if(result.bool) {
                        player.logSkill('tamo',game.players);
                        game.delay(2);
                    }else event.finish();
                        /*var players=game.filterPlayer(current=>{
					    	return !current.isZhu2();
					    });*/
					'step 2'
					if(result.bool) {
					    game.log(player,'正在重新分配座位');
					    if(lib.config.extension_十周年UI_enable&&lib.config.effect_shen_lusu) {
                            decadeUI.animation.playSpine({ name: 'SS_jn_shenlusu', scale: 1 });
                            game.playAudio('../extension/标记补充/audio/effect_shenlusu_tamo.mp3');
                            game.delay(2);
                            window.chgRoundMenu=true;
                            game.filterPlayer(function(current){
                                /*if(current!=game.me) {
                                  var time=[0.3,0.35,0.4,0.45,0.5].randomGet();
                                  current.style.transition='all '+time+'s';
                                  current.style.filter='brightness(3)';
                                  current.style.transform='translateY(60%) scale(0.8)';
                                  current.style.opacity=0;
                                }*/
                                //current.style.transition='all 2s';
                                setTimeout(function(){
                                  /*if(current!=game.me) {
                                    current.style.transform='translateY(0%) scale(0.7)';
                                    //current.style.filter='brightness(3)';
                                    current.style.opacity=0;
                                  }else {*/
                                    current.style.transform='scale(0.7)';
                                    current.style.opacity=0;
                                    current.style.filter='brightness(3)';
                                  //}
                                  //game.pause2();
                                  setTimeout(function(){
                                    //var time=[0.5,0.7,0.9,1.1,1.3,1.5,1.7,1.9].randomGet();
                                    var time=0.5;
                                    var titime=1.5/game.countPlayer();
                                    if(current.newSeatNum) time=0.5+titime*current.newSeatNum;
                                    //current.style.transition='all '+time+'s ease';
                                    current.style.transition='all 0.5s ease';
                                    setTimeout(function(){
                                        //current.style.filter='drop-shadow(0,0,5px,rgba(0,0,255,1))';
                                        current.style.filter='brightness(1.2)';
                                        //drop-shadow(0px 0px 2px rgb(255,255,255)) drop-shadow(0px 0px 5px rgb(0,200,255)) drop-shadow(0px 0px 10px rgb(0,50,255))';
                                        current.createHighLight([[255,255,255],[0,200,255],[0,50,255]],7,{level:3}).style.transition='transform 3s ease-out, opacity 2.8s 0.2s linear';
                                        current.style.transform='';
                                        current.style.opacity=1;
                                        setTimeout(function(){
                                            current.style.transition='all 1.5s';
                                            current.createHighLight([],0,{level:3}).style.transform='scale(1.2)';
                                            current.createHighLight([],0,{level:3}).style.opacity=0;
                                            setTimeout(function(){
                                                current.style.filter='';
                                            },10);
                                            setTimeout(function(){
                                                if(!current?.style) return false;
                                                current.style.transition='';
                                            },1600);
                                        },500);
                                        //if(current.newSeatNum) current.$damagepop(get.cnNumber(current.newSeatNum,true)+'号位');
                                    },(time-0.3)*1000);
                                    setTimeout(function(){
                                        game.resume2();
                                        //current.style.transition='';
                                        window.chgRoundMenu=false;
                                    },2500);
                                  },2500);
                                },2000);
                            });
                        }
                    }else {
                        event.finish();
                    }
                    'step 3'
                    if(result.bool) {
                        for(var i=0;i<result.targets.length;i++) {
                            result.targets[i].newSeatNum=event.num+i;
                        }
					    var players=result.targets;
					    var first=result.targets[0];
					    if(game.zhu&&game.zhu.isZhu2()) first=game.zhu;
					    //if(first.isZhu2()) first=first.next;
                        for(var j=0;j<players.length;j++) {
                            //players.sortBySeat(result.targets[0]);
                            for(var i=0;i+1<players.length;i++) {
                                players.sortBySeat(first);
                                //player.say(get.translation(players));
                                var sortA=players[i];
                                var sortB=players[i+1];
                                if(sortA.newSeatNum>sortB.newSeatNum) {
                                    game.swapSeat(sortA,sortB,false);
                                }
                            }
                        }
                        var seats=game.players.sortBySeat(first);
                        for(var i=0;i<seats.length;i++) {
                            game.log(get.cnNumber(i+1,true)+'号位：',seats[i]);
                            seats[i].seatNum = i+1;
                            if(seats[i].node&&seats[i].node.seat) {
                                seats[i].node.seat.innerHTML=get.cnNumber(seats[i].seatNum, true);
                            }
                        }
                        //if(get.mode()=='doudizhu') {
                        //换座位换优先度
                        if(trigger.name=='phaseTaMoStart'&&!game.hasPlayer(function(current){
                            return current.isZhu2();
                        })) {
                            for(var me=trigger.player;me.newSeatNum!=1;me=me.next) {
                                if(trigger.player==me) {
                                    trigger.cancel();
                                    //game.log('马上跳过了',me);
                                    var evt=trigger.getParent('phase');
                                    if(evt){
                                        evt.finish();
                                    }
                                }else {
                                    //game.log('跳过了',me);
                                    me.skip('phase');
                                }
                            }
                        }
                        game.log('座位已分配完毕');
                        if(lib.config.extension_十周年UI_enable&&lib.config.effect_shen_lusu) game.pause2();
                    }
				},
				//确保是最优先触发他摸
				global: 'tamo_triggerTaMo',
				subSkill: {
				    triggerTaMo: {
				        trigger: {
                            player: 'phaseBefore',
                        },
                        priority: 1000,
                        filter: function(event, player) {
                            return game.phaseNumber==0 && !game.tamoIsDone;
                        },
                        forced: true,
                        firstDo: true,
                        popup: false,
                        content:function() {
        					game.tamoIsDone = true;
        					var next=game.createEvent('phaseTaMoStart');
        					next.player=player;
        					next.setContent(function() {
        					    event.trigger('phaseTaMoStart');
			                    //game.log(player,'进入了超级准备阶段');
        					});
                        }
				    },
				},
			},
			//什么均贫卡
			zhimeng:{
				audio:2,
				trigger:{player:'phaseAfter'},
				filter(event,player){
					return game.hasPlayer(current=>{
						return current.countCards('h')+player.countCards('h')>0&&player!=current;
					})
				},
				direct:true,
				content(event,trigger,player){
					'step 0'
					/*const {result:{bool,targets}}=await */
					player.chooseTarget(get.prompt('zhimeng'),'与一名其他角色平分手牌',(card,player,target)=>{
						return target.countCards('h')+player.countCards('h')>0&&player!=target;
					}).set('ai',target=>{
						const player=get.player();
						const pvalue=-player.getCards('h').map(card=>get.value(card,player)).reduce((p,c)=>p+c,0);
						const tvalue=-target.getCards('h').map(card=>get.value(card,target)).reduce((p,c)=>p+c,0)*get.sgnAttitude(player,target);
						return (pvalue+tvalue)/2;
					});
					/*'step 1'
					if(!result.bool) return;
					const target=result.targets[0];
					player.logSkill('zhimeng',target);
					const lose_list=[];
					let cards=[];
					[player,target].forEach(current=>{
						const hs=current.getCards('h');
						if(hs.length){
							cards.addArray(hs);
							current.$throw(hs.length,500);
							game.log(current,'将',get.cnNumber(hs.length),'张牌置入了处理区');
							lose_list.push([current,hs]);
						}
					});
					game.loseAsync({
						lose_list:lose_list,
					}).setContent('chooseToCompareLose');
					//game.asyncDelay();
					game.delay();
					event.cards=cards;
					'step 2'
					//var cards=event.cards;
					cards=cards.filterInD();
					const pcards=cards.randomGets(Math.ceil(cards.length/2));
					const tcards=cards.removeArray(pcards);
					const list=[];
					if(pcards.length){
						list.push([player,pcards]);
						game.log(player,'获得了',get.cnNumber(pcards.length),'张牌');
					}
					if(tcards.length){
						list.push([target,tcards]);
						game.log(target,'获得了',get.cnNumber(tcards.length),'张牌');
					}
					game.loseAsync({
						gain_list:list,
						player:player,
						animate:'draw',
					}).setContent('gaincardMultiple');*/
					'step 1'
					if(!result.bool) event.finish();
					'step 2'
					var target=result.targets[0];
					player.logSkill('zhimeng',target);
                    event.tar=result.targets[0];
                    event.card=player.getCards('h').concat(event.tar.getCards('h'));
                    if(event.card.length==0) event.finish()
                    else if(event.card.length%2==0) event.num1= event.card.length/2
                    else event.num1 =(event.card.length+1)/2;
                    'step 3'
                    event.card1=event.card.randomGets(event.num1);
                    event.card2=event.card.filter(i=>!event.card1.contains(i));
                    player.gain(event.card1);
                    event.tar.gain(event.card2);
				},
				ai:{
					threaten:4,
				},
			},
			//新神华佗，技能有bug先搁置
			wuling:{
				audio:2,
				enable:'phaseUse',
				filter(event,player){
					return game.hasPlayer(target=>lib.skill.wuling.filterTarget(null,player,target));
				},
				filterTarget(card,player,target){
					return !target.hasSkill('wuling_wuqinxi');
				},
				usable:2,
				prompt:'选择一名角色，向其传授“五禽戏”',
				group:'wuling_die',
				content(){
					'step 0'
					target.addAdditionalSkill(`wuling_${player.playerid}`,'wuling_wuqinxi');
					var next=player.chooseToMove(`五灵：调整向${get.translation(target)}传授的“五禽戏”顺序`);
					next.set('list',[
						['',[lib.skill.wuling.wuqinxi,(item,type,position,noclick,node)=>{
							node=ui.create.buttonPresets.vcard(item,type,position,noclick);
							node._customintro=[
								node=>`五禽戏：${node.link[2]}`,
								node=>lib.skill.wuling.wuqinxiMap[lib.skill.wuling.wuqinxi.indexOf(node.link[2])].slice(2)
							];
							return node;
						}]]
					]);
					next.set('processAI',()=>{
						const event=_status.event.getParent(),player=event.player,target=event.target;
						const spirits=[];
						let nextPlayer=player;
						do{
							nextPlayer=nextPlayer.getNext();
							if(get.attitude(player,nextPlayer)<0){
								spirits.add('熊');
								break;
							}
						}
						while(nextPlayer!=target);
						if(!spirits.length) spirits.add('猿');
						if(get.recoverEffect(target,player,player)>0||target.hasCard(card=>{
							return get.effect(target,{
								name:card.viewAs||card.name,
								cards:[card],
							},target,target)<-1;
						},'j')) spirits.add('鹿');
						const others=lib.skill.wuling.wuqinxi.slice().removeArray(spirits);
						do{
							others.randomSort();
						}
						while(others.length>1&&others[0]=='鹿');
						return [spirits.concat(others).map(i=>['','',i])];
					})
					'step 1'
					var sortedWuqinxi=result.moved[0].map(i=>i[2]);
					game.log(target,'习得的五禽戏顺序为','#g'+sortedWuqinxi.join('、'));
					sortedWuqinxi.unshift(sortedWuqinxi[0]);
					target.storage.wuling_wuqinxi=sortedWuqinxi;
					lib.skill.wuling.updateMark(target);
				},
				wuqinxi:['虎','鹿','熊','猿','鹤'],
				wuqinxiMap:[
					'虎：当你使用指定唯一目标的牌对目标角色造成伤害时，此伤害+1。',
					'鹿：①当你获得此效果时，你回复1点体力并弃置判定区的所有牌。②你不能成为延时锦囊牌的目标。',
					'熊：每回合限一次，当你受到伤害时，此伤害-1。',
					'猿：当你获得此效果时，你选择一名其他角色，获得其装备区里的一张牌。',
					'鹤：当你获得此效果时，你摸三张牌。',
				],
				updateMark(player){
					var wuqinxi=player.storage.wuling_wuqinxi;
					if(!wuqinxi) return;
					var prevMark=wuqinxi.shift();
					// wuqinxi.push(prevMark);
					var curMark=wuqinxi[0];
					if(!curMark){
						for(var skill in player.additionalSkills){
							if(!skill.startsWith('wuling_')) continue;
							player.removeAdditionalSkill(skill);
						}
						game.log(player,'完成了五禽戏的操练');
						return;
					}
					game.log(player,'获得了','#g【'+curMark+'】','标记');
					player.markSkill('wuling_wuqinxi');
					game.broadcastAll(function(player,curMark){
						if(player.marks.wuling_wuqinxi) player.marks.wuling_wuqinxi.firstChild.innerHTML=curMark;
					},player,curMark);
					var next=game.createEvent('wuling_change');
					next.player=player;
					next.setContent('emptyEvent');
				},
				ai:{
					order:7,
					threaten:5,
					result:{target:1},
				},
				derivation:'wuling_wuqinxi',
				subSkill:{
					wuqinxi:{
						nopop:true,
						charlotte:true,
						intro:{
							markcount:()=>0,
							mark(dialog,storage){
								const wuqinxiMap=lib.skill.wuling.wuqinxiMap;
								const str=`<li>当前效果：${storage[0]}<br><li>${wuqinxiMap.find(str=>storage[0]==str[0]).slice(2)}<br>`;
								dialog.addText(str,false);
								const str2='<div class="text center">“五禽戏”顺序：<br>'+storage.join(' ')+'</div>';
								dialog.addText(str2);
								if(storage.length>1){
									const str3=`<div class="text" style="font-size:10px; ">[下一效果] ${wuqinxiMap.find(str=>storage[1]==str[0])}<br></div>`;
									dialog.add(str3);
								}
							},
						},
						mod:{
							targetEnabled(card,player,target){
								if(get.type(card)=='delay'&&target.storage.wuling_wuqinxi&&target.storage.wuling_wuqinxi[0]=='鹿') return false;
							},
						},
						trigger:{
							source:'damageBegin1',
							player:['phaseZhunbeiBegin','damageBegin4','wuling_change'],
						},
						filter(event,player,name){
							const wuqinxi=player.storage.wuling_wuqinxi&&player.storage.wuling_wuqinxi[0];
							if(!wuqinxi) return false;
							if(event.name=='phaseZhunbei') return true;
							switch(name){
								case 'damageBegin1':
									if(wuqinxi!='虎'||!event.card) return false;
									var evt=event.getParent('useCard');
									return evt.targets&&evt.targets.length==1&&evt.targets.includes(event.player);
								case 'damageBegin4':
									return wuqinxi=='熊'&&!player.hasSkill('wuling_xiong');
								default:
									switch(wuqinxi){
										case '鹿':
											return player.isDamaged()||player.countCards('j');
										case '鹤':
											return true;
										case '猿':
											return game.hasPlayer(target=>target!=player&&target.countGainableCards(player,'e'));
										default:
											return false;
									}
									break;
							}
						},
						forced:true,
						onremove:true,
						content(){
							'step 0'
							var wuqinxi=player.storage.wuling_wuqinxi[0];
							if(trigger.name=='phaseZhunbei'){
								lib.skill.wuling.updateMark(player);
								event.finish();
							}
							else{
								var name=event.triggername;
								switch(name){
									case 'damageBegin1':
										player.line(trigger.player);
										trigger.num++;
										event.finish();
										break;
									case 'damageBegin4':
										player.addTempSkill('wuling_xiong');
										trigger.num--;
										event.finish();
										break;
									default:
										switch(wuqinxi){
											case '鹿':
												player.recover();
												player.discard(player.getCards('j')).discarder=player;
												event.finish();
												break;
											case '鹤':
												player.draw(3);
												event.finish();
												break;
											case '猿':
												player.chooseTarget('五禽戏：获得一名其他角色装备区里的一张装备牌',function(card,player,target){
													return target!=player&&target.countGainableCards(player,'e');
												}).set('ai',function(target){
													var player=_status.event.player;
													var att=get.attitude(player,target),eff=0;
													target.getCards('e',function(card){
														var val=get.value(card,target);
														eff=Math.max(eff,-val*att);
													});
													return eff;
												});
												break;
										}
										break;
								}
							}
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.line(target,'green');
								player.gainPlayerCard(target,'e',true);
							}
						},
						ai:{
							effect:{
								target(card,player,target){
									const wuqinxi=target.storage.wuling_wuqinxi;
									if(!wuqinxi||!wuqinxi.length) return;
									const curWuqinxi=wuqinxi[0];
									const nextWuqinxi=wuqinxi[1];
									if(nextWuqinxi=='鹿'&&get.type(card)=='delay') return 'zerotarget';
									if(curWuqinxi!='熊'||player.hasSkill('wuling_xiong')) return;
									if(player.hasSkillTag('jueqing',false,target)) return;
									var num=get.tag(card,'damage');
									if(num){
										if(num>1) return 0.5;
										return 0;
									}
								}
							}
						},
					},
					xiong:{charlotte:true},
					die:{
						trigger:{player:'die'},
						filter(event,player){
							return game.hasPlayer(current=>current.additionalSkills[`wuling_${player.playerid}`]);
						},
						forced:true,
						locked:false,
						forceDie:true,
						content(){
							var targets=game.filterPlayer(current=>{
								return current.additionalSkills[`wuling_${player.playerid}`];
							});
							player.line(targets);
							targets.forEach(current=>current.removeAdditionalSkill(`wuling_${player.playerid}`));
						},
					},
				},
			},
			youyi:{
				init(player){
					player.storage.renku=true;
				},
				audio:2,
				enable:'phaseUse',
				filter(event,player){
					return _status.renku.length>0;
				},
				prompt:'将仁区所有牌置入弃牌堆，令所有角色各回复1点体力',
				content(){
					'step 0'
					var cards=_status.renku.slice();
					game.cardsDiscard(cards).fromRenku=true;
					_status.renku.removeArray(cards);
					player.$throw(cards,1000);
					game.updateRenku();
					game.log(cards,'从仁库进入了弃牌堆');
					'step 1'
					var targets=game.filterPlayer();
					player.line(targets);
					targets.forEach(target=>target.recover());
				},
				ai:{
					order(item,player){
						return get.order({name:'taoyuan'},player);
					},
					result:{
						player(player){
							return Math.max(0,game.filterPlayer().reduce((num,target)=>num+get.recoverEffect(target,player,player),0));
						},
					},
				},
				group:'youyi_put',
				subSkill:{
					put:{
						audio:'youyi',
						trigger:{player:'phaseDiscardEnd'},
						filter(event,player){
							return lib.skill.twlijian.getCards(event).length;
						},
						prompt2(event,player){
							return '将'+get.translation(lib.skill.twlijian.getCards(event))+'置入仁区';
						},
						content(){
							var cards=lib.skill.twlijian.getCards(trigger);
							game.log(player,'将',cards,'置于了仁库');
							game.cardsGotoSpecial(cards,'toRenku');
						},
					},
				},
			},
			//神贾诩
			jxlianpo:{
				audio:2,
				init:()=>{
					game.addGlobalSkill('jxlianpo_global');
				},
				onremove:()=>{
					if(!game.hasPlayer(i=>i.hasSkill('jxlianpo'),true)) game.removeGlobalSkill('jxlianpo_global');
				},
				trigger:{global:'dieAfter'},
				filter(event,player){
					if(lib.skill.jxlianpo.getMax().length<=1) return false;
					return event.source&&event.source.isIn();
				},
				forced:true,
				logTarget:'source',
				getMax:()=>{
					const map={
						zhu:game.countPlayer(current=>{
							const identity=current.identity;
							let num=0;
							if(identity=='zhu'||identity=='zhong'||identity=='mingzhong') num++;
							num+=current.countMark('jxlianpo_mark_zhong');
							num+=current.countMark('jxlianpo_mark_zhu');
							return num;
						}),
						fan:game.countPlayer(current=>{
							let num=0;
							if(current.identity=='fan') num++;
							num+=current.countMark('jxlianpo_mark_fan');
							return num;
						}),
						nei:game.countPlayer(current=>{
							let num=0;
							if(current.identity=='nei') num++;
							num+=current.countMark('jxlianpo_mark_nei');
							return num;
						}),
						commoner:game.countPlayer(current=>{
							let num=0;
							if(current.identity=='commoner') num++;
							num+=current.countMark('jxlianpo_mark_commoner');
							return num;
						}),
					};
					let population=0,identities=[];
					for(let i in map){
						let curPopulation=map[i]
						if(curPopulation>=population){
							if(curPopulation>population) identities=[];
							identities.add(i);
							population=curPopulation;
						}
					}
					return identities;
				},
				group:'jxlianpo_show',
				global:'jxlianpo_global',
				content(){
					var source=trigger.source;
					source.draw(2);
					source.recover();
				},
				init:function(player,skill){
				  var translist={
				    zhu2:"主公",
			        zhong2:"忠臣",
			        mingzhong2:"明忠",
			        nei2:"内奸",
			        fan2:"反贼",
			        random2:"随机",
			        commoner2:"其他",
			      };
			      for(var i in translist) {
			          if(!lib.translate[i]) lib.translate[i]=translist[i];
			      }
				},
				mark:true,
				intro:{
					content:()=>`场上最大阵营为${lib.skill.jxlianpo.getMax().map(i=>{
						if(i=='zhu') return '主忠';
						return get.translation(i+'2');
					}).join('、')}`,
				},
				$createButton(item,type,position,noclick,node){
					node=ui.create.identityCard(item,position,noclick);
					node.link=item;
					return node;
				},
				subSkill:{
					show:{
						audio:'jxlianpo',
						trigger:{global:'roundStart'},
						filter(event,player){
							//在这里执行清空原有标记的任务
							for(var i in player.storage){
								if(i.startsWith('jxlianpo_mark_')){
									//player.clearMark(i);
									player.removeMark(i);
								}
							}
							//结束
							var list=lib.config.mode_config.identity.identity.lastItem.slice();
							list.removeArray(game.filterPlayer().map(i=>{
								let identity=i.identity;
								if(identity=='mingzhong') identity='zhong';
								return identity;
							}));
							return list.length;
						},
						forced:true,
						content(){
							'step 0'
							var list=lib.config.mode_config.identity.identity.lastItem.slice();
							for(var i=0;i<list.length;i++) {
							    var ide=list[i];
							    lib.card['identity_'+ide]={
							        /*fullskin:true,*/
							        /*image:'ext:identity/'+ide+'.png',*/
							        image:'ext:identity/DefaultCard/identity_'+ide+'.webp',
							        opacity:1,
                                    textShadow:'black 0 0 2px',
							    };
							    lib.translate['identity_'+ide]='　';
							    lib.translate['identity_'+ide+'_info']='一张用于表示角色身份的身份牌';
							}
							'step 1'
							var list=lib.config.mode_config.identity.identity.lastItem.slice();
							list.removeArray(game.filterPlayer().map(i=>{
								var identity=i.identity;
								return identity=='mingzhong'?'zhong':identity;
							}));//.unique();
							var lists=[];
							for(var i=0;i<list.length;i++) {
							    var ide=list[i];
							    
							    //lists.push(game.createCard({name:'identity_'+ide,number:' ',suit:' '}));
							    var cardide=game.createCard({name:'identity_'+ide,number:' ',suit:' '});
							    //cardide.classList.add('fullskin');
					            //cardide.node.image.setBackgroundImage('image/card/identity_'+ide+'.jpg');
					            lists.push(cardide);
							}
							//'###炼魄：请选择一个身份###<div class="text center">你选择的身份对应的阵营角色数于本轮内视为+1</div>';
							var str='###'+game.changeToGoldTitle('炼魄')+'###<div class="text center">你选择的身份对应的阵营角色数于本轮内视为+1</div>';
							player.chooseButton([
								str,
								/*[list,function(item,type,position,noclick,node){
									return lib.skill.jxlianpo.$createButton(item,type,position,noclick,node);
								}],*/
								[lists,'vcard'],
							],true).ai=function(button){
							    var str='identity_';
							    var cardname=button.link.name.slice(str.length)||'none';
							    var friendsNum=game.countPlayer(current=>{
							        return get.attitude(player,current)>0;
							    });
							    var arr={
							       zhu:0,
							       zhong:0,
							       nei:0,
							       fan:0,
							    }
							    var enemyNum=game.players.length-friendsNum;
							    switch(player.identity) {
							        case 'zhu':
							        case 'zhong':
							            if(friendsNum>=enemyNum) {
							                arr.zhu=3;
							                arr.zhong=3;
							                arr.nei=2.5;
							            }else {
							                arr.zhu=2.3;
							                arr.zhong=2.3;
							                arr.nei=2;
							            }
							            break;
							        case 'nei':
							            arr.zhu=0.2;
							            arr.zhong=0.2;
							            break;
							        case 'fan':
							            if(friendsNum>=enemyNum) {
							                arr.fan=3;
							            }else {
							                arr.fan=2.2;
							                arr.nei=2;
							            }
							            break;
							        default:
							            if(friendsNum>enemyNum) {
							                arr.fan=2.6;
							                arr.nei=2.3;
							                arr.zhong=2;
							                arr.zhu=2;
							            }else {
							                arr.nei=2.3;
							                arr.zhong=2.2;
							                arr.zhu=2.2;
							                arr.fan=2;
							            }
							            break;
							    }
							    if(arr[cardname]) {
							        return arr[cardname]+Math.random();
							    }else {
							        return Math.random();
							    }
							};
							'step 2'
							var str='identity_';
							var choice=result.links[0].name.slice(str.length),mark=`jxlianpo_mark_${choice}`;
							//when语法这版本不用，移到前面
							/*player.when({global:'roundStart'})
								.assign({
									firstDo:true,
								})
								.filter(evt=>evt!=trigger)
								.then(()=>{
									for(var i in player.storage){
										if(i.startsWith('jxlianpo_mark_')){
											player.clearMark(i);
										}
									}
								});*/
							player.addMark(mark,1,false);
							event.videoId=lib.status.videoId++;
							var createDialog=function(player,identity,id){
								var dialog=ui.create.dialog(`${get.translation(player)}展示了“${get.translation(identity+'2')}”的身份牌<br>`,'forcebutton');
								dialog.videoId=id;
								ui.create.spinningIdentityCard(identity,dialog);
							};
							game.broadcastAll(createDialog,player,choice,event.videoId);
							var color='';
							if(choice=='zhong'||choice=='zhu') color='#y';
							else if(choice=='fan') color='#g';
							else if(choice=='nei') color='#b';
							game.log(player,'展示了',`${color}${get.translation(choice+'2')}`,'的身份牌');
							game.delay(3);
							'step 3'
							game.broadcastAll('closeDialog',event.videoId);
						},
					},
					global:{
						mod:{
							maxHandcard(player,num){
								if(!lib.skill.jxlianpo.getMax().includes('fan')) return;
								return num-game.countPlayer(current=>{
									return current!=player&&current.hasSkill('jxlianpo');
								});
							},
							cardUsable(card,player,num){
								if(card.name=='sha'){
									if(!lib.skill.jxlianpo.getMax().includes('fan')) return;
									return num+game.countPlayer(current=>{
										return current.hasSkill('jxlianpo');
									});
								}
							},
							attackRange(player,num){
								if(!lib.skill.jxlianpo.getMax().includes('fan')) return;
								return num+game.countPlayer(current=>{
									return current.hasSkill('jxlianpo');
								});
							},
							cardSavable(card,player,target){
								if(card.name=='tao'&&!player.hasSkill('jxlianpo')){
									if(!lib.skill.jxlianpo.getMax().includes('zhu')) return;
									if(player==target) return;
									return false;
								}
							},
							playerEnabled(card,player,target){
								if(card.name=='tao'&&!player.hasSkill('jxlianpo')){
									if(!lib.skill.jxlianpo.getMax().includes('zhu')) return;
									if(player==target) return;
									return false;
								}
							}
						},
						trigger:{player:'dieAfter'},
						filter:()=>{
							return !game.hasPlayer(i=>i.hasSkill('jxlianpo'),true);
						},
						silent:true,
						forceDie:true,
						content:()=>{
							game.removeGlobalSkill('jxlianpo_global');
						},
					},
				},
			},
			jxzhaoluan:{
				audio:2,
				trigger:{global:'dieBegin'},
				filter(event,player){
					return event.getParent().name=='dying'&&event.player.isIn();
				},
				limited:true,
				skillAnimation:true,
				animationColor:'metal',
				logTarget:'player',
				check(event,player){
					if(event.source&&event.source.isIn()&&get.attitude(player,event.source)>0&&player.identity=='fan') return false;
					return get.attitude(player,event.player)>3.5;
				},
				init:function(player,skill){
				    game.createCss(`@keyframes jxzhaoluan_zhuan {
				        0% {
				            transform: rotateY(0deg);
				        }
				        50% {
				            transform: rotateY(90deg);
				        }
				        100% {
				            transform: rotateY(0deg);
				        }
				    }`);
				    game.createCss(`@keyframes jxzhaoluan_died {
				        0% {
				            opacity: 1;
				        }
				        50% {
				            opacity: 0.7;
				        }
				        100% {
				            opacity: 1;
				        }
				    }`);
				    //game.me.createHighLight([[255,255,255],[200,150,255],[140,90,255]],5);
				    game.createCss(`.jxzhaoluan_light {
				        /*filter: drop-shadow(0px 0px 2px rgb(255,255,255)) drop-shadow(0px 0px 4px rgb(200,150,255)) drop-shadow(0px 0px 8px rgb(140,90,255));*/
				        box-shadow: rgb(255,255,255) 0px 0px 2px 2px,
				                      rgb(200,150,255) 0px 0px 4px 3px,
				                      rgb(140,90,255) 0px 0px 8px 4px !important;
				    }`);
				    if(lib.config.effect_lo_shen_jiaxu=='saturate') {
				        game.createCss(`.jxzhaoluan_ghost {
				            filter: contrast(120%) brightness(120%) saturate(80%) invert(100%) grayscale(0) blur(0);
				        }`);
				    }else {
				        game.createCss(`.jxzhaoluan_ghost {
				            background-image: url("${lib.assetURL}image/character/shen_jiaxu_die.jpg") !important;
				        }`);
				    }
				},
				content(){
					'step 0'
					var target=trigger.player;
					player.awakenSkill('jxzhaoluan');
					trigger.cancel();
					target.getSkills(null,false,false).forEach(skill=>{
						var info=get.info(skill);
						if(info&&!info.charlotte&&!get.is.locked(skill)){
							target.removeSkill(skill);
						}
					});
					'step 1'
					var target=trigger.player;
					target.gainMaxHp(3);
					'step 2'
					var target=trigger.player;
					var num=3-target.getHp(true);
					if(num>0) target.recover(num);
					target.draw(4);
					//直接变丧尸
					//target.style.filter='invert(100%)';
					var changeSS=function(node,node2) {
					    if(!node) return;
					    //node.style.transition='all 0.7s linear 0s';
					    //node.style.filter='brightness(-100%) saturate(100%) invert(0) grayscale(0) blur(3px)';
					    if(node2) {
					        node2.style.transition='all 0.7s ease-in';
					        node2.style.transform='rotateY(90deg)';
					        //node2.style.filter='blur(1px)';
					        //node2.style.filter='drop-shadow(0px 0px 10px rgb(100,100,255))';
					        //node2.classList.add('jxzhaoluan_light');
					        node2.createHighLight([[255,255,255],[200,150,255],[140,90,255]],6,{level:10}).style.animation = 'jxzhaoluan_died 5s infinite ease';
					    }
					    setTimeout(function(){
					        if(node2) {
					            node2.style.transition='all 0.7s ease-out';
					            node2.style.transform='';
					            /*setTimeout(function(){
					                node2.style.transition='all 4s ease-out';
					                node2.style.filter='';
					            },710);*/
					        }
					        //node.style.filter='contrast(120%) brightness(120%) saturate(80%) invert(100%) grayscale(0) blur(0)';
					        node.classList.add('jxzhaoluan_ghost');
					        //node.setBackground('shen_jiaxu_die','character');
					    },710);
					    
					}
					if(lib.config.effect_lo_shen_jiaxu!='none') {
					/*target.node.avatar.style.transition='all 0.7s linear 0s';
					target.node.avatar.style.filter='brightness(-100%) saturate(100%) invert(0) grayscale(0) blur(3px)';
					setTimeout(function(){
					    target.node.avatar.style.transition='';
					    target.node.avatar.style.filter='brightness(400%) saturate(80%) invert(100%) grayscale(0) blur(3px)';
					    setTimeout(function(){
					        target.node.avatar.style.transition='all 1s linear 0s';
					        target.node.avatar.style.filter='brightness(100%) saturate(80%) invert(100%) grayscale(0) blur(0)';
					    },0);
					},1000);*/
					changeSS(target.node.avatar,target);
					changeSS(target.node.avatar2);
					target.addSkill('jxzhaoluan_dieresume');
					}
					//target.node.hp.filter='invert(100%)';
					player.addSkill('jxzhaoluan_effect');
					//markAuto不知道为啥不顶用了，改写法
					//player.markAuto('jxzhaoluan_effect',target);
					if(!player.storage.jxzhaoluan_effect) {
					    player.storage.jxzhaoluan_effect=[];
					}
					player.storage.jxzhaoluan_effect.add(target);
				},
				ai:{
					expose:0.5,
					threaten:3,
				},
				subSkill:{
				    dieresume:{
				        trigger:{
				            player:["die","dieBegin"],
				            //global:['chooseToUse'],
				        },
				        filter(event,player){
				            return player.getHp()<1;
				        	//return ((player.isIn()&&player.getHp()>0)+!player.storage.isDead)==1;
				        },
				        //新增个样子修改
			         	init:function(player,skill){
				            //复活时变回彩色
				            var upd=lib.element.player.revive.toString();
						    var ret=upd.lastIndexOf("game.addVideo('revive',this);");
						    window.shenjiaxuFace=function(player){
						        if(player.hasSkill('jxzhaoluan_dieresume')) {
						            if(player.node.avatar) {
						                player.node.avatar.style.transition='all 0.5s linear 0s';
				                        //player.node.avatar.style.filter='brightness(100%) saturate(80%) invert(100%) grayscale(0) blur(0)';
				                        player.node.avatar.classList.add('jxzhaoluan_ghost');
				                    }
				                    //player.removeSkill('jxzhaoluan_dieresume');
				                    if(player.node.avatar2) {
				                        player.node.avatar2.style.transition='all 0.5s linear 0s';
				                        //player.node.avatar2.style.filter='brightness(100%) saturate(80%) invert(100%) grayscale(0) blur(0)';
				                        player.node.avatar2.classList.add('jxzhaoluan_ghost');
				                    }
				                    return true;
						        }
						        return false;
					    	}
					    	var upds='('+upd.slice(0,ret)+'window.shenjiaxuFace(this);'+upd.slice(ret)+')';
					    	window.upds=upds;
					    	//player.update=JSON.parse(upds);
					    	player.revive=eval(upds);
						    //player.update();
						    //趋势时变不正常
						    var upd=lib.element.player.update.toString();
						    var ret=upd.lastIndexOf('return');
						    window.jiangshiHp=function(player){
						        if(player.hasSkill('jxzhaoluan_dieresume')) {
						        //var player=this;
						            player.node.hp.style.filter='invert(100%) saturate(80%)';
						            /*var hps=player.node.hp.childNodes;
						            for(var i=player.maxHp-player.hp;i<player.maxHp;i++) {
						                var more=player.maxHp-i;
						                //hps[i].style['background-size']='100% 100%';
						                //if(more>=3) hps[i].style['background']="url('image/nezha_hp/Hp_3.png')";
						                hps[i].style.filter='invert(100%)';
						            }*/
						        }else {
						            player.node.hp.style.filter='';
						        }
					    	}
					    	var upds='('+upd.slice(0,ret)+'window.jiangshiHp(this);'+upd.slice(ret)+')';
					    	window.upds=upds;
					    	//player.update=JSON.parse(upds);
					    	player.update=eval(upds);
						    player.update();
				        },
				        priority:-100,
				        forced:true,
				        forceDie:true,
				        silent:true,
				        charlotte:true,
				        content:function() {
				            if(player.node.avatar) {
				                player.node.avatar.style.transition='all 0.5s linear 0s';
				                //player.node.avatar.style.filter='brightness(100%) saturate(80%) invert(100%) grayscale(100%) blur(0)';
				                player.node.avatar.classList.remove('jxzhaoluan_ghost');
				            }
				            if(player.node.avatar2) {
				                player.node.avatar2.style.transition='all 0.5s linear 0s';
				                //player.node.avatar2.style.filter='brightness(100%) saturate(80%) invert(100%) grayscale(100%) blur(0)';
				                player.node.avatar2.classList.remove('jxzhaoluan_ghost');
				            }
				            //player.classList.remove('jxzhaoluan_light');
				            player.createHighLight([],0,{level:10,opacity:0}).style.animation='none';
				            /*if(player.isIn()&&player.getHp()>0) {
				                player.node.avatar.style.filter='brightness(100%) saturate(80%) invert(100%) grayscale(0) blur(0)';
				                player.storage.isDead=false;
				            }else {
				                player.node.avatar.style.filter='brightness(100%) saturate(80%) invert(100%) grayscale(100%) blur(0)';
				                player.storage.isDead=true;
				            }*/
				            
				        },
				    },
					hit:{},
					effect:{
						audio:'jxzhaoluan',
						enable:'phaseUse',
						filter(event,player){
							return player.getStorage('jxzhaoluan_effect').some(i=>i.isIn());
						},
						filterTarget(card,player,target){
							//什么鬼吧写法向下兼容性忒差了吧
							//return !player.getStorage('jxzhaoluan_hit').includes(target);
							return !target.hasSkill('jxzhaoluan_hit');
						},
						line:false,
						locked:true,
						charlotte:true,
						promptfunc(){
							var bodies=_status.event.player.getStorage('jxzhaoluan_effect').filter(i=>i.isIn());
							return `选择一名角色，你令${get.translation(bodies)}${bodies.length>1?'中的一人':''}减1点体力上限，然后你对选择的角色造成1点伤害。`;
						},
						delay:false,
						content(){
							'step 0'
							var bodies=player.getStorage('jxzhaoluan_effect').filter(i=>i.isIn());
							if(bodies.length==1) event._result={bool:true,targets:bodies};
							else{
								player.chooseTarget('兆乱：请选择被减上限的傀儡',true,(card,player,target)=>{
									return _status.event.targets.includes(target);
								}).set('targets',bodies).set('ai',target=>{
									return 8-get.attitude(_status.event.player,target);
								});
							}
							'step 1'
							if(result.bool){
								event.source=result.targets[0];
								player.line(event.source);
								event.source.loseMaxHp();
								game.delay();
							}
							else event.finish();
							'step 2'
							event.source.line(target);
							target.damage();
							/*if(!player.storage.jxzhaoluan_hit){
								player.when('phaseUseAfter')
									.then(()=>{
										delete player.storage.jxzhaoluan_hit;
									});
							}
							player.markAuto('jxzhaoluan_hit',target);*/
							target.addTempSkill('jxzhaoluan_hit');
						},
						ai:{
							order:9,
							result:{
								player(player){
									var bodies=player.getStorage('jxzhaoluan_effect').filter(i=>i.isIn());
									var body;
									if(bodies.length==1) body=bodies[0];
									else body=bodies.sort((a,b)=>get.attitude(player,a)-get.attitude(player,b))[0];
									if(get.attitude(player,body)>4&&!body.isDamaged()&&body.getHp()<=2) return -10;
									return 0;
								},
								target(player,target){
									return Math.sign(get.damageEffect(target,player,target));
								}
							}
						}
					},
				},
			},
		    //神华佗    
            mbyouyi:{
				trigger:{
					player:"phaseDiscardAfter",
				},
				filter:function(event,player){
					if(event.player.isIn()){
						return event.player.getHistory('lose',function(evt){
							return evt.type=='discard'&&evt.getParent('phaseDiscard')==event&&evt.hs.filterInD('d').length>0;
						}).length>0;
					}
					return false;
				},
				content:function(){
					'step 0'
					var cards=[],cards2=[];
					var target=trigger.player;
					game.getGlobalHistory('cardMove',function(evt){
						if(evt.name=='cardsDiscard'){
							if(evt.getParent('phaseDiscard')==trigger){
								var moves=evt.cards.filterInD('d');
								cards.addArray(moves);
								cards2.removeArray(moves);
							}
						}
						if(evt.name=='lose'){
							if(evt.type!='discard'||evt.position!=ui.discardPile||evt.getParent('phaseDiscard')!=trigger) return;
							var moves=evt.cards.filterInD('d');
							cards.addArray(moves);
							if(evt.player==target) cards2.addArray(moves);
							else cards2.removeArray(moves);
						}
					});
					if(!cards2.length) {
						event.finish();
					}
					else game.cardsGotoSpecial(cards, 'toRenku');
				},
				group:'mbyouyi_taoyuan',
				subSkill:{
					taoyuan:{
						enable:'phaseUse',
						usable:1,
						filter:function(event,player){
							return _status.renku.length>0;
						},
						content:function(){
							game.cardsDiscard(_status.renku).fromRenku = true;
                			_status.renku.remove(_status.renku);
							game.countPlayer(function(current){current.recover()});
							_status.renku.length=0;
        					game.updateRenku();
						}
					}
				}
			},
			mbwuling:{
				derivation:'mbwuling_content',
				audio:2,
				enable:'phaseUse',
				usable:2,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return !current.storage.mbwuling;
					});
				},
				filterTarget:function(card,player,target){
					return !target.storage.mbwuling;
				},
				check:function(event,player){
					return get.attitude(player,event.player);
				},
				content:function(){
					'step 0'
					event.wuqinxi=['虎灵','鹿灵','熊灵','猿灵','鹤灵'];
					event.teach=[];
					'step 1'
					player.chooseControl(event.wuqinxi).set('ai',function(){
                        return event.wuqinxi.randomGet();
                    }).set('prompt','请传授'+get.translation(target)+'「五禽戏」中的一个动作');
					'step 2'
					event.teach.add(result.control);
					event.wuqinxi.splice(event.wuqinxi.indexOf(result.control),1);
					event.goto(4);
					'step 3'
					if(event.wuqinxi.length==0){
						target.storage.mbwuling=event.teach;
						target.addSkill('mbwuqinxi');
						if(target.storage.mbwuling[0]=='鹿灵'){
							target.recover();
							if(target.countCards('j')>0)target.discardPlayerCard(target,'j',target.countCards('j'),true);
						}
						event.goto(4);
					}
					else event.goto(1);
					'step 4'
                    if(target.storage.mbwuling[0]=='鹤灵'){
                        target.draw(3);
                    }else if(target.storage.mbwuling[0]=='猿灵'){
                        target.chooseTarget('选择一名其他角色，获得其装备区里的一张牌',function(card,player,target){
                            return player!=target&&target.countGainableCards(player,'e');
                        }).set('ai',function(current){
                            //var player=_status.event.player;
                            return -get.attitude(target,current)*current.countCards('e')+0.5;
                        });
                    }else event.finish();
                    'step 5'
                    if(result.bool){
                        var him=result.targets[0];
                        if(him.countGainableCards(target,'e')>0){
                            target.gainPlayerCard(him,true,'e');
                        }
                    }
                    event.finish();
				},
				ai:{
				    order:9,
				    result:{
				        target:function(player,target){
				            return 2;
				        },
				    },
			    	threaten:2,
			    },
			},
			mbwuqinxi:{
				forced:true,
				charlotte:true,
				popup:false,
				mark:true,
				marktext:'五灵',
				intro:{
					name:function(storage,player){
					    if(!player.storage.mbwuling||!player.storage.mbwuling.length) return '你的「五禽戏」没有任何内容';
						var first='';
						var stg=player.storage.mbwuling;
						if(player.storage.mbwuling_past&&player.storage.mbwuling_past.length) {
						    var sts=player.storage.mbwuling_past;
						    for(var i=0;i<sts.length;i++) {
    						    first+='<span style="opacity:0.6"> '+sts[i].slice(0,1)+'</span>';
    						}
						}
						first+='『'+stg[0].slice(0,1)+'』';
						for(var i=1;i<stg.length;i++) {
						    first+='<span style="opacity:0.6"> '+stg[i].slice(0,1)+'</span>';
						}
						/*for(var i=1;i<stg.length;i++) {
						    var opa=1-(i/stg.length)
						    first+='<span style="opacity:'+opa+'"> '+stg[i].slice(0,1)+'</span>';
						}*/
						return first;
					},
					markcount:function(storage,player){return player.storage.mbwuling[0]},
					content:function(storage,player){
						if(!player.storage.mbwuling||!player.storage.mbwuling.length) return '你的「五禽戏」没有任何内容';
						/*var first='';
						var stg=player.storage.mbwuling;
						first+='『'+stg.slice(0,1)+'』';
						for(var i=1;i<stg.length;i++) {
						    first+=stg[i].slice(0,1);
						}*/
						var second='<li>当前效果：';
						var str=player.storage.mbwuling[0];
						/*switch(str){
							case '虎灵':str='若你使用的牌仅指定唯一目标，则此牌对目标角色造成伤害时此伤害+1。';break;
							case '鹿灵':str='你获得“鹿灵”标记时，回复1点体力，移除判定区所有牌。你不能成为延时锦囊目标。';break;
							case '猿灵':str='你的出牌阶段开始时，选择一名其他角色，随机获得其装备区里的一张牌。';break;
							case '熊灵':str='你受到伤害时，此伤害-1。';break;
							case '鹤灵':str='你的出牌阶段开始时摸两张牌。';break;
						}*///☞虎>鹿>猿>熊>鹤
						//当前：XXX
						//下一效果：XXX
                        if(lib.translate['mbwuling_'+str]) str=lib.translate['mbwuling_'+str];
                        second+=str;
                        if(player.storage.mbwuling.length>=2) {
                            var str=player.storage.mbwuling[1];
                            second+='<br>　 <span style="opacity:0.6">下一效果：';
                            if(lib.translate['mbwuling_'+str]) str=lib.translate['mbwuling_'+str];
                            second+=str+'</span>';
                        }else {
                            var str=player.storage.mbwuling[1];
                            second+='<br>　 <span style="opacity:0.6">下一效果：你结束五禽戏的所有效果。</span>';
                        }
						return second;
					},
				},
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return player.storage.mbwuling;
				},
				content:function(){
					'step 0'
					if(!player.storage.mbwuling_past||player.storage.mbwuling.length>=5) player.storage.mbwuling_past=[];
					var trick = player.storage.mbwuling.shift();
					player.storage.mbwuling_past.push(trick);
					//player.storage.mbwuling.push(trick);
					if(player.storage.mbwuling.length) {
    					if(player.storage.mbwuling[0]=='鹿灵'){
    						player.recover();
    						if(player.countCards('j')>0)player.discardPlayerCard(player,'j',player.countCards('j'),true);
    					}
    					if(player.storage.mbwuling[0]=='鹤灵'){
    						player.draw(3);
    					}
    					if(player.storage.mbwuling[0]=='猿灵'){
    						player.chooseTarget('选择一名其他角色，获得其装备区里的一张牌',function(card,player,target){
                                return player!=target&&target.countGainableCards(player,'e');
                            }).set('ai',function(target){
    							var player=_status.event.player;
    							return -get.attitude(player,target)*target.countCards('e')+0.5;
    						});
    					}else event.finish();
					}else {
					    player.storage.mbwuling=undefined;
					    player.storage.mbwuling_past=undefined;
					    player.removeSkill('mbwuqinxi');
					    event.finish();
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						if(target.countGainableCards(player,'e')>0){
                            player.gainPlayerCard(target,true,'e');
                        }
					}
					event.finish();
				},
				group:['mbwuqinxi_hu','mbwuqinxi_he','mbwuqinxi_yuan','mbwuqinxi_xiong','mbwuqinxi_lu'],
				subSkill:{
					hu:{
						direct:true,
						charlotte:true,
						trigger:{player:'useCardToPlayered'},
						filter:function(event,player){
							return player.storage.mbwuling&&player.storage.mbwuling[0]=='虎灵'&&event.targets.length==1;
						},
						content:function(){
							if(get.tag(trigger.card,'damage')) trigger.getParent().baseDamage++;
						}
					},
					he:{
						direct:true,
						charlotte:true,
						/*trigger:{player:'phaseUseBegin'},
						filter:function(event,player){
							return player.storage.mbwuling&&player.storage.mbwuling[0]=='鹤灵';
						},
						content:function(){
							player.draw(2);
						}*/
					},
					yuan:{
						direct:true,
						charlotte:true,
						/*trigger:{player:'phaseUseBegin'},
						filter:function(event,player){
							return player.storage.mbwuling&&player.storage.mbwuling[0]=='猿灵';
						},
						content:function(){
							'step 0'
							player.chooseTarget('五灵：出牌阶段开始时，选择一名其他角色，随机获得其装备区里的一张牌',lib.filter.notMe).set('ai',function(target){
								var player=_status.event.player;
								return -get.attitude(player,target)*target.countCards('e')+0.5;
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								if(target.countCards('e')>0){
									var card=target.getCards('e').randomGet();
									player.gain(card,'gain2');
								}
							}
						}*/
					},
					xiong:{
						direct:true,
						charlotte:true,
						trigger:{
							player:'damageBegin2',
						},
						usable:1,
						filter:function(event,player){
							return player.storage.mbwuling&&player.storage.mbwuling[0]=='熊灵';
						},
						content:function(){
							trigger.num--;
						}
					},
					lu:{
						direct:true,
						charlotte:true,
						mod:{
							targetEnabled:function(card,player,target){
								if(player.storage.mbwuling&&player.storage.mbwuling[0]=='鹿灵'&&get.type(card)=='delay') return false;
							},
						},
					},
				}
			},
			//神典韦
			juanjia:{
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&player.hasEnabledSlot(2);
				},
				content:function(){
					player.disableEquip(2);
					player.expandEquip(1);
				},
			},
			qiexie:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.countEquipableSlot(1)>0;
				},
				content:function(){
					'step 0'
					if(!_status.characterlist){
						lib.skill.pingjian.initList();
					}
					var list=_status.characterlist.randomGets(5);
					if(!list.length) event.finish();
					else{
						var num=player.countEquipableSlot(1);
						player.chooseButton([
							'挈挟：选择至多'+get.cnNumber(num)+'张武将置入武器栏',
							[list,'character'],
						],[1,num],true).set('filterButton',function(button){
							var name=button.link;
							var info=lib.character[name];
							if(info[3].some(function(skill){
								var info=get.skillInfoTranslation(skill);
								if(!info.includes('【杀】')) return false;
								var list=get.skillCategoriesOf(skill);
								list.remove('锁定技');
								return list.length==0;
							})){
								button.classList.add('glow2');
							}
							return true;
						}).set('ai',function(button){
							var name=button.link;
							var info=lib.character[name];
							var skills=info[3].filter(function(skill){
								var info=get.skillInfoTranslation(skill);
								if(!info.includes('【杀】')) return false;
								var list=get.skillCategoriesOf(skill);
								list.remove('锁定技');
								return list.length==0;
							});
							var eff=0.2;
							for(var i of skills){
								eff+=get.skillRank(i,'in');
							}
							return eff;
						})
					}
					'step 1'
					if(result.bool){
						var list=result.links;
						game.addVideo('skill',player,['qiexie',[list]])
						game.broadcastAll(function(list){
							for(var name of list) lib.skill.qiexie.createCard(name);
						},list);
						var cards=list.map(function(name){
							var card=game.createCard('qiexie_'+name,'none',get.infoMaxHp(lib.character[name][2]));
							return card;
						});
						player.addTempSkill('qiexie_blocker','qiexieAfter');
						player.markAuto('qiexie_blocker',cards);
						player.$gain2(cards);
						game.delayx();
						for(var card of cards) player.equip(card);
					}
				},
				video:function(player,info){
					for(var name of info[0]){
						lib.skill.qiexie.createCard(name);
					}
				},
				createCard:function(name){
					if(!_status.postReconnect.qiexie) _status.postReconnect.qiexie=[
						function(list){
							for(var name of list) lib.skill.qiexie.createCard(name);
						},[]
					];
					_status.postReconnect.qiexie[1].add(name)
					if(!lib.card['qiexie_'+name]){
						if(lib.translate[name+'_ab']) lib.translate['qiexie_'+name]=lib.translate[name+'_ab'];
						else lib.translate['qiexie_'+name]=lib.translate[name];
						var info=lib.character[name];
						var card={
							fullimage:true,
							image:'character:'+name,
							type:'equip',
							subtype:'equip1',
							enable:true,
							selectTarget:-1,
							filterCard:function(card,player,target){
								if(player!=target) return false;
								return target.canEquip(card,true);
							},
							modTarget:true,
							allowMultiple:false,
							content:lib.element.content.equipCard,
							toself:true,
							ai:{},
							skills:['qiexie_destroy'],
						}
						var maxHp=get.infoMaxHp(info[2]);
						if(maxHp!=1) card.distance={attackFrom:(1-maxHp)};
						var skills=info[3].filter(function(skill){
							var info=get.skillInfoTranslation(skill);
							if(!info.includes('【杀】')) return false;
							var list=get.skillCategoriesOf(skill);
							list.remove('锁定技');
							return list.length==0;
						});
						var str='锁定技。';
						if(skills.length){
							card.skills.addArray(skills);
							str+='你视为拥有技能';
							for(var skill of skills){
								str+='〖'+get.translation(skill)+'〗';
								str+='、';
							}
							str=str.slice(0,str.length-1);
							str+='；'
						}
						str+='此牌离开你的装备区后，改为置入剩余武将牌牌堆。';
						lib.translate['qiexie_'+name+'_info']=str;
						var append='';
						if(skills.length){
							for(var skill of skills){
								if(lib.skill[skill].nobracket){
									append+='<div class="skilln">'+get.translation(skill)+'</div><div><span style="font-family: yuanli">'+get.skillInfoTranslation(skill)+'</span></div><br><br>';
								}
								else{
									var translation=lib.translate[skill+'_ab']||get.translation(skill).slice(0,2);
									append+='<div class="skill">【'+translation+'】</div><div><span style="font-family: yuanli">'+get.skillInfoTranslation(skill)+'</span></div><br><br>';
								}
							}
							str=str.slice(0,str.length-8);
						}
						lib.translate['qiexie_'+name+'_append']=append;
						lib.card['qiexie_'+name]=card;
					}
				},
				subSkill:{
					blocker:{
						mod:{
							canBeReplaced:function(card,player){
								if(player.getStorage('qiexie_blocker').contains(card)) return false;
							},
						},
						charlotte:true,
						onremove:true,
						trigger:{player:'equipEnd'},
						forced:true,
						firstDo:true,
						priority:Infinity,
						filter:function(event){
							var evt=event.getParent();
							if(evt.name!='qiexie') return false;
							return !evt.next.some(event=>{
								return event.name=='equip';
							})
						},
						content:function(){
							player.removeSkill('qiexie_blocker');
						},
					},
					destroy:{
						trigger:{player:'loseBegin'},
						equipSkill:true,
						forceDie:true,
						charlotte:true,
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.cards.some(card=>card.name.indexOf('qiexie_')==0)
						},
						content:function(){
							for(var card of trigger.cards){
								if(card.name.indexOf('qiexie_')==0){
									card._destroy=true;
									game.log(card,'被放回武将牌堆');
									var name=card.name.slice(7);
									if(lib.character[name]) _status.characterlist.add(name);
								}
							}
						},
					},
				},
			},
			cuijue:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he')>0;//&&game.hasPlayer(target=>lib.skill.cuijue.filterTarget('SB',player,target));
				},
				filterCard:true,
				filterTarget:function(card,player,target){
					if(player.getStorage('cuijue_used').contains(target)||!player.inRange(target)) return false;
					var distance=get.distance(player,target);
					return !game.hasPlayer(current=>(current!=target&&player.inRange(current)&&get.distance(player,current)>distance));
				},
				position:'he',
				check:card=>6-get.value(card),
				content:function(){
					player.addTempSkill('cuijue_used','phaseUseAfter');
					player.markAuto('cuijue_used',[target]);
					target.damage('nocard');
				},
				ai:{
					order:2,
					result:{
						target:-1.5
					},
					tag:{
						damage:1
					}
				},
				subSkill:{
					used:{
						onremove:true,
						charlotte:true,
					},
				},
			},
			//神邓艾
			dctuoyu:{
				audio:2,
				trigger:{player:['phaseUseBegin','phaseUseEnd']},
				forced:true,
				filter:function(event,player){
					return player.countCards('h')>0&&player.getStorage('dctuoyu').length>0;
				},
				content:function(){
					'step 0'
					var hs=player.getCards('h'),tags=['dctuoyu_fengtian','dctuoyu_qingqu','dctuoyu_junshan'];
					var storage=player.getStorage('dctuoyu');
					var list=[
						['未分配手牌（对话框较长，请下滑操作）',[]],
						['丰田（伤害/回复值+1）',[]],
						['清渠（无次数和距离限制）',[]],
						['峻山（不可被响应）',[]],
					];
					for(var card of hs){
						var added=false;
						for(var i=0;i<tags.length;i++){
							if(card.hasGaintag(tags[i]+'_tag')){
								added=true;
								list[i+1][1].push(card);
								break;
							}
						}
						if(!added) list[0][1].push(card);
					}
					for(var row of list){
						for(var i=0;i<tags.length;i++){
							if(!storage.contains(tags[i])){
								list[i+1][0]=get.translation(tags[i])+'（尚未激活）';
							}
						}
					}
					var next=player.chooseToMove('拓域：请分配你的手牌',true);
					next.set('list',list);
					next.set('filterMove',function(from,to,moved){
						var storage=_status.event.player.getStorage('dctuoyu'),tags=['dctuoyu_fengtian','dctuoyu_qingqu','dctuoyu_junshan'];
						if(typeof to=='number'){
							if(to==0) return true;
							return storage.contains(tags[to-1])&&moved[to].length<5;
						}
						return true;
					});
					next.set('processAI',function(){
						var player=_status.event.player;
						var storage=player.getStorage('dctuoyu'),tags=['dctuoyu_fengtian','dctuoyu_qingqu','dctuoyu_junshan'];
						var moved=[[],[],[],[]]
						var isEmpty=function(to){
							return storage.contains(tags[to-1])&&moved[to].length<5;
						}
						var hs=player.getCards('h');
						var hs2=hs.slice(0);
						var usable=player.getCardUsable('sha');
						var addTo=function(card,to){
							if(isEmpty(to)){
								hs2.remove(card);
								moved[to].push(card);
								if(get.name(card)=='sha'&&to!=2) usable--;
							}
						}
						var hasRuanshizi=game.hasPlayer(function(target){
							return target!=player&&player.canUse('sha',target,null,true)&&!target.mayHaveShan()&&get.attitude(player,target)<0&&get.effect(target,{name:'sha'},player,player)>0;
						})
						for(var card of hs){
							var name=get.name(card);
							if(name=='tao'||name=='jiu'){
								addTo(card,1);
							}
							else if(name=='sha'){
								if(hasRuanshizi&&isEmpty(1)&&usable>0) addTo(card,1);
								else if(isEmpty(3)&&usable>0) addTo(card,3);
								else addTo(card,2);
							}
							else if(get.type(name)=='trick'){
								if(isEmpty(1)&&get.tag(card,'damage')>0&&player.hasUseTarget(card)) addTo(card,1);
								else addTo(card,3);
							}
						}
						moved[0].addArray(hs2);
						return moved;
					})
					'step 1'
					if(result.bool){
						game.broadcastAll(function(moved,player){
							var tags=['dctuoyu_fengtian','dctuoyu_qingqu','dctuoyu_junshan'];
							var cards=[];
							for(var i=0;i<moved.length;i++){
								for(var card of moved[i]){
									cards.unshift(card);
									for(var j=0;j<tags.length;j++){
										if(i==j+1){
											if(!card.hasGaintag(tags[j]+'_tag')) card.addGaintag(tags[j]+'_tag');
										}
										else{
											if(card.hasGaintag(tags[j]+'_tag')) card.removeGaintag(tags[j]+'_tag');
										}
									}
								}
							}
							if(player==game.me){
								game.addVideo('lose',game.me,[get.cardsInfo(cards),[],[],[]]);
								for(var i=0;i<cards.length;i++){
									cards[i].goto(ui.special);
								}
								game.me.directgain(cards,false);
							}
						},result.moved,player);
					}
				},
				intro:{
					content:'已激活的副区域：$',
				},
				group:'dctuoyu_effect',
				subSkill:{
					effect:{
						mod:{
							targetInRange:function(card,player,target){
								if(!card.cards) return;
								for(var i of card.cards){
									if(i.hasGaintag('dctuoyu_qingqu_tag')) return true;
								}
							},
							cardUsable:function(card,player,num){
								if(!card.cards) return;
								for(var i of card.cards){
									if(i.hasGaintag('dctuoyu_qingqu_tag')) return Infinity;
								}
							},
						},
						trigger:{player:'useCard'},
						forced:true,
						filter:function(event,player){
							var tags=['dctuoyu_fengtian_tag','dctuoyu_qingqu_tag','dctuoyu_junshan_tag'],card=event.card;
							return player.hasHistory('lose',function(evt){
								if(evt.getParent()!=event) return false;
								for(var i in evt.gaintag_map){
									for(var tag of evt.gaintag_map[i]){
										if(tags.contains(tag)) return true;
									}
								}
								return false;
							});
						},
						content:function(){
							var tags=['dctuoyu_fengtian_tag','dctuoyu_qingqu_tag','dctuoyu_junshan_tag'],card=trigger.card;
							player.hasHistory('lose',function(evt){
								if(evt.getParent()!=trigger) return false;
								for(var i in evt.gaintag_map){
									tags.removeArray(evt.gaintag_map[i]);
								}
								return tags.length==0;
							});
							if(!tags.contains('dctuoyu_fengtian_tag')){
								if(get.tag(card,'damage')>0||get.tag(card,'recover')>0){
									trigger.baseDamage++;
									game.log(card,'的伤害值/回复值+1');
								}
							}
							if(!tags.contains('dctuoyu_qingqu_tag')){
								if(trigger.addCount!==false){
									trigger.addCount=false;
									var stat=player.getStat('card');
									if(stat[card.name]&&stat[card.name]>0) stat[card.name]--;
									game.log(card,'不计入次数限制');
								}
							}
							if(!tags.contains('dctuoyu_junshan_tag')){
								game.log(card,'不可被响应');
								trigger.directHit.addArray(game.filterPlayer());
							}
						},
					},
				},
			},
			dcxianjin:{
				audio:2,
				trigger:{
					player:'damageEnd',
					source:'damageSource',
				},
				forced:true,
				filter:function(event,player,name){
					var key=(name=='damageEnd'?'damage':'sourceDamage');
					return player.getAllHistory(key).indexOf(event)%2==1;
				},
				content:function(){
					'step 0'
					var tags=['dctuoyu_fengtian','dctuoyu_qingqu','dctuoyu_junshan'];
					tags.removeArray(player.getStorage('dctuoyu'));
					if(!tags.length){
						player.draw(player.isMaxHandcard()?1:3);
						event.finish();
					}
					else if(tags.length==1){
						event._result={control:tags[0]};
					}
					else player.chooseControl(tags).set('prompt','险峻：选择激活一个副区域标签');
					'step 1'
					var control=result.control;
					game.log(player,'激活了副区域','#y'+get.translation(control));
					player.markAuto('dctuoyu',[control]);
					player.popup(get.translation(control+'_tag'));
					if(player.isMaxHandcard()) player.draw();
					else player.draw(player.getStorage('dctuoyu').length)
				},
			},
			dcqijing:{
				audio:2,
				trigger:{global:'phaseEnd'},
				forced:true,
				juexingji:true,
				derivation:'dccuixin',
				skillAnimation:true,
				animationColor:'orange',
				filter:function(event,player){
					return player.getStorage('dctuoyu').length==3;
				},
				content:function(){
					'step 0'
					player.awakenSkill('dcqijing');
					player.loseMaxHp();
					'step 1'
					if(game.countPlayer()>2){
						player.chooseTarget(true,'请选择一名要更换座次的角色，将自己移动到该角色的上家位置',function(card,player,target){
							return target!=player&&target!=player.next;
						}).set('ai',function(target){
							var player=_status.event.player;
							var current=_status.currentPhase.next;
							var max=20,att=0;
							while(max>0){
								max--;
								if(current==target) return att;
								att-=get.attitude(player,current);
								current=current.next;
							}
							return att;
						})
					}
					else event.goto(3);
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						game.broadcastAll(function(target1,target2){
							game.swapSeat(target1,target2,null,true);
						},player,target);
					}
					'step 3'
					player.addSkill('dccuixin');
					player.insertPhase();
				},
			},
			dccuixin:{
				audio:2,
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					if(event.skill=='dccuixin') return false;
					if(event.targets.length==0) return false;
					if(get.type(event.card,false)=='delay'||get.type(event.card,false)=='equip') return false;
					var card={
						name:event.card.name,
						nature:event.card.nature,
						isCard:true,
					}
					for(var target of event.targets){
						var targetx;
						if(target==player.getNext()) targetx=player.getPrevious();
						else if(target==player.getPrevious()) targetx=player.getNext();
						else continue;
						if(lib.filter.targetEnabled2(card,targetx,player)) return true;
					}
					return false;
				},
				direct:true,
				content:function(){
					'step 0'
					var card={
						name:trigger.card.name,
						nature:trigger.card.nature,
						isCard:true,
					};
					event.card=card;
					var list=trigger.targets.filter(target=>{
						var targetx;
						if(target==player.getNext()) targetx=player.getPrevious();
						else if(target==player.getPrevious()) targetx=player.getNext();
						else return false;
						if(lib.filter.targetEnabled2(card,targetx,player)) return true;
					}).map(target=>{
						return target==player.getPrevious()?player.getNext():player.getPrevious();
					});
					if(list.length==1){
						event.target=list[0];
						player.chooseBool('摧心：是否再视为对'+get.translation(list[0])+'使用'+get.translation(card)+'？').set('goon',get.effect(list[0],card,player,player)>0).set('ai',()=>_status.event.goon);
					}
					else{
						player.chooseTarget('摧心：是否再视为对上家或下家使用'+get.translation(card)+'？','操作提示：从上家或下家中选择一名角色作为使用目标',function(card,player,target){
							return (target==player.getNext()||target==player.getPrevious())&&lib.filter.targetEnabled2(_status.event.getParent().card,target,player);
						}).set('ai',function(target){
							var player=_status.event.player;
							return get.effect(target,_status.event.getParent().card,player,player)
						})
					}
					'step 1'
					if(result.bool){
						var target=event.target||result.targets[0];
						player.useCard(card,target,false,'dccuixin');
					}
				},
			},
			//海外神吕蒙
			twshelie:{
				audio:'shelie',
				inherit:'shelie',
				prompt2:()=>lib.translate.shelie_info,
				group:'twshelie_jingce',
				//什么精策技能啊喂！
				subSkill:{
					round:{charlotte:true},
					count:{
						charlotte:true,
						onremove:true,
						intro:{
							markcount:function(storage){
								return storage.length;
							},
							content:'本回合已使用$花色的牌',
						},
					},
					jingce:{
						audio:'shelie',
						trigger:{player:['phaseJieshuBegin','useCard1']},
						filter:function(event,player){
							if(player.hasSkill('twshelie_round')||player!=_status.currentPhase) return false;
							var list=[];
							player.getHistory('useCard',function(evt){
								if(lib.suit.contains(get.suit(evt.card))&&!list.contains(get.suit(evt.card))) list.push(get.suit(evt.card));
							});
							if(list.length){
								player.addTempSkill('twshelie_count');
								player.storage.twshelie_count=list.sort(function(a,b){
									return lib.suit.indexOf(b)-lib.suit.indexOf(a);
								});
								player.markSkill('twshelie_count');
								player.syncStorage('twshelie_count');
							}
							return event.name!='useCard'&&list.length>=player.hp;
						},
						forced:true,
						locked:false,
						content:function(){
							'step 0'
							player.addTempSkill('twshelie_round','roundStart');
							player.chooseControl('摸牌阶段','出牌阶段').set('prompt','涉猎：请选择要执行的额外阶段');
							'step 1'
							if(result.index==0){
								var next=player.phaseDraw();
								event.next.remove(next);
								trigger.getParent().next.push(next);
							}
							if(result.index==1){
								var next=player.phaseUse();
								event.next.remove(next);
								trigger.getParent().next.push(next);
							}
						},
					},
				},
			},
			twgongxin:{
				audio:'gongxin',
				enable:'phaseUse',
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('h');
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h');
				},
				usable:1,
				content:function(){
					'step 0'
					event.num=target.getCards('h').reduce(function(arr,card){
						return arr.add(get.suit(card,player)),arr;
					},[]).length;
					'step 1'
					var cards=target.getCards('h');
					player.chooseButton(2,[
						'攻心',
						cards,
						[['弃置此牌','置于牌堆顶'],'tdnodes'],
					]).set('filterButton',function(button){
						var type=typeof button.link;
						if(ui.selected.buttons.length&&type==typeof ui.selected.buttons[0].link) return false;
						return true;
					}).set('ai',function(button){
						var target=_status.event.target;
						var type=typeof button.link;
						if(type=='object') return get.value(button.link,target);
					});
					'step 2'
					if(result.bool){
						if(typeof result.links[0]!='string') result.links.reverse();
						var card=result.links[1],choice=result.links[0];
						if(choice=='弃置此牌') target.discard(card);
						else {
							player.showCards(card,get.translation(player)+'对'+get.translation(target)+'发动了【攻心】');
							target.lose(card,ui.cardPile,'visible','insert');
							game.log(card,'被置于了牌堆顶');
						}
					}
					'step 3'
					if(event.num==target.getCards('h').reduce(function(arr,card){
						return arr.add(get.suit(card,player)),arr;
					},[]).length) event.finish();
					'step 4'
					var num1=0;
					for(var card of target.getCards('h')){
						if(get.color(card)=='red') num1++;
					}
					var num2=target.countCards('h')-num1;
					player.chooseControl(['红色','黑色','cancel2']).set('prompt','是否令'+get.translation(target)+'本回合无法使用一种颜色的牌？').set('ai',function(){
						return num1>=num2?'红色':'黑色';
					});
					'step 5'
					if(result.control!='cancel2'){
						player.line(target);
						target.addTempSkill('twgongxin2');
						target.markAuto('twgongxin2',[result.control=='红色'?'red':'black']);
						game.log(target,'本回合无法使用'+result.control+'牌');
						if(!event.isMine()&&!event.isOnline()) game.delayx();
					}
				},
				ai:{
					order:10,
					expose:0.25,
					result:{
						target:function(player,target){
							return -target.countCards('h');
						},
					},
				},
			},
			twgongxin2:{
				mod:{
					cardEnabled2:function(card,player){
						if(player.getStorage('twgongxin2').contains(get.color(card))) return false;
					},
				},
				charlotte:true,
				onremove:true,
				intro:{content:'本回合内不能使用或打出$牌'},
			},
			//神张角
			yizhao:{
				audio:2,
				trigger:{
					player:['useCard','respond']
				},
				forced:true,
				filter:function(event,player){
					return typeof get.number(event.card)=='number';
				},
				marktext:'黄',
				intro:{
					name:'黄(异兆/肆军)',
					name2:'黄',
					content:'mark',
					markcount:function(storage,player){
						return (storage||0).toString().slice(-2);
					},
				},
				content:function(){
					'step 0'
					event.num=player.countMark('yizhao');
					player.addMark('yizhao',get.number(trigger.card));
					'step 1'
					var num=Math.floor(num/10)%10,num2=Math.floor(player.countMark('yizhao')/10)%10;
					if(num!=num2){
						var card=get.cardPile2(card=>{
							return get.number(card,false)==num2;
						});
						if(card) player.gain(card,'gain2');
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(Math.floor((get.number(card)+player.countMark('yizhao')%10)/10)==1) return num+10;
					},
				},
				ai:{
					threaten:1.5,
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip'&&!get.cardtag(card,'gifts')) return [1,0.1];
						}
					}
				}
			},
			sijun:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return player.countMark('yizhao')>ui.cardPile.childNodes.length;
				},
				check:()=>true,
				content:function(){
					'step 0'
					player.removeMark('yizhao',player.countMark('yizhao'));
					var cards=get.cards(ui.cardPile.childElementCount+1);
					for(var i=0;i<cards.length;i++){
						ui.cardPile.insertBefore(cards[i],ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
					}
					game.updateRoundNumber();
					'step 1'
					var pile=Array.from(ui.cardPile.childNodes);
					if(pile.length<3) return;
					var bool=false,max=Math.pow(2,Math.min(100,pile.length)),index;
					for(var i=0;i<max;i++){
						var num=0;
						index=i.toString(2);
						while(index.length<pile.length){
							index=('0'+index);
						}
						for(var k=0;k<index.length;k++){
							if(index[k]=='1') num+=get.number(pile[k]);
							if(num>36) break;
						}
						if(num==36){
							bool=true;
							break;
						}
					}
					if(bool){
						var cards=[];
						for(var k=0;k<index.length;k++){
							if(index[k]=='1') cards.push(pile[k]);
						}
						player.gain(cards,'gain2');
					}
				},
				ai:{
					combo:'yizhao',
				}
			},
			sanshou:{
				audio:2,
				trigger:{player:'damageBegin4'},
				check:function(event,player){
					return get.damageEffect(player,event.source,player,event.nature)<=0;
				},
				content:function(){
					'step 0'
					var cards=game.cardsGotoOrdering(get.cards(3)).cards;
					event.cards=cards;
					player.showCards(cards,get.translation(player)+'发动了【三首】');
					'step 1'
					var types=[];
					types.addArray(game.getGlobalHistory('useCard').map(evt=>get.type2(evt.card)));
					if(cards.filter(card=>!types.contains(get.type2(card))).length){
						trigger.cancel();
					}
					game.delayx();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(card.name=='shandian'||card.name=='fulei') return [0,0.1];
							if(!get.tag(card,'damage')) return;
							var types=[],bool=0;
							types.addArray(game.getGlobalHistory('useCard').map(evt=>get.type2(evt.card)));
							if(!types.contains(get.type2(card))) bool=1;
							if(types.length<2) return Math.min(1,0.4+(types.length+bool)*0.2);
						}
					}
				},
			},
			tianjie:{
				audio:2,
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return player.hasSkill('tianjie_shuffled');
				},
				group:'tianjie_effect',
				skillAnimation:true,
				animationColor:'metal',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('tianjie'),'选择至多三名其他角色，依次对这些角色造成X点雷电伤害（X为其手牌中【闪】的数量，至少为1）',[1,3]).set('ai',target=>{
						var player=_status.event.player;
						return get.damageEffect(target,player,player,'thunder')*Math.sqrt(Math.max(1,target.countCards('h','shan')));
					});
					'step 1'
					if(result.bool){
						var targets=result.targets;
						targets.sortBySeat();
						player.logSkill('tianjie',targets);
						for(var target of targets){
							var num=Math.max(1,target.countCards('h','shan'));
							target.damage(num,'thunder');
						}
					}
				},
				subSkill:{
					effect:{
						trigger:{global:'washCard'},
						forced:true,
						silent:true,
						charlotte:true,
						content:function(){
							player.addTempSkill('tianjie_shuffled');
						},
					},
					shuffled:{charlotte:true},
				}
			},
			shencai:{
				audio:2,
				enable:'phaseUse',
				usable:5,
				filter:function(event,player){
					var count=player.getStat('skill').shencai;
					if(count&&count>player.countMark('shencai')) return false;
					return true;
				},
				filterTarget:lib.filter.notMe,
				onremove:true,
				prompt:'选择一名其他角色进行地狱审判',
				content:function(){
					var next=target.judge();
					next.callback=lib.skill.shencai.contentx;
				},
				ai:{
					order:8,
					result:{target:-1},
				},
				contentx:function(){
					var card=event.judgeResult.card;
					var player=event.getParent(2).player;
					var target=event.getParent(2).target;
					if(get.position(card,true)=='o') player.gain(card,'gain2');
					var list=[],str=lib.skill.shencai.getStr(card);
					for(var i in lib.skill.shencai.filterx){
						if(str.indexOf(lib.skill.shencai.filterx[i])!=-1) list.push('shencai_'+i);
					}
					if(list.length){
						for(var i in lib.skill.shencai.filterx){
							var num=target.countMark('shencai_'+i);
							if(num>0){
								target.removeMark('shencai_'+i,num);
								target.removeSkill('shencai_'+i);
							}
						}
						if(target.isIn()){
							for(var i of list){
								target.addSkill(i);
								target.addMark(i,1);
							}
						}
					}
					else if(target.isIn()){
						player.gainPlayerCard(target,true,'hej');
						target.addMark('shencai_death',1);
						target.addSkill('shencai_death');
					}
				},
				filterx:{
					losehp:'体力',
					weapon:'武器',
					respond:'打出',
					distance:'距离',
				},
				getStr:function(node){
					var str='',name=node.name;
					if(lib.translate[name+'_info']){
						if(lib.card[name].type&&lib.translate[lib.card[name].type]) str+=(''+get.translation(lib.card[name].type)+'牌|');
						if(get.subtype(name)){
							str+=(''+get.translation(get.subtype(name))+'|');
						}
						if(lib.card[name]&&lib.card[name].addinfomenu){
							str+=(''+lib.card[name].addinfomenu+'|');
						}
						if(get.subtype(name)=='equip1'){
							var added=false;
							if(lib.card[node.name]&&lib.card[node.name].distance){
								var dist=lib.card[node.name].distance;
								if(dist.attackFrom){
									added=true;
									str+=('攻击范围：'+(-dist.attackFrom+1)+'|');
								}
							}
							if(!added){
								str+=('攻击范围：1|');
							}
						}
					}
					if(lib.card[name].cardPrompt){
						str+=(''+lib.card[name].cardPrompt(node)+'|');
					}
					else if(lib.translate[name+'_info']){
						str+=(''+lib.translate[name+'_info']+'|');
					}
					if(get.is.yingbianConditional(node)){
						const yingbianEffects=get.yingbianEffects(node);
						if(!yingbianEffects.length){
							const defaultYingbianEffect=get.defaultYingbianEffect(node);
							if(lib.yingbian.prompt.has(defaultYingbianEffect)) yingbianEffects.push(defaultYingbianEffect);
						}
						if(yingbianEffects.length) str+=`应变：${yingbianEffects.map(value=>lib.yingbian.prompt.get(value)).join('；')}|`;
					}
					return str;
				},
				subSkill:{
					losehp:{
						charlotte:true,
						marktext:'笞',
						trigger:{player:'damageEnd'},
						forced:true,
						content:function(){
							player.loseHp(trigger.num);
						},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'damage')&&current<0) return 1.6;
								},
							},
						},
						intro:{
							name:'神裁 - 体力',
							name2:'笞',
							content:'锁定技。当你受到伤害后，你失去等量的体力。',
							onunmark:true,
						},
					},
					weapon:{
						charlotte:true,
						marktext:'杖',
						trigger:{target:'useCardToTargeted'},
						forced:true,
						filter:function(event,player){
							return event.card.name=='sha';
						},
						content:function(){
							trigger.directHit.add(player);
							game.log(player,'不可响应',trigger.card);
						},
						intro:{
							name:'神裁 - 武器',
							name2:'杖',
							content:'锁定技。当你成为【杀】的目标后，你不能使用牌响应此【杀】。',
							onunmark:true,
						},
						global:'shencai_weapon_ai',
					},
					ai:{
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								if(!arg||!arg.card||arg.card.name!='sha') return false;
								if(!arg.target||!arg.target.hasSkill('shencai_weapon')) return false;
								return true;
							},
						},
					},
					respond:{
						charlotte:true,
						marktext:'徒',
						trigger:{
							player:'loseAfter',
							global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
						},
						forced:true,
						filter:function(event,player){
							if(!player.hasCard(function(card){
								return lib.filter.cardDiscardable(card,player,'shencai_respond');
							},'h')) return false;
							var evt=event.getParent('shencai_respond');
							if(evt&&evt.player==player) return false;
							evt=event.getl(player);
							return evt&&evt.hs&&evt.hs.length>0;
						},
						content:function(){
							var cards=player.getCards('h',function(card){
								return lib.filter.cardDiscardable(card,player,'shencai_respond');
							});
							if(cards.length>0) player.discard(cards.randomGet());
						},
						intro:{
							name:'神裁 - 打出',
							name2:'徒',
							content:'锁定技。当你失去手牌后，你随机弃置一张手牌（不嵌套触发）。',
							onunmark:true,
						},
					},
					distance:{
						charlotte:true,
						marktext:'流',
						trigger:{player:'phaseJieshuBegin'},
						forced:true,
						content:function(){
							player.turnOver();
						},
						intro:{
							name:'神裁 - 距离',
							name2:'流',
							content:'锁定技。结束阶段开始时，你翻面。',
							onunmark:true,
						},
					},
					death:{
						charlotte:true,
						marktext:'死',
						mod:{
							maxHandcard:function(player,num){
								return num-player.countMark('shencai_death');
							},
						},
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return player.countMark('shencai_death')>game.countPlayer();
						},
						content:function(){
							player.die();
						},
						intro:{
							name:'神裁 - 死',
							name2:'死',
							content:'锁定技。你的角色手牌上限-#；回合结束时，若场上存活人数小于#，则你死亡。',
							onunmark:true,
						},
					},
				},
				intro:{
					content:'发动次数上限+#',
				},
			},
			xunshi:{
				audio:2,
				mod:{
					cardname:function(card){
						if(lib.skill.xunshi.isXunshi(card)) return 'sha';
					},
					cardnature:function(card){
						if(lib.skill.xunshi.isXunshi(card)) return false;
					},
					suit:function(card){
						if(lib.skill.xunshi.isXunshi(card)) return 'none';
					},
					targetInRange:function(card){
						if(get.color(card)=='none') return true;
					},
					cardUsable:function(card){
						if(get.color(card)=='none') return Infinity;
					},
				},
				isXunshi:function(card){
					var info=lib.card[card.name];
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
				trigger:{player:'useCard2'},
				forced:true,
				filter:function(event,player){
					return get.color(event.card)=='none';
				},
				content:function(){
					'step 0'
					if(player.countMark('shencai')<4&&player.hasSkill('shencai',null,null,false)) player.addMark('shencai',1,false);
					if(trigger.addCount!==false){
						trigger.addCount=false;
						var stat=player.getStat().card,name=trigger.card.name;
						if(typeof stat[name]=='number') stat[name]--;
					}
					var info=get.info(trigger.card);
					if(info.allowMultiple==false) event.finish();
					else if(trigger.targets&&!info.multitarget){
						if(!game.hasPlayer(function(current){
							return !trigger.targets.contains(current)&&lib.filter.targetEnabled2(trigger.card,player,current);
						})) event.finish();
					}
					else event.finish();
					'step 1'
					var prompt2='为'+get.translation(trigger.card)+'增加任意个目标'
					player.chooseTarget(get.prompt('xunshi'),function(card,player,target){
						var player=_status.event.player;
						return !_status.event.targets.contains(target)&&lib.filter.targetEnabled2(_status.event.card,player,target);
					},[1,Infinity]).set('prompt2',prompt2).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return get.effect(target,trigger.card,player,player);
					}).set('card',trigger.card).set('targets',trigger.targets);
					'step 2'
					if(result.bool){
						if(!event.isMine()&&!event.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 3'
					if(event.targets){
						player.line(event.targets,'fire');
						trigger.targets.addArray(event.targets);
					}
				},
			},
			twwushen:{
				mod:{
					cardname:function(card,player,name){
						if(get.suit(card)=='heart') return 'sha';
					},
					cardnature:function(card,player){
						if(get.suit(card)=='heart') return false;
					},
					targetInRange:function(card){
						if(get.suit(card)=='heart') return true;
					},
					cardUsable:function(card){
						if(card.name=='sha'&&get.suit(card)=='heart') return Infinity;
					}
				},
				audio:'wushen',
				trigger:{player:'useCard2'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&(get.suit(event.card)=='heart'||!player.hasSkill('twwushen_phase',null,null,false));
				},
				logTarget:function(event,player){
					if(get.suit(event.card)=='heart'){
						var targets=game.filterPlayer(function(current){
							return !event.targets.contains(current)&&current.hasMark('twwuhun')&&lib.filter.targetEnabled(event.card,player,current);
						});
						if(targets.length){
							return targets.sortBySeat();
						}
					}
					return null;
				},
				content:function(){
					if(!player.hasSkill('twwushen_phase',null,null,false)){
						trigger.directHit.addArray(game.players);
						player.addTempSkill('twwushen_phase',['phaseZhunbeiAfter','phaseJudgeAfter','phaseDrawAfter','phaseUseAfter','phaseDiscardAfter','phaseJieshuAfter'])
					}
					if(get.suit(trigger.card)=='heart'){
						if(trigger.addCount!==false){
							trigger.addCount=false;
							if(player.stat[player.stat.length-1].card.sha>0){
								player.stat[player.stat.length-1].card.sha--;
							}
						}
						var targets=game.filterPlayer(function(current){
							return !trigger.targets.contains(current)&&current.hasMark('twwuhun')&&lib.filter.targetEnabled(trigger.card,player,current);
						});
						if(targets.length){
							trigger.targets.addArray(targets.sortBySeat());
							game.log(targets,'也成为了',trigger.card,'的目标');
						}
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return arg.card.name=='sha'&&!player.hasSkill('twwushen_phase',null,null,false);
					},
				},
				subSkill:{phase:{charlotte:true}},
				shaRelated:true,
			},
			twwuhun:{
				audio:2,
				trigger:{player:'die'},
				forceDie:true,
				skillAnimation:true,
				animationColor:'soil',
				locked:true,
				check:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.hasMark('twwuhun')&&get.attitude(player,current)<0;
					});
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						var name=get.name(card,false);
						if(name=='tao'||name=='taoyuan') return -25;
						return 15;
					}).set('forceDie',true).judge2=function(result){
						return result.bool;
					};
					'step 1'
					var num=game.countPlayer(function(current){
						return current!=player&&current.hasMark('twwuhun');
					});
					if(result.bool&&num>0){
						player.chooseTarget('请选择【武魂】的目标','选择至少一名拥有“梦魇”标记的角色。令这些角色各自失去X点体力（X为其“梦魇”标记数）',true,[1,num],function(card,player,target){
							return target!=player&&target.hasMark('twwuhun');
						}).set('forceDie',true).set('ai',function(target){
							return -get.attitude(_status.event.player,target);
						});
					}
					else event.finish();
					'step 2'
					var targets=result.targets.sortBySeat();
					player.line(targets,'fire');
					event.targets=targets;
					'step 3'
					var target=targets.shift();
					var num=target.countMark('twwuhun');
					if(num>0) target.loseHp(num);
					if(targets.length>0) event.redo();
				},
				marktext:'魇',
				intro:{
					name:'梦魇',
					content:'mark',
					onunmark:true,
				},
				group:'twwuhun_gain',
				subSkill:{
					gain:{
						audio:'twwuhun',
						trigger:{
							player:'damageEnd',
							source:'damageSource',
						},
						forced:true,
						filter:function(event,player,name){
							if(event.player==event.source) return false;
							var target=lib.skill.twwuhun_gain.logTarget(event,player);
							if(!target||!target.isIn()) return false;
							return name=='damageEnd'||target.hasMark('twwuhun');
						},
						logTarget:function(event,player){
							if(player==event.player) return event.source;
							return event.player;
						},
						content:function(){
							var target=lib.skill.twwuhun_gain.logTarget(trigger,player);
							target.addMark('twwuhun',player==trigger.source?1:trigger.num);
							game.delayx();
						},
					},
				},
			},
			shouli:{
				audio:2,
				mod:{
					cardUsable:function(card){
						if(card.storage&&card.storage.shouli) return Infinity;
					},
				},
				enable:['chooseToUse','chooseToRespond'],
				hiddenCard:function(player,name){
					if(player!=_status.currentPhase&&(name=='sha'||name=='shan')) return true;
				},
				filter:function(event,player){
					if(event.responded||event.shouli||event.type=='wuxie') return false;
					if(game.hasPlayer(function(current){
						return current.getCards('e',card=>get.subtype(card)=='equip4').length>0;
					})&&event.filterCard({
						name:'sha',
						storage:{shouli:true},
					},player,event)) return true;
					if(game.hasPlayer(function(current){
						return current.getCards('e',card=>get.subtype(card)=='equip3').length>0;
					})&&event.filterCard({
						name:'shan',
						storage:{shouli:true},
					},player,event)) return true;
					return false;
				},
				delay:false,
				locked:false,
				filterTarget:function(card,player,target){
					var event=_status.event,evt=event;
					if(event._backup) evt=event._backup;
					var equip3=target.getCards('e',card=>get.subtype(card,false)=='equip3');
					var equip4=target.getCards('e',card=>get.subtype(card,false)=='equip4');
					if(equip3.length&&equip3.some(card=>evt.filterCard(get.autoViewAs({
						name:'shan',
						storage:{shouli:true},
					},[card]),player,event))) return true;
					return equip4.some(card=>{
						var sha=get.autoViewAs({
							name:'sha',
							storage:{shouli:true},
						},[card]);
						if(evt.filterCard(sha,player,event)){
							if(!evt.filterTarget) return true;
							return game.hasPlayer(function(current){
								return evt.filterTarget(sha,player,current);
							})
						};
					})
				},
				prompt:'将场上的一张坐骑牌当做【杀】或【闪】使用或打出',
				content:function(){
					'step 0'
					var evt=event.getParent(2);
					evt.set('shouli',true);
					var list=[];
					var equip3=target.getCards('e',card=>get.subtype(card,false)=='equip3');
					var equip4=target.getCards('e',card=>get.subtype(card,false)=='equip4');
					var backupx=_status.event;
					_status.event=evt;
					try{
						if(equip3.length&&equip3.some(card=>{
							var shan=get.autoViewAs({
								name:'shan',
								storage:{shouli:true},
							},[card]);
							if(evt.filterCard(shan,player,event)) return true;
							return false;
						})){
							list.push('shan');
						}
						if(equip4.length&&equip4.some(card=>{
							var sha=get.autoViewAs({
								name:'sha',
								storage:{shouli:true},
							},[card]);
							if(evt.filterCard(sha,player,evt)&&(!evt.filterTarget||game.hasPlayer(function(current){
								return evt.filterTarget(sha,player,current);
							}))) return true;
							return false;
						})){
							list.push('sha');
						};
					}catch(e){game.print(e)};
					_status.event=backupx;
					if(list.length==1){
						event.cardName=list[0];
						var cards=list[0]=='shan'?equip3:equip4;
						if(cards.length==1) event._result={
							bool:true,
							links:[cards[0]],
						}
						else player.choosePlayerCard(true,target,'e').set('filterButton',function(button){
							return _status.event.cards.contains(button.link);
						}).set('cards',cards)
					}
					else player.choosePlayerCard(true,target,'e').set('filterButton',function(button){
						var type=get.subtype(button.link);
						return type=='equip3'||type=='equip4';
					});
					'step 1'
					var evt=event.getParent(2);
					if(result.bool&&result.links&&result.links.length){
						var name=(event.cardName||(get.subtype(result.links[0])=='equip4'?'sha':'shan'));
						if(evt.name=='chooseToUse'){
							game.broadcastAll(function(result,name){
								lib.skill.shouli_backup.viewAs={
									name:name,
									cards:[result],
									storage:{shouli:true},
								};
								lib.skill.shouli_backup.prompt=('选择'+get.translation(name)+'（'+get.translation(result)+'）的目标');
							},result.links[0],name);
							evt.set('_backupevent','shouli_backup');
							evt.backup('shouli_backup');
							evt.set('openskilldialog','选择'+get.translation(name)+'（'+get.translation(result.links[0])+'）的目标');
							evt.set('norestore',true);
							evt.set('custom',{
								add:{},
								replace:{window:function(){}}
							});
						}
						else{
							delete evt.result.skill;
							delete evt.result.used;
							evt.result.card=get.autoViewAs({
								name:name,
								cards:[result.links[0]],
								storage:{shouli:true},
							},result.links);
							evt.result.cards=[result.links[0]];
							target.$give(result.links[0],player,false);
							if(player!=target) target.addTempSkill('fengyin');
							target.addTempSkill('shouli_thunder');
							player.addTempSkill('shouli_thunder');
							evt.redo();
							return;
						}
					}
					evt.goto(0);
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag){
						var subtype=(tag=='respondSha'?'equip4':'equip3');
						return game.hasPlayer(function(current){
							return current.hasCard(card=>get.subtype(card,false)==subtype,'e');
						});
					},
					order:2,
					result:{
						player:function(player,target){
							var att=Math.max(8,get.attitude(player,target));
							if(_status.event.type!='phase') return 9-att;
							if(!player.hasValueTarget({name:'sha'})) return 0;
							return 9-att;
						},
					},
				},
				group:'shouli_init',
				subSkill:{
					thunder:{
						charlotte:true,
						trigger:{player:'damageBegin1'},
						forced:true,
						mark:true,
						content:function(){
							trigger.num++;
							trigger.nature='thunder';
						},
						marktext:'⚡',
						intro:{
							content:'受到的伤害+1且改为雷属性',
						},
					},
					init:{
						audio:'shouli',
						trigger:{
							global:'phaseBefore',
							player:'enterGame',
						},
						forced:true,
						locked:false,
						filter:function(event,player){
							return event.name!='phase'||game.phaseNumber==0;
						},
						logTarget:()=>game.filterPlayer(),
						content:function(){
							'step 0'
							var targets=game.filterPlayer().sortBySeat(player.getNext());
							event.targets=targets;
							event.num=0;
							'step 1'
							var target=event.targets[num];
							if(target.isIn()){
								var card=get.cardPile2(function(card){
									if(get.cardtag(card,'gifts')) return false;
									var type=get.subtype(card);
									if(type!='equip3'&&type!='equip4'&&type!='equip6') return false;
									return target.canUse(card,target);
								});
								if(card) target.chooseUseTarget(card,'nopopup','noanimate',true);
							}
							event.num++;
							if(event.num<targets.length) event.redo();
						},
					},
				},
			},
			shouli_backup:{
				sourceSkill:'shouli',
				precontent:function(){
					'step 0'
					delete event.result.skill;
					var cards=event.result.card.cards;
					event.result.cards=cards;
					var owner=get.owner(cards[0]);
					event.target=owner;
					owner.$give(cards[0],player,false);
					player.popup(event.result.card.name,'metal');
					game.delayx();
					event.getParent().addCount=false;
					'step 1'
					if(player!=target) target.addTempSkill('fengyin');
					target.addTempSkill('shouli_thunder');
					player.addTempSkill('shouli_thunder');
				},
				filterCard:function(){return false},
				prompt:'请选择【杀】的目标',
				selectCard:-1,
			},
			hengwu:{
				audio:2,
				trigger:{player:['useCard','respond']},
				frequent:true,
				filter:function(event,player){
					var suit=get.suit(event.card);
					if(!lib.suit.contains(suit)||player.hasCard(function(card){
						return get.suit(card,player)==suit;
					},'h')) return false;
					return game.hasPlayer(function(current){
						return current.hasCard(function(card){
							return get.suit(card,current)==suit;
						},'e')
					})
				},
				content:function(){
					var suit=get.suit(trigger.card);
					player.draw(game.countPlayer(function(current){
						return current.countCards('e',function(card){
							return get.suit(card,current)==suit;
						});
					}));
				},
			},
			changandajian_equip5:{
				equipSkill:true,
				mod:{maxHandcard:(player,num)=>num+2},
			},
			changandajian_destroy:{
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				forced:true,
				charlotte:true,
				equipSkill:true,
				filter:function(event,player){
					var evt=event.getl(player);
					if(!evt||!evt.es||!evt.es.length) return false;
					for(var i of evt.es){
						if(i.name.indexOf('changandajian_equip')==0) return true;
					}
					return false;
				},
				getEffect:function(player,target){
					if(player==target) return 0;
					var getRaw=function(){
						var att=get.attitude(player,target);
						if(att>0){
							if(target.countCards('j',function(card){
								var cardj=card.viewAs?{name:card.viewAs}:card;
								return get.effect(target,cardj,target,player)<0;
							})>0) return 3;
							if(target.getEquip('baiyin')&&target.isDamaged()&&
								get.recoverEffect(target,player,player)>0){
								if(target.hp==1&&!target.hujia) return 1.6;
							}
							if(target.countCards('e',function(card){
								if(get.position(card)=='e') return get.value(card,target)<0;
							})>0) return 1;
						}
						var es=target.getCards('e');
						var noe=(es.length==0||target.hasSkillTag('noe'));
						var noe2=(es.filter(function(esx){
							return get.value(esx,target)>0;
						}).length==0);
						if(noe||noe2) return 0;
						if(att<=0&&!target.countCards('e')) return 1.5;
						return -1.5;
					}
					return getRaw()*get.attitude(player,target);
				},
				content:function(){
					'step 0'
					var num=0,recover=0;
					var evt=trigger.getl(player);
					for(var i of evt.es){
						if(i.name.indexOf('changandajian_equip')==0) num++;
						if(i.name=='changandajian_equip2') recover++;
					}
					if(recover>0) player.recover(recover);
					event.count=num;
					if(!game.hasPlayer(function(current){
						return current.countCards('ej')>0;
					})) event.finish();
					'step 1'
					event.count--;
					player.chooseTarget(true,'选择一名装备区或判定区有牌的角色',function(card,player,target){
						return target.countCards('ej')>0;
					}).set('ai',function(target){
						return lib.skill.changandajian_destroy.getEffect(_status.event.player,target);
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target,'green');
						player.choosePlayerCard(target,true,'ej');
					}
					else event.finish();
					'step 3'
					if(result.bool){
						var card=result.cards[0];
						var num=get.number(card);
						if([1,11,12,13].contains(num)){
							if(lib.filter.canBeGained(card,player,target)) player.gain(card,target,'give','bySelf');
						}
						else if(lib.filter.canBeDiscarded(card,player,target)) target.discard(card);
					}
					else event.finish();
					'step 4'
					if(event.count>0&&game.hasPlayer(function(current){
						return current.countCards('ej')>0;
					})) event.goto(1);
				},
			},
			dili:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					if(player.storage.dili) return false;
					if(event.name!='phase') return true;
					if(game.phaseNumber==0) return true;
					//让神山识能够获得东吴命运线
					return player.name=='key_shiki';
				},
				content:function(){
					player.storage.dili=true;
					var skill=['dili_shengzhi','dili_chigang','dili_qionglan','dili_quandao','dili_jiaohui','dili_yuanlv'].randomGet();
					player.addSkill(skill);
					game.log(player,'解锁了<span style="font-family: yuanli">东吴命运线</span>：','#g【'+get.translation(skill)+'】');
				},
				derivation:['dili_shengzhi','dili_chigang','dili_qionglan','dili_quandao','dili_jiaohui','dili_yuanlv','gzyinghun','hongde','rebingyi','xinfu_guanwei','bizheng','xinanguo','shelie','wengua','rebotu','rezhiheng','jiexun','reanxu','xiashu','rejieyin','oldimeng','xinfu_guanchao','drlt_jueyan','lanjiang'],
				subSkill:{
					shengzhi:{
						audio:2,
						trigger:{player:'useCard'},
						forced:true,
						filter:function(event,player){
							var num=get.number(event.card);
							if(typeof num!='number') return false;
							if(num<=1) return false;
							for(var i=2;i<=Math.sqrt(num);i++){
								if(num%i==0) return false;
							}
							if(!player.storage.yuheng) return false;
							var list=['gzyinghun','hongde','rebingyi'];
							for(var i of list){
								if(!player.storage.yuheng.contains(i)) return false;
							}
							return true;
						},
						content:function(){
							trigger.directHit.addArray(game.filterPlayer(function(current){
								return current!=player;
							}));
						},
						init:function(player,skill){
							player.markAuto('yuheng_current',['gzyinghun','hongde','rebingyi']);
						},
						mark:true,
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								if(arg&&arg.card){
									var num=get.number(arg.card);
									if(typeof num!='number') return false;
									if(num<=1) return false;
									for(var i=2;i<=Math.sqrt(num);i++){
										if(num%i==0) return false;
									}
									return true;
								}
								return false;
							},
						},
						intro:{
							name:'命运线：圣质',
							content:function(storage,player){
								var finished=[],unfinished=['gzyinghun','hongde','rebingyi'];
								if(player.storage.yuheng){
									for(var i=0;i<unfinished.length;i++){
										if(player.storage.yuheng.contains(unfinished[i])){
											finished.push(unfinished[i]);
											unfinished.splice(i--,1);
										}
									}
								}
								var str='';
								if(unfinished.length) str+=('<li>未获得：'+get.translation(unfinished)+'<br>');
								if(finished.length) str+=('<li>已获得过：'+get.translation(finished)+'<br>');
								str+='<li>锁定技。若你因〖驭衡〗获得过〖英魂〗〖弘德〗〖秉壹〗，则当你使用点数为质数的牌时，此牌不可被响应。';
								return str;
							},
						},
					},
					chigang:{
						audio:2,
						trigger:{player:'phaseJudgeBefore'},
						forced:true,
						filter:function(event,player){
							if(!player.storage.yuheng) return false;
							var list=['xinfu_guanwei','bizheng','xinanguo'];
							for(var i of list){
								if(!player.storage.yuheng.contains(i)) return false;
							}
							return true;
						},
						content:function(){
							trigger.cancel();
							var next=player.phaseDraw();
							event.next.remove(next);
							trigger.getParent().next.push(next);
						},
						init:function(player,skill){
							player.markAuto('yuheng_current',['xinfu_guanwei','bizheng','xinanguo']);
						},
						ai:{
							effect:{
								target:function(card){
									if(get.type(card)=='delay') return 'zerotarget';
								},
							},
						},
						mark:true,
						intro:{
							name:'命运线：持纲',
							content:function(storage,player){
								var finished=[],unfinished=['xinfu_guanwei','bizheng','xinanguo'];
								if(player.storage.yuheng){
									for(var i=0;i<unfinished.length;i++){
										if(player.storage.yuheng.contains(unfinished[i])){
											finished.push(unfinished[i]);
											unfinished.splice(i--,1);
										}
									}
								}
								var str='';
								if(unfinished.length) str+=('<li>未获得：'+get.translation(unfinished)+'<br>');
								if(finished.length) str+=('<li>已获得过：'+get.translation(finished)+'<br>');
								str+='<li>锁定技。若你因〖驭衡〗获得过〖观微〗〖弼政〗〖安国〗，则当你的判定阶段开始前，你跳过此阶段并获得一个额外的摸牌阶段。';
								return str;
							},
						},
					},
					qionglan:{
						audio:2,
						init:function(player,skill){
							player.markAuto('yuheng_current',['shelie','wengua','rebotu']);
						},
						trigger:{player:'useSkillAfter'},
						forced:true,
						limited:true,
						filter:function(event,player){
							if(!player.storage.yuheng||event.skill!='yuheng') return false;
							var list=['shelie','wengua','rebotu'];
							for(var i of list){
								if(!player.storage.yuheng.contains(i)) return false;
							}
							return true;
						},
						content:function(){
							player.awakenSkill('dili_qionglan');
							var list=['dili_shengzhi','dili_chigang','dili_quandao','dili_jiaohui','dili_yuanlv'];
							var list2=list.randomRemove(2);
							if(list2.contains('dili_quandao')&&list2.contains('dili_jiaohui')){
								list2.randomRemove(1);
								list2.push(list.randomGet());
							}
							for(var skill of list2){
								player.addSkill(skill);
								game.log(player,'解锁了<span style="font-family: yuanli">东吴命运线</span>：','#g【'+get.translation(skill)+'】');
							}
						},
						mark:true,
						intro:{
							name:'命运线：穹览',
							content:function(storage,player){
								var finished=[],unfinished=['shelie','wengua','rebotu'];
								if(player.storage.yuheng){
									for(var i=0;i<unfinished.length;i++){
										if(player.storage.yuheng.contains(unfinished[i])){
											finished.push(unfinished[i]);
											unfinished.splice(i--,1);
										}
									}
								}
								var str='';
								if(unfinished.length) str+=('<li>未获得：'+get.translation(unfinished)+'<br>');
								if(finished.length) str+=('<li>已获得过：'+get.translation(finished)+'<br>');
								str+='<li>锁定技，限定技。若你因〖驭衡〗获得过〖涉猎〗〖问卦〗〖博图〗，则当你发动的〖驭衡〗结算结束后，你随机获得两条其他<span style="font-family: yuanli">东吴命运线</span>。';
								return str;
							},
						},
					},
					quandao:{
						audio:2,
						mod:{
							cardname:function(card,player){
								if(player.storage.yuheng&&[1,11,12,13].contains(card.number)){
									var list=['rezhiheng','jiexun','reanxu'];
									for(var i of list){
										if(!player.storage.yuheng.contains(i)) return;
									}
									return 'tiaojiyanmei';
								}
							},
						},
						init:function(player,skill){
							player.markAuto('yuheng_current',['rezhiheng','jiexun','reanxu']);
						},
						mark:true,
						intro:{
							name:'命运线：权道',
							content:function(storage,player){
								var finished=[],unfinished=['rezhiheng','jiexun','reanxu'];
								if(player.storage.yuheng){
									for(var i=0;i<unfinished.length;i++){
										if(player.storage.yuheng.contains(unfinished[i])){
											finished.push(unfinished[i]);
											unfinished.splice(i--,1);
										}
									}
								}
								var str='';
								if(unfinished.length) str+=('<li>未获得：'+get.translation(unfinished)+'<br>');
								if(finished.length) str+=('<li>已获得过：'+get.translation(finished)+'<br>');
								str+='<li>锁定技。若你因〖驭衡〗获得过〖制衡〗〖诫训〗〖安恤〗，则你手牌区内点数为字母的牌的牌名视为【调剂盐梅】。';
								return str;
							},
						},
					},
					jiaohui:{
						audio:2,
						mod:{
							cardname:function(card,player){
								if(player.countCards('h')==1&&player.storage.yuheng){
									var list=['xiashu','rejieyin','oldimeng'];
									for(var i of list){
										if(!player.storage.yuheng.contains(i)) return;
									}
									return 'yuanjiao';
								}
							},
						},
						init:function(player,skill){
							player.markAuto('yuheng_current',['xiashu','rejieyin','oldimeng']);
						},
						mark:true,
						intro:{
							name:'命运线：交辉',
							content:function(storage,player){
								var finished=[],unfinished=['xiashu','rejieyin','oldimeng'];
								if(player.storage.yuheng){
									for(var i=0;i<unfinished.length;i++){
										if(player.storage.yuheng.contains(unfinished[i])){
											finished.push(unfinished[i]);
											unfinished.splice(i--,1);
										}
									}
								}
								var str='';
								if(unfinished.length) str+=('<li>未获得：'+get.translation(unfinished)+'<br>');
								if(finished.length) str+=('<li>已获得过：'+get.translation(finished)+'<br>');
								str+='<li>锁定技。若你因〖驭衡〗获得过〖下书〗〖结姻〗〖缔盟〗，且你的手牌数为1，则此牌的牌名视为【远交近攻】。';
								return str;
							},
						},
					},
					yuanlv:{
						audio:2,
						init:function(player,skill){
							player.markAuto('yuheng_current',['xinfu_guanchao','drlt_jueyan','lanjiang']);
						},
						trigger:{player:'useCardToTargeted'},
						forced:true,
						filter:function(event,player){
							if(get.type(event.card,false)!='equip'||player!=event.target||event.card.name.indexOf('changandajian_equip')==0) return false;
							if(!player.storage.yuheng) return false;
							var list=['xinfu_guanchao','drlt_jueyan','lanjiang'];
							for(var i of list){
								if(!player.storage.yuheng.contains(i)) return false;
							}
							var type=get.subtype(event.card);
							if(lib.card['changandajian_'+type]&&player.hasEquipableSlot(type)) return true;
							return false;
						},
						content:function(){
							var cards=trigger.cards.filterInD();
							if(cards.length>0) game.cardsDiscard(cards);
							var type=get.subtype(trigger.card);
							var card=game.createCard('changandajian_'+type,Math.random()<0.5?'spade':'heart',10);
							player.useCard(card,player);
						},
						mark:true,
						intro:{
							name:'命运线：渊虑',
							content:function(storage,player){
								var finished=[],unfinished=['xinfu_guanchao','drlt_jueyan','lanjiang'];
								if(player.storage.yuheng){
									for(var i=0;i<unfinished.length;i++){
										if(player.storage.yuheng.contains(unfinished[i])){
											finished.push(unfinished[i]);
											unfinished.splice(i--,1);
										}
									}
								}
								var str='';
								if(unfinished.length) str+=('<li>未获得：'+get.translation(unfinished)+'<br>');
								if(finished.length) str+=('<li>已获得过：'+get.translation(finished)+'<br>');
								str+='<li>锁定技。若你因〖驭衡〗获得过〖观潮〗〖决堰〗〖澜江〗，则当你成为自己使用的装备牌的目标后，你将此牌置于弃牌堆，然后使用一张与此装备牌副类别相同的【长安大舰】。';
								return str;
							},
						},
					},
				},
			},
			yuheng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					var skills=player.getSkills(null,false,false).filter(function(i){
						if(i=='yuheng') return false;
						var info=get.info(i);
						return info&&!info.charlotte&&!get.is.locked(i);
					});
					if(skills.length){
						for(var i of skills) player.removeSkill(i);
					}
					//初始化技能库
					var list1=['dili_shengzhi','dili_chigang','dili_qionglan','dili_quandao','dili_jiaohui','dili_yuanlv'];
					var list2=['gzyinghun','hongde','rebingyi','xinfu_guanwei','bizheng','xinanguo','shelie','wengua','rebotu','rezhiheng','jiexun','reanxu','xiashu','rejieyin','oldimeng','xinfu_guanchao','drlt_jueyan','lanjiang'];
					var list3=[];
					if(!player.storage.yuheng_full) player.storage.yuheng_full=list2.slice(0);
					if(player.getStorage('yuheng_current').length==0){
						for(var i=0;i<list1.length;i++){
							if(player.hasSkill(list1[i])){
								for(var j=0;j<3;j++){
									list3.add(list2[i*3+j]);
								}
							}
						}
						if(!player.storage.yuheng_current) player.storage.yuheng_current=list3.slice(0);
					}
					var fullskills,currentskills;
					//决定抽选技能范围
					if(player.storage.yuheng_full&&player.storage.yuheng_full.length) fullskills=player.storage.yuheng_full;
					else fullskills=list2.slice(0);
					if(player.storage.yuheng_current&&player.storage.yuheng_current.length) currentskills=player.storage.yuheng_current;
					else currentskills=list3.slice(0);
					var skills=[];
					//在没有发动过其他非锁定技时抽选技能
					var evtx=event.getParent('phaseUse');
					if(currentskills.length>0&&!player.hasHistory('useSkill',function(evt){
						if(evt.skill=='yuheng'||evt.type!='player'||!evt.sourceSkill) return false;
						var info1=get.info(evt.skill);
						if(info1.charlotte) return false;
						var info=get.info(evt.sourceSkill);
						if(info.charlotte||get.is.locked(evt.skill)) return false;
						return evt.event.getParent('phaseUse')==evtx;
					})){
						fullskills.randomSort();
						currentskills.randomSort();
						for(var i=0;i<fullskills.length;i++){
							for(var j=0;j<currentskills.length;j++){
								if(fullskills[i]!=currentskills[j]||(i==fullskills.length-1&&j==currentskills.length-1)){
									skills.add(fullskills.splice(i--,1)[0]);
									skills.add(currentskills.splice(j--,1)[0]);
									break;
								}
							}
							if(skills.length>0) break;
						}
					}
					//在已经发动过其他非锁定技时抽选技能
					else{
						skills.add(fullskills.randomRemove(1)[0]);
					}
					for(var i of skills){
						player.addSkillLog(i);
					}
					player.markAuto('yuheng',skills);
				},
				ai:{
					order:function(item,player){
						var evtx=_status.event.getParent('phaseUse');
						if(!player.hasHistory('useSkill',function(evt){
							if(evt.skill=='yuheng'||evt.type!='player'||!evt.sourceSkill) return false;
							var info1=get.info(evt.skill);
							if(info1.charlotte) return false;
							var info=get.info(evt.sourceSkill);
							if(info.charlotte||get.is.locked(evt.skill)) return false;
							return evt.event.getParent('phaseUse')==evtx;
						})) return 11;
						return 0.8;
					},
					result:{player:1},
				},
				group:'yuheng_losehp',
				subSkill:{
					losehp:{
						trigger:{player:'phaseUseEnd'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return !player.hasHistory('useSkill',function(evt){
								if(evt.skill!='yuheng') return false;
								return evt.event.getParent('phaseUse')==event;
							});
						},
						content:function(){
							player.loseHp();
						},
					},
				},
			},
			jiufa:{
				audio:2,
				trigger:{player:['useCardAfter','respondAfter']},
				frequent:true,
				filter:function(event,player){
					return event.jiufa_counted&&player.getStorage('jiufa').length>=9;
				},
				content:function(){
					'step 0'
					player.unmarkSkill('jiufa');
					event.cards=get.cards(9);
					event.cards.sort(function(a,b){
						return get.number(b)-get.number(a);
					})
					game.cardsGotoOrdering(event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str;
						if(player==game.me&&!_status.auto){
							str='九伐：选择任意张点数满足条件的牌';
						}
						else{
							str='九伐';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,['涉猎',get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					"step 1"
					var next=player.chooseButton([0,9],true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						var num=get.number(button.link),cards=_status.event.getParent().cards;
						for(var i of ui.selected.buttons){
							if(get.number(i.link)==num) return false;
						}
						for(var i of cards){
							if(i!=button.link&&get.number(i)==num) return true;
						}
						return false;
					});
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player)
					});
					"step 2"
					if(result.bool&&result.links&&result.links.length){
						event.cards2=result.links;
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					"step 3"
					game.broadcastAll('closeDialog',event.videoId);
					var cards2=event.cards2;
					if(cards2&&cards2.length) player.gain(cards2,'log','gain2');
				},
				marktext:'⑨',
				intro:{
					content:'已记录牌名：$',
					onunmark:true,
				},
				group:'jiufa_count',
				subSkill:{
					count:{
						trigger:{player:['useCard1','respond']},
						forced:true,
						charlotte:true,
						popup:false,
						firstDo:true,
						filter:function(event,player){
							return !player.getStorage('jiufa').contains(event.card.name);
						},
						content:function(){
							trigger.jiufa_counted=true;
							player.markAuto('jiufa',[trigger.card.name]);
						},
					},
				},
			},
			tianren:{
				audio:2,
				trigger:{global:['loseAfter','cardsDiscardAfter','loseAsyncAfter']},
				forced:true,
				filter:function(event,player){
					if(event.name.indexOf('lose')==0){
						if(event.getlx===false||event.position!=ui.discardPile) return false;
					}
					else{
						var evt=event.getParent();
						if(evt.relatedEvent&&evt.relatedEvent.name=='useCard') return false;
					}
					for(var i of event.cards){
						var owner=false;
						if(event.hs&&event.hs.contains(i)) owner=event.player;
						var type=get.type(i,null,owner);
						if(type=='basic'||type=='trick') return true;
					}
					return false;
				},
				content:function(){
					var num=0;
					for(var i of trigger.cards){
						var owner=false;
						if(trigger.hs&&trigger.hs.contains(i)) owner=trigger.player;
						var type=get.type(i,null,owner);
						if(type=='basic'||type=='trick') num++;
					}
					player.addMark('tianren',num);
				},
				group:'tianren_maxHp',
				intro:{content:'mark'},
				subSkill:{
					maxHp:{
						trigger:{player:['tianrenAfter','gainMaxHpAfter','loseMaxHpAfter']},
						forced:true,
						filter:function(event,player){
							return player.countMark('tianren')>=player.maxHp;
						},
						content:function(){
							player.removeMark('tianren',player.maxHp);
							player.gainMaxHp();
							player.draw(2);
						},
					},
				},
			},
			pingxiang:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'ice',
				filter:function(event,player){
					return player.maxHp>9;
				},
				content:function(){
					'step 0'
					player.awakenSkill('pingxiang');
					player.loseMaxHp(9);
					event.num=0;
					'step 1'
					event.num++;
					player.chooseUseTarget({
						name:'sha',
						nature:'fire',
						isCard:true,
					},'请选择火【杀】的目标（'+(event.num==9?'⑨':event.num)+'/9）',false);
					'step 2'
					if(result.bool&&event.num<9) event.goto(1);
					else{
						player.removeSkill('jiufa');
						player.addSkill('pingxiang_effect');
					}
				},
				ai:{
					order:function(){
						return get.order({
							name:'sha',
							nature:'fire',
							isCard:true,
						});
					},
					result:{
						player:function(player){
							if(player.hasValueTarget({
								name:'sha',
								nature:'fire',
								isCard:true,
							})) return 1;
							return 0;
						},
					},
				},
				subSkill:{
					effect:{
						marktext:'襄',
						intro:{content:'手牌上限基数改为体力上限'},
						mod:{
							maxHandcardBase:function(player){
								return player.maxHp;
							},
						},
					},
				},
			},
			hina_shenshi:{
				groupSkill:true,
				trigger:{player:['phaseUseBegin','phaseUseEnd']},
				frequent:true,
				filter:function(event,player){
					return player.group=='shen';
				},
				content:function(){
					'step 0'
					player.draw(2).gaintag=['hina_shenshi'];
					player.addSkill('hina_shenshi_yingbian');
					'step 1'
					var cards=player.getCards('h',function(card){
						return card.hasGaintag('hina_shenshi');
					});
					if(!cards.length) event.finish();
					else if(cards.length==1) event._result={bool:true,cards:cards};
					else player.chooseCard('h',true,'将一张“神视”牌置于牌堆顶',function(card){
						return card.hasGaintag('hina_shenshi');
					});
					'step 2'
					if(result.bool){
						game.log(player,'将一张牌置于了牌堆顶');
						player.lose(result.cards,ui.cardPile,'insert');
						player.$throw(1,1000);
					}
					else event.finish();
					'step 3'
					game.delayx();
				},
				onremove:function(player){
					player.removeGaintag('hina_shenshi');
				},
				group:'hina_shenshi_yingbian',
			},
			hina_shenshi_yingbian:{
				trigger:{player:'yingbian'},
				forced:true,
				filter:(event,player)=>event.card.isCard&&player.hasHistory('lose',evt=>evt.getParent()==event&&Object.values(evt.gaintag_map).some(value=>value.includes('hina_shenshi'))),
				content:()=>{
					if(!Array.isArray(trigger.temporaryYingbian)) trigger.temporaryYingbian=[];
					trigger.temporaryYingbian.add('force');
					trigger.temporaryYingbian.addArray(get.yingbianEffects());
				}
			},
			hina_xingzhi:{
				groupSkill:true,
				trigger:{player:'yingbian'},
				usable:1,
				filter:(event,player)=>player.group=='key'&&!event.card.yingbian&&lib.yingbian.condition.complex.has('zhuzhan'),
				content:()=>{
					'step 0'
					trigger.yingbianZhuzhanAI=(player,card,source,targets)=>cardx=>{
						if(get.attitude(player,source)<=0) return 0;
						var info=get.info(card),num=0;
						if(info&&info.ai&&info.ai.yingbian){
							var ai=info.ai.yingbian(card,source,targets,player);
							if(ai) num=ai;
						}
						return Math.max(num,6)-get.value(cardx);
					};
					trigger.afterYingbianZhuzhan=event=>event.zhuzhanresult.draw(2);
					lib.yingbian.condition.complex.get('zhuzhan')(trigger);
					'step 1'
					if(!result.bool) return;
					trigger.card.yingbian=true;
					lib.yingbian.effect.forEach(value=>game.yingbianEffect(trigger,value));
					player.addTempSkill('yingbian_changeTarget');
				}
			},
			yingba:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:(event,player)=>(game.hasPlayer((current)=>(current!=player&&current.maxHp>1))),
				filterTarget:(card,player,target)=>(target!=player&&target.maxHp>1),
				content:function(){
					'step 0'
					target.loseMaxHp();
					'step 1'
					if(target.isIn()) target.addMark('yingba_mark',1);
					player.loseMaxHp();
				},
				locked:false,
				//global:'yingba_mark',
				mod:{
					targetInRange:function(card,player,target){
						if(target.hasMark('yingba_mark')) return true;
					},
				},
				ai:{
					combo:'scfuhai',
					threaten:3,
					order:9,
					result:{
						player:function(player,target){
							if(player.maxHp==1) return -2.5;
							return -0.25;
						},
						target:function(player,target){
							if(target.isHealthy()) return -2;
							if(!target.hasMark('yingba_mark')) return -1;
							return -0.2;
						},
					},
				},
				subSkill:{
					mark:{
						marktext:'定',
						intro:{
							name:'平定',
							content:'mark',
							onunmark:true,
						},
						mod:{
							maxHandcard:function(player,numx){
								var num=player.countMark('yingba_mark');
								if(num) return numx+num*game.countPlayer(function(current){
									return current.hasSkill('yingba');
								});
							},
						},
					},
				},
			},
			scfuhai:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					return event.target&&event.target.hasMark('yingba_mark');
				},
				logTarget:'target',
				content:function(){
					trigger.directHit.add(trigger.target);
					if(player.getHistory('gain',function(evt){
						return evt.getParent(2).name=='scfuhai';
					}).length<2) player.draw();
				},
				group:['scfuhai_die'],
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return arg&&arg.target&&arg.target.hasMark('yingba_mark')
					},
				},
				subSkill:{
					usea:{
						trigger:{player:'useCardAfter'},
						forced:true,
						filter:function(event,player){
							return lib.skill.scfuhai_usea.logTarget(event,player).length>0;
						},
						logTarget:function(event,player){
							return event.targets.filter(function(i){
								return i.hasMark('yingba_mark');
							});
						},
						content:function(){
							var num=0;
							for(var i of trigger.targets){
								var numx=i.countMark('yingba_mark');
								if(numx){
									num+=numx;
									i.removeMark('yingba_mark',numx);
								}
							}
							if(num) player.gainMaxHp(num);
						},
					},
					die:{
						trigger:{global:'die'},
						forced:true,
						filter:function(event,player){
							return event.player.countMark('yingba_mark')>0;
						},
						content:function(){
							player.gainMaxHp(trigger.player.countMark('yingba_mark'));
							player.draw(trigger.player.countMark('yingba_mark'));
						},
					},
				},
			},
			pinghe:{
				audio:2,
				mod:{
					maxHandcardBase:function(player){
						return player.getDamagedHp();
					},
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'recover')&&_status.event.type=='phase'&&!player.needsToDiscard()) return 0.2;
						}
					}
				},
				trigger:{player:'damageBegin2'},
				forced:true,
				filter:function(event,player){
					return event.source&&event.source!=player&&player.maxHp>1&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:'请选择【冯河】的牌和目标',
						prompt2:'将一张手牌交给一名其他角色并防止伤害'+(player.hasSkill('yingba')?'，然后令伤害来源获得一个“平定”标记':''),
						filterCard:true,
						forced:true,
						filterTarget:lib.filter.notMe,
						ai1:function(card){
							if(get.tag(card,'recover')&&!game.hasPlayer(function(current){
								return get.attitude(current,player)>0&&!current.hasSkillTag('nogain');
							})) return 0;
							return 1/Math.max(0.1,get.value(card));
						},
						ai2:function(target){
							var player=_status.event.player,att=get.attitude(player,target);
							if(target.hasSkillTag('nogain')) att/=9;
							return 4+att;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						//player.logSkill('pinghe',target);
						player.line(target,'green');
						player.give(result.cards,target);
						trigger.cancel();
						player.loseMaxHp();
						if(player.hasSkill('yingba')){
							trigger.source.addMark('yingba_mark',1);
						}
					}
				},
			},
			tianzuo:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&!lib.inpile.contains('qizhengxiangsheng');
				},
				content:function(){
					game.addGlobalSkill('tianzuo_global');
					for(var i=2;i<10;i++){
						var card=game.createCard2('qizhengxiangsheng',i%2?'club':'spade',i);
						ui.cardPile.insertBefore(card,ui.cardPile.childNodes[get.rand(0,ui.cardPile.childNodes.length)]);
					}
					game.broadcastAll(function(){lib.inpile.add('qizhengxiangsheng')});
					game.updateRoundNumber();
				},
				group:'tianzuo_remove',
				subSkill:{
					remove:{
						audio:2,
						trigger:{target:'useCardToBefore'},
						forced:true,
						priority:15,
						filter:function(event,player){
							return event.card&&event.card.name=='qizhengxiangsheng';
						},
						content:function(){
							trigger.cancel();
						},
						ai:{
							effect:{
								target:function(card,player,target){
									if(card&&card.name=='qizhengxiangsheng') return 'zerotarget';
								},
							}
						},
					},
					global:{
						trigger:{player:'useCardToPlayered'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.card.name=='qizhengxiangsheng';
						},
						content:function(){
							'step 0'
							var target=trigger.target;
							event.target=target;
							player.chooseControl('奇兵','正兵').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
								var e1=1.5*get.sgn(get.damageEffect(target,player,target));
								var e2=0;
								if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
								var es=target.getGainableCards(player,'e');
								if(es.length) e2=Math.min(e2,function(){
									var max=0;
									for(var i of es) max=Math.max(max,get.value(i,target))
									return -max/4;
								}());
								if(Math.abs(e1-e2)<=0.3) return Math.random()<0.5?'奇兵':'正兵';
								if(e1<e2) return '奇兵';
								return '正兵';
							}()).set('ai',function(){
								return _status.event.choice;
							});
							'step 1'
							var map=trigger.getParent().customArgs,id=target.playerid;
							if(!map[id]) map[id]={};
							map[id].qizheng_name=result.control;
						},
					},
					rewrite:{
						audio:'tianzuo',
						trigger:{global:'useCardToTargeted'},
						filter:function(event,player){
							return event.card.name=='qizhengxiangsheng';
						},
						logTarget:'target',
						prompt2:'观看其手牌并修改“奇正相生”标记',
						content:function(){
							'step 0'
							var target=trigger.target;
							event.target=target;
							if(player!=target&&target.countCards('h')>0) player.viewHandcards(target);
							player.chooseControl('奇兵','正兵').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
								var shas=target.getCards('h','sha'),shans=target.getCards('h','shan');
								var e1=1.5*get.sgn(get.damageEffect(target,player,target));
								var e2=0;
								if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
								var es=target.getGainableCards(player,'e');
								if(es.length) e2=Math.min(e2,function(){
									var max=0;
									for(var i of es) max=Math.max(max,get.value(i,target))
									return -max/4;
								}());
								if(get.attitude(player,target)>0){
									if(shas.length>=Math.max(1,shans.length)) return '奇兵';
									if(shans.length>shas.length) return '正兵';
									return e1>e2?'奇兵':'正兵';
								}
								if(shas.length) e1=-0.5;
								if(shans.length) e2=-0.7;
								if(Math.abs(e1-e2)<=0.3) return Math.random()<0.5?'奇兵':'正兵';
								var rand=Math.random();
								if(e1<e2) return rand<0.1?'奇兵':'正兵';
								return rand<0.1?'正兵':'奇兵';
							}()).set('ai',()=>(_status.event.choice));
							'step 1'
							var map=trigger.getParent().customArgs,id=target.playerid;
							if(!map[id]) map[id]={};
							map[id].qizheng_name=result.control;
							map[id].qizheng_aibuff=get.attitude(player,target)>0;
						},
					},
				},
			},
			lingce:{
				audio:2,
				trigger:{global:'useCard'},
				forced:true,
				filter:function(event,player){
					return (event.card.name=='qizhengxiangsheng'||get.zhinangs().contains(event.card.name)||player.getStorage('dinghan').contains(event.card.name))&&event.card.isCard&&event.cards.length==1;
				},
				content:function(){player.draw()},
			},
			dinghan:{
				audio:2,
				trigger:{
					target:'useCardToTarget',
					player:'addJudgeBefore',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					if(event.name=='useCardToTarget'&&get.type(event.card,null,false)!='trick') return false;
					return !player.getStorage('dinghan').contains(event.card.name);
				},
				content:function(){
					player.markAuto('dinghan',[trigger.card.name]);if(trigger.name=='addJudge'){
						trigger.cancel();
						var owner=get.owner(trigger.card);
						if(owner&&owner.getCards('hej').contains(trigger.card)) owner.lose(trigger.card,ui.discardPile);
						else game.cardsDiscard(trigger.card);
						game.log(trigger.card,'进入了弃牌堆');
					}
					else{
						trigger.targets.remove(player);
						trigger.getParent().triggeredTargets2.remove(player);
						trigger.untrigger();
					}
				},
				onremove:true,
				intro:{content:'已记录牌名：$'},
				group:'dinghan_add',
				subSkill:{
					add:{
						trigger:{player:'phaseBegin'},
						direct:true,
						content:function(){
							'step 0'
							var dialog=[get.prompt('dinghan')];list1=player.getStorage('dinghan'),list2=lib.inpile.filter(function(i){
								return get.type2(i,false)=='trick'&&!list1.contains(i);
							});
							if(list1.length){
								dialog.push('<div class="text center">已记录</div>');
								dialog.push([list1,'vcard']);
							}
							if(list2.length){
								dialog.push('<div class="text center">未记录</div>');
								dialog.push([list2,'vcard']);
							}
							player.chooseButton(dialog).set('ai',function(button){
								var player=_status.event.player,name=button.link[2];
								if(player.getStorage('dinghan').contains(name)){
									return -get.effect(player,{name:name},player,player);
								}
								else{
									return get.effect(player,{name:name},player,player)*(1+player.countCards('hs',name));
								}
							});
							'step 1'
							if(result.bool){
								player.logSkill('dinghan');
								var name=result.links[0][2];
								if(player.getStorage('dinghan').contains(name)){
									player.unmarkAuto('dinghan',[name]);
									game.log(player,'从定汉记录中移除了','#y'+get.translation(name));
								}
								else{
									player.markAuto('dinghan',[name]);
									game.log(player,'向定汉记录中添加了','#y'+get.translation(name));
								}
								game.delayx();
							}
						},
					},
				},
			},
			dulie:{
				audio:2,
				trigger:{target:'useCardToTarget'},
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					return event.card.name=='sha'&&event.player.hp>player.hp;
				},
				content:function(){
					'step 0'
					player.judge(function(result){
						if(get.suit(result)=='heart') return 2;
						return -1;
					}).judge2=function(result){
						return result.bool;
					};
					'step 1'
					if(result.bool){
						trigger.targets.remove(player);
						trigger.getParent().triggeredTargets2.remove(player);
						trigger.untrigger();
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current,isLink){
							if(card.name=='sha'&&!isLink&&player.hp>target.hp) return 0.5;
						},
					},
				},
				marktext:'围',
				intro:{
					name:'破围(围)',
					name2:'围',
					content:'mark',
				},
			},
			tspowei:{
				audio:3,
				dutySkill:true,
				locked:true,
				derivation:'shenzhu',
				group:['tspowei_init','tspowei_move','tspowei_achieve','tspowei_fail','tspowei_use','tspowei_remove'],
				subSkill:{
					remove:{
						audio:'tspowei3',
						trigger:{global:'damageEnd'},
						filter:function(event,player){
							return event.player&&event.player.isIn()&&event.player.hasMark('dulie');
						},
						forced:true,
						logTarget:'player',
						content:function(){
							trigger.player.removeMark('dulie',trigger.player.countMark('dulie'));
						},
					},
					use:{
						audio:'tspowei3',
						trigger:{global:'phaseBegin'},
						direct:true,
						filter:function(event,player){
							return event.player!=player&&event.player.hasMark('dulie')&&
								(player.countCards('h')>0||player.hp>=event.player.hp&&event.player.countCards('h')>0);
						},
						content:function(){
							'step 0'
							var list=[],target=trigger.player,choiceList=[
								'弃置一张牌并对其造成1点伤害',
								'获得其一张手牌',
							];
							event.target=target;
							if(player.hasCard(function(card){
								return lib.filter.cardDiscardable(card,player,'tspowei_use');
							},'h')) list.push('选项一');
							else choiceList[0]='<span style="opacity:0.5">'+choiceList[0]+'</span>';
							if(player.hp>=target.hp&&target.countCards('h')>0) list.push('选项二');
							else choiceList[1]='<span style="opacity:0.5">'+choiceList[1]+'</span>';
							player.chooseControl(list,'cancel2').set('prompt',get.prompt('tspowei',target)).set('choiceList',choiceList).set('ai',function(){
								var evt=_status.event.getParent();
								if(evt.player.hasCard(function(card){
									return lib.filter.cardDiscardable(card,evt.player,'tspowei_use')&&get.value(card,evt.player)<7;
								},'h')&&get.damageEffect(evt.target,evt.player,evt.player)>0) return '选项一';
								if(evt.player.hp>=evt.target.hp&&evt.target.countCards('h')>0&&get.attitude(evt.player,evt.target)<=0&&!evt.target.hasSkillTag('noh')) return '选项二';
								return 'cancel2';
							});
							'step 1'
							if(result.control!='cancel2'){
								if(result.control=='选项二'){
									player.logSkill('tspowei_use',target);
									player.gainPlayerCard(target,'h',true);
									event.goto(3);
								}
							}
							else event.finish();
							'step 2'
							player.chooseToDiscard('h',true).logSkill=['tspowei_use',target];
							target.damage();
							'step 3'
							player.addTempSkill('tspowei_inRange');
						},
						ai:{expose:0.2},
					},
					inRange:{
						charlotte:true,
						mod:{
							inRangeOf:function(from,to){
								if(from==_status.currentPhase) return true;
							},
						},
					},
					init:{
						audio:'tspowei3',
						trigger:{
							global:'phaseBefore',
							player:'enterGame',
						},
						forced:true,
						filter:function(event,player){
							return event.name!='phase'||game.phaseNumber==0;
						},
						logTarget:function(event,player){
							return game.filterPlayer((current)=>current!=player&&!current.hasMark('dulie'));
						},
						content:function(){
							var list=game.filterPlayer((current)=>current!=player&&!current.hasMark('dulie')).sortBySeat();
							for(var i of list) i.addMark('dulie',1,false);
						},
					},
					move:{
						audio:'tspowei3',
						trigger:{player:'phaseBegin'},
						forced:true,
						filter:function(event,player){
							return game.hasPlayer((current)=>current!=player&&current.hasMark('dulie'));
						},
						content:function(){
							var list=game.filterPlayer((current)=>current!=player&&current.hasMark('dulie')).sortBySeat();
							var map={};
							for(var i of list){
								var num=i.countMark('dulie');
								i.removeMark('dulie',num);
								map[i.playerid]=num;
							}
							for(var i of list){
								var next=i.next;
								if(next==player) next=next.next;
								next.addMark('dulie',map[i.playerid]);
							}
						},
					},
					achieve:{
						audio:'tspowei1',
						trigger:{player:'phaseBegin'},
						forced:true,
						skillAnimation:true,
						animationColor:'metal',
						filter:function(event,player){
							return !game.hasPlayer(function(current){
								return current.hasMark('dulie');
							});
						},
						content:function(){
							game.log(player,'成功完成使命');
							player.awakenSkill('tspowei');
							player.addSkillLog('shenzhu');
						},
					},
					fail:{
						audio:'tspowei2',
						trigger:{player:'dying'},
						forced:true,
						content:function(){
							'step 0'
							game.log(player,'使命失败');
							player.awakenSkill('tspowei');
							if(player.hp<1) player.recover(1-player.hp);
							'step 1'
							var num=player.countCards('e');
							if(num>0) player.chooseToDiscard('e',true,num);
						},
					},
				},
			},
			tspowei1:{audio:true},
			tspowei2:{audio:true},
			tspowei3:{audio:true},
			shenzhu:{
				audio:2,
				trigger:{player:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.card.isCard&&event.cards.length==1;
				},
				content:function(){
					'step 0'
					player.chooseControl().set('choiceList',[
						'摸一张牌，且本回合使用【杀】的次数上限+1',
						'摸三张牌，且本回合不能再使用【杀】',
					]).set('ai',()=>_status.event.player.hasSha()?0:1);
					'step 1'
					if(result.index==0){
						player.draw();
						player.addTempSkill('shenzhu_more');
						player.addMark('shenzhu_more',1,false);
					}
					else{
						player.draw(3);
						player.addTempSkill('shenzhu_less');
					}
				},
				subSkill:{
					more:{
						charlotte:true,
						onremove:true,
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('shenzhu_more');
							},
						},
					},
					less:{
						charlotte:true,
						mod:{
							cardEnabled:function(card){
								if(card.name=='sha') return false;
							}
						},
					},
				},
			},
			dangmo:{
				audio:2,
				trigger:{player:'useCard2'},
				direct:true,
				filter:function(event,player){
					if(event.card.name!='sha'||player.hp<=1) return false;
					var evt=event.getParent('phaseUse');
					return evt&&evt.player==player&&player.getHistory('useCard',function(evtx){
						return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
					})[0]==event&&game.hasPlayer(function(current){
						return !event.targets.contains(current)&&lib.filter.filterTarget(event.card,player,current);
					});
				},
				content:function(){
					'step 0'
					var num=Math.min(player.hp-1,game.countPlayer(function(current){
						return !trigger.targets.contains(current)&&lib.filter.filterTarget(trigger.card,player,current);
					}));
					player.chooseTarget(get.prompt('dangmo'),'为'+get.translation(trigger.card)+'增加至多'+get.translation(num)+'个目标',[1,num],function(card,player,target){
						var evt=_status.event.getTrigger();
						return !evt.targets.contains(target)&&lib.filter.filterTarget(evt.card,player,target);
					}).set('ai',function(target){
						var evt=_status.event.getTrigger(),eff=get.effect(target,evt.card,evt.player,evt.player);
						if(player.hasSkill('tspowei')&&target.hasMark('dulie')) return 4*eff;
						return eff;
					});
					'step 1'
					if(result.bool){
						if(player!=game.me&&!player.isOnline()) game.delayx();
						event.targets=result.targets;
					}
					else event.finish();
					'step 2'
					player.logSkill('dangmo',targets);
					trigger.targets.addArray(targets);
				},
			},
			reshuishi:{
				audio:'shuishi',
				enable:'phaseUse',
				usable:1,
				frequent:true,
				filter:function(event,player){
					return player.maxHp<10;
				},
				content:function(){
					'step 0'
					event.cards=[];
					event.suits=[];
					'step 1'
					player.judge(function(result){
						var evt=_status.event.getParent('reshuishi');
						if(evt&&evt.suits&&evt.suits.contains(get.suit(result))) return 0;
						return 1;
					}).set('callback',lib.skill.reshuishi.callback).judge2=function(result){
						return result.bool?true:false;
					};
					'step 2'
					var cards=cards.filterInD();
					if(cards.length) player.chooseTarget('将'+get.translation(cards)+'交给一名角色',true).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
						if(target.hasSkillTag('nogain')) att/=10;
						return att;
					});
					else event.finish();
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target,'green');
						target.gain(cards,'gain2').giver=player;
					}
					else event.finish();
					'step 4'
					if(target.isMaxHandcard()) player.loseMaxHp();
				},
				callback:function(){
					'step 0'
					var evt=event.getParent(2);
					event.getParent().orderingCards.remove(event.judgeResult.card);
					evt.cards.push(event.judgeResult.card);
					if(event.getParent().result.bool&&player.maxHp<10){
						evt.suits.push(event.getParent().result.suit);
						player.gainMaxHp();
						player.chooseBool('是否继续发动【慧识】？').set('frequentSkill','reshuishi');
					}
					else event._result={bool:false};
					'step 1'
					if(result.bool) event.getParent(2).redo();
				},
				ai:{
					order:9,
					result:{
						player:1,
					},
				},
			},
			shuishi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.maxHp<10;
				},
				filterTarget:true,
				content:function(){
					'step 0'
					target.draw();
					'step 1'
					if(!result||!Array.isArray(result)||result.length!=1||get.itemtype(result[0])!='card'){
						event.finish();
						return;
					}
					var suit=get.suit(result[0]),hs=target.getCards('h');
					for(var i of hs){
						if(i!=result[0]&&get.suit(i,target)==suit){
							player.loseMaxHp();
							target.showHandcards();
							event.finish();
							return;
						}
					}
					player.gainMaxHp();
					'step 2'
					if(player.maxHp<10){
						player.chooseBool('是否继续发动【慧识】？');
					}
					else event.finish();
					'step 3'
					if(result.bool) event.goto(0);
				},
				ai:{
					order:0.5,
					result:{
						target:0.2,
						player:function(player,target){
							var list=[],hs=target.getCards('h');
							for(var i of hs) list.add(get.suit(i,target));
							if(list.length==0) return 0;
							if(list.length==1) return player.maxHp>2?0:-2;
							if(list.length==2) return player.maxHp>3?0:-2;
							return -2;
						},
					},
				},
			},
			stianyi:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return !game.hasPlayer(function(current){
						return current.getAllHistory('damage').length==0;
					});
				},
				content:function(){
					'step 0'
					player.awakenSkill('stianyi');
					player.gainMaxHp(2);
					player.recover();
					'step 1'
					player.chooseTarget(true,'令一名角色获得技能〖佐幸〗').set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.storage.zuoxing=player;
						target.addSkill('zuoxing');
					}
				},
				derivation:'zuoxing',
			},
			zuoxing:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var target=player.storage.zuoxing;
					if(!target||!target.isIn()||target.maxHp<2) return false;
					for(var i of lib.inpile){
						if(get.type(i)=='trick'&&event.filterCard({name:i,isCard:true},player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						for(var i of lib.inpile){
							if(get.type(i)=='trick'&&event.filterCard({name:i,isCard:true},player,event)) list.push(['锦囊','',i]);
						}
						return ui.create.dialog('佐幸',[list,'vcard']);
					},
					check:function(button){
						return _status.event.player.getUseValue({name:button.link[2],isCard:true});
					},
					backup:function(links,player){
						return {
							viewAs:{
								name:links[0][2],
								isCard:true,
							},
							filterCard:()=>false,
							selectCard:-1,
							popname:true,
							precontent:function(){
								player.logSkill('zuoxing');
								var target=player.storage.zuoxing;
								target.loseMaxHp();
								//delete event.result.skill;
							},
						}
					},
					prompt:function(links,player){
						return '请选择'+get.translation(links[0][2])+'的目标';
					},
				},
				ai:{order:1,result:{player:1}},
			},
			resghuishi:{
				audio:'sghuishi',
				inherit:'sghuishi',
				filterTarget:true,
				prompt:function(){
					var player=_status.event.player;
					if(player.maxHp>=game.players.length) return '选择一名角色。若其拥有未发动过的觉醒技，则你解除其中一个觉醒技的发动限制；否则其摸四张牌。然后你减2点体力上限。';
					return '令一名角色摸四张牌，然后你减2点体力上限。';
				},
				content:function(){
					'step 0'
					player.awakenSkill('resghuishi');
					var list=target.getSkills(null,false,false).filter(function(skill){
						var info=lib.skill[skill];
						return info&&info.juexingji&&!target.awakenedSkills.contains(skill);
					});
					if(player.maxHp>=game.players.length&&list.length>0){
						if(list.length==1) event._result={control:list[0]};
						else player.chooseControl(list).set('prompt','选择一个觉醒技，令'+get.translation(target)+'可无视条件发动该技能');
					}
					else{
						target.draw(4);
						event.goto(2);
					}
					'step 1'
					target.storage.resghuishi_mark=result.control;
					target.markSkill('resghuishi_mark');
					var info=lib.skill[result.control];
					if(info.filter&&!info.charlotte&&!info.resghuishi_filter){
						info.resghuishi_filter=info.filter;
						info.filter=function(event,player){
							if(player.storage.resghuishi_mark) return true;
							return this.resghuishi_filter.apply(this,arguments);
						}
					}
					'step 2'
					player.loseMaxHp(2);
				},
				intro:{content:'未发动'},
				ai:{
					order:0.1,
					expose:0.2,
					result:{
						target:function(player,target){
							if(target!=player&&player.hasUnknown()||player.maxHp<(player.getDamagedHp()>1?5:6)) return 0;
							if(target==player&&player.hasSkill('resghuishi')&&game.hasPlayer(function(current){
								return current.getAllHistory('damage').length==0;
							})) return 4;
							var list=target.getSkills(null,false,false).filter(function(skill){
								var info=lib.skill[skill];
								return info&&info.juexingji&&!target.awakenedSkills.contains(skill);
							});
							if(list.length||target.hasJudge('lebu')||target.hasSkillTag('nogain')) return 0;
							return 4;
						},
					},
				},
				subSkill:{mark:{intro:{content:'发动【$】时无视条件'}}},
			},
			sghuishi:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'water',
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					player.awakenSkill('sghuishi');
					var list=target.getSkills(null,false,false).filter(function(skill){
						var info=lib.skill[skill];
						return info&&info.juexingji;
					});
					if(list.length){
						target.addMark('sghuishi',1,false);
						for(var i of list){
							var info=lib.skill[i];
							if(info.filter&&!info.charlotte&&!info.sghuishi_filter){
								info.sghuishi_filter=info.filter;
								info.filter=function(event,player){
									if(player.hasMark('sghuishi')) return true;
									return this.sghuishi_filter.apply(this,arguments);
								}
							}
						}
					}
					else target.draw(4);
					player.loseMaxHp(2);
				},
				intro:{content:'发动非Charlotte觉醒技时无视条件'},
				ai:{
					order:0.1,
					expose:0.2,
					result:{
						target:function(player,target){
							if(player.hasUnknown()||player.maxHp<5) return 0;
							var list=target.getSkills(null,false,false).filter(function(skill){
								var info=lib.skill[skill];
								return info&&info.juexingji;
							});
							if(list.length||target.hasJudge('lebu')||target.hasSkillTag('nogain')) return 0;
							return 4;
						},
					},
				},
			},
			zhanjiang:{
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&players[i].getEquips('qinggang').length>0){
							return true;
						}
					}
				},
				content:function(){
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i]!=player){
							var e=players[i].getEquips('qinggang');
							if(e.length>0){
								player.line(players[i],'green');
								player.gain(e,players[i],'give','bySelf');
							}
						}
					}
				}
			},
			boss_juejing:{
				audio:'juejing',
				trigger:{player:'phaseDrawBefore'},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					noh:true,
					nogain:true,
				},
				group:'boss_juejing2'
			},
			boss_juejing2:{
				audio:'juejing',
				trigger:{
					player:'loseAfter',
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				forced:true,
				filter:function(event,player){
					if(event.name=='gain'&&event.player==player) return player.countCards('h')>4;
					var evt=event.getl(player);
					if(!evt||!evt.hs||evt.hs.length==0||player.countCards('h')>=4) return false;
					var evt=event;
					for(var i=0;i<4;i++){
						evt=evt.getParent('boss_juejing2');
						if(evt.name!='boss_juejing2') return true;
					}
					return false;
				},
				content:function(){
					var num=4-player.countCards('h');
					if(num>0) player.draw(num);
					else player.chooseToDiscard('h',true,-num);
				},
			},
			meihun:{
				audio:2,
				trigger:{
					player:'phaseJieshuBegin',
					target:'useCardToTargeted',
				},
				direct:true,
				filter:function(event,player){
					if(event.name!='phaseJieshu'&&event.card.name!='sha') return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('h');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('meihun'),function(card,player,target){
						return target!=player&&target.countCards('h')>0;
					}).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att>0) return 0;
						return 0.1-att/target.countCards('h');
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('meihun',target);
						event.target=target;
						player.chooseControl(lib.suit).set('prompt','请选择一种花色').set('ai',function(){
							return lib.suit.randomGet();
						})
					}
					else event.finish();
					'step 2'
					var suit=result.control;
					player.chat(get.translation(suit+2));
					game.log(player,'选择了','#y'+get.translation(suit+2))
					if(target.countCards('h',{suit:suit})){
						target.chooseCard('h','交给'+get.translation(player)+'一张'+get.translation(suit)+'花色的手牌',true,function(card,player){
							return get.suit(card,player)==_status.event.suit;
						}).set('suit',suit);
					}
					else{
						player.discardPlayerCard(target,true,'h','visible');
						event.finish();
					}
					'step 3'
					if(result.bool&&result.cards&&result.cards.length) target.give(result.cards,player,'give');
				},
			},
			//Connect Mode support after Angel Beats! -2nd beat-
			huoxin:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(game.countPlayer()<3) return false;
					for(var i of lib.suit){
						if(player.countCards('h',{suit:i})>1) return true;
					}
					return false;
				},
				complexCard:true,
				position:'h',
				filterCard:function(card,player){
					if(!ui.selected.cards.length){
						var suit=get.suit(card);
						return player.countCards('h',function(card2){
							return card!=card2&&get.suit(card2,player)==suit;
						})>0;
					}
					return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
				},
				selectCard:2,
				selectTarget:2,
				filterTarget:lib.filter.notMe,
				multitarget:true,
				multiline:true,
				delay:false,
				discard:false,
				lose:false,
				check:function(card){
					return 6-get.value(card);
				},
				targetprompt:['拼点发起人','拼点目标'],
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<targets.length;i++){
						list.push([targets[i],cards[i]]);
					}
					game.loseAsync({
						gain_list:list,
						player:player,
						cards:cards,
						giver:player,
						animate:'giveAuto',
					}).setContent('gaincardMultiple');
					'step 1'
					game.delayx();
					if(targets[0].canCompare(targets[1])){
						targets[0].chooseToCompare(targets[1]);
					}
					else event.finish();
					'step 2'
					if(result.winner!==targets[0]) targets[0].addMark('huoxin',1);
					if(result.winner!==targets[1]) targets[1].addMark('huoxin',1);
				},
				marktext:'魅',
				intro:{
					name:'魅惑',
					name2:'魅惑',
					content:'mark',
				},
				group:'huoxin_control',
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(target.hasMark('huoxin')) return -2;
							return -1;
						},
					},
				},
			},
			huoxin_control:{
				audio:'huoxin',
				forced:true,
				trigger:{global:'phaseBeginStart'},
				filter:function(event,player){
					return player!=event.player&&!event.player._trueMe&&event.player.countMark('huoxin')>1;
				},
				logTarget:'player',
				skillAnimation:true,
				animationColor:'key',
				content:function(){
					trigger.player.removeMark('huoxin',trigger.player.countMark('huoxin'));
					trigger.player._trueMe=player;
					game.addGlobalSkill('autoswap');
					if(trigger.player==game.me){
						game.notMe=true;
						if(!_status.auto) ui.click.auto();
					}
					trigger.player.addSkill('huoxin2');
				},
			},
			huoxin2:{
				trigger:{
					player:['phaseAfter','dieAfter'],
					global:'phaseBefore',
				},
				lastDo:true,
				charlotte:true,
				forceDie:true,
				forced:true,
				silent:true,
				content:function(){
					player.removeSkill('huoxin2');
				},
				onremove:function(player){
					if(player==game.me){
						if(!game.notMe) game.swapPlayerAuto(player._trueMe)
						else delete game.notMe;
						if(_status.auto) ui.click.auto();
					}
					delete player._trueMe;
				},
			},
			shiki_omusubi:{
				audio:2,
				trigger:{global:'roundStart'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('shiki_omusubi'),lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
							if(player.isHealthy()) return 0;
							if(player.hp<3&&player.getDamagedHp()<2) return 0;
							var list=[];
							if(lib.character[target.name]) list.addArray(lib.character[target.name][3]);
							if(lib.character[target.name1]) list.addArray(lib.character[target.name1][3]);
							if(lib.character[target.name2]) list.addArray(lib.character[target.name2][3]);
							list=list.filter(function(i){
								return !player.hasSkill(i);
							});
							if(!list.length) return 0;
						return 1+Math.random();
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('shiki_omusubi',target);
						player.loseMaxHp();
						var list=[];
						if(lib.character[target.name]) list.addArray(lib.character[target.name][3]);
						if(lib.character[target.name1]) list.addArray(lib.character[target.name1][3]);
						if(lib.character[target.name2]) list.addArray(lib.character[target.name2][3]);
						player.addSkill(list);
						game.broadcastAll(function(list){
							lib.character.key_shiki[3].addArray(list);
							game.expandSkills(list);
							for(var i of list){
								var info=lib.skill[i];
								if(!info) continue;
								if(!info.audioname2) info.audioname2={};
								info.audioname2.key_shiki='shiki_omusubi';
							}
						},list);
					}
				},
			},
			kagari_zongsi:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					var controls=[];
					if(ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
					if(ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
					if(game.hasPlayer(function(current){
						return current.countCards('hej')>0;
					})) controls.push('选择一名角色区域内的一张牌');
					if(!controls.length){event.finish();return;}
					event.controls=controls;
					var next=player.chooseControl();
					next.set('choiceList',controls)
					next.set('prompt','请选择要移动的卡牌的来源');
					next.ai=function(){return 0};
					'step 1'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index=i;break;}
					}
					if(event.index==2){
						player.chooseTarget('请选择要移动的卡牌的来源',true,function(card,kagari,target){
							return target.countCards('hej')>0;
						});
					}
					else{
						var source=ui[event.index==0?'discardPile':'cardPile'].childNodes;
						var list=[];
						for(var i=0;i<source.length;i++) list.push(source[i]);
						player.chooseButton(['请选择要移动的卡牌',list],true).ai=get.buttonValue;
					}
					'step 2'
					if(event.index==2){
						player.line(result.targets[0]);
						event.target1=result.targets[0];
						player.choosePlayerCard(result.targets[0],true,'hej').set('visible',true);
					}
					else{
						event.card=result.links[0];
					}
					'step 3'
					if(event.index==2) event.card=result.cards[0];
					var controls=[
						'将这张牌移动到牌堆的顶部或者底部',
						'将这张牌移动到弃牌堆的顶部或者底部',
						'将这张牌移动到一名角色对应的区域里',
					];
					event.controls=controls;
					var next=player.chooseControl();
					next.set('prompt','要对'+get.translation(event.card)+'做什么呢？');
					next.set('choiceList',controls);
					next.ai=function(){return 2};
					'step 4'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index2=i;break;}
					}
					if(event.index2==2){
						player.chooseTarget('要将'+get.translation(card)+'移动到哪一名角色的对应区域呢',true).ai=function(target){
							return target==_status.event.player?1:0;
						};
					}
					else{
						player.chooseControl('顶部','底部').set('prompt','把'+get.translation(card)+'移动到'+(event.index2==0?'弃':'')+'牌堆的...');
					}
					'step 5'
					if(event.index2!=2){
						//if(event.target1) event.target1.lose(card,ui.special);
						//else card.goto(ui.special);
						event.way=result.control;
					}
					else{
						event.target2=result.targets[0];
						var list=['手牌区'];
						if(lib.card[card.name].type=='equip'&&event.target2.canEquip(card)) list.push('装备区');
						if(lib.card[card.name].type=='delay'&&!event.target2.isDisabledJudge()&&!event.target2.hasJudge(card.name)) list.push('判定区');
						if(list.length==1) event._result={control:list[0]};
						else{
							player.chooseControl(list).set('prompt','把'+get.translation(card)+'移动到'+get.translation(event.target2)+'的...').ai=function(){return 0};
						}
					}
					'step 6'
					if(event.index2!=2){
						var node=ui[event.index==0?'discardPile':'cardPile'];
						if(event.target1){
							var next=event.target1.lose(card,event.position);
							if(event.way=='顶部') next.insert_card=true;
						}
						else{
							if(event.way=='底部') node.appendChild(card);
							else node.insertBefore(card,node.firstChild);
						}
						game.updateRoundNumber();
						event.finish();
					}
					else{
						if(result.control=='手牌区'){
							var next=event.target2.gain(card);
							if(event.target1){
								next.source=event.target1;
								next.animate='giveAuto';
							}
							else next.animate='draw';
						}
						else if(result.control=='装备区'){
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.equip(card);
						}
						else{
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.addJudge(card);
						}
					}
					'step 7'
					game.updateRoundNumber();
				},
				ai:{
					order:10,
					result:{player:1},
				},
			},
			
			caopi_xingdong:{
				audio:'olfangquan',
				audioname:['shen_caopi'],
				subSkill:{
					mark:{
						mark:true,
						marktext:'令',
						intro:{
							content:'跳过下个回合的判定阶段和摸牌阶段',
						},
					},
				},
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h',lib.skill.caopi_xingdong.filterCard);
				},
				filterCard:function(card){
					return card.name=='sha'||get.type(card)=='trick';
				},
				check:function(card){return 1},
				filterTarget:lib.filter.notMe,
				discard:false,
				lose:false,
				delay:0,
				content:function(){
					'step 0'
					player.give(cards,target);
					'step 1'
					if(!target.getCards('h').contains(cards[0])) event._result={bool:false};
					else target.chooseUseTarget(cards[0],game.filterPlayer(function(current){
						return current!=player;
					}),'请使用得到的牌，或者跳过下回合的判定阶段和摸牌阶段');
					'step 2'
					if(result.bool) game.asyncDraw([player,target]);
					else{
						target.addTempSkill('caopi_xingdong_mark','phaseJudgeSkipped');
						target.skip('phaseJudge');
						target.skip('phaseDraw');
						event.finish();
					}
					'step 3'
					game.delay();
				},
				ai:{
					order:12,
					result:{
						target:function(player,target){
							var card=ui.selected.cards[0];
							if(target.hasSkill('pingkou')) return 1;
							if(!card) return 0;
							var info=get.info(card);
							if(info.selectTarget==-1){
								var eff=0;
								game.countPlayer(function(current){
									if(current!=player&&target.canUse(card,current)) eff+=get.effect(current,card,target,target)>0
								});
								if(eff>0||get.value(card)<3) return eff;
								return 0;
							}
							else if(game.hasPlayer(function(current){
								return current!=player&&target.canUse(card,current)&&get.effect(current,card,target,target)>0
							})) return 1.5;
							else if(get.value(card)<3) return -1;
							return 0;
						},
					},
				},
			},
			shenfu:{
				audio:2,
				trigger:{player:'phaseEnd'},
				direct:true,
				content:function(){
					'step 0'
					event.logged=false;
					//event.targets=[];
					event.goto(player.countCards('h')%2==1?1:4);
					'step 1'
					player.chooseTarget(get.prompt('shenfu'),'对一名其他角色造成1点雷属性伤害',lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player,'thunder')*(target.hp==1?2:1);
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						if(!event.logged){
							event.logged=true;
							player.logSkill('shenfu',target,'thunder');
						}
						else player.line(target,'thunder');
						target.damage('thunder');
					}
					else event.finish();
					'step 3'
					if(target.isDead()) event.goto(1);
					else event.finish();
					'step 4'
					player.chooseTarget(get.prompt('shenfu'),'令一名角色摸一张牌或弃置其一张手牌'/*,function(card,player,target){
						return !_status.event.getParent().targets.contains(target);
					}*/).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						var delta=target.hp-target.countCards('h');
						if(Math.abs(delta)==1&&get.sgn(delta)==get.sgn(att)) return 3*Math.abs(att);
						if(att>0||target.countCards('h')>0) return Math.abs(att);
						return 0;
					});
					'step 5'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						if(!event.logged){
							event.logged=true;
							player.logSkill('shenfu',target);
						}
						else player.line(target,'green');
						//targets.push(target);
						if(target.countCards('h')==0) event._result={index:0};
						else player.chooseControl('摸一张牌','弃置一张手牌').set('prompt','选择一项令'+get.translation(target)+'执行…').set('goon',get.attitude(player,target)>0?0:1).set('ai',()=>_status.event.goon);
						//else player.discardPlayerCard(target,'h','弃置'+get.translation(target)+'一张手牌，或点【取消】令其摸一张牌。');
					}
					else event.finish();
					'step 6'
					if(result.index==0) target.draw();
					else target.chooseToDiscard('h',true);
					'step 7'
					if(target.hp==target.countCards('h')) event.goto(4);
				},
				ai:{expose:0.25},
			},
			qixian:{
				mod:{
					maxHandcardBase:function(player,num){
						return 7;
					},
				},
			},
			chuyuan:{
				audio:2,
				trigger:{global:'damageEnd'},
				filter:function(event,player){
					return event.player.isIn()&&player.getExpansions('chuyuan').length<player.maxHp;
				},
				logTarget:'player',
				locked:false,
				content:function(){
					'step 0'
					trigger.player.draw();
					'step 1'
					if(!trigger.player.countCards('h')) event.finish();
					else trigger.player.chooseCard('h',true,'选择一张牌置于'+get.translation(player)+'的武将牌上作为「储」');
					'step 2'
					player.addToExpansion(result.cards,trigger.player,'give').gaintag.add('chuyuan');
				},
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				ai:{combo:'dengji'},
			},
			dengji:{
				audio:2,
				derivation:['tianxing','new_rejianxiong','rerende','rezhiheng','olluanji','caopi_xingdong'],
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'water',
				filter:function(event,player){
					return player.getExpansions('chuyuan').length>=3;
				},
				content:function(){
					player.awakenSkill(event.name);
					player.addSkill('tianxing');
					player.addSkill('new_rejianxiong');
					player.loseMaxHp();
					player.gain(player.getExpansions('chuyuan'),'gain2','fromStorage');
				},
			},
			tianxing:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.getExpansions('chuyuan').length>=3;
				},
				content:function(){
					'step 0'
					player.awakenSkill(event.name);
					player.loseMaxHp();
					player.gain(player.getExpansions('chuyuan'),'gain2','fromStorage');
					"step 1"
					player.removeSkill('chuyuan');
					player.chooseControl('rerende','rezhiheng','olluanji','caopi_xingdong').set('prompt','选择获得一个技能').set('ai',function(){
						var player=_status.event.player;
						if(!player.hasSkill('luanji')&&!player.hasSkill('olluanji')&&player.getUseValue({name:'wanjian'})>4) return 'olluanji';
						if(!player.hasSkill('rezhiheng')) return 'rezhiheng';
						if(!player.hasSkill('caopi_xingdong')) return 'caopi_xingdong';
						return 'rerende';
					});
					'step 2'
					player.addSkillLog(result.control);
				},
			},
			olzhiti:{
				audio:'drlt_zhiti',
				global:'olzhiti2',
				mod:{
					maxHandcard:function(player,num){
						if(game.hasPlayer(function(current){
							return current.isDamaged();
						})) return num+1;
					},
				},
				trigger:{player:['phaseDrawBegin2','phaseEnd']},
				forced:true,
				filter:function(event,player){
					var num=event.name=='phase'?5:3;
					if(num==3?event.numFixed:!game.hasPlayer(function(current){
						return current.hasEnabledSlot();
					})) return false;
					return game.countPlayer(function(current){
						return current.isDamaged();
					})>=num;
				},
				direct:true,
				content:function(){
					'step 0'
					if(trigger.name=='phaseDraw'){
						player.logSkill('olzhiti');
						trigger.num++;
						event.finish();
					}
					else{
						player.chooseTarget(get.prompt('olzhiti'),'废除一名角色的一个随机装备栏',function(card,player,target){
							return target.hasEnabledSlot();
						}).set('ai',function(target){
							return -get.attitude(_status.event.player,target)*(target.countCards('e')+1)
						});
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('olzhiti',target);
						var list=[];
						for(var i=1;i<6;i++){
							if(target.hasEnabledSlot(i)) list.add((i==3||i==4)?6:i);
						}
						var num=list.randomGet();
						if(num!=6) target.disableEquip(num);
						else{
							target.disableEquip(3,4);
						}
					}
				},
			},
			olzhiti2:{
				mod:{
					maxHandcard:function(player,num){
						if(player.isDamaged()) return num-game.countPlayer(function(current){
							return current.hasSkill('olzhiti')&&current.inRange(player);
						})
					},
				},
			},
			olduorui:{
				audio:'drlt_duorui',
				trigger:{
					source:'damageSource'
				},
				filter:function(event,player){
					if(!player.isPhaseUsing()||event.player.isDead()) return false;
					for(var i in event.player.disabledSkills){
						if(event.player.disabledSkills[i].contains('olduorui2')) return false;
					}
					var list=[];
					var listm=[];
					var listv=[];
					if(event.player.name1!=undefined) listm=lib.character[event.player.name1][3];
					else listm=lib.character[event.player.name][3];
					if(event.player.name2!=undefined) listv=lib.character[event.player.name2][3];
					listm=listm.concat(listv);
					var func=function(skill){
						var info=get.info(skill);
						if(!info||info.charlotte||info.forever) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					return list.length>0;
				},
				check:function(event,player){
					if(get.attitude(player,event.player)>=0) return false;
					if(event.getParent('phaseUse').skipped) return true;
					var nd=player.needsToDiscard();
					return player.countCards('h',function(card){
						return player.getUseValue(card,null,true)>0&&(nd?true:get.tag(card,'damage')>0);
					})==0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					var list=[];
					var listm=[];
					var listv=[];
					if(trigger.player.name1!=undefined) listm=lib.character[trigger.player.name1][3];
					else listm=lib.character[trigger.player.name][3];
					if(trigger.player.name2!=undefined) listv=lib.character[trigger.player.name2][3];
					listm=listm.concat(listv);
					var func=function(skill){
						var info=get.info(skill);
						if(!info||info.charlotte||info.forever) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					event.skills=list;
					player.chooseControl(list).set('prompt','选择'+get.translation(trigger.player)+'武将牌上的一个技能并令其失效');
					'step 1'
					trigger.player.disableSkill('olduorui2',result.control);
					trigger.player.addTempSkill('olduorui2',{player:'phaseAfter'});
					game.log(player,'选择了',trigger.player,'的技能','#g【'+get.translation(result.control)+'】');
					event.getParent('phaseUse').skipped=true;
				},
			},
			olduorui2:{
				onremove:function(player,skill){
					player.enableSkill(skill);
				},
				locked:true,
				mark:true,
				charlotte:true,
				intro:{
					content:function(storage,player,skill){
						var list=[];
						for(var i in player.disabledSkills){
							if(player.disabledSkills[i].contains(skill)) list.push(i);
						};
						if(list.length){
							var str='失效技能：';
							for(var i=0;i<list.length;i++){
								if(lib.translate[list[i]+'_info']) str+=get.translation(list[i])+'、';
							};
							return str.slice(0,str.length-1);
						};
					},
				},
			},
			wuhun2:{audio:2},
			wuhun21:{
				audio:true,
				skillAnimation:true,
				animationColor:'soil',
			},
			wuhun22:{
				audio:true,
				skillAnimation:true,
				animationColor:'soil',
			},
			wuhun23:{
				audio:true,
				skillAnimation:true,
				animationColor:'soil',
			},
			"pro_wuhun":{
			    audio:"wuhun2",
			    //global:"pro_wuhun_dec",
				group:["new_wuhun_mark","new_wuhun_die","wuhun22","wuhun23"],
				trigger:{
					player:"damageEnd",
				},
				forced:true,
				filter:function (event,player){
					return event.source&&event.source!=player;
				},
				content:function (){
				    trigger.source.addMark('new_wuhun_mark',trigger.num);
				},
			    subSkill:{
			        dec:{
			            mod:{
			                maxHandcardBase:function(player,num){
			                    if(player.hasMark('new_wuhun_mark')) return num-1;
			                },
			            },
			        },
			    },
			},
			"new_wuhun":{
				audio:"wuhun2",
				group:["new_wuhun_mark","new_wuhun_die","wuhun22","wuhun23"],
				trigger:{
					player:"damageEnd",
				},
				forced:true,
				filter:function (event,player){
					return event.source!=undefined;
				},
				content:function (){
				trigger.source.addMark('new_wuhun_mark',trigger.num);
				},
				subSkill:{
					die:{
						//audio:"wuhun2",
						skillAnimation:true,
						animationColor:'soil',
						trigger:{
							player:"die",
						},
						forced:true,
						forceDie:true,
						direct:true,
						filter:function (event,player){
							return game.hasPlayer(function(current){
								return current!=player&&current.hasMark('new_wuhun_mark');
							});
						},
						content:function (){
							"step 0"
							var num=0;
							for(var i=0;i<game.players.length;i++){
								var current=game.players[i];
								if(current!=player&&current.countMark('new_wuhun_mark')>num){
									num=current.countMark('new_wuhun_mark');
								}
							}
							player.chooseTarget(true,'请选择【武魂】的目标',function(card,player,target){
								return target!=player&&target.countMark('new_wuhun_mark')==_status.event.num;
							}).set('ai',function(target){
								return -get.attitude(_status.event.player,target);
							}).set('forceDie',true).set('num',num);
							"step 1"
							if(result.bool&&result.targets&&result.targets.length){
								var target=result.targets[0];
								event.target=target;
								player.logSkill(Math.random()<0.5?'wuhun21':'wuhun22',target);
								player.line(target,{color:[255, 255, 0]});
								game.delay(2);
							}
							"step 2"
							target.judge(function(card){
								if(['tao','taoyuan'].contains(card.name)) return 10;
								return -10;
							}).judge2=function(result){
								return result.bool==false?true:false;
							};
							"step 3"
							if(!result.bool){
								lib.element.player.die.apply(target,[]);
							}
						},
						sub:true,
					},
					mark:{
						marktext:"魇",
						intro:{
							name:"梦魇",
							content:"mark",
						},
						sub:true,
					},
				},
				ai:{
					threaten:0.01,
					notemp:true,
				},
			},
			pro_feiying:{
				mod:{
					globalTo:function(from,to,distance){
						return to.getHp() > 1 ? 1 : 2;
					}
				},
			},
			pro_guixin:{
				audio:"guixin",
				trigger:{
					player:"damageEnd",
				},
				check:function (event,player){
					var needTurn=game.countPlayer(function(current){
					    return current!=player&&current.countCards('hej')>0;
					})>2;
					if(needTurn&&(player.isTurnedOver()||event.num>1)) return true;
					var num=game.countPlayer(function(current){
						if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
							return true;
						}
						if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
							return true;
						}
					});
					if(!needTurn) return true;
					return num>=2;
				},
				content:function (){
					"step 0"
					var targets=game.filterPlayer();
					targets.remove(player);
					targets.sort(lib.sort.seat);
					event.targets=targets;
					event.count=trigger.num;
					"step 1"
					event.getn=0;
					event.num=0;
					player.line(targets,'green');
					player.chooseControl('手牌区','装备区','判定区').set('ai',function(){
						if(game.hasPlayer(function(current){
							return current.countCards('j')&&current!=player&&get.attitude(player,current)>0;
						})) return 2;
						return Math.floor(Math.random()*3);
					}).set('prompt','请选择优先获得的区域');
					"step 2"
					event.range={
						手牌区:['h','e','j'],
						装备区:['e','h','j'],
						判定区:['j','h','e'],
					}[result.control||'手牌区'];
					"step 3"
					if(num<event.targets.length){
						var target=event.targets[num];
						var range=event.range;
						for(var i=0;i<range.length;i++){
							var cards=target.getCards(range[i]);
							if(cards.length){
								var card=cards.randomGet();
								player.gain(card,target,'giveAuto','bySelf');
								event.getn++;
								break;
							}
						}
						event.num++;
					}
					"step 4"
					if(num<event.targets.length) event.goto(3);
					"step 5"
					if(event.getn>2) player.turnOver();
					"step 6"
					event.count--;
					if(event.count&&player.hasSkill('pro_guixin')){
						player.chooseBool(get.prompt2('pro_guixin')).ai=function(){
							return lib.skill.new_guixin.check({num:event.count},player);
						};
					}
					else{
						event.finish();
					}
					"step 7"
					if(event.count&&result.bool){
						player.logSkill('pro_guixin');
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					threaten:function (player,target){
						if(target.hp==1) return 2.5;
						return 1;
					},
					effect:{
						target:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp==1) return 0.8;
								if(target.isTurnedOver()) return [0,3];
								var num=game.countPlayer(function(current){
									if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
										return true;
									}
									if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
										return true;
									}
								});
								if(num>2) return [0,1];
								if(num==2) return [0.5,1];
							}
						},
					},
				},
				group:"pro_guixin_damage",
				subSkill:{
				    damage:{
				        trigger:{
				            player:"phaseZhunbeiBegin",
				        },
				        filter:function(event,player){
				            return player.countCards('he',function(card){
				                return lib.filter.cardDiscardable(card,player)&&get.type(card)=='equip';
				            })>=2;
				        },
				        direct:true,
				        content:function(){
				            "step 0"
				            player.chooseCardTarget({
        						filterCard:function(card,player){
        							return lib.filter.cardDiscardable(card,player)&&get.type(card)=='equip';
        						},
        						filterTarget:function(card,player,target){
        							return player!=target;
        						},
        						selectCard:2,
        						position:'he',
        						ai1:function(card){
        							return 10-get.value(card);
        						},
        						ai2:function(target){
        							var att=get.attitude(_status.event.player,target);
        							var trigger=_status.event.getTrigger();
        							var da=0;
        							if(_status.event.player.hp==1){
        								da=10;
        							}
        							if(trigger.num>1){
        								if(target.maxHp>5&&target.hp>1) return -att/10+da;
        								return -att+da;
        							}
        							var eff=get.damageEffect(target,_status.event.player,target);
        							if(att==0) return 0.1+da;
        							if(eff>=0&&trigger.num==1){
        								return att+da;
        							}
        							if(target.hp==target.maxHp) return -att+da;
        							if(target.hp==1){
        								if(target.maxHp<=4&&!target.hasSkillTag('maixie')){
        									if(target.maxHp<=3){
        										return -att+da;
        									}
        									return -att/2+da;
        								}
        								return da;
        							}
        							if(target.hp==target.maxHp-1){
        								if(target.hp>2||target.hasSkillTag('maixie')) return att/5+da;
        								if(att>0) return 0.02+da;
        								return 0.05+da;
        							}
        							return att/2+da;
        						},
        						prompt:get.prompt2('pro_guixin')
        					});
        					"step 1"
        					if(result.bool){
        						player.logSkill(event.name,result.targets);
        						player.discard(result.cards);
        						event.target=result.targets[0];
        						player.damage(event.target,'unreal');
        					}else {
        					    event.finish();
        					}
        					"step 2"
        					if(event.target.isIn()) {
        					    event.target.damage();
        					}
				        },
				    },
				},
			},
			"new_guixin":{
				audio:"guixin",
				trigger:{
					player:"damageEnd",
				},
				check:function (event,player){
					if(player.isTurnedOver()||event.num>1) return true;
					var num=game.countPlayer(function(current){
						if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
							return true;
						}
						if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
							return true;
						}
					});
					return num>=2;
				},
				content:function (){
					"step 0"
					var targets=game.filterPlayer();
					targets.remove(player);
					targets.sort(lib.sort.seat);
					event.targets=targets;
					event.count=trigger.num;
					"step 1"
					event.num=0;
					player.line(targets,'green');
					player.chooseControl('手牌区','装备区','判定区').set('ai',function(){
						if(game.hasPlayer(function(current){
							return current.countCards('j')&&current!=player&&get.attitude(player,current)>0;
						})) return 2;
						return Math.floor(Math.random()*3);
					}).set('prompt','请选择优先获得的区域');
					"step 2"
					event.range={
						手牌区:['h','e','j'],
						装备区:['e','h','j'],
						判定区:['j','h','e'],
					}[result.control||'手牌区'];
					"step 3"
					if(num<event.targets.length){
						var target=event.targets[num];
						var range=event.range;
						for(var i=0;i<range.length;i++){
							var cards=target.getCards(range[i]);
							if(cards.length){
								var card=cards.randomGet();
								player.gain(card,target,'giveAuto','bySelf');
								break;
							}
						}
						event.num++;
					}
					"step 4"
					if(num<event.targets.length) event.goto(3);
					"step 5"
					player.turnOver();
					"step 6"
					event.count--;
					if(event.count&&player.hasSkill('new_guixin')){
						player.chooseBool(get.prompt2('new_guixin')).ai=function(){
							return lib.skill.new_guixin.check({num:event.count},player);
						};
					}
					else{
						event.finish();
					}
					"step 7"
					if(event.count&&result.bool){
						player.logSkill('new_guixin');
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					threaten:function (player,target){
						if(target.hp==1) return 2.5;
						return 1;
					},
					effect:{
						target:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp==1) return 0.8;
								if(target.isTurnedOver()) return [0,3];
								var num=game.countPlayer(function(current){
									if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
										return true;
									}
									if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
										return true;
									}
								});
								if(num>2) return [0,1];
								if(num==2) return [0.5,1];
							}
						},
					},
				},
			},
			pro_shenfen:{
				audio:'ol_shenfen',
				enable:'phaseUse',
				filter:function(event,player){
					return player.countMark('baonu')>=6;
				},
				//usable:1,
				limited:true,
				skillAnimation:true,
				animationColor:'metal',
				content:function(){
					"step 0"
					event.delay=false;
					player.awakenSkill('pro_shenfen');
					player.removeMark('baonu',6);
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					player.line(event.targets,'green');
					event.targets2=event.targets.slice(0);
					event.targets3=event.targets.slice(0);
					"step 1"
					if(event.targets2.length){
						event.targets2.shift().damage('nocard');
						event.redo();
					}
					"step 2"
					if(event.targets.length){
						event.current=event.targets.shift()
						if(event.current.countCards('e')) event.delay=true;
						event.current.discard(event.current.getCards('e')).delay=false;
					}
					"step 3"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets.length) event.goto(2);
					"step 4"
					if(event.targets3.length){
						var target=event.targets3.shift();
						target.chooseToDiscard(4,'h',true).delay=false;
						if(target.countCards('h')) event.delay=true;
					}
					"step 5"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets3.length) event.goto(4);
					//"step 6"
					//if(game.countPlayer()>3) player.turnOver();
				},
				ai:{
					combo:'baonu',
					order:10,
					result:{
						player:function(player){
							return game.countPlayer(function(current){
								if(current!=player){
									return get.sgn(get.damageEffect(current,player,player));
								}
							});
						}
					}
				}
			},
			ol_shenfen:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countMark('baonu')>=6;
				},
				usable:1,
				skillAnimation:true,
				animationColor:'metal',
				content:function(){
					"step 0"
					event.delay=false;
					player.removeMark('baonu',6);
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					player.line(event.targets,'green');
					event.targets2=event.targets.slice(0);
					event.targets3=event.targets.slice(0);
					"step 1"
					if(event.targets2.length){
						event.targets2.shift().damage('nocard');
						event.redo();
					}
					"step 2"
					if(event.targets.length){
						event.current=event.targets.shift()
						if(event.current.countCards('e')) event.delay=true;
						event.current.discard(event.current.getCards('e')).delay=false;
					}
					"step 3"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets.length) event.goto(2);
					"step 4"
					if(event.targets3.length){
						var target=event.targets3.shift();
						target.chooseToDiscard(4,'h',true).delay=false;
						if(target.countCards('h')) event.delay=true;
					}
					"step 5"
					if(event.delay) game.delay(0.5);
					event.delay=false;
					if(event.targets3.length) event.goto(4);
					"step 6"
					player.turnOver();
				},
				ai:{
					combo:'baonu',
					order:10,
					result:{
						player:function(player){
							return game.countPlayer(function(current){
								if(current!=player){
									return get.sgn(get.damageEffect(current,player,player));
								}
							});
						}
					}
				}
			},
			ol_wuqian:{
				audio:2,
				enable:'phaseUse',
				derivation:'wushuang',
				filter:function(event,player){
					return player.countMark('baonu')>=2;
				},
				filterTarget:function(card,player,target){
					return target!=player&&!target.hasSkill('ol_wuqian_targeted');
				},
				content:function(){
					player.removeMark('baonu',2);
					player.addTempSkill('wushuang');
					player.storage.ol_wuqian_target=target;
					player.addTempSkill('ol_wuqian_target');
					target.addTempSkill('ol_wuqian_targeted');
				},
				subSkill:{
					equip:{
						ai:{
							unequip:true,
							skillTagFilter:function(player,tag,arg){
								if(arg&&arg.target&&arg.target.hasSkill('ol_wuqian_targeted')) return true;
								return false;
							}
						}
					},
					targeted:{ai:{unequip2:true}},
					target:{
						mark:'character',
						onremove:true,
						intro:{
							content:'获得无双且$防具失效直到回合结束'
						},
					}
				}
			},
			pro_wumou:{
				audio:'wumou',
				trigger:{
                    player:"phaseJieshuBegin",
                },
                forced:true,
                filter:function(event,player){
                    if(player.getHistory('skipped').contains('phaseUse')) return false;
                    var history=player.getHistory('useCard');
                    var next=false;
                    for(var i=0;i<history.length;i++){
                        if(get.type(history[i].card)=='trick'&&history[i].isPhaseUsing()) next=true;
                    }
                    return next;
                },
				content:function(){
					'step 0'
					if(player.hasMark('baonu')){
						player.chooseControlList([
							'移去一枚【暴怒】标记',
							'受到1点伤害'
						],true).set('ai',function(event,player){
							if(get.effect(player,{name:'losehp'},player,player)>=0) return 1;
							if(player.storage.baonu>6) return 0;
							if(player.hp+player.num('h','tao')>3) return 1;
							return 0;
						});
					}
					else{
						player.damage('nosource');
						event.finish();
					}
					'step 1'
					if(result.index==0){
						player.removeMark('baonu',1);
					}
					else{
						player.damage('nosource');
					}
				},
				ai:{
					effect:{
						player_use:function(card,player){
							if (get.type(card)=='trick'&&get.value(card)<6){
								return [0,-2];
							}
						}
					}
				}
			},
			wumou:{
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event){
					return get.type(event.card)=='trick';
				},
				content:function(){
					'step 0'
					if(player.hasMark('baonu')){
						player.chooseControlList([
							'移去一枚【暴怒】标记',
							'失去1点体力'
						],true).set('ai',function(event,player){
							if(get.effect(player,{name:'losehp'},player,player)>=0) return 1;
							if(player.storage.baonu>6) return 0;
							if(player.hp+player.num('h','tao')>3) return 1;
							return 0;
						});
					}
					else{
						player.loseHp();
						event.finish();
					}
					'step 1'
					if(result.index==0){
						player.removeMark('baonu',1);
					}
					else{
						player.loseHp();
					}
				},
				ai:{
					effect:{
						player_use:function(card,player){
							if (get.type(card)=='trick'&&get.value(card)<6){
								return [0,-2];
							}
						}
					}
				}
			},
			pro_qinyin:{
				audio:'qinyin',
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					var list=[];
					var cards=[];
        			game.getGlobalHistory('cardMove',function(evt){
        			    if(evt.name!='cardsDiscard'){
         			        if(evt.name!='lose'||evt.position!=ui.discardPile) return false;
        			    }
     			        cards.addArray(evt.cards.filter(card=>get.position(card,true)=='d'));
     			    });
     			    cards.forEach(card=>{
     			        var color=get.color(card);
     			        if(['black','red'].contains(color)) list.add(color);
     			    });
					player.removeMark("pro_qinyin_mark");
					return list.length>=2;
				},
				group:'pro_qinyin_mark',
				content:function(){
					"step 0"
					player.addTempSkill('pro_qinyin_nomark');
					//player.draw(2);
					event.forceDie=true;
					if(typeof event.count!='number'){
						// event.count=trigger.cards.length-1;
						event.count=1;
					}
					var recover=0,lose=0,players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].hp<players[i].maxHp){
							if(get.attitude(player,players[i])>0){
								if(players[i].hp<2){
									lose--;
									recover+=0.5;
								}
								lose--;
								recover++;
							}
							else if(get.attitude(player,players[i])<0){
								if(players[i].hp<2){
									lose++;
									recover-=0.5;
								}
								lose++;
								recover--;
							}
						}
						else{
							if(get.attitude(player,players[i])>0){
								lose--;
							}
							else if(get.attitude(player,players[i])<0){
								lose++;
							}
						}
					}
					var prompt=get.prompt('pro_qinyin')+'（剩余'+get.cnNumber(event.count)+'次）';
					if(player.storage.pro_yeyan||player.storage.th_yeyan) {
					    player.chooseControl('失去体力','回复体力','重置业炎','cancel2',ui.create.dialog(get.prompt('pro_qinyin'),'hidden')).ai=function(){
						    if(player.maxHp>3) return 2;
						    if(lose>recover&&lose>0) return 0;
						    if(lose<recover&&recover>0) return 1;
						    return 3;
					    };
					}else {
					    player.chooseControl('失去体力','回复体力','cancel2',ui.create.dialog(get.prompt('pro_qinyin'),'hidden')).ai=function(){
						    if(lose>recover&&lose>0) return 0;
						    if(lose<recover&&recover>0) return 1;
						    return 2;
					    };
					}
					"step 1"
					if(result.control=='cancel2'){
						event.finish();
					}else if(result.control=='重置业炎') {
					    player.restoreSkill('pro_yeyan');
					    player.restoreSkill('th_yeyan');
					    game.log(player,'重置了','#g【业炎】');
					    player.loseMaxHp();
					    event.finish();
					}else{
						//player.logSkill('pro_qinyin');
						event.bool=(result.control=='回复体力');
						event.num=0;
						event.players=game.filterPlayer();
					}
					"step 2"
					if(event.num<event.players.length){
						var target=event.players[event.num];
						if(event.bool){
							target.recover();
						}
						else{
							target.loseHp();
						}
						event.num++;
						event.redo();
					}
					"step 3"
					if(event.count>1){
						event.count--;
						event.goto(0);
					}
				},
				ai:{
					expose:0.1,
					threaten:2
				},
				subSkill:{
				    nomark:{},
				    mark:{
						trigger:{
							global:["loseAfter","cardsDiscardAfter","loseAsyncAfter","equipAfter"],
						},
						/*trigger:{
						    global:["loseAfter","loseAsyncAfter"],
						},*/
						direct:true,
						filter:function(event,player){
							if(player.hasSkill('pro_qinyin_nomark')) return false;
							return player==_status.currentPhase;
						},
				        marktext:"琴音",
						content:function(){
             		        var list=[];
        			        var cards=[];
        		            game.getGlobalHistory('cardMove',function(evt){
        			            if(evt.name!='cardsDiscard'){
         			                if(evt.name!='lose'||evt.position!=ui.discardPile) return false;
        			            }
     			                cards.addArray(evt.cards.filter(card=>get.position(card,true)=='d'));
     			            });
     			            cards.addArray(trigger.getd().filter(function(i){
        			            if(get.position(i,true)=='d'){
            		                return true;
            		            }
            		            return false;
        		            }));
     			            cards.forEach(card=>{
     			                var color=get.color(card);
     			                if(['black','red'].contains(color)) list.add(get.translation(color)[0]);
     			            });
             		        if (list.length) {
                		        var str = list.join(' ');
               		            player.storage.pro_qinyin_mark = '';
               		            player.addMark("pro_qinyin_mark", str);
              		        }else {
              		            player.removeMark("pro_qinyin_mark");
          		            }
						},
						intro:{
				            content:function(storage,player,skill){
				                var list=[];
				                var cards=[];
        		                game.getGlobalHistory('cardMove',function(evt){
        			                if(evt.name!='cardsDiscard'){
         			                    if(evt.name!='lose'||evt.position!=ui.discardPile) return false;
        			                }
     			                    cards.addArray(evt.cards.filter(card=>get.position(card,true)=='d'));
     			                });
     			                cards.forEach(card=>{
     			                    var color=get.color(card);
     			                    if(['black','red'].contains(color)) list.add(get.translation(color));
     			                });
             		            if (list.length) {
                		            var str = list.join('、');
               		                return '本回合进入弃牌堆的牌颜色：'+str;
              		            }else {
              		                return '本回合尚未有牌进入弃牌堆';
          		                }
                            },
				        },
				    },
				},
			},
			qinyin:{
				audio:2,
				trigger:{player:'phaseDiscardEnd'},
				direct:true,
				filter:function(event,player){
					var cards=[];
					player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event) cards.addArray(evt.cards2);
					});
					return cards.length>1;
				},
				content:function(){
					"step 0"
					event.forceDie=true;
					if(typeof event.count!='number'){
						// event.count=trigger.cards.length-1;
						event.count=1;
					}
					var recover=0,lose=0,players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].hp<players[i].maxHp){
							if(get.attitude(player,players[i])>0){
								if(players[i].hp<2){
									lose--;
									recover+=0.5;
								}
								lose--;
								recover++;
							}
							else if(get.attitude(player,players[i])<0){
								if(players[i].hp<2){
									lose++;
									recover-=0.5;
								}
								lose++;
								recover--;
							}
						}
						else{
							if(get.attitude(player,players[i])>0){
								lose--;
							}
							else if(get.attitude(player,players[i])<0){
								lose++;
							}
						}
					}
					var prompt=get.prompt('qinyin')+'（剩余'+get.cnNumber(event.count)+'次）';
					player.chooseControl('失去体力','回复体力','cancel2',
					ui.create.dialog(get.prompt('qinyin'),'hidden')).ai=function(){
						if(lose>recover&&lose>0) return 0;
						if(lose<recover&&recover>0) return 1;
						return 2;
					}
					"step 1"
					if(result.control=='cancel2'){
						event.finish();
					}
					else{
						player.logSkill('qinyin');
						event.bool=(result.control=='回复体力');
						event.num=0;
						event.players=game.filterPlayer();
					}
					"step 2"
					if(event.num<event.players.length){
						var target=event.players[event.num];
						if(event.bool){
							target.recover();
						}
						else{
							target.loseHp();
						}
						event.num++;
						event.redo();
					}
					"step 3"
					if(event.count>1){
						event.count--;
						event.goto(0);
					}
				},
				ai:{
					expose:0.1,
					threaten:2
				}
			},
			lianpo:{
				audio:2,
				audioname:['new_shen_simayi'],
				trigger:{global:'phaseAfter'},
				frequent:true,
				filter:function(event,player){
					return player.getStat('kill')>0;
				},
				content:function(){
					player.insertPhase();
				}
			},
			pro_baonu:{
			    audio:'baonu',
				group:'baonu',
				trigger:{player:'phaseAfter'},
				frequent:true,
				filter:function(event,player){
					return player.getStat('kill')>0;
				},
				content:function(){
					'step 0'
					player.recover();
					'step 1'
					if(player.storage.pro_shenfen) {
					    player.restoreSkill('pro_shenfen');
					    game.log(player,'重置了','#g【神愤】');
					}
				}
				/*trigger:{
					player:'phaseZhunbeiBegin',
				},
				forced:true,
				content:function(){
					player.addMark('baonu');
				},*/
			},
			baonu:{
				audio:2,
				marktext:'暴',
				unique:true,
				trigger:{
					source:'damageSource',
					player:['damageEnd','enterGame'],
					global:'phaseBefore',
				},
				forced:true,
				filter:function(event){
					return (event.name!='damage'&&(event.name!='phase'||game.phaseNumber==0))||event.num>0; 
				},
				content:function(){
					player.addMark('baonu',trigger.name=='damage'?trigger.num:2);
				},
				intro:{
					name:'暴怒',
					content:'mark'
				},
				ai:{
					combo:'ol_shenfen',
					maixie:true,
					maixie_hp:true
				}
			},
			shenfen:{
				audio:2,
				unique:true,
				enable:'phaseUse',
				filter:function(event,player){
					return player.storage.baonu>=6;
				},
				skillAnimation:true,
				animationColor:'metal',
				limited:true,
				content:function(){
					"step 0"
					player.awakenSkill('shenfen');
					player.storage.baonu-=6;
					player.markSkill('baonu');
					player.syncStorage('baonu');
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.sort(lib.sort.seat);
					event.targets2=event.targets.slice(0);
					player.line(event.targets,'green');
					"step 1"
					if(event.targets.length){
						event.targets.shift().damage();
						event.redo();
					}
					"step 2"
					if(event.targets2.length){
						var cur=event.targets2.shift();
						if(cur&&cur.countCards('he')){
							cur.chooseToDiscard('he',true,4);
						}
						event.redo();
					}
				},
				ai:{
					order:10,
					result:{
						player:function(player){
							return game.countPlayer(function(current){
								if(current!=player){
									return get.sgn(get.damageEffect(current,player,player));
								}
							});
						}
					}
				}
			},
			pro_wuqian:{
				audio:'ol_wuqian',
				enable:'phaseUse',
				derivation:'wushuang',
				usable:1,
				filter:function(event,player){
					return player.countMark('baonu')>=2;
				},
				filterTarget:function(card,player,target){
					return target!=player&&!target.hasSkill('ol_wuqian_targeted');
				},
				content:function(){
					player.removeMark('baonu',2);
					player.addTempSkill('wushuang');
					player.storage.ol_wuqian_target=target;
					player.addTempSkill('ol_wuqian_target');
					target.addTempSkill('ol_wuqian_targeted');
					if(target.countGainableCards(player,'hej')){
						//player.gainPlayerCard(target,true,'hej');
						var cards=target.getGainableCards(player,'he').randomGets(1);
					    player.gain(cards,target,'giveAuto','bySelf');
					}
				},
				ai:{
					order:5,
					result:{
						target:function(player,target){
							if(game.countPlayer()>4&&player.countMark('baonu')<6) return 0;
							if(!target.countCards('he')) return 0;
							var cards=player.getCards('h','sha');
							if(!cards.length) return 0;
							if(!player.canUse('sha',target)) return 0;
							return get.effect(target,{name:'sha'},player,target)/5;
						},
						player:function(player){
							if(game.countPlayer()>4&&player.countMark('baonu')<6) return -5;
							var cards=player.getCards('h','sha');
							if(cards.length){
								if(game.hasPlayer(function(current){
									return (player.canUse('sha',current)&&
									get.effect(current,cards[0],player,player)>0&&current.hasShan());
								})){
									return 1;
								}
							}
							return -2;
						}
					}
				},
				subSkill:{
					equip:{
						ai:{
							unequip:true,
							skillTagFilter:function(player,tag,arg){
								if(arg&&arg.target&&arg.target.hasSkill('ol_wuqian_targeted')) return true;
								return false;
							}
						}
					},
					targeted:{ai:{unequip2:true}},
					target:{
						mark:'character',
						onremove:true,
						intro:{
							content:'获得无双且$防具失效直到回合结束'
						},
					}
				}
			},
			wuqian:{
				audio:2,
				enable:'phaseUse',
				derivation:'wushuang',
				filter:function(event,player){
					return player.storage.baonu>=2&&!player.hasSkill('wushuang');
				},
				content:function(){
					player.storage.baonu-=2;
					player.addTempSkill('wushuang');
				},
				ai:{
					order:5,
					result:{
						player:function(player){
							if(!player.storage.shenfen) return 0;
							var cards=player.getCards('h','sha');
							if(cards.length){
								if(game.hasPlayer(function(current){
									return (player.canUse('sha',current)&&
									get.effect(current,cards[0],player,player)>0&&current.hasShan());
								})){
									return 1;
								}
							}
							return 0;
						}
					}
				}
			},
			pro_renjie:{
				audio:'renjie2',
				forced:true,
				notemp:true,
				/*trigger:{
				    target:"useCardToTarget",
				},
				forced:true,
				filter:function(event,player){
				    return !player.hasSkill('pro_jilue')&&event.player!=player&&get.type2(event.card)=='trick';
				},*/
				forced:true,
				trigger:{
    			    global:"phaseEnd",
    			},
    			filter:function(event,player){
        			if(player.hasSkill('pro_jilue')) return false;
        			if(event.player==player) return false;
        			var respondEvts=[];
        			//game.countPlayer2(current=>respondEvts.addArray(current.getHistory('useCard')).addArray(current.getHistory('respond')));
        			var current=player;
        			respondEvts.addArray(current.getHistory('useCard')).addArray(current.getHistory('respond'))
        			respondEvts=respondEvts.filter(i=>i.respondTo).map(evt=>evt.respondTo);
        			return event.player.hasHistory('useCard',function(evt){
        			    return evt.card&&get.type2(evt.card)=='trick'/*&&evt.target!=evt.player*/;
        			})&&!event.player.hasHistory('useCard',evt=>{
            			return respondEvts.some(list=>{
            			    return list[1]==evt.card&&get.type2(evt.card)=='trick'/*&&evt.target!=evt.player*/;
            			});
        			});
    			},
				content:function(){
					//if(player.countMark('renjie')<8) player.addMark('renjie',1);
					player.addMark('renjie');
				},
				ai:{
					combo:'pro_baiyin',
				},
				group:['pro_renjie1','pro_renjie2','pro_renjie_phase'],
				subSkill:{
				    phase:{
				        trigger:{player:'phaseZhunbeiBegin'},
				        forced:true,
				        group:'renjie2',
				        priority:-15,
				        filter:function(event,player){
				        	return player.hasSkill('pro_jilue');
				        },
				        content:function(){
					        //if(player.countMark('renjie')<8) player.addMark('renjie',Math.min(2,8-player.countMark('renjie')));
					        //var num=player.hasMark('renjie')?1:2;
					        player.addMark('renjie');
				        },
				    },
				},
			},
			pro_renjie1:{
				audio:'renjie2',
				trigger:{player:'damageEnd'},
				forced:true,
				group:'renjie2',
				notemp:true,
				//mark:true,
				filter:function(event){
					return event.num>0;
				},
				content:function(){
					//if(player.countMark('renjie')<8) player.addMark('renjie',Math.min(trigger.num,8-player.countMark('renjie')));
					player.addMark('renjie',trigger.num);
				},
				intro:{
					name2:'忍',
					content:'mark'
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					combo:'pro_baiyin',
					/*effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
							if(get.tag(card,'damage')){
								if(target.hp==target.maxHp){
									if(!target.hasSkill('jilue')){
										return [0,1];
									}
									return [0.7,1];
								}
								return 0.7;
							}
						},
						player:function(card,player){
							if(_status.currentPhase!=player) return;
							if(_status.event.name!='chooseToUse'||_status.event.player!=player) return;
							if(get.type(card)=='basic') return;
							if(get.tag(card,'gain')) return;
							if(get.value(card,player,'raw')>=7) return;
							if(player.hp<=2) return;
							if(!player.hasSkill('jilue')||player.storage.renjie==0){
								return 'zeroplayertarget';
							}
						}
					}*/
				}
			},
			pro_renjie2:{
				audio:'renjie2',
				trigger:{
					player:'loseAfter',
					global:'loseAsyncAfter',
				},
				forced:true,
				filter:function(event,player){
					if(event.card) return false;
					if(event.type!='discard'||event.getlx===false) return false;
					var evt=event.getParent('phaseUse'),evt2=event.getl(player);
					return evt&&evt2&&(!evt||evt.name!='phaseUse'||evt.player!=player)&&evt2.cards2&&evt2.cards2.length>0;
				},
				content:function(){
					//if(player.countMark('renjie')<8) player.addMark('renjie',Math.min(trigger.getl(player).cards2.length,8-player.countMark('renjie')));
					player.addMark('renjie',trigger.getl(player).cards2.length);
				}
			},
			renjie:{
				audio:'renjie2',
				trigger:{player:'damageEnd'},
				forced:true,
				group:'renjie2',
				notemp:true,
				//mark:true,
				filter:function(event){
					return event.num>0;
				},
				content:function(){
					player.addMark('renjie',trigger.num);
				},
				intro:{
					name2:'忍',
					content:'mark'
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					combo:'sbaiyin',
					/*effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
							if(get.tag(card,'damage')){
								if(target.hp==target.maxHp){
									if(!target.hasSkill('jilue')){
										return [0,1];
									}
									return [0.7,1];
								}
								return 0.7;
							}
						},
						player:function(card,player){
							if(_status.currentPhase!=player) return;
							if(_status.event.name!='chooseToUse'||_status.event.player!=player) return;
							if(get.type(card)=='basic') return;
							if(get.tag(card,'gain')) return;
							if(get.value(card,player,'raw')>=7) return;
							if(player.hp<=2) return;
							if(!player.hasSkill('jilue')||player.storage.renjie==0){
								return 'zeroplayertarget';
							}
						}
					}*/
				}
			},
			renjie2:{
				audio:2,
				trigger:{
					player:'loseAfter',
					global:'loseAsyncAfter',
				},
				forced:true,
				filter:function(event,player){
					if(event.type!='discard'||event.getlx===false) return false;
					var evt=event.getParent('phaseDiscard'),evt2=event.getl(player);
					return evt&&evt2&&evt.name=='phaseDiscard'&&evt.player==player&&evt2.cards2&&evt2.cards2.length>0;
				},
				content:function(){
					player.addMark('renjie',trigger.getl(player).cards2.length);
				}
			},
			pro_baiyin:{
				skillAnimation:'epic',
				animationColor:'thunder',
				juexingji:true,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				unique:true,
				audio:'sbaiyin',
				filter:function(event,player){
					return player.countMark('renjie')>=4;
				},
				content:function(){
					player.loseMaxHp();
					player.addSkillLog('pro_jilue');
					player.addSkillLog('rewansha');
					player.awakenSkill('pro_baiyin');
				},
				derivation:['pro_jilue','rewansha'],
			},
			sbaiyin:{
				skillAnimation:'epic',
				animationColor:'thunder',
				juexingji:true,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				unique:true,
				audio:2,
				filter:function(event,player){
					return player.countMark('renjie')>=4;
				},
				content:function(){
					player.loseMaxHp();
					player.addSkill('jilue');
					player.awakenSkill('sbaiyin');
				},
				derivation:'jilue',
			},
			pro_jilue:{
				unique:true,
				group:['pro_guicai','jilue_fangzhu','jilue_zhiheng','jilue_jizhi','jilue_jizhi_clear']
			},
			pro_guicai:{
				audio:'jilue_guicai',
				trigger:{global:'judge'},
				filter:function(event,player){
					return player.countCards('hes')>0&&player.hasMark('renjie');
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseCard('是否弃置一枚“忍”，并发动〖鬼才〗？','hes',function(card){
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
						if(mod!='unchanged') return mod;
						return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result;
						}
						else{
							return -result;
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						player.respond(result.cards,'highlight','pro_guicai','noOrdering');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.removeMark('renjie',1);
						player.$gain2(trigger.player.judging[0]);
						player.gain(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
					}
					"step 3"
					game.delay(2);
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1
					}
				}
			},
			jilue:{
				unique:true,
				group:['jilue_guicai','jilue_fangzhu','jilue_wansha','jilue_zhiheng','jilue_jizhi','jilue_jizhi_clear']
			},
			jilue_guicai:{
				audio:1,
				trigger:{global:'judge'},
				direct:true,
				filter:function(event,player){
					return player.countCards('hes')>0&&player.hasMark('renjie');
				},
				content:function(){
					"step 0"
					player.chooseCard('是否弃置一枚“忍”，并发动〖鬼才〗？','hes',function(card){
						var player=_status.event.player;
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
						if(mod!='unchanged') return mod;
						return true;
					}).ai=function(card){
						var trigger=_status.event.parent._trigger;
						var player=_status.event.player;
						var result=trigger.judge(card)-trigger.judge(trigger.player.judging[0]);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result-get.value(card)/2;
						}
						else{
							return -result-get.value(card)/2;
						}
					};
					"step 1"
					if(result.bool){
						player.respond(result.cards,'highlight','jilue_guicai','noOrdering');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.removeMark('renjie',1);
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.delete();
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1,
					}
				}
			},
			jilue_fangzhu:{
				audio:1,
				trigger:{player:'damageEnd'},
				direct:true,
				//priority:-1,
				filter:function(event,player){
					return player.hasMark('renjie');
				},
				content:function(){
					"step 0"
					player.chooseTarget('是否弃置一枚“忍”，并发动【放逐】？',function(card,player,target){
						return player!=target
					}).set('ai',target=>{
						if(target.hasSkillTag('noturn')) return 0;
						var player=_status.event.player;
						var current=_status.currentPhase;
						var dis=current?get.distance(current,target,'absolute'):1;
						var draw=player.getDamagedHp();
						var att=get.attitude(player,target);
						if(att<0&&target.isTurnedOver()) return -1;
						if(att==0) return target.hasJudge('lebu')?Math.random()/3:Math.sqrt(get.threaten(target))/5+Math.random()/2;
						if(att>0){
							if(target.isTurnedOver()) return att+draw;
							if(draw<4) return -1;
							if(current&&target.getSeatNum()>current.getSeatNum()) return att+draw/3;
							return 10*Math.sqrt(Math.max(0.01,get.threaten(target)))/(3.5-draw)+dis/(2*game.countPlayer());
						}
						else{
							if(target.isTurnedOver()) return -att-draw;
							if(draw>=5) return -1;
							if(current&&target.getSeatNum()<=current.getSeatNum()) return -att+draw/3;
							return (4.25-draw)*10*Math.sqrt(Math.max(0.01,get.threaten(target)))+2*game.countPlayer()/dis;
						}
					});
					"step 1"
					if(result.bool){
						player.removeMark('renjie',1);
						player.logSkill('jilue_fangzhu',result.targets);
						result.targets[0].draw(player.maxHp-player.hp);
						result.targets[0].turnOver();
					}
				},
			},
			jilue_wansha:{
				audio:'wansha',
				audioname:['shen_simayi'],
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasMark('renjie');
				},
				content:function(){
					player.removeMark('renjie',1);
					player.addTempSkill('rewansha');
				}
			},
			jilue_zhiheng:{
				audio:1,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasMark('renjie');
				},
				position:'he',
				filterCard:lib.filter.cardDiscardable,
				discard:false,
				lose:false,
				delay:false,
				selectCard:[1,Infinity],
				prompt:'弃置一枚“忍”，然后弃置任意张牌并摸等量的牌。若弃置了所有的手牌，则可以多摸一张牌。',
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='h'&&!player.countCards('h',function(card){
						return get.value(card)>=8;
					})){
						return 8-get.value(card);
					}
					return 6-get.value(card)
				},
				content:function(){
					'step 0'
					player.removeMark('renjie',1);
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
				ai:{
					order:1,
					result:{
						player:function(player){
							var num=0;
							var cards=player.getCards('he');
							for(var i=0;i<cards.length;i++){
								if(get.value(cards[i])<6){
									num++;
								}
							}
							if(cards.length>2) return 1;
							if(cards.length==2&&player.storage.jilue>1);
							return 0;
						}
					},
					threaten:1.5
				},
			},
			jilue_jizhi:{
				audio:1,
				trigger:{player:'useCard'},
				filter:function(event,player){
					return (get.type(event.card,'trick')=='trick'&&event.card.isCard&&player.hasMark('renjie'));
				},
				init:function(player){
					player.storage.jilue_jizhi=0;
				},
				content:function(){
					'step 0'
					player.removeMark('renjie',1);
					player.draw();
					'step 1'
					event.card=result[0];
					if(get.type(event.card)=='basic'){
						player.chooseBool('是否弃置'+get.translation(event.card)+'并令本回合手牌上限+1？').set('ai',function(evt,player){
							return _status.currentPhase==player&&player.needsToDiscard(-3)&&_status.event.value<6;
						}).set('value',get.value(event.card,player));
					}
					'step 2'
					if(result.bool){
						player.discard(event.card);
						player.storage.jilue_jizhi++;
						if(_status.currentPhase==player){
							player.markSkill('jilue_jizhi');
						}
					}
				},
				ai:{
					threaten:1.4
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.storage.jilue_jizhi;
					}
				},
				intro:{
					content:'本回合手牌上限+#',
				},
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.storage.jilue_jizhi=0;
							player.unmarkSkill('jilue_jizhi');
						}
					}
				}
			},
			pro_wushen:{
				group:['pro_wushen_sha','pro_wushen_damage'],
				mod:{
					cardname:function(card,player,name){
						if(get.suit(card)=='heart') return 'sha';
					},
					cardnature:function(card,player){
						if(get.suit(card)=='heart') return false;
					},
					targetInRange:function(card){
						if(get.suit(card)=='heart') return true;
					},
					cardUsable:function(card){
						if(card.name=='sha'&&get.suit(card)=='heart') return Infinity;
					}
				},
				audio:'wushen',
				
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&!event.getParent().directHit.contains(event.target)&&get.suit(event.card)=='heart';
				},
				//priority:-1,
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
					if(trigger.addCount!==false){
						trigger.addCount=false;
						if(player.stat[player.stat.length-1].card.sha>0){
							player.stat[player.stat.length-1].card.sha--;
						}
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(arg.card.name!='sha'||arg.target.countCards('h','shan')>1) return false;
						return arg.card.name=='sha'&&get.suit(arg.card)=='heart';
					},
				},
				/*trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&get.suit(event.card)=='heart';
				},
				content:function(){
					trigger.directHit.addArray(game.players);
					if(trigger.addCount!==false){
						trigger.addCount=false;
						if(player.stat[player.stat.length-1].card.sha>0){
							player.stat[player.stat.length-1].card.sha--;
						}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondSha')&&current<0) return 0.6
						}
					},
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return arg.card.name=='sha'&&get.suit(arg.card)=='heart';
					},
				},*/
				subSkill:{
				    damage:{
				        trigger:{source:'damageBegin1'},
				        filter:function(event){
				        	return event.card&&event.card.name=='sha'&&event.notLink();
				        },
				        usable:1,
				        forced:true,
				        content:function(){
			        		trigger.num++;
			        		if(trigger.card.storage) trigger.card.storage.pro_wushen=true;
				        },
				        ai:{
				        	damageBonus:true
				        }
				    },
				    sha:{
				        trigger:{
				            source:"damageSource",
				        },
				        filter:function(event,player){
				            return event.card&&event.card.name=='sha'&&event.notLink()&&event.num>0&&event.player!=player;
				        },
				        forced:true,
				        content:function(){
				            'step 0'
				            if(trigger.player.countCards('h',card=>{
						        return lib.filter.cardDiscardable(card,player,'pro_wushen');
						    })) trigger.player.discard(trigger.player.getCards('h',card=>{
						        return lib.filter.cardDiscardable(card,player,'pro_wushen');
						    }).randomGets(1));
						    'step 1'
				            trigger.player.addMark('new_wuhun_mark',trigger.num);
				            'step 2'
				            if(trigger.card.storage&&trigger.card.storage.pro_wushen) player.loseHp();
				        },
				    },
				},
			},
			wushen:{
				mod:{
					cardname:function(card,player,name){
						if(get.suit(card)=='heart') return 'sha';
					},
					cardnature:function(card,player){
						if(get.suit(card)=='heart') return false;
					},
					targetInRange:function(card){
						if(get.suit(card)=='heart') return true;
					},
					cardUsable:function(card){
						if(card.name=='sha'&&get.suit(card)=='heart') return Infinity;
					}
				},
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&get.suit(event.card)=='heart';
				},
				content:function(){
					trigger.directHit.addArray(game.players);
					if(trigger.addCount!==false){
						trigger.addCount=false;
						if(player.stat[player.stat.length-1].card.sha>0){
							player.stat[player.stat.length-1].card.sha--;
						}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondSha')&&current<0) return 0.6
						}
					},
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						return arg.card.name=='sha'&&get.suit(arg.card)=='heart';
					},
				}
			},
			wuhun:{
				trigger:{
					player:"damageEnd",
				},
				//alter:true,
				filter:function (event,player){
					if(event.source==undefined) return false;
					if(!get.is.altered('wuhun')) return false	
					return true;
				},
				forced:true,
				content:function (){
					if(!trigger.source.storage.wuhun_mark){
						trigger.source.storage.wuhun_mark=0;
					}				 
					trigger.source.storage.wuhun_mark+=trigger.num;
					trigger.source.syncStorage('wuhun_mark');
					trigger.source.markSkill('wuhun_mark');
				},
				global:["wuhun_mark"],
				subSkill:{
					mark:{
						marktext:"魇",
						intro:{
							content:"mark",
						},
						sub:true,
					},
				},
					group:["wuhun2","wuhun4","wuhun5"],
			},
			wuhun2:{
				trigger:{
				player:'dieBegin',
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].storage.wuhun_mark) return true;
					}
					return false;
				},
				content:function (){
					"step 0"
					player.chooseTarget(true,get.prompt('wuhun2'),function(card,player,target){
						if(player==target) return false;
						if(!target.storage.wuhun_mark) return false;
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].storage.wuhun_mark>target.storage.wuhun_mark){
								return false;
							}
						}
						return true;
					}).set('ai',function(target){
						return -ai.get.attitude(_status.event.player,target);
					});
					"step 1"
						player.line(result.targets[0],'fire');
						result.targets[0].addSkill('wuhun3')
				},
				ai:{
					threaten:0.5,
					effect:{
						target:function (card,player,target,current){
							if(get.tag(card,'damage')){
								if(player.hasSkill('jueqing')) return [1,-5];
								var hasfriend=false;
								for(var i=0;i<game.players.length;i++){
									if(game.players[i]!=target&&ai.get.attitude(game.players[i],target)>=0){
										hasfriend=true;break;
									}
								}
								if(!hasfriend) return;
								if(player.hp>2&&ai.get.attitude(player,target)<=0) return [0,2];
								return [1,0,0,-player.hp];
							}
						},
					},
				},
			},
			wuhun3:{
				audio:3,
				trigger:{
					global:'dieAfter',
				},
				forced:true,
				content:function (){
					"step 0"
					player.judge(function(card){
						if(card.name=='tao'||card.name=='taoyuan') return 2;
						return -2;
					})
					"step 1"
					if(result.judge==-2){
						player.die();
					}
					player.removeSkill('wuhun3');
				},
			},
			wuhun4:{
				trigger:{
					player:'dieAfter',
				},
				forced:true,
				popup:false,
				content:function (){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].storage.wuhun_mark){
							game.players[i].storage.wuhun_mark=0;
							game.players[i].unmarkSkill('wuhun_mark');
						}
					}
				},
			},
			wuhun5:{
				trigger:{player:'dieBegin'},
				forced:true,
				popup:false,
				filter:function(event){
					if(event.source!=player&&event.source!=undefined&&!get.is.altered('wuhun')) return true							 
					return false;
				},
				content:function(){
					trigger.source.addSkill('wuhun6');
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 0.5;
					},
					effect:{
						target:function(card,player,target,current){
							if(target.hp<=1&&get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-5];
								if(!target.hasFriend()) return;
								if(player.hp>2&&get.attitude(player,target)<=0) return [0,2];
								return [1,0,0,-player.hp];
							}
						}
					}
				}
			},
			wuhun6:{
				audio:3,
				trigger:{global:'dieAfter'},
				forced:true,
				content:function(){
					if(player.hp<Infinity){
						player.loseHp(player.hp);
					}
					player.removeSkill('wuhun6');
				}
			}, 
			guixin:{
				audio:2,
				// alter:true,
				trigger:{player:'damageEnd'},
				check:function(event,player){
					if(player.isTurnedOver()||event.num>1) return true;
					var num=game.countPlayer(function(current){
						if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
							return true;
						}
						if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
							return true;
						}
					});
					return num>=2;
				},
				content:function(){
					"step 0"
					var targets=game.filterPlayer();
					targets.remove(player);
					targets.sort(lib.sort.seat);
					event.targets=targets;
					event.count=trigger.num;
					"step 1"
					event.num=0;
					player.line(targets,'green');
					"step 2"
					if(num<event.targets.length){
						if(!get.is.altered('guixin')){
							if(event.targets[num].countGainableCards(player,'hej')){
								player.gainPlayerCard(event.targets[num],true,'hej');
							}
						}
						else{
							var hej=event.targets[num].getCards('hej')
							if(hej.length){
								var card=hej.randomGet();
								player.gain(card,event.targets[num]);
								if(get.position(card)=='h'){
									event.targets[num].$giveAuto(card,player);
								}
								else{
									event.targets[num].$give(card,player);
								}
							}
						}
						event.num++;
						event.redo();
					}
					"step 3"
					player.turnOver();
					"step 4"
					event.count--;
					if(event.count&&player.hasSkill('guixin')){
						player.chooseBool(get.prompt2('guixin'));
					}
					else{
						event.finish();
					}
					"step 5"
					if(event.count&&result.bool){
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					threaten:function(player,target){
						if(target.hp==1) return 2.5;
						return 1;
					},
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp==1) return 0.8;
								if(target.isTurnedOver()) return [0,3];
								var num=game.countPlayer(function(current){
									if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
										return true;
									}
									if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
										return true;
									}
								});
								if(num>2) return [0,1];
								if(num==2) return [0.5,1];
							}
						}
					}
				}
			},
			qixing:{
				audio:2,
				unique:true,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					"step 0"
					player.addToExpansion(get.cards(7),'draw').gaintag.add('qixing');
					"step 1"
					var cards=player.getExpansions('qixing');
					if(!cards.length||!player.countCards('h')){
						event.finish();
						return;
					}
					var next=player.chooseToMove('七星：是否交换“星”和手牌？');
					next.set('list',[
						[get.translation(player)+'（你）的星',cards],
						['手牌区',player.getCards('h')],
					]);
					next.set('filterMove',function(from,to){
						return typeof to!='number';
					});
					next.set('processAI',function(list){
						var player=_status.event.player,cards=list[0][1].concat(list[1][1]).sort(function(a,b){
							return get.useful(a)-get.useful(b);
						}),cards2=cards.splice(0,player.getExpansions('qixing').length);
						return [cards2,cards];
					});
					"step 2"
					if(result.bool){
						var pushs=result.moved[0],gains=result.moved[1];
						pushs.removeArray(player.getExpansions('qixing'));
						gains.removeArray(player.getCards('h'));
						if(!pushs.length||pushs.length!=gains.length) return;
						player.addToExpansion(pushs,player,'giveAuto').gaintag.add('qixing');
						//game.log(player,'将',pushs,'作为“星”置于武将牌上');
						player.gain(gains,'draw');
					}
				},
				intro:{
					markcount:'expansion',
					mark:function(dialog,content,player){
						var content=player.getExpansions('qixing');
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								dialog.addAuto(content);
							}
							else{
								return '共有'+get.cnNumber(content.length)+'张星';
							}
						}
					},
					content:function(content,player){
						var content=player.getExpansions('qixing');
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								return get.translation(content);
							}
							return '共有'+get.cnNumber(content.length)+'张星';
						}
					}
				},
				group:['qixing2'],
				ai:{combo:'dawu'},
			},
			qixing2:{
				trigger:{player:'phaseDrawAfter'},
				direct:true,
				filter:function(event,player){
					return player.getExpansions('qixing').length>0&&player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					var cards=player.getExpansions('qixing');
					if(!cards.length||!player.countCards('h')){
						event.finish();
						return;
					}
					var next=player.chooseToMove('七星：是否交换“星”和手牌？');
					next.set('list',[
						[get.translation(player)+'（你）的星',cards],
						['手牌区',player.getCards('h')],
					]);
					next.set('filterMove',function(from,to){
						return typeof to!='number';
					});
					next.set('processAI',function(list){
						var player=_status.event.player,cards=list[0][1].concat(list[1][1]).sort(function(a,b){
							return get.value(a)-get.value(b);
						}),cards2=cards.splice(0,player.getExpansions('qixing').length);
						return [cards2,cards];
					});
					"step 1"
					if(result.bool){
						var pushs=result.moved[0],gains=result.moved[1];
						pushs.removeArray(player.getExpansions('qixing'));
						gains.removeArray(player.getCards('h'));
						if(!pushs.length||pushs.length!=gains.length) return;
						player.logSkill('qixing2');
						player.addToExpansion(pushs,player,'giveAuto').gaintag.add('qixing');
						game.log(player,'将',pushs,'作为“星”置于武将牌上');
						player.gain(gains,'draw');
					}
				},
			},
			pro_dawu:{
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return player.getExpansions('qixing').length;
				},
				audio:'dawu',
				content:function(){
					"step 0"
					var num=Math.min(game.countPlayer(),Math.ceil(player.getExpansions('qixing').length*0.5));
					player.chooseTarget(get.prompt('pro_dawu'),'令至多'+get.cnNumber(num)+'名角色获得“大雾”标记',
					[1,num]).set('ai',function(target){
						if(target.isMin()) return 0;
						if(target.hasSkill('biantian2')) return 0;
						var att=get.attitude(player,target);
						if(att>=2){
							if(_status.event.allUse) return att;
							if(target.hp==1) return att;
							if(target.hp==2&&target.countCards('he')<=2) return att*0.7;
							return 0.1;
						}
						return -1;
					}).set('allUse',player.getExpansions('qixing').length>=game.countPlayer(function(current){
						return get.attitude(player,current)>2;
					})*2);
					"step 1"
					if(result.bool){
						player.logSkill('pro_dawu',result.targets,'thunder');
						var length=result.targets.length;
						for(var i=0;i<length;i++){
							result.targets[i].addSkill('dawu2');
						}
						//player.chooseCardButton('选择弃置'+get.cnNumber(length)+'张“星”',length,player.getExpansions('qixing'),true);
						player.addSkill('dawu3');
					}
					else{
						event.finish();
					}
					"step 2"
					//player.loseToDiscardpile(result.links);
				},
				ai:{combo:'qixing'},
			},
			dawu:{
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.getExpansions('qixing').length;
				},
				audio:2,
				content:function(){
					"step 0"
					var num=Math.min(game.countPlayer(),player.getExpansions('qixing').length);
					player.chooseTarget(get.prompt('dawu'),'令至多'+get.cnNumber(num)+'名角色获得“大雾”标记',
					[1,num]).set('ai',function(target){
						if(target.isMin()) return 0;
						if(target.hasSkill('biantian2')) return 0;
						var att=get.attitude(player,target);
						if(att>=4){
							if(_status.event.allUse) return att;
							if(target.hp==1) return att;
							if(target.hp==2&&target.countCards('he')<=2) return att*0.7;
							return 0;
						}
						return -1;
					}).set('allUse',player.getExpansions('qixing').length>=game.countPlayer(function(current){
						return get.attitude(player,current)>4;
					})*2);
					"step 1"
					if(result.bool){
						player.logSkill('dawu',result.targets,'thunder');
						var length=result.targets.length;
						for(var i=0;i<length;i++){
							result.targets[i].addSkill('dawu2');
						}
						player.chooseCardButton('选择弃置'+get.cnNumber(length)+'张“星”',length,player.getExpansions('qixing'),true);
						player.addSkill('dawu3');
					}
					else{
						event.finish();
					}
					"step 2"
					player.loseToDiscardpile(result.links);
				},
				ai:{combo:'qixing'},
			},
			dawu2:{
				trigger:{player:'damageBegin4'},
				filter:function(event){
					if(event.nature!='thunder') return true;
					return false;
				},
				mark:true,
				forced:true,
				charlotte:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					nodamage:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')&&!get.tag(card,'thunderDamage')) return [0,0];
						}
					},
				},
				intro:{
					markcount:()=>1,
					content:'共有1个标记',
				}
			},
			dawu3:{
				trigger:{player:['phaseBegin','dieBegin']},
				silent:true,
				charlotte:true,
				content:function(){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].hasSkill('dawu2')){
							game.players[i].removeSkill('dawu2');
						}
						if(game.players[i].hasSkill('kuangfeng2')){
							game.players[i].removeSkill('kuangfeng2');
						}
					}
					player.removeSkill('dawu3');
				}
			},
			pro_kuangfeng:{
				unique:true,
				audio:'kuangfeng',
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					return player.getExpansions('qixing').length;
				},
				content:function(){
					"step 0"
					player.chooseCardButton('选择获得一枚星',length,player.getExpansions('qixing'),true);
					"step 1"
					result.links.removeArray(player.getCards('h'));
					player.gain(result.links,'draw');
					"step 2"
					if(player.getHp()>=1) {
						player.chooseTarget([1,player.getHp()],get.prompt('pro_kuangfeng'),'令至多'+get.cnNumber(player.getHp())+'名角色随机弃置一张牌并获得“狂风”标记').ai=function(target){
							if(target.getCards('he',card=>{
							    return lib.filter.cardDiscardable(card,player,'pro_kuangfeng');
							})>0) return -get.attitude(player,target)*1.5;
							return -get.attitude(player,target);
						}
					}else {
						event.finish();
					}
					"step 3"
					if(result.bool){
						var length=result.targets.length;
						for(var i=0;i<length;i++){
							result.targets[i].addSkill('kuangfeng2');
							if(result.targets[i].countCards('he',card=>{
						        return lib.filter.cardDiscardable(card,player,'pro_kuangfeng');
						    })) result.targets[i].discard(result.targets[i].getCards('he',card=>{
						        return lib.filter.cardDiscardable(card,player,'pro_kuangfeng');
						    }).randomGets(1));
						}
						player.logSkill('pro_kuangfeng',result.targets,'fire');
						player.addSkill('dawu3');
					}
					else{
						event.finish();
					}
				},
				ai:{combo:'qixing'},
			},
			kuangfeng:{
				unique:true,
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.getExpansions('qixing').length;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('kuangfeng'),'令一名角色获得“狂风”标记').ai=function(target){
						return -1;
					}
					"step 1"
					if(result.bool){
						var length=result.targets.length;
						for(var i=0;i<length;i++){
							result.targets[i].addSkill('kuangfeng2');
						}
						player.logSkill('kuangfeng',result.targets,'fire');
						player.chooseCardButton('弃置'+get.cnNumber(length)+'枚星',length,player.getExpansions('qixing'),true);
						player.addSkill('dawu3');
					}
					else{
						event.finish();
					}
					"step 2"
					player.loseToDiscardpile(result.links);
				},
				ai:{combo:'qixing'},
			},
			kuangfeng2:{
				trigger:{player:'damageBegin3'},
				filter:function(event){
					if(event.nature=='fire') return true;
					return false;
				},
				mark:true,
				intro:{
					markcount:()=>1,
					content:'共有1个标记'
				},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'fireDamage')) return 1.5;
						}
					}
				}
			},
			pro_yeyan:{
				unique:true,
				forceDie:true,
				enable:'phaseUse',
				audio:'yeyan',
				animationColor:'metal',
				skillAnimation:'legend',
				filterTarget:function(card,player,target){
					var length=ui.selected.cards.length;
					return (length==0||length==4);
				},
				filterCard:function(card){
					var suit=get.suit(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.suit(ui.selected.cards[i])==suit) return false;
					}
					return true;
				},
				complexCard:true,
				limited:true,
				selectCard:[0,4],
				line:'fire',
				check:function (){return -1},
				selectTarget:function (){
					if(ui.selected.cards.length==4) return [1,2];
					if(ui.selected.cards.length==0) return [1,3];
					game.uncheck('target');
					return [1,3];
				},
				multitarget:true,
				multiline:true,
				content:function (){
					"step 0"
					player.awakenSkill('pro_yeyan');
					event.num=0;
					targets.sortBySeat();
					"step 1"
					if(cards.length==4) event.goto(2);
					else {
						if(event.num<targets.length){
						targets[event.num].damage('fire',1,'nocard');
						event.num++;
					}
					if(event.num==targets.length) event.finish();
					else event.redo();
					}
					"step 2"
					if(targets.length==1) event.goto(4);
					else{
						player.chooseTarget('请选择受到2点伤害的角色',true,function(card,player,target){
							return _status.event.targets.contains(target)
						}).set('ai',function(target){
							return 1;
						}).set('forceDie',true).set('targets',targets);
					}
					"step 3"
					if(event.num<targets.length){
						var dnum=1;
						if(result.bool&&result.targets&&targets[event.num]==result.targets[0]) dnum=2;
						targets[event.num].damage('fire',dnum,'nocard');
						event.num++;
					}
					if(event.num==targets.length) event.finish();
					else event.redo();
					"step 4"
					player.chooseControl("2点","3点").set('prompt','请选择伤害点数').set('ai',function(){
						return "3点";
					}).set('forceDie',true);
					"step 5"
					targets[0].damage('fire',result.control=="2点"?2:3,'nocard'); 
				},
				ai:{
					order:1,
					fireAttack:true,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nofire')) return 0;
							if(lib.config.mode=='versus') return -1;
							if(player.hasUnknown()) return 0;
							return get.damageEffect(target,player);
						}
					}
				}
			},
			yeyan:{
				unique:true,
				forceDie:true,
				enable:'phaseUse',
				audio:3,
				animationColor:'metal',
				skillAnimation:'legend',
				filterTarget:function(card,player,target){
					var length=ui.selected.cards.length;
					return (length==0||length==4);
				},
				filterCard:function(card){
					var suit=get.suit(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.suit(ui.selected.cards[i])==suit) return false;
					}
					return true;
				},
				complexCard:true,
				limited:true,
				selectCard:[0,4],
				line:'fire',
				check:function (){return -1},
				selectTarget:function (){
					if(ui.selected.cards.length==4) return [1,2];
					if(ui.selected.cards.length==0) return [1,3];
					game.uncheck('target');
					return [1,3];
				},
				multitarget:true,
				multiline:true,
				content:function (){
					"step 0"
					player.awakenSkill('yeyan');
					event.num=0;
					targets.sortBySeat();
					"step 1"
					if(cards.length==4) event.goto(2);
					else {
						if(event.num<targets.length){
						targets[event.num].damage('fire',1,'nocard');
						event.num++;
					}
					if(event.num==targets.length) event.finish();
					else event.redo();
					}
					"step 2"
					player.loseHp(3);
					if(targets.length==1) event.goto(4);
					else{
						player.chooseTarget('请选择受到2点伤害的角色',true,function(card,player,target){
							return _status.event.targets.contains(target)
						}).set('ai',function(target){
							return 1;
						}).set('forceDie',true).set('targets',targets);
					}
					"step 3"
					if(event.num<targets.length){
						var dnum=1;
						if(result.bool&&result.targets&&targets[event.num]==result.targets[0]) dnum=2;
						targets[event.num].damage('fire',dnum,'nocard');
						event.num++;
					}
					if(event.num==targets.length) event.finish();
					else event.redo();
					"step 4"
					player.chooseControl("2点","3点").set('prompt','请选择伤害点数').set('ai',function(){
						return "3点";
					}).set('forceDie',true);
					"step 5"
					targets[0].damage('fire',result.control=="2点"?2:3,'nocard'); 
				},
				ai:{
					order:1,
					fireAttack:true,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nofire')) return 0;
							if(lib.config.mode=='versus') return -1;
							if(player.hasUnknown()) return 0;
							return get.damageEffect(target,player);
						}
					}
				}
			},
			longhun:{
				audio:4,
				group:['longhun1','longhun2','longhun3','longhun4'],
				ai:{
					fireAttack:true,
					skillTagFilter:function(player,tag){
						switch(tag){
							case 'respondSha':{
								if(player.countCards('he',{suit:'diamond'})<Math.max(1,player.hp)) return false;
								break;
							}
							case 'respondShan':{
								if(player.countCards('he',{suit:'club'})<Math.max(1,player.hp)) return false;
								break;
							}
							case 'save':{
								if(player.countCards('he',{suit:'heart'})<Math.max(1,player.hp)) return false;
								break;
							}
							default:return true;break;
						}
					},
					maixie:true,
					respondSha:true,
					respondShan:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'recover')&&target.hp>=1) return [0,0];
							if(!target.hasFriend()) return;
							if((get.tag(card,'damage')==1||get.tag(card,'loseHp'))&&target.hp>1) return [0,1];
						}
					},
					threaten:function(player,target){
						if(target.hp==1) return 2;
						return 0.5;
					},
				}
			},
			longhun1:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张红桃牌当作桃使用';
				},
				position:'hes',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'tao'},
				viewAsFilter:function(player){
					return player.countCards('hes',{suit:'heart'})>=player.hp;
				},
				filterCard:function(card){
					return get.suit(card)=='heart';
				}
			},
			longhun2:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张方片当作火杀使用或打出';
				},
				position:'hes',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'sha',nature:'fire'},
				viewAsFilter:function(player){
					return player.countCards('hes',{suit:'diamond'})>=player.hp;
				},
				filterCard:function(card){
					return get.suit(card)=='diamond';
				}
			},
			longhun3:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张黑桃牌当作无懈可击使用';
				},
				position:'hes',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 7-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAs:{name:'wuxie'},
				viewAsFilter:function(player){
					return player.countCards('hes',{suit:'spade'})>=player.hp;
				},
				filterCard:function(card){
					return get.suit(card)=='spade';
				}
			},
			longhun4:{
				audio:true,
				enable:['chooseToUse','chooseToRespond'],
				prompt:function(){
					return '将'+get.cnNumber(Math.max(1,_status.event.player.hp))+'张梅花牌当作闪使用或打出';
				},
				position:'hes',
				check:function(card,event){
					if(_status.event.player.hp>1) return 0;
					return 10-get.value(card);
				},
				selectCard:function(){
					return Math.max(1,_status.event.player.hp);
				},
				viewAsFilter:function(player){
					return player.countCards('hes',{suit:'club'})>=player.hp;
				},
				viewAs:{name:'shan'},
				filterCard:function(card){
					return get.suit(card)=='club';
				}
			},
			juejing:{
				mod:{
					maxHandcard:function(player,num){
						return 2+num;
					}
				},
				audio:true,
				trigger:{player:'phaseDrawBegin2'},
				//priority:-5,
				filter:function(event,player){
					return !event.numFixed&&player.hp<player.maxHp;
				},
				forced:true,
				content:function(){
					trigger.num+=(player.getDamagedHp());
				}
			},
			relonghun:{
				audio:2,
				//技能发动时机
				enable:['chooseToUse','chooseToRespond'],
				//发动时提示的技能描述
				prompt:'将♦牌当做杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出',
				//动态的viewAs
				viewAs:function(cards,player){
					var name=false;
					var nature=null;
					//根据选择的卡牌的花色 判断要转化出的卡牌是闪还是火杀还是无懈还是桃
					switch(get.suit(cards[0],player)){
						case 'club':name='shan';break;
						case 'diamond':name='sha';nature='fire';break;
						case 'spade':name='wuxie';break;
						case 'heart':name='tao';break;
					}
					//返回判断结果
					if(name) return {name:name,nature:nature};
					return null;
				},
				//AI选牌思路
				check:function(card){
					if(ui.selected.cards.length) return 0;
					var player=_status.event.player;
					if(_status.event.type=='phase'){
						var max=0;
						var name2;
						var list=['sha','tao'];
						var map={sha:'diamond',tao:'heart'}
						for(var i=0;i<list.length;i++){
							var name=list[i];
							if(player.countCards('hes',function(card){
								return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
							})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
								var temp=get.order({name:name,nature:name=='sha'?'fire':null});
								if(temp>max){
									max=temp;
									name2=map[name];
								}
							}
						}
						if(name2==get.suit(card,player)) return (name2=='diamond'?(5-get.value(card)):20-get.value(card));
						return 0;
					}
					return 1;
				},
				//选牌数量
				selectCard:[1,2],
				//确保选择第一张牌后 重新检测第二张牌的合法性 避免选择两张花色不同的牌
				complexCard:true,
				//选牌范围：手牌区和装备区和木马
				position:'hes',
				//选牌合法性判断
				filterCard:function(card,player,event){
					//如果已经选了一张牌 那么第二张牌和第一张花色相同即可
					if(ui.selected.cards.length) return get.suit(card,player)==get.suit(ui.selected.cards[0],player);
					event=event||_status.event;
					//获取当前时机的卡牌选择限制
					var filter=event._backup.filterCard;
					//获取卡牌花色
					var name=get.suit(card,player);
					//如果这张牌是梅花并且当前时机能够使用/打出闪 那么这张牌可以选择
					if(name=='club'&&filter({name:'shan',cards:[card]},player,event)) return true;
					//如果这张牌是方片并且当前时机能够使用/打出火杀 那么这张牌可以选择
					if(name=='diamond'&&filter({name:'sha',cards:[card],nature:'fire'},player,event)) return true;
					//如果这张牌是黑桃并且当前时机能够使用/打出无懈 那么这张牌可以选择
					if(name=='spade'&&filter({name:'wuxie',cards:[card]},player,event)) return true;
					//如果这张牌是红桃并且当前时机能够使用/打出桃 那么这张牌可以选择
					if(name=='heart'&&filter({name:'tao',cards:[card]},player,event)) return true;
					//上述条件都不满足 那么就不能选择这张牌
					return false;
				},
				//判断当前时机能否发动技能
				filter:function(event,player){
					//获取当前时机的卡牌选择限制
					var filter=event.filterCard;
					//如果当前时机能够使用/打出火杀并且角色有方片 那么可以发动技能
					if(filter({name:'sha',nature:'fire'},player,event)&&player.countCards('hes',{suit:'diamond'})) return true;
					//如果当前时机能够使用/打出闪并且角色有梅花 那么可以发动技能
					if(filter({name:'shan'},player,event)&&player.countCards('hes',{suit:'club'})) return true;
					//如果当前时机能够使用/打出桃并且角色有红桃 那么可以发动技能
					if(filter({name:'tao'},player,event)&&player.countCards('hes',{suit:'heart'})) return true;
					//如果当前时机能够使用/打出无懈可击并且角色有黑桃 那么可以发动技能
					if(filter({name:'wuxie'},player,event)&&player.countCards('hes',{suit:'spade'})) return true;
					return false;
				},
				ai:{
					respondSha:true,
					respondShan:true,
					//让系统知道角色“有杀”“有闪”
					skillTagFilter:function(player,tag){
						var name;
						switch(tag){
							case 'respondSha':name='diamond';break;
							case 'respondShan':name='club';break;
							case 'save':name='heart';break;
						}
						if(!player.countCards('hes',{suit:name})) return false;
					},
					//AI牌序
					order:function(item,player){
						if(player&&_status.event.type=='phase'){
							var max=0;
							var list=['sha','tao'];
							var map={sha:'diamond',tao:'heart'}
							for(var i=0;i<list.length;i++){
								var name=list[i];
								if(player.countCards('hes',function(card){
									return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
								})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
									var temp=get.order({name:name,nature:name=='sha'?'fire':null});
									if(temp>max) max=temp;
								}
							}
							max/=1.1;
							return max;
						}
						return 2;
					},
				},
				//让系统知道玩家“有无懈”“有桃”
				hiddenCard:function(player,name){
					if(name=='wuxie'&&_status.connectMode&&player.countCards('hs')>0) return true;
					if(name=='wuxie') return player.countCards('hes',{suit:'spade'})>0;
					if(name=='tao') return player.countCards('hes',{suit:'heart'})>0;
				},
				group:['relonghun_num','relonghun_discard'],
				subSkill:{
					num:{
						trigger:{player:'useCard'},
						forced:true,
						popup:false,
						filter:window.getStrength(function(event){
							var evt=event;
							return ['sha','tao'].contains(evt.card.name)&&evt.skill=='relonghun'&&evt.cards&&evt.cards.length==2;
						},function(event){
							var evt=event;
							return evt.skill=='relonghun'&&evt.cards&&evt.cards.length==2;
						},'shen_zhaoyun'),
						content:window.getStrength(function(){
							trigger.baseDamage++;
						},function(){
							trigger.directHit.addArray(game.filterPlayer());
							if(['sha','tao'].contains(trigger.card.name)) trigger.baseDamage++;
						},'shen_zhaoyun'),
					},
					discard:{
						trigger:{player:['useCardAfter','respondAfter']},
						forced:true,
						popup:false,
						logTarget:function(){
							return _status.currentPhase;
						},
						autodelay:function(event){
							return event.name=='respond'?0.5:false;
						},
						filter:function(evt,player){
							return ['shan','wuxie'].contains(evt.card.name)&&evt.skill=='relonghun'&&
								evt.cards&&evt.cards.length==2&&_status.currentPhase&&_status.currentPhase!=player&&_status.currentPhase.countDiscardableCards(player,'he');
						},
						content:function(){
							//game.log(trigger.card)
							//game.log(trigger.cards)
							player.line(_status.currentPhase,'green');
							player.discardPlayerCard(_status.currentPhase,'he',true);
						}
					}
				}
			},
			xinlonghun:{
				audio:'longhun',
				enable:['chooseToUse','chooseToRespond'],
				prompt:'将♦牌当做杀，♥牌当做桃，♣牌当做闪，♠牌当做无懈可击使用或打出',
				viewAs:function(cards,player){
					var name=false;
					var nature=null;
					switch(get.suit(cards[0],player)){
						case 'club':name='shan';break;
						case 'diamond':name='sha';nature='fire';break;
						case 'spade':name='wuxie';break;
						case 'heart':name='tao';break;
					}
					if(name) return {name:name,nature:nature};
					return null;
				},
				check:function(card){
					var player=_status.event.player;
					if(_status.event.type=='phase'){
						var max=0;
						var name2;
						var list=['sha','tao'];
						var map={sha:'diamond',tao:'heart'}
						for(var i=0;i<list.length;i++){
							var name=list[i];
							if(player.countCards('hes',function(card){
								return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
							})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
								var temp=get.order({name:name,nature:name=='sha'?'fire':null});
								if(temp>max){
									max=temp;
									name2=map[name];
								}
							}
						}
						if(name2==get.suit(card,player)) return (name2=='diamond'?(5-get.value(card)):20-get.value(card));
						return 0;
					}
					return 1;
				},
				position:'hes',
				filterCard:function(card,player,event){
					event=event||_status.event;
					var filter=event._backup.filterCard;
					var name=get.suit(card,player);
					if(name=='club'&&filter({name:'shan',cards:[card]},player,event)) return true;
					if(name=='diamond'&&filter({name:'sha',cards:[card],nature:'fire'},player,event)) return true;
					if(name=='spade'&&filter({name:'wuxie',cards:[card]},player,event)) return true;
					if(name=='heart'&&filter({name:'tao',cards:[card]},player,event)) return true;
					return false;
				},
				filter:function(event,player){
					var filter=event.filterCard;
					if(filter({name:'sha',nature:'fire'},player,event)&&player.countCards('hes',{suit:'diamond'})) return true;
					if(filter({name:'shan'},player,event)&&player.countCards('hes',{suit:'club'})) return true;
					if(filter({name:'tao'},player,event)&&player.countCards('hes',{suit:'heart'})) return true;
					if(filter({name:'wuxie'},player,event)&&player.countCards('hes',{suit:'spade'})) return true;
					return false;
				},
				precontent:function(){
					delete event.result.skill;
					player.logSkill('longhun'+(4-lib.suit.indexOf(get.suit(event.result.cards[0],player))));
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag){
						var name;
						switch(tag){
							case 'respondSha':name='diamond';break;
							case 'respondShan':name='club';break;
							case 'save':name='heart';break;
						}
						if(!player.countCards('hes',{suit:name})) return false;
					},
					order:function(item,player){
						if(player&&_status.event.type=='phase'){
							var max=0;
							var list=['sha','tao'];
							var map={sha:'diamond',tao:'heart'}
							for(var i=0;i<list.length;i++){
								var name=list[i];
								if(player.countCards('hes',function(card){
									return (name!='sha'||get.value(card)<5)&&get.suit(card,player)==map[name];
								})>0&&player.getUseValue({name:name,nature:name=='sha'?'fire':null})>0){
									var temp=get.order({name:name,nature:name=='sha'?'fire':null});
									if(temp>max) max=temp;
								}
							}
							max/=1.1;
							return max;
						}
						return 2;
					},
				},
				hiddenCard:function(player,name){
					if(name=='wuxie'&&_status.connectMode&&player.countCards('hes')>0) return true;
					if(name=='wuxie') return player.countCards('hes',{suit:'spade'})>0;
					if(name=='tao') return player.countCards('hes',{suit:'heart'})>0;
				},
			},
			pro_juejing:{
				mod:{
					maxHandcard:function(player,num){
						return 2+num;
					},
					globalFrom:function(from,to,distance){
					    return distance-1;
					},
					/*cardUsable:function (card,player,num,storage){
                        if(card.name=='sha') return num+1;
                    },*/
				},
				audio:'xinjuejing',
				trigger:{player:['dying']},
				forced:true,
				content:function(){
					player.draw(2);
				},
				group:'pro_juejing_draw',
				subSkill:{
				    draw:{
				        audio:'xinjuejing',
				        trigger:{player:'phaseDrawBegin2'},
				        filter:function(event,player){
				        	return !event.numFixed&&(player.getDamagedHp()||player.countCards('h')<=2);
				        },
				        forced:true,
				        content:function(){
				        	trigger.num++;
				        }
				    },
				},
			},
			xinjuejing:{
				mod:{
					maxHandcard:function(player,num){
						return 2+num;
					}
				},
				audio:2,
				trigger:{player:['dying','dyingAfter']},
				forced:true,
				content:function(){
					player.draw();
				}
			},
			pro_shelie:{
				audio:'shelie',
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					"step 0"
					trigger.changeToZero();
					event.cards=get.cards(6);
					game.cardsGotoOrdering(event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str;
						if(player==game.me&&!_status.auto){
							str='涉猎：获取花色各不相同的牌';
						}
						else{
							str='涉猎';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,['涉猎',get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					"step 1"
					var list=[];
					for(var i of cards) list.add(get.suit(i,false));
					var next=player.chooseButton(list.length,true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link)) return false;
						}
						return true;
					});
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					"step 2"
					if(result.bool&&result.links){
						event.cards2=result.links;
					}
					else{
						event.finish();
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					"step 3"
					game.broadcastAll('closeDialog',event.videoId);
					var cards2=event.cards2;
					player.gain(cards2,'log','gain2');
				},
				ai:{
					threaten:1.2
				}
			},
			pro_gongxin:{
				audio:'gongxin',
				audioname:['re_lvmeng','gexuan'],
				group:'pro_gongxin_jingce',
				derivation:'new_zhixi',
				/*trigger:{
				    player:["phaseZhunbeiBegin"],
				},
				filter:function(event,player){
				    return true;
				},
				direct:true,
				content:function(){
				    "step 0";
				    player.chooseTarget(get.prompt2('releiji'),function(card,player,target){
				        return target!=player&&target.countCards('h');
				    }).ai=function(target){
				        if(get.attitude(player,target)>0) return -1;
				        return target.countCards('h');
				    };
					"step 1"
					if(result.bool){
					    player.logSkill('pro_gongxin',result.targets);
					    event.target=result.targets[0];
					    var cards=event.target.getCards('h');
					    player.chooseCardButton('可选择一张牌置于牌堆顶',1,cards).set('ai',function(card){
							if(player.countCards('j')==1) {
							    var suit=get.suit(card);
							    var num=get.number(card);
							    if(player.hasJudge('lebu')&&suit=='heart') return 10;
							    if(player.hasJudge('bingliang')&&suit=='club') return 10;
							    if(player.hasJudge('shandian')&&suit=='spade'&&num>=2&&num<=9) return -1;
							}
							return get.value(card);
						}).set('filterButton',function(button){
					    	return true;
					    });
					}else event.finish();
					"step 2"
					if(result.bool){
						var card=result.links.slice(0);
						player.showCards(card,get.translation(player)+'对'+get.translation(event.target)+'发动了【攻心】');
						event.target.lose(card,ui.cardPile,'visible','insert');
					}
				},
				ai:{
					threaten:1.2,
					result:{
						target:function(player,target){
							return -target.countCards('h');
						}
					},
					order:10,
					expose:0.4,
				},*/
    			mod:{
        			aiOrder:function(player, card, num) {
            			if (typeof card == 'object' && player.isPhaseUsing()) {
                			var suit=get.suit(card);
					        var list = [];
                            player.getHistory('useCard', function(evt) {
                                if (lib.suit.contains(get.suit(evt.card)) && !list.contains(get.suit(evt.card))) list.push(get.suit(evt.card));
                            });
                			if (!list.contains(suit)) {
                    			return num + 2;
                			}
            			}
        			},
    			},
				ai:{
					effect:{
					    player:function(card,player,target){
					        if(!player.isPhaseUsing()) return;
					        var suit=get.suit(card);
					        var list = [];
                            player.getHistory('useCard', function(evt) {
                                if (lib.suit.contains(get.suit(evt.card)) && !list.contains(get.suit(evt.card))) list.push(get.suit(evt.card));
                            });
					        if(!list.contains(suit)) return [1,1];
					    },
					},
					threaten:1.2
				},
				subSkill: {
            		epic:{
				        forced:true,
				        skillAnimation:true,
				        animationColor:"wood",
				        audio:'gongxin',
				    },
            		count: {
                		mark: true,
                		marktext: "攻心",
                		charlotte: true,
                		onremove: true,
                		intro: {
                		    content:function(storage,player,skill){
				                var list = [];
                   			    player.getHistory('useCard', function(evt) {
                        		    if (lib.suit.contains(get.suit(evt.card)) && !list.contains(get.suit(evt.card))) list.push(get.suit(evt.card));
                    		    });
                                if (list.length) {
                                    //var str = list.join('、');
                                    //return "本回合已使用过以下花色："+str;
                                    if(list.length>1) {
                                        return '最多可指定'+(list.length-1)+'名角色发动〖攻心〗';
                                    }else {
                                        return '不满足条件';
                                    }
                                    /*else {
                                        return '可额外进行一个回合';
                                    }*/
                                }else {
                                    return "尚未使用过带花色的牌";
                                }
                            },
                		},
            		},
            		jingce: {
                		audio: 'gongxin',
                		trigger: {
                    		player: ['phaseJieshuBegin', 'useCard1']
                		},
                		filter: function(event, player) {
                    		if(player != _status.currentPhase) return false;
                    		var list = [];
                   			player.getHistory('useCard', function(evt) {
                        		if (lib.suit.contains(get.suit(evt.card)) && !list.contains(get.suit(evt.card))) list.push(get.suit(evt.card));
                    		});
                    		if (list.length) {
                        		player.addTempSkill("pro_gongxin_count");
                        		var str = list.sortBySuit().join('');
                        		player.storage.pro_gongxin_count = '';
                        		player.addMark("pro_gongxin_count", str);
                    		}
                    		return event.name != 'useCard' && list.length > 1;
                		},
                		direct: true,
                		locked: false,
                		content: function() {
                    		'step 0'
                    		var list = [];
                    		player.getHistory('useCard', function(evt) {
                        		if (lib.suit.contains(get.suit(evt.card)) && !list.contains(get.suit(evt.card))) list.push(get.suit(evt.card));
                    		});
                    		if(list.length>1) {
                        		player.chooseTarget([1,list.length-1],get.prompt2('pro_gongxin'),function(card,player,target){
				            		return target!=player;
				        		}).ai=function(target){
				            		if(get.attitude(player,target)>0) return -1;
				            		return Math.max(0.5,target.countCards('h')-target.getHp()*1.5+5);
				            		//return target.countCards('h');
				        		};
                    		}
                    		'step 1'
                    		if(result.bool) {
                    		    event.targets=result.targets.sortBySeat();
                    		    player.logSkill('pro_gongxin',event.targets);
                    		}else event.finish();
                    		'step 2'
                    		if(!event.targets.length) event.finish();
                    		'step 3'
                    		event.target=event.targets.shift();
                    		var num=Math.ceil(event.target.getHp()*0.5);
                    		if(num>0) {
                        		event.toDis=num;
                        		event.target.chooseCard('h','交给'+get.translation(player)+'一张红桃手牌，否则获得〖止息〗',1/*[num,Infinity]*/,function(card){
    								return get.suit(card)=='heart';
    							}).set('ai',function(card){
    					    		//if(event.toDis>2&&event.target.countCards('h')<=6) return 0;
    					    		//if(ui.selected.cards.length>=event.toDis) return 0;
    					    		return 8-get.value(card);
    							});
							}else {
							    event.redo();
							}
							'step 4'
							if(result.bool){
								//event.target.$damagepop('弃牌','wood');
								/*game.log(event.target,'将',get.cnNumber(result.cards.length,true),'张牌置于了牌堆顶');
								event.target.lose(result.cards,ui.cardPile,'insert');
								event.target.$throw(result.cards.length,1000);*/
								event.target.give(result.cards,player);
							}else {
					    		event.target.addTempSkill('new_zhixi',{player:'phaseAfter'});
					    		event.target.logSkill('new_zhixi');
					    		//event.target.$damagepop('止息','wood');
					    		//game.log(event.target,'获得了技能','#g【'+get.translation('new_zhixi')+'】');
							}
							'step 5'
							game.delay();
							event.goto(2);
                		},
            		},
                },
			},
			shelie:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					"step 0"
					trigger.changeToZero();
					event.cards=get.cards(5);
					game.cardsGotoOrdering(event.cards);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str;
						if(player==game.me&&!_status.auto){
							str='涉猎：获取花色各不相同的牌';
						}
						else{
							str='涉猎';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,['涉猎',get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					"step 1"
					var list=[];
					for(var i of cards) list.add(get.suit(i,false));
					var next=player.chooseButton(list.length,true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(ui.selected.buttons[i].link)==get.suit(button.link)) return false;
						}
						return true;
					});
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					"step 2"
					if(result.bool&&result.links){
						event.cards2=result.links;
					}
					else{
						event.finish();
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					"step 3"
					game.broadcastAll('closeDialog',event.videoId);
					var cards2=event.cards2;
					player.gain(cards2,'log','gain2');
				},
				ai:{
					threaten:1.2
				}
			},
			gongxin:{
				audio:2,
				audioname:['re_lvmeng','gexuan'],
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h');
				},
				content:function(){
					'step 0'
					var cards=target.getCards('h');
					player.chooseButton(2,[
						'攻心',
						cards,
						[['弃置此牌','置于牌堆顶'],'tdnodes'],
					]).set('filterButton',function(button){
						var type=typeof button.link;
						if(ui.selected.buttons.length&&type==typeof ui.selected.buttons[0].link) return false;
						return type=='string'||get.suit(button.link)=='heart';
					});
					'step 1'
					if(result.bool){
						if(typeof result.links[0]!='string') result.links.reverse();
						var card=result.links[1],choice=result.links[0];
						if(choice=='弃置此牌') target.discard(card);
						else{
							player.showCards(card,get.translation(player)+'对'+get.translation(target)+'发动了【攻心】');
							target.lose(card,ui.cardPile,'visible','insert');
						}
					}
				},
				ai:{
					threaten:1.5,
					result:{
						target:function(player,target){
							return -target.countCards('h');
						}
					},
					order:10,
					expose:0.4,
				}
			},
			"pro_nzry_longnu":{
				mark:true,
				locked:true,
				zhuanhuanji:true,
				marktext:'☯',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.pro_nzry_longnu!=true) return '转换技，锁定技，出牌阶段开始时，你摸一张牌，若你的护甲不足2点，你获得1点护甲，然后你减1点体力上限，本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制无视目标防具';
						return '转换技，锁定技，出牌阶段开始时，你摸一张牌，若你的护甲不足2点，你获得1点护甲，然后你失去1点体力，本阶段内你的红色手牌均视为火【杀】且无距离限制不能被响应';
					},
				},
				audio:'nzry_longnu',
				trigger:{
					player:'phaseUseBegin'
				},
				forced:true,
				content:function(){
					'step 0'
					player.draw();
					if(player.hujia<2) player.changeHujia(1,null,true);
					'step 1'
					player.changeZhuanhuanji('pro_nzry_longnu');
					if(player.storage.pro_nzry_longnu!=true){
						player.loseMaxHp();
					}
					else{
						player.loseHp();
					}
					'step 2'
					if(player.storage.pro_nzry_longnu!=true){
						player.addTempSkill('pro_nzry_longnu_2','phaseUseAfter');
					}
					else{
						player.addTempSkill('pro_nzry_longnu_1','phaseUseAfter');
					};
				},
				subSkill:{
					'1':{
						trigger:{
						    player:"useCardToPlayered",
						},
						logTarget:"target",
						filter:function(event,player){
						    if(event.card.name!='sha') return false;
						    if(get.color(event.card)!='red') return false;
						    return true;
						},
						preHidden:true,
						forced:true,
						content:function(){
						    trigger.getParent().directHit.push(trigger.target);
						},
						mod:{
							cardname:function(card,player){
								if(get.color(card)=='red') return 'sha';
							},
							cardnature:function(card,player){
								if(get.color(card)=='red') return 'fire';
							},
							targetInRange:function(card){
								if(get.color(card)=='red') return true;
							},
						},
						ai:{
							"directHit_ai":true,
							skillTagFilter:function(player,tag,arg){
							    if(!arg.card||arg.card.name!='sha'||get.color(arg.card)!='red') return false;
							    return true;
							},
							effect:{
								target:function(card,player,target,current){
									if(get.attitude(player,target)<0&&card.name=='sha'&&get.color(card)=='red') return 1.5;
								}
							},
							respondSha:true,
						},
					},
					'2':{
						trigger:{
						    player:"useCardToPlayered",
						},
						logTarget:"target",
						filter:function(event,player){
						    if(event.card.name!='sha') return false;
						    if(!event.cards) return false;
						    if(get.type2(event.cards[0])!='trick') return false;
						    return true;
						},
						preHidden:true,
						forced:true,
						content:function(){
						    if(trigger.addCount!==false){
						        trigger.addCount=false;
						        if(player.stat[player.stat.length-1].card.sha>0){
						            player.stat[player.stat.length-1].card.sha--;
						        }
						    }
						    trigger.target.addTempSkill('pro_nzry_longnu_equip');
						    trigger.target.storage.pro_nzry_longnu_equip.add(trigger.card);
						},
						mod:{
							cardname:function(card,player){
								if(['trick','delay'].contains(lib.card[card.name].type)) return 'sha';
							},
							cardnature:function(card,player){
								if(['trick','delay'].contains(lib.card[card.name].type)) return 'thunder';
							},
							cardUsable:function(card,player){
								if(card.name=='sha'&&card.nature=='thunder') return Infinity;
							},
						},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.6
								}
							},
							respondSha:true,
						},
					},
					equip:{
						firstDo:true,
						ai:{
						    unequip2:true,
						},
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						onremove:true,
						trigger:{
							player:['damage','damageCancelled','damageZero'],
							target:['shaMiss','useCardToExcluded'],
						},
						charlotte:true,
						filter:function(event,player){
							return player.storage.pro_nzry_longnu_equip&&event.card&&player.storage.pro_nzry_longnu_equip.contains(event.card);
						},
						silent:true,
						forced:true,
						popup:false,
						priority:12,
						content:function(){
							player.storage.pro_nzry_longnu_equip.remove(trigger.card);
							if(!player.storage.pro_nzry_longnu_equip.length) player.removeSkill('pro_nzry_longnu_equip');
						},
					},
				},
				ai:{
					fireAttack:true,
					halfneg:true,
					threaten:1.05,
				},
			},
			"nzry_longnu":{
				mark:true,
				locked:true,
				zhuanhuanji:true,
				marktext:'☯',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.nzry_longnu!=true) return '锁定技，出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷杀且无使用次数限制';
						return '锁定技，出牌阶段开始时，你流失一点体力并摸一张牌，然后本阶段内你的红色手牌均视为火杀且无距离限制';
					},
				},
				audio:2,
				trigger:{
					player:'phaseUseBegin'
				},
				forced:true,
				content:function(){
					'step 0'
					player.changeZhuanhuanji('nzry_longnu');
					if(player.storage.nzry_longnu!=true){
						player.loseMaxHp();
					}
					else{
						player.loseHp();
					}
					player.draw();
					'step 1'
					if(player.storage.nzry_longnu!=true){
						player.addTempSkill('nzry_longnu_2','phaseUseAfter');
					}
					else{
						player.addTempSkill('nzry_longnu_1','phaseUseAfter');
					};
				},
				subSkill:{
					'1':{
						mod:{
							cardname:function(card,player){
								if(get.color(card)=='red') return 'sha';
							},
							cardnature:function(card,player){
								if(get.color(card)=='red') return 'fire';
							},
							targetInRange:function(card){
								if(get.color(card)=='red') return true;
							},
						},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.6
								}
							},
							respondSha:true,
						},
					},
					'2':{
						mod:{
							cardname:function(card,player){
								if(['trick','delay'].contains(lib.card[card.name].type)) return 'sha';
							},
							cardnature:function(card,player){
								if(['trick','delay'].contains(lib.card[card.name].type)) return 'thunder';
							},
							cardUsable:function(card,player){
								if(card.name=='sha'&&card.nature=='thunder') return Infinity;
							},
						},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.6
								}
							},
							respondSha:true,
						},
					},
				},
				ai:{
					fireAttack:true,
					halfneg:true,
					threaten:1.05,
				},
			},
			"pro_nzry_jieying":{
				audio:'nzry_jieying',
				locked:true,
				global:"pro_nzry_jieying_3",
				ai:{
					effect:{
						target:function(card){
							if(card.name=='tiesuo') return 'zeroplayertarget';
						},
					},
				},
				group:["pro_nzry_jieying_1","pro_nzry_jieying_2"],
				subSkill:{
					'1':{
						audio:'nzry_jieying_1',
						trigger:{
							player:['linkBefore','enterGame'],
							global:'phaseBefore',
						},
						forced:true,
						filter:function(event,player){
							if(event.name=='link') return player.isLinked();
							return (event.name!='phase'||game.phaseNumber==0)&&!player.isLinked();
						},
						content:function(){
							if(trigger.name!='link') player.link(true);
							else trigger.cancel();
						},	
					},
					'2':{
						audio:'nzry_jieying_2',
						trigger:{
							player:'phaseJieshuBegin',
						},
						direct:true,
						filter:function(event,player){
							return game.hasPlayer(function(current){
								return current!=player&&!current.isLinked();
							});
						},
						content:function(){
							"step 0"
							player.chooseTarget(true,'请选择【结营】的目标',function(card,player,target){
								return target!=player&&!target.isLinked();
							}).ai=function(target){
								return get.attitude(_status.event.player,target)/Math.sqrt(Math.min(1,target.hp+target.hujia));
								//return 1+Math.random();
							};
							"step 1"
							if(result.bool){
								player.line(result.targets);
								player.logSkill('pro_nzry_jieying');
								event.link = result.targets[0];
								event.link.link(true);
								event.link.chooseCard('he','是否交给'+get.translation(player)+'一张牌，并令其摸一张牌？').set('ai',function(card){
        							if(get.attitude(event.link, player) < 1) return -1;
        							return 8-get.value(card, event.link);
        						});
								//result.targets[0].changeHujia(1,null,true);
							}else{
								event.finish();
							};
							"step 2"
							if(result.bool&&result.cards&&result.cards.length) {
							    event.link.give(result.cards,player,'give');
							    player.draw();
							}
						},
					},
					'3':{
					    mod:{
							maxHandcard:function (player,num){
								if(game.countPlayer(function(current){return current.hasSkill('pro_nzry_jieying')})>0&&player.isLinked()) return num+2;
							},
						},
					},
				},
			},
			"nzry_jieying":{
				audio:2,
				locked:true,
				global:"g_nzry_jieying",
				ai:{
					effect:{
						target:function(card){
							if(card.name=='tiesuo') return 'zeroplayertarget';
						},
					},
				},
				group:["nzry_jieying_1","nzry_jieying_2"],
				subSkill:{
					'1':{
						audio:2,
						trigger:{
							player:['linkBefore','enterGame'],
							global:'phaseBefore',
						},
						forced:true,
						filter:function(event,player){
							if(event.name=='link') return player.isLinked();
							return (event.name!='phase'||game.phaseNumber==0)&&!player.isLinked();
						},
						content:function(){
							if(trigger.name!='link') player.link(true);
							else trigger.cancel();
						},	
					},
					'2':{
						audio:2,
						trigger:{
							player:'phaseJieshuBegin',
						},
						direct:true,
						filter:function(event,player){
							return game.hasPlayer(function(current){
								return current!=player&&!current.isLinked();
							});
						},
						content:function(){
							"step 0"
							player.chooseTarget(true,'请选择【结营】的目标',function(card,player,target){
								return target!=player&&!target.isLinked();
							}).ai=function(target){
								return 1+Math.random();
							};
							"step 1"
							if(result.bool){
								player.line(result.targets);
								player.logSkill('nzry_jieying');
								result.targets[0].link(true);
							}else{
								event.finish();
							};
						},
					},
				},
			},
			"g_nzry_jieying":{
				mod:{
					maxHandcard:function (player,num){
						if(game.countPlayer(function(current){return current.hasSkill('nzry_jieying')})>0&&player.isLinked()) return num+2;
					},
				},
			},
			"pro_nzry_junlve":{
				audio:'nzry_junlve',
				//marktext:"军",
				intro:{
					content:'当前有#个标记',
				},
				//mark:true,
				trigger:{
					player:"damageAfter",
					source:"damageSource",
					global:"linkAfter",
				},
				forced:true,
				filter:function(event,player){
				    if(event.name=='link') return event.player.isLinked();
				    return true;
				},
				content:function(){
					var num=1;
					if(event.triggername=='damageAfter') num=2;
					player.addMark('nzry_junlve',num);
				},
				mod:{
                    targetEnabled:function(card,player,target,now){
                        if(player.isLinked() && card.name=='sha') return false;
                    },
                },
                ai:{
                    effect:{
                        target:function(card){
                            if(card.name=='tiesuo') return 'zeroplayertarget';
                        },
                    },
                },
                group:"pro_nzry_junlve_link",
                subSkill:{
                    "link":{
                        audio:'nzry_junlve',
                        trigger:{
                            player:"linkBegin",
                        },
                        forced:true,
                        filter:function(event,player){
                            return !player.isLinked();
                        },
                        content:function(){
                            trigger.cancel();
                        },
                    },
                },
			},
			"nzry_junlve":{
				audio:2,
				//marktext:"军",
				intro:{
					content:'当前有#个标记',
				},
				//mark:true,
				trigger:{
					player:"damageAfter",
					source:"damageSource",
				},
				forced:true,
				content:function(){
					player.addMark('nzry_junlve',trigger.num);
				},
			},
			"nzry_cuike":{
				audio:2,
				trigger:{
					player:window.getStrength("phaseUseBegin","phaseZhunbeiBegin",'shen_luxun'),
				},
				direct:true,
				content:function(){
					'step 0'
					if(player.countMark('nzry_junlve')%2==1){
						player.chooseTarget('是否发动【摧克】，对一名角色造成一点伤害？').ai=function(target){
							return -get.attitude(player,target);
						};
					}
					else{
						player.chooseTarget('是否发动【摧克】，横置一名角色并弃置其区域内的一张牌？').ai=function(target){
							return -get.attitude(player,target);
						};
					}
					'step 1'
					if(result.bool){
						player.logSkill('nzry_cuike',result.targets);
						if(player.countMark('nzry_junlve')%2==1){
							result.targets[0].damage();
						}
						else{
							result.targets[0].link(true);
							player.discardPlayerCard(result.targets[0],1,'hej',true);
						};
					};
					'step 2'
					if(player.countMark('nzry_junlve')>7){
						player.chooseBool().set('ai',function(){
							return true;
						}).set('prompt','是否弃置所有“军略”标记并对所有其他角色造成一点伤害？');
					}else{
						event.finish();
					};
					'step 3'
					if(result.bool){
						var players=game.players.slice(0).sortBySeat();
						player.line(players);
						player.removeMark('nzry_junlve',player.countMark('nzry_junlve'));
						for(var i=0;i<players.length;i++){
							if(players[i]!=player) players[i].damage();
						};
					};
				},
			},
			"pro_nzry_dinghuo":{
				audio:'nzry_dinghuo',
				limited:true,
				init:function (player){
					player.storage.pro_nzry_dinghuo=false;
				},
				intro:{
					content:"limited",
				},
				unique:true,
				mark:true,
				skillAnimation:true,
				animationColor:'metal',
				enable:'phaseUse',
				filter:function (event,player){
					return !player.storage.pro_nzry_dinghuo&&player.countMark('nzry_junlve')>0;
				},
				check:function (event,player){
					var num=game.countPlayer(function(current){return get.attitude(player,current)<0&&current.isLinked()});
					return player.storage.nzry_junlve>=num&&num==game.countPlayer(function(current){return get.attitude(player,current)<0});
				},
				filterTarget:function(card,player,target){
					return target.isLinked();
				},
				selectTarget:function(){
					return [1,_status.event.player.countMark('nzry_junlve')];
				},
				multiline:true,
				multitarget:true,
				content:function (){
					'step 0'
					player.awakenSkill('pro_nzry_dinghuo');
					player.storage.pro_nzry_dinghuo=true;
					'step 1'
					player.removeMark('nzry_junlve',player.countMark('nzry_junlve'));
					for(var i=0;i<targets.length;i++){
						targets[i].discard(targets[i].getCards('e'));
					}
					player.chooseTarget(true,'对一名目标角色造成2点火焰伤害',function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('targets',targets).ai=function(target){
					    return get.damageEffect(player,target,player,'fire');
					};
					'step 2'
					if(result.bool){
						result.targets[0].damage('fire',2,'nocard');
					}
				},
				ai:{
					order:1,
					fireAttack:true,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nofire')) return 0;
							if(lib.config.mode=='versus') return -1;
							if(player.hasUnknown()) return 0;
							return get.damageEffect(target,player)-target.countCards('e');
						}
					}
				}
			},
			"nzry_dinghuo":{
				audio:2,
				limited:true,
				init:function (player){
					player.storage.nzry_dinghuo=false;
				},
				intro:{
					content:"limited",
				},
				unique:true,
				mark:true,
				skillAnimation:true,
				animationColor:'metal',
				enable:'phaseUse',
				filter:function (event,player){
					return !player.storage.nzry_dinghuo&&player.countMark('nzry_junlve')>0;
				},
				check:function (event,player){
					var num=game.countPlayer(function(current){return get.attitude(player,current)<0&&current.isLinked()});
					return player.storage.nzry_junlve>=num&&num==game.countPlayer(function(current){return get.attitude(player,current)<0});
				},
				filterTarget:function(card,player,target){
					return target.isLinked();
				},
				selectTarget:function(){
					return [1,_status.event.player.countMark('nzry_junlve')];
				},
				multiline:true,
				multitarget:true,
				content:function (){
					'step 0'
					player.awakenSkill('nzry_dinghuo');
					player.storage.nzry_dinghuo=true;
					'step 1'
					player.removeMark('nzry_junlve',player.countMark('nzry_junlve'));
					for(var i=0;i<targets.length;i++){
						targets[i].discard(targets[i].getCards('e'));
					}
					player.chooseTarget(true,'对一名目标角色造成1点火焰伤害',function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('targets',targets).ai=function(){return 1};
					'step 2'
					if(result.bool){
						result.targets[0].damage('fire','nocard');
					}
				},
				ai:{
					order:1,
					fireAttack:true,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nofire')) return 0;
							if(lib.config.mode=='versus') return -1;
							if(player.hasUnknown()) return 0;
							return get.damageEffect(target,player)-target.countCards('e');
						}
					}
				}
			},
			
			"pro_drlt_duorui":{
				audio:'drlt_duorui',
				init:function(player,skill){
					if(!player.storage.drlt_duorui) player.storage.drlt_duorui=[];
				},
				trigger:{
					source:'damageSource'
				},
				filter:function(event,player){
					//if(player.storage.drlt_duorui.length) return false;
					if(player.storage.pro_drlt_duorui&&player.storage.pro_drlt_duorui[event.player.playerid]) return false;
					return player!=event.player&&event.player.isIn()&&_status.currentPhase==player;
				},
				check:function(event,player){
					if(player.hasEnabledSlot()&&!player.hasEnabledSlot(5)) return false;
					return get.attitude(player,event.player)<-1;
				},
				bannedList:[
					'bifa','buqu','gzbuqu','songci','funan','xinfu_guhuo','reguhuo','huashen','rehuashen','old_guhuo','shouxi','xinpojun','taoluan','xintaoluan','yinbing','xinfu_yingshi','zhenwei','zhengnan','xinzhengnan','zhoufu',
				],
				content:function(){
					'step 0'
					var list=[];
					var listm=[];
					var listv=[];
					if(trigger.player.name1!=undefined) listm=lib.character[trigger.player.name1][3];
					else listm=lib.character[trigger.player.name][3];
					if(trigger.player.name2!=undefined) listv=lib.character[trigger.player.name2][3];
					listm=listm.concat(listv);
					var func=function(skill){
						var info=get.info(skill);
						if(!info||info.charlotte||info.hiddenSkill||info.zhuSkill||info.juexingji||info.forever||info.limited||info.dutySkill||(info.unique&&!info.gainable)||lib.skill.drlt_duorui.bannedList.contains(skill)) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					event.skills=list;
					if(player.hasEnabledSlot()&&!trigger.player.hasDisabledSlot()){
						/*player.chooseToDisable().ai=function(event,player,list){
							//if(list.contains('equip5')) return 'equip5';
							var first=[2,1,3,4,5];
							for(var i=0;i<first.length;i++) {
							    if(trigger.player.hasEnabledSlot('equip'+first[i])) return 'equip'+first[i];
							}
							return list.randomGet();
						};*/
						player.chooseToDisableTarget(trigger.player,function(e,player,target) {
						    return player.hasEnabledSlot(e);
						}).ai=function(event,player,list){
							//if(list.contains('equip5')) return 'equip5';
							var first=[2,1,3,4,5];
							for(var i=0;i<first.length;i++) {
							    if(trigger.player.hasEnabledSlot('equip'+first[i])) return 'equip'+first[i];
							}
							return list.randomGet();
						};
					}
					'step 1'
					if(result.control&&player.hasEnabledSlot()) {
					    //if(trigger.player.hasEnabledSlot(result.control)) trigger.player.disableEquip(result.control);
					    var list=[];
    					for(var i=1;i<=5;i++){
    						if(player.hasEnabledSlot(i)) list.push('equip'+i);
    					}
    					player.disableEquip(list.randomGet());
					}
					if(event.skills.length>0){
						player.chooseControl(event.skills).set('prompt','请选择要获得的技能').set('ai',function(){return event.skills.randomGet()});
					}
					else event.finish();
					'step 2'
					player.addTempSkill(result.control,{player:'dieAfter'});
					player.popup(result.control,'thunder');
					if(!player.storage.pro_drlt_duorui) {
					    player.storage.pro_drlt_duorui={}
					}
					player.storage.pro_drlt_duorui[trigger.player.playerid]={
					    target:trigger.player,
					    skills:result.control,
					};
					//player.storage.drlt_duorui=[result.control];
					//player.storage.drlt_duorui_player=trigger.player;
					trigger.player.storage.drlt_duorui=[result.control];
					trigger.player.addTempSkill('drlt_duorui1',{player:'dieAfter'});
					game.log(player,'获得了技能','#g【'+get.translation(result.control)+'】')
				},
				group:['pro_duorui_clear'],
			},
			"pro_duorui_clear":{
				trigger:{
				    player:['phaseBefore'],
				    global:['dieAfter'],
				},
				filter:function(event,player,name){
					//if(!player.storage.drlt_duorui_player||!player.storage.drlt_duorui) return false;
					if(!player.storage.pro_drlt_duorui) return false;
					return (player.storage.pro_drlt_duorui[event.player.playerid]||name=='phaseBefore');//&&player.storage.drlt_duorui.length;
				},
				silent:true,
				forced:true,
				popup:false,
				content:function(){
					var restore=function(playerid) {
					    if(!player.storage.pro_drlt_duorui[playerid]) return;
					    var target=player.storage.pro_drlt_duorui[playerid].target;
					    var skill=player.storage.pro_drlt_duorui[playerid].skills;
					    player.removeSkill(skill);
					    target.removeSkill('drlt_duorui1');
					    player.storage.pro_drlt_duorui[playerid]=undefined;
					}
					if(event.triggername=='phaseBefore') {
					    for(var id in player.storage.pro_drlt_duorui) {
					        restore(id);
					    }
					    player.storage.pro_drlt_duorui=false;
					}else {
					    restore(trigger.player.playerid);
					}
				},
			},
			"drlt_duorui":{
				audio:2,
				init:function(player,skill){
					if(!player.storage.drlt_duorui) player.storage.drlt_duorui=[];
				},
				trigger:{
					source:'damageSource'
				},
				filter:function(event,player){
					if(player.storage.drlt_duorui.length) return false;
					return player!=event.player&&event.player.isIn()&&_status.currentPhase==player;
				},
				check:function(event,player){
					if(player.hasEnabledSlot()&&!player.hasEnabledSlot(5)) return false;
					return true;
				},
				bannedList:[
					'bifa','buqu','gzbuqu','songci','funan','xinfu_guhuo','reguhuo','huashen','rehuashen','old_guhuo','shouxi','xinpojun','taoluan','xintaoluan','yinbing','xinfu_yingshi','zhenwei','zhengnan','xinzhengnan','zhoufu',
				],
				content:function(){
					'step 0'
					var list=[];
					var listm=[];
					var listv=[];
					if(trigger.player.name1!=undefined) listm=lib.character[trigger.player.name1][3];
					else listm=lib.character[trigger.player.name][3];
					if(trigger.player.name2!=undefined) listv=lib.character[trigger.player.name2][3];
					listm=listm.concat(listv);
					var func=function(skill){
						var info=get.info(skill);
						if(!info||info.charlotte||info.hiddenSkill||info.zhuSkill||info.juexingji||info.forever||info.limited||info.dutySkill||(info.unique&&!info.gainable)||lib.skill.drlt_duorui.bannedList.contains(skill)) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					event.skills=list;
					if(player.hasEnabledSlot()){
						player.chooseToDisable().ai=function(event,player,list){
							if(list.contains('equip5')) return 'equip5';
							return list.randomGet();
						};
					}
					'step 1'
					if(event.skills.length>0){
						player.chooseControl(event.skills).set('prompt','请选择要获得的技能').set('ai',function(){return event.skills.randomGet()});
					}
					else event.finish();
					'step 2'
					player.addTempSkill(result.control,{player:'dieAfter'});
					player.popup(result.control,'thunder');
					player.storage.drlt_duorui=[result.control];
					player.storage.drlt_duorui_player=trigger.player;
					trigger.player.storage.drlt_duorui=[result.control];
					trigger.player.addTempSkill('drlt_duorui1',{player:'phaseAfter'});
					game.log(player,'获得了技能','#g【'+get.translation(result.control)+'】')
				},
				group:['duorui_clear'],
			},
			"duorui_clear":{
				trigger:{global:['phaseAfter','dieAfter'],},
				filter:function(event,player){
					if(!player.storage.drlt_duorui_player||!player.storage.drlt_duorui) return false;
					return player.storage.drlt_duorui_player==event.player&&player.storage.drlt_duorui.length;
				},
				silent:true,
				forced:true,
				popup:false,
				content:function(){
					player.removeSkill(player.storage.drlt_duorui[0]);
					delete player.storage.drlt_duorui_player;
					player.storage.drlt_duorui=[];
				},
			},
			"drlt_duorui1":{
				init:function(player,skill){
					player.disableSkill(skill,player.storage.drlt_duorui);
				},
				onremove:function(player,skill){
					player.enableSkill(skill);
				},
				locked:true,
				mark:true,
				charlotte:true,
				intro:{
					content:function(storage,player,skill){
						var list=[];
						for(var i in player.disabledSkills){
							if(player.disabledSkills[i].contains(skill)) list.push(i);
						};
						if(list.length){
							var str='失效技能：';
							for(var i=0;i<list.length;i++){
								if(lib.translate[list[i]+'_info']) str+=get.translation(list[i])+'、';
							};
							return str.slice(0,str.length-1);
						};
					},
				},
			},
			"pro_drlt_zhiti":{
			    group:["drlt_zhiti_5"],
			    global:'g_drlt_zhiti',
			    audio:"drlt_zhiti",
			    locked:true,
				enable:'chooseToUse',
				prompt:function(){
					var player=_status.event.player;
					var str='将一张装备牌当做【决斗】使用';
					return str;
				},
				viewAs:{name:'juedou'},
				position:'hes',
				onremove:true,
				filterCard:function(card,player){
					return get.type(card)=="equip";
				},
				check:function(card){
					return 8-get.value(card);
				},
				mod:{
				    selectTarget:function(card,player,range){
				        if(card.name=='juedou'&&range[1]!=-1) range[1]++;
				    },
				},
				ai:{
					basic:{
						order:10
					}
				}
			},
			"pro_drlt_zhiti_sha":{
				audio:"drlt_zhiti",
				trigger:{player:'useCardToPlayered'},
				logTarget:'target',
				forced:true,
				filter:function(event,player){
					return player!=event.target&&event.card.name=='sha'&&event.target.isIn()&&player.inRange(event.target)&&event.target.getDamagedHp()>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					'step 0'
					var target=trigger.target;
					event.target=target;
					trigger.directHit.add(target);
				},
				shaRelated:true,
				ai:{
					ignoreSkill:true,
					skillTagFilter:function(player,tag,arg){
						if(tag=='directHit_ai'){
							return player.inRange(arg.target)&&arg.target.getDamagedHp()>0;
						}
						if(!arg||arg.isLink||!arg.card||arg.card.name!='sha') return false;
						if(!arg.target||get.attitude(player,arg.target)>=0) return false;
						if(!arg.skill||!lib.skill[arg.skill]||lib.skill[arg.skill].charlotte||get.is.locked(arg.skill)||!arg.target.getSkills(true,false).contains(arg.skill)) return false;
					},
					directHit_ai:true,
				},
			},
			drlt_zhiti:{
				audio:2,
				locked:true,
				group:["drlt_zhiti_1","drlt_zhiti_2","drlt_zhiti_3","drlt_zhiti_4","drlt_zhiti_5"],
				global:'g_drlt_zhiti',
				subSkill:{
					'1':{
						audio:"drlt_zhiti",
						trigger:{
							global:'juedouAfter'
						},
						forced:true,
						filter:function(event,player){
							return event.targets&&event.targets.contains(player)&&event.turn!=player&&player.hasDisabledSlot();
						},
						content:function(){
							player.chooseToEnable();
						},
					},
					'2':{
						audio:"drlt_zhiti",
						trigger:{
							player:'juedouAfter',
						},
						forced:true,
						filter:function(event,player){
							return event.turn!=player&&player.hasDisabledSlot();
						},
						content:function(){
							player.chooseToEnable();
						},
					},
					'3':{
						audio:"drlt_zhiti",
						trigger:{
							player:'chooseToCompareAfter'
						},
						forced:true,
						filter:function(event,player){
							return event.result.bool==true&&player.hasDisabledSlot();
						},
						content:function(){
							'step 0'
							player.chooseToEnable();
						},
					},
					'4':{
						audio:"drlt_zhiti",
						trigger:{
							global:'chooseToCompareAfter'
						},
						forced:true,
						filter:function(event,player){
							return (event.targets!=undefined&&event.targets.contains(player)||event.target==player)&&event.result.bool==false&&player.hasDisabledSlot();
						},
						content:function(){
							player.chooseToEnable();
						},
					},
					'5':{
						audio:"drlt_zhiti",
						trigger:{
							player:['damageEnd']
						},
						forced:true,
						filter:function(event,player){
							return player.hasDisabledSlot();
						},
						content:function(){
							player.chooseToEnable();
						},
					},
				},
			},
			g_drlt_zhiti:{
				mod:{
					maxHandcard:function (player,num){
						if(player.maxHp>player.hp&&game.countPlayer(function(current){
							return current!=player&&current.hasSkill('drlt_zhiti')&&current.inRange(player);
						})) return num-1;
					},
				},
			},
			'pro_drlt_poxi':{
				audio:'drlt_poxi',
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')>0;
					//return target!=player;
				},
				content:function(){
					'step 0'
					event.list1=[];
					event.list2=[];
					if(player.countCards('h')>0){
						var chooseButton=player.chooseButton([1,4],['你的手牌',player.getCards('h'),get.translation(target.name)+'的手牌',target.getCards('h')]);
					}
					else{
						var chooseButton=player.chooseButton([1,4],[get.translation(target.name)+'的手牌',target.getCards('h')]);
					}
					chooseButton.set('target',target);
					chooseButton.set('ai',function(button){
						var player=_status.event.player;
						var target=_status.event.target;
						var ps=[];
						var ts=[];
						for(var i=0;i<ui.selected.buttons.length;i++){
							var card=ui.selected.buttons[i].link;
							if(target.getCards('h').contains(card)) ts.push(card);
							else ps.push(card);
						}
						var card=button.link;
						var owner=get.owner(card);
						var val=get.value(card)||1;
						if(owner==target){
							if(ts.length>1) return 0;
							if(ts.length==0||player.hp>3) return val;
							return 2*val;
						}
						return 7-val;
					});
					chooseButton.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(button.link)==get.suit(ui.selected.buttons[i].link)) return false;
						};
						return true;
					});
					'step 1'
					if(result.bool){
						var list=result.links;
						for(var i=0;i<list.length;i++){
							if(get.owner(list[i])==player){
								event.list1.push(list[i]);
							}else{
								event.list2.push(list[i]);
							};
						};
						if(event.list1.length&&event.list2.length){
							game.loseAsync({
								lose_list:[
									[player,event.list1],
									[target,event.list2]
								],
								discarder:player,
							}).setContent('discardMultiple');
						}
						else if(event.list2.length){
							target.discard(event.list2);
						}
						else player.discard(event.list1);
					}else event.finish();
					'step 2'
					var num=event.list1.length+event.list2.length;
					if(num<=4){
						if(event.list1.length==0) player.loseMaxHp();
						if(event.list1.length==1) player.loseHp();
						if(event.list1.length==3) player.recover();
						if(event.list1.length==4) player.changeHujia(3,null,true);
					};
					if(event.list2.length){
					    var card=get.cardPile(function(card){
                            return get.name(card)=='sha';
                        });
                        if(!card){
                            event.finish();
                            return;
                        }
                        event.card=card;
                        player.gain(card,'gain2');
					}
				},
				ai:{
					order:13,
					result:{
						target:function(target,player){
							return -1;
						},
					},
				},
			},
			'drlt_poxi':{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
					//return target!=player;
				},
				content:function(){
					'step 0'
					event.list1=[];
					event.list2=[];
					if(player.countCards('h')>0){
						var chooseButton=player.chooseButton(4,['你的手牌',player.getCards('h'),get.translation(target.name)+'的手牌',target.getCards('h')]);
					}
					else{
						var chooseButton=player.chooseButton(4,[get.translation(target.name)+'的手牌',target.getCards('h')]);
					}
					chooseButton.set('target',target);
					chooseButton.set('ai',function(button){
						var player=_status.event.player;
						var target=_status.event.target;
						var ps=[];
						var ts=[];
						for(var i=0;i<ui.selected.buttons.length;i++){
							var card=ui.selected.buttons[i].link;
							if(target.getCards('h').contains(card)) ts.push(card);
							else ps.push(card);
						}
						var card=button.link;
						var owner=get.owner(card);
						var val=get.value(card)||1;
						if(owner==target){
							if(ts.length>1) return 0;
							if(ts.length==0||player.hp>3) return val;
							return 2*val;
						}
						return 7-val;
					});
					chooseButton.set('filterButton',function(button){
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(button.link)==get.suit(ui.selected.buttons[i].link)) return false;
						};
						return true;
					});
					'step 1'
					if(result.bool){
						var list=result.links;
						for(var i=0;i<list.length;i++){
							if(get.owner(list[i])==player){
								event.list1.push(list[i]);
							}else{
								event.list2.push(list[i]);
							};
						};
						if(event.list1.length&&event.list2.length){
							game.loseAsync({
								lose_list:[
									[player,event.list1],
									[target,event.list2]
								],
								discarder:player,
							}).setContent('discardMultiple');
						}
						else if(event.list2.length){
							target.discard(event.list2);
						}
						else player.discard(event.list1);
					};
					'step 2'
					if(event.list1.length+event.list2.length==4){
						if(event.list1.length==0) player.loseMaxHp();
						if(event.list1.length==1){
							var evt=_status.event;
							for(var i=0;i<10;i++){
								if(evt&&evt.getParent)evt=evt.getParent();
								if(evt.name=='phaseUse'){
								evt.skipped=true;
									break;
								};
							};
							player.addTempSkill('drlt_poxi1',{player:'phaseAfter'});
						};
						if(event.list1.length==3) player.recover();
						if(event.list1.length==4) player.draw(4);
					};
				},
				ai:{
					order:13,
					result:{
						target:function(target,player){
							return -1;
						},
					},
				},
			},
			'drlt_poxi1':{
				mod:{
					maxHandcard:function (player,num){
						return num-1;
					},
				},
			},
			drlt_jieying_mark:{
				marktext:"营",
				intro:{
					name:'营',
					content:'mark',
				},
				mod:{
					cardUsable:function (card,player,num){
						if(player.hasMark('drlt_jieying_mark')&&card.name=='sha') return num+game.countPlayer(function(current){
							return current.hasSkill('drlt_jieying');
						});
					},
					maxHandcard:function (player,num){
						if(player.hasMark('drlt_jieying_mark')) return num+game.countPlayer(function(current){
							return current.hasSkill('drlt_jieying');
						});
					},
				},
				audio:'drlt_jieying',
				trigger:{
					player:'phaseDrawBegin2'
				},
				forced:true,
				filter:function(event,player){
					return !event.numFixed&&player.hasMark('drlt_jieying_mark')&&game.hasPlayer(function(current){
						return current.hasSkill('drlt_jieying');
					});
				},
				content:function(){
					trigger.num+=game.countPlayer(function(current){
						return current.hasSkill('drlt_jieying');
					});
				},
				ai:{
					nokeep:true,
					skillTagFilter:function(player){
						if(!player.hasMark('drlt_jieying_mark')) return false;
					},
				},
			},
			'drlt_jieying':{
				audio:2,
				locked:false,
				global:'drlt_jieying_mark',
				group:["drlt_jieying_1","drlt_jieying_2","drlt_jieying_3"],
				subSkill:{
					'1':{
						audio:'drlt_jieying',
						trigger:{
							player:'phaseBegin'
						},
						forced:true,
						filter:function(event,player){
							return !game.hasPlayer(function(current){
								return current.hasMark('drlt_jieying_mark');
							});
						},
						content:function(){
							player.addMark('drlt_jieying_mark',1);
						},
					},
					'2':{
						audio:'drlt_jieying',
						trigger:{
							player:"phaseJieshuBegin",
						},
						direct:true,
						filter:function(event,player){
							return player.hasMark('drlt_jieying_mark');
						},
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('drlt_jieying'),"将“营”交给一名角色；其摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1且手牌上限+1。该角色回合结束后，其移去“营”标记，然后你获得其所有手牌。",function(card,player,target){
								return target!=player;
							}).ai=function(target){
								if(get.attitude(player,target)>0)
								return 0.1;
								if(get.attitude(player,target)<1&&(target.isTurnedOver()||target.countCards('h')<1))
								return 0.2;
									if(get.attitude(player,target)<1&&target.countCards('h')>0&&target.countCards('j',{name:'lebu'})>0)
								return target.countCards('h')*0.8+target.getHandcardLimit()*0.7+2;
								if(get.attitude(player,target)<1&&target.countCards('h')>0)
								return target.countCards('h')*0.8+target.getHandcardLimit()*0.7;
								return 1;
							};
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.line(target);
								player.logSkill('drlt_jieying',target);
								var mark=player.countMark('drlt_jieying_mark');
								player.removeMark('drlt_jieying_mark',mark);
								target.addMark('drlt_jieying_mark',mark);
							};
						},
					},
					'3':{
						audio:'drlt_jieying',
						trigger:{
							global:'phaseEnd',
						},
						forced:true,
						filter:function(event,player){
							return player!=event.player&&event.player.hasMark('drlt_jieying_mark')&&event.player.isIn();
						},
						logTarget:'player',
						content:function(){
							if(trigger.player.countCards('h')>0){
								trigger.player.give(trigger.player.getCards('h'),player);
							}
							trigger.player.removeMark('drlt_jieying_mark',trigger.player.countMark('drlt_jieying_mark'));
						},
					},
				},
			},
			pro_drlt_jieying_mark:{
				marktext:"营",
				intro:{
					name:'营',
					content:'mark',
				},
				mod:{
					cardUsable:function (card,player,num){
						if(player.hasMark('pro_drlt_jieying_mark')&&card.name=='sha') return num+game.countPlayer(function(current){
							return current.hasSkill('pro_drlt_jieying');
						});
					},
					maxHandcard:function (player,num){
						if(player.hasMark('pro_drlt_jieying_mark')) return num+game.countPlayer(function(current){
							return current.hasSkill('pro_drlt_jieying');
						});
					},
				},
				audio:'drlt_jieying',
				trigger:{
					player:'phaseDrawBegin2'
				},
				forced:true,
				filter:function(event,player){
					return !event.numFixed&&player.hasMark('pro_drlt_jieying_mark')&&game.hasPlayer(function(current){
						return current.hasSkill('pro_drlt_jieying');
					});
				},
				content:function(){
					trigger.num+=game.countPlayer(function(current){
						return current.hasSkill('pro_drlt_jieying');
					});
				},
				ai:{
					nokeep:true,
					skillTagFilter:function(player){
						if(!player.hasMark('pro_drlt_jieying_mark')) return false;
					},
				},
			},
			'pro_drlt_jieying':{
				audio:'drlt_jieying',
				locked:false,
				global:'pro_drlt_jieying_mark',
				group:["pro_drlt_jieying_1","pro_drlt_jieying_2","pro_drlt_jieying_3"],
				subSkill:{
					'1':{
						audio:'drlt_jieying',
						trigger:{
							player:'phaseBegin'
						},
						forced:true,
						filter:function(event,player){
							return !game.hasPlayer(function(current){
								return current.hasMark('pro_drlt_jieying_mark');
							});
						},
						content:function(){
							player.addMark('pro_drlt_jieying_mark',1);
						},
					},
					'2':{
						audio:'drlt_jieying',
						trigger:{
							player:"phaseJieshuBegin",
						},
						direct:true,
						filter:function(event,player){
							return player.hasMark('pro_drlt_jieying_mark');
						},
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('pro_drlt_jieying'),"将“营”交给一名角色；其摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1且手牌上限+1。该角色回合结束后，其移去“营”标记，然后你获得其所有手牌。",function(card,player,target){
								return target!=player;
							}).ai=function(target){
								if(get.attitude(player,target)>0)
								return 0.1;
								if(get.attitude(player,target)<1&&(target.isTurnedOver()||target.countCards('h')<1))
								return 0.2;
									if(get.attitude(player,target)<1&&target.countCards('h')>0&&target.countCards('j',{name:'lebu'})>0)
								return target.countCards('h')*0.8+target.getHandcardLimit()*0.7+2;
								if(get.attitude(player,target)<1&&target.countCards('h')>0)
								return target.countCards('h')*0.8+target.getHandcardLimit()*0.7;
								return 1;
							};
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.line(target);
								player.logSkill('pro_drlt_jieying',target);
								var mark=player.countMark('pro_drlt_jieying_mark');
								player.removeMark('pro_drlt_jieying_mark',mark);
								target.addMark('pro_drlt_jieying_mark',mark);
							};
						},
					},
					'3':{
						audio:'pro_drlt_jieying',
						trigger:{
							global:'phaseEnd',
						},
						forced:true,
						filter:function(event,player){
							return player!=event.player&&event.player.hasMark('pro_drlt_jieying_mark')&&event.player.isIn();
						},
						logTarget:'player',
						content:function(){
							'step 0'
							if(trigger.player.countCards('h')>0){
								event.gives=trigger.player.countCards('h');
								trigger.player.give(trigger.player.getCards('h'),player);
							}
							trigger.player.removeMark('pro_drlt_jieying_mark',trigger.player.countMark('pro_drlt_jieying_mark'));
							'step 1'
							if(event.gives&&event.gives>=2) {
							    trigger.player.draw();
							}
						},
					},
				},
			},
			//比原版更令人难以吐槽的神孙权
			junkyuheng:{
				audio:'yuheng',
				trigger:{player:'phaseBegin'},
				forced:true,
				keepSkill:true,
				filter:function(event,player){
					return player.hasCard(function(card){
						return lib.filter.cardDiscardable(card,player,'junkyuheng');
					},'he');
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('he',true,[1,4],function(card,player){
						if(!ui.selected.cards.length) return true;
						var suit=get.suit(card,player);
						for(var i of ui.selected.cards){
							if(get.suit(i,player)==suit) return false;
						}
						return true;
					}).set('complexCard',true).set('ai',function(card){
						if(!player.hasValueTarget(card)) return 5;
						return 5-get.value(card);
					});
					'step 1'
					if(result.bool){
						var skills=lib.skill.junkyuheng.derivation.randomGets(result.cards.length);
						player.addAdditionalSkill('junkyuheng',skills);
						game.log(player,'获得了以下技能：','#g'+get.translation(skills));
					}
				},
				group:'junkyuheng_remove',
				derivation:['olbingyi','shenxing','xiashu','old_anxu','rezhiheng','xinanguo','lanjiang','xinfu_guanwei','oldimeng','xindiaodu','xingxue','jiexun','olhongyuan','xinfu_youdi','bizheng'],
				subSkill:{
					remove:{
						audio:'yuheng',
						trigger:{player:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return player.additionalSkills.junkyuheng&&player.additionalSkills.junkyuheng.length>0;
						},
						content:function(){
							player.draw(player.additionalSkills.junkyuheng.length);
							game.log(player,'失去了以下技能：','#g'+get.translation(player.additionalSkills.junkyuheng));
							player.removeAdditionalSkill('junkyuheng');
						},
					},
				},
			},
			junkdili:{
				audio:'dili',
				trigger:{player:'logSkill'},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'wood',
				filter:function(event,player){
					if(event.skill!='junkyuheng') return false;
					var skills=player.getSkills(null,false,false).filter(function(i){
						var info=get.info(i);
						return info&&!info.charlotte;
					});
					return skills.length>player.maxHp;
				},
				content:function(){
					'step 0'
					player.awakenSkill('junkdili');
					player.loseMaxHp();
					'step 1'
					var skills=player.getSkills(null,false,false).filter(function(i){
						if(i=='junkdili') return false;
						var info=get.info(i);
						return info&&!info.charlotte;
					});
					var list=[];
					for(var skill of skills){
						list.push([
							skill,
							'<div class="popup text" style="width:calc(100% - 10px);display:inline-block"><div class="skill">【'+get.translation(skill)+'】</div><div>'+lib.translate[skill+'_info']+'</div></div>',
						])
					}
					var next=player.chooseButton([
						'请选择失去任意个技能',
						[list,'textbutton'],
					]);
					next.set('forced',true);
					next.set('selectButton',[1,skills.length]);
					next.set('ai',function(button){
						var skill=button.link,skills=_status.event.skills.slice(0);
						skills.removeArray(['xinanguo','lanjiang','rezhiheng','junkyuheng']);
						switch(ui.selected.buttons.length){
							case 0:
								if(skills.contains(skill)) return 2;
								if(skill=='junkyuheng') return 1;
								return Math.random();
							case 1:
								if(skills.length<2) return 0;
								if(skills.contains(skill)) return 2;
								if(skill=='junkyuheng') return 1;
								return 0
							case 2:
								if(skills.contains(skill)) return 2;
								if(skill=='junkyuheng') return 1;
								return 0;
							default: return 0;
						}
					});
					next.set('skills',skills)
					'step 2'
					if(result.bool){
						var skills=result.links;
						game.log(player,'失去了以下技能：','#g'+get.translation(skills));
						player.removeSkill(skills.slice(0));
					}
					var list=lib.skill.junkdili.derivation;
					for(var i=0;i<Math.min(skills.length,list.length);i++){
						player.addSkillLog(list[i]);
					}
				},
				derivation:['junkshengzhi','junkquandao','junkchigang'],
			},
			junkshengzhi:{
				audio:'dili_shengzhi',
				trigger:{player:['logSkill','useSkillAfter']},
				forced:true,
				filter:function(event,player){
					if(event.type!='player') return false;
					var skill=event.sourceSkill||event.skill;
					if(get.is.locked(skill)) return false;
					var info=get.info(skill);
					return !info.charlotte;
				},
				content:function(){
					player.addTempSkill('junkshengzhi_effect');
				},
				subSkill:{
					effect:{
						mod:{
							cardUsable:()=>Infinity,
							targetInRange:()=>true,
						},
						trigger:{player:'useCard1'},
						forced:true,
						charlotte:true,
						popup:false,
						firstDo:true,
						content:function(){
							if(trigger.addCount!==false){
								trigger.addCount=false;
								player.getStat().card[trigger.card.name]--;
							}
							player.removeSkill('junkshengzhi_effect');
						},
						mark:true,
						intro:{content:'使用下一张牌无距离和次数限制'},
					},
				},
			},
			junkquandao:{
				audio:'dili_quandao',
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'||get.type(event.card,null,false)=='trick';
				},
				content:function(){
					'step 0'
					var filter1=function(card){
						return get.name(card)=='sha';
					},filter2=function(card){
						return get.type(card)=='trick';
					};
					var num1=player.countCards('h',filter1),num2=player.countCards('h',filter2);
					if(num1!=num2){
						var delta=num1-num2;
						player.chooseToDiscard('h',true,Math.abs(delta),delta>0?filter1:filter2,'驭衡：请弃置'+get.cnNumber(Math.abs(delta))+'张'+(delta>0?'【杀】':'普通锦囊牌'));
					}
					'step 1'
					player.draw();
				},
			},
			junkchigang:{
				audio:'dili_chigang',
				trigger:{player:'phaseJudgeBefore'},
				forced:true,
				zhuanhuanji:true,
				mark:true,
				marktext:'☯',
				content:function(){
					player.changeZhuanhuanji('junkchigang');
					trigger.cancel();
					var next=player[player.storage.junkchigang?'phaseDraw':'phaseUse']();
					event.next.remove(next);
					trigger.getParent().next.push(next);
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.type(card)=='delay') return 'zerotarget';
						},
					},
				},
				intro:{
					content:function(storage){
						return '转换技，锁定技。判定阶段开始前，你取消此阶段。然后你获得一个额外的'+(storage?'出牌阶段':'摸牌阶段')+'。'
					},
				},
			},
			luansuo: {
        		audio: 2,
        		locked: true,
        		silent: true,
        		trigger: {
        			player: "phaseBegin",
        		},
        		content: function() {
        			for (const i of game.players) {
        				i.addTempSkill("luansuo_debuff"/*, { global: ["phaseBeginStart", "phaseAfter"] }*/);
        			}
        		},
        		subSkill: {
        			debuff: {
        				charlotte:true,
        				mod: {
        					cardname(card, player) {
        						const suits = _status.discarded.map(item => get.suit(item));
        						if (!suits.includes(get.suit(card))) return "tiesuo";
        					},
        					cardDiscardable(card, player) {
        						if (get.position(card) == "h") return false;
        					},
        					canBeDiscarded(card, player) {
        						if (get.position(card) == "h") return false;
        					},
        					aiOrder(player, card, num) {
        						if (num > 0 && get.name(card, player) == "huogong") return 0;
        					},
        					aiValue(player, card, num) {
        						if (num > 0 && get.name(card, player) == "huogong") return 0.01;
        					},
        					aiUseful(player, card, num) {
        						if (num > 0 && get.name(card, player) == "huogong") return 0;
        					},
        				},
        			},
        		},
        	},
			fengliao: {
			    audio: 2,
				zhuanhuanji: true,
				forced:true,
				mark:true,
				marktext: "☯",
				init: function (player, skill) {
					player.storage[skill] = false;
				},
				intro: {
					content: function (storage, player, skill) {
						if (!Boolean(player.storage[skill])) {
							return "你使用牌指定唯一目标后，你令其摸一张牌。";
						}
						return "你使用牌指定唯一目标后，你对其造成1点火焰伤害。";
					},
				},
				trigger: {
					player: "useCardToPlayered",
				},
				filter: function(event, player) {
					return event.targets.length == 1;
				},
            	content: function() {
                	player.changeZhuanhuanji("fengliao");
                	if (player.storage["fengliao"]==true) {
                		trigger.target.draw();
                	} else {
                		trigger.target.damage("fire", player);
                	}
				},
				ai:{
                    effect:{
                        player:function(card,player,target){
                            if (!get.info(card)||Math.abs(get.info(card).selectTarget)!=1) return;
                            if (player.storage["fengliao"]!=true) {
                        		return [1,0,1,1];
                        	} else {
                        		return [1,0,1,get.damageEffect(target,player,target,'fire')];
                        	}
                        },
                    },
                },
			},
			kunyu: {
			    audio: 2,
				trigger: {
					player: "dieBegin",
				},
				filter: function(event,player) {
					if(!event.getParent().name=='dying'||!event.player.isIn()) return false;
					const card = get.cardPile(function(c){
						return get.tag(c, 'fireDamage');
					}, "cardPile");
					return Boolean(card);
				},
			    group:'kunyu_maxhp',
				forced:true,
				content: function() {
				    'step 0'
					const card = get.cardPile(function(c){
						return get.tag(c, 'fireDamage');
					}, "cardPile");
					game.cardsGotoSpecial(card);
					game.log(player, "将", card, "移出游戏");
					'step 1'
					trigger.cancel();
					'step 2'
					if(player.hp<1){
						player.recover(1-player.hp);
					}
				},
				subSkill:{
				    maxhp:{
                        trigger:{
                            global:"phaseBefore",
                            player:["enterGame","loseMaxHpBefore","gainMaxHpBefore"],
                        },
                        lastDo:true,
                        forced:true,
                        filter:function(event,player){
                            if(event.name&&['loseMaxHp','gainMaxHp'].contains(event.name)) {
                                return true;
                            }
                            return (event.name!='phase'||game.phaseNumber==0);
                        },
                        content:function (){
                            'step 0'
                            if(player.maxHp!=1) {
                                player.maxHp=1;
                                player.update();
                            }
                            if(trigger.name&&['loseMaxHp','gainMaxHp'].contains(trigger.name)) {
                                trigger.cancel();
                            }
                        },
				    },
				},
			},
			//神钟会 —— by 刘巴
        	dclinjie: {
        		group: "dclinjie_effect",
        		marktext: "凛",
        		intro: {
        			name: "凛界（凛）",
        			name2: "凛",
        			content: "mark",
        		},
        		audio: 2,
        		trigger: {
        			global: "roundStart",
        		},
        		filter(event, player) {
        			return game.hasPlayer(target => !target.hasMark("dclinjie"));
        		},
        		direct: true,
        		content() {
        			'step 0'
        			player.chooseTarget(`###${get.prompt('dclinjie')}###对一名没有「凛」的角色造成一点伤害然后令其获得一个「凛」标记`, (card, player, target) => !target.hasMark("dclinjie"))
        				.set("ai", target => {
        					return get.damageEffect(target, get.player(), get.player());
        				});
    				'step 1'
    				if(result.bool && result.targets?.length) {
            			player.logSkill('dclinjie', result.targets);
            			event.target = result.targets[0];
            			event.target.damage();
        			}else {
        			    event.finish();
        			}
        			'step 2'
        			event.target.addMark(event.name, 1);
        		},
        		subSkill: {
        			effect: {
        				audio: "dclinjie",
        				trigger: {
        					global: "damageEnd",
        				},
        				forced: true,
        				locked: false,
        				filter(event, player) {
        					const target = event.player;
        					return target !== player && target.hasMark("dclinjie") && target.countDiscardableCards(target, "h");
        				},
        				logTarget: "player",
        				content() {
        					'step 0'
        					event.target = trigger.player;
        					let hs = event.target.getDiscardableCards(target, "h");
        					if (hs.length) {
        						event.damage = event.target.countCards("h") == 1;
        						event.target.discard(hs.randomGet());
    						}else {
    						    event.finish();
    						}
    						'step 1'
    						if (event.damage) {
    							event.target.damage();
    						}else {
    						    event.finish();
    						}
    						'step 2'
							event.target.clearMark("dclinjie");
        				},
        			},
        		},
        	},
        	dcduzhang: {
        		audio: 2,
        		usable: 1,
        		mod: {
        			maxHandcard(player, num) {
        				return (num += player.countMark("dclinjie"));
        			},
        		},
        		trigger: {
        			player: "useCardToPlayered",
        			target: "useCardToTargeted",
        		},
        		filter(event, player) {
        			if (get.color(event.card) !== "black") {
        				return false;
        			}
        			return (player === event.player || event.targets.includes(player)) && event.targets.length === 1;
        		},
        		locked: false,
        		frequent: true,
        		content() {
        			player.draw();
        			player.addMark("dclinjie", 1);
        		},
        	},
        	dcjianghuo: {
        		derivation: ["dclishi"],
        		skillAnimation: true,
        		animationColor: "fire",
        		audio: 2,
        		juexingji: true,
        		forced: true,
        		trigger: { player: "phaseBegin" },
        		filter(event, player) {
        			return !game.hasPlayer(current => !current.hasAllHistory("damage", evt => evt.num));
        		},
        		content() {
        			'step 0'
        			player.awakenSkill(event.name);
					game.playAnimation('extension/标记补充/animation/shenzhonghui.mp4');
        			const num = game
        				.filterPlayer(target => target !== player && target.hasMark("dclinjie"))
        				.map(target => target.countMark("dclinjie"))
        				.reduce((sum, cur) => sum + cur, 0);
        			game.filterPlayer(target => target !== player).forEach(target => target.clearMark("dclinjie"));
        			if (num > 0) {
        				player.addMark("dclinjie", num);
        			}
        			player.draw(player.countMark("dclinjie"));
        			'step 1'
        			player.gainMaxHp();
        			'step 2'
        			player.removeSkill("dclinjie");
        			'step 3'
        			player.addSkill("dclishi");
        			'step 4'
        			player.markSkill("dclinjie");
        		},
        	},
        	dclishi: {
        		audio: 2,
        		locked: true,
        		trigger: {
        			player: "phaseJieshuBegin",
        		},
        		direct: true,
        		content() {
        			'step 0'
        			if (!player.hasMark("dclinjie")) {
        				event._result = {
        					bool: true,
        					links: "damage",
        				};
        			} else {
        				const num = player.countMark("dclinjie");
        				player.chooseButton([
        						"立世：你需移除任意「凛」标记然后执行等量个选项",
        						[
        							[
        								["fengyin", "令所有其他角色于下个准备和结束阶段期间非锁定技失效"],
        								["judge", "令所有其他角色于下个判定阶段开始时在【闪电】.【乐不思蜀】和【兵粮寸断】中选择两个个并依次进行判定。"],
        								["discard", "令所有其他角色于下个摸牌阶段期间内摸到的牌若颜色相同，则全部弃置。"],
        								["use", "令所有其他角色于下个出牌阶段每种类型的牌仅能使用一张"],
        								["gain", "令所有其他角色于下个弃牌阶段期间内弃置牌后你获得之"],
        							],
        							"textbutton",
        						],
        					])
        					.set("ai", button => {
        						const player = get.player();
        						if (button.link === "fengyin") {
        							return 1.5;
        						} else if (button.link === "judge") {
        							return 1;
        						} else if (button.link === "discard") {
        							return 3;
        						} else if (button.link === "use") {
        							return 4;
        						} else if (button.link === "gain") {
        							return 8;
        						}
        					})
        					.set("forced", true)
        					.set("selectButton", [1, num]);
        			}
        			'step 1'
        			if(result.bool && result.links) {
        			    player.logSkill(event.name);
        			}else {
        			    event.finish();
        			}
        			'step 2'
        			event.choices = result.links;
        			if (event.choices === "damage") {
        				player.damage("thunder");
        				event.finish();
        			}
        			'step 3'
        			player.removeMark("dclinjie", event.choices.length);
        			const targets = game.filterPlayer(target => target != player);
        			player.line(targets);
        			if (event.choices.includes("fengyin")) {
        				game.log(player, "选择了", "#y准备阶段、结束阶段", "的效果");
        				for (const target of targets) {
        					target.addWhen({
        					    trigger: { 
        					        player: "phaseJieshuBefore", 
    					        },
    					        content: function() {
    					            player.addTempSkill("fengyin", ["phaseJieshuAfter", "phaseBefore", "phaseChange", "phaseAfter"]);
					            },
				            });
				            target.addWhen({
        					    trigger: { 
        					        player: "phaseZhunbeiBefore", 
    					        },
    					        content: function() {
    					            player.addTempSkill("fengyin", ["phaseZhunbeiAfter", "phaseBefore", "phaseChange", "phaseAfter"]);
					            },
				            });
        				}
        			}
        			if (event.choices.includes("judge")) {
        				game.log(player, "选择了", "#y判定阶段", "的效果");
        				for (const target of targets) {
        				    target.addWhen({
        					    trigger: { 
        					        player: "phaseJudgeBegin", 
    					        },
    					        content: function() {
    					            'STEP 0'
    					            player.chooseVCardButton(["lebu", "bingliang", "shandian"], "立世：请选择两个延时锦囊并依次进行判定", 2, true)
            							.set("ai", button => {
            								const player = get.player();
            								return get.info({ name: button.link[2] }).ai.result.target(player, player);
            							});
        							'STEP 1'
            						if (result.bool && result?.links.length) {
            							event.links = result.links;
            							event.num = 0;
        							}else {
        							    event.finish();
        							}
        							'STEP 2'
        							player.executeDelayCardEffect(event.links[event.num][2]);
        							'STEP 3'
        							event.num++;
        							if(event.num < event.links.length) {
        							    event.goto(2);
        							}
					            },
				            });
        				}
        			}
        			if (event.choices.includes("discard")) {
        				game.log(player, "选择了", "#y摸牌阶段", "的效果");
        				for (const target of targets) {
        					target.addTempSkill("dclishi_discard", { player: "phaseDrawAfter" });
        					//target.when({ player: "phaseDrawBegin" }).then(() => trigger.set("dclishi", player.playerid));
        				}
        			}
        			if (event.choices.includes("use")) {
        				game.log(player, "选择了", "#y出牌阶段", "的效果");
        				for (const target of targets) {
        					target.addTempSkill("dclishi_limit", { player: "phaseUseAfter" });
        					//target.when({ player: "phaseUseBegin" }).then(() => player.addTempSkill("dclishi_limit", ["phaseBefore", "phaseChange", "phaseAfter"]));
        				}
        			}
        			if (event.choices.includes("gain")) {
        				game.log(player, "选择了", "#y弃牌阶段", "的效果");
        				for (const target of targets) {
        					target.addTempSkill("dclishi_gain", { player: "phaseDiscardAfter" });
        					target.markAuto("dclishi_gain", player);
        					//target.when({ player: "phaseDiscardBegin" }).then(() => trigger.set("dclishi", player.playerid));
        				}
        			}
        		},
        		subSkill: {
        			gain: {
        				trigger: {
        					player: ["loseAfter"],
        					global: ["loseAsyncAfter"],
        				},
        				charlotte: true,
        				forced: true,
        				popup: false,
        				onremove: true,
        				filter(event, player) {
        					if (event.type !== "discard") {
        						return false;
        					}
        					const evt = event.getParent("phaseDiscard");
        					const evt2 = event.getl(player);
        					return evt?.name === "phaseDiscard" && evt?.player === player && evt2?.cards2?.filterInD("d");
        				},
        				content() {
        					const gainer = player
        						.getStorage(event.name)
        						.sortBySeat()
        						.find(target => target.isIn());
        					if (gainer) {
        						gainer.gain(trigger.getl(player).cards2.filterInD("d"), "gain2");
        					}
        				},
        			},
        			limit: {
        				charlotte: true,
        				onremove: true,
        				trigger: { player: "useCard1" },
        				silent: true,
        				firstDo: true,
        				filter(event, player) {
        					return player.isPhaseUsing();
        				},
        				content() {
        					player.markAuto(event.name, get.type2(trigger.card));
        				},
        				mod: {
        					cardEnabled(card, player) {
        						const type = get.type2(card);
        						if (player.getStorage("dclishi_limit").includes(type)) {
        							return false;
        						}
        					},
        					cardSavable(card, player) {
        						const type = get.type2(card);
        						if (player.getStorage("dclishi_limit").includes(type)) {
        							return false;
        						}
        					},
        				},
        			},
        			discard: {
        				charlotte: true,
        				forced: true,
        				popup: false,
        				trigger: {
        					player: ["gainAfter"],
        				},
        				filter(event, player) {
        					const evt = event.getParent("phaseDraw");
        					const cards = event.getg?.(player);
        					return event.getParent()?.name == "draw" && evt?.name === "phaseDraw" && evt?.player === player && cards.map(card => get.color(card)).unique().length == 1;
        				},
        				content(event, trigger, player) {
        					const cards = trigger.getg(player);
        					//player.modedDiscard(cards);
        					player.discard(cards);
        				},
        			},
        		},
        	},
        	//赠予啊
        	_gifting:{
				enable:'phaseUse',
				forceLoad:true,
				filter:(event,player)=>player.hasCard(card=>lib.skill._gifting.filterCard(card,player),lib.skill._gifting.position),
				filterCard:(card,player)=>game.hasPlayer(current=>player.canGift(card,current,true)),
				filterTarget:(card,player,target)=>ui.selected.cards.every(value=>player.canGift(value,target,true)),
				position:'he',
				discard:false,
				lose:false,
				delay:false,
				check:card=>{
					const player=_status.event.player;
					if(game.hasPlayer(current=>player.canGift(card,current,true)&&!current.refuseGifts(card,player)&&get.effect(current,card,player,player)>0)) return 2;
					if(!player.needsToDiscard()&&get.position(card)=='h') return 0;
					return 1+Math.random();
				},
				content:()=>{
					player.gift(cards,target);
				},
				ai:{
					order:(item,player)=>player.hasCard(card=>game.hasPlayer(current=>player.canGift(card,current,true)&&!current.refuseGifts(card,player)&&get.effect(current,card,player,player)>0),'h')?7:0.51,
					result:{
						target:(player,target)=>{
							const result=ui.selected.cards.map(value=>player.getGiftAIResultTarget(value,target));
							return result.reduce((previousValue,currentValue)=>previousValue+currentValue,0)/result.length;
						}
					}
				}
			},
        	//26珍藏神黄月英
        	zc26_cangqiao: {
        		trigger: {
        			player: "useCard",
        			global: "roundStart",
        		},
        		audio: 2,
        		filter(event, player) {
        			if (event.name == "useCard") {
        				if (!["zheji", "nvzhuang", "numa"].includes(event.card.name)) {
        					return false;
        				}
        				return player.countCards("h") < player.maxHp;
        			}
        			return true;
        		},
        		content() {
        			if (trigger.name == "useCard") {
        				player.drawTo(player.maxHp);
        			} else {
        				if (!_status.zc26_cangqiao) {
        					game.broadcastAll(function () {
        						_status.zc26_cangqiao = [
        							{ name: "zheji", number: 13, suit: "club" },
        							{ name: "nvzhuang", number: 9, suit: "heart" },
        							{ name: "numa", number: 13, suit: "club" },
        						];
        						for (let info of _status.zc26_cangqiao) {
        							if (!lib.inpile.includes(info.name)) {
        								lib.inpile.add(info.name);
        							}
        						}
        					});
        				}
        				let list = ["zheji", "nvzhuang", "numa"],//["zheji", "serafuku", "numa"],
        					cards = [];
        				for (let name of list) {
        					let card = get.discardPile(name);
        					if (card) {
        						cards.add(card);
        					} else {
        						let info = _status.zc26_cangqiao.find(i => i.name == name);
        						if (info) {
        							game.broadcastAll(function (info) {
        								_status.zc26_cangqiao.remove(info);
        							}, info);
        							card = game.createCard2(name, info.suit, info.number);
        							card.addCardtag("gifts");
        							//card.init([info.suit, info.number, name, null, ['gifts']]);
        							cards.add(card);
        						}
        					}
        				}
        				if (cards.length) {
        					player.gain(cards, "draw2");
        					//cards.forEach(card=>card.addCardtag("gifts"));
        				}
        			}
        		},
        	},
        	zc26_shenxie: {
        		//usable: 1,
        		trigger: { global: "useCardAfter" },
        		filter(event, player) {
        			if (player.getHistory('useSkill',evt=>evt.skill=='zc26_shenxie').length) return false;
        			if (!event.targets.includes(player) || event.targets.length != 1) {
        				return false;
        			} else if (get.color(event.card) != "black") {
        				return false;
        			}
        			const storage = player.getStorage(
        				"zc26_shenxie",
        				lib.inpile.filter(name => get.type(name) == "delay")
        			);
        			if (!storage.some(name => player.hasUseTarget(name))) {
        				return false;
        			}
        			return game.hasPlayer(current => {
        				return current.countCards("ej", { type: "equip" });
        			});
        		},
        		audio: 2,
        		direct: true,
        		content() {
        			'step 0'
        			event.skill = 'zc26_shenxie';
        			var storage = player
        				.getStorage(
        					event.skill,
        					lib.inpile.filter(name => get.type(name) == "delay")
        				)
        				.filter(name => player.hasUseTarget(name));
        			event.choice = storage
        				.map(name => [name, player.getUseValue(get.autoViewAs({ name, isCard: false }, "unsure"))])
        				.reduce(
        					(max, info) => {
        						if (max[1] < info[1]) {
        							return info;
        						}
        						return max;
        					},
        					[null, 0]
        				)[0];
        			player
        				.chooseTarget(get.prompt2(event.skill), (_, player, target) => target.countCards("ej", { type: "equip" }))
        				.set("ai", target => {
        					var es = target.getCards("ej", { type: "equip" });
        					if (!_status.event.choice) {
        						return 0;
        					}
        					if (get.attitude(_status.event.player, target) > 0) {
        						return 10 - Math.min(...es.map(card => get.equipValue(card)));
        					}
        					return Math.max(...es.map(card => get.equipValue(card)));
        				})
        				.set("choice", event.choice);
        			'step 1'
        			if (!result.bool || !result.targets?.length) {
        			    event.finish();
        			}else {
        			    player.logSkill(event.skill, event.target);
        			    event.target = result.targets[0];
        			    //event.choice;
        			}
        			'step 2'
        			player
        				.choosePlayerCard(event.target, `###神械###将${get.translation(event.target)}场上的一张牌当作延时锦囊牌使用`, "ej", true)
        				.set("filterButton", ({ link }) => get.type(link) == "equip")
        				.set("ai", ({ link }) => {
        					if (get.attitude(_status.event.player, _status.event.target) > 0) {
        						return 10 - get.equipValue(link);
        					}
        					return get.equipValue(link);
        				});
    				'step 3'
        			if (!result.bool || !result.cards?.length) {
        			    event.finish();
        			}else {
        				event.storage = player
        					.getStorage(
        						event.name,
        						lib.inpile.filter(name => get.type(name) == "delay")
        					)
        					.filter(name => player.hasUseTarget(name));
    					event.cards = result.cards;
        				player
        					.chooseVCardButton(true, "神械：请选择要使用的延时锦囊牌[$noPreCards]", event.storage.slice())
        					.set("ai", ({ link: [_, __, name] }) => {
        						if (_status.event.choice) {
        							return name == _status.event.choice;
        						}
        						return _status.event.player.getUseValue(name);
        					})
        					.set("choice", event.choice);
        					//.forResultLinks();
        			}
        			'step 4'
    				if (result.bool && result.links?.length) {
    					var name = result.links[0][2];
    					event.storage.remove(name);
    					if (!event.storage.length) {
    						event.storage.addArray(lib.inpile.filter(name => get.type(name) == "delay"));
    					}
    					player.setStorage(event.name, event.storage, true);
    					player.chooseUseTarget({ name, storage: { equipEnable: true }, isCard: false }, event.cards, true);
    				}
        		},
        	},
        	zc26_huaxiu: {
        		usable: 1,
        		enable: "phaseUse",
        		onChooseToUse(event) {
        			if (game.online) {
        				return;
        			}
        			event.set(
        				"zc26_huaxiu",
        				["zheji", "nvzhuang", "numa"].filter(i => i in lib.card)
        			);
        		},
        		audio: 2,
        		filter(event, player) {
        			return event.zc26_huaxiu?.length;
        		},
        		init: function(player, skill) {
        		    //game.createSkill('playerdraw', 'useCard', function(){trigger.sourceEvent.player.draw();}, false, true);
        		    game.createSkill('zc26_huaxiu', 'roundStart', function() {
        		        event.trigger('zc26_roundEnd');
        		    }, {
        		        priority: 10,
        		    }, true);
        		},
        		derivation: ['zc26_zhuge_card', 'zc26_bagua_card', 'zc26_lingling_card'],
        		content() {
        			'step 0'
        			var list = event.getParent(2).zc26_huaxiu.map(name => [get.type(name), "", name]);
        			player.chooseButton(true, ["化朽", "选择要升级的装备", [list, "vcard"]]).set("ai", button => {
        				const player = get.player(),
        					name = button.link[2];
        				const num = game.countPlayer(current => {
        					const hs = current.countCards("h", card => name == card.name),
        						es = current.countCards("e", card => name == card.name),
        						js = current.countCards("j", card => get.type(card) == "delay" && card.storage.equipEnable && name == get.name(card, false));
        					return get.sgnAttitude(player, current) * (es + js + (current == player ? hs : 0));
        				});
        				//alert(name+' : '+num);
        				return num+(Math.random()*0.5);
        			});
        			'step 1'
        			if (result?.bool && result.links?.length) {
        				const name = result.links[0][2],
        					map = {
        						zheji: "zc26_zhuge",
        						nvzhuang: "zc26_bagua",
        						numa: "zc26_lingling",
        					}, trans = {
        					    zheji: "魂.连弩1",
        						nvzhuang: "魂.八卦",
        						numa: "軨軨",
        					};
        				game.log(player, "将", `#y${get.translation({ name })}`, "升级为", `#y${get.translation({ name: map[name] })}`);
        				player.addTempSkill("zc26_huaxiu_restore", { player: "phaseBegin" });
        				game.broadcastAll(
        					function (name, player, map) {
        						if (!_status.zc26_huaxiu_origin) {
        							_status.zc26_huaxiu_origin = {};
        							for (let name of ["zheji", "nvzhuang", "numa"]) {
        								_status.zc26_huaxiu_origin[name] = { info: lib.card[name], translate: lib.translate[name], translate2: lib.translate[`${name}_info`] };
        							}
        						}
        						lib.card[name] = lib.card[map[name]];
        						lib.translate[name] = lib.translate[map[name]];
        						lib.translate[`${name}_info`] = lib.translate[`${map[name]}_info`];
        						_status.zc26_huaxiu ??= {};
        						_status.zc26_huaxiu[name] ??= [];
        						_status.zc26_huaxiu[name].add(player);
        						lib.init.sheet(`
        							.card[data-card-name = "${name}"]>.image {
        								background-image: url(${lib.assetURL}image/card/${map[name]}.png) !important;
        							}
        						`);
        						/*game.createCss(`#arena.zc26_huaxiu_${name} .decade-card[data-card-name = "${name}"].fullskin {
								    background-image: url(${lib.assetURL}image/card/${map[name]}_mask.jpg) !important;
								}`);*/
								if(!game._tempViewAs) game._tempViewAs = {};
								game._tempViewAs[name] = map[name];
        						game._equipTitle[name] = trans[name];
								ui.arena.classList.add(`zc26_huaxiu_${name}`);
        					},
        					name,
        					player,
        					map
        				);
        				function check(name, target, method) {
        					if (method == "e") {
        						return target.hasVCard({ name }, "e");
        					} else if (method == "j") {
        						return target.hasVCard(card => {
        							if (!card.storage?.equipEnable) {
        								return false;
        							}
        							return card.cards.some(cardx => cardx.name == name);
        						}, "j");
        					}
        					return false;
        				}
        				const removeSkill = get.skillsFromEquips([{ name: name }]),
        					addSkill = get.skillsFromEquips([{ name: map[name] }]);
        				for (let current of game.players) {
        					let keepSkills = Object.values(current.additionalSkills).flat(),
        						removeSkill2 = removeSkill.slice().removeArray(keepSkills);
        					if (removeSkill2.length) {
        						current.removeSkill(removeSkill2);
        					}
        					if (check(name, current, "j")) {
        						current.addSkill(addSkill);
        					}
        					if (check(name, current, "e")) {
        						current.addEquipTrigger({ name: map[name] });
        					}
        					//暂不清楚啥作用
        					/*let vcards = current.getVCards("e", { name });
        					while (vcards.length) {
        						let vcard = vcards.shift();
        						current.$addVirtualEquip(vcard, vcard.cards);
        					}*/
        					let cards = current.getCards("e", { name: name });
        					while (cards.length) {
        					    let card = cards.shift();
        					    current.$equip(card);
        					}
        				}
        			}
        		},
        		subSkill: {
        			restore: {
        				charlotte: true,
        				onremove(player, skill) {
        					get.info(skill).contentx.apply(this, [null, null, player]);
        				},
        				trigger: { player: "phaseBegin" },
        				filter(event, player) {
        					for (let name of ["zheji", "nvzhuang", "numa"]) {
        						if (_status.zc26_huaxiu?.[name]?.includes(player)) {
        							return true;
        						}
        					}
        					return false;
        				},
        				forced: true,
        				popup: false,
        				content() {
        					get.info(event.name).contentx.apply(this, arguments);
        				},
        				contentx(event, trigger, player) {
        					game.broadcastAll(function (player) {
        						for (let name of ["zheji", "nvzhuang", "numa"]) {
        							if (_status.zc26_huaxiu?.[name]?.includes(player)) {
        								_status.zc26_huaxiu[name].remove(player);
        								lib.init.sheet(`
        									.card[data-card-name = "${name}"]>.image {
        										background-image: url(${lib.assetURL}image/card/${name}.png) !important;
        									}
        								`);
        								if(game._tempViewAs[name]) delete game._tempViewAs[name];
        								if(game._equipTitle[name]) delete game._equipTitle[name];
        							}
        						}
        					}, player);
        					function check(name, target, method) {
        						if (method == "e") {
        							return target.hasVCard({ name }, "e");
        						} else if (method == "j") {
        							return target.hasVCard(card => {
        								if (!card.storage?.equipEnable) {
        									return false;
        								}
        								return card.cards.some(cardx => cardx.name == name);
        							}, "j");
        						}
        						return false;
        					}
        					const map = {
        						zheji: "zc26_zhuge",
        						nvzhuang: "zc26_bagua",
        						numa: "zc26_lingling",
        					};
        					for (let name of ["zheji", "nvzhuang", "numa"]) {
        						if (name in _status.zc26_huaxiu && !_status.zc26_huaxiu[name].length) {
        							game.log(`#y${get.translation({ name })}`, "的效果还原了");
        							game.broadcastAll(function (name) {
        								delete _status.zc26_huaxiu[name];
        							}, name);
        							lib.card[name] = _status.zc26_huaxiu_origin[name].info;
        							lib.translate[name] = _status.zc26_huaxiu_origin[name].translate;
        							lib.translate[`${name}_info`] = _status.zc26_huaxiu_origin[name].translate2;
        							const addSkill = get.skillsFromEquips([{ name: name }]),
        								removeSkill = get.skillsFromEquips([{ name: map[name] }]);
        							for (let current of game.players) {
        								let keepSkills = Object.values(current.additionalSkills).flat(),
        									removeSkill2 = removeSkill.slice().removeArray(keepSkills);
        								if (removeSkill2.length) {
        									current.removeSkill(removeSkill2);
        								}
        								if (check(name, current, "j")) {
        									current.addSkill(addSkill);
        								} else if (check(name, current, "e")) {
        									current.addEquipTrigger({ name });
        								}
        								//暂不清楚啥作用
        								/*let vcards = current.getVCards("e", { name });
        								while (vcards.length) {
        									let vcard = vcards.shift();
        									current.$addVirtualEquip(vcard, vcard.cards);
        								}*/
        								let cards = current.getCards("e", { name: name });
                    					while (cards.length) {
                    					    let card = cards.shift();
                    					    current.$equip(card);
                    					}
        							}
        						}
        					}
        				},
        			},
        		},
        		ai: {
        			order: 10,
        			result: {
        				player: 1,
        			},
        		},
        	},
        	zc26_zhuge_skill: {
        		equipSkill: true,
        		firstDo: true,
        		locked: true,
        		audio: "zhuge_skill",
        		mod: {
        			cardUsable(card, player, num) {
        				let cards = player.getCards("e", card => get.name(card) == "zc26_zhuge");
        				if (card.name === "sha") {
        					if (!cards.length || player.hasSkill("zc26_zhuge_skill", null, false) || cards.some(card => card !== _status.zc26_zhuge_temp && !ui.selected.cards.includes(card))) {
        						if (get.is.versus() || get.is.changban()) {
        							return num + 3;
        						}
        						return Infinity;
        					}
        				}
        			},
        			cardEnabled2(card, player) {
        				if (!_status.event.addCount_extra || player.hasSkill("zc26_zhuge_skill", null, false)) {
        					return;
        				}
        				let cards = player.getCards("e", card => get.name(card) == "zc26_zhuge");
        				if (card && cards.includes(card)) {
        					try {
        						let cardz = get.card();
        					} catch (e) {
        						return;
        					}
        					if (!cardz || cardz.name !== "sha") {
        						return;
        					}
        					_status.zc26_zhuge_temp = card;
        					let bool = lib.filter.cardUsable(get.autoViewAs(cardz, ui.selected.cards.concat([card])), player);
        					delete _status.zc26_zhuge_temp;
        					if (!bool) {
        						return false;
        					}
        				}
        			},
        		},
        		trigger: { player: ["useCard1", "useCardToPlayered"] },
        		filter(event, player, triggername) {
        			if (event.card.name != "sha") {
        				return false;
        			}
        			if (event.name == "useCard") {
        				return !event.audioed && player.countUsed("sha", true) > 1 && event.getParent().type === "phase";
        			}
        			return game.dead.length && event.target.countCards("h");
        		},
        		direct: true,
        		content() {
        			'step 0'
        			event.skill = 'zc26_zhuge_skill';
        			if (trigger.name == "useCard") {
        				//event._result = { bool: true };
        				trigger.audioed = true;
        			} else {
        				player
        					.chooseTarget(`###${get.prompt(event.skill)}###令任意名死亡角色依次观看${get.translation(trigger.target)}手牌并可以重铸其中一张牌`, [1, game.dead.length])
        					.set("filterTarget", (_, player, target) => target.isDead())
        					.set("ai", target => get.attitude(get.player(), target) > 0)
        					.set("deadTarget", true);
        			}
        			'step 1'
        			if (trigger.name == "useCard") {
        			    player.logSkill('zc26_zhuge_skill');
        			    event.finish();
        			} else if(result.bool && result.targets?.length) {
        				event.targets = result.targets;
        				player.logSkill('zc26_zhuge_skill', event.targets);
        				event.targets.sortBySeat(_status.currentPhase);
    				} else {
    				    event.finish();
    				}
    				'step 2'
    				if(event.targets.length < 1) {
    				    event.finish();
    				}
    				'step 3'
    				event.current = event.targets.shift();
    				//for (const current of event.targets) {}
					if (!event.current.isDead()) {
						event.goto(2);
					}else {
				        event.current.viewHandcards(trigger.target);
					}
					'step 4'
					event.cards = trigger.target.getCards("h", card => lib.filter.cardRecastable(card, trigger.target, trigger.target));
					if (!event.cards.length) {
						event.finish();
					}
					'step 5'
					event.current
						.chooseCardButton(`请选择重铸${get.translation(trigger.target)}的一张手牌`, event.cards)
						.set("ai", ({ link }) => {
							if (get.attitude(_status.event.player, _status.event.target) > 0) {
								return 20 - get.value(link);
							}
							return get.value(link);
						})
						.set("target", trigger.target)
						.set("forceDie", true);
					'step 6'
					if (result?.bool && result.links?.length) {
						game.log(event.current, '令', trigger.target, '重铸了一张牌');
						trigger.target.recast(result.links);
					}
					event.goto(2);
        		},
        	},
        	zc26_bagua_skill: {
        		equipSkill: true,
        		audio: "bagua_skill",
        		trigger: { player: ["chooseToRespondBegin", "chooseToUseBegin"] },
        		filter(event, player) {
        			if (event.responded) {
        				return false;
        			}
        			if (event.zc26_bagua_skill) {
        				return false;
        			}
        			if (!event.filterCard || !event.filterCard(get.autoViewAs({ name: "shan" }, []), player, event)) {
        				return false;
        			}
        			if (event.name === "chooseToRespond" && !lib.filter.cardRespondable(get.autoViewAs({ name: "shan" }, []), player, event)) {
        				return false;
        			}
        			if (player.hasSkillTag("unequip2")) {
        				return false;
        			}
        			let evt = event.getParent();
        			if (
        				evt.player &&
        				evt.player.hasSkillTag("unequip", false, {
        					name: evt.card ? evt.card.name : null,
        					target: player,
        					card: evt.card,
        				})
        			) {
        				return false;
        			}
        			return true;
        		},
        		check(event, player) {
        			if (!event) {
        				return true;
        			}
        			if (event.ai) {
        				let ai = event.ai;
        				let tmp = _status.event;
        				_status.event = event;
        				let result = ai({ name: "shan" }, _status.event.player, event);
        				_status.event = tmp;
        				return result > 0;
        			}
        			const type = event.name === "chooseToRespond" ? "respond" : "use";
        			let evt = event.getParent();
        			if (player.hasSkillTag("noShan", null, type)) {
        				return false;
        			}
        			if (!evt || !evt.card || !evt.player || player.hasSkillTag("useShan", null, type)) {
        				return true;
        			}
        			if (evt.card && evt.player && player.isLinked() && game.hasNature(evt.card) && get.attitude(player, evt.player._trueMe || evt.player) > 0) {
        				return false;
        			}
        			return true;
        		},
        		content() {
        			'step 0'
        			trigger.zc26_bagua_skill = true;
        			if (game.dead.length) {
        				player
        					.chooseTarget(`###${get.prompt(event.name)}###令一名死亡角色卜算3`)
        					.set("filterTarget", (_, player, target) => target.isDead())
        					.set("ai", target => get.attitude(get.player(), target) > 0)
        					.set("deadTarget", true);
					}else {
					    event.goto(2);
					}
					'step 1'
    				if (result.bool && result.targets?.length) {
    					player.line(result.targets[0]);
    					game.log(player, "令", result.targets[0], "卜算3");
    					result.targets[0].chooseToGuanxing(3).set("forceDie", true);
    				}
    				'step 2'
        			player.judge("zc26_bagua", card => (get.color(card) === "red" ? 1.5 : -0.5)).set("judge2", result => result.bool);
        			'step 3'
        			if (result.bool > 0) {
        				trigger.untrigger();
        				trigger.set("responded", true);
        				trigger.result = { bool: true, card: get.autoViewAs({ name: "shan", isCard: true }, []), cards: [] };
        			}
        		},
        		ai: {
        			respondShan: true,
        			freeShan: true,
        			skillTagFilter(player, tag, arg) {
        				if (tag !== "respondShan" && tag !== "freeShan") {
        					return;
        				}
        				if (player.hasSkillTag("unequip2")) {
        					return false;
        				}
        				if (!arg || !arg.player) {
        					return true;
        				}
        				if (
        					arg.player.hasSkillTag("unequip", false, {
        						target: player,
        					})
        				) {
        					return false;
        				}
        				return true;
        			},
        			effect: {
        				target(card, player, target, effect) {
        					if (target.hasSkillTag("unequip2")) {
        						return;
        					}
        					if (
        						player.hasSkillTag("unequip", false, {
        							name: card ? card.name : null,
        							target: target,
        							card: card,
        						}) ||
        						player.hasSkillTag("unequip_ai", false, {
        							name: card ? card.name : null,
        							target: target,
        							card: card,
        						})
        					) {
        						return;
        					}
        					if (get.tag(card, "respondShan")) {
        						return 0.5;
        					}
        				},
        			},
        		},
        	},
        	zc26_lingling_skill: {
        		equipSkill: true,
        		trigger: {
        			player: "phaseZhunbeiBegin",
        			//global: "roundStart",
        			global: "zc26_roundEnd",
        		},
        		//priority: 50,
        		getIndex(event, player) {
        			if (event.name == "phaseZhunbei") {
        				return 1;
        			}
        			const es = player.getCards("e", card => get.info(card)?.name == "zc26_lingling"),
        				js = player.getCards("j", card => {
        					if (get.type(card) != "delay") {
        						false;
        					}
        					const vcard = card[card.cardSymbol];
        					if (!vcard || !vcard.storage?.equipEnable) {
        						return false;
        					}
        					return vcard.cards.some(cardx => get.info(cardx)?.name == "zc26_lingling");
        				});
        			return es.concat(js);
        		},
        		filter(event, player, triggername, card) {
        			if (event.name == "phaseZhunbei") {
        				return true;
        			}
        			if (!game.dead.length) {
        				return false;
        			}
        			return !event.next[event.next.length - 1]?.zc26_lingling?.includes(card);
        		},
        		forced: true,
        		content() {
        			'step 0'
        			if (trigger.name == "phaseZhunbei") {
        				player
        					.chooseTarget(`軨軨：选择一名角色对其造成1点雷电伤害`, true)
        					.set("ai", target => get.damageEffect(target, get.player(), get.player(), "thunder"));
					}else {
					    event.goto(2);
					}
					'step 1'
    				if (result.bool && result.targets?.length) {
    					player.line(result.targets[0], 'thunder');
    					result.targets[0].damage(player, "thunder");
    				}
    				event.finish();
    				'step 2'
    				event.indexedData = lib.skill['zc26_lingling_skill'].getIndex(event, player);//player.getEquip('zc26_lingling');
    				//trigger.next[trigger.next.length - 1].zc26_lingling ??= [];
    				//trigger.next[trigger.next.length - 1].zc26_lingling.add(event.indexedData);
    				//event.targets = game.dead.slice();
    				event.targetsLR = game.dead.slice();
    				event.chooseList = [];
    				if(event.indexedData.length != 1) event.finish();
    				'step 3'
    				if(event.targetsLR.length < 1) {
    				    event.goto(6);
    				}
    				'step 4'
    				event.targetLR = event.targetsLR.shift();
    				//event.map = await game.chooseAnyOL(event.targets, get.info(event.name).chooseControl, [player, event.indexedData]).forResult();
    				event.targetLR
        				.chooseControl(["上家", "下家"])
        				.set("prompt", "軨軨：秘密选择一个方向")
        				.set("prompt2", `令${get.translation(player)}的${get.translation(event.indexedData)}移动至其上家或下家`)
        				.set("ai", () => {
        					//哪管死后洪水滔天
        					let controls = ["上家", "下家"];
        					return Math.random() < 0.5 ? controls[0] : controls[1];
        				})
        				.set("_global_waiting", true);
    				'step 5'
    				//event.chooseList[event.targetLR.playerid] = result.control;
    				event.chooseList.push({player: event.targetLR, control: result.control});
    				event.goto(3);
    				'step 6'
    				if(event.chooseList.length < 1) {
    				    event.finish();
    				}
    				'step 7'
    				var item = event.chooseList.shift();
					var source = game.findPlayer(current => current.hasCard(card => card == event.indexedData[0], "ej")),
						aim;
					var target = item.player, control = item.control;//map.get(target).control;
					if (control == "上家") {
						aim = source?.previous;
					} else if (control == "下家") {
						aim = source?.next;
					}
					if (!source || !aim) {
						event.finish();
					}else {
                        var card=event.indexedData[0];
                        game.log(target, '令', source, '将', card, '移动到', control);
                        aim.equip(card);
                        source.$give(card,aim);
                        source.line([aim],'green');
                        game.delay();
                        event.goto(6);
    					/*event.target
    						.moveCard(true, source, aim, card => {
    							const cardx = get.event("card");
    							if (get.itemtype(card) == "card") {
    								return card == cardx;
    							}
    							return card == cardx[cardx.cardSymbol];
    						})
    						.set("card", event.indexedData)
    						.set("forceDie", true)
    						.setContent(async function (event, trigger, player) {
    							if (player.canMoveCard(null, event.nojudge, event.sourceTargets, event.aimTargets, event.filter, event.canReplace ? "canReplace" : "noReplace")) {
    								const source = event.sourceTargets[0],
    									aim = event.aimTargets[0];
    								let position = "j";
    								event.result = {
    									bool: true,
    									links: [event.card],
    									card: event.card,
    								};
    								if (source.getCards("e").includes(event.card)) {
    									position = "e";
    									if (!event.card.cards?.length) {
    										source.removeVirtualEquip(event.card);
    									}
    									await aim.equip(event.card);
    								} else {
    									if (!event.card.cards?.length) {
    										source.removeVirtualJudge(event.card);
    									}
    									await aim.addJudge(event.card, event.card?.cards);
    								}
    								if (event.card.cards?.length) {
    									source.$give(event.card.cards, aim, false);
    								}
    								game.log(source, "的", event.card, "被移动给了", aim);
    								event.result.position = position;
    								await game.delay();
    							}
    						});*/
					}
        		},
        		chooseControl(player, source, card, eventId) {
        			return player
        				.chooseControl(["上家", "下家"])
        				.set("prompt", "軨軨：秘密选择一个方向")
        				.set("prompt2", `令${get.translation(source)}的${get.translation(card)}移动至其上家或下家`)
        				.set("ai", () => {
        					//哪管死后洪水滔天
        					let controls = get.event().controls.slice();
        					return get.event().getRand() < 0.5 ? controls[0] : controls[1];
        				})
        				.set("id", eventId)
        				.set("_global_waiting", true);
        		},
        	},
        	'zc26_zhuge_card':{}, 
        	'zc26_bagua_card':{}, 
        	'zc26_lingling_card':{},
		},
		card:{
			//26神黄月英的升级装备
        	zc26_zhuge: {
        		fullskin: true,
        		type: "equip",
        		subtype: "equip1",
        		derivation: "zc26_shen_huangyueying",
        		skills: ["zc26_zhuge_skill"],
        		ai: {
        			order() {
        				return get.order({ name: "sha" }) + 0.1;
        			},
        			equipValue(card, player) {
        				if (player._zhuge_temp) {
        					return 1;
        				}
        				player._zhuge_temp = true;
        				var result = (function () {
        					if (
        						!game.hasPlayer(function (current) {
        							return get.distance(player, current) <= 1 && player.canUse("sha", current) && get.effect(current, { name: "sha" }, player, player) > 0;
        						})
        					) {
        						return 1.5;
        					}
        					if (player.hasSha() && _status.currentPhase === player) {
        						if ((player.getEquip("zhuge") && player.countUsed("sha")) || player.getCardUsable("sha") === 0) {
        							return 10.5;
        						}
        					}
        					var num = player.countCards("h", "sha");
        					if (num > 1) {
        						return 6.5 + num;
        					}
        					return 3.5 + num;
        				})();
        				delete player._zhuge_temp;
        				return result;
        			},
        			basic: {
        				equipValue: 6,
        			},
        			tag: {
        				valueswap: 1.5,
        			},
        		},
        	},
        	zc26_bagua: {
        		fullskin: true,
        		type: "equip",
        		subtype: "equip2",
        		derivation: "zc26_shen_huangyueying",
        		skills: ["zc26_bagua_skill"],
        		ai: {
        			basic: {
        				equipValue: 8,
        			},
        		},
        	},
        	zc26_lingling: {
        		name: "zc26_lingling",
        		fullskin: true,
        		type: "equip",
        		subtype: "equip4",
        		derivation: "zc26_shen_huangyueying",
        		skills: ["zc26_lingling_skill"],
        		distance: { globalFrom: -2 },
        		ai: {
        			value(card, player) {
        				if (
        					!game.hasPlayer(function (current) {
        						return get.damageEffect(current, player, player, "thunder") > 0;
        					})
        				) {
        					return 0;
        				}
        				return 8;
        			},
        			equipValue(card, player) {
        				if (
        					!game.hasPlayer(function (current) {
        						return get.damageEffect(current, player, player, "thunder") > 0;
        					})
        				) {
        					return 0;
        				}
        				return 8;
        			},
        			basic: {
        				equipValue: 2,
        			},
        		},
        	},
			changandajian_equip1:{
				fullskin:true,
				derivation:'shen_sunquan',
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-5},
				onLose:function(){
					card.fix();
					card.remove();
					card.destroyed=true;
					game.log(card,'被销毁了');
					player.addTempSkill('changandajian_destroy');
				},
				ai:{
					value:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					equipValue:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					basic:{
						equipValue:2,
					}
				},
			},
			changandajian_equip2:{
				fullskin:true,
				cardimage:'changandajian_equip1',
				derivation:'shen_sunquan',
				type:'equip',
				subtype:'equip2',
				onLose:function(){
					card.fix();
					card.remove();
					card.destroyed=true;
					game.log(card,'被销毁了');
					player.addTempSkill('changandajian_destroy');
				},
				ai:{
					value:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					equipValue:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					basic:{
						equipValue:2,
					}
				},
			},
			changandajian_equip3:{
				fullskin:true,
				cardimage:'changandajian_equip1',
				derivation:'shen_sunquan',
				type:'equip',
				subtype:'equip3',
				distance:{globalTo:2},
				onLose:function(){
					card.fix();
					card.remove();
					card.destroyed=true;
					game.log(card,'被销毁了');
					player.addTempSkill('changandajian_destroy');
				},
				ai:{
					value:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					equipValue:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					basic:{
						equipValue:2,
					}
				},
			},
			changandajian_equip4:{
				fullskin:true,
				cardimage:'changandajian_equip1',
				derivation:'shen_sunquan',
				type:'equip',
				subtype:'equip4',
				distance:{globalFrom:-2},
				onLose:function(){
					card.fix();
					card.remove();
					card.destroyed=true;
					game.log(card,'被销毁了');
					player.addTempSkill('changandajian_destroy');
				},
				ai:{
					value:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					equipValue:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					basic:{
						equipValue:2,
					}
				},
			},
			changandajian_equip5:{
				fullskin:true,
				cardimage:'changandajian_equip1',
				derivation:'shen_sunquan',
				type:'equip',
				subtype:'equip5',
				skills:['changandajian_equip5'],
				onLose:function(){
					card.fix();
					card.remove();
					card.destroyed=true;
					game.log(card,'被销毁了');
					player.addTempSkill('changandajian_destroy');
				},
				ai:{
					value:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					equipValue:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					basic:{
						equipValue:2,
					}
				},
			},
			changandajian_equip6:{
				fullskin:true,
				cardimage:'changandajian_equip1',
				derivation:'shen_sunquan',
				type:'equip',
				subtype:'equip6',
				distance:{globalTo:2,globalFrom:-2},
				onLose:function(){
					card.fix();
					card.remove();
					card.destroyed=true;
					game.log(card,'被销毁了');
					player.addTempSkill('changandajian_destroy');
				},
				ai:{
					value:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					equipValue:function(card,player){
						if(game.hasPlayer(function(current){
							return lib.skill.changandajian_destroy.getEffect(player,current)>0;
						})) return 0;
						return 8;
					},
					basic:{
						equipValue:2,
					}
				},
			},
			qizhengxiangsheng:{
				enable:true,
				type:'trick',
				fullskin:true,
				derivation:'shen_xunyu',
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					if(!event.qizheng_name){
						if(player.isIn()) player.chooseControl('奇兵','正兵').set('prompt','请选择'+get.translation(target)+'的标记').set('choice',function(){
							var e1=1.5*get.sgn(get.damageEffect(target,player,target));
							var e2=0;
							if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
							var es=target.getGainableCards(player,'e');
							if(es.length) e2=Math.min(e2,function(){
								var max=0;
								for(var i of es) max=Math.max(max,get.value(i,target))
								return -max/4;
							}());
							if(Math.abs(e1-e2)<=0.3) return Math.random()<0.5?'奇兵':'正兵';
							if(e1<e2) return '奇兵';
							return '正兵';
						}()).set('ai',function(){
							return _status.event.choice;
						});
						else event.finish();
					}
					'step 1'
					if(!event.qizheng_name&&result&&result.control) event.qizheng_name=result.control;
					if(event.directHit) event._result={bool:false};
					else target.chooseToRespond('请打出一张杀或闪响应奇正相生',function(card,player){
						var name=get.name(card);
						return name=='sha'||name=='shan';
					}).set('ai',function(card){
						if(_status.event.choice=='all'){
							var rand=get.rand('qizhengxiangsheng');
							if(rand>0.5) return 0;
							return 1+Math.random();
						}
						if(get.name(card)==_status.event.choice) return get.order(card);
						return 0;
					}).set('choice',function(){
						if(target.hasSkillTag('useShan')) return 'shan';
						if(typeof event.qizheng_aibuff=='boolean'){
							var shas=target.getCards('h','sha'),shans=target.getCards('h','shan');
							if(event.qizheng_aibuff){
								if(shas.length>=Math.max(1,shans.length)) return 'shan';
								if(shans.length>shas.length) return 'sha';
								return false;
							}
							if(!shas.length||!shans.length) return false;
						}
						var e1=1.5*get.sgn(get.damageEffect(target,player,target));
						var e2=0;
						if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
						var es=target.getGainableCards(player,'e');
						if(es.length) e2=Math.min(e2,function(){
							var max=0;
							for(var i of es) max=Math.max(max,get.value(i,target))
							return -max/4;
						}());
						if(e1-e2>=0.3) return 'shan';
						if(e2-e1>=0.3) return 'sha';
						return 'all';
					}());
					'step 2'
					var name=result.bool?result.card.name:null,require=event.qizheng_name;
					if(require=='奇兵'&&name!='sha') target.damage();
					else if(require=='正兵'&&name!='shan'&&target.countGainableCards(player,'he')>0) player.gainPlayerCard(target,true,'he');
				},
				ai:{
					order:5,
					tag:{
						damage:0.5,
						gain:0.5,
						loseCard:1,
						respondShan:1,
						respondSha:1,
					},
					result:{
						target:function(player,target){
							var e1=1.5*get.sgn(get.damageEffect(target,player,target));
							var e2=0;
							if(target.countGainableCards(player,'h')>0&&!target.hasSkillTag('noh')) e2=-1;
							var es=target.getGainableCards(player,'e');
							if(es.length) e2=Math.min(e2,function(){
								var max=0;
								for(var i of es) max=Math.max(max,get.value(i,target))
								return -max/4;
							}());
							if(game.hasPlayer(function(current){
								return current.hasSkill('tianzuo')&&get.attitude(current,player)<=0;
							})) return Math.max(e1,e2);
							return Math.min(e1,e2);
						},
					},
				},
			},
		},
		dynamicTranslate:{
			nzry_longnu:function(player){
				if(player.hasSkill('nzry_longnu_2')) return '转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。<span class="legendtext">阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。</span>';
				if(player.hasSkill('nzry_longnu_1')) return '转换技，锁定技，<span class="legendtext">阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。</span>阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。';
				if(player.storage.nzry_longnu==true) return '转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。<span class="bluetext">阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。</span>';
				return '转换技，锁定技，<span class="bluetext">阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。</span>阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。';
			},
			pro_nzry_longnu:function(player){
				if(player.hasSkill('pro_nzry_longnu_2')) return '转换技，锁定技，出牌阶段开始时，你摸一张牌，若你的护甲不足2点，你获得1点护甲，然后，阴：你失去1点体力，本阶段内你的红色手牌均视为火【杀】且无距离限制不能被响应。<span class="legendtext">阳：你减1点体力上限，本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制无视目标防具。</span>';
				if(player.hasSkill('pro_nzry_longnu_1')) return '转换技，锁定技，出牌阶段开始时，你摸一张牌，若你的护甲不足2点，你获得1点护甲，然后，<span class="legendtext">阴：你失去1点体力，本阶段内你的红色手牌均视为火【杀】且无距离限制不能被响应。</span>阳：你减1点体力上限，本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制无视目标防具。';
				if(player.storage.pro_nzry_longnu==true) return '转换技，锁定技，出牌阶段开始时，你摸一张牌，若你的护甲不足2点，你获得1点护甲，然后，阴：你失去1点体力，本阶段内你的红色手牌均视为火【杀】且无距离限制不能被响应。<span class="bluetext">阳：你减1点体力上限，本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制无视目标防具。</span>';
				return '转换技，锁定技，出牌阶段开始时，你摸一张牌，若你的护甲不足2点，你获得1点护甲，然后，<span class="bluetext">阴：你失去1点体力，本阶段内你的红色手牌均视为火【杀】且无距离限制不能被响应。</span>阳：你减1点体力上限，本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制无视目标防具。';
			},
			fengliao: function (player) {
			    if (!player.storage.fengliao) return '锁定技，转换技，你使用牌指定唯一目标后，<span class = "bluetext">阳：你令其摸一张牌</span>；阴：你对其造成1点火焰伤害。'
    			return '锁定技，转换技，你使用牌指定唯一目标后，阳：你令其摸一张牌；<span class = "bluetext">阴：你对其造成1点火焰伤害。';
		    },
		},
		translate:{
			"shen_luxun":"神陆逊",
			"pro_nzry_junlve":"军略",
			"pro_nzry_junlve_info":"锁定技，你不能成为已横置角色使用【杀】的目标，当你被横置时，取消之；当你造成伤害后，或一名角色被横置后，你获得1个“军略”标记；你受到伤害后，你获得2个“军略”标记。",
			"nzry_junlve":"军略",
			"nzry_junlve_info":"锁定技，当你受到或造成伤害后，你获得X个“军略”标记（X为伤害点数）。",
			"nzry_cuike":"摧克",
			"nzry_cuike_info":window.getStrength("出牌阶段开始时，若“军略”标记的数量为奇数，你可以对一名角色造成一点伤害；若“军略”标记的数量为偶数，你可以横置一名角色并弃置其区域内的一张牌。然后，若“军略”标记的数量超过7个，你可以移去全部“军略”标记并对所有其他角色造成一点伤害",
			"准备阶段开始时，若“军略”标记的数量为奇数，你可以对一名角色造成一点伤害；若“军略”标记的数量为偶数，你可以横置一名角色并弃置其区域内的一张牌。然后，若“军略”标记的数量超过7个，你可以移去全部“军略”标记并对所有其他角色造成一点伤害",'shen_luxun'),
			"pro_nzry_dinghuo":"绽火",
			"pro_nzry_dinghuo_info":"限定技，出牌阶段，你可以移去全部“军略”标记，令至多等量的已横置角色弃置所有装备区内的牌。然后，你对其中一名角色造成2点火焰伤害。",
			"nzry_dinghuo":"绽火",
			"nzry_dinghuo_info":"限定技，出牌阶段，你可以移去全部“军略”标记，令至多等量的已横置角色弃置所有装备区内的牌。然后，你对其中一名角色造成1点火焰伤害。",
			"shen_liubei":"神刘备",
			"pro_nzry_longnu":"龙怒",
			"pro_nzry_longnu_info":"转换技，锁定技，出牌阶段开始时，你摸一张牌，若你的护甲不足2点，你获得1点护甲，然后，阴：你失去1点体力，本阶段内你的红色手牌均视为火【杀】且无距离限制不能被响应。阳：你减1点体力上限，本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制无视目标防具。",
			"nzry_longnu":"龙怒",
			"nzry_longnu_info":"转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。",
			"pro_nzry_jieying":"结营",
			"pro_nzry_jieying_info":"锁定技，游戏开始时或当你的武将牌重置时，你横置；所有已横置的角色手牌上限+2；结束阶段，你须横置一名其他角色，然后该角色可以交给你一张牌并令你摸一张牌。",
			"nzry_jieying":"结营",
			"nzry_jieying_info":"锁定技，游戏开始时或当你的武将牌重置时，你横置；所有已横置的角色手牌上限+2；结束阶段，你横置一名其他角色。",
			
			"shen_ganning":"神甘宁",
			"shen_zhangliao":"神张辽",
			
			"pro_drlt_poxi":"魄袭",
			"pro_drlt_poxi_info":"出牌阶段限一次，你可以观看一名其他角色的手牌，然后你可以弃置你与其手牌中的至多四张花色不同的牌。若如此做，根据此次弃置你的牌的数量执行以下效果：零张，扣减一点体力上限；一张，你失去一点体力；三张，你回复一点体力；四张，你获得三点护甲。若你因此弃置了对方的牌，你从牌堆中获得一张【杀】。",
			"drlt_poxi":"魄袭",
			"drlt_poxi_info":"出牌阶段限一次，你可以观看一名其他角色的手牌，然后你可以弃置你与其手牌中的四张花色不同的牌。若如此做，根据此次弃置你的牌的数量执行以下效果：零张，扣减一点体力上限；一张，你结束出牌阶段且本回合手牌上限-1；三张，你回复一点体力；四张，你摸四张牌",
			"pro_drlt_jieying":"劫营",
			"pro_drlt_jieying_info":"回合开始时，若场上没有拥有“营”标记的角色，你获得1个“营”标记；结束阶段，你可以将你的一个“营”标记交给一名角色；有“营”标记的角色摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1，手牌上限+1。有“营”的其他角色回合结束时，其移去“营”标记，然后你获得其所有手牌，若你以此法获得了至少两张牌，该角色摸一张牌。",
			"pro_drlt_jieying_mark":"劫营",
			"drlt_jieying":"劫营",
			"drlt_jieying_info":"回合开始时，若场上没有拥有“营”标记的角色，你获得1个“营”标记；结束阶段，你可以将你的一个“营”标记交给一名角色；有“营”标记的角色摸牌阶段多摸一张牌，出牌阶段使用【杀】的次数上限+1，手牌上限+1。有“营”的其他角色回合结束时，其移去“营”标记，然后你获得其所有手牌。",
			"drlt_jieying_mark":"劫营",
			"drlt_duorui1":"失效技能",
			"drlt_duorui1_bg":"锐",
			"pro_drlt_duorui":"夺锐",
			"pro_drlt_duorui_info":"当你于出牌阶段内对一名其他角色造成伤害后，若你有未被废除的装备栏且该角色的装备栏均未被废除，你可以选择废除其装备区内和自己的随机一个装备栏（不满足条件则跳过此步骤），然后你获得该角色的一个技能直到你的下回合开始或其死亡(觉醒技，限定技，主公技，隐匿技，使命技等特殊技能除外)。若如此做，该角色该技能失效且你不能再对其发动〖夺锐〗直到你失去以此法获得的技能。",
			"drlt_duorui":"夺锐",
			"drlt_duorui_info":"当你于出牌阶段内对一名其他角色造成伤害后，你可以废除你装备区内的一个装备栏（若已全部废除则可以跳过此步骤），然后获得该角色的一个技能直到其的下回合结束或其死亡(觉醒技，限定技，主公技，隐匿技，使命技等特殊技能除外)。若如此做，该角色该技能失效且你不能再发动〖夺锐〗直到你失去以此法获得的技能。",
			"pro_drlt_zhiti":"止啼",
			"pro_drlt_zhiti_info":"锁定技。①出牌阶段，你可以将一张装备牌当【决斗】使用，你使用【决斗】可以额外指定一名角色为目标。②你攻击范围内已受伤的其他角色手牌上限-1。③当你受到伤害后，你恢复一个装备栏。",
			"drlt_zhiti":"止啼",
			"drlt_zhiti_info":"锁定技，你攻击范围内已受伤的其他角色手牌上限-1；当你拼点或【决斗】胜利，或受到伤害后，你恢复一个装备栏",
			
			shen_zhaoyun:'神赵云',
			shen_guanyu:'神关羽',
			shen_lvmeng:'神吕蒙',
			shen_simayi:'神司马懿',
			shen_caocao:'神曹操',
			shen_zhugeliang:'神诸葛亮',
			shen_zhouyu:'神周瑜',
			shen_lvbu:'神吕布',
			pro_juejing:'绝境',
			pro_juejing_info:'锁定技。①你的手牌上限+2，计算与其他角色的距离时-1。②摸牌阶段，若你的手牌数不大于2/你的体力值不为满，你令摸牌数+1。③当你进入濒死状态时，你摸两张牌。',
			xinjuejing:'绝境',
			xinjuejing_info:'锁定技，你的手牌上限+2；当你进入或脱离濒死状态时，你摸一张牌。',
			relonghun:'龙魂',
			relonghun_info:window.getStrength('你可以将同花色的一至两张牌按下列规则使用或打出：红桃当【桃】，方块当火【杀】，梅花当【闪】，黑桃当【无懈可击】。若你以此法使用了两张红色牌，则此牌回复值或伤害值+1。若你以此法使用了两张黑色牌，则你弃置当前回合角色一张牌。',
			'你可以将同花色的一至两张牌按下列规则使用或打出：红桃当【桃】，方块当火【杀】，梅花当【闪】，黑桃当【无懈可击】。若你以此法使用了两张牌，则此牌不可被响应，且若此牌为：红色牌，则此牌回复值或伤害值+1；黑色牌，则你弃置当前回合角色一张牌。','shen_zhaoyun'),
			xinlonghun:'龙魂',
			xinlonghun_info:'你可以将你的牌按下列规则使用或打出：红桃当【桃】，方块当火【杀】，梅花当【闪】，黑桃当【无懈可击】。',
			longhun:'龙魂',
			longhun1:'龙魂♥︎',
			longhun2:'龙魂♦︎',
			longhun3:'龙魂♠︎',
			longhun4:'龙魂♣︎',
			juejing:'绝境',
			longhun_info:'你可以将同花色的X张牌按下列规则使用或打出：红桃当【桃】，方块当具火焰伤害的【杀】，梅花当【闪】，黑桃当【无懈可击】（X为你当前的体力值且至少为1）',
			juejing_info:'锁定技，摸牌阶段，你摸牌的数量改为你已损失的体力值+2；你的手牌上限+2。',
			wushen:'武神',
			wushen_info:'锁定技，你的红桃手牌均视为【杀】；锁定技，你使用红桃【杀】无距离和次数限制且不可被响应。',
			pro_wushen:'武神',
			pro_wushen_info:'锁定技。①你的红桃手牌均视为【杀】，你使用红桃【杀】无距离和次数限制且需要依次使用或打出两张【闪】响应。②每回合你首次因【杀】直接造成伤害时，你令该伤害值+1且在该实体牌结算后失去一点体力。③你使用【杀】对一名其他角色直接造成伤害时，你令该角色随机弃置一张手牌并获得等量“梦魇”标记。',
			wuhun:'武魂',
			wuhun21:'武魂',
			wuhun22:'武魂',
			wuhun23:'武魂',
			wuhun2:'武魂',
			wuhun3:'武魂',		
			wuhun_info_alter:'锁定技，当你受到1点伤害后，你令伤害来源获得1枚“梦魇”标记；当你死亡时，你令拥有最多“梦魇”标记的一名其他角色判定，若结果不为【桃】或【桃园结义】，则该角色死亡。',
			wuhun_info:'锁定技，杀死你的角色立即进入濒死状态',
			shelie:'涉猎',
			gongxin:'攻心',
			gongxin_discard:'弃置',
			gongxin_top:'牌堆顶',
			pro_renjie:'忍戒',
			pro_renjie_info:'锁定技。①当你受到伤害/于出牌阶段外不因牌的效果而弃置牌后，你获得等同于伤害数量/失去的牌数量的“忍”标记。②若你没有〖极略〗，其他角色的回合结束时，若其使用过锦囊牌且你未作响应，你获得一枚“忍”标记。③若你拥有〖极略〗，准备阶段开始时，你获得一枚“忍”标记。',
			pro_renjie1:'忍戒',
			pro_renjie2:'忍戒',
			
			renjie:'忍戒',
			renjie2:'忍戒',
			renjie_info:'锁定技，当你受到1点伤害后，你获得一枚“忍”标记；锁定技，当你于弃牌阶段内弃置牌后，你获得等同于失去的牌数量的“忍”标记。',
			sbaiyin:'拜印',
			sbaiyin_info:'觉醒技，准备阶段开始时，若你的“忍”标记数不小于4，你减1点体力上限，然后获得〖极略〗。',
			pro_baiyin:'拜印',
			pro_baiyin_info:'觉醒技，准备阶段开始时，若你的“忍”标记数不小于4，你减1点体力上限，然后获得〖极略〗和〖完杀〗。',
			pro_guicai:'鬼才',
			pro_guicai_info:'一名角色的判定牌生效前，你可以打出一张牌替换之。',
			
			pro_jilue:'极略',
			pro_jilue_info:'当一名角色的判定牌生效前，你可以弃1枚“忍”标记并发动〖鬼才〗；每当你受到伤害后，你可以弃1枚“忍”标记并发动〖放逐〗；当你使用锦囊牌时，你可以弃1枚“忍”标记并发动〖集智〗；出牌阶段限一次，你可以弃1枚“忍”标记并发动〖制衡〗。',
			jilue:'极略',
			jilue_info:'当一名角色的判定牌生效前，你可以弃1枚“忍”标记并发动〖鬼才〗；每当你受到伤害后，你可以弃1枚“忍”标记并发动〖放逐〗；当你使用锦囊牌时，你可以弃1枚“忍”标记并发动〖集智〗；出牌阶段限一次，你可以弃1枚“忍”标记并发动〖制衡〗；出牌阶段，你可以弃1枚“忍”标记并获得〖完杀〗直到回合结束。',
			jilue_guicai:'鬼才',
			jilue_fangzhu:'放逐',
			jilue_wansha:'完杀',
			jilue_zhiheng:'制衡',
			jilue_jizhi:'集智',
			lianpo:'连破',
			lianpo_info:'一名角色的回合结束时，若你本回合内杀死过角色，则你可以进行一个额外的回合。',
			guixin:'归心',
			qinyin:'琴音',
			yeyan:'业炎',
			pro_shelie:'涉猎',
			pro_shelie_info:'摸牌阶段，你可以改为从牌堆顶亮出六张牌，然后选择获得不同花色的牌各一张。',
			pro_gongxin:'攻心',
			pro_gongxin_info:'结束阶段，你可以令至多X-1名其他角色选择一项：交给你一张♥️牌，或者获得〖止息〗直到其回合结束（X为本回合内你共使用过的花色数）。',
			pro_yeyan:'业炎',
			pro_yeyan_info:'限定技，出牌阶段，你可以对一至三名角色造成至多共3点火焰伤害（你可以任意分配每名目标角色受到的伤害点数），若你将对一名角色分配2点或更多的火焰伤害，你须先弃置四张不同花色的手牌。',
			pro_qinyin:'琴音',
			pro_qinyin_info:'结束阶段，若本回合内进入弃牌堆的牌包含两种颜色，则你可以选择一项：1. 令所有角色各回复1点体力；2. 令所有角色各失去1点体力；3. 减1点体力上限并重置〖业炎〗。',
			pro_kuangfeng:'狂风',
			pro_kuangfeng_info:'锁定技，结束阶段，若你有“星”，你须选择一张“星”获得，然后你可以指定X名角色：其随机弃置一张牌，且直到你的下回合开始，该角色受到火焰伤害时，此伤害+1（X为你的体力值）。',
			pro_dawu2_bg:'雾',
			pro_dawu2:'大雾',
			pro_dawu3:'大雾',
			pro_dawu:'大雾',
			pro_dawu_info:'准备阶段，你可以指定X名角色：直到你的下回合开始，当这些角色受到非雷电伤害时，防止此伤害（X为你拥有“星”数量的一半向上取整）。',
			
			shelie_info:'摸牌阶段，你可以改为从牌堆顶亮出五张牌，然后选择获得不同花色的牌各一张。',
			gongxin_info:'出牌阶段限一次，你可以观看一名其他角色的手牌，并可以展示其中一张红桃牌，然后将其弃置或置于牌堆顶。',
			guixin_info:'当你受到1点伤害后，你可以获得每名其他角色区域里的一张牌，然后你翻面',
			guixin_info_alter:'当你受到1点伤害后，你可以随机获得每名其他角色区域里的一张牌，然后你翻面',
			qinyin_info:'弃牌阶段结束时，若你于此阶段内弃置过两张或更多的牌，则你可以选择一项：1. 令所有角色各回复1点体力；2. 令所有角色各失去1点体力。',
			// qinyin_info:'每当你于弃牌阶段内因你的弃置而失去第X张手牌时（X至少为2），你可以选择一项：1.令所有角色各回复1点体力；2.令所有角色各失去1点体力。每阶段限一次。',
			yeyan_info:'限定技，出牌阶段，你可以对一至三名角色造成至多共3点火焰伤害（你可以任意分配每名目标角色受到的伤害点数），若你将对一名角色分配2点或更多的火焰伤害，你须先弃置四张不同花色的手牌再失去3点体力。',
			qixing:'七星',
			qixing_bg:'星',
			qixing2:'七星',
			qixing3:'七星',
			qixing_info:'游戏开始时，你将牌堆顶的七张牌置于你的武将牌上，称之为“星”。然后/摸牌阶段结束后，你可用任意数量的手牌等量交换这些“星”。',
			dawu:'大雾',
			dawu2_bg:'雾',
			dawu2:'大雾',
			dawu3:'大雾',
			// dawu2_info:'已获得大雾标记',
			dawu_info:'结束阶段，你可以弃置X张“星”并指定等量的角色：直到你的下回合开始，当这些角色受到非雷电伤害时，防止此伤害。',
			kuangfeng:'狂风',
			kuangfeng2:'狂风',
			kuangfeng2_bg:'风',
			// kuangfeng2_info:'已获得狂风标记',
			kuangfeng3:'狂风',
			kuangfeng_info:'结束阶段，你可以弃置1张“星”并指定一名角色：直到你的下回合开始，该角色受到火焰伤害时，此伤害+1。',
			baonu:'狂暴',
			baonu_bg:'暴',
			baonu_info:'锁定技，游戏开始时，你获得两枚“暴怒”标记；锁定技，当你造成/受到1点伤害后，你获得1枚“暴怒”标记。',
			pro_baonu:'狂暴',
			pro_baonu_info:'锁定技。①游戏开始时，你获得两枚“暴怒”标记。②当你造成/受到1点伤害后，你获得1枚“暴怒”标记。③回合结束时，若你本回合内杀死过角色，则你可以恢复一点体力并重置〖神愤〗。',
			shenfen:'神愤',
			shenfen_info:'限定技，出牌阶段，你可以弃置6枚暴怒标记，对场上所有其他角色造成一点伤害，然后令其弃置4张牌',
			wuqian:'无前',
			wuqian_info:'出牌阶段，你可以弃置两枚暴怒标记并获得技能【无双】直到回合结束',
			wumou:'无谋',
			wumou_info:'锁定技，当你使用普通锦囊牌时，你选择一项：1.弃置1枚“暴怒”标记；2.失去1点体力。',
			pro_wumou:'无谋',
			pro_wumou_info:'锁定技，结束阶段，若你于本回合的出牌阶段内使用过普通锦囊牌，你选择一项：1.弃置1枚“暴怒”标记；2.受到1点伤害。',
			pro_wuqian:'无前',
			pro_wuqian_info:'出牌阶段限一次，你可以弃置2枚“暴怒”标记并选择一名其他角色，获得技能〖无双〗并令其防具无效直到回合结束，然后随机获得其一张牌。',
			ol_wuqian:'无前',
			ol_wuqian_info:'出牌阶段，你可以弃置2枚“暴怒”标记并选择一名本回合内未选择过的其他角色，你获得技能〖无双〗并令其防具无效直到回合结束。',
			pro_shenfen:'神愤',
			pro_shenfen_info:'限定技，出牌阶段，你可以弃置6枚“暴怒”标记并选择所有其他角色，对这些角色各造成1点伤害。然后这些角色先各弃置其装备区里的牌，再各弃置四张手牌。',
			ol_shenfen:'神愤',
			ol_shenfen_info:'出牌阶段限一次，你可以弃置6枚“暴怒”标记并选择所有其他角色，对这些角色各造成1点伤害。然后这些角色先各弃置其装备区里的牌，再各弃置四张手牌。最后你将你的武将牌翻面。',
			"new_wuhun":"武魂",
			"new_wuhun_info":"锁定技，当你受到伤害后，伤害来源获得X个“梦魇”标记（X为伤害点数）。锁定技，当你死亡时，你选择一名“梦魇”标记数量最多的其他角色。该角色进行判定：若判定结果不为【桃】或【桃园结义】，则该角色死亡。",
			"pro_wuhun":"武魂",
			"pro_wuhun_info":"锁定技。①当你受到其他角色造成的伤害后，伤害来源获得X个“梦魇”标记（X为伤害点数）。②当你死亡时，你选择一名“梦魇”标记数量最多的其他角色，该角色进行判定：若判定结果不为【桃】或【桃园结义】，则该角色死亡。",
			"pro_feiying":'飞影',
			"pro_feiying_info":'锁定技，其他角色计算与你的距离时+1，若你的体力值不大于1，则改为+2。',
			"new_guixin":"归心",
			"new_guixin_info":"当你受到1点伤害后，你可以按照你选择的区域优先度随机获得每名其他角色区域里的一张牌，然后你翻面。",
			"pro_guixin":"归心",
			"pro_guixin_info":"准备阶段，你可以弃置两张装备牌并指定一名其他角色，该角色视为对你造成1点伤害，然后你对其造成1点伤害；当你受到1点伤害后，你可以按照你选择的区域优先度随机获得每名其他角色区域里的一张牌，然后若你因此获得了超过两张牌，你将武将牌翻面。",
			ol_zhangliao:'OL神张辽',
			olduorui:'夺锐',
			olduorui2:'夺锐',
			olduorui_info:'当你于出牌阶段内对一名角色造成伤害后，你可以选择该角色武将牌上的一个技能。若如此做，你结束出牌阶段，且你令此技能于其下个回合结束之前无效。',
			olzhiti:'止啼',
			olzhiti_info:'锁定技，你攻击范围内已受伤角色的手牌上限-1。若场上已受伤的角色数：不小于1，你的手牌上限+1；不小于3，你于摸牌阶段开始时令额定摸牌数+1；不小于5，回合结束时，你废除一名角色的一个随机装备栏。',
			shen_caopi:'神曹丕',
			chuyuan:'储元',
			chuyuan_info:'一名角色受到伤害后，若你武将牌上「储」的数量小于体力上限，你可以令其摸一张牌。然后其将一张手牌置于你的武将牌上，称为「储」。',
			//chuyuan_info:'一名角色受到伤害后，你可以令其摸一张牌。然后其将一张手牌置于你的武将牌上，称为「储」。你的手牌上限+X（X为你武将牌上的「储」数）。',
			dengji:'登极',
			dengji_info:'觉醒技，准备阶段，若你武将牌上的「储」数不小于3，则你减1点体力上限并获得所有「储」，然后获得技能〖天行〗和〖奸雄〗',
			tianxing:'天行',
			tianxing_info:'觉醒技，准备阶段，若你武将牌上的「储」数不小于3，则你减1点体力上限并获得所有「储」，然后失去技能〖储元〗，选择获得以下技能中的一个：〖仁德〗/〖制衡〗/〖乱击〗/〖行动〗',
			shen_zhenji:'神甄宓',
			shenfu:'神赋',
			shenfu_info:'回合结束时，若你的手牌数为：奇数，你可对一名其他角色造成1点雷属性伤害。若其死亡，你可重复此流程。偶数，你可选择一名角色，你令其摸一张牌或弃置一张手牌。若其手牌数等于体力值，你可重复此流程。',
			qixian:'七弦',
			qixian_info:'锁定技，你的手牌上限视为7。',
			caopi_xingdong:'行动',
			caopi_xingdong_info:'出牌阶段限一次，你可以将一张【杀】或普通锦囊牌交给一名其他角色，然后该角色选择一项：对除你以外的角色使用此牌并在此牌结算完成后和你各摸一张牌；或跳过下回合的判定阶段和摸牌阶段。',
			shen_diaochan:'神貂蝉',
			meihun:'魅魂',
			meihun_info:'结束阶段或当你成为【杀】的目标后，你可以令一名其他角色交给你一张你声明的花色的手牌，若其没有则你观看其手牌然后弃置其中一张。',
			huoxin_control:'惑心',
			huoxin:'惑心',
			huoxin_info:'出牌阶段限一次，你可以展示两张花色相同的手牌并分别交给两名其他角色，然后令这两名角色拼点，没赢的角色获得1个“魅惑”标记。拥有2个或更多“魅惑”的角色回合即将开始时，该角色移去其所有“魅惑”，此回合改为由你操控。',
			boss_zhaoyun:'高达一号',
			boss_zhaoyun_ab:'神赵云',
			boss_juejing:'绝境',
			boss_juejing2:'绝境',
			boss_juejing_info:'锁定技，摸牌阶段开始前，你跳过此阶段。当你得到牌/失去手牌后，若你的手牌数大于4/小于4，则你将手牌摸至4张/弃置至4张。',
			zhanjiang:'斩将',
			zhanjiang_info:'准备阶段开始时，如果其他角色的装备区内有【青釭剑】，你可以获得之',
			shen_guojia:'神郭嘉',
			shuishi:'慧识',
			shuishi_info:'出牌阶段限一次，若你的体力上限小于10，则你可选择一名角色。你令其摸一张牌，若其以此法得到的牌：与该角色的其他手牌花色均不相同，则你加1点体力上限，若你的体力上限小于10，则你可以重复此流程；否则你减1点体力上限，且其展示所有手牌。',
			stianyi:'天翊',
			stianyi_info:'觉醒技，准备阶段，若场上的所有存活角色均于本局游戏内受到过伤害，则你加2点体力上限并回复1点体力，然后令一名角色获得技能〖佐幸〗。',
			zuoxing:'佐幸',
			zuoxing2:'佐幸',
			zuoxing_info:'出牌阶段限一次，若令你获得〖佐幸〗的角色存活且体力上限大于1，则你可以令其减1点体力上限，并视为使用一张普通锦囊牌。',
			sghuishi:'辉逝',
			sghuishi_info:'限定技，出牌阶段，你可以选择一名其他角色：若其有未发动过的觉醒技，则你令其发动这些觉醒技时无视原有条件；否则其摸四张牌。然后你减2点体力上限。',
			shen_taishici:'神太史慈',
			dulie:'笃烈',
			dulie_info:'锁定技。当你成为【杀】的目标时，若使用者的体力值大于你，则你进行判定。若结果为红桃，则取消此目标。',
			tspowei:'破围',
			tspowei_info:'使命技。①游戏开始时，你令所有其他角色获得一个“围”。②一名角色受到伤害后，若其有“围”，则其移去“围”。③回合开始时，你选择所有有“围”的角色。这些角色失去“围”，然后这些角色的第一个不为你的下家获得等量的“围”。④一名其他角色的回合开始时，若其有“围”，则你可以选择一项：⒈弃置一张手牌并对其造成1点伤害。⒉若其体力值不大于你，则你获得其一张手牌。选择完成后，你视为在其攻击范围内直到回合结束。⑤使命：回合开始时，若场上没有“围”，则你获得技能〖神著〗。⑥失败：当你进入濒死状态时，你将体力值回复至1点，然后弃置装备区的所有牌。',
			shenzhu:'神著',
			shenzhu_info:'锁定技，当你使用有对应实体牌的非转化【杀】结算结束后，你选择一项：①摸一张牌，且本回合使用【杀】的次数上限+1。②摸三张牌，且本回合不能再使用【杀】。',
			dangmo:'荡魔',
			dangmo_info:'当你于出牌阶段内使用第一张【杀】选择目标后，你可以为此牌增加至多Y-1个目标（Y为你的体力值）。',
			reshuishi:'慧识',
			reshuishi_info:'出牌阶段限一次。若你的体力上限小于10，你可进行判定牌不置入弃牌堆的判定。若判定结果与本次发动技能时的其他判定结果的花色均不相同且你的体力上限小于10，则你加1点体力上限，且可以重复此流程。然后你将所有位于处理区的判定牌交给一名角色。若其手牌数为全场最多，则你减1点体力上限。',
			resghuishi:'辉逝',
			resghuishi_info:'限定技，出牌阶段，你可选择一名角色。若你的体力上限不小于存活人数且其有未发动的觉醒技，则你令其中一个技能无视发动条件；否则其摸四张牌。然后你减2点体力上限。',
			qizhengxiangsheng:'奇正相生',
			qizhengxiangsheng_info:'出牌阶段，对一名其他角色使用。你将目标角色标记为“奇兵”或“正兵”（对其他角色不可见）。然后目标角色可以打出一张【杀】或【闪】。若其是“奇兵”且未打出【杀】，则你对其造成1点伤害；若其是“正兵”且未打出【闪】，则你获得其一张牌。',
			shen_xunyu:'神荀彧',
			tianzuo:'天佐',
			tianzuo_info:'锁定技。①游戏开始时，你将8张【奇正相生】加入牌堆。②【奇正相生】对你无效。',
			lingce:'灵策',
			lingce_info:'锁定技。当有【奇正相生】或智囊或〖定汉①〗记录过的锦囊牌被使用时，若此牌不为转化牌且对应实体牌数量为1，则你摸一张牌。',
			dinghan:'定汉',
			dinghan_info:'①当你成为未记录过的普通锦囊牌的目标时，或有未记录过的延时锦囊牌进入你的判定区时，你记录此牌名并取消之。②准备阶段，你可在〖定汉①〗的记录中添加或减少一种锦囊牌的牌名。',
			shen_sunce:'神孙策',
			yingba:'英霸',
			yingba_info:'①出牌阶段限一次，你可令一名体力上限大于1的其他角色减少1点体力上限并获得“平定”标记，然后你减少1点体力上限。②你对拥有“平定”标记的角色使用牌没有距离限制。',
			scfuhai:'覆海',
			scfuhai_info:'锁定技。①当你使用牌指定目标后，若目标角色有“平定”标记，则其不可响应此牌。若你本回合内以此法得到的牌数小于2，则你摸一张牌。②拥有“平定”标记的角色死亡时，你增加X点体力上限并摸X张牌。（X为其拥有的“平定”标记数）。',
			pinghe:'冯河',
			pinghe_info:'锁定技。①你的手牌上限基数等于你已损失的体力值。②当你受到其他角色造成的伤害时，若你有牌且你的体力上限大于1，则你防止此伤害，减一点体力上限并将一张手牌交给一名其他角色。然后若你拥有〖英霸〗，则伤害来源获得一个“平定”标记。',
			shen_jiangwei:'神姜维',
			jiufa:'九伐',
			jiufa_info:'①当你声明使用牌后或打出牌时，你记录此牌的牌名。②当你使用或打出的牌结算结束后，若你的〖九伐〗记录中包含至少⑨种不同的牌名，则你可以展示牌堆顶的⑨张牌，选择并获得其中任意张点数各不相同且{这九张牌中存在未被选择且和已选择的牌点数相同}的牌，清除所有的记录，将其余牌置入弃牌堆。',
			tianren:'天任',
			tianren_info:'锁定技。①当有一张基本牌或普通锦囊牌不因使用而进入弃牌堆后，你获得一枚“天任”标记。②当你获得“天任”标记或体力上限变化后，若你的“天任”数不小于X，则你移去X枚“天任”，加1点体力上限并摸两张牌（X为你的体力上限）。',
			pingxiang:'平襄',
			pingxiang_info:'限定技。出牌阶段，若你的体力上限大于⑨，则你可减⑨点体力上限，视为使用至多⑨张火【杀】，然后失去〖九伐〗，并将手牌上限基数改为体力上限直到游戏结束。',
			shen_sunquan:'神孙权',
			dili:'帝力',
			dili_info:'锁定技。游戏开始时，你随机获得一条<span style="font-family: yuanli">东吴命运线</span>。',
			yuheng:'驭衡',
			yuheng_info:'①出牌阶段限一次。你可以失去所有不为〖驭衡〗的非锁定技，然后随机获得全部<span style="font-family: yuanli">东吴命运线</span>涉及的一个技能。若你本阶段内没有发动过其他非锁定技，则你随机获得当前<span style="font-family: yuanli">东吴命运线</span>涉及的一个内容。②出牌阶段结束时，若你未于本阶段内发动过〖驭衡①〗，则你失去1点体力。',
			yuheng_append:'<span style="font-family: yuanli">天下英雄谁敌手？曹刘。生子当如孙仲谋！</span>',
			dili_shengzhi:'圣质',
			dili_shengzhi_info:'锁定技。若你因〖驭衡〗获得过〖英魂〗〖弘德〗〖秉壹〗，则当你使用点数为质数的牌时，此牌不可被响应。',
			dili_chigang:'持纲',
			dili_chigang_info:'锁定技。若你因〖驭衡〗获得过〖观微〗〖弼政〗〖安国〗，则当你的判定阶段开始前，你跳过此阶段并获得一个额外的摸牌阶段。',
			dili_qionglan:'穹览',
			dili_qionglan_info:'锁定技，限定技。若你因〖驭衡〗获得过〖涉猎〗〖问卦〗〖博图〗，则当你发动的〖驭衡〗结算结束后，你随机获得两条其他<span style="font-family: yuanli">东吴命运线</span>。',
			dili_quandao:'权道',
			dili_quandao_info:'锁定技。若你因〖驭衡〗获得过〖制衡〗〖诫训〗〖安恤〗，则你手牌区内点数为字母的牌的牌名视为【调剂盐梅】。',
			dili_jiaohui:'交辉',
			dili_jiaohui_info:'锁定技。若你因〖驭衡〗获得过〖下书〗〖结姻〗〖缔盟〗，且你的手牌数为1，则此牌的牌名视为【远交近攻】。',
			dili_yuanlv:'渊虑',
			dili_yuanlv_info:'锁定技。若你因〖驭衡〗获得过〖观潮〗〖决堰〗〖澜江〗，则当你成为自己使用的不为【长安大舰】的装备牌的目标后，你将此牌置于弃牌堆，然后使用一张与此装备牌副类别相同的【长安大舰】。',
			changandajian_equip1:'长安大舰',
			changandajian_equip2:'长安大舰',
			changandajian_equip3:'长安大舰',
			changandajian_equip4:'长安大舰',
			changandajian_equip5:'长安大舰',
			changandajian_equip6:'长安大舰',
			changandajian_destroy:'长安大舰',
			changandajian_equip1_info:'锁定技。当你失去装备区内的【长安大舰】后，你销毁之。然后你选择场上的一张牌。若此牌点数为字母，则你获得之，否则弃置之。',
			changandajian_equip2_info:'锁定技。当你失去装备区内的【长安大舰】后，你销毁之并回复1点体力。然后你选择场上的一张牌。若此牌点数为字母，则你获得之，否则弃置之。',
			changandajian_equip3_info:'锁定技。其他角色至你的距离+2。当你失去装备区内的【长安大舰】后，你销毁之。然后你选择场上的一张牌。若此牌点数为字母，则你获得之，否则弃置之。',
			changandajian_equip4_info:'锁定技。你至其他角色的距离-2。当你失去装备区内的【长安大舰】后，你销毁之。然后你选择场上的一张牌。若此牌点数为字母，则你获得之，否则弃置之。',
			changandajian_equip5_info:'锁定技。你的手牌上限+2。当你失去装备区内的【长安大舰】后，你销毁之。然后你选择场上的一张牌。若此牌点数为字母，则你获得之，否则弃置之。',
			changandajian_equip6_info:'锁定技。你至其他角色的距离-2，其他角色至你的距离+2。当你失去装备区内的【长安大舰】后，你销毁之。然后你选择场上的一张牌。若此牌点数为字母，则你获得之，否则弃置之。',
			shen_machao:'神马超',
			shouli:'狩骊',
			shouli_backup:'狩骊',
			shouli_info:'①游戏开始时，你令场上所有角色从你的下家起，依次使用牌堆中的一张不为赠物的坐骑牌。②你可以将场上的一张进攻坐骑牌当做【杀】（无任何次数限制），防御坐骑牌当做【闪】使用或打出。若此坐骑牌的拥有者不为你，则其非锁定技于本回合内失效。且当你或其于本回合内受到伤害时，此伤害+1且改为雷属性。',
			hengwu:'横骛',
			hengwu_info:'当你使用或打出有花色的牌时，若你的手牌区内没有与此牌花色相同的牌，则你可以摸X张牌（X为场上装备区内花色与此牌相同的牌数）。',
			hengwu_append:'<span style="font-family: yuanli">棘手，怀念，摧毁！</span>',
			
			key_kagari:'篝',
			kagari_zongsi:'纵丝',
			kagari_zongsi_info:'出牌阶段限一次，你可以选择一张不在游戏外的牌，然后将其置于牌堆/弃牌堆的顶部/底部或一名角色的对应区域内。',
			key_shiki:'神山识',
			key_shiki_ab:'神山识',
			shiki_omusubi:'御结',
			shiki_omusubi_info:'一轮游戏开始时，你可以减1点体力上限，然后将一名其他角色武将牌上的技能加入到你的武将牌上。',
			shiki_omusubi_append:'<span style="font-family: yuanli">来吧，羽依里。用你的手，让我变成那只真正的鬼吧！</span>',
			db_key_hina:'佐藤雏',
			hina_shenshi:'神视',
			hina_shenshi_yingbian:'神视',
			hina_shenshi_info:'神势力技。出牌阶段开始时/结束时，你可摸两张牌，然后将其中一张牌置于牌堆顶。你以此法得到的牌视为拥有全部应变效果，且可以无条件发动。',
			hina_xingzhi:'幸凪',
			hina_xingzhi_info:'键势力技。每回合限一次，你可以通过“助战”触发一张牌的全部应变效果，且响应助战的角色摸两张牌。',
			tw_shen_guanyu:'TW神关羽',
			twwushen:'武神',
			twwushen_info:'锁定技。①你的♥手牌均视为普【杀】。②你于每阶段使用的第一张【杀】不可被响应。③你使用♥【杀】无距离和次数限制。④当你使用♥【杀】选择目标后，你令所有拥有“梦魇”标记的角色均成为此【杀】的目标。',
			twwuhun:'武魂',
			twwuhun_info:'锁定技。①当你受到其他角色造成的1点伤害后，你令伤害来源获得1枚“梦魇”标记。②当你对有“梦魇”标记的其他角色造成伤害后，你令其获得一枚“梦魇”标记。③当你死亡时，你可进行判定。若结果不为【桃】或【桃园结义】，则你选择至少一名拥有“梦魇”标记的角色。令这些角色各自失去X点体力（X为其“梦魇”标记数）。',
			shen_zhangfei:'神张飞',
			shencai:'神裁',
			shencai_info:'出牌阶段限一次，你可以令一名其他角色进行判定。你获得此判定牌，然后若此判定牌：包含以下要素中的任意一个，则其失去已有的下列效果，并获得对应的效果：{⒈体力：当其受到伤害后，其失去等量的体力、⒉武器：其不能使用牌响应【杀】、⒊打出：当其失去手牌后，其再随机弃置一张手牌（不嵌套触发）、⒋距离：其的结束阶段开始时，其翻面}；若均不包含，你获得其区域里的一张牌，其获得一枚“死”并获得如下效果：其的角色手牌上限-X、其的回合结束时，若X大于场上存活人数，则其死亡（X为其“死”标记数）。',
			xunshi:'巡使',
			xunshi_info:'锁定技。①你手牌区内所有的多目标锦囊牌均视为花色为none的普【杀】。②你使用颜色为none的牌无距离和次数限制。③当你使用无颜色的牌选择目标后，你令你的〖神裁〗的发动次数上限+1（至多为5），然后可以为此牌增加任意个目标。',
			shen_zhangjiao:'神张角',
			yizhao:'异兆',
			yizhao_info:'锁定技。当你使用或打出牌时，你获得等同于此牌点数枚“黄”标记。然后若“黄”的十位数发生变化，你获得牌堆中一张点数为你“黄”的十位数的牌。',
			sijun:'肆军',
			sijun_info:'准备阶段，若“黄”数大于牌堆的牌数，你可以移去所有“黄”并洗牌，然后随机获得任意张点数之和为36的牌。',
			sanshou:'三首',
			sanshou_info:'当你受到伤害时，你可以亮出牌堆顶三张牌。若其中有本回合未被使用过的牌的类型，防止此伤害。',
			tianjie:'天劫',
			tianjie_info:'一名角色的回合结束时，若本回合牌堆洗过牌，你可以选择至多三名其他角色。你依次对每名目标角色造成X点雷电伤害（X为其手牌中【闪】的数量，至少为1）。',
			tw_shen_lvmeng: 'TW神吕蒙',
			twshelie:'涉猎',
			twshelie_info:'①摸牌阶段，你可放弃摸牌并亮出牌堆顶的五张牌，然后选择获得其中每种花色的牌各一张。②每轮限一次。结束阶段，若你本回合使用的花色数不小于你的体力值，你执行一个额外的摸牌阶段或出牌阶段。',
			twgongxin:'攻心',
			twgongxin2:'攻心',
			twgongxin_info:'出牌阶段限一次。你可以观看一名其他角色的手牌，然后你可以展示其中一张牌并选择一项：1.弃置此牌；2.将此牌置于牌堆顶。若该角色手牌中的花色数因此减少，你选择一种颜色，其于本回合不能使用或打出该颜色的牌。',
			shen_dengai:'神邓艾',
			dctuoyu:'拓域',
			dctuoyu_fengtian:'丰田',
			dctuoyu_qingqu:'清渠',
			dctuoyu_junshan:'峻山',
			dctuoyu_fengtian_tag:'<span data-nature="woodmm">丰田</span>',
			dctuoyu_qingqu_tag:'<span data-nature="watermm">清渠</span>',
			dctuoyu_junshan_tag:'<span data-nature="thundermm">峻山</span>',
			dctuoyu_info:'①锁定技。当你使用拥有对应副区域标签的牌时，你令此牌获得对应效果。<br>丰田：伤害值或回复值+1；清渠：无次数和距离限制；峻山：不可被响应。②出牌阶段开始时和结束时，你给你的手牌分配对应的已激活副区域标签（每个区域至多五张）。',
			dcxianjin:'险进',
			dcxianjin_info:'锁定技。当你造成或受到伤害后，若这是你本局游戏内第偶数次造成或受到伤害，则你激活一个副区域标签并摸X张牌（X为你已激活的副区域数，若你的手牌数为全场最多则改为摸一张牌）。',
			dcqijing:'奇径',
			dcqijing_info:'觉醒技。一名角色的回合结束后，若你的三个副区域标签均被激活，则你减1点体力上限，将座位移动至一名其他角色的上家之后，获得〖摧心〗和一个额外回合。',
			dccuixin:'摧心',
			dccuixin_info:'当你不因此技能使用的基本牌或普通锦囊牌结算结束后，若此牌的目标包含你的上家或下家，则你可以视为对下家或上家再使用一张牌名和元素相同的牌。',
			shen_dianwei:'神典韦',
			juanjia:'捐甲',
			juanjia_info:'锁定技。游戏开始时，你废除一个防具栏，然后获得一个额外的武器栏。',
			qiexie:'挈挟',
			qiexie_info:'锁定技。准备阶段，你在剩余武将牌堆中随机观看五张牌，选择其中的任意张，将其按照如下规则转化为武器牌置入你的武器栏：{⒈此牌不具有花色，且其攻击范围和点数等于此武将牌的体力上限。⒉此武器牌的技能为该武将牌上所有描述中包含“【杀】”且不具有锁定技以外的标签的技能。⒊此武器牌离开你的装备区时，改为放回武将牌堆。}',
			cuijue:'摧决',
			cuijue_info:'每回合每名角色限一次。出牌阶段，你可以弃置一张牌，然后对攻击范围内距离最远的一名其他角色造成1点伤害。',
			junkyuheng:'驭衡',
			junkyuheng_info:'锁定技。①回合开始时，你须弃置任意张花色不同的牌，从<span style="font-family: yuanli">东吴命运线·改</span>中随机获得等量的技能。②回合结束时，你失去所有因〖驭衡①〗获得的技能，然后摸等量的牌。',
			junkdili:'帝力',
			junkdili_info:'觉醒技。当你发动〖驭衡①〗后，若你拥有的技能数大于你的体力上限，则你减1点体力上限，选择失去任意个其他技能，然后获得以下技能中的前等量个：〖圣质〗/〖权道〗/〖持纲〗。',
			junkshengzhi:'圣质',
			junkshengzhi_info:'锁定技。当你发动非锁定技后，你令你本回合使用的下一张牌无距离和次数限制。',
			junkquandao:'权道',
			junkquandao_info:'锁定技。当你使用【杀】或普通锦囊牌时，若你手牌中的【杀】或普通锦囊牌的数量之差X不为0，则你弃置X张数量较多的一种牌，然后你摸一张牌。',
			junkchigang:'持纲',
			junkchigang_info:'转换技，锁定技。判定阶段开始前，你取消此阶段。然后你获得一个额外的：阴，摸牌阶段；阳，出牌阶段。',
			//shen_old_huatuo:'旧神华佗',
			//shen_old_huatuo_ab:'神华佗',
			mbwuling:'五灵',
			mbwuling_info:'出牌阶段限两次，你可以选择一名未拥有“五灵”标记的角色，按照你选择的顺序向其传授“五禽戏”。拥有“五灵”标记的角色拥有你选择的效果，并在准备阶段切换为下一种。',
			mbyouyi:'游医',
			mbyouyi_info:'弃牌阶段结束时，你可以将此阶段弃置的牌置入“仁”区。出牌阶段限一次，你可以弃置所有“仁”区的牌，令所有角色回复1点体力。',
			'mbwuling_虎灵':'若你使用的牌仅指定唯一目标，则此牌对目标角色造成伤害时此伤害+1。',
			'mbwuling_鹿灵':'你获得“鹿灵”标记时，回复1点体力，移除判定区所有牌。你不能成为延时锦囊目标。',
			'mbwuling_猿灵':'你获得“猿”标记时，选择一名其他角色，获得其装备区里的一张牌。',
			'mbwuling_熊灵':'每回合限一次，你受到伤害时，此伤害-1。',
			'mbwuling_鹤灵':'你获得“鹤”标记时，摸三张牌。',
			mbwuling_content:'关于标记',
			mbwuling_content_info:function(){
			  //刷新技能描述的特殊办法
			  window.mbwuling_content_load=function(){
				if(lib.translate&&lib.translate['mbwuling_content_info']) {
				var aniallist=['虎','鹿','熊','猿','鹤'];
				var str='';
				for(var i=0;i<aniallist.length;i++) {
					var name=aniallist[i];
					str+='<li>'+name+'：'+lib.translate['mbwuling_'+name+'灵']+'<br><br>';
				}
				lib.translate['mbwuling_content_info']=str;
				}else {
				  setTimeout(function(){
				    window.mbwuling_content_load();
			      },2000);
				}
				//return str;
			  }
			  window.mbwuling_content_load();
			  return '正在加载中...';
			}(),
			shen_jiaxu:'神贾诩',
			shen_jiaxu_die:'亡魂',
			jxlianpo:'炼魄',
			jxlianpo_info:'锁定技。①若场上最大阵营为：反贼，其他角色的手牌上限-1，所有角色使用【杀】的次数上限和攻击范围+1；主忠，其他角色不能对其以外的角色使用【桃】。其他角色死亡后，若有多个最大阵营，来源摸两张牌并回复1点体力。②一轮游戏开始时，你展示一张未加入游戏或已死亡角色的身份牌，本轮视为该身份对应阵营的角色数+1。',
			jxzhaoluan:'兆乱',
			jxzhaoluan_info:'限定技。一名角色死亡前，若其此次进入过濒死状态，你可以取消之，令其加3点体力上限并失去所有非锁定技，回复体力至3点，摸四张牌。然后你获得如下效果：出牌阶段，你可以令一名成为过你〖兆乱〗目标的角色减1点体力上限，然后对一名此阶段未以此法选择过的角色造成1点伤害。',
			jxzhaoluan_effect:'兆乱',
			jxzhaoluan_effect_info:'出牌阶段，你可以令一名成为过你〖兆乱〗目标的角色减1点体力上限，然后对一名此阶段未以此法选择过的角色造成1点伤害。',
			shen_huatuo:'神华佗',
			wuling:'五灵',
			wuling_info:'①出牌阶段限两次。你可以选择一名没有“五禽戏”的角色，按照你选择的顺序向其传授“五禽戏”，且其获得如下效果：其获得你选择的第一种“五禽戏”的效果，并在其每个准备阶段移除当前“五禽戏”的效果并切换为下一种。②当你死亡时，你令场上的角色失去你传授的“五禽戏”。',
			wuling_wuqinxi:'五禽戏',
			wuling_wuqinxi_info:'<br><li>“五禽戏”分为“虎、鹿、熊、猿、鹤”五个不同的效果：'+
			'<br><li>虎：当你使用指定唯一目标的牌对目标角色造成伤害时，此伤害+1。'+
			'<br><li>鹿：①当你获得此效果时，你回复1点体力并弃置判定区的所有牌。②你不能成为延时锦囊牌的目标。'+
			'<br><li>熊：每回合限一次，当你受到伤害时，此伤害-1。'+
			'<br><li>猿：当你获得此效果时，你选择一名其他角色，获得其装备区里的一张牌。'+
			'<br><li>鹤：当你获得此效果时，你摸三张牌。',
			youyi:'游医',
			youyi_info:'①弃牌阶段结束时，你可以将所有于此阶段弃置的牌置入仁区。②出牌阶段限一次。你可以将仁区的所有牌置入弃牌堆，令所有角色各回复1点体力。',
			shen_xuzhu:'神许褚',
			zhengqing:'争擎',
			zhengqing_info:'锁定技，每轮结束时，移去所有“擎”标记，然后本轮单回合内造成伤害最多的角色获得X枚“擎”标记并与你各摸一张牌（X为其该回合造成的伤害数）。若是你获得“擎”且是获得数量最多的一次，你改为摸X张牌（至多摸五张）。',
			zhuangpo:'壮魄',
			zhuangpo_info:'你可以将一张牌面信息中有“杀”的牌当【决斗】使用。若你有“擎”，此【决斗】指定目标后，你可以移去任意枚“擎”，然后令其弃置等量的牌；若此【决斗】指定有“擎”的角色为目标，此牌伤害+1。',
			shen_lusu:'神鲁肃',
			dingzhou:'定州',
			dingzhou_info:'出牌阶段限一次。你可以交给一名角色X张牌，然后你获得其装备区和判定区里的所有牌（X为其装备区与判定区里的牌数之和）。',
			tamo:'榻谟',
			tamo_info:'游戏开始时，你可以重新分配除主公外所有角色的座次。',
			zhimeng:'智盟',
			zhimeng_info:'回合结束后，你可以与一名其他角色将各自所有手牌置于处理区，然后你随机获得这些牌中的一半（向上取整），其获得剩余的牌。',
			shen_nebula:'赫拉西斯',
			helasisy_lock:'彩蛋角色',
			helasisy_lock_info:'恭喜你发现本作专属彩蛋，在「如真似幻」登陆页面输入密码“召唤赫拉西斯”或“召唤星云”即可解锁角色赫拉西斯。（账号可随意输入）',
			hlss_xiangxing:'禳星',
			hlss_xiangxing_info:'锁定技，游戏开始时，你获得3枚星；你的体力值始终为满；每当你累计扣减3点体力，你失去一枚星，并造成3点雷属性伤害，随机分配给其他角色；当你失去全部星后，你失去此技能。',
			hlss_yueyin:'隐月',
			hlss_yueyin_info:'锁定技，你的武将牌始终正面向上，你的判定区内的牌效果反转，你受到的伤害+1；你的每一枚星对应的一个特定条件，当你失去星时，若满足此条件，则不造成伤害。',
			hlss_yueyin2:'隐月',
			hlss_yueyin_content:'关于条件',
			hlss_yueyin_content_info:'<li>当你拥有3枚星时，条件是“此阶段内受到过雷属性伤害”；<li>当你拥有2枚星时，条件是“此阶段内受到过火属性伤害”；<li>当你拥有1枚星时，条件是“此阶段内受到过锦囊牌伤害”。',
			hlss_xiangxing3_info:'此阶段内受到过雷属性伤害。',
			hlss_xiangxing2_info:'此阶段内受到过火属性伤害。',
			hlss_xiangxing1_info:'此阶段内受到过锦囊牌伤害。',
			hlss_gaiming:'改命',
			hlss_gaiming_info:'锁定技，在你的判定牌生效前，你观看牌堆顶的7张牌并选择一张作为判定结果，此结果不可更改。',
			hlss_jifeng:'祭风',
			hlss_jifeng_info:'准备阶段，你可以视为使用任意一张记录不超过1次的普通锦囊牌，然后你记录一次此牌名，当你第二次记录此牌时，你失去1点体力，然后你不能成为其他角色使用同名牌的目标。',
			hlss_fengqi:'起风',
			hlss_fengqi_info:'准备阶段，你可以视为使用任意一张本局游戏内未以此法使用过的普通锦囊牌。',
			shen_kk:'群主Κ',
			kk_lock:'彩蛋角色',
			kk_lock_info:'恭喜你发现本作专属彩蛋，在游戏控制台输入指令“我要玩原神”即可解锁角色群主Κ。',
			kk_yuanshen:'原神',
			kk_yuanshen_content:'关于原神',
			kk_yuanshen_content_info:'「原神」玩家具有以下效果：①不能对其他角色使用除【杀】以外的牌。②结束阶段时，若你拥有〖米游〗，则回复1点体力并摸一张牌；否则，须随机交给一名拥有〖米游〗的角色一张手牌，若之后你没有手牌，则卸载「原神」。③卸载「原神」后，立即失去2点体力。',
			//kk_yuanshen_content_info:'拥有“原神”标记的角色在准备阶段或使用牌指定其他拥有【米游】技能的角色为目标时，移除自己的“原神”标记；一名角色失去“原神”标记后，须弃置三张牌然后失去1点体力。',
			kk_qidong:'启动',
			kk_qidong_info:'限定技，出牌阶段，你可以选择场上所有其他角色。对于每个角色：若其已安装「原神」，你随机获得其两张牌；否则，你令其摸一张牌并安装「原神」。当场上有角色因「原神」的效果死亡时，你重置此技能。',
			kk_aiwan:'爱玩',
			kk_aiwan_info:'出牌阶段限一次，你可以选择一名已安装「原神」的角色，令其卸载「原神」。若其因此死亡，你可以立即再次发动此技能。',
			kk_miyou:'米游',
			kk_miyou_info:'准备阶段，你可以弃置两张手牌并选择至多两名角色，令其选择以下一项执行：①安装「原神」；②弃置两张手牌并失去1点体力。',
			
			dc_shen_huatuo: "神华佗",
        	jingyu: "静域",
        	jingyu_info: "锁定技。每个技能每轮限一次，当一名角色发动不为〖静域〗的技能时，你摸一张牌。",
        	lvxin: "滤心",
        	lvxin_info: "出牌阶段限一次。你可以交给一名其他角色一张手牌并选择一项：⒈令其摸X张牌；⒉令其随机弃置X张手牌（X为游戏轮数，至多为5）。然后若其以此法得到/弃置了与你交给其的牌牌名相同的牌，其于其下次发动技能时回复/失去1点体力。",
        	huandao: "寰道",
        	huandao_info: "限定技。出牌阶段，你可以选择一名其他角色。你令其复原武将牌，系统随机生成一个与其同名的武将的武将牌上的一个与其拥有的技能均不同名的技能。其可以选择获得此技能，然后选择失去一个其他技能。",
        	new_shen_simayi: "应天神司马懿",
	        new_shen_simayi_ab: "神司马懿",
	        xin_shen_simayi: "极略神司马懿",
	        xin_shen_simayi_ab: "神司马懿",
	        jilin: "戢鳞",
        	jilin_info: "①游戏开始时，你将牌堆顶两张牌暗置于你的武将牌上，称为“志”。②当你成为其他角色使用牌的目标时，你可以明置一张暗置的“志”令此牌对你无效。③回合开始时，你可用任意张手牌替换等量暗置的“志”。",
        	//太幽默了我超
        	jilin_info_doudizhu: "①游戏开始时，你将牌堆顶一张牌暗置于你的武将牌上，称为“志”。②当你成为其他角色使用牌的目标时，你可以明置一张暗置的“志”令此牌对你无效。③回合开始时，你可用任意张手牌替换等量暗置的“志”。",
        	yingyou: "英猷",
        	yingyou_info: "①出牌阶段开始时，你可明置一张“志”然后摸X张牌（X为明置的“志”的数量）。②当你失去与明置的“志”其中一张花色相同的牌时，你摸一张牌。",
        	yingtian: "应天",
        	yingtian_info: "觉醒技。一名角色死亡后，若场上势力数不大于2，则你获得〖鬼才〗、〖完杀〗、〖连破〗并失去〖英猷〗且你本局游戏使用牌没有距离限制。",
        	xinrenjie: "忍戒",
            xinrenjie_info: "锁定技，当你需要响应其他角色的一张牌时，若你未响应此牌，你获得1枚“忍”标记（你每轮以此法至多获得4枚“忍”标记）。",
            xinbaiyin: "拜印",
            xinbaiyin_info: "觉醒技，准备阶段，若你的“忍”标记数不小于4，你减少1点体力上限，然后获得〖极略〗。",
            xinlianpo: "连破",
            xinlianpo_info: "当你杀死一名角色后，你可以选择一项：1.于此回合结束后获得一个额外回合；2.若你拥有〖极略〗，你获得一个你未拥有的〖极略〗技能。",
            xinjilve: "极略",
            xinjilve_info: "①当你获得此技能时，你获得〖鬼才〗并根据你的势力获得以下对应技能：魏：〖放逐〗；蜀：〖集智〗；吴：〖制衡〗；群：〖完杀〗。②出牌阶段开始时，你可以选择一项：1.弃置X枚“忍”标记并获得一个你未拥有的〖极略〗技能（X为你选择此项的次数+1）；2.弃置至多3枚“忍”标记并摸等量张牌。",
            dc_shen_huangzhong: '神黄忠',
			dcyiwu: '毅武',//寄咯~
			dclieqiong: '裂穹',
			dclieqiong_info: '当你对一名其他角色造成伤害后，你可以在任意部位中选择一个“击伤”；若你击伤了一名角色，则本回合再次击伤该角色时出现“天冲”选项。可选择被击伤的部位：<br>天冲：令其失去当前体力值数的体力，若其因此死亡，你加1点体力上限。<br>力烽：令其随机弃置半数手牌（向上取整）。<br>地机：令其下一次受到的伤害+1直到其回合结束。<br>中枢：令其使用的下一张牌无效直到其回合结束。<br>气海：令其不能使用或打出红桃牌直到其回合结束。',
			dcchiren: '赤刃',//寄咯~
			dczhanjue: '斩决',
			dczhanjue_info: '出牌阶段开始时，你可以选择一项：1.摸体力值张牌，此阶段使用的下一张【杀】无距离限制且不能被响应。2.摸已损失体力值张牌，此阶段下一次造成伤害后，回复等量体力。',
            shen_pangtong: "神庞统",
            luansuo: "鸾锁",
			luansuo_info: "锁定技，你的回合内，所有角色不能弃置手牌且当前手牌与本回合进入弃牌堆的牌花色均不同的牌视为【铁索连环】。",
			fengliao: "凤燎",
			fengliao_info: "锁定技，转换技，你使用牌指定唯一目标后，阳：你令其摸一张牌；阴：你对其造成1点火焰伤害。",
			kunyu: "鹍浴",
			kunyu_info: "锁定技，①你的体力上限始终为1；②当你濒死求桃结束后，若你未脱离濒死状态，你随机将牌堆中的一张火属性伤害牌永久移出游戏，然后防止死亡并将体力回复至1点。",
			shen_zhonghui: "神钟会",
			dclinjie: "凛界",
        	dclinjie_info: "每轮开始时，你可对一名没有「凛」的角色造成1点伤害然后令其获得1个「凛」标记。有「凛」的其他角色受到伤害后，随机弃置一张手牌。若其因此弃置了最后一张手牌，你对其造成1点伤害并移去「凛」。",
        	dcduzhang: "独仗",
        	dcduzhang_info: "每回合限一次，当你使用黑色牌指定唯一目标或成为黑色牌的唯一目标后，你摸一张牌并获得1个「凛」。你的手牌上限+X（X为「凛」的数量）。",
        	dcjianghuo: "降祸",
        	dcjianghuo_info: "觉醒技，回合开始时，若所有角色均受到过伤害，你将所有「凛」移动到自己的武将牌上，并摸与「凛」等量的牌，然后增加1点体力上限，失去〖凛界〗，获得〖立世〗。",
        	dclishi: "立世",
        	dclishi_info: "锁定技，结束阶段，若你没有「凛」，你受到1点雷电伤害；若你有「凛」，你失去任意个「凛」并选择等量选项令所有其他角色执行：1.下个准备和结束阶段非锁定技失效；2.下个判定阶段在【闪电】、【乐不思蜀】和【兵粮寸断】中选择两个并依次进行判定，3.下个摸牌阶段摸到的牌若颜色相同，则全部弃置，4.下个出牌阶段每种类型的牌仅能使用一张，5.下个弃牌阶段弃置的牌改为被你获得。",
	        
	        shen_huangyueying: "神黄月英",
        	shen_huangyueying_prefix: "神",
        	zc26_cangqiao: "藏巧",
        	zc26_cangqiao_info: "每轮开始时，你可以获得游戏外或弃牌堆中的【折戟】、【女装】、【驽马】各至多一张；你使用上述牌时可以将手牌摸至体力上限。",
        	zc26_shenxie: "神械",
        	zc26_shenxie_info: "每回合限一次，以你为唯一目标的黑色牌结算后，你可以将场上一张装备牌当未以此法使用过的延时锦囊牌使用（均使用过后重置）；此类锦囊牌在判定区内同时又被转化的装备牌的效果。",
        	zc26_huaxiu: "化朽",
        	zc26_huaxiu_info: "出牌阶段限一次，你可以将一种“藏巧”装备牌效果修改为下述对应顺序的牌直到下回合开始：【魂·诸葛连弩】、【魂·八卦阵】、【軨軨】。",
        	zc26_zhuge: "魂·诸葛连弩",
        	zc26_zhuge_info: "你使用【杀】无次数限制且指定目标后，你可以令任意名死亡角色依次观看目标手牌并可以重铸其中一张牌。",
        	zc26_zhuge_skill: "魂·诸葛连弩",
        	zc26_zhuge_skill_info: "你使用【杀】无次数限制且指定目标后，你可以令任意名死亡角色依次观看目标手牌并可以重铸其中一张牌。",
        	zc26_bagua: "魂·八卦阵",
        	zc26_bagua_info: "当你需要使用或打出【闪】时，你可以进行一次判定，若结果为红色，视为使用或打出之；判定前你可以令一名死亡角色卜算3。",
        	zc26_bagua_skill: "魂·八卦阵",
        	zc26_bagua_skill_info: "当你需要使用或打出【闪】时，你可以进行一次判定，若结果为红色，视为使用或打出之；判定前你可以令一名死亡角色卜算3。",
        	zc26_lingling: "軨軨",
        	zc26_lingling_info: "准备阶段，你须对一名角色造成1点雷电伤害；每轮结束时，所有死亡角色同时秘密选择上家或下家，然后按顺序（死亡由前到后）依次移动此牌至选择的角色对应区域内。",
        	zc26_lingling_skill: "軨軨",
        	zc26_lingling_skill_info: "准备阶段，你须对一名角色造成1点雷电伤害；每轮结束时，所有死亡角色同时秘密选择上家或下家，然后按顺序（死亡由前到后）依次移动此牌至选择的角色对应区域内。",
	        
	        zc26_zhuge_card: "魂·连弩",
        	zc26_zhuge_card_info: "你使用【杀】无次数限制且指定目标后，你可以令任意名死亡角色依次观看目标手牌并可以重铸其中一张牌。",
        	zc26_bagua_card: "魂·八卦",
        	zc26_bagua_card_info: "当你需要使用或打出【闪】时，你可以进行一次判定，若结果为红色，视为使用或打出之；判定前你可以令一名死亡角色卜算3。",
        	zc26_lingling_card: "軨軨",
        	zc26_lingling_card_info: "准备阶段，你须对一名角色造成1点雷电伤害；每轮结束时，所有死亡角色同时秘密选择上家或下家，然后按顺序（死亡由前到后）依次移动此牌至选择的角色对应区域内。",
        	
	        _gifting:'赠予',
			_gifting_info:'出牌阶段，你可将一张拥有“赠”标签的手牌区装备牌置于一名其他角色的装备区内，或将一张拥有“赠”标签的手牌区非装备牌正面朝上交给一名其他角色。',
		

			
			extra_feng:'神话再临·风',
			extra_huo:'神话再临·火',
			extra_lin:'神话再临·林',
			extra_shan:'神话再临·山',
			extra_yin:'神话再临·阴',
			extra_lei:'神话再临·雷',
			extra_key:'论外',
			extra_ol:'神话再临OL',
			extra_mobileren:'始计篇·仁',
			extra_mobilezhi:'始计篇·智',
			extra_mobilexin:'始计篇·信',
			extra_offline:'神话再临·线下',
			extra_decade:'神·武',
			extra_tw:'海外服神将',
			extra_mb: "移动版神将",
			extra_liuli:'琉璃版专属',
		},
	};
});
