game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"斗转星移",content:function(config,pack){
//修正：addTempClass替换回了animate，旧版本的代码
//模式判断重启
if(!lib.config.extension_斗转星移_forbidReload) {
  if(dzxy.tempmode&&lib.config.mode!=dzxy.tempmode){
    game.reload();
  }
}
lib.arenaReady.push(function(){
    if(lib.config.extension_斗转星移_JinJiang){
        ui.JinJiang=ui.create.system('禁将',banCharF);
    }
});
window.banShow=function(node) {
    node.style.opacity=0;
    setTimeout(function(){
        node.style.transition='all 0.3s';
        node.style.opacity=1;
    },0);
    return;
}
window.bancharss=banCharF;
//禁将
function banCharF(){
    //挑战模式非开局禁选
    if(get.mode()=='boss'&&!game.roundNumber) return;
    //太虚幻境禁选
    if(get.mode()=='taixuhuanjing') return;
    //乱斗模式界面禁选
    if(get.mode()=='brawl') return;
    //if(window.canNoShowSearch&&!['identity','guozhan'].contains(get.mode())) return;
    if(window.canNoShowSearch) return;
    window.notPlayChangeSkinEffect=true;
    game.pause2();
    if(game.initJinDuTiao) game.initJinDuTiao('pause',true);
    //初始化
    //plan是禁将数组
    //planPack是方案开启的武将包
    lib.config.extension_斗转星移_plan0=[];
    if(window.SSJJ_allCharacters) game.saveExtensionConfig('斗转星移','planPack0',window.SSJJ_allCharacters);
    else game.saveExtensionConfig('斗转星移','planPack0',lib.config.all.characters);
    for(let i=1;i<=3;i++){
        if(!lib.config['extension_斗转星移_plan'+i]) lib.config['extension_斗转星移_plan'+i]=[];
        lib.config['extension_斗转星移_planPack'+i]=[];
    }
    //modePlan每个模式启用方案
    var allMode=lib.config.all.mode.concat(['paiwei','freegame']);
    for(let mode of allMode){
        if(lib.config['extension_斗转星移_modePlan_'+mode]==undefined) game.saveExtensionConfig('斗转星移','modePlan_'+mode,0);
    }
    //设置星级
    if(!lib.config.extension_斗转星移_setCharStars) lib.config.extension_斗转星移_setCharStars={};
    //武将图调节
    if(!lib.config.extension_斗转星移_jjImgControl) lib.config.extension_斗转星移_jjImgControl=['100%','0%'];
    let jjImgControl=lib.config.extension_斗转星移_jjImgControl;
    //滑动手势
    let swipe;
    if(lib.config.swipe){
        lib.config.swipe=false;
        swipe=true;
    };
    //势力颜色
    let groupColor={
        wei:'RGBA(89,101,172,0.5)',
        shu:'RGBA(210,28,28,0.5)',
        wu:'RGBA(88,153,52,0.6)',
        qun:'RGBA(237,224,61,0.5)',
        shen:'RGBA(255,215,0,0.55)',
        jin:'RGBA(0,0,128,0.5)',
        key:'RGBA(255,192,203,0.5)',
        moren:'RGBA(237,224,61,0.5)',//默认颜色，未定义势力的颜色
        close:'RGBA(210,206,133,0.5)',//关闭势力颜色划分的颜色
    };
    let getGroupColor=(group)=>{
        let color;
        if(groupColor[group]) color=groupColor[group];
        else color=groupColor['moren'];
        return color;
    };
    //背景
    let bigBg=ui.create.div('.dz-bigBg2',document.body);
    if(lib.config.extension_斗转星移_qnssBackground&&lib.config.image_background){
         bigBg.setBackgroundImage("image/background/" + lib.config.image_background + ".jpg");
    }
    window.banShow(bigBg);
    //武将
    let banCharBox=ui.create.div('.dz-box1',bigBg);
    window.banShow(banCharBox);
    //武将包横栏
    let spDiv=ui.create.div('.sp-kdiv',banCharBox);
    //中间武将
    let contentBg=ui.create.div('.jj-contentBg',banCharBox);
    //全部禁用
    let allBanBtn=ui.create.div('.jj-gnBtn',banCharBox,'全部禁用',allBanClick);
    //全部开启
    let allOpenBtn=ui.create.div('.jj-gnBtn',banCharBox,'全部开启',allOpenClick);
    //导出数据
    let outputBtn=ui.create.div('.jj-gnBtn',banCharBox,'导出数据');
    outputBtn.addEventListener('click',(e)=>{
        outputData();
    });
    //导入数据
    let inputBtn=ui.create.div('.jj-gnBtn',banCharBox,'导入数据');
    inputBtn.addEventListener('click',(e)=>{
        inputData();
    });
    //原画调节
    let controlBtn=ui.create.div('.jj-gnBtn',banCharBox,'原画调节');
    controlBtn.addEventListener('click',(e)=>{
        imgControl();
    });
    //方案
    let banPlanBox=ui.create.div('.banPlanBox',bigBg);
    //设置按钮
    let setBtn=ui.create.div('.setBtn',banPlanBox);
    setBtn.addEventListener('click',setClick);
    //3个方案
    if(!lib.config['extension_斗转星移_planNames']) lib.config['extension_斗转星移_planNames']=['方案一','方案二','方案三'];
    let planNames=lib.config['extension_斗转星移_planNames'];
    let initPlan=true;
    let planNodes={};
    for(let i=1;i<=3;i++){
        let planBtn=ui.create.div('.banPlanBtn',banPlanBox);
        let planName=ui.create.div('.ss-textdiv',planNames[i-1],planBtn);
        planBtn.onclick=function(){
            planClick(this,planName);
        };
        planNodes[i]=planBtn;
        planBtn.num=i;
        if(initPlan){
            planBtn.onclick();
            initPlan=false;
        }
    }
    //退出保存
    let tuichu=ui.create.div('.dz-returnBtn',bigBg);
    tuichu.addEventListener('click',(e)=>{
        if(window.qnssReload) {
            if(window.turnToDark) {
                window.turnToDark(0.2);
                setTimeout(function(){
                    game.reload3();
                },300);
            }else {
                game.reload3();
            }
            return;
        }
        game.resume2();
        game.playAudio('../extension/斗转星移/audio/fanhui.mp3');
        e.stopPropagation();
        //不禁掉你的武将
        /*for(let mode of lib.config.all.mode){
            let n=lib.config['extension_斗转星移_modePlan_'+mode];
            game.saveConfig(mode+'_banned',lib.config['extension_斗转星移_plan'+n]);
        }*/
        let plans=banPlanBox.querySelectorAll('.banPlanBtn');
        for(let i of plans){
            if(!i.tempPack) continue;
            let packAll=i.tempPack.querySelectorAll('.jj-charPackBtn');
            for(let j of packAll){
                if(j.getAttribute('num1')==0){
                    lib.config['extension_斗转星移_planPack'+i.num].remove(j.id);
                }
                else lib.config['extension_斗转星移_planPack'+i.num].add(j.id);
            }
            game.saveExtensionConfig('斗转星移','planPack'+i.num,lib.config['extension_斗转星移_planPack'+i.num]);
        }
        if(swipe) lib.config.swipe=true;
        bigBg.delete();
    });
    let time;
    if(!window.forbidList) window.forbidList={
        now:[],//目前已经禁止的
        lock:[],//原本就已经禁的
    };
    //方案点击
    function planClick(plan,planName){
        dzxy.playAudio('audio/click2.mp3');
        let act=banPlanBox.querySelector('.banPlanBtn.active');
        if(act){
            act.querySelector('.bianji').remove();
            act.classList.remove("active");
        }
        plan.classList.add("active");
        let bianji=ui.create.div('.bianji',plan);
        bianji.addEventListener('click',(e)=>{
            e.stopPropagation();
            let fanhui=ui.create.div('.dz-bigBg1',bigBg);
            fanhui.addEventListener('click',()=>fanhui.delete());
            let inputBox=ui.create.div('.dz-inputBox',fanhui);
            inputBox.addEventListener('click',(e)=>{e.stopPropagation()});
            let input=document.createElement('input');
            input.value=planName.innerText;
            inputBox.appendChild(input);
            input.focus();
            let ok=ui.create.div('.inputok','确定',inputBox,()=>{
                if(!input.value.length){
                    inputBox.remove();
                    return;
                }
                planName.innerHTML=input.value.slice(0,4);
                planNames[plan.num-1]=input.value.slice(0,4);
                game.saveExtensionConfig('斗转星移','planNames',planNames);
                inputBox.remove();
            });
        });
        //此方案的禁用武将
        let banChar=lib.config['extension_斗转星移_plan'+plan.num];
        //清空
        let initPack=spDiv.querySelector('.jj-charPackBtn.active');
        let initPack2=true;
        spDiv.innerHTML='';
        contentBg.innerHTML='';
        //武将包内容
        let content=ui.create.div('.kdiv.left',spDiv);
        //武将包循环
        //let initPack=true;
        let offset;
        let allpack=lib.config.all.characters.slice(0);
        if(window.SSJJ_allCharacters) allpack=window.SSJJ_allCharacters.slice(0);
        allpack.addArray(Object.keys(lib.characterPack));
        for(let i of allpack){
            if(lib.config['extension_雷霆万钧_hidePack']&&i=='thunder') continue;
            //武将包按钮
            let charPackBtn=ui.create.div('.jj-charPackBtn',content);
            charPackBtn.onclick=function(){
                charPackClick(this,banChar,plan);
            };
            charPackBtn.id=i;
            //统计武将个数
            let charNum=0;
            let charOpenNum=0;
            for(let n in lib.characterPack[i]){
                let item = lib.character[n]?lib.character[n][4]:[]||[];
                let hasUnseen = false;
                if(item.includes('forbidai')) hasUnseen = 'forbidai';
                if(item.includes('unseen')) hasUnseen = 'unseen';
                let forbidtype=lib.config['extension_斗转星移_JinJiangType'];
                if(hasUnseen=='unseen'){
                    continue;
                }else if(!banChar.includes(n)&&!forbidList.lock.includes(n)) {
                    charOpenNum++;
                }
                //if(!banChar.includes(n)) charOpenNum++;
                charNum++;
            }
            charPackBtn.setAttribute('num1',charOpenNum);
            charPackBtn.setAttribute('num2',charNum);
            charPackBtn.innerHTML='<span style="font-size:22px;font-family:shousha;color:#DFDAD4;">'+lib.translate[charPackBtn.id+'_character_config']+'</span>'+'<br>'+charOpenNum+'/'+charNum;
            if(initPack&&i==initPack.id){
                charPackBtn.onclick();
                offset=charPackBtn.offsetLeft;
                initPack2=false;
            }
            else if(initPack2==true){
                charPackBtn.onclick();
                offset=charPackBtn.offsetLeft;
                initPack2=false;
            }
        }
        content.scrollTo(offset-250,0);
        plan.tempPack=content;
        
    }
    //武将包点击函数
    function charPackClick(charPackBtn,banChar,plan){
        let id=charPackBtn.id;
        qiehuanF(charPackBtn,spDiv,'.jj-charPackBtn.active');
        contentBg.innerHTML='';
        if(charPackBtn.link){
            contentBg.appendChild(charPackBtn.link);
            return;
        }
        if(game.createCss) {
            game.createCss(`.dzxy_noclick{
                /*pointer-events: none;*/
                filter: grayscale(1);
            }`);
        }
        //武将内容
        let content=ui.create.div('.kdiv',contentBg);
        content.style.height='100%';
        //能禁
        ui.create.div('.canBanTxt',content);
        let content1=ui.create.div('.kdiv',content);
        //已禁
        ui.create.div('.okBanTxt',content);
        let content2=ui.create.div('.kdiv',content);
        
        for(let i in lib.characterPack[id]){//全部武将循环
            let hasUnseen = false;
            /*if(lib.characterPack[id][i][4]?.includes('forbidai')) hasUnseen = 'forbidai';
            if(lib.characterPack[id][i][4]?.includes('unseen')) hasUnseen = 'unseen';
            if(lib.characterPack[id][i][4]&&lib.characterPack[id][i][4].includes('unseen')&&!lib.characterPack[id][i][4].includes('imforbid')) continue;*/
            if(lib.character[i][4]?.includes('forbidai')) hasUnseen = 'forbidai';
            if(lib.character[i][4]?.includes('unseen')) hasUnseen = 'unseen';
            if(lib.character[i][4]&&lib.character[i][4].includes('unseen')&&!lib.character[i][4].includes('imforbid')) continue;
            //武将背景
            let charBg=ui.create.div('.jj-charBg');
            let charPic=ui.create.div('.jj-charPic',charBg,function(){
                charClick(banPic,banChar,plan,charPic.isNoclick);
            });
            charPic.setBackground(i, 'character');
            charPic.style.backgroundSize=jjImgControl[0];
            charPic.style.backgroundPositionY=jjImgControl[1];
            //长按
            charPic.addEventListener('touchstart',function(){
                charLongpress(banPic,starBg,id);
            });
            charPic.addEventListener('touchend',function(event){
                clearTimeout(time);
            });
            charPic.addEventListener('touchmove',function(event){
                clearTimeout(time);
            });
            charPic.onmousedown=function(e){
				if(e.button==2){
					charLongpress(banPic,starBg,id);
				}
			}
            //ID
            let charName=ui.create.div('.ss-textdiv',charPic);
            let double=get.is.double(i,true);
            if(!lib.config['extension_斗转星移_jjGroupColor']) charName.style.backgroundColor=getGroupColor('close');
            else if(double){
                let color1=getGroupColor(double[0]);
                let color2=getGroupColor(double[1]);
                charName.style.background=`linear-gradient(to right,${color1},${color2})`;
            }
            else{
                let group=lib.characterPack[id][i][1];
                charName.style.backgroundColor=getGroupColor(group);
            }
            charName.innerHTML=lib.translate[i];
            //星
            let starBg=ui.create.div('.charStar',charPic);
            let star;
            if(lib.config['extension_斗转星移_setCharStars'][i]){
                star=lib.config['extension_斗转星移_setCharStars'][i];
                starBg.innerHTML='<span style="font-size:24px;font-family:shousha;">'+star[0]+'</span>';
            }
            else{
                switch(game.getRarity(i)){
                    case 'legend': star=10;break;
                    case 'epic': star=8;break;
                    case 'rare': star=6;break;
                    case 'junk': star=2;break;
                    default: star=4;
                }
                starBg.innerHTML='<span style="font-size:24px;font-family:shousha;">'+star+'</span>';
            }
            
            //禁用图
            let banPic;
            banPic=ui.create.div('.jj-banPic',charPic);
            banPic.id=i;
            let forbidtype=lib.config['extension_斗转星移_JinJiangType']||'forbidai';
            if(!banChar.includes(i)&&!forbidList.lock.includes(i)) {
                content1.appendChild(charBg);
                banPic.style.display='none';
            }else {
                if(forbidList.lock.includes(i)) {
                    charBg.classList.add('dzxy_noclick'); // 添加特殊样式类
                    charPic.isNoclick=i;
                }
                content2.appendChild(charBg);
            }
        }
        charPackBtn.link=content;
    }
    function dzxy_prompt(){
		var str,forced,callback,noinput=false,str2='';
		for(var i=0;i<arguments.length;i++){
			if(arguments[i]=='alert'){
				forced=true;
				callback=function(){};
				noinput=true;
			}
			else if(typeof arguments[i]=='string'){
				if(arguments[i].indexOf('###')==0){
					var list=arguments[i].slice(3).split('###');
					str=list[0];
					str2=list[1];
				}
				else str=arguments[i];
			}
			else if(typeof arguments[i]=='boolean'){
				forced=arguments[i];
			}
			else if(typeof arguments[i]=='function'){
				callback=arguments[i];
			}
		}
		if(!callback){
			return;
		}
		//try{
		//	if(noinput){
		//		throw('e');
		//	}
		//	var result=prompt(str);
		//	callback(result);
		//}
		//catch(e){
			var promptContainer=ui.create.div('.popup-container',ui.window,function(){
				if(this.clicked){
					this.clicked=false;
				}
				else{
					clickCancel();
				}
			});
			promptContainer.style.zIndex=250;
			var dialogContainer=ui.create.div('.prompt-container',promptContainer);
			var dialog=ui.create.div('.menubg',ui.create.div(dialogContainer),function(){
				promptContainer.clicked=true;
			});
			var strnode=ui.create.div('',str||'',dialog);
			var input=ui.create.node('input',ui.create.div(dialog));
			input.value=str2;
			if(noinput){
				input.style.display='none';
			}
			var controls=ui.create.div(dialog);
			var clickConfirm=function(){
				if(noinput){
					promptContainer.remove();
				}
				else if(input.value){
					callback(input.value);
					promptContainer.remove();
				}
			}
			var clickCancel=function(){
				if(!forced){
					callback(false);
					promptContainer.remove();
				}
			}
			var confirmNode=ui.create.div('.menubutton.large.disabled','确定',controls,clickConfirm);
			if(!forced){
				ui.create.div('.menubutton.large','取消',controls,clickCancel);
			}
			if(noinput){
				confirmNode.classList.remove('disabled');
			}
			else{
				input.onkeydown=function(e){
					if(e.keyCode==13){
						clickConfirm();
					}
					else if(e.keyCode==27){
						clickCancel();
					}
				}
				input.onkeyup=function(){
					if(input.value){
						confirmNode.classList.remove('disabled');
					}
					else{
						confirmNode.classList.remove('disabled');
					}
				}
				input.focus();
			}
		//}
	};
    //武将点击
    function charClick(banPic,banChar,plan,isNoclick){
        if(typeof isNoclick=='string') {
            let prompt = get.translation(isNoclick)+'已在其他设置被锁定';
            if(lib.config['extension_手杀全扩_jinjiang'] || lib.config['extension_手杀全扩_jinjiang2']) {
                prompt = get.translation(isNoclick)+'已锁定，请检查「'+get.trExtensionName('手杀全扩')+'」扩展设置';
            }
            dzxy_prompt(prompt,'alert');
            return;
        }
        let packAct=spDiv.querySelector('.jj-charPackBtn.active');
        let num1=packAct.getAttribute('num1');
        let num2=packAct.getAttribute('num2');
        
        if(banPic.style.display=='none'){
            banPic.style.display='inline-block';//禁用
            banChar.add(banPic.id);
            num1--;
            packAct.setAttribute('num1',num1);
        }
        else{
            banPic.style.display='none';//启用
            banChar.remove(banPic.id);
            num1++;
            packAct.setAttribute('num1',num1);
        }
        game.saveExtensionConfig('斗转星移','plan'+plan.num,banChar);
        packAct.innerHTML='<span style="font-size:22px;font-family:shousha;color:#DFDAD4;">'+lib.translate[packAct.id+'_character_config']+'</span>'+'<br>'+packAct.getAttribute('num1')+'/'+packAct.getAttribute('num2');
    }
    //设置函数
    function setClick(){
        //返回
        let fanhui=ui.create.div('.dz-bigBg1',bigBg);
        fanhui.addEventListener('click',()=>fanhui.delete());
        
        let setBg=ui.create.div('.jj-SetBg.dz-center1',fanhui);
        setBg.addEventListener("click",(e)=>e.stopPropagation());
        
        let content=ui.create.div('.kdiv',setBg);
        content.style.height='310px';
        content.style.width='610px';
        content.style.left='40px';
        content.style.top='70px';
        //上面的方案文字
        let planTextbox=ui.create.div('.planTextBox',setBg);
        let yxms=ui.create.div('.kdiv','游戏模式',planTextbox);
        yxms.style.width='100px';
        let planTexts=['无'];
        planTexts.addArray(lib.config['extension_斗转星移_planNames']);
        for(let i of planTexts){
            let planText=ui.create.div('.planText',i,planTextbox);
        }

        var allMode=lib.config.all.mode.concat(['paiwei','freegame']);
        lib.translate['paiwei']='排位';
        lib.translate['freegame']='娱乐';
        for(let mode of allMode){
            let plan=ui.create.div('.hor-box1',content);
            //模式文字
            let modeText=ui.create.div('.kdiv',lib.translate[mode],plan);
            modeText.style.width='100px';
            //四个点
            for(let n=0;n<4;n++){
                let subplan=ui.create.div('.subplan',plan,function(){
                    qiehuanF(this,plan,'.subplan.active');
                    game.saveExtensionConfig('斗转星移','modePlan_'+mode,n);
                });
                if(lib.config['extension_斗转星移_modePlan_'+mode]==n){
                    subplan.classList.add('active');
                }
            }
        }
    };
    //全部禁用
    function allBanClick(){
        let allBan=banCharBox.querySelectorAll('.jj-banPic');
        let plan=banPlanBox.querySelector('.banPlanBtn.active');
        let banChar=lib.config['extension_斗转星移_plan'+plan.num];
        for(let i of allBan){
            banChar.add(i.id);
            i.style.display='inline-block';
        }
        game.saveExtensionConfig('斗转星移','plan'+plan.num,banChar);
        let packAct=spDiv.querySelector('.jj-charPackBtn.active');
        let num2=packAct.getAttribute('num2');
        packAct.setAttribute('num1',0);
        packAct.innerHTML='<span style="font-size:22px;font-family:shousha;color:#DFDAD4;">'+lib.translate[packAct.id+'_character_config']+'</span>'+'<br>'+0+'/'+num2;
    }
    //全部开启
    function allOpenClick(){
        let allOpen=banCharBox.querySelectorAll('.jj-banPic');
        let plan=banPlanBox.querySelector('.banPlanBtn.active');
        let banChar=lib.config['extension_斗转星移_plan'+plan.num];
        let nowNum=0;
        for(let i of allOpen){
            if(forbidList.lock.includes(i.id)) continue;
            banChar.remove(i.id);
            i.style.display='none';
            nowNum++;
        }
        game.saveExtensionConfig('斗转星移','plan'+plan.num,banChar);
        let packAct=spDiv.querySelector('.jj-charPackBtn.active');
        let num2=packAct.getAttribute('num2');
        packAct.setAttribute('num1',nowNum);
        packAct.innerHTML='<span style="font-size:22px;font-family:shousha;color:#DFDAD4;">'+lib.translate[packAct.id+'_character_config']+'</span>'+'<br>'+nowNum+'/'+num2;
    }
    //导出数据
    function outputData(){
        let fanhui=ui.create.div('.dz-bigBg1',bigBg);
        fanhui.addEventListener('click',(e)=>fanhui.delete());
        let box=ui.create.div('.dz-box2.dz-center1',fanhui);
        box.addEventListener("click",(e)=>e.stopPropagation());
        box.style.width='375px';
        box.style.height='265px';
        let text=ui.create.div('.kdiv.left',box);
        text.style.height='200px';
        let plan=banPlanBox.querySelector('.banPlanBtn.active');
        let planText=plan.innerText;
        text.innerHTML='<span style="word-break:break-all;font-size:22px;font-family:shousha;color:#DFDAD4;text-shadow: 0px 0px 1px black,0px 0px 1px black,0px 0px 2px black,0px 0px 2px black;">'+'路径:斗转星移/data/outputPlan<br>'+'此操作将会在路径下保存('+planText+')方案，如若存在同名文件则会覆盖，是否确认导出此方案?'+'</span>';
        
        let ok=ui.create.div('.dz-okBtn',box,function(){
            ok.style.display='none';
            let path='extension/斗转星移/data/outputPlan/';
            let plan=banPlanBox.querySelector('.banPlanBtn.active');
            let str=`['`;
            str+=lib.config['extension_斗转星移_plan'+plan.num].join("','");
            str+=`']`;
            //game.writeFile(str,path,plan.innerText,()=>{alert('操作完成')});
            game.writeFile(str,path,plan.innerText,function(){});
            setTimeout(()=>{
				alert('操作完成');
			},300);
        });
    }
    //导入数据
    function inputData(){
    game.getFileList('extension/斗转星移/data/inputPlan',function(folders,files){
        let fanhui=ui.create.div('.dz-bigBg1',bigBg);
        fanhui.addEventListener('click',(e)=>fanhui.delete());
        let box=ui.create.div('.dz-box2.dz-center1',fanhui);
        box.addEventListener("click",(e)=>e.stopPropagation());
        box.style.width='375px';
        box.style.height='265px';
        let text=ui.create.div('.kdiv',box);
        text.style.height='65px';
        let plan=banPlanBox.querySelector('.banPlanBtn.active');
        let planText=plan.innerText;
        text.innerHTML='<span style="font-size:22px;font-family:shousha;color:#DFDAD4;text-shadow: 0px 0px 1px black,0px 0px 1px black,0px 0px 2px black,0px 0px 2px black;">'+'选择路径斗转星移/data/inputPlan下的一个方案覆盖当前方案('+planText+')</span>';
        let plans=ui.create.div('.kdiv',box);
        plans.style.height='140px';
        let choose;
        if(files.length){
            for(let i of files){
                ui.create.div('.fy-btn',plans,function(){
                    qiehuanF(this,plans,'.fy-btn.active');
                    choose=i;
                }).innerHTML=i;
            }
        }
        let ok=ui.create.div('.dz-okBtn',box,function(){
            if(!choose){alert('请选择要导入的方案');return;}
            game.readFileAsText('extension/斗转星移/data/inputPlan/'+choose,function(data){
                let list;
                try{
                    list=eval(data);
                }catch(e){
                    alert('该文件数据错误');
                }
                if(Array.isArray(list)){
                    game.saveExtensionConfig('斗转星移','plan'+plan.num,list);
                    alert('导入成功，请在「禁将方案」处应用');
                    if(planNodes[plan.num]?.onclick) {
                        planNodes[plan.num].onclick();
                    }
                }
                else alert('该文件数据错误');
            });
        });
    },function(){alert('请检查文件路径extension/斗转星移/data/inputPlan是否完整')});
    }
    function imgControl(){
        let fanhui=ui.create.div('.dz-bigBg1',bigBg);
        fanhui.style.backgroundColor='rgba(0,0,0,0)';
        fanhui.addEventListener('click',(e)=>{
            game.saveExtensionConfig('斗转星移','jjImgControl',jjImgControl);
            fanhui.delete();
        });
        let box=ui.create.div('.dz-box2.dz-center1',fanhui);
        box.addEventListener("click",(e)=>e.stopPropagation());
        box.style.padding='30px';
        box.style.width='250px';
        box.style.fontSize='22px';
        //原画大小
        let sizeBox=ui.create.div('.sp-kdiv2',box);
        ui.create.div('.ss-textdiv2','原画大小',sizeBox);
        ui.create.div('.dz-jian',sizeBox,()=>{
            let num=parseInt(jjImgControl[0]);
            num-=10;
            num=String(num)+'%';
            sizetext.innerHTML=num;
            jjImgControl[0]=num;
        });
        let sizetext=ui.create.div('.ss-textdiv2',sizeBox);
        sizetext.innerHTML=jjImgControl[0];
        sizetext.style.position='relative';
        ui.create.div('.dz-jia',sizeBox,()=>{
            let num=parseInt(jjImgControl[0]);
            num+=10;
            num=String(num)+'%';
            sizetext.innerHTML=num;
            jjImgControl[0]=num;
        });
        //原画上移
        let yBox=ui.create.div('.sp-kdiv2',box);
        ui.create.div('.ss-textdiv2','原画上移',yBox);
        ui.create.div('.dz-jian',yBox,()=>{
            let num=parseInt(jjImgControl[1]);
            num-=2;
            num=String(num)+'%';
            ytext.innerHTML=num;
            jjImgControl[1]=num;
        });
        let ytext=ui.create.div('.ss-textdiv2',yBox);
        ytext.innerHTML=jjImgControl[1];
        ui.create.div('.dz-jia',yBox,()=>{
            let num=parseInt(jjImgControl[1]);
            num+=2;
            num=String(num)+'%';
            ytext.innerHTML=num;
            jjImgControl[1]=num;
        });
    }
    //武将长按
    function charLongpress(banPic,starBg,pack){
    time=setTimeout(()=>{
        let bigBg2=ui.create.div('.dz-bigBg1',bigBg);
        bigBg2.setBackgroundImage('extension/斗转星移/image/bg_lobby.jpg');
        //技能描述
        let skillsBox=ui.create.div('.dz-box2',bigBg2);
        skillsBox.style.width='400px';
        skillsBox.style.height='300px';
        skillsBox.style.top='50%';
        skillsBox.style.left='50%';
        skillsBox.style.transform='translate(-510px,-50%)';
        skillsBox.style.textShadow='none';
        let content=ui.create.div('.kdiv',skillsBox);
        content.style.height='100%';
        let skills=lib.characterPack[pack][banPic.id][3].slice(0);
        for(let i of skills){
            let info=get.info(i);
            if(!info) continue;
            if(!info.derivation) continue;
            if(typeof info.derivation=='string'){
                skills.add(info.derivation);
            }
            else{
                skills.addArray(info.derivation);
            }
        }
        for(let i of skills){
            let skillBox=ui.create.div('.kdiv',content);
            skillBox.style.textAlign='left';
            let skillName=lib.translate[i];
            let skillInfo=lib.translate[i+'_info'];
            skillBox.innerHTML='<span style="font-size:18px;font-family:shousha;color:#e1ed2e;">'+skillName+'：'+'</span>'+'<span style="font-size:18px;font-family:shousha;color:black;">'+skillInfo+'</span>';
        }
        //资料页
        let ziliaoye=ui.create.div('.ziliaoye',bigBg2);
        let container=ui.create.div('.kdiv',ziliaoye);
        container.style.top='16%';
        container.style.left='3%';
        container.style.width='92%';
        container.style.height='78%';
        container.style.overflow='auto';
        //返回保存
        let back=ui.create.div('.dz-returnBtn',bigBg2);
        back.addEventListener('click',()=>{
            game.playAudio('../extension/斗转星移/audio/fanhui.mp3');
            if(save){
                let list=ziliaoye.querySelectorAll('.dz-shenfenqiangdu');
                let listx=[];
                for(let i of list){
                    listx.push(Number(i.innerHTML));
                }
                lib.config.extension_斗转星移_setCharStars[banPic.id]=listx;
                game.saveExtensionConfig('斗转星移','setCharStars',lib.config.extension_斗转星移_setCharStars);
                starBg.innerHTML='<span style="font-size:24px;font-family:shousha;">'+listx[0]+'</span>';
            }
            bigBg2.delete();
        });
        //条形图
        let star;
        let save=false;
        if(lib.config['extension_斗转星移_setCharStars'][banPic.id]){
            star=lib.config['extension_斗转星移_setCharStars'][banPic.id];
        }
        else{
            switch(game.getRarity(banPic.id)){
                case 'legend': star=10;break;
                case 'epic': star=8;break;
                case 'rare': star=6;break;
                case 'junk': star=2;break;
                default: star=4;
            }
        }
        let starList=[];
        if(typeof star=='number'){
            for(let i=0;i<7;i++){
                starList.push(star);
            }
        }
        else starList=star.slice();
        let list=['quanneng','zhu','zhong','fan','nei','dizhu','nong']
        for(let i=0;i<7;i++){
            let barChart=ui.create.div('.barChart-box',container);
            let shenfen=ui.create.div('.barChart-shenfen',barChart);
            shenfen.setBackgroundImage('extension/斗转星移/image/'+list[i]+'.png');
            let jindutiao=ui.create.div('.dz-jindutiao',barChart);
            let length=starList[i]*10;
            jindutiao.style.clipPath=`polygon(0% 0%,${length}% 0%,${length}% 100%,0% 100%)`;
            let xingji=ui.create.div('.dz-shenfenqiangdu',String(starList[i]),barChart,function(){
                let has=ziliaoye.querySelector('.set-starbox');
                if(has){
                    has.delete();
                }
                save=true;
                let setStarBox=ui.create.div('.set-starbox',ziliaoye);
                for(let j=10;j>=0;j--){
                    let btn=ui.create.div('.jj-gnBtn',String(j),setStarBox,function(){
                    let length=j*10;
                    jindutiao.style.clipPath=`polygon(0% 0%,${length}% 0%,${length}% 100%,0% 100%)`;
                    xingji.innerHTML=j;
                    setStarBox.delete();
                    });
                }
            });
        }
        
    },400);
    }
};
/*-----------------------------------------强化选将-----------------------------------------*/
var offline=sessionStorage.getItem('Network');
if(!offline) offline='online';
if(offline=='online'&&lib.config.extension_斗转星移_AIqianghuaXuanjiang){
if(lib.config.mode=='doudizhu'){
	if(false) game.chooseCharacterHuanle=function(){
		var next=game.createEvent('chooseCharacter');
		next.setContent(function(){
			"step 0"
			ui.arena.classList.add('choose-character');
			game.no_continue_game=true;
			var i;
			event.list=[];
			event.list2=[];
			var list4=[];
			if(!event.map) event.map={};
			for(i in lib.characterReplace){
				var ix=lib.characterReplace[i];
				for(var j=0;j<ix.length;j++){
					if(lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
				}
				if(ix.length){
					var name=ix.randomGet();
					event.list.push(name);
					if(game.recommendDizhu.includes(name)) event.list2.push(name);
					list4.addArray(ix);
				}
			}
			for(i in lib.character){
				if(list4.includes(i)||lib.filter.characterDisabled(i)) continue;
				event.list.push(i);
				if(game.recommendDizhu.includes(i)) event.list2.push(i);
			}
			event.list.randomSort();
			_status.characterlist=event.list.slice(0);
			event.controls=['不叫','叫地主'];
			for(var player of game.players){
				var id=player.playerid;
				if(!event.map[id]) event.map[id]=[];
				event.map[id].addArray(event.list2.randomRemove(1));
				event.list.removeArray(event.map[id]);
				event.map[id].addArray(event.list.randomRemove(4-event.map[id].length));
				event.list2.removeArray(event.map[id]);
			}
			event.dialog=ui.create.dialog('你的选将框',[event.map[game.me.playerid],'character']);
			//修复空栏
			ui.update();
			event.start=game.players.randomGet();
			event.current=event.start;
			lib.init.onfree();
			game.delay(2.5);
			"step 1"
			event.current.chooseControl(event.controls).set('ai',function(){
				return Math.random()>0.5?'不叫':'叫地主';
			});
			if(event.current==game.me){
				event.dialog.content.childNodes[0].innerHTML='是否抢地主？';
			}
			"step 2"
			event.current.chat(result.control);
			if(result.control=='叫地主'||event.current==event.start.next){
				game.zhu=result.control=='叫地主'?event.current:event.current.next;
				for(var player of game.players){
					player.identity=player==game.zhu?'zhu':'fan';
					player.showIdentity();
				}
				event.dialog.close();
				event.map[game.zhu.playerid].addArray(event.list.randomRemove(3));
			}
			else{
				event.current=event.current.next;
				event.goto(1);
				game.delay(1.5);
			}
			"step 3"
			game.me.chooseButton([game.modeGoldTitle('请选择你的武将'),[event.map[game.me.playerid],'character']],true);
			"step 4"
			game.me.init(result.links[0]);
			for(var player of game.players){
			//修改开始
				if(player!=game.me){
				    //game.log('已匹配高强度对手…');
				    var listc;
    		        if(player==game.zhu){
    			        listc=dzxy.charSort(event.map[player.playerid],'地主');
    			        //80%概率选第一个
        		        if(Math.random()<0.8) player.init(listc[0]);
        		        else{
        		            let score1=dzxy.getRankScore(listc[0],'地主');
        		            let score2=dzxy.getRankScore(listc[1],'地主');
        		            //差距1分以内
        		            if(score1-score2<=1&&score2!=0) player.init(listc[1]);
        		            else player.init(listc[0]);
        		        }
    			    }
    			    else{
    			        listc=dzxy.charSort(event.map[player.playerid],'农民');
        			    //70%概率选第一个
        		        if(Math.random()<0.7) player.init(listc[0]);
        		        else{
        		            let score1=dzxy.getRankScore(listc[0],'农民');
        		            let score2=dzxy.getRankScore(listc[1],'农民');
        		            //差距2分以内
        		            if(score1-score2<=2&&score2!=0) player.init(listc[1]);
        		            else player.init(listc[0]);
        		        }
    			    }
				    //player.init(event.map[player.playerid].randomGet());
				}
		    //修改结束
			}
			game.zhu.hp++;
			game.zhu.maxHp++;
			game.zhu.update();
			for(var i=0;i<game.players.length;i++){
				_status.characterlist.remove(game.players[i].name1);
				_status.characterlist.remove(game.players[i].name2);
			}
			setTimeout(function(){
				ui.arena.classList.remove('choose-character');
			},500);
		});
	};
	game.chooseCharacter=function(){
		if(_status.mode=='kaihei'){
			game.chooseCharacterKaihei();
			return;
		}
		if(_status.mode=='huanle'){
			game.chooseCharacterHuanle();
			return;
		}
		if(_status.mode=='online'){
			game.chooseCharacterZhidou();
			return;
		}
		if(_status.mode=='binglin'){
			game.chooseCharacterBinglin();
			return;
		}
		var next=game.createEvent('chooseCharacter');
		next.showConfig=true;
		next.addPlayer=function(player){
			var list=get.identityList(game.players.length-1);
			var list2=get.identityList(game.players.length);
			for(var i=0;i<list.length;i++) list2.remove(list[i]);
			player.identity=list2[0];
			player.setIdentity('cai');
		};
		next.removePlayer=function(){
			return game.players.randomGet(game.me,game.zhu);
		};
		next.ai=function(player,list,list2,back){
			var listc=list.slice(0);//修改
			for(var i=0;i<listc.length;i++){
				var listx=lib.characterReplace[listc[i]];
				if(listx&&listx.length) listc[i]=listx.randomGet();
			}
			//修改开始
			//game.log('强化选将生效');
		    //game.log('已匹配高强度对手…');
			if(get.config('double_character')){
			    //避免全是高强度武将
			    if(player==game.zhu){
			        listc=dzxy.charSort(listc,'地主');
			        player.init(listc[0],listc.slice(1).randomGet());
			    }
				else{
				    listc=dzxy.charSort(listc,'农民');
				    player.init(listc[0],listc.slice(1).randomGet());
				}
			}
			else{
			    if(player==game.zhu){
			        listc=dzxy.charSort(listc,'地主');
			        //80%概率选第一个
    		        if(Math.random()<0.8) player.init(listc[0]);
    		        else{
    		            let score1=dzxy.getRankScore(listc[0],'地主');
    		            let score2=dzxy.getRankScore(listc[1],'地主');
    		            //差距2分以内
    		            if(score1-score2<=1&&score2!=0) player.init(listc[1]);
    		            else player.init(listc[0]);
    		        }
			    }
			    else{
			        listc=dzxy.charSort(listc,'农民');
    			    //70%概率选第一个
    		        if(Math.random()<0.7) player.init(listc[0]);
    		        else{
    		            let score1=dzxy.getRankScore(listc[0],'农民');
    		            let score2=dzxy.getRankScore(listc[1],'农民');
    		            //差距2分以内
    		            if(score1-score2<=2&&score2!=0) player.init(listc[1]);
    		            else player.init(listc[0]);
    		        }
			    }
			}
			//修改结束
			if(player==game.zhu){
				player.hp++;
				player.maxHp++;
				player.update();
			}
			if(back){
				list.remove(get.sourceCharacter(player.name1));
				list.remove(get.sourceCharacter(player.name2));
				for(var i=0;i<list.length;i++){
					back.push(list[i]);
				}
			}
			if(typeof lib.config.test_game=='string'&&player==game.me.next){
				player.init(lib.config.test_game);
			}
			player.node.name.dataset.nature=get.groupnature(player.group);
		}
		next.setContent(function(){
			"step 0"
			ui.arena.classList.add('choose-character');
			var i;
			var list;
			var list4=[];
			var identityList=['zhu','fan','fan'];
			var chosen=lib.config.continue_name||[];
			game.saveConfig('continue_name');
			event.chosen=chosen;

			var addSetting=function(dialog){
				dialog.add('选择身份').classList.add('add-setting');
				var table=document.createElement('div');
				table.classList.add('add-setting');
				table.style.margin='0';
				table.style.width='100%';
				table.style.position='relative';

				var listi=['random','zhu','fan'];
				var ideChoosing=false;
				for(var i=0;i<listi.length;i++){
					var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					td.link=listi[i];
					if(td.link===game.me.identity){
						td.classList.add('bluebg');
					}
					table.appendChild(td);
					td.innerHTML='<span>'+get.translation(listi[i]+'2')+'</span>';
					td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
						if(_status.dragged) return;
						if(_status.justdragged) return;
						if(ideChoosing) return;
						ideChoosing=true;
                        setTimeout(function(){
                            ideChoosing=false;
                        },500);
						_status.tempNoButton=true;
						setTimeout(function(){
							_status.tempNoButton=false;
						},500);
						var link=this.link;
						if(game.zhu.name){
							if(link!='random'){
								_status.event.parent.fixedseat=get.distance(game.me,game.zhu,'absolute');
							}
							game.zhu.uninit();
							delete game.zhu.isZhu;
							delete game.zhu.identityShown;
						}
						var current=this.parentNode.querySelector('.bluebg');
						if(current){
							current.classList.remove('bluebg');
						}
						current=seats.querySelector('.bluebg');
						if(current){
							current.classList.remove('bluebg');
						}
						if(link=='random'){
							link=['zhu','fan'].randomGet();
							for(var i=0;i<this.parentNode.childElementCount;i++){
								if(this.parentNode.childNodes[i].link==link){
									this.parentNode.childNodes[i].classList.add('bluebg');
								}
							}
						}
						else{
							this.classList.add('bluebg');
						}
						num=get.config('choice_'+link);
						_status.event.parent.swapnodialog=function(dialog,list){
							var buttons=ui.create.div('.buttons');
							var node=dialog.buttons[0].parentNode;
							dialog.buttons=ui.create.buttons(list,'characterx',buttons);
							dialog.content.insertBefore(buttons,node);
							buttons.animate('start');
							node.remove();
							game.uncheck();
							game.check();
							for(var i=0;i<seats.childElementCount;i++){
								if(get.distance(game.zhu,game.me,'absolute')===seats.childNodes[i].link){
									seats.childNodes[i].classList.add('bluebg');
								}
							}
						}
						_status.event=_status.event.parent;
						_status.event.step=0;
						_status.event.identity=link;
						if(link!=(event.zhongmode?'mingzhong':'zhu')){
							seats.previousSibling.style.display='';
							seats.style.display='';
						}
						else{
							seats.previousSibling.style.display='none';
							seats.style.display='none';
						}
						game.resume();
					});
				}
				dialog.content.appendChild(table);

				dialog.add('选择座位').classList.add('add-setting');
				var seats=document.createElement('div');
				seats.classList.add('add-setting');
				seats.style.margin='0';
				seats.style.width='100%';
				seats.style.position='relative';
				var ideChoosing=false;
				for(var i=2;i<=game.players.length;i++){
					var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					td.innerHTML=get.cnNumber(i,true);
					td.link=i-1;
					seats.appendChild(td);
					if(get.distance(game.zhu,game.me,'absolute')===i-1){
						td.classList.add('bluebg');
					}
					td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
						if(_status.dragged) return;
						if(_status.justdragged) return;
						if(ideChoosing) return;
						ideChoosing=true;
                        setTimeout(function(){
                            ideChoosing=false;
                        },500);
						if(get.distance(game.zhu,game.me,'absolute')==this.link) return;
						var current=this.parentNode.querySelector('.bluebg');
						if(current){
							current.classList.remove('bluebg');
						}
						this.classList.add('bluebg');
						for(var i=0;i<game.players.length;i++){
							if(get.distance(game.players[i],game.me,'absolute')==this.link){
								game.swapSeat(game.zhu,game.players[i],false);return;
							}
						}
					});
				}
				dialog.content.appendChild(seats);
				if(game.me==game.zhu){
					seats.previousSibling.style.display='none';
					seats.style.display='none';
				}

				dialog.add(ui.create.div('.placeholder.add-setting'));
				dialog.add(ui.create.div('.placeholder.add-setting'));
				if(get.is.phoneLayout()) dialog.add(ui.create.div('.placeholder.add-setting'));
			};
			var removeSetting=function(){
				var dialog=_status.event.dialog;
				if(dialog){
					dialog.style.height='';
					delete dialog._scrollset;
					var list=Array.from(dialog.querySelectorAll('.add-setting'));
					while(list.length){
						list.shift().remove();
					}
					ui.update();
				}
			};
			event.addSetting=addSetting;
			event.removeSetting=removeSetting;
			event.list=[];
			identityList.randomSort();
			if(event.identity){
				identityList.remove(event.identity);
				identityList.unshift(event.identity);
				if(event.fixedseat){
					var zhuIdentity='zhu';
					if(zhuIdentity!=event.identity){
						identityList.remove(zhuIdentity);
						identityList.splice(event.fixedseat,0,zhuIdentity);
					}
					delete event.fixedseat;
				}
				delete event.identity;
			}
			for(i=0;i<game.players.length;i++){
					game.players[i].identity=identityList[i];
					game.players[i].showIdentity();
					if(identityList[i]=='zhu'){
						game.zhu=game.players[i];
					}
			}

			if(!game.zhu) game.zhu=game.me;
			else{
				game.zhu.setIdentity();
				game.zhu.identityShown=true;
				game.zhu.isZhu=(game.zhu.identity=='zhu');
				game.zhu.node.identity.classList.remove('guessing');
				game.me.setIdentity();
				game.me.node.identity.classList.remove('guessing');
			}
			//选将框分配
			for(i in lib.characterReplace){
				var ix=lib.characterReplace[i];
				for(var j=0;j<ix.length;j++){
					if(chosen.includes(ix[j])||lib.filter.characterDisabled(ix[j])) ix.splice(j--,1);
				}
				if(ix.length){
					event.list.push(i);
					list4.addArray(ix);
				}
			}
			for(i in lib.character){
				if(chosen.includes(i)||list4.includes(i)) continue;
				if(lib.filter.characterDisabled(i)) continue;
				event.list.push(i);
				list4.push(i);
			}
			event.list.randomSort();
			_status.characterlist=list4.slice(0);
			var num=get.config('choice_'+game.me.identity);
			list=event.list.slice(0,num);
			delete event.swapnochoose;
			var dialog;
			if(event.swapnodialog){
				dialog=ui.dialog;
				event.swapnodialog(dialog,list);
				delete event.swapnodialog;
			}
			else{
				var str=game.modeGoldTitle('选择角色');
				if(_status.brawl&&_status.brawl.chooseCharacterStr){
					str=_status.brawl.chooseCharacterStr;
				}
				dialog=ui.create.dialog(str,'hidden',[list,'characterx']);
				if(!_status.brawl||!_status.brawl.noAddSetting){
					if(get.config('change_identity')){
						addSetting(dialog);
					}
				}
			}
			dialog.setCaption(game.modeGoldTitle('选择角色'));
			game.me.setIdentity();

			if(!event.chosen.length){
				game.me.chooseButton(dialog,true).set('onfree',true).selectButton=function(){
					return get.config('double_character')?2:1
				};
			}
			else{
				lib.init.onfree();
			}
			ui.create.cheat=function(){
				_status.createControl=ui.cheat2;
				ui.cheat=ui.create.control('更换',function(){
					if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
						return;
					}
					if(game.changeCoin){
						game.changeCoin(-3);
					}

					event.list.randomSort();
					list=event.list.slice(0,num);

					var buttons=ui.create.div('.buttons');
					var node=_status.event.dialog.buttons[0].parentNode;
					_status.event.dialog.buttons=ui.create.buttons(list,'characterx',buttons);
					_status.event.dialog.content.insertBefore(buttons,node);
					buttons.animate('start');
					node.remove();
					game.uncheck();
					game.check();
				});
				delete _status.createControl;
			};
			if(lib.onfree){
				lib.onfree.push(function(){
					event.dialogxx=ui.create.characterDialog('heightset');
					if(ui.cheat2){
						ui.cheat2.animate('controlpressdownx',500);
						ui.cheat2.classList.remove('disabled');
					}
				});
			}
			else{
				event.dialogxx=ui.create.characterDialog('heightset');
			}

			ui.create.cheat2=function(){
				ui.cheat2=ui.create.control('自由选将',function(){
					if(this.dialog==_status.event.dialog){
						if(game.changeCoin){
							game.changeCoin(50);
						}
						this.dialog.close();
						_status.event.dialog=this.backup;
						this.backup.open();
						delete this.backup;
						game.uncheck();
						game.check();
						if(ui.cheat){
							ui.cheat.animate('controlpressdownx',500);
							ui.cheat.classList.remove('disabled');
						}
					}
					else{
						if(game.changeCoin){
							game.changeCoin(-10);
						}
						this.backup=_status.event.dialog;
						_status.event.dialog.close();
						_status.event.dialog=_status.event.parent.dialogxx;
						this.dialog=_status.event.dialog;
						this.dialog.open();
						game.uncheck();
						game.check();
						if(ui.cheat){
							ui.cheat.classList.add('disabled');
						}
					}
				});
				if(lib.onfree){
					ui.cheat2.classList.add('disabled');
				}
			}
			if(!_status.brawl||!_status.brawl.chooseCharacterFixed){
				if(!ui.cheat&&get.config('change_choice'))
				ui.create.cheat();
				if(!ui.cheat2&&get.config('free_choose'))
				ui.create.cheat2();
			}
			"step 1"
			if(ui.cheat){
				ui.cheat.close();
				delete ui.cheat;
			}
			if(ui.cheat2){
				ui.cheat2.close();
				delete ui.cheat2;
			}
			var chooseGroup=false;
			if(event.chosen.length){
				if(lib.character[event.chosen[0]][1]=='shen'){
					chooseGroup=true;
				}
			}
			else if(event.modchosen){
				if(event.modchosen[0]=='random') event.modchosen[0]=result.buttons[0].link;
				else event.modchosen[1]=result.buttons[0].link;
			}
			else if(result.buttons.length==2){
				event.choosed=[result.buttons[0].link,result.buttons[1].link];
				game.addRecentCharacter(result.buttons[0].link,result.buttons[1].link);
				if(lib.character[event.choosed[0]][1]=='shen'){
					chooseGroup=true;
				}
			}
			else{
				event.choosed=[result.buttons[0].link];
				if(lib.character[event.choosed[0]][1]=='shen'){
					chooseGroup=true;
				}
				game.addRecentCharacter(result.buttons[0].link);
			}
			"step 2"
			if(event.chosen.length){
				game.me.init(event.chosen[0],event.chosen[1]);
			}
			else if(event.modchosen){
				game.me.init(event.modchosen[0],event.modchosen[1]);
			}
			else if(event.choosed.length==2){
				game.me.init(event.choosed[0],event.choosed[1]);
			}
			else{
				game.me.init(event.choosed[0]);
			}
			event.list.remove(get.sourceCharacter(game.me.name1));
			event.list.remove(get.sourceCharacter(game.me.name2));
			if(game.me==game.zhu){
				game.me.hp++;
				game.me.maxHp++;
				game.me.update();
			}

			for(var i=0;i<game.players.length;i++){
				if(game.players[i]!=game.me){
					event.list.randomSort();
					event.ai(game.players[i],event.list.splice(0,get.config('choice_'+game.players[i].identity)),null,event.list)
				}
			}
			"step 3"
			for(var i=0;i<game.players.length;i++){
				_status.characterlist.remove(game.players[i].name1);
				_status.characterlist.remove(game.players[i].name2);
			}
			setTimeout(function(){
				ui.arena.classList.remove('choose-character');
			},500);

		});
	};
}
}
/*-----------------------------------------强化选将-----------------------------------------*/
/*------------------------------------技能描述修改------------------------------------*/
    if(lib.config.extension_斗转星移_miaoshuXiuGai){
            for(let i in lib.skill){
                let intro=lib.translate[i+'_info'];
                if(intro){
                intro=intro.replace(/不大于/g,'temp').replace(/不小于/g,'≥').replace(/temp/g,'≤');
                intro=intro.replace(/阴/g,'temp').replace(/阳/g,'阴').replace(/temp/g,'阳');
                lib.translate[i+'_info']=intro;
                }
            }
            for(let i in lib.dynamicTranslate){
                let intro=String(lib.dynamicTranslate[i]);
                intro=intro.replace(/不大于/g,'temp').replace(/不小于/g,'≥').replace(/temp/g,'≤');
                intro=intro.replace(/阴/g,'temp').replace(/阳/g,'阴').replace(/temp/g,'阳');
                let rep;
                try{
                    lib.dynamicTranslate[i]=eval(`rep=${intro}`);
                }catch(e){
 	                let start=intro.indexOf('(');
                    let rep2=intro.slice(start);
 	                lib.dynamicTranslate[i]=eval(`rep=function${rep2}`);
                }
            }
    }
/*------------------------------------技能描述修改------------------------------------*/
    //禁将 - Helasisy黑科技！
    if(window.lastRunExtensions) {
        window.lastRunExtensions.push({
            priority: -1000,
            content: function() {
                var thismode=lib.config.mode;
                if(lib.brawl) thismode='brawl';
                //let dzxy_nowForbid=[];
                let forbidtype=lib.config['extension_斗转星移_JinJiangType'];
                if(!forbidtype||!['forbidai','unseen'].contains(forbidtype)) forbidtype='unseen';
                window.forbidList={
                    now:[],//目前已经禁止的
                    lock:[],//原本就已经禁的
                };
                for(let p in lib.character) {
                    if(!lib.character[p][4]) continue;
                    let item=lib.character[p][4];
                    if(item.contains('unseen')||item.contains(forbidtype)) {
                        forbidList.now.add(p);
                        forbidList.lock.add(p);
                    }
                }
                if(game.storyBgMode) thismode=game.storyBgMode;
                //alert(thismode);
                var offline=sessionStorage.getItem('Network');
            	if(!offline) offline='offline';
            	var ojbk=lib.config['extension_斗转星移_JinJiangRuZhen'];
            	if(ojbk&&ojbk.indexOf(offline)!=-1&&lib.config.extension_斗转星移_JinJiang&&lib.config['extension_斗转星移_modePlan_'+thismode]!=undefined){
                    let n=lib.config['extension_斗转星移_modePlan_'+thismode];
                    var cantusePlay=lib.config['extension_斗转星移_plan'+n];
                    //lib.config['extension_斗转星移_plan'+plan.num];
                    if(lib.config['extension_斗转星移_plan'+n]!=undefined){
                        //dzxy.tempmode=lib.config.mode;
                        //换种方式，太狗八粗暴了
                        //lib.config.characters=[].concat(lib.config['extension_斗转星移_planPack'+n]);
                        dzxy.tempmode=thismode;
                        for(var i=0;i<cantusePlay.length;i++) {
                            var him=cantusePlay[i];
                            if(lib.character[him]&&lib.character[him][4]) {
                                var currentItem = lib.character[him][4];
                                /*if(!currentItem.contains('unseen')&&!currentItem.contains(forbidtype)) {
                                    //lib.character[him][4].add('dzxy_nowForbid');
                                }*/
                                lib.character[him][4].add(forbidtype);
                                if(forbidtype=='unseen') lib.character[him][4].add('imforbid');
                            }
                        }
                    }
                }
            }
        });
    }
},precontent:function(){//启动
    //导入css
    lib.init.css(lib.assetURL+'extension/斗转星移','base');
    
	//全局变量
    window.dzxy={
        picPath:'extension/斗转星移/image/',
        dz:'extension_斗转星移_',
        getRankScore:function(char,identity){
            let rank={
    		    junk:2,
                common:4,
                rare:6,
                epic:8,
                legend:10,
    		};
            let score;
            //设置星级
            if(!lib.config.extension_斗转星移_setCharStars) lib.config.extension_斗转星移_setCharStars={};
            let save=lib.config.extension_斗转星移_setCharStars[char];
            if(save){
    		    switch(identity){
		            case '全能':score=save[0];break;
		            case '主公':score=save[1];break;
		            case '忠臣':score=save[2];break;
		            case '反贼':score=save[3];break;
		            case '内奸':score=save[4];break;
		            case '地主':score=save[5];break;
		            case '农民':score=save[6];break;
		        }
		    }
		    else score=rank[game.getRarity(char)];
		    return score;
        },
        charSort:function(list,identity){
    		let charobj={};
    		for(let i of list){
    		    charobj[i]=dzxy.getRankScore(i,identity);
    		}
    		//console.log(charobj);
    		let keysSorted=Object.keys(charobj).sort(function(a,b){return charobj[b]-charobj[a]});
            let newObj={};
            for(let i=0;i<keysSorted.length;i++){
    	        newObj[keysSorted[i]]=charobj[keysSorted[i]];
            }
            //console.log(newObj);
            return keysSorted;
        },
        playAudio:function(path){//因为game.playAudio要播放完才能播，就复制部分过来了
            let audio=document.createElement('audio');
            audio.src=`${lib.assetURL}extension/斗转星移/${path}`;
			audio.autoplay=true;
			audio.volume=lib.config.volumn_audio/8;
			audio.onended=(event)=>audio.remove();
	        audio.onerror=(event)=>{
			    audio.remove();
			    if(onError) onError(event);
		    };
        }
        
    };
    window.qiehuanF=(ele1,ele2,className)=>{//切换按钮函数
        let act=ele2.querySelectorAll(className);
        for(let i of act){
            i.classList.remove("active");
        }
        ele1.classList.add("active");
    };
    //武将星级排序
    //禁将
    /*var thismode=lib.config.mode;
    if(lib.brawl) thismode='brawl';
    if(lib.config.extension_斗转星移_JinJiang&&lib.config['extension_斗转星移_modePlan_'+thismode]!=undefined){
        let n=lib.config['extension_斗转星移_modePlan_'+thismode];
        var canusePlay=lib.config['extension_斗转星移_planPack'+n];
        var forbidtype=lib.config['extension_斗转星移_JinJiangType'];
        if(!forbidtype||!['forbidai','unseen'].contains(forbidtype)) forbidtype='unseen';
        if(lib.config['extension_斗转星移_planPack'+n]!=undefined){
            //dzxy.tempmode=lib.config.mode;
            //换种方式，太狗八粗暴了
            //lib.config.characters=[].concat(lib.config['extension_斗转星移_planPack'+n]);
            dzxy.tempmode=thismode;
            for(var him in lib.character) {
                if(lib.character[him][4]&&!canusePlay.contains(him)) {
                    lib.character[him][4].add(forbidtype);
                }
            }
        }
    }*/
    //必须这样修改，目前问题未知
    lib.config.characters=lib.config.all.characters;
    
//主菜单美化
if(lib.config.extension_斗转星移_qidongyeMeiHua){
    var timer,openNum=0;
    timer=setInterval(mainMenuF,17);
}
function mainMenuF(){
    openNum++;
    if(openNum>50) clearInterval(timer);
    let splash=document.getElementById("splash");
    if(splash){
        clearInterval(timer);
        //播放音乐
        let backgroundMusic=document.createElement('audio');
        backgroundMusic.src=`${lib.assetURL}extension/斗转星移/audio/outgame.mp3`;
	    backgroundMusic.autoplay=true;
	    backgroundMusic.loop=true;
        backgroundMusic.play();
        //大背景
        let mainBg=ui.create.div('.dz-bigBg2',document.body);
        if(lib.config.extension_斗转星移_qnssBackground&&lib.config.image_background){
             mainBg.setBackgroundImage("image/background/" + lib.config.image_background + ".jpg");
        }
        //主菜单
        let mainMenu=ui.create.div('.kdiv2',mainBg);
        //主菜单中间
        let menuCenter=ui.create.div('.menu-center',mainMenu);
        //模式
        let modes=document.querySelectorAll('.splashtext');
        let modeObj={};
        for(let i=0;i<modes.length;i++){
            modeObj[modes[i].innerHTML.replaceAll('<br>','')]=i;
        }
        //经典
        let jingdian=ui.create.div('.jingdian',menuCenter,function(){
            mainMenu.style.display='none';
            let subMenu=ui.create.div('.kdiv2',mainBg);
            let box=ui.create.div('.dz-bg2',subMenu);
            let modeBg=ui.create.div('.modebg',box);
            let modeBoxs=ui.create.div('.mode-boxs',subMenu);
            //返回按钮
            ui.create.div('.dz-returnBtn',subMenu,function(){
                mainMenu.style.display='inline-block';
                subMenu.delete();
            });
            let modeList=['军争5','军争8','国战'];
            let selectMode;
            for(let i of modeList){
                let mode=ui.create.div('.dz-modeBtn',i,modeBoxs,function(){
                    qiehuanF(this,modeBoxs,'.dz-modeBtn.active');
                    selectMode=i;
                    game.saveExtensionConfig('斗转星移','exModeConfig_jingdian',i);
                });
                if(lib.config[`${dzxy.dz}exModeConfig_jingdian`]==i){
                    mode.classList.add('active');
                    selectMode=i;
                }
            }
            //开战
            let kaizhan=ui.create.div('.kaizhan',box,function(){
                _status.touchconfirmed=false;
                switch(selectMode){
                    case '军争5':game.saveConfig('player_number',5,'identity');modes[modeObj['身份']].click();break;
                    case '军争8':game.saveConfig('player_number',8,'identity');modes[modeObj['身份']].click();break;
                    case '国战':modes[modeObj['国战']].click();break;
                }
                _status.touchconfirmed=true;
                setTimeout(()=>{mainBg.delete()},700);
                backgroundMusic.pause();
            });
        });
        //排位
        let paiwei=ui.create.div('.paiwei',menuCenter);
        //自由
        let ziyou=ui.create.div('.ziyou',menuCenter);
        //至尊
        let zhizun=ui.create.div('.zhizun',menuCenter);
        
        //菜单左边背景
        let menuLeftBg=ui.create.div('.menuLeftBg',mainMenu);
        //头像框
        let touxiangkuang=ui.create.div('.touxiangkuang',mainMenu);
        //头像图片
        let touxiangtu=ui.create.div('.touxiangtu',touxiangkuang);
        touxiangtu.setBackgroundImage('extension/斗转星移/image/touxiang/1.jpg');
        let shengji=ui.create.div('.shengji',touxiangkuang);
        let id=ui.create.div('.ss-textdiv',touxiangkuang);
        id.innerHTML=lib.config.connect_nickname;
        
        //斗地主
        let doudizhu=ui.create.div('.doudizhu',mainMenu,function(){
            mainMenu.style.display='none';
            let subMenu=ui.create.div('.kdiv2',mainBg);
            let box=ui.create.div('.dz-bg2',subMenu);
            let modeBg=ui.create.div('.modebg',box);
            let modeBoxs=ui.create.div('.mode-boxs',subMenu);
            //返回按钮
            ui.create.div('.dz-returnBtn',subMenu,function(){
                mainMenu.style.display='inline-block';
                subMenu.delete();
            });
            let modeList=['休闲','欢乐','开黑','兵临'];
            let selectMode;
            for(let i of modeList){
                let mode=ui.create.div('.dz-modeBtn',i,modeBoxs,function(){
                    qiehuanF(this,modeBoxs,'.dz-modeBtn.active');
                    selectMode=i;
                    game.saveExtensionConfig('斗转星移','exModeConfig_dou',i);
                });
                if(lib.config[`${dzxy.dz}exModeConfig_dou`]==i){
                    mode.classList.add('active');
                    selectMode=i;
                }
            }
            //开战
            let kaizhan=ui.create.div('.kaizhan',box,function(){
                _status.touchconfirmed=false;
                switch(selectMode){
                    case '休闲':selectMode='normal';break;
                    case '欢乐':selectMode='huanle';break;
                    case '开黑':selectMode='kaihei';break;
                    case '兵临':selectMode='binglin';break;
                }
                game.saveConfig('doudizhu_mode',selectMode,'doudizhu');
                modes[modeObj['斗地主']].click()
                _status.touchconfirmed=true;
                setTimeout(()=>{mainBg.delete()},700);
                backgroundMusic.pause();
            });
        });
        //聊天
        let liaotian=ui.create.div('.liaotian',mainMenu,function(){
            mainBg.delete();
            backgroundMusic.pause();
        });
        //加号
        let jiahao=ui.create.div('.jiahao',mainMenu);
        //主菜单下面6个
        let menuBottom=ui.create.div('.menu-bottom',mainMenu);
        //武将
        let wujiang=ui.create.div('.wujiang',menuBottom);
        //皮肤
        let pifu=ui.create.div('.pifu',menuBottom);
        //官阶
        let guanjie=ui.create.div('.guanjie',menuBottom);
        //特惠
        let tehui=ui.create.div('.tehui',menuBottom);
        //商场
        let shangcheng=ui.create.div('.shangcheng',menuBottom);
        //成长
        let chengzhang=ui.create.div('.chengzhang',menuBottom);
        
        //主菜单左边
        let menuLeft=ui.create.div('.menu-left',mainMenu);
        //公会
        let gonghui=ui.create.div('.dgonghui',menuLeft);
        //好友
        let haoyou=ui.create.div('.haoyou',menuLeft);
        //比赛
        let bisai=ui.create.div('.bisai',menuLeft);
        //视频
        let shipin=ui.create.div('.shipin',menuLeft);
        
        //主菜单右边
        let menuRight=ui.create.div('.menu-right',mainMenu);
        //每日活动
        let meirihuodong=ui.create.div('.meirihuodong',menuRight);
        let tehui2=ui.create.div('.tehui2',meirihuodong);
        let bibeiwujiang=ui.create.div('.bibeiwujiang',menuRight);
        let cangzhenge=ui.create.div('.cangzhenge',menuRight);
        
        //主菜单右上边
        let menuRightTop=ui.create.div('.menu-right-top',mainMenu);
        let woyaojideng=ui.create.div('.woyaojideng',menuRightTop);
        let bangdingshouji=ui.create.div('.bangdingshouji',menuRightTop);
        let libao=ui.create.div('.libao',menuRightTop);
        let yueka=ui.create.div('.yueka',menuRightTop);
        
        //vip元宝
        let vipjia=ui.create.div('.vipjia','vip1',mainMenu);
        let yuanbaojia=ui.create.div('.yuanbaojia','1000',mainMenu);
    }
}

},config:{

"JinJiang":{
    "name":"禁将菜单",
    "init":true,
    "intro":"将禁将加入顶部菜单栏，并且会根据模式关掉禁用了所有武将的武将包(此过程将自动重启游戏)，以防止卡顿。",
},
"JinJiangType":{
    "name":"禁将方式",
    "init":'forbidai',
    "item":{
        'forbidai':'选将禁选',
        'unseen':'全扩隐藏',
    },
    "intro":"因原版直接删除选禁武将的方式太粗暴导致一系列错误，此处提供其他更优禁将选择方案。",
},
"JinJiangRuZhen":{
    "name":"选择禁将",
    "init":'online',
    "item":{
        'online':'仅如真生效',
        'offline':'仅原版生效',
        'online+offline':'如真/原版生效',
    },
    "intro":"选择禁将生效的模式。",
},
"jjGroupColor":{
    "name":"禁将势力颜色",
    "init":true,
    "intro":"开启禁将势力颜色划分",
},

"qnssBackground":{
    "name":"背景跟随系统",
    "init":true,
    "intro":"禁将选择的背景跟随系统壁纸",
},
"AIqianghuaXuanjiang":{
    "name":"AI强化选将",
    "init":true,
    "intro":"AI会偏向于选高强度武将(建议配合禁将的评分使用)，当前仅斗地主(休闲和欢乐)模式有效",
    onclick:function(item){
        if(!lib.config.extension_斗转星移_setCharStars) game.saveExtensionConfig('斗转星移','setCharStars',{});
        game.saveExtensionConfig('斗转星移','AIqianghuaXuanjiang',item);
    }
},
"qidongyeMeiHua":{
    "name":"启动页美化",
    "intro":"启动页换成手杀样式，暂无功能",
    "init":false,
    unshow:true,//隐藏这个设置
},
"miaoshuXiuGai":{
    "name":"技能描述修改",
    "intro":"将技能描述的{不大于}改成{≤}，{不小于}改成{≥}；将技能描述的'阴'和'阳'调换，达到本体转换技初始状态为'阳'。扩展武将的也会因此修改，有扩展武将不建议开启",
    "init":false,
},
"forbidReload":{
    "name":"禁止重启刷新",
    "intro":"禁止为了使禁将生效强行重启游戏",
    "init":true,
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
    intro:"注意：启用禁将功能后所有模式的禁用武将都将直接更改，首次使用请注意备份好游戏数据",
    author:"无名玩家",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[],"audio":[]}}})