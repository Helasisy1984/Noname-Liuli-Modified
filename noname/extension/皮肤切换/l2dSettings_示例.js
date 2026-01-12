window.pfqhLive2dSettings = {

    // 默认的配置,每个模型可以覆盖配置
    baseSetting:{
        width: 0.2,  // 占屏幕的百分比
        height: 0.4,  // 占屏幕的宽度
        left: "120px",
        bottom: "180px",
        basePath: 'extension/皮肤切换/live2d_assets/',  // 存放基础的路径
        opacity: 1,   // 透明度
        draggable: true,  // 是否可拖拽
        scaleFactor: 1.5,
        volume: 0.3,  // 默认的语音播放音量大小  0-1
        // scale: xxx,  // 不写自适应
        // x: xxx  // x坐标
        // y: yyy  // y坐标 可以重新定义
        // idle: 'xxx'  // 手动指定待机播放的动作组
        // idleKeys: []  // ['idle', 'home', 'stand', 'loop'] 默认包含这些关键字的会当作idle分组用作待机, 比如碧蓝航线的待机分组就是非标准的
    },
    models: {
        // 对于每个模型都可以覆盖上面配置, 基础信息皆可覆盖
        dafeng_4: {
            role: 'dafeng_4/dafeng_4.model3.json',
            name: 'dafeng_4',  // 显示在选项上的, 默认为key
        },
        dafeng_2: {
            role: 'dafeng_2/dafeng_2.model3.json',
            name: 'dafeng_2',  //
            width: 0.2,  // 可以覆盖默认的宽度'
            height: 0.4,
            left: "120px",
            bottom: "180px",
        },
        kubo_2: {
            role: 'kubo_2/kubo_2.model3.json',
            name: 'kubo_2',  // 显示在选项上的, 默认为key
        },
        dujiaoshou_4: {
            role: 'dujiaoshou_4/dujiaoshou_4.model3.json',
            name: 'dujiaoshou_4',  //
        },
        dafeng_3: {
            role: 'dafeng_3/dafeng_3.model3.json',
            name: 'dafeng_3',  //
            idleKeys: ['idle']
        },
    }
}