app.import(function (lib, game, ui, get, ai, _status, app) {
  game.ui_identityShow_update = function () {
    var identityShow = game.ui_identityShow;/*图层1*/
    var identityShowx = game.ui_identityShowx;/*图层2 在图层1下面*/
    var str = '';
    var showWinOpt = true;
    if (lib.config.mode == 'guozhan' || (lib.config.mode == 'versus' && get.config('versus_mode') == 'siguo') || (lib.config.mode == 'versus' && get.config('versus_mode') == 'jiange')) {

      var unknown = game.countPlayer(function (current) {
        return current.identity == 'unknown';
      })
      var wei = game.countPlayer(function (current) {
        return current.identity == 'wei';
      })
      var shu = game.countPlayer(function (current) {
        return current.identity == 'shu';
      })
      var wu = game.countPlayer(function (current) {
        return current.identity == 'wu';
      })
      var qun = game.countPlayer(function (current) {
        return current.identity == 'qun';
      })
      var jin = game.countPlayer(function (current) {
        return current.identity == 'jin';
      })
      var ye = game.countPlayer(function (current) {
        return current.identity == 'ye';
      })
      var key = game.countPlayer(function (current) {
        return current.identity == 'key';
      })
      if (unknown > 0) str += '<font color="#FFFFDE">' + get.translation('unknown') + '</font> x ' + unknown + '  ';
      if (wei > 0) str += '<font color="#0075FF">' + get.translation('wei') + '</font> x ' + wei + '  ';
      if (shu > 0) str += '<font color="#ff0000">' + get.translation('shu') + '</font> x ' + shu + '  ';
      if (wu > 0) str += '<font color="#00ff00">' + get.translation('wu') + '</font> x ' + wu + '  ';
      if (qun > 0) str += '<font color="#ffff00">' + get.translation('qun') + '</font> x ' + qun + '  ';
      if (jin > 0) str += '<font color="#9e00ff">' + get.translation('jin') + '</font> x ' + jin + '  ';
      if (ye > 0) str += '<font color="#9e00ff">' + get.translation('ye') + '</font> x ' + ye + '  ';
      if (key > 0) str += '<font color="#9e00ff">' + get.translation('key') + '</font> x ' + key + '  ';
    }
    else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'two') {
      var enemy = game.countPlayer(function (current) {
        return current.isEnemyOf(game.me);
      })
      var friend = game.countPlayer(function (current) {
        return current.isFriendOf(game.me);
      })
      if(game.storyBgMode=='paiwei') {
        if (friend > 0) str += '<font color="#00ff00">' + '龙' + '</font> x ' + friend + '  ';
        if (enemy > 0) str += '<font color="#ff0000">' + '虎' + '</font> x ' + enemy + '  ';
      }else {
        if (friend > 0) str += '<font color="#ff0000">' + '虎' + '</font> x ' + friend + '  ';
        if (enemy > 0) str += '<font color="#00ff00">' + '龙' + '</font> x ' + enemy + '  ';
      }
    }
    else if(lib.config.mode=='martial') {
        showWinOpt = false;
        let ideColor = function(player) {
            if(player.identity == 'zhu') {
                return '#ae5f35';
            }else {
                return '#87a671';
            }
        }
        if(game.me?.getbackupCharacters) {
            str += '<font color="'+ ideColor(game.me) +'">' + '我方军营' + '</font>：';
            let mine = game.me.getbackupCharacters();
            if(mine.length > 0) {
                str += get.translation(mine.slice(0, 2));
                if(mine.length > 2) str += ' …';
            }else {
                str += '剩余0名武将';
            }
            let enemys = game.filterPlayer(function (current) {
                return current.isEnemyOf(game.me);
            });
            if(enemys.length) {
                str += '<br><font color="'+ ideColor(enemys[0]) +'">' + '敌方军营' + '</font>：剩余' + enemys[0].getbackupCharacters().length+'名武将';
            }
        }
    }
    else {
      //默契配合神贾诩“炼魄”
      var zhu = game.countPlayer(function (current) {
        return current.identity == 'zhu' || current.identity == 'rZhu' || current.identity == 'bZhu';
      }) + game.countPlayer(current=>{
		return current.countMark('jxlianpo_mark_zhu')>0;
	  });
      var zhong = game.countPlayer(function (current) {
        return current.identity == 'zhong' || current.identity == 'rZhong' || current.identity == 'bZhong' || current.identity == 'mingzhong';
      }) + game.countPlayer(current=>{
		return current.countMark('jxlianpo_mark_zhong')>0;
	  });
      var fan = game.countPlayer(function (current) {
        return current.identity == 'fan' || current.identity == 'rYe' || current.identity == 'bYe';
      }) + game.countPlayer(current=>{
		return current.countMark('jxlianpo_mark_fan')>0;
	  });
      var nei = game.countPlayer(function (current) {
        return current.identity == 'nei' || current.identity == 'rNei' || current.identity == 'bNei';
      }) + game.countPlayer(current=>{
		return current.countMark('jxlianpo_mark_nei')>0;
	  });
      if (zhu > 0) str += '<font color="#ae5f35">' + get.translation('zhu') + '</font> x ' + zhu + '  ';
      if (zhong > 0) str += '<font color="#e9d765">' + get.translation('zhong') + '</font> x ' + zhong + '  ';
      if (fan > 0) str += '<font color="#87a671">' + get.translation('fan') + '</font> x ' + fan + '  ';
      if (nei > 0) str += '<font color="#9581c4">' + get.translation('nei') + '</font> x ' + nei;
    }

    if(game.rz_isPaiWeiing) {
        str += '<br>排位模式，击败对手获得晋级';
    }else {
        if(game.me && showWinOpt)  str += '<br>' + get.translation(game.me.identity + '_win_option');
    }

    /*尽量保持字体大小，行高一致，不然会产生偏移*/
    if(game.players.length>=8) {
        var fontsize=16.5;
    }else {
        var fontsize=19.0;
    }
    identityShow.innerHTML = '<span style="font-family:shousha; font-size: '+fontsize+'px;font-weight:500;text-align: right; line-height: 20px; color: #C1AD92;text-shadow:none;">' + str + '</span>';/*图层1*/
    identityShowx.innerHTML = '<span style="font-family:shousha; font-size: '+fontsize+'px;font-weight:500;text-align: right; line-height: 20px; color: #2D241B; -webkit-text-stroke: 2.7px #322B20;text-shadow:none;">' + str + '</span>';/*图层2*/

  }
  game.ui_identityShow_init = function () {
    if (game.ui_identityShow == undefined) {
      game.ui_identityShow = ui.create.div('', '身份加载中......');
      //game.ui_identityShow.style.top = '1.9px';/*图层1 上下位置如果需要改动 两个图层都要改*/
      if(game.players.length>=8) {
          game.ui_identityShow.style.top = '6px';
      }else {
          game.ui_identityShow.style.top = '5px';
      }
      //game.ui_identityShow.style.left = '63.5px';/*图层2 左右位置如果需要改动 两个图层都要改*/
      game.ui_identityShow.style.left = '70px';
      game.ui_identityShow.style['z-index'] = 4;
      //game.ui_identityShow.style['font-size']=' 19px';
      if (lib.config.mode != 'doudizhu') {
        ui.arena.appendChild(game.ui_identityShow);
      }
    }
    if (game.ui_identityShowx == undefined) {
      game.ui_identityShowx = ui.create.div('', '身份加载中......');
      //game.ui_identityShowx.style.top = '5px';/*图层2*/
      if(game.players.length>=8) {
          game.ui_identityShowx.style.top = '6px';
      }else {
          game.ui_identityShowx.style.top = '5px';
      }
      game.ui_identityShowx.style.left = '70px';
      //game.ui_identityShowx.style['font-size']=' 19px';
      game.ui_identityShowx.style['z-index'] = 3;
      if (lib.config.mode != 'doudizhu') {
        ui.arena.appendChild(game.ui_identityShowx);
      }
    }
  }


  lib.arenaReady.push(function () {
    //聊天按钮模块
    if (lib.config.extension_手杀ui_LTAN == false) {
      var liaotian = ui.create.node('img');
      window.shoushaBlanks.push(liaotian);
      window.liaotian=liaotian;
      if(lib.config.newnew_font=='new') {
          liaotian.src = lib.assetURL + "extension/手杀ui/lbtn/images/uibutton/liaotian_jian.png"
      }else {
          liaotian.src = lib.assetURL + "extension/手杀ui/lbtn/images/uibutton/liaotian.png"
      }
      liaotian.style.cssText = "display: block;--w: 127px;--h: calc(var(--w) * 1019/1500);width: var(--w);height: var(--h);position: absolute;top: calc(100% - 87px);right: calc(100% - 123px);background-color: transparent;z-index:5;"/*新增zIndex*/
      liaotian.onclick = function () {

        if (lib.config['extension_说话_enable']) {

          game.showChatWordBackground();

        } else {

          game.showChatWordBackgroundX();

        }

      }
      document.body.appendChild(liaotian);
    }
    /*---------------------*/

    if (lib.config.mode == 'identity' || lib.config.mode == 'th_mougong' || lib.config.mode == 'doudizhu' || lib.config.mode == 'guozhan' || lib.config.mode == 'versus' || lib.config.mode == 'single' || lib.config.mode == 'boss') {
      /*斗地主*/
      if (lib.config.mode == 'doudizhu') {
        var jiaojia = ui.create.node('div');
        jiaojia.innerText = "本场叫价";
        jiaojia.id='jiaojua';
        jiaojia.style.cssText = "display: line;position: absolute;top: 5px;color: white;left: 56px;font-size:18px;font-family:shousha;text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19; z-index:1; "
        document.body.appendChild(jiaojia);
        var douzi = ui.create.node('div');
        douzi.innerText = get.translation(innerText = (num = ['100', '200', '300', '600', '900']).randomGet(1));
        douzi.style.cssText = "display: block;position: absolute;top: -6.5px;color: gold;left: 141px;font-size:21px;font-family:shousha;font-weight: 900; "
        ui.arena.appendChild(douzi);
      } else if (lib.config.mode == 'single') {
        //单挑
        var translate = {
          zhu: '击败对手',
          fan: '击败对手',
          undefined: '未选择阵营',
        }
      }
      else if (lib.config.mode == 'boss') {
        //挑战
        var translate = {
          zhu: '击败盟军',
          cai: '击败神祇',
          undefined: '未选择阵营',
        }
      }
      else if (lib.config.mode == 'guozhan') {
        //国战
        var translate = {
          undefined: '未选择势力',
          unknown: '保持隐蔽',
          ye: '&nbsp;&nbsp;&nbsp;击败场上<br>所有其他角色',
          key: '&nbsp;&nbsp;&nbsp;击败所有<br>非键势力角色',
        }
        for (var i = 0; i < lib.group.length; i++) {
          translate[lib.group[i]] = '&nbsp;&nbsp;&nbsp;击败所有<br>非' + get.translation(lib.group[i]) + '势力角色';
        }
      }
      else if (lib.config.mode == 'identity' && get.config('identity_mode') == 'purple') {
        //身份：3v3v2
        var translate = {
          rZhu: '击败冷方主公<br>与所有野心家',
          rZhong: '保护暖方主公<br>击败冷方主公<br>与所有野心家',
          rYe: '联合冷方野心家<br>击败其他角色',
          rNei: '协助冷方主公<br>击败暖方主公<br>与所有野心家',
          bZhu: '击败暖方主公<br>与所有野心家',
          bZhong: '保护冷方主公<br>击败暖方主公<br>与所有野心家',
          bYe: '联合暖方野心家<br>击败其他角色',
          bNei: '协助暖方主公<br>击败冷方主公<br>与所有野心家',
        }
      }
      else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'two' && !get.config('replace_character_two')) {
        //对决：欢乐成双
        var translate = {
          undefined: '&nbsp;&nbsp;&nbsp;协同队友<br>击败所有敌人',
        }
      }
      else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'two' && get.config('replace_character_two')) {
        //对决：欢乐成双（替补模式）
        var translate = {
          undefined: '抢先击败敌人<br>所有上场角色',
        }
      }
      else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'jiange') {
        //对决-剑阁
        var translate = {
          wei: '&nbsp;&nbsp;击败所有<br>蜀势力角色',
          shu: '&nbsp;&nbsp;击败所有<br>魏势力角色',
        }
      }
      else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'siguo') {
        //对决-四国（同舟共济）
        var translate = {

        }
        for (var i = 0; i < lib.group.length; i++) {
          translate[lib.group[i]] = '获得龙船或击败<br>非' + get.translation(lib.group[i]) + '势力角色';
        }
      }
      else {
        //身份：标准、明忠
        var translate = {
          zhu: '推测场上身份<br>击败反贼内奸',
          zhong: '&nbsp;&nbsp;&nbsp;保护主公<br>取得最后胜利',
          fan: '找出反贼队友<br>全力击败主公',
          nei: '找出反贼忠臣<br>最后击败主公',
          mingzhong: '&nbsp;&nbsp;&nbsp;保护主公<br>取得最后胜利',
          undefined: '胜利条件',
        }
      }
      for (var i in translate) {
        lib.translate[i + '_win_option'] = translate[i];
      }
      game.ui_identityShow_init();
      setInterval(function () {
        game.ui_identityShow_update();
      }, 1000);
    }
  });
  var head = ui.create.node('img');
  window.shoushaBlanks.push(head);
  head.src = lib.assetURL + "extension/手杀ui/lbtn/images/SSCD/button.png"
  head.style.cssText = "display: block;--w: 130px;--h: calc(var(--w) * 1080/1434);width: var(--w);height: var(--h);position: absolute;bottom: calc(100% - 98px);left: calc(100% - 126.2px);background-color: transparent;z-index:1"
  document.body.appendChild(head);
  window.shohshaMenu=head;


  var head = ui.create.node('div');
  head.style.cssText = "display: block;width: 134px;height: 103px;position: absolute;top: 0px;right: -8px;background-color: transparent;z-index:1"
  window.shohshaMenu2=head;
  head.onclick = function () {
    //防止千幻误触打开
    if(game.noReturnMenu) return;
    game.playAudio('../extension/手杀ui/lbtn/images/SSCD/label.mp3');
    var popuperContainer = ui.create.div('.popup-container', { background: "rgb(0,0,0,0)" }, ui.window);
    window.popuperContainer=popuperContainer;
    popuperContainer.addEventListener('click', event => {

      game.playAudio('../extension/手杀ui/lbtn/images/SSCD/caidan.mp3');
      event.stopPropagation();
      popuperContainer.delete(200);
      window.popuperContainer=false;
    });
    var yemian = ui.create.div('.yemian', popuperContainer);
    yemian.style.opacity=0;
    setTimeout(function(){
        yemian.style.opacity=1;
    },0);
    /*window.shoushaShowYemian=function(num,sum){
        yemian.style.opacity=(sum-num)/sum;
        if(num>0) {
            setTimeout(function(){
                window.shoushaShowYemian(num-1,sum);
            },10);
        }else {
            yemian.style.opacity=1;
        }
    }
    window.shoushaShowYemian(10,10);*/
    var shezhi = ui.create.div('.shezhi', popuperContainer);
    shezhi.addEventListener('click', event => {
      game.playAudio('../extension/手杀ui/lbtn/images/SSCD/xuanzhe.mp3');
      if (!ui.click.configMenu) return;
      game.closePopped();
      game.pause2();
      ui.click.configMenu();
      ui.system1.classList.remove('shown');
      ui.system2.classList.remove('shown');
    });
    var tuichu = ui.create.div('.tuichu', popuperContainer);
    tuichu.addEventListener('click', event => {
      game.playAudio('../extension/手杀ui/lbtn/images/SSCD/xuanzhe.mp3');
      game.reload3();
    });
    var taopao = ui.create.div('.taopao', popuperContainer);
    taopao.addEventListener('click', event => {

      game.playAudio('../extension/手杀ui/lbtn/images/SSCD/xuanzhe.mp3');

      game.reload();
    });
    var touxiang = ui.create.div('.touxiang', popuperContainer);
    touxiang.addEventListener('click', event => {

      game.playAudio('../extension/手杀ui/lbtn/images/SSCD/xuanzhe.mp3');
      
      //没开局不给投降
      if(!game.roundNumber) return;
      
      game.over();
    });
    var tuoguan = ui.create.div('.tuoguan', popuperContainer);
    tuoguan.addEventListener('click', event => {

      game.playAudio('../extension/手杀ui/lbtn/images/SSCD/xuanzhe.mp3');

      ui.click.auto();
    });
    var allNodes=[shezhi,tuichu,taopao,touxiang,tuoguan];
    window.shoushaShowNodes=function(nodes,index){
        nodes[index].style.opacity=0;
        nodes[index].style.transform='scale(1.5)';
        var sum=nodes.length-1;
        setTimeout(function(){
            nodes[index].style.opacity=1;
            nodes[index].style.transform='scale(1)';
        },(1+sum-index)*100);
        if(index<sum) {
            window.shoushaShowNodes(nodes,index+1);
        }
    }
    window.shoushaShowNodes(allNodes,0);
  }
  document.body.appendChild(head);

  /*左上角问号框*/
  var tipshow = ui.create.node('img');
  window.shoushaBlanks.push(tipshow);
  if (lib.config.mode == 'doudizhu') tipshow.src = lib.assetURL + "extension/手杀ui/lbtn/images/uibutton/doudizhu.png";
  else if (lib.config.mode != 'taixuhuanjing') tipshow.src = lib.assetURL + "extension/手杀ui/lbtn/images/uibutton/shenfen.png";
  if (lib.config.mode == 'doudizhu') {
  tipshow.id='tipshow'   
    tipshow.style.cssText = "display: block;width: 360px;height: 35px;position: absolute;top: -1.3px;left: -35px;background-color: transparent;z-index:3"
  } else if (lib.config.mode != 'taixuhuanjing') tipshow.style.cssText = "display: block;--w: 439px;--h: calc(var(--w) * 279/2139);width: var(--w);height: var(--h);position: absolute;top: -1px;left:-49px;background-color: transparent;z-index:3"

  if (lib.config.mode == 'identity' || lib.config.mode == 'doudizhu' || lib.config.mode == 'versus' || lib.config.mode == 'guozhan') {
    tipshow.onclick = function () {
      var popuperContainer = ui.create.div('.popup-container', ui.window);
      popuperContainer.style.zIndex = 1000;
      game.playAudio('../extension/手杀ui/lbtn/images/SSCD/label.mp3');
      if (lib.config.mode == 'identity') {
        if (game.me.identity == 'zhu') {
          ui.create.div('.sfrwzhugong', popuperContainer);
        }
        else if (game.me.identity == 'zhong') {
          ui.create.div('.sfrwchongchen', popuperContainer);
        }
        else if (game.me.identity == 'fan') {
          ui.create.div('.sfrwfanzei', popuperContainer);
        }
        else if (game.me.identity == 'nei') {
          ui.create.div('.sfrwneijian', popuperContainer);
        }
      }
      if (lib.config.mode == 'doudizhu') {
        if (game.me.identity == 'zhu') {
          ui.create.div('.sfrwdizhu', popuperContainer);
        }
        else if (game.me.identity == 'fan') {
          ui.create.div('.sfrwnongmin', popuperContainer);
        }
      }
      if (lib.config.mode == 'versus') {
        if(game.storyBgMode=='paiwei') {
          ui.create.div('.sfrwlong', popuperContainer);
        }else {
          ui.create.div('.sfrwhu', popuperContainer);
        }
      }
      if (lib.config.mode == 'guozhan') {
        if (game.me.group == 'unknown' || game.me.group == 'undefined') {
          ui.create.div('.sfrwundefined', popuperContainer);
        }
        else if (game.me.group == 'wei') {
          ui.create.div('.sfrwweiguo', popuperContainer);
        }
        else if (game.me.group == 'shu') {
          ui.create.div('.sfrwshuguo', popuperContainer);
        }
        else if (game.me.group == 'wu') {
          ui.create.div('.sfrwwuguo', popuperContainer);
        }
        else if (game.me.group == 'qun') {
          ui.create.div('.sfrwqunxiong', popuperContainer);
        }
        else if (game.me.group == 'jin') {
          ui.create.div('.sfrwjinguo', popuperContainer);
        }
        else if (game.me.group == 'ye') {
          ui.create.div('.sfrwyexinjia', popuperContainer);
        }
      }
      popuperContainer.addEventListener('click', event => {
        game.playAudio('../extension/手杀ui/lbtn/images/SSCD/caidan.mp3');
        popuperContainer.delete(200);
        window.popuperContainer=false;
      });
    };
  }
  document.body.appendChild(tipshow);
