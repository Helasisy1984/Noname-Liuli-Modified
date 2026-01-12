/**
 * 回合计数变身功能示例
 * 
 * 此示例展示了如何配置角色在特定回合自动变身
 * 使用方法：将此配置应用到角色的动皮special参数中
 */

// 示例1: 简单的回合计数变身 - 第2回合变身
let example1 = {
    // 定义变身皮肤
    变身: {
        name: 'caocao/战场绝版', // 不同骨骼, 格式为 '角色id/皮肤名称'
        effect: 'shaohui', // 变身特效
        audio: '曹操/audio/skill/victory', // 变身时播放的语音
    },
    // 定义播放的特效
    play: {
        name: "曹操/战场绝版/chuchang",
        scale: 1,
        x: [0,0.8],
        y: [0,0.4],
        audio: '曹操/audio/XingXiang', // 播放特效时的语音
    },
    // 触发条件设置
    condition: {
        // 回合计数触发
        roundCount: {
            rounds: 2, // 第2回合时触发变身
            transform: "变身", // 要变成的皮肤
            play: 'play', // 播放的特效
            audio: '曹操/audio/round', // 触发时的语音
        }
    }
};

// 示例2: 多个回合变身 - 不同角色设置
// 第2回合第一次变身
let example2_round2 = {
    变身1: {
        name: 'zhangliao/突袭骑兵',
        effect: 'shaohui',
    },
    play1: {
        name: "张辽/突袭骑兵/chuchang",
        scale: 1,
    },
    condition: {
        roundCount: {
            rounds: 2,
            transform: "变身1",
            play: 'play1',
        }
    }
};

// 第4回合第二次变身
let example2_round4 = {
    变身2: {
        name: 'zhangliao/武动乾坤',
        effect: 'juexing_zhangliao',
    },
    play2: {
        name: "张辽/武动乾坤/chuchang",
        scale: 1.2,
    },
    condition: {
        roundCount: {
            rounds: 4,
            transform: "变身2",
            play: 'play2',
        }
    }
};

// 示例3: 角色血量和回合结合的变身条件
let example3 = {
    变身低血量: {
        hp: 2, // 血量低于2时
        name: 'xiahoudun/战场绝版',
        effect: 'shaohui',
    },
    变身回合: {
        name: 'xiahoudun/武动乾坤',
        effect: 'shaohui',
    },
    play: {
        name: "夏侯惇/武动乾坤/chuchang",
        scale: 1,
    },
    condition: {
        // 低血量触发
        lowhp: {
            transform: "变身低血量",
            recover: true, // 恢复血量时是否变回原来的
            play: 'play',
        },
        // 回合计数触发
        roundCount: {
            rounds: 3, // 第3回合时触发
            transform: "变身回合",
            play: 'play',
        }
    }
};

// 示例4: 每X回合触发一次的循环变身效果
// 这需要多个技能配合实现，因为需要记录当前回合数
// 这是一个概念示例，实际使用需要自己编写相关技能
let example4_concept = {
    变身1: {
        name: 'zhouyu/赤壁之战',
    },
    变身2: {
        name: 'zhouyu/武动乾坤',
    },
    play: {
        name: "周瑜/赤壁之战/chuchang",
        scale: 1,
    },
    condition: {
        roundCount: {
            rounds: 2, // 第2回合时触发变身1
            transform: "变身1",
            play: 'play',
        }
    }
};

/**
 * 使用说明:
 * 
 * 1. 在角色的动皮special参数中配置上述示例
 * 2. 游戏开始后，系统会在指定回合自动触发变身效果
 * 3. 可以结合其他触发条件（如低血量、击杀等）组合使用
 * 4. 不同的回合可以触发不同的变身效果
 */ 