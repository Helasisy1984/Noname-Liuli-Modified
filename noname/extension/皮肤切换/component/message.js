/* message.js */

class SkinSwitchMessage {

    /**
     * 构造函数会在实例化的时候自动执行
     */
    constructor() {
        const containerId = 'message-container';
        // 检测下html中是否已经有这个message-container元素
        this.containerEl = document.getElementById(containerId);

        if (!this.containerEl) {
            // 创建一个Element对象，也就是创建一个id为message-container的dom节点
            this.containerEl = document.createElement('div');
            this.containerEl.id = containerId;
            // 把message-container元素放在html的body末尾
            document.body.appendChild(this.containerEl);
        }
    }

    show({ type = 'info', text = '', duration = 2000, closeable = false }) {
        // 创建一个Element对象
        let messageEl = document.createElement('div');
        // 设置消息class，这里加上move-in可以直接看到弹出效果
        messageEl.className = 'message move-in';
        // 消息内部html字符串
        messageEl.innerHTML = `
            <span class="iconfont icon-${type}"></span>
            <div class="text">${text}</div>
        `;

        // 是否展示关闭按钮
        if (closeable) {
            // 创建一个关闭按钮
            let closeEl = document.createElement('div');
            closeEl.className = 'close iconfont icon-close';
            // 把关闭按钮追加到message元素末尾
            messageEl.appendChild(closeEl);

            // 监听关闭按钮的click事件，触发后将调用我们的close方法
            // 我们把刚才写的移除消息封装为一个close方法
            closeEl.addEventListener('click', () => {
                this.close(messageEl)
            });
        }

        // 追加到message-container末尾
        // this.containerEl属性是我们在构造函数中创建的message-container容器
        this.containerEl.appendChild(messageEl);

        // 只有当duration大于0的时候才设置定时器，这样我们的消息就会一直显示
        if (duration > 0) {
            // 用setTimeout来做一个定时器
            setTimeout(() => {
                this.close(messageEl);
            }, duration);
        }
    }

    /**
     * 关闭某个消息
     * 由于定时器里边要移除消息，然后用户手动关闭事件也要移除消息，所以我们直接把移除消息提取出来封装成一个方法
     * @param {Element} messageEl
     */
    close(messageEl) {
        // 首先把move-in这个弹出动画类给移除掉，要不然会有问题，可以自己测试下
        messageEl.className = messageEl.className.replace('move-in', '');
        // 增加一个move-out类
        messageEl.className += 'move-out';

        // move-out动画结束后把元素的高度和边距都设置为0
        // 由于我们在css中设置了transition属性，所以会有一个过渡动画
        messageEl.addEventListener('animationend', () => {
            messageEl.setAttribute('style', 'height: 0; margin: 0');
        });

        // 这个地方是监听transition的过渡动画结束事件，在动画结束后把消息从dom树中移除。
        messageEl.addEventListener('transitionend', () => {
            // Element对象内部有一个remove方法，调用之后可以将该元素从dom树种移除！
            messageEl.remove();
        });
    }

}