/**
 * 互动出框播放控制系统
 * 响应其他玩家的卡牌使用，触发相应的出框动画
 */

class InteractiveChukuang {
    constructor() {
        this.settings = {
            enableTouch: true,
            enableGesture: true,
            enableHover: false,
            enableSound: true,
            triggerDelay: 200,
            doubleTapDelay: 400,
            animationSpeed: 1.0,
            autoLoop: false,
            soundVolume: 0.5
        };

        this.gestureActions = {
            tap: 'GongJi',
            doubletap: 'TeShu',
            press: 'hudong',
            swipe: 'chuchang'
        };

        this.stats = {
            triggerCount: 0,
            lastAction: '无',
            currentStatus: '就绪'
        };

        this.cardListeners = new Map();
        this.touchHandler = null;
        this.isCollapsed = false;
        this.lastTapTime = 0;
        
        this.init();
    }

    init() {
        this.initUI();
        this.initEventListeners();
        this.initTouchGestures();
        this.initCardMonitor();
        this.loadSettings();
    }

    initUI() {
        // 面板切换
        const panelToggle = document.getElementById('panel-toggle');
        panelToggle.addEventListener('click', () => this.togglePanel());

        // 滑块值显示更新
        this.initRangeSliders();

        // 快捷操作按钮
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.triggerAction(action, 'manual');
            });
        });

        // 设置项监听
        this.initSettingListeners();
    }

    initRangeSliders() {
        const sliders = [
            { id: 'trigger-delay', valueId: 'delay-value', suffix: 'ms' },
            { id: 'double-tap-delay', valueId: 'double-tap-value', suffix: 'ms' },
            { id: 'animation-speed', valueId: 'speed-value', suffix: 'x' },
            { id: 'sound-volume', valueId: 'volume-value', suffix: '%' }
        ];

        sliders.forEach(({ id, valueId, suffix }) => {
            const slider = document.getElementById(id);
            const valueDisplay = document.getElementById(valueId);
            
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                valueDisplay.textContent = value + suffix;
                this.updateSetting(id, parseFloat(value));
            });
        });
    }

    initSettingListeners() {
        const checkboxes = [
            'enable-touch', 'enable-gesture', 'enable-hover', 
            'enable-sound', 'auto-loop'
        ];

        checkboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            checkbox.addEventListener('change', (e) => {
                this.updateSetting(id, e.target.checked);
            });
        });

        // 手势动作选择
        document.querySelectorAll('.gesture-action').forEach(select => {
            select.addEventListener('change', (e) => {
                const gesture = e.target.closest('.gesture-item').dataset.gesture;
                this.gestureActions[gesture] = e.target.value;
                this.saveSettings();
            });
        });
    }

    initEventListeners() {
        // 监听主游戏区域
        document.addEventListener('DOMContentLoaded', () => {
            this.bindGameAreaEvents();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.altKey) return;
            
            const keyActions = {
                '1': 'GongJi',
                '2': 'TeShu', 
                '3': 'chuchang',
                '4': 'hudong'
            };

            if (keyActions[e.key]) {
                e.preventDefault();
                this.triggerAction(keyActions[e.key], 'keyboard');
            }
        });
    }

    bindGameAreaEvents() {
        // 尝试绑定到游戏主界面
        const gameArea = document.querySelector('.game-area') || 
                        document.querySelector('#game') || 
                        document.querySelector('.main-game') ||
                        document.body;

        if (this.settings.enableHover) {
            this.bindHoverEvents(gameArea);
        }
    }

    bindHoverEvents(element) {
        element.addEventListener('mouseenter', (e) => {
            if (e.target.classList.contains('player-card') || 
                e.target.closest('.player-card')) {
                this.showHoverPreview(e.target);
            }
        });

        element.addEventListener('mouseleave', (e) => {
            this.hideHoverPreview();
        });
    }

    initTouchGestures() {
        if (!window.AnyTouch) {
            console.warn('AnyTouch库未加载，触摸手势功能不可用');
            return;
        }

        const gameArea = document.querySelector('.game-area') || document.body;
        this.touchHandler = new AnyTouch(gameArea);

        // 配置手势识别
        this.touchHandler.set({
            touchAction: 'auto',
            recognizers: [
                ['tap', { time: 250, threshold: 9 }],
                ['press', { time: 600, threshold: 9 }],
                ['swipe', { threshold: 10, velocity: 0.3 }]
            ]
        });

        this.bindGestureEvents();
    }

    bindGestureEvents() {
        if (!this.touchHandler) return;

        // 单击
        this.touchHandler.on('tap', (e) => {
            if (!this.settings.enableTouch) return;
            
            const now = Date.now();
            if (now - this.lastTapTime < this.settings.doubleTapDelay) {
                // 双击
                this.handleGesture('doubletap', e);
            } else {
                // 单击延迟检测
                setTimeout(() => {
                    if (Date.now() - this.lastTapTime >= this.settings.doubleTapDelay) {
                        this.handleGesture('tap', e);
                    }
                }, this.settings.doubleTapDelay);
            }
            this.lastTapTime = now;
        });

        // 长按
        this.touchHandler.on('press', (e) => {
            if (!this.settings.enableGesture) return;
            this.handleGesture('press', e);
        });

        // 滑动
        this.touchHandler.on('swipe', (e) => {
            if (!this.settings.enableGesture) return;
            this.handleGesture('swipe', e);
        });
    }

    handleGesture(gestureType, event) {
        const action = this.gestureActions[gestureType];
        if (!action) return;

        // 显示触摸指示器
        this.showTouchIndicator(event.center || event);
        
        // 显示手势提示
        this.showGestureHint(gestureType, action);

        // 延迟触发动作
        setTimeout(() => {
            this.triggerAction(action, gestureType);
        }, this.settings.triggerDelay);
    }

    showTouchIndicator(point) {
        const indicator = document.getElementById('touch-indicator');
        indicator.style.left = point.x + 'px';
        indicator.style.top = point.y + 'px';
        indicator.classList.add('active');

        // 创建涟漪效果
        const ripple = indicator.querySelector('.ripple');
        ripple.style.animation = 'none';
        setTimeout(() => {
            ripple.style.animation = 'ripple 0.6s ease-out';
        }, 10);

        setTimeout(() => {
            indicator.classList.remove('active');
        }, 600);
    }

    showGestureHint(gestureType, action) {
        const hint = document.getElementById('gesture-hint');
        const hintIcon = hint.querySelector('.hint-icon');
        const hintText = hint.querySelector('.hint-text');

        const gestureIcons = {
            tap: '👆',
            doubletap: '👆👆', 
            press: '👇',
            swipe: '👈👉'
        };

        const actionNames = {
            GongJi: '攻击动画',
            TeShu: '特殊动画',
            chuchang: '出场动画',
            hudong: '互动动画'
        };

        hintIcon.textContent = gestureIcons[gestureType] || '👆';
        hintText.textContent = actionNames[action] || action;

        hint.classList.add('show');
        setTimeout(() => {
            hint.classList.remove('show');
        }, 1500);
    }

    initCardMonitor() {
        // 监听卡牌使用事件
        this.observeGameEvents();
        this.interceptNetworkRequests();
    }

    observeGameEvents() {
        // 观察DOM变化来检测卡牌使用
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.checkForCardEvents(mutation);
                }
            });
        });

        // 观察整个游戏区域
        const gameArea = document.querySelector('.game-area') || document.body;
        observer.observe(gameArea, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'data-card', 'data-action']
        });
    }

    checkForCardEvents(mutation) {
        // 检查新增的元素是否为卡牌相关
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (this.isCardElement(node)) {
                    this.onCardDetected(node);
                }
            }
        });
    }

    isCardElement(element) {
        const cardClasses = [
            'card-use', 'card-played', 'skill-use', 
            'card-animation', 'player-action'
        ];
        
        return cardClasses.some(className => 
            element.classList.contains(className) ||
            element.querySelector(`.${className}`)
        );
    }

    onCardDetected(cardElement) {
        const cardInfo = this.extractCardInfo(cardElement);
        if (cardInfo) {
            this.respondToCard(cardInfo);
        }
    }

    extractCardInfo(element) {
        // 从DOM元素提取卡牌信息
        const cardData = {
            type: element.dataset.card || element.dataset.type,
            player: element.dataset.player,
            target: element.dataset.target,
            action: element.dataset.action,
            element: element
        };

        // 通过类名判断卡牌类型
        if (element.classList.contains('damage-card')) {
            cardData.category = 'damage';
        } else if (element.classList.contains('heal-card')) {
            cardData.category = 'heal';
        } else if (element.classList.contains('skill-card')) {
            cardData.category = 'skill';
        }

        return cardData;
    }

    respondToCard(cardInfo) {
        // 根据卡牌信息选择响应动画
        const responseAction = this.getResponseAction(cardInfo);
        
        if (responseAction) {
            this.updateStatus('响应中', cardInfo.type || '未知卡牌');
            
            setTimeout(() => {
                this.triggerAction(responseAction, 'card-response', cardInfo);
            }, this.settings.triggerDelay);
        }
    }

    getResponseAction(cardInfo) {
        // 根据卡牌类型确定响应动画
        const cardResponses = {
            // 伤害类卡牌 -> 攻击动画
            'sha': 'GongJi',
            'damage': 'GongJi',
            'lightning': 'GongJi',
            
            // 治疗类卡牌 -> 互动动画  
            'peach': 'hudong',
            'heal': 'hudong',
            'medicine': 'hudong',
            
            // 技能类卡牌 -> 特殊动画
            'skill': 'TeShu',
            'ultimate': 'TeShu',
            'special': 'TeShu',
            
            // 出场类 -> 出场动画
            'enter': 'chuchang',
            'appear': 'chuchang'
        };

        return cardResponses[cardInfo.type] || 
               cardResponses[cardInfo.category] || 
               this.getRandomResponse();
    }

    getRandomResponse() {
        const actions = ['GongJi', 'TeShu', 'hudong', 'chuchang'];
        return actions[Math.floor(Math.random() * actions.length)];
    }

    interceptNetworkRequests() {
        // 拦截网络请求来检测卡牌使用
        const originalFetch = window.fetch;
        const originalXHR = XMLHttpRequest.prototype.open;

        window.fetch = async (...args) => {
            const response = await originalFetch(...args);
            this.analyzeRequest(args[0], null, response);
            return response;
        };

        XMLHttpRequest.prototype.open = function(method, url, ...args) {
            this.addEventListener('load', () => {
                window.interactiveChukuang?.analyzeRequest(url, this.responseText);
            });
            return originalXHR.call(this, method, url, ...args);
        };
    }

    analyzeRequest(url, responseText, response) {
        // 分析请求内容来检测卡牌使用
        if (typeof url === 'string' && (
            url.includes('useCard') || 
            url.includes('playCard') ||
            url.includes('skill') ||
            url.includes('action')
        )) {
            this.onNetworkCardEvent(url, responseText, response);
        }
    }

    async onNetworkCardEvent(url, responseText, response) {
        try {
            let data = responseText;
            if (response && response.json) {
                data = await response.clone().json();
            } else if (typeof responseText === 'string') {
                try {
                    data = JSON.parse(responseText);
                } catch (e) {
                    data = { url, text: responseText };
                }
            }

            const cardInfo = this.parseNetworkCardData(data, url);
            if (cardInfo) {
                this.respondToCard(cardInfo);
            }
        } catch (error) {
            console.warn('解析网络卡牌事件失败:', error);
        }
    }

    parseNetworkCardData(data, url) {
        // 解析网络数据中的卡牌信息
        const cardInfo = {
            source: 'network',
            url: url
        };

        if (data.card) {
            cardInfo.type = data.card.name || data.card.type;
            cardInfo.player = data.player;
            cardInfo.target = data.target;
        } else if (data.action) {
            cardInfo.action = data.action;
            cardInfo.type = data.type;
        }

        return Object.keys(cardInfo).length > 2 ? cardInfo : null;
    }

    triggerAction(action, source = 'manual', cardInfo = null) {
        if (!this.settings.enableTouch && source === 'tap') return;
        if (!this.settings.enableGesture && 
            ['doubletap', 'press', 'swipe'].includes(source)) return;

        this.playSound();
        this.updateStats(action);
        this.sendActionToGame(action, source, cardInfo);
        this.updateStatus('播放中', action);

        // 播放完成后重置状态
        setTimeout(() => {
            this.updateStatus('就绪', action);
        }, 2000);
    }

    sendActionToGame(action, source, cardInfo) {
        // 发送动作到游戏的出框系统
        const actionData = {
            action: action,
            source: source,
            speed: this.settings.animationSpeed,
            loop: this.settings.autoLoop,
            cardInfo: cardInfo,
            timestamp: Date.now()
        };

        // 尝试多种方式发送到游戏系统
        this.sendViaWorker(actionData);
        this.sendViaEvent(actionData);
        this.sendViaGlobalFunction(actionData);
    }

    sendViaWorker(actionData) {
        // 通过Worker发送
        if (window.chukuangWorker) {
            window.chukuangWorker.postMessage({
                type: 'interactive-action',
                data: actionData
            });
        }
    }

    sendViaEvent(actionData) {
        // 通过自定义事件发送
        document.dispatchEvent(new CustomEvent('interactiveChukuang', {
            detail: actionData
        }));

        // 也尝试window事件
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'interactive-chukuang',
                data: actionData
            }, '*');
        }
    }

    sendViaGlobalFunction(actionData) {
        // 通过全局函数发送
        const globalFunctions = [
            'triggerChukuang',
            'playAnimation', 
            'playChukuangAction',
            'executeAction'
        ];

        globalFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                try {
                    window[funcName](actionData);
                } catch (error) {
                    console.warn(`调用${funcName}失败:`, error);
                }
            }
        });
    }

    playSound() {
        if (!this.settings.enableSound) return;

        const sounds = ['touch-sound', 'gesture-sound'];
        const soundId = sounds[Math.floor(Math.random() * sounds.length)];
        const audio = document.getElementById(soundId);
        
        if (audio) {
            audio.volume = this.settings.soundVolume;
            audio.currentTime = 0;
            audio.play().catch(e => console.warn('音效播放失败:', e));
        }
    }

    updateStats(action) {
        this.stats.triggerCount++;
        this.stats.lastAction = this.getActionName(action);
        
        document.getElementById('trigger-count').textContent = this.stats.triggerCount;
        document.getElementById('last-action').textContent = this.stats.lastAction;
    }

    updateStatus(status, action = '') {
        this.stats.currentStatus = status;
        const statusElement = document.getElementById('current-status');
        statusElement.textContent = action ? `${status} - ${this.getActionName(action)}` : status;
    }

    getActionName(action) {
        const actionNames = {
            GongJi: '攻击动画',
            TeShu: '特殊动画', 
            chuchang: '出场动画',
            hudong: '互动动画'
        };
        return actionNames[action] || action;
    }

    updateSetting(key, value) {
        const settingMap = {
            'enable-touch': 'enableTouch',
            'enable-gesture': 'enableGesture', 
            'enable-hover': 'enableHover',
            'enable-sound': 'enableSound',
            'trigger-delay': 'triggerDelay',
            'double-tap-delay': 'doubleTapDelay',
            'animation-speed': 'animationSpeed',
            'auto-loop': 'autoLoop',
            'sound-volume': 'soundVolume'
        };

        const settingName = settingMap[key] || key;
        this.settings[settingName] = value;
        
        // 特殊处理
        if (settingName === 'soundVolume') {
            this.settings.soundVolume = value / 100;
        }

        this.saveSettings();
        this.applySettings();
    }

    applySettings() {
        // 应用设置变化
        if (this.touchHandler) {
            if (this.settings.enableTouch || this.settings.enableGesture) {
                this.touchHandler.start();
            } else {
                this.touchHandler.stop();
            }
        }
    }

    togglePanel() {
        this.isCollapsed = !this.isCollapsed;
        const panel = document.getElementById('interactive-panel');
        const toggleIcon = document.querySelector('#panel-toggle i');
        
        panel.classList.toggle('collapsed', this.isCollapsed);
        toggleIcon.style.transform = this.isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    showHoverPreview(element) {
        // 悬停预览功能
        console.log('悬停预览:', element);
    }

    hideHoverPreview() {
        // 隐藏悬停预览
    }

    saveSettings() {
        try {
            localStorage.setItem('interactiveChukuangSettings', JSON.stringify({
                settings: this.settings,
                gestureActions: this.gestureActions
            }));
        } catch (error) {
            console.warn('保存设置失败:', error);
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('interactiveChukuangSettings');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(this.settings, data.settings);
                Object.assign(this.gestureActions, data.gestureActions);
                this.applySavedSettings();
            }
        } catch (error) {
            console.warn('加载设置失败:', error);
        }
    }

    applySavedSettings() {
        // 应用已保存的设置到UI
        Object.entries(this.settings).forEach(([key, value]) => {
            const element = document.getElementById(this.getSettingElementId(key));
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value;
                } else if (element.type === 'range') {
                    element.value = value;
                    element.dispatchEvent(new Event('input'));
                }
            }
        });

        // 应用手势动作设置
        Object.entries(this.gestureActions).forEach(([gesture, action]) => {
            const select = document.querySelector(`.gesture-item[data-gesture="${gesture}"] .gesture-action`);
            if (select) {
                select.value = action;
            }
        });
    }

    getSettingElementId(settingKey) {
        const keyMap = {
            enableTouch: 'enable-touch',
            enableGesture: 'enable-gesture',
            enableHover: 'enable-hover', 
            enableSound: 'enable-sound',
            triggerDelay: 'trigger-delay',
            doubleTapDelay: 'double-tap-delay',
            animationSpeed: 'animation-speed',
            autoLoop: 'auto-loop',
            soundVolume: 'sound-volume'
        };
        return keyMap[settingKey] || settingKey;
    }

    destroy() {
        if (this.touchHandler) {
            this.touchHandler.destroy();
        }
        // 恢复原始的网络请求方法
        // 移除事件监听器
    }
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    window.interactiveChukuang = new InteractiveChukuang();
});

// 导出给其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveChukuang;
} 