/*
  if (lib.device == 'ios' || lib.device == 'android') {
    var head = ui.create.node('div');
    head.innerText = "房间号:"
    head.style.cssText = "display: block;position: absolute;top: 85px;color: #97856a;right: 135px;font-size:18px;letter-spacing: 1.5px;font-family:shousha;;font-weight: 900; text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19;-webkit-text-stroke:0.5px black !important; z-index:1; "
    document.body.appendChild(head);

    var head = ui.create.node('div');
    head.innerText = num = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    head.style.cssText = "display: block;position: absolute;top: 85px;right: 58px;font-size:20px;font-family:'shousha';color:#97856a;font-weight: 900; text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19;-webkit-text-stroke:0.5px black !important; z-index:1"
    document.body.appendChild(head);

  } else {
    var head = ui.create.node('div');
    head.innerText = "房间号:"
    head.style.cssText = "display: block;position: absolute;top: 85px;color: #97856a;right: 135px;font-size:18px;letter-spacing: 1.5px;font-family:shousha;;font-weight: 900; text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19;filter:drop-shadow(0 0 0.5px #2b1f19) drop-shadow(0 0 0.5px #2b1f19);z-index:1; "
    document.body.appendChild(head);

    var head = ui.create.node('div');
    head.innerText = num = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    head.style.cssText = "display: block;position: absolute;top: 85px;right: 58px;font-size:20px;font-family:'shousha';color:#97856a;font-weight: 900; text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19;filter:drop-shadow(0 0 0.5px #2b1f19) drop-shadow(0 0 0.5px #2b1f19);z-index:1"
    document.body.appendChild(head);
  }*/



  var plugin = {
    name: 'lbtn',
    filter: function () {
      return !['chess', 'tafang', 'stone', 'connect'].contains(get.mode());
    },
    content: function (next) {
      lib.skill._uicardupdate = {
        trigger: { player: 'phaseJieshuBegin' },
        forced: true,
        unique: true,
        popup: false,
        silent: true,
        noLose: true,
        noGain: true,
        noDeprive: true,
        priority: -Infinity,
        filter: function (event, player) {
          return player == game.me
        },
        content: function () {
          if (ui.updateSkillControl) ui.updateSkillControl(game.me, true);
        }
      },

        /*来自瓜瓜 自动牌序*/
        lib.skill._paixu_paixu_paixu = {
          trigger: {
            player: ["gainEnd"]
          },
          silent: true,
          charlotte: true,
          forced: true,
          content: function () {
            if (window.paixuxx == false && player == game.me) {
              var cards = game.me.getCards("hs");
              var sort2 = function (b, a) {
                if (a.name != b.name) return lib.sort.card(a.name, b.name);
                else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
                else return a.number - b.number;
              };
              if (cards.length > 1) {

                var cardNotMuNiu = [];
                var cardMuNiu = [];
                cards.forEach(function (card) {
                  if (card.hasGaintag('muniu')) {
                    cardMuNiu.push(card);
                  } else {
                    cardNotMuNiu.push(card);
                  }
                })
                if (cardMuNiu.length > 1) {
                  cardMuNiu.sort(sort2);
                }
                if (cardNotMuNiu.length > 1) {
                  cardNotMuNiu.sort(sort2);
                }
                cards = cardMuNiu.concat(cardNotMuNiu);
                // cards.sort(sort2);
                cards.forEach(function (i, j) {
                  game.me.node.handcards1.insertBefore(cards[j], game.me.node.handcards1.firstChild);
                });
                dui.queueNextFrameTick(dui.layoutHand, dui);
              }
            }
          },
        },



        app.waitAllFunction([
          function (next) {

            game.saveConfig('custom_button', false);
            next();
          },
          function (next) {

            if (lib.device == 'ios' || lib.device == 'android') {
              if(get.mode()=='boss') {
                  lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1_boss', next);
              }else {
                  lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1', next);
              }
            } else {
              lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1_window', next);
            }

          },
        ], next);

    },
    precontent: function () {
      app.reWriteFunction(game, {
        updateRoundNumber: [function () {
          if (ui.cardRoundTime) {
            ui.cardRoundTime.updateRoundCard();


          }
        }],
      });
      Object.assign(game.videoContent, {
        createCardRoundTime: function () {
          ui.cardRoundTime = plugin.create.cardRoundTime();
        },
        createhandcardNumber: function () {
          ui.handcardNumber = plugin.create.handcardNumber();
        },
        updateCardRoundTime: function (opts) {
          if (!ui.cardRoundTime) return;
          ui.cardRoundTime.node.roundNumber.innerHTML = '<span>第' + game.roundNumber + '轮</span>';
          ui.cardRoundTime.setNumberAnimation(opts.cardNumber);
        },
        updateCardnumber: function (opts) {
          if (!ui.handcardNumber) return;

          // ui.handcardNumber.setNumberAnimation(opts.cardNumber);
        },

      });
      app.reWriteFunction(ui.create, {
        me: [function () {
          plugin.create.control();
        }, null],
        arena: [null, function () {
          if (ui.time3) {
            clearInterval(ui.time3.interval);
            ui.time3.delete();
          }
          if (ui.cardPileNumber) ui.cardPileNumber.delete();
          ui.cardRoundTime = plugin.create.cardRoundTime();
          ui.handcardNumber = plugin.create.handcardNumber();
        }],
        cards: [null, function () {
          if (ui.cardRoundTime) {
            ui.cardRoundTime.updateRoundCard();

          }
        }],



      });
      app.reWriteFunction(lib.configMenu.appearence.config, {
        update: [null, function (res, config, map) {
          map.control_style.hide();
          map.custom_button.hide();
          map.custom_button_system_top.hide();
          map.custom_button_system_bottom.hide();
          map.custom_button_control_top.hide();
          map.custom_button_control_bottom.hide();
          map.radius_size.hide();
        }],
      });


      ui.create.confirm = function (str, func) {
        var confirm = ui.confirm;
        if (!confirm) {
          confirm = ui.confirm = plugin.create.confirm();
        }
        confirm.node.ok.classList.add('disabled');
        confirm.node.cancel.classList.add('disabled');
        if (_status.event.endButton) {
          ui.confirm.node.cancel.classList.remove('disabled');
        }
        if (str) {
          if (str.indexOf('o') !== -1) {
            confirm.node.ok.classList.remove('disabled');
          }
          if (str.indexOf('c') !== -1) {
            confirm.node.cancel.classList.remove('disabled');
          }
          confirm.str = str;
        }

        if (func) {
          confirm.custom = func;
        }
        ui.updatec();
        confirm.update();
      };
    },
    create: {
      control: function () {

      },
      confirm: function () {
        //确定文本    
        var confirm = ui.create.control('<span></span>', 'cancel');
        confirm.classList.add('lbtn-confirm');
        confirm.node = {
          ok: confirm.firstChild,
          cancel: confirm.lastChild,

          //小改动
          //cancel2: confirm.lastChild,

        };
        if (_status.event.endButton) {
          _status.event.endButton.close();
          //	delete event.endButton;		
        }
        confirm.node.ok.link = 'ok';
        if(_status.event.name=="gameDraw")confirm.node.ok.classList.add('huan');
        else if(_status.event.name=='chooseToDiscard'&&_status.event.parent.name=='phaseDiscard')confirm.node.ok.classList.add('qi');
        confirm.node.ok.classList.add('primary');
        confirm.node.cancel.classList.add('primary2');

        confirm.node.cancel.innerHTML = "<image style=width: 80px height 15px src=" + lib.assetURL + "extension/手杀ui/lbtn/images/uibutton/QX.png>";

        // confirm.node.cancel2.classList.add('primary2');

        confirm.custom = plugin.click.confirm;
        app.reWriteFunction(confirm, {
          close: [function () {
            this.classList.add('closing');
          }],
        });
        for (var k in confirm.node) {
          confirm.node[k].classList.add('disabled');
          confirm.node[k].removeEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.control);
          confirm.node[k].addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (e) {
            e.stopPropagation();
            if (this.classList.contains('disabled')) {
              if (this.link === 'cancel' && this.dataset.type === 'endButton' && _status.event.endButton) {

                _status.event.endButton.custom();
                ui.confirm.close();
                //  ui.updatec();
              }
              return;
            }

            if (this.parentNode.custom) {
              this.parentNode.custom(this.link, this);
            }
          });
        }

        //添加重铸按钮素材
        if (ui.skills2 && ui.skills2.skills.length) {
          var skills = ui.skills2.skills;
          confirm.skills2 = [];
          for (var i = 0; i < skills.length; i++) {
            var item = document.createElement('div');
            item.id=skills[i];
            item.link = skills[i];

            if (skills[i] == "_recasting") {
            item.style.display='none';
              item.innerHTML = "<img style=width:84px height:18px src=" + lib.assetURL + "extension/手杀ui/lbtn/images/uibutton/CZ.png>";
              item.classList.add('primary2');
            
            } else {
              item.innerHTML = get.translation(skills[i]);
            }

            item.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function (e) {
              e.stopPropagation();
              ui.click.skill(this.link);
            });

            item.dataset.type = 'skill2';
                     //    if(ui.updateSkillControl)   ui.updateSkillControl(game.me, true);
                     if(skills[i] == "_recasting")confirm.insertBefore(item, confirm.firstChild);
          }
        }

        confirm.update = function () {
          if (confirm.skills2) {
            if (_status.event.skill && _status.event.skill !== confirm.dataset.skill) {
              confirm.dataset.skill = _status.event.skill;
              confirm.skills2.forEach(function (item) {
                item.remove();
              });
              ui.updatec();
            } else if (!_status.event.skill && confirm.dataset.skill) {
              delete confirm.dataset.skill;
              confirm.skills2.forEach(function (item) {
                confirm.insertBefore(item, confirm.firstChild);
              });
              ui.updatec();
            }
          }
          if (ui.updateSkillControl) ui.updateSkillControl(game.me, true);
        };
        return confirm;
      },


      handcardNumber: function () {
        var node3 = ui.create.div('.settingButton', ui.arena, plugin.click.setting);
        var node2 = ui.create.div('.lbtn-controls', ui.arena);
        ui.create.div('.lbtn-control', node2, '   ');
        ui.create.div('.lbtn-control', node2, '   ');
        /*ui.create.div('.lbtn-control1', node2, plugin.click.paixu);*/
        var paixuauto = ui.create.div('.lbtn-paixu', ui.arena);
        paixuauto.onclick = function () {
          //结束后就不折腾了
          if (_status.over) return;
          if (window.paixuxx == false) {
            plugin.click.paixu();
            paixuauto.setBackgroundImage('extension/手杀ui/lbtn/images/uibutton/btn-paixu.png');
            window.paixuxx = true;
          } else {
            plugin.click.paixu();
            paixuauto.setBackgroundImage('extension/手杀ui/lbtn/images/uibutton/zidongpaixu.png');
            window.paixuxx = false;
          }
        };
        var jilu = ui.create.div('.latn-jilu', ui.arena, ui.click.pause);
        if(lib.config.newnew_font=='new') {
            jilu.setBackgroundImage('extension/手杀ui/lbtn/images/uibutton/btn-jilu_jian.png');
        }
        //-----------------//
        /*ui.create.div('.lbtn-control2', node2, ui.click.pause);*/
        //var node4 = ui.create.div('.tuoguanButton', ui.arena, ui.click.auto);
        var node = ui.create.div('.handcardNumber', ui.arena).hide();
        node.node = {
          cardPicture: ui.create.div('.cardPicture', node),
          cardNumber: ui.create.div('.cardNumber', node),

        };
        window.cardPicture=node.node;
        //手牌显示·---//
        node.updateCardnumber = function() {
        if (!game.me) return;
          var cardNumber2 = game.me.countCards('h') || 0;
          var cardNumber = game.me.getHandcardLimit() || 0;
          var numbercolor ='white';
          if(cardNumber2>cardNumber) numbercolor ='white';
          if(cardNumber == Infinity) cardNumber = '∞'
          if(cardNumber>game.me.hp) numbercolor ='#20c520';
          if(cardNumber<game.me.hp) numbercolor ='#ff1813';
          if(cardNumber==game.me.hp) numbercolor ='#ffe9cd';
          //this.node.cardNumber.innerHTML = '</span>' + '<font size=5.5 >' + cardNumber2 +	'</font>' + '<font size=5 face="xinwei">' + '/' + '<font color=' + numbercolor + ' size=4 face="shousha">' + cardNumber + '</font>' + '</span>';
          //感谢 @无中一无中 调整的美化
          this.node.cardNumber.innerHTML =
            '<span style="font-size:27px; margin-bottom: -2px; color:#FDFDFD; font-family:HYZLSJ; text-shadow:0 0 3px #000000, 0 0 3px #000000, 0 0 3px #000000;">'
            + cardNumber2 + '</span>'
            + '<span style="font-size:22px; margin-left: -2px; color:#FDFDFD; font-family:HYZLSJ; text-shadow:0 0 3px #000000, 0 0 3px #000000, 0 0 3px #000000;">'
            + '／' + '</span>'
            + '<span style="font-size:19px; margin-left: -2px; opacity:0.9; text-shadow:0 0 3px #3C3717, 0 0 3px #342D10, 0 0 3px #342D10">'
            + '<font color=' + numbercolor + ' face="HYZLSJ">' + cardNumber + '</font>' + '</span>';
    //      this.setNumberAnimation(cardNumber);
          this.show();
          
          game.addVideo('updateCardnumber', null, {
            cardNumber: cardNumber,
          });
        };
        node.node.cardNumber.interval =  setInterval(function() {
          ui.handcardNumber.updateCardnumber()
        }, 1000);           
    //    game.addVideo('createCardRoundTime');
    game.addVideo('createhandcardNumber');
        return node;
      },
      cardRoundTime: function() {
        var node = ui.create.div('.cardRoundNumber', ui.arena).hide();
        node.node = {
          /*cardPileNumber: ui.create.div('.cardPileNumber', node),*/
          //牌堆可点击
          cardPileNumber: ui.create.div('.cardPileNumber', node, plugin.click.paidui),
          roundNumber: ui.create.div('.roundNumber', node),
          time: ui.create.div('.time', node),
        };

        node.updateRoundCard = function () {
          var cardNumber = ui.cardPile.childNodes.length || 0;
          var roundNumber = game.roundNumber || 0;
          this.node.roundNumber.innerHTML = '<span>第' + game.roundNumber + '轮</span>';
          this.setNumberAnimation(cardNumber);
          this.show();
          game.addVideo('updateCardRoundTime', null, {
            cardNumber: cardNumber,
            roundNumber: roundNumber,
          });
        };

        node.setNumberAnimation = function (num, step) {
          var item = this.node.cardPileNumber;
          clearTimeout(item.interval);
          if (!item._num) {
            item.innerHTML = '<span>' + num + '</span>';
            item._num = num;
          } else {
            if (item._num !== num) {
              if (!step) step = 500 / Math.abs(item._num - num);
              if (item._num > num) item._num--;
              else item._num++;
              item.innerHTML = '<span>' + item._num + '</span>';
              if (item._num !== num) {
                item.interval = setTimeout(function () {
                  node.setNumberAnimation(num, step);
                }, step);
              }
            }
          }
        };

        ui.time4 = node.node.time;
        ui.time4.sec = 0;
        ui.time4.interval = setInterval(function () {
          var min = Math.floor(ui.time4.sec / 60);
          var sec = ui.time4.sec % 60;
          if (min < 10) min = '0' + min;
          if (sec < 10) sec = '0' + sec;
          ui.time4.innerHTML = '<span>' + min + ':' + sec + '</span>';
          ui.time4.sec++;
        }, 1000);
        game.addVideo('createCardRoundTime');
        return node;
      },
    },
    click: {
      setting: function () {
        if (lib.extensionMenu.extension_概念武将.zyile_skin_Menu) {
          lib.extensionMenu.extension_概念武将.zyile_skin_Menu.onclick();
        } else {
          // head.remove()
          game.closePopped();
          game.pause2();
          ui.click.configMenu();
          ui.system1.classList.remove('shown');
          ui.system2.classList.remove('shown');
        }
      },


      paixu: function () {
        if(!game.me||!game.me.getCards("hs")) return false;
        var cards = game.me.getCards("hs");
        var sort2 = function (b, a) {
          if (a.name != b.name) return lib.sort.card(a.name, b.name);
          else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
          else return a.number - b.number;
        };


        if (cards.length > 1) {
          var cardNotMuNiu = [];
          var cardMuNiu = [];
          cards.forEach(function (card) {
            if (card.hasGaintag('muniu')) {
              cardMuNiu.push(card);
            } else {
              cardNotMuNiu.push(card);
            }
          })
          if (cardMuNiu.length > 1) {
            cardMuNiu.sort(sort2);
          }
          if (cardNotMuNiu.length > 1) {
            cardNotMuNiu.sort(sort2);
          }
          cards = cardMuNiu.concat(cardNotMuNiu);

          // cards.sort(sort2);
          cards.forEach(function (i, j) {
            game.me.node.handcards1.insertBefore(cards[j], game.me.node.handcards1.firstChild);
          });
          dui.queueNextFrameTick(dui.layoutHand, dui);
        }

      },
      //可点击函数（牌堆）
      paidui: function () {
        if (!_status.gameStarted) return;
        game.pause2();

        const cardsInfo = game.players.map(item => item.get('h')).flat(window.Infinity)
          .concat(...ui.cardPile.childNodes)
          .concat(...ui.discardPile.childNodes)
          .map(item => ({
            name: item.name,
            suit: item.suit,
            number: item.number,
            nature: get.translation(item.nature),
            color: get.color(item),
            type: get.translation(get.type(item), 'trick'),
            translate: lib.translate[item.name],
            link: item,
          }));
        let cardStatistics = {
          杀: {
            num: 0,
            type: '基本',
          },
          火杀: {
            num: 0,
            type: '基本',
          },
          雷杀: {
            num: 0,
            type: '基本',
          },
          红杀: {
            num: 0,
            type: '基本',
          },
          黑杀: {
            num: 0,
            type: '基本',
          },
          '黑桃2~9': {
            num: 0,
            type: '花色',
          },
        }
        let typeList = ['点数', '花色'];
        for (let card of cardsInfo) {
          typeList.add(card.type);
          // 统计卡牌名
          if (!cardStatistics[card.translate])
            cardStatistics[card.translate] = {
              num: 0,
              type: card.type,
            }
          // 统计花色
          if (!cardStatistics[get.translation(card.suit)])
            cardStatistics[get.translation(card.suit)] = {
              num: 0,
              type: '花色',
            }
          // 统计点数
          if (!cardStatistics[card.number])
            cardStatistics[card.number] = {
              num: 0,
              type: '点数',
            }

          if (ui.cardPile.contains(card.link)) {
            cardStatistics[card.translate].num++;
            cardStatistics[get.translation(card.suit)].num++;
            cardStatistics[card.number].num++;

            if (card.name === 'sha') {
              if (card.color === 'black') {
                cardStatistics['黑杀'].num++;
                if (card.suit === 'spade' && card.number <= 9 && card.number >= 2) cardStatistics['黑桃2~9'].num++;
              } else if (card.color === 'red') {
                cardStatistics['红杀'].num++;
              }
            }

          }


          if (card.nature) {
            if (!cardStatistics[card.nature + card.translate])
              cardStatistics[card.nature + card.translate] = {
                num: 0,
                type: card.type,
              }
            if (ui.cardPile.contains(card.link)) {
              cardStatistics[card.nature + card.translate].num++;
            }
          }
        }

        let popupContainer = ui.create.div('.popup-container', ui.window, {
          zIndex: 10,
          background: 'rgb(0,0,0,.3)',
        }, function () {
          this.delete(500);
          game.resume2();
        });
        //let statistics = ui.create.div('.card-statistics', '卡牌计数器', popupContainer);
        let statistics = ui.create.div('.card-statistics', '牌 堆 计 数 器', popupContainer);
        let statisticsTitle = ui.create.div('.card-statistics-title', statistics);
        let statisticsContent = ui.create.div('.card-statistics-content', statistics);

        typeList.forEach(item => {
          ui.create.div(statisticsTitle, '', item);
          statisticsContent[item] = ui.create.div(statisticsContent, '');
        });

        for (let i in cardStatistics) {
          let items = ui.create.div('.items');
          let item = ui.create.div('.item', i, items);
          /*var nums=cardStatistics[i].num;
          var numsTo='０１２３４５６７８９';
          if(nums<10) nums=numsTo[nums];
          nums='<div style="white-space:nowrap">X</div>'+nums;
          let num = ui.create.div('.item-num', nums, items);*/
          let num = ui.create.div('.item-num', `X${cardStatistics[i].num}`, items);
          statisticsContent[cardStatistics[i].type].appendChild(items);
        }

      },

      confirm: function (link, target) {
        if (link === 'ok') {
          ui.click.ok(target);
        } else if (link === 'cancel') {
          ui.click.cancel(target);
        } else if (target.custom) {
          target.custom(link);
        }
      },
    },
    compare: {
      type: function (a, b) {
        if (a === b) return 0;
        var types = ['basic', 'trick', 'delay', 'equip'].addArray([a, b]);
        return types.indexOf(a) - types.indexOf(b);
      },
      name: function (a, b) {
        if (a === b) return 0;
        return a > b ? 1 : -1;
      },
      nature: function (a, b) {
        if (a === b) return 0;
        var nature = [undefined, 'fire', 'thunder'].addArray([a, b]);
        return nature.indexOf(a) - nature.indexOf(b);
      },
      suit: function (a, b) {
        if (a === b) return 0;
        var suit = ['diamond', 'heart', 'club', 'spade'].addArray([a, b]);
        return suit.indexOf(a) - suit.indexOf(b);
      },
      number: function (a, b) {
        return a - b;
      },
    },
  };
  return plugin;
});
