/**
 * 用户自定义特效
 * 此文件由骨骼编辑器生成
 */
window.pfqhUserEffects = {
    // 特效配置将会被添加到此对象中
};

/**
 * 应用用户特效
 * 此函数会被自动调用来加载用户创建的特效
 */
window.applyUserEffects = function() {
    if (!window.pfqhSkillEffect) {
        window.pfqhSkillEffect = {};
    }
    
    // 从本地存储加载已保存的特效
    try {
        const effectsConfig = game.getExtensionConfig('皮肤切换', 'effects') || {};
        
        // 将特效按武将分组
        const heroEffects = {};
        
        for (let effectName in effectsConfig) {
            const effect = effectsConfig[effectName].effect;
            if (!effect) continue;
            
            // 根据特效类型分配到不同的触发器中
            if (effect.type === 'skill') {
                // 根据技能名称找到可能的武将
                const skillName = effect.skillName;
                const possibleHeroes = findHeroBySkill(skillName);
                
                for (let hero of possibleHeroes) {
                    if (!heroEffects[hero]) {
                        heroEffects[hero] = [];
                    }
                    
                    // 添加特效代码
                    heroEffects[hero].push(effectsConfig[effectName].code);
                }
            } else {
                // 通用特效，添加到common组
                if (!heroEffects['common']) {
                    heroEffects['common'] = [];
                }
                heroEffects['common'].push(effectsConfig[effectName].code);
            }
        }
        
        // 将分组后的特效添加到全局特效对象中
        for (let hero in heroEffects) {
            if (hero === 'common') {
                // 通用特效添加到所有武将
                for (let h in window.pfqhSkillEffect) {
                    window.pfqhSkillEffect[h] = window.pfqhSkillEffect[h] || [];
                    window.pfqhSkillEffect[h].push(...heroEffects['common']);
                }
            } else {
                // 武将特定特效
                window.pfqhSkillEffect[hero] = window.pfqhSkillEffect[hero] || [];
                window.pfqhSkillEffect[hero].push(...heroEffects[hero]);
            }
        }
        
        console.log('用户自定义特效加载完成');
    } catch (e) {
        console.error('加载用户特效失败:', e);
    }
};

/**
 * 根据技能名称查找可能的武将
 * @param {string} skillName - 技能名称
 * @return {Array} - 可能拥有此技能的武将数组
 */
function findHeroBySkill(skillName) {
    const heroes = [];
    
    // 遍历所有武将
    for (let heroName in lib.character) {
        const hero = lib.character[heroName];
        if (!hero) continue;
        
        // 获取武将技能列表
        const skills = hero[3] || [];
        
        // 检查技能是否匹配
        if (skills.includes(skillName)) {
            heroes.push(heroName);
        }
    }
    
    // 如果没有找到武将，返回一个通用标识
    if (heroes.length === 0) {
        return ['common'];
    }
    
    return heroes;
} 