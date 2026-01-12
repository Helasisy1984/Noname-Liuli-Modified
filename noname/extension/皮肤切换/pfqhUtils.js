// 用来转化D扩展的参数, 生成新的参数在本地文件

window.pfqhUtils = {

    // 参数: path: 初始路径, filter: 函数, 过滤需要筛选的文件格式, callback, 触发的回调, 回调传参是下面锁返回的数据
    // 获取十周年UI下的所有骨骼文件, 并且自动转换为参数, 递归的获取文件夹下的所有文件及其目录文件, 返回格式如下所示
    // 返回 {
    //       path: path,  // 当前路径
    //       children: [
    //          {
    //              path: path,
    //              folds: folds,
    //              files: files,
    //              children: []
    //          },
    //       ],
    //       folds: [],  // 当前文件夹名字
    //       files: [],  // 当前文件夹下的文件
    //    }
    getAllFiles: (path, filter, callback) => {
        let tasks = []  // 任务队列
        let taskCount = 0
        let res = {}
        let getFiles = (path, parent) => {
            skinSwitch.game.getFileList(path, function (folds, files) {
                parent.path = path
                parent.folds = folds
                parent.files = []
                parent.children = []
                files.forEach(file => {
                    if (filter && filter(file, path)) {
                        parent.files.push(file)
                    } else {
                        parent.files.push(file)
                    }
                })
                folds.forEach(fold => {
                    taskCount++
                    let t = (r) => {
                        getFiles(path + '/' + fold, r)
                    }
                    t.res = {}
                    parent.children.push(t.res)
                    tasks.push(t)
                })

                taskCount--
            })
        }
        let t = (dict) => {
            getFiles(path, dict)
        }
        t.res = res
        tasks.push(t)

        taskCount++
        // 等待队列中的所有任务执行完成
        let finishTasks = () => {
            if (taskCount === 0) {
                console.log('getAllFileFinish!!!', res)
                callback(res)
            }
            else {
                if (tasks.length > 0) {
                    let task = tasks.shift()
                    task(task.res)
                }
                requestAnimationFrame(finishTasks)
            }
        }
        requestAnimationFrame(finishTasks)
    },

    // 只获取一层文件
    getFoldsFiles: (path, filter, callback) => {
        skinSwitch.game.getFileList(path, function (folds, files) {
            let retFiles = files
            if (filter) {
                retFiles = []
                files.forEach(file => {
                    if (filter && filter(file, path)) {
                        retFiles.push(file)
                    }
                })
            }
            callback(folds, retFiles)
        });
    },

    decodeArrayBuffer: (ArrayBuffer) => {
        let utf8 = new Uint8Array(ArrayBuffer);
        return String.fromCharCode.apply(null, utf8)
    },

    // data是文件读取后的Buffer对象. 获取spine文件的版本号
    getSpineFileVersion: function(path, callback, fail) {

        skinSwitch.game.readFile(path, function (data) {

            let dStr = ''
            if (data instanceof ArrayBuffer) {
                dStr = pfqhUtils.decodeArrayBuffer(data.slice(0, 100))
            } else {
                dStr = data.slice(0, 100).toString()
            }

            // 匹配spine的版本号
            let versionReg = /\d\.\d+\.\d+/;
            // 读取文件开头大概100个字节即可
            let m = dStr.match(versionReg)
            let version = null
            if (m) {
                let v = m[0]
                if (v.startsWith('3.6')) {
                    version =  '3.6'
                } else if(v.startsWith('3.5')) {
                    if (v <= '3.5.35') {
                        version = '3.5.35'
                    } else {
                        version =  '3.6'
                    }
                }else if (v.startsWith('3.7')) {
                    version =  '3.7'
                } else if (v.startsWith('3.8')) {
                    version =  '3.8'
                } else if (v.startsWith('4.0')) {
                    version =  '4.0'
                }
                else if (v.startsWith('4.1')) {
                    version =  '4.1'
                }
                else if (v.startsWith('4.2')) {
                    version =  '4.2'
                }
                else {
                    version = v
                }
            }
            callback(version)
        }, function (err) {
            console.log('读取文件失败', err)
            if (fail) {
                fail(err)
            }
        })


    },

    // 直接根据十周年文件夹下所有的骨骼, 生成一份默认参数模板, 减小填写工作量, 会直接生成参数和json信息, 预乘参数需要自行添加.
    // 但是要求骨骼文件存放位置是  武将名(武将id也行)/皮肤名称/文件位置
    // 生成参数规则, 根据文件夹内的骨骼数量, 如果有标准的十周年文件命名规则, 那么会当作十周年骨骼进行处理
    // 如果只有一个骨骼, 那么按照手杀骨骼进行处理
    // 如果有包含beijing名称的骨骼, 那么一律把之当作背景, 放在背景参数
    // 会自动识别骨骼文件的版本和json
    // 文件后缀为bg结尾的png或者jpg, 会当作动皮的背景
    generateDynamicFile: function(lib, dskins) {
        let path = 'extension/十周年UI/assets/dynamic'
        pfqhUtils.getAllFiles(path, function (file, path) {
            let suffixes = ['.png', '.atlas', '.json', '.skel', '.jpg' ]
            for (let suf of suffixes) {
                if (file.endsWith(suf)) {
                    return true
                }
            }
            return false
        }, function (res) {
            // 只获取3层文件夹的, 不再考虑最里层的了
            let skinInfoMap = {}
            let imgBgMap = {}  // 存储以_bg结尾的图片, 可能是骨骼的静态背景文件
            let wujiangSkinMap = {}
            for (let i = 0; i < res.folds.length; i++) {
                let wujiang = res.folds[i]
                let wujiangSkins = res.children[i]
                for (let j = 0; j < wujiangSkins.folds.length; j++) {
                    let skinName = wujiangSkins.folds[j]
                    let skels = wujiangSkins.children[j]
                    // 遍历出所有可能的骨骼, 必须包含3个文件, png, atlas, skel或者json
                    for (let f of skels.files){
                        let name = f.substring(0, f.lastIndexOf("."))
                        // 解析每一个文件
                        name = `${wujiang}/${skinName}/${name}`
                        let ext = f.substring(f.lastIndexOf(".")+1)
                        if (!(name in skinInfoMap)) {
                            if (name.endsWith('_bg')) {
                                skinInfoMap[name.slice(0, name.length - 3)] = {}
                            } else {
                                skinInfoMap[name] = {}
                            }
                        }
                        if (ext === 'png') {
                            if (name.endsWith('_bg')) {
                                // imgBgMap[name.slice(0, name.length - 3)] = f
                                imgBgMap[`${wujiang}/${skinName}`] = f
                            } else {
                                skinInfoMap[name].png = true
                            }
                        } else if (ext === 'skel') {
                            skinInfoMap[name].type = 'skel';
                        } else if (ext === 'json') {
                            skinInfoMap[name].type = 'json';
                        } else if (ext === 'atlas') {
                            skinInfoMap[name].altas = true
                        }
                    }

                }
            }
            let cnCharPattern = new RegExp("[\u4E00-\u9FA5]+")

            let cnName2IdMap = {}
            // 创建所有中文武将名 -> 英文的映射, 重复只取第一个.
            for (let wjId in lib.character) {
                let cnName = lib.translate[wjId]
                if (cnName) {
                    if (!(cnName in cnName2IdMap)) {
                        cnName2IdMap[cnName]= [wjId]
                    } else {
                        cnName2IdMap[cnName].push(wjId)
                    }
                }
            }
            let checkVersionCount = 0
            let to_check_version = []

            for(let key in skinInfoMap) {
                let info = skinInfoMap[key]
                // 如果十周年文件里面已经有了对应武将和对应皮肤的话, 跳过.
                if (!(info.type && info.altas && info.png)) {
                    continue
                }
                let infoSlice = key.split('/')
                let wj = infoSlice[0], sk = infoSlice[1], tag = infoSlice[2]
                tag = tag.toLowerCase()  // 小写, 方便处理

                let bgKey = `${wj}/${sk}`

                // 获取的武将的名称在无名杀的id, 如果本来就是id了, 那么不做变化.
                if (wj.match(cnCharPattern)) {
                    // 获取武将的英文
                    if (wj in cnName2IdMap) {
                        wj = cnName2IdMap[wj][0]
                    } else {
                        continue
                    }
                }

                if (dskins[wj] && sk in dskins[wj]) {
                    continue
                }

                if (wj in lib.character) {
                    // 填写信息
                    if (!(wj in wujiangSkinMap)) {
                        wujiangSkinMap[wj] = {}
                    }
                    if (!(sk in wujiangSkinMap[wj])) {
                        wujiangSkinMap[wj][sk] = {
                            bg: imgBgMap[bgKey] ? `${bgKey}/${imgBgMap[bgKey]}`: null,
                        }
                    }
                    wujiangSkinMap[wj][sk][tag] = {
                        type: info.type,
                        name: key,
                        version: '',
                    };
                    to_check_version.push({
                        'info': wujiangSkinMap[wj][sk][tag],
                        'path': skinSwitch.dcdPath + '/assets/dynamic/' + key + '.' + info.type
                    });
                    checkVersionCount++;
                }
            }

            let checkVerFunc = () => {
                if (checkVersionCount > 0) {
                    if (to_check_version.length > 0) {
                        let cv = to_check_version.shift();
                        pfqhUtils.getSpineFileVersion(cv.path, (v) => {
                            cv.info.version = v
                            checkVersionCount--
                        }, () => {
                            checkVersionCount--
                        })
                    }
                    requestAnimationFrame(checkVerFunc)
                } else {
                    console.log('wujiangSkinMap:  ', wujiangSkinMap)
                    // 填写文件.
                    let _writeToFile = () => {
                        let daijiTags = ['daiji2', 'xingxiang', 'daiji']
                        let chuchangTags = ['chuchang']
                        let beijingTags = ['beijing']
                        let qianjingTags = ['qianjing']
                        let gongjiTags = ['chuchang2', 'jineng02']
                        let teshuTags = ['jineng02', 'chuchang2']
                        let zhishixianTags = ['shouji2']
                        let zhishixianBaoTags = ['shouji']

                        let stringBuffer = []
                        let defaultXY = {
                            x: [0, 0.5],
                            y: [0, 0.5],
                        }
                        let defaultBeiJing = {
                            x: [0, 0.98],
                            y: [0, 0.47]
                        }
                        let defaultScale = 0.35
                        stringBuffer.push(`'use strict';\ndecadeModule.import(function(lib, game, ui, get, ai, _status){\n`)
                        stringBuffer.push('\tdecadeUI.dynamicSkin = {\n')

                        let daijiParams, gongjiParams, zhishixianParams, teshuParams, beijingParams, qianjingParams, chuchangParams, zhishixianBaoParams

                        let checkoutTagIn = (info, tags) => {
                            for (let t of tags) {
                                if (t in info) {
                                    return t
                                }
                            }
                            return false
                        }
                        let getParams = (skelInfo, tags) => {
                            let tag = checkoutTagIn(skelInfo, tags)
                            if (tag){
                                let params = {
                                    name: skelInfo[tag].name,
                                    scale: defaultScale,
                                }
                                params.version = skelInfo[tag].version
                                if (skelInfo[tag].type === 'json') {
                                    params.json = true;
                                }
                                return params
                            }
                        }
                        for (let wj in wujiangSkinMap) {
                            stringBuffer.push(`\t\t${wj}: {\n`)
                            for (let sk in wujiangSkinMap[wj]) {
                                // 如果以数字开头
                                if (sk.match(/^[0-9]/)) {
                                    stringBuffer.push(`\t\t\t_${sk}: {\n`);
                                } else {
                                    stringBuffer.push(`\t\t\t${sk}: {\n`);
                                }
                                let skelInfo = wujiangSkinMap[wj][sk]

                                let hasOtherVersion = false  // 标记是否含有其他版本的骨骼

                                // 判断每一个是否存在于其中.
                                gongjiParams = getParams(skelInfo, gongjiTags)
                                chuchangParams = getParams(skelInfo, chuchangTags)
                                if (chuchangParams) {
                                    chuchangParams.scale = 0.7
                                }
                                teshuParams = getParams(skelInfo, teshuTags)
                                zhishixianParams = getParams(skelInfo, zhishixianTags)
                                if (zhishixianParams) {
                                    zhishixianParams.delay = 0.3
                                    zhishixianParams.scale = 0.7
                                    zhishixianParams.speed = 0.8
                                }
                                zhishixianBaoParams = getParams(skelInfo, zhishixianBaoTags)
                                if (zhishixianBaoParams) {
                                    zhishixianBaoParams.delay = 0.3
                                    zhishixianBaoParams.scale = 0.7
                                    zhishixianBaoParams.speed = 0.8
                                }
                                beijingParams = getParams(skelInfo, beijingTags)
                                if (beijingParams) {
                                    beijingParams.x = defaultBeiJing.x
                                    beijingParams.y = defaultBeiJing.y
                                }
                                qianjingParams = getParams(skelInfo, qianjingTags)
                                if (qianjingParams) {
                                    qianjingParams.x = defaultqianjing.x
                                    qianjingParams.y = defaultqianjing.y
                                }
                                daijiParams = getParams(skelInfo, daijiTags)
                                if (daijiParams) {
                                    daijiParams.x = defaultXY.x
                                    daijiParams.y = defaultXY.y
                                } else {
                                    // 默认获取第一个非背景骨骼
                                    for (let k in skelInfo) {
                                        if (k === 'bg' || beijingTags.includes(k)) {
                                            continue
                                        }
                                        daijiParams = {
                                            x: defaultXY.x,
                                            y: defaultXY.y,
                                            name: skelInfo[k].name,
                                            scale: defaultScale,
                                            version: skelInfo[k].version
                                        }
                                        if (skelInfo[k].type === 'json') {
                                            daijiParams.json = true
                                        }
                                        break
                                    }
                                }
                                if (!daijiParams) {
                                    daijiParams = {}
                                }
                                if (chuchangParams) {
                                    daijiParams.shizhounian = true
                                }

                                for (let p of [daijiParams, gongjiParams, zhishixianParams, teshuParams, beijingParams, qianjingParams, chuchangParams, zhishixianBaoParams]) {
                                    if (p && (p.version !== '3.6')) {
                                        hasOtherVersion = true
                                    }
                                }
                                if (!hasOtherVersion) {
                                    for (let p of [daijiParams, gongjiParams, zhishixianParams, teshuParams, beijingParams, qianjingParams, chuchangParams, zhishixianBaoParams]) {
                                        if (p) {
                                            delete p.version
                                        }
                                    }
                                }
                                if (skelInfo.bg != null) {
                                    daijiParams.background = skelInfo.bg
                                }

                                // 开始填写皮肤切换参数.
                                for (let k in daijiParams) {
                                    stringBuffer.push(`\t\t\t\t${k}: ${JSON.stringify(daijiParams[k])},\n`);
                                }

                                if (beijingParams) {
                                    stringBuffer.push(`\t\t\t\tbeijing: {\n`)
                                    for (let k in beijingParams) {
                                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(beijingParams[k])},\n`)
                                    }
                                    stringBuffer.push(`\t\t\t\t},\n`)
                                }
                                                                if (qianjingParams) {
                                    stringBuffer.push(`\t\t\t\tqianjing: {\n`)
                                    for (let k in qianjingParams) {
                                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(qianjingParams[k])},\n`)
                                    }
                                    stringBuffer.push(`\t\t\t\t},\n`)
                                }

                                if (chuchangParams) {
                                    stringBuffer.push(`\t\t\t\tchuchang: {\n`)
                                    for (let k in chuchangParams) {
                                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(chuchangParams[k])},\n`)
                                    }
                                    stringBuffer.push(`\t\t\t\t},\n`)
                                }

                                if (gongjiParams) {
                                    stringBuffer.push(`\t\t\t\tgongji: {\n`)
                                    for (let k in gongjiParams) {
                                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(gongjiParams[k])},\n`)
                                    }
                                    stringBuffer.push(`\t\t\t\t},\n`)
                                }

                                if (teshuParams) {
                                    stringBuffer.push(`\t\t\t\tteshu: {\n`)
                                    for (let k in teshuParams) {
                                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(teshuParams[k])},\n`)
                                    }
                                    stringBuffer.push(`\t\t\t\t},\n`)
                                }
                                if (zhishixianParams) {
                                    stringBuffer.push(`\t\t\t\tzhishixian: {\n`)
                                    for (let k in zhishixianParams) {
                                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(zhishixianParams[k])},\n`)
                                    }
                                    if (zhishixianBaoParams) {
                                        stringBuffer.push(`\t\t\t\t\teffect: {\n`)
                                        for (let k in zhishixianBaoParams) {
                                            stringBuffer.push(`\t\t\t\t\t\t${k}: ${JSON.stringify(zhishixianBaoParams[k])},\n`)
                                        }
                                        stringBuffer.push(`\t\t\t\t\t},\n`)
                                    }
                                    stringBuffer.push(`\t\t\t\t},\n`);
                                }
                                stringBuffer.push(`\t\t\t},\n`)
                            }
                            stringBuffer.push(`\t\t},\n`)
                        }
                        stringBuffer.push('\t}\n\n')
                        stringBuffer.push('})\n')

                        let str = stringBuffer.join('')
                        // 写入文件中
                        skinSwitch.game.writeFile(str, skinSwitch.path, '十周年ui动皮自动生成参数.js', function () {
                            console.log('十周年ui动皮自动生成参数js成功')
                            skinSwitchMessage.show({
                                type: 'success',
                                text: '生成成功',
                                duration: 1500,    // 显示时间
                                closeable: false, // 可手动关闭
                            })
                        })
                    }
                    _writeToFile()

                }
            }
            requestAnimationFrame(checkVerFunc)
        })
    },


    // 将D的动皮参数转换为皮肤切换的动皮参数, 写入到扩展目录文件夹
    transformDdyskins: (dskins) => {
        if (!dskins) return
        let stringBuffer = []
        stringBuffer.push(`'use strict';
decadeModule.import(function(lib, game, ui, get, ai, _status){
\t/*
\t十周年UI动皮使用说明：
\t- 首先打开动态皮肤的开关，直接替换原有武将皮肤显示；
\t- 目前不支持动态皮肤的切换功能；
\t- 动态皮肤参数表在线文档链接：https://docs.qq.com/sheet/DS2Vaa0ZGWkdMdnZa；可以在群在线文档提供你设置好的参数
\t- 所有相关的文件请放到\t十周年UI/assets/dynamic目录下；
\t- 关于格式请参考下面示例：
\t\t武将名:{
\t\t\t皮肤名:{
\t\t\t\tname: "xxx",\t//\t必★填\t骨骼名称，一般是yyy.skel，注意xxx不带后缀名.skel；
\t\t\t\taction: "xxx",\t//\t可删掉\t播放动作，xxx 一般是 DaiJi，目前手杀的骨骼文件需要填；
\t\t\t\tx: [10, 0.5],\t//\t可删掉\t[10, 0.5]相当于 left: calc(10px + 50%)，不填默认为[0, 0.5]；
\t\t\t\ty: [10, 0.5],\t//\t可删掉\t[10, 0.5]相当于 bottom: calc(10px + 50%)，不填默认为[0, 0.5]；
\t\t\t\tscale: 0.5,\t\t//\t可删掉\t缩放大小，不填默认为1；
\t\t\t\tangle: 0,\t\t//\t可删掉\t旋转角度，不填默认为0；
\t\t\t\tspeed: 1,\t\t//\t可删掉\t播放速度，不填默认为1；
\t\t\t\thideSlots: ['隐藏的部件'],\t// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
\t\t\t\tclipSlots: ['裁剪的部件'],\t// 剪掉超出头的部件，仅针对露头动皮，其他勿用
\t\t\t\tbackground: "xxx.jpg",\t//\t可删掉\t背景图片，注意后面要写后缀名，如.jpg .png等 
\t\t\t}
\t\t},
\t- 为了方便得到动皮的显示位置信息，请在游戏选将后，用控制台或调试助手小齿轮执行以下代码(没用到的属性请删掉以免报错):
\t\tgame.me.stopDynamic();
\t\tgame.me.playDynamic({
\t\t\tname: 'xxxxxxxxx',\t\t// 勿删
\t\t\taction: undefined,
\t\t\tspeed: 1,
\t\t\tloop: true,\t\t\t\t// 勿删
\t\t\tx: [0, 0.5],
\t\t\ty: [0, 0.5],
\t\t\tscale: 0.5,
\t\t\tangle: 0,
\t\t\thideSlots: ['隐藏的部件'],\t// 隐藏不需要的部件，想知道具体部件名称请使用SpineAltasSplit工具查看
\t\t\tclipSlots: ['裁剪的部件'],\t// 剪掉超出头的部件，仅针对露头动皮，其他勿用
\t\t});
\t\t// 这里可以改成  }, true);  设置右将动皮
\t*/
\t
\tdecadeUI.dynamicSkin = {\n`)

        // 首先筛选出, 一模一样的, 放入extend中
        let extendsWujiang = {}
        let to_extend_map = {}
        for (let wujiang in dskins) {
            let to_extend = null
            for (let w in extendsWujiang) {
                if (w !== wujiang && dskins[wujiang] === extendsWujiang[w]) {
                    to_extend = w
                    break
                }
            }
            if (to_extend) {
                if (!(to_extend in to_extend_map)) {
                    to_extend_map[to_extend] = []
                }
                to_extend_map[to_extend].push(wujiang)
            } else {
                extendsWujiang[wujiang] = dskins[wujiang]
            }
        }

        // 遍历所有D动皮皮肤动皮参数, 进行写入本地文件.
        for (let wujiang in dskins) {
            if (!(wujiang in extendsWujiang)) continue

            let skins = dskins[wujiang]
            stringBuffer.push(`\t\t${wujiang}: {\n`)
            for (let skinName in skins) {
                stringBuffer.push(`\t\t\t${skinName}: {\n`)
                let skin = skins[skinName]
                let daijiParams = {}
                let gongjiParams = null
                let teshuParams = null
                let chuchangParams = null
                for (let k in skin) {
                    if (k === 'effects') {
                        // 只有当effects是对象时进行操作
                        if (typeof skin[k] === 'object') {
                            if (skin.effects.chuchang) {
                                if (typeof skin.effects.chuchang === 'string') {
                                    chuchangParams = {name: skin.effects.chuchang}
                                } else {
                                    chuchangParams = skin.effects.chuchang;
                                }
                            }
                            if (skin.effects.gongji) {
                                if (typeof skin.effects.gongji === 'string') {
                                    gongjiParams = {name: skin.effects.gongji}
                                } else {
                                    gongjiParams = skin.effects.gongji;
                                }
                            }
                            if (skin.effects.jineng) {
                                if (typeof skin.effects.gongji === 'string') {
                                    teshuParams = {name: skin.effects.jineng}
                                } else {
                                    teshuParams = skin.effects.jineng
                                }
                            }
                        }
                    } else if (k === 'dynamicBackground') {
                        if (typeof skin[k] === 'string') {
                            daijiParams['beijing', 'qianjing'] = {name: skin[k]}
                        } else {
                            daijiParams['beijing', 'qianjing'] = skin[k]
                        }
                    } else {
                        if (skin[k] === undefined || k === 'gongji' || k === 'chuchang' || k === 'teshu') {
                            continue
                        }
                        daijiParams[k] = skin[k]
                    }
                }
                if (skin.mirror) {
                    daijiParams.atkFlipX = true  // 添加翻转
                }
                if (skin.decade) {
                    daijiParams.shizhounian = true
                }
                // 当如果添加了json参数, 给所有的骨骼都添加上json参数
                if (skin.json) {
                    for (let p of [gongjiParams, teshuParams, chuchangParams]) {
                        if (p) {
                            p.json = skin.json
                        }
                    }
                }

                // 开始填写皮肤切换参数.
                for (let k in daijiParams) {
                    if ('beijing' !== k) {
                        stringBuffer.push(`\t\t\t\t${k}: ${JSON.stringify(daijiParams[k])},\n`)
                    }
                }

                if ('beijing' in daijiParams) {
                    stringBuffer.push(`\t\t\t\tbeijing: {\n`)
                    for (let k in daijiParams.beijing) {
                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(daijiParams.beijing[k])},\n`)
                    }
                    stringBuffer.push(`\t\t\t\t},\n`)
                }
                if ('qianjing' in daijiParams) {
                    stringBuffer.push(`\t\t\t\tqianjing: {\n`)
                    for (let k in daijiParams.qianjing) {
                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(daijiParams.qianjing[k])},\n`)
                    }
                    stringBuffer.push(`\t\t\t\t},\n`)
                }

                if (chuchangParams) {
                    stringBuffer.push(`\t\t\t\tchuchang: {\n`);
                    for (let k in chuchangParams) {
                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(chuchangParams[k])},\n`)
                    }
                    stringBuffer.push(`\t\t\t\t},\n`);
                }

                if (gongjiParams) {
                    stringBuffer.push(`\t\t\t\tgongji: {\n`)
                    for (let k in gongjiParams) {
                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(gongjiParams[k])},\n`)
                    }
                    stringBuffer.push(`\t\t\t\t},\n`)
                }

                if (teshuParams) {
                    stringBuffer.push(`\t\t\t\tteshu: {\n`)
                    for (let k in teshuParams) {
                        stringBuffer.push(`\t\t\t\t\t${k}: ${JSON.stringify(teshuParams[k])},\n`)
                    }
                    stringBuffer.push(`\t\t\t\t},\n`)
                }
                stringBuffer.push(`\t\t\t},\n`)

            }
            stringBuffer.push(`\t\t},\n`)
        }
        stringBuffer.push('\t}\n')
        // 写extends
        stringBuffer.push('\n')
        stringBuffer.push('\tvar extend = {\n')
        for (let k in to_extend_map) {
            for (let mm of to_extend_map[k]) {
                stringBuffer.push(`\t\t${mm}: decadeUI.dynamicSkin.${k},\n`)
            }
        }
        stringBuffer.push('\t}\n')
        stringBuffer.push('\tdecadeUI.get.extend(decadeUI.dynamicSkin, extend);\n')

        stringBuffer.push('})\n')


        return stringBuffer.join('')
    }
}