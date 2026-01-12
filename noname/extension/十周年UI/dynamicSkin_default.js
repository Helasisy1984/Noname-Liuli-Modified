'use strict';
decadeModule.import(function (lib, game, ui, get, ai, _status) {
/*
	十周年UI动皮使用说明：
	- 首先打开动态皮肤的开关，直接替换原有武将皮肤显示；
	- 目前不支持动态皮肤的切换功能；
	- 动态皮肤参数表在线文档链接：https://docs.qq.com/sheet/DS2Vaa0ZGWkdMdnZa；可以在群在线文档提供你设置好的参数
	- 所有相关的文件请放到	十周年UI/assets/dynamic目录下；
	- 关于格式请参考下面示例：
		武将名:{
			皮肤名:{
				name: "xxx",	//	必★填	骨骼名称，一般是yyy.skel，注意xxx不带后缀名.skel；
				action: "xxx",	//	可删掉	播放动作，xxx 一般是 DaiJi，目前手杀的骨骼文件需要填；
				x: [10, 0.5],	//	可删掉	[10, 0.5]相当于 left: calc(10px + 50%)，不填默认为[0, 0.5]；
				y: [10, 0.5],	//	可删掉	[10, 0.5]相当于 bottom: calc(10px + 50%)，不填默认为[0, 0.5]；
				scale: 0.5,		//	可删掉	缩放大小，不填默认为1；
				angle: 0,		//	可删掉	旋转角度，不填默认为0；
				speed: 1,		//	可删掉	播放速度，不填默认为1；
				hideSlots: ['隐藏的部件'],	// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
				clipSlots: ['裁剪的部件'],	// 剪掉超出头的部件，仅针对露头动皮，其他勿用
				background: "xxx.jpg",	//	可删掉	背景图片，注意后面要写后缀名，如.jpg .png等 
			}
		},
	- 为了方便得到动皮的显示位置信息，请在游戏选将后，用控制台或调试助手小齿轮执行以下代码(没用到的属性请删掉以免报错):
		game.me.stopDynamic();
		game.me.playDynamic({
			name: 'xxxxxxxxx',		// 勿删
			action: undefined,
			speed: 1,
			loop: true,				// 勿删
			x: [0, 0.5],
			y: [0, 0.5],
			scale: 0.5,
			angle: 0,
			hideSlots: ['隐藏的部件'],	// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
			clipSlots: ['裁剪的部件'],	// 剪掉超出头的部件，仅针对露头动皮，其他勿用
		});
		// 这里可以改成  }, true);  设置右将动皮
		
//shift+alt+F 一键对齐括号
//ctrl+K+[ 一键括号归并
	*/
	decadeUI.dynamicSkin = {
		baosanniang: {//鲍三娘
            虎年七夕:{
				name: '鲍三娘/虎年七夕/XingXiang',
				x: [0,0.46],
				y: [0,0.36],
				scale: 0.42,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '鲍三娘/虎年七夕/BeiJing',
					scale: 0.3,
					x: [0, 0.69],
					y: [0, 0.5]
				},
			},
		},
		beimihu: {//卑弥呼
			呼风唤雨:{
				name: '卑弥呼/呼风唤雨/XingXiang',
				x: [0,1],
				y: [0,-0.03],
				scale: 0.6,
				angle: -20,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '卑弥呼/呼风唤雨/BeiJing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
					angle: -20,
				},
			},
			缘法耀世: {
				name: '卑弥呼/缘法耀世/daiji2',
				x: [0, 0.4],
				y: [0, 0.44],
				scale: 0.84,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '卑弥呼/缘法耀世/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '卑弥呼/缘法耀世/chuchang',
					scale: 0.95,
					action: 'play',
				},
				beijing: {
					name: '卑弥呼/缘法耀世/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},
        bianfuren: {//卞夫人
			玉露清辉:{
				name: '卞夫人/玉露清辉/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,0.43],
				y: [0,0.43],
				scale: 1.1,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '卞夫人/玉露清辉/jineng01',
					version:"4.0",
				    json: true,
					scale: 0.78,
					action: 'play',
				},
				gongji: {
					name: '卞夫人/玉露清辉/jineng01',
					version:"4.0",
				    json: true,
					scale: 0.82,
					action: 'play',
				},
				beijing: {
					name: '卞夫人/玉露清辉/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },
		bulianshi: {//步练师	
			鸾凤和鸣: {
				name: '步练师/鸾凤和鸣/daiji2',
				x: [0, 0.43],
				y: [0, 0.5],
				scale: 0.88,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '步练师/鸾凤和鸣/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '步练师/鸾凤和鸣/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '步练师/鸾凤和鸣/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},
		buzhi: {//步骘
            鸿笔丽藻:{
				name: '步骘/鸿笔丽藻/XingXiang',
				x: [0,0.11],
				y: [0,0.31],
				scale: 0.37,
				angle: 8,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '步骘/鸿笔丽藻/BeiJing',
					scale: 0.3,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},	
        },
		caifuren: {//蔡夫人
            名门妖媛: {
				name: '蔡夫人/名门妖媛/daiji2',
				x: [0, 0.52],
				y: [0, 0.55],
				scale: 0.85,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '蔡夫人/名门妖媛/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},	
		caiwenji: {//蔡文姬	
            才颜双绝: {
				name: '蔡文姬/才颜双绝/daiji2',
				x: [0, 0.35],
				y: [0, 0.55],
				scale: 0.82,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '蔡文姬/才颜双绝/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '蔡文姬/才颜双绝/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '蔡文姬/才颜双绝/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},	
			花好月圆: {
				name: '蔡文姬/花好月圆/daiji2',
				x: [0, 0.4],
				y: [0, 0.5],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '蔡文姬/花好月圆/chuchang',
					scale: 0.75,
					action: 'play',
				},
				gongji: {
					name: '蔡文姬/花好月圆/chuchang',
					scale: 0.85,
					action: 'play',
				},
				beijing: {
					name: '蔡文姬/花好月圆/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '蔡文姬/花好月圆/JiSha',
						x: [0, 0.54],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
		caoang: {//曹昂
            竭战鳞伤:{
				name: '曹昂/竭战鳞伤/XingXiang',
				x: [0,-0.19],
				y: [0,0.36],
				scale: 0.38,
				angle: 5,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '曹昂/竭战鳞伤/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
			醉玉颓山: {
				name: '曹昂/醉玉颓山/daiji2',
				x: [0, 0.32],
				y: [0, 0.48],
				scale: 0.85,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹昂/醉玉颓山/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '曹昂/醉玉颓山/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '曹昂/醉玉颓山/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
		caocao: {//曹操
		    逐鹿天下:{
				name: '曹操/逐鹿天下/XingXiang',
				x: [0,0.5],
				y: [0,0],
				scale: 0.55,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '曹操/逐鹿天下/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			英杰会聚: {
				name: '曹操/英杰会聚/daiji2',
				x: [0, 0.44],
				y: [0, 0.44],
				scale: 0.82,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹操/英杰会聚/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '曹操/英杰会聚/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '曹操/英杰会聚/beijing',
					x: [0, 0.18],
					y: [0, 0.34],
					scale: 0.4,
				},
			},
		},
        caochong: {//曹冲
			资优神童: {
				name: '曹冲/资优神童/daiji2',
				x: [0, 0.3],
				y: [0, 0.53],
				scale: 0.9,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹冲/资优神童/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '曹冲/资优神童/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '曹冲/资优神童/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
		caochun: {//曹纯
			虎啸龙渊: {
				name: '曹纯/虎啸龙渊/daiji2',
				shan: 'play3',
				x: [0, 0.5],
				y: [0, 0.45],
				scale: 1.14,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹纯/虎啸龙渊/chuchang',
					action: 'play',
					scale: 0.7,
				},
				gongji: {
					name: '曹纯/虎啸龙渊/chuchang2',
					action: ['gongji', 'jineng'],
					scale: 0.7,
				},
				teshu: {//没法触发
					name: '曹纯/虎啸龙渊/chuchang2',
					action: 'jineng',
					scale: 0.7,
				},
				audio: {
					skill: '曹纯/虎啸龙渊/audio',
				},
				beijing: {
					name: '曹纯/虎啸龙渊/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '曹纯/虎啸龙渊/shouji2',
					scale: 0.7,
					speed: 0.8,
					delay: 0.3,
					effect: {
						name: '曹纯/虎啸龙渊/shouji',
						scale: 0.65,
						speed: 0.6,
						delay: 0.4,
					},
				},
				special: {
					变身: {
						hp: 2,
						name: 'caochun/虎啸龙渊2',
					},
					condition: {
						lowhp: {
							transform: ['变身'],
							recover: true,
						},
					},
				},
			},
			虎啸龙渊2: {
				name: '曹纯/虎啸龙渊2/daiji2',
				shan: 'play3',
				x: [0, 0.5],
				y: [0, 0.35],
				scale: 1.14,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹纯/虎啸龙渊2/chuchang',
					action: 'play',
					scale: 0.7,
				},
				gongji: {
					name: '曹纯/虎啸龙渊2/chuchang2',
					action: ['gongji', 'jineng'],
					scale: 0.7,
				},
				teshu: {//没法触发
					name: '曹纯/虎啸龙渊2/chuchang2',
					action: 'jineng',
					scale: 0.7,
				},
				audio: {
					skill: '曹纯/虎啸龙渊2/audio',
				},
				beijing: {
					name: '曹纯/虎啸龙渊2/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '曹纯/虎啸龙渊2/shouji2',
					scale: 0.6,
					speed: 0.6,
					delay: 0.3,
					effect: {
						name: '曹纯/虎啸龙渊2/shouji',
						scale: 0.6,
						speed: 0.8,
						delay: 0.4,
					},
				},
			},
		},
        caohua: {//曹华
			彩蝶恋花: {
				name: '曹华/彩蝶恋花/daiji2',
				shan: 'play3',
				x: [0, 0.52],
				y: [0, 0.41],
				scale: 1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹华/彩蝶恋花/chuchang',
					action: 'play',
					scale: 0.75,
				},
				gongji: {
					name: '曹华/彩蝶恋花/chuchang2',
					action: 'gongji',
					scale: 0.6,
				},
				teshu: {
					name: '曹华/彩蝶恋花/chuchang2',
					action: 'jineng',
					scale: 0.6,
				},
				beijing: {
					name: '曹华/彩蝶恋花/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '曹华/彩蝶恋花/shouji2',
					scale: 0.5,
					speed: 0.6,
					delay: 0.1,
					effect: {
						name: '曹华/彩蝶恋花/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.3,
					},
				},
			},
        },
		caojie: {//曹节
			猪年大雪:{
				name: '曹节/猪年大雪/XingXiang',
				x: [0,0.91],
				y: [0,0.05],
				scale: 0.6,
				angle: 10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '曹节/猪年大雪/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        caojinyu: {//曹金玉
			惊鸿倩影: {
				name: '曹金玉/惊鸿倩影/daiji2',
				x: [0, 0.21],
				y: [0, 0.45],
				scale: 0.92,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹金玉/惊鸿倩影/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '曹金玉/惊鸿倩影/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '曹金玉/惊鸿倩影/beijing',
					x: [0, 0.1],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
			瑞雪纷华: {
				name: '曹金玉/瑞雪纷华/daiji2',
				x: [0, 0.4],
				y: [0, 0.43],
				scale: 1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹金玉/瑞雪纷华/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '曹金玉/瑞雪纷华/chuchang',
					scale: 0.85,
					action: 'play',
				},
				beijing: {
					name: '曹金玉/瑞雪纷华/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
		caopi: {//曹丕			
			猪年端午:{
				name: '曹丕/猪年端午/XingXiang',
				x: [0,0.3],
				y: [0,0.25],
				scale: 0.6,
				angle: -5,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '曹丕/猪年端午/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			魏王称帝: {
				name: '曹丕/魏王称帝/daiji2',
				x: [0, 0.37],
				y: [0, 0.5],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹丕/魏王称帝/chuchang',
					scale: 0.95,
					action: 'play',
				},
				gongji: {
					name: '曹丕/魏王称帝/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '曹丕/魏王称帝/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        caoren: {//曹仁
            坚石铁壁: {
				name: '曹仁/坚石铁壁/daiji2',
				x: [0, 0.38],
				y: [0, 0.55],
				scale: 0.72,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹仁/坚石铁壁/chuchang',
					scale: 1.05,
					action: 'play',
				},
				gongji: {
					name: '曹仁/坚石铁壁/chuchang',
					scale: 1.3,
					action: 'play',
				},
				beijing: {
					name: '曹仁/坚石铁壁/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
        caorui: {//曹叡
            睥睨天下:{
				name: '曹叡/睥睨天下/XingXiang',
				x: [0,1.3],
				y: [0,0],
				scale: 0.7,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '曹叡/睥睨天下/BeiJing',
					scale: 0.3,
					x: [0, -0.8],
					y: [0, 0.5]
				},
			},
			月夜情满: {
				name: '曹叡/月夜情满/daiji2',
				x: [0, 0.35],
				y: [0, 0.5],
				scale: 0.82,
				angle: -5,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '曹叡/月夜情满/chuchang',
					scale: 0.65,
					action: 'play',
				},
				gongji: {
					name: '曹叡/月夜情满/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '曹叡/月夜情满/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},
        caoshuang: {//曹爽
			受诏专权:{
				name: '曹爽/受诏专权/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,0.67],
				y: [0,0.29],
				scale: 0.91,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '曹爽/受诏专权/jineng01',
					version:"4.0",
				    json: true,
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '曹爽/受诏专权/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '曹爽/受诏专权/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				zhishixian: {
					name: '曹爽/受诏专权/jineng02',
					version:"4.0",
				    json: true,
					scale: 0.6,
					speed: 0.6,
					delay: 0.4,
				},
			},
        },
        caoxiancaohua: {//曹宪曹华
			娇媚芙蓉:{
				name: '曹宪曹华/娇媚芙蓉/xingxiang',
				version:"4.0",
				//json: true,
				x: [0,1.25],
				y: [0,0.31],
				scale: 0.7,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '曹宪曹华/娇媚芙蓉/beijing',
					version:"4.0",
					json: true,
					scale: 0.5,
					x: [0, 0.3],
					y: [0, 0.5]
				},
			},
        },
        caoying: {//曹婴
	    	兔年春节:{
		    	name: '曹婴/兔年春节/XingXiang',
				x: [0,0.61],
				y: [0,0.19],
				scale: 0.55,
				angle: -15,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '曹婴/兔年春节/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
			水清濯缨:{
				name: '曹婴/水清濯缨/XingXiang',
				x: [0,0.2],
				y: [0,0.35],
				scale: 0.35,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '曹婴/水清濯缨/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},
		caozhen: {//曹真
			虎年春节:{
				name: '曹真/虎年春节/XingXiang',
				x: [0,0.36],
				y: [0,-0.05],
				scale: 0.6,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '曹真/虎年春节/BeiJing',
					scale: 0.3,
					x: [0, 0.3],
					y: [0, 0.5]
				},
			},
		},	
		caozhi: {//曹植
			七步绝章: {
				name: '曹植/七步绝章/daiji2',
				x: [0, 0.3],
				y: [0, 0.51],
				scale: 1,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '曹植/七步绝章/beijing',
					x: [0, -0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},	
		chengyu: {//程昱
			泰山捧日:{
				name: '程昱/泰山捧日/XingXiang',
				x: [0,0.6],
				y: [0,0.05],
				scale: 0.6,
				angle: -10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '程昱/泰山捧日/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        chenlin: {//陈琳
			重阳闲趣: {
				name: '陈琳/重阳闲趣/daiji2',
				x: [0, 0.44],
				y: [0, 0.45],
				scale: 0.88,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '陈琳/重阳闲趣/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '陈琳/重阳闲趣/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '陈琳/重阳闲趣/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },	
        daqiao: {//大乔
			绝世之姿:{
				name: '大乔/绝世之姿/XingXiang',
				x: [0,0.44],
				y: [0,0.23],
				scale: 0.5,
				angle: 12,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '大乔/绝世之姿/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			花好月圆: {//出场错误
				name: '大乔/花好月圆/daiji2',
				x: [0, 0.5],
				y: [0, 0.5],
				scale: 0.8,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '大乔/花好月圆/ChuChang',
					version:"4.0",
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '大乔/花好月圆/ChuChang',
					version:"4.0",
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '大乔/花好月圆/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '大乔/花好月圆/JiSha',
						x: [0, 0.54],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
		daxiaoqiao: {//大小乔
			战场绝版: {
				name: '大小乔/战场绝版/daiji2',
				x: [0, 0.42],
				y: [0, 0.53],
				scale: 0.7,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '大小乔/战场绝版/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '大小乔/战场绝版/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '大小乔/战场绝版/beijing',
					x: [0, 0.29],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },	
		dengai: {//邓艾
			神兵天降:{
				name: '邓艾/神兵天降/XingXiang',
				x: [0,0.71],
				y: [0,0.27],
				scale: 0.62,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '邓艾/神兵天降/BeiJing',
					scale: 0.3,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},	
		},	
		diaochan: {//貂蝉
			驭魂千机:{
				name: '貂蝉/驭魂千机/XingXiang',
				x: [0,0.54],
				y: [0,0.23],
				scale: 0.6,
				angle: 15,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '貂蝉/驭魂千机/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			舞惑群心:{
				name: '貂蝉/舞惑群心/XingXiang',
				alpha: true,
				x: [0,-0.78],
				y: [0,0.35],
				scale: 0.5,
				angle: -10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '貂蝉/舞惑群心/BeiJing',
					scale: 0.3,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
			花好月圆: {
				name: '貂蝉/花好月圆/daiji2',
				x: [0, 0.64],
				y: [0, 0.53],
				scale: 0.94,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '貂蝉/花好月圆/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '貂蝉/花好月圆/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '貂蝉/花好月圆/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '貂蝉/花好月圆/JiSha',
						x: [0, 0.52],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 1.7,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
			文和乱武: {
				name: '貂蝉/文和乱武/daiji2',
				x: [0, 0.4],
				y: [0, 0.57],
				scale: 0.8,
				angle: -20,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '貂蝉/文和乱武/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '貂蝉/文和乱武/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '貂蝉/文和乱武/beijing',
					x: [0, 1.11],
					y: [0, 0.5],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '貂蝉/文和乱武/JiSha',
						x: [0, 0.48],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},		
		dongbai: {//董白
			猪年春节:{
				name: '董白/猪年春节/XingXiang',
				x: [0,0.67],
				y: [0,0.47],
				scale: 0.48,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '董白/猪年春节/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        dongguiren: {//董贵人
			春殿踏水: {
				name: '董贵人/春殿踏水/daiji2',
				x: [0, 0.4],
				y: [0, 0.28],
				scale: 1.3,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '董贵人/春殿踏水/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '董贵人/春殿踏水/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '董贵人/春殿踏水/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},
        dongzhuo: {//董卓
			文和乱武: {
				name: '董卓/文和乱武/daiji2',
				x: [0, 0.46],
				y: [0, 0.42],
				scale: 1,
				angle: 5,
                //speed: 1,
				beijing: {
					name: '董卓/文和乱武/beijing',
					x: [0, 0.2],
					y: [0, 0.32],
					scale: 0.4,
				},
			},
        },
        dufuren: {//杜夫人
			瑞雪纷华: {
				name: '杜夫人/瑞雪纷华/daiji2',
				x: [0, 0.52],
				y: [0, 0.35],
				scale: 1,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '杜夫人/瑞雪纷华/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '杜夫人/瑞雪纷华/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '杜夫人/瑞雪纷华/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        duyu: {//杜预
			威兵袭吴:{
				name: '杜预/威兵袭吴/xingxiang',
				version:"4.0",
				json: true,
				x: [0,0.53],
				y: [0,0.26],
				scale: 1,
				angle: -5,
                //speed: 1,
				beijing: {
					name: '杜预/威兵袭吴/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },
		xin_fazheng: {//法正
			恩怨如火: {
				name: '法正/恩怨如火/daiji2',
				x: [0, 0.39],
				y: [0, 0.46],
				scale: 0.85,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '法正/恩怨如火/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '法正/恩怨如火/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '法正/恩怨如火/beijing',
					x: [0, 0.45],
					y: [0, 0.18],
					scale: 0.4,
				},
			},
		},
        fanchou: {//樊稠
			文和乱武: {
				name: '樊稠/文和乱武/daiji2',
				x: [0, 0.43],
				y: [0, 0.38],
				scale: 1.1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '樊稠/文和乱武/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '樊稠/文和乱武/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '樊稠/文和乱武/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
        fengfangnv: {//冯妤
			丹唇点绛:{
				name: '冯妤/丹唇点绛/xingxiang',
				version:"4.0",
				x: [0,0.35],
				y: [0,0.4],
				scale: 0.9,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '冯妤/丹唇点绛/jineng01',
					version:"4.0",
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '冯妤/丹唇点绛/jineng01',
					version:"4.0",
					scale: 0.9,
					action: 'play',
				},
				zhishixian: {
					name: '冯妤/丹唇点绛/jineng02',
					version:"4.0",
					scale: 0.5,
					speed: 0.5,
					delay: 0.4,
				},
				beijing: {
					name: '冯妤/丹唇点绛/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
		},	
	    fuhuanghou: {//伏皇后
			万福千灯: {
				name: '伏皇后/万福千灯/daiji2',
				x: [0, 0.47],
				y: [0, 0.55],
				scale: 0.8,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '伏皇后/万福千灯/beijing',
					x: [0, -0.1],
					y: [0, 0.46],
					scale: 0.3,
				},
			},	
		},
		ganfuren: {//甘夫人
			为君担忧:{
				name: '甘夫人/为君担忧/XingXiang',
				x: [0,0.25],
				y: [0,0.42],
				scale: 0.44,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '甘夫人/为君担忧/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
		},
        ganning: {//甘宁
			武动乾坤: {
				name: '甘宁/武动乾坤/daiji2',
				x: [0, 0.45],
				y: [0, 0.6],
				scale: 0.65,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '甘宁/武动乾坤/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '甘宁/武动乾坤/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '甘宁/武动乾坤/beijing',
					x: [0, 0],
					y: [0, 0.5],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '甘宁/武动乾坤/JiSha',
						x: [0, 0.44],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
		gongsunyuan: {//公孙渊
			逐鹿天下: {
				name: '公孙渊/逐鹿天下/daiji2',
				x: [0, 0.44],
				y: [0, 0.52],
				scale: 0.85,
				angle: 0,
                //speed: 1,               
				beijing: {
					name: '公孙渊/逐鹿天下/beijing',
					x: [0, 0.9],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
        guansuo: {//关索
        虎年七夕:{
				name: '关索/虎年七夕/XingXiang',
				x: [0,0.73],
				y: [0,0.41],
				scale: 0.42,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '关索/虎年七夕/BeiJing',
					scale: 0.3,
					x: [0, 0.69],
					y: [0, 0.5]
				},
			},
		},	
        guanyinping: {//关银屏
			兔年春节:{
				name: '关银屏/兔年春节/XingXiang',
				x: [0,0.58],
				y: [0,0.21],
				scale: 0.48,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '关银屏/兔年春节/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},
		guanyu: {//关羽
			明良千古:{
				name: '关羽/明良千古/XingXiang',
				x: [0,-0.37],
				y: [0,-0.21],
				scale: 0.7,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '关羽/明良千古/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			武动乾坤: {
				name: '关羽/武动乾坤/daiji2',
				x: [0, 0.26],
				y: [0, 0.58],
				scale: 0.65,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '关羽/武动乾坤/chuchang',
					scale: 1.3,
					action: 'play',
				},
				gongji: {
					name: '关羽/武动乾坤/chuchang',
					scale: 1.5,
					action: 'play',
				},
				beijing: {
					name: '关羽/武动乾坤/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '关羽/武动乾坤/JiSha',
						x: [0, 0.46],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
        guanning: {//管宁
            墨韵荷香: {
				name: '管宁/墨韵荷香/daiji2',
				shan: 'play3',
				x: [0, 0.43],
				y: [0, 0.4],
				scale: 1.1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '管宁/墨韵荷香/chuchang',
					action: 'play',
					scale: 0.8,
				},
				gongji: {
					name: '管宁/墨韵荷香/chuchang2',
					action: 'gongji',
					scale: 0.8,
				},
				teshu: {
					name: '管宁/墨韵荷香/chuchang2',
					action: 'jineng',
					scale: 0.8,
				},
				beijing: {
					name: '管宁/墨韵荷香/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '管宁/墨韵荷香/shouji2',
					scale: 0.8,
					speed: 1,
					delay: 0.5,
					effect: {
						name: '管宁/墨韵荷香/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.6,
					},
				},
			},
        },
        jin_guohuai: {//郭槐
			芙若槐香:{
				name: '郭槐/芙若槐香/xingxiang',
				version:"4.0",
				json: true,
				x: [0,1.38],
				y: [0,0.34],
				scale: 0.8,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '郭槐/芙若槐香/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },	
		guohuanghou: {//郭皇后	
			心系君魂: {
				name: '郭皇后/心系君魂/daiji2',
				x: [0, 0.29],
				y: [0, 0.51],
				scale: 0.85,
				angle: -20,
                //speed: 1,
				beijing: {
					name: '郭皇后/心系君魂/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},	
		guojia: {//郭嘉	
			一世风华: {
				name: '郭嘉/一世风华/daiji2',
				x: [0, 0.42],
				y: [0, 0.47],
				scale: 0.8,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '郭嘉/一世风华/beijing',
					x: [0, -0.1],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
			谋定天下: {
				name: '郭嘉/谋定天下/daiji2',
				x: [0, 0.38],
				y: [0, 0.51],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '郭嘉/谋定天下/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '郭嘉/谋定天下/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '郭嘉/谋定天下/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},
        guosi: {//郭汜
			文和乱武: {
				name: '郭汜/文和乱武/daiji2',
				x: [0, 0.45],
				y: [0, 0.43],
				scale: 0.95,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '郭汜/文和乱武/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '郭汜/文和乱武/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '郭汜/文和乱武/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
		guozhao: {//郭照	
			雍容尊雅: {
				name: '郭照/雍容尊雅/daiji2',
				x: [0, 0.47],
				y: [0, 0.53],
				scale: 0.8,
				angle: 10,
                //speed: 1,
				beijing: {
					name: '郭照/雍容尊雅/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
		haozhao: {//郝昭
			死守陈仓:{
				name: '郝昭/死守陈仓/XingXiang',
				x: [0,0.52],
				y: [0,0.12],
				scale: 0.5,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '郝昭/死守陈仓/BeiJing',
					scale: 0.3,
					x: [0, 1.32],
					y: [0, 0.52]
				},
			},	
		},	
		hetaihou: {//何太后
			蛇蝎为心:{
				name: '何太后/蛇蝎为心/XingXiang',
				x: [0,-0.74],
				y: [0,0.13],
				scale: 0.6,
				angle: 3,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '何太后/蛇蝎为心/BeiJing',
					scale: 0.3,
					x: [0, 0.38],
					y: [0, 0.5]
				},
			},	
			战场绝版: {
				name: '何太后/战场绝版/daiji2',
				shan: 'play3',
				x: [0, 0.75],
				y: [0, 0.45],
				scale: 1.05,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '何太后/战场绝版/chuchang',
					action: 'play',
					scale: 0.8,
				},
				gongji: {
					name: '何太后/战场绝版/chuchang2',
					action: 'gongji',
					scale: 0.75,
				},
				teshu: {
					name: '何太后/战场绝版/chuchang2',
					action: 'jineng',
					scale: 0.75,
				},
				beijing: {
					name: '何太后/战场绝版/beijing',
					x: [0, -0.36],
					y: [0, 0.38],
					scale: 0.4,
				},
				zhishixian: {
					name: '何太后/战场绝版/shouji2',
					scale: 0.6,
					speed: 0.8,
					delay: 0.3,
					effect: {
						name: '何太后/战场绝版/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.25,
					},
				},
			},
		},
        hujinding: {//胡金定
			明良千古:{
				name: '胡金定/明良千古/XingXiang',
				x: [0,0.41],
				y: [0,-0.34],
				scale: 0.9,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '胡金定/明良千古/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },	
		huaman: {//花鬘
			蛮帼英飒: {
				name: '花鬘/蛮帼英飒/daiji2',
				x: [0, 0.4],
				y: [0, 0.35],
				scale: 1.1,
				angle: 15,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '花鬘/蛮帼英飒/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '花鬘/蛮帼英飒/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '花鬘/蛮帼英飒/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		    花俏蛮娇: {
				name: '花鬘/花俏蛮娇/daiji2',
				x: [0, 0.43],
				y: [0, 0.41],
				scale: 1.04,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '花鬘/花俏蛮娇/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '花鬘/花俏蛮娇/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '花鬘/花俏蛮娇/beijing',
					x: [0, -0.57],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
		huatuo: {//华佗	
			仙山游医: {
				name: '华佗/仙山游医/daiji2',
				x: [0, 0.45],
				y: [0, 0.43],
				scale: 0.88,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '华佗/仙山游医/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},
        huangchengyan: {//黄承彦
			夜占吉凶:{
				name: '黄承彦/夜占吉凶/xingxiang',
				version:"4.0",
				json: true,
				x: [0,0.83],
				y: [0,0.45],
				scale: 0.75,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '黄承彦/夜占吉凶/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },	
		huanggai: {//黄盖
			鏖战赤壁:{
				name: '黄盖/鏖战赤壁/XingXiang',
				x: [0,0.63],
				y: [0,0.39],
				scale: 0.52,
				angle: -12,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '黄盖/鏖战赤壁/BeiJing',
					scale: 0.3,
					x: [0, 1.37],
					y: [0, 0.5]
				},
			},	
			武动乾坤: {
				name: '黄盖/武动乾坤/daiji2',
				x: [0, 0.3],
				y: [0, 0.5],
				scale: 0.75,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '黄盖/武动乾坤/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '黄盖/武动乾坤/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '黄盖/武动乾坤/beijing',
					x: [0, -0.26],
					y: [0, 0.46],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '黄盖/武动乾坤/JiSha',
						x: [0, 0.48],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},	
		huangyueying: {//黄月英	
			智心巧手:{
				name: '黄月英/智心巧手/xingxiang',
				version:"4.0",
				x: [0,0.1],
				y: [0,0.12],
				scale: 1.3,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '黄月英/智心巧手/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
			花好月圆: {
				name: '黄月英/花好月圆/daiji2',
				x: [0, 0.43],
				y: [0, 0.53],
				scale: 0.84,
				angle: -5,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '黄月英/花好月圆/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '黄月英/花好月圆/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '黄月英/花好月圆/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},	
		huangzhong: {//黄忠		
			明良千古:{
				name: '黄忠/明良千古/XingXiang',
				x: [0,0.44],
				y: [0,0.4],
				scale: 0.46,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '黄忠/明良千古/BeiJing',
					scale: 0.3,
					x: [0, 1.5],
					y: [0, 0.39]
				},
			},		
			武动乾坤: {
				name: '黄忠/武动乾坤/daiji2',
				x: [0, 0.32],
				y: [0, 0.52],
				scale: 0.78,
				angle: -8,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '黄忠/武动乾坤/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '黄忠/武动乾坤/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '黄忠/武动乾坤/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '黄忠/武动乾坤/JiSha',
						x: [0, 0.46],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
        },
        huojun: {//霍峻
			狭路奋勇:{
				name: '霍峻/狭路奋勇/xingxiang',
				version:"4.0",
				json: true,
				x: [0,0.5],
				y: [0,0.5],
				scale: 0.7,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '霍峻/狭路奋勇/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
		},
        jiaxu: {//贾诩
			谋定天下: {
				name: '贾诩/谋定天下/daiji2',
				x: [0, 0.42],
				y: [0, 0.5],
				scale: 0.9,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '贾诩/谋定天下/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '贾诩/谋定天下/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '贾诩/谋定天下/beijing',
					x: [0, 0.43],
					y: [0, 0.25],
					scale: 0.4,
				},
			},
			文和乱武: {
				name: '贾诩/文和乱武/daiji2',
				x: [0, 0.38],
				y: [0, 0.58],
				scale: 0.8,
				angle: -12,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '贾诩/文和乱武/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '贾诩/文和乱武/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '贾诩/文和乱武/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '贾诩/文和乱武/JiSha',
						x: [0, 0.5],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
        },
        jiangwei: {//姜维
			烽火乱世: {
				name: '姜维/烽火乱世/daiji2',
				x: [0, 0.4],
				y: [0, 0.44],
				scale: 0.78,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '姜维/烽火乱世/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '姜维/烽火乱世/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '姜维/烽火乱世/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
			护国麒麟: {
				name: '姜维/护国麒麟/daiji2',
				x: [0, 0.4],
				y: [0, 0.42],
				scale: 1.1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '姜维/护国麒麟/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '姜维/护国麒麟/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '姜维/护国麒麟/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        kongrong: {//孔融
			重阳闲趣: {
				name: '孔融/重阳闲趣/daiji2',
				x: [0, 0.46],
				y: [0, 0.4],
				scale: 0.92,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '孔融/重阳闲趣/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '孔融/重阳闲趣/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '孔融/重阳闲趣/beijing',
					x: [0, 0.1],
					y: [0, 0.4],
					scale: 0.4,
				},
			},
        },
        licaiwei: {//李采薇
			琼蕊清涧: {
				name: '李采薇/琼蕊清涧/daiji2',
				x: [0, 0.54],
				y: [0, 0.35],
				scale: 1.1,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '李采薇/琼蕊清涧/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '李采薇/琼蕊清涧/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '李采薇/琼蕊清涧/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },				
		lifeng: {//李丰
			仓箱可期:{
				name: '李丰/仓箱可期/XingXiang',
				x: [0,0.6],
				y: [0,0.6],
				scale: 0.56,
				angle: 6,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '李丰/仓箱可期/BeiJing',
					scale: 0.3,
					x: [0, -0.34],
					y: [0, 0.67]
				},
			},
        },
        lijue: {//李傕
			文和乱武: {
				name: '李傕/文和乱武/daiji2',
				x: [0, 0.42],
				y: [0, 0.48],
				scale: 0.82,
				angle: 8,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '李傕/文和乱武/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '李傕/文和乱武/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '李傕/文和乱武/beijing',
					x: [0, -0.07],
					y: [0, 0.66],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '李傕/文和乱武/JiSha',
						x: [0, 0.46],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
        },					
        liru: {//李儒
			烈火焚城: {
				name: '李儒/烈火焚城/daiji2',
				x: [0, 0.42],
				y: [0, 0.51],
				scale: 0.72,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '李儒/烈火焚城/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '李儒/烈火焚城/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '李儒/烈火焚城/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
            鸩杀少帝:{
				name: '李儒/鸩杀少帝/XingXiang',
				x: [0,0.2],
				y: [0,0.17],
				scale: 0.5,
				angle: 10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '李儒/鸩杀少帝/BeiJing',
					scale: 0.3,
					x: [0, 1.7],
					y: [0, 0.5]
				},
			},
        },
		lingju: {//灵雎
			魂牵梦萦:{
				name: '灵雎/魂牵梦萦/XingXiang',
				x: [0,1.4],
				y: [0,0],
				scale: 0.67,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '灵雎/魂牵梦萦/BeiJing',
					scale: 0.3,
					x: [0, 0.95],
					y: [0, 0.5]
				},
			},						
		},							
		lingcao: {//凌操
			破贼校尉:{
				name: '凌操/破贼校尉/XingXiang',
				x: [0,0.44],
				y: [0,0.27],
				scale: 0.6,
				angle: -20,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '凌操/破贼校尉/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        lingtong: {//凌统								
			长风破浪:{
				name: '凌统/长风破浪/XingXiang',
				x: [0,-0.22],
				y: [0,-0.14],
				scale: 0.62,
				angle: 12,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '凌统/长风破浪/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },								
		liubei: {//刘备										
			英杰会聚: {
				name: '刘备/英杰会聚/daiji2',
				x: [0, 0.4],
				y: [0, 0.54],
				scale: 0.7,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '刘备/英杰会聚/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '刘备/英杰会聚/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '刘备/英杰会聚/beijing',
					x: [0, 1.28],
					y: [0, 0.45],
					scale: 0.4,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '刘备/英杰会聚/JiSha',
						x: [0, 0.48],
						version:"4.0",
						scale: 0.8,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
			猪年圣诞:{
				name: '刘备/猪年圣诞/XingXiang',
				x: [0,0.15],
				y: [0,0.35],
				scale: 0.4,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '刘备/猪年圣诞/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},										
		},												
        liubian: {//刘辩
			少帝龙威: {
				name: '刘辩/少帝龙威/daiji2',
				x: [0, 0.43],
				y: [0, 0.53],
				scale: 0.85,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '刘辩/少帝龙威/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '刘辩/少帝龙威/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '刘辩/少帝龙威/beijing',
					x: [0, 0.49],
					y: [0, 0.28],
					scale: 0.4,
				},
			},
        },
		liushan: {//刘禅													
			虚拟天团: {
				name: '刘禅/虚拟天团/daiji2',
				x: [0, 0.47],
				y: [0, 0.48],
				scale: 1,
				angle: -15,
                //speed: 1,
				beijing: {
					name: '刘禅/虚拟天团/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
					angle: -15,
				},
			},
			流马闹市:{
				name: '刘禅/流马闹市/xingxiang',
				version:"4.0",
				json: true,
				x: [0,0.5],
				y: [0,0.44],
				scale: 1,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '刘禅/流马闹市/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},													
		},															
		liucheng: {//刘赪
			明良千古:{
				name: '刘赪/明良千古/XingXiang',
				x: [0,1.11],
				y: [0,-0.02],
				scale: 0.54,
				angle: -12,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '刘赪/明良千古/BeiJing',
					scale: 0.3,
					x: [0, -0.9],
					y: [0, 0.5]
				},
			},
        },
        liufeng: {//刘封
			立嗣陷危: {
				name: '刘封/立嗣陷危/daiji2',
				x: [0, 0.5],
				y: [0, 0.69],
				scale: 0.88,
				angle: -20,
                //speed: 1,
				beijing: {
					name: '刘封/立嗣陷危/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },												
        liuhong: {//刘宏
			长乐未央: {
				name: '刘宏/长乐未央/daiji2',
				x: [0, 0.45],
				y: [0, 0.37],
				scale: 1.1,
				angle: -5,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '刘宏/长乐未央/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '刘宏/长乐未央/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '刘宏/长乐未央/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},
        lushi: {//卢氏
			蝶恋清幔:{
				name: '卢氏/蝶恋清幔/xingxiang',
				version:"4.0",
				json: true,
				x: [0,1.34],
				y: [0,0.28],
				scale: 0.9,
				angle: -10,
                //speed: 1,
				beijing: {
					name: '卢氏/蝶恋清幔/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },
        luyi: {//卢弈
			瑶颜如玉: {
				name: '卢弈/瑶颜如玉/daiji2',
				x: [0, 0.5],
				y: [0, 0.35],
				scale: 1.1,
				angle: 15,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '卢弈/瑶颜如玉/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '卢弈/瑶颜如玉/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '卢弈/瑶颜如玉/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },				
		liuxie: {//刘协
			汉末龙裔: {
				name: '刘协/汉末龙裔/daiji2',
				x: [0, 0.41],
				y: [0, 0.47],
				scale: 0.82,
				angle: -8,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '刘协/汉末龙裔/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '刘协/汉末龙裔/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '刘协/汉末龙裔/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.25,
				},
			},
		},							
		liuyan: {//刘焉
		    雄踞益州:{
				name: '刘焉/雄踞益州/XingXiang',
				x: [0,0.5],
				y: [0,0.11],
				scale: 0.56,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '刘焉/雄踞益州/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},																
		liuzan: {//留赞
		    抗音而歌: {
				name: '留赞/抗音而歌/XingXiang',
				x: [0,0.45],
				y: [0,-0.2],
				scale: 0.68,
				angle: -5,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '留赞/抗音而歌/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},																
		yl_luzhi: {//卢植
			抒墨谏策: {
				name: '卢植/抒墨谏策/daiji2',
				x: [0, 0.4],
				y: [0, 0.57],
				scale: 0.75,
				angle: 10,
                //speed: 1,
				beijing: {
					name: '卢植/抒墨谏策/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },															
		ol_lusu: {//鲁肃
			谋定天下: {
				name: '鲁肃/谋定天下/daiji2',
				x: [0, 0.4],
				y: [0, 0.49],
				scale: 0.88,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '鲁肃/谋定天下/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '鲁肃/谋定天下/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '鲁肃/谋定天下/beijing',
					x: [0, 0.5],
					y: [0, 0.45],
					scale: 0.3,
				},
			},
		    联刘抗曹:{
				name: '鲁肃/联刘抗曹/XingXiang',
				x: [0,0.46],
				y: [0,-0.1],
				scale: 0.62,
				angle: -15,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '鲁肃/联刘抗曹/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},
		luji: {//陆绩
			星熠心移: {
				name: '陆绩/星熠心移/daiji2',
				x: [0, 0.27],
				y: [0, 0.42],
				scale: 0.9,
				angle: -20,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '陆绩/星熠心移/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '陆绩/星熠心移/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '陆绩/星熠心移/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
		lukang: {//陆抗		 
		    毁堰破晋: {
				name: '陆抗/毁堰破晋/daiji2',
				x: [0, 0.4],
				y: [0, 0.54],
				scale: 0.78,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '陆抗/毁堰破晋/chuchang',
					scale: 1.1,
					action: 'play',
				},
				gongji: {
					name: '陆抗/毁堰破晋/chuchang',
					scale: 1.3,
					action: 'play',
				},
				beijing: {
					name: '陆抗/毁堰破晋/beijing',
					x: [0, 0.4],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},												
		luxun: {//陆逊
			烈火炽天:{
				name: '陆逊/烈火炽天/XingXiang',
				x: [0,-0.78],
				y: [0,0.22],
				scale: 0.55,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '陆逊/烈火炽天/BeiJing',
					scale: 0.3,
					x: [0, 0.76],
					y: [0, 0.5]
				},
			},
			谋定天下: {
				name: '陆逊/谋定天下/daiji2',
				x: [0, 0.4],
				y: [0, 0.46],
				scale: 0.85,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '陆逊/谋定天下/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '陆逊/谋定天下/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '陆逊/谋定天下/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},							
		luyusheng: {//陆郁生			
		    战场绝版: {
				name: '陆郁生/战场绝版/daiji2',
				teshu: 'play2',
				shan: 'play3',
				x: [0, 0.42],
				y: [0, 0.36],
				scale: 1.12,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '陆郁生/战场绝版/chuchang',
					action: 'play',
					scale: 0.9,
				},
				gongji: {
					name: '陆郁生/战场绝版/chuchang2',
					action: ['gongji', 'jineng'],
					scale: 0.7,
				},
				beijing: {
					name: '陆郁生/战场绝版/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '陆郁生/战场绝版/shouji2',
					scale: 0.5,
					speed: 1.2,
					delay: 0.3,
					effect: {
						name: '陆郁生/战场绝版/shouji',
						scale: 0.6,
						speed: 0.6,
						delay: 0.7,					},
				},
			},
        },	
		lvbu: {//吕布
			傲睨万物:{
				name: '吕布/傲睨万物/XingXiang',
				x: [0,0.28],
				y: [0,0.34],
				scale: 0.52,
				angle: 15,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '吕布/傲睨万物/BeiJing',
					scale: 0.3,
					x: [0, 0.18],
					y: [0, 0.41]
				},
			},			
			文和乱武: {
				name: '吕布/文和乱武/daiji2',
				x: [0, 0.38],
				y: [0, 0.43],
				scale: 1,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '吕布/文和乱武/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '吕布/文和乱武/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '吕布/文和乱武/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
			武动乾坤: {
				name: '吕布/武动乾坤/daiji2',
				x: [0, 0.25],
				y: [0, 0.55],
				scale: 0.7,
				angle: -20,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '吕布/武动乾坤/chuchang',
					scale: 1.1,
					action: 'play',
				},
				gongji: {
					name: '吕布/武动乾坤/chuchang',
					scale: 1.3,
					action: 'play',
				},
				beijing: {
					name: '吕布/武动乾坤/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '吕布/武动乾坤/JiSha',
						x: [0, 0.4],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},			
		lvdai: {//吕岱
			交趾震威: {
				name: '吕岱/交趾震威/daiji2',
				x: [0, 0.6],
				y: [0, 0.5],
				scale: 0.82,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '吕岱/交趾震威/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '吕岱/交趾震威/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '吕岱/交趾震威/beijing',
					x: [0, 0.77],
					y: [0, 0.47],
					scale: 0.3,
				},
			},
        },											
		lvlingqi: {//吕玲绮							
			盖世无双: {
				name: '吕玲绮/盖世无双/daiji2',
				x: [0, 0.4],
				y: [0, 0.44],
				scale: 1,
				angle: 15,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '吕玲绮/盖世无双/chuchang',
					scale: 0.55,
					action: 'play',
				},
				gongji: {
					name: '吕玲绮/盖世无双/chuchang',
					scale: 0.75,
					action: 'play',
				},
				beijing: {
					name: '吕玲绮/盖世无双/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
        lvmeng: {//吕蒙
			清雨踏春: {
				name: '吕蒙/清雨踏春/daiji2',
				x: [0, 0.52],
				y: [0, 0.42],
				scale: 0.95,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '吕蒙/清雨踏春/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '吕蒙/清雨踏春/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '吕蒙/清雨踏春/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
		},
		machao: {//马超								
		    明良千古:{
				name: '马超/明良千古/XingXiang',
				x: [0,0.4],
				y: [0,0.32],
				scale: 0.5,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '马超/明良千古/BeiJing',
					scale: 0.3,
					x: [0, -0.8],
					y: [0, 0.5]
				},
			},									
	        武动乾坤: {
				name: '马超/武动乾坤/daiji2',
				x: [0, 0.48],
				y: [0, 0.5],
				scale: 0.82,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '马超/武动乾坤/chuchang',
					scale: 1.1,
					action: 'play',
				},
				gongji: {
					name: '马超/武动乾坤/chuchang',
					scale: 1.3,
					action: 'play',
				},
				beijing: {
					name: '马超/武动乾坤/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '马超/武动乾坤/JiSha',
						x: [0, 0.42],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
        madai: {//马岱
			一合而斩: {
				name: '马岱/一合而斩/daiji2',
				x: [0, 0.4],
				y: [0, 0.44],
				scale: 0.95,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '马岱/一合而斩/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '马岱/一合而斩/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '马岱/一合而斩/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
		majun: {//马钧
			能工巧匠:{
				name: '马钧/能工巧匠/XingXiang',
				x: [0,0.3],
				y: [0,0.2],
				scale: 0.48,
				angle: -5,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '马钧/能工巧匠/BeiJing',
					scale: 0.3,
					x: [0, -0.8],
					y: [0, 0.4]
				},
			},
        },
        maliang: {//马良
			千计卷来:{
				name: '马良/千计卷来/xingxiang',
				version:"4.0",
				x: [0,0.45],
				y: [0,0.3],
				scale: 1,
				angle: -10,
                //speed: 1,
				beijing: {
					name: '马良/千计卷来/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },																			
		mayunlu: {//马云騄														
		    明良千古:{
				name: '马云騄/明良千古/XingXiang',
				x: [0,1.1],
				y: [0,0.35],
				scale: 0.5,
				angle: 20,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '马云騄/明良千古/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
			花好月圆: {
				name: '马云騄/花好月圆/daiji2',
				x: [0, 0.6],
				y: [0, 0.54],
				scale: 0.8,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '马云騄/花好月圆/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '马云騄/花好月圆/chuchang',
					scale: 0.75,
					action: 'play',
				},
				beijing: {
					name: '马云騄/花好月圆/beijing',
					x: [0, 0.36],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '马云騄/花好月圆/JiSha',
						x: [0, 0.48],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
        menghuo: {//孟获
			祸崇南疆:{
				name: '孟获/祸崇南疆/XingXiang',
				x: [0,0.2],
				y: [0,0.45],
				scale: 0.5,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '孟获/祸崇南疆/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },						
		miheng: {//祢衡
			击鼓骂曹:{
				name: '祢衡/击鼓骂曹/XingXiang',
				x: [0,0.19],
				y: [0,0.19],
				scale: 0.65,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '祢衡/击鼓骂曹/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },																			
		sp_mifuren: {//糜夫人
			香消玉殒: {
				name: '糜夫人/香消玉殒/daiji2',
				x: [0, 0.2],
				y: [0, 0.6],
				scale: 0.78,
				angle: -30,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '糜夫人/香消玉殒/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '糜夫人/香消玉殒/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '糜夫人/香消玉殒/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },																			
		nanhualaoxian: {//南华老仙													
		    野鹤闲云:{
				name: '南华老仙/野鹤闲云/XingXiang',
				x: [0,2.06],
				y: [0,-0.12],
				scale: 0.62,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '南华老仙/野鹤闲云/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},
        panshu: {//潘淑
			繁囿引芳: {
				name: '潘淑/繁囿引芳/daiji2',
				x: [0, 0.45],
				y: [0, 0.54],
				scale: 0.83,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '潘淑/繁囿引芳/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '潘淑/繁囿引芳/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '潘淑/繁囿引芳/beijing',
					x: [0, 1],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
			江东锦绣:{
				name: '潘淑/江东锦绣/xingxiang',
				version:"4.0",
				shizhounian: true,
				x: [0,0.38],
				y: [0,0.22],
				scale: 1.2,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '潘淑/江东锦绣/jineng01',
					version:"4.0",
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '潘淑/江东锦绣/jineng01',
					version:"4.0",
					scale: 0.7,
					action: 'play',
				},
				beijing: {
					name: '潘淑/江东锦绣/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				zhishixian: {
					name: '潘淑/江东锦绣/jineng02',
					version:"4.0",
					scale: 0.5,
					speed: 0.8,
					delay: 0.3,
				},
			},
        },
        pangdegong: {//庞德公
			超脱于世:{
				name: '庞德公/超脱于世/XingXiang',
				x: [0,0.5],
				y: [0,0.03],
				scale: 0.7,
				angle: 10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '庞德公/超脱于世/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},
        pangtong: {//庞统
			龙跃凤鸣:{
				name: '庞统/龙跃凤鸣/XingXiang',
				x: [0,1.],
				y: [0,0.39],
				scale: 0.55,
				angle: 15,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '庞统/龙跃凤鸣/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			谋定天下: {
				name: '庞统/谋定天下/daiji2',
				x: [0, 0.24],
				y: [0, 0.55],
				scale: 0.8,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '庞统/谋定天下/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '庞统/谋定天下/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '庞统/谋定天下/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
        puyuan: {//蒲元				
			百炼神器: {
				name: '蒲元/百炼神器/daiji2',
				x: [0, 0.4],
				y: [0, 0.37],
				scale: 1.15,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '蒲元/百炼神器/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '蒲元/百炼神器/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '蒲元/百炼神器/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
		qinmi: {//秦宓
            冠绝天下:{
				name: '秦宓/冠绝天下/XingXiang',
				x: [0,0.5],
				y: [0,0.53],
				scale: 0.4,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '秦宓/冠绝天下/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},																			
		},
        qinghegongzhu: {//清河公主
			瑞雪芳梅:{
				name: '清河公主/瑞雪芳梅/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,0.5],
				y: [0,0.02],
				scale: 1.25,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '清河公主/瑞雪芳梅/jineng01',
					version:"4.0",
				    json: true,
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '清河公主/瑞雪芳梅/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '清河公主/瑞雪芳梅/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				zhishixian: {
					name: '清河公主/瑞雪芳梅/jineng02',
					version:"4.0",
				    json: true,
					scale: 0.8,
					speed: 0.8,
					delay: 0.3,
				},
			},
        },
        quyi: {//麴义
			磐河对峙: {
				name: '麴义/磐河对峙/daiji2',
				x: [0, 0.43],
				y: [0, 0.4],
				scale: 1.05,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '麴义/磐河对峙/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '麴义/磐河对峙/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '麴义/磐河对峙/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },				
		quancong: {//全琮
			宵靥谜君: {
				name: '全琮/宵靥谜君/daiji2',
				x: [0, 0.4],
				y: [0, 0.5],
				scale: 0.84,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '全琮/宵靥谜君/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },																			
		ruiji: {//芮姬
			玉芮花意:{
				name: '芮姬/玉芮花意/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,1.12],
				y: [0,0.32],
				scale: 0.95,
				angle: -10,
                //speed: 1,
				chuchang: {
					name: '芮姬/玉芮花意/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.3,
					action: 'play',
				},
				gongji: {
					name: '芮姬/玉芮花意/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.5,
					action: 'play',
				},
				beijing: {
					name: '芮姬/玉芮花意/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				zhishixian: {
					name: '芮姬/玉芮花意/jineng02',
					version:"4.0",
				    json: true,
					scale: 0.5,
					speed: 0.4,
					delay: 0.4,
				},
			},
        },
        shamoke: {//沙摩柯
			狂喜胜战: {
				name: '沙摩柯/狂喜胜战/daiji2',
				x: [0, 0.48],
				y: [0, 0.35],
				scale: 1.1,
				angle: 5,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '沙摩柯/狂喜胜战/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '沙摩柯/狂喜胜战/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '沙摩柯/狂喜胜战/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
		shen_caocao: {//神曹操
			一统江山: {
				name: '神曹操/一统江山/daiji2',
				x: [0, 0.46],
				y: [0, 0.4],
				scale: 0.9,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '神曹操/一统江山/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '神曹操/一统江山/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '神曹操/一统江山/beijing',
					x: [0, 0.42],
					y: [0, 0.48],
					scale: 0.25,
				},
			},
		},
		shen_ganning: {//神甘宁			
		    万人辟易:{
				name: '神甘宁/万人辟易/XingXiang',
				x: [0,0.17],
				y: [0,0.23],
				scale: 0.44,
				angle: 15,
                speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '神甘宁/万人辟易/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },		
		shen_guanyu: {//神关羽
			链狱鬼神: {
				name: '神关羽/链狱鬼神/daiji2',
				x: [0, 0.42],
				y: [0, 0.46],
				scale: 0.85,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '神关羽/链狱鬼神/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },																			
		shen_guojia: {//神郭嘉
			云涯神郭嘉:{
				name: '神郭嘉/云涯神郭嘉/nianghuaguojia',
				x: [0,0.4],
				y: [-25,0.38],
				scale: 0.15,
				background: '神郭嘉/云涯神郭嘉/beijing.png',
			},			
			倚星折月:{
				name: '神郭嘉/倚星折月/XingXiang',
				x: [0,-0.31],
				y: [0,0.34],
				scale: 0.5,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '神郭嘉/倚星折月/BeiJing',
					scale: 0.3,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				audio: {
					skill: '神郭嘉/倚星折月/audio',
					card: '神郭嘉/倚星折月/audio',
				},
				special: {
					觉醒: {
						name: 'shen_guojia/倚星折月2',
					},
					// play: {
						// name: '神郭嘉/倚星折月2/XingXiang-1',
						// action: 'TeShu',
						// x: [0, 0.5],
					    // y: [0, 0.5],
						// scale: 0.6,
						// audio: '神郭嘉/倚星折月2/audio/victory',
						// delay: 1,
					// },
					condition: {
						juexingji: {
							transform: "觉醒",
							effect: 'shaohui',
							//play: 'play',
						},
					},
				},
			},
			倚星折月2:{
				name: '神郭嘉/倚星折月2/XingXiang-1',
				x: [0,-0.31],
				y: [0,0.34],
				scale: 0.5,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				audio: {
					skill: '神郭嘉/倚星折月2/audio',
					card: '神郭嘉/倚星折月2/audio',
				},
				beijing: {
					name: '神郭嘉/倚星折月2/BeiJing-1',
					scale: 0.3,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },	
        shen_luxun: {//神陆逊														
            绽焰摧枯:{
				name: '神陆逊/绽焰摧枯/XingXiang',
				x: [0,0.43],
				y: [0,0.43],
				scale: 0.6,
				angle: -5,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '神陆逊/绽焰摧枯/BeiJing',
					scale: 0.3,
					x: [0, -0.2],
					y: [0, 0.5]
				},
			},
        },
        shen_lvbu: {//神吕布
			冠绝天下:{
				name: '神吕布/冠绝天下/XingXiang',
				x: [0,0.71],
				y: [0,0.23],
				scale: 0.45,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '神吕布/冠绝天下/BeiJing',
					scale: 0.3,
					x: [0, 0.2],
					y: [0, 0.4]
				},
			},	
		},										
		shen_lvmeng: {//神吕蒙
			兼资文武:{
				name: '神吕蒙/兼资文武/XingXiang',
				x: [0,0.04],
				y: [0,0.36],
				scale: 0.4,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '神吕蒙/兼资文武/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        shen_machao: {//神马超
			迅骛惊雷: {
				name: '神马超/迅骛惊雷/daiji2',
				shan: 'play3',
				x: [0, 0.46],
				y: [0, 0.38],
				scale: 0.85,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '神马超/迅骛惊雷/chuchang',
					action: 'play',
					scale: 0.7,
				},
				gongji: {
					name: '神马超/迅骛惊雷/chuchang2',
					action: 'gongji',
					scale: 0.8,
				},
				teshu: {
					name: '神马超/迅骛惊雷/chuchang2',
					action: 'jineng',
					scale: 0.8,
				},
				beijing: {
					name: '神马超/迅骛惊雷/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '神马超/迅骛惊雷/shouji2',
					scale: 0.5,
					speed: 0.6,
					delay: 0.3,
					effect: {
						name: '神马超/迅骛惊雷/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.4,
					},
				},
			},
        },										
        shen_simayi: {//神司马懿
			鉴往知来:{
				name: '神司马懿/鉴往知来/XingXiang',
				x: [0,0.46],
				y: [0,0.07],
				scale: 0.58,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '神司马懿/鉴往知来/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        shen_sunce: {//神孙策
			霸王再世:{
				name: '神孙策/霸王再世/XingXiang',
				x: [0,0.23],
				y: [0,0.54],
				scale: 0.3,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '神孙策/霸王再世/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        shen_taishici: {//神太史慈
			勇撼日月:{
				name: '神太史慈/勇撼日月/XingXiang',
				x: [0,0.25],
				y: [0,0.45],
				scale: 0.4,
				angle: 20,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '神太史慈/勇撼日月/BeiJing',
					scale: 0.4,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },
        shen_xunyu: {//神荀彧
			虎年清明:{
				name: '神荀彧/虎年清明/XingXiang',
				x: [0,0.5],
				y: [0,0.28],
				scale: 0.52,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
			    beijing: {
		 			name: '神荀彧/虎年清明/BeiJing',
					scale: 0.3,
					x: [0, 1.2],
					y: [0, 0.4]
		      	},
		    }, 	
        },
        shen_zhaoyun: {//神赵云
			神龙佑主: {
				name: '神赵云/神龙佑主/daiji2',
				x: [0, 0.4],
				y: [0, 0.52],
				scale: 0.8,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '神赵云/神龙佑主/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '神赵云/神龙佑主/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '神赵云/神龙佑主/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},								
		},									
		shen_zhouyu: {//神周瑜					
		    红莲业火: {
				name: '神周瑜/红莲业火/daiji2',
				x: [0, 0.43],
				y: [0, 0.5],
				scale: 0.75,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '神周瑜/红莲业火/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '神周瑜/红莲业火/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '神周瑜/红莲业火/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},	
		},																			
		shen_zhugeliang: {//神诸葛亮													
		    剑祭通天:{
				name: '神诸葛亮/剑祭通天/XingXiang',
				x: [0,0.8],
				y: [0,0.03],
				scale: 0.58,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '神诸葛亮/剑祭通天/BeiJing',
					scale: 0.25,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},			
	    },																		
		simahui: {//司马徽																
	        教诲不倦: {
				name: '司马徽/教诲不倦/daiji2',
				x: [0, 0.4],
				y: [0, 0.52],
				scale: 0.75,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '司马徽/教诲不倦/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '司马徽/教诲不倦/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '司马徽/教诲不倦/beijing',
					x: [0, 0.25],
					y: [0, 0.48],
					scale: 0.3,
				},
			},
		},
        simashi: {//司马师
			桀骜睥睨:{
				name: '司马师/桀骜睥睨/xingxiang',
				version:"4.0",
				x: [0,-0.16],
				y: [0,0.23],
				scale: 0.95,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '司马师/桀骜睥睨/ChuChang',
					version:"4.0",
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '司马师/桀骜睥睨/ChuChang',
					version:"4.0",
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '司马师/桀骜睥睨/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '司马师/桀骜睥睨/JiSha',
						x: [0, 0.45],
						version:"4.0",
						scale: 0.85,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
	    simayi: {//司马懿
			佳期若梦: {
				name: '司马懿/佳期若梦/daiji2',
				x: [0, 0.36],
				y: [0, 0.5],
				scale: 0.75,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '司马懿/佳期若梦/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '司马懿/佳期若梦/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '司马懿/佳期若梦/beijing',
					x: [0, 1.25],
					y: [0, 0.53],
					scale: 0.3,
				},
			},
			谋定天下: {
				name: '司马懿/谋定天下/daiji2',
				x: [0, 0.33],
				y: [0, 0.46],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '司马懿/谋定天下/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '司马懿/谋定天下/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '司马懿/谋定天下/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        simazhao: {//司马昭
			温情良缘:{
				name: '司马昭/温情良缘/xingxiang',
				version:"4.0",
				x: [0,0.48],
				y: [0,0.23],
				scale: 1,
				angle: -5,
                //speed: 1,
				beijing: {
					name: '司马昭/温情良缘/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
		},							
		sunce: {//孙策																
		    逐鹿天下:{
				name: '孙策/逐鹿天下/XingXiang',
				x: [0,0.6],
				y: [0,0.15],
				scale: 0.55,
				angle: 10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '孙策/逐鹿天下/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},																			
		sunhanhua: {//孙寒华
			莲漪清荷: {
				name: '孙寒华/莲漪清荷/daiji2',
				shan: 'play3',
				x: [0, 0.24],
				y: [0, 0.38],
				scale: 1.1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '孙寒华/莲漪清荷/chuchang',
					action: 'play',
					scale: 0.55,
				},
				gongji: {
					name: '孙寒华/莲漪清荷/chuchang2',
					action: 'gongji',
					scale: 0.6,
				},
				teshu: {
					name: '孙寒华/莲漪清荷/chuchang2',
					action: 'jineng',
					scale: 0.6,
				},
				beijing: {
					name: '孙寒华/莲漪清荷/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '孙寒华/莲漪清荷/shouji2',
					scale: 0.5,
					speed: 0.8,
					delay: 0.5,
					effect: {
						name: '孙寒华/莲漪清荷/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.35,
					},
				},
			},
        },
        sunhao: {//孙皓
			翠琉金阙: {
				name: '孙皓/翠琉金阙/daiji2',
				x: [0, 0.48],
				y: [0, 0.44],
				scale: 1.05,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '孙皓/翠琉金阙/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '孙皓/翠琉金阙/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '孙皓/翠琉金阙/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
        sunliang: {//孙亮
			诡谲困玺: {
				name: '孙亮/诡谲困玺/daiji2',
				x: [0, 0.36],
                y: [0, 0.5],
                scale: 0.8,
				beijing: {
					name: '孙亮/诡谲困玺/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
        sunluban: {//孙鲁班
			牛年端午:{
				name: '孙鲁班/牛年端午/XingXiang',
				x: [0,0.65],
				y: [0,0.18],
				scale: 0.45,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '孙鲁班/牛年端午/BeiJing',
					scale: 0.25,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},																			
		},																			
		sunluyu: {//孙鲁育																
		    牛年端午:{
				name: '孙鲁育/牛年端午/XingXiang',
				x: [0,0.02],
				y: [0,0.3],
				scale: 0.38,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '孙鲁育/牛年端午/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},																			
		sunquan: {//孙权
			英杰会聚: {
				name: '孙权/英杰会聚/daiji2',
				x: [0, 0.44],
				y: [0, 0.48],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '孙权/英杰会聚/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '孙权/英杰会聚/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '孙权/英杰会聚/beijing',
					x: [0, -0.2],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '孙权/英杰会聚/JiSha',
						x: [0, 0.5],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 1.7,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
			冠绝天下:{
				name: '孙权/冠绝天下/XingXiang',
				x: [0,0.44],
				y: [0,0.3],
				scale: 0.45,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '孙权/冠绝天下/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},																			
		},																			
		sunru: {//孙茹			
			花容月貌:{
				name: '孙茹/花容月貌/XingXiang',
				x: [0,0.58],
				y: [0,0.13],
				scale: 0.55,
				angle: 10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '孙茹/花容月貌/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        sunlingluan: {//孙翎鸾
			鸾心初动: {
				name: '孙翎鸾/鸾心初动/daiji2',
				x: [0, 0.57],
				y: [0, 0.35],
				scale: 1.1,
				angle: 15,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '孙翎鸾/鸾心初动/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '孙翎鸾/鸾心初动/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '孙翎鸾/鸾心初动/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
		sunshangxiang: {//孙尚香	
			兔年春节:{
				name: '孙尚香/兔年春节/XingXiang',
				x: [0,0.41],
				y: [0,0.31],
				scale: 0.55,
				angle: -5,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '孙尚香/兔年春节/BeiJing',
					scale: 0.25,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
			花好月圆: {
				name: '孙尚香/花好月圆/daiji2',
				x: [0, 0.48],
				y: [0, 0.48],
				scale: 0.8,
				angle: 20,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '孙尚香/花好月圆/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '孙尚香/花好月圆/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '孙尚香/花好月圆/beijing',
					x: [0, 0.55],
					y: [0, 0.5],
					scale: 0.25,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '孙尚香/花好月圆/JiSha',
						x: [0, 0.48],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},	
		sunyi: {//孙翊
			腾龙翻江: {
				name: '孙翊/腾龙翻江/daiji2',
				x: [0, 0.4],
				y: [0, 0.5],
				scale: 0.94,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '孙翊/腾龙翻江/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '孙翊/腾龙翻江/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '孙翊/腾龙翻江/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },	
		taishici: {//太史慈	
			武动乾坤: {
				name: '太史慈/武动乾坤/daiji2',
				x: [0, 0.35],
				y: [0, 0.47],
				scale: 0.85,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '太史慈/武动乾坤/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '太史慈/武动乾坤/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '太史慈/武动乾坤/beijing',
					x: [0, 0],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '太史慈/武动乾坤/JiSha',
						x: [0, 0.42],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 1.6,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
        },
		tangji: {//唐姬
			福泽金蕊: {
				name: '唐姬/福泽金蕊/daiji2',
				x: [0, 0.45],
				y: [0, 0.43],
				scale: 1.15,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '唐姬/福泽金蕊/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '唐姬/福泽金蕊/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '唐姬/福泽金蕊/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
		tengfanglan: {//滕芳兰
			拈花靛情: {
				name: '滕芳兰/拈花靛情/daiji2',
				x: [0, 0.45],
				y: [0, 0.32],
				scale: 1.25,
				angle: 5,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '滕芳兰/拈花靛情/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '滕芳兰/拈花靛情/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '滕芳兰/拈花靛情/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
		tenggongzhu: {//滕公主
			莲心姝影: {
				name: '滕公主/莲心姝影/daiji2',
				x: [0, 0.38],
				y: [0, 0.4],
				scale: 1.05,
				angle: -5,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '滕公主/莲心姝影/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '滕公主/莲心姝影/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '滕公主/莲心姝影/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },	
		wanniangongzhu: {//万年公主
			长乐未央: {
				name: '万年公主/长乐未央/daiji2',
				x: [0, 0.37],
				y: [0, 0.35],
				scale: 1.1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '万年公主/长乐未央/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '万年公主/长乐未央/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '万年公主/长乐未央/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },	
		wangcan: {//王粲
			笔翰如流:{
				name: '王粲/笔翰如流/XingXiang',
				x: [0,1.28],
				y: [0,0],
				scale: 0.56,
				angle: -20,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '王粲/笔翰如流/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },	
		wangji: {//王基
			独秉固志:{
				name: '王基/独秉固志/XingXiang',
				x: [0,0.25],
				y: [0,0.33],
				scale: 0.48,
				angle: -22,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '王基/独秉固志/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
			时之彦士: {
				name: '王基/时之彦士/daiji2',
				x: [0, 0.38],
				y: [0, 0.44],
				scale: 0.85,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '王基/时之彦士/chuchang',
					scale: 0.5,
					action: 'play',
				},
				gongji: {
					name: '王基/时之彦士/chuchang',
					scale: 0.7,
					action: 'play',
				},
				beijing: {
					name: '王基/时之彦士/beijing',
					x: [0, 0.4],
					y: [0, 0.5],
					scale: 0.25,
				},
			},
        },	
		wanglang: {//王朗
			龙袭星落:{
				name: '王朗/龙袭星落/XingXiang',
				x: [0,0],
				y: [0,0.34],
				scale: 0.45,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '王朗/龙袭星落/BeiJing',
					scale: 0.25,
					x: [0, 1],
					y: [0, 0.5]
				},
			},	
			骧龙御宇: {
				name: '王朗/骧龙御宇/daiji2',
				x: [0, 0.48],
				y: [0, 0.4],
				scale: 1.05,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '王朗/骧龙御宇/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '王朗/骧龙御宇/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '王朗/骧龙御宇/beijing',
					x: [0, -0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
		wangrong: {//王荣
			雪荣钟情:{
				name: '王荣/雪荣钟情/xingxiang',
				version:"4.0",
				x: [0,0.65],
				y: [0,0.37],
				scale: 1,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '王荣/雪荣钟情/beijing',
					version:"4.0",
					scale: 1,
					x: [0, 0.65],
					y: [0, 0.37]
				},
			},
		},
		wangtao: {//王桃
			春悦桃秾: {
				name: '王桃/春悦桃秾/daiji2',
				x: [0, 0.5],
				y: [0, 0.36],
				scale: 1.1,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '王桃/春悦桃秾/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '王桃/春悦桃秾/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '王桃/春悦桃秾/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },	
		wangyi: {//王异	
			花好月圆: {
				name: '王异/花好月圆/daiji2',
				x: [0, 0.45],
				y: [0, 0.6],
				scale: 0.7,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '王异/花好月圆/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '王异/花好月圆/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '王异/花好月圆/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.25,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '王异/花好月圆/JiSha',
						x: [0, 0.5],
						version:"4.0",
						scale: 1.1,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
			绝色异彩: {
				name: '王异/绝色异彩/daiji2',
				x: [0, 0.32],
				y: [0, 0.45],
				scale: 0.84,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '王异/绝色异彩/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '王异/绝色异彩/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '王异/绝色异彩/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.25,
				},
			},
	    },
		wangyuanji: {//王元姬
			鼠年冬至:{
				name: '王元姬/鼠年冬至/XingXiang',
				x: [0,0.22],
				y: [0,0.58],
				scale: 0.58,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '王元姬/鼠年冬至/Beijing',
					scale: 0.3,
					x: [0, 0.1],
					y: [0, 0.5]
				},
			},	
		},
        wangyue: {//王悦
			春悦桃秾: {
				name: '王悦/春悦桃秾/daiji2',
				x: [0, 0.5],
				y: [0, 0.34],
				scale: 1.1,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '王悦/春悦桃秾/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '王悦/春悦桃秾/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '王悦/春悦桃秾/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
        wangyun: {//王允
			文和乱武: {
				name: '王允/文和乱武/daiji2',
				x: [0, 0.4],
				y: [0, 0.43],
				scale: 1.05,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '王允/文和乱武/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '王允/文和乱武/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '王允/文和乱武/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },	
		weiyan: {//魏延	
			麒麟生角:{
				name: '魏延/麒麟生角/XingXiang',
				x: [0,0.6],
				y: [0,0.26],
				scale: 0.52,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '魏延/麒麟生角/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        wenyang: {//文鸯
			神通法相:{
				name: '文鸯/神通法相/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,0.02],
				y: [0,0.26],
				scale: 1.2,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '文鸯/神通法相/jineng01',
					version:"4.0",
				    json: true,
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '文鸯/神通法相/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '文鸯/神通法相/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
			紫电清霜: {
				name: '文鸯/紫电清霜/daiji2',
				x: [0, 0.64],
				y: [0, 0.39],
				scale: 1.1,
				angle: 15,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '文鸯/紫电清霜/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '文鸯/紫电清霜/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '文鸯/紫电清霜/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
		wolongfengchu: {//卧龙凤雏
			赤壁链火:{
				name: '卧龙凤雏/赤壁链火/xingxiang',
				version:"4.0",
				x: [0,0.3],
				y: [0,0.5],
				scale: 0.6,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '卧龙凤雏/赤壁链火/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
			赤壁链火卧龙:{
				name: '卧龙凤雏/赤壁链火/xingxiang',
				version:"4.0",
				x: [0,0.95],
				y: [0,0.4],
				scale: 1.15,
				angle: 10,
                //speed: 1,
				beijing: {
					name: '卧龙凤雏/赤壁链火/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
			赤壁链火凤雏:{
				name: '卧龙凤雏/赤壁链火/xingxiang',
				version:"4.0",
				x: [0,-0.4],
				y: [0,0.23],
				scale: 1.25,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '卧龙凤雏/赤壁链火/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },
		wuguotai: {//吴国太
			雍容雅步: {
				name: '吴国太/雍容雅步/daiji2',
				x: [0, 0.42],
				y: [0, 0.55],
				scale: 0.68,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '吴国太/雍容雅步/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '吴国太/雍容雅步/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '吴国太/雍容雅步/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.25,
				},
			},	
		},
		wuxian: {//吴苋
			温婉华贵: {
				name: '吴苋/温婉华贵/daiji2',
				x: [0, 0.4],
				y: [0, 0.5],
				scale: 0.82,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '吴苋/温婉华贵/chuchang',
					scale: 0.85,
					action: 'play',
				},
				gongji: {
					name: '吴苋/温婉华贵/chuchang',
					scale: 1.05,
					action: 'play',
				},
				beijing: {
					name: '吴苋/温婉华贵/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },	
		wuyi: {//吴懿
			攻取雍凉: {
				name: '吴懿/攻取雍凉/daiji2',
				x: [0, 0.47],
				y: [0, 0.34],
				scale: 1.1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '吴懿/攻取雍凉/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '吴懿/攻取雍凉/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '吴懿/攻取雍凉/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},	
		},	
		wutugu: {//兀突骨
			鼠年春节:{
				name: '兀突骨/鼠年春节/XingXiang',
				x: [0,1.04],
				y: [0,0.12],
				scale: 0.5,
				angle: -10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '兀突骨/鼠年春节/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },	
		xizhicai: {//戏志才	
			举棋若定:{
				name: '戏志才/举棋若定/XingXiang',
				x: [0,0.5],
				y: [0,0.33],
				scale: 0.5,
				angle: -28,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '戏志才/举棋若定/BeiJing',
					scale: 0.3,
					angle: -28,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},	
		xiahoudun: {//夏侯惇	
			开疆烈血: {
				name: '夏侯惇/开疆烈血/daiji2',
				x: [0, 0.35],
				y: [0, 0.5],
				scale: 0.75,
				angle: 0,
                //speed: 1,
				gongji: {
					name: '夏侯惇/开疆烈血/chuchang',
					scale: 0.95,
					action: 'play',
				},
				beijing: {
					name: '夏侯惇/开疆烈血/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
        jin_xiahouhui: {//夏侯徽
			熠熠珠玉: {
				name: '夏侯徽/熠熠珠玉/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				action: 'play2',
				teshu: 'play3',
				chuchang: {action: 'play4', scale: 0.75},
				gongji: {action: 'play5', scale: 0.9},
				x: [0, 0.18],
				y: [0, 0.4],
				scale: 0.8,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '夏侯徽/熠熠珠玉/beijing',
					version:"4.0",
				    json: true,
				    action: 'play2',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.6,
				},
			},
        },
		xiahoushi: {//夏侯氏	
			明良千古:{
				name: '夏侯氏/明良千古/XingXiang',
				x: [0,0.3],
				y: [0,0.15],
				scale: 0.58,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '夏侯氏/明良千古/BeiJing',
					scale: 0.3,
					x: [0, 1.8],
					y: [0, 0.5]
				},
			},
			夏花绚烂: {
				name: '夏侯氏/夏花绚烂/daiji2',
				x: [0, 0.45],
				y: [0, 0.5],
				scale: 0.76,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '夏侯氏/夏花绚烂/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '夏侯氏/夏花绚烂/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '夏侯氏/夏花绚烂/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
			星春侯福: {
				name: '夏侯氏/星春侯福/daiji2',
				x: [0, 0.44],
				y: [0, 0.48],
				scale: 0.84,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '夏侯氏/星春侯福/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '夏侯氏/星春侯福/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '夏侯氏/星春侯福/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '夏侯氏/星春侯福/JiSha',
						x: [0, 0.47],
						version:"4.0",
						scale: 0.85,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},	
		xiahouyuan: {//夏侯渊	
			闪光速行: {
				name: '夏侯渊/闪光速行/daiji2',
				x: [0, 0.6],
				y: [0, 0.47],
				scale: 0.85,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '夏侯渊/闪光速行/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '夏侯渊/闪光速行/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '夏侯渊/闪光速行/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
		xiaoqiao: {//小乔
			采莲江南:{
				name: '小乔/采莲江南/XingXiang',
				x: [0,1.6],
				y: [0,0.32],
				scale: 0.45,
				angle: 10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '小乔/采莲江南/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
			花好月圆: {
				name: '小乔/花好月圆/daiji2',
				x: [0, 0.45],
				y: [0, 0.46],
				scale: 0.88,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '小乔/花好月圆/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '小乔/花好月圆/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '小乔/花好月圆/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.25,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '小乔/花好月圆/JiSha',
						x: [0, 0.47],
						version:"4.0",
						scale: 0.85,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},	
		xinxianying: {//辛宪英	
			鼠年春节:{
				name: '辛宪英/鼠年春节/XingXiang',
				x: [0,0.43],
				y: [0,0.42],
				scale: 0.36,
				angle: -30,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '辛宪英/鼠年春节/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},
        xuhuang: {//徐晃
			虚拟天团: {
				name: '徐晃/虚拟天团/daiji2',
				x: [0, 0.45],
				y: [0, 0.36],
				scale: 1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '徐晃/虚拟天团/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '徐晃/虚拟天团/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '徐晃/虚拟天团/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },	
		xurong: {//徐荣	
			烬灭神骇:{
				name: '徐荣/烬灭神骇/XingXiang',
				x: [0,0.6],
				y: [0,0.36],
				scale: 0.4,
				angle: -20,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '徐荣/烬灭神骇/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			文和乱武: {
				name: '徐荣/文和乱武/daiji2',
				x: [0, 0.45],
				y: [0, 0.57],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '徐荣/文和乱武/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '徐荣/文和乱武/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '徐荣/文和乱武/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },	
		xusheng: {//徐盛	
			云涯徐盛:{
				name: '徐盛/云涯徐盛/luobo-nianghuadabao',
				x: [20,0.35],
				y: [-45,0.15],
				scale: 0.14,
				background: '徐盛/云涯徐盛/beijing.png',
				skinName: "云涯徐盛"
			},			
			破军杀将:{
				name: '徐盛/破军杀将/XingXiang',
				x: [0,0.3],
				y: [0,-0.03],
				scale: 0.68,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '徐盛/破军杀将/BeiJing',
					scale: 0.3,
					x: [0, 1],
					y: [0, 0.5]
				},
			},
		},	
		xushi: {//徐氏	
			为夫弑敌: {
				name: '徐氏/为夫弑敌/daiji2',
				x: [0, 0.27],
				y: [0, 0.52],
				scale: 0.85,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '徐氏/为夫弑敌/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '徐氏/为夫弑敌/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '徐氏/为夫弑敌/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
		xuzhu: {//许褚
			武动乾坤: {
				name: '许褚/武动乾坤/daiji2',
				x: [0, 0.47],
				y: [0, 0.54],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '许褚/武动乾坤/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '许褚/武动乾坤/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '许褚/武动乾坤/beijing',
					x: [0, 0.65],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '许褚/武动乾坤/JiSha',
						x: [0, 0.42],
						version:"4.0",
						scale: 0.94,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},	
		xuyou: {//许攸	
			逆转官渡: {
				name: '许攸/逆转官渡/daiji2',
				x: [0, 0.41],
				y: [0, 0.44],
				scale: 1.05,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '许攸/逆转官渡/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '许攸/逆转官渡/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '许攸/逆转官渡/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},			
			盛气凌人:{
				name: '许攸/盛气凌人/XingXiang',
				x: [0,0.64],
				y: [0,-0.1],
				scale: 0.74,
				angle: 10,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '许攸/盛气凌人/BeiJing',
					scale: 0.25,
					x: [0, 0.8],
					y: [0, 0.5]
				},
			},
        },
        xuangongzhu: {//宣公主
			鹊夜同心:{
				name: '宣公主/鹊夜同心/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,0.55],
				y: [0,0.22],
				scale: 1.1,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '宣公主/鹊夜同心/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.1,
					action: 'play',
				},
				gongji: {
					name: '宣公主/鹊夜同心/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.3,
					action: 'play',
				},
				beijing: {
					name: '宣公主/鹊夜同心/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				zhishixian: {
					name: '宣公主/鹊夜同心/jineng02',
					version:"4.0",
				    json: true,
					scale: 0.6,
					speed: 0.8,
					delay: 0.4,
				},
			},
        },
		xunyu: {//荀彧	
			驱虎吞狼:{
				name: '荀彧/驱虎吞狼/XingXiang',
				x: [0,1.35],
				y: [0,0.08],
				scale: 0.54,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '荀彧/驱虎吞狼/BeiJing',
					scale: 0.25,
					x: [0, 0.1],
					y: [0, 0.5]
				},
			},
			谋定天下: {
				name: '荀彧/谋定天下/daiji2',
				x: [0, 0.4],
				y: [0, 0.54],
				scale: 0.73,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '荀彧/谋定天下/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '荀彧/谋定天下/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '荀彧/谋定天下/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        xunyou: {//荀攸
			十二奇策: {
				name: '荀攸/十二奇策/daiji2',
				x: [0, 0.44],
				y: [0, 0.5],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '荀攸/十二奇策/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '荀攸/十二奇策/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '荀攸/十二奇策/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
        yanfuren: {//严夫人
			长乐未央: {
				name: '严夫人/长乐未央/daiji2',
				shan: 'play3',
				x: [0, 0.4],
				y: [0, 0.4],
				scale: 1.05,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '严夫人/长乐未央/chuchang',
					action: 'play',
					scale: 0.75,
				},
				gongji: {
					name: '严夫人/长乐未央/chuchang2',
					action: 'gongji',
					scale: 0.75,
				},
				teshu: {
					name: '严夫人/长乐未央/chuchang2',
					action: 'jineng',
					scale: 0.75,
				},
				beijing: {
					name: '严夫人/长乐未央/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '严夫人/长乐未央/shouji2',
					scale: 0.5,
					speed: 0.8,
					delay: 0.4,
					effect: {
						name: '严夫人/长乐未央/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.5,
					},
				},
			},
        },
		jin_yanghuiyu: {//羊徽瑜
			璟瑜荷徽:{
				name: '羊徽瑜/璟瑜荷徽/xingxiang',
				version:"4.0",
				x: [0,0.41],
				y: [0,0.24],
				scale: 0.95,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '羊徽瑜/璟瑜荷徽/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},	
			牛年中秋:{
				name: '羊徽瑜/牛年中秋/XingXiang',
				x: [0,-0.3],
				y: [0,0.58],
				scale: 0.45,
				angle: 10,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '羊徽瑜/牛年中秋/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},	
		yangbiao: {//杨彪
			忧心国事:{
				name: '杨彪/忧心国事/XingXiang',
				x: [0,0.29],
				y: [0,0.38],
				scale: 0.48,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '杨彪/忧心国事/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        yangxiu: {//杨修
			字字珠玑: {
				name: '杨修/字字珠玑/daiji2',
				x: [0, 0.36],
				y: [0, 0.5],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '杨修/字字珠玑/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '杨修/字字珠玑/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '杨修/字字珠玑/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.25,
				},
			},
        },
        yangwan: {//杨婉
			明良千古:{
				name: '杨婉/明良千古/XingXiang',
				x: [0,-0.4],
				y: [0,0.26],
				scale: 0.52,
				angle: 0,
                //speed: 1,
			    action: 'DaiJi',
				beijing: {
					name: '杨婉/明良千古/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
		},
        yangyan: {//杨艳
			妍芷艳质:{
				name: '杨艳/妍芷艳质/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,0.42],
				y: [0,0.32],
				scale: 0.85,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '杨艳/妍芷艳质/jineng01',
					version:"4.0",
				    json: true,
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '杨艳/妍芷艳质/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '杨艳/妍芷艳质/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				zhishixian: {
					name: '杨艳/妍芷艳质/jineng02',
					version:"4.0",
				    json: true,
					scale: 0.6,
					speed: 0.7,
					delay: 0.4,
				},
			},
        },
        yangyi: {//杨仪
			狷狭激愤:{
				name: '杨仪/狷狭激愤/xingxiang',
				version:"4.0",
				json: true,
				x: [0,0.13],
				y: [0,0.12],
				scale: 1.1,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '杨仪/狷狭激愤/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },
        yangzhi: {//杨芷
			妍芷艳质:{
				name: '杨芷/妍芷艳质/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,0.4],
				y: [0,0.4],
				scale: 0.8,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '杨芷/妍芷艳质/jineng01',
					version:"4.0",
				    json: true,
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '杨芷/妍芷艳质/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '杨芷/妍芷艳质/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				zhishixian: {
					name: '杨芷/妍芷艳质/jineng02',
					version:"4.0",
				    json: true,
					scale: 0.6,
					speed: 0.7,
					delay: 0.4,
				},
			},
        },	
        yujin: {//于禁
			威严毅重:{
				name: '于禁/威严毅重/XingXiang',
				x: [0,0.25],
				y: [0,0.3],
				scale: 0.4,
				angle: 10,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '于禁/威严毅重/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },	
		ol_yuanshao: {//袁绍	
			一往无前:{
				name: '袁绍/一往无前/XingXiang',
				x: [0,0.26],
				y: [0,-0.25],
				scale: 0.78,
				angle: -25,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '袁绍/一往无前/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        yuantanyuanshang: {//袁谭袁尚
			常棣失华:{
				name: '袁谭袁尚/常棣失华/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,0.45],
				y: [0,0.55],
				scale: 0.4,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '袁谭袁尚/常棣失华/jineng01',
					version:"4.0",
				    json: true,
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '袁谭袁尚/常棣失华/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '袁谭袁尚/常棣失华/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.7],
					y: [0, 0.5]
				},
			},
        },
		zhangbao: {//张宝
			苍天已死:{
				name: '张宝/苍天已死/XingXiang',
				x: [0,0.38],
				y: [0,-0.13],
				scale: 0.65,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '张宝/苍天已死/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },	
		zhangchangpu: {//张昌蒲	
			钟桂香蒲: {
				name: '张昌蒲/钟桂香蒲/daiji2',
				x: [0, 0.45],
				y: [0, 0.55],
				scale: 0.78,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张昌蒲/钟桂香蒲/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '张昌蒲/钟桂香蒲/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '张昌蒲/钟桂香蒲/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
		zhangchunhua: {//张春华	
			雪中舞刃:{
				name: '张春华/雪中舞刃/XingXiang',
				x: [0,-0.1],
				y: [0,0.37],
				scale: 0.4,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '张春华/雪中舞刃/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			绰约多姿: {
				name: '张春华/绰约多姿/daiji2',
				x: [0, 0.5],
				y: [0, 0.5],
				scale: 0.88,
				angle: 10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张春华/绰约多姿/chuchang',
					scale: 0.65,
					action: 'play',
				},
				gongji: {
					name: '张春华/绰约多姿/chuchang',
					scale: 0.85,
					action: 'play',
				},
				beijing: {
					name: '张春华/绰约多姿/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},	
		zhangfei: {//张飞	
			明良千古:{
				name: '张飞/明良千古/XingXiang',
				x: [0,0.2],
				y: [0,0.35],
				scale: 0.48,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '张飞/明良千古/BeiJing',
					scale: 0.25,
					x: [0, 1.1],
					y: [0, 0.5]
				},
			},
			武动乾坤: {
				name: '张飞/武动乾坤/daiji2',
				x: [0, 0.45],
				y: [0, 0.5],
				scale: 0.78,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张飞/武动乾坤/chuchang',
					scale: 1.2,
					action: 'play',
				},
				gongji: {
					name: '张飞/武动乾坤/chuchang',
					scale: 1.4,
					action: 'play',
				},
				beijing: {
					name: '张飞/武动乾坤/beijing',
					x: [0, 0.3],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '张飞/武动乾坤/JiSha',
						x: [0, 0.4],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 1.9,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
        zhanggong: {//张恭
			逐鹿天下: {
				name: '张恭/逐鹿天下/daiji2',
				x: [0, 0.41],
				y: [0, 0.52],
				scale: 0.78,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张恭/逐鹿天下/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '张恭/逐鹿天下/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '张恭/逐鹿天下/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },	
		zhanghe: {//张郃
			背水一战:{
				name: '张郃/背水一战/XingXiang',
				x: [0,0.32],
				y: [0,0.37],
				scale: 0.45,
				angle: 10,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '张郃/背水一战/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
		},
        zhangji: {//张济
			文和乱武: {
				name: '张济/文和乱武/daiji2',
				x: [0, 0.37],
				y: [0, 0.36],
				scale: 1.1,
				angle: -5,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张济/文和乱武/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '张济/文和乱武/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '张济/文和乱武/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },	
		sp_zhangjiao: {//张角	
			黄天当立:{
				name: '张角/黄天当立/XingXiang',
				x: [0,0.28],
				y: [0,0.48],
				scale: 0.55,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '张角/黄天当立/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
		},
        zhangjinyun: {//张瑾云
			经典形象:{
				name: '张瑾云/祈福/SF_qifu_eff_zhanghuanghou',
				x: [0,2.35],
				y: [0,0.3],
				scale: 0.55,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '董贵人/春殿踏水/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },	
		zhangliao: {//张辽
			登锋陷阵:{
				name: '张辽/登锋陷阵/XingXiang',
				x: [0,0.58],
				y: [0,-0.07],
				scale: 0.62,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '张辽/登锋陷阵/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
			武动乾坤: {
				name: '张辽/武动乾坤/daiji2',
				x: [0, 0.35],
				y: [0, 0.53],
				scale: 0.8,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张辽/武动乾坤/chuchang',
					scale: 1.1,
					action: 'play',
				},
				gongji: {
					name: '张辽/武动乾坤/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '张辽/武动乾坤/beijing',
					x: [0, 0.2],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '张辽/武动乾坤/JiSha',
						x: [0, 0.4],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
        },
        zhangling: {//张陵
            篆符敕星:{
				name: '张陵/篆符敕星/xingxiang',
				version:"4.0",
				json: true,
				x: [0,0.81],
				y: [0,0.32],
				scale: 1,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '张陵/篆符敕星/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },	
		zhanglu: {//张鲁
			虎年冬至:{
				name: '张鲁/虎年冬至/XingXiang',
				x: [0,0.14],
				y: [0,0.66],
				scale: 0.4,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '张鲁/虎年冬至/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},	
		},	
		zhangqiying: {//张琪瑛	
			九州春回: {
				name: '张琪瑛/九州春回/daiji2',
				shan: 'play3',
				x: [0, 0.5],
				y: [0, 0.38],
				scale: 1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张琪瑛/九州春回/chuchang',
					action: 'play',
					scale: 0.7,
				},
				gongji: {
					name: '张琪瑛/九州春回/chuchang2',
					action: 'gongji',
					scale: 0.7,
				},
				teshu: {
					name: '张琪瑛/九州春回/chuchang2',
					action: 'jineng',
					scale: 0.7,
				},
				audio: {
					skill: '张琪瑛/九州春回/audio',
				},
				beijing: {
					name: '张琪瑛/九州春回/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '张琪瑛/九州春回/shouji2',
					scale: 0.7,
					speed: 0.8,
					delay: 0.2,
					effect: {
						name: '张琪瑛/九州春回/shouji',
						scale: 0.7,
						speed: 0.6,
						delay: 0.4,
					},
				},
				special: {
					变身: {
						hp: 2,
						name: 'zhangqiying/九州春回2',
					},
					condition: {
						lowhp: {
							transform: ['变身'],
							recover: true,
						},
					},
				},
			},
			九州春回2: {
				name: '张琪瑛/九州春回2/daiji2',
				shan: 'play3',
				x: [0, 0.15],
				y: [0, 0.35],
				scale: 1.1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张琪瑛/九州春回2/chuchang',
					action: 'play',
					scale: 0.9,
				},
				gongji: {
					name: '张琪瑛/九州春回2/chuchang2',
					action: 'gongji',
					scale: 0.7,
				},
				teshu: {
					name: '张琪瑛/九州春回2/chuchang2',
					action: 'jineng',
					scale: 0.7,
				},
				audio: {
					skill: '张琪瑛/九州春回2/audio',
				},
				beijing: {
					name: '张琪瑛/九州春回2/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '张琪瑛/九州春回2/shouji2',
					scale: 0.6,
					speed: 0.8,
					delay: 0.2,
					effect: {
						name: '张琪瑛/九州春回2/shouji',
						scale: 0.7,
						speed: 0.6,
						delay: 0.5,
					},
				},
			},
		},
        zhangsong: {//张松
			沃鲤泽汉:{
				name: '张松/沃鲤泽汉/xingxiang',
				version:"4.0",
				json: true,
				x: [0,-0.9],
				y: [0,0.05],
				scale: 1.1,
				angle: 10,
                //speed: 1,
				beijing: {
					name: '张松/沃鲤泽汉/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },	
		zhangrang: {//张让
			窃政聚敛: {
				name: '张让/窃政聚敛/daiji2',
				x: [0, 0.41],
				y: [0, 0.45],
				scale: 0.95,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '张让/窃政聚敛/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },	
		zhangxingcai: {//张星彩	
			临军对阵:{
				name: '张星彩/临军对阵/XingXiang',
				x: [0,0.92],
				y: [0,0.3],
				scale: 0.48,
				angle: 0,
                //speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '张星彩/临军对阵/BeiJing',
					scale: 0.3,
					x: [0, -0.55],
					y: [0, 0.4]
				},
			},
			星春侯福: {
				name: '张星彩/星春侯福/daiji2',
				x: [0, 0.45],
				y: [0, 0.45],
				scale: 0.88,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张星彩/星春侯福/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '张星彩/星春侯福/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '张星彩/星春侯福/beijing',
					x: [0, 0],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '张星彩/星春侯福/JiSha',
						x: [0, 0.47],
						version:"4.0",
						scale: 0.85,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
        zhangxiu: {//张绣
			龙骧虎视: {
				name: '张绣/龙骧虎视/daiji2',
				x: [0, 0.4],
				y: [0, 0.51],
				scale: 0.78,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张绣/龙骧虎视/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '张绣/龙骧虎视/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '张绣/龙骧虎视/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        zhangxuan: {//张嫙
			双姝绰约: {
				name: '张嫙/双姝绰约/daiji2',
				shan: 'play3',
				x: [0, 0.4],
				y: [0, 0.34],
				scale: 1.15,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张嫙/双姝绰约/chuchang',
					action: 'play',
					scale: 0.7,
				},
				gongji: {
					name: '张嫙/双姝绰约/chuchang2',
					action: 'gongji',
					scale: 0.8,
				},
				teshu: {
					name: '张嫙/双姝绰约/chuchang2',
					action: 'jineng',
					scale: 0.8,
				},
				beijing: {
					name: '张嫙/双姝绰约/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
				zhishixian: {
					name: '张嫙/双姝绰约/shouji2',
					scale: 0.5,
					speed: 1.3,
					delay: 0.3,
					effect: {
						name: '张嫙/双姝绰约/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.35,
					},
				},
			},
        },
        zhangyao: {//张媱
			双姝绰约: {
				name: '张媱/双姝绰约/daiji2',
				shan: 'play3',
				x: [0, 0.5],
				y: [0, 0.35],
				scale: 1.1,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '张媱/双姝绰约/chuchang',
					action: 'play',
					scale: 0.7,
				},
				gongji: {
					name: '张媱/双姝绰约/chuchang2',
					action: 'gongji',
					scale: 0.7,
				},
				teshu: {
					name: '张媱/双姝绰约/chuchang2',
					action: 'jineng',
					scale: 0.7,
				},
				beijing: {
					name: '张媱/双姝绰约/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
				zhishixian: {
					name: '张媱/双姝绰约/shouji2',
					scale: 0.5,
					speed: 1.2,
					delay: 0.5,
					effect: {
						name: '张媱/双姝绰约/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.5,
					},
				},
			},
        },
        zhangyì: {//张翼
			锐不可当:{
				name: '张翼/锐不可当/XingXiang',
				x: [0,0.6],
				y: [0,0.5],
				scale: 0.35,
				angle: 20,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '张翼/锐不可当/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        zhaoxiang: {//赵襄
			芳芷飒敌: {
				name: '赵襄/芳芷飒敌/daiji2',
				x: [0, 0.4],
				y: [0, 0.5],
				scale: 0.98,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '赵襄/芳芷飒敌/chuchang',
					scale: 0.75,
					action: 'play',
				},
				gongji: {
					name: '赵襄/芳芷飒敌/chuchang',
					scale: 0.95,
					action: 'play',
				},
				beijing: {
					name: '赵襄/芳芷飒敌/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        zhaoyan: {//赵嫣
			彩绘芳菲: {
				name: '赵嫣/彩绘芳菲/daiji2',
				x: [0, 0.45],
				y: [0, 0.45],
				scale: 0.9,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '赵嫣/彩绘芳菲/chuchang',
					action: 'play',
					scale: 0.85,
				},
				gongji: {
					name: '赵嫣/彩绘芳菲/chuchang',
					action: 'play',
					scale: 0.95,
				},
				beijing: {
					name: '赵嫣/彩绘芳菲/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '赵嫣/彩绘芳菲/shouji2',
					scale: 0.7,
					speed: 0.8,
					delay: 0.4,
					effect: {
						name: '赵嫣/彩绘芳菲/shouji',
						scale: 0.6,
						speed: 0.8,
						delay: 0.4,
					},
				},
			},
        },
        zhaoyǎn: {//赵俨
			遐迩一体:{
				name: '赵俨/遐迩一体/xingxiang',
				version:"4.0",
				json: true,
				shizhounian: true,
				x: [0,1.25],
				y: [0,0.25],
				scale: 1.1,
				angle: 10,
                //speed: 1,
				chuchang: {
					name: '赵俨/遐迩一体/jineng01',
					version:"4.0",
				    json: true,
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '赵俨/遐迩一体/jineng01',
					version:"4.0",
				    json: true,
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '赵俨/遐迩一体/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.7],
					y: [0, 0.5]
				},
			},
        },	
		zhaoyun: {//赵云	
			明良千古:{
				name: '赵云/明良千古/XingXiang',
				x: [0,0.17],
				y: [0,0.22],
				scale: 0.54,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '赵云/明良千古/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			单骑救主:{
				name: '赵云/单骑救主/XingXiang',
				x: [0,0.58],
				y: [0,0.58],
				scale: 0.45,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '赵云/单骑救主/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			武动乾坤: {
				name: '赵云/武动乾坤/daiji2',
				shan: 'play3',
				x: [0, 0.41],
				y: [0, 0.42],
				scale: 0.95,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '赵云/武动乾坤/chuchang',
					action: 'play',
					scale: 1,
				},
				gongji: {
					name: '赵云/武动乾坤/chuchang2',
					action: 'gongji',
					scale: 0.8,
				},
				teshu: {
					name: '赵云/武动乾坤/chuchang2',
					action: 'jineng',
					scale: 0.8,
				},
				beijing: {
					name: '赵云/武动乾坤/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				zhishixian: {
					name: '赵云/武动乾坤/shouji2',
					scale: 0.6,
					speed: 0.8,
					delay: 0.3,
					effect: {
						name: '赵云/武动乾坤/shouji',
						scale: 0.5,
						speed: 0.8,
						delay: 0.3,
					},
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '赵云/武动乾坤/JiSha',
						x: [0, 0.44],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},	
		zhenji: {//甄姬
			才颜双绝: {
				name: '甄姬/才颜双绝/daiji2',
				x: [0, 0.39],
				y: [0, 0.68],
				scale: 0.75,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '甄姬/才颜双绝/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
			花好月圆: {
				name: '甄姬/花好月圆/daiji2',
				x: [0, 0.15],
				y: [0, 0.42],
				scale: 0.74,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '甄姬/花好月圆/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '甄姬/花好月圆/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '甄姬/花好月圆/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
				special: {
					击杀: {
					},
					jisha: {
						name: '甄姬/花好月圆/JiSha',
						x: [0, 0.48],
						version:"4.0",
						scale: 0.9,
						speed: 1,
						delay: 2,
					},
					condition: {
						jisha: {
							transform: "击杀",
							play: 'jisha',
						},
					},
				},
			},
		},
		zhonghui: {//钟会	
			潜蛟觊天:{
				name: '钟会/潜蛟觊天/XingXiang',
				x: [0,-0.7],
				y: [0,0.38],
				scale: 0.45,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '钟会/潜蛟觊天/BeiJing',
					scale: 0.3,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				audio: {
					skill: '钟会/潜蛟觊天/audio',
					card: '钟会/潜蛟觊天/audio',
				},
				special: {
					觉醒: {
						name: 'zhonghui/潜蛟觊天2',
					},
					condition: {
						juexingji: {
							transform: "觉醒",
							effect: 'shaohui',
							//play: 'play',
						},
					},
				},
			},
			潜蛟觊天2:{
				name: '钟会/潜蛟觊天2/XingXiang-1',
				x: [0,-1],
				y: [0,0.4],
				gongji: {
					x: [0, 0.4],
				},
				scale: 0.5,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				audio: {
					skill: '钟会/潜蛟觊天2/audio',
					card: '钟会/潜蛟觊天2/audio',
				},
				beijing: {
					name: '钟会/潜蛟觊天2/BeiJing-1',
					scale: 0.3,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
		},	
		zhongyao: {//钟繇	
			挥毫代诏: {
				name: '钟繇/挥毫代诏/daiji2',
				x: [0, 0.42],
				y: [0, 0.58],
				scale: 0.75,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '钟繇/挥毫代诏/chuchang',
					scale: 0.8,
					action: 'play',
				},
				gongji: {
					name: '钟繇/挥毫代诏/chuchang',
					scale: 1,
					action: 'play',
				},
				beijing: {
					name: '钟繇/挥毫代诏/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        zhongyan: {//钟琰
			雪荣钟情:{
				name: '钟琰/雪荣钟情/xingxiang',
				version:"4.0",
				x: [0,1.22],
				y: [0,0.11],
				scale: 1.45,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '钟琰/雪荣钟情/jineng01',
					version:"4.0",
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '钟琰/雪荣钟情/jineng01',
					version:"4.0",
					scale: 0.9,
					action: 'play',
				},
				zhishixian: {
					name: '钟琰/雪荣钟情/jineng02',
					version:"4.0",
					scale: 0.5,
					speed: 0.5,
					delay: 0.4,
				},
				beijing: {
					name: '钟琰/雪荣钟情/beijing',
					version:"4.0",
					scale: 1.45,
					x: [0, 1.22],
					y: [0, 0.11]
				},
			},
        },
        zhouchu: {//周处
			擎苍寻猎:{
				name: '周处/擎苍寻猎/xingxiang',
				version:"4.0",
				json: true,
				x: [0,1.55],
				y: [0,0.05],
				scale: 1,
				angle: -30,
                //speed: 1,
				gongji: {
					name: '周处/擎苍寻猎/jineng01',
					version:"4.0",
				    json: true,
				    x: [0,0.5],
				    y: [0,0.4],
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '周处/擎苍寻猎/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },	
		zhoufang: {//周鲂
			带军鄱阳: {
				name: '周鲂/带军鄱阳/daiji2',
				x: [0, 0.35],
				y: [0, 0.44],
				scale: 0.85,
				angle: -10,
                //speed: 1,
				beijing: {
					name: '周鲂/带军鄱阳/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},	
		zhoufei: {//周妃	
			箜篌箜声: {
				name: '周妃/箜篌箜声/daiji2',
				x: [0, 0.47],
				y: [0, 0.62],
				scale: 0.78,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '周妃/箜篌箜声/chuchang',
					scale: 0.9,
					action: 'play',
				},
				gongji: {
					name: '周妃/箜篌箜声/chuchang',
					scale: 1.1,
					action: 'play',
				},
				beijing: {
					name: '周妃/箜篌箜声/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        zhouqun: {//周群
			瞻天瞩世:{
				name: '周群/瞻天瞩世/xingxiang',
				version:"4.0",
				json: true,
				x: [0,0.45],
				y: [0,0.3],
				scale: 1,
				angle: 0,
                //speed: 1,
				beijing: {
					name: '周群/瞻天瞩世/beijing',
					version:"4.0",
					json: true,
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
			},
        },
        zhouyi: {//周夷
			剑舞浏漓: {
				name: '周夷/剑舞浏漓/daiji2',
				x: [0, 0.16],
				y: [0, 0.49],
				scale: 0.92,
				angle: -22,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '周夷/剑舞浏漓/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '周夷/剑舞浏漓/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '周夷/剑舞浏漓/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },	
		zhouyu: {//周瑜	
            运筹帷幄:{
				name: '周瑜/运筹帷幄/XingXiang',
				x: [0,1.05],
				y: [0,0.3],
				scale: 0.35,
				angle: 0,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '周瑜/运筹帷幄/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
			谋定天下: {
				name: '周瑜/谋定天下/daiji2',
				x: [0, 0.37],
				y: [0, 0.5],
				scale: 0.78,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '周瑜/谋定天下/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '周瑜/谋定天下/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '周瑜/谋定天下/beijing',
					x: [0, 0.2],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
		},
        zhuran: {//朱然
			剑舞枫飞:{
				name: '朱然/剑舞枫飞/XingXiang',
				x: [0,1.03],
				y: [0,0.33],
				scale: 0.46,
				angle: -10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '朱然/剑舞枫飞/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        zhuhuan: {//朱桓
			领军袭敌: {
				name: '朱桓/领军袭敌/daiji2',
				x: [0, 0.35],
				y: [0, 0.4],
				scale: 1.05,
				angle: -5,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '朱桓/领军袭敌/chuchang',
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '朱桓/领军袭敌/chuchang',
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '朱桓/领军袭敌/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.4,
				},
			},
        },
        zhugeguo: {//诸葛果
			兰荷艾莲: {
				name: '诸葛果/兰荷艾莲/daiji2',
				x: [0, 0.4],
				y: [0, 0.52],
				scale: 0.75,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '诸葛果/兰荷艾莲/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '诸葛果/兰荷艾莲/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '诸葛果/兰荷艾莲/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
        zhugejin: {//诸葛瑾
			风雅神逸: {
				name: '诸葛瑾/风雅神逸/daiji',
				x: [0,0.45],
				y: [0,0.23],
				angle: -10,
				scale: 0.45,
                //speed: 1,
				beijing: {
					name: '诸葛瑾/风雅神逸/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
            },
        },
        zhugeke: {//诸葛恪
			白浪掀天:{
				name: '诸葛恪/白浪掀天/XingXiang',
				x: [0,1.22],
				y: [0,0.12],
				scale: 0.52,
				angle: 10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '诸葛恪/白浪掀天/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        zhugeliang: {//诸葛亮
			谋定天下: {
				name: '诸葛亮/谋定天下/daiji2',
				x: [0, 0.25],
				y: [0, 0.42],
				scale: 0.95,
				angle: -10,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '诸葛亮/谋定天下/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '诸葛亮/谋定天下/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '诸葛亮/谋定天下/beijing',
					x: [0, 0.35],
					y: [0, 0.5],
					scale: 0.25,
				},
			},
            明良千古:{
				name: '诸葛亮/明良千古/XingXiang',
				x: [0,-0.24],
				y: [0,0.3],
				scale: 0.42,
				angle: -10,
                speed: 1,
				action: 'DaiJi',
				beijing: {
					name: '诸葛亮/明良千古/BeiJing',
					scale: 0.3,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			},
        },
        zhugezhan: {//诸葛瞻
			绵竹之殇:{
				name: '诸葛瞻/绵竹之殇/XingXiang',
				x: [0,0.73],
				y: [0,0.1],
				scale: 0.52,
				angle: -10,
                //speed: 1,
				//action: 'DaiJi',
				beijing: {
					name: '诸葛瞻/绵竹之殇/BeiJing',
					scale: 0.25,
					x: [0, 0.4],
					y: [0, 0.5]
				},
			}, 
        }, 
        zhurong: {//祝融
			飞刀烈火: {
				name: '祝融/飞刀烈火/daiji2',
				x: [0, 0.35],
				y: [0, 0.55],
				scale: 0.78,
				angle: -15,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '祝融/飞刀烈火/chuchang',
					scale: 1,
					action: 'play',
				},
				gongji: {
					name: '祝融/飞刀烈火/chuchang',
					scale: 1.2,
					action: 'play',
				},
				beijing: {
					name: '祝融/飞刀烈火/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			}, 
        },
        zuofen: {//左棻
			凝脂铅华:{
				name: '左棻/凝脂铅华/xingxiang',
				version:"4.0",
				shizhounian: true,
				x: [0,0.5],
				y: [0,0.23],
				scale: 1,
				angle: 0,
                //speed: 1,
				chuchang: {
					name: '左棻/凝脂铅华/jineng01',
					version:"4.0",
					scale: 0.6,
					action: 'play',
				},
				gongji: {
					name: '左棻/凝脂铅华/jineng01',
					version:"4.0",
					scale: 0.8,
					action: 'play',
				},
				beijing: {
					name: '左棻/凝脂铅华/beijing',
					version:"4.0",
					scale: 0.6,
					x: [0, 0.5],
					y: [0, 0.5]
				},
				zhishixian: {
					name: '左棻/凝脂铅华/jineng03',
					version:"4.0",
					scale: 0.6,
					speed: 0.7,
					delay: 0.4,
				},
			},
		}, 
        zuoci: {//左慈
			仙人之怒: {
				name: '左慈/仙人之怒/daiji2',
				x: [0, 0.4],
				y: [0, 0.45],
				scale: 0.8,
				angle: 0,
                //speed: 1,
                shizhounian: true,
                chuchang: {
					name: '左慈/仙人之怒/chuchang',
					scale: 0.7,
					action: 'play',
				},
				gongji: {
					name: '左慈/仙人之怒/chuchang',
					scale: 0.9,
					action: 'play',
				},
				beijing: {
					name: '左慈/仙人之怒/beijing',
					x: [0, 0.5],
					y: [0, 0.5],
					scale: 0.3,
				},
			},
        },
    };
    
    decadeUI.dynamicSkin = {};
    
    var skins = decadeUI.dynamicSkin;
    for (var name in skins) {
        for (var nameKey in skins[name]) {
            var skinss = skins[name][nameKey];
            if (!skinss.skinName) skinss.skinName = nameKey;
        }
    }

var extend = {//共用
		//鲍三娘
        re_baosanniang: decadeUI.dynamicSkin.baosanniang,
        xin_baosanniang: decadeUI.dynamicSkin.baosanniang,
        
		//卑弥呼
        tw_beimihu: decadeUI.dynamicSkin.beimihu,
        
        //卞夫人
        ol_bianfuren: decadeUI.dynamicSkin.bianfuren,
        sp_bianfuren: decadeUI.dynamicSkin.bianfuren,
        tw_bianfuren: decadeUI.dynamicSkin.bianfuren,

        //步练师
        re_bulianshi: decadeUI.dynamicSkin.bulianshi,
        dc_bulianshi: decadeUI.dynamicSkin.bulianshi,
        old_bulianshi: decadeUI.dynamicSkin.bulianshi,
        
        //蔡夫人
        re_caifuren: decadeUI.dynamicSkin.caifuren,
        xin_caifuren: decadeUI.dynamicSkin.caifuren,

        //蔡文姬
        ol_caiwenji: decadeUI.dynamicSkin.caiwenji,
        re_caiwenji: decadeUI.dynamicSkin.caiwenji,
        sp_caiwenji: decadeUI.dynamicSkin.caiwenji,
        yue_caiwenji: decadeUI.dynamicSkin.caiwenji,
        
        //蔡邕
        re_caiyong:decadeUI.dynamicSkin.caiyong,

        //曹操
        re_caocao: decadeUI.dynamicSkin.caocao,
        sb_caocao: decadeUI.dynamicSkin.caocao,

        //曹丕
        re_caopi: decadeUI.dynamicSkin.caopi,

        //曹仁
        old_caoren: decadeUI.dynamicSkin.caoren,
        sp_caoren: decadeUI.dynamicSkin.caoren,
        sb_caoren: decadeUI.dynamicSkin.caoren,
        
        //曹嵩
        sp_caosong: decadeUI.dynamicSkin.caosong,

        //曹真
        re_caozhen: decadeUI.dynamicSkin.caozhen,
        xin_caozhen: decadeUI.dynamicSkin.caozhen,

        //曹植
        re_caozhi: decadeUI.dynamicSkin.caozhi,
        dc_caozhi: decadeUI.dynamicSkin.caozhi,
        
        //陈到
        ns_chendao: decadeUI.dynamicSkin.chendao,
        
        //陈登
        re_chendeng: decadeUI.dynamicSkin.chendeng,
        ol_chendeng: decadeUI.dynamicSkin.chendeng,
        
        //陈宫
        re_chengong: decadeUI.dynamicSkin.chengong,
        sb_chengong: decadeUI.dynamicSkin.chengong,
        
        //陈群
        re_chenqun: decadeUI.dynamicSkin.chenqun,
        dc_chenqun: decadeUI.dynamicSkin.chenqun,
        old_chenqun: decadeUI.dynamicSkin.chenqun,
        
        //大乔
        re_daqiao: decadeUI.dynamicSkin.daqiao,
        
        //大小乔
        decade_daxiaoqiao:decadeUI.dynamicSkin.daxiaoqiao,

        //邓艾
        ol_dengai: decadeUI.dynamicSkin.dengai,
        re_dengai: decadeUI.dynamicSkin.dengai,
        
        //邓芝
        re_dengzhi: decadeUI.dynamicSkin.dengzhi,
        ol_dengzhi: decadeUI.dynamicSkin.dengzhi,
        tw_dengzhi: decadeUI.dynamicSkin.dengzhi,

        //典韦
        re_dianwei: decadeUI.dynamicSkin.dianwei,
        ol_dianwei: decadeUI.dynamicSkin.dianwei,

        //貂蝉
        re_diaochan: decadeUI.dynamicSkin.diaochan,
        sp_diaochan: decadeUI.dynamicSkin.diaochan,
        sb_diaochan: decadeUI.dynamicSkin.diaochan,
        
        //丁奉
        old_dingfeng: decadeUI.dynamicSkin.dingfeng,
        tw_dingfeng: decadeUI.dynamicSkin.dingfeng,

        //丁原
        ol_dingyuan: decadeUI.dynamicSkin.dingyuan,
        
        //董承
        re_dongcheng: decadeUI.dynamicSkin.dongcheng,

        //董白
        re_dongbai: decadeUI.dynamicSkin.dongbai,
        
        //董昭
        tw_dongzhao: decadeUI.dynamicSkin.ol_dongzhao,

        //董卓
        ol_dongzhuo: decadeUI.dynamicSkin.dongzhuo,
        re_dongzhuo: decadeUI.dynamicSkin.dongzhuo,
        sp_dongzhuo: decadeUI.dynamicSkin.dongzhuo,
        
        //杜预
        sp_duyu: decadeUI.dynamicSkin.duyu,

        //法正
        re_fazheng: decadeUI.dynamicSkin.xin_fazheng,
        sb_fazheng: decadeUI.dynamicSkin.xin_fazheng,
        
        //冯妤//冯芳女
        re_fengfangnv: decadeUI.dynamicSkin.fengfangnv,

        //伏皇后
        re_fuhuanghou: decadeUI.dynamicSkin.fuhuanghou,
        sp_fuhuanghou: decadeUI.dynamicSkin.fuhuanghou,
        xin_fuhuanghou: decadeUI.dynamicSkin.fuhuanghou,

        //甘宁
        re_ganning: decadeUI.dynamicSkin.ganning,
        sb_ganning: decadeUI.dynamicSkin.ganning,
        yj_ganning: decadeUI.dynamicSkin.ganning,

        //公孙渊
        re_gongsunyuan: decadeUI.dynamicSkin.gongsunyuan,

        //关平
        re_guanping: decadeUI.dynamicSkin.guanping,
        
        //关索
        ol_guansuo: decadeUI.dynamicSkin.guansuo,

        //关羽
        re_guanyu: decadeUI.dynamicSkin.guanyu,
        jsp_guanyu: decadeUI.dynamicSkin.guanyu,
        
        //毌丘俭
        re_guanqiujian: decadeUI.dynamicSkin.guanqiujian,
        old_guanqiujian: decadeUI.dynamicSkin.guanqiujian,
        tw_guanqiujian: decadeUI.dynamicSkin.guanqiujian,

        //郭皇后
        re_guohuanghou: decadeUI.dynamicSkin.guohuanghou,

        //郭嘉
        re_guojia: decadeUI.dynamicSkin.guojia,
        
        //贺齐
        re_heqi: decadeUI.dynamicSkin.heqi,
        
        //胡金定
        dc_hujinding: decadeUI.dynamicSkin.hujinding,

        //花鬘
        sp_huaman: decadeUI.dynamicSkin.huaman,

        //华佗
        re_huatuo: decadeUI.dynamicSkin.huatuo,

        //华雄
        old_huaxiong: decadeUI.dynamicSkin.huaxiong,
        re_huaxiong: decadeUI.dynamicSkin.huaxiong,
        sb_huaxiong: decadeUI.dynamicSkin.huaxiong,
        
        //皇甫嵩
        sp_huangfusong: decadeUI.dynamicSkin.huangfusong,
        
        //黄承彦
        dc_huangchengyan: decadeUI.dynamicSkin.huangchengyan,
        ns_huangchengyan: decadeUI.dynamicSkin.huangchengyan,

        //黄盖
        re_huanggai: decadeUI.dynamicSkin.huanggai,
        sb_huanggai: decadeUI.dynamicSkin.huanggai,

        //黄月英
        re_huangyueying: decadeUI.dynamicSkin.huangyueying,
        jsp_huangyueying: decadeUI.dynamicSkin.huangyueying,

        //黄忠
        re_huangzhong: decadeUI.dynamicSkin.huangzhong,
        yj_huangzhong: decadeUI.dynamicSkin.huangzhong,
        sb_huangzhong: decadeUI.dynamicSkin.huangzhong,
        ol_huangzhong: decadeUI.dynamicSkin.huangzhong,

        //李儒
        re_liru: decadeUI.dynamicSkin.liru,
        dc_liru: decadeUI.dynamicSkin.liru,
        xin_liru: decadeUI.dynamicSkin.liru,

        //贾诩
        re_jiaxu: decadeUI.dynamicSkin.jiaxu,
        sp_jiaxu: decadeUI.dynamicSkin.jiaxu,
        dc_sp_jiaxu: decadeUI.dynamicSkin.jiaxu,
        ns_jiaxu: decadeUI.dynamicSkin.jiaxu,

        //姜维
        ol_jiangwei: decadeUI.dynamicSkin.jiangwei,
        re_jiangwei: decadeUI.dynamicSkin.jiangwei,
        sp_jiangwei: decadeUI.dynamicSkin.jiangwei,
        sb_jiangwei: decadeUI.dynamicSkin.jiangwei,

        //蒋干
        sp_jianggan: decadeUI.dynamicSkin.jianggan,

        //凌统
        re_lingtong: decadeUI.dynamicSkin.lingtong,
        xin_lingtong: decadeUI.dynamicSkin.lingtong,

        //刘备
        re_liubei: decadeUI.dynamicSkin.liubei,
        sb_liubei: decadeUI.dynamicSkin.liubei,

        //刘表
        re_liubiao: decadeUI.dynamicSkin.liubiao,
        xin_liubiao: decadeUI.dynamicSkin.liubiao,

        //刘禅
        ol_liushan: decadeUI.dynamicSkin.liushan,
        re_liushan: decadeUI.dynamicSkin.liushan,
        
        //刘封
        re_liufeng: decadeUI.dynamicSkin.liufeng,

        //留赞
        re_liuzan: decadeUI.dynamicSkin.liuzan,

        //鲁肃
        re_lusu: decadeUI.dynamicSkin.ol_lusu,

        //陆逊
        re_luxun: decadeUI.dynamicSkin.luxun,

        //吕布
        re_lvbu: decadeUI.dynamicSkin.lvbu,
        
        //吕旷吕翔
        dc_lvkuanglvxiang: decadeUI.dynamicSkin.lvkuanglvxiang,

        //吕蒙
        re_lvmeng: decadeUI.dynamicSkin.lvmeng,
        sb_lvmeng: decadeUI.dynamicSkin.lvmeng,

        //马超
        re_machao: decadeUI.dynamicSkin.machao,
        sp_machao: decadeUI.dynamicSkin.machao,
        decade_sp_machao: decadeUI.dynamicSkin.machao,
        sb_machao: decadeUI.dynamicSkin.machao,

        //马岱
        re_madai: decadeUI.dynamicSkin.madai,
        old_madai: decadeUI.dynamicSkin.madai,
        
        //马钧
        old_majun: decadeUI.dynamicSkin.majun,
        
        //马良
        re_maliang: decadeUI.dynamicSkin.maliang,
        ol_maliang: decadeUI.dynamicSkin.maliang,
        old_maliang: decadeUI.dynamicSkin.maliang,
        tw_maliang: decadeUI.dynamicSkin.maliang,
        
        //孟获
        re_menghuo: decadeUI.dynamicSkin.menghuo,
        sp_menghuo: decadeUI.dynamicSkin.menghuo,

        //祢衡
        re_miheng: decadeUI.dynamicSkin.miheng,

        //南华老仙
        re_nanhualaoxian: decadeUI.dynamicSkin.nanhualaoxian,
        
        //潘凤
        re_panfeng: decadeUI.dynamicSkin.panfeng,

        //潘淑
        re_panshu: decadeUI.dynamicSkin.panshu,

        //庞德公
        re_pangdegong: decadeUI.dynamicSkin.pangdegong,
        th_pangdegong: decadeUI.dynamicSkin.pangdegong,

        //庞统
        ol_pangtong: decadeUI.dynamicSkin.pangtong,
        re_pangtong: decadeUI.dynamicSkin.pangtong,
        re_jsp_pangtong: decadeUI.dynamicSkin.pangtong,
        sb_pangtong: decadeUI.dynamicSkin.pangtong,

        //蒲元
        ol_puyuan: decadeUI.dynamicSkin.puyuan,
        
        //麴义
        re_quyi: decadeUI.dynamicSkin.quyi,

        //全琮
        re_quancong: decadeUI.dynamicSkin.quancong,
        xin_quancong: decadeUI.dynamicSkin.quancong,
        
        //芮姬
        dc_ruiji: decadeUI.dynamicSkin.ruiji,

        //神关羽
        tw_shen_guanyu: decadeUI.dynamicSkin.shen_guanyu,
        
        //神吕蒙
        tw_shen_lvmeng:decadeUI.dynamicSkin.shen_lvmeng,
        
        //司马师
        jin_simashi: decadeUI.dynamicSkin.simashi,
        
        //司马昭
        jin_simazhao: decadeUI.dynamicSkin.simazhao,

        //司马懿
        re_simayi: decadeUI.dynamicSkin.simayi,
        jin_simayi: decadeUI.dynamicSkin.simayi,

        //苏飞
        sp_sufei: decadeUI.dynamicSkin.xf_sufei,
        yj_sufei:decadeUI.dynamicSkin.xf_sufei,

        //孙策
        re_sunce: decadeUI.dynamicSkin.sunce,
        re_sunben: decadeUI.dynamicSkin.sunce,
        sb_sunce: decadeUI.dynamicSkin.sunce,
        
        //孙登
        re_sundeng:decadeUI.dynamicSkin.sundeng,
        
        //孙坚
        re_sunjian: decadeUI.dynamicSkin.sunjian,
        ol_sunjian: decadeUI.dynamicSkin.sunjian,
        ns_sunjian: decadeUI.dynamicSkin.sunjian,
        
        //孙亮
        old_sunliang:decadeUI.dynamicSkin.sunliang,

        //孙鲁班
        re_sunluban: decadeUI.dynamicSkin.sunluban,
        xin_sunluban: decadeUI.dynamicSkin.sunluban,

        //孙鲁育
        re_sunluyu: decadeUI.dynamicSkin.sunluyu,

        //孙权
        re_sunquan: decadeUI.dynamicSkin.sunquan,
        sb_sunquan: decadeUI.dynamicSkin.sunquan,

        //孙茹
        dc_sunru: decadeUI.dynamicSkin.sunru,

        //孙尚香
        re_sunshangxiang: decadeUI.dynamicSkin.sunshangxiang,
        sp_sunshangxiang: decadeUI.dynamicSkin.sunshangxiang,
        sb_sunshangxiang: decadeUI.dynamicSkin.sunshangxiang,

        //孙休
        re_sunxiu: decadeUI.dynamicSkin.sunxiu,
        xin_sunxiu: decadeUI.dynamicSkin.sunxiu,

        //孙翊
        re_sunyi: decadeUI.dynamicSkin.sunyi,
        
        //滕芳兰
        dc_tengfanglan: decadeUI.dynamicSkin.tengfanglan,

        //太史慈
        re_taishici: decadeUI.dynamicSkin.taishici,
        re_sp_taishici:decadeUI.dynamicSkin.taishici,
        sp_taishici: decadeUI.dynamicSkin.taishici,

        //王粲
        sp_wangcan: decadeUI.dynamicSkin.wangcan,

        //王荣
        ol_wangrong: decadeUI.dynamicSkin.wangrong,

        //王双
        sp_wangshuang: decadeUI.dynamicSkin.wangshuang,

        //王异
        re_wangyi: decadeUI.dynamicSkin.wangyi,
        
        //王元姬
        jin_wangyuanji: decadeUI.dynamicSkin.wangyuanji,

        //王允
        re_wangyun: decadeUI.dynamicSkin.wangyun,
        decade_wangyun:decadeUI.dynamicSkin.wangyun,

        //卫温诸葛直
        re_weiwenzhugezhi: decadeUI.dynamicSkin.weiwenzhugezhi,

        //文鸯
        db_wenyang: decadeUI.dynamicSkin.wenyang,

        //魏延
        re_weiyan: decadeUI.dynamicSkin.weiyan,
        yj_weiyan:decadeUI.dynamicSkin.weiyan,
        ol_weiyan:decadeUI.dynamicSkin.weiyan,

        //吴国太
        re_wuguotai: decadeUI.dynamicSkin.wuguotai,
        xin_wuguotai: decadeUI.dynamicSkin.wuguotai,

        //吴懿
        re_wuyi: decadeUI.dynamicSkin.wuyi,

        //徐晃
        re_xuhuang: decadeUI.dynamicSkin.ol_xuhuang,
        sb_xuhuang: decadeUI.dynamicSkin.ol_xuhuang,
        yj_xuhuang: decadeUI.dynamicSkin.ol_xuhuang,
        
        //夏侯霸
        decade_xiahouba: decadeUI.dynamicSkin.xiahouba,

        //夏侯氏
        re_xiahoushi: decadeUI.dynamicSkin.xiahoushi,
        sb_xiahoushi: decadeUI.dynamicSkin.xiahoushi,

        //夏侯惇
        re_xiahoudun: decadeUI.dynamicSkin.xiahoudun,
        xin_xiahoudun: decadeUI.dynamicSkin.xiahoudun,

        //夏侯渊
        re_xiahouyuan: decadeUI.dynamicSkin.xiahouyuan,
        ol_xiahouyuan: decadeUI.dynamicSkin.xiahouyuan,

        //小乔
        re_xiaoqiao: decadeUI.dynamicSkin.xiaoqiao,
        ol_xiaoqiao: decadeUI.dynamicSkin.xiaoqiao,
        decade_xiaoqiao: decadeUI.dynamicSkin.xiaoqiao,

        //辛宪英
        ol_xinxianying: decadeUI.dynamicSkin.xinxianying,
        re_xinxianying: decadeUI.dynamicSkin.xinxianying,
        
        //许靖
        sp_xujing: decadeUI.dynamicSkin.xujing,
        tw_xujing: decadeUI.dynamicSkin.xujing,

        //徐盛
        re_xusheng: decadeUI.dynamicSkin.xusheng,
        xin_xusheng: decadeUI.dynamicSkin.xusheng,
        
        //徐庶
        re_xushu: decadeUI.dynamicSkin.xushu,
        dc_xushu: decadeUI.dynamicSkin.xushu,
        xin_xushu: decadeUI.dynamicSkin.xushu,
        xia_xushu: decadeUI.dynamicSkin.xushu,

        //许褚
        re_xuzhu: decadeUI.dynamicSkin.xuzhu,

        //许攸
        sp_xuyou: decadeUI.dynamicSkin.xuyou,
        xin_xuyou:decadeUI.dynamicSkin.xuyou,

        //荀谌
        re_xunchen: decadeUI.dynamicSkin.xunchen,
        sp_xunchen: decadeUI.dynamicSkin.xunchen,
        
        //荀攸
        re_xunyou: decadeUI.dynamicSkin.xunyou,

        //荀彧
        ol_xunyu: decadeUI.dynamicSkin.xunyu,
        re_xunyu: decadeUI.dynamicSkin.xunyu,
        
        //颜良文丑
        re_yanwen: decadeUI.dynamicSkin.yanwen,
        ol_yanwen: decadeUI.dynamicSkin.yanwen,
        
        //羊徽瑜
        yanghuiyu: decadeUI.dynamicSkin.jin_yanghuiyu,

        //杨婉
        sp_yangwan: decadeUI.dynamicSkin.yangwan,
        
        //杨艳
        old_yangyan: decadeUI.dynamicSkin.yangyan,
        
        //杨仪
        ol_yangyi: decadeUI.dynamicSkin.yangyi,
        ns_yangyi: decadeUI.dynamicSkin.yangyi,
        diy_yangyi: decadeUI.dynamicSkin.yangyi,
        tw_yangyi: decadeUI.dynamicSkin.yangyi,
        
        //杨芷
        old_yangzhi: decadeUI.dynamicSkin.yangzhi,
        
        //于吉
        xin_yuji: decadeUI.dynamicSkin.yuji,
        re_yuji: decadeUI.dynamicSkin.yuji,
        diy_yuji: decadeUI.dynamicSkin.yuji,
        ns_yuji: decadeUI.dynamicSkin.yuji,
        ns_yujisp: decadeUI.dynamicSkin.yuji,

        //于禁
        ol_yujin: decadeUI.dynamicSkin.yujin,
        yujin_yujin: decadeUI.dynamicSkin.yujin,
        sb_yujin: decadeUI.dynamicSkin.yujin,

        //袁绍
        re_yuanshao: decadeUI.dynamicSkin.ol_yuanshao,
        xin_yuanshao: decadeUI.dynamicSkin.ol_yuanshao,
        sb_yuanshao: decadeUI.dynamicSkin.ol_yuanshao,

        //张宝
        re_zhangbao: decadeUI.dynamicSkin.zhangbao,
        
        //张昌蒲
        ol_zhangchangpu: decadeUI.dynamicSkin.zhangchangpu,
        sp_zhangchangpu: decadeUI.dynamicSkin.zhangchangpu,

        //张春华
        re_zhangchunhua: decadeUI.dynamicSkin.zhangchunhua,
        jin_zhangchunhua: decadeUI.dynamicSkin.zhangchunhua,

        //张飞
        re_zhangfei: decadeUI.dynamicSkin.zhangfei,
        xin_zhangfei: decadeUI.dynamicSkin.zhangfei,
        sb_zhangfei: decadeUI.dynamicSkin.zhangfei,

        //张恭
        re_zhanggong: decadeUI.dynamicSkin.zhanggong,

        //张郃
        re_zhanghe: decadeUI.dynamicSkin.zhanghe,
        sp_zhanghe: decadeUI.dynamicSkin.zhanghe,
        yj_zhanghe: decadeUI.dynamicSkin.zhanghe,
        sp_ol_zhanghe: decadeUI.dynamicSkin.zhanghe,

        //张角
        re_zhangjiao: decadeUI.dynamicSkin.sp_zhangjiao,
        sb_zhangjiao: decadeUI.dynamicSkin.sp_zhangjiao,

        //张辽
        ol_zhangliao: decadeUI.dynamicSkin.zhangliao,
        re_zhangliao: decadeUI.dynamicSkin.zhangliao,
        sp_zhangliao: decadeUI.dynamicSkin.zhangliao,
        yj_zhangliao: decadeUI.dynamicSkin.zhangliao,
        
        //张琪瑛
        old_zhangqiying:decadeUI.dynamicSkin.zhangqiying,
        
        //张让
        ol_zhangrang: decadeUI.dynamicSkin.zhangrang,
        junk_zhangrang:decadeUI.dynamicSkin.zhangrang,
        
        //张翼
        ol_zhangyì: decadeUI.dynamicSkin.zhangyì,

        //张昭张纮
        re_zhangzhang: decadeUI.dynamicSkin.zhangzhang,
        
        //赵襄
        decade_zhaoxiang:decadeUI.dynamicSkin.zhaoxiang,
        old_zhaoxiang:decadeUI.dynamicSkin.zhaoxiang,
        
        //赵俨
        dc_zhaoyǎn: decadeUI.dynamicSkin.zhaoyǎn,

        //赵云
        ol_zhaoyun: decadeUI.dynamicSkin.zhaoyun,
        re_zhaoyun: decadeUI.dynamicSkin.zhaoyun,
        sp_zhaoyun: decadeUI.dynamicSkin.zhaoyun,
        sb_zhaoyun: decadeUI.dynamicSkin.zhaoyun,

        //甄姬
        zhenji: decadeUI.dynamicSkin.zhenji,
        re_zhenji: decadeUI.dynamicSkin.zhenji,
        sb_zhenji: decadeUI.dynamicSkin.zhenji,

        //钟会
        re_zhonghui: decadeUI.dynamicSkin.zhonghui,
        xin_zhonghui: decadeUI.dynamicSkin.zhonghui,
        clan_zhonghui: decadeUI.dynamicSkin.zhonghui,
        
        //周处
        jin_zhouchu: decadeUI.dynamicSkin.zhouchu,

        //周瑜
        re_zhouyu: decadeUI.dynamicSkin.zhouyu,
        sb_zhouyu: decadeUI.dynamicSkin.zhouyu,
        
        //朱桓
        re_zhuhuan: decadeUI.dynamicSkin.zhuhuan,
        xin_zhuhuan: decadeUI.dynamicSkin.zhuhuan,
        old_zhuhuan: decadeUI.dynamicSkin.zhuhuan,
        
        //朱灵
        ol_zhuling: decadeUI.dynamicSkin.zhuling,
        dc_zhuling: decadeUI.dynamicSkin.zhuling,

        //朱然
        re_zhuran: decadeUI.dynamicSkin.zhuran,
        xin_zhuran: decadeUI.dynamicSkin.zhuran,
        
        //朱治
        xin_zhuzhi: decadeUI.dynamicSkin.zhuzhi,
        old_zhuzhi: decadeUI.dynamicSkin.zhuzhi,

        //诸葛亮
        re_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
        sp_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
        ol_sp_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
        re_sp_zhugeliang: decadeUI.dynamicSkin.zhugeliang,
        wu_zhugeliang: decadeUI.dynamicSkin.zhugeliang,

        //祝融
        ol_zhurong: decadeUI.dynamicSkin.zhurong,
        re_zhurong: decadeUI.dynamicSkin.zhurong,

        //左慈
        re_zuoci: decadeUI.dynamicSkin.zuoci,
        
	};
	var extend = {};
	decadeUI.get.extend(decadeUI.dynamicSkin, extend);
	
});