game.import("extension", function(lib, game, ui, get, ai, _status) {
    //默认修复模式自动开启
    if(!localStorage.getItem('liuli_tenUIfix')) {
        localStorage.setItem('liuli_tenUIfix','fix');
    }
    //默认疾速模式自动开启
    if(!localStorage.getItem('finalParsex')) {
        game.saveConfig('finalParsex',true);
        localStorage.setItem('finalParsex','old');
    }
    //如真黑色背景过渡啦
    window.turnToDark=function(time,out) {
        var ss=time?time:0.5;
        if(out) {
            if(!window.darkRZ) return;
            window.darkRZ.style.transition='all '+ss+'s ease-out';
            setTimeout(function(){
                window.darkRZ.style.opacity=0;
            },0);
            return false;
        }
        window.darkRZ=ui.create.div('.background');
        window.darkRZ.setBackgroundImage('extension/如真似幻/images/dark.jpg');
        //window.darkRZ=ui.create.node('img');
        //window.darkRZ.src=  lib.assetURL + 'extension/如真似幻/images/dark.jpg';
        window.darkRZ.style.opacity=0;
        window.darkRZ.style.zIndex=100;
        document.body.appendChild(window.darkRZ);
        window.darkRZ.style.width='100%';
        window.darkRZ.style.height='100%';
        window.darkRZ.style.top='0';
        window.darkRZ.style.left='0';
        window.darkRZ.style.transition='all '+ss+'s ease-out';
        setTimeout(function(){
            window.darkRZ.style.opacity=1;
        },0);
        return true;
    };
    //官阶翻译
    window.guanjies=['shibing','shifuzhang','baifuzhang','qianfuzhang','xiaowei','xianfengjiangjun','zhongjunjiangjun','lingjunjiangjun','biaoqijiangjun','dajiangjun','dayuanshuai','taixuhuanjing'];
    window.getNumGuanjie=function(name,num){
        if(num) {
            var str='未知';
            if(window.guanjies[name]) str=window.guanjies[name];
            return str;
        }else {
            return window.guanjies.indexOf(name)+1;
        }
    }
    window.translateGuanjie=function(name){
          var str='未知';
          if(name=='taixuhuanjing') str='太虚幻境';
          if(name=='dayuanshuai') str='大元帅';
          if(name=='dajiangjun') str='大将军';
          if(name=='biaoqijiangjun') str='骠骑将军';
          if(name=='lingjunjiangjun') str='领军将军';
          if(name=='zhongjunjiangjun') str='中军将军';
          if(name=='xianfengjiangjun') str='先锋将军';
          if(name=='xiaowei') str='校尉';
          if(name=='qianfuzhang') str='千夫长';
          if(name=='baifuzhang') str='百夫长';
          if(name=='shifuzhang') str='十夫长';
          if(name=='shibing') str='士兵';
          return str;
      }
    //如真的播放audio（此时游戏的playAudio还未加载）
    window.playAudioRZ=function(){
			//if(_status.video&&arguments[1]!='video') return;
			var str='';
			var onerror=null;
			for(var i=0;i<arguments.length;i++){
				if(typeof arguments[i]==='string'||typeof arguments[i]=='number'){
					str+='/'+arguments[i];
				}
				else if(typeof arguments[i]=='function'){
					onerror=arguments[i]
				}
				//if(_status.video) break;
			}
			/*if(!lib.config.repeat_audio&&_status.skillaudio.contains(str)) return;
			_status.skillaudio.add(str);
			game.addVideo('playAudio',null,str);
			setTimeout(function(){
				_status.skillaudio.remove(str);
			},1000);*/
			//if(!window.tipsAudio||!window.tipsAudioFile||window.tipsAudioFile!=str) {
			    //window.tipsAudioFile=str;
			    window.tipsAudio=document.createElement('audio');
			    window.tipsAudio.autoplay=true;
			    //window.tipsAudio.volume=lib.config.volumn_audio/8;
			    window.tipsAudio.volume=(lib.config.volumn_audio/8)*0.7+0.3*(lib.config.volumn_audio>0?1:0);
			    if(str.split('/').pop().split('.').length>1){
			    	window.tipsAudio.src=lib.assetURL+'audio'+str;
			    }
			    else{
			    	window.tipsAudio.src=lib.assetURL+'audio'+str+'.mp3';
			    }
			    window.tipsAudio.addEventListener('ended',function(){
				    this.remove();
			    });
			    window.tipsAudio.onerror=function(e){
				    if(this._changed){
				    	//window.tipsAudioFile=false;
				    	this.remove();
				    	if(onerror){
					    	onerror(e);
				    	}
				    }
				    else{
					    this.src=lib.assetURL+'audio'+str+'.ogg';
				    	this._changed=true;
				    }
			    };
			//}
			//Some browsers do not support "autoplay", so "oncanplay" listening has been added
			window.tipsAudio.oncanplay=function(){
				Promise.resolve(this.play()).catch(()=>void 0);
			};
			//ui.window.appendChild(audio);
			return window.tipsAudio;
		};
                window.helasisy_getPaiWeiInfo=function(type, zero){
                    var luomaNum=function(num){
                        let list='○ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ';
                        return list[num]||null;
                    };
                    var method = function(num) {
                        if (num < 1) {
                            return ['青铜Ⅲ', 0, 2, 1, 'qingtong'];
                        } else if (num < 6) {
                            const base = num;
                            return ['青铜' + luomaNum(3 - Math.floor(base/2)), (base % 2), 2, 1, 'qingtong'];
                        } else if (num < 18) {
                            const base = num - 6;
                            return ['白银' + luomaNum(3 - Math.floor(base/4)), (base % 4), 4, 2, 'baiyin'];
                        } else if (num < 43) {
                            const base = num - 18;
                            return ['黄金' + luomaNum(5 - Math.floor(base/5)), (base % 5), 5, 3, 'huangjin'];
                        } else if (num < 68) {
                            const base = num - 43;
                            return ['翡翠' + luomaNum(5 - Math.floor(base/5)), (base % 5), 5, 4, 'feicui'];
                        } else if (num < 98) {
                            const base = num - 68;
                            return ['大师' + luomaNum(6 - Math.floor(base/5)), (base % 5), 5, 5, 'dashi'];
                        } else {
                            return ['传说', num - 97, 1000, 6, 'chuanshuo'];
                        }
                    };
                    var jjbond;
                    jjbond = lib.config.tianti_versus_two.xxingnum; //星星数量
                    //if(!zero) jjbond++;
                    var [rankduanname, rankduannum, rankduanlim, ranklevel, tanslation] = method(jjbond); //段位名称，当前星星，星星上限
                    //if (lib.config.tianti_0星)[rankduanname, rankduannum, rankduanlim, ranklevel] = getName_排位 (jjbond + 1);
                    var starList=[0, 6, 18, 43, 68, 98, Infinity];
                    if(type=='name') {
                        return rankduanname;
                    }else if(type=='star') {
                        return rankduannum;
                    }else if(type=='starLim') {
                        return rankduanlim;
                    }else if(type=='level') {
                        return ranklevel;
                    }else if(type=='maxStar') {
                        return starList[ranklevel];
                    }else if(type=='translation') {
                        return tanslation;
                    }else {
                        return [rankduanname, rankduannum, rankduanlim, ranklevel];
                    }
                }
		//排位移出
		window.rzPaiweiNext=function() {
		    var tianti_versus_two=lib.config['tianti_versus_two'];
            var tianti_copy=JSON.parse(JSON.stringify(lib.config['tianti_versus_two']));
            if(tianti_versus_two) {
                var xxingnum0 = tianti_versus_two.xxingnum;
                if(!xxingnum0) var xxingnum0=0;
            }else {
                var xxingnum0=0;
            }
            var zeroStarNum=[0,2,4,6,10,14,18,23,28,33,38,43,48,53,58,63,68,73,78,83,88,98];
            game.storyBgMode='paiwei';
            //game.storyBackground();
            game.saveConfig('rz_paiWeiError',tianti_copy);
            game.saveConfig('rz_isPaiWei',true);
            game.saveConfig('rz_paiWeiTip',true);
            if(window.helasisy_getPaiWeiInfo('level')>1) {
                game.saveConfig('rz_paiWeiCount',tianti_versus_two.count);
                game.rz_paiWeiDec=1;
                tianti_versus_two.count=0;//Math.floor(tianti_versus_two.count/3);
                tianti_versus_two.xxingnum--;
                game.saveConfig('tianti_versus_two',tianti_versus_two);
                /*if(zeroStarNum.contains(tianti_versus_two.xxingnum)) {
                    game.saveConfig('tianti_0星', true);
                }else {
                    game.saveConfig('tianti_0星', false);
                }*/
            }else {
                game.rz_paiWeiDec=0;
            }
		};
		//下一局仍是排位
		if(lib.config.rz_nextIsPaiwei) {
		    game.saveConfig('rz_nextIsPaiwei',false);
		    window.rzPaiweiNext();
		}
		window.jjGradeConfig = {
          "jj_grade_chuanshuo": {
            "frame": {"x":325,"y":932,"w":290,"h":304},
            "rotated": true,
	        "spriteSourceSize": {"x":8,"y":0},
            "sourceSize": {"w":308,"h":325}
          },
          "jj_grade_dashi": {
            "frame": {"x":1414,"y":806,"w":294,"h":285},
            "rotated": true,
	        "spriteSourceSize": {"x":7,"y":21},
            "sourceSize": {"w":308,"h":325}
          },
          "jj_grade_feicui": {
            "frame": {"x":1715,"y":590,"w":289,"h":283},
            "rotated": false,
	        "spriteSourceSize": {"x":10,"y":20},
            "sourceSize": {"w":308,"h":325}
          },
          "jj_grade_huangjin": {
            "frame": {"x":1701,"y":875,"w":285,"h":252},
            "rotated": false,
	        "spriteSourceSize": {"x":11,"y":36},
            "sourceSize": {"w":308,"h":325}
          },
          "jj_grade_baiyin": {
            "frame": {"x":1115,"y":806,"w":297,"h":289},
            "rotated": false,
	        "spriteSourceSize": {"x":4,"y":3},
            "sourceSize": {"w":308,"h":325}
          },
          "jj_grade_qingtong": {
            "frame": {"x":1733,"y":321,"w":267,"h":281},
            "rotated": true,
	        "spriteSourceSize": {"x":21,"y":0},
            "sourceSize": {"w":308,"h":325}
          }
        };
        
        window.createJJGradeElement = function(xxx, scale = 1) {
          const config = jjGradeConfig[`jj_grade_${xxx}`];
          if (!config) return ui.create.div();
        
          // 雪碧图实际尺寸
          const SPRITE_WIDTH = 2015;
          const SPRITE_HEIGHT = 1253;
        
          // 创建容器
          const div = ui.create.div();
          const { frame, rotated, spriteSourceSize, sourceSize } = config;
          function toPercent(num) {
              return (num * -100).toFixed(3) + '%';
          }
          // 设置容器尺寸（应用缩放）
          game.createCss(`.jj_grade_${xxx} {
            overflow: hidden;
            width: ${frame[rotated?'h':'w']*scale}px;
            height: ${frame[rotated?'w':'h']*scale}px;
            background-image: url(${lib.assetURL}extension/如真似幻/images/jj.png);
            background-position: ${-(frame.x*scale)}px ${-(frame.y*scale)}px;
            background-size: ${SPRITE_WIDTH*scale}px ${SPRITE_HEIGHT*scale}px;
            transform: ${rotated?'rotate(-90deg)':''};
            position: absolute;
          }`);
          div.classList.add(`jj_grade_${xxx}`);
        
          return div;
        };
        
        // 使用示例
        //const exampleElement = createJJGradeElement('dianfeng');
        //document.body.appendChild(exampleElement);
        
		//传递一下audio变量
		//var rzaudio=[lib.config.volumn_audio,lib.config.volumn_background];
		sessionStorage.setItem("rzsh_audio",lib.config.volumn_audio);
		sessionStorage.setItem("rzsh_background",lib.config.volumn_background);
		//window.volumn_audio=lib.config.volumn_audio;
		//window.volumn_background=lib.config.volumn_background;
    //window.tipsClickAudio=new Audio('../audio/click.mp3');
		window.tipsClick=function(music){
		    if(!music) {
		        window.playAudioRZ('..','extension','如真似幻','audio','sgs','TinyButton.mp3');
		    }else {
		        window.playAudioRZ('..','extension','如真似幻','audio','sgs',music+'.mp3');
		    }
		    /*if(window.tipsClickAudio) {
		        window.tipsClickAudio.play();
			    return true;
		    }else {
		        alert(false);
		        return false;
		    }*/
		}
		//游戏临时修复代码功能（如真）
    if(lib.config['liulikill_rz_codeFix']&&typeof lib.config['liulikill_rz_codeFix'] == 'object') {
        var codeList=lib.config['liulikill_rz_codeFix'];
        for(var i in codeList) {
            var cds=codeList[i];
            if(cds) cds=eval('('+cds+')');
            if(cds&&typeof cds == 'function') {
                 //var func=cds;
                 try{
                     cds();
                 } catch(err) {
                     game.log('『'+i+'』代码执行出现问题！\n☞错误：'+err);
                     //alert('『'+i+'』代码执行出现问题！\n☞错误：'+err);
                 }
            }
        }
    }else {
        game.saveConfig('liulikill_rz_codeFix',{});
    }
    return {
        name: "如真似幻",
        content: function(config, pack) {
            //再次设置username
            if(localStorage.getItem('loggedIn')) {
                var username=localStorage.getItem('loggedIn');
                game.saveConfig('connect_nickname', username);
                game.saveConfig('connect_nickname', username, 'connect');
                lib.config.connect_nickname=username;
            }else {
                var username='无名玩家';
                game.saveConfig('connect_nickname', username);
                game.saveConfig('connect_nickname', username, 'connect');
                lib.config.connect_nickname=username;
            }
            //屏蔽挑战模式
            /*if(!lib.config.hiddenModePack.contains('boss')) {
                lib.config.hiddenModePack.add('boss');
            }*/
            //屏蔽联机模式
            /*if(!lib.config.hiddenModePack.contains('connect')) {
                lib.config.hiddenModePack.add('connect');
            }*/
            if(!localStorage.getItem('hideModesA')) {
                game.saveConfig('layout','nova');
                lib.init.layout('nova');
                //game.saveConfig('hiddenModePack',lib.config.hiddenModePack);
                //花里胡哨的预设版本
                /*var list=[
                    ['identity','ss1','music_default2'],
                    ['guozhan','20','music_junzheng'],
                    ['versus','13','music_jilve'],
                    ['doudizhu','groups2','music_junzheng'],
                    ['single','6','music_danji'],
                    ['brawl','ss2','music_default3'],
                    ['taixuhuanjing','5','music_lebu'],
                    ['freegame','fun3','music_chongfeng'],
                    ['paiwei','groups2','music_aoshi'],
                ];*/
                //简洁的预设
                var list=[
                    ['identity','4','music_default2','new'],
                    ['guozhan','4','music_default2','new'],
                    ['versus','4','music_default2','new'],
                    ['doudizhu','4','music_default2','new'],
                    ['single','4','music_default2','new'],
                    ['brawl','9','music_junzhengx','new'],
                    ['taixuhuanjing','5','music_lebu','new'],
                    ['freegame','fun3','music_chongfeng','new'],
                    ['paiwei','groups2','music_jiangzhan','gold'],
                ];
                game.saveConfig('image_background_story',true);
                game.saveConfig('audio_music_story',true);
                //未单独设置的背景预设
                game.saveConfig('storyBG_default','1');
                //单机模式的卡牌预设
                game.saveConfig('game_cardSet','hand');
                //如真模式的卡牌预设
                game.saveConfig('game_cardSet2','new');
                //未单独设置的背景音乐预设
                game.saveConfig('storyBGM_default','music_default');
                for(var i=0;i<list.length;i++) {
                    game.saveConfig('storyBG_online_'+list[i][0],list[i][1]);
                    game.saveConfig('storyBGM_online_'+list[i][0],list[i][2]);
                    //localStorage.setItem('game_cardSet2_'+list[i][0],list[i][3]);
                }
                game.saveConfig('rzLock_jsc',true);
            }
            localStorage.setItem('hideModesA',true);
            //强硬设置布局（除非手改触发连招）
            if(!lib.config.layoutSet) {
			    game.saveConfig('layout','nova');
			    lib.config.layout='nova';
			}
            if(lib.config.rz_isPaiWei) {
                game.saveConfig('rz_isPaiWei',false);
                game.rz_isPaiWeiing=true;
            //if (lib.config.mode == "versus" && lib.config.mode_config.versus.versus_mode == 'two') {
                //下面代码来源于柚子，并进行魔改适配
                let count0, top0, win0, fail0, num0, top_win0, win_Cty0, xxingnum0;
                //当前分，最高分，胜场，败场，总场，最高连胜，当前连胜，星星总数
                //修改为士气分，士气上限
                function updatetianti() { //获取刷新后的值
                    count0 = lib.config['tianti_versus_two'].count;
                    top0 = lib.config['tianti_versus_two'].top;
                    win0 = lib.config['tianti_versus_two'].win;
                    fail0 = lib.config['tianti_versus_two'].fail;
                    num0 = lib.config['tianti_versus_two'].num;
                    top_win0 = lib.config['tianti_versus_two'].top_win;
                    win_Cty0 = lib.config['tianti_versus_two'].win_Cty;
                    xxingnum0 = lib.config['tianti_versus_two'].xxingnum;
                }

                function updatetianticount(num, bool) {
                    updatetiantitop();
                    let maxx = Math.min(count0 + num, top0); //对比上限和当前，超过上限时，变为上限
                    if (!bool || bool == undefined) game.saveConfig('tianti_versus_two', {
                        count: maxx,
                        top: top0,
                        win: win0,
                        fail: fail0,
                        num: num0,
                        top_win: top_win0,
                        win_Cty: win_Cty0,
                        xxingnum: xxingnum0,
                    })
                    else {
                        game.saveConfig('tianti_versus_two', {
                            count: num,
                            top: top0,
                            win: win0,
                            fail: fail0,
                            num: num0,
                            top_win: top_win0,
                            win_Cty: win_Cty0,
                            xxingnum: xxingnum0,
                        })
                    }
                    updatetiantitop();
                }

                function updatetiantitop() { //刷新上限
                    updatetianti();
                    /*if (!lib.config.tianti_0星) {
                        if (xxingnum0 < 7) top0 = 40;
                        else if (xxingnum0 < 19) top0 = 65;
                        else if (xxingnum0 < 44) top0 = 100;
                        else if (xxingnum0 < 69) top0 = 250;
                        else if (xxingnum0 < 99) top0 = 400;
                        else if (xxingnum0 >= 99) top0 = 550;
                    } else {*/
                        if (xxingnum0 < 6) top0 = 40;
                        else if (xxingnum0 < 18) top0 = 65;
                        else if (xxingnum0 < 43) top0 = 100;
                        else if (xxingnum0 < 68) top0 = 250;
                        else if (xxingnum0 < 97) top0 = 400;
                        else if (xxingnum0 >= 98) top0 = 550;
                    //}
                    game.saveConfig('tianti_versus_two', {
                        count: count0,
                        top: top0,
                        win: win0,
                        fail: fail0,
                        num: num0,
                        top_win: top_win0,
                        win_Cty: win_Cty0,
                        xxingnum: xxingnum0,
                    })
                    updatetianti();
                }

                function updatetiantiwin(num, bool) {
                    updatetiantitop();
                    if (!bool || bool == undefined) game.saveConfig('tianti_versus_two', {
                        count: count0,
                        top: top0,
                        win: win0 + num,
                        fail: fail0,
                        num: num0,
                        top_win: top_win0,
                        win_Cty: win_Cty0,
                        xxingnum: xxingnum0,
                    })
                    else {
                        game.saveConfig('tianti_versus_two', {
                            count: count0,
                            top: top0,
                            win: num,
                            fail: fail0,
                            num: num0,
                            top_win: top_win0,
                            win_Cty: win_Cty0,
                            xxingnum: xxingnum0,
                        })
                    }
                    updatetiantitop();
                }

                function updatetiantifail(num, bool) {
                    updatetiantitop();
                    if (!bool || bool == undefined) game.saveConfig('tianti_versus_two', {
                        count: count0,
                        top: top0,
                        win: win0,
                        fail: fail0 + num,
                        num: num0,
                        top_win: top_win0,
                        win_Cty: win_Cty0,
                        xxingnum: xxingnum0,
                    })
                    else {
                        game.saveConfig('tianti_versus_two', {
                            count: count0,
                            top: top0,
                            win: win0,
                            fail: num,
                            num: num0,
                            top_win: top_win0,
                            win_Cty: win_Cty0,
                            xxingnum: xxingnum0,
                        })
                    }
                    updatetiantitop();
                }

                function updatetiantinum(num, bool) {
                    updatetiantitop();
                    if (!bool || bool == undefined) game.saveConfig('tianti_versus_two', {
                        count: count0,
                        top: top0,
                        win: win0,
                        fail: fail0,
                        num: num0 + num,
                        top_win: top_win0,
                        win_Cty: win_Cty0,
                        xxingnum: xxingnum0,
                    })
                    else {
                        game.saveConfig('tianti_versus_two', {
                            count: count0,
                            top: top0,
                            win: win0,
                            fail: fail0,
                            num: num,
                            top_win: top_win0,
                            win_Cty: win_Cty0,
                            xxingnum: xxingnum0,
                        })
                    }
                    updatetiantitop();
                }

                function updatetiantitop_win(num, bool) {
                    updatetiantitop();
                    if (!bool || bool == undefined) game.saveConfig('tianti_versus_two', {
                        count: count0,
                        top: top0,
                        win: win0,
                        fail: fail0,
                        num: num0,
                        top_win: top_win0 + num,
                        win_Cty: win_Cty0,
                        xxingnum: xxingnum0,
                    })
                    else {
                        game.saveConfig('tianti_versus_two', {
                            count: count0,
                            top: top0,
                            win: win0,
                            fail: fail0,
                            num: num0,
                            top_win: num,
                            win_Cty: win_Cty0,
                            xxingnum: xxingnum0,
                        })
                    }
                    updatetiantitop();
                }

                function updatetiantiwin_Cty(num, bool) {
                    updatetianti();
                    if (!bool || bool == undefined) game.saveConfig('tianti_versus_two', {
                        count: count0,
                        top: top0,
                        win: win0,
                        fail: fail0,
                        num: num0,
                        top_win: top_win0,
                        win_Cty: win_Cty0 + num,
                        xxingnum: xxingnum0,
                    })
                    else {
                        game.saveConfig('tianti_versus_two', {
                            count: count0,
                            top: top0,
                            win: win0,
                            fail: fail0,
                            num: num0,
                            top_win: top_win0,
                            win_Cty: num,
                            xxingnum: xxingnum0,
                        })
                    }
                    updatetianti();
                }

                function updatetiantixxingnum(num, bool) {
                    updatetiantitop();
                    if (!bool || bool == undefined) game.saveConfig('tianti_versus_two', {
                        count: count0,
                        top: top0,
                        win: win0,
                        fail: fail0,
                        num: num0,
                        top_win: top_win0,
                        win_Cty: win_Cty0,
                        xxingnum: Math.min(xxingnum0 + num, 999 + 97),
                    })
                    else {
                        game.saveConfig('tianti_versus_two', {
                            count: count0,
                            top: top0,
                            win: win0,
                            fail: fail0,
                            num: num0,
                            top_win: top_win0,
                            win_Cty: win_Cty0,
                            xxingnum: num,
                        })
                    }
                    updatetiantitop();
                }
                lib.onover.push(function(bool) {
                    if (!lib.config['tianti_versus_two'] || (!lib.config['tianti_versus_two'].xxingnum&&!lib.config['tianti_versus_two'].count)) {
                        game.saveConfig('tianti_versus_two', {
                            count: 0,
                            top: 40, //青铜的士气上限
                            win: 0,
                            fail: 0,
                            num: 0,
                            top_win: 0,
                            win_Cty: 0,
                            xxingnum: 0,
                        })
                    };
                    updatetiantitop(); //获取上限以及所有的值
                    updatetiantinum(1); //场数+1
                    var sumUpScore=function(){
                        /*game.saveConfig('tianti_0星', false);
                        if (xxingnum0 == 0 || xxingnum0 == 2 || xxingnum0 == 4) game.saveConfig('tianti_0星', true);
                        if (xxingnum0 == 6 || xxingnum0 == 10 || xxingnum0 == 14) game.saveConfig('tianti_0星', true);
                        if (xxingnum0 == 18 || xxingnum0 == 23 || xxingnum0 == 28 || xxingnum0 == 33 || xxingnum0 == 38) game.saveConfig('tianti_0星', true);
                        if (xxingnum0 == 43 || xxingnum0 == 48 || xxingnum0 == 53 || xxingnum0 == 58 || xxingnum0 == 63) game.saveConfig('tianti_0星', true);
                        if (xxingnum0 == 68 || xxingnum0 == 73 || xxingnum0 == 78 || xxingnum0 == 83 || xxingnum0 == 88) game.saveConfig('tianti_0星', true);
                        if (xxingnum0 == 98) game.saveConfig('tianti_0星', true);*/
                        updatetiantitop();
                        let top_winnum0 = Math.max(top_win0, win_Cty0) //最高连胜
                        updatetiantitop_win(top_winnum0, true);
                    };
                    //逃跑检测的恢复
                    game.saveConfig('rz_paiWeiTip',false);
                    if(game.rz_paiWeiDec&&game.rz_paiWeiDec>0) updatetiantixxingnum(game.rz_paiWeiDec);
                    game.rz_paiWeiDec=0;
                    if(lib.config.rz_paiWeiCount) {
                        updatetianticount(lib.config.rz_paiWeiCount, true);
                        game.saveConfig('rz_paiWeiCount',false);
                    }
                    if(game.winRzL==undefined) game.winRzL=0;
                    if(game.losRzL==undefined) game.losRzL=0;
                    var num = 0;
                    var starAdd=0;
                    var resultBlank=function(altstr){
                        if(game.promotionDiv) {
                            var tra=window.helasisy_getPaiWeiInfo('translation');
                            var logo=window.createJJGradeElement(tra, 0.34);
                            logo.style.left='-110px';
                            var fixList=[0,-2,-5,4,-3,-5,-9];
                            logo.style.top=fixList[window.helasisy_getPaiWeiInfo('level')]+'px';
                            //青铜-2
                            //白银-4
                            //黄金+4
                            //翡翠-3
                            //大师-5
                            //传说-9
                            var prompt=ui.create.div(game.promotionDiv);
                            game.createCss(`.rzsh_paiwei_prompt {
                                width: 300px;
                                height: 80px;
                                left: 130px;
                                text-align: left;
                                padding-top: 10px;
                                margin-top: 10px;
                            }`);
                            game.promotionDiv.innerHTML=altstr;
                            game.promotionDiv.classList.add('rzsh_paiwei_prompt');
                            game.promotionDiv.appendChild(logo);
                            game.promotionDiv.logo=logo;
                            ui.update();
                            setTimeout(function(){
                                if(ui.update) {
                                    ui.update();
                                }
                            },500);
                        }
                    }
                    if (bool) { //胜利
                        var num = top0;//+get.rand(0, 10);
                        var rate = 1;
                        //优势局加分（最高30%）
                        if(game.winRzL) rate+= game.winRzL * 0.30;
                        //连胜度（20%~99%）
                        var comboo = win_Cty0/(win_Cty0+4);
                        //连胜加分（最高70%，最低40%）
                        var combooRate = window.helasisy_getPaiWeiInfo('level')*0.05+0.4;
                        if(comboo>0) rate+= combooRate * comboo;
                        //最终加分
                        num = Math.floor( num * rate );
                        var sumNum = count0 + num;
                        var lastScore = 0;
                        for(;sumNum>0;) {
                            updatetiantitop();
                            let dec = Math.min(top0, sumNum);
                            if(sumNum >= top0) {
                                updatetiantixxingnum(1);
                                starAdd++;
                            }else {
                                updatetianticount(dec, true);
                                lastScore = dec;
                            }
                            sumNum -= dec;
                        }
                        _status["temp_排位"] = lastScore;
                        updatetiantitop(); //刷新数值
                        updatetiantiwin(1); //胜场+1
                        updatetiantiwin_Cty(1); //连胜+1
                        sumUpScore();
                        var altstr='当前段位：'+window.helasisy_getPaiWeiInfo('name');
                            var starsL='';
                            if(window.helasisy_getPaiWeiInfo('level')<6) {
                                for(let si=0;si<window.helasisy_getPaiWeiInfo('starLim');si++) {
                                    let sts=si<window.helasisy_getPaiWeiInfo('star')?'★':'☆';
                                    starsL+=sts;
                                }
                            }else {
                                starsL=Math.min(999, window.helasisy_getPaiWeiInfo('star'))+'★';
                            }
                            altstr+='<br>当前星级：'+starsL;
                            if(starAdd>0) {
                                altstr+='<span style="opacity: 0.6">（+'+starAdd+'）</span>';
                            }
                            altstr+='<br>奖励分数：+'+num;
                            if(win_Cty0>1) {
                                altstr+='<span style="opacity: 0.6">（当前连胜 '+win_Cty0+'）</span>';
                            }
                            altstr+='<br>升星进度：「'+lastScore+'/'+top0+'」';
                        resultBlank(altstr);
                    } else { //失败
                        var num = top0;//+get.rand(0, 10);
                        var rate = 1;
                        //劣势局减分（最高30%）
                        if(game.winRzL) rate+= game.losRzL * 0.30;
                        //最终减分
                        num = Math.floor( num * rate );
                        var sumNum = num;
                        var decNum = num;
                        var minScore = Math.floor( top0 / 3 );
                        var loseStar = 0;
                        var isDec = true;
                        var lastScore = 0;
                        if(count0 > minScore) {
                            num = Math.min(count0 - minScore, num);
                            decNum = num;
                        }
                        if(window.helasisy_getPaiWeiInfo('level')<=1) {
                            num = 10;
                            isDec = false;
                            var countAdd=count0+num;
                            if (countAdd < top0) { //没到上限就加分
                                lastScore = count0+num;
                                updatetianticount(num);
                            } else {
                                lastScore = countAdd-top0;
                                updatetianticount(countAdd-top0, true);
                                updatetiantixxingnum(1);
                                loseStar = -1;
                            }
                        }else {
                            if (count0 >= num) { //没到下限就扣分
                                _status["temp_排位"] = count0-num;
                                lastScore = count0-num;
                                updatetianticount(-num);
                            } else { //如果到达上限，那么星星减1，分数补偿
                                updatetiantixxingnum(-1);
                                loseStar = 1;
                                if(window.helasisy_getPaiWeiInfo('level')>1) {
                                    var minScore2 = Math.floor( top0 / 3 );
                                    num = Math.min( top0 - minScore2, num );
                                }else {
                                    num = Math.min( top0, num);
                                }
                                _status["temp_排位"] = top0 - num;
                                lastScore = top0 - num;
                                decNum = num + count0;
                                updatetianticount(top0 - num, true);
                            }
                        }
                        updatetiantifail(1); //败场+1              
                        updatetiantitop(); //刷新上限
                        updatetiantiwin_Cty(0, true); //清零连胜
                        sumUpScore();
                        var altstr='当前段位：'+window.helasisy_getPaiWeiInfo('name');
                            var starsL='';
                            if(window.helasisy_getPaiWeiInfo('level')<6) {
                                for(let si=0;si<window.helasisy_getPaiWeiInfo('starLim');si++) {
                                    let sts=si<window.helasisy_getPaiWeiInfo('star')?'★':'☆';
                                    starsL+=sts;
                                }
                            }else {
                                starsL=Math.min(999, window.helasisy_getPaiWeiInfo('star'))+'★';
                            }
                            altstr+='<br>当前星级：'+starsL;
                            if(loseStar<0) {
                                altstr+='<span style="opacity: 0.6">（+'+Math.abs(loseStar)+'）</span>';
                            }else if(loseStar>0) {
                                altstr+='<span style="opacity: 0.6">（-'+loseStar+'）</span>';
                            }
                            if(isDec) {
                                altstr+='<br>扣减分数：-'+decNum;
                                if(sumNum > decNum) altstr+='<span style="opacity: 0.6">（段位保护）</span>';
                            }else {
                                altstr+='<br>奖励分数：+'+num;
                            }
                            altstr+='<br>升星进度：「'+lastScore+'/'+top0+'」';
                        resultBlank(altstr);
                    };
                })
            }
        },
        precontent: function() {
if(navigator.notification&&navigator.notification.confirm){
    window.alert_old = window.alert;
    window.alert = (message) => {
        window.tipsClick('Menu');//已读
        navigator.notification.confirm(
            message,
            function(index){
                if(index==1) {
                    //window.tipsClick('Enter');//确定
                    window.tipsClick('TinyButton');//切换
                    window._alert=true;
                }else {
                    window.tipsClick('Report01');//离开
                    window._alert=false;
                }
            },
            '三国杀·琉璃版',
            ['确定']
        );
        return !!window._alert;
    }
    window.confirms = (message,title,funct,funcf) => {
        if(!title) var title='三国杀·琉璃版';
        navigator.notification.confirm(
            message,
            function(index){
                if(index==1) {
                    if(funct) funct();
                }else {
                    if(funcf) funcf();
                }
            },
            title,
            ['确定','取消']
        );
        return true;
    }
}
if(localStorage.getItem('rz_KFZ_reload')=='reload') {
        if(typeof alert_old=='function') {
            alert_old('游戏已重置！');
        }else {
            alert('游戏已重置！');
        }
        localStorage.setItem('rz_KFZ_reload','none');
        var noname_inited=localStorage.getItem('noname_inited');
		var onlineKey=localStorage.getItem(lib.configprefix+'key');
		localStorage.clear();
		sessionStorage.clear();
		if(noname_inited){
			localStorage.setItem('noname_inited',noname_inited);
		}
		if(onlineKey){
			localStorage.setItem(lib.configprefix+'key',onlineKey);
		}
		game.deleteDB('config');
		game.deleteDB('data');
		//var str='none';
		var str='none';
		localStorage.setItem('noname_freeTips_chg', str);
		//game.reload();
		game.reload3(true);
    }
            var Login = sessionStorage.getItem("rzshk");
            if (!Login) {
                window.location.href = lib.assetURL + 'extension/如真似幻/html/rzsh.html';
            };
            // 创建一个 script 标签，引入pixi
            //加入一个import接口，为以后js分离做准备
        //这里提供切换十周年式的bug修复！
        let pixiscript;
        if(!localStorage.getItem('liuli_tenUIfix')||localStorage.getItem('liuli_tenUIfix')!='fix') {
            window.rzimport = function(func) {
                func(lib, game, ui, get, ai, _status);
            };
            pixiscript = document.createElement('script');
            pixiscript.src = lib.assetURL + 'extension/如真似幻/js/pixi6.min.js';
            document.head.appendChild(pixiscript);
        }else {
            pixiscript = this;
        }
            let script2 = document.createElement('script');
            script2.src = lib.assetURL + 'extension/如真似幻/js/gsap.min.js';
            document.head.appendChild(script2);
       /*     lib.init.css(skinSwitch.url + "style", "cang-zhen-ge")
            lib.init.js(skinSwitch.url + "spine-lib/pixi", "pixi-ease")
            lib.init.js(skinSwitch.url, "czg_setting")*/
       /*      let czgscript = document.createElement('script');
            czgscript.src = lib.assetURL + 'extension/皮肤切换/czg_setting.js';
            document.head.appendChild(czgscript);*/
            //可切换的精灵池，比如头像，用户名，元宝数量，右方活动图片。
            const uisprite = {
                "actak": {
                    "x": 172,
                    "y": 10,
                    "scale": 0.68
                },
                "actbk": {
                    "x": 307,
                    "y": 10,
                    "scale": 0.68
                },
                "activeea": {
                    "x": 173,
                    "y": 10,
                    "scale": 0.67
                },
                "avatar": {
                    "x": 218,
                    "y": 43,
                    "scale": 0.69
                },
                "guan": {
                    "x": 245,
                    "y": 58,
                    "scale": 1
                },
                "left1": {
                    "x": 71,
                    "y": 92,
                    "scale": 0.7
                },
                "left2": {
                    "x": 72,
                    "y": 178,
                    "scale": 0.7
                },
                "left3": {
                    "x": 71,
                    "y": 267,
                    "scale": 0.7
                },
                "left4": {
                    "x": 70,
                    "y": 350,
                    "scale": 0.7
                },
                "leftlong": {
                    "x": 3,
                    "y": 253,
                    "scale": 0.8
                },
                "lvlup": {
                    "x": 324,
                    "y": 10,
                    "scale": 0.8
                },
                "menu1": {
                    "x": 1059,
                    "y": 0.5,
                    "scale": 0.7
                },
                "pubbtn_close": {
                    "x": 1059,
                    "y": 470,
                    "scale": 0.7
                },
                "mode1": {
                    "x": 267,
                    "y": 256,
                    "scale": 0.7
                },
                "mode2": {
                    "x": 535,
                    "y": 254,
                    "scale": 0.7
                },
                "mode3": {
                    "x": 802,
                    "y": 166,
                    "scale": 0.61
                },
                "mode4": {
                    "x": 802,
                    "y": 340,
                    "scale": 0.72
                },
                "player_nan": {
                    "x": 150,
                    "y": 10,
                    "scale": 1
                },
                "right2": {
                    "x": 898,
                    "y": 34.5,
                    "scale": 0.62
                },
                "right3": {
                    "x": 960,
                    "y": 34.5,
                    "scale": 0.62
                },
                "right44": {
                    "x": 1027,
                    "y": 36,
                    "scale": 0.63
                },
                "yukasaoguang": {
                    "x": 833,
                    "y": 32,
                    "scale": 0.63
                },
                "rightacbg": {
                    "x": 27,
                    "y": 145.5,
                    "scale": 0.7
                },
                "rightbg": {
                    "x": 834,
                    "y": 32,
                    "scale": 0.68
                },
                "ro2": {
                    "x": 27,
                    "y": 278,
                    "scale": 0.7
                },
                "czg": {
                    "x": 29,
                    "y": 345,
                    "scale": 0.7
                },
                "say": {
                    "x": 45,
                    "y": 0.5,
                    "scale": 1.15
                },
                "uactive1": {
                    "x": 308.5,
                    "y": -3.5,
                    "scale": 0.71
                },
                "under1": {
                    "x": 550,
                    "y": 14,
                    "scale": 0.7
                },
                "shop": {
                    "x": 628,
                    "y": 19.5,
                    "scale": 0.74
                },
                "under3": {
                    "x": 705,
                    "y": 11.5,
                    "scale": 0.7
                },
                "under4": {
                    "x": 785,
                    "y": 13.5,
                    "scale": 0.7
                },
                "under5": {
                    "x": 865,
                    "y": 11.5,
                    "scale": 0.7
                },
                "under6": {
                    "x": 944,
                    "y": 7.5,
                    "scale": 0.75
                },
                "vipbg1": {
                    "x": 460,
                    "y": 21,
                    "scale": 0.92
                },
                "vipbg2": {
                    "x": 623,
                    "y": 20,
                    "scale": 0.9
                },
                "大元帅": {
                    "x": 154,
                    "y": 58,
                    "scale": 0.2
                },
                "pica": {
                    "x": 76,
                    "y": 36,
                    "scale": 0.7
                },
                "riactive": {
                    "x": 27.5,
                    "y": 147.5,
                    "scale": 0.7
                },
                "modesecbg": {
                    "x": 550,
                    "y": 250,
                    "scale": 0.63
                },
                "mode1bbg": {
                    "x": 590,
                    "y": 256,
                    "scale": 0.67
                },
                "modetta": {
                    "x": 422,
                    "y": 102,
                    "scale": 0.69
                },
                "modettb": {
                    "x": 422,
                    "y": 102,
                    "scale": 0.69
                },
                "mode1tt": {
                    "x": 221,
                    "y": 102,
                    "scale": 0.69
                },
                "modesecoff": {
                    "x": 225,
                    "y": 158,
                    "scale": 0.7
                },
                "modesecoff1": {
                    "x": 225,
                    "y": 158,
                    "scale": 0.7
                },
                "modesecoff2": {
                    "x": 225,
                    "y": 218,
                    "scale": 0.7
                },
                "modesecoff3": {
                    "x": 225,
                    "y": 278,
                    "scale": 0.7
                },
                "5pjz": {
                    "x": 225,
                    "y": 159,
                    "scale": 0.7
                },
                "8pjz": {
                    "x": 225,
                    "y": 219,
                    "scale": 0.7
                },
                "guowar": {
                    "x": 227,
                    "y": 280,
                    "scale": 0.7
                },
                "whelp": {
                    "x": 488,
                    "y": 103,
                    "scale": 0.65
                },
                "rzclose": {
                    "x": 1055.5,
                    "y": 41,
                    "scale": 0.47
                },
                "ttrankbg1": {
                    "x": 230,
                    "y": 240,
                    "scale": 0.8
                },
                "ttrankbg2": {
                    "x": 230,
                    "y": 222,
                    "scale": 0.8
                },
                "ttrankbg3": {
                    "x": 230,
                    "y": 360,
                    "scale": 0.8
                },
                "ttrank": {
                    "x": 230,
                    "y": 160,
                    "scale": 0.8
                },
                "jj_grade_qingtong": {
                    "x": 230,
                    "y": 180,
                    "scale": 1
                },
                "jj_grade_baiyin": {
                    "x": 230,
                    "y": 180,
                    "scale": 1
                },
                "jj_grade_huangjin": {
                    "x": 230,
                    "y": 180,
                    "scale": 1
                },
                "jj_grade_feicui": {
                    "x": 230,
                    "y": 180,
                    "scale": 1
                },
                "jj_grade_dashi": {
                    "x": 230,
                    "y": 180,
                    "scale": 1
                },
                "jj_star_on": {
                    "x": 200,
                    "y": 300,
                    "scale": 0.8
                },
                "jj_star_off": {
                    "x": 200,
                    "y": 300,
                    "scale": 0.8
                },
                "tiantibg": {
                    "x": 100,
                    "y": 220,
                    "scale": 1
                },
                "solobtn": {
                    "x": 100,
                    "y": 170,
                    "scale": 0.7
                },
                "versustwobtn": {
                    "x": 100,
                    "y": 320,
                    "scale": 0.7
                },
                "jj_dianfeng": {
                    "x": 100,
                    "y": 50,
                    "scale": 1.2
                },
                "jj_tittle": {
                    "x": 100,
                    "y": 20,
                    "scale": 0.7
                },
                "publicui_title_bg": {
                    "x": 140,
                    "y": 30,
                    "scale": 0.8
                },
                "s0": {
                    "x": 180,
                    "y": 20,
                    "scale": 0.7
                },
                "bigmenu": {
                    "x": 551.5,
                    "y": 310,
                    "scale": 1.05
                },
                "set_dialog": {
                    "x": 551.5,
                    "y": 257,
                    "scale": 1
                },
                "warr_info_bg": {
                    "x": 341,
                    "y": 69,//69
                    "scale": 0.68
                },
                "wujiangchangkuang": {
                    "x": -470,
                    "y": 270,
                    "scale": 1
                },
                "jl_bar_fg": {
                    "x": 172,
                    "y": -78,
                    "scale": 0.98
                },
                "jianghun": {
                    "x": -228,
                    "y": -18,
                    "scale": 1
                },
                "warr_info_dec": {
                    "x": -190,
                    "y": 152,
                    "scale": 1
                },
                "offical_dayuanshuai": {
                    "x": -210,
                    "y": -71.,
                    "scale": 1.2
                },
                
                "warr_arr_official": {
                    "x": -51,
                    "y": -71,
                    "scale": 1
                },
                "officalui_icon_10": {
                    "x": -345,
                    "y": -30,
                    "scale": 0.5
                },
                "biaojibeijing": {
                    "x": 788,
                    "y": 25,
                    "scale": 0.9
                },
                "search_btn": {
                    "x": 912,
                    "y": 25,
                    "scale": 0.6
                },
                "wujiangback": {
                    "x": 1045,
                    "y": 37,
                    "scale": 0.75
                },
                /*备份原版："wujiangback": {
                    "x": 1045,
                    "y": 37,
                    "scale": 0.75
                },*/
            }
            pixiscript.onload = function() {
              /*  let script2 = document.createElement('script');
                script2.src = lib.assetURL + 'extension/如真似幻/js/spine.3.8.js';
                document.head.appendChild(script2);*/
                if (!lib.config.tianti_versus_two || (!lib.config['tianti_versus_two'].xxingnum&&!lib.config['tianti_versus_two'].count)) {
                    game.saveConfig('tianti_versus_two', {
                        count: 0,
                        top: 40, //青铜的士气上限
                        win: 0,
                        fail: 0,
                        num: 0,
                        top_win: 0,
                        win_Cty: 0,
                        xxingnum: 0,
                    })
                };

                function numtoroma(num) {
                    switch (num) {
                        case 1:
                            return 'Ⅰ';
                        case 2:
                            return 'Ⅱ';
                        case 3:
                            return 'Ⅲ';
                        case 4:
                            return 'Ⅳ';
                        case 5:
                            return 'Ⅴ';
                        case 6:
                            return 'Ⅵ';
                        default:
                            return null;
                    }
                }

                function getName_排位 (num) {
                    let xingxingNum; //用来转化为罗马数字
                    let outname; //段位名字
                    let duannum;
                    let outroma; //段位等级
                    let xxnum; //小星星
                    let xxnumlim; //星星上限
                    if (num < 1) {
                        outname = '青铜';
                        xingxingNum = 3;
                        xxnum = 0;
                        xxnumlim = 2;
                        duannum = 1;
                    } else if (num < 7) {
                        outname = '青铜';
                        xingxingNum = 3 - Math.floor((num - 1) / 2);
                        xxnum = (num - 1) % 2 + 1; //段位星星数
                        xxnumlim = 2;
                        duannum = 1;
                    } else if (num < 19) {
                        outname = '白银';
                        xingxingNum = 3 - Math.floor((num - 7) / 4);
                        xxnum = (num - 7) % 4 + 1;
                        xxnumlim = 4;
                        duannum = 2;
                    } else if (num < 44) {
                        outname = '黄金';
                        xingxingNum = 5 - Math.floor((num - 19) / 5);
                        xxnum = (num - 19) % 5 + 1;
                        xxnumlim = 5;
                        duannum = 3;
                    } else if (num < 69) {
                        outname = '翡翠';
                        xingxingNum = 5 - Math.floor((num - 44) / 5);
                        xxnum = (num - 44) % 5 + 1;
                        xxnumlim = 5;
                        duannum = 4;
                    } else if (num < 99) {
                        outname = '大师';
                        xingxingNum = 6 - Math.floor((num - 69) / 5);
                        xxnum = (num - 69) % 5 + 1;
                        xxnumlim = 5;
                        duannum = 5;
                    } else {
                        outname = '传说';
                        xingxingNum = 1;
                        xxnum = num - 98;
                        xxnumlim = 1000;
                        duannum = 6;
                    }
                    outroma = numtoroma(xingxingNum);
                    return [outname + outroma, xxnum, xxnumlim, duannum] //段位名称，星星数量，星星上限，段位数（1~6）
                }
                //这里可以让你分开保存单机和线上的模式设置数据
                //刷刷刷
                //改改改，不要用saveConfig，会让本地内存爆表从而储存不了滴
				var offline=sessionStorage.getItem('Network');
				var backup=false;
				var isOn=localStorage.getItem('rzsh_modeSetting');
				if(!isOn) isOn='on';
				//if(lib.config.mode_config) backup=JSON.parse(JSON.stringify(lib.config.mode_config));
				if(lib.config.mode_config) backup=JSON.stringify(lib.config.mode_config);
				var lastOffline=localStorage.getItem('lastOffline');
				//alert(offline+'\n'+JSON.stringify(backup,null,2)+'\n'+lastOffline);
				//移到本体去咯
				/*if(lastOffline&&backup&&isOn=='on') {
				    //game.saveConfig('mode_config_'+lastOffline,backup);
				    localStorage.setItem('rzsh_modeSetting_'+lastOffline,backup);
				    //lib.config['mode_config_'+lastOffline]=backup;
				}*/
				if(offline&&isOn=='on') {
				    localStorage.setItem('lastOffline',offline);
				    var temp=false;
				    var getTemp=localStorage.getItem('rzsh_modeSetting_'+offline);
				    //if(lib.config['mode_config_'+offline]) {
				    if(getTemp) {
				        //temp=lib.config['mode_config_'+offline];
				        temp=JSON.parse(getTemp);
				    }
				    if(lastOffline&&/*offline!=lastOffline&&*/temp) {
				        game.saveConfig('mode_config',temp);
				        //lib.config.mode_config=temp;
				    }
				}
				//alert(offline+'\n'+lastOffline+'\n'+JSON.stringify(temp,null,2));
				//刷刷刷
                if (sessionStorage.getItem('Network') == 'offline') {
                    let link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = lib.assetURL + 'extension/如真似幻/css/offline.css'; // CSS文件的路径
                    document.head.appendChild(link);
                    lib.init.onload = function() {
                        ui.updated();
                        game.documentZoom = game.deviceZoom;
                        if (game.documentZoom != 1) {
                            ui.updatez();
                        }
                        ui.background = ui.create.div('.background');
                        ui.background.style.backgroundSize = "cover";
                        ui.background.style.backgroundPosition = '50% 50%';
                        if (lib.config.image_background && lib.config.image_background != 'default' && lib.config.image_background.indexOf('custom_') != 0) {
                            ui.background.setBackgroundImage('image/background/' + lib.config.image_background +
                                '.jpg');
                            if (lib.config.image_background_blur) {
                                ui.background.style.filter = 'blur(8px)';
                                ui.background.style.webkitFilter = 'blur(8px)';
                                ui.background.style.transform = 'scale(1.05)';
                            }
                        }
                        document.documentElement.style.backgroundImage = '';
                        document.documentElement.style.backgroundSize = '';
                        document.documentElement.style.backgroundPosition = '';
                        document.body.insertBefore(ui.background, document.body.firstChild);
                        document.body.onresize = ui.updatexr;
                        if (lib.config.touchscreen) {
                            document.body.addEventListener('touchstart', function(e) {
                                this.startX = e.touches[0].clientX / game.documentZoom;
                                this.startY = e.touches[0].clientY / game.documentZoom;
                                _status.dragged = false;
                            });
                            document.body.addEventListener('touchmove', function(e) {
                                if (_status.dragged) return;
                                if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) > 10 || Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) > 10) {
                                    _status.dragged = true;
                                }
                            });
                        }

                        if (lib.config.image_background.indexOf('custom_') == 0) {
                            ui.background.style.backgroundImage = "none";
                            game.getDB('image', lib.config.image_background, function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    ui.background.style.backgroundImage = 'url(' + data + ')';
                                    if (lib.config.image_background_blur) {
                                        ui.background.style.filter = 'blur(8px)';
                                        ui.background.style.webkitFilter = 'blur(8px)';
                                        ui.background.style.transform = 'scale(1.05)';
                                    }
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.card_style == 'custom') {
                            game.getDB('image', 'card_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.card_stylesheet) {
                                        ui.css.card_stylesheet.remove();
                                    }
                                    ui.css.card_stylesheet = lib.init.sheet(
                                        '.card:not(*:empty){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.cardback_style == 'custom') {
                            game.getDB('image', 'cardback_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.cardback_stylesheet) {
                                        ui.css.cardback_stylesheet.remove();
                                    }
                                    ui.css.cardback_stylesheet = lib.init.sheet(
                                        '.card:empty,.card.infohidden{background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'cardback_style2', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.cardback_stylesheet2) {
                                        ui.css.cardback_stylesheet2.remove();
                                    }
                                    ui.css.cardback_stylesheet2 = lib.init.sheet(
                                        '.card.infohidden:not(.infoflip){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.hp_style == 'custom') {
                            game.getDB('image', 'hp_style1', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet1) {
                                        ui.css.hp_stylesheet1.remove();
                                    }
                                    ui.css.hp_stylesheet1 = lib.init.sheet(
                                        '.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style2', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet2) {
                                        ui.css.hp_stylesheet2.remove();
                                    }
                                    ui.css.hp_stylesheet2 = lib.init.sheet(
                                        '.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style3', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet3) {
                                        ui.css.hp_stylesheet3.remove();
                                    }
                                    ui.css.hp_stylesheet3 = lib.init.sheet(
                                        '.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style4', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet4) {
                                        ui.css.hp_stylesheet4.remove();
                                    }
                                    ui.css.hp_stylesheet4 = lib.init.sheet(
                                        '.hp:not(.text):not(.actcount)>.lost{background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.player_style == 'custom') {
                            ui.css.player_stylesheet = lib.init.sheet(
                                '#window .player{background-image:none;background-size:100% 100%;}');
                            game.getDB('image', 'player_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.player_stylesheet) {
                                        ui.css.player_stylesheet.remove();
                                    }
                                    ui.css.player_stylesheet = lib.init.sheet(
                                        '#window .player{background-image:url("' + fileLoadedEvent.target.result +
                                        '");background-size:100% 100%;}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.border_style == 'custom') {
                            game.getDB('image', 'border_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.border_stylesheet) {
                                        ui.css.border_stylesheet.remove();
                                    }
                                    ui.css.border_stylesheet = lib.init.sheet();
                                    ui.css.border_stylesheet.sheet.insertRule(
                                        '#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
                                    ui.css.border_stylesheet.sheet.insertRule(
                                        '.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}',
                                    0);
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.control_style == 'custom') {
                            game.getDB('image', 'control_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.control_stylesheet) {
                                        ui.css.control_stylesheet.remove();
                                    }
                                    ui.css.control_stylesheet = lib.init.sheet(
                                        '#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.menu_style == 'custom') {
                            game.getDB('image', 'menu_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.menu_stylesheet) {
                                        ui.css.menu_stylesheet.remove();
                                    }
                                    ui.css.menu_stylesheet = lib.init.sheet(
                                        'html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result +
                                        '");background-size:cover}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        var proceed2 = function() {
                            var mode = lib.imported.mode;
                            var card = lib.imported.card;
                            var character = lib.imported.character;
                            /*if(character['thunder']&&lib.config&&lib.config['extension_雷霆万钧_hidePack']) {
                                delete character['thunder'];
                            }*/
                            var play = lib.imported.play;
                            delete window.game;
                            var i, j, k;
                            for (i in mode[lib.config.mode].element) {
                                if (!lib.element[i]) lib.element[i] = [];
                                for (j in mode[lib.config.mode].element[i]) {
                                    if (j == 'init') {
                                        if (!lib.element[i].inits) lib.element[i].inits = [];
                                        lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
                                    } else {
                                        lib.element[i][j] = mode[lib.config.mode].element[i][j];
                                    }
                                }
                            }
                            for (i in mode[lib.config.mode].ai) {
                                if (typeof mode[lib.config.mode].ai[i] == 'object') {
                                    if (ai[i] == undefined) ai[i] = {};
                                    for (j in mode[lib.config.mode].ai[i]) {
                                        ai[i][j] = mode[lib.config.mode].ai[i][j];
                                    }
                                } else {
                                    ai[i] = mode[lib.config.mode].ai[i];
                                }
                            }
                            for (i in mode[lib.config.mode].ui) {
                                if (typeof mode[lib.config.mode].ui[i] == 'object') {
                                    if (ui[i] == undefined) ui[i] = {};
                                    for (j in mode[lib.config.mode].ui[i]) {
                                        ui[i][j] = mode[lib.config.mode].ui[i][j];
                                    }
                                } else {
                                    ui[i] = mode[lib.config.mode].ui[i];
                                }
                            }
                            for (i in mode[lib.config.mode].game) {
                                game[i] = mode[lib.config.mode].game[i];
                            }
                            for (i in mode[lib.config.mode].get) {
                                get[i] = mode[lib.config.mode].get[i];
                            }
                            lib.init.start = mode[lib.config.mode].start;
                            lib.init.startBefore = mode[lib.config.mode].startBefore;
                            if (game.onwash) {
                                lib.onwash.push(game.onwash);
                                delete game.onwash;
                            }
                            if (game.onover) {
                                lib.onover.push(game.onover);
                                delete game.onover;
                            }
                            lib.config.banned = lib.config[lib.config.mode + '_banned'] || [];
                            lib.config.bannedcards = lib.config[lib.config.mode + '_bannedcards'] || [];

                            lib.rank = window.noname_character_rank;
                            delete window.noname_character_rank;
                            for (i in mode[lib.config.mode]) {
                                if (i == 'element') continue;
                                if (i == 'game') continue;
                                if (i == 'ai') continue;
                                if (i == 'ui') continue;
                                if (i == 'get') continue;
                                if (i == 'config') continue;
                                if (i == 'onreinit') continue;
                                if (i == 'start') continue;
                                if (i == 'startBefore') continue;
                                if (lib[i] == undefined) lib[i] = (Array.isArray(mode[lib.config.mode][
                                i])) ? [] : {};
                                for (j in mode[lib.config.mode][i]) {
                                    lib[i][j] = mode[lib.config.mode][i][j];
                                }
                            }
                            if (typeof mode[lib.config.mode].init == 'function') {
                                mode[lib.config.mode].init();
                            }

                            var connectCharacterPack = [];
                            var connectCardPack = [];
                            for (i in character) {
                                if (character[i].character) {
                                    lib.characterPack[i] = character[i].character
                                }
                                for (j in character[i]) {
                                    if (j == 'mode' || j == 'forbid') continue;
                                    if (j == 'connect') {
                                        connectCharacterPack.push(i);
                                        continue;
                                    }
                                    if (j == 'character' && !lib.config.characters.contains(i) && lib.config.mode != 'connect') {
                                        if (lib.config.mode == 'chess' && get.config('chess_mode') ==
                                            'leader') {
                                            for (k in character[i][j]) {
                                                lib.hiddenCharacters.push(k);
                                            }
                                        } else if (lib.config.mode != 'boss' || i != 'boss') {
                                            continue;
                                        }
                                    }
                                    if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
                                        lib[j].addArray(character[i][j]);
                                        continue;
                                    }
                                    for (k in character[i][j]) {
                                        if (j == 'character') {
                                            if (!character[i][j][k][4]) {
                                                character[i][j][k][4] = [];
                                            }
                                            if (character[i][j][k][4].contains('boss') || character[i][j][k][4].contains('hiddenboss')) {
                                                lib.config.forbidai.add(k);
                                            }
                                            if (lib.config.forbidai_user && lib.config.forbidai_user.contains(k)) {
                                                lib.config.forbidai.add(k);
                                            }
                                            for (var l = 0; l < character[i][j][k][3].length; l++) {
                                                lib.skilllist.add(character[i][j][k][3][l]);
                                            }
                                        }
                                        if (j == 'skill' && k[0] == '_' && (!lib.config.characters.contains(
                                        i) || (lib.config.mode == 'connect' && !character[i].connect))) {
                                            continue;
                                        }
                                        if (j == 'translate' && k == i) {
                                            lib[j][k + '_character_config'] = character[i][j][k];
                                        } else {
                                            if (lib[j][k] == undefined) {
                                                if (j == 'skill' && lib.config.mode == 'connect' && !character[i].connect) {
                                                    lib[j][k] = {
                                                        nopop: character[i][j][k].nopop,
                                                        derivation: character[i][j][k].derivation
                                                    };
                                                } else {
                                                    lib[j][k] = character[i][j][k];
                                                }
                                                if (j == 'card' && lib[j][k].derivation) {
                                                    if (!lib.cardPack.mode_derivation) {
                                                        lib.cardPack.mode_derivation = [k];
                                                    } else {
                                                        lib.cardPack.mode_derivation.push(k);
                                                    }
                                                }
                                            } else if (Array.isArray(lib[j][k]) && Array.isArray(character[
                                            i][j][k])) {
                                                lib[j][k].addArray(character[i][j][k]);
                                            } else {
                                                /*	console.log('dublicate ' + j + ' in character ' + i +
														':\n' + k + '\n' + ': ' + lib[j][k] + '\n' +
														character[i][j][k]);*/
                                            }
                                        }
                                    }
                                }
                            }
                            var connect_avatar_list = [];
                            for (var i in lib.character) {
                                connect_avatar_list.push(i);
                            }
                            connect_avatar_list.sort(lib.sort.capt);
                            for (var i = 0; i < connect_avatar_list.length; i++) {
                                var ia = connect_avatar_list[i];
                                lib.mode.connect.config.connect_avatar.item[ia] = lib.translate[ia];
                            }
                            if (lib.config.mode != 'connect') {
                                var pilecfg = lib.config.customcardpile[get.config('cardpilename') ||
                                    '当前牌堆'];
                                if (pilecfg) {
                                    lib.config.bannedpile = get.copy(pilecfg[0] || {});
                                    lib.config.addedpile = get.copy(pilecfg[1] || {});
                                } else {
                                    lib.config.bannedpile = {};
                                    lib.config.addedpile = {};
                                }
                            } else {
                                lib.cardPackList = {};
                            }
                            for (i in card) {
                                lib.cardPack[i] = [];
                                if (card[i].card) {
                                    for (var j in card[i].card) {
                                        if (!card[i].card[j].hidden && card[i].translate[j + '_info']) {
                                            lib.cardPack[i].push(j);
                                        }
                                    }
                                }
                                for (j in card[i]) {
                                    if (j == 'mode' || j == 'forbid') continue;
                                    if (j == 'connect') {
                                        connectCardPack.push(i);
                                        continue;
                                    }
                                    if (j == 'list') {
                                        if (lib.config.mode == 'connect') {
                                            lib.cardPackList[i] = card[i][j];
                                        } else {
                                            if (lib.config.cards.contains(i)) {
                                                var pile;
                                                if (typeof card[i][j] == 'function') {
                                                    pile = card[i][j]();
                                                } else {
                                                    pile = card[i][j];
                                                }
                                                lib.cardPile[i] = pile.slice(0);
                                                if (lib.config.bannedpile[i]) {
                                                    for (var k = 0; k < lib.config.bannedpile[i].length; k++) {
                                                        pile[lib.config.bannedpile[i][k]] = null;
                                                    }
                                                }
                                                for (var k = 0; k < pile.length; k++) {
                                                    if (!pile[k]) {
                                                        pile.splice(k--, 1);
                                                    }
                                                }
                                                if (lib.config.addedpile[i]) {
                                                    for (var k = 0; k < lib.config.addedpile[i].length; k++) {
                                                        pile.push(lib.config.addedpile[i][k]);
                                                    }
                                                }
                                                lib.card.list = lib.card.list.concat(pile);
                                            }
                                        }
                                    } else {
                                        for (k in card[i][j]) {
                                            if (j == 'skill' && k[0] == '_' && (!lib.config.cards.contains(
                                            i) || (lib.config.mode == 'connect' && !card[i].connect))) {
                                                continue;
                                            }
                                            if (j == 'translate' && k == i) {
                                                lib[j][k + '_card_config'] = card[i][j][k];
                                            } else {
                                                if (lib[j][k] == undefined) {
                                                    if (j == 'skill' && lib.config.mode == 'connect' && !card[i].connect) {
                                                        lib[j][k] = {
                                                            nopop: card[i][j][k].nopop,
                                                            derivation: card[i][j][k].derivation
                                                        };
                                                    } else {
                                                        lib[j][k] = card[i][j][k];
                                                    }
                                                } else console.log('dublicate ' + j + ' in card ' + i +
                                                    ':\n' + k + '\n' + lib[j][k] + '\n' + card[i][j][k]);
                                                if (j == 'card' && lib[j][k].derivation) {
                                                    if (!lib.cardPack.mode_derivation) {
                                                        lib.cardPack.mode_derivation = [k];
                                                    } else {
                                                        lib.cardPack.mode_derivation.push(k);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (lib.cardPack.mode_derivation) {
                                for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
                                    if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivation ==
                                        'string' && !lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]) {
                                        lib.cardPack.mode_derivation.splice(i--, 1);
                                    } else if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivationpack == 'string' && !lib.config.cards.contains(lib.card[
                                    lib.cardPack.mode_derivation[i]].derivationpack)) {
                                        lib.cardPack.mode_derivation.splice(i--, 1);
                                    }
                                }
                                if (lib.cardPack.mode_derivation.length == 0) {
                                    delete lib.cardPack.mode_derivation;
                                }
                            }
                            if (lib.config.mode != 'connect') {
                                for (i in play) {
                                    if (lib.config.hiddenPlayPack.contains(i)) continue;
                                    if (play[i].forbid && play[i].forbid.contains(lib.config.mode)) continue;
                                    if (play[i].mode && play[i].mode.contains(lib.config.mode) == false) continue;
                                    for (j in play[i].element) {
                                        if (!lib.element[j]) lib.element[j] = [];
                                        for (k in play[i].element[j]) {
                                            if (k == 'init') {
                                                if (!lib.element[j].inits) lib.element[j].inits = [];
                                                lib.element[j].inits.push(play[i].element[j][k]);
                                            } else {
                                                lib.element[j][k] = play[i].element[j][k];
                                            }
                                        }
                                    }
                                    for (j in play[i].ui) {
                                        if (typeof play[i].ui[j] == 'object') {
                                            if (ui[j] == undefined) ui[j] = {};
                                            for (k in play[i].ui[j]) {
                                                ui[j][k] = play[i].ui[j][k];
                                            }
                                        } else {
                                            ui[j] = play[i].ui[j];
                                        }
                                    }
                                    for (j in play[i].game) {
                                        game[j] = play[i].game[j];
                                    }
                                    for (j in play[i].get) {
                                        get[j] = play[i].get[j];
                                    }
                                    for (j in play[i]) {
                                        if (j == 'mode' || j == 'forbid' || j == 'init' || j == 'element' || j == 'game' || j == 'get' || j == 'ui' || j == 'arenaReady') continue;
                                        for (k in play[i][j]) {
                                            if (j == 'translate' && k == i) {
                                                // lib[j][k+'_play_config']=play[i][j][k];
                                            } else {
                                                if (lib[j][k] != undefined) {
                                                    console.log('dublicate ' + j + ' in play ' + i + ':\n' + k + '\n' + ': ' + lib[j][k] + '\n' + play[i][j][
                                                    k]);
                                                }
                                                lib[j][k] = play[i][j][k];
                                            }
                                        }
                                    }
                                    if (typeof play[i].init == 'function') play[i].init();
                                    if (typeof play[i].arenaReady == 'function') lib.arenaReady.push(play[i].arenaReady);
                                }
                            }

                            lib.connectCharacterPack = [];
                            lib.connectCardPack = [];
                            for (var i = 0; i < lib.config.all.characters.length; i++) {
                                var packname = lib.config.all.characters[i];
                                if (connectCharacterPack.contains(packname)) {
                                    lib.connectCharacterPack.push(packname)
                                }
                            }
                            for (var i = 0; i < lib.config.all.cards.length; i++) {
                                var packname = lib.config.all.cards[i];
                                if (connectCardPack.contains(packname)) {
                                    lib.connectCardPack.push(packname)
                                }
                            }
                            if (lib.config.mode != 'connect') {
                                for (i = 0; i < lib.card.list.length; i++) {
                                    if (lib.card.list[i][2] == 'huosha') {
                                        lib.card.list[i] = lib.card.list[i].slice(0);
                                        lib.card.list[i][2] = 'sha';
                                        lib.card.list[i][3] = 'fire';
                                    } else if (lib.card.list[i][2] == 'leisha') {
                                        lib.card.list[i] = lib.card.list[i].slice(0);
                                        lib.card.list[i][2] = 'sha';
                                        lib.card.list[i][3] = 'thunder';
                                    }
                                    if (!lib.card[lib.card.list[i][2]]) {
                                        lib.card.list.splice(i, 1);
                                        i--;
                                    } else if (lib.card[lib.card.list[i][2]].mode && lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode) == false) {
                                        lib.card.list.splice(i, 1);
                                        i--;
                                    }
                                }
                            }

                            if (lib.config.mode == 'connect') {
                                _status.connectMode = true;
                            }
                            if (window.isNonameServer) {
                                lib.cheat.i();
                            } else if (lib.config.dev && (!_status.connectMode || lib.config.debug)) {
                                lib.cheat.i();
                            }
                            lib.config.sort_card = get.sortCard(lib.config.sort);
                            delete lib.imported.character;
                            delete lib.imported.card;
                            delete lib.imported.mode;
                            delete lib.imported.play;
                            for (var i in lib.init) {
                                if (i.indexOf('setMode_') == 0) {
                                    delete lib.init[i];
                                }
                            }

                            var loadExtensionCallback = function() {
                                delete lib.extensions;
                                //琉璃版专用
                                if(typeof window.startLastRunExtensions=='function') {
                                    window.startLastRunExtensions();
                                }

                                if (lib.init.startBefore) {
                                    lib.init.startBefore();
                                    delete lib.init.startBefore;
                                }
                                ui.create.arena();
                                game.createEvent('game', false)
                                    .setContent(lib.init.start);
                                if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode].fromextension) {
                                    var startstr = mode[lib.config.mode].start.toString();
                                    if (startstr.indexOf('onfree') == -1) {
                                        setTimeout(lib.init.onfree, 500);
                                    }
                                }
                                delete lib.init.start;
                                game.loop();
                                try {
                                    app.emit('createArenaAfter');
                                } catch (err) {}
                            };
                            if (lib.config.extension_手杀ui_enable) {
                                if (!_status.connectMode) {
                                    var loadNextExtension = function() {
                                        var obj = lib.extensions.shift();
                                        if (obj) {
                                            try {
                                                _status.extension = obj[0];
                                                _status.evaluatingExtension = obj[3];
                                                if (obj[4]) {
                                                    if (obj[4].character) {
                                                        for (var j in obj[4].character.character) {
                                                            game.addCharacterPack(get.copy(obj[4].character));
                                                            break;
                                                        }
                                                    }
                                                    if (obj[4].card) {
                                                        for (var j in obj[4].card.card) {
                                                            game.addCardPack(get.copy(obj[4].card));
                                                            break;
                                                        }
                                                    }
                                                    if (obj[4].skill) {
                                                        for (var j in obj[4].skill.skill) {
                                                            game.addSkill(j, obj[4].skill.skill[j],
                                                            obj[4].skill.translate[j], obj[4].skill.translate[j + '_info']);
                                                        }
                                                    }
                                                }
                                                var func = obj[1](obj[2], obj[4]);
                                                if (typeof func === 'function') {
                                                    func(loadNextExtension);
                                                } else {
                                                    loadNextExtension();
                                                }
                                            } catch (e) {
                                                console.log(e);
                                                loadNextExtension();
                                            }
                                        } else {
                                            delete _status.extension;
                                            delete _status.evaluatingExtension;
                                            loadExtensionCallback();
                                        }
                                    };
                                    loadNextExtension();
                                } else {
                                    loadExtensionCallback();
                                }
                            } else {
                                if (!_status.connectMode) {
                                    for (var i = 0; i < lib.extensions.length; i++) {
                                        try {
                                            _status.extension = lib.extensions[i][0];
                                            _status.evaluatingExtension = lib.extensions[i][3];
                                            lib.extensions[i][1](lib.extensions[i][2], lib.extensions[i][4]);
                                            if (lib.extensions[i][4]) {
                                                if (lib.extensions[i][4].character) {
                                                    for (var j in lib.extensions[i][4].character.character) {
                                                        game.addCharacterPack(get.copy(lib.extensions[i][4].character));
                                                        break;
                                                    }
                                                }
                                                if (lib.extensions[i][4].card) {
                                                    for (var j in lib.extensions[i][4].card.card) {
                                                        game.addCardPack(get.copy(lib.extensions[i][4].card));
                                                        break;
                                                    }
                                                }
                                                if (lib.extensions[i][4].skill) {
                                                    for (var j in lib.extensions[i][4].skill.skill) {
                                                        game.addSkill(j, lib.extensions[i][4].skill.skill[j],
                                                        lib.extensions[i][4].skill.translate[j], lib.extensions[i][4].skill.translate[j + '_info']);
                                                    }
                                                }
                                            }
                                            delete _status.extension;
                                            delete _status.evaluatingExtension;
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }
                                }
                                delete lib.extensions;
                                //琉璃版专用
                                if(typeof window.startLastRunExtensions=='function') {
                                    window.startLastRunExtensions();
                                }

                                if (lib.init.startBefore) {
                                    lib.init.startBefore();
                                    delete lib.init.startBefore;
                                }
                                ui.create.arena();
                                game.createEvent('game', false)
                                    .setContent(lib.init.start);
                                if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode].fromextension) {
                                    var startstr = mode[lib.config.mode].start.toString();
                                    if (startstr.indexOf('onfree') == -1) {
                                        setTimeout(lib.init.onfree, 500);
                                    }
                                }
                                delete lib.init.start;
                                game.loop();
                            }
                        }
                        var proceed = function() {
                            if (!lib.db) {
                                try {
                                    lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib.config.mode));
                                    if (typeof lib.storage != 'object') throw ('err');
                                    if (lib.storage == null) throw ('err');
                                } catch (err) {
                                    lib.storage = {};
                                    localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
                                }
                                proceed2();
                            } else {
                                game.getDB('data', lib.config.mode, function(obj) {
                                    lib.storage = obj || {};
                                    proceed2();
                                });
                            }
                        };
                        //界面函数		
                        if (!lib.imported.mode || !lib.imported.mode[lib.config.mode]) {
                            window.inSplash = true;
                            clearTimeout(window.resetGameTimeout);
                            delete window.resetGameTimeout;
                            var clickedNode = false;
                            //退出按钮的函数					
                            //点击模式按钮						
                            var clickNodek = function() {
                                window.tipsClick('PopUp');//选择
                                //该接口修改点击按钮时背景图片变化
                                var splash = document.getElementById("splash");
                                splash.setBackgroundImage('extension/如真似幻/images/mode/' + this.link + '.jpg');
                                var cxk = document.getElementsByClassName('cxk')[0];
                                cxk.classList.remove('cxk');
                                this.classList.add('cxk');
                            };
                            var clickNode = function() {
                                if (clickedNode) return;
                                clickedNode = true;
                                //将进模式link选择的模式
                                var selectedNode = document.getElementsByClassName('cxk')[0];
                                lib.config.mode = selectedNode.link;
                                game.saveConfig('mode', selectedNode.link);
                                if (game.layout != 'mobile' && lib.layoutfixed.indexOf(lib.config.mode) !== -1) {
                                    game.layout = 'mobile';
                                    ui.css.layout.href = lib.assetURL + 'layout/' + game.layout +
                                        '/layout.css';
                                } else if (game.layout == 'mobile' && lib.config.layout != 'mobile' && lib.layoutfixed.indexOf(lib.config.mode) === -1) {
                                    game.layout = lib.config.layout;
                                    if (game.layout == 'default') {
                                        ui.css.layout.href = '';
                                    } else {
                                        ui.css.layout.href = lib.assetURL + 'layout/' + game.layout +
                                            '/layout.css';
                                    }
                                }
                                splash.delete(1000);
                                delete window.inSplash;
                                window.resetGameTimeout = setTimeout(lib.init.reset, 5000);

                                selectedNode.listenTransition(function() {
                                    lib.init.js(lib.assetURL + 'mode', lib.config.mode, proceed);
                                }, 500);
                            }
                            var downNode = function() {
                                this.classList.add('glow');
                            }
                            var upNode = function() {
                                this.classList.remove('glow');
                            }
                            var splash = ui.create.div('#splash', document.body);
                            if (lib.config.touchscreen) {
                                splash.classList.add('touch');
                                lib.setScroll(splash);
                            }
                            if (lib.config.player_border != 'wide') {
                                splash.classList.add('slim');
                            }
                            //创建enter按钮					
                            var bigEnter = document.createElement('img');
                            bigEnter.src = lib.assetURL + 'extension/如真似幻/images/offline/kaizhan.png'
                            bigEnter.width = 100;
                            bigEnter.id = 'bigenter'; // 设置元素的 ID
                            splash.appendChild(bigEnter);
                            // 添加click事件监听器
                            // 已添加＜=110px的判断，减少误触
                            bigEnter.addEventListener('click', () => {
    // 获取元素中心点坐标
    const rect = bigEnter.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 获取鼠标点击位置
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 计算鼠标点击位置与元素中心点的距离
    const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));

    // 如果距离超过110px，则结束此事件
    if (distance > 110) {
      return;
    }
                                window.tipsClick('QuickStart');//开战
                                // 执行clickNode函数，并在执行后立即删除click事件监听器
                                window.clickBigEnter=function(num,sum,size) {
                                    var opa=(sum-num)/sum;
                                    if(size) opa=1-opa;
                                    opa2=Math.pow(opa,2);
                                    bigEnter.style.transform='scale('+(1-opa2*0.4)+')';
                                    bigEnter.style.opacity=1-opa*0.4;
                                    if(num>0) {
                                        setTimeout(function() {
                                            window.clickBigEnter(num-1,sum,size);
                                        },15);
                                    }else {
                                        if(!size) {
                                            window.clickBigEnter(sum,sum,true);
                                        }
                                    }
                                }
                                window.clickBigEnter(10,10,false);
                                setTimeout(function(){
                                    clickNode(), bigEnter.removeEventListener('click', arguments.callee);
                                },300);
                            });
                            //🥚🐔贴吧？不存在滴
                            var offlineTextBlank = document.createElement('img');
                            offlineTextBlank.src = lib.assetURL + 'extension/如真似幻/images/offline/blank.png'
                            //offlineTextBlank.id = 'offlinetext'; // 设置元素的 ID
                            offlineTextBlank.style.position='fixed';
                            offlineTextBlank.style.zIndex='12';
                            offlineTextBlank.style.opacity=0.8;
                            offlineTextBlank.style.marginTop='0px';
                            offlineTextBlank.style.width='47%';
                            offlineTextBlank.style.height='150px';
                            offlineTextBlank.style.pointerEvents='none';
                            //offlineTextBlank.style.top='0';
                            offlineTextBlank.style.left='0';
                            //offlineTextBlank.style.transform='rotateY(180deg)';
                            splash.appendChild(offlineTextBlank);
                            //这里结束
                            var offlineText = document.createElement('img');
                            offlineText.src = lib.assetURL + 'extension/如真似幻/images/offline/offlinetext.png'
                            offlineText.id = 'offlinetext'; // 设置元素的 ID
                            splash.appendChild(offlineText);
                            var logOut = document.createElement('img');
                            logOut.src = lib.assetURL + 'extension/如真似幻/images/offline/button.png'
                            logOut.id = 'logout'; // 设置元素的 ID
                            splash.appendChild(logOut);
                            splash.setBackgroundImage('extension/如真似幻/images/mode/identity.jpg');
                            // 缓存logOut按钮
                            // 添加click事件监听器
                            logOut.addEventListener('click', (event) => {
                                // 如果被点击的元素是logOut按钮，执行相应操作并删除click事件监听器
                                event.target === logOut && (
                                localStorage.removeItem('Network'),
                                window.location.href = lib.assetURL + 'extension/如真似幻/html/rzsh.html',
                                logOut.removeEventListener('click', arguments.callee));
                            });
                            splash.dataset.radius_size = lib.config.radius_size;
                            for (var i = 0; i < lib.config.all.mode.length; i++) {
                                let node = ui.create.div('.hidden', splash, clickNodek);
                                if (i == 0) node.classList.add('cxk');
                                node.link = lib.config.all.mode[i];
                                //去掉br
                                let modeText=get.translation(lib.config.all.mode[i]);
                                ui.create.div(node, '.splashtexthela', modeText);
                                ui.create.div(node, '.splashtext2hela', modeText);
                                var avatarnode = ui.create.div(node, '.avatar');
                                if (lib.config.all.stockmode.indexOf(lib.config.all.mode[i]) != -1) {
                                    //var avatarnode = ui.create.div(node, '.avatar');
                                    avatarnode.setBackgroundImage('image/splash/' + lib.config.all.mode[i] + '.jpg');
                                } else {
                                    //var avatarnode = ui.create.div(node, '.avatar');
                                    var avatarbg = lib.mode[lib.config.all.mode[i]].splash;
                                    if (avatarbg.indexOf('ext:') == 0) {
                                        avatarnode.setBackgroundImage(avatarbg.replace(/ext:/, 'extension/'));
                                    } else {
                                        avatarnode.setBackgroundDB(avatarbg);
                                    }
                                }
                                //启动界面修修修
                                avatarnode.style.transform='scale(0.88,0.85)';
                                avatarnode.style.width='200px';
                                //avatarnode.setBackgroundImage('extension/如真似幻/images/lbtn.png');
                                var avatarnode2 = ui.create.div(node/*, '.avatar'*/);//ui.create.div(avatarnode);
                                avatarnode2.setBackgroundImage('extension/如真似幻/images/lbtn.png');
                                //avatarnode2.style.backgroundImage='url("'+lib.assetURL+'extension/如真似幻/images/lbtn.png'+'")';
                                /*avatarnode2.style.width='100%';
                                avatarnode2.style.height='100%';*/
                                avatarnode2.style.backgroundSize='100% 100%';
                                avatarnode2.style.backgroundPosition='center center';
                                
                                avatarnode2.style.width='200px';
                                avatarnode2.style.height='calc(100% - 0px)';
                                avatarnode2.style.left='-0.5px';
                                avatarnode2.style.top='-1px';
                                //avatarnode2.style.background-position:center 15% !important;
                                avatarnode2.style.filter='drop-shadow(0px 0px 5px rgba(0,0,0,0.5)) brightness(1.05)';
                                //avatarnode2.style.border='none';
                                if (!lib.config.touchscreen) {
                                    node.addEventListener('mousedown', downNode);
                                    node.addEventListener('mouseup', upNode);
                                    node.addEventListener('mouseleave', upNode);
                                }
                                setTimeout((function(node) {
                                    return function() {
                                        node.show();
                                    }
                                }(node)), i * 100);
                            }
                            if (lib.config.mousewheel) {
                                splash.onmousewheel = ui.click.mousewheel;
                            }
                        } else {
                            proceed();
                        }
                        localStorage.removeItem(lib.configprefix + 'directstart');
                        delete lib.init.init;

                    }
                } else {
                    lib.init.onload = function() {
                        console.time('y加载完毕')
                        console.time('Z加载完毕')
                        console.time('g加载完毕');
                        console.time('p加载完毕');
                        ui.updated();

                    //    lib.init.js(lib.assetURL + 'extension/如真似幻/js', 'dynamicSkin');
                        game.documentZoom = game.deviceZoom;
                        if (game.documentZoom != 1) {
                            ui.updatez();
                        }
                        ui.background = ui.create.div('.background');
                        ui.background.style.backgroundSize = "cover";
                        ui.background.style.backgroundPosition = '50% 50%';
                        if (lib.config.image_background && lib.config.image_background != 'default' && lib.config.image_background.indexOf('custom_') != 0) {
                            ui.background.setBackgroundImage('image/background/' + lib.config.image_background +
                                '.jpg');
                            if (lib.config.image_background_blur) {
                                ui.background.style.filter = 'blur(8px)';
                                ui.background.style.webkitFilter = 'blur(8px)';
                                ui.background.style.transform = 'scale(1.05)';
                            }
                        }
                        document.documentElement.style.backgroundImage = '';
                        document.documentElement.style.backgroundSize = '';
                        document.documentElement.style.backgroundPosition = '';
                        document.body.insertBefore(ui.background, document.body.firstChild);
                        document.body.onresize = ui.updatexr;
                        if (lib.config.touchscreen) {
                            document.body.addEventListener('touchstart', function(e) {
                                this.startX = e.touches[0].clientX / game.documentZoom;
                                this.startY = e.touches[0].clientY / game.documentZoom;
                                _status.dragged = false;
                            });
                            document.body.addEventListener('touchmove', function(e) {
                                if (_status.dragged) return;
                                if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) > 10 || Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) > 10) {
                                    _status.dragged = true;
                                }
                            });
                        }
                        if (lib.config.image_background.indexOf('custom_') == 0) {
                            ui.background.style.backgroundImage = "none";
                            game.getDB('image', lib.config.image_background, function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    ui.background.style.backgroundImage = 'url(' + data + ')';
                                    if (lib.config.image_background_blur) {
                                        ui.background.style.filter = 'blur(8px)';
                                        ui.background.style.webkitFilter = 'blur(8px)';
                                        ui.background.style.transform = 'scale(1.05)';
                                    }
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.card_style == 'custom') {
                            game.getDB('image', 'card_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.card_stylesheet) {
                                        ui.css.card_stylesheet.remove();
                                    }
                                    ui.css.card_stylesheet = lib.init.sheet(
                                        '.card:not(*:empty){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.cardback_style == 'custom') {
                            game.getDB('image', 'cardback_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.cardback_stylesheet) {
                                        ui.css.cardback_stylesheet.remove();
                                    }
                                    ui.css.cardback_stylesheet = lib.init.sheet(
                                        '.card:empty,.card.infohidden{background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'cardback_style2', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.cardback_stylesheet2) {
                                        ui.css.cardback_stylesheet2.remove();
                                    }
                                    ui.css.cardback_stylesheet2 = lib.init.sheet(
                                        '.card.infohidden:not(.infoflip){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.hp_style == 'custom') {
                            game.getDB('image', 'hp_style1', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet1) {
                                        ui.css.hp_stylesheet1.remove();
                                    }
                                    ui.css.hp_stylesheet1 = lib.init.sheet(
                                        '.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style2', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet2) {
                                        ui.css.hp_stylesheet2.remove();
                                    }
                                    ui.css.hp_stylesheet2 = lib.init.sheet(
                                        '.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style3', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet3) {
                                        ui.css.hp_stylesheet3.remove();
                                    }
                                    ui.css.hp_stylesheet3 = lib.init.sheet(
                                        '.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style4', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet4) {
                                        ui.css.hp_stylesheet4.remove();
                                    }
                                    ui.css.hp_stylesheet4 = lib.init.sheet(
                                        '.hp:not(.text):not(.actcount)>.lost{background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.player_style == 'custom') {
                            ui.css.player_stylesheet = lib.init.sheet(
                                '#window .player{background-image:none;background-size:100% 100%;}');
                            game.getDB('image', 'player_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.player_stylesheet) {
                                        ui.css.player_stylesheet.remove();
                                    }
                                    ui.css.player_stylesheet = lib.init.sheet(
                                        '#window .player{background-image:url("' + fileLoadedEvent.target.result +
                                        '");background-size:100% 100%;}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.border_style == 'custom') {
                            game.getDB('image', 'border_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.border_stylesheet) {
                                        ui.css.border_stylesheet.remove();
                                    }
                                    ui.css.border_stylesheet = lib.init.sheet();
                                    ui.css.border_stylesheet.sheet.insertRule(
                                        '#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
                                    ui.css.border_stylesheet.sheet.insertRule(
                                        '.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}',
                                    0);
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.control_style == 'custom') {
                            game.getDB('image', 'control_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.control_stylesheet) {
                                        ui.css.control_stylesheet.remove();
                                    }
                                    ui.css.control_stylesheet = lib.init.sheet(
                                        '#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        if (lib.config.menu_style == 'custom') {
                            game.getDB('image', 'menu_style', function(fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function(fileLoadedEvent) {
                                    if (ui.css.menu_stylesheet) {
                                        ui.css.menu_stylesheet.remove();
                                    }
                                    ui.css.menu_stylesheet = lib.init.sheet(
                                        'html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result +
                                        '");background-size:cover}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        (() => {
                            if (!localStorage.getItem('loggedIn')) document.body.remove();
                            var character = lib.imported.character;
                            /*if(character['thunder']&&lib.config&&lib.config['extension_雷霆万钧_hidePack']) {
                                delete character['thunder'];
                            }*/
                            var i, j, k;
                            lib.rank = window.noname_character_rank;
                            var connectCharacterPack = [];
                            for (i in character) {
                                if (character[i].character) {
                                    lib.characterPack[i] = character[i].character
                                }
                                for (j in character[i]) {
                                    if (j == 'mode' || j == 'forbid') continue;
                                    if (j == 'connect') {
                                        connectCharacterPack.push(i);
                                        continue;
                                    }
                                    if (j == 'character' && !lib.config.characters.contains(i) && lib.config.mode != 'connect') {
                                        if (lib.config.mode == 'chess' && get.config('chess_mode') ==
                                            'leader') {
                                            for (k in character[i][j]) {
                                                lib.hiddenCharacters.push(k);
                                            }
                                        } else if (lib.config.mode != 'boss' || i != 'boss') {
                                            continue;
                                        }
                                    }
                                    if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
                                        lib[j].addArray(character[i][j]);
                                        continue;
                                    }
                                    for (k in character[i][j]) {
                                        if (j == 'character') {
                                            if (!character[i][j][k][4]) {
                                                character[i][j][k][4] = [];
                                            }
                                            if (character[i][j][k][4].contains('boss') || character[i][j][k][4].contains('hiddenboss')) {
                                                lib.config.forbidai.add(k);
                                            }
                                            if (lib.config.forbidai_user && lib.config.forbidai_user.contains(k)) {
                                                lib.config.forbidai.add(k);
                                            }
                                            for (var l = 0; l < character[i][j][k][3].length; l++) {
                                                lib.skilllist.add(character[i][j][k][3][l]);
                                            }
                                        }
                                        if (j == 'skill' && k[0] == '_' && (!lib.config.characters.contains(
                                        i) || (lib.config.mode == 'connect' && !character[i].connect))) {
                                            continue;
                                        }
                                        if (j == 'translate' && k == i) {
                                            lib[j][k + '_character_config'] = character[i][j][k];
                                        } else {
                                            if (lib[j][k] == undefined) {
                                                if (j == 'skill' && lib.config.mode == 'connect' && !character[i].connect) {
                                                    lib[j][k] = {
                                                        nopop: character[i][j][k].nopop,
                                                        derivation: character[i][j][k].derivation
                                                    };
                                                } else {
                                                    lib[j][k] = character[i][j][k];
                                                }
                                            } else if (Array.isArray(lib[j][k]) && Array.isArray(character[
                                            i][j][k])) {
                                                lib[j][k].addArray(character[i][j][k]);
                                            } else {}
                                        }
                                    }
                                }
                            }
                        })()
                        var proceed2 = function() {
                            var mode = lib.imported.mode;
                            var card = lib.imported.card;
                            var character = lib.imported.character;
                            /*if(character['thunder']&&lib.config&&lib.config['extension_雷霆万钧_hidePack']) {
                                delete character['thunder'];
                            }*/
                            var play = lib.imported.play;
                            delete window.game;
                            var i, j, k;
                            for (i in mode[lib.config.mode].element) {
                                if (!lib.element[i]) lib.element[i] = [];
                                for (j in mode[lib.config.mode].element[i]) {
                                    if (j == 'init') {
                                        if (!lib.element[i].inits) lib.element[i].inits = [];
                                        lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
                                    } else {
                                        lib.element[i][j] = mode[lib.config.mode].element[i][j];
                                    }
                                }
                            }
                            for (i in mode[lib.config.mode].ai) {
                                if (typeof mode[lib.config.mode].ai[i] == 'object') {
                                    if (ai[i] == undefined) ai[i] = {};
                                    for (j in mode[lib.config.mode].ai[i]) {
                                        ai[i][j] = mode[lib.config.mode].ai[i][j];
                                    }
                                } else {
                                    ai[i] = mode[lib.config.mode].ai[i];
                                }
                            }
                            for (i in mode[lib.config.mode].ui) {
                                if (typeof mode[lib.config.mode].ui[i] == 'object') {
                                    if (ui[i] == undefined) ui[i] = {};
                                    for (j in mode[lib.config.mode].ui[i]) {
                                        ui[i][j] = mode[lib.config.mode].ui[i][j];
                                    }
                                } else {
                                    ui[i] = mode[lib.config.mode].ui[i];
                                }
                            }
                            for (i in mode[lib.config.mode].game) {
                                game[i] = mode[lib.config.mode].game[i];
                            }
                            for (i in mode[lib.config.mode].get) {
                                get[i] = mode[lib.config.mode].get[i];
                            }
                            lib.init.start = mode[lib.config.mode].start;
                            lib.init.startBefore = mode[lib.config.mode].startBefore;
                            if (game.onwash) {
                                lib.onwash.push(game.onwash);
                                delete game.onwash;
                            }
                            if (game.onover) {
                                lib.onover.push(game.onover);
                                delete game.onover;
                            }
                            lib.config.banned = lib.config[lib.config.mode + '_banned'] || [];
                            lib.config.bannedcards = lib.config[lib.config.mode + '_bannedcards'] || [];

                            lib.rank = window.noname_character_rank;
                            delete window.noname_character_rank;
                            for (i in mode[lib.config.mode]) {
                                if (i == 'element') continue;
                                if (i == 'game') continue;
                                if (i == 'ai') continue;
                                if (i == 'ui') continue;
                                if (i == 'get') continue;
                                if (i == 'config') continue;
                                if (i == 'onreinit') continue;
                                if (i == 'start') continue;
                                if (i == 'startBefore') continue;
                                if (lib[i] == undefined) lib[i] = (Array.isArray(mode[lib.config.mode][
                                i])) ? [] : {};
                                for (j in mode[lib.config.mode][i]) {
                                    lib[i][j] = mode[lib.config.mode][i][j];
                                }
                            }
                            if (typeof mode[lib.config.mode].init == 'function') {
                                mode[lib.config.mode].init();
                            }

                            var connectCharacterPack = [];
                            var connectCardPack = [];
                            for (i in character) {
                                if (character[i].character) {
                                    lib.characterPack[i] = character[i].character
                                }
                                for (j in character[i]) {
                                    if (j == 'mode' || j == 'forbid') continue;
                                    if (j == 'connect') {
                                        connectCharacterPack.push(i);
                                        continue;
                                    }
                                    if (j == 'character' && !lib.config.characters.contains(i) && lib.config.mode != 'connect') {
                                        if (lib.config.mode == 'chess' && get.config('chess_mode') ==
                                            'leader') {
                                            for (k in character[i][j]) {
                                                lib.hiddenCharacters.push(k);
                                            }
                                        } else if (lib.config.mode != 'boss' || i != 'boss') {
                                            continue;
                                        }
                                    }
                                    if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
                                        lib[j].addArray(character[i][j]);
                                        continue;
                                    }
                                    for (k in character[i][j]) {
                                        if (j == 'character') {
                                            if (!character[i][j][k][4]) {
                                                character[i][j][k][4] = [];
                                            }
                                            if (character[i][j][k][4].contains('boss') || character[i][j][k][4].contains('hiddenboss')) {
                                                lib.config.forbidai.add(k);
                                            }
                                            if (lib.config.forbidai_user && lib.config.forbidai_user.contains(k)) {
                                                lib.config.forbidai.add(k);
                                            }
                                            for (var l = 0; l < character[i][j][k][3].length; l++) {
                                                lib.skilllist.add(character[i][j][k][3][l]);
                                            }
                                        }
                                        if (j == 'skill' && k[0] == '_' && (!lib.config.characters.contains(
                                        i) || (lib.config.mode == 'connect' && !character[i].connect))) {
                                            continue;
                                        }
                                        if (j == 'translate' && k == i) {
                                            lib[j][k + '_character_config'] = character[i][j][k];
                                        } else {
                                            if (lib[j][k] == undefined) {
                                                if (j == 'skill' && lib.config.mode == 'connect' && !character[i].connect) {
                                                    lib[j][k] = {
                                                        nopop: character[i][j][k].nopop,
                                                        derivation: character[i][j][k].derivation
                                                    };
                                                } else {
                                                    lib[j][k] = character[i][j][k];
                                                }
                                                if (j == 'card' && lib[j][k].derivation) {
                                                    if (!lib.cardPack.mode_derivation) {
                                                        lib.cardPack.mode_derivation = [k];
                                                    } else {
                                                        lib.cardPack.mode_derivation.push(k);
                                                    }
                                                }
                                            } else if (Array.isArray(lib[j][k]) && Array.isArray(character[
                                            i][j][k])) {
                                                lib[j][k].addArray(character[i][j][k]);
                                            } else {
                                                /*	console.log('dublicate ' + j + ' in character ' + i +
														':\n' + k + '\n' + ': ' + lib[j][k] + '\n' +
														character[i][j][k]);*/
                                            }
                                        }
                                    }
                                }
                            }
                            var connect_avatar_list = [];
                            for (var i in lib.character) {
                                connect_avatar_list.push(i);
                            }
                            connect_avatar_list.sort(lib.sort.capt);
                            for (var i = 0; i < connect_avatar_list.length; i++) {
                                var ia = connect_avatar_list[i];
                                lib.mode.connect.config.connect_avatar.item[ia] = lib.translate[ia];
                            }
                            if (lib.config.mode != 'connect') {
                                var pilecfg = lib.config.customcardpile[get.config('cardpilename') ||
                                    '当前牌堆'];
                                if (pilecfg) {
                                    lib.config.bannedpile = get.copy(pilecfg[0] || {});
                                    lib.config.addedpile = get.copy(pilecfg[1] || {});
                                } else {
                                    lib.config.bannedpile = {};
                                    lib.config.addedpile = {};
                                }
                            } else {
                                lib.cardPackList = {};
                            }
                            for (i in card) {
                                lib.cardPack[i] = [];
                                if (card[i].card) {
                                    for (var j in card[i].card) {
                                        if (!card[i].card[j].hidden && card[i].translate[j + '_info']) {
                                            lib.cardPack[i].push(j);
                                        }
                                    }
                                }
                                for (j in card[i]) {
                                    if (j == 'mode' || j == 'forbid') continue;
                                    if (j == 'connect') {
                                        connectCardPack.push(i);
                                        continue;
                                    }
                                    if (j == 'list') {
                                        if (lib.config.mode == 'connect') {
                                            lib.cardPackList[i] = card[i][j];
                                        } else {
                                            if (lib.config.cards.contains(i)) {
                                                var pile;
                                                if (typeof card[i][j] == 'function') {
                                                    pile = card[i][j]();
                                                } else {
                                                    pile = card[i][j];
                                                }
                                                lib.cardPile[i] = pile.slice(0);
                                                if (lib.config.bannedpile[i]) {
                                                    for (var k = 0; k < lib.config.bannedpile[i].length; k++) {
                                                        pile[lib.config.bannedpile[i][k]] = null;
                                                    }
                                                }
                                                for (var k = 0; k < pile.length; k++) {
                                                    if (!pile[k]) {
                                                        pile.splice(k--, 1);
                                                    }
                                                }
                                                if (lib.config.addedpile[i]) {
                                                    for (var k = 0; k < lib.config.addedpile[i].length; k++) {
                                                        pile.push(lib.config.addedpile[i][k]);
                                                    }
                                                }
                                                lib.card.list = lib.card.list.concat(pile);
                                            }
                                        }
                                    } else {
                                        for (k in card[i][j]) {
                                            if (j == 'skill' && k[0] == '_' && (!lib.config.cards.contains(
                                            i) || (lib.config.mode == 'connect' && !card[i].connect))) {
                                                continue;
                                            }
                                            if (j == 'translate' && k == i) {
                                                lib[j][k + '_card_config'] = card[i][j][k];
                                            } else {
                                                if (lib[j][k] == undefined) {
                                                    if (j == 'skill' && lib.config.mode == 'connect' && !card[i].connect) {
                                                        lib[j][k] = {
                                                            nopop: card[i][j][k].nopop,
                                                            derivation: card[i][j][k].derivation
                                                        };
                                                    } else {
                                                        lib[j][k] = card[i][j][k];
                                                    }
                                                } else console.log('dublicate ' + j + ' in card ' + i +
                                                    ':\n' + k + '\n' + lib[j][k] + '\n' + card[i][j][k]);
                                                if (j == 'card' && lib[j][k].derivation) {
                                                    if (!lib.cardPack.mode_derivation) {
                                                        lib.cardPack.mode_derivation = [k];
                                                    } else {
                                                        lib.cardPack.mode_derivation.push(k);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (lib.cardPack.mode_derivation) {
                                for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
                                    if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivation ==
                                        'string' && !lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]) {
                                        lib.cardPack.mode_derivation.splice(i--, 1);
                                    } else if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivationpack == 'string' && !lib.config.cards.contains(lib.card[
                                    lib.cardPack.mode_derivation[i]].derivationpack)) {
                                        lib.cardPack.mode_derivation.splice(i--, 1);
                                    }
                                }
                                if (lib.cardPack.mode_derivation.length == 0) {
                                    delete lib.cardPack.mode_derivation;
                                }
                            }
                            if (lib.config.mode != 'connect') {
                                for (i in play) {
                                    if (lib.config.hiddenPlayPack.contains(i)) continue;
                                    if (play[i].forbid && play[i].forbid.contains(lib.config.mode)) continue;
                                    if (play[i].mode && play[i].mode.contains(lib.config.mode) == false) continue;
                                    for (j in play[i].element) {
                                        if (!lib.element[j]) lib.element[j] = [];
                                        for (k in play[i].element[j]) {
                                            if (k == 'init') {
                                                if (!lib.element[j].inits) lib.element[j].inits = [];
                                                lib.element[j].inits.push(play[i].element[j][k]);
                                            } else {
                                                lib.element[j][k] = play[i].element[j][k];
                                            }
                                        }
                                    }
                                    for (j in play[i].ui) {
                                        if (typeof play[i].ui[j] == 'object') {
                                            if (ui[j] == undefined) ui[j] = {};
                                            for (k in play[i].ui[j]) {
                                                ui[j][k] = play[i].ui[j][k];
                                            }
                                        } else {
                                            ui[j] = play[i].ui[j];
                                        }
                                    }
                                    for (j in play[i].game) {
                                        game[j] = play[i].game[j];
                                    }
                                    for (j in play[i].get) {
                                        get[j] = play[i].get[j];
                                    }
                                    for (j in play[i]) {
                                        if (j == 'mode' || j == 'forbid' || j == 'init' || j == 'element' || j == 'game' || j == 'get' || j == 'ui' || j == 'arenaReady') continue;
                                        for (k in play[i][j]) {
                                            if (j == 'translate' && k == i) {
                                                // lib[j][k+'_play_config']=play[i][j][k];
                                            } else {
                                                if (lib[j][k] != undefined) {
                                                    console.log('dublicate ' + j + ' in play ' + i + ':\n' + k + '\n' + ': ' + lib[j][k] + '\n' + play[i][j][
                                                    k]);
                                                }
                                                lib[j][k] = play[i][j][k];
                                            }
                                        }
                                    }
                                    if (typeof play[i].init == 'function') play[i].init();
                                    if (typeof play[i].arenaReady == 'function') lib.arenaReady.push(play[i].arenaReady);
                                }
                            }

                            lib.connectCharacterPack = [];
                            lib.connectCardPack = [];
                            for (var i = 0; i < lib.config.all.characters.length; i++) {
                                var packname = lib.config.all.characters[i];
                                if (connectCharacterPack.contains(packname)) {
                                    lib.connectCharacterPack.push(packname)
                                }
                            }
                            for (var i = 0; i < lib.config.all.cards.length; i++) {
                                var packname = lib.config.all.cards[i];
                                if (connectCardPack.contains(packname)) {
                                    lib.connectCardPack.push(packname)
                                }
                            }
                            if (lib.config.mode != 'connect') {
                                for (i = 0; i < lib.card.list.length; i++) {
                                    if (lib.card.list[i][2] == 'huosha') {
                                        lib.card.list[i] = lib.card.list[i].slice(0);
                                        lib.card.list[i][2] = 'sha';
                                        lib.card.list[i][3] = 'fire';
                                    } else if (lib.card.list[i][2] == 'leisha') {
                                        lib.card.list[i] = lib.card.list[i].slice(0);
                                        lib.card.list[i][2] = 'sha';
                                        lib.card.list[i][3] = 'thunder';
                                    }
                                    if (!lib.card[lib.card.list[i][2]]) {
                                        lib.card.list.splice(i, 1);
                                        i--;
                                    } else if (lib.card[lib.card.list[i][2]].mode && lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode) == false) {
                                        lib.card.list.splice(i, 1);
                                        i--;
                                    }
                                }
                            }

                            if (lib.config.mode == 'connect') {
                                _status.connectMode = true;
                            }
                            if (window.isNonameServer) {
                                lib.cheat.i();
                            } else if (lib.config.dev && (!_status.connectMode || lib.config.debug)) {
                                lib.cheat.i();
                            }
                            lib.config.sort_card = get.sortCard(lib.config.sort);
                            delete lib.imported.character;
                            delete lib.imported.card;
                            delete lib.imported.mode;
                            delete lib.imported.play;
                            for (var i in lib.init) {
                                if (i.indexOf('setMode_') == 0) {
                                    delete lib.init[i];
                                }
                            }
                            var loadExtensionCallback = function() {
                                delete lib.extensions;
                                //琉璃版专用
                                if(typeof window.startLastRunExtensions=='function') {
                                    window.startLastRunExtensions();
                                }

                                if (lib.init.startBefore) {
                                    lib.init.startBefore();
                                    delete lib.init.startBefore;
                                }
                                ui.create.arena();
                                game.createEvent('game', false)
                                    .setContent(lib.init.start);
                                if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode].fromextension) {
                                    var startstr = mode[lib.config.mode].start.toString();
                                    if (startstr.indexOf('onfree') == -1) {
                                        setTimeout(lib.init.onfree, 500);
                                    }
                                }
                                delete lib.init.start;
                                game.loop();
                                try {
                                    app.emit('createArenaAfter');
                                } catch (err) {}
                            };
                            if (lib.config.extension_手杀ui_enable) {
                                if (!_status.connectMode) {
                                    var loadNextExtension = function() {
                                        var obj = lib.extensions.shift();
                                        if (obj) {
                                            try {
                                                _status.extension = obj[0];
                                                _status.evaluatingExtension = obj[3];
                                                if (obj[4]) {
                                                    if (obj[4].character) {
                                                        for (var j in obj[4].character.character) {
                                                            game.addCharacterPack(get.copy(obj[4].character));
                                                            break;
                                                        }
                                                    }
                                                    if (obj[4].card) {
                                                        for (var j in obj[4].card.card) {
                                                            game.addCardPack(get.copy(obj[4].card));
                                                            break;
                                                        }
                                                    }
                                                    if (obj[4].skill) {
                                                        for (var j in obj[4].skill.skill) {
                                                            game.addSkill(j, obj[4].skill.skill[j],
                                                            obj[4].skill.translate[j], obj[4].skill.translate[j + '_info']);
                                                        }
                                                    }
                                                }
                                                var func = obj[1](obj[2], obj[4]);
                                                if (typeof func === 'function') {
                                                    func(loadNextExtension);
                                                } else {
                                                    loadNextExtension();
                                                }
                                            } catch (e) {
                                                console.log(e);
                                                loadNextExtension();
                                            }
                                        } else {
                                            delete _status.extension;
                                            delete _status.evaluatingExtension;
                                            loadExtensionCallback();
                                        }
                                    };
                                    loadNextExtension();
                                } else {
                                    loadExtensionCallback();
                                }
                            } else {
                                if (!_status.connectMode) {
                                    for (var i = 0; i < lib.extensions.length; i++) {
                                        try {
                                            _status.extension = lib.extensions[i][0];
                                            _status.evaluatingExtension = lib.extensions[i][3];
                                            lib.extensions[i][1](lib.extensions[i][2], lib.extensions[i][4]);
                                            if (lib.extensions[i][4]) {
                                                if (lib.extensions[i][4].character) {
                                                    for (var j in lib.extensions[i][4].character.character) {
                                                        game.addCharacterPack(get.copy(lib.extensions[i][4].character));
                                                        break;
                                                    }
                                                }
                                                if (lib.extensions[i][4].card) {
                                                    for (var j in lib.extensions[i][4].card.card) {
                                                        game.addCardPack(get.copy(lib.extensions[i][4].card));
                                                        break;
                                                    }
                                                }
                                                if (lib.extensions[i][4].skill) {
                                                    for (var j in lib.extensions[i][4].skill.skill) {
                                                        game.addSkill(j, lib.extensions[i][4].skill.skill[j],
                                                        lib.extensions[i][4].skill.translate[j], lib.extensions[i][4].skill.translate[j + '_info']);
                                                    }
                                                }
                                            }
                                            delete _status.extension;
                                            delete _status.evaluatingExtension;
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }
                                }
                                delete lib.extensions;
                                //琉璃版专用
                                if(typeof window.startLastRunExtensions=='function') {
                                    window.startLastRunExtensions();
                                }

                                if (lib.init.startBefore) {
                                    lib.init.startBefore();
                                    delete lib.init.startBefore;
                                }
                                ui.create.arena();
                                game.createEvent('game', false)
                                    .setContent(lib.init.start);
                                if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode].fromextension) {
                                    var startstr = mode[lib.config.mode].start.toString();
                                    if (startstr.indexOf('onfree') == -1) {
                                        setTimeout(lib.init.onfree, 500);
                                    }
                                }
                                delete lib.init.start;
                                game.loop();
                            }
                        }
                        var proceed = function() {
                            if (!lib.db) {
                                try {
                                    lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib.config.mode));
                                    if (typeof lib.storage != 'object') throw ('err');
                                    if (lib.storage == null) throw ('err');
                                } catch (err) {
                                    lib.storage = {};
                                    localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
                                }
                                proceed2();
                            } else {
                                game.getDB('data', lib.config.mode, function(obj) {
                                    lib.storage = obj || {};
                                    proceed2();
                                });
                            }
                        };
                        //检测不到主题文件夹就恢复主题
                            if(lib.config.uiStyles && game.getFileList) game.getFileList('extension/如真似幻/images/uiStyles',function(folders,files){
                                if(!folders.contains(lib.config.uiStyles)) {
                                    game.saveConfig('uiStyles','经典主题');
                                    setTimeout(function(){game.reload3();},2000);
                                }
                            });
                        //界面函数		
                        if (!lib.imported.mode || !lib.imported.mode[lib.config.mode]) {
                            //恢复背景
                            game.isInMenu=true;
                            if(lib.config.image_background_story) ui.background.setBackgroundImage('extension/如真似幻/images/dark.jpg');
                            //ui.background.setBackgroundImage('image/background/1.jpg');
                            //	console.log(ui.click.charactercard)
                            let dpr = Math.max(window.devicePixelRatio * (window.documentZoom ? window.documentZoom : 1), 1);
                            //pixi主程序		        
                            const pixiapp = new PIXI.Application({
                                resizeTo: document.body,
                                backgroundAlpha: 0,
                                resolution: dpr,
                                autoDensity: true,
                            });
                    /*        window.dyapp = new PIXI.Application({
                                resizeTo: document.body,
                                backgroundAlpha: 0,
                                resolution: dpr,
                                autoDensity: true,
                            });*/
                            pixiapp.view.id = 'rzsh';
                            document.body.appendChild(pixiapp.view);
                            //加载按钮声
                            const btnmList = [{
                                name: 'Label',
                                path: 'extension/如真似幻/audio/sgs/Label.mp3'
                            }, {
                                name: 'Menu',
                                path: 'extension/如真似幻/audio/sgs/Menu.mp3'
                            }, {
                                name: 'MidButton',
                                path: 'extension/如真似幻/audio/sgs/MidButton.mp3'
                            }, {
                                name: 'Notice02',
                                path: 'extension/如真似幻/audio/sgs/Notice02.mp3'
                            }, {
                                name: 'Pop',
                                path: 'extension/如真似幻/audio/sgs/Pop.mp3'
                            }, {
                                name: 'Report01',
                                path: 'extension/如真似幻/audio/sgs/Report01.mp3'
                            }, {
                                name: 'PopUp',
                                path: 'extension/如真似幻/audio/sgs/PopUp.mp3'
                            }, {
                                name: 'TinyButton',
                                path: 'extension/如真似幻/audio/sgs/TinyButton.mp3'
                            }, {
                                name: 'TinyWindow',
                                path: 'extension/如真似幻/audio/sgs/TinyWindow.mp3'
                            }, {
                                name: 'Unlock',
                                path: 'extension/如真似幻/audio/sgs/Unlock.mp3'
                            }, {
                                name: 'WinButton',
                                path: 'extension/如真似幻/audio/sgs/WinButton.mp3'
                            }, {
                                name: 'QuickStart',
                                path: 'extension/如真似幻/audio/sgs/QuickStart.mp3'
                            }, ];
                            pixiapp.view.style.position = 'absolute';
                            pixiapp.view.style.left = '0px';
                            pixiapp.view.style.zIndex = '0';
                            pixiapp.view.style.top = '0px';
                        /*    dyapp.view.style.position = 'absolute';
                            dyapp.view.style.left = '0px';
                            dyapp.view.style.zIndex = '13';
                            dyapp.view.style.top = '0px';
                            dyapp.view.id='dyapp';
                            dyapp.view.style.setProperty('pointer-events','none')
                            window.dycontainer = new PIXI.Container();
                            dycontainer.width=0.25*dyapp.screen.width;
                            dycontainer.height=0.87*dyapp.screen.height;
                            dycontainer.position.set(200,32);
                            let dymask = new PIXI.Graphics();
                            dymask.beginFill(0x000000, 0.65);
                            dymask.drawRect(0, 0, 0.25* dyapp.screen.width, 0.87 * dyapp.screen.height);
                            dymask.endFill();
                            dycontainer.addChild(dymask);
                            //dyapp.state.interactive=false;
                            dymask.interactive=false;
                            dycontainer.interactive=false;

                            // 设置容器的遮罩
                            dycontainer.mask = dymask;

                            // 将容器添加到舞台
                            dyapp.stage.addChild(dycontainer);
*/

                            //闪光
                            let brightnessFilter = new PIXI.filters.AdjustmentFilter({
                                gamma: 1,
                            });
                            //将包关闭变暗
                            //console.log(lib.config.characters)
                            const characterclose = new PIXI.filters.AdjustmentFilter({
                                brightness: 0.5,
                            });
                            //载入图和背景图，留下开战骨骼变量
                            let spinelo, spinelo2, uibg, spineks, findpipei;
                        let renderProcess = null;
                        const ppw = pixiapp.screen.width / 1103;
                        const pph = pixiapp.screen.height / 514;
                        const pps = Math.min(ppw, pph);
                        //pixi加载器
                        const xloader = new PIXI.Loader();
                        //导入背景图
                        //game.storyBackground('1');
                        game.isRzJiemian=true;
                        xloader.add('spineloading', lib.assetURL + 'extension/如真似幻/spine/loding.skel');
                        if(lib.config.rzEpicSpine) {
                            //蝴蝶
                            if(!lib.config.rzNoHuDieSpine) {
                                xloader.add('spineloading2', lib.assetURL + 'extension/如真似幻/spine/hudie.skel');
                            }else {
                                xloader.add('spineloading2', lib.assetURL + 'extension/如真似幻/spine/blankSpine/hudie.skel');
                            }
                            //不放存在的背景文件，使用自定义的背景
                            xloader.add('loadingbg', lib.assetURL + 'extension/如真似幻/images/bg.jpg');
                            xloader.add('loadingbg2', lib.assetURL + 'extension/如真似幻/images/hom.jpg');
                        }
                        //var bgnum=lib.config.rzsh_bgnum?lib.config.rzsh_bgnum:'1';
                        var bgnum=lib.config.uiStyles?lib.config.uiStyles:'经典主题';
                        
                        var bgnums='';
                        if(lib.config.rzEpicSpine) bgnums='s'+bgnums;
                        //xloader.add('uiBG', lib.assetURL + 'extension/如真似幻/images/bg'+bgnum+'.jpg');
                        xloader.add('uiBG', lib.assetURL + 'extension/如真似幻/images/uiStyles/'+bgnum+'/bg'+bgnums+'.jpg');
                        if(!lib.config.rzEpicSpine) {
                            xloader.add('homBG' ,lib.assetURL + 'extension/如真似幻/images/hom.jpg');// 添加载入图并命名为'homBG'
                        }
                        if(lib.config.rzEpicSpine) {
                            //动态烟花
                            if(!lib.config.rzNoHuDieSpine) {
                                xloader.add('uiBG3', lib.assetURL + 'extension/如真似幻/spine/yanhua.skel');
                            }else {
                                xloader.add('uiBG3', lib.assetURL + 'extension/如真似幻/spine/blankSpine/hudie.skel');
                            }
                        }
                        window.uibg3Aready=false;
                        //yzgp全部加载完后才解锁武将按钮
                        game.isUnlockDialogs={
                                    y:false,
                                    z:false,
                                    g:false,
                                    p:false,
                                };
                        game.isUnlockDialogDo=function(abc){
                            game.isUnlockDialogs[abc]=true;
                            var alltrue=true;
                            for(var a in game.isUnlockDialogs) {
                                if(!game.isUnlockDialogs[a]) alltrue=false;
                            }
                            if(alltrue) game.isUnlockDialog=true;
                        };
                        window.rz_hasVideoBGS = false;
                        if(lib.config.rzEpicSpine) {
                            
                            //预加载判断是否存在动态视频
                            game.getFileList('extension/如真似幻/images/uiStyles/'+bgnum,function(folders,files){
                                if(files.includes(`bg${bgnums}.mp4`)) {
                                    window.rz_hasVideoBGS = `extension/如真似幻/images/uiStyles/${bgnum}/bg${bgnums}.mp4`;
                                }
                            });
                            
                            xloader.load(() => {
                                spinelo = new PIXI.spine.Spine(xloader.resources.spineloading.spineData);
                                uibg = new PIXI.Sprite(xloader.resources.loadingbg2.texture);//萌新修改，去除了原先冗杂的uibg2，减少了进入时的错误
                                uibg.width = pixiapp.screen.width;
                                uibg.height = pixiapp.screen.height;
                                
                                //骨骼加载完毕后如果前面判断到有了这里直接写函数
                                if(window.rz_hasVideoBGS) {
                                    uibg.playVideoTheme = function(close, type) {
                                        if(type == 'delete') return; 
                                        uibg.alpha = close ? 1 : 0;
                                        //if(type != 'soon') ui.background.setBackgroundImage('extension/如真似幻/images/dark.jpg');
                                        _status.tempVideoBackground = close ? undefined : window.rz_hasVideoBGS;
                                        game.updateBackground();
                                    }
                                }
                                pixiapp.stage.addChild(uibg, spinelo);
                                pixiapp.stage.setChildIndex(uibg, 0);
                                spinelo.state.setAnimation(0, 'idle', true);
                                /*spinelo.x = 0.51 * pixiapp.screen.width;
                                spinelo.y = 0.5 * pixiapp.screen.height;
                                spinelo.scale.set(0.75);*/
                                spinelo.x = 0.5 * pixiapp.screen.width;
                                spinelo.y = 0.5 * pixiapp.screen.height;
                                spinelo.scale.set(0.8);//0.95
                                // 随机的三国杀文本
                                let sanguoTexts = [
                                    '三国杀是一款流行的桌面卡牌游戏，基于三国历史背景。',
                                    '在三国杀中，玩家需要策略地使用各种角色卡牌来击败对手。',
                                    '诸葛亮、曹操和刘备是三国杀中的著名角色。',
                                    '游戏中的卡牌包括杀、闪、桃等各种不同的功能。',
                                    '每位角色都有独特的技能和特点，增加了游戏的变化性。',
                                    '三国杀的策略性和战术性使其成为一款受欢迎的卡牌游戏。',
                                    '在三国杀中，胜利需要巧妙地使用卡牌和角色技能。',
                                    '游戏中的合作和背叛元素增加了战局的紧张感。',
                                    '使用你喜欢的武将，积累武将经验，可以获得炫酷的武将表现效果',
                                    '付费购买的武将及招募的武将均可以分解成一定数量的将魂',
                                    '开通会员后，可以加速等级的提升哦',
                                ];
                                // 创建一个随机的三国杀文本
                                function getRandomSanguoText() {
                                    return sanguoTexts[Math.floor(Math.random() * sanguoTexts.length)];
                                }
                                let sanguoTip = new PIXI.Text(getRandomSanguoText(), {
                                    fontSize: 17,
                                    fill: '#DAA520',
                                    fontFamily: 'shousha'
                                });
                                sanguoTip.anchor.set(0.5);
                                sanguoTip.x = 0.51 * pixiapp.screen.width; // 调整文本位置
                                sanguoTip.y = 0.95 * pixiapp.screen.height; // 调整文本位置
                                pixiapp.stage.addChild(sanguoTip);
                                // 每隔一段时间更新文本内容
                                //sanguoTip.text = getRandomSanguoText();
                                setInterval(function() {
                                //setTimeout(function() {
                                    if(sanguoTip.text&&sanguoTip.text!="") sanguoTip.text = getRandomSanguoText();
                                }, 1000); // 更新间隔时间，以毫秒为单位
                                /*setTimeout(function(){
                                    sanguoTip.text = '';
                                }, 1600);*/
                                window.sanguoTipClose=function(){
                                    sanguoTip.text = '';
                                }
                                var shorttime=1200;
                                if(!sessionStorage.getItem('longSpineLoad')) {
                                    sessionStorage.setItem('longSpineLoad',true);
                                    shorttime=2000;
                                }
                                //打开加载界面
                                setTimeout(function(){
                                    pixiapp.stage.removeChild(sanguoTip, spinelo);//萌新修改
                                    uibg3 = new PIXI.spine.Spine(xloader.resources.uiBG3.spineData);
                                    spinelo2 = new PIXI.spine.Spine(xloader.resources.spineloading2.spineData); 
                                    uibg.texture = xloader.resources.uiBG.texture;
                                    pixiapp.stage.addChild(uibg3, spinelo2);
                                    window.uibg3Aready=true;
                                    //pixiapp.stage.setChildIndex(uibg, 0);
                                    pixiapp.stage.setChildIndex(uibg3, 1);
                                    pixiapp.stage.setChildIndex(spinelo2, 3);//萌新修改
                                    spinelo2.state.setAnimation(0, 'play', true);
                                    spinelo2.x = 0.5 * pixiapp.screen.width;
                                    spinelo2.y = 0.5 * pixiapp.screen.height;
                                    spinelo2.scale.set(1);
                                    uibg3.state.setAnimation(0, 'play', true);
                                    uibg3.x = 0.5 * pixiapp.screen.width;
                                    uibg3.y = 0.5 * pixiapp.screen.height;
                                    uibg3.scale.set(1);
                                    window.uibg3hide=function(num,sum,time,func) {
                                        if(!uibg3) return;
                                        uibg3.alpha=(sum-num)/sum;
                                        if(spinelo2) spinelo2.alpha=(sum-num)/sum;
                                        if(sum>num) {
                                            setTimeout(function(){
                                                window.uibg3hide(num+1,sum,time,func);
                                            },time?time:10);
                                        }else {
                                            if(func) func();
                                        }
                                    }
                                },shorttime)
                                btnmList.forEach(asset => {
                                    PIXI.sound.add(asset.name, lib.assetURL + asset.path);
                                });
                                game.isUnlockDialog=false;
                                //解锁武将按钮
                                /*setTimeout(function(){
                                    game.isUnlockDialog=true;
                                },7000);*/
                                window.xloadershow=function(num,sum){
                                    uibg.alpha=num/sum;
                                    spinelo.alpha=num/sum;
                                    sanguoTip.alpha=num/sum;
                                    if(sum>num){
                                        setTimeout(function(){
                                            window.xloadershow(num+1,sum);
                                        },1);
                                    }else {
                                        uibg.alpha=1;
                                        spinelo.alpha=1;
                                        sanguoTip.alpha=1;
                                    }
                                }
                                window.xloadershow(0,20);
                                if(localStorage.getItem('firstSTBG')!='on') setTimeout(function(){
                                    ui.background.setBackgroundImage('image/background/1.jpg');
                                },1000);
                            })
                        }else {
                            //预加载判断是否存在动态视频
                            game.getFileList('extension/如真似幻/images/uiStyles/'+bgnum,function(folders,files){
                                if(files.includes(`bgs.mp4`)) {
                                    if(!lib.config.rzEpicSpine) {
                                        game.saveConfig('rzNoHuDieSpine',!lib.config.rzEpicSpine,false,function(){
                                            game.saveConfig('rzEpicSpine',true,false,function(){
                                                setTimeout(()=>{
                                                    game.reload3();
                                                },0);
                                            });
                                        });
                                    }
                                }
                            });
                            xloader.load(() => {
                             window.uibg3Aready=true;
                             spinelo = new PIXI.spine.Spine(xloader.resources.spineloading.spineData);
                             uibg = new PIXI.Sprite(xloader.resources.uiBG.texture);
                             uibg.width = pixiapp.screen.width;
                             uibg.height = pixiapp.screen.height;
                             //静态主题禁用视频
                             /*game.getFileList('extension/如真似幻/images/uiStyles/'+bgnum,function(folders,files){
                                    if(files.includes(`bg${bgnums}.mp4`)) {
                                        uibg.playVideoTheme = function(close, type) {
                                            if(type == 'delete') return; 
                                            uibg.alpha = close ? 1 : 0;
                                            if(type != 'soon') ui.background.setBackgroundImage('extension/如真似幻/images/dark.jpg');
                                            _status.tempVideoBackground = close ? undefined : `extension/如真似幻/images/uiStyles/${bgnum}/bg${bgnums}.mp4`;
                                            game.updateBackground();
                                        }
                                    }
                                });*/
                             // 添加载入图的精灵
                             const hombgSprite = new PIXI.Sprite(xloader.resources.homBG.texture);
                             hombgSprite.width = pixiapp.screen.width;
                             hombgSprite.height = pixiapp.screen.height;
                             pixiapp.stage.addChild(hombgSprite); // 添加载入图的精灵到舞台
                             pixiapp.stage.addChild(uibg); // 添加原来的背景图到舞台
                             pixiapp.stage.addChild(spinelo);
                             pixiapp.stage.setChildIndex(uibg, 0)
                             spinelo.state.setAnimation(0, 'idle', true);
                             spinelo.x = 0.5 * pixiapp.screen.width;
                             spinelo.y = 0.5 * pixiapp.screen.height;
                             spinelo.scale.set(0.8);//1
                             btnmList.forEach(asset => {
                                  PIXI.sound.add(asset.name, lib.assetURL + asset.path);
                             });
                             //解锁武将按钮
                             //game.isUnlockDialog=true;
                             window.xloadershow=function(num,sum){
                                    uibg.alpha=num/sum;
                                    spinelo.alpha=num/sum;
                                    if(sum>num){
                                        setTimeout(function(){
                                            window.xloadershow(num+1,sum);
                                        },10);
                                    }else {
                                        uibg.alpha=1;
                                        spinelo.alpha=1;
                                    }
                                }
                                window.xloadershow(0,20);
                                if(localStorage.getItem('firstSTBG')!='on') setTimeout(function(){
                                    ui.background.setBackgroundImage('image/background/1.jpg');
                                },1000);
                            })
                        }
                            game.getFileList('extension/如真似幻/audio/music', function(floders) {
                                //window.rzshmusic = floders;
                                window.rzshmusic = floders;
                                //检索音乐包
                                //获取异步传递的变量
                                let rzshmusicpack = window.rzshmusic;
                                delete window.rzshmusic;
                                let rzshbgm;
                                if (!lib.config.rzshbgm || !rzshmusicpack.includes(lib.config.rzshbgm)) {
                                    if(rzshmusicpack.contains('争流')) {
                                        rzshbgm = '争流';
                                    }else {
                                        rzshbgm = rzshmusicpack[0];
                                    }
                                } else rzshbgm = lib.config.rzshbgm;
                                /*PIXI.sound.add('outgame', {
                                    url: lib.assetURL + 'extension/如真似幻/audio/music/' + rzshbgm + '/outgame.mp3',
                                    loop: true
                                })*/
                                ///*¥PIXI.sound.play¥*/window.tipsClick('outgame');
                                ui.backgroundMusicRZ=document.createElement('audio');
                                ui.backgroundMusicRZ.src=lib.assetURL + 'extension/如真似幻/audio/music/' + rzshbgm + '/outgame.mp3';
				                //ui.backgroundMusicRZ.volume=(lib.config.volumn_background/8)*0.7+0.3*(lib.config.volumn_background>0?1:0);
				                ui.backgroundMusicRZ.volume=lib.config.volumn_background/8;
				                ui.backgroundMusicRZ.autoplay=true;
				                window.nowRZbgm=ui.backgroundMusicRZ.src;
				                ui.backgroundMusicRZ.addEventListener('ended',function(){
				                    if(window.nowRZbgm) ui.backgroundMusicRZ.src=window.nowRZbgm;
				                });
				                //game.playBackgroundMusic();
                                //对象池，用来管理容器和精灵
                                const yloader = new PIXI.Loader();
                                //主界面ui大盒子
                                const uihome = new PIXI.Container();
                                uihome.width = pixiapp.screen.width;
                                uihome.height = pixiapp.screen.height;
                                //主界面ui上面的为了做出抽屉效果,占据屏幕宽度和10%屏幕高度
                                const uihometop = new PIXI.Container();
                                uihometop.width = pixiapp.screen.width;
                                uihometop.height = pixiapp.screen.height * 0.2;
                                //主界面ui左边的,占据0.8高，0.2宽向下0.1高
                                const uihomeleft = new PIXI.Container();
                                uihomeleft.width = pixiapp.screen.width * 0.2;
                                uihomeleft.height = pixiapp.screen.height * 0.9;
                                uihomeleft.y = pixiapp.screen.height * 0.0705;
                                //主界面右边的
                                const uihomeright = new PIXI.Container();
                                uihomeright.width = pixiapp.screen.width * 0.1;
                                uihomeright.height = pixiapp.screen.height * 0.9;
                                uihomeright.y = pixiapp.screen.height * 0.0705;
                                uihomeright.x = pixiapp.screen.width * 0.9;
                                //主界面下边的
                                const uihomeunder = new PIXI.Container();
                                uihomeunder.width = pixiapp.screen.width;
                                uihomeunder.height = pixiapp.screen.height * 0.1;
                                uihomeunder.y = 0.91 * pixiapp.screen.height
                                //中间直接分别加入
                                const uihomecenter = new PIXI.Container();
                                uihomecenter.width = pixiapp.screen.width;
                                uihomecenter.height = pixiapp.screen.height;
                                //uihome把5个幕布加入进来
                                uihome.addChild(uihometop, uihomeleft, uihomeright, uihomeunder);
                                //模式盒子
                                // 定义动画函数
                                function showDrawer(container, direction) {
                                    let duration = 0.5;
                                    const ease = "power2.out";
                                    let start, end;
                                    switch (direction) {
                                        case "top":
                                            start = {
                                                y: -300
                                            };
                                            end = {
                                                y: 0
                                            };
                                            duration = 0.3;
                                            break;
                                        case "under":
                                            start = {
                                                y: 1.5 * pixiapp.screen.height
                                            };
                                            end = {
                                                y: 0.91 * pixiapp.screen.height
                                            };
                                            duration = 0.3;
                                            break;
                                        case "left":
                                            start = {
                                                x: -300
                                            };
                                            end = {
                                                x: 0
                                            };
                                            break;
                                        case "right":
                                            start = {
                                                x: 1.5 * pixiapp.screen.width
                                            };
                                            end = {
                                                x: pixiapp.screen.width * 0.9
                                            };
                                            break;
                                        default:
                                            console.error(`Invalid direction: $ {
                                                direction
                                            }`);
                                            return;
                                    }
                                    gsap.fromTo(container, duration, start, end, {
                                        ease
                                    })
                                        .restart();
                                }

                                function hideDrawer(container, direction) {
                                    let duration = 0.8;
                                    let ease = "power2.out";
                                    let start, end;
                                    switch (direction) {
                                        case "top":
                                            start = {
                                                y: -300
                                            };
                                            end = {
                                                y: 0
                                            };
                                            break;
                                        case "under":
                                            start = {
                                                y: 1.5 * pixiapp.screen.height
                                            };
                                            end = {
                                                y: pixiapp.screen.height * 0.91
                                            };
                                            break;
                                        case "left":
                                            start = {
                                                x: -300
                                            };
                                            end = {
                                                x: 0
                                            };
                                            break;
                                        case "right":
                                            start = {
                                                x: 1.5 * pixiapp.screen.width
                                            };
                                            end = {
                                                x: pixiapp.screen.width * 0.9
                                            };
                                            break;
                                        default:
                                            console.error(`Invalid direction: $ {
                                                direction
                                            }`);
                                            return;
                                    }
                                    gsap.fromTo(container, duration, end, start, {
                                        ease
                                    })
                                        .restart();
                                }
                                uihome.on("added", () => {
                                    uihome.addChild(uihomecenter);
                                    showDrawer(uihometop, "top");
                                    showDrawer(uihomeunder, "under");
                                    showDrawer(uihomeleft, "left");
                                    showDrawer(uihomeright, "right");
                                });
                                const modehome = new PIXI.Container();
                                modehome.width = pixiapp.screen.width;
                                modehome.height = pixiapp.screen.height;
                                //pixi载入ui,身份和斗地主的图片
                                if(!lib.config.uiStyles) {
                                    var uis='经典主题';
                                }else {
                                    var uis=lib.config.uiStyles;
                                }
                                if(!lib.config.rzsh_head) {
                                    var head='2.png';
                                }else {
                                    var head=lib.config.rzsh_head;
                                }
                                //var head='貂蝉';
                                const assetList = [{
                                    name: 'spritesui',
                                    path: 'extension/如真似幻/images/uiStyles/'+uis+'/ui.json'
                                }, {
                                    name: 'uilight',
                                    path: 'extension/如真似幻/images/light.json'
                                }, {
                                    name: 'uiczg',
                                    path: 'extension/如真似幻/images/btn.json'
                                }, {
                                    name: 'uivip',
                                    path: 'extension/如真似幻/images/vip.json'
                                }, {
                                    name: 'rightact',
                                    path: 'extension/如真似幻/images/taixu.png'
                                }, {
                                    name: 'pic',
                                    path: 'extension/如真似幻/images/avatar/'+head
                                } ];
                                assetList.forEach(asset => {
                                    yloader.add(asset.name, lib.assetURL + asset.path);
                                });
                                yloader.load(setupx);
                                let ticker = new PIXI.Ticker();
                                //原版的username在这
                                if(localStorage.getItem('loggedIn')) {
                                    var username=localStorage.getItem('loggedIn');
                                    game.saveConfig('connect_nickname', username);
                                    game.saveConfig('connect_nickname', username, 'connect');
                                    lib.config.connect_nickname=username;
                                }else {
                                    var username='无名玩家';
                                    game.saveConfig('connect_nickname', username);
                                    game.saveConfig('connect_nickname', username, 'connect');
                                    lib.config.connect_nickname=username;
                                }
                                if (lib.config.scollannouncement) {
                                    let rzshbb = new PIXI.Graphics();
                                    rzshbb.beginFill(0x000000, 0.65);
                                    rzshbb.drawRect(0, 0, pixiapp.renderer.screen.width, 20);
                                    rzshbb.endFill();
                                    uihome.addChild(rzshbb);
                                    var rzshgp = function() {
                                        let textcon = new PIXI.Container();
                                        textcon.widrh = pixiapp.screen.width;
                                        textcon.height = 0.1 * pixiapp.screen.height;
                                        textcon.name = 'textcon';
                                        rzshbb.addChild(textcon);
                                        var player = "玩家";
                                        var my = lib.config.connect_nickname;
                                        var suiji = ["氪金抽66", "卡宝真可爱", "蒸蒸日上", "√卡视我如父", "麒麟弓免疫枸杞", "坏可宣（老坏批）", "六千大败而归", '蒸', '夕宝', '黄小花', '山猪',
                                            "开局酒古锭", "遇事不决刷个乐", "见面两刀喜相逢", "改名出66", "时代的六万五", "韩旭", "司马长衫", "ogx",
                                            "狗卡不如无名杀", "王八万", "一拳兀突骨", "开局送神将", "丈八二桃", "装甲车车", "等我喝口酒", "Samuri", "马", "kimo鸡～木木",
                                            "Log-Frunki", "aoe银钱豹", "没有丈八就托管", "无中yyds", "给咸鱼鸽鸽打call", "小零二哟～", "长歌最帅了",
                                            "大猫有侠者之风", "布灵布灵❤️", "我爱～摸鱼🐠～", "小寻寻真棒", "呲牙哥超爱笑", "是俺杀哒", "阿七阿七",
                                            "祖安·灰晖是龙王", "吃颗桃桃好遗计", "好可宣✓良民", "藏海表锅好", "金乎？木乎？水乎！！", "无法也无天", "西风不识相",
                                            "神秘喵酱", "星城在干嘛？", "子鱼今天摸鱼了吗？", "阳光苞里有阳光", "诗笺的小裙裙", "轮回中的消逝", "乱踢jb的云野",
                                            "小一是不是...是不是...", "美羊羊爱瑟瑟", "化梦的星辰", "杰哥带你登dua郎", "世中君子人", "叹年华未央", "短咕咕", "若石", "很可爱的小白", "沉迷踢jb的云野", "厉不厉害你坤哥", "东方太白", "恶心的死宅", "风回太初", "隔壁的戴天", "林柒柒", "洛神", "ikun", "蒙娜丽喵", "只因无中", "女宝", "远道", "翘课吗？", "失败的man", "晚舟", "叙利亚野🐒", "幸运女神在微笑", "知天意，逆天寒", "明月栖木", "路卡利欧", "兔兔", "香蕉", "douyun", "启明星阿枫", "雨夜寒稠",
                                            "洛天依？！", "黄老板是好人～", "来点瑟瑟文和", "鲨鱼配辣椒", "萝卜～好萝卜", "废城君", "E佬细节鬼才",
                                            "感到棘手要怀念谁？", "半价小薯片", "JK欧拉欧拉欧拉", "新年快乐", "乔姐带你飞", "12345678？", "缘之空", "小小恐龙", "教主：杀我！", "才思泉涌的司马", "我是好人", "喜怒无常的大宝", "黄赌毒", "阴间杀～秋", "敢于劈瓜的关羽", "暮暮子", "潜龙在渊"].randomGet();
                                        //var name = [suiji, my].randomGet();
                                        var name = suiji;
                                        var v = ["通过", "使用", "开启"].randomGet();
                                        var story = ["周年", "五一", "踏青", "牛年", "开黑", "冬至", "春分", "鼠年", "盛典", "魏魂", "群魂", "蜀魂",
                                            "吴魂", "猪年", "圣诞", "国庆", "狗年", "金秋", "奇珍", "元旦", "小雪", "冬日", "招募", "梦之回廊",
                                            "虎年", "新春", "七夕", "大雪", "端午", "武将", "中秋", "庆典"].randomGet();
                                        var box = ["盒子", "宝盒", "礼包", "福袋", "礼盒", "庆典", "盛典"].randomGet();
                                        var a = "获得了";
                                        //皮肤
                                        var pifu = ["界钟会×1", "王朗×1", "马钧×1", "司马昭×1", "司马师×1", "王平×1", "诸葛瞻×1", "张星彩×1",
                                            "董允×1", "关索×1", "骆统×1", "周处*1", "界步练师*1", "界朱然*1", "贺齐*1", "苏飞*1", "公孙康×1",
                                            "杨彪×1", "刘璋×1", "张仲景×1", "司马徽×1", "曹婴×1", "徐荣×1", "史诗宝珠*66", "史诗宝珠*33",
                                            "麒麟生角·魏延*1", "史诗宝珠*10", "刘焉×1", "孙寒华×1", "戏志才×1", "界曹真×1", "曹婴×1", "王粲×1",
                                            "界于禁×1", "郝昭×1", "界黄忠×1", "鲍三娘×1", "周群×1", "赵襄×1", "马云禄×1", "孙皓×1", "留赞×1",
                                            "吴景×1", "界徐盛×1", "许攸×1", "杜预×1", "界李儒×1", "张让×1", "麹义×1", "司马徽×1", "界左慈×1",
                                            "鲍三娘×1", "界徐盛×1", "南华老仙×1", "韩旭の大饼*100", "神郭嘉×1", "吴景×1", "周处×1", "杜预×1",
                                            "司马师×1", "羊微瑜×1", "神曹操×1"].randomGet();
                                        //武将
                                        var wujiang = ["谋定天下·陆逊*1（动+静）", "龙困于渊·刘协（动+静）*1", "星花柔矛·张星彩*1（动+静）",
                                            "呼啸生风·许褚*1（动+静）", "牛年立冬·司马懿*1（动+静）", "鹰视狼顾·司马懿*1（动+静）", "洛水神韵·甄姬*1（动+静）",
                                            "登锋陷阵·张辽*1（动+静）", "十胜十败·郭嘉*1（动+静）", "猪年端午·曹丕*1（动+静）", "背水一战·张郃*1（动+静）",
                                            "神兵天降·邓艾*1（动+静）", "独来固志·王基*1（动+静）", "猪年圣诞·刘备*1（动+静）", "哮风从龙·关羽*1（动+静）",
                                            "西凉雄狮·马超*1（动+静）", "鏖战赤壁·黄盖*1（动+静）", "星流霆击·孙尚香*1（动+静）", "猪年圣诞·陆逊*1（动+静）",
                                            "鼠年七夕·貂蝉*1（动+静）", "迅雷风烈·张角*1（动+静）", "一往无前·袁绍*1（动+静）", "盛气凌人·许攸*1（动+静）",
                                            "玄冥天通·神曹操*1（动+静）", "魂牵梦绕·灵雎*1（动+静）", "肝胆相照·⭐甘宁*1（动+静）", "超脱于世·庞德公*1（动+静）",
                                            "雄踞益州·刘焉*1（动+静）", "鼠年春节·兀突骨*1（动+静）", "牛年端午·孙鲁班*1（动+静）", "灵魂歌王·留赞*1（动+静）",
                                            "花容月貌·孙茹*1（动+静）", "猪年春节·孙鲁育*1（动+静）", "长沙桓王·孙笨*1（动+静）", "如花似朵·小乔*1（动+静）",
                                            "嫣然一笑·鲍三娘*1", "锐不可当·张翼*1（动+静）", "鼠年中秋·关索*1（动+静）", "花海舞枪·马云禄*1（动+静）",
                                            "木牛流马·黄月英*1（动+静）", "锋芒毕露·曹婴*1（动+静）", "长坂败备·曹纯*1（动+静）", "龙袭星落·王朗*1（动+静）",
                                            "举棋若定·戏志才*1（动+静）", "泰山捧日·程昱*1（动+静）", "冬日·王元姬（动态+静态）*1",
                                            "牛年七夕·步练师动态包*1（动+静）", "神甘宁×1", "巾帼花舞·马云禄*1（动+静）", "银币*66666", "将魂*66666",
                                            "琪花瑶草·徐氏*1（动+静）", "肝胆相照·星甘宁*1（动+静）", "星流霆击·孙尚香（动+静）*1", "锋芒毕露·曹婴*1（动+静）", "长衫の天牢令*100"].randomGet();
                                        //更改对应播报颜色

                                        var d = [",大家快恭喜TA吧！", ",大家快恭喜TA吧。(づ ●─● )づ", ",祝你新的一年天天开心，万事如意"].randomGet();
                                        var fontset = 'shousha';
                                        var colorA = '#efe8dc';
                                        var colorB = '#22c622';
                                        /*var gold = [new PIXI.Text(`$ {pifu}`, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: '#56e4fa'
                                        }), new PIXI.Text(`$ {wujiang}`, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: "#f3c20f"
                                        })].randomGet();
                                        let text = new PIXI.Text(`$ {player}`, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: colorA
                                        });
                                        text.addChild(new PIXI.Text(`$ {name}`, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: colorA
                                        }));
                                        text.addChild(new PIXI.Text(`$ {v}`, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: "white"
                                        }));
                                        text.addChild(new PIXI.Text(`$ {story}$ {box}`, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: colorB
                                        }));
                                        text.addChild(new PIXI.Text(`$ {a}`, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: "white"
                                        }));
                                        text.addChild(gold);
                                        text.addChild(new PIXI.Text(`$ {d}`, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: 'white'
                                        }));*/
                                        var gold = [new PIXI.Text(pifu, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: '#56e4fa'
                                        }), new PIXI.Text(wujiang, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: "#f3c20f"
                                        })].randomGet();
                                        let text = new PIXI.Text(player, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: colorA
                                        });
                                        text.addChild(new PIXI.Text(name, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: colorA
                                        }));
                                        text.addChild(new PIXI.Text(v, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: "white"
                                        }));
                                        text.addChild(new PIXI.Text(story+box, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: colorB
                                        }));
                                        text.addChild(new PIXI.Text(a, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: "white"
                                        }));
                                        text.addChild(gold);
                                        text.addChild(new PIXI.Text(d, {
                                            fontFamily: fontset,
                                            fontSize: 18,
                                            fill: 'white'
                                        }));
                                        // 设置文本对象的布局
                                        text.children.forEach((child, index) => {
                                            child.x = (index > 0 ? text.children[index - 1].x + text.children[index - 1].width + 1 : text.width);
                                            child.y = 0;
                                        });
                                        textcon.x = pixiapp.screen.width;
                                        // 将文本对象添加到舞台上
                                        textcon.addChild(text);
                                        window.bbgp = true;
                                        window.bbcount = 0;
                                    }
                                    rzshgp();
                                    ticker.add(updatet);
                                    ticker.start();

                                    function updatet(delta) {
                                        if (window.bbgp == false) {
                                            window.bbcount++;
                                            if (window.bbcount > 1000 && Math.random() < 0.01) {
                                                rzshbb.visible = true;
                                                rzshgp();
                                            }
                                        }
                                        if (window.bbgp == true) {
                                            let textcon = rzshbb.getChildByName('textcon');
                                            textcon.x -= 1.5;
                                            if (textcon.x < -700 * ppw) {
                                                textcon.destroy();
                                                if (Math.random() < 0.8) {
                                                    rzshgp();
                                                } else {
                                                    rzshbb.visible = false;
                                                    window.bbgp = false;
                                                }
                                            }
                                        }
                                    }
                                }
                                //打开场景
                                let opprogress = null;

                                function opeen(container) {
                                    if (container != uihome) {
                                        window.isOnhide = true;
                                        uihome.removeChild(uihomecenter);
                                        hideDrawer(uihometop, "top");
                                        hideDrawer(uihomeunder, "under");
                                        hideDrawer(uihomeleft, "left");
                                        hideDrawer(uihomeright, "right");
                                        opprogress = setTimeout(function() {
                                            window.isOnhide = false;
                                            pixiapp.stage.removeChild(uihome);

                                            if (opprogress != null) clearTimeout(opprogress);
                                            opprogress = null;
                                        }, 500);
                                        pixiapp.stage.addChild(container);
                                    } else {
                                        pixiapp.stage.children.forEach(function(child) {
                                            if (child !== uibg) {
                                                pixiapp.stage.removeChild(child);
                                            }
                                        });
                                        if(window.rz_shenfen_node) {
                                            window.rz_shenfen_node.forEach(node=>{
                                                node.style.display='none';
                                                /*node.style.transition='all 0.5s';
                                                setTimeout(function(){
                                                    node.style.opacity=0;
                                                },0);*/
                                            });
                                        }
                                        if(window.rz_shenfen_node2) window.rz_shenfen_node2.style.display='none';

                                        pixiapp.stage.addChild(container);
                                    }
                                    window.container = container;
                                }
                                //关闭场景时回到父级场景
                                function closee() {
                                    opeen(uihome);
                                    game.storyBgMode=false;
                                    if(lib.config.rzEpicSpine) {
                                        uibg.texture = xloader.resources.uiBG.texture;
                                        if(uibg.playVideoTheme) uibg.playVideoTheme(false, 'soon');
                                        setTimeout(function(){
                                            pixiapp.stage.addChild(spinelo2, uibg3);
                                            pixiapp.stage.setChildIndex(uibg3, 1);
                                            pixiapp.stage.setChildIndex(spinelo2, 3);
                                        }, 300);//萌新修改
                                        if(window.rz_shenfen_node) {
                                            window.rz_shenfen_node.forEach(node=>{
                                                node.style.display='none';
                                                /*node.style.transition='all 0.5s';
                                                setTimeout(function(){
                                                    node.style.opacity=0;
                                                },0);*/
                                            });
                                        }
                                        if(window.rz_shenfen_node2) window.rz_shenfen_node2.style.display='none';
                                    }
                                }

                                function uiinit(sprite, bool) {
                                    const name = sprite.name;
                                    if (bool !== undefined) {
                                        sprite.interactive = true;
                                        sprite.on('pointerup', onButtonUpx);
                                        sprite.on('pointerdown', onButtonDownx);
                                    }
                                    if (!uisprite[name]) return;
                                    var has = function(str){
                                        return name.indexOf(str)!=-1;
                                    };
                                    var pptw = ppw;//横向
                                    var ppth = pph;//纵向
                                    var max = Math.max(ppw,pph);
                                    var min = Math.min(ppw,pph);
                                    if((has('menuyi')||has('menuer')||has('menusan')||has('menusi')||has('menuwu'))) {
                                        ppth = ppw;
                                    }
                                    sprite.x = uisprite[name].x * pptw;
                                    sprite.y = uisprite[name].y * ppth;
                                    sprite.anchor.set(0.5);
                                    var ppsw = ppw;//横向
                                    var ppsh = pph;//纵向
                                    if((name!='leftlong')&&(has('jj_grade')||has('ttrank')||has('left')||has('under')||has('shop')||has('right')||has('menuyi')||has('menuer')||has('menusan')||has('menusi')||has('menuwu')||has('ro2')||has('czg')||has('riactive')||has('doudizhu'))) {
                                        //alert(name);
                                        ppsw = pph;
                                    }else if(has('bigmenu')) {
                                        ppsh = ppw;
                                    }
                                    sprite.scale.set(uisprite[name].scale * ppsw, uisprite[name].scale * ppsh);
                                }

                                function uiinit2(fromFrames) {
                                    fromFrames.anchor.set(0.5);
                                    fromFrames.scale.set(0.29 * pps);
                                }

                                function uiinit3(sprite, bool) {
                                    if(!sprite) return;
                                    const name = sprite.name;
                                    if (bool !== undefined) {
                                        sprite.interactive = true;
                                        sprite.on('pointerup', onButtonUpx);
                                        sprite.on('pointerdown', onButtonDownx);
                                    }
                                    if (!uisprite[name]) return;
                                    sprite.x = uisprite[name].x;
                                    sprite.y = uisprite[name].y;
                                    sprite.anchor.set(0.5);
                                    sprite.scale.set(uisprite[name].scale, uisprite[name].scale);
                                }
                                //首屏加载
                                function setupx() {
                                    console.timeEnd('y加载完毕')
                                    game.isUnlockDialogDo('y');
                                    let pica = new PIXI.Sprite(yloader.resources.pic.texture);
                                    pica.name = 'pica';
                                    uiinit(pica);
                                    uihometop.addChild(pica);
                                    uihometop.setChildIndex(pica, 0)
                                    //先把模式后面的图片占位。
                                    const mode1bbg = new PIXI.Sprite();
                                    mode1bbg.name = 'mode1bbg';
                                    //经典场和斗地主等文字     
                                    const mode1tt = new PIXI.Sprite();
                                    mode1tt.name = 'mode1tt';
                                    const secmode1 = new PIXI.Sprite();
                                    //左上角模式信息
                                    const secmodeinfo = new PIXI.Sprite();
                                    secmodeinfo.position.set(340 * ppw, 90 * pph);
                                    secmodeinfo.scale.set(pps);
                                    //三个按钮    
                                    const modesecoff1 = new PIXI.Sprite();
                                    modesecoff1.name = 'modesecoff1';
                                    modesecoff1.interactive = true;
                                    modesecoff1.on('pointerup', onButtonUp);
                                    modesecoff1.on('pointerdown', onButtonDownx);
                                    const modesecoff2 = new PIXI.Sprite();
                                    modesecoff2.name = 'modesecoff2';
                                    modesecoff2.interactive = true;
                                    modesecoff2.on('pointerup', onButtonUp);
                                    modesecoff2.on('pointerdown', onButtonDownx);
                                    const modesecoff3 = new PIXI.Sprite();
                                    modesecoff3.name = 'modesecoff3';
                                    modesecoff3.interactive = true;
                                    modesecoff3.on('pointerup', onButtonUp);
                                    modesecoff3.on('pointerdown', onButtonDownx);
                                    uiinit(modesecoff1);
                                    uiinit(modesecoff2);
                                    uiinit(modesecoff3);
                                    //模式文字 
                                    secmode1.name = '5pjz';
                                    const secmode2 = new PIXI.Sprite();
                                    secmode2.name = '8pjz';
                                    const secmode3 = new PIXI.Sprite();
                                    secmode3.name = 'guowar';
                                    modehome.on("added", () => {
                                        if(lib.config.rzEpicSpine) {
                                            //萌新修改
                                            uibg.texture = xloader.resources.loadingbg.texture;
                                            if(window.uibg3Aready) pixiapp.stage.removeChild(spinelo2, uibg3);
                                        }
                                        let modestexture = yloader.resources.modesecb.textures;
                                        if (window.moode == "shenfen") {
                                            //把左上角改掉     
                                            mode1bbg.texture = zloader.resources.shenfen.texture;
                                            uiinit(mode1bbg);
                                            //切换底图      
                                            mode1tt.texture = modestexture['mode1tt'];
                                            //切换文字
                                            secmode1.texture = modestexture['5pjz'];
                                            secmode2.texture = modestexture['8pjz'];
                                            secmode3.texture = modestexture['guowar'];
                                            secmodeinfo.texture = modestexture['5pjz'];
                                            modesecoff1.texture = modestexture['modesecon'];
                                            modesecoff2.texture = modestexture['modesecoff'];
                                            modesecoff3.texture = modestexture['modesecoff'];
                                            spineks.state.setAnimation(0, 'kaishi', false);
                                            spineks.state.tracks[0].onComplete = function() {
                                                spineks.state.setAnimation(0, 'jingzhi', true);
                                            }
                                            entermodegame('identity', 'normal', 5)
                                        } else if (window.moode == "doudizhu") {
                                            mode1bbg.texture = zloader.resources.doudizhu.texture;
                                            uiinit(mode1bbg);
                                            mode1bbg.scale.set(0.57 * pps);
                                            mode1bbg.x -= 115 * ppw;
                                            // mode1bbg.y+=5;
                                            mode1tt.texture = modestexture['hhddz'];
                                            secmode1.texture = modestexture['ddzxx'];
                                            secmode2.texture = modestexture['ddzhl'];
                                            secmode3.texture = modestexture['ddzbl'];
                                            secmodeinfo.texture = modestexture['ddzxx'];
                                            modesecoff1.texture = modestexture['modesecon'];
                                            modesecoff2.texture = modestexture['modesecoff'];
                                            modesecoff3.texture = modestexture['modesecoff'];
                                            spineks.state.setAnimation(0, 'kaishi', false);
                                            spineks.state.tracks[0].onComplete = function() {
                                                spineks.state.setAnimation(0, 'jingzhi', true);
                                            }
                                            entermodegame('doudizhu', 'normal', 3);
                                        }
                                    });
                                    modehome.on("removed", () => {})
                                    /*——————————那些多加的东西藏这——————————*/
                                    var node = ui.create.node('img');
                                                node.src=lib.assetURL+'extension/如真似幻/images/modeb/shilian.png';
                                                node.style.width='180px';
                                                node.style.height='auto';
                                                //node.style.left='calc(20.5% - 90px)';
                                                //node.style.top='calc(80% - 27px)';
                                                node.style.left=(227*ppw-90)+'px';
                                                node.style.top=(410*pph-27)+'px';
                                                node.style.position='absolute';
                                                node.style['z-index']=4;
                                                node.id='shilian1';
                                                //splash.appendChild(bigEnter);
                                                // 添加click事件监听器
                                                node.style.transition='all 0.08s ease';
                                                node.addEventListener('click', () => {
                                                    node.style.filter='brightness(1.5)';
                                                    window.tipsClick('Label');//确定
                                                    setTimeout(function(){
                                                        node.style.filter='';
                                                        setTimeout(function(){
                                                            //entermodegame('single', 'changban');
                                                            entermodegame('boss');
                                                            window.isOnhide = true;
                                                            if(window.rz_shenfen_node) {
                                                                window.rz_shenfen_node.forEach(node=>{
                                                                    if(lib.config.rzEpicSpine) {
                                                                    node.style.transition='all 0.2s';
                                                                    setTimeout(function(){
                                                                        node.style.opacity=0;
                                                                        node.style['pointer-events']='none';
                                                                    },0);
                                                                    }else {
                                                                    node.style.display='none';
                                                                    }
                                                                });
                                                            }
                                                            pixiapp.stage.children.forEach(function(child) {
                                                                if (child !== uibg) {
                                                                    if(!lib.config.rzEpicSpine) {
                                                                        pixiapp.stage.removeChild(child);
                                                                    }else {
                                                                        child.func=function(num,sum){
                                                                        child.alpha=(sum-num)/sum;
                                                                        if(num<sum) {
                                                                            setTimeout(function(){
                                                                                child.func(num+1,sum);
                                                                            },3);
                                                                        }else {
                                                                            pixiapp.stage.removeChild(child);
                                                                        }
                                                                    }
                                                                    child.func(0,20);
                                                                }
                                                            }
                                                            });
                                                            rzshkz();
                                                        },0);
                                                    },100);
                                                });
                                                var node2 = ui.create.node('img');
                                                node2.src=lib.assetURL+'extension/如真似幻/images/modeb/shilian.gif';
                                                node2.style.width='180px';
                                                node2.style.height='auto';
                                                //node2.style.left='calc(20.5% - 90px)';
                                                //node2.style.top='calc(80% - 27px)';
                                                node2.style.left=(227*ppw-90)+'px';
                                                node2.style.top=(410*pph-27)+'px';
                                                node2.style.position='absolute';
                                                node2.style['pointer-events']='none';
                                                node2.style['z-index']=5;
                                                node2.id='shilian2';
                                                var node3=ui.create.node('div');
                                                //node3.innerText="体验三国杀经典、国战玩法";
                                                node3.innerText="5人经典玩法升级版，解锁新手牌、新武将";
                                                node3.style['font-family']='shousha';
                                                node3.style['text-align']='center';
                                                node3.style['letter-spacing']='5px';
                                                node3.style['font-size']='16px';
                                                node3.style.color='rgb(185, 135, 130)';
                                                //node3.src=lib.assetURL+'extension/如真似幻/images/modeb/infos.png';
                                                node3.style.width='500px';
                                                node3.style.height='auto';
                                                node3.style.left='calc(53% - 250px)';
                                                //node3.style.bottom='18.3%';
                                                node3.style.top=(410*pph-8)+'px';
                                                node3.style.position='absolute';
                                                node3.style.transform='translateY(50%)';
                                                node3.style['z-index']=3;
                                                node3.id='infos';
                                                //以下背景为带有阴影条带的图片，默认不需要调整强调显示
                                                var shadowInfo=['赤血丹心','殚谋戮力','端午赛龙','魏武大帝','新年瑞兽','玉楼金殿','坐谈仙道'];
                                                if(!shadowInfo.contains(window.rz_ideimg.slice(0,4))) {
                                                    node3.style.transform+='scale(1.2)';
                                                    node3.style.filter='drop-shadow(0px 0px 1px rgba(0,0,0,1)) drop-shadow(0px 0px 1px rgba(0,0,0,1)) drop-shadow(0px 0px 1px rgba(0,0,0,1))';
                                                }
                                                node.style.display="none";
                                                node2.style.display="none";
                                                node3.style.display="none";
                                                window.rz_shenfen_node=[node,node2,node3];
                                                //window.rz_shenfen_node.appendChild(node2);
                                                document.body.appendChild(node);
                                                document.body.appendChild(node2);
                                                document.body.appendChild(node3);
                                    var node4=ui.create.node('div');
                                                node4.innerText="每日8:00-次日2:00为计分时间段\n基础100金豆，倍率根据地主选择最高为3倍";
                                                node4.style['font-family']='shousha';
                                                node4.style['text-align']='center';
                                                node4.style['letter-spacing']='5px';
                                                node4.style['font-size']='16px';
                                                node4.style.color='rgb(185, 135, 130)';
                                                //node3.src=lib.assetURL+'extension/如真似幻/images/modeb/infos.png';
                                                node4.style.width='500px';
                                                node4.style.height='auto';
                                                node4.style.left='calc(46% - 250px)';
                                                //node4.style.bottom='22.5%';
                                                //node4.style.top=(370*pph-8)+'px';
                                                //研究了这么久终于把公式算对了
                                                node4.style.top=((256*pph)+(122*pps)-8)+'px';
                                                node4.style.position='absolute';
                                                node4.style.transform='translateY(50%)';
                                                node4.style['z-index']=3;
                                                node4.id='infos';
                                                node4.style.display="none";
                                                document.body.appendChild(node4);
                                                window.rz_shenfen_node2=node4;
                                                /*——————————那些多加的东西藏这——————————*/
                                                            //自由场标题展示
                                                //传送！
                                                window.showTitle=function(emode){
                                                    //模式的图片
                                                    var newnew=lib.config.newnew_font=='new'?'jian':'fan';
                                                    window.scremode = ui.create.node('img');
                                                    window.scremode.src= lib.assetURL + 'extension/如真似幻/images/emode/'+emode+'_'+newnew+'.png';
                                                    //window.scremode.style.cssText='pointer-events: none;text-align: center;margin: auto;opacity: 0;display: block;position: absolute;background:none;width: 55%;z-index: 10;left: 50%;top: 47%;filter: brightness(1.2);transform: translate(-50%, -50%) scale(1);';
                                                    window.scremode.style.cssText='pointer-events: none;text-align: center;margin: auto;opacity: 0;display: block;position: absolute;background:none;width: 50%;z-index: 10;left: 50%;top: 47%;filter: brightness(1.2);transform: translate(-50%, -50%) scale(1);';
                                                    if(newnew=='jian') window.scremode.style.top='50%';
                                                    document.body.appendChild(window.scremode);
                                                    //黑黑的背景
                                                    window.scrblack = ui.create.node('img');
                                                    window.scrblack.src= lib.assetURL + 'extension/如真似幻/images/emode/black.png';
                                                    window.scrblack.style.cssText='text-align: center;margin: auto;opacity: 1;display: block;position: absolute;background:none;width: 100%;height: 100%;z-index: 9;left: 50%;top: 50%;transform: translate(-50%, -50%);';
                                                    document.body.appendChild(window.scrblack);
                                                    //转转的圈圈
                                                    window.scrcc = ui.create.node('img');
                                                    window.scrcc.src= lib.assetURL + 'extension/如真似幻/images/emode/circle.png';
                                                    window.scrcc.style.cssText='text-align: center;margin: auto;opacity: 0;display: block;position: absolute;background:none;width: 60%;z-index: 8;left: 50%;top: 50%;filter: /*brightness(1.2) drop-shadow(0px 0px 0px rgba(0, 0, 0, .8))*/;transform: translate(-50%, -50%);';
                                                    document.body.appendChild(window.scrcc);
                                                    //转转的图腾
                                                    window.scrtt = ui.create.node('img');
                                                    window.scrtt.src= lib.assetURL + 'extension/如真似幻/images/emode/totem.png';
                                                    window.scrtt.style.cssText='text-align: center;margin: auto;opacity: 0;display: block;position: absolute;background:none;width: 30%;z-index: 8;left: 50%;top: 50%;transform: translate(-50%, -50%);';
                                                    document.body.appendChild(window.scrtt);
                                                    window.showTitleLoop=function(num,sum,out,time,sum2){
                                                        if(!window.scremode) return;
                                                        if(num>0) {
                                                            if(out) {
                                                                var opa=(num/sum);
                                                                var scale=Math.pow((1-num/sum)*0.35+1,2);
                                                                var left='calc(50% + '+Math.pow(1-(num/sum),3)*45+'%)';//30%
                                                            }else {
                                                                var opa=1-(num/sum);
                                                                var scale=Math.sqrt(num/sum,2)*0.25+1;
                                                                var left='calc(50% - '+Math.pow(num/sum,3)*45+'%)';//30%
                                                            }
                                                            //window.scremode.style.cssText='pointer-events: none;text-align: center;margin: auto;opacity: '+opa+';display: block;position: absolute;background:none;width: 55%;z-index: 10;left: 50%;top: 45%;transform: translate(-50%, -50%) scale('+scale+');';
                                                            window.scremode.style.opacity=opa;
                                                            window.scremode.style.filter='brightness('+(opa*0.8+0.4)+')';
                                                            window.scremode.style.left=left;
                                                            //window.scremode.style.transform=' translate(-50%, -50%) scale('+scale+')';
                                                            setTimeout(function(){
                                                                window.showTitleLoop(num-1,sum,out,time,sum2);
                                                            },10);
                                                        }else if(!out) {
                                                            setTimeout(function(){
                                                                window.showTitleLoop(sum2,sum2,true);
                                                            },time);
                                                            var newnew=lib.config.newnew_font=='new'?'jian':'fan';
                                                            window.scremode2 = ui.create.node('img');
                                                            window.scremode2.src= lib.assetURL + 'extension/如真似幻/images/emode/'+emode+'_'+newnew+'.png';
                                                            window.scremode2.style.cssText='pointer-events: none;text-align: center;margin: auto;opacity: 0;display: block;position: absolute;background:none;width: 50%;z-index: 11;left: 50%;top: 47%;filter: brightness(1.2);transform: translate(-50%, -50%) scale(1);';
                                                            if(newnew=='jian') window.scremode2.style.top='50%';
                                                            document.body.appendChild(window.scremode2);
                                                            window.showTitleLoopTX(30,30);
                                                        }else {
                                                            //window.scremode.style.cssText='pointer-events: none;opacity:0';
                                                            window.scremode.remove();
                                                        }
                                                    };
                                                    window.showTitleLoopTX=function(num,sum){
                                                        if(!window.scremode2) return;
                                                        if(num>0) {
                                                                var opa=Math.pow(num/sum,2)*0.8;
                                                                var scale=Math.pow((1-num/sum),3)*0.4+1.1;
                                                                var left='calc(50% + '+Math.pow(1-(num/sum),3)*30+'%)';
                                                                var top='calc(50% - '+(3*scale/1)+'%)';
                                                                if(newnew=='jian') top='calc(53% - '+(3*scale/1)+'%)';
                                                            //window.scremode.style.cssText='pointer-events: none;text-align: center;margin: auto;opacity: '+opa+';display: block;position: absolute;background:none;width: 55%;z-index: 10;left: 50%;top: 45%;transform: translate(-50%, -50%) scale('+scale+');';
                                                            window.scremode2.style.opacity=opa;
                                                            window.scremode2.style.top=top;
                                                            //window.scremode2.style.filter='brightness('+(opa*0.8+0.4)+')';
                                                            window.scremode2.style.transform=' translate(-50%, -50%) scale('+scale+')';
                                                            setTimeout(function(){
                                                                window.showTitleLoopTX(num-1,sum);
                                                            },10);
                                                        }else {
                                                            //window.scremode.style.cssText='pointer-events: none;opacity:0';
                                                            window.scremode2.remove();
                                                        }
                                                    };
                                                    window.showCircleLoop=function(num,sum,left){
                                                        if(!window.scrcc) return;
                                                        if(num>0) {
                                                            if(left) {
                                                                var rot=30+(num/sum)*90;
                                                            }else {
                                                                var rot=30-(num/sum)*90;
                                                            }
                                                            var jindu=(sum/2)-Math.abs((sum/2)-num);
                                                            var zong=(sum/2)*0.3;
                                                            var pre=jindu>zong?1:(jindu/zong);
                                                            var opa=Math.pow(pre,2)*0.7;
                                                            var sca=pre*0.3+0.7;
                                                            sca=1.3-0.3*pre;
                                                            var sin=(Math.sin(((num/sum)-0.25)*3.1415926*2*1.3)+1)/2;
                                                            window.scrcc.style.opacity=opa;
                                                            window.scrcc.style.filter='brightness('+(1+sin*0.5)+') drop-shadow(0px 0px 2.5px rgba(0, 0, 0, .5))';// drop-shadow(0px 0px 0px rgba(0, 0, 0, .8));
                                                            window.scrcc.style.transform='translate(-50%, -50%) rotate('+rot+'deg) scale('+sca+')';
                                                            setTimeout(function(){
                                                                window.showCircleLoop(num-1,sum,left);
                                                            },10);
                                                        }else {
                                                            //window.scremode.style.cssText='pointer-events: none;opacity:0';
                                                            window.scrcc.remove();
                                                        }
                                                    };
                                                    window.showTotemLoop=function(num,sum,left){
                                                        if(!window.scrtt) return;
                                                        if(num>0) {
                                                            if(left) {
                                                                var rot=(num/sum)*60;
                                                            }else {
                                                                var rot=0-(num/sum)*60;
                                                            }
                                                            var jindu=(sum/2)-Math.abs((sum/2)-num);
                                                            var zong=(sum/2)*0.3;
                                                            var pre=jindu>zong?1:(jindu/zong);
                                                            var opa=Math.pow(pre,2)*0.5;
                                                            var sca=Math.pow(pre,3)*0.3+0.7;
                                                            window.scrtt.style.opacity=opa;
                                                            //window.scrtt.style.filter='drop-shadow(0px 0px 3px rgba(0, 0, 0, .6))';
                                                            window.scrtt.style.transform='translate(-50%, -50%) rotate('+rot+'deg) scale('+sca+')';
                                                            setTimeout(function(){
                                                                window.showTotemLoop(num-1,sum,left);
                                                            },10);
                                                        }else {
                                                            //window.scremode.style.cssText='pointer-events: none;opacity:0';
                                                            window.scrtt.remove();
                                                        }
                                                    };
                                                    window.showBlackLoop=function(num,sum,out,time,sum2){
                                                        if(!window.scrblack) return;
                                                        if(num>0) {
                                                            if(out) {
                                                                var opa=(num/sum);
                                                            }else {
                                                                var opa=1-(num/sum);
                                                            }
                                                            //window.scrblack.style.cssText='text-align: center;margin: auto;opacity: '+(opa*0.8)+';display: block;position: absolute;background:none;width: 100%;height: 100%;z-index: 9;left: 50%;top: 50%;transform: translate(-50%, -50%);';
                                                            window.scrblack.style.opacity=opa*0.9;
                                                            setTimeout(function(){
                                                                window.showBlackLoop(num-1,sum,out,time,sum2);
                                                            },10);
                                                        }else if(!out) {
                                                            setTimeout(function(){
                                                                window.showBlackLoop(sum2,sum2,true);
                                                            },time);
                                                        }else {
                                                            window.scrblack.remove();
                                                        }
                                                    };
                                                    //window.oldW=window.innerWidth;
                                                    //window.oldH=window.innerHeight;
                                                    setTimeout(function(){
                                                        window.showBlackLoop(60,60,false,2000,60);
                                                        setTimeout(function(){
                                                            window.playAudioOld('..','extension','如真似幻','images','emode','gamestart.mp3');
                                                        },500);
                                                    },0);
                                                    setTimeout(function(){
                                                        window.showTitleLoop(40,40,false,1500,40);
                                                    },500);
                                                    setTimeout(function(){
                                                        window.showCircleLoop(180,180,false);
                                                        window.showTotemLoop(180,180,true);
                                                    },500);
                                                    /*setTimeout(function(){
                                                        window.showTitleLoop(50,50,true);
                                                    },4000);
                                                    setTimeout(function(){
                                                        window.showBlackLoop(50,50,true);
                                                    },4500);*/
                                                };
        window.playAudioOld=function(){
			if(_status.video&&arguments[1]!='video') return;
			var str='';
			var onerror=null;
			for(var i=0;i<arguments.length;i++){
				if(typeof arguments[i]==='string'||typeof arguments[i]=='number'){
					str+='/'+arguments[i];
				}
				else if(typeof arguments[i]=='function'){
					onerror=arguments[i]
				}
				if(_status.video) break;
			}
			if(!lib.config.repeat_audio&&_status.skillaudio.contains(str)) return;
			_status.skillaudio.add(str);
			game.addVideo('playAudio',null,str);
			setTimeout(function(){
				_status.skillaudio.remove(str);
			},1000);
			var audio=document.createElement('audio');
			audio.autoplay=true;
			//audio.volume=lib.config.volumn_audio/8;
			audio.volume=(lib.config.volumn_audio/8)*0.7+0.3*(lib.config.volumn_audio>0?1:0);
			if(str.split('/').pop().split('.').length>1){
				audio.src=lib.assetURL+'audio'+str;
			}
			else{
				audio.src=lib.assetURL+'audio'+str+'.mp3';
			}
			audio.addEventListener('ended',function(){
				this.remove();
			});
			audio.onerror=function(e){
				if(this._changed){
					this.remove();
					if(onerror){
						onerror(e);
					}
				}
				else{
					this.src=lib.assetURL+'audio'+str+'.ogg';
					this._changed=true;
				}
			};
			//Some browsers do not support "autoplay", so "oncanplay" listening has been added
			audio.oncanplay=function(){
				Promise.resolve(this.play()).catch(()=>void 0);
			};
			//ui.window.appendChild(audio);
			return audio;
		};
                                    function onButtonUp(event) {
                                        //没加载好不给碰（手速辣么快干嘛啊~）
                                        if(!window.uibg3Aready) return;
                                        //获取模式纹理
                                        let modestexture = yloader.resources.modesecb.textures;
                                        if (window.currentSprite != event.target) return;
                                        window.currentSprite = null;
                                        //alert_old(event.target.name);
                                        switch (event.target.name) {
                                            case "mode1":
                                                 //按钮
                                                //身份局，影响后面的按钮
                                                window.moode = 'shenfen';
                                                opeen(modehome);
                                                /*var node=ui.create.node('img');
                                                node.src=lib.assetURL+'extension/如真似幻/images/modeb/shilian.png';
                                                node.style.width='180px';
                                                node.style.height='auto';
                                                node.style.left='calc(20.5% - 90px)';
                                                node.style.top='calc(80% - 30px)';
                                                node.style.position='absolute';
                                                node.style['z-index']=4;*/
                                                if(!window.rz_shenfen_node) {
                                                //已经搬到预加载了
                                                var node = ui.create.node('img');
                                                node.src=lib.assetURL+'extension/如真似幻/images/modeb/shilian.png';
                                                node.style.width='180px';
                                                node.style.height='auto';
                                                node.style.left='calc(20.5% - 90px)';
                                                node.style.top='calc(80% - 27px)';
                                                node.style.position='absolute';
                                                node.style['z-index']=4;
                                                node.id='shilian1';
                                                //splash.appendChild(bigEnter);
                                                // 添加click事件监听器
                                                node.style.transition='all 0.08s ease';
                                                node.addEventListener('click', () => {
                                                    node.style.filter='brightness(1.5)';
                                                    window.tipsClick('Label');//确定
                                                    setTimeout(function(){
                                                        node.style.filter='';
                                                        setTimeout(function(){
                                                            entermodegame('single', 'changban');
                                                            window.isOnhide = true;
                                                            if(window.rz_shenfen_node) {
                                                                window.rz_shenfen_node.forEach(node=>{
                                                                    if(lib.config.rzEpicSpine) {
                                                                    node.style.transition='all 0.2s';
                                                                    setTimeout(function(){
                                                                        node.style.opacity=0;
                                                                        node.style['pointer-events']='none';
                                                                    },0);
                                                                    }else {
                                                                    node.style.display='none';
                                                                    }
                                                                });
                                                            }
                                                            pixiapp.stage.children.forEach(function(child) {
                                                                if (child !== uibg) {
                                                                    if(!lib.config.rzEpicSpine) {
                                                                        pixiapp.stage.removeChild(child);
                                                                    }else {
                                                                        child.func=function(num,sum){
                                                                        child.alpha=(sum-num)/sum;
                                                                        if(num<sum) {
                                                                            setTimeout(function(){
                                                                                child.func(num+1,sum);
                                                                            },3);
                                                                        }else {
                                                                            pixiapp.stage.removeChild(child);
                                                                        }
                                                                    }
                                                                    child.func(0,20);
                                                                }
                                                            }
                                                            });
                                                            rzshkz();
                                                        },0);
                                                    },100);
                                                });
                                                var node2 = ui.create.node('img');
                                                node2.src=lib.assetURL+'extension/如真似幻/images/modeb/shilian.gif';
                                                node2.style.width='180px';
                                                node2.style.height='auto';
                                                node2.style.left='calc(20.5% - 90px)';
                                                node2.style.top='calc(80% - 27px)';
                                                node2.style.position='absolute';
                                                node2.style['pointer-events']='none';
                                                node2.style['z-index']=5;
                                                node2.id='shilian2';
                                                var node3=ui.create.node('div');
                                                //node3.innerText="体验三国杀经典、国战玩法";
                                                node3.innerText="5人经典玩法升级版，解锁新手牌、新武将";
                                                node3.style['font-family']='shousha';
                                                node3.style['text-align']='center';
                                                node3.style['letter-spacing']='5px';
                                                node3.style['font-size']='16px';
                                                node3.style.color='rgb(185, 135, 130)';
                                                //node3.src=lib.assetURL+'extension/如真似幻/images/modeb/infos.png';
                                                node3.style.width='500px';
                                                node3.style.height='auto';
                                                node3.style.left='calc(53% - 250px)';
                                                node3.style.bottom='18.3%';
                                                node3.style.position='absolute';
                                                node3.style.transform='translateY(50%)';
                                                node3.style['z-index']=3;
                                                node3.id='infos';
                                                //以下背景为带有阴影条带的图片，默认不需要调整强调显示
                                                var shadowInfo=['赤血丹心','殚谋戮力','端午赛龙','魏武大帝','新年瑞兽','玉楼金殿','坐谈仙道'];
                                                if(!shadowInfo.contains(window.rz_ideimg.slice(0,4))) {
                                                    node3.style.transform+='scale(1.2)';
                                                    node3.style.filter='drop-shadow(0px 0px 1px rgba(0,0,0,1)) drop-shadow(0px 0px 1px rgba(0,0,0,1)) drop-shadow(0px 0px 1px rgba(0,0,0,1))';
                                                }
                                                window.rz_shenfen_node=[node,node2,node3];
                                                //window.rz_shenfen_node.appendChild(node2);
                                                document.body.appendChild(node);
                                                document.body.appendChild(node2);
                                                document.body.appendChild(node3);
                                                }else {
                                                    window.rz_shenfen_node.forEach(node=>{
                                                        node.style.opacity=1;
                                                        node.style.display='block';
                                                        node.style.transition='';
                                                        node.style['pointer-events']='auto';
                                                        if(node.id=='shilian2') node.style['pointer-events']='none';
                                                    });
                                                    if(window.rz_shenfen_node&&window.rz_shenfen_node.length==3) {
                                                        window.rz_shenfen_node[2].innerText='5人经典玩法升级版，解锁新手牌、新武将';
                                                    }
                                                }
                                                break;
                                            case "uactive1":
                                                window.moode = 'doudizhu';
                                                opeen(modehome);
                                                if(!window.rz_shenfen_node2) {
                                                //已经搬到预加载了
                                                var node4=ui.create.node('div');
                                                node4.innerText="每日8:00-次日2:00为计分时间段\n基础100金豆，倍率根据地主选择最高为3倍";
                                                node4.style['font-family']='shousha';
                                                node4.style['text-align']='center';
                                                node4.style['letter-spacing']='5px';
                                                node4.style['font-size']='16px';
                                                node4.style.color='rgb(185, 135, 130)';
                                                //node3.src=lib.assetURL+'extension/如真似幻/images/modeb/infos.png';
                                                node4.style.width='500px';
                                                node4.style.height='auto';
                                                node4.style.left='calc(46% - 250px)';
                                                node4.style.bottom='22.5%';
                                                node4.style.position='absolute';
                                                node4.style.transform='translateY(50%)';
                                                node4.style['z-index']=3;
                                                node4.id='infos';
                                                document.body.appendChild(node4);
                                                window.rz_shenfen_node2=node4;
                                                }else {
                                                    var node=window.rz_shenfen_node2;
                                                    node.style.opacity=1;
                                                    node.style.display='block';
                                                    node.style.transition='';
                                                    node.style['pointer-events']='auto';
                                                    if(node.id=='shilian2') node.style['pointer-events']='none';
                                                }
                                                break;
                                            case "rightacbg":
                                            //太虚幻境
                                            entermodegame('taixuhuanjing');
                                            
                                            window.isOnhide = true;
                                            
                                            /*uihome.removeChild(uihomecenter);
                                            hideDrawer(uihometop, "top");
                                            hideDrawer(uihomeunder, "under");
                                            hideDrawer(uihomeleft, "left");
                                            hideDrawer(uihomeright, "right");
                                            opprogress = setTimeout(function() {
                                                window.isOnhide = false;
                                                pixiapp.stage.removeChild(uihome);
                                                if (opprogress != null) clearTimeout(opprogress);
                                                opprogress = null;
                                            }, 500);
                                            setTimeout(function() {
                                               rzshkz();           
                                            }, 200); */
                                                setTimeout(function(){
                                                    rzshkz();
                                                },0);
                                                uihome.removeChild(uihomecenter);
                                                setTimeout(function(){
                                                    hideDrawer(uihometop, "top");
                                                    hideDrawer(uihomeunder, "under");
                                                    hideDrawer(uihomeleft, "left");
                                                    hideDrawer(uihomeright, "right");
                                                },100);
                                                window.isOnhide = true;
                                                opprogress = setTimeout(function() {
                                                    window.isOnhide = false;
                                                    pixiapp.stage.removeChild(uihome);
                                                    if (opprogress != null) clearTimeout(opprogress);
                                                    opprogress = null;
                                                },200);
                                                /*pixiapp.stage.children.forEach(function(child) {
                                                    if (child == uibg&&lib.config.rzEpicSpine) {
                                                        pixiapp.stage.removeChild(child);
                                                    }
                                                });*/
                                                    uibg.showfunc=function(num,sum){
                                                        if(!uibg) return;
                                                        uibg.alpha=(sum-num)/sum;
                                                        if(sum>num){
                                                            setTimeout(function(){
                                                                uibg.showfunc(num+1,sum);
                                                            },10);
                                                        }else {
                                                            //uibg3.alpha=1;
                                                            //pixiapp.stage.removeChild(spinelo2, uibg3);
                                                            if(pixiapp) pixiapp.stage.removeChild(uibg);
                                                            //uibg.texture = xloader.resources.loadingbg.texture;
                                                        }
                                                    }
                                                    if(uibg.playVideoTheme) uibg.playVideoTheme(true, 'delete');
                                                    else uibg.showfunc(0,10);
                                            break;
                                            case "modesecoff1":
                                                modesecoff1.texture = modestexture['modesecon'];
                                                modesecoff2.texture = modestexture['modesecoff'];
                                                modesecoff3.texture = modestexture['modesecoff'];
                                                if (window.moode == 'shenfen') {
                                                    secmodeinfo.texture = modestexture['5pjz'];
                                                    entermodegame('identity', 'normal', 5);
                                                    if(window.rz_shenfen_node&&window.rz_shenfen_node.length==3) {
                                                        window.rz_shenfen_node[2].innerText='5人经典玩法升级版，解锁新手牌、新武将';
                                                    }
                                                }
                                                if (window.moode == 'doudizhu') {
                                                    secmodeinfo.texture = modestexture['ddzxx'];
                                                    entermodegame('doudizhu', 'normal', 3);
                                                }
                                                spineks.state.setAnimation(0, 'kaishi', false);
                                                spineks.state.tracks[0].onComplete = function() {
                                                    spineks.state.setAnimation(0, 'jingzhi', true);
                                                }
                                                break;
                                            case "modesecoff2":
                                                modesecoff1.texture = modestexture['modesecoff'];
                                                modesecoff2.texture = modestexture['modesecon'];
                                                modesecoff3.texture = modestexture['modesecoff'];
                                                if (window.moode == 'shenfen') {
                                                    secmodeinfo.texture = modestexture['8pjz'];
                                                    entermodegame('identity', 'normal', 8);
                                                    if(window.rz_shenfen_node&&window.rz_shenfen_node.length==3) {
                                                        window.rz_shenfen_node[2].innerText='8人经典玩法，更高难度，更大挑战';
                                                    }
                                                }
                                                if (window.moode == 'doudizhu') {
                                                    secmodeinfo.texture = modestexture['ddzhl'];
                                                    entermodegame('doudizhu', 'huanle', 3);
                                                }
                                                spineks.state.setAnimation(0, 'kaishi', false);
                                                spineks.state.tracks[0].onComplete = function() {
                                                    spineks.state.setAnimation(0, 'jingzhi', true);
                                                };
                                                // entermodegame('identity','normal','8');
                                                break;
                                            case "modesecoff3":
                                                modesecoff1.texture = modestexture['modesecoff'];
                                                modesecoff2.texture = modestexture['modesecoff'];
                                                modesecoff3.texture = modestexture['modesecon'];
                                                if (window.moode == 'shenfen') {
                                                    secmodeinfo.texture = modestexture['guowar'];
                                                    entermodegame('guozhan',undefined,8);
                                                    if(window.rz_shenfen_node&&window.rz_shenfen_node.length==3) {
                                                        window.rz_shenfen_node[2].innerText='解锁国籍双将模式，讲究技巧';
                                                    }
                                                }
                                                if (window.moode == 'doudizhu') {
                                                    secmodeinfo.texture = modestexture['ddzbl'];
                                                    entermodegame('doudizhu', 'binglin', 3)
                                                }
                                                spineks.state.setAnimation(0, 'kaishi', false);
                                                spineks.state.tracks[0].onComplete = function() {
                                                    spineks.state.setAnimation(0, 'jingzhi', true);
                                                }
                                                // entermodegame('guozhan')      
                                                break;
                                            case "mode2":
                                                game.storyBgMode='paiwei';
                                                game.rzPaiweiType=0;
                                                if(lib.config.rzEpicSpine) {
                                                     game.storyBackground();
                                                }
                                                oppeen(paiweihome)
                                                if(lib.config.rz_paiWeiTip) {
                                                    game.saveConfig('rz_paiWeiTip',false);
                                                    game.saveConfig('rz_paiWeiCount',false);
                                                    if(!lib.config.rzLock_dec) setTimeout(function(){
                                                        //window.tipsClick('Menu');//已读
                                                        window.tipsClick('TinyWindow');//开关
                                                        navigator.notification.confirm(
                                                            'ㅤㅤ由于您上局游戏存在逃跑行为，系统已给予一定的扣分，请您认真对待每一场游戏！',
                                                            function(){
                                                                //window.tipsClick('Menu');//已读
                                                                window.tipsClick('Report01');//离开
                                                            },
                                                            '消极游戏惩罚',
                                                            ['我已收到'],
                                                        );
                                                    },300);
                                                }
                                                break;
                                            //自由场
                                            case "mode3":
                                                //传送！
                                                let freegameModes = [
                                                    //['single', 'dianjiang'],
                                                    //['identity', 'normal', 3],
                                                    //['identity', 'normal', 4],
                                                    //['identity', 'normal', 5],
                                                    //['identity', 'normal', 6],
                                                    //['identity', 'normal', 7],
                                                    //['identity', 'normal', 8],
                                                    //['doudizhu', 'huanle', 3],
                                                    //['doudizhu', 'binglin', 3],
                                                    //['doudizhu', 'normal', 3],
                                                    //['guozhan', 'yingbian', 4],
                                                    //['guozhan', 'yingbian', 5],
                                                    //['guozhan', undefined, 6],
                                                    //['guozhan', undefined, 7],
                                                    //['guozhan', undefined, 8],
                                                    ['identity', 'zhong','<span data-nature="yellow">明忠模式</span>'],
                                                    ['identity', 'purple','<span data-nature="fire">3</span><span data-nature="soil">v</span><span data-nature="wood">3</span><span data-nature="soil">v</span><span data-nature="thunder">2</span></span>'],
                                                    //['versus', 'two'],
                                                    ['versus', 'four','<span data-nature="thunder">对抗模式</span>'],
                                                    //['versus', 'guandu'],
                                                    ['versus', 'siguo','<span data-nature="fire">四国模式</span>'],
                                                ];
                                                game.storyBgMode='freegame';
							                    var model=['identity',/*'guozhan',*//*'doudizhu',*/'versus'].randomGet();
							                    if(model=='identity') {
							                        var spec=[/*'normal',*/'zhong','purple'].randomGet();
							                        if(spec=='normal') {
							                            var num=[3,4,5,6,7,8].randomGet();
							                        }else {
							                            var num=undefined;
							                        }
							                    }
							                    if(model=='guozhan') {
							                        var spec=['normal','yingbian','old','free'].randomGet();
							                        var num=[4,5,6,7,8].randomGet();
							                    }
							                    if(model=='doudizhu') {
							                        var spec=['huanle','binglin','normal'].randomGet();
							                        var num=3;
							                    }
							                    if(model=='versus') {
							                        var spec=[/*'two',*/'four',/*'guandu',*/'siguo'].randomGet();
							                        var num=undefined;
							                    }
                                                const randomIndex = Math.floor(Math.random() * freegameModes.length);
                                                //entermodegame(...freegameModes[randomIndex]);
                                                //const inputMode=[model,spec,num];
                                                var modelista=freegameModes[randomIndex];
                                                const inputMode=[modelista[0],modelista[1]]
                                                //window.showTitle(modelista[1]);
                                                entermodegame(...inputMode);
                                                game.storyBgMode='freegame';
                                                //自由场标题展示
                                            if(lib.config.rzsh_emode_show) { 
                                                if(typeof game.rollCard=='function') {
                                                    setTimeout(function(){
                                                        //window.showTitle(modelista[1]);
                                                        var cardsList = [];
                                                        var emodeList = ['four', 'zhong', 'siguo', 'purple'];
                                                        for(var g=0; g<emodeList.length; g++) {
                                                            cardsList.push({
                                                                name: emodeList[g],
                                                                front:'extension/如真似幻/images/emode/cards/'+emodeList[g]+'.png',
                                                                back:'extension/如真似幻/images/emode/cards/cardback.png'
                                                            });
                                                        }
                                                        /*for(var g=0; g<emodeList.length; g++) {
                                                            cardsList.push({
                                                                name: emodeList[g]+'_2',
                                                                front:'extension/如真似幻/images/emode/cards/'+emodeList[g]+'.png',
                                                                back:'extension/如真似幻/images/emode/cards/cardback.png'
                                                            });
                                                        }*/
                                                        var rollCard=game.rollCard(cardsList, {
                                                            checkResult: function(end) {
                                                                setTimeout(function(){
                                                                    rzshkz();
                                                                    setTimeout(function(){
                                                                        end();
                                                                    }, 500);
                                                                }, 2500);
                                                            },
                                                            speed: 5,
                                                            scale: 1.4,
                                                        });
                                                        setTimeout(function(){
                                                            rollCard.draw(modelista[1]);
                                                        }, 4000);
                                                    }, 1500);
                                                }else {
                                                    setTimeout(function(){
                                                        window.showTitle(modelista[1]);
                                                    },0);
                                                    setTimeout(function(){
                                                        rzshkz();
                                                    },4000);
                                                }
                                                uihome.removeChild(uihomecenter);
                                                setTimeout(function(){
                                                    hideDrawer(uihometop, "top");
                                                    hideDrawer(uihomeunder, "under");
                                                    hideDrawer(uihomeleft, "left");
                                                    hideDrawer(uihomeright, "right");
                                                },500);
                                                window.isOnhide = true;
                                                opprogress = setTimeout(function() {
                                                    window.isOnhide = false;
                                                    pixiapp.stage.removeChild(uihome);
                                                    if (opprogress != null) clearTimeout(opprogress);
                                                    opprogress = null;
                                                }, 1000);
                                                /*pixiapp.stage.children.forEach(function(child) {
                                                    if (child == uibg&&lib.config.rzEpicSpine) {
                                                        pixiapp.stage.removeChild(child);
                                                    }
                                                });*/
                                                //if(lib.config.rzEpicSpine) {
                                                    //萌新修改
                                                    //pixiapp.stage.removeChild(uibg);
                                                    game.storyBackground();
                                                    //uibg.texture = xloader.resources.loadingbg.texture;
                                                    uibg.showfunc=function(num,sum){
                                                        uibg.alpha=(sum-num)/sum;
                                                        if(sum>num){
                                                            setTimeout(function(){
                                                                uibg.showfunc(num+1,sum);
                                                            },10);
                                                        }else {
                                                            //uibg3.alpha=1;
                                                            //pixiapp.stage.removeChild(spinelo2, uibg3);
                                                            pixiapp.stage.removeChild(uibg);
                                                            //uibg.texture = xloader.resources.loadingbg.texture;
                                                        }
                                                    }
                                                    if(uibg.playVideoTheme) uibg.playVideoTheme(true, 'delete');
                                                    else uibg.showfunc(0,10);
                                                    if(window.uibg3hide) {
                                                        window.uibg3hide(0,20,50,function(){
                                                            if(window.uibg3Aready) pixiapp.stage.removeChild(spinelo2, uibg3);
                                                        });
                                                    }
                                                    //if(lib.config.rzEpicSpine) pixiapp.stage.removeChild(spinelo2, uibg3);
                                                //}
                                            }else {
                                                rzshkz()
                                            }
                                                //ui.background.setBackgroundImage("image/background/" + lib.config.image_background + ".jpg");
                                                //rzshkz()
                                                break;
                                            //活动场
                                            case "activeea":
                                                const inputModeact=['versus','guandu',undefined];
                                                entermodegame(...inputModeact);
                                                //rzshkz()
                                                setTimeout(function(){
                                                    rzshkz();
                                                },0);
                                                uihome.removeChild(uihomecenter);
                                                setTimeout(function(){
                                                    hideDrawer(uihometop, "top");
                                                    hideDrawer(uihomeunder, "under");
                                                    hideDrawer(uihomeleft, "left");
                                                    hideDrawer(uihomeright, "right");
                                                },100);
                                                window.isOnhide = true;
                                                opprogress = setTimeout(function() {
                                                    window.isOnhide = false;
                                                    pixiapp.stage.removeChild(uihome);
                                                    if (opprogress != null) clearTimeout(opprogress);
                                                    opprogress = null;
                                                },200);
                                                /*pixiapp.stage.children.forEach(function(child) {
                                                    if (child == uibg&&lib.config.rzEpicSpine) {
                                                        pixiapp.stage.removeChild(child);
                                                    }
                                                });*/
                                                    uibg.showfunc=function(num,sum){
                                                        if(!uibg) return;
                                                        uibg.alpha=(sum-num)/sum;
                                                        if(sum>num){
                                                            setTimeout(function(){
                                                                uibg.showfunc(num+1,sum);
                                                            },10);
                                                        }else {
                                                            //uibg3.alpha=1;
                                                            //pixiapp.stage.removeChild(spinelo2, uibg3);
                                                            if(pixiapp) pixiapp.stage.removeChild(uibg);
                                                            //uibg.texture = xloader.resources.loadingbg.texture;
                                                        }
                                                    }
                                                    if(uibg.playVideoTheme) uibg.playVideoTheme(true, 'delete');
                                                    else uibg.showfunc(0,10);
                                                break;
                                            case "mode4":
                                                //		oppeen(wujianghome)
                                                entermodegame('brawl');
                                                setTimeout(function(){
                                                    rzshkz();
                                                },0);
                                                uihome.removeChild(uihomecenter);
                                                setTimeout(function(){
                                                    hideDrawer(uihometop, "top");
                                                    hideDrawer(uihomeunder, "under");
                                                    hideDrawer(uihomeleft, "left");
                                                    hideDrawer(uihomeright, "right");
                                                },100);
                                                window.isOnhide = true;
                                                opprogress = setTimeout(function() {
                                                    window.isOnhide = false;
                                                    pixiapp.stage.removeChild(uihome);
                                                    if (opprogress != null) clearTimeout(opprogress);
                                                    opprogress = null;
                                                },200);
                                                /*pixiapp.stage.children.forEach(function(child) {
                                                    if (child == uibg&&lib.config.rzEpicSpine) {
                                                        pixiapp.stage.removeChild(child);
                                                    }
                                                });*/
                                                    uibg.showfunc=function(num,sum){
                                                        if(!uibg) return;
                                                        uibg.alpha=(sum-num)/sum;
                                                        if(sum>num){
                                                            setTimeout(function(){
                                                                uibg.showfunc(num+1,sum);
                                                            },10);
                                                        }else {
                                                            //uibg3.alpha=1;
                                                            //pixiapp.stage.removeChild(spinelo2, uibg3);
                                                            if(pixiapp) pixiapp.stage.removeChild(uibg);
                                                            //uibg.texture = xloader.resources.loadingbg.texture;
                                                        }
                                                    }
                                                    if(uibg.playVideoTheme) uibg.playVideoTheme(true, 'delete');
                                                    else uibg.showfunc(0,10);
                                                //rzshkz();
                                                break;
                                            case "under6":
                                              if(game.isUnlockDialog) {
                                                game.cls_wjbg=true;
                                                oppeen(wujianghome)
                                              }
                                                break;
                                            case "avatar":
                                            if(lib.config.rzLock_tou) break;
                                            if(window.noDoubleClick) break;
                                            window.uibg3Aready=false;
                                            window.noDoubleClick=true;
                                            window.chg_head_rz=function(num,show,func){
                                                var opa=(num/10);
                                                if(!show) opa=1-opa;
                                                window.show_rzsh_head.style.filter='blur('+opa*5+'px)';
                                                if(num>0) {
                                                    setTimeout(function(){
                                                        window.chg_head_rz(num-1,show,func);
                                                    },20);
                                                }else {
                                                    if(func) func();
                                                }
                                            };
                                            window.hide_show_rz=function(num){
                                                setTimeout(function(){
                                                    if(num<30) {
                                                        window.show_rzsh_head.style.opacity=num/30;
                                                        window.hide_show_rz(num+1);
                                                    }else {
                                                        window.show_rzsh_head.style.opacity=1;
                                                        //window.show_rzsh_head.remove();
                                                    }
                                                },10);};
                                            window.hide_out_rz=function(num){
                                                setTimeout(function(){
                                                    if(num>0) {
                                                        window.show_rzsh_head.style.opacity=num/30;
                                                        window.hide_out_rz(num-1);
                                                    }else {
                                                        window.show_rzsh_head.style.opacity=0;
                                                        window.show_rzsh_head.remove();
                                                        window.noDoubleClick=false;
                                                    }
                                                },10);};
                                                window.show_rzsh_head=false;
                                                window.rzsh_headcho=(num,old)=>{
                                                  if(!window.show_rzsh_head){
                                                    window.show_rzsh_head=ui.create.node('img');
                                                    window.show_rzsh_head.src=lib.assetURL+'extension/如真似幻/images/avatar/'+window.rzsh_headlist[num];
                                                    //alert_old(show_rzsh_head.scr);
                                                    window.show_rzsh_head.style.cssText='pointer-events: none; text-align: center; opacity: 0; display: block; position: absolute; z-index:1; width: 62px; height: 62px; left: calc(6.9% - 31.5px); top: calc(6.9% - 31.5px); border: 1px solid #F7FF69; box-shadow: 0px 0px 3px 3px #ffcc00;';
                                                    //window.show_rzsh_head.style.transitions='opacity 1s ease-in-out';
                                                    //window.show_rzsh_head.style.opacity=1;
                                                    document.body.appendChild(window.show_rzsh_head);
                                                    window.hide_show_rz(0);
                                                  }else {
                                                    window.chg_head_rz(10,false,function(){
                                                        window.show_rzsh_head.src=lib.assetURL+'extension/如真似幻/images/avatar/'+window.rzsh_headlist[num];
                                                        window.chg_head_rz(10,true);
                                                    });
                                                  }
                                                //头像切换优化了一下下，可以精准选择了
                                                if(old==rzsh_headlist[num]) {
                                                    var menu=['下一项','返回','跳十项'];
                                                }else {
                                                    var menu=['下一项','确定','跳十项'];
                                                }
                                                var strs=rzsh_headlist[num].slice(0,-4);
                                                for(var strn=strs.length;strn<=8;strn++) {
                                                   strs='0'+strs;
                                                }
                                                strs='NO.'+strs;
                                                var show='◈切换玩家头像〔'+(num+1)+'｜'+rzsh_headlist.length+'〕\n☞编号 - '+strs;
                                                //rzsh_headlist[num].slice(0,-4);
                                                navigator.notification.confirm(
									    			show,
										    		function(index){
										    		    //window.show_rzsh_head.remove();
										    			switch(index){
											    		    case 0:
											    		    //window.rzsh_headcho(num);
											    		    window.uibg3Aready=true;
											    		    if(old==rzsh_headlist[num]) {
											    		        window.hide_out_rz(30);
											    		    }else {
											    		        window.chg_head_rz(10,false,function(){
                                                                    window.show_rzsh_head.src=lib.assetURL+'extension/如真似幻/images/avatar/'+old;
                                                                    window.chg_head_rz(10,true,function(){
                                                                        window.hide_out_rz(30);
                                                                    });
                                                                });
											    		    }
											    		    window.tipsClick('Report01');//离开
											    		    break;
										    
											    		    case 1:
											    		    /*if(num<=0) {
											    		        var next=rzsh_headlist.length-1;
											    		    }else {
											    		        var next=num-1;
											    		    }*/
											    		    if(num>=rzsh_headlist.length-1) {
											    		        var next=0;
											    		    }else {
											    		        var next=num+1;
											    		    }
											    		    window.rzsh_headcho(next,old);
											    		    window.tipsClick('TinyButton');//切换
											    		    break;
										    
											    			
								    					    
								    					    case 2:
								    					    window.uibg3Aready=true;
								    					    window.hide_out_rz(30);
								    					    //window.show_rzsh_head.remove();
								    					    var headitem=rzsh_headlist[num];
											    			game.saveConfig('rzsh_head',headitem);
											    			window.tipsClick('Enter');//确定
												    		if(old!=rzsh_headlist[num]) setTimeout(()=>{
                                                                game.reload3();
                                                            },0);
												    		break;
												    		
												    		case 3: 
										        			/*if(num>=rzsh_headlist.length-1) {
											    		        var next=0;
											    		    }else {
											    		        var next=num+1;
											    		    }*/
											    		    var next=Math.floor((num+10)/10)*10;
											    		    if(next>=rzsh_headlist.length-1) {
											    		        next=0;
											    		    }
											    		    window.rzsh_headcho(next,old);
											    		    window.tipsClick('TinyButton');//切换
								    					    break;
												    		//case 3:navigator.app.exitApp();break;
											    		}
											    	},
										    		'三国杀·琉璃版',
								    				menu
								    			);
								    	    }
								    	    game.getFileList('extension/如真似幻/images/avatar',function(folders,files){
								    	    window.rzsh_headlist=[];
								    	    for(var s=0;s<files.length;s++) {
								    	        if(files[s].indexOf('.png')!=-1||files[s].indexOf('.jpg')!=-1) {
								    	            window.rzsh_headlist.add(files[s]);
								    	        }
								    	    }
								    	    //window.rzsh_headlist=window.rzsh_headlist.sort(() => Math.random() - 0.5);
								    	    window.rzsh_headlist=window.rzsh_headlist.sort((a,b) => {
								    	        return parseInt(a.slice(0,-4))-parseInt(b.slice(0,-4));
								    	    });
                                            var old=lib.config.rzsh_head?lib.config.rzsh_head:'2.png';
								    	    if(rzsh_headlist.contains(old)) {
								    	        window.rzsh_headcho(rzsh_headlist.indexOf(old),old);
								    	    }else {
								    	        window.rzsh_headcho(0,old);
								    	    }
								    	    });
								    	    
                                                /*confirms('是否切换随机头像',false,function(){
                                                    game.saveConfig('rzsh_head', [1,2,3,4,5,6,7,8,9].randomGet()+'.png');
                                                    setTimeout(()=>{
                                                        game.reload3();
                                                    },0);
                                                });*/
                                                break;
                                            case "left1":
                                            if(lib.config.rzLock_set) break;
                                            window.uibg3Aready=false;
                                            window.rzsh_uicho=(num,old)=>{
                                                if(old==rzsh_uiimglist[num]) {
                                                    var menu=['上一项','返回','下一项'];
                                                }else {
                                                    var menu=['上一项','确定','下一项'];
                                                }
                                                var show='◈切换登录界面动画['+(num+1)+'/'+rzsh_uiimglist.length+']：'+rzsh_uiimglist[num];
                                                //〔'+(num+1)+'/'+rzsh_ideimglist.length+'〕;
                                                navigator.notification.confirm(
									    			show,
										    		function(index){
										    		    //window.show_rzsh_head.remove();
										    			switch(index){
											    		    /*case 0:
											    		    window.show_rzsh_head.remove();
											    		    break;*/
											    		    case 0:
											    		    window.uibg3Aready=true;
											    		    window.tipsClick('Report01');//离开
											    		    break;
										    
											    		    case 1:
											    		    if(num<=0) {
											    		        var next=rzsh_uiimglist.length-1;
											    		    }else {
											    		        var next=num-1;
											    		    }
											    		    window.rzsh_uicho(next,old);
											    		    window.tipsClick('TinyButton');//切换
											    		    break;
										    
											    			
								    					    
								    					    case 2:
								    					    window.uibg3Aready=true;
								    					    var uiitem=rzsh_uiimglist[num];
											    			localStorage.setItem("rzsh_loginui",uiitem)
												    		/*if(old!=rzsh_headlist[num]) setTimeout(()=>{
                                                                game.reload3();
                                                            },0);*/
                                                            window.tipsClick('Enter');//确定
												    		break;
												    		
												    		case 3: 
										        			if(num>=rzsh_uiimglist.length-1) {
											    		        var next=0;
											    		    }else {
											    		        var next=num+1;
											    		    }
											    		    window.rzsh_uicho(next,old);
											    		    window.tipsClick('TinyButton');//切换
								    					    break;
												    		//case 3:navigator.app.exitApp();break;
											    		}
											    	},
										    		'三国杀·琉璃版',
								    				menu
								    			);
								    	    }
								    	    game.getFileList('extension/如真似幻/spine/startSpine',function(folders,files){
								    	    window.rzsh_uiimglist=[];
								    	    for(var s=0;s<folders.length;s++) {
								    	        window.rzsh_uiimglist.add(folders[s]);
								    	    }
								    	    //alert(window.rzsh_ideimglist);
                                            var old=localStorage.getItem("rzsh_loginui")?localStorage.getItem("rzsh_loginui"):'戏志才·举棋若定';
								    	    if(rzsh_uiimglist.contains(old)) {
								    	        window.rzsh_uicho(rzsh_uiimglist.indexOf(old),old);
								    	    }else {
								    	        window.rzsh_uicho(0,old);
								    	    }
								    	    });
								    	    
                                                break;
                                            case "left2":
                                            if(lib.config.rzLock_set) break;
                                            window.uibg3Aready=false;
                                            window.rzsh_uiHudie={};
                                            window.rzsh_nowEpicTheme=lib.config.rzEpicSpine;
                                            window.rzsh_uicho=(num,old)=>{
                                                if(old==rzsh_uiimglist[num]) {
                                                    var menu=['上一项','返回','下一项'];
                                                }else {
                                                    var menu=['上一项','确定','下一项'];
                                                }
                                                var show='◈切换大厅主题['+(num+1)+'/'+rzsh_uiimglist.length+']：'+rzsh_uiimglist[num];
                                                //〔'+(num+1)+'/'+rzsh_ideimglist.length+'〕;
                                                navigator.notification.confirm(
									    			show,
										    		function(index){
										    		    //window.show_rzsh_head.remove();
										    			switch(index){
											    		    /*case 0:
											    		    window.show_rzsh_head.remove();
											    		    break;*/
											    		    case 0:
											    		    window.uibg3Aready=true;
											    		    window.tipsClick('Report01');//离开
											    		    break;
										    
											    		    case 1:
											    		    if(num<=0) {
											    		        var next=rzsh_uiimglist.length-1;
											    		    }else {
											    		        var next=num-1;
											    		    }
											    		    window.rzsh_uicho(next,old);
											    		    window.tipsClick('TinyButton');//切换
											    		    break;
										    
											    			
								    					    
								    					    case 2:
								    					    window.uibg3Aready=true;
								    					    var uiitem=rzsh_uiimglist[num];
											    			//localStorage.setItem("rzsh_loginui",uiitem)
											    			game.saveConfig('uiStyles',uiitem);
											    			if(window.rzsh_uiHudie[uiitem]) {
											    			    game.saveConfig('rzEpicSpine',true);
											    			    game.saveConfig('rzNoHuDieSpine',!window.rzsh_nowEpicTheme);
											    			}else {
											    			    game.saveConfig('rzNoHuDieSpine',false);
											    			}
											    			window.tipsClick('Enter');//确定
												    		if(old!=rzsh_uiimglist[num]) setTimeout(()=>{
                                                                game.reload3();
                                                            },0);
												    		break;
												    		
												    		case 3: 
										        			if(num>=rzsh_uiimglist.length-1) {
											    		        var next=0;
											    		    }else {
											    		        var next=num+1;
											    		    }
											    		    window.rzsh_uicho(next,old);
											    		    window.tipsClick('TinyButton');//切换
								    					    break;
												    		//case 3:navigator.app.exitApp();break;
											    		}
											    	},
										    		'三国杀·琉璃版',
								    				menu
								    			);
								    	    }
								    	    game.getFileList('extension/如真似幻/images/uiStyles',function(folders,files){
								    	    window.rzsh_uiimglist=[];
								    	    for(var s=0;s<folders.length;s++) {
								    	        window.rzsh_uiimglist.add(folders[s]);
								    	        game.getFileList('extension/如真似幻/images/uiStyles/'+folders[s],function(folders2,files2){
                                                    window.rzsh_uiHudie[folders[s]] = files2.includes(`bgs.mp4`);
                                                });
								    	    }
								    	    //alert(window.rzsh_ideimglist);
                                            var old=lib.config.uiStyles?lib.config.uiStyles:'经典主题';
								    	    if(rzsh_uiimglist.contains(old)) {
								    	        window.rzsh_uicho(rzsh_uiimglist.indexOf(old),old);
								    	    }else {
								    	        window.rzsh_uicho(0,old);
								    	    }
								    	    });
								    	    
                                                /*navigator.notification.confirm(
									    			'◈切换界面主题壁纸',
										    		function(index){
										    		    //window.show_rzsh_head.remove();
										    			switch(index){
											    		    case 0:
											    		    break;
										    
											    		    case 1:
											    		    game.saveConfig('rzsh_bgnum',2);
											    		    game.saveConfig('rzsh_ui','ur.json');
											    		    setTimeout(()=>{
                                                     		 	game.reload3();
                                                  			},100);
											    		    break;
										    
											    			
								    					    
								    					    case 2:
								    					    game.saveConfig('rzsh_bgnum',1);
								    					    game.saveConfig('rzsh_ui','ui.json');
											    		    setTimeout(()=>{
                                                     		 	game.reload3();
                                                  			},100);
												    		break;
												    		
												    		case 3: 
												    		game.saveConfig('rzsh_bgnum',3);
										        			game.saveConfig('rzsh_ui','ul.json');
											    		    setTimeout(()=>{
                                                     		 	game.reload3();
                                                  			},100);
								    					    break;
												    		//case 3:navigator.app.exitApp();break;
											    		}
											    	},
										    		'三国杀·琉璃版',
								    				['舞惑群心','经典皮肤','清凉夏日']
								    			);*/
                                                /*confirms('◈是否切换界面按钮皮肤',false,function(){
                                                    if (lib.config.rzsh_ui != 'ui.json') {
                                                        var ui='ui.json';
                                                    }
                                                    var uilist=['ui.json','ur.json','ul.json']
                                                    game.saveConfig('rzsh_ui','ur.json');
                                                    else {game.saveConfig('rzsh_ui', 'ui.json');}
                                                    setTimeout(()=>{
                                                        game.reload3();
                                                    },0);
                                                });*/
                                                break;
                                            case "left3":
                                            if(lib.config.rzLock_set) break;
                                            window.uibg3Aready=false;
                                                var zz=lib.config.zhuanzhuan;
                                                var ep=window.rz_hasVideoBGS? (!lib.config.rzNoHuDieSpine) : lib.config.rzEpicSpine;
                                                var ep_old=ep;
                                                var txInfo=window.rz_hasVideoBGS? '至臻' : '动态';
                                            window.zhuanAndEpic=(zz,ep)=>{
                                                var zhuanzhuan=zz != 'off' ? ['关闭转盘','✔'] : ['开启转盘','✘'];
                                                var epic=ep ? ['切换经典','✔'] : ['切换'+txInfo,'✘'];
                                                var check='返回';
                                                if(zz != 'off'&&lib.config.zhuanzhuan=='off') check='设置';
                                                if(zz == 'off'&&lib.config.zhuanzhuan!='off') check='设置';
                                                //if((!ep)!=(!lib.config.rzEpicSpine)) check='设置';
                                                if((!ep)!=(!ep_old)) check='设置';
                                                //var check=(zz!=lib.config.zhuanzhuan||ep!=lib.config.rzEpicSpine)?'设置':'返回';
                                                var chat='◈当前设定：匹配转盘<'+zhuanzhuan[1]+'>｜'+txInfo+'大厅<'+epic[1]+'>';
                                                navigator.notification.confirm(
									    			chat,
										    		function(index){
										    		    //window.show_rzsh_head.remove();
										    			switch(index){
											    		    /*case 0:
											    		    break;*/
											    		    case 0:
											    		    window.uibg3Aready=true;
											    		    window.tipsClick('Report01');//离开
											    		    break;
										    
											    		    case 1:
											    		    if (zz != 'off') window.zhuanAndEpic('off',ep);
                                                            else window.zhuanAndEpic('on',ep);
                                                            window.tipsClick('TinyWindow');//开关
											    		    break;
										    
											    			
								    					    
								    					    case 2:
								    					    window.uibg3Aready=true;
								    					    window.tipsClick('Enter');//确定
								    					    if(check!='返回') {
								    					        game.saveConfig('zhuanzhuan', zz);
								    					        if(window.rz_hasVideoBGS) {
    											    			    game.saveConfig('rzEpicSpine',true);
    											    			    game.saveConfig('rzNoHuDieSpine',!ep);
    											    			}else {
								    					            game.saveConfig('rzEpicSpine', ep);
    											    			    game.saveConfig('rzNoHuDieSpine',false);
    											    			}
											    		        setTimeout(()=>{
                                                     		     	game.reload3();
                                                  			    },100);
                                                  			}
												    		break;
												    		
												    		case 3: 
												    		if(ep) {
								    					        window.zhuanAndEpic(zz,false);
								    					    }else {
								    					        window.zhuanAndEpic(zz,true);
								    					    }
											    		    window.tipsClick('TinyWindow');//开关
								    					    break;
												    		//case 3:navigator.app.exitApp();break;
											    		}
											    	},
										    		'三国杀·琉璃版',
								    				[zhuanzhuan[0],check,epic[0]]
								    			);
								    		}
								    		window.zhuanAndEpic(zz,ep);
                                                /*confirms(lib.config.zhuanzhuan != 'off' ? '◈是否关闭转盘效果' : '◈是否打开转盘效果',false,function(){
                                                    if (lib.config.zhuanzhuan != 'off') game.saveConfig('zhuanzhuan','off')
                                                    else game.saveConfig('zhuanzhuan', 'on');
                                                });
                                                /*if (confirm(lib.config.zhuanzhuan != 'off' ? '是否关闭转盘效果' : '是否打开转盘效果')) {
                                                    if (lib.config.zhuanzhuan != 'off') game.saveConfig('zhuanzhuan','off')
                                                    else game.saveConfig('zhuanzhuan', 'on');
                                                }*/
                                                break;
                                            case "left4":
                                            if(lib.config.rzLock_set) break;
                                            window.uibg3Aready=false;
                                            window.rzsh_idecho=(num,old)=>{
                                                if(old==rzsh_ideimglist[num]) {
                                                    var menu=['上一项','返回','下一项'];
                                                }else {
                                                    var menu=['上一项','确定','下一项'];
                                                }
                                                var show='◈切换身份模式图片：'+rzsh_ideimglist[num].slice(0,-4)+'\n（重新启动后生效）';
                                                //〔'+(num+1)+'/'+rzsh_ideimglist.length+'〕;
                                                navigator.notification.confirm(
									    			show,
										    		function(index){
										    		    //window.show_rzsh_head.remove();
										    			switch(index){
											    		    /*case 0:
											    		    window.show_rzsh_head.remove();
											    		    break;*/
											    		    case 0:
											    		    window.uibg3Aready=true;
											    		    window.tipsClick('Report01');//离开
											    		    break;
										    
											    		    case 1:
											    		    if(num<=0) {
											    		        var next=rzsh_ideimglist.length-1;
											    		    }else {
											    		        var next=num-1;
											    		    }
											    		    window.rzsh_idecho(next,old);
											    		    window.tipsClick('TinyButton');//切换
											    		    break;
										    
											    			
								    					    
								    					    case 2:
								    					    window.uibg3Aready=true;
								    					    var ideitem=rzsh_ideimglist[num];
											    			game.saveConfig('rszh_ideimg',ideitem);
												    		/*if(old!=rzsh_headlist[num]) setTimeout(()=>{
                                                                game.reload3();
                                                            },0);*/
                                                            window.tipsClick('Enter');//确定
												    		break;
												    		
												    		case 3: 
										        			if(num>=rzsh_ideimglist.length-1) {
											    		        var next=0;
											    		    }else {
											    		        var next=num+1;
											    		    }
											    		    window.rzsh_idecho(next,old);
											    		    window.tipsClick('TinyButton');//切换
								    					    break;
												    		//case 3:navigator.app.exitApp();break;
											    		}
											    	},
										    		'三国杀·琉璃版',
								    				menu
								    			);
								    	    }
								    	    game.getFileList('extension/如真似幻/images/modeb/identity',function(folders,files){
								    	    window.rzsh_ideimglist=[];
								    	    for(var s=0;s<files.length;s++) {
								    	        if(files[s].indexOf('.png')!=-1||files[s].indexOf('.jpg')!=-1) {
								    	            window.rzsh_ideimglist.add(files[s]);
								    	        }
								    	    }
								    	    game.saveConfig('rzsh_bgranlist',window.rzsh_ideimglist);
								    	    window.rzsh_ideimglist.add('随机背景.ran');
								    	    //alert(window.rzsh_ideimglist);
                                            var old=lib.config.rszh_ideimg?lib.config.rszh_ideimg:'君临天下.png';
								    	    if(rzsh_ideimglist.contains(old)) {
								    	        window.rzsh_idecho(rzsh_ideimglist.indexOf(old),old);
								    	    }else {
								    	        window.rzsh_idecho(0,old);
								    	    }
								    	    });
								    	    
                                                break;
                                            case "czg":
                                             if( lib.config.extension_皮肤切换_czgEnable){
                                                ui.window=ui.create.div('#window',document.body);
			                                	ui.arena=ui.create.div('#arena.nome',ui.window);
		                                      	skinSwitch.cangZhenGe()
                                             } 
                                                break;
                                            case "say":
                                             if(lib.config.rzLock_say) return;
                                             var chatLog=[
//大厅聊天模块，素材来源于网络
'这就是、掏钱吗？',
'关羽在此，尔整寿司！',
'匀个微醋，萝卜分层。',
'你的白菜多了……',
'味酱何在？',
'薯酱何在？',
'既蒸鱼，何争……酱。',
'将军钱财兼备，凉企之栋梁也。',
'氪金，已成为大地的主流。',
'忍一时越想越气，氪一万海阔天空。',
'如今之计，唯有氪金再做决断！',
'睁开你的眼睛看看，现在是谁嗦了蒜？',
'狗卡有我良计，骗氪易如反掌！',
'守望已死，联盟再立，就在去年，吃鸡大吉！',
'引吾至此，岂能不白嫖之？',
'这酒高大上……',
'敌人发型已乱，随我杀！',
'哼，你满身都是破烂！',
'偷渡银屏，直取蜀汉！',
'不要小瞧女汉子！',
'父亲未尽之业，由I continue！',
'同归于禁吧！',
'大爷胃疼，胃疼啊！',
'全军偷鸡！！',
'阉人张飞在此！',
'我还是太连清了。',
'哼，你满身都是破烂！',
'飘飘兮若刘封之回血。',
'同归于禁吧！',
'偷渡银屏，直取蜀汉！',
'飘摇兮若刘封之回血。',
'此乃孟达之妓，非我所约！',
'全力氪金，言贵者斩！',
'集万千阴兵，定凉企大局！',
'定品寻良妓，中正探人妻。',
'此乃孟达之妓，非我所约。',
'这次八百？可上一千！',
'拳头已热，埋伏已完，只等敌军进来。',
'在烈日之下吃西瓜！',
'弟兄们，我们的鸡回来了！',
'众将死半，非我之锅。',
'三个禽兽，也不是我的对手。',
'Why？且饮一杯。',
'但归置于道，吴亦凡是真逗。',
'宠物已宰之，则叫可知矣。',
'我又喝醉？',
'江南重义，东吴丧德！',
'吴懿不在此地，已遣别部发往。',
'声东击西，敌寇一网陈群。',
'你的白菜多了！',
'看我三步之内，娶你小蜜！',
'大爷胃疼，胃疼啊……',
'子桓，你还爱我！',
'我替施主把把妹。',
'爷好，就这样吧……',
'众将战死，非我之锅！',
'我还是太连清……',
'可恶，就差一步了。',
'目标敌阵，全军偷鸡！',
'弟兄们，我们的鸡回来了。',
'取汝手机，犹如探囊取物。',
'你可闪得过洗衣机？',
'賊将无胆，何不找翔？',
'追兵走此小道，将军交我应付。',
'将军凶猛，末将断后。',
'僵尸们，引火对敌！',
'吾已呈翔相献，君何踌躇不舔？',
'犯大吴疆土者，盛必击而破之！',
'若敢来犯，必叫你大败而归！',
'负我大魏，养我国妃。',
'听贫道微妙者，乘以七，可以转危为安，救亡使存也。',
'有人组队吗？',
'这里有车队速上！',
'有没有人送我点将卡？',
'富哥们vivo400宝珠谢谢了。',
'富姐们，速速v我400宝珠球球了。',
'哥，我跪下来球球你们了v我点宝珠吧，我真的很想玩新武将。',
''+get.cnNumber([1,2,3,4,7].randomGet())+'缺一，就差你了。',
''+get.cnNumber([1,2,3,4,7].randomGet())+'缺一，快来快来。',
''+get.cnNumber([2,3,4,5,8].randomGet())+'人局，速来。',
''+get.cnNumber([3,4,5,8].randomGet())+'人局，就差两个了，来。',
''+get.cnNumber([2,3,4,5,8].randomGet())+'人局，宝珠多的来。',
'有没有人玩斗地主，二缺一。',
'快快快，排位我带飞。',
'风吹鸡蛋壳，牌去人安乐。',
'有人要一起组队吗？',
'排位车队速来，走起！',
'有没有人知道那个太虚幻境怎么玩啊？',
'有没有大佬知道斗地主怎样容易赢呀？',
'请大佬带飞我打至尊场。',
'有人缺将军令吗？',
'脚气卡有没有人送一张？',
'兄弟们支个招，脚气卡怎么拿啊？',
'我趣今天开局被薄纱，狗卡真是蒸蒸日上。',
'最近出的这些祈福将怎么都这么阴间……',
'现在脑杀不太准了，还是得看实战。',
'这个新武将居然卖80史诗宝珠！',
'新武将卖80史诗宝珠，有没有搞错……',
'只要我活着就能让对面恐惧。',
'我们三个真的是太强辣！',
'家人们，我宣布个事儿。',
'可能有些人还不了解大宝的强度。',
'有没有人来玩三国杀规则怪谈？',
'藏珍阁'+get.cnNumber([1,2,3,4,5].randomGet())+'发抽到'+['神郭嘉','刘焉','徐盛','花蔓','神甘宁','马钧','界沮授','孙寒华'].randomGet()+'，厉不厉害你坤哥。',
'我趣，'+get.cnNumber([1,2,3,4,5].randomGet())+'发中'+['神郭嘉','刘焉','徐盛','花蔓','神甘宁','马钧','界沮授','孙寒华'].randomGet()+'，怎么说。',
'抽了几十发都没抽到'+['神郭嘉','刘焉','徐盛','花蔓','神甘宁','马钧','界沮授','孙寒华'].randomGet()+'，狗卡你害人不浅！',
'今天再抽不到'+['神郭嘉','刘焉','徐盛','花蔓','神甘宁','马钧','界沮授','孙寒华'].randomGet()+'我直接不睡觉！',
'抽中了'+['神郭嘉','刘焉','徐盛','花蔓','神甘宁','马钧','界沮授','孙寒华'].randomGet()+'，炫耀一下！',
'同心同德，救困扶危！',
'施仁布泽，乃我大汉立国之本。',
'哪位将军替我拿下此贼？',
'逆贼，哪里走？',
'大丈夫立于世，当义字当先。',
'过五关斩六将，皆小菜一碟。',
'龙威虎胆，斩敌破阵！',
'休想伤我一根汗毛！',
'弟兄们，准备动手。',
'伯符，且看我这一手。',
'哈哈，区区曹贼，不足惧哉。',
'愚者，永远只能看到表象。',
'旅途劳顿，请下马休整吧。',
'欺负女孩子算什么英雄好汉？',
'自古能者能谦逊克己。',
'燕雀安知鸿鹄之志？',
'大胆逆贼，谁可擒之？',
'还有哪个敢挑战我？',
'三个齐上也不是我的对手。',
'你我推心置腹，岂能相负？',
'大展宏图，就在今日！',
'一生纵横，怎可对他人称臣！',
'这是谁的部将，我爱死他了。',
'吾乃零陵上将军邢道荣！',
'什么？赵云冲我来了？',
'让我先捅他一万个透明窟窿。',
'盟主，是我的大哥的；副盟主，俺二哥的；俺张飞嘛，就做个先锋将军！',
'更衣？更衣好，更衣好啊。',
'奉先何在？奉先何在！',
'我打了一辈子杖，就不能享受享受吗？',
'接着奏乐，接着舞。',
'你拾它作甚，明天他喝醉了酒，还会到这里来撒野的！',
'主公喜欢女人啊，主公喜欢的女人，跟你喜欢的女人他根本就不一样。',
'哈哈哈哈哈哈，有我的大刀和宝雕弓，管叫他一千个来，一千个死。',
'曹贼！奸贼！恶贼！逆贼！',
'即使是这样，我也不惧他。众将听令，全军冲杀蜀军阵营，直奔诸葛亮四轮车！',
'什么？诸葛亮没死，快快撤军，快快撤军。',
'我的大斧早就饥渴难耐了。',
'我部悍将刘三刀，三刀之内，必斩吕布于马下！',
'说出吾名，吓汝一跳。我乃零陵上将，邢道荣！',
'快！把王司徒给我抢回来，退兵，退兵！',
'什么，荆州丢了？这是谎言，谎言。',
'我堂堂吕布，为何就成了三姓家奴。',
                                             ];
                                             let PlayerName;
                                             if(window.playerNickName&&window.playerNickName['all']) {
                                                 PlayerName = window.playerNickName['all'];
                                             }else {
                                                 PlayerName = ['女宝(rbq)', '夕酱', '戴夫', 'EngJ.K', '文姬', '黄小花', '风回太初', '萝卜', '无中', '太白', '洛神', '路卡', '幸运女神','朝夕盼兮','地老天荒你会信嘛','貌美如花红烧肉','心伤','旧梦残颜','绣花男神','君惜沂瑾','一人一心一空城','泽畔东篱','故事裏沒我','故莋颩蕥','tia紫竹情','月光爱人','一次不忠终生不用','向日葵的执着','寡欢ペ','宅','願時光待妳安好','梦里梦惊梦','姌冰','跋千山','门庭若市的街角','向日葵的执着','对她痴','籹子請蒥荹','顾瑶韵','水晶之音','ｂａｂｙ☆娃','江微雨','泪湿罗衣','半身死灵','純情ベ小骚包','妖精的绣舞','遗失的白狐','星星熄灯了','我打江南走过','一瞬间缝补的情','老巷钟声','孤己','青瓷埋骨灰骨','雾中熊','王的羁绊','风有归','扶苏','折梅千山','优雅的小猪','嫑忈','闲云池中敛','芷舞影裳','三寸海屿日光','语风','狂扁特点','当里个当','滴不尽相思','菟子','在苦也不哭','岛川奈','灬 始终隐身','补天裂','情感导师','陪我笑陪我闹','落日下的温柔','复仇之王','如烟长廊','骷髅','伴我暖','芥末盖泪','酒肆饮几壶','遲暮、花未央','重逢','半夜成仙','纸鸢','痴爱','忆暖','曲终散','清酒孤欢','浅笑伤无痕','花落╮君离开','转让半張床','丶陌尕鬼','国下着雪ゃ','゛夜已渐冷','寂寞如风','至死都卖萌','户川柰子','明白了就放弃吧','随风而去','十夏九黎那么凉','對你的依賴','牧野留姬','上纲上线','醉话酒烈','蜜棕马尾','月野兔','馨彤','凉己未安','語無い倫次づ','旧城凉','我他妈兔了','临风纵欢','闲揽烟雨','窗边的豆豆豆','忆往昔惜流年','仙狸','奶兔大魔王','汐へ萌','低吟归去兮','吃德芙没黑丝带','感到悲伤','桀骜不驯','昨日恋人','晚安我爱的他','心心相随','随疯奔跑','牌去人安乐','风吹蛋蛋凉','守护大吴疆土','凉企蒸蒸日上','你有点极端了','我是麻花疼','有没有搞错','豹子头零充'];
                                             }
                                             var chatsay='（暂无新的消息）';
                                             var getNow=function(sec) {
                                                 var now = new Date(),
                                                 y = now.getFullYear(),
                                                 month = now.getMonth(),
                                                 d = now.getDate(),
                                                 h = now.getHours(),
                                                 m = now.getMinutes(),
                                                 s = now.getSeconds();
                                                 if(sec) {
                                                     if(sec>s) {
                                                         m--;
                                                         s=60-sec;
                                                         if(m<10) m='0'+m.toString();
                                                     }else {
                                                         s-=sec;
                                                     }
                                                     if(s<10) s='0'+s.toString();
                                                 }
                                                 return (y + "-" + (month + 1) + "-" + d + " " + h + ":" + m + ":" + s);
                                             }
                                             if(!game.waitChat||game.waitChat=='off') {
                                                var sec=0;
                                                if(!game.waitChat) {
                                                    sec=Math.floor(5*Math.random());
                                                }else if(game.waitChatTime){
                                                    sec=game.waitChatTime;
                                                }
                                                if(Math.random()<0.75||game.waitChat=='off') {
                                                   var chatsay='';
                                                   chatsay=chatsay+'「'+getNow(sec)+'」\n';
                                                   chatsay=chatsay+'   ◈'+PlayerName.randomGet()+'：'+chatLog.randomGet();
                                                   
                                                }
                                                //var waitTime=[0.2,0.2,0.2,0.2,0.5,0.5,1,1,1,2,3,4,5,7,10,15,20,25,30,40,60,90,120,150,180,300].randomGet();
                                                var waitTime=[0.1,0.2,0.5,1,1.5,2,2.5,3,4,5,6,7,8,9,10,11,12,13,14,15,17,20,25,30,40,60].randomGet();
                                                game.waitChatTime=Math.floor(waitTime*Math.random());
                                                //chatsay=chatsay+waitTime;
                                                setTimeout(function(){
                                                    game.waitChat='off';
                                                },waitTime*1000);
                                                game.waitChat='on';
                                             }
                                                window.tipsClick('Menu');//已读
                                                navigator.notification.confirm(
									    			chatsay,
										    		function(index){
										    		window.tipsClick('Menu');//已读
										    		},
										    		'聊天大厅',
								    				['已读']
								    			);
								    			break;

                                            default:
                                             //   console.log(event.target.name)
                                        }
                                    }

                                    function onButtonDown(event) {
                                        var sprite = event.target;
                                        window.currentSprite = event.target;
                                        var scalex = sprite.scale.x;
                                        var scaley = sprite.scale.y;
                                        switch (sprite.name) {
                                            case "mode1":
                                            case "mode2":
                                            case "mode3":
                                            case "mode4":
                                                /*¥PIXI.sound.play¥*/window.tipsClick('PopUp')
                                                if (sprite.isOndown != true) {
                                                    sprite.isOndown = true;
                                                    gsap.to(sprite.scale, {
                                                        duration: 0.15,
                                                        x: 0.8 * scalex,
                                                        y: 0.8 * scaley,
                                                        ease: "power2.inOut",
                                                        onComplete: () => {
                                                            // 使用 gsap 库创建 Tween 对象，将精灵恢复到原始大小
                                                            gsap.to(sprite.scale, {
                                                                duration: 0.15,
                                                                x: scalex,
                                                                y: scaley,
                                                                ease: "power2.inOut",
                                                                onComplete: () => {
                                                                    sprite.isOndown = false;
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                                break;
                                            case 'uactive1':
                                                /*¥PIXI.sound.play¥*/window.tipsClick('PopUp')
                                                break;
                                                //	case "spinekz":						
                                                //	break;
                                            default:
                                                /*¥PIXI.sound.play¥*/window.tipsClick('Label')
                                                sprite.filters = [brightnessFilter];
                                                // 使用 gsap 库创建 Tween 对象，使亮度调整滤镜在一定时间内慢慢增加到 4
                                                gsap.to(brightnessFilter, {
                                                    duration: 0.5,
                                                    ease: "power2.inOut",
                                                    gamma: 3,
                                                    onUpdate: () => {
                                                        sprite.filters = [brightnessFilter];
                                                    },
                                                    onComplete: () => {
                                                        sprite.filters = null;
                                                    }
                                                });
                                        }
                                    }

                                    //ui主纹理
                                    const spritesheet = yloader.resources.spritesui.textures;
                                    //灯的静纹理
                                    const lightsheet = yloader.resources.uilight.textures;
                                    //灯的动纹理
                                    const lightanimations = yloader.resources.uilight.data.animations;
                                    //vip
                                    const vipsprite = yloader.resources.uivip.textures;
                                    //藏珍阁
                                    const czgsprite = yloader.resources.uiczg.data.animations;
                                    //创建函数，输入一个名字，自动在纹理集里检索对应名字，然后赋名，然后输出
                                    //这是ui里不可交互元素
                                    function rzshcreate(name) {
                                        const sprite = new PIXI.Sprite(spritesheet[name]);
                                        sprite.name = name;
                                        return sprite;
                                    }
                                    //这是ui可交互元素
                                    function rzshcreatex(name) {
                                        const sprite = new PIXI.Sprite(spritesheet[name]);
                                        sprite.name = name;
                                        sprite.interactive = true;
                                        sprite.on('pointerdown', onButtonDown);
                                        sprite.on('pointerup', onButtonUp);
                                        return sprite;
                                    }
                                    //从vip包里拿东西
                                    function vipcreat(name) {
                                        const sprite = new PIXI.Sprite(vipsprite[name]);
                                        sprite.name = name;
                                        sprite.interactive = true;
                                        //因为显示错误，暂时注释掉
                                        //sprite.on('pointerdown', onButtonDown);
                                        //sprite.on('pointerup', onButtonUp);
                                        return sprite;
                                    }
                                    //这是灯里的可交互
                                    function lightcreat1(name) {
                                        const sprite = new PIXI.Sprite(lightsheet[name]);
                                        sprite.name = name;
                                        sprite.interactive = true;
                                        sprite.on('pointerdown', onButtonDown);
                                        sprite.on('pointerup', onButtonUp);
                                        return sprite;
                                    }
                                    //这是灯的动态交互
                                    function lightcreat2(name) {
                                        const fromFrames = new PIXI.AnimatedSprite.fromFrames(lightanimations[name])
                                        fromFrames.name = name;
                                        fromFrames.interactive = true;
                                        fromFrames.animationSpeed = 1;
                                        fromFrames.play();
                                        fromFrames.on('pointerdown', onButtonDown);
                                        fromFrames.on('pointerup', onButtonUp);
                                        return fromFrames;
                                    }
                                    //从藏珍阁里拿东西
                                    function czgcreat(name) {
                                        const fromFrames = new PIXI.AnimatedSprite.fromFrames(czgsprite[name])
                                        fromFrames.name = name;
                                        fromFrames.interactive = true;
                                        fromFrames.animationSpeed = 0.5;
                                        fromFrames.play();
                                        fromFrames.on('pointerdown', onButtonDown);
                                        fromFrames.on('pointerup', onButtonUp);
                                        return fromFrames;
                                    }
                                    yloader.add('modesecb', lib.assetURL + 'extension/如真似幻/images/mode.json');
                                    yloader.add('spinekss', lib.assetURL + 'extension/如真似幻/spine/kaizhan.skel');
                                    yloader.load(() => {
                                        //mode里的点击事件
                                        function onButtonUp(event) {
                                            event.target.alpha = 1;
                                            switch (event.target.name) {
                                                case "spinekz":
                                                    //删删前面的
                                                    if (lib.config.zhuanzhuan !='off' && (lib.config.mode == 'doudizhu' || lib.config.mode == 'identity' || lib.config.mode == 'guozhan')) eee();
                                                    else rzshkz();
                                                    break;
                                                default:
                                                    //	console.log(event.target.name);
                                            }
                                        }
                                        let modestexture = yloader.resources.modesecb.textures;

                                        function modecreate(name) {
                                            const sprite = new PIXI.Sprite(modestexture[name]);
                                            sprite.name = name;
                                            return sprite;
                                        }
                                        //这是模式可交互元素
                                        function modecreatex(name) {
                                            const sprite = new PIXI.Sprite(modestexture[name]);
                                            sprite.name = name;
                                            sprite.interactive = true;
                                            //sprite.on('pointerdown', onButtonDown);
                                            sprite.on('pointerup', onButtonUp);
                                            sprite.on('pointerdown', onButtonDown);
                                            return sprite;
                                        }
                                        //透明框背景
                                        const modesecbg = modecreate('modesecbg');
                                        uiinit(modesecbg);
                                        modehome.addChild(modesecbg);
                                        modehome.setChildIndex(modesecbg, 0);
                                        //mode后面大图，可切换成不同的图  
                                        uiinit(mode1bbg);
                                        modehome.addChild(mode1bbg);
                                        //模式下面的墨迹    
                                        const modetta = modecreate('modettb');
                                        uiinit(modetta);
                                        modehome.addChild(modetta);
                                        //这个地方是经典场和斗地主切换    
                                        uiinit(mode1tt);
                                        modehome.addChild(mode1tt);
                                        //三个选项按钮    
                                        modehome.addChild(modesecoff1, modesecoff2, modesecoff3);
                                        //问好按钮，    
                                        const whelp = modecreate('whelp');
                                        uiinit(whelp);
                                        modehome.addChild(whelp);
                                        //这是可切换的游戏模式，5人，8人，国战，切成斗地主就是休闲，欢乐，兵临    
                                        uiinit(secmode1);
                                        uiinit(secmode2);
                                        uiinit(secmode3);
                                        modehome.addChild(secmode1, secmode2, secmode3);
                                        //左上角模式信息
                                        modehome.addChild(secmodeinfo);
                                        //右上角关闭按钮    
                                        const rzclose = rzshcreate('rzclose');
                                        uiinit(rzclose, true);
                                        var scax=0.57;
                                        rzclose.scale.set(scax, scax*(0.805/0.815));//新增
                                        rzclose.y = rzclose.height*0.5;
                                        rzclose.x = pixiapp.screen.width - rzclose.width*0.5 + 7;// * rzclose.scale.x
                                        //rzclose.scale.set(0.815, 0.805);
                                        //rzclose.position.set(1027, 48);
                                        modehome.addChild(rzclose);
                                        //开战骨骼    
                                        spineks = new PIXI.spine.Spine(yloader.resources.spinekss.spineData);
                                        //				   	let animations = spineks.stateData.skeletonData.animations;

                                        // 遍历动作列表，打印每个动作的名称
                                        //  for (let i = 0; i < animations.length; i++) {
                                        //   console.log(animations[i].name);
                                        //  }
                                        spineks.name = 'spinekz';
                                        spineks.interactive = true;
                                        spineks.on('pointerup', onButtonUp);
                                        spineks.on('pointerdown', onButtonDown);
                                        modehome.addChild(spineks);
                                        spineks.x = 820 * ppw;
                                        spineks.y = 260 * pph;
                                        spineks.scale.set(0.7 * pps);
                                    })
                                    //按下面的格式创建所有的ui界面元素
                                    //左边边框直接放进主容器里
                                    const leftlong = rzshcreate('leftlong');
                                    uiinit(leftlong);
                                    uihomeleft.addChild(leftlong);
                                    uihomeleft.setChildIndex(leftlong, 0)
                                    //下面是上幕布的元素 
                                    //官阶和灯的带子
                                    const guan = rzshcreate('guan');
                                    uiinit(guan);
                                    //头像框，这是可点击的
                                    const avatar = rzshcreatex('avatar');
                                    uiinit(avatar);
                                    uihometop.addChild(guan, avatar);
                                    //名字
                                    const rzshuname = new PIXI.Text(lib.config.connect_nickname);
                                    // 设置字体、字号和颜色，字体不生效，因为字体载入太慢
                                    rzshuname.style.fontFamily = 'shousha';
                                    rzshuname.style.fontSize = 16;
                                    rzshuname.position.set(170 * ppw, 3 * pph);
                                    rzshuname.style.fill = '#C0C0C0';
                                    //等级
                                    const rzshlv = new PIXI.Text('Lv220');
                                    rzshlv.style.fontFamily = 'shousha';
                                    rzshlv.style.fontSize = 14;
                                    rzshlv.position.set(247 * ppw, 0.5 * pph);
                                    rzshlv.style.fill = '#DAA520';
                                    uihometop.addChild(rzshuname, rzshlv)
                                    //灯，全是可点击的
                                    const lightarr = ['biao', 'fen', 'lin', 'huo', 'shan', 'yin', 'lei', 'shen', 'phone', 'linju', 'guo', 'yijiang', 'erjiang', 'sanjiang', 'sijiang', 'wujiang', 'liujiang', 'qijiang', 'sp', 'zhi', 'xin', 'ren', 'yon', 'yan'];
                                    const lightstop = ['yin', 'lei', 'shen', 'phone', 'linju', 'wujiang', 'liujiang', 'qijiang']
                                    for (let i = 0; i < lightarr.length; i++) {
                                        const name = lightarr[i];;
                                        var light;
                                        var j, k;
                                        if (i <= 15) {
                                            j = 224 + 24 * i;
                                            k = 50;
                                        } else {
                                            j = 24 * i - 160;
                                            k = 73;
                                        }
                                        if (!lightstop.includes(name)) {
                                            light = lightcreat2(name);
                                            uiinit2(light);
                                            light.x = ppw * j;
                                            light.y = pph * k;
                                            uihometop.addChild(light);
                                        } else {
                                            light = lightcreat1(name)
                                            uiinit2(light);
                                            light.x = ppw * j;
                                            light.y = pph * k;
                                            uihometop.addChild(light);
                                        }
                                    }
                                    //这是小人，不可点击      
                                    const player_nan = rzshcreate('player_nan');
                                    uiinit(player_nan);
                                    //这是升级图标，可交互
                                    const lvlup = rzshcreatex('lvlup');
                                    uiinit(lvlup);
                                    //这是官阶图标，可交互
                                    const guanico = rzshcreatex('大元帅');
                                    uiinit(guanico);
                                    //下面是vip和元宝可交互    
                                    const vipbg1 = rzshcreatex('vipbg1');
                                    uiinit(vipbg1);
                                    const vip_v7 = vipcreat('vip_v7');
                                    vip_v7.x = 416.6 * ppw;
                                    vip_v7.y = 5.2 * pph;
                                    vip_v7.scale.set(0.47 * pps);
                                    const vipbg2 = rzshcreatex('vipbg2');
                                    uiinit(vipbg2);
                                    //元宝数   
                                    const vipmoney = new PIXI.Text('20000');
                                    // 设置字体、字号和颜色，字体不生效，因为字体载入太慢
                                    vipmoney.style.fontFamily = 'shousha';
                                    vipmoney.style.fontSize = 20;;
                                    vipmoney.position.set(595 * ppw, 7.5 * pph);
                                    vipmoney.style.fill = '#C0C0C0';
                                    uihometop.addChild(player_nan, lvlup, guanico, vipbg1, vip_v7, vipbg2, vipmoney);
                                    //下面是右边的4个底圈，不可交互        
                                    for (let i = 0; i <= 3; i++) {
                                        const rightbg = rzshcreate('rightbg');
                                        uiinit(rightbg);
                                        rightbg.x = rightbg.x + (i * 64) * ppw;
                                        uihometop.addChild(rightbg);
                                    }
                                    //这是右上角的四个图，可交互
                                    const right1 = rzshcreatex('right2');
                                    uiinit(right1);
                                    uihometop.addChild(right1);
                                    const right2 = rzshcreatex('right3');
                                    uiinit(right2);
                                    uihometop.addChild(right2);
                                    const right4 = rzshcreatex('right44');
                                    uiinit(right4);
                                    uihometop.addChild(right4);
                                    const yukasaoguang = czgcreat('yukasaoguang');
                                    uiinit(yukasaoguang);
                                    yukasaoguang.animationSpeed = 0.3;
                                    uihometop.addChild(yukasaoguang);
                                    if(!lib.config.rzLock_nod) [right1,right2,right4,yukasaoguang].forEach(node=>node.alpha=0.6);
                                    //上边预留玩家姓名，灯，vip等级，玩家头像，玩家等级，元宝数量
                                    //左边四个图标，可交互
                                    const left1 = rzshcreatex('left1');
                                    uiinit(left1);
                                    const left2 = rzshcreatex('left2');
                                    uiinit(left2);
                                    const left3 = rzshcreatex('left3');
                                    uiinit(left3);
                                    const left4 = rzshcreatex('left4');
                                    uiinit(left4);
                                    uihomeleft.addChild(left1, left2, left3, left4);
                                    //中间的mode区，可交互         
                                    const mode1 = rzshcreatex('mode1');
                                    uiinit(mode1);
                                    const mode2 = rzshcreatex('mode2');
                                    uiinit(mode2);
                                    const mode3 = rzshcreatex('mode3');
                                    uiinit(mode3);
                                    const mode4 = rzshcreatex('mode4');
                                    uiinit(mode4);
                                    uihomecenter.addChild(mode1, mode2, mode3, mode4, mode4);
                                    uihomecenter.on('added', () => {
                                        //uihome.addChild(uihomecenter);
                                        flyIn(mode1, 0.4);
                                        flyIn(mode2, 0.4);
                                        flyIn(mode3, 0.4);
                                        flyIn(mode4, 0.5);
                                    })

                                    //右边活动区
                                    const ro2 = rzshcreatex('ro2');
                                    uiinit(ro2);
                                    if(!lib.config.rzLock_nod) [ro2].forEach(node=>node.alpha=0.85);
                                    const rightacbg = rzshcreatex('rightacbg');
                                    uiinit(rightacbg);
                                    //活动图片    
                                    const riactexture = yloader.resources.rightact.texture;
                                    const riactive = new PIXI.Sprite(riactexture);
                                    riactive.name = 'riactive';
                                    uiinit(riactive);
                                    const czg = czgcreat('czg');
                                    uiinit(czg);
                                    uihomeright.addChild(ro2, rightacbg, riactive, czg);
                                    //留活动图片和藏珍阁接口 
                                    //下边
                                    const say = rzshcreatex('say');
                                    uiinit(say);
                                    /*"say": {
                                    "x": 45,
                                    "y": 0.5,
                                    "scale": 1.15
                                    },*/
                                    say.position.x=46;
                                    say.scale.set(1.17, 1.15);
                                    //活动框，不能交互         
                                    const actbk = rzshcreate('actbk');
                                    uiinit(actbk);
                                    const uactive1 = rzshcreatex('uactive1');
                                    uiinit(uactive1);
                                    const actak = rzshcreate('actak');
                                    uiinit(actak);
                                    uihomeunder.addChild(say, actbk, uactive1, actak);
                                    //活动场和斗地主，可以交互 
                                    const activeea = rzshcreatex('activeea');
                                    uiinit(activeea);
                                    uihomeunder.addChild(activeea);
                                    for (let i = 0; i <= 5; i++) {
                                        const rightbg = rzshcreate('rightbg');
                                        uiinit(rightbg);
                                        //rightbg.x = rightbg.x + (i * 78 - 284.5) * ppw;
                                        rightbg.x = rightbg.x + (i * 78.3 - 284.5) * ppw;
                                        rightbg.y = 7.5 * pph;
                                        //rightbg.scale.set(0.64 * pps)
                                        rightbg.scale.set(0.65 * Math.max(ppw,pph));
                                        uihomeunder.addChild(rightbg);
                                    }
                                    //下边6个按钮，可交互     
                                    const under1 = rzshcreatex('under1');
                                    uiinit(under1);
                                    const shop = czgcreat('shop');
                                    uiinit(shop);
                                    shop.animationSpeed = 0.3;
                                    const under3 = rzshcreatex('under3');
                                    uiinit(under3);
                                    const under4 = rzshcreatex('under4');
                                    uiinit(under4);
                                    const under5 = rzshcreatex('under5');
                                    uiinit(under5);
                                    const under6 = rzshcreatex('under6');
                                    uiinit(under6);
                                    if(!lib.config.rzLock_nod) [under1,shop,under3,under4,under5].forEach(node=>node.alpha=0.6);
                                    //右下角的十字按键
                                    const menu1 = rzshcreate('menu1')
                                    uiinit(menu1, true);
                                    menu1.x = pixiapp.screen.width - menu1.width / 4;
                                    /*"menu1": {
                                    "x": 1059,
                                    "y": 0.5,
                                    "scale": 0.7
                                    },*/
                                    menu1.scale.set(0.72, 0.7);
                                    uihomeunder.addChild(under1, shop, under3, under4, under5, under6, menu1);
                                    //将主ui加到舞台上显示 //关闭加载界面
                                    var shorttime=1200;
                                    if(!sessionStorage.getItem('longSpineLoad2')) {
                                        sessionStorage.setItem('longSpineLoad2',true);
                                        shorttime=2000;
                                    }
                                    setTimeout(function() {
                                        if(window.sanguoTipClose) window.sanguoTipClose();
                                        opeen(uihome);
                                        if(lib.config.rzEpicSpine) {
                                            try {
                                                uibg.texture = xloader.resources.uiBG.texture;//萌新修改
                                                //if(uibg.playVideoTheme) uibg.playVideoTheme();
                                            } catch (err) {}
                                        }
                                        try {
                                            if(uibg.playVideoTheme) uibg.playVideoTheme();
                                            spinelo.destroy();
                                        } catch (err) {}
                                    }, shorttime);//1500
                                    zloader.load(setupz)
                                }
                                //排位房间主体,左右两个盒子用来放龙头和按钮
                                const paiweihome = new PIXI.Container();
                                const paiweihomeleft = new PIXI.Container();
                                const paiweihomeright = new PIXI.Container();
                                paiweihome.width = pixiapp.screen.width;
                                paiweihome.height = pixiapp.screen.height;
                                paiweihomeleft.width = 0.3 * pixiapp.screen.width;
                                paiweihomeleft.x = 0.1 * pixiapp.screen.width;
                                paiweihomeleft.height = pixiapp.screen.height;
                                paiweihomeright.width = 0.3 * pixiapp.screen.width;
                                paiweihomeright.height = pixiapp.screen.height;
                                paiweihomeright.x = 0.6 * pixiapp.screen.width;
                                const paiweihometop = new PIXI.Container();
                                paiweihometop.width = 0.4 * pixiapp.screen.width;
                                paiweihometop.height = 0.3 * pixiapp.screen.height;
                                paiweihome.addChild(paiweihometop, paiweihomeleft, paiweihomeright)
                                //排位
                                function paiweicreate(name) {
                                    const sprite = new PIXI.Sprite(zloader.resources.paiweiui.textures[name]);
                                    //sprite.scale.x=sprite.scale.y;
                                    sprite.name = name;
                                    return sprite;
                                }
                                //龙头
                                function paiweicreatey(name) {
                                    let fromFrames = new PIXI.AnimatedSprite.fromFrames(zloader.resources.paiweiui.data.animations[name])
                                    //fromFrames.scale.x=fromFrames.scale.y;
                                    fromFrames.name = name;
                                    fromFrames.anchor.set(0.5);
                                    fromFrames.animationSpeed = 0.3;
                                    fromFrames.play();
                                    return fromFrames;
                                }
                                //菜单
                                const menuhome = new PIXI.Container();
                                menuhome.width = pixiapp.screen.width;
                                menuhome.height = pixiapp.screen.height;
                                const menuhomeunder = new PIXI.Container();
                                menuhomeunder.width = pixiapp.screen.width;
                                menuhomeunder.height = pixiapp.screen.height;
                                //遮罩防止影响下面
                                let menu_hitArea = new PIXI.Graphics();
                                menu_hitArea.beginFill(0x000000, 0.8);
                                menu_hitArea.drawRect(0, 0, pixiapp.renderer.screen.width, pixiapp.renderer.screen.height);
                                menu_hitArea.endFill();
                                menu_hitArea.interactive = true;
                                menuhome.addChild(menu_hitArea, menuhomeunder);

                                function menucreate(name) {
                                    const sprite = new PIXI.Sprite(zloader.resources.menubtn.textures[name]);
                                    sprite.name = name;
                                    return sprite;
                                }
                                menuhome.on("added", () => {
                                    if(lib.config.rzEpicSpine) {
                                        pixiapp.stage.setChildIndex(spinelo2, 2);//萌新修改
                                    }
                                    gsap.fromTo( //上面抽屉
                                    menuhomeunder, {
                                        y: pixiapp.screen.height + menuhomeunder.height
                                    }, {
                                        duration: 0.5,
                                        y: 0,
                                        ease: "power4.out"
                                    });
                                })
                                if(lib.config.rzEpicSpine) {
                                    menuhome.on("removed", () => {
                                        pixiapp.stage.setChildIndex(spinelo2, 3);//萌新修改
                                    })//萌新修改
                                }
                                //设置菜单场景
                                let settinghome = new PIXI.Container();
                                settinghome.width = pixiapp.screen.width;
                                settinghome.height = pixiapp.screen.height;
                                //带框的图层
                                let settingbg = new PIXI.Container();
                                settingbg.width = pixiapp.screen.width;
                                settingbg.height = pixiapp.screen.height;
                                //菜单底罩，点击时收起菜单
                                let setting_hitArea = new PIXI.Graphics();
                                setting_hitArea.beginFill(0x000000, 0.5);
                                setting_hitArea.drawRect(0, 0, pixiapp.renderer.screen.width, pixiapp.renderer.screen.height);
                                setting_hitArea.endFill();
                                setting_hitArea.interactive = true;
                                setting_hitArea.on('pointerup', () => {
                                    uihome.removeChild(settinghome)
                                })
                                settinghome.addChild(setting_hitArea, settingbg);
                                settinghome.on('added', () => {
                                    let set_dialog = settingbg.getChildByName('set_dialog');
                                    set_dialog.getChildByName('setab1')
                                        .texture = zloader.resources.setting.textures['set_tab_choose'];
                                    set_dialog.getChildByName('setab2')
                                        .texture = zloader.resources.setting.textures['set_tab'];
                                    /*set_dialog.getChildByName('setab3')
                                        .texture = zloader.resources.setting.textures['set_tab'];*/
                                    set_dialog.removeChild(settingright2);
                                    set_dialog.removeChild(settingright3);
                                    set_dialog.addChild(settingright1);
                                });
                                //下面是3个设置选项的右侧具体选项框；
                                let settingright1 = new PIXI.Container();
                                let settingright2 = new PIXI.Container();
                                let settingright3 = new PIXI.Container();
                                //z加载器加载排位,身份，斗地主和十字键的图片数据
                                const zloader = new PIXI.Loader();
                                if(lib.config.rszh_ideimg) {
                                    if(lib.config.rszh_ideimg=='随机背景.ran') {
                                        if(lib.config.rzsh_bgranlist&&lib.config.rzsh_bgranlist.length) {
                                            var ideimg=lib.config.rzsh_bgranlist.randomGet();
                                        }else {
                                            var ideimg='君临天下.png';
                                        }
                                    }else {
                                        var ideimg=lib.config.rszh_ideimg;
                                    }
                                }else {
                                    var ideimg='君临天下.png';
                                }
                                window.rz_ideimg=ideimg;
                                const assetListz = [{
                                    name: 'menubtn',
                                    path: 'extension/如真似幻/images/menu.json'
                                }, {
                                    name: 'paiweiui',
                                    path: 'extension/如真似幻/images/jj.json'
                                }, {
                                    name: 'shenfen',
                                    path: 'extension/如真似幻/images/modeb/identity/'+ideimg
                                }, {
                                    name: 'doudizhu',
                                    path: 'extension/如真似幻/images/modeb/mode2.png'
                                }, {
                                    name: 'setting',
                                    path: 'extension/如真似幻/images/setting.json'
                                }, {
                                    name: 'VCD',
                                    path: 'extension/如真似幻/audio/vcd.png'
                                }, ];
                                assetListz.forEach(asset => {
                                    zloader.add(asset.name, lib.assetURL + asset.path);
                                });
                                rzshmusicpack.forEach(item => {
                                    zloader.add(item, lib.assetURL + 'extension/如真似幻/audio/music/' + item + '/bg.png')
                                })

                                function setupz() {
                                    console.timeEnd('Z加载完毕')
                                    game.isUnlockDialogDo('z');
                                    //左边花纹，飘带，圈，龙头，星星，段位文字，巅峰赛，赛季等								
                                    let jj_tittle = paiweicreate('jj_tittle');
                                    uiinit(jj_tittle);
                                    let publicui_title_bg = paiweicreate('publicui_title_bg');
                                    uiinit(publicui_title_bg);
                                    let s0 = paiweicreate('s0');
                                    paiweihometop.addChild(publicui_title_bg, jj_tittle, s0)
                                    uiinit(s0);
                                    let randomsaiji = Math.floor(Math.random() * 13);
                                    s0.texture = zloader.resources.paiweiui.textures['s' + randomsaiji]
                                    let ttrankbg1 = paiweicreate('ttrankbg1');
                                    uiinit(ttrankbg1)
                                    let ttrankbg3 = paiweicreate('ttrankbg3');
                                    uiinit(ttrankbg3)
                                    let ttrankbg2 = paiweicreate('ttrankbg2');
                                    uiinit(ttrankbg2);
                                    paiweihomeleft.addChild(ttrankbg1, ttrankbg3, ttrankbg2);
                                    //这是龙头
                                    let jjpond = lib.config.tianti_versus_two.xxingnum;
                                    //if (lib.config.tianti_0星) jjpond++;
                                    jjpond++;
                                    let ttrank;
                                    if (jjpond < 7) {
                                        ttrank = paiweicreate('jj_grade_qingtong');
                                        uiinit(ttrank);
                                        paiweihomeleft.addChild(ttrank);
                                    } else if (jjpond < 19) {
                                        ttrank = paiweicreate('jj_grade_baiyin');
                                        uiinit(ttrank);
                                        paiweihomeleft.addChild(ttrank);
                                    } else if (jjpond < 44) {
                                        ttrank = paiweicreate('jj_grade_huangjin');
                                        uiinit(ttrank);
                                        paiweihomeleft.addChild(ttrank);
                                    } else if (jjpond < 69) {
                                        ttrank = paiweicreate('jj_grade_feicui');
                                        uiinit(ttrank);
                                        paiweihomeleft.addChild(ttrank);
                                    } else if (jjpond < 99) {
                                        ttrank = paiweicreate('jj_grade_dashi');
                                        uiinit(ttrank);
                                        paiweihomeleft.addChild(ttrank);
                                    } else if (jjpond >= 99)
                                    //传说
                                    {
                                        ttrank = paiweicreatey('ttrank');
                                        //自己加的
                                        ttrank.animationSpeed = 0.15;
                                        uiinit(ttrank);
                                        paiweihomeleft.addChild(ttrank);
                                    }
                                    //玩家段位
                                    let jjbond;
                                    jjbond = lib.config.tianti_versus_two.xxingnum; //星星数量
                                    let[rankduanname, rankduannum, rankduanlim, ranklevel] = window.helasisy_getPaiWeiInfo(jjbond);//getName_排位 (jjbond); //段位名称，当前星星，星星上限
                                    //if (lib.config.tianti_0星)[rankduanname, rankduannum, rankduanlim, ranklevel] = getName_排位 (jjbond + 1)
                                    //	console.log(rankduannum)
                                    let jj_rankgrade = new PIXI.Text(rankduanname);
                                    jj_rankgrade.style.fontFamily = 'shousha';
                                    jj_rankgrade.style.fontSize = 48;
                                    jj_rankgrade.anchor.set(0.5);
                                    jj_rankgrade.position.set(0, 155);
                                    jj_rankgrade.style.fill = '#DAA520';
                                    ttrankbg2.addChild(jj_rankgrade);
                                    //士气
                                    let load_progressbar = new PIXI.NineSlicePlane(zloader.resources.paiweiui.textures['load_progressbar'], 25, 30, 25, 30);
                                    load_progressbar.width = 280;
                                    load_progressbar.height = 35;
                                    load_progressbar.pivot.set(0.5);
                                    load_progressbar.position.set(-138, 210);
                                    ttrankbg2.addChild(load_progressbar);
                                    //条条
                                    let jj_morale = paiweicreate('jj_morale');

                                    jj_morale.width = lib.config.tianti_versus_two.count / lib.config.tianti_versus_two.top * 260;
                                    jj_morale.height = 23;
                                    jj_morale.position.set(10, 6);
                                    load_progressbar.addChild(jj_morale);
                                    //士气文字
                                    let jj_morale_text = new PIXI.Text(lib.config.tianti_versus_two.count + '/' + lib.config.tianti_versus_two.top);
                                    jj_morale_text.style.fontFamily = 'shousha';
                                    jj_morale_text.style.fontSize = 24;
                                    jj_morale_text.anchor.set(0.5);
                                    jj_morale_text.position.set(0, 225);
                                    jj_morale_text.style.fill = '#C0C0C0';
                                    ttrankbg2.addChild(jj_morale_text);
                                    if (lib.config.tianti_versus_two.top != 40 && lib.config.tianti_versus_two.top != 550) {
                                        let jj_protect_mark = paiweicreate('jj_protect_mark');
                                        jj_protect_mark.position.set(75 * ppw, 0);
                                        load_progressbar.addChild(jj_protect_mark)
                                    }

                                    //星星
                                    if (window.helasisy_getPaiWeiInfo('star')!=0) {//!lib.config.tianti_0星
                                        if (rankduanlim == 2) {
                                            for (let i = 0; i < rankduanlim; i++) {
                                                let jj_star1 = paiweicreate('jj_star_off');
                                                uiinit(jj_star1);
                                                jj_star1.x += i * 60 * ppw;
                                                if (i < rankduannum) jj_star1.texture = zloader.resources.paiweiui.textures['jj_star_on'];
                                                paiweihomeleft.addChild(jj_star1)
                                            }
                                        }
                                        if (rankduanlim == 4) {
                                            for (let i = 0; i < rankduanlim; i++) {
                                                let jj_star1 = paiweicreate('jj_star_off');
                                                uiinit(jj_star1);
                                                jj_star1.x += i * 60 * ppw - 60 * ppw;
                                                if (i < rankduannum) jj_star1.texture = zloader.resources.paiweiui.textures['jj_star_on'];
                                                paiweihomeleft.addChild(jj_star1)
                                            }
                                        }
                                        if (rankduanlim == 5) {
                                            for (let i = 0; i < rankduanlim; i++) {
                                                let jj_star1 = paiweicreate('jj_star_off');
                                                uiinit(jj_star1);
                                                jj_star1.x += i * 60 * ppw - 90 * ppw;
                                                if (i < rankduannum) jj_star1.texture = zloader.resources.paiweiui.textures['jj_star_on'];
                                                paiweihomeleft.addChild(jj_star1)
                                            }
                                        }
                                        if (rankduanlim > 5) { //传说是星x数字
                                            let jj_star1 = paiweicreate('jj_star_on');
                                            uiinit(jj_star1);
                                            jj_star1.position.x -= 10 * ppw;
                                            let xingxingxx = new PIXI.Text('x ' + rankduannum);
                                            xingxingxx.style.fontFamily = 'shousha';
                                            xingxingxx.style.fontSize = 48;
                                            xingxingxx.anchor.set(0.5);
                                            //xingxingxx.position.set(70 * ppw, -5 * pph);
                                            xingxingxx.position.set(90 * ppw, -5 * pph);
                                            xingxingxx.style.fill = '#DAA520';
                                            jj_star1.addChild(xingxingxx)
                                            paiweihomeleft.addChild(jj_star1)

                                        }
                                    } else {
                                        if (jjbond <= 5) { //青铜0星2上限
                                            for (let i = 0; i < 2; i++) {
                                                let jj_star1 = paiweicreate('jj_star_off');
                                                uiinit(jj_star1);
                                                jj_star1.x += i * 60 * ppw;
                                                paiweihomeleft.addChild(jj_star1)
                                            }
                                        } else if (jjbond <= 17) { //白银0星4上限
                                            for (let i = 0; i < 4; i++) {
                                                let jj_star1 = paiweicreate('jj_star_off');
                                                uiinit(jj_star1);
                                                jj_star1.x += i * 60 * ppw - 60 * ppw;
                                                paiweihomeleft.addChild(jj_star1)
                                            }

                                        } else if (jjbond < 98) {
                                            for (let i = 0; i < 5; i++) { //黄金翡翠大师5上限
                                                let jj_star1 = paiweicreate('jj_star_off');
                                                uiinit(jj_star1);
                                                jj_star1.x += i * 60 * ppw - 90 * ppw;
                                                paiweihomeleft.addChild(jj_star1)
                                            }

                                        } else if (jjbond >= 98) { //传说是数字0
                                            let jj_star1 = paiweicreate('jj_star_on');
                                            uiinit(jj_star1);
                                            jj_star1.position.x -= 10 * ppw;
                                            let xingxingxx = new PIXI.Text('x 0');
                                            xingxingxx.style.fontFamily = 'shousha';
                                            xingxingxx.style.fontSize = 48;
                                            xingxingxx.anchor.set(0.5);
                                            xingxingxx.position.set(70 * ppw, -5 * pph);
                                            xingxingxx.style.fill = '#DAA520';
                                            jj_star1.addChild(xingxingxx)
                                            paiweihomeleft.addChild(jj_star1)
                                        }
                                    }
                                    paiweihomeleft.y+=27*pph;

                                    //右边白框按钮，排位赛文字
                                    let tiantibg = paiweicreate('tiantibg');
                                    uiinit(tiantibg);
                                    let jj_dianfeng = paiweicreate('jj_dianfeng');
                                    uiinit(jj_dianfeng);
                                    let solobtn = paiweicreate('solobtn');
                                    uiinit(solobtn, true);
                                    let versustwobtn = paiweicreate('versustwobtn');
                                    uiinit(versustwobtn, true);
                                    let rzclosse = paiweicreate('back')
                                    rzclosse.name = 'rzclose';
                                    uiinit(rzclosse, true);
                                    rzclosse.scale.set(0.65);
                                    rzclosse.y = 35 * pph;
                                    rzclosse.scale.set(0.815, 0.805);
                                    //rzclosse.position.set(1027, 48);
                                    var rzcleft=pixiapp.screen.width-(rzclosse.width*0.5)+44;
                                    rzclosse.position.set(rzcleft, 48);
                                    paiweihomeright.addChild(tiantibg, jj_dianfeng, solobtn, versustwobtn);
                                    //调整了一下y坐标
                                    paiweihomeright.y+=35*pph;
                                    paiweihome.addChild(rzclosse);
                                    //var paiweitools=[tiantibg,jj_dianfeng,solobtn,versustwobtn];
                                    //paiweitools.forEach(node=>node.y+=30*pph);
                                    paiweihome.on('added', () => {
                                        if(lib.config.rzEpicSpine) {
                                            //萌新修改
                                            uibg.texture = xloader.resources.loadingbg.texture;
                                            if(window.uibg3Aready) pixiapp.stage.removeChild(spinelo2, uibg3);
                                            pixiapp.stage.removeChild(uihome);//文和修改
                                        }
                                        gsap.fromTo( //右边弹簧
                                        paiweihomeright, {
                                            y: -paiweihomeright.height - 100
                                        }, {
                                            duration: 0.7,
                                            y: paiweihomeright.y,
                                            ease: "elastic.out(1, 0.3)"
                                        });
                                        gsap.fromTo(ttrank.scale, {
                                            x: 0.1,
                                            y: 0.1
                                        }, {
                                            x: ttrank.scale.x,
                                            y: ttrank.scale.y,
                                            duration: 1,
                                            ease: "power4.out",
                                            onComplete: function() {
                                                window.isOnhide = false
                                            }
                                        }); //龙头缩放
                                        gsap.fromTo( //上面抽屉
                                        paiweihometop, {
                                            y: -paiweihometop.height - 100
                                        }, {
                                            duration: 0.5,
                                            y: 0,
                                            ease: "power4.out"
                                        });
                                    })
                                    //菜单背景
                                    let bigmenu = menucreate("bigmenu");
                                    uiinit(bigmenu);
                                    bigmenu.y = pixiapp.screen.height - bigmenu.height*0.5;
                                    menuhomeunder.addChild(bigmenu)
                                    //按钮
                                    const menubtnarr = ['menuyi1', 'menuyi2', 'menuyi3', 'menuyi4', 'menuyi5', 'menuyi6', 'menuer1', 'menusan1', 'menusan2', 'menusan3', 'menusan4', 'menusi1', 'menusi2', 'menusi3', 'menusi4', 'menusi5', 'menusi6', 'menuwu1', 'menuwu2', 'menuwu3']
                                    const menuable = ['menuyi5','menuyi6','menusan4','menusi5','menusi6','menuwu3'];
                                    for (let i = 0; i < menubtnarr.length; i++) {
                                        let name = menubtnarr[i];
                                        let menubtn = menucreate(name);
                                        uiinit(menubtn, true);
                                        menubtn.scale.set(0.75 * pps);
                                        if(!menuable.contains(name)&&!lib.config.rzLock_nod) menubtn.alpha=0.5;
                                        //红点
                                        if (lib.config.red_point) {
                                            if (Math.random() < 0.1) {
                                                let sprite = setcreate('redPoint');
                                                sprite.x = menubtn.width / 1.2;
                                                sprite.y = -menubtn.height / 4;
                                                sprite.scale.set(pps, 0.8 * pps);
                                                menubtn.addChild(sprite);
                                            }
                                        }
                                        if (i < 6) {
                                            menubtn.x = (180 + i * 122) * ppw;
                                            menubtn.y = 110 * pph;
                                        } else if (i == 6) {
                                            menubtn.x = 180 * ppw;
                                            menubtn.y = 195 * pph;
                                        } else if (6 < i && i < 11) {
                                            menubtn.x = (180 + (i - 7) * 122) * ppw;
                                            menubtn.y = 280 * pph;
                                        } else if (11 <= i && i < 17) {
                                            menubtn.x = (180 + (i - 11) * 122) * ppw;
                                            menubtn.y = 365 * pph;
                                        } else if (17 <= i) {
                                            menubtn.x = (180 + (i - 17) * 122) * ppw;
                                            menubtn.y = 450 * pph;
                                        }
                                        menubtn.y = pixiapp.screen.height - (pixiapp.screen.height - menubtn.y)/(pph/ppw);
                                        //menubtn.y-=2;
                                        menubtn.x+=2*ppw;
                                        menuhomeunder.addChild(menubtn)
                                    }
                                    let pubbtn_close = menucreate("pubbtn_close");
                                    uiinit(pubbtn_close, true);
                                    /*"pubbtn_close": {
                                    "x": 1059,
                                    "y": 470,
                                    "scale": 0.7
                                    },*/
                                    pubbtn_close.scale.set(0.72, 0.7);
                                    pubbtn_close.position.set(1059*ppw, 468*pph);
                                    menuhomeunder.addChild(pubbtn_close);
                                    //设置方面
                                    //游戏：自动确认，无闪自动取消，拆顺手牌选择，不无懈自己，不对敌方出桃
                                    //背景音乐，
                                    //技能：自动发动：
                                    //游戏背景，随机背景按钮
                                    function setcreate(name) {
                                        const sprite = new PIXI.Sprite(zloader.resources.setting.textures[name]);
                                        sprite.name = name;
                                        return sprite;
                                    }

                                    function setcreatex(name) {
                                        const sprite = new PIXI.Sprite();
                                        sprite.interactive = true;
                                        //	sprite.on('pointerdown', onbuttonzd);
                                        sprite.on('pointerup', onbuttonzu);
                                        return sprite;
                                    }
                                    let set_dialog = setcreate('set_dialog')
                                    uiinit(set_dialog);
                                    set_dialog.interactive = true;
                                    set_dialog.scale.x = 2 * ppw;
                                    set_dialog.scale.y = 1.2 * pph;
                                    //微调x坐标
                                    set_dialog.x = (pixiapp.screen.width * 0.5);
                                    settingbg.addChild(set_dialog);
                                    // 获取纹理
                                    let settexture = zloader.resources.setting.textures['set_tab'];
                                    // 创建3个精灵
                                    let settings = ['setab1', 'setab2'/*, 'setab3'*/];
                                    let settingsr = ['setright1', 'setright1'/*, 'setright1'*/]
                                    for (let i = 0; i < settings.length; i++) {
                                        let sprite = new PIXI.Sprite(settexture);
                                        sprite.name = settings[i];
                                        uiinit(sprite, true)
                                        sprite.anchor.set(0.5);
                                        sprite.scale.set(0.4, 0.65);
                                        // 设置每个精灵的坐标
                                        //sprite.x = -175 * ppw;
                                        sprite.x = -180;
                                        sprite.y = i * 50 * pph - 110 * pph;
                                        // 添加文字标签
                                        let label = new PIXI.Text('', {
                                            fontSize: 32,
                                            fill: '#C0C0C0',
                                            fontFamily: 'shousha'
                                        });
                                        label.anchor.set(0.5);
                                        label.text = i === 0 ? '音乐' : i === 1 ? '游戏' : '背景';
                                        label.y = -8 * pph;
                                        sprite.addChild(label);
                                        set_dialog.addChild(sprite);
                                    };
                                    //下面开始摸具体设置
                                    //settingright1的设置，与音乐有关
                                    //将settingright1与set_dialog重合，三个页面与dialog想同
                                    settingright1.width = set_dialog.width;
                                    settingright1.height = set_dialog.height;
                                    settingright2.width = set_dialog.width;
                                    settingright2.height = set_dialog.height;
                                    settingright3.width = set_dialog.width;
                                    settingright3.height = set_dialog.height;
                                    settingright1.on('added', () => {
                                        innerSprite.texture = zloader.resources[rzshbgm].texture;
                                    })
                                    //碟片总圆
                                    let circleContainer = new PIXI.Container();
                                    circleContainer.scale.x = 0.6 * pph / ppw;
                                    circleContainer.interactive = true;
                                    let isSliding = false;
                                    let nextIndex;
                                    circleContainer.on('pointerdown', (event) => {
                                        circleContainer.startX = event.data.global.x;
                                        isSliding = true;
                                    });
                                    circleContainer.on('pointermove', (event) => {
                                        if (!isSliding) return;
                                        const distance = event.data.global.x - circleContainer.startX;
                                        if (distance > 0) {
                                            nextIndex = rzshmusicpack.indexOf(rzshbgm) + 1;
                                            if (nextIndex >= rzshmusicpack.length) {
                                                nextIndex = 0;
                                            }
                                        } else if (distance < 0) {
                                            nextIndex = rzshmusicpack.indexOf(rzshbgm) - 1;
                                            if (nextIndex < 0) {
                                                nextIndex = rzshmusicpack.length - 1;
                                            }
                                        }
                                    });
                                    circleContainer.on('pointerup', (event) => {
                                        let distance = event.data.global.x - circleContainer.startX;
                                        if (distance == 0) return;
                                        isSliding = false;
                                        rzshbgm = rzshmusicpack[nextIndex];
                                        game.saveConfig('rzshbgm', rzshbgm);
                                        // 切换纹理和文字
                                        innerSprite.texture = zloader.resources[rzshbgm].texture;
                                        bgmname.text = '《'+rzshbgm+'》';
                                        bgmname.scale.set(1.2,2);
                                        /*PIXI.sound.remove('outgame');
                                        PIXI.sound.add('outgame', {
                                            url: lib.assetURL + 'extension/如真似幻/audio/music/' + rzshbgm + '/outgame.mp3',
                                            loop: true
                                        })
                                        window.tipsClick('outgame');*/
                                        if(!ui.backgroundMusicRZ) {
                                            ui.backgroundMusicRZ=document.createElement('audio');
                                            //ui.backgroundMusicRZ.volume=(lib.config.volumn_background/8)*0.7+0.3*(lib.config.volumn_background>0?1:0);
				                            ui.backgroundMusicRZ.volume=lib.config.volumn_background/8;
				                            ui.backgroundMusicRZ.autoplay=true;
				                            ui.backgroundMusicRZ.addEventListener('ended',function(){
				                                if(window.nowRZbgm) ui.backgroundMusicRZ.src=window.nowRZbgm;
				                            });
                                        }
                                        ui.backgroundMusicRZ.src=lib.assetURL + 'extension/如真似幻/audio/music/' + rzshbgm + '/outgame.mp3';
                                        window.nowRZbgm=ui.backgroundMusicRZ.src;
                                    });
                                    let radius = 100 * pps;
                                    //外圆白底
                                    let outerMask = new PIXI.Graphics();
                                    outerMask.beginFill(0x000000);
                                    outerMask.drawCircle(0, 0, radius);
                                    outerMask.endFill();
                                    circleContainer.addChild(outerMask);
                                    //内圆黑底
                                    let innerMask = new PIXI.Graphics();
                                    innerMask.beginFill(0x000000);
                                    innerMask.drawCircle(0, 0, radius * 0.6); // 内圆半径为外圆半径的 0.6
                                    innerMask.endFill();
                                    circleContainer.addChild(innerMask);
                                    //内圆填充
                                    let innerTexture = zloader.resources[rzshbgm].texture;
                                    let innerSprite = new PIXI.Sprite(innerTexture);
                                    innerSprite.anchor.set(0.5);
                                    innerSprite.scale.set(0.2);
                                    gsap.to(innerSprite, {
                                        duration: 6,
                                        rotation: Math.PI * 2,
                                        repeat: -1,
                                        ease: "none"
                                    });
                                    //外圆填充
                                    let outerTexture = zloader.resources.VCD.texture;
                                    let outerSprite = new PIXI.Sprite(outerTexture);
                                    outerSprite.anchor.set(0.5);
                                    outerSprite.scale.set(0.35);
                                    gsap.to(outerSprite, {
                                        duration: 4,
                                        rotation: Math.PI * 2,
                                        repeat: -1,
                                        ease: "none"
                                    });
                                    circleContainer.addChild(outerSprite, innerSprite)
                                    innerSprite.mask = innerMask;
                                    outerSprite.mask = outerMask;
                                    settingright1.addChild(circleContainer);
                                    //音乐标题
                                    const bgmname = new PIXI.Text('《'+rzshbgm+'》');
                                    bgmname.style.fontFamily = 'shousha';
                                    bgmname.style.fontSize = 16;
                                    bgmname.style.fill = '#FFE4B5';
                                    bgmname.anchor.set(0.5);
                                    bgmname.y = -110 * pph;
                                    bgmname.scale.set(1.2,2);
                                    settingright1.addChild(bgmname);
                                    //至此，音乐部分完结	
                                    //游戏设置部分，下面都是大横条
                                    let auto_confirmbg = setcreate('set_mbg'); //自动确认
                                    auto_confirmbg.scale.set(0.35 * ppw, 0.75 * pph);//(0.35, 0.75);
                                    let auto_confirmtext = new PIXI.Text('自动确认');
                                    auto_confirmtext.style.fontFamily = 'shousha';
                                    auto_confirmtext.style.fontSize = 28;
                                    auto_confirmtext.position.set(25 * ppw, 9 * pph);//25 * ppw, 3 * pph
                                    auto_confirmtext.style.fill = '#FFE4B5';
                                    auto_confirmtext.scale.set(1,0.8);/*本没有*/
                                    let auto_confirmset = setcreatex('set_btnn_off'); //选择框
                                    auto_confirmset.position.set(220 * ppw, 8 * pph);
                                    auto_confirmset.scale.set(pps, 0.8 * pps);
                                    auto_confirmset.name = 'auto_confirm';
                                    auto_confirmbg.addChild(auto_confirmtext, auto_confirmset);
                                    let skip_shanbg = setcreate('set_mbg'); //无闪跳过
                                    skip_shanbg.x = 125 * ppw;
                                    skip_shanbg.scale.set(0.35 * ppw, 0.75 * pph);
                                    let skip_shantext = new PIXI.Text('无闪跳过');
                                    skip_shantext.style.fontFamily = 'shousha';
                                    skip_shantext.style.fontSize = 28;
                                    skip_shantext.position.set(25 * ppw, 9 * pph);//25 * ppw, 3 * pph
                                    skip_shantext.style.fill = '#FFE4B5';
                                    skip_shantext.scale.set(1,0.8);/*本没有*/
                                    let skip_shanset = setcreatex('set_btnn_off'); //选择框
                                    skip_shanset.position.set(220 * ppw, 8 * pph);
                                    skip_shanset.scale.set(pps, 0.8 * pps);
                                    skip_shanset.name = 'skip_shan';
                                    skip_shanbg.addChild(skip_shantext, skip_shanset);
                                    let unauto_choosebg = setcreate('set_mbg'); //拆顺选择
                                    unauto_choosebg.y = 60 * pph;
                                    unauto_choosebg.scale.set(0.35 * ppw, 0.75 * pph);
                                    let unauto_choosetext = new PIXI.Text('拆顺选择');
                                    unauto_choosetext.style.fontFamily = 'shousha';
                                    unauto_choosetext.style.fontSize = 28;
                                    unauto_choosetext.position.set(25 * ppw, 9 * pph);//25 * ppw, 3 * pph
                                    unauto_choosetext.style.fill = '#FFE4B5';
                                    unauto_choosetext.scale.set(1,0.8);/*本没有*/
                                    let unauto_chooseset = setcreatex('set_btnn_off'); //选择框
                                    unauto_chooseset.position.set(220 * ppw, 8 * pph);
                                    unauto_chooseset.scale.set(pps, 0.8 * pps);
                                    unauto_chooseset.name = 'unauto_choose';
                                    unauto_choosebg.addChild(unauto_choosetext, unauto_chooseset);
                                    let tao_enemybg = setcreate('set_mbg'); //桃救敌方
                                    tao_enemybg.x = 125 * ppw;
                                    tao_enemybg.y = 60 * pph;
                                    tao_enemybg.scale.set(0.35 * ppw, 0.75 * pph);
                                    let tao_enemytext = new PIXI.Text('对敌出桃');
                                    tao_enemytext.style.fontFamily = 'shousha';
                                    tao_enemytext.style.fontSize = 28;
                                    tao_enemytext.position.set(25 * ppw, 9 * pph);//25 * ppw, 3 * pph
                                    tao_enemytext.style.fill = '#FFE4B5';
                                    tao_enemytext.scale.set(1,0.8);/*本没有*/
                                    let tao_enemyset = setcreatex('set_btnn_off'); //选择框
                                    tao_enemyset.position.set(220 * ppw, 8 * pph);
                                    tao_enemyset.scale.set(pps, 0.8 * pps);
                                    tao_enemyset.name = 'tao_enemy';
                                    tao_enemybg.addChild(tao_enemytext, tao_enemyset);
                                    let wuxie_selfbg = setcreate('set_mbg'); //无懈自己							
                                    wuxie_selfbg.y = 120 * pph;
                                    wuxie_selfbg.scale.set(0.35 * ppw, 0.75 * pph);
                                    let wuxie_selftext = new PIXI.Text('不防自己');
                                    wuxie_selftext.style.fontFamily = 'shousha';
                                    wuxie_selftext.style.fontSize = 28;
                                    wuxie_selftext.position.set(25 * ppw, 9 * pph);//25 * ppw, 3 * pph
                                    wuxie_selftext.style.fill = '#FFE4B5';
                                    wuxie_selftext.scale.set(1,0.8);/*本没有*/
                                    let wuxie_selfset = setcreatex('set_btnn_off'); //选择框
                                    wuxie_selfset.position.set(220 * ppw, 8 * pph);
                                    wuxie_selfset.scale.set(pps, 0.8 * pps);
                                    wuxie_selfset.name = 'wuxie_self';
                                    wuxie_selfbg.addChild(wuxie_selftext, wuxie_selfset);
                                    let red_pointbg = setcreate('set_mbg'); //红点入侵
                                    red_pointbg.y = 180 * pph;
                                    red_pointbg.scale.set(0.35 * ppw, 0.75 * pph);
                                    let red_pointtext = new PIXI.Text('红点入侵');
                                    red_pointtext.style.fontFamily = 'shousha';
                                    red_pointtext.style.fontSize = 28;
                                    red_pointtext.position.set(25 * ppw, 9 * pph);//25 * ppw, 3 * pph
                                    red_pointtext.style.fill = '#FFE4B5';
                                    red_pointtext.scale.set(1,0.8);/*本没有*/
                                    let red_pointset = setcreatex('set_btnn_off'); //选择框
                                    red_pointset.position.set(220 * ppw, 8 * pph);
                                    red_pointset.scale.set(pps, 0.8 * pps);
                                    red_pointset.name = 'red_point';
                                    red_pointbg.addChild(red_pointtext, red_pointset);
                                    let scollannouncementbg = setcreate('set_mbg'); //滚屏公告
                                    scollannouncementbg.x = 125 * ppw;
                                    scollannouncementbg.y = 120 * pph;
                                    scollannouncementbg.scale.set(0.35 * ppw, 0.75 * pph);
                                    let scollannouncementtext = new PIXI.Text('滚屏公告');
                                    scollannouncementtext.style.fontFamily = 'shousha';
                                    scollannouncementtext.style.fontSize = 28;
                                    scollannouncementtext.position.set(25 * ppw, 9 * pph);//25 * ppw, 3 * pph
                                    scollannouncementtext.style.fill = '#FFE4B5';
                                    scollannouncementtext.scale.set(1,0.8);/*本没有*/
                                    let scollannouncementset = setcreatex('set_btnn_off'); //选择框
                                    scollannouncementset.position.set(220 * ppw, 8 * pph);
                                    scollannouncementset.scale.set(pps, 0.8 * pps);
                                    scollannouncementset.name = 'scollannouncement';
                                    /*let new_button = setcreate('set_mbg'); //新增按钮
                                    new_button.y = 180 * pph;
                                    new_button.scale.set(0.35 * ppw, 0.75 * pph);
                                    let red_pointtext = new PIXI.Text('新增按钮');
                                    red_pointtext.style.fontFamily = 'shousha';
                                    red_pointtext.style.fontSize = 28;
                                    red_pointtext.position.set(25 * ppw, 9 * pph);//25 * ppw, 3 * pph
                                    red_pointtext.style.fill = '#FFE4B5';
                                    red_pointtext.scale.set(1,0.8);//本没有
                                    let red_pointset = setcreatex('set_btnn_off'); //选择框
                                    red_pointset.position.set(220 * ppw, 8 * pph);
                                    red_pointset.scale.set(pps, 0.8 * pps);
                                    red_pointset.name = 'red_point';
                                    new_button.addChild(red_pointtext, red_pointset);*/
                                    var allsome=[auto_confirmbg, skip_shanbg, unauto_choosebg, tao_enemybg, wuxie_selfbg, red_pointbg, scollannouncementbg];
                                    allsome.forEach(node=>{
                                       node.x+=4*ppw;
                                       node.y+=13*pph;
                                    });
                                    scollannouncementbg.addChild(scollannouncementtext, scollannouncementset);
                                    settingright2.x = -120 * ppw;
                                    settingright2.y = -120 * pph;
                                    settingright2.addChild(auto_confirmbg, skip_shanbg, unauto_choosebg, tao_enemybg, wuxie_selfbg, red_pointbg, scollannouncementbg);

                                    function onbuttonzu(event) {
                                        if (lib.config[event.target.name] == true) game.saveConfig(event.target.name, false)
                                        else game.saveConfig(event.target.name, true);
                                        if (lib.config[event.target.name]) event.target.texture = zloader.resources.setting.textures['set_btnn_on']
                                        else event.target.texture = zloader.resources.setting.textures['set_btnn_off']
                                    }
                                    settingright2.on('added', () => {
                                        auto_confirmset.texture = lib.config.auto_confirm ? zloader.resources.setting.textures['set_btnn_on'] : zloader.resources.setting.textures['set_btnn_off'];
                                        skip_shanset.texture = lib.config.skip_shan ? zloader.resources.setting.textures['set_btnn_on'] : zloader.resources.setting.textures['set_btnn_off'];
                                        unauto_chooseset.texture = lib.config.unauto_choose ? zloader.resources.setting.textures['set_btnn_on'] : zloader.resources.setting.textures['set_btnn_off'];
                                        tao_enemyset.texture = lib.config.tao_enemy ? zloader.resources.setting.textures['set_btnn_on'] : zloader.resources.setting.textures['set_btnn_off'];
                                        wuxie_selfset.texture = lib.config.wuxie_self ? zloader.resources.setting.textures['set_btnn_on'] : zloader.resources.setting.textures['set_btnn_off'];
                                        red_pointset.texture = lib.config.red_point ? zloader.resources.setting.textures['set_btnn_on'] : zloader.resources.setting.textures['set_btnn_off'];
                                        scollannouncementset.texture = lib.config.scollannouncement ? zloader.resources.setting.textures['set_btnn_on'] : zloader.resources.setting.textures['set_btnn_off'];
                                    });
                                    ploader.load(setupp);
                                    gloader.load(setupg)
                                }
                                //g加载器，加载武将界面
                                let gloader = new PIXI.Loader();
                                //dy加载器，加载武将动皮
                          /*      window.dyloader = {};
                                //动皮集合
                                window.dyloaderskin = [];*/
                                //		let dyloader = new PIXI.Loader();
                                //加载需要的武将界面纹理图。
                                if(lib.config.rzsh_wjbg) {
                                    var wjbg=lib.config.rzsh_wjbg;
                                }else {
                                    var wjbg='战火连天.jpg';
                                }
                                gloader.add('shadow', lib.assetURL + 'extension/如真似幻/images/shadow.png');
                                gloader.add('wujiang', lib.assetURL + 'extension/如真似幻/images/wujiang.json');
                                gloader.add('label', lib.assetURL + 'extension/如真似幻/images/label.json');
                                gloader.add('wujiangBG', lib.assetURL + 'extension/如真似幻/images/wujiangBG/'+wjbg);
                                //武将界面必须使用内存控制。在修改选将之前 否则内存会爆炸。
                                //创建一个容器池。
                                //所有的武将必须加入武将池。
                                function wujiangcreate(name) {
                                    //留一个出BUG重启的预设
                                    if(!gloader.resources.wujiang) {return;}
                                    //if(!gloader.resources.wujiang) {game.reload();return;}
                                    let sprite = new PIXI.Sprite(gloader.resources.wujiang.textures[name]);
                                    sprite.name = name;
                                    return sprite;
                                }
                                let wujiangpool = [];
                                //武将界面大容器，放置所有小容器和精灵
                                let wujianghome = new PIXI.Container();
                                wujianghome.width = pixiapp.screen.width;
                                wujianghome.height = pixiapp.screen.height;
                                //上部容器，放头和左边大框以及选择按钮
                                let wujianghometop = new PIXI.Container();
                                wujianghometop.width = pixiapp.screen.width;
                                wujianghometop.height = pixiapp.screen.height;
                                //左边容器，两个固定按钮容器和几个滑动按钮容器
                                let wujianghomeleft = new PIXI.Container();
                                wujianghomeleft.width = pixiapp.screen.width;
                                wujianghomeleft.height = pixiapp.screen.height;
                                //中间容器，放武将图
                                let wujianghomecenter = new PIXI.Container();
                                wujianghomecenter.width = pixiapp.screen.width;
                                wujianghomecenter.height = pixiapp.screen.height;
                                let wujianghomeright = new PIXI.Container();
                                wujianghomeright.width = pixiapp.screen.width;
                                wujianghomeright.height = pixiapp.screen.height;
                                wujianghome.addChild(wujianghometop, wujianghomeleft, wujianghomecenter, wujianghomeright)
                                //热门和全部，这是不可滑动的
                                let wujianghomeleft1 = new PIXI.Container();
                                wujianghomeleft1.width = pixiapp.screen.width;
                                wujianghomeleft1.height = pixiapp.screen.height;
                                //	wujianghome.addChild(wujianghomeleft1);
                                //按钮的滑动区域wujianghomeleft2，首先需要一个容器放所有按钮
                                let wujianghomeleft2 = new PIXI.Container();
                                wujianghomeleft2.width = pixiapp.screen.width / 3;
                                wujianghomeleft2.height = pixiapp.screen.height;
                                //按钮滑动视口
                                let wujiangscrollleft = new PIXI.Scrollbox({
                                    boxWidth: 160 * ppw,
                                    boxHeight: 263 * pph,
                                    passiveWheel: false,
                                    scrollbarBackgroundAlpha: 0,
                                    scrollbarSize: 0,
                                    stopPropagation: true,
                                    divWheel: pixiapp.view,
                                    interaction: pixiapp.renderer.plugins.interaction,
                                })
                                wujiangscrollleft.position.set(45 * ppw, 255 * pph);
                                wujiangscrollleft.content.addChild(wujianghomeleft2);
                                wujianghomeleft.addChild(wujiangscrollleft, wujianghomeleft1);
                                let rzshtranslate = {};
                                let rzshcharacters = [];
                                for (let l in lib.translate) {
                                    rzshtranslate[l] = lib.translate[l]
                                }
                                for (let i in lib.imported.character) { //获取所有武将包//并加载所有武将图片//加入集合中防止出现重复武将
                                    if (lib.config.hidepack && Array.isArray(lib.config.hidepack) && lib.config.hidepack.includes(i)) continue;
                                    for (let j in lib.imported.character[i].character) {
                                        //Helasisy改
                                        if (rzshcharacters.includes(j)) continue;
                                        //有人报过错，，先注释掉吧
                                        //if (lib.character[j].indexOf('key')!=-1) continue;
                                        if (j.indexOf('key_')!=-1) continue;
                                        rzshcharacters.push(j);
                                        let resources;

                                        resources = gloader.add(j, lib.assetURL + 'image/character/' + j + '.jpg');
                                    }
                                    //获取翻译
                                    for (let k in lib.imported.character[i].translate) {
                                        rzshtranslate[k] = lib.imported.character[i].translate[k]
                                    }
                                }
                                //根据文件目录筛出有图片的角色防止空图
                                game.getFileList('image/character',function(folders,files){
                                    window.rzshcharactersimg=[];
                                    for(var i=0;i<rzshcharacters.length;i++) {
                                        //屏蔽thunder中的笑脸武将
                                        if(rzshcharacters[i].indexOf('th_')==0) continue;
                                        //屏蔽隐藏彩蛋武将
                                        if(rzshcharacters[i].indexOf('shen_nebula')==0) continue;
                                        if(files.indexOf(rzshcharacters[i]+'.jpg')!=-1) {
                                            window.rzshcharactersimg.add(rzshcharacters[i]);
                                        }
                                    }
                                    //alert_old(window.rzshcharactersimg);
                                    //window.rzshcharactersimg=files;
                                });
                                //武将滑动视口//完美大小位置						
                                let wujiangscrollright = new PIXI.Scrollbox({
                                    boxWidth: 680 * ppw,
                                    boxHeight: 430 * pph,
                                    passiveWheel: false,
                                    scrollbarBackgroundAlpha: 0,
                                    scrollbarSize: 0,
                                    stopPropagation: true,
                                    divWheel: pixiapp.view,
                                    interaction: pixiapp.renderer.plugins.interaction,
                                })
                                wujiangscrollright.position.set(245 * ppw, 67 * pph);
                                wujianghomecenter.addChild(wujiangscrollright)
                                //中间界面容器类	
                                let bbox = wujiangscrollright.content.addChild(new PIXI.Container());
                                //放势力按钮的的地方
                                let wujiangscrollgroup = new PIXI.Scrollbox({
                                    boxWidth: 170 * ppw,
                                    boxHeight: 290 * pph,/*300*/
                                    passiveWheel: false,
                                    scrollbarBackgroundAlpha: 0,
                                    scrollbarSize: 0,
                                    stopPropagation: true,
                                    divWheel: pixiapp.view,
                                    interaction: pixiapp.renderer.plugins.interaction,
                                })
                                wujiangscrollgroup.position.set(895 * ppw, 110 * pph);
                                wujianghomeright.addChild(wujiangscrollgroup)
                                //中间界面容器类	
                                let btnbox = wujiangscrollgroup.content.addChild(new PIXI.Container());
                                /*if (!lib.config.sprite_avatar) game.saveConfig('sprite_avatar', {
                                    x: 31,
                                    y: -23,
                                    w: 135,
                                    h: 250,
                                })预设有点错位*/
                                //新调整一下
                                if (!lib.config.sprite_avatar_seted) {
                                    game.saveConfig('sprite_avatar_seted', true);
                                    game.saveConfig('sprite_avatar', {
                                        x: 33,
                                        y: -23,
                                        w: 135,
                                        h: 250,
                                    });
                                }
                                //console.log(lib.translate)
                                function setupg() {
                                    console.timeEnd('g加载完毕');
                                    game.isUnlockDialogDo('g');
                                    //头部
                                    //顶上信息栏
                                    let warr_info_bg = wujiangcreate('warr_info_bg');
                                    uiinit3(warr_info_bg);
                                    //左边大长框
                                    let wujiangchangkuang = wujiangcreate('wujiangchangkuang');
                                    uiinit3(wujiangchangkuang);
                                    //将魂
                                    let jianghun = wujiangcreate('jianghun');
                                    uiinit3(jianghun);
                                    //流苏
                                    let warr_info_dec = wujiangcreate('warr_info_dec');
                                    uiinit3(warr_info_dec);
                                    //将力条
                                    let jl_bar_fg = wujiangcreate('jl_bar_fg');
                                    uiinit3(jl_bar_fg);
                                    //将力条旁边按钮
                                    let warr_arr_official = wujiangcreate('warr_arr_official');
                                    uiinit3(warr_arr_official);
                                    //大元帅图标
                                    let officalui_icon_10 = wujiangcreate('officalui_icon_10');
                                    uiinit3(officalui_icon_10);
                                    //大元帅文字图
                                    let offical_dayuanshuai = wujiangcreate('offical_dayuanshuai');
                                    uiinit3(offical_dayuanshuai);
                                    //将力值
                                    let jltext = new PIXI.Text("将力：98900/98900");
                                    jltext.style.fontFamily = 'shousha';
                                    jltext.style.fontSize = 24;
                                    jltext.position.set(0, 0);
                                    jltext.anchor.set(0.5);
                                    jltext.style.fill = '#C0C0C0';
                                    jl_bar_fg.addChild(jltext);
                                    //将魂值
                                    var jianghunnum=lib.config.qhly_jianghun==undefined?100000:lib.config.qhly_jianghun;
                                    //let jianghuntext = new PIXI.Text("100000");
                                    let jianghuntext = new PIXI.Text(jianghunnum);
                                    jianghuntext.style.fontFamily = 'shousha';
                                    jianghuntext.style.fontSize = 24;
                                    jianghuntext.position.set(0, 47);
                                    jianghuntext.anchor.set(0.5);
                                    jianghuntext.style.fill = '#C0C0C0';
                                    game.rzsh_jianghun=jianghuntext;
                                    jianghun.addChild(jianghuntext);
                                    warr_info_bg.addChild(wujiangchangkuang, jianghun, warr_info_dec, jl_bar_fg, warr_arr_official, officalui_icon_10, offical_dayuanshuai);
                                    warr_info_bg.scale.set(1*0.68, 1.045*0.68);
                                    //接下来是全部武将，搜索和返回按钮
                                    let quanbuxianshi = wujiangcreate('biaojibeijing');
                                    uiinit(quanbuxianshi);
                                    quanbuxianshi.scale.set(0.885 * ppw, 0.6 * pph);
                                  if(!lib.config.extension_斗转星移_enable) {
                                    var quanbuxianshitext = new PIXI.Text(` 全部武将`, {
                                        fontFamily: 'shousha',
                                        fontSize: 22,
                                        fill: '#FFE4B5'
                                    });
                                  }else {
                                    var quanbuxianshitext = new PIXI.Text(` 禁将设置`, {
                                        fontFamily: 'shousha',
                                        fontSize: 22,
                                        fill: '#FFE4B5'
                                    });
                                    quanbuxianshitext.interactive = true;
                                    quanbuxianshitext.on('pointerup', function(){
                                                if(!lib.config.extension_斗转星移_enable) return;
                                                //entermodegame('brawl');
                                                window.qnssReload=true;
                                                entermodegame('identity','normal','3');
                                                window.hideArena=function(){
                                                    if(ui.arena) {
                                                        ui.arena.hide();
                                                        if(window.shoushaBlanks&&window.shoushaBlanks.length) window.shoushaBlanks.forEach(node=>{
                                                            node.style.transition='all 0.3s';
                                                            node.style.opacity=0;
                                                        });
                                                        //ui.arena.style.display='none';
                                                    }else {
                                                        setTimeout(function(){
                                                            window.hideArena();
                                                        },100);
                                                    }
                                                }
                                                window.hideArena();
                                                if(window.shoushaBlanks&&window.shoushaBlanks.length) window.shoushaBlanks.forEach(node=>{
                                                    node.style.opacity=0;
                                                });
                                                //ui.background.setBackgroundImage('image/background/1.jpg');
                                                //lib.config.image_background='1';
                                                setTimeout(function(){
                                                    rzshkz();
                                                },0);
                                                uihome.removeChild(uihomecenter);
                                                setTimeout(function(){
                                                    hideDrawer(uihometop, "top");
                                                    hideDrawer(uihomeunder, "under");
                                                    hideDrawer(uihomeleft, "left");
                                                    hideDrawer(uihomeright, "right");
                                                },100);
                                                window.isOnhide = true;
                                                opprogress = setTimeout(function() {
                                                    window.isOnhide = false;
                                                    pixiapp.stage.removeChild(uihome);
                                                    if (opprogress != null) clearTimeout(opprogress);
                                                    opprogress = null;
                                                },200);
                                                /*pixiapp.stage.children.forEach(function(child) {
                                                    if (child == uibg&&lib.config.rzEpicSpine) {
                                                        pixiapp.stage.removeChild(child);
                                                    }
                                                });*/
                                                    uibg.showfunc=function(num,sum){
                                                        if(!uibg) return;
                                                        uibg.alpha=(sum-num)/sum;
                                                        if(sum>num){
                                                            setTimeout(function(){
                                                                uibg.showfunc(num+1,sum);
                                                            },10);
                                                        }else {
                                                            //uibg3.alpha=1;
                                                            //pixiapp.stage.removeChild(spinelo2, uibg3);
                                                            if(pixiapp) pixiapp.stage.removeChild(uibg);
                                                            //uibg.texture = xloader.resources.loadingbg.texture;
                                                        }
                                                    }
                                                    if(uibg.playVideoTheme) uibg.playVideoTheme(true, 'delete');
                                                    else uibg.showfunc(0,10);
                                                /*setTimeout(function(){
                                                    if(window.shoushaBlanks&&window.shoushaBlanks.length) window.shoushaBlanks.forEach(node=>{
                                                        node.style.transition='all 0.3s';
                                                        node.style.opacity=0;
                                                    });
                                                    window.qnssReload=true;
                                                    //fix十周年的报错
                                                    ui.dialogs=[];
                                                    window.诗笺_manual.show();
                                                },100);//2200*/
                                                window.showManual=function(){
                                                    if(ui.arena&&window.bancharss) {
                                                        if(window.shoushaBlanks&&window.shoushaBlanks.length) window.shoushaBlanks.forEach(node=>{
                                                            node.style.transition='all 0.3s';
                                                            node.style.opacity=0;
                                                        });
                                                        window.qnssReload=true;
                                                        //fix十周年的报错
                                                        ui.dialogs=[];
                                                        window.bancharss();
                                                    }else {
                                                        setTimeout(function(){
                                                            window.showManual();
                                                        },100);
                                                    }
                                                }
                                                window.showManual();
                                    });
                                  }
                                    //quanbuxianshitext.scale.set(1.1, 1.5);
                                    quanbuxianshitext.scale.set(1, 1.4);
                                    quanbuxianshitext.anchor.set(0.6);
                                    let union_arrow = wujiangcreate('union_arrow');
                                    union_arrow.anchor.set(0.5)
                                    union_arrow.x = quanbuxianshi.width * 0.37;
                                    quanbuxianshi.addChild(quanbuxianshitext, union_arrow);
                                    let search_btn = wujiangcreate('search_btn');
                                    //搜索，跳转至全能搜索
                                    search_btn.interactive = true;
                                    search_btn.on('pointerup', function(){
                                                if(!lib.config.extension_全能搜索_enable) return;
                                                //entermodegame('brawl');
                                                window.qnssReload=true;
                                                entermodegame('identity','normal','3');
                                                window.hideArena=function(){
                                                    if(ui.arena) {
                                                        ui.arena.hide();
                                                        if(window.shoushaBlanks&&window.shoushaBlanks.length) window.shoushaBlanks.forEach(node=>{
                                                            node.style.transition='all 0.3s';
                                                            node.style.opacity=0;
                                                        });
                                                        //ui.arena.style.display='none';
                                                    }else {
                                                        setTimeout(function(){
                                                            window.hideArena();
                                                        },100);
                                                    }
                                                }
                                                window.hideArena();
                                                if(window.shoushaBlanks&&window.shoushaBlanks.length) window.shoushaBlanks.forEach(node=>{
                                                    node.style.opacity=0;
                                                });
                                                //ui.background.setBackgroundImage('image/background/1.jpg');
                                                //lib.config.image_background='1';
                                                setTimeout(function(){
                                                    rzshkz();
                                                },0);
                                                uihome.removeChild(uihomecenter);
                                                setTimeout(function(){
                                                    hideDrawer(uihometop, "top");
                                                    hideDrawer(uihomeunder, "under");
                                                    hideDrawer(uihomeleft, "left");
                                                    hideDrawer(uihomeright, "right");
                                                },100);
                                                window.isOnhide = true;
                                                opprogress = setTimeout(function() {
                                                    window.isOnhide = false;
                                                    pixiapp.stage.removeChild(uihome);
                                                    if (opprogress != null) clearTimeout(opprogress);
                                                    opprogress = null;
                                                },200);
                                                /*pixiapp.stage.children.forEach(function(child) {
                                                    if (child == uibg&&lib.config.rzEpicSpine) {
                                                        pixiapp.stage.removeChild(child);
                                                    }
                                                });*/
                                                    uibg.showfunc=function(num,sum){
                                                        if(!uibg) return;
                                                        uibg.alpha=(sum-num)/sum;
                                                        if(sum>num){
                                                            setTimeout(function(){
                                                                uibg.showfunc(num+1,sum);
                                                            },10);
                                                        }else {
                                                            //uibg3.alpha=1;
                                                            //pixiapp.stage.removeChild(spinelo2, uibg3);
                                                            if(pixiapp) pixiapp.stage.removeChild(uibg);
                                                            //uibg.texture = xloader.resources.loadingbg.texture;
                                                        }
                                                    }
                                                    uibg.showfunc(0,10);
                                                /*setTimeout(function(){
                                                    if(window.shoushaBlanks&&window.shoushaBlanks.length) window.shoushaBlanks.forEach(node=>{
                                                        node.style.transition='all 0.3s';
                                                        node.style.opacity=0;
                                                    });
                                                    window.qnssReload=true;
                                                    //fix十周年的报错
                                                    ui.dialogs=[];
                                                    window.诗笺_manual.show();
                                                },100);//2200*/
                                                window.showManual=function(){
                                                    if(ui.arena&&window.诗笺_manual&&typeof SimplePagination !== 'undefined') {
                                                        if(window.shoushaBlanks&&window.shoushaBlanks.length) window.shoushaBlanks.forEach(node=>{
                                                            node.style.transition='all 0.3s';
                                                            node.style.opacity=0;
                                                        });
                                                        window.qnssReload=true;
                                                        //fix十周年的报错
                                                        ui.dialogs=[];
                                                        window.诗笺_manual.show();
                                                    }else {
                                                        setTimeout(function(){
                                                            window.showManual();
                                                        },100);
                                                    }
                                                }
                                                window.showManual();
                                    });
                                    uiinit(search_btn);
                                    let wujiangback = new PIXI.Sprite(zloader.resources.paiweiui.textures['back'])
                                    wujiangback.name = 'wujiangback';
                                    uiinit(wujiangback, true);
                                    wujiangback.scale.set(0.815, 0.805);
                                    var wjbleft=pixiapp.screen.width-(wujiangback.width*0.5)+44;
                                    wujiangback.position.set(wjbleft, 48);
                                    wujianghometop.addChild(warr_info_bg, quanbuxianshi, search_btn, wujiangback);
                                    //全部按钮和收藏按钮		
                                    let btn_lvl1_1a = wujiangcreate('btn_lvl1_1');
                                    btn_lvl1_1a.name = 'btn_lvl1_1a';
                                    uiinit(btn_lvl1_1a);
                                    btn_lvl1_1a.interactive = true;
                                    btn_lvl1_1a.on('pointerup', wujiangup);
                                    btn_lvl1_1a.on('pointerdown', wujiangdown);
                                    btn_lvl1_1a.sec = 'favourite';
                                    btn_lvl1_1a.position.set(127 * ppw, 160 * pph)
                                    btn_lvl1_1a.scale.set(0.65 * pps);
                                    btn_lvl1_1a.anchor.set(0.5);
                                    let tag_hot = wujiangcreate('tag_hot');
                                    tag_hot.position.set(-100, -50)
                                    let btn_lvl1_1atext = new PIXI.Text(`热门`, {
                                        fontFamily: 'shousha',
                                        fontSize: 36,
                                        fill: '#FFE4B5'
                                    })
                                    btn_lvl1_1atext.anchor.set(0.5)
                                    btn_lvl1_1a.addChild(tag_hot, btn_lvl1_1atext)
                                    let btn_lvl1_1b = wujiangcreate('btn_lvl1_1');
                                    btn_lvl1_1b.name = 'btn_lvl1_1b';
                                    uiinit(btn_lvl1_1b);
                                    btn_lvl1_1b.interactive = true;
                                    btn_lvl1_1b.on('pointerup', wujiangup);
                                    btn_lvl1_1b.on('pointerdown', wujiangdown);
                                    btn_lvl1_1b.sec = 'all';
                                    btn_lvl1_1b.position.set(127 * ppw, 230 * pph);
                                    btn_lvl1_1b.scale.set(0.65 * pps);
                                    btn_lvl1_1b.anchor.set(0.5);
                                    let btn_lvl1_1btext = new PIXI.Text(`全部`, {
                                        fontFamily: 'shousha',
                                        fontSize: 36,
                                        fill: '#FFE4B5'
                                    })
                                    btn_lvl1_1btext.anchor.set(0.5);
                                    btn_lvl1_1btext.y = -15 * pph;
                                    let btn_lvl1_1btext2 = new PIXI.Text(``, {
                                        fontFamily: 'shousha',
                                        fontSize: 18,
                                        fill: '#FFE4B5'
                                    })
                                    btn_lvl1_1btext2.anchor.set(0.5);
                                    btn_lvl1_1btext2.y = 30 * pph;
                                    btn_lvl1_1btext.addChild(btn_lvl1_1btext2)
                                    btn_lvl1_1b.addChild(btn_lvl1_1btext)
                                    wujianghomeleft1.addChild(btn_lvl1_1a, btn_lvl1_1b);
                                    //武将包有关的		
                                    let shcounter = 0;
                                    //定位辅助计数
                                    //随机全部武将显示
                                    var chalist=[];
                                    for (let i in lib.imported.character) {
                                        //跳过thunder武将如果关闭的话
                                        if(i=='thunder'&&lib.config&&lib.config['extension_雷霆万钧_hidePack']) {
                                            continue;
                                        }
                                        chalist.add(i);
                                    }
                                    //已经在package.js排序了，但还需要再来
                                    chalist=chalist.sort(function(a,b){
                                        var num=rzshtranslate[a + '_character_config'].length-rzshtranslate[b + '_character_config'].length;
                                        if(num==0) {
                                            var numa=a.length
                                            var numb=b.length;
                                            if(rzshtranslate[a + '_character_config'].indexOf('篇')!=-1) numa=20;
                                            if(rzshtranslate[b + '_character_config'].indexOf('篇')!=-1) numb=20;
                                            if(rzshtranslate[a + '_character_config'].indexOf('专属')!=-1) numa=-2;
                                            if(rzshtranslate[b + '_character_config'].indexOf('专属')!=-1) numb=-2;
                                            if(rzshtranslate[a + '_character_config'].indexOf('武将')!=-1) numa=-1;
                                            if(rzshtranslate[b + '_character_config'].indexOf('武将')!=-1) numb=-1;
                                            num=numb-numa;
                                        }
                                        return num;
                                        //return Math.random()-0.5;
                                    });
                                    //alert(chalist);
    //技能描述优化（在“手杀全扩”处设置）
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
    //热门武将
    //一般而言是sprite.fav
    game.rz_remen_cha=[];
    var modes=lib.config.all.sgsmodes||[];
    for(var i=0;i<modes.length;i++) {
        var list=get.config('recentCharacter',modes[i])||[];
        game.rz_remen_cha=game.rz_remen_cha.concat(list);
    }
                                    for (var p=0;p<chalist.length;p++) {
                                        var i=chalist[p];
                                        if (lib.config.hidepack && Array.isArray(lib.config.hidepack) && lib.config.hidepack.includes(i)) continue;
                                        //左边按钮
                                        let spritebtn = new PIXI.Sprite(gloader.resources.wujiang.textures['btn_lvl2_1'])
                                        spritebtn.y = pph * shcounter * spritebtn.height / 2;
                                        spritebtn.name = i;
                                        spritebtn.interactive = true;
                                        spritebtn.on('pointerup', wujiangup);
                                        spritebtn.on('pointerdown', wujiangdown);
                                        spritebtn.on('pointermove', () => {
                                            clearTimeout(pressTimer);
                                        });
                                        //变暗
                                        if (lib.config.characters && !lib.config.characters.includes(i)) spritebtn.filters = [characterclose];
                                        //武将包名字
                                        let text = new PIXI.Text(rzshtranslate[i + '_character_config']);
                                        text.style.fontFamily = 'shousha';
                                        text.style.fontSize = 28;//28
                                        text.position.set(120, 53);//120,50
                                        text.anchor.set(0.5);
                                        text.style.fill = '#FFE4B5';
                                        //spritebtn.scale.set(0.67 * ppw, 0.7 * pph);
                                        spritebtn.scale.set(0.64 * ppw, 0.7 * pph);
                                        spritebtn.x+= 5 * pph;
                                        shcounter++;
                                        spritebtn.addChild(text);
                                        wujianghomeleft2.addChild(spritebtn);
                                        game.createCss(`.rzsh_group_shade {
                                            width: 100%;
                                            height: 100%;
                                            left: 0;
                                            top: 0;
                                            box-shadow: rgba(0, 0, 0, 1) 0px 0px 2px 2px;
                                        }`);
                                        //接下来是重中之重
                                        for (let j in lib.imported.character[i].character) {
                                            //排除unseen
                                            if (Array.isArray(lib.imported.character[i].character[j][4]) && lib.imported.character[i].character[j][4].contains('unseen')) continue;
                                            //武将图
                                            let spritea = new PIXI.Sprite();
                                            try {
                                                spritea.texture = gloader.resources[j].texture;
                                            } catch (err) {
                                                console.log(j)
                                            }
                                            spritea.width = lib.config.sprite_avatar.w;
                                            spritea.height = lib.config.sprite_avatar.h;
                                            spritea.x = lib.config.sprite_avatar.x;
                                            spritea.y = lib.config.sprite_avatar.y;
                                            spritea.name = 'avatar';
                                            //边框（空）
                                            let sprite = new PIXI.Sprite();
                                            //给精灵一个名字，应该给框才对
                                            sprite.name = j;
                                            //名字翻译，为搜索考虑
                                            sprite.name2 = rzshtranslate[j];
                                            //所属武将包
                                            sprite.pack = i;
                                            //势力	   
                                            sprite.secgroup = lib.imported.character[i].character[j][1];
                                            sprite.groupImage = new PIXI.Sprite();
                                            //如果存在双势力
                                            if (lib.imported.character[i].character[j][4] && lib.imported.character[i].character[j][4].toString()
                                                .indexOf('double') != -1) sprite.secgroup = lib.imported.character[i].character[j][4].toString()
                                                .split(':')
                                                .slice(1);
                                            if (!lib.config.rzLock_jsc&&lib.config.favouriteCharacter.contains(j)) sprite.fav = true;
                                            if (!lib.config.rzLock_jzj&&game.rz_remen_cha.contains(j)) sprite.fav = true;
                                            try {
                                                if (!Array.isArray(sprite.secgroup)) sprite.groupImage.texture = gloader.resources.wujiang.textures['name_' + sprite.secgroup] ? gloader.resources.wujiang.textures['name_' + sprite.secgroup] : gloader.resources.wujiang.textures['name_unknown'];
                                                else sprite.groupImage.texture = gloader.resources.wujiang.textures['name_' + sprite.secgroup[0] + '_' + sprite.secgroup[1]] ? gloader.resources.wujiang.textures['name_' + sprite.secgroup[0] + '_' + sprite.secgroup[1]] : gloader.resources.wujiang.textures['name_unknown'];
                                            } catch (err) {
                                                sprite.groupImage.texture = gloader.resources.wujiang.textures['name_known'];
                                            }
                                            const shade = new PIXI.Sprite(gloader.resources.shadow.texture);
                                            shade.position.set(-5, -5);
                                            shade.scale.set(1.025, 1.025);
                                            shade.alpha = 0.6;
                                            sprite.addChild(shade);
                                            sprite.addChild(sprite.groupImage);
                                            sprite.interactive = true;
                                            sprite.on('pointerup', (event) => {
                                                let distance = event.data.global.x - sprite.startX;
                                                if (distance != 0) return;
                                                if (lib.config.extension_千幻聆音_enable && lib.config.rzshxqhly) {
                                                    //关闭菜单操作，延迟等待，防止出bug
                                                    if(game.noReturnMenu) return;
                                                    ui.window = ui.create.div('#window', document.body);
                                                 //   console.time(sprite.name + '加载完毕');
                                               /*     if (!dyloader[sprite.name]) {
                                                        dyloader[sprite.name] = new PIXI.Loader();
                                                        if (dedskin && dedskin[sprite.name]) for (i in dedskin[sprite.name]) {
                                                            let type = '.skel';
                                                            if (dedskin[sprite.name][i].json) type = '.json';
                                                            if(dedskin[sprite.name][i].beijing)dyloader[sprite.name].add(sprite.name + '_' + i+'_bg', lib.assetURL + 'extension/十周年UI/assets/dynamic/' + dedskin[sprite.name][i].beijing.name + '.skel');

                                                            dyloader[sprite.name].add(sprite.name + '_' + i, lib.assetURL + 'extension/十周年UI/assets/dynamic/' + dedskin[sprite.name][i].name + type);

                                                        }
                                                        dyloader[sprite.name].load(() => {
                                                            console.timeEnd(sprite.name + '加载完毕');
                                                        });
                                                    }*/
                                                    game.qhly_open_new(sprite.name, 'skill')
                                                }
                                            })
                                            sprite.on('pointerdown', (event) => {
                                                sprite.startX = event.data.global.x;
                                            })
                                            sprite.addChild(spritea);
                                            //名字
                                            let spriteb = new PIXI.Text(sprite.name2, {
                                                fontFamily: 'shousha',
                                                fontSize: 24,
                                                fill: '#FFE4B5',
                                                wordWrap: true,
                                                wordWrapWidth: 24,
                                                align: 'center',
                                                breakWords: true,
                                                lineHeight: 20
                                            });
                                            spriteb.anchor.set(0.5, 0)
                                            spriteb.position.set(17.5, 23);
                                            //双势力边框不会出问题了，仅调整高度
                                            if (Array.isArray(sprite.secgroup)) {
                                                spriteb.y = 58 * pph;
                                                /*sprite.groupImage.scale.set(0.995, 0.995);
                                                sprite.groupImage.position.set(2, 2.5);*/
                                            }
                                            sprite.addChild(spriteb);
                                            //判断该武将的强度
                                            /*let stars,starss,raritys=['none','junk','common','epic','legend'];
                                            for(starss=1;starss<raritys.length;starss++) {
                                                if(raritys[starss]=='common'||window.noname_character_rank.rarity[raritys[starss]]&&window.noname_character_rank.rarity[raritys[starss]].contains(j)) {
                                                    stars=starss;
                                                }
                                            }*/
                                            let stars=0,starss,raritys=['none','d','c','bm','b','bp','am','a','ap','s'];
                                            let maxStar=4;//满星是多少星
                                            if(lib.config.five_gold_sj) maxStar=5;
                                            for(starss=1;starss<raritys.length;starss++) {
                                                if(window.noname_character_rank[raritys[starss]].contains(j)) {
                                                    stars=starss;
                                                }
                                            }
                                            if(!stars) {
                                                stars=Math.ceil(maxStar*0.5);
                                            }else {
                                                stars=Math.floor(maxStar*stars/raritys.length);
                                            }
                                            
                                            let starttexture = gloader.resources.wujiang.textures['dj_star_light'];
                                            starttexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                                            //星星
                                            //let spritec = new PIXI.TilingSprite(starttexture, starttexture.width * 0.75, starttexture.height * 3.75);
                                            let spritec = new PIXI.TilingSprite(starttexture, starttexture.width * 0.75, starttexture.height * 0.75 * (stars + 1));
                                            spritec.tileScale.set(0.75);//0.75
                                            spritec.position.set(7, 120 + starttexture.height * 0.75 * (4 - stars));
                                            sprite.addChild(spritec);
                                            
                                            let starttexture2 = gloader.resources.wujiang.textures['dj_star_gray'];
                                            starttexture2.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                                            //黑猩猩
                                            let spritez = new PIXI.TilingSprite(starttexture2, starttexture2.width * 0.75, starttexture2.height * 0.75 * (maxStar - 1 - stars));
                                            spritez.tileScale.set(0.75);//0.75
                                            spritez.position.set(7, 120 + starttexture2.height * 0.75 *(5 - maxStar));//7,120
                                            sprite.addChild(spritez);
                                            let sprited;
                                            //稀有度
                                            if (window.noname_character_rank.rarity.legend.contains(j)) {
                                                sprited = new PIXI.AnimatedSprite.fromFrames(gloader.resources.label.data.animations['chuanshuo']);
                                                sprited.animationSpeed = 0.15;
                                                sprited.play();
                                            } else if (window.noname_character_rank.rarity.epic.contains(j)) {
                                                sprited = new PIXI.AnimatedSprite.fromFrames(gloader.resources.label.data.animations['shishibiaoqian']);
                                                sprited.animationSpeed = 0.2;
                                                sprited.play();
                                            } else if (window.noname_character_rank.rarity.rare.contains(j)) sprited = new PIXI.Sprite(gloader.resources.label.textures['skinGrade4']);
                                            else if (window.noname_character_rank.rarity.junk.contains(j)) sprited = new PIXI.Sprite(gloader.resources.label.textures['skinGrade2']);
                                            else sprited = new PIXI.Sprite(gloader.resources.label.textures['skinGrade3']);
                                            sprited.scale.set(0.65)
                                            sprited.x = 110;
                                            sprite.addChild(sprited)

                                            //sprite.scale.set(0.7 * ppw, 0.7 * pph);
                                            //这里特殊一点，取h的最高来代替w的最宽，毕竟空间是足够的
                                            sprite.scale.set(0.7 * pph, 0.7 * pph);
                                            wujiangpool.push(sprite);
                                        }
                                    }
                                    btn_lvl1_1btext2.text = wujiangpool.length + '/' + wujiangpool.length;
                                    //右下角按钮
                                    let wujiangmenubtn = new PIXI.Sprite(yloader.resources.spritesui.textures['menu1']);
                                    //wujiangmenubtn.scale.set(0.7 * ppw, 0.7 * pph);
                                    wujiangmenubtn.scale.set(0.75 * ppw, 0.75 * ppw);
                                    wujiangmenubtn.x = pixiapp.screen.width - 0.95 * wujiangmenubtn.width;
                                    wujiangmenubtn.y = pixiapp.screen.height - wujiangmenubtn.height;
                                    wujianghome.addChild(wujiangmenubtn);
                                    wujiangmenubtn.interactive = true;
                                    wujiangmenubtn.on('pointerup', () => {
                                        if(window.cantbecontinue) return;
                                        window.cantbecontinue=true;
                                        wujiangmenubtn.alpha=0;
                                        wujianghome.addChild(wujiangmenu1)
                                        window.menuminleft=function(num,sum,spd){
                                            wujiangmenubg.x=sum+wujiangmenubg.width*(10-num)*0.1;
                                            if(wujiangmenubg.x>sum) {
                                                setTimeout(function(){
                                                    window.menuminleft(num+0.5,sum,spd+1);
                                                },10-spd*0.2);
                                            }else {
                                                wujiangmenubg.x=sum;
                                                window.cantbecontinue=false;
                                            }
                                        }
                                        window.menuminleft(4,wujiangmenubg.x,0);
                                    })
                                    wujiangmenubtn.on('pointerdown', () => {
                                        /*¥PIXI.sound.play¥*/window.tipsClick('PopUp')
                                    })
                                    //需要做一个蒙版，用来解决触屏按钮问题			
                                    let wujiangmenu1 = new PIXI.Container();
                                    let wujiangmenu_hitArea = new PIXI.Graphics();
                                    wujiangmenu_hitArea.beginFill(0x000000);
                                    wujiangmenu_hitArea.drawRect(0, 0, pixiapp.renderer.screen.width, pixiapp.renderer.screen.height);
                                    wujiangmenu_hitArea.endFill();
                                    wujiangmenu_hitArea.interactive = true;
                                    wujiangmenu_hitArea.alpha = 0;
                                    wujiangmenu_hitArea.on('pointerup', () => {
                                        if (isinputs != true) wujianghome.removeChild(wujiangmenu1)
                                    })
                                    //点击按钮后出现的东西
                                    let menutexture = new PIXI.Texture(zloader.resources.menubtn.textures['bigmenu'], new PIXI.Rectangle(0, 0, 112, 20));//0,0,120,20
                                    let wujiangmenubg = new PIXI.Sprite(menutexture);
                                    wujiangmenubg.interactive = true;
                                    wujiangmenubg.scale.set(3 * ppw, 3 * pph)
                                    wujiangmenubg.position.set(pixiapp.screen.width - wujiangmenubg.width, pixiapp.screen.height - wujiangmenubg.height);
                                    //wujiangmenubg.alpha = 0.5;//透明度
                                    //需要往边框里放东西menusi5，under5，under5
                                    //刷新壁纸
                                    if(game.cls_wjbg) {
                                        uibg.texture = gloader.resources.wujiangBG.texture;
                                        game.cls_wjbg=false;
                                    }
                                    //设置
                                    let wujiangmenuset = new PIXI.Sprite(zloader.resources.menubtn.textures['menusi5']);
                                    wujiangmenuset.x = 7;
                                    wujiangmenuset.interactive = true;
                                    let pressTimer = null;
                                    let isinputs = false;
                                    wujiangmenuset.on('pointerup', () => {
                                        clearTimeout(pressTimer);
                                        if(lib.config.rzLock_set) return;
                                            window.rzsh_skincho=(num,old)=>{
                                                /*gloader.resources.wujiangBG.texture=lib.assetURL + 'extension/如真似幻/images/wujiangBG/'+rzsh_skinimglist[num];*/
                                                //uibg.texture = gloader.resources.wujiangBG.texture;
                                                uibg.texture = gloader.resources['wujiangBG'+num].texture;
                                                if(old==rzsh_skinimglist[num]) {
                                                    var menu=['上一项','返回','下一项'];
                                                }else {
                                                    var menu=['上一项','确定','下一项'];
                                                }
                                                var show='◈切换背景['+(num+1)+'/'+rzsh_skinimglist.length+']：'+rzsh_skinimglist[num].slice(0,-4);
                                                //〔'+(num+1)+'/'+rzsh_ideimglist.length+'〕;
                                                window.tipsClick('TinyButton');//切换
                                                navigator.notification.confirm(
									    			show,
										    		function(index){
										    		    //window.show_rzsh_head.remove();
										    			switch(index){
											    		    case 0:
											    		    uibg.texture = gloader.resources.wujiangBG.texture;
											    		    //window.show_rzsh_head.remove();
											    		    window.tipsClick('Report01');//离开
											    		    break;
										    
											    		    case 1:
											    		    if(num<=0) {
											    		        var next=rzsh_skinimglist.length-1;
											    		    }else {
											    		        var next=num-1;
											    		    }
											    		    window.rzsh_skincho(next,old);
											    		    window.tipsClick('TinyButton');//切换
											    		    break;
										    
											    			
								    					    
								    					    case 2:
								    					    var skinitem=rzsh_skinimglist[num];
											    			game.saveConfig('rzsh_wjbg',skinitem);
											    			gloader.resources.wujiangBG.texture=gloader.resources['wujiangBG'+num].texture;
												    		/*if(old!=rzsh_headlist[num]) setTimeout(()=>{
                                                                game.reload3();
                                                            },0);*/
                                                            window.tipsClick('Enter');//确定
												    		break;
												    		
												    		case 3: 
										        			if(num>=rzsh_skinimglist.length-1) {
											    		        var next=0;
											    		    }else {
											    		        var next=num+1;
											    		    }
											    		    window.rzsh_skincho(next,old);
											    		    window.tipsClick('TinyButton');//切换
								    					    break;
												    		//case 3:navigator.app.exitApp();break;
											    		}
											    	},
										    		'三国杀·琉璃版',
								    				menu
								    			);
								    	    }
								    	    game.getFileList('extension/如真似幻/images/wujiangBG',function(folders,files){
								    	    window.rzsh_skinimglist=[];
								    	    for(var s=0;s<files.length;s++) {
								    	        if(files[s].indexOf('.png')!=-1||files[s].indexOf('.jpg')!=-1) {
								    	            window.rzsh_skinimglist.add(files[s]);
								    	            if(!window.is_load_rzshskinbg) gloader.add('wujiangBG'+s, lib.assetURL + 'extension/如真似幻/images/wujiangBG/'+files[s]);
								    	        }
								    	    }
								    	    window.is_load_rzshskinbg=true;
								    	    //alert(window.rzsh_ideimglist);
                                            var old=lib.config.rzsh_wjbg?lib.config.rzsh_wjbg:'战火连天.jpg';
								    	    setTimeout(()=>{
								    	        if(rzsh_skinimglist.contains(old)) {
								        	        window.rzsh_skincho(rzsh_skinimglist.indexOf(old),old);
								    	        }else {
								         	        window.rzsh_skincho(0,old);
								    	        }
								    	    },200);
								    	    });
								    	    
                                        /*if (isinputs != true) {
                                            confirms("是否开启图片显示调整？",false,function(){
                                                inputs.forEach((input) => document.body.appendChild(input));
                                                isinputs = true;
                                            });
                                            
                                        } else {
                                            confirms("是否关闭图片显示调整？",false,function(){
                                                isinputs = false;
                                                game.saveConfig('sprite_avatar', {
                                                    x: inputs[0].value,
                                                    y: inputs[1].value,
                                                    w: inputs[2].value,
                                                    h: inputs[3].value,
                                                })
                                                inputs.forEach((input) => input.remove())
                                            });
                                            
                                        }*/
                                    })
                                    //长按重置
                                    /*wujiangmenuset.on('pointerdown', () => {
                                        if (isinputs == false) return;
                                        pressTimer = setTimeout(() => {
                                            if (confirm("是否重置武将图片位置？")) {
                                                inputs[0].value = 31;
                                                inputs[1].value = -23;
                                                inputs[2].value = 135;
                                                inputs[3].value = 250;
                                                wujiangpool.forEach((sprite) => {
                                                    let avatar = sprite.getChildByName('avatar')
                                                    if (avatar) {
                                                        avatar.x = 31;
                                                        avatar.y = -23;
                                                        avatar.width = 135;
                                                        avatar.height = 250;
                                                    }
                                                });
                                                game.saveConfig('sprite_avatar', {
                                                    x: 31,
                                                    y: -23,
                                                    w: 135,
                                                    h: 250,
                                                })
                                            }
                                        }, 1000);
                                    });
                                    wujiangmenuset.on('pointermove', () => {
                                        clearTimeout(pressTimer);
                                    });*/
                                    wujiangmenuset.scale.set(0.25);
                                    let wujiangmenupifu = new PIXI.Sprite(yloader.resources.spritesui.textures['under5']);
                                    wujiangmenupifu.scale.set(0.25);
                                    wujiangmenupifu.x = 37;
                                    wujiangmenupifu.interactive = true;
                                    wujiangmenupifu.on('pointerup', () => {
                                        if(lib.config.rzLock_set) return;
                                        if (!lib.config.extension_千幻聆音_enable) return;
                                        window.tipsClick('TinyButton');//切换
                                        confirms(lib.config.rzshxqhly?"是否关闭武将查看页面？":"是否开启武将查看页面？",false,function(){
                                            if (!lib.config.rzshxqhly) {
                                                game.saveConfig('rzshxqhly', true)
                                            }else {
                                                game.saveConfig('rzshxqhly', false)
                                            }
                                            window.tipsClick('Enter');//确定
                                        },function(){
                                            window.tipsClick('Report01');//离开
                                        });
                                        /*if (!lib.config.rzshxqhly) {
                                            if (confirm("是否开启千幻适配大界面？")) {
                                                game.saveConfig('rzshxqhly', true)
                                            }
                                        } else if (lib.config.rzshxqhly) {
                                            if (confirm("是否关闭千幻适配大页面？")) {
                                                game.saveConfig('rzshxqhly', false)
                                            }
                                        }*/
                                    });
                                    //右下角按钮加
                                    let wujiangmenubtn2 = new PIXI.Sprite(yloader.resources.spritesui.textures['menu1']);
                                    wujiangmenubtn2.scale.set(0.75 * ppw, 0.75 * ppw);//0.7:0.7
                                    wujiangmenubtn2.x = pixiapp.screen.width - 0.95 * wujiangmenubtn2.width;
                                    wujiangmenubtn2.y = pixiapp.screen.height - wujiangmenubtn2.height;
                                    //wujianghome.addChild(wujiangmenubtn2);
                                    wujiangmenubtn2.interactive = true;
                                    wujiangmenubtn2.on('pointerup', () => {
                                        if(window.cantbecontinue) return;
                                        if (isinputs != true) {
                                            window.cantbecontinue=true;
                                            window.menuminleft2=function(num,sum,spd){
                                                wujiangmenubg.x=sum+wujiangmenubg.width*(10-num)*0.1;
                                                if(num>4) {
                                                    setTimeout(function(){
                                                        window.menuminleft2(num-0.5,sum,spd+1);
                                                    },10-spd*0.2);
                                                }else {
                                                    wujiangmenubg.x=pixiapp.screen.width;
                                                    wujianghome.removeChild(wujiangmenu1);
                                                    wujiangmenubtn.alpha=1;
                                                    setTimeout(function(){
                                                        wujiangmenubg.x=sum;
                                                        window.cantbecontinue=false;
                                                    },10);
                                                }
                                            }
                                            window.menuminleft2(10,wujiangmenubg.x,0);
                                            //wujianghome.removeChild(wujiangmenu1)
                                        }
                                    })
                                    /*let wujiangmenuban = new PIXI.Sprite(yloader.resources.spritesui.textures['under6']);
                                    wujiangmenuban.x = 70;
                                    wujiangmenuban.scale.set(0.25);
                                    wujiangmenuban.interactive = true;
                                    wujiangmenuban.on('pointerup', () => { //隐藏不想显示的武将包                                        
                                        clearTimeout(pressTimer);
                                        if(lib.config.rzLock_set) return;
                                        if (isinputs == true) return;
                                        if (!filteredSprites||!filteredSprites.length) return;
                                        if (currentwujiang == 'btn_lvl1_1a' || currentwujiang == 'btn_lvl1_1b') return;
                                        if (!lib.config.hidepack) lib.config.hidepack = [];
                                        if (!lib.config.hidepack.includes(filteredSprites[0].pack)) confirms("是否在该页面隐藏该武将包？\n（重新启动后生效）",false,function(){
                                            game.saveConfig('hidepack', lib.config.hidepack.add(filteredSprites[0].pack))
                                        });
                                    });
                                    wujiangmenuban.on('pointerdown', () => { //隐藏不想显示的武将包
                                        if (isinputs == true) return;
                                        pressTimer = setTimeout(() => {
                                            confirms("是否重置该页面隐藏的武将包？\n（重新启动后生效）",false,function(){
                                                game.saveConfig('hidepack');
                                            });
                                        }, 1000)
                                    });
                                    wujiangmenuban.on('pointermove', () => { //隐藏不想显示的武将包
                                        clearTimeout(pressTimer);
                                    });*/
                                    // 创建4个输入框
                                    const inputsData = [{
                                        type: 'text',
                                        placeholder: '精灵x',
                                        position: {
                                            left: '10%',
                                            top: '5%'
                                        },
                                        propertyName: 'x'
                                    }, {
                                        type: 'text',
                                        placeholder: '精灵y',
                                        position: {
                                            left: '25%',
                                            top: '5%'
                                        },
                                        propertyName: 'y'
                                    }, {
                                        type: 'text',
                                        placeholder: '精灵w',
                                        position: {
                                            right: '25%',
                                            top: '5%'
                                        },
                                        propertyName: 'width'
                                    }, {
                                        type: 'text',
                                        placeholder: '精灵h',
                                        position: {
                                            right: '10%',
                                            top: '5%'
                                        },
                                        propertyName: 'height'
                                    }, ];
                                    const createInput = (inputData, onInputChange) => {
                                        const input = document.createElement('input');
                                        input.setAttribute('type', inputData.type);
                                        input.setAttribute('placeholder', inputData.placeholder);
                                        input.style.position = 'fixed';
                                        input.style.width = '10%';
                                        input.style.height = '10%';
                                        input.style.zIndex = '100';
                                        input.value = wujiangpool[0].getChildByName('avatar')[inputData.propertyName]
                                        Object.assign(input.style, inputData.position);
                                        input.addEventListener('input', (event) => {
                                            onInputChange(inputData.propertyName, event.target.value);
                                        });
                                        return input;
                                    };
                                    const updateSpriteProperties = (propertyName, value) => {
                                        wujiangpool.forEach((sprite) => {
                                            const avatar = sprite.getChildByName('avatar')
                                            if (avatar) {
                                                avatar[propertyName] = value;
                                            }
                                        });
                                    };
                                    const inputs = inputsData.map((inputData) => {
                                        return createInput(inputData, updateSpriteProperties);
                                    });
                                    //wujiangmenubg.addChild(wujiangmenuset, wujiangmenupifu, wujiangmenuban)
                                    wujiangmenubg.addChild(wujiangmenuset, wujiangmenupifu)
                                    wujiangmenu1.addChild(/*wujiangmenu_hitArea, */wujiangmenubg, wujiangmenubtn2);
                                    let currentwujiang = null;
                                    //按钮集合
                                    let secgroups = new Map();
                                    //筛选武将集合
                                    let filteredSprites = []; //当前选中的武将包
                                    let currentgroup = null;
                                    wujianghome.on('added', () => {
                                        uibg.texture = gloader.resources.wujiangBG.texture;
                                        if(uibg.playVideoTheme) {
                                            uibg.playVideoTheme(true);
                                            ui.background.setBackgroundImage('extension/如真似幻/images/dark.jpg');
                                        }
                                        wujiangdonghua();
                                        if(lib.config.rzEpicSpine) {
                                            //萌新修改
                                            pixiapp.stage.removeChild(uihome);//文和修改
                                            if(window.uibg3Aready) pixiapp.stage.removeChild(spinelo2, uibg3);
                                        }
                                        if (currentwujiang == 'btn_lvl1_1a') return;
                                        if (currentwujiang == null) currentwujiang = 'btn_lvl1_1a';
                                        if (currentwujiang != 'btn_lvl1_1a' && currentwujiang != 'btn_lvl1_1b') wujianghomeleft2.getChildByName(currentwujiang)
                                            .texture = gloader.resources.wujiang.textures['btn_lvl2_1'];
                                        else wujianghomeleft1.getChildByName(currentwujiang)
                                            .texture = gloader.resources.wujiang.textures['btn_lvl1_1'];
                                        currentwujiang = 'btn_lvl1_1a';
                                        btn_lvl1_1a.texture = gloader.resources.wujiang.textures['btn_lvl1_2'];
                                        bbox.removeChildren();
                                        filteredSprites = wujiangpool.filter((sprite) => sprite.fav === true);
                                        let filteredSpritesq = filteredSprites.slice();
                                        if (renderProcess != null) cancelAnimationFrame(renderProcess);
                                        addSprites(filteredSpritesq, bbox);
                                        secgroups.clear();
                                        for (const item of filteredSprites) {
                                            let secgroup = item.secgroup;
                                            if (Array.isArray(secgroup)) {
                                                for (const subsecgroup of secgroup) {
                                                    // 如果 secgroups 中已经包含该子集合，则将当前元素加入该子集合中
                                                    if (secgroups.has(subsecgroup)) {
                                                        secgroups.get(subsecgroup)
                                                            .push(item);
                                                    }
                                                    // 如果 secgroups 中不包含该子集合，则将其加入 secgroups，并将当前元素作为该子集合的初始元素
                                                    else {
                                                        secgroups.set(subsecgroup, [item]);
                                                    }
                                                }
                                            } else {
                                                if (secgroups.has(secgroup)) {
                                                    secgroups.get(secgroup)
                                                        .push(item);
                                                } else {
                                                    secgroups.set(secgroup, [item]);
                                                }
                                            }
                                        }
                                        let lgd = 0;
                                        if (btnbox.children.length > 0) {
                                            while (btnbox.children[0]) {
                                                let sprite = btnbox.removeChild(btnbox.children[0]);
                                                sprite.destroy();
                                            }
                                        }
                                        secgroups.forEach((items, secgroup) => {
                                            //console.log(`${secgroup}: ${items.length}`);
                                            //势力按钮的框
                                            let sprite = new PIXI.Sprite(gloader.resources.wujiang.textures['clt_lvl3_btn_off']);
                                            sprite.scale.set(0.7 * pps);
                                            sprite.anchor.set(0.5)
                                            sprite.position.set(100 * ppw, 41 * pph)
                                            sprite.y += lgd * 70;
                                            sprite.name = secgroup;
                                            lgd++;
                                            //文字
                                            let text = new PIXI.Text(rzshtranslate[secgroup], {
                                                fontFamily: 'shousha',
                                                fontSize: 28,
                                                fill: '#FFE4B5'
                                            });
                                            text.anchor.set(0.5);
                                            text.y = -12 * pph;
                                            //数量
                                            let text2 = new PIXI.Text(items.length + '/' + items.length, {
                                                fontFamily: 'shousha',
                                                fontSize: 18,
                                                fill: '#FFE4B5'
                                            });
                                            text2.anchor.set(0.5);
                                            text2.y = 16 * pph;
                                            sprite.addChild(text, text2);
                                            sprite.interactive = true;
                                            sprite.on('pointerup', groupup)
                                            sprite.on('pointerdown', groupdown)
                                            btnbox.addChild(sprite);

                                        });
                                    })
                                    wujianghome.on('removed', () => {
                                        if (renderProcess != null) cancelAnimationFrame(renderProcess);
                                        if(uibg&&xloader.resources.uiBG) {
                                            uibg.texture = xloader.resources.uiBG.texture;
                                            if(uibg.playVideoTheme) uibg.playVideoTheme(true);
                                        }
                                    })

                                    function wujiangup(event) {
                                        currentgroup = null;
                                        clearTimeout(pressTimer);
                                        if (event.target.name == currentwujiang) return;
                                        if (currentwujiang == null) currentwujiang = event.target.name;
                                        gsap.fromTo( //右边抽屉
                                        wujianghomeright, {
                                            x: wujianghomeright.width
                                        }, {
                                            duration: 0.5,
                                            x: 0,
                                            ease: "power4.out"
                                        });
                                        if (window.currentSprite != event.target) return;
                                        if (event.target.name != 'btn_lvl1_1a' && event.target.name != 'btn_lvl1_1b') {
                                            if (currentwujiang != 'btn_lvl1_1a' && currentwujiang != 'btn_lvl1_1b') wujianghomeleft2.getChildByName(currentwujiang)
                                                .texture = gloader.resources.wujiang.textures['btn_lvl2_1'];
                                            else wujianghomeleft1.getChildByName(currentwujiang)
                                                .texture = gloader.resources.wujiang.textures['btn_lvl1_1'];
                                            event.target.texture = gloader.resources.wujiang.textures['btn_lvl2_2']
                                        } else {
                                            if (currentwujiang != 'btn_lvl1_1a' && currentwujiang != 'btn_lvl1_1b') wujianghomeleft2.getChildByName(currentwujiang)
                                                .texture = gloader.resources.wujiang.textures['btn_lvl2_1'];
                                            else wujianghomeleft1.getChildByName(currentwujiang)
                                                .texture = gloader.resources.wujiang.textures['btn_lvl1_1'];
                                            event.target.texture = gloader.resources.wujiang.textures['btn_lvl1_2'];
                                        }
                                        bbox.removeChildren();
                                        if (event.target.sec === 'all') {
                                            filteredSprites = wujiangpool;
                                        } else if (event.target.sec === 'favourite') {
                                            filteredSprites = wujiangpool.filter((sprite) => sprite.fav === true);
                                        } else {
                                            filteredSprites = wujiangpool.filter((sprite) => sprite.pack === event.target.name);
                                        }
                                        let filteredSpritess = filteredSprites.slice();
                                        // 遍历数组，对每个 secgroup 进行计数
                                        secgroups.clear();
                                        for (const item of filteredSprites) {
                                            let secgroup = item.secgroup;
                                            if (Array.isArray(secgroup)) {
                                                for (const subsecgroup of secgroup) {
                                                    if (secgroups.has(subsecgroup)) {
                                                        secgroups.get(subsecgroup)
                                                            .push(item);
                                                    } else {
                                                        secgroups.set(subsecgroup, [item]);
                                                    }
                                                }
                                            } else {
                                                if (secgroups.has(secgroup)) {
                                                    secgroups.get(secgroup)
                                                        .push(item);
                                                } else {
                                                    secgroups.set(secgroup, [item]);
                                                }
                                            }
                                        }
                                        let lgd = 0;
                                        if (btnbox.children.length > 0) {
                                            while (btnbox.children[0]) {
                                                let sprite = btnbox.removeChild(btnbox.children[0]);
                                                sprite.destroy();
                                            }
                                        }
                                        secgroups.forEach((items, secgroup) => {
                                            //势力按钮的框
                                            let sprite = new PIXI.Sprite(gloader.resources.wujiang.textures['clt_lvl3_btn_off']);
                                            sprite.scale.set(0.7 * pps);
                                            sprite.anchor.set(0.5)
                                            sprite.position.set(100 * ppw, 41 * pph)
                                            sprite.y += lgd * 70 * pph;
                                            sprite.name = secgroup;
                                            lgd++;
                                            //文字
                                            let text = new PIXI.Text(rzshtranslate[secgroup], {
                                                fontFamily: 'shousha',
                                                fontSize: 28,
                                                fill: '#FFE4B5'
                                            });
                                            text.anchor.set(0.5);
                                            text.y = -12 * pph;
                                            //数量
                                            let text2 = new PIXI.Text(items.length + '/' + items.length, {
                                                fontFamily: 'shousha',
                                                fontSize: 18,
                                                fill: '#FFE4B5'
                                            });
                                            text2.anchor.set(0.5);
                                            text2.y = 16 * pph;
                                            sprite.addChild(text, text2);
                                            sprite.interactive = true;
                                            sprite.on('pointerup', groupup)
                                            sprite.on('pointerdown', groupdown)
                                            btnbox.addChild(sprite);

                                        });
                                        if (renderProcess != null) cancelAnimationFrame(renderProcess);
                                        addSprites(filteredSpritess, bbox);
                                        currentwujiang = event.target.name;
                                        //PIXI.Scrollbox滑动盒子刷新
                                        wujiangscrollleft.update();
                                        wujiangscrollright.update();
                                        wujiangscrollgroup.update();
                                    }
                                    //console.log(lib.config.characters)
                                    function wujiangdown(event) {
                                        window.currentSprite = event.target;
                                        /*¥PIXI.sound.play¥*/window.tipsClick('WinButton');
                                        if (isinputs == true) return;
                                        if (event.target.name && event.target.name != 'btn_lvl1_1b' && event.target.name != 'btn_lvl1_1a') {
                                            pressTimer = setTimeout(() => {
                                                if (!lib.config.characters.contains(event.target.name)) {
                                                    event.target.filters = null;
                                                    game.saveConfig('characters', lib.config.characters.add(event.target.name))
                                                } else {
                                                    event.target.filters = [characterclose];
                                                    game.saveConfig('characters', lib.config.characters.remove(event.target.name))
                                                }
                                            }, 1000)
                                        }


                                    }

                                    function groupup(event) {
                                        if (window.currentSprite != event.target) return;
                                        bbox.removeChildren();
                                        if (currentgroup == event.target.name) {
                                            let filteredSpritesg = filteredSprites.slice();
                                            if (renderProcess != null) cancelAnimationFrame(renderProcess);
                                            addSprites(filteredSpritesg, bbox);
                                            event.target.texture = gloader.resources.wujiang.textures['clt_lvl3_btn_off'];
                                            currentgroup = null;
                                        } else {
                                            event.target.texture = gloader.resources.wujiang.textures['clt_lvl3_btn_fg'];
                                            if (currentgroup != null && btnbox.getChildByName(currentgroup)) btnbox.getChildByName(currentgroup)
                                                .texture = gloader.resources.wujiang.textures['clt_lvl3_btn_off'];
                                            currentgroup = event.target.name;
                                            let filteredSpritesk = filteredSprites.filter((sprite) => {
                                                return sprite.secgroup === event.target.name || (Array.isArray(sprite.secgroup) && sprite.secgroup.includes(event.target.name));
                                            })
                                                .slice();
                                            if (renderProcess != null) cancelAnimationFrame(renderProcess);
                                            addSprites(filteredSpritesk, bbox);
                                        }
                                        
                                        //PIXI.Scrollbox滑动盒子刷新
                                        wujiangscrollleft.update();
                                        wujiangscrollright.update();
                                        wujiangscrollgroup.update();
                                    }

                                    function groupdown(event) {
                                        window.currentSprite = event.target;

                                    }

                                    function addSprites(filteredSpritess, bbox) {
                                        let ROW_SIZE = 4; // 每行放置的精灵数量
                                        let X_SPACING = 179 * ppw; // 精灵在x轴上的间隔
                                        let Y_SPACING = 192 * pph; // 精灵在y轴上的间隔
                                        let rzx = 2 * ppw; // x坐标
                                        let rzy = 14 * pph; // y坐标	
                                        let rzcounter = 0; // 当前行已经放置的精灵数量
                                        function addSprite() {
                                            const sprite = filteredSpritess.shift();
                                            if (!sprite) {
                                                renderProcess = null;
                                                return
                                            }
                                            sprite.x = rzx; // 设置 X 位置
                                            sprite.y = rzy; // 设置 Y 位置
                                            bbox.addChild(sprite); // 将精灵添加到 bbox 容器中
                                            rzx += X_SPACING; // 更新 X 位置
                                            rzcounter++; // 更新计数器
                                            if (rzcounter === ROW_SIZE) { // 如果已经添加了一行精灵
                                                rzx = 2 * ppw; // 重置 X 位置
                                                rzy += Y_SPACING; // 更新 Y 位置
                                                rzcounter = 0; // 重置计数器
                                            }
                                            renderProcess = requestAnimationFrame(addSprite);
                                        }
                                        renderProcess = requestAnimationFrame(addSprite);
                                    }

                                    function wujiangdonghua() {
                                        gsap.fromTo( //上面抽屉
                                        wujianghometop, {
                                            y: -wujianghometop.height / 2
                                        }, {
                                            duration: 0.5,
                                            y: 0,
                                            ease: "power4.out"
                                        });
                                        gsap.fromTo( //左边抽屉
                                        wujianghomeleft, {
                                            x: -wujianghomeleft.width
                                        }, {
                                            duration: 0.5,
                                            x: 0,
                                            ease: "power4.out"
                                        });
                                        gsap.fromTo( //右边抽屉
                                        wujianghomeright, {
                                            x: wujianghomeright.width
                                        }, {
                                            duration: 0.5,
                                            x: 0,
                                            ease: "power4.out"
                                        });
                                        gsap.fromTo( //下面抽屉
                                        wujiangmenubtn, {
                                            y: pixiapp.screen.height
                                        }, {
                                            duration: 0.5,
                                            y: pixiapp.screen.height - wujiangmenubtn.height,
                                            ease: "power4.out"
                                        });
                                    }
                                }
                                //匹配转盘
                                const ploader = new PIXI.Loader();
                                ploader.add('zhuanpanBG', lib.assetURL + 'extension/如真似幻/images/zhuanpanbg.jpg');
                                ploader.add('zhuanpan', lib.assetURL + 'extension/如真似幻/spine/Ot/xuanzhuan.skel');
                                //ploader.add('dayuanshuai', lib.assetURL + 'extension/如真似幻/spine/Ot/大元帅/jinchang_dayuanshuai.skel');
                                //ploader.add('dajiangjun', lib.assetURL + 'extension/如真似幻/spine/Ot/大元帅/jinchang_dajiangjun.skel');
                                
                                ploader.add('duijue', lib.assetURL + 'extension/如真似幻/spine/duijue.json');
                                ploader.add('xiaosha', lib.assetURL + 'extension/如真似幻/images/xiaosha.png');
                                ploader.add('jbg', lib.assetURL + 'extension/如真似幻/images/jbg.png');
                                //ploader.add('jbg2', lib.assetURL + 'extension/如真似幻/images/jbg2.png');
                                for(var g=0;g<window.guanjies.length;g++) {
                                    var gj=window.guanjies[g];
                                    ploader.add('jj_'+gj, lib.assetURL + 'extension/如真似幻/images/guanjie/jj_'+gj+'.png');
                                    ploader.add('gg_'+gj, lib.assetURL + 'extension/如真似幻/spine/Ot/guanjie/'+gj+'/spine.skel');
                                }
                                let PlayerName;
                                if(window.playerNickName&&window.playerNickName['all']) {
                                    PlayerName = window.playerNickName['all'];
                                }else {
                                    PlayerName = ['女宝(rbq)', '夕酱', '戴夫', 'EngJ.K', '文姬', '黄小花', '风回太初', '🥕', '无中', '太白', '洛神', '路卡', '幸运女神','朝夕盼兮','地老天荒你会信嘛','貌美如花红烧肉','心伤','旧梦残颜','绣花男神','君惜沂瑾','一人一心一空城','泽畔东篱','故事裏沒我','故莋颩蕥','tia紫竹情','月光爱人','一次不忠终生不用','向日葵的执着','寡欢ペ','宅','願時光待妳安好','梦里梦惊梦','姌冰','跋千山','门庭若市的街角','向日葵的执着','对她痴','籹子請蒥荹','顾瑶韵','水晶之音','ｂａｂｙ☆娃','江微雨','泪湿罗衣','半身死灵','純情ベ小骚包','妖精的绣舞','遗失的白狐','星星熄灯了','我打江南走过','一瞬间缝补的情','老巷钟声','孤己','青瓷埋骨灰骨','雾中熊','王的羁绊','风有归','扶苏','折梅千山','优雅的小猪','嫑忈','闲云池中敛','芷舞影裳','三寸海屿日光','语风','狂扁特点','当里个当','滴不尽相思','●菟子','在苦也不哭','岛川奈','灬 始终隐身','补天裂','情感导师','陪我笑陪我闹','落日下的温柔','复仇之王','如烟长廊','骷髅','伴我暖','芥末盖泪','酒肆饮几壶','遲暮、花未央','重逢','半夜成仙','纸鸢','痴爱','忆暖','曲终散','清酒孤欢','浅笑伤无痕','花落╮君离开','转让半張床','丶陌尕鬼','国下着雪ゃ','▲゛夜已渐冷','寂寞如风','至死都卖萌','户川柰子','明白了就放弃吧','随风而去','十夏九黎那么凉','對你的依賴','牧野留姬','上纲上线','醉话酒烈','蜜棕马尾','月野兔','馨彤','凉己未安','語無い倫次づ','旧城凉','我他妈兔了','临风纵欢','闲揽烟雨','窗边的豆豆豆','忆往昔惜流年','仙狸','奶兔大魔王','汐へ萌','低吟归去兮','吃德芙没黑丝带','感到悲伤','桀骜不驯','昨日恋人','晚安我爱的他','心心相随','随疯奔跑','牌去人安乐','风吹蛋蛋凉','守护大吴疆土','凉企蒸蒸日上','你有点极端了','我是麻花疼','有没有搞错','豹子头零充','❛˓◞˂̵✧','꒰ *•ɷ•* ꒱','(இωஇ )','(๑•̀ㅁ•́ฅ)','(⌯︎¤̴̶̷̀ω¤̴̶̷́)✧︎','ʕ  •ᴥ•ʔ……','ʕ⊝⍛⊝ʔ**','「◦㉨◦」',' (ꐦ°᷄д°᷅)','ε٩(๑> ₃ <)۶з'];
                                }
                                Array.prototype.randomGetremove = function() {
                                    var a = this.randomGet();
                                    this.remove(a);
                                    return a;
                                };
                                let pipeihome = new PIXI.Container();
                                pipeihome.on('added', () => {
                                    uibg.texture = ploader.resources.zhuanpanBG.texture;
                                    let timeScale = 4;//3.6

                                    function update() {
                                        if (timeScale > 1) {
                                            timeScale -= 0.02;
                                            findpipei.state.timeScale = timeScale;
                                            renderProcess = requestAnimationFrame(update);
                                        } else {
                                            cancelAnimationFrame(renderProcess);
                                            renderProcess = null
                                        }
                                    }
                                    renderProcess = requestAnimationFrame(update);
                                    let plength = lib.config.player_number;
                                    if(game.storyBgMode=='paiwei'&&game.rzPaiweiType) {
                                        plength=game.rzPaiweiType+1;
                                    }
                                    window.playerNickName['rzsh']=[];
                                    window.rzsh_djj={};
                                    window.rzsh_lv={};
                                    findpipei.state.tracks[0].onComplete = function() {
                                        if (renderProcess != null) {
                                            cancelAnimationFrame(renderProcess);
                                            renderProcess = null;
                                        }
                                        var gjpec=[];
                                        for (var s=1;s<=11;s++) {
                                            for (var b=0;b<s+3;b++) {
                                                gjpec.push(11-s);
                                            }
                                        }
                                        for (let i = 0; i < plength; i++) {
                                            //var djj=false;
                                            //if (i != 0 && Math.random()*(plength-1)>1) djj=true;
                                            var guanjie=window.guanjies[gjpec.randomGet()];
                                            if(i==0) guanjie='dayuanshuai';
                                            var dengji=Math.min(220,100+window.getNumGuanjie(guanjie)*10+Math.floor(Math.random()*50));
                                            if(i==0) dengji=220;
                                            if(game.storyBgMode=='paiwei'&&i==Math.floor(plength/2)) {
                                                /*let duijue=new PIXI.spine.Spine(ploader.resources.duijue.spineData);
                                                duijue.scale.set(0.71);
                                                duijue.x=0.5*pixiapp.screen.width;
                                                duijue.y=0.4*pixiapp.screen.height;
                                                duijue.state.setAnimation(0, 'animation', true);
                                                pipeihome.addChild(duijue);*/
                                                let player=new PIXI.spine.Spine(ploader.resources.duijue.spineData);
                                                player.scale.set(0.71);
                                                player.state.setAnimation(0, 'animation', true);
                                                
                                            setTimeout(function() {
                                                pipeihome.addChild(player);
                                                //	pipeihome.setChildIndex(findpipei, i)
                                                gsap.fromTo(player, {
                                                    x: pixiapp.screen.width * 0.5,
                                                    y: pixiapp.screen.height
                                                }, {
                                                    duration: 0.6,
                                                    x: pixiapp.screen.width * (i + 1) / (plength + 1),
                                                    y: 0.4 * pixiapp.screen.height,
                                                    ease: "power4.out",
                                                    onComplete: function() {
                                                    }
                                                });
                                            }, 200 * i);
                                                continue;
                                            }
                                            //创造玩家
                                            let player = new PIXI.Sprite(ploader.resources.jbg.texture);
                                            player.anchor.set(0.5);
                                            if (plength != 8) player.scale.set(0.8);
                                            else player.scale.set(0.65);

                                            //小杀图片
                                            if(window.rzshcharactersimg&&window.rzshcharactersimg.length) {
                                                var imgpl=window.rzshcharactersimg.randomGet();
                                                //alert_old(imgpl);
                                            }else {
                                                var imgpl=rzshcharacters.randomGet();
                                            }
                                            //alert_old(gloader.resources[imgpl].texture);
                                            let player1_1 = new PIXI.Sprite(gloader.resources[imgpl].texture);
                                            player1_1.width = 138;
                                            player1_1.height = 253;
                                            player1_1.anchor.set(0.5);
                                            player1_1.y = -35;
                                            //官阶入场
                                            //var yuanshuai = ploader.resources.dayuanshuai.spineData;
                                            var yuanshuai = ploader.resources['gg_'+guanjie].spineData;
                                            let guanjieenter1 = new PIXI.spine.Spine(yuanshuai);
                                            guanjieenter1.state.setAnimation(0, 'play1', false);
                                            guanjieenter1.scale.set(1.8);
                                            if (i == plength - 1) guanjieenter1.state.tracks[0].onComplete = function() {
                                                setTimeout(rzshkz, 100)
                                            };
                                            //var jbgs = ploader.resources.jbg2.texture;
                                            var jbgs = ploader.resources['jj_'+guanjie].texture;
                                            let playerB = new PIXI.Sprite(jbgs);
                                            //playerB.anchor.set(0.5,0.5);
                                            playerB.x = -playerB.width / 2;
                                            playerB.y = -playerB.height / 2;
                                            //名字和VIPd的框，后面要换成文理框
                                            let player1_2 = new PIXI.Container();
                                            //vip
                                            let player1_2_1 = new PIXI.Sprite(yloader.resources.uivip.textures['vip' + [1, 2, 3, 4, 5, 6, 7].randomGet()]);
                                            if (i == 0) player1_2_1.texture = yloader.resources.uivip.textures['vip7']
                                            player1_2_1.anchor.set(0.5);
                                            player1_2_1.x = -45;
                                            player1_2_1.y = 110;
                                            //LV等级
                                            let playerLv = new PIXI.Text('Lv'+dengji, {
                                                fontSize: 25,
                                                fill: '#DAA520',
                                                fontFamily: 'shousha'
                                            });
                                            playerLv.anchor.set(0,0.5)
                                            playerLv.y = 55;
                                            playerLv.x = -80;
                                            //逃率
                                            let playerTao = new PIXI.Text('逃率：0%', {
                                                fontSize: 17,
                                                fill: '#DAA520',
                                                fontFamily: 'shousha'
                                            });
                                            playerTao.anchor.set(0,0.5)
                                            playerTao.y = 58;
                                            playerTao.x = 0;
                                            playerTao.text = '逃率：'+Math.floor(30*Math.random())+'%';
                                            //大将军
                                            let playerDJJ = new PIXI.Text('  大元帅', {
                                                fontSize: 25,
                                                fill: '#DAA520',
                                                fontFamily: 'shousha'
                                            });
                                            playerDJJ.text = '  '+window.translateGuanjie(guanjie);
                                            playerDJJ.anchor.set(0.5)
                                            playerDJJ.y = 83;
                                            //玩家名字
                                            let player1_2_2 = new PIXI.Text(lib.config.connect_nickname, {
                                                fontSize: 20,
                                                fill: '#F4F4F4',
                                                fontFamily: 'shousha'
                                            });
                                            var nameme;
                                            if (i != 0) {
                                                nameme=PlayerName.randomGetremove();
                                                if(game.storyBgMode=='paiwei'&&plength==4&&i==1) {
                                                    window.rzsh_friendName=nameme;
                                                }
                                                window.playerNickName['rzsh'].push(nameme);
                                                player1_2_2.text = nameme;
                                            }
                                            
                                            //window.rzsh_djj[nameme]=djj?'dajiangjun':'dayuanshuai';
                                            window.rzsh_djj[nameme]=guanjie;
                                            window.rzsh_lv[nameme]=dengji;
                                            player1_2_2.anchor.set(0.5)
                                            player1_2_2.y = 110;
                                            //微调不遮挡VIP
                                            player1_2_2.x = 20 - 5;
                                            player1_2.addChild(playerLv, playerTao, player1_2_1, player1_2_2, playerDJJ);
                                            player.addChild(player1_1, playerB, player1_2);
                                            player.position.set(0.5 * pixiapp.screen.width, pixiapp.screen.height);

                                            setTimeout(function() {
                                                pipeihome.addChild(player);
                                                //	pipeihome.setChildIndex(findpipei, i)
                                                gsap.fromTo(player, {
                                                    x: pixiapp.screen.width * 0.5,
                                                    y: pixiapp.screen.height
                                                }, {
                                                    duration: 0.6,
                                                    x: pixiapp.screen.width * (i + 1) / (plength + 1),
                                                    y: 0.4 * pixiapp.screen.height,
                                                    ease: "power4.out",
                                                    onComplete: function() {
                                                        player.addChild(guanjieenter1)
                                                    }
                                                });
                                            }, 200 * i);
                                        }
                                    }
                                    //匹配转轮声
                                //setTimeout(function() {
                                    window.tipsClick('PiPei');
                                //},500);
                                if(lib.config.rzEpicSpine) {

                                    // 小贴士
                                    /*let tips = [
                                        '寻找对手中,不要着急哦~',
                                        '回合结束时,能保留的手牌数不能超过当前体力值',
                                        '[万箭齐发] : ( 锦囊 ) 所有人,展现你灵巧的身姿吧',
                                        '[无懈可击] : ( 锦囊 ) 休想得逞'
                                    ];
                                    // 添加新的小贴士
                                    tips.push(
                                        '[桃园结义] : ( 锦囊 ) 大家来一起喝一杯',
                                        '[诸葛连弩] : ( 装备 ) 接下来我要疯狂的杀戮了',
                                        '[丈八蛇矛] : ( 装备 ) 用这两张牌去换张【杀】吧',
                                        '[仁王盾] : ( 装备 ) 黑色的【杀】在我面前毫无用处',
                                        '[火攻] : ( 锦囊 ) 出示你的牌，然后我会燃烧你',
                                        '[雌雄双股剑] : ( 装备 )你是弃一张牌呢还是让我多一张牌呢',
                                        '[青釭剑] : ( 装备 ) 你的防具对我来说毫无用处，哈哈哈',
                                        '[南蛮入侵] : ( 锦囊 ) 所有人,亮出你的兵器吧'
                                    );*/
                                    let tips = [
                                        '寻找对手中，不要着急哦~',
                                        '回合结束时，能保留的手牌数不能超过当前体力值',
                                        '【万箭齐发】： ( 锦囊 ) 所有人，展现你灵巧的身姿吧',
                                        '【无懈可击】： ( 锦囊 ) 休想得逞'
                                    ];
                                    // 添加新的小贴士
                                    tips.push(
                                        '【桃园结义】： ( 锦囊 ) 大家来一起喝一杯',
                                        '【诸葛连弩】： ( 装备 ) 接下来我要疯狂的杀戮了',
                                        '【丈八蛇矛】： ( 装备 ) 用这两张牌去换张【杀】吧',
                                        '【仁王盾】： ( 装备 ) 黑色的【杀】在我面前毫无用处',
                                        '【火攻】： ( 锦囊 ) 出示你的牌，然后我会燃烧你',
                                        '【雌雄双股剑】： ( 装备 )你是弃一张牌呢还是让我多一张牌呢',
                                        '【青釭剑】： ( 装备 ) 你的防具对我来说毫无用处，哈哈哈',
                                        '【南蛮入侵】： ( 锦囊 ) 所有人，亮出你的兵器吧'
                                    );
                                    function getRandomTip() {
                                        return tips[Math.floor(Math.random() * tips.length)];
                                    }
                                    let randomTip = new PIXI.Text(getRandomTip(), {
                                        fontSize: 22,
                                        fill: '#DAA520',
                                        fontFamily: 'shousha'
                                    });
                                    randomTip.anchor.set(0.5);
                                    randomTip.x = 0;
                                    randomTip.y = -20;
                                    findpipei.addChild(randomTip);
                                    setTimeout(function() {
                                        randomTip.text = getRandomTip();
                                    }, 2000);

                                }else {

                                    let tips = new PIXI.Text('正在为您匹配中。。。', {
                                        fontSize: 22,
                                        fill: '#DAA520',
                                        fontFamily: 'shousha'
                                    });
                                    tips.anchor.set(0.5);
                                    tips.x = 0;
                                    tips.y = -20;
                                    findpipei.addChild(tips);

                                }

                                    /*	let player1 = new PIXI.Sprite(ploader.resources.jbg.texture);
									player1.anchor.set(0.5);
									player1.scale.set(0.8);
									let player2 = new PIXI.Sprite(ploader.resources.jbg.texture);
									player2.anchor.set(0.5);
									player2.scale.set(0.8);
									let player3 = new PIXI.Sprite(ploader.resources.jbg.texture);
									player3.anchor.set(0.5);
									player3.scale.set(0.8);
									//小杀
									let player1_1 = new PIXI.Sprite(ploader.resources.xiaosha.texture);
									player1_1.anchor.set(0.5);
									player1_1.y = -35;
									let player2_1 = new PIXI.Sprite(ploader.resources.xiaosha.texture);
									player2_1.anchor.set(0.5);
									player2_1.y = -35;
									let player3_1 = new PIXI.Sprite(ploader.resources.xiaosha.texture);
									player3_1.anchor.set(0.5);
									player3_1.y = -35;
									//官阶入场
									let guanjieenter1 = new PIXI.spine.Spine(ploader.resources.dayuanshuai.spineData);
									let guanjieenter2 = new PIXI.spine.Spine(ploader.resources.dayuanshuai.spineData);
									let guanjieenter3 = new PIXI.spine.Spine(ploader.resources.dayuanshuai.spineData);
									guanjieenter1.state.setAnimation(0, 'play1', false);
									guanjieenter2.state.setAnimation(0, 'play1', false);
									guanjieenter3.state.setAnimation(0, 'play1', false);
									guanjieenter1.scale.set(1.8);
									guanjieenter2.scale.set(1.8);
									guanjieenter3.scale.set(1.8);
									guanjieenter3.state.tracks[0].onComplete = function () {
										setTimeout(rzshkz, 100)
									};
									//名字和VIPd的框，后面要换成文理框
									let player1_2 = new PIXI.Container();
									let player2_2 = new PIXI.Container();
									let player3_2 = new PIXI.Container();
									//vip
									let player1_2_1 = new PIXI.Sprite(yloader.resources.uivip.textures['vip7']);
									player1_2_1.anchor.set(0.5);
									player1_2_1.x = -45;
									player1_2_1.y = 110;
									let player2_2_1 = new PIXI.Sprite(yloader.resources.uivip.textures['vip7']);
									player2_2_1.anchor.set(0.5);
									player2_2_1.x = -45;
									player2_2_1.y = 110;
									let player3_2_1 = new PIXI.Sprite(yloader.resources.uivip.textures['vip7']);
									player3_2_1.anchor.set(0.5);
									player3_2_1.x = -45;
									player3_2_1.y = 110;
									//玩家名字
									let player1_2_2 = new PIXI.Text(lib.config.connect_nickname, { fontSize: 28, fill: '#DAA520', fontFamily: 'shousha' });
									player1_2_2.anchor.set(0.5)
									player1_2_2.y = 110;
									let player2_2_2 = new PIXI.Text('女宝', { fontSize: 28, fill: '#DAA520', fontFamily: 'shousha' });
									player2_2_2.anchor.set(0.5)
									player2_2_2.y = 110;
									let player3_2_2 = new PIXI.Text('夕', { fontSize: 28, fill: '#DAA520', fontFamily: 'shousha' });
									player3_2_2.anchor.set(0.5)
									player3_2_2.y = 110;
									player1_2.addChild(player1_2_1, player1_2_2);
									player2_2.addChild(player2_2_1, player2_2_2);
									player3_2.addChild(player3_2_1, player3_2_2);
									player1.addChild(player1_1, player1_2);
									player2.addChild(player2_1, player2_2);
									player3.addChild(player3_1, player3_2);
									player1.position.set(0.5 * pixiapp.screen.width, pixiapp.screen.height);
									player2.position.set(0.5 * pixiapp.screen.width, pixiapp.screen.height);
									player3.position.set(0.5 * pixiapp.screen.width, pixiapp.screen.height);
									//小贴士
									let tips = new PIXI.Text('无名杀是免费游戏，如真似幻是免费扩展。', { fontSize: 22, fill: '#DAA520', fontFamily: 'shousha' });
									tips.anchor.set(0.5);
									tips.x = 0;
									tips.y = -20;
									findpipei.addChild(tips);*/
                                    /*findpipei.state.tracks[0].onComplete = function () {
										if (renderProcess != null) {
											cancelAnimationFrame(renderProcess);
											renderProcess = null;
										}
										pipeihome.addChild(player1);
										pipeihome.setChildIndex(findpipei, 1)
										gsap.fromTo(player1,
											{ x: pixiapp.screen.width * 0.5, y: pixiapp.screen.height },
											{ duration: 0.6, x: 0.3 * pixiapp.screen.width, y: 0.3 * pixiapp.screen.height, ease: "power4.out", onComplete: function () { player1.addChild(guanjieenter1) } });
										setTimeout(function () {
											pipeihome.addChild(player2)
											pipeihome.setChildIndex(findpipei, 2)
											gsap.fromTo(player2,
												{ x: pixiapp.screen.width * 0.5, y: pixiapp.screen.height },
												{ duration: 0.6, x: 0.5 * pixiapp.screen.width, y: 0.3 * pixiapp.screen.height, ease: "power4.out", onComplete: function () { player2.addChild(guanjieenter2) } });
										}, 200);
										setTimeout(function () {
											pipeihome.addChild(player3);
											pipeihome.setChildIndex(findpipei, 3)
											gsap.fromTo(player3,
												{ x: pixiapp.screen.width * 0.5, y: pixiapp.screen.height },
												{ duration: 0.3, x: 0.7 * pixiapp.screen.width, y: 0.3 * pixiapp.screen.height, ease: "power4.out", onComplete: function () { player3.addChild(guanjieenter3) } });
										}, 400);
									}*/
                                });

                                function setupp() {
                                    console.timeEnd('p加载完毕')
                                    game.isUnlockDialogDo('p');
                                    findpipei = new PIXI.spine.Spine(ploader.resources.zhuanpan.spineData);
                                    findpipei.x = 0.5 * pixiapp.screen.width;
                                    findpipei.y = pixiapp.screen.height;
                                    findpipei.scale.set(0.7);
                                    findpipei.state.setAnimation(0, 'action2', false);
                                    window.zhuanzhuanxiaoshi=function(num,sum,func){
                                        pipeihome.alpha=(sum-num)/sum;
                                        if(sum>num) {
                                            setTimeout(function() {
                                                window.zhuanzhuanxiaoshi(num+1,sum,func);
                                            },10);
                                        }else {
                                            if(func) func();
                                        }
                                    }
                                    pipeihome.addChild(findpipei);
                                    //创造匹配到的敌人						
                                }


                                function oppeen(container,smooth) {
                                    window.isOnhide = true;
                                    if(container!=wujianghome&&container!=paiweihome) {
                                    if(window.rz_shenfen_node) {
                                        window.rz_shenfen_node.forEach(node=>{
                                            node.style.transition='all 0.2s';
                                            setTimeout(function(){
                                                node.style.opacity=0;
                                                node.style['pointer-events']='none';
                                                setTimeout(function(){
                                                    node.remove();
                                                },2000);
                                            },0);
                                        });
                                    }
                                    if(window.rz_shenfen_node2) {
                                        var node=window.rz_shenfen_node2;
                                        node.style.transition='all 0.2s';
                                        setTimeout(function(){
                                            node.style.opacity=0;
                                            node.style['pointer-events']='none';
                                            setTimeout(function(){
                                                node.remove();
                                            },2000);
                                        },0);
                                    }
                                    }
                                    pixiapp.stage.children.forEach(function(child) {
                                        if (child !== uibg) {
                                          if(!smooth) {
                                            pixiapp.stage.removeChild(child);
                                          }else {
                                            child.func=function(num,sum){
                                                child.alpha=(sum-num)/sum;
                                                if(num<sum) {
                                                    setTimeout(function(){
                                                        child.func(num+1,sum);
                                                    },3);
                                                }else {
                                                    pixiapp.stage.removeChild(child);
                                                }
                                            }
                                            child.func(0,20);
                                          }
                                        }
                                    });
                                    pixiapp.stage.addChild(container);
                                    window.container = container;
                                }

                                function onButtonUpx(event) {
                                    if (window.currentSprite != event.target) return;
                                    let set_dialog = settingbg.getChildByName('set_dialog')
                                    window.currentSprite = null;
                                    var tianti_versus_two=lib.config['tianti_versus_two'];
                                    var tianti_copy=JSON.parse(JSON.stringify(lib.config['tianti_versus_two']));
                                    if(tianti_versus_two) {
                                        var xxingnum0 = tianti_versus_two.xxingnum;
                                        if(!xxingnum0) var xxingnum0=0;
                                    }else {
                                        var xxingnum0=0;
                                    }
                                    //alert_old(event.target.name);
                                    var zeroStarNum=[0,2,4,6,10,14,18,23,28,33,38,43,48,53,58,63,68,73,78,83,88,98];
                                    switch (event.target.name) {
                                        case "solobtn":
                                            game.storyBgMode='paiwei';
                                            game.rzPaiweiType=2;
                                            game.saveConfig('rz_paiWeiError',tianti_copy);
                                            game.saveConfig('rz_isPaiWei',true);
                                            game.saveConfig('rz_paiWeiTip',true);
                                            if(window.helasisy_getPaiWeiInfo('level')>1) {
                                                game.saveConfig('rz_paiWeiCount',tianti_versus_two.count);
                                                game.rz_paiWeiDec=1;
                                                tianti_versus_two.count=0;//Math.floor(tianti_versus_two.count/3);
                                                tianti_versus_two.xxingnum--;
                                                game.saveConfig('tianti_versus_two',tianti_versus_two);
                                                /*if(zeroStarNum.contains(tianti_versus_two.xxingnum)) {
                                                    game.saveConfig('tianti_0星', true);
                                                }else {
                                                    game.saveConfig('tianti_0星', false);
                                                }*/
                                            }else {
                                                game.rz_paiWeiDec=0;
                                            }
                                            entermodegame('single', 'normal');
                                            //if (window.isOnhide == false) rzshkz();
                                            //修复：一触即发
                                            //rzshkz();
                                                    setTimeout(function(){
                                                        if (lib.config.zhuanzhuan !='off') eee();
                                                        else rzshkz();
                                                    },0);
                                                    paiweihome.showfunc=function(num,sum){
                                                        if(!paiweihome) return;
                                                        paiweihome.alpha=(sum-num)/sum;
                                                        if(sum>num){
                                                            setTimeout(function(){
                                                                paiweihome.showfunc(num+1,sum);
                                                            },10);
                                                        }
                                                    }
                                                    paiweihome.showfunc(0,10);
                                            break;
                                        case "versustwobtn":
                                            game.storyBgMode='paiwei';
                                            game.rzPaiweiType=4;
                                            game.saveConfig('rz_paiWeiError',tianti_copy);
                                            game.saveConfig('rz_isPaiWei',true);
                                            game.saveConfig('rz_paiWeiTip',true);
                                            if(window.helasisy_getPaiWeiInfo('level')>1) {
                                                game.saveConfig('rz_paiWeiCount',tianti_versus_two.count);
                                                game.rz_paiWeiDec=1;
                                                tianti_versus_two.count=0;//Math.floor(tianti_versus_two.count/3);
                                                tianti_versus_two.xxingnum--;
                                                game.saveConfig('tianti_versus_two',tianti_versus_two);
                                                /*if(zeroStarNum.contains(tianti_versus_two.xxingnum)) {
                                                    game.saveConfig('tianti_0星', true);
                                                }else {
                                                    game.saveConfig('tianti_0星', false);
                                                }*/
                                            }else {
                                                game.rz_paiWeiDec=0;
                                            }
                                            entermodegame('versus', 'two');
                                            //if (window.isOnhide == false) rzshkz();
                                            //修复：一触即发
                                            //rzshkz();
                                                    setTimeout(function(){
                                                        if (lib.config.zhuanzhuan !='off') eee();
                                                        else rzshkz();
                                                    },0);
                                                    paiweihome.showfunc=function(num,sum){
                                                        if(!paiweihome) return;
                                                        paiweihome.alpha=(sum-num)/sum;
                                                        if(sum>num){
                                                            setTimeout(function(){
                                                                paiweihome.showfunc(num+1,sum);
                                                            },10);
                                                        }
                                                    }
                                                    paiweihome.showfunc(0,10);
                                            break;
                                        case "menu1":
                                            /*¥PIXI.sound.play¥*/window.tipsClick('WinButton')
                                            uihome.addChild(menuhome)
                                            break;
                                        case "rzclose":
                                            /*¥PIXI.sound.play¥*/window.tipsClick('Report01')
                                            if (window.isOnhide != true) closee();
                                            break;
                                        case "pubbtn_close":
                                            /*¥PIXI.sound.play¥*/window.tipsClick('PopUp')
                                            uihome.removeChild(menuhome)
                                            break;
                                        case "menuwu3":
                                            //退出到登录界面
                                            localStorage.removeItem('Network');
                                            xloader.destroy();
                                            yloader.destroy();
                                            zloader.destroy();
                                            pixiapp.destroy(true);
                                      //      if (window.dyapp) window.dyapp.destroy(true);
                                            window.location.href = lib.assetURL + 'extension/如真似幻/html/rzsh.html';
                                            break;
                                        case "menusi5":
                                            uihome.removeChild(menuhome)
                                            uihome.addChild(settinghome)
                                            break;
                                        case "menuyi5":
                                            confirms("是否重置本赛季天梯数据？\n（重新启动后生效）",false,function(){
                                                game.saveConfig('tianti_versus_two', {
                                                    count: 0,
                                                    top: 40, //青铜的士气上限
                                                    win: 0,
                                                    fail: 0,
                                                    num: 0,
                                                    top_win: 0,
                                                    win_Cty: 0,
                                                    xxingnum: 0,
                                                });
                                                game.saveConfig('rz_paiWeiTip',false);
                                                game.rz_paiWeiDec=0;
                                                game.saveConfig('rz_paiWeiCount',false);
                                            });
                                            break;
                                        case "menuyi6":
                                            var menuList=[
                                                ['允许头像切换','rzLock_tou'],
                                                ['允许菜单设置','rzLock_set'],
                                                ['高亮可点按钮','rzLock_nod'],
                                                ['开启聊天大厅','rzLock_say'],
                                                ['弹出惩罚提示','rzLock_dec'],
                                                ['热门收藏武将','rzLock_jsc'],
                                                ['热门最近武将','rzLock_jzj'],
                                                ['连点调戏骨骼','rzLock_spn'],
                                            ];
                                            window.rzsh_menuLock=(num)=>{
                                                if(lib.config[menuList[num][1]]) {
                                                    var menu=['上一项','开启','下一项'];
                                                    var zt='✘';
                                                }else {
                                                    var menu=['上一项','禁用','下一项'];
                                                    var zt='✔';
                                                }
                                                var show='  ☞ ['+(num+1)+'/'+menuList.length+'] '+menuList[num][0]+'：'+zt;
                                                //〔'+(num+1)+'/'+rzsh_ideimglist.length+'〕;
                                                navigator.notification.confirm(
									    			show,
										    		function(index){
										    			switch(index){
											    		    case 0:
											    		    window.tipsClick('Report01');//离开
											    		    break;
											    		    
											    		    case 1:
											    		    if(num<=0) {
											    		        var next=menuList.length-1;
											    		    }else {
											    		        var next=num-1;
											    		    }
											    		    window.rzsh_menuLock(next);
											    		    window.tipsClick('TinyButton');//切换
											    		    break;
								    					    
								    					    case 2:
								    					    var ideitem=menuList[num];
								    					    if(lib.config[menuList[num][1]]) {
											    			    game.saveConfig([menuList[num][1]],false);
											    			    if(menuList[num][1]=='rzLock_spn') localStorage.setItem('rzLock_spn','off');
											    			}else {
											    			    game.saveConfig([menuList[num][1]],true);
											    			    if(menuList[num][1]=='rzLock_spn') localStorage.setItem('rzLock_spn','on');
											    			}
												    		window.rzsh_menuLock(num);
												    		window.tipsClick('TinyWindow');//开关
												    		break;
												    		
												    		case 3: 
										        			if(num>=menuList.length-1) {
											    		        var next=0;
											    		    }else {
											    		        var next=num+1;
											    		    }
											    		    window.rzsh_menuLock(next);
											    		    window.tipsClick('TinyButton');//切换
								    					    break;
												    		//case 3:navigator.app.exitApp();break;
											    		}
											    	},
										    		'禁用功能',
								    				menu
								    			);
								    	    }
								    	    window.rzsh_menuLock(0);
                                            break;
                                        case "menusan4":
                                            var on=localStorage.getItem('liuli_tenUIfix');
                                            if(on&&on=='fix') {
                                                var str='滴滴~ 如真似幻修复模式已开启！';
                                                var click='关闭修复模式';
                                                var save='off';
                                            }else {
                                                var str='序言：\n\n　　当对局落幕，你无奈地目睹着如真似幻的大厅重归简陋的原始页面，而游戏对局则在接踵而至的十周年UI报错中逐渐沉沦。麻木的手指在重启键上留下了深深的印记，你是否曾感叹这无尽的报错将你原本愉悦的心情推向深渊？\n\n　　然而，希望之光并未熄灭。在无名杀十周年开发团队分享的代码中，我们似乎找到了解锁困境的钥匙。它将指引你走出这片阴霾，重返游戏的乐园。如果你愿意相信我们，相信那束光的力量，那么请用你珍贵的指尖，轻轻触碰那“开启修复模式”的按钮吧！';
                                                var click='开启修复模式';
                                                var save='fix';
                                            }
                                            navigator.notification.confirm(
									    			str,
										    		function(index){
										    			switch(index){
											    		    case 1:
											    		    window.tipsClick('Enter');//确定
											    		    localStorage.setItem('liuli_tenUIfix',save);
											    		    game.reload3();
											    		    break;
											    		    
											    		    default:
											    		    window.tipsClick('Report01');//离开
											    		}
											    	},
										    		'三国杀·琉璃版',
								    				[click,'取消']
								    			);
                                            break;
                                        case "menusi6":
                                            navigator.notification.confirm(
									    			'是否重新加载游戏资源？\n（将完整覆盖所有游戏文件，请慎重选择）',
										    		function(index){
										    			switch(index){
											    		    case 1:
											    		    window.tipsClick('Enter');//确定
											    		    localStorage.setItem('liuli_renew','on');
											    		    game.reload3();
											    		    break;
											    		    
											    		    default:
											    		    window.tipsClick('Report01');//离开
											    		}
											    	},
										    		'更新或重置',
								    				['确定','取消']
								    			);
                                            break;
                                        case "setab1":
                                            set_dialog.getChildByName('setab1')
                                                .texture = zloader.resources.setting.textures['set_tab_choose'];
                                            set_dialog.getChildByName('setab2')
                                                .texture = zloader.resources.setting.textures['set_tab']
                                            /*set_dialog.getChildByName('setab3')
                                                .texture = zloader.resources.setting.textures['set_tab'];*/
                                            set_dialog.removeChild(settingright2);
                                            set_dialog.removeChild(settingright3);
                                            set_dialog.addChild(settingright1);
                                            break;
                                        case "setab2":
                                            set_dialog.getChildByName('setab1')
                                                .texture = zloader.resources.setting.textures['set_tab'];
                                            set_dialog.getChildByName('setab2')
                                                .texture = zloader.resources.setting.textures['set_tab_choose'];
                                            /*set_dialog.getChildByName('setab3')
                                                .texture = zloader.resources.setting.textures['set_tab'];*/
                                            set_dialog.addChild(settingright2);
                                            set_dialog.removeChild(settingright3);
                                            set_dialog.removeChild(settingright1);
                                            break;
                                        case "setab3":
                                            set_dialog.getChildByName('setab1')
                                                .texture = zloader.resources.setting.textures['set_tab'];
                                            set_dialog.getChildByName('setab2')
                                                .texture = zloader.resources.setting.textures['set_tab'];
                                            set_dialog.getChildByName('setab3')
                                                .texture = zloader.resources.setting.textures['set_tab_choose'];
                                            set_dialog.removeChild(settingright2);
                                            set_dialog.addChild(settingright3);
                                            set_dialog.removeChild(settingright1);
                                            break;
                                        case "wujiangback":
                                            closee();
                                            break;
                                        default:
                                    }
                                }

                                function onButtonDownx(event) {
                                    //点掉红点
                                    var redpoint = event.target.getChildByName("redPoint");
                                    event.target.removeChild(redpoint);
                                    window.currentSprite = event.target;
                                    /*¥PIXI.sound.play¥*/window.tipsClick('TinyButton');
                                }

                                function entermodegame(mode, submode, playernum) {
                                    lib.config.mode = mode;
                                    game.saveConfig('mode', mode);
                                    if (submode != undefined) {
                                        game.saveConfig(mode + '_mode', submode, mode);
                                    }
                                    if (playernum != undefined) {
                                        lib.config.player_number = playernum;
                                        game.saveConfig('player_number', playernum, mode);
                                    }
                                    game.storyBackground();
                                }

                                function eee() {
                                    if(window._tempNoRZSHenter) return;
                                    window._tempNoRZSHenter=true;
                                    setTimeout(function(){
                                        window._tempNoRZSHenter=undefined;
                                    },1000);
                                    oppeen(pipeihome,true);
                                }

                                function rzshkz() {
                                    if(window._tempNoRZSHenter) return;
                                    window._tempNoRZSHenter=true;
                                    setTimeout(function(){
                                        window._tempNoRZSHenter=undefined;
                                    },1000);
                                    if(window.uibg3hide) window.uibg3hide(0,20);
                                    setTimeout(function(){
                                        delete window.inSplash;
                                        delete window.currentSprite;
                                        delete window.isOnhide;
                                        delete window.bbgp;
                                        delete window.container;
                                        delete window.moode;
                                    },200);
                                    if(window.rz_shenfen_node) {
                                        window.rz_shenfen_node.forEach(node=>{
                                            node.style.display='none';
                                            /*node.style.transition='all 0.2s';
                                            setTimeout(function(){
                                                node.style.opacity=0;
                                                node.style['pointer-events']='none';
                                            },0);*/
                                        });
                                    }
                                    if(window.rz_shenfen_node2) window.rz_shenfen_node2.style.display='none';
                                    window.resetGameTimeout = setTimeout(lib.init.reset, 5000);
                                    //findpipei.destroy();
                                    window.zhuanzhuanxiaoshi(0,20,function(){
                                    //});
                                    //	PIXI.sound.stopAll();
                                    //PIXI.sound.removeAll();
                                    //setTimeout(function(){
                                    findpipei.destroy();
                                    //PIXI.sound.remove('outgame');
                                    //PIXI.sound['outgame'].fadeOut(3);
                                    PIXI.sound.removeAll();
                                    window.RZoutgameOut=function(num,sum) {
                                        if(!ui.backgroundMusicRZ) return;
                                        //ui.backgroundMusicRZ.volume=((lib.config.volumn_background/8)*0.7+0.3*(lib.config.volumn_background>0?1:0))*(num/sum);
                                        ui.backgroundMusicRZ.volume=(lib.config.volumn_background/8)*(num/sum);
                                        if(num>0) {
                                            setTimeout(function(){
                                                window.RZoutgameOut(num-1,sum);
                                            },50);
                                        }else {
                                            //ui.backgroundMusicRZ.volume=(lib.config.volumn_background/8)*0.7+0.3*(lib.config.volumn_background>0?1:0);
                                            ui.backgroundMusicRZ.src="";
                                            ui.backgroundMusicRZ.volume=0;
                                        }
                                    }
                                    window.RZoutgameOut(10,10);
                                    wujiangpool.forEach(sprite => {
                                        sprite.destroy();
                                    });
                                    if (opprogress != null) clearTimeout(opprogress);
                                    opprogress = null;
                                    if (renderProcess != null) cancelAnimationFrame(renderProcess);
                                    renderProcess = null;
                                    spineks.state.clearTracks();
                                    spineks.destroy();
                                    xloader.destroy();
                                    yloader.destroy();
                                    zloader.destroy();
                                    gloader.destroy();
                                    brightnessFilter.destroy(); //滤镜
                                    characterclose.destroy(); //滤镜
                                    ticker.destroy(); //渲染定时器
                                    uihome.destroy();
                                    modehome.destroy();
                                    paiweihome.destroy();
                                    menuhome.destroy();
                                    settinghome.destroy();
                                    wujianghome.destroy();
                                    PIXI.utils.clearTextureCache();
                                    pixiapp.destroy(true);
                                    //主页面动皮加载器
                                    if (window.dyloader) for (j in window.dyloader) {
                                    window.dyloader[j].destroy();
                                    delete window.dyloader[j];
                                    }
                                    //主页面动皮精灵
                                    if (window.dyloaderskin && window.dyloaderskin.length) for (let i = 0; i < window.dyloaderskin.length; i++) {
                                        window.dyloaderskin[i].destroy();
                                        delete window.dyloaderskin[i];
                                    }
                                    //主页面动皮view实例
                             //       if (window.dyapp) window.dyapp.destroy(true);
                                    lib.init.js(lib.assetURL + 'mode', lib.config.mode, proceed);
                              //      lib.init.js(lib.assetURL + 'extension/如真似幻/mode', 'rzsh', proceed);
                                     });
                                }

                                function flyIn(sprite, duration) {
                                    let start = {
                                        x: pixiapp.screen.width + sprite.width
                                    }
                                    let end = {
                                        x: sprite.x
                                    };
                                    let ease = "power2.out";
                                    gsap.fromTo(sprite, duration, start, end, {
                                        ease
                                    })
                                        .restart();
                                }
                                window.inSplash = true;
                                clearTimeout(window.resetGameTimeout);
                                delete window.resetGameTimeout;
                            })
                        } else {
                            proceed();
                        }
                        localStorage.removeItem(lib.configprefix + 'directstart');
                        delete lib.init.init;
                    }
                }
            }
            if(localStorage.getItem('liuli_tenUIfix')&&localStorage.getItem('liuli_tenUIfix')=='fix') {
            //加入一个import接口，为以后js分离做准备
            window.rzimport = function(func) {
                func(lib, game, ui, get, ai, _status);
            };
            // 如真加载线程
            const n = new XMLHttpRequest();
            n.open('GET', lib.assetURL + 'extension/如真似幻/js/pixi6.min_chg.js', false);
            n.send();
            new Function(n.responseText).call(window);
            this.onload();
            }
        },
        config: {},
        help: {},
        package: {
            character: {
                character: {},
                translate: {},
            },
            card: {
                card: {},
                translate: {},
                list: [],
            },
            skill: {
                skill: {},
                translate: {},
            },
            intro: "",
            author: "如真似幻-蒸",
            diskURL: "",
            forumURL: "",
            version: "1.4",
        },
        files: {
            "character": [],
            "card": [],
            "skill": []
        }
    }
})
