// 藏珍阁设置

window.skinSwitch.czgSettings = {
    // 所有盒子固定的保底道具
    drawCount: 50,  // 一次抽取的数量
    fixed: [
        {id: '600012', name: '将魂', count: 2},
        {id: '620281', name: '心愿积分', count: 1},
        {id: '620038', name: '雁翎', count: 2},
    ],

    // 所有盒子
    boxes: [
                    {
            name: '七夕礼盒',
            isHot: true,  // 是否是热门销售
            tip: '2024年七夕活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_gongsunzan',
                name: '谋公孙瓒'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_guanyu', name: '谋关羽', weight: 1, type: 'wujiang',gaoji: true},
                {id: '620138', name: '龙年七夕*陆逊动态包', weight: 15, gaoji: true},
                {id: 'qiaozhou', name: '谯周', weight: 10, type: 'wujiang', gaoji: true},
                {id: 'sb_gongsunzan', name: '谋公孙瓒', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1,itemName: '史诗宝珠*66', count:66,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 'sb_handang', name: '谋韩当', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },          
              {
            name: '权势风云',
            //isHot: true,  // 是否是热门销售
            tip: '2023年开学季活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shichangshi',
                name: '十常侍'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下
                // 如果有gaoji标识, 表示这是高级物品
                // 稀有
                {id: 'shichangshi', name: '十常侍', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '53502', name: '剑戟森森*司马师', weight: 15, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 'puyangxing', name: '濮阳兴', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },          
           {
            name: '七夕礼盒',
         //   isHot: true,  // 是否是热门销售
            tip: '2024年十五周年活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_sunce',
                name: '谋孙策'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang',gaoji: true},
                {id: '620138', name: '兔年七夕*周瑜动态包', weight: 15, gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: 'sb_sunce', name: '谋孙策', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1,itemName: '史诗宝珠*66', count:66,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 'sp_pengyang', name: '彭羕', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },                            
    {
            name: '周年礼盒',
           // isHot: true,  // 是否是热门销售
            tip: '2024年周年庆活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'mb_caomao',
                name: '曹髦'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'mb_caomao', name: '曹髦', weight: 1, type: 'wujiang',gaoji: true},
                {id: 'caopipifu', name: '龙生九子*曹丕', weight: 15, type: 'wujiang', gaoji: true},
                {id: 'caozhipifu', name: '龙生九子*曹植', weight: 15, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 3,itemName: '史诗宝珠*33', count:33,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 'xin_zhuzhi', name: '界朱治', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
                   {
            name: '端午礼盒',
          //  isHot: false,  // 是否是热门销售
            tip: '2023年端午活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_xiahoudun',
                name: '谋夏侯惇'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_guanyu', name: '谋关羽', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 33, gaoji: true},                        {id: 'sb_xiahoudun', name: '谋夏侯惇', weight: 3, type: 'wujiang', gaoji: true},
                {id: 'qiaozhou', name: '谯周', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620138', name: '龙年端午*张昌蒲动态包', weight: 15, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: 'sb_gaoshun', name: '谋高顺', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },            
               {
        name: '盛世芳华',
        isHot: true,  // 是否是热门销售
            tip: '2024年5月1日-5月10日限时售卖，将于5月11日0点自动打开', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sunhanhua',
                name: '孙寒华'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sunhanhua', name: '孙寒华', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*33', count: 33, gaoji: true},
                {id: '620138', name: '莲华熠熠*孙寒华动态包', weight: 10,  gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 'sb_jiangwei', name: '谋姜维', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
   },      
                       {
            name: '国色天香',
            isHot: true,  // 是否是热门销售
            tip: '024年5月1日-5月10日限时售卖，将于5月11日0点自动打开', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_diaochan',
                name: '谋貂蝉'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_diaochan', name: '谋貂蝉', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*33', count: 33, gaoji: true},
                {id: '620138', name: '忧君难寐*貂蝉动态包', weight: 15, gaoji: true},
                
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: 'yangfu', name: '杨阜', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },             
                           {
            name: '五一礼盒',
            isHot: true,  // 是否是热门销售
            tip: '2024年五一活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shen_lusu',
                name: '神鲁肃'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'shen_lusu', name: '神鲁肃', weight: 3, type: 'wujiang',gaoji: true},
                {id: '0', name: '神秘物品', weight: 15, gaoji: true},
                {id: 'sb_guanyu', name: '谋关羽', weight: 1, type: 'wujiang', gaoji: true},                
                {id: 'qiaozhou', name: '谯周', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1,itemName: '史诗宝珠*66', count:66,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 're_liubiao', name: '界刘表', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        }, 
                              {
            name: '共襄盛诞',
            isHot: true,  // 是否是热门销售
            tip: '2024年5月1日-5月10日限时售卖，将于5月11日0点自动打开', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'zhangzhongjing',
                name: '张仲景'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'zhangzhongjing', name: '张仲景', weight: 1, type: 'wujiang',gaoji: true},
                {id: '620138', name: '涤荡江东*神太史慈动态包', weight: 15, gaoji: true},
                {id: 're_xusheng', name: '界徐盛', weight: 3, type: 'wujiang', gaoji: true},                
                {id: 'qiaozhou', name: '谯周', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1,itemName: '史诗宝珠*66', count:66,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 'sunyi', name: '孙翊', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
            {
            name: '同心礼盒',
           // isHot: true,  // 是否是热门销售
            tip: '2024年老友记活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_guanyu',
                name: '谋关羽'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_guanyu', name: '谋关羽', weight: 1, type: 'wujiang',gaoji: true},
                {id: '620138', name: '明良千古*关羽动态包', weight: 15, gaoji: true},
                {id: 'sb_zhugeliang', name: '谋诸葛亮', weight: 3, type: 'wujiang', gaoji: true},                
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1,itemName: '史诗宝珠*66', count:66,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 'mb_huban', name: '胡班', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
            {
            name: '珍品礼盒',
         //   isHot: true,  // 是否是热门销售
            tip: '2023年双十一活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'guonvwang',
                name: '郭女王'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下
                // 如果有gaoji标识, 表示这是高级物品
                // 稀有
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620138', name: '依心缱绻*花鬘动态包', weight: 15,gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'guonvwang', name: '郭女王', weight: 3, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 'hansui', name: '韩遂', weight: 100,type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },            
                      {
            name: '踏青礼盒',
         //   isHot: true,  // 是否是热门销售
            tip: '2024年踏青活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_caopi',
                name: '谋曹丕'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_caopi', name: '谋曹丕', weight: 3, type: 'wujiang',gaoji: true},
                {id: '620138', name: '龙年清明*曹冲动态包', weight: 15, gaoji: true},
                {id: 'sb_guanyu', name: '谋关羽', weight: 1, type: 'wujiang', gaoji: true},                
                {id: 'qiaozhou', name: '谯周', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1,itemName: '史诗宝珠*66', count:66,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 'xin_sunluban', name: '界孙鲁班', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },            
    {
            name: '龙腾万里',
         //   isHot: true,  // 是否是热门销售
            tip: '2024年小年活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_zhugeliang',
                name: '谋诸葛亮'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang',gaoji: true},
                {id: '0', name: '神秘礼包', weight: 15, gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: 'sb_zhugeliang', name: '谋诸葛亮', weight: 3, type: 'wujiang', gaoji: true},               
                {id: '620150', name: '史诗宝珠', weight: 1,itemName: '史诗宝珠*66', count:66,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                // 精良
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},            
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: 'sp_cuiyan', name: '崔琰', weight: 100, type: 'wujiang'},            
                {id: '620149', name: '史诗宝珠碎片', weight: 200},                   
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},                           
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        }, 
                                              {
            name: '腊八礼盒',
            isHot: false,  // 是否是热门销售
            tip: '2024年腊八节活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shenhuatuo',
                name: '神华佗'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下
                // 如果有gaoji标识, 表示这是高级物品
                // 稀有
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'zhenbianquji', name: '针砭去疾*华佗', weight: 15,gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shenhuatuo', name: '神华佗', weight: 3, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 'mouluzhi', name: '谋卢植', weight: 100,type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },             
                             {
        name: '中秋礼盒',
            tip: '2022年中秋活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'zhangchangpu',
                name: '张昌蒲'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'zhangchangpu', name: '张昌蒲', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_xunyu', name: '神荀彧', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '虎年中秋*诸葛果动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '595', name: '吕范', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },        
                {
            name: '周年礼盒',
         //   isHot: true,  // 是否是热门销售
            tip: '2023年周年庆活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_diaochan',
                name: '谋貂蝉'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_diaochan', name: '谋貂蝉', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*33', count: 33, gaoji: true},
                {id: '620138', name: '霜刃绚练*灵雎动态包', weight: 15, gaoji: true},
                
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: 'sb_pangtong', name: '谋庞统', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },  
                    {
            name: '端午礼盒',
            isHot: false,  // 是否是热门销售
            tip: '2023年端午活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'yj_weiyan',
                name: '星魏延'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'yj_weiyan', name: '星魏延', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 33, gaoji: true},
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620138', name: '兔年端午*许褚动态包', weight: 15, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: 'yangfu', name: '杨阜', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },   
                   {
            name: '五一礼盒',
            //isHot: true,  // 是否是热门销售
            tip: '2023年五一活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_liubei',
                name: '谋刘备'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_liubei', name: '谋刘备', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620138', name: '涤荡江东*太史慈动态包', weight: 15, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},      
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: 'sb_jiangwei', name: '谋姜维', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
{
            name: '中秋盒子',            
            tip: '2023年中秋活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_sunquan',
                name: '谋孙权'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下
                // 如果有gaoji标识, 表示这是高级物品
                // 稀有
                {id: '660', name: '谋孙权', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},               
                {id: '620138', name: '兔年中秋*孙尚香动态包', weight: 10,gaoji: true},
                {id: '620138', name: '兔年中秋*孙策动态包', weight: 10,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '33701', name: '界张嶷', weight: 10,},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        }, 
                {
            name: '踏青礼盒',
          //  isHot: true,  // 是否是热门销售
            tip: '2023年踏青活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_caoren',
                name: '谋曹仁'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_caoren', name: '谋曹仁', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'xin_jushou', name: '界沮授', weight: 5, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620138', name: '兔年清明*周瑜动态包', weight: 15, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},             
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: 'xin_zhuzhi', name: '界朱治', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
                                {
            name: '龙游天下',
            isHot: true,  // 是否是热门销售
            tip: '2024年2月9日-2月16日限时售卖，将于2月17日自动打开', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shen_caocao',
                name: '神曹操'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'shen_caocao', name: '神曹操', weight: 1, type: 'wujiang', gaoji: true},     
                {id: 'shen_caocao2', name: '天下归心*神曹操', weight: 15, gaoji: true},                         
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},    
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},     
                 {id: 'wenyang', name: '文鸯', weight: 1, type: 'wujiang', gaoji: true},                                                            
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: '615', name: '王濬', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },   
                        {
            name: '老友礼盒',
            tip: '2023年老友季首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_huanggai',
                name: '谋黄盖'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下
                // 如果有gaoji标识, 表示这是高级物品
                // 稀有
                {id: 'sb_huanggai', name: '谋黄盖', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620149', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
             {id: 'xin_jushou', name: '界沮授', weight: 11, type: 'wujiang', gaoji: true},
                {id: '620138', name: '龙跃凤鸣*卧龙诸葛动态包', weight: 15, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000},
                {id: '620149', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 'liuba', name: '刘巴', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: 'lingzhusp', name: '灵珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
               {
            name: '元宵礼盒',
            isHot: false,  // 是否是热门销售
            tip: '2023年元宵活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_caocao',
                name: '谋曹操'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_caocao', name: '谋曹操', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 33, gaoji: true},
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620138', name: '兔年春节*曹婴动态包', weight: 15, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1', },
                // 精良
                {id: 'xin_caoxiu', name: '界曹休', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
            name: '兔年大吉',
            isHot: false,  // 是否是热门销售
  tip: '2023年春节活动首发，后续请关注每周末限时活动',// 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_xiahoushi',
                name: '谋夏侯氏'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_xiahoushi', name: '谋夏侯氏', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 3, itemName: '史诗宝珠*66', count: 33, gaoji: true},
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620138', name: '兔年春节*关银屏动态包', weight: 15, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                // 精良
                {id: 'guanyinping', name: '关银屏', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
            name: '瑞兔呈祥',
            xishizhenbao: {
                id: 'xin_jushou',
                name: '界沮授'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            tip: '2023年小年活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'xin_jushou', name: '界沮授', weight: 1, type: 'wujiang',gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66,gaoji: true},
                {id: 'sb_sunshangxiang', name: '谋孙尚香', weight: 3, type: 'wujiang',gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang',gaoji: true},
                {id: '620138', name: '兔年春节*孙尚香动态包', weight: 15,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000,gaoji: true},
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: '615', name: '王濬', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
            name: '端午盒子',
            tip: '2019年春分活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'liuyan',
                name: '刘焉'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'liuyan', name: '刘焉', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'majun', name: '马钧', weight: 3, type: 'wujiang', gaoji: true},
                {id: 'sunquan', name: '猪年端午*孙权', weight: 10, gaoji: true},
                {id: '5304', name: '猪年端午*刘禅', weight: 10, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*5000', count: 5000, gaoji: true},
                {id: '4305', name: '猪年端午*曹丕', weight: 10, gaoji: true},
                // 精良
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1',},
                {id: 'sp_liuqi', name: '刘琦', weight: 100, type: 'wujiang'},
                {id: '620046', name: '菜篮子', weight: 200, itemName: '菜篮子*99', count: 99},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },                  
        {
            name: '七夕盒子',
            tip: '2019年七夕活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'xurong',
                name: '徐荣'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'xurong', name: '徐荣', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: '620038', name: '雁翎', weight: 5, itemName: '雁翎*5000', count:5000, gaoji: true},
                {id: '1305', name: '猪年七夕*大乔', weight: 10, gaoji: true},
                {id: '5406', name: '猪年七夕*孙策', weight: 10, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '430', name: '界典韦', weight: 100, type: 'wujiang'},
                {id: '431', name: '界荀彧', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
            name: '中秋盒子',
            tip: '2019年中秋活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'beimihu',
                name: '卑弥呼'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'beimihu', name: '卑弥呼', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: '620038', name: '雁翎', weight: 5, itemName: '雁翎*5000', count:5000, gaoji: true},
                {id: '303', name: '猪年中秋*张飞', weight: 10, gaoji: true},
                {id: '33604', name: '猪年中秋*夏侯氏', weight: 10, gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                {id: 'xurong', name: '徐荣', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_huangzhong', name: '界黄忠', weight: 200, type: 'wujiang', gaoji: true},
                // 精良
                {id: 'buzhi', name: '步鸷', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
            name: '庆典盒子',
            tip: '2019年国庆活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'simazhao',
                name: '司马昭'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'simazhao', name: '司马昭', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'xurong', name: '徐荣', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620038', name: '雁翎', weight: 5, itemName: '雁翎*5000', count:5000, gaoji: true},               
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '龙困于渊*刘协动态包', weight: 10, gaoji: true},
                {id: 're_huangzhong', name: '界黄忠', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '443', name: '界徐晃', weight: 100, type: 'wujiang'},
                {id: '444', name: '界孟获', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
            name: '大雪盒子',
            tip: '2019年大雪活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shamoke',
                name: '沙摩柯'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'shamoke', name: '沙摩柯', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'xurong', name: '徐荣', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620038', name: '雁翎', weight: 5, itemName: '雁翎*5000', count:5000, gaoji: true},               
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '39102', name: '猪年大雪*曹节', weight: 10, gaoji: true},
                {id: '41401', name: '猪年大雪*马云騄', weight: 1, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 're_caopi', name: '界曹丕', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
            name: '鼠年大吉',
            tip: '2020年小年活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'baosanniang',
                name: '鲍三娘'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'baosanniang', name: '鲍三娘', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shamoke', name: '沙摩柯', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620038', name: '雁翎', weight: 5, itemName: '雁翎*5000', count:5000, gaoji: true},               
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '雄踞益州*刘焉动态包', weight: 10, gaoji: true},
                {id: '1204', name: '鼠年春节*周瑜', weight: 10,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '472', name: '界邓艾', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        
        {
        name: '鼠年壹号',
            tip: '2020年春节活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'caoying',
                name: '曹婴'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'caoying', name: '曹婴', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'baosanniang', name: '鲍三娘', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620038', name: '雁翎', weight: 5, itemName: '雁翎*5000', count:5000, gaoji: true},               
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '锋芒毕露*曹婴动态包', weight: 10, gaoji: true},
                {id: '38802', name: '鼠年春节*辛宪英', weight: 10,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '473', name: '界姜维', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        
        {
        name: '鼠年春分',
            tip: '2020年春分活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'zhangqiying',
                name: '张琪瑛'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'zhangqiying', name: '张琪瑛', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'baosanniang', name: '鲍三娘', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620038', name: '雁翎', weight: 5, itemName: '雁翎*5000', count:5000, gaoji: true},               
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '1306', name: '鼠年春分*大乔', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 'buzhi', name: '步鸷', weight: 100, type: 'wujiang'},
                {id: '483', name: '界刘禅', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '鼠年五一',
            tip: '2020年五一活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 're_xusheng',
                name: '界徐盛'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 're_xusheng', name: '界徐盛', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 3, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'baosanniang', name: '鲍三娘', weight: 1, type: 'wujiang', gaoji: true},
                {id: '392', name: '嵇康', weight: 10, type:'wujiang',gaoji: true},               
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '龙骧麟振*刘备动态包', weight: 10,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 'buzhi', name: '步鸷', weight: 100, type: 'wujiang'},
                {id: '493', name: '界高顺', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '鼠年端午',
            tip: '2020年端午活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'haozhao',
                name: '郝昭'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'haozhao', name: '郝昭', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'baosanniang', name: '鲍三娘', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'simazhao', name: '司马昭', weight: 10, type:'wujiang',gaoji: true},               
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '鼠年端午*曹植动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 'buzhi', name: '步鸷', weight: 100, type: 'wujiang'},
                {id: '457', name: '陈到', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '鼠年七夕',
            tip: '2020年七夕活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shen_ganning',
                name: '神甘宁'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'shen_ganning', name: '神甘宁', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'haozhao', name: '郝昭', weight: 3, type: 'wujiang', gaoji: true},
                {id: 're_huangzhong', name: '界黄忠', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '鼠年七夕*吕布动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '456', name: '毌丘俭', weight: 100, type: 'wujiang'},
                {id: '403', name: '界孙尚香', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '开黑宝盒',
            tip: '2020年开黑活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'yj_ganning',
                name: '星甘宁'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'yj_ganning', name: '星甘宁', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*22', count: 22, gaoji: true},
                {id: 'sp_sufei', name: '苏飞', weight: 3, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '522', name: '星张辽', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '鼠年中秋',
            tip: '2020年中秋活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'zhugezhan',
                name: '诸葛瞻'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'zhugezhan', name: '诸葛瞻', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_ganning', name: '神甘宁', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'heqi', name: '贺齐', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '鼠年中秋*关索动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '501', name: '界曹植', weight: 100, type: 'wujiang'},
                {id: '403', name: '界孙尚香', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '鼠年冬至',
            tip: '2020年冬至活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 're_zhonghui',
                name: '界钟会'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 're_zhonghui', name: '界钟会', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_ganning', name: '神甘宁', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'beimihu', name: '卑弥呼', weight: 1, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '鼠年冬至*司马昭动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '499', name: '杨仪', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '开黑盒子',
            tip: '2021年开黑活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'yanghuiyu',
                name: '羊徽瑜'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'yanghuiyu', name: '羊徽瑜', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'yj_ganning', name: '星甘宁', weight: 3, type: 'wujiang', gaoji: true},
                {id: 'sp_sufei', name: '苏飞', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '肝胆相照*苏飞动态包', weight: 10,gaoji: true},
                {id: '620138', name: '肝胆相照*星甘宁动态包', weight: 10,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '516', name: '界刘表', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '牛年大吉',
            tip: '2021年春节活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 're_bulianshi',
                name: '界步练师'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 're_bulianshi', name: '界步练师', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 3, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'yanghuiyu', name: '羊徽瑜', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_yujin', name: '界于禁', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '牛年春节*赵云动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '516', name: '界韩当', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        }, 
        {
        name: '牛年踏青',
            tip: '2021年清明活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 're_liru',
                name: '界李儒'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 're_liru', name: '界李儒', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'yanghuiyu', name: '羊徽瑜', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_yujin', name: '界于禁', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '牛年清明*曹丕动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '534', name: '界虞翻', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '牛年五一',
            tip: '2021年五一活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sp_wangcan',
                name: '王粲'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sp_wangcan', name: '王粲', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'yanghuiyu', name: '羊徽瑜', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_yujin', name: '界于禁', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '凤舞神鸟*神诸葛亮动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '547', name: '荀谌', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '60001', name: '会员卡（31天）', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '牛年端午',
            tip: '2021年端午活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'yangbiao',
                name: '杨彪'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'yangbiao', name: '杨彪', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'yanghuiyu', name: '羊徽瑜', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_yujin', name: '界于禁', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '牛年端午*孙鲁育动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '514', name: '界廖化', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '周年礼盒',
            tip: '2021年周年庆活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'duyu',
                name: '杜预'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'duyu', name: '杜预', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*33', count: 33, gaoji: true},
                {id: 're_zhuran', name: '界朱然', weight: 3, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '琪花瑶草*徐氏动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '550', name: '费祎', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '牛年七夕',
            tip: '2021年七夕活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'nanhualaoxian',
                name: '南华老仙'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'nanhualaoxian', name: '南华老仙', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 're_zhuran', name: '界朱然', weight: 3, type: 'wujiang', gaoji: true},
                {id: 're_yujin', name: '界于禁', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '牛年七夕*孙权动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '554', name: '辛毗', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
    {
        name: '牛年中秋',
            tip: '2021年中秋活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'wujing',
                name: '吴景'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'wujing', name: '吴景', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 're_zhuran', name: '界朱然', weight: 3, type: 'wujiang', gaoji: true},
                {id: 'nanhualaoxian', name: '南华老仙', weight: 1, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '牛年中秋*司马师动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '546', name: '孙邵', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },  
        {
        name: '庆典礼盒',
            tip: '2021年国庆活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shen_guojia',
                name: '神郭嘉'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'shen_guojia', name: '神郭嘉', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 're_zhuran', name: '界朱然', weight: 3, type: 'wujiang', gaoji: true},
                {id: 'wujing', name: '吴景', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '烟水悠悠*孙茹动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '571', name: '许靖', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '牛年立冬',
            tip: '2021年立冬活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'zhouqun',
                name: '周群'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'zhouqun', name: '周群', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_guojia', name: '神郭嘉', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_zhuran', name: '界朱然', weight: 3, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '牛年立冬*司马懿动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '565', name: '羊祜', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '盛典礼盒',
            tip: '2021年周年庆活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'liuzhang',
                name: '刘璋'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'liuzhang', name: '刘璋', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'gongsunkang', name: '公孙康', weight: 10, type: 'wujiang', gaoji: true},
                 {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '虎啸生风*许褚动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '602', name: '界孙鲁班', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '虎年大吉',
            tip: '2022年春节活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'zhangzhongjing',
                name: '张仲景'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'zhangzhongjing', name: '张仲景', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'zhouqun', name: '周群', weight: 10, type: 'wujiang', gaoji: true},
                {id: 're_zhuran', name: '界朱然', weight: 3, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '虎年春节*曹纯动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '587', name: '高览', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '虎年开黑',
            tip: '2022年开黑活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'wangling',
                name: '王凌'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'wangling', name: '王凌', weight: 10, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'zhangzhongjing', name: '张仲景', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_zhuran', name: '界朱然', weight: 3, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '明良千古*诸葛亮动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '577', name: '张温', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '春分礼盒',
            tip: '2022年春分活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shen_sunce',
                name: '神孙策'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'shen_sunce', name: '神孙策', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'zhangzhongjing', name: '张仲景', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_caozhen', name: '界曹真', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '1004', name: '计韬武略*吕蒙', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '592', name: '蒋琬', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '踏青礼盒',
            tip: '2022年清明活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'shen_xunyu',
                name: '神荀彧'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'shen_xunyu', name: '神荀彧', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_sunce', name: '神孙策', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_caozhen', name: '界曹真', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '虎年清明*神荀彧动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '589', name: '马元义', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '五一礼盒',
            tip: '2022年五一活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'wenyang',
                name: '文鸯'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'wenyang', name: '文鸯', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_xunyu', name: '神荀彧', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_caozhen', name: '界曹真', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '笔瀚如流*王粲动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '581', name: '袁涣', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '端午礼盒',
            tip: '2022年端午活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'yj_huangzhong',
                name: '星黄忠'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'yj_huangzhong', name: '星黄忠', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_xunyu', name: '神荀彧', weight: 1, type: 'wujiang', gaoji: true},
                {id: 're_caozhen', name: '界曹真', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '虎年端午*张星彩动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '611', name: '毛玠', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '周年礼盒',
            tip: '2022年周年庆活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sunhanhua',
                name: '孙寒华'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sunhanhua', name: '孙寒华', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*33', count: 33, gaoji: true},
                {id: '620138', name: '明良千古*关羽动态包', weight: 10,  gaoji: true},
                {id: '620138', name: '明良千古*胡金定动态包', weight: 10,gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '680', name: '界孙休', weight: 100, type: 'wujiang'},
                {id: '600001', name: '会员卡（31天）', weight: 200},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '七夕礼盒',
            tip: '2022年七夕活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_huangzhong',
                name: '谋黄忠'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_huangzhong', name: '谋黄忠', weight: 1, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_xunyu', name: '神荀彧', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '虎年七夕*关索动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '641', name: '谋于禁', weight: 15, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '国庆礼盒',
            tip: '2022年国庆活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'huangfusong',
                name: '皇甫嵩'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'huangfusong', name: '皇甫嵩', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_xunyu', name: '神荀彧', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '明良千古*张飞动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '574', name: '桥公', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '狂欢礼盒',
            tip: '2022年狂欢活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'fuqian',
                name: '傅佥'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'fuqian', name: '傅佥', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_xunyu', name: '神荀彧', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '雪中舞刃*张春华动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: 'ruanhui', name: '阮慧', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
        {
        name: '冬至礼盒',
            tip: '2022年冬至活动首发，后续请关注每周末限时活动', // 显示在抽取上面的提示小字
            xishizhenbao: {
                id: 'sb_sunshangxiang',
                name: '谋孙尚香'
            }, // 稀世珍宝, 图片放入cangZhenGe/bskin目录下
            // 盒子内的所有的道具设置
            items: [
                // 如果是武将, 需要注明type为wujiang, 并且id为武将在无名杀的id, 并且需要将图片放入wujiang目录下,
                // 如果是道具, id对应资源文件的名称, 图片放入items目录下

                // 稀有
                {id: 'sb_sunshangxiang', name: '谋孙尚香', weight: 3, type: 'wujiang', gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 1, itemName: '史诗宝珠*66', count: 66, gaoji: true},
                {id: 'shen_xunyu', name: '神荀彧', weight: 1, type: 'wujiang', gaoji: true},
                {id: 'huaman', name: '花鬘', weight: 10, type: 'wujiang', gaoji: true},
                {id: '600012', name: '将魂', weight: 15, itemName: '将魂*1000', count: 1000, gaoji: true},
                {id: '620138', name: '虎年冬至*张琪瑛动态包', weight: 15,gaoji: true},
                {id: '620150', name: '史诗宝珠', weight: 100, itemName: '史诗宝珠*1'},
                // 精良
                {id: '613', name: '马日磾', weight: 100, type: 'wujiang'},
                {id: '620149', name: '史诗宝珠碎片', weight: 200},
                {id: '600008', name: '招募令', weight: 1000},
                {id: '600020', name: '雁翎甲', weight: 1000},
                {id: '620039', name: '进阶丹', weight: 1000, count: 2},

                // 普通
                {id: '600006', name: '点将卡', weight: 3000, count: 2},
                {id: '600003', name: '手气卡', weight: 5000, count: 2},
                {id: '600007', name: '换将卡', weight: 5000, count: 2},
                {id: '620046', name: '菜篮子', weight: 1360, count: 2},
                {id: '20003', name: '欢乐豆', weight: 1000, itemName: '欢乐豆*50', count: 50},
                {id: '620153', name: '史诗体验卡', weight: 1000},
            ]
        },
    ],

}