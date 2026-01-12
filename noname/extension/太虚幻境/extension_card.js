'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
    var txhj_cardPack={
        name:'太虚幻境',
        connect:true,
        card:{
            //刑天破军斧
            "txhj_xingtianpojunfu":{
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-3},
				skills:['txhj_noda_axe'],
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				fullskin:true,
			},
    //---------------//
          /*诸葛连弩*/
          "txhj_zhuge":{
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                ai:{
                    order:function(){
            return get.order({name:'sha'})-0.1;
        },
                    equipValue:function(card,player){
            if(player._zhuge_temp) return 1;
            player._zhuge_temp=true;
            var result=function(){
                if(!game.hasPlayer(function(current){
                    return get.distance(player,current)<=1&&player.canUse('sha',current)&&get.effect(current,{name:'sha'},player,player)>0;
                })){
                    return 1;
                }
                if(player.hasSha()&&_status.currentPhase==player){
                    if(player.getEquip('zhuge')&&player.countUsed('sha')||player.getCardUsable('sha')==0){
                        return 10;
                    }
                }
                var num=player.countCards('h','sha');
                if(num>1) return 6+num;
                return 3+num;
            }();
            delete player._zhuge_temp;
            return result;
        },
                    basic:{
                        equipValue:5,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    tag:{
                        valueswap:1,
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["txhj_zhuge"],
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
        /*麒麟弓*/
         "txhj_qilingong":{
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-4,
                },
                ai:{
                    basic:{
                        equipValue:2.5,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["txhj_qilingong"],
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
            
            /*方天画戟*/
            "txhj_fangtianhuaji":{
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-3,
                },
                ai:{
                    basic:{
                        equipValue:2.5,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["txhj_fangtianhuaji"],
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
        /*知己知彼*/
         "txhj_zhijizhibi":{
    audio:true,
    fullskin:true,
    type:"trick",
    enable:true,
    chongzhu:true,
    filterTarget:function(card,player,target){
        if(player==target) return false;
        return (target.countCards('h')||target.isUnseen(2));
    },
    content:function(){
        "step 0"
        if(!player.storage.zhibi){
            player.storage.zhibi=[];
        }
        player.storage.zhibi.add(target);
        var controls=[];
        if(target.countCards('h')) controls.push('手牌');
        if(target.isUnseen(0)) controls.push('主将');
        if(target.isUnseen(1)) controls.push('副将');
        if(controls.length>1){
            player.chooseControl(controls).set('ai',function(){return 1});
        }
        if(controls.length==0) event.finish();
        "step 1"
        var content;
        var str=get.translation(target)+'的';
        if(result.control){
            if(result.control=='手牌'){
                content=[str+'手牌',target.getCards('h')];
                game.log(player,'观看了',target,'的手牌');
            }
            else if(result.control=='主将'){
                content=[str+'主将',[[target.name1],'character']];
                game.log(player,'观看了',target,'的主将');
            }
            else{
                content=[str+'副将',[[target.name2],'character']];
                game.log(player,'观看了',target,'的副将');
            }
        }
        else if(target.countCards('h')){
            content=[str+'手牌',target.getCards('h')];
            game.log(player,'观看了',target,'的手牌');
        }
        else if(target.isUnseen(0)){
            content=[str+'主将',[[target.name1],'character']];
            game.log(player,'观看了',target,'的主将');
        }
        else{
            content=[str+'副将',[[target.name2],'character']];
            game.log(player,'观看了',target,'的副将');
        }
        player.chooseControl('ok').set('dialog',content);
        player.draw();
    },
    ai:{
        order:9.5,
        wuxie:function(){
            return 0;
        },
        result:{
            player:function(player,target){
                if(player.countCards('h')<=player.hp) return 0;
                if(player.storage.zhibi&&player.storage.zhibi.contains(target)) return 0;
                return target.isUnseen()?1:0;
            },
        },
    },
    selectTarget:1,
},
         /*远交近攻*/
           "txhj_yuanjiao":{
    audio:true,
    fullskin:true,
    type:"trick",
    enable:function(card,player){
        if(player.isUnseen()) return false;
        return true;
    },
    filterTarget:function(card,player,target){
        return player!=target;
    },
    content:function(){
        target.draw();
        player.draw(3);
    },
    ai:{
        basic:{
            useful:4,
            value:8,
            order:9,
        },
        result:{
            target:1,
            player:3,
        },
    },
    selectTarget:1,
},
        /*以逸待劳*/
          "txhj_yiyi":{
    audio:true,
    fullskin:true,
    type:"trick",
    enable:true,
    filterTarget:function(card,player,target){
            return player.side==target.side;
    },
    selectTarget:function(){
        return -1;
        
    },
    content:function(){
        target.draw(2);
        target.chooseToDiscard(2,'he',true).ai=get.disvalue;
    },
    ai:{
        wuxie:function(){
            return 0;
        },
        basic:{
            useful:3,
            value:3,
            order:5,
        },
        result:{
            target:function(player,target){
                var hs=target.getCards('h');
                if(hs.length<=1){
                    if(target==player&&(hs.length==0||hs[0].name=='yiyi')){
                        return 0;
                    }
                    return 0.3;
                }
                return Math.sqrt(target.countCards('he'));
            },
        },
        tag:{
            loseCard:1,
            discard:1,
            norepeat:1,
        },
    },
},
        /*虚妄之冕*/
        "txhj_xuwangzhimian":{
                fullskin:true,
                type:"equip",
                subtype:"equip5",
                skills:["txhj_xuwangzhimian"],
                ai:{
                    basic:{
                        equipValue:5,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
        /*霹雳车*/
             "txhj_piliche":{
                fullskin:true,
                type:"equip",
                destroy:true,
                subtype:"equip1",
                distance:{
                    attackFrom:-8,
                },
                skills:["txhj_piliche","txhj_piliche2"],
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
                ai:{
                    basic:{
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        equipValue:1,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
            },
        /*六龙骖驾*/
         "txhj_liulongcanjia":{
                audio:true,
                fullskin:true,
                type:"equip",
                subtype:"equip6",
                nomod:true,
                nopower:true,
                unique:true,
                distance:{
                    globalFrom:-1,
                    globalTo:1,
                },
                customSwap:function(card){
        var type=get.subtype(card,false);
        return type=='equip3'||type=='equip4'||type=='equip6';
    },
                skills:["txhj_liulongcanjia"],
                ai:{
                    equipValue:function(card,player){
            if(player.countCards('e',{subtype:['equip3','equip4']})>1) return 1;
            if(player.hasSkill('gzzongyu')) return 9;
            if(game.hasPlayer(function(current){
                return current.hasSkill('gzzongyu')&&get.attitude(player,current)<=0;
            }))    return 1;
            return 7.2;
        },
                    basic:{
                        equipValue:7.2,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
        /*雷击木*/
             "txhj_leijimu":{
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-3,
                },
                ai:{
                    basic:{
                        equipValue:2,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["txhj_leijimu"],
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
        /*绝尘金戈*/
          "txhj_juechenjinge":{
                fullskin:true,
                type:"equip",
                subtype:"equip3",
                skills:["txhj_juechenjinge"],
                distance:{
                    globalTo:2,
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
                ai:{
                    basic:{
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        equipValue:7,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
            },
          /*借刀杀人*/
            "txhj_jiedao":{
    audio:true,
    fullskin:true,
    type:"trick",
    enable:true,
    singleCard:true,
    targetprompt:["出杀者","杀的目标"],
    complexSelect:true,
    complexTarget:true,
    multicheck:function(){
        return game.hasPlayer(function(current){
                return game.hasPlayer(function(current2){
                    return current.inRange(current2)&&current.canUse('sha',current2,false);
                })
        });
    },
    filterTarget:function(card,player,target){
        return player!=target&&game.hasPlayer(function(current){
            return target!=current&&target.inRange(current)&&target.canUse('sha',current,false);
        });
    },
    filterAddedTarget:function(card,player,target,preTarget){
        return target!=preTarget&&preTarget.inRange(target)&&preTarget.canUse('sha',target,false);
    },
    content:function(){
        "step 0"
        if(event.directHit||!event.addedTarget||(!_status.connectMode&&lib.config.skip_shan&&!target.hasSha())){
            event.directfalse=true;
        }
        else{
            target.chooseToUse('对'+get.translation(event.addedTarget)+'使用一张杀，或者你失去一点体力',function(card,player){
                if(get.name(card)!='sha') return false;
                return lib.filter.filterCard.apply(this,arguments);
            }).set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
            if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
            return lib.filter.filterTarget.apply(this,arguments);
        }).set('sourcex',event.addedTarget).set('addCount',false).set('respondTo',[player,card]);
        }
        "step 1"
        if(event.directfalse||result.bool==false){
           target.loseHp();
        }
    },
    ai:{
        wuxie:function(target,card,player,viewer){
            if(player==game.me&&get.attitude(viewer,player)>0){
                return 0;
            }
        },
        basic:{
            order:8,
            value:2,
            useful:1,
        },
        result:{
            target:-1.5,
            player:function(player){
                if(player.getCards('he').length) return 0;
                return 1.5;
            },
        },
        tag:{
            gain:1,
            use:1,
            useSha:1,
            loseCard:1,
        },
    },
    selectTarget:1,
},
        /*火烧连营*/
          "txhj_huoshaolianying":{
    fullskin:true,
    audio:true,
    type:"trick",
    filterTarget:function(card,player,target){
            return target==player.next;
    },
    enable:true,
    selectTarget:-1,
    modTarget:true,
    content:function(){
        'step 0'
        event.target=targets[0];
        'step 1'
        event.target.damage('fire',event.baseDamage||1);
        'step 2'
        if(!event.target.getFriends().contains(event.target.next)) event.finish();
        'step 3'
        event.target=event.target.next;
        event.goto(1);
    },
    ai:{
        order:5,
        value:6,
        tag:{
            damage:1,
            natureDamage:1,
            fireDamage:1,
        },
        result:{
            target:function(player,target){
                if(target.hasSkillTag('nofire')||target.hasSkillTag('nodamage')) return 0;
                if(target.hasSkill('xuying')&&target.countCards('h')==0) return 0;
                if(!target.isLinked()){
                    return get.damageEffect(target,player,target,'fire');
                }
                return game.countPlayer(function(current){
                    if(current.isLinked()){
                        return get.sgn(get.damageEffect(current,player,target,'fire'));
                    }
                });
            },
        },
    },
},
        /*国风玉袍*/
         "txhj_guofengyupao":{
                fullskin:true,
                type:"equip",
                subtype:"equip2",
                skills:["txhj_guofengyupao"],
                ai:{
                    basic:{
                        equipValue:7.5,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
        /*飞龙夺凤*/
             "txhj_feilong":{
                audio:true,
                type:"equip",
                fullskin:true,
                subtype:"equip1",
                nomod:true,
                nopower:true,
                unique:true,
                distance:{
                    attackFrom:-1,
                },
                skills:["txhj_feilong_skill"],
                ai:{
                    equipValue:function(card,player){
                        return 9;
                    },
                    basic:{
                        equipValue:8,
                        order:13,
                        useful:2,
                        value:9,
                    },
                    result:{
                        target:function(player,target,card){
                            return get.equipResult(player,target,card.name);
                        },
                    },
                },
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
                    return target==player;
                },
                modTarget:true,
                allowMultiple:false,
                content:function(){
                    if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
                },
                toself:true,
                fullimage:true,
            },
            
       /*定澜夜明珠*/
       "txhj_dinglanyemingzhu":{
                audio:true,
                fullskin:true,
                type:'equip',
                subtype:'equip5',
                nomod:true,
                nopower:true,
                unique:true,
                global:'g_dinglanyemingzhu_ai',
                skills:['txhj_dinglanyemingzhu'],
                ai:{
                    equipValue:function(card,player){
                        if(player.hasSkill('jubao')) return 8;
                        if(player.hasSkill('gzzhiheng')) return 6;
                        if(game.hasPlayer(function(current){
                            return current.hasSkill('jubao')&&get.attitude(player,current)<=0;
                        })){
                            return 0;
                        }
                        return 7;
                    },
                    basic:{
                        equipValue:6.5
                    }
                }
            },
            
       /*调虎离山*/
       "txhj_diaohu":{
    fullskin:true,
    audio:true,
    type:"trick",
    enable:true,
    filterTarget:function(card,player,target){
        return target!=player;
    },
    selectTarget:1,
    content:function(){
        target.turnOver();
        player.draw();
        target.draw();
    },
        ai:{
                    basic:{
                        order:9,
                        useful:5,
                        value:5,
                    },
                    yingbian:function(card,player,targets,viewer){
                        if(get.attitude(viewer,player)<=0) return 0;
                        if(game.hasPlayer(function(current){
                            return !targets.contains(current)&&lib.filter.targetEnabled2(card,player,current)&&get.effect(current,card,player,player)>0;
                        })) return 6;
                        return 0;
                    },
                    result:{
                        target:function(player,target){
                            var att=get.attitude(player,target);
                            var nh=target.countCards('h');
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
                            var noh=(nh==0||target.hasSkillTag('noh'));
                            if(noh&&(noe||noe2)) return 0;
                            if(att<=0&&!target.countCards('he')) return 1.5;
                            return -1.5;
                        },
                    },
                    tag:{
                        loseCard:1,
                        discard:1
                    }
                },
},
       /*赤焰镇魂琴*/
         "txhj_chiyanzhenhunqin":{
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-3,
                },
                ai:{
                    basic:{
                        equipValue:4.5,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["txhj_chiyanzhenhunqin"],
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
            
       /*草木皆兵*/
           "txhj_caomu":{
    audio:true,
    fullskin:true,
    enable:true,
    type:"trick",
    filterTarget:function(card,player,target){
        return player!=target;
        },
    ai:{
        basic:{
            order:1,
            useful:1,
            value:4.5,
        },
        result:{
            player:function(player,target){
                return game.countPlayer(function(current){
                    if(get.distance(target,current)<=1&&current!=target){
                        var att=get.attitude(player,current);
                        if(att>3){
                            return 1.1;
                        }
                        else if(att>0){
                            return 1;
                        }
                        else if(att<-3){
                            return -1.1;
                        }
                        else if(att<0){
                            return -1;
                        }
                    }
                });
            },
        },
    },
    content:function(){
            target.chooseToDiscard('he',true);
        var targets=game.filterPlayer(function(current){ 
            return current!=target&&get.distance(target,current)<=1; 
        }); 
        if(targets.length){ 
            game.asyncDraw(targets);
        }
    },
},
       /*灵宝仙葫*/
        "txhj_lingbaoxianhu":{
                fullskin:true,
                type:'equip',
                subtype:'equip1',
                distance:{attackFrom:-2},
                ai:{
                    basic:{
                        equipValue:4.5,
                    }
                },
                skills:['txhj_lingbaoxianhu']
            },
         
         /*冲应神符*/
         "txhj_chongyingshenfu":{
                fullskin:true,
                type:'equip',
                subtype:'equip2',
                ai:{
                    basic:{
                        equipValue:7,
                    }
                },
                skills:['txhj_chongyingshenfu'],
                loseDelay:false,
            },
            
            //国战装备转化
            /*明光铠*/    
        txminguangkai:{
				audio:'minguangkai',
				//mode:['guozhan'],
				fullskin:true,
				type:'equip',
				subtype:'equip2',
		skills:['txminguangkai_cancel','txminguangkai_link'],
				ai:{
					basic:{
						equipValue:6
					}
				}
			},
		 /*诏书*/
		 txzhaoshu:{
				audio:'zhaoshu',
				//mode:['guozhan'],
				fullskin:true,
				type:'equip',
				subtype:'equip5',
				skills:['txzhaoshu_skill'],
				content:function(){
					cards=cards.filterInD();
					if(cards.length&&target.isAlive()){
						target.addToExpansion(cards,'gain2').gaintag.add('txzhaoshu_skill');
						target.addSkill('txzhaoshu_skill');
						game.addGlobalSkill('txzhaoshu_global');
					}
				},
				onEquip:function(){
					if(player.isAlive()){
						player.addToExpansion(card,'giveAuto').gaintag.add('txzhaoshu_skill');
						player.markAuto('txzhaoshu_skill',[card]);
						player.addSkill('txzhaoshu_skill');
						game.addGlobalSkill('txzhaoshu_global');
					}
				},
				ai:{
					order:12,
					value:3,
					useful:1,
					result:{
						keepAI:true,
						target:1,
					},
				}
			},		
         
         /*太极拂尘*/
            "txhj_taijifuchen":{
                fullskin:true,
                type:"equip",
                subtype:"equip1",
                distance:{
                    attackFrom:-4,
                },
                ai:{
                    basic:{
                        equipValue:4.5,
                        order:function(card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function(card,player,index,method){
                if(player.isDisabled(get.subtype(card))) return 0.01;
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function'){
                    if(method=='raw') return equipValue(card,player);
                    if(method=='raw2') return equipValue(card,player)-value;
                    return Math.max(0.1,equipValue(card,player)-value);
                }
                if(typeof equipValue!='number') equipValue=0;
                if(method=='raw') return equipValue;
                if(method=='raw2') return equipValue-value;
                return Math.max(0.1,equipValue-value);
            },
                    },
                    result:{
                        target:function(player,target,card){
                return get.equipResult(player,target,card.name);
            },
                    },
                },
                skills:["gx_taijifuchen"],
                enable:true,
                selectTarget:-1,
                filterTarget:function(card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function(){
        if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
    },
                toself:true,
            },
            //白鹄
            txhj_baihu:{
							fullimage:true,
							type:"equip",
							subtype:"equip3",
							distance:{globalTo:2},
							ai:{
								basic:{
									equipValue:10,
								}
							},
						},
            //圣光白衣
 				txhj_shengguangbaiyi:{
 					fullskin:true,
 					type:"equip",
 					subtype:"equip2",
 		skills:['txhj_shengguangbaiyi'],
 					ai:{
				  basic:{
					equipValue:7
	 						} 
		 				}
		 			},
	    	//望梅止渴
            txhj_wangmeizhike:{
				audio:"wangmeizhike",
	      		fullskin:true,
            enable:true,
            type:'trick',
	    	  	filterTarget:true,
            content:function(){
            "step 0"
				target.judge(function(card){
if(get.suit(card)=='club'&&target.hp<target.maxHp) return 9;
if(get.suit(card)=='club'&&target.hp>=target.maxHp) return 0;
					return 1;
				});
           "step 1"
      if(result.suit=='club'){
				target.recover();
                 }
       if(result.suit!='club'){
             target.draw();
           }
			},
      ai:{
              basic:{
			    		useful:3,
				    	value:1,
              order:9,
                         },
             result:{
        target:function (player,target){
if(target.hp<target.maxHp) return target.maxHp-target.hp;
return 0.5;
                              },
                         },
		     		tag:{
					draw:1,
		         		},
              },
            },
            //镇魂琴
	        	txhj_zhenhunqin:{
	        	fullskin:true,
	        	type:"equip",
	        	subtype:"equip1",
	        	distance:{attackFrom:-3},
	        	skills:['txhj_zhenhunqin'],
	        	ai:{
	        		basic:{
	        			equipValue:5
	        			}
	        		},
	        	},
	        //邪神面具
 					txhj_xieshenmianju:{
 					fullskin:true,
 					type:"equip",
 					subtype:"equip2",
 			skills:['txhj_xieshenmianju'],
 					ai:{
				 	 order:9.5,
			  	basic:{
					equipValue:function(card,player){
						if(!player.isTurnedOver()) return 6;
						if(player.isTurnedOver()) return -10;
						return 0;
 					     }
 					    }
 					}, 					
 					},	
         /*声东击西*/ 
        "txhj_shengdong":{
                audio:true,
                fullskin:true,
                enable:true,
                chongzhu:true,
                singleCard:true,
                type:'trick',
                complexTarget:true,
                multitarget:true,
                targetprompt:['给一张牌','得两张牌'],
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                filterAddedTarget:function(card,player,target){
                    return true;
                },
                content:function(){
                    'step 0'
                    if(!player.countCards('h')){
                        event.finish();
                    }
                    else{
                        event.target1=target;
                        event.target2=event.addedTarget;
                        player.chooseCard('h','将一张手牌交给'+get.translation(event.target1),true);
                    }
                    'step 1'
                    player.$giveAuto(result.cards,event.target1);
                    event.target1.gain(result.cards,player);
                    'step 2'
                    if(!event.target1.countCards('h')){
                        event.finish();
                    }
                    else{
                        var he=event.target1.getCards('h');
                        if(he.length<=2){
                            event.directresult=he;
                        }
                        else{
                            event.target1.chooseCard('h','将两张手牌交给'+get.translation(event.target2),2,true);
                        }
                    }
                    'step 3'
                    if(!event.directresult){
                        event.directresult=result.cards;
                    }
                    event.target1.$giveAuto(event.directresult,event.target2);
                    event.target2.gain(event.directresult,event.target1);
                },
                ai:{
                    order:2.5,
                    value:[4,1],
                    useful:1,
                    wuxie:function(){
                        return 0;
                    },
                    result:{
                        target:function(player,target){
                            var ok=false;
                            var hs=player.getCards('h');
                            if(hs.length<=1) return 0;
                            for(var i=0;i<hs.length;i++){
                                if(get.value(hs[i])<=5){
                                    ok=true;
                                    break;
                                }
                            }
                            if(!ok) return 0;
                            if(ui.selected.targets.length==1){
                                if(target.hasSkillTag('nogain')) return 0;
                                return 2;
                            }
                            if(target.countCards('he')==0) return 0;
                            if(player.hasFriend()) return -1;
                            return 0;
                        }
                    }
                }
            },
        
       
       "txhj_shuiyan":{
                audio:'shuiyanqijun',
                fullskin:true,
                type:'trick',
                filterTarget:function(card,player,target){
                    return target!=player;
                },
                enable:true,        
                content:function(){
                    'step 0'
                    var cards=target.getCards('e');
                    var num=0;
                    for(i=0;i<cards.length;i++) {
                        if(!lib.filter.cardDiscardable(card,target,'txhj_shuiyan')) continue;
                        if(get.number(cards[i])) num+=get.number(cards[i]);
                    }
                    if(num<6){
                        var next=target.damage(event.baseDamage||1);
                        if(!get.is.single()) next.nature='thunder';
                        event.finish();
                        return;
                    }
                    'step 1'
                    var next=target.chooseToDiscard('是否弃置任意张点之和数不小于6的装备牌？',function(card){
                        
                        return true;
                    },'e'); 
                        next.set('complexCard',true);
                        next.set('selectCard',function(){
                        var sum=0;
                        for(var i=0;i<ui.selected.cards.length;i++){
                            sum+=get.number(ui.selected.cards[i]);
                        }
                        if(sum>=6) return [ui.selected.cards.length,Infinity];
                        return ui.selected.cards.length+2;
                    });
                    next.set('cardResult',function(){
                        var cards=target.getCards('e');
                        var l=cards.length;
                        var all=Math.pow(l,2);
                        var list=[];
                        for(var i=1;i<all;i++){
                            var array=[];
                            for(var j=0;j<l;j++){
                                if(Math.floor((i%Math.pow(2,j+1))/Math.pow(2,j))>0) array.push(cards[j])
                            }
                            var numx=0;
                            for(var k of array){
                                numx+=get.number(k);
                            }
                            if(numx==num) list.push(array);
                        }
                        if(list.length){
                            list.sort(function(a,b){
                                return get.value(a)-get.value(b);
                            });
                            return list[0];
                        }
                        return list;
                    }());
                    next.set('ai',function(card){
                        if(!_status.event.cardResult.contains(card)) return 0;
                        return 6-get.value(card);
                    });
                   'step 2'
                    if(result.bool){
                    event.finish();
                    game.log('弃牌保命');
                    }
                    else{
                        var next=target.damage(event.baseDamage||1);
                        if(!get.is.single()) next.nature='thunder'
                    }
                    event.finish();
                
        //----------------//    
                },
                ai:{
                    canLink:function(player,target,card){
                        if(!target.isLinked()||player.hasSkill('jueqing')||target.hasSkill('gangzhi')||target.hasSkill('gangzhi')) return false;
                        var es=target.countCards('e');
                        if(!es) return true;
                        if(target.hp>=3&&es>=2){
                            return true;
                        }
                        return false;
                    },
                    order:6,
                    value:4,
                    useful:2,
                    tag:{
                        damage:1,
                        thunderDamage:1,
                        natureDamage:1,
                        loseCard:1,
                    },      
                    result:{
                        target:function(player,target,card,isLink){
                            if(isLink) return -1.5;
                            var es=target.getCards('e');
                            if(!es.length) return -1.5;
                            var val=0;
                            for(var i of es) val+=get.value(i,target);
                            return -Math.min(1.5,val/5);
                        }
                    }
                }
            },
     //---------------------// 

      

       
        },
        skill:{
          /*-------分割线--------*/
    /*诸葛连弩*/
    "txhj_zhuge":{
                equipSkill:true,
                firstDo:true,
                trigger:{
                    player:"useCard1",
                },
                forced:true,
                filter:function(event,player){
        return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
    },
                content:function(){
        trigger.audioed=true;
    },
                mod:{
                    cardUsable:function(card,player,num){
            var cardx=player.getEquip('txhj_zhuge');
            if(card.name=='sha'&&(!cardx||player.hasSkill('txhj_zhuge',null,false)||(!_status.rw_zhuge_temp&&!ui.selected.cards.contains(cardx)))){
                return 4;
            }
        },
                    "cardEnabled2":function(card,player){
            if(!_status.event.addCount_extra||player.hasSkill('txhj_zhuge',null,false)) return;
            if(card&&card==player.getEquip('txhj_zhuge')){
                try{
                    var cardz=get.card();
                }
                catch(e){
                    return;
                }
                if(!cardz||cardz.name!='sha') return;
                _status.rw_zhuge_temp=true;
                var bool=lib.filter.cardUsable(get.autoViewAs({name:'sha'},ui.selected.cards.concat([card])),player);
                delete _status.txhj_zhuge_temp;
                if(!bool) return false;
            }
        },
                },
            },
        /*明光铠技能*/
        txminguangkai_cancel:{
				equipSkill:true,
		trigger:{target:'useCardToTarget'},
				forced:true,
				check:function(event,player){
					return get.effect(event.target,event.card,event.player,player)<0;
				},
				filter:function(event,player){
					if(['huoshaolianying','huogong'].contains(event.card.name)) return true;
					if(event.card.name=='sha') return event.card.nature=='fire';
					return false;
				},
				content:function(){
					trigger.getParent().targets.remove(player);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(['huoshaolianying','huogong'].contains(card.name)||(card.name=='sha'&&card.nature=='fire')){
								return 'zeroplayertarget';
							}
						},
					}
				}
			},
			txminguangkai_link:{
				equipSkill:true,
			trigger:{player:'linkBefore'},
				forced:true,
				filter:function(event,player){
					return player.isDamaged()&&!player.isLinked();
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.isDamaged()&&['tiesuo','lulitongxin'].contains(card.name)){
								return 'zeroplayertarget';
							}
						},
					}
				}
			},
      /*方天画戟技能*/
       "txhj_fangtianhuaji":{
                trigger:{
                    player:"useCard2",
                },
                direct:true,
                charlotte:true,
                forced:true,
                filter:function(event,player){
        if(event.card.name!='sha') return false;
        var evt=event.getParent('phaseUse');
        return evt&&evt.player==player&&player.getHistory('useCard',function(evtx){
            return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
        })[0]==event&&game.hasPlayer(function(current){
            return !event.targets.contains(current)&&lib.filter.filterTarget(event.card,player,current);
        });
    },
                content:function(){
        'step 0'
        var num=2;
        if(Math.min( game.countPlayer())>=3) {
        player.chooseTarget('请选择至多'+num+'名其他角色也成为此【杀】的目标？',[1,num],true,function(card,player,target){
            return target!=player&&!trigger.targets.contains(target)&&player.canUse({name:'sha'},target);
        }).ai=function(target){
            return get.effect(target,{name:'sha'},_status.event.player);
        };}
        'step 1'
        if(result.bool&&result.targets&&result.targets.length){
            var targets=result.targets;
            player.line(targets,trigger.card.nature);
            trigger.targets.addArray(targets);
        }
    },
            },
            /*麒麟弓*/
            "txhj_qilingong":{
                equipSkill:true,
                trigger:{
                    source:"damageBegin2",
                },
                filter:function(event,player){
        return event.card&&event.card.name=='sha'&&event.notLink()&&event.player.getCards('e',{subtype:['equip5']}).length>0
    },
                direct:true,
                content:function(){
        "step 0"
        var att=(get.attitude(player,trigger.player)<=0);
        var next=player.chooseButton();
        next.set('att',att);
        next.set('createDialog',['是否发动【麒麟弓】，弃置'+get.translation(trigger.player)+'的一张宝物牌？',trigger.player.getCards('e',{subtype:['equip5']})]);
        next.set('ai',function(button){
            if(_status.event.att) return get.buttonValue(button);
            return 0;
        });
        "step 1"
        if(result.bool){
            player.logSkill('txhj_qilingong',trigger.player);
            trigger.player.discard(result.links[0]);
        }
    },
  },
     /*虚妄之冕技能*/
        "txhj_xuwangzhimian":{
                        equipSkill:true,
                        trigger:{
                            player:"phaseDrawBegin",
                        },
                        forced:true,
                        content:function(){
                            trigger.num+=2;
                        },
                        mod:{
                            maxHandcard:function(player,num){
                                return num-1;
                            },
                        },
                    },
         /*霹雳车技能*/
            "txhj_piliche":{
                        equipSkill:true,
                        trigger:{
                            source:"damageEnd",
                        },
                        filter:function(event,player){
                            return event.player!=player&&event.player.maxHp>0&&event.player.isAlive();
                        },
                        "prompt2":function(event,player){
                            return '令其减少等同伤害值的体力上限。';
                        },
                        content:function(){
                            trigger.player.loseMaxHp(trigger.num);
                        },
                    },
                    "txhj_piliche2":{},
       /*六龙骖驾技能*/
         "txhj_liulongcanjia":{
                        equipSkill:true,
                        mod:{
                            targetEnabled:function(card,player,target){
                                if(['equip3','equip4'].contains(get.subtype(card))) return false;
                            },
                        },
                    },
        
        /*雷击木*/
        "txhj_leijimu":{
                        equipSkill:true,
                        trigger:{
                            player:"useCard1",
                        },
                        filter:function(event,player){
                            if(event.card.name=='sha'&&!event.card.nature) return true;
                        },
                        
                        check:function(event,player){
                            var eff=0;
                            for(var i=0;i<event.targets.length;i++){
                                var target=event.targets[i];
                                var eff1=get.damageEffect(target,player,player);
                                var eff2=get.damageEffect(target,player,player,'thunder');
                                eff+=eff2;
                                eff-=eff1;
                            }
                            return eff>=0;
                        },
                        "prompt2":function(event,player){
                            return '将'+get.translation(event.card)+'改为雷属性';
                        },
                        content:function(){
                            trigger.card.nature='thunder';
                            if(get.itemtype(trigger.card)=='card'){
                                var next=game.createEvent('txhj_leijimu_clear');
                                next.card=trigger.card;
                                event.next.remove(next);
                                trigger.after.push(next);
                                next.setContent(function(){
                                    delete card.nature;
                                });
                            }
                        },
                    },
                    
        /*绝尘金戈技能*/
        "txhj_juechenjinge":{
                        equipSkill:true,
                        global:"txhj_juechenjinge2",
                    },
                    "txhj_juechenjinge2":{
                        equipSkill:true,
                        mod:{
                            globalTo:function(from,to,distance){
                                return distance+game.countPlayer(function(current){
                                    if(current==to) return;
                                    if(current.side!=to.side) return;
                                    if(current.hasSkill('txhj_juechenjinge')) return 1;
                                });
                            },
                        },
                    },
        /*国风玉袍*/
        "txhj_guofengyupao":{
                        equipSkill:true,
                        mod:{
                            targetEnabled:function(card,player,target,now){
                                if(target.hasSkillTag('unequip2')) return false;
                                if(player!=target){
                                    if(player.hasSkillTag('unequip',false,{
                                        name:card?card.name:null,
                                        target:player,
                                        card:card
                                    })){}
                                    else if(get.type(card)=='trick') return false;
                                }
                            },
                        },
                    },
        /*飞龙夺凤技能*/
       "txhj_feilong_skill":{
                subSkill:{
                    blank:{
                        init:function(player,skill){
                            player.addSkillBlocker(skill);
                        },
                        onremove:function(player,skill){
                            player.removeSkillBlocker(skill);
                        },
                        charlotte:true,
                        skillBlocker:function(skill,player){
                            return !lib.skill[skill].charlotte;
                        },
                        sub:true,
                    },
                },
                trigger:{
                    source:["dieAfter"],
                },
                priority:-25,
                equipSkill:true,
                content:function(){
                    'step 0'
                    var target=trigger.player;
                    target.addTempSkill('txhj_feilong_skill_blank',{player:'damageAfter'});
                    target.side=player.side;
                    target.identity=player.identity;
                    target.setIdentity(get.translation(player.identity));
                    target.node.identity.dataset.color=player.identity;
                    target.revive(3);
                    target.maxHp=3;
                    target.update();
                },
            },  
       /*定澜夜明珠技能*/
        "txhj_dinglanyemingzhu":{
                equipSkill:true,
                inherit:'zhiheng',
                filter:function(event,player){
                    return !player.hasSkill('gzzhiheng',true);
                },
                selectCard:function(){
                    var player=_status.event.player;
                    return [1,player.maxHp];
                },
                filterCard:function(card,player){
                    return card!=player.getEquip(5);
                },
                prompt:'出牌阶段限一次，你可以弃置至多X张牌（X为你的体力上限），然后摸等量的牌'
            },
                    
          
        /*赤焰镇魂琴技能*/
        "txhj_chiyanzhenhunqin":{
                        equipSkill:true,
                        trigger:{
                            source:"damageBegin1",
                        },
                        priority:5,
                        forced:true,
                        content:function(){
                            trigger.nature='fire';
                        },
                    },
        /*灵宝仙葫技能*/
        "txhj_lingbaoxianhu":{
                trigger:{
                    source:'damageSource',
                    global:'dieAfter',
                },
                forced:true,
                equipSkill:true,
                filter:function(event,player){
                    if(event.name=='damage') return event.num>1;
                    return true;
                },
                content:function(){
                    player.gainMaxHp();
                    player.recover();
                },
            },
            //废案      	
				txhj_jiuchiroulin:{
				audio:true,
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:-1,
				reverseOrder:true,
				yingbian_prompt:'当你使用此牌选择目标后，你可为此牌减少一个目标',
				yingbian_tags:['remove'],
				yingbian:function(event){
					event.yingbian_removeTarget=true;
				},
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					"step 0"
					if(typeof event.baseDamage!='number') event.baseDamage=1;
					if(event.directHit) event._result={bool:false};
					else{
						var next=target.chooseToRespond({name:'jiu'});
						next.set('ai',function(card){
							var evt=_status.event.getParent();
							if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
							if(evt.player.hasSkillTag('notricksource')) return 0;
							if(evt.target.hasSkillTag('notrick')) return 0;
							if(evt.target.hasSkillTag('noShan')){
								return -1;
							}
						return get.order(card);
						});
						next.autochoose=lib.filter.autoRespondShan;
					}
					"step 1"
					if(result.bool==false){
						target.damage(event.baseDamage);
					}
				},
				ai:{
					wuxie:function(target,card,player,viewer){
						if(get.attitude(viewer,target)>0&&target.countCards('h','jiu')){
							if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
						}
					},
					basic:{
						order:9,
						useful:1,
						value:5
					},
					result:{
						target_use:function(player,target){
							if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
							var nh=target.countCards('h');
							if(get.mode()=='identity'){
								if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
							}
							if(nh==0) return -2;
							if(nh==1) return -1.7
							return -1.5;
						},
						target:function(player,target){
							var nh=target.countCards('h');
							if(get.mode()=='identity'){
								if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
							}
							if(nh==0) return -2;
							if(nh==1) return -1.7
							return -1.5;
						},
					},
					tag:{
						respond:1,
						respondShan:1,
						damage:1,
						multitarget:1,
						multineg:1,
					}
				}
			},	
			//国战装备转化				
			txzhaoshu_skill:{
				equipSkill:true,
				charlotte:true,
				enable:'phaseUse',
				usable:2,
				filter:function(event,player){
					var cards=player.getExpansions('txzhaoshu_cards');
					if(cards.length<2) return false;
					var list=[];
					for(var i of cards){
						list.add(get.suit(i,false));
						if(list.length>=2) return true;
					}
					return false;
				},
				delay:false,
				content:function(){
					'step 0'
					var cards=player.getExpansions('txzhaoshu_cards');
					player.loseToDiscardpile(cards);
					game.delayx();
					'step 1'
					var list=[
						['spade',12,'zhujinqiyuan'],
						['diamond',1,'chuqibuyi'],
						['heart',1,'dongzhuxianji'],
						['club',12,'shuiyanqijunx'],
					];
					for(var i=0;i<list.length;i++){
						if(lib.inpile.contains(list[i][2])) list.splice(i--,1);
					}
					if(list.length){
						var card=list.randomGet();
						lib.inpile.add(card[2]);
						player.gain(game.createCard2(card[2],card[0],card[1]),'gain2');
					}
				},
				ai:{
					order:10,
					result:{player:1},
				},
				mark:true,
				marktext:'诏',
				intro:{
					name:'诏书',
					mark:function(dialog,content,player){
						var content=player.getExpansions('txzhaoshu_skill');
						dialog.add(content);
						dialog.addText('<br><li>与你相同阵营的角色的出牌阶段限两次，其可以将一张手牌（小势力角色改为至多两张）置于【诏书】上，称为“应”。<br><li>出牌阶段限两次，若你的“应”中包含至少两种花色，则你可以发动“锦囊召唤”，将所有“应”置入弃牌堆，然后随机获得一张未加入牌堆的额外锦囊牌（洞烛先机、逐近弃远、水淹七军、出其不意）。',false);
						var cards=player.getExpansions('txzhaoshu_cards');
						if(cards.length){
							dialog.addAuto(cards)
						}
					},
					content:'expansion',
					markcount:function(content,player){
						return player.getExpansions('txzhaoshu_cards').length;
					},
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill).concat(player.getExpansions('txzhaoshu_cards'));
					if(cards.length) player.loseToDiscardpile(cards);
				},
			},
			txzhaoshu_global:{
				enable:'phaseUse',
				usable:2,
				filter:function(event,player){
					if(!player.countCards('h')) return false;
					return game.hasPlayer(function(current){
						return current.hasSkill('txzhaoshu_skill')&&current.isFriendOf(player);
					});
				},
				filterCard:true,
				selectCard:function(){
					if(_status.event.player.isDamaged()) return [1,2];
					return [1,1];
				},
				position:'h',
				discard:false,
				lose:false,
				delay:false,
				check:function(card){
					var player=_status.event.player,cards=ui.selected.cards.concat(game.findPlayer(function(current){
						return current.hasSkill('txzhaoshu_skill')&&current.isFriendOf(player);
					}).getExpansions('txzhaoshu_cards')),suit=get.suit(card,false);
					for(var i of cards){
						if(get.suit(i)==suit) return 0;
					}
					return 5+player.needsToDiscard()*1.5-get.value(card);
				},
				filterTarget:function(card,player,target){
					return target.hasSkill('txzhaoshu_skill')&&target.isFriendOf(player);
				},
				selectTarget:function(){
					if(game.countPlayer(function(current){
						return current.hasSkill('txzhaoshu_skill')&&current.isFriendOf(_status.event.player);
					})==1) return -1;
					return 1;
				},
				prompt:function(){
					var player=_status.event.player;
					return '将'+(player.isDamaged()?'至多两':'一')+'张手牌置于'+get.translation(game.filterPlayer(function(current){
						return current.hasSkill('txzhaoshu_skill')&&current.isFriendOf(player);
					}))+'的【诏书】上';
				},
				content:function(){
					target.addToExpansion(cards,player,'give').gaintag.add('txzhaoshu_cards');
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},	
			//民间卡牌	
			//南蛮战象
		txhj_nanmanzhanxiang_skill:{
		trigger:{target:"useCardBefore"},
							forced:true,
							filter:function(event,player){
								return event.card.name=="nanman";
							},
							content:function(){
								trigger.untrigger();
								trigger.finish();
							}
						},			
			//八门金锁
            txhj_bamenjinsuo:{
            mod:{
            globalFrom:function (from,to,distance){
            return distance+Infinity;
                }
              }
            },		
			//天霜凝碧杖
            txhj_tianshuangningbizhang:{
            mod:{
            suit:function(card,suit){
					if(suit=='spade') return 'club';
		         		}
		         	}
            },
			//姬神弓
            txhj_jishengong:{
            trigger:{
            source:"damageBegin",
            },
            direct:true,
            audio:true,
            filter:function (event){
            return event.card&&event.card.name=='sha'&&event.player.num('e');
            },
            content:function (){
            player.gainPlayerCard('e',trigger.player);
              }
         		},
			//明光凯
            txhj_mingguangkai:{
            trigger:{
            global:"phaseBegin",
            },
            content:function (){
            "step 0"
            player.judge(function(card){
if(get.suit(card)=='heart'&&player.hp<player.maxHp) return 2;
					return 0;
				});
            "step 1"
            if(result.bool){
	     			 player.recover();
			          	}
           			}
              },
			//七星袍
            txhj_qixingpao:{
            trigger:{
            player:"damageBefore",
            },
	      		audio:true,
            forced:true,
            filter:function (event){
return event.nature=='thunder'||event.nature=='fire'||event.nature=='ice';
            },
            content:function (){
            trigger.untrigger();
            trigger.finish();
            game.log(player,'免疫此伤害');
            },
			ai:{
				nofire:true,
				nothunder:true,
				nopoison:true,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'natureDamage')) return 'zerotarget';
						if(card.name=='tiesuo'){
							return [0,0];
						}
					}
				}
			}
		},
			//圣光白衣
            txhj_shengguangbaiyi:{
            trigger:{
            target:"shaBefore",
            },
	      		audio:true,
            forced:true,
            filter:function (event,player){
            return (event.card.name=='sha'&&get.color(event.card)=='red'&&!event.parent.player.num('s','unequip'))
},
            content:function (){
            trigger.untrigger();
            trigger.finish();
            },
            ai:{
				effect:{
					target:function(card,player){
						var equip1=player.get('e','1');
						if(equip1&&equip1.name=='qinggang') return 1;
						if(player.num('s','unequip')) return;						if(card.name=='sha'&&get.color(card)=='red') return 'zerotarget';

					}
				}
			},
            group:['txhj_shengguangbaiyi2']
 		},
            txhj_shengguangbaiyi2:{
            mod:{
            maxHandcard:function(player,num){
            return num+=2;
            }
          }
        },				
			//卧龙四轮车
            txhj_wolongsilunche:{
            trigger:{
            target:"useCardToBefore",
            },
            forced:true,
            priority:15,
            filter:function (event,player){
return (get.type(event.card)=='trick'&&get.color(event.card)=='black');
             },
            content:function (){
            game.log(player,'发动了卧龙四轮车，',trigger.card,'对',trigger.target,'失效');
            trigger.untrigger();
            trigger.finish();
            },
            ai:{
           effect:{
        target:function (card,player,target,current){
   if(get.type(card)=='trick'&&get.color(card)=='black')             return 'zeroplayertarget';
                  },
                },
              },
            },
            txhj_noda_axe:{
				trigger:{player:'useCardToPlayered'},
				equipSkill:true,
				direct:true,
				filter:function(event,player){
					return player.isPhaseUsing()&&player!=event.target&&event.targets.length==1&&player.countCards('he')>2;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('he',get.prompt('txhj_noda_axe',trigger.target),2,'弃置两张牌，令'+get.translation(trigger.target)+'本回合内不能使用或打出牌且防具技能无效。',function(card,player){
						return card!=player.getEquip(1);
					}).set('logSkill',['txhj_noda_axe',trigger.target]).set('goon',function(event,player){
 					if(player.hasSkill('txhj_noda_axe2')) return false;
 					if(event.getParent().excluded.contains(player)) return false;
 					if(get.attitude(event.player,player)>0){
 						return false;
 					}
 					if(get.type(event.card)=='trick'&&event.player.hasWuxie()) return true;
 					if(get.tag(event.card,'respondSha')){
 						if(!player.hasSha()) return false;
 						return true;
 					}
 					else if(get.tag(event.card,'respondShan')){
 						if(!player.hasShan()) return false;
 						return true;
 					}
 					return false;
					}(trigger,trigger.target)).set('ai',function(card){
						if(_status.event.goon) return 7.5-get.value(card);
						return 0;
					});
					'step 1'
					if(result.bool) trigger.target.addTempSkill('txhj_noda_axe2');
				},
			},
			txhj_noda_axe2:{
				equipSkill:true,
				mod:{
					cardEnabled:function(){return false},
					cardSavable:function(){return false},
					cardRespondable:function(){return false},
				},
				mark:true,
				intro:{
					content:'不能使用或打出牌且防具技能无效直到回合结束',
				},
				ai:{unequip2:true},
			},
			//镇魂琴
		        txhj_zhenhunqin:{
  trigger:{player:'useCardToBefore'},
		        priority:7,
		        filter:function(event,player){
				if(event.card.name=='sha'&&!event.card.nature) return true;
			},
		     audio:'ext:太虚幻境/audio/card:1',
		        check:function(event,player){
				var att=ai.get.attitude(player,event.target);
				if(event.target.hasSkillTag('nothunder')){
					return att>0;
				}
				return att<=0;
			},
		        content:function(){
		        trigger.card.nature='thunder';
		          }
		        },
		        //邪神面具
            txhj_xieshenmianju:{
         trigger:{player:'turnOverBefore'},
            forced:true,
            audio:'ext:太虚幻境/audio/card:1',
  					content:function(){
						trigger.untrigger();
						trigger.finish();
					},
			ai:{
				noturnOver:true,
				effect:{
					target:function(card,player,target,current){
						if(get.tag(card,'turnOver')) return [0,0];
					}
				}
			},
					group:['txhj_xieshenmianju2'],
				},
            txhj_xieshenmianju2:{
            trigger:{player:'damageBegin'},
            forced:true,
            audio:'ext:太虚幻境/audio/card:1',
            filter:function(event,player){
            if(event.num<=1) return false;
            if(event.parent.player.num('s','unequip')) return false;
				return true;
			},
            priority:-10,
            content:function(){
            trigger.num--;
             }
           },		
            /*冲应神符技能*/
            "txhj_chongyingshenfu":{
                trigger:{player:'damageEnd'},
                forced:true,
                equipSkill:true,
                filter:function(event,player){
                    if(!event.card||!event.card.name||player.getStorage('txhj_chongyingshenfu_effect').contains(event.card.name)) return false;
                    if(player.hasSkillTag('unequip2')) return false;
                    if(event.source.hasSkillTag('unequip',false,{
                        name:event.card.name,
                        target:player,
                        card:event.card,
                    })) return false;
                    return true;
                },
                content:function(){
                    player.markAuto('txhj_chongyingshenfu_effect',[trigger.card.name]);
                },
                group:'txhj_chongyingshenfu_effect',
                subSkill:{
                    effect:{
                        trigger:{player:'damageBegin4'},
                        forced:true,
                        equipSkill:true,
                        filter:function(event,player){
                            if(!event.card||!event.card.name||!player.storage.txhj_chongyingshenfu_effect||!player.getStorage('txhj_chongyingshenfu_effect').contains(event.card.name)) return false;
                            if(player.hasSkillTag('unequip2')) return false;
                            if(event.source.hasSkillTag('unequip',false,{
                                name:event.card.name,
                                target:player,
                                card:event.card,
                            })) return false;
                            return true;
                        },
                        content:function(){
                            trigger.num--;
                        },
                        onremove:true,
                        intro:{
                            content:'受到$造成的伤害-1',
                        },
                    },
                },
            },  

          
        },
        translate:{
                "txhj_shengdong":"声东击西",
        "txhj_shengdong_info":"出牌阶段，你可以选择一名其他角色并交给其一张手牌，然后其将两张手牌交给你指定的另一名角色。<span class=\"bluetext\" style=\"color:gray\">(可重铸)</span>",
        
        "txhj_shuiyan":"水淹七军",
        "txhj_shuiyan_info":"出牌阶段，对一名其他角色使用。除非目标角色弃置任意张点数之和大于等于6的装备牌，否则其受到一点雷电伤害。",
        
            "txhj_lingbaoxianhu":"灵宝仙壶",
            "txhj_lingbaoxianhu_info":"锁定技，当你造成点数大于1的伤害后，或有其他角色死亡后，你加1点体力上限并回复1点体力。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_xianhujiqu.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">仙葫汲取</span><br><span class=\"bluetext\" style=\"color:gold\">战斗结束后，若你的体力上限大于战斗前的体力上限，则继承结束后的体力上限。</span>",
            
            "txhj_chongyingshenfu":"冲应神符",
            "txhj_chongyingshenfu_info":"锁定技,当你受到一种牌造成的伤害后，本局相同牌名的牌对你造成的伤害-1。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_shenfuhuaxie.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">神符化邪</span><br><span class=\"bluetext\" style=\"color:gold\">当你受到伤害后，你获得造成伤害的牌。</span>",
            
            "txhj_caomu":"草木皆兵",
            "txhj_caomu_info":"出牌阶段，对一名其他角色使用，目标角色弃置一张牌，与其距离为一的角色各摸一张牌。",
            
            "txhj_chiyanzhenhunqin":"赤焰镇魂琴",
            "txhj_chiyanzhenhunqin_info":"锁定技，你造成的伤害均视为具有火属性。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_yanhuozhiren.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">焱火之刃</span><br><span class=\"bluetext\" style=\"color:gold\">若你的装备区内有武器牌，你造成的火焰伤害+1。</span>",
    
           "txhj_diaohu":"调虎离山",
            "txhj_diaohu_info":"出牌阶段，对一名其他角色使用，目标角色翻面，然后你与其各摸一张牌。",
            
            "txhj_dinglanyemingzhu":"定澜夜明珠",
            "txhj_dinglanyemingzhu_info":"出牌阶段限一次，你可以弃置至多X张牌（X为你的体力上限），然后摸等量的牌。",
            "txhj_feilong":"飞龙夺凤",
            "txhj_feilong_info":"当你杀死角色后，若对局未结束，你令其复活成为你的队友并将体力和体力上限调整至3。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_pozhenzhifeng.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">破阵之锋</span><br><span class=\"bluetext\" style=\"color:gold\">出牌阶段，若你的装备区内有武器牌，敌方角色的防具无效。</span>",
            "txhj_feilong_skill":"飞龙夺凤",
            
             "txhj_guofengyupao":"国风玉袍",
            "txhj_guofengyupao_info":"锁定技，你不能成为其他角色使用普通锦囊牌的目标。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_juejingzhice.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">绝境之策</span><br><span class=\"bluetext\" style=\"color:gold\">当你使用[闪]后，若你没有手牌，你摸两张牌。</span>",
              "txhj_huoshaolianying":"火烧连营",
            "txhj_huoshaolianying_info":"出牌阶段，对你的下家使用，其受到1点火焰伤害。若其下家与其阵营相同，则其下家也受到1点火焰伤害，然后重复此流程。",
              "txhj_jiedao":"借刀杀人",
            "txhj_jiedao_info":"出牌阶段，对一名其他角色使用，除非其对其攻击范围由你选择的另一名角色使用一张【杀】，否则其失去一点体力。",
             "txhj_juechenjinge":"绝尘金戈",
            "txhj_juechenjinge_info":"其他角色计算与你距离+2；其他角色计算与己方其他角色距离+1。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_wuzhongshengshan.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">无中生闪</span><br><span class=\"bluetext\" style=\"color:gold\">结束阶段，你从牌堆或弃牌堆中获得一张[闪]</span>",
            
            "txhj_leijimu":"雷击木",
            "txhj_leijimu_info":"你使用普通的【杀】时，你可以将此【杀】改为雷【杀】。",
            
               "txhj_liulongcanjia":"六龙骖驾",
            "txhj_liulongcanjia_info":"锁定技，你计算与其他角色的距离-1，其他角色计算与你的距离+1。锁定技，当此牌进入你的装备区时，你弃置你装备区内其他坐骑牌；当此牌在你的装备区内，你不能使用其他坐骑牌（你的装备区便不能置入其他坐骑牌）。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_wuzhongshengsha.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">无中生杀</span><br><span class=\"bluetext\" style=\"color:gold\">准备阶段，你从牌堆或弃牌堆中获得一张[杀]。</span>",
              "txhj_piliche":"霹雳车",
            "txhj_piliche_info":"当你对其他角色造成伤害后，你可令其减少等同伤害值的体力上限。",
            "txhj_taijifuchen":"太极拂尘",
            "txhj_taijifuchen_info":"锁定技，当你使用【杀】指定目标后，你令目标角色选择一项：①弃置一张牌，若此牌和【杀】花色相同，则你获得之。②其不可响应此【杀】。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_fuchendangmo.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">拂尘荡魔</span><br><span class=\"bluetext\" style=\"color:gold\">当你因武器效果令其他角色弃牌时，弃牌数+1。</span>",
            "txhj_xuwangzhimian":"虚妄之冕",
            "txhj_xuwangzhimian_info":"锁定技，摸牌阶段，你额外摸两张牌；你的手牌上限-1。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=width:63px src="+lib.assetURL+"extension/太虚幻境/image/buff/buff_txhj_shenfuhuaxie.png><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"font-family: shousha;text-align: center\">神符化邪</span><br><span class=\"bluetext\" style=\"color:gold\">你受到伤害后，你获得造成伤害的牌。</span>",
            "txhj_yiyi":"以逸待劳",
            "txhj_yiyi_info":"出牌阶段，对你和所有友方角色使用，目标依次摸两张，牌然后弃置两张牌。",
            "txhj_yuanjiao":"远交近攻",
            "txhj_yuanjiao_info":"出牌阶段，对一名其他角色使用目标角色摸一张牌，然后你摸三张牌。",
            "txhj_zhijizhibi":"知己知彼",
            "txhj_zhijizhibi_info":"对一名有手牌的其他角色使用，你观看目标的手牌并摸一张牌。",
            "txhj_fangtianhuaji":"方天画戟",
            "txhj_fangtianhuaji_info":"锁定技，你于出牌阶段使用的第一张【杀】目标+2。",
            "txhj_qilingong":"麒麟弓",
            "txhj_qilingong_info":"当你使用【杀】对目标角色造成伤害时，你可以弃置其装备区里的一张宝物牌。",
             "txhj_zhuge":"诸葛连弩",
            "txhj_zhuge_info":"锁定技，你使用【杀】的次数+3。",
            txminguangkai:'明光铠',
			txminguangkai_cancel:'明光铠',
			txminguangkai_link:'明光铠',
			txminguangkai_info:'锁定技。①当你成为【火烧连营】、【火攻】或火【杀】的目标时，取消之。②当你即将横置前，若你已受伤，取消之。',
			txzhaoshu:'诏书',
			txzhaoshu_skill:'锦囊召唤',
			txzhaoshu_global:'诏书',
			txzhaoshu_info:'<li>出牌阶段，对你自己使用。此牌不可被任何效果弃置或移除，你将此牌置于你的武将牌上。<br><li>与你相同阵营的角色的出牌阶段限两次，其可以将一张手牌（受伤的角色改为至多两张）置于【诏书】上，称为“应”。<br><li>出牌阶段限两次，若你的“应”中包含至少两种花色，则你可以发动“锦囊召唤”：将所有“应”置入弃牌堆，然后随机获得一张未加入牌堆的额外锦囊牌（洞烛先机、逐近弃远、水淹七军、出其不意）。',	
			"txhj_zhenhunqin":"镇魂琴",
            "txhj_zhenhunqin_info":"你可以将你的任一普通【杀】当着雷电伤害的【杀】使用。",
           txhj_xieshenmianju_bg:'邪',
           txhj_xieshenmianju:'邪神面具',
           txhj_xieshenmianju_info:'锁定技，你每次受到大于等于2点伤害时，该伤害-1；<br>锁定技，武将牌不能被翻面。',
        txhj_shengguangbaiyi_bg:'圣',
        txhj_shengguangbaiyi:'圣光白衣',
        txhj_shengguangbaiyi_info:'锁定技，红色【杀】对你无效，你的手牌上限+2。',
        txhj_wangmeizhike:'望梅止渴',
 		 txhj_wangmeizhike_info:'出牌阶段，对任意一名角色使用该角色立即判定:若结果为♣，则目标回复一点体力；若不是♣，摸一张牌。',
            txhj_xingtianpojunfu:'刑天破军斧',
			txhj_noda_axe:'刑天破军斧',
			txhj_noda_axe2:'刑天破军斧',
			txhj_xingtianpojunfu_info:'当你于出牌阶段内使用牌指定唯一目标后，你可弃置两张牌。若如此做，其本回合内不能使用或打出牌且其防具技能无效。',
			
        
        
        },
    };
    if(lib.device||lib.node){
        for(var i in txhj_cardPack.card){
            txhj_cardPack.card[i].image='ext:太虚幻境/image/card/'+i+'.png';
        };
    } else{
        for(var i in txhjCardPack.card){
            txhj_cardPack.card[i].image='db:extension-太虚幻境/image/card:'+i+'.png';
        }
    }
    return txhj_cardPack;
});
