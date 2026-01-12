// 技能特效绑定  武将id 技能函数
window.pfqhSkillEffect = {
    caiwenji: [
        {
            trigger: { player: 'judgeEnd' },
            filter: function (event, player) {
                let ep = event.getParent()
                if (!ep.player.dynamic) return false
                return ep.name === 'olbeige' || ep.name === 'beige' || ep.name === 'rebeige' || ep.name === 'dshj_beige'
            },
            direct: true,
            charlotte: true,
            forced: true,
            silent: true,
            content: function () {
                if (!trigger.result || !trigger.result.suit) return;
                let position = { x: [0, 0.5], y: [0, 0.5], scale: 1.3, speed: 0.8 }
                switch (trigger.result.suit) {
                    case 'spade':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/蔡文姬/jineng02',
                            json: true,
                            version: '4.0',
                            action: 'play',
                        }, position)
                        break;
                    case 'heart':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/蔡文姬/jineng02',
                            json: true,
                            version: '4.0',
                            action: 'play4',
                        }, position)
                        break;
                    case 'club':
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/蔡文姬/jineng02',
                            json: true,
                            version: '4.0',
                            action: 'play2',
                        }, position)
                        break;
                    default:
                        skinSwitch.chukuangWorkerApi.playEffect({
                            name: '../../../皮肤切换/effects/蔡文姬/jineng02',
                            json: true,
                            version: '4.0',
                            action: 'play3',
                        }, position)
                }
            }
        },
    ],
}