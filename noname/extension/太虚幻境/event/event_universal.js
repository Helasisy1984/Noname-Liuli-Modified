'use strict';
game.import('太虚幻境',function (lib, game, ui, get, ai, _status) {
    game.gainPack = {
        'txhj_yinandejiaoyi':{
            id:'txhj_yinandejiaoyi',
            name:'阴暗的交易',
            type:'trade',
            info:'有人想与你进行交易',
            text:'有人想与你进行交易',
            level:1,
            unique:false,
            change:false,
            priority:1,
            buttons:[
            {
                result:true,
                name:'失去一个随机装备获得400金币',
                effect:[{name:'coin',number:400},{name:'removeEquip',number:1}],
                random:1,
            },
            {
                result:true,
                name:'失去一个随机卡牌获得400金币',
                effect:[{name:'coin',number:400},{name:'removeCard',number:1}],
                random:1,
            },
            ],
            ext:'txhj_yinandejiaoyi',
        },
        'txhj_linghundejiaoyi':{
            id:'txhj_linghundejiaoyi',
            name:'灵魂的交易',
            type:'trade',
            info:'有人想与你进行交易',
            text:'一个人想与你交易',
            level:1,
            unique:false,
            change:false,
            priority:1,
            buttons:[
            {
                result:true,
                name:'失去一个随机技能获得500金币',
                effect:[{name:'coin',number:500},{name:'removeSkill',number:1}],
                random:1,
            },
            {
                result:true,
                name:'失去一个随机祝福获得300金币',
                effect:[{name:'coin',number:300},{name:'removeBuff',number:1}],
                random:1,
            },
            ],
            ext:'txhj_linghundejiaoyi',
        },
        'txhj_luorushenyuan':{
            id:'txhj_luorushenyuan',
            name:'落入深渊',
            type:'trade',
            info:'你不慎跌入深渊，只得继续向下',
            text:'忍着伤痛前行，你获得了什么呢……',
            level:1,
            unique:false,
            change:false,
            priority:1,
            buttons:[
            {
                result:true,
                name:'得到了一张牌库牌！',
                effect:[{name:'randomCard',number:1},{name:'maxHp',number:-1}],
                random:1,
            },
            {
                result:true,
                name:'探寻到宝藏了！',
                effect:[{name:'coin',number:300},{name:'maxHp',number:-1}],
                random:1,
            },
            {
                result:true,
                name:'得到技能了！',
                effect:[{name:'randomSkill',number:1},{name:'maxHp',number:-1}],
                random:1,
            },
            {
                result:true,
                name:'找到灵气充沛之地！',
                effect:[{name:'maxHs',number:1},{name:'maxHp',number:-1}],
                random:1,
            },
            ],
            ext:'txhj_luorushenyuan',
        },
        'txhj_tianmingjiashen':{
            id:'txhj_tianmingjiashen',
            name:'天命加身',
            type:'gain',
            info:'将星无数，化作星河',
            text:'你于星河中荡漾，得到了武将的祝福',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:1,
			random:0.1,
            buttons:[
            {
                result:true,
                name:'获得武将精华祝福与技能各一个',
                effect:[{name:'randomBuff',number:1},{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_tiandijinghua',
        },
        'txhj_wannianxianguo':{
            id:'txhj_wannianxianguo',
            name:'万年仙果',
            type:'gain',
            info:'仙果婆婆采摘到了万年方成熟的仙果',
            text:'这次可以选择仙果更加丰硕肥美',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:2,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'经络扩充，兼以肉身成长',
                effect:[{name:'minHs',number:3},{name:'maxHp',number:1},{name:'hp',number:1}],
                random:1,
            },
            {
                result:true,
                name:'肉身筑基，经络稍有舒展',
                effect:[{name:'minHs',number:1},{name:'maxHp',number:2},{name:'hp',number:2}],
                random:1,
            },
            ],
            ext:'txhj_guyuanxianguo',
        },
        'txhj_tianjiangshenbing':{
            id:'txhj_tianjiangshenbing',
            name:'天匠神兵',
            type:'gain',
            info:'天空中降下神女，手中閃耀夺目之光',
            text:'她应葛玄之邀翩然而至，只为给你一件神器',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:2,
			random:0.1,
            buttons:[
            {
                result:true,
                name:'获得随机神器',
                effect:[{name:'randomUnique',number:1}],
                random:1,
            },
            ],
            ext:'txhj_tianjiangshenbing',
        },
        'txhj_fujiahaoli':{
            id:'txhj_fujiahaoli',
            name:'富贾豪礼',
            type:'gain',
            info:'依旧是为了助你前进，但他给出了更多的钱...',
            text:'获得好多金币！',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:1,
			random:0.4,
            buttons:[
            {
                result:true,
                name:'获得金币了！',
                effect:[{name:'coin',number:1000}],
                random:1,
            },
            ],
            ext:'txhj_fujiazhili',
        },
        'txhj_puyuanchuanren':{
            id:'txhj_puyuanchuanren',
            name:'蒲元传人',
            type:'gain',
            info:'一个刺客的幻象正在前方...',
            text:'他可教你杀人术法，你因此可以获得一张对应类型的牌',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:2,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'获得武器',
                effect:[{name:'equip1',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得防具',
                effect:[{name:'equip2',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得宝物',
                effect:[{name:'equip5',number:1}],
                random:1,
            },
            ],
            ext:'txhj_puyuanchuanren',
        },
        'txhj_fujiazhili':{
            id:'txhj_fujiazhili',
            name:'富贾之礼',
            type:'gain',
            info:'你看到一处豪宅，貌似糜竺之人面带微笑站在门外...',
            text:'原来此为财富幻象，他为助你前进，交给你一些金币',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:2,
			random:0.3,
            buttons:[
            {
                result:true,
                name:'获得金币了！',
                effect:[{name:'coin',number:600}],
                random:1,
            },
            ],
            ext:'txhj_fujiazhili',
        },
        'txhj_jiangxuntianming':{
            id:'txhj_jiangxuntianming',
            name:'将循天命',
            type:'gain',
            info:'天边耀眼的光芒，是无数的将星',
            text:'你靠近将星，发现竟然可以信手摘取想要的一颗',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:3,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'以乾为道，获得一个武将精华祝福',
                effect:[{name:'randomBuff',number:1}],
                random:1,
            },
            {
                result:true,
                name:'以坤为道，获得一个武将技能',
                effect:[{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_jiangxuntianming',
        },
        'txhj_guyuanxianguo':{
            id:'txhj_guyuanxianguo',
            name:'固元鲜果',
            type:'gain',
            info:'一个和蔼的婆婆正在采摘鲜果...',
            text:'婆婆看你疲乏，笑着让你随意选择',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:3,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'舒展经络，初始手牌数+1',
                effect:[{name:'minHs',number:1}],
                random:1,
            },
            {
                result:true,
                name:'肉身成长，体力及体力上限提升',
                effect:[{name:'maxHp',number:1}],
                random:1,
            },
            ],
            ext:'txhj_guyuanxianguo',
        },
        'txhj_yiqiweiren':{
            id:'txhj_yiqiweiren',
            name:'以气为刃',
            type:'gain',
            info:'此地灵气可以塑形，你可用于己身',
            text:'你将一缕灵气转化为了一张牌',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:4,
			random:0.4,
            buttons:[
            {
                result:true,
                name:'得到了一张牌库牌',
                effect:[{name:'randomCard',number:1}],
                random:1,
            },
            ],
            ext:'txhj_yiqiweiren',
        },
        'txhj_hezhongshafa':{
            id:'txhj_hezhongshafa',
            name:'何种杀法？',
            type:'gain',
            info:'一个刺客的幻象正在前方...',
            text:'他可教你杀人术法，你因此可以获得一张对应类型的牌',
            rank:0,
            level:1,
            unique:false,
            change:false,
            priority:4,
			random:0.4,
            buttons:[
            {
                result:true,
                name:'获得基本牌',
                effect:[{name:'basic',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得锦囊牌',
                effect:[{name:'trick',number:1}],
                random:1,
            },
            ],
            ext:'txhj_hezhongshafa',
        },
        'txhj_gongfangzhize':{
            id:'txhj_gongfangzhize',
            name:'攻防之择',
            type:'gain',
            info:'选择一种技能获取吧',
            text:'你更喜欢进攻还是防御呢',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:3,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'获得攻击技能',
                effect:[{name:'attack',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得防御技能',
                effect:[{name:'defense',number:1}],
                random:1,
            },
            ],
            ext:'txhj_gongfangzhize',
        },
        'txhj_diwozhize':{
            id:'txhj_diwozhize',
            name:'敌我之择',
            type:'gain',
            info:'选择一种技能获取吧',
            text:'你更喜欢干扰敌人呢，还是自己成长呢',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:3,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'获得辅助技能',
                effect:[{name:'assist',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得爆发技能',
                effect:[{name:'burst',number:1}],
                random:1,
            },
            ],
            ext:'txhj_diwozhize',
        },
        'txhj_qihaikuolan':{
            id:'txhj_qihaikuolan',
            name:'气海扩澜',
            type:'gain',
            info:'在幻境中呆了许久，你感觉身体有些微妙的变化',
            text:'原来是气海变得更为幽深，可以保留更多内力',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:3,
			random:0.3,
            buttons:[
            {
                result:true,
                name:'手牌上限提升了（+2）',
                effect:[{name:'maxHs',number:2}],
                random:1,
            },
            {
                result:true,
                name:'得到了一张牌库牌',
                effect:[{name:'randomCard',number:1}],
                random:1,
            },
            ],
            ext:'txhj_qihaikuolan',
        },
        'txhj_cuitilianhun':{
            id:'txhj_cuitilianhun',
            name:'淬体炼魂',
            type:'gain',
            info:'你可以磨练自己，以变得更强',
            text:'选择肉身的成长，抑或灵魂的洗练吧',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:3,
			random:0.1,
            buttons:[
            {
                result:true,
                name:'肉体成长，体力及体力上限+1',
                effect:[{name:'maxHp',number:1}],
                random:1,
            },
            {
                result:true,
                name:'灵魂洗炼，技能槽+1',
                effect:[{name:'maxSkills',number:1}],
                random:1,
            },
            ],
            ext:'txhj_cuitilianhun',
        },
        'txhj_cuitijindan':{
            id:'txhj_cuitijindan',
            name:'淬体金丹',
            type:'gain',
            info:'葛玄虽然不在此地，但他为进入幻境的人留下了礼物',
            text:'此为葛玄炼制金丹，可以令肉身成长',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:4,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'体力及体力上限+1',
                effect:[{name:'maxHp',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得金币了',
                effect:[{name:'coin',number:300}],
                random:1,
            },
            ],
            ext:'txhj_cuitijindan',
        },
        'txhj_tiandijinghua':{
            id:'txhj_tiandijinghua',
            name:'天地精华',
            type:'gain',
            info:'此地灵气丰裕，你或可有所得',
            text:'经过修炼，你果真获得了祝福',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:4,
			random:0.3,
            buttons:[
            {
                result:true,
                name:'得到祝福了！',
                effect:[{name:'randomBuff',number:1}],
                random:1,
            },
            ],
            ext:'txhj_tiandijinghua',
        },
        'txhj_huanjingzhibao':{
            id:'txhj_huanjingzhibao',
            name:'幻境之宝',
            type:'gain',
            info:'幻境为左慈取得仙法之地，你能在这里找到什么呢',
            text:'遍寻此地，你找到了一个武将的化身',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:2,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'得到技能了！',
                effect:[{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_huanjingzhibao',
        },
        'txhj_zuocizhizhuan':{
            id:'txhj_zuocizhizhuan',
            name:'左慈之传',
            type:'gain',
            info:'你看到左慈于此修炼时留下的残像',
            text:'残像竟然有化身之能，你得到一名英杰的助力',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:2,
			random:0.3,
            buttons:[
            {
                result:true,
                name:'获得武将传承，得到了新的技能',
                effect:[{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_zuocizhizhuan',
        },
        'txhj_linghunzhichi':{
            id:'txhj_linghunzhichi',
            name:'灵魂之池',
            type:'gain',
            info:'这片幽潭之内，全都是灵魂的精华',
            text:'你沐浴灵魂池中，对英灵的理解加深了',
            rank:0,
            level:3,
            unique:false,
            change:false,
            priority:2,
			random:0.2,
            buttons:[
            {
                result:true,
                name:'灵魂洗炼，技能槽+1',
                effect:[{name:'maxSkills',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得武将传承，得到了新的技能+1',
                effect:[{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_linghunzhichi',
        },
    };
    game.examPack = {
        exam1:{
            'exam1001':{
                id:'exam1001',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'大乔是谁的夫人？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孙坚',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙十万',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'王平',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙策',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1002':{
                id:'exam1002',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'【杀】是最基础的攻击牌，其效果是什么？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'让自己进入假死状态',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'大吼一声，恐吓住敌人',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'对攻击范围内的武将使用，造成伤害',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1003':{
                id:'exam1003',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'以下哪位角色可以无视【闪电】？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'界司马懿',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'司马懿',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'贾诩',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'sp贾诩',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1004':{
                id:'exam1004',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'与黄盖可形成完美配合是武将是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'吕虔',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张星彩',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'貂蝉',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'蜀香香',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1005':{
                id:'exam1005',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'请问有冲阵技能的是哪位？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'赵云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'界赵云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'关兴张苞',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'小学云',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1006':{
                id:'exam1006',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'三国杀中谁是三体力武将？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'赵统赵广',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'全琮',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'高顺',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'小学云',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1007':{
                id:'exam1007',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'三国中哪位女性在死后被追封为皇后？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'貂蝉',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'蔡夫人',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'徐氏',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'步练师',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1008':{
                id:'exam1008',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'以下哪个是孙权的老婆？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'吴国太',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'香香',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'大乔',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'步练师',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1009':{
                id:'exam1009',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'赤乌九年何人代陆逊为相？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'吕蒙',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'岑昏',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'凌统',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'步骘',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1010':{
                id:'exam1010',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'请问东吴帝国在陆逊之后的丞相是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'甘宁',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'顾雍',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张昭张纮',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'步骘',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1011':{
                id:'exam1011',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'三国中谁是中国古代四大才女之一？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'甄姬',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'香香',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'黄月英',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'蔡文姬',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1012':{
                id:'exam1012',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'下列哪个武将可以使刘禅的享乐技能失效？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'界马超',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'界关羽',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'何进',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'蔡文姬',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1013':{
                id:'exam1013',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'蔡文姬父亲的名字叫什么？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'马超',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'颜良文丑',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'王允',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'蔡邕',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1014':{
                id:'exam1014',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'顾雍是谁的徒弟？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'程昱',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'郭嘉',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'荀攸',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'蔡邕',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1015':{
                id:'exam1015',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'被杀友们称为保镖的是哪个武将？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'文聘',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'典韦',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹昂',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1016':{
                id:'exam1016',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'曹操的哪个儿子被封为丰悼王？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹冲',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹彰',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹植',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹昂',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1017':{
                id:'exam1017',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'阿瞒是谁的小名？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'关羽',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙十万',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘备',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹操',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1018':{
                id:'exam1018',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'蔡文姬在谁的帮助下回到中原？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹植',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹丕',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'甄姬',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹操',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1019':{
                id:'exam1019',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'曹操有意传位给他，他却早夭，他是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹叡',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹昂',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹丕',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹冲',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1020':{
                id:'exam1020',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'请问以下哪个人是环夫人的独子？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹纯',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹植',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'祢衡',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹冲',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1021':{
                id:'exam1021',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'无名杀太虚幻境模式是由哪个小组制作完成？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'扶贫办',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'很多人',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'太虚幻境小组',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'攻坚队',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1022':{
                id:'exam1022',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'郭图被谁一箭射死？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'张八百',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李典',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'于禁',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'乐进',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1023':{
                id:'exam1023',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'谁在官渡之战中斩了淳于琼？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'马超',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'徐晃',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'于禁',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'乐进',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1024':{
                id:'exam1024',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'谁是和张辽一起镇守合肥的？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'于禁',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'徐晃',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'庞德',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'李典',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1025':{
                id:'exam1025',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'下面哪个是李严儿子？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'钟繇',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李儒',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李典',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'李丰',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1026':{
                id:'exam1026',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'汉少帝被谁毒死？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'何太后',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'徐氏',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'陆绩',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'李儒',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1027':{
                id:'exam1027',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'请问以下谁是董卓的首席谋士？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'刘琦',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'简雍',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛诞',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'李儒',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1028':{
                id:'exam1028',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'三国时期董卓的女婿是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'刘晔',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'满宠',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'沙摩柯',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'李儒',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1029':{
                id:'exam1029',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'经历魏蜀吴三国兴衰的蜀汉老将之一是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'赵云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张飞',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'颜严',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'廖化',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1030':{
                id:'exam1030',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'三国时期活的最久的武将是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'王异',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹洪',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张八百',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'廖化',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1031':{
                id:'exam1031',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'三国中谁武力最强？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹真',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'典韦',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'吕布',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1032':{
                id:'exam1032',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'夏侯惇的眼睛是在征讨谁的时候被射瞎？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹性',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'袁绍',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹叡',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'吕布',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1033':{
                id:'exam1033',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'张辽投降曹操前是谁的手下？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'徐盛',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'袁术',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'陶谦',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'吕布',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1034':{
                id:'exam1034',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'杀死关羽的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'蒯良蒯越',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'凌统',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'陆逊',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'吕蒙',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1035':{
                id:'exam1035',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'谁曾经因为读书少而被嫌弃？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'陆逊',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'鲁肃',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'周瑜',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'吕蒙',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1036':{
                id:'exam1036',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'祢衡认为谁只配磨刀铸剑？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'伏完',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'满宠',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李典',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'吕虔',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1037':{
                id:'exam1037',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'曹操被谁追杀的割袍断须？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'赵云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张飞',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'关羽',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马超',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1038':{
                id:'exam1038',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'“孟起”是谁的字？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'董卓',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张飞',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马超',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1039':{
                id:'exam1039',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'魏延被何人所杀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'贺齐',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'公孙瓒',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马良',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马岱',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1040':{
                id:'exam1040',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'第七次擒住孟获的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'张琪瑛',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'魏延',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马岱',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1041':{
                id:'exam1041',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'蜀中何人认为陆逊才能不在周瑜之下？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵襄',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'伊籍',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马良',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1042':{
                id:'exam1042',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'以下人物谁在夷陵之战中战死了？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'马谡',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马岱',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马超',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马良',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1043':{
                id:'exam1043',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'下列哪个是被诸葛亮挥泪斩杀的人？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'何进',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张角',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'姜维',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马谡',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1044':{
                id:'exam1044',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'谁失了街亭被斩首？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'潘濬',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'司马朗',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'许褚',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马谡',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1045':{
                id:'exam1045',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'被玩家称为马老板的武将是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'马云騄',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马岱',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马超',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'马腾',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1046':{
                id:'exam1046',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'是谁替曹操说降了徐晃？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'何进',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'郭嘉',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙坚',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'满宠',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1047':{
                id:'exam1047',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'被诸葛亮七擒七纵的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'何进',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'祝融',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'司马懿',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孟获',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1048':{
                id:'exam1048',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'请问下列哪个三国杀武将不需要诸葛连弩？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'刘备',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马超',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'祢衡',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1049':{
                id:'exam1049',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'被玩家称为“五秒男”的武将是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'邓艾',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'小学云',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'留赞',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'祢衡',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
            'exam1050':{
                id:'exam1050',
                name:'宿命的诘问',
                type:'exam1',
                info:'忽然出现的上仙要小小地考考你',
                text:'刘备的哪位夫人在长阪坡跳井自尽？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'貂蝉',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'甘夫人',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吕虔',
                        effect:[{name:'maxHp',number:-1}],
                        random:1,
                    },
                    {
                        result:true,
                        name:'糜夫人',
                        effect:[{name:'maxSkills',number:1},{name:'randomSkill',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_sumingdejiewen',
            },
        },
        exam2:{
            'exam2001':{
                id:'exam2001',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'曹操的哪个儿子跟大将典韦一起死在宛城？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'陆逊',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹丕',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹昂',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2002':{
                id:'exam2002',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'曹操的长子是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹植',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹丕',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹彰',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹昂',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2003':{
                id:'exam2003',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'陈琳在袁绍手下时曾发檄文讨伐过谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'公孙瓒',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'袁术',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘表',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹操',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2004':{
                id:'exam2004',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'赤壁之战失败的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹真',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'王基',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘备',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹操',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2005':{
                id:'exam2005',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'曹仁的弟弟是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'阚泽',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹植',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹丕',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹纯',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2006':{
                id:'exam2006',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'谁抓住了徐庶母亲？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹昂',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹仁',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹纯',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2007':{
                id:'exam2007',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'谁救了被徐荣射中的曹操？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'马超',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'乐进',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李典',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹洪',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2008':{
                id:'exam2008',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'袁谭被谁所杀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'夏侯渊',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'夏侯惇',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹仁',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹洪',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2009':{
                id:'exam2009',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'汉献帝刘协禅位之时，他的皇后是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'徐氏',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵襄',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹叡',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹节',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2010':{
                id:'exam2010',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'郭女王是谁的老婆？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹叡',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹植',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹丕',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2011':{
                id:'exam2011',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'魏文帝是以下哪位？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹真',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'王基',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹丕',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2012':{
                id:'exam2012',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'请问是谁命弓箭手用毒箭射伤关羽？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹真',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹洪',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'曹仁',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2013':{
                id:'exam2013',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'赤壁之战谁看出黄盖来船有诈？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'贾诩',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'郭嘉',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'荀攸',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'程昱',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2014':{
                id:'exam2014',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'以下武将谁有口吃的毛病？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'杨修',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙乾',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'简雍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'邓艾',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2015':{
                id:'exam2015',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'灵雎是谁的女儿？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'大乔',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'小乔',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'甘夫人',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'貂蝉',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2016':{
                id:'exam2016',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'张辽被何人一箭射中腰部？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'徐盛',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'朱桓',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'凌统',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'丁奉',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2017':{
                id:'exam2017',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'赤兔马最早是谁的坐骑？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'吕布',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李傕',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'鲁芝',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'董卓',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2018':{
                id:'exam2018',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'定军山之战时，刘备身边的谋士是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'秦宓',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'庞统',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'法正',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2019':{
                id:'exam2019',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'昭烈皇后是谁的谥号？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'徐氏',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'香香',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'糜夫人',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'甘夫人',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2020':{
                id:'exam2020',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'下列与凌统有杀父之仇的是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'赵云',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹仁',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'乐进',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'甘宁',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2021':{
                id:'exam2021',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'无名杀太虚幻境模式是由哪个小组制作完成？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'很多人',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'太虚幻境小组',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'扶贫办',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'攻坚队',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2022':{
                id:'exam2022',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'野史记载，吕布的女儿叫做什么？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'果果',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵襄',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吕玲绮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'灵雎',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2023':{
                id:'exam2023',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'决定杀掉韩暹、杨奉两名降将的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'貂蝉',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'陈宫',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吕布',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘备',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2024':{
                id:'exam2024',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'刘封被谁收为义子？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'董白',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'公孙瓒',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘谌',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘备',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2025':{
                id:'exam2025',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'请问刘琮是以下人物谁的儿子？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'嵇康',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘协',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘备',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘表',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2026':{
                id:'exam2026',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'三国时期在位时间最长的皇帝是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'刘琦',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙十万',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹叡',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘禅',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2027':{
                id:'exam2027',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'刘禅立哪个儿子为北地王？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'刘虞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘封',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'许褚',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘谌',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2028':{
                id:'exam2028',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'西蜀将亡前谁在太庙自杀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'关兴张苞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘禅',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘封',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘谌',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2029':{
                id:'exam2029',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'刘备的义子是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'刘谌',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘虞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘禅',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘封',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2030':{
                id:'exam2030',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'刘表的长子是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'糜竺',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘禅',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'纪灵',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘琦',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2031':{
                id:'exam2031',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'刘备登基后官职最大的是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'张飞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'关羽',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'糜竺',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2032':{
                id:'exam2032',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'以下哪位谋士最早跟随刘备？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'法正',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马良',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'糜竺',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2033':{
                id:'exam2033',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'下列是华雄在汜水关前斩杀的将领是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'辛宪英',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'祖茂',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'甘宁',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'潘凤',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2034':{
                id:'exam2034',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'赤壁之战中，下面哪个人给曹操献了连环计？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孙乾',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'荀彧',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'徐庶',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'庞统',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2035':{
                id:'exam2035',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'以下何人救了被困于曹营中的徐庶？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'太史慈',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'阚泽',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'庞统',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2036':{
                id:'exam2036',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'下列谁在酒宴上舌战张温？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'简雍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'庞统',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'秦宓',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2037':{
                id:'exam2037',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'孙权将自己的女儿孙鲁班嫁给了谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'朱然',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'陆逊',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'凌统',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'全琮',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2038':{
                id:'exam2038',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'请问东吴名将甘宁最后为谁所杀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'黄忠',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵云',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'凌统',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'沙摩柯',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2039':{
                id:'exam2039',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'请问诸葛亮和庞统的师父是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'陈群',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'潘璋马忠',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'司马昭',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'庞德公',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2040':{
                id:'exam2040',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'最初向刘备推荐诸葛亮的人物是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'庞统',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘表',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'徐庶',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'庞德公',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2041':{
                id:'exam2041',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'司马懿的哥哥是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'糜竺',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'杜畿',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'纪灵',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'司马朗',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2042':{
                id:'exam2042',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'请问以下哪位皇帝是晋宣帝？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'朱灵',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹彰',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'司马昭',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'司马懿',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2043':{
                id:'exam2043',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'三国中被空城计吓走的大将是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'张昭张纮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'司马懿',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2044':{
                id:'exam2044',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'黄皓是谁命令凌迟处死的？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'关兴张苞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'庞德公',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'司马懿',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'司马昭',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2045':{
                id:'exam2045',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'司马炎是谁的儿子？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'庞德公',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'司马懿',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'蔡邕',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'司马昭',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2046':{
                id:'exam2046',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'于吉是被谁杀的？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'袁绍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张角',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙策',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2047':{
                id:'exam2047',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'三国杀玩家们常说的那个男人是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'典韦',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'关羽',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吕布',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙策',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2048':{
                id:'exam2048',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'以下谁是孙权的儿子？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孙皓',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李丰',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙坚',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙登',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2049':{
                id:'exam2049',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'东吴最后一位君主是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孙休',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙登',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙十万',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙皓',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
            'exam2050':{
                id:'exam2050',
                name:'异商的问询',
                type:'exam2',
                info:'一名西域商人火急火燎的找你打听事情',
                text:'古锭刀是谁的武器？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹真',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李傕',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'高顺',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙坚',
                        effect:[{name:'coin',number:300}],
                        random:1,
                    },
                ],
                ext:'txhj_yishangdexunwen',
            },
        },
        exam3:{
            'exam3001':{
                id:'exam3001',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'下面是公孙度之孙的是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'颜严',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'王基',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'公孙瓒',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'公孙渊',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3002':{
                id:'exam3002',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'谁曾经预料公孙渊是诈降吴国？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'陆绩',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵云',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'祢衡',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'顾雍',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3003':{
                id:'exam3003',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'以下哪个是关羽收养的孩子？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'关银屏',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'甄姬',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'关索',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'关平',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3004':{
                id:'exam3004',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'管亥被谁所杀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孔融',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'王朗',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'太史慈',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'关羽',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3005':{
                id:'exam3005',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'曹睿的正室是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'阚泽',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'蔡夫人',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'伏皇后',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'郭皇后',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3006':{
                id:'exam3006',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'请问三国第一谋士指的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'王元姬',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'周瑜',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛亮',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'郭嘉',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3007':{
                id:'exam3007',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'赤壁之战中谁将中箭的黄盖身上的箭杆咬出？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'丁奉',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'甘宁',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'程普',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'韩当',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3008':{
                id:'exam3008',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'马腾是谁的结义兄弟？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'鲁肃',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'凌统',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'韩遂',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3009':{
                id:'exam3009',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'张让曾设计陷害谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'袁绍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'袁术',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'何进',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3010':{
                id:'exam3010',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'谁和曹操是老乡？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'魏延',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'王基',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'周瑜',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'华佗',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3011':{
                id:'exam3011',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'祖茂被谁所杀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'文聘',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'甘宁',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'许褚',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'华雄',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3012':{
                id:'exam3012',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'生擒黄祖的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孙策',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'程普',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'韩当',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'黄盖',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3013':{
                id:'exam3013',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'以下哪个是诸葛亮的老婆？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'潘濬',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘封',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'香香',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'黄月英',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3014':{
                id:'exam3014',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'蜀国五虎上将中被关羽看不起的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'马超',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵云',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张飞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'黄忠',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3015':{
                id:'exam3015',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'下列谁以计谋狠毒著称？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'严白虎',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李儒',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'程昱',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'贾诩',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3016':{
                id:'exam3016',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'直接导致三国乱世开始的人是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'李儒',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'程昱',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'司马懿',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'贾诩',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3017':{
                id:'exam3017',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'三国中哪位谋士因讲黄段子被载入史册？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'岑昏',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'糜竺',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'祢衡',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'简雍',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3018':{
                id:'exam3018',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'钟会与谁密谋谋反？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'司马懿',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'诸葛诞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'邓艾',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'姜维',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3019':{
                id:'exam3019',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'王基和哪一位武将被称为永动机组合？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'周泰',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吴懿',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'邓艾',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'陆逊',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3020':{
                id:'exam3020',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'哪位武将经常给袁绍出很多良策？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'蒋琬费祎',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙十万',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙策',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'沮授',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3021':{
                id:'exam3021',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'无名杀太虚幻境模式是由哪个小组制作完成？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'扶贫办',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'太虚幻境小组',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'很多人',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'攻坚队',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3022':{
                id:'exam3022',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'汉末最后一位皇帝是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'法正',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙休',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘备',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘协',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3023':{
                id:'exam3023',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'刘璋的父亲叫什么名字？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'刘表',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘备',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘协',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘焉',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3024':{
                id:'exam3024',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'满宠是谁推荐给曹操的？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'郭嘉',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'程昱',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'荀彧',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'刘晔',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3025':{
                id:'exam3025',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'下列谁出征时，喜欢高声歌唱？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'许褚',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'典韦',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹仁',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'留赞',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3026':{
                id:'exam3026',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'刘备和公孙瓒的老师是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'蔡邕',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'陆逊',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马岱',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'卢植',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3027':{
                id:'exam3027',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'“子敬”是谁的字？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'陆逊',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'关平',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吕蒙',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'鲁肃',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3028':{
                id:'exam3028',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'继周瑜之后，东吴的下一位大都督是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'李严',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'陆逊',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吕蒙',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'鲁肃',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3029':{
                id:'exam3029',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'夷陵之战中，作为吴军主帅是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'周瑜',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吕蒙',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'鲁肃',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'陆逊',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3030':{
                id:'exam3030',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'三国杀中孙茹是谁的妻子？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'诸葛瑾',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'鲁肃',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'吕蒙',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'陆逊',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3031':{
                id:'exam3031',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'谁在井中找到了传国玉玺？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'袁术',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'袁绍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙坚',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3032':{
                id:'exam3032',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'真实历史上杀死华雄的人是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'潘凤',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'关羽',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张飞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙坚',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3033':{
                id:'exam3033',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'三国时期，吴国的第二任皇帝是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孙皓',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙休',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙十万',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙亮',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3034':{
                id:'exam3034',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'史称吴废帝的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孙皓',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙休',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙十万',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙亮',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3035':{
                id:'exam3035',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'步练师的第二个女儿叫什么？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'香香',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'赵襄',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙鲁班',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙鲁育',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3036':{
                id:'exam3036',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'吕蒙在谁的劝说下开始读书？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'赵云',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙策',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'周瑜',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙十万',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3037':{
                id:'exam3037',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'谁被称为碧眼儿？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'陆逊',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'香香',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙策',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙十万',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3038':{
                id:'exam3038',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'三国杀中火攻对谁无效？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'刘备',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'π突骨',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'李儒',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'孙茹',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3039':{
                id:'exam3039',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'被称为“江东郡主”的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'孙茹',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'小乔',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'大乔',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'香香',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3040':{
                id:'exam3040',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'以下谁的箭术非常了得？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹洪',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'周泰',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张任',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'太史慈',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3041':{
                id:'exam3041',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'曹操之父为谁所杀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'董卓',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'袁绍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘表',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'陶谦',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3042':{
                id:'exam3042',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'官渡之战前，何人劝阻袁绍不可开战？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'沮授',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'文聘',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'卢植',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'田丰',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3043':{
                id:'exam3043',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'与华歆一起逼迫献帝让位的是？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'廖化',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'王允',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'简雍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'王朗',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3044':{
                id:'exam3044',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'请问诸葛亮派谁为副将和马谡守街亭？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'马岱',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张嶷',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'魏延',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'王平',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3045':{
                id:'exam3045',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'请问以下哪个人的标准皮肤色调为紫色？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'曹婴',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'大乔',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'刘备',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'王异',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3046':{
                id:'exam3046',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'请问下列哪位女人为司马昭的夫人？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'蔡文姬',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'邹氏',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'甘宁',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'王元姬',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3047':{
                id:'exam3047',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'曹操欲刺杀董卓问谁借的七星宝刀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'韩遂',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'陈琳',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'袁绍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'王允',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3048':{
                id:'exam3048',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'东汉著名文学家蔡邕被谁下令斩杀？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'袁绍',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'曹操',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'董卓',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'王允',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3049':{
                id:'exam3049',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'第四次擒住孟获的是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'吴懿',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'颜良文丑',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'孙坚',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'魏延',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
            'exam3050':{
                id:'exam3050',
                name:'军师的考验',
                type:'exam3',
                info:'一位军师想要和你讨论知识',
                text:'蜀国的汉中太守是谁？',
                rank:0,
                level:1,
                unique:false,
                change:false,
                priority:1,
                buttons:[
                    {
                        result:false,
                        name:'赵云',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'张飞',
                        effect:[],
                        random:1,
                    },
                    {
                        result:false,
                        name:'马超',
                        effect:[],
                        random:1,
                    },
                    {
                        result:true,
                        name:'魏延',
                        effect:[{name:'randomCard',number:1}],
                        random:1,
                    },
                ],
                ext:'txhj_junshidekaoyan',
            },
        },
        exam4:{
        'exam4001': {
        'id': "exam4001",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "张宝被刘备射中哪个部位？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '大脑',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "左肩",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '左腿',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '左臂',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
        'exam4002': {
        'id': "exam4002",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《三国演义》中，煮酒论英雄后，刘备以截击谁为借口逃离了许都？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '袁绍',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '马腾',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '刘表',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '袁术',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
         },
        'exam4003': {
        'id': "exam4003",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "谁诈降曹魏，以断发赢得曹休的信任而大破曹军的？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '陆逊',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '徐盛',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '朱桓',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '周鲂',
          'effect': [{
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
         },
        'exam4004': {
        'id': "exam4004",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "谁劝李郭二人以为董卓报仇之名，进兵京师？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '徐荣',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '韩遂',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '马腾',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '贾诩',
          'effect': [{
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': 'txhj_xianrenkaoyan'
         },   
        'exam4005': {
        'id': "exam4005",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "在华容道上，曹操用何书上的故事来打动关羽？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '《左传》',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '《孟德新书》',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '《战国策》',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '《春秋》',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': 'randomSkill',
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
      },
        'exam4006': {
        'id': "exam4006",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "请问凤雏庞统在投奔刘备之后，获得的第一份职位是？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '军师中郎将',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "桂阳县令",
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '襄阳县令',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '耒阳县令',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': 'randomSkill',
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
      },
        'exam4007': {
        'id': "exam4007",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "赵范倾国倾城的嫂嫂姓什么？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': "贾",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '邹',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '胡',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '樊',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
         },  
        'exam4008': {
        'id': "exam4008",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "司马炎称帝后，追谥司马懿为？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': "武皇帝",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '明皇帝',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '晋祖帝',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '宣皇帝',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': 'randomSkill',
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
      },
        'exam4009': {
        'id': "exam4009",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': '东汉的汉少帝是指？',
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '刘协',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '刘彻',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '刘宏',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '刘辩',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
      },
        'exam4010': {
        'id': "exam4010",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "下列哪个是被诸葛亮挥泪斩杀的人？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '刘备',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '蔡徐坤',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '姜维',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '马谡',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
         },   
        'exam4011': {
        'id': "exam4011",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': '《三国演义》中，被诸葛亮困于上方谷的司马家的人不包括谁？',
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '司马懿',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "司马昭",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '司马师',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '司马孚',
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
      },
        'exam4012': {
        'id': "exam4012",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "是谁向曹操报告孙策袭取许都之心，后被孙策所杀？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '徐工',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '王之',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '王英',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': "许贡",
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
      },
        'exam4013': {
        'id': "exam4013",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "黄巾军管亥在乱军中被谁所杀？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '太史慈',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '张飞',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '乱军砍死',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '关羽',
          'effect': [{
            'name': 'maxSkills',
            'number': 1
          }, {
            'name': 'randomSkill',
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
         }, 
        'exam4014': {
        'id': "exam4014",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "以下谁不是“江表之虎臣”？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '程普',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '周泰',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "韩当",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '吕蒙',
          'effect': [{
            'name': 'maxSkills',
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
      },
        'exam4015': {
        'id': "exam4015",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "黄巾起义后形成了不同的割据势力，其中匹配错误的是？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '荆州，刘表',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '幽州，公孙瓒',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '南阳，张绣',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '徐州，袁术',
          'effect': [{
            'name': 'maxSkills',
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': 'txhj_xianrenkaoyan'
         },
        'exam4016': {
        'id': "exam4016",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《三国演义》中，刘关张随朱儁攻打宛城的黄巾余党时，遇谁率众前来接应？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '曹操',
          'effect': [{
            'name': 'maxHp',
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "董卓",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '皇甫嵩',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': "孙坚",
          'effect': [{
            'name': "maxSkills",
            'number': 1
          }, {
            'name': "randomSkill",
            'number': 1
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"      
    },
        'exam4017': {
        'id': "exam4017",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': '黄巾起义的首领张角，是哪一年死的？',
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '公元185年',
          'effect': [],
          'random': 1
        }, {
          'result': false,
          'name': '公元183年',
          'effect': [],
          'random': 1
        }, {
          'result': false,
          'name': "公元182",
          'effect': [],
          'random': 1
        }, {
          'result': true,
          'name': '公元184',
          'effect': [{
            'name': "coin",
            'number': 300
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4018': {
        'id': "exam4018",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "朵思大王是如何死亡的？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '魏延斩于马下',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "赵云一枪毙命",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '摔下三江城',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '死于乱军',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4019': {
        'id': "exam4019",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮用何种颜色的油柜车击破了木鹿大王？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '黑色',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "白色",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '绿色',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '红色',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4020': {
        'id': "exam4020",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《七擒孟获》中孟获以几口毒泉阻止蜀军？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '三',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "五",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '二',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '四',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4021': {
        'id': "exam4021",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "南中有一地有三路水会和名为三江，以下不为其中之一的是？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '泸水',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "甘南水",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '西城水',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '东岭水',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4022': {
        'id': "exam4022",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮平定南蛮，班师回朝时正值几月？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '7',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "10",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '8',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '9',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4023': {
        'id': "exam4023",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《七擒孟获》中，谁与诸葛亮降孟获之心以平南中的计策相同？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '王平',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "马岱",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '马超',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '马谡',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4024': {
        'id': "exam4024",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮第七次擒住孟获的地点是？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '银冶洞',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "乌戈国",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '泸水',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '盘蛇谷',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4025': {
        'id': "exam4025",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "南征南中时，谁因诸葛亮不用而面露愠色？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '马岱',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "马谡",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '张翼',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '赵云',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4026': {
        'id': "exam4026",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "以下哪一位被诸葛亮认命为掾史？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '费祎',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "魏延",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '张翼',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '董厥',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4027': {
        'id': "exam4027",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "蜀军中毒泉之毒时，诸葛亮在谁的庙宇祈求庇佑？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '土地神',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "水神",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '伏波将军',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '山神',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4028': {
        'id': "exam4028",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "南征时诸葛亮发兵几万大军？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '二十万',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "三十万",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '四十万',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '五十万',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4029': {
        'id': "exam4029",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "赵云魏延至金环三结大寨时，大概在几更？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '二更',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "三更",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '五更',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '四更',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4030': {
        'id': "exam4030",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "马岱领军多少来送粮米？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '五千',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "一千",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '两千',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '三千',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4031': {
        'id': "exam4031",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获在家中排行第几？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '第一',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "第三",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '第四',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '第二',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4032': {
        'id': "exam4032",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "三江城失手后，谁主动请缨出手相助孟获？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '木鹿大王',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "带来洞主",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '乌戈国主',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '祝融夫人',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4033': {
        'id': "exam4033",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《七擒孟获》中，孟获被己方阵营擒住几次交给诸葛亮？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '一次',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "四次",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '三次',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '两次',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4034': {
        'id': "exam4034",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟节有一草，名薤叶芸香，诸葛亮在其家中何处采得？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '门后',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "园内",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '院中',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '庵前',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4035': {
        'id': "exam4035",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "蛮族中，谁第一次将孟获生擒，献于诸葛亮？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '阿会喃',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "金环三结",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '忙牙长',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '董荼那',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4036': {
        'id': "exam4036",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获第五次是被谁所擒？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '张翼',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "魏延",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '赵云',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '杨锋',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
                    'exam4037': {
        'id': "exam4037",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获第一次是被谁所擒？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '张翼',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "张嶷",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '赵云',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '魏延',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4038': {
        'id': "exam4038",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获命三洞元帅攻击蜀军，其中第三洞元帅是谁？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '带来洞主',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "金环三结",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '董荼那',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '阿会喃',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4039': {
        'id': "exam4039",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《三国演义》中，诸葛亮南征时介绍关索为关羽的第几子？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '二子',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "长子",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '四子',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '三子',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4040': {
        'id': "exam4040",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《七擒孟获》中，孟获以几口毒泉阻止蜀军？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '三',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "五",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '二',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '四',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
                  'exam4041': {
        'id': "exam4041",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获第三次被谁所擒？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '董荼那',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "张嶷",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '赵云',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '马岱',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          }, 
          'exam4042': {
        'id': "exam4042",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "三洞元帅中，张翼擒谁入账？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '金环三结',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "无功而返",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '董荼那',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '阿会喃',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4043': {
        'id': "exam4043",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获第六次如何被擒？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '赵云擒获',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "魏延擒获",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '张翼擒获',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '诈降被擒',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4044': {
        'id': "exam4044",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "木鹿大王有神兵几万？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '八万',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "六万",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '五万',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '三万',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4045': {
        'id': "exam4045",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "带来洞主与孟获有什么关系？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '孟获表弟',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "孟获之子",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '孟获舅舅',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '孟获舅子',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
                   'exam4046': {
        'id': "exam4046",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "金环三结元帅被谁所杀？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '魏延',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "王平",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '关索',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '赵云',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4047': {
        'id': "exam4047",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《三国演义》中，前往秃龙洞有几条路？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '一',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "三",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '四',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '二',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4048': {
        'id': "exam4048",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮攻打秃龙洞时，正值几月？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '三月',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "四月",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '五月',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '六月',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4049': {
        'id': "exam4049",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《七擒孟获》中，蜀中差谁来送解暑药和粮米？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '蒋琬',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "魏延",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '马超',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '马岱',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4050': {
        'id': "exam4050",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮南征时，谁被后主差来送酒帛？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '樊建',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "董厥",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '马岱',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '马谡',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          }, 
                  'exam4051': {
        'id': "exam4051",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "益州反叛中，鄂焕是谁的部将？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '雍闿',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "朱褒",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '孟获',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '高定',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
         'exam4052': {
        'id': "exam4052",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获被五纵后去往何处？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '乌戈国',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "带来洞",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '八纳洞',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '银坑洞',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          }, 
          'exam4053': {
        'id': "exam4053",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "兀突骨率两人领兵三万以迎蜀军，以下不是其中两人的为？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '不知道',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "土安",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '奚泥',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '安泥',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4054': {
        'id': "exam4054",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮朝奏平蛮时，谁出言劝止？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '蒋琬',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "费祎",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '李严',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '王连',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4055': {
        'id': "exam4055",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "帮诸葛亮解毒泉之毒的是谁？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '山神',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "伏波将军",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '孟忧',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '孟节',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
                  'exam4056': {
        'id': "exam4056",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮平蛮时，谁献给其《平蛮指掌图》？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '土人',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "王伉",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '高定',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '吕凯',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
        'exam4057': {
        'id': "exam4057",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "在盘蛇谷被烧死的蛮军将领是谁？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '朵思大王',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "带来洞主",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '木鹿大王',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '兀突骨',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
        'exam4058': {
        'id': "exam4058",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "《七擒孟获》中有四眼毒泉，其中水如冰，若饮咽喉无暖气的为？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '哑泉',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "黑泉",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '灭泉',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '柔泉',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
         'exam4059': {
        'id': "exam4059",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "马岱一合将谁斩于马下？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '董荼那',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "阿会喃",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '金环三结',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '忙牙长',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4060': {
        'id': "exam4060",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "南征时，诸葛亮命谁为副将？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '蒋琬',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "董厥",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '樊建',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '张翼',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4061': {
        'id': "exam4061",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获第一次被谁所擒？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '张翼',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "张嶷",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '赵云',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '魏延',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
                  'exam4062': {
        'id': "exam4062",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "南蛮平定后，孟获送诸葛亮何处方才返回？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '泸水',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "建宁",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '牂牁郡',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '永昌',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4063': {
        'id': "exam4063",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "前往朵思大王洞府途中烟瘴甚起，唯有三个时辰可以往来，以下不为这三个时辰的是？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '未时',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "申时",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '酉时',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '戌时',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4064': {
        'id': "exam4064",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "赵云魏延至金环三结大寨时，大概在几更？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '二更',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "三更",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '五更',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '四更',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4065': {
        'id': "exam4065",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获兄长之号为？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '安溪隐者',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "万溪隐者",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '静安隐者',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '万安隐者',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4066': {
        'id': "exam4066",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "南征时蛮族中谁人惊叹蜀汉为神兵？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '孟获',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "带来洞主",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '木鹿大王',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '朵思大王',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4067': {
        'id': "exam4067",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "银沿洞杨锋生有几子？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '3',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "8",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '6',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '5',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4068': {
        'id': "exam4068",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "益州平定后，诸葛亮命谁为益州太守？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '鄂焕',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "王伉",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '吕凯',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '高定',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
                  'exam4069': {
        'id': "exam4069",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "木鹿大王的坐骑为？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '白狼',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "巨象",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '白虎',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '白象',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4070': {
        'id': "exam4070",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "木鹿大王的洞府名为？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '银坑洞',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "梁都洞",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '水帘洞',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '八纳洞',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4071': {
        'id': "exam4071",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "木鹿大王施法时手中拿的是？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '铃铛',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "宝刀",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '铜哨',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '蒂钟',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
        'exam4072': {
        'id': "exam4072",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "蛮族在每月的什么时间于三江城买卖，转易货物？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '初七、十八',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "初五、十六",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '十五、三十',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '初一、十五',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },
          'exam4073': {
        'id': "exam4073",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "以下哪一个不是南中四毒泉之一？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '哑泉',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "柔泉",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '灭泉',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '烈泉',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          }, 
                   'exam4074': {
        'id': "exam4074",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮用祝融夫人赎回了谁？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '樊建',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "董厥",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '孟岱',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '马忠',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },  
         'exam4075': {
        'id': "exam4075",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "雍闿为谁所杀？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '魏延',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "王平",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '张翼',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '鄂焕',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },  
          'exam4076': {
        'id': "exam4076",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "孟获谴其弟诸葛亮前已几番被擒？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '3',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "4",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '1',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '2',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },  
          'exam4077': {
        'id': "exam4077",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "兀突骨大概有多高？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '3',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "1.8",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '2',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '2.5',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },    
          'exam4078': {
        'id': "exam4078",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮派谁夜渡泸水？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '魏延',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "赵云",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '王平',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '马岱',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },  
          'exam4079': {
        'id': "exam4079",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "杨锋为银冶洞的第几洞洞主？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '18',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "19",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '20',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '21',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },  
        'exam4080': {
        'id': "exam4080",
        'name': "仙人考验",
        'type': "exam4",
        'info': "忽然出现的仙人要考考你",
        'text': "诸葛亮平蛮时，命谁为导官？",
        'rank': 0,
        'level': 1,
        'unique': false,
        'change': false,
        'priority': 1,
        'buttons': [{
          'result': false,
          'name': '高定',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': "鄂焕",
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': false,
          'name': '王伉',
          'effect': [{
            'name': "maxHp",
            'number': -1
          }],
          'random': 1
        }, {
          'result': true,
          'name': '吕凯',
          'effect': [{
            'name': "coin",
            'number': 220
          }],
          'random': 1
        }],
        'ext': "txhj_xianrenkaoyan"
          },   
       },
    };
    //鸡你太美//
    game.changePack = {
        'txhj_sibingheishi':{
            id:'txhj_sibingheishi',
            name:'私兵黑市',
            type:'store',
            info:'此处是募集私兵和购置兵器的黑市',
            text:'',
            level:1,
            chapter:1,
            target:'all',
            unique:false,
            change:true,
            priority:1,
            min:0,
            max:1,
            exp:0,
            premise:'',
            enemy:[],
            friend:[],
            effect:[],
            spoils:[],
            ext:'txhj_sibingheishi',
        },
        'txhj_anxianghonglou':{
            id:'txhj_anxianghonglou',
            name:'暗巷红楼',
            type:'store',
            info:'暗巷中的红楼，是神秘人的交易之地',
            text:'',
            level:2,
            chapter:1,
            target:'all',
            unique:false,
            change:true,
            priority:1,
            min:0,
            max:1,
            exp:0,
            premise:'',
            enemy:[],
            friend:[],
            effect:[],
            spoils:[],
            ext:'txhj_anxianghonglou',
        },
        'txhj_xiaojishi':{
            id:'txhj_xiaojishi',
            name:'小集市',
            type:'store',
            info:'前方是一个人潮涌动的小集市',
            text:'',
            level:3,
            chapter:1,
            target:'all',
            unique:false,
            change:true,
            priority:1,
            min:0,
            max:1,
            exp:0,
            premise:'',
            enemy:[],
            friend:[],
            effect:[],
            spoils:[],
            ext:'txhj_jishi',
        },
        'txhj_dajishi':{
            id:'txhj_dajishi',
            name:'大集市',
            type:'store',
            info:'前方是一个无比喧闹的大集市',
            text:'',
            level:4,
            chapter:1,
            target:'all',
            unique:false,
            change:true,
            priority:1,
            min:0,
            max:1,
            exp:0,
            premise:'',
            enemy:[],
            friend:[],
            effect:[],
            spoils:[],
            buttons:[],
            ext:'txhj_jishi',
        },
        'txhj_huanjingjishi':{
            id:'txhj_huanjingjishi',
            name:'幻境集市',
            type:'store',
            info:'前方是一个人潮涌动的集市',
            text:'',
            level:5,
            chapter:1,
            target:'all',
            unique:false,
            change:true,
            priority:1,
            min:0,
            max:1,
            exp:0,
            premise:'',
            enemy:[],
            friend:[],
            effect:[],
            spoils:[],
            ext:'txhj_huanjingjishi',
        },
        'txhj_puyuanchuanren':{
            id:'txhj_puyuanchuanren',
            name:'蒲元传人',
            type:'gain',
            info:'一个刺客的幻象正在前方...',
            text:'他可教你杀人术法，你因此可以获得一张对应类型的牌',
            rank:0,
            level:1,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'获得武器',
                effect:[{name:'equip1',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得防具',
                effect:[{name:'equip2',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得宝物',
                effect:[{name:'equip5',number:1}],
                random:1,
            },
            ],
            ext:'txhj_puyuanchuanren',
        },
        'txhj_fujiazhili':{
            id:'txhj_fujiazhili',
            name:'富贾之礼',
            type:'gain',
            info:'你看到一处豪宅，貌似糜竺之人面带微笑站在门外...',
            text:'原来此为财富幻象，他为助你前进，交给你一些金币',
            rank:0,
            level:1,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'获得金币了！',
                effect:[{name:'coin',number:600}],
                random:1,
            },
            ],
            ext:'txhj_fujiazhili',
        },
        'txhj_jiangxuntianming':{
            id:'txhj_jiangxuntianming',
            name:'将循天命',
            type:'gain',
            info:'天边耀眼的光芒，是无数的将星',
            text:'你靠近将星，发现竟然可以信手摘取想要的一颗',
            rank:0,
            level:1,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'以乾为道，获得一个武将精华祝福',
                effect:[{name:'randomBuff',number:1}],
                random:1,
            },
            {
                result:true,
                name:'以坤为道，获得一个武将技能',
                effect:[{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_jiangxuntianming',
        },
        'txhj_guyuanxianguo':{
            id:'txhj_guyuanxianguo',
            name:'固元鲜果',
            type:'gain',
            info:'一个和蔼的婆婆正在采摘鲜果...',
            text:'婆婆看你疲乏，笑着让你随意选择',
            rank:0,
            level:1,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'舒展经络，初始手牌数+1',
                effect:[{name:'minHs',number:1}],
                random:1,
            },
            {
                result:true,
                name:'肉身成长，体力及体力上限提升',
                effect:[{name:'maxHp',number:1}],
                random:1,
            },
            ],
            ext:'txhj_guyuanxianguo',
        },
        'txhj_yiqiweiren':{
            id:'txhj_yiqiweiren',
            name:'以气为刃',
            type:'gain',
            info:'此地灵气可以塑形，你可用于己身',
            text:'你将一缕灵气转化为了一张牌',
            rank:0,
            level:1,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'得到了一张牌库牌',
                effect:[{name:'randomCard',number:1}],
                random:1,
            },
            ],
            ext:'txhj_yiqiweiren',
        },
        'txhj_hezhongshafa':{
            id:'txhj_hezhongshafa',
            name:'何种杀法？',
            type:'gain',
            info:'一个刺客的幻象正在前方...',
            text:'他可教你杀人术法，你因此可以获得一张对应类型的牌',
            rank:0,
            level:1,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'获得基本牌',
                effect:[{name:'basic',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得锦囊牌',
                effect:[{name:'trick',number:1}],
                random:1,
            },
            ],
            ext:'txhj_hezhongshafa',
        },
        'txhj_gongfangzhize':{
            id:'txhj_gongfangzhize',
            name:'攻防之择',
            type:'gain',
            info:'选择一种技能获取吧',
            text:'你更喜欢进攻还是防御呢',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'获得攻击技能',
                effect:[{name:'attack',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得防御技能',
                effect:[{name:'defense',number:1}],
                random:1,
            },
            ],
            ext:'txhj_gongfangzhize',
        },
        'txhj_diwozhize':{
            id:'txhj_diwozhize',
            name:'敌我之择',
            type:'gain',
            info:'选择一种技能获取吧',
            text:'你更喜欢干扰敌人呢，还是自己成长呢',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'获得辅助技能',
                effect:[{name:'assist',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得爆发技能',
                effect:[{name:'burst',number:1}],
                random:1,
            },
            ],
            ext:'txhj_diwozhize',
        },
        'txhj_qihaikuolan':{
            id:'txhj_qihaikuolan',
            name:'气海扩澜',
            type:'gain',
            info:'在幻境中呆了许久，你感觉身体有些微妙的变化',
            text:'原来是气海变得更为幽深，可以保留更多内力',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'手牌上限提升了（+2）',
                effect:[{name:'maxHs',number:2}],
                random:1,
            },
            {
                result:true,
                name:'得到了一张牌库牌',
                effect:[{name:'randomCard',number:1}],
                random:1,
            },
            ],
            ext:'txhj_qihaikuolan',
        },
        'txhj_cuitilianhun':{
            id:'txhj_cuitilianhun',
            name:'淬体炼魂',
            type:'gain',
            info:'你可以磨练自己，以变得更强',
            text:'选择肉身的成长，抑或灵魂的洗练吧',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'肉体成长，体力及体力上限+1',
                effect:[{name:'maxHp',number:1}],
                random:1,
            },
            {
                result:true,
                name:'灵魂洗炼，技能槽+1',
                effect:[{name:'maxSkills',number:1}],
                random:1,
            },
            ],
            ext:'txhj_cuitilianhun',
        },
        'txhj_cuitijindan':{
            id:'txhj_cuitijindan',
            name:'淬体金丹',
            type:'gain',
            info:'葛玄虽然不在此地，但他为进入幻境的人留下了礼物',
            text:'此为葛玄炼制金丹，可以令肉身成长',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'体力及体力上限+1',
                effect:[{name:'maxHp',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得金币了',
                effect:[{name:'coin',number:300}],
                random:1,
            },
            ],
            ext:'txhj_cuitijindan',
        },
        'txhj_tiandijinghua':{
            id:'txhj_tiandijinghua',
            name:'天地精华',
            type:'gain',
            info:'此地灵气丰裕，你或可有所得',
            text:'经过修炼，你果真获得了祝福',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'得到祝福了！',
                effect:[{name:'randomBuff',number:1}],
                random:1,
            },
            ],
            ext:'txhj_tiandijinghua',
        },
        'txhj_huanjingzhibao':{
            id:'txhj_huanjingzhibao',
            name:'幻境之宝',
            type:'gain',
            info:'幻境为左慈取得仙法之地，你能在这里找到什么呢',
            text:'遍寻此地，你找到了一个武将的化身',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'得到技能了！',
                effect:[{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_huanjingzhibao',
        },
        'txhj_zuocizhizhuan':{
            id:'txhj_zuocizhizhuan',
            name:'左慈之传',
            type:'gain',
            info:'你看到左慈于此修炼时留下的残像',
            text:'残像竟然有化身之能，你得到一名英杰的助力',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'获得武将传承，得到了新的技能',
                effect:[{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_zuocizhizhuan',
        },
        'txhj_linghunzhichi':{
            id:'txhj_linghunzhichi',
            name:'灵魂之池',
            type:'gain',
            info:'这片幽潭之内，全都是灵魂的精华',
            text:'你沐浴灵魂池中，对英灵的理解加深了',
            rank:0,
            level:3,
            unique:false,
            change:true,
            priority:1,
            buttons:[
            {
                result:true,
                name:'灵魂洗炼，技能槽+1',
                effect:[{name:'maxSkills',number:1}],
                random:1,
            },
            {
                result:true,
                name:'获得武将传承，得到了新的技能+1',
                effect:[{name:'randomSkill',number:1}],
                random:1,
            },
            ],
            ext:'txhj_linghunzhichi',
        },
        'txhj_tianmingjiashen':{
                    id:'txhj_tianmingjiashen',
                    name:'天命加身',
                    type:'gain',
                    info:'将星无数，化作星河',
                    text:'你于星河中荡漾，得到了武将的祝福',
                    rank:0,
                    level:3,
                    unique:false,
                    change:true,
                    priority:1,
                    buttons:[
                        {
                            result:true,
                            name:'获得武将精华祝福与技能各一个',
                            effect:[{name:'randomBuff',number:1},{name:'randomSkill',number:1}],
                            random:1,
                        },
                    ],
                    ext:'txhj_tiandijinghua',
                },
                'txhj_wannianxianguo':{
                    id:'txhj_wannianxianguo',
                    name:'万年仙果',
                    type:'gain',
                    info:'仙果婆婆采摘到了万年方成熟的仙果',
                    text:'这次可以选择仙果更加丰硕肥美',
                    rank:0,
                    level:1,
                    unique:false,
                    change:true,
                    priority:1,
                    buttons:[
                        {
                            result:true,
                            name:'经络扩充，兼以肉身成长',
                            effect:[{name:'minHs',number:3},{name:'maxHp',number:1},{name:'hp',number:1}],
                            random:1,
                        },
                        {
                            result:true,
                            name:'肉身筑基，经络稍有舒展',
                            effect:[{name:'minHs',number:1},{name:'maxHp',number:2},{name:'hp',number:2}],
                            random:1,
                        },
                    ],
                    ext:'txhj_guyuanxianguo',
                },
                'txhj_tianjiangshenbing':{
                    id:'txhj_tianjiangshenbing',
                    name:'天匠神兵',
                    type:'gain',
                    info:'天空中降下神女，手中閃耀夺目之光',
                    text:'她应葛玄之邀翩然而至，只为给你一件神器',
                    rank:0,
                    level:1,
                    unique:false,
                    change:true,
                    priority:1,
                    buttons:[
                        {
                            result:true,
                            name:'获得随机神器',
                            effect:[{name:'randomUnique',number:1}],
                            random:1,
                        },
                    ],
                    ext:'txhj_tianjiangshenbing',
                },
                'txhj_fujiahaoli':{
                    id:'txhj_fujiahaoli',
                    name:'富贾豪礼',
                    type:'gain',
                    info:'依旧是为了助你前进，但他给出了更多的钱...',
                    text:'获得好多金币！',
                    rank:0,
                    level:1,
                    unique:false,
                    change:true,
                    priority:1,
                    buttons:[
                        {
                            result:true,
                            name:'获得金币了！',
                            effect:[{name:'coin',number:1000}],
                            random:1,
                        },
                    ],
                    ext:'txhj_fujiazhili',
                },
    };
    return {};
});