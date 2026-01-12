/* 
 *
 * https://github.com/accforgit/blog-data/blob/master/%E7%AE%80%E5%8D%95%E5%88%86%E9%A1%B5/demo/index.html
 */

/**
 * 简单分页类
 */
"use strict";
class SimplePagination {
    constructor(totalPageCount) {
        if (typeof totalPageCount !== 'number' || totalPageCount < 1) {
            console.error('totalPageCount must be a positive integer');
            return;
        }
        this.state = {
            pageNumber: 1,
            totalPageCount: Math.max(1, Math.floor(totalPageCount))
        }
    }

    init(paramsObj) {
        // 检查参数是否为有效对象
        if (typeof paramsObj !== 'object' || paramsObj === null) {
            console.error('init() requires a valid configuration object');
            return;
        }
        
        let state = this.state;
        // 页面元素的外部容器
        state.container = paramsObj.container || 'body';
        
        // 确保容器元素存在
        if (!this.selectorEle(state.container)) {
            console.error(`Container element "${state.container}" not found`);
            return;
        }

        // 不包括开头和结尾的两个固定按钮外，中间最多展示几个数字页码按钮
        state.maxShowBtnCount = Math.max(1, parseInt(paramsObj.maxShowBtnCount) || 5);
        // 所有的页码元素，包括上一页、下一页
        state.pCName = paramsObj.pCName || 'page-li';
        // 当选中页码时添加的类名class
        state.activeCName = paramsObj.activeCName || 'page-active';
        // 代表页码数字的属性
        state.dataNumberAttr = paramsObj.dataNumberAttr || 'data-number';
        // 上一页 按钮的类名class
        state.prevCName = paramsObj.prevCName || 'page-prev';
        // 下一页 按钮的类名class
        state.nextCName = paramsObj.nextCName || 'page-next';
        // 禁用 上一页 按钮时给此按钮添加的类名class
        state.disbalePrevCName = paramsObj.disbalePrevCName || 'no-prev';
        // 禁用 下一页 按钮时给此按钮添加的类名class
        state.disbaleNextCName = paramsObj.disbaleNextCName || 'no-next';
        // 不包括 上一页 下一页 省略号 按钮的页码元素类名
        state.pageNumberCName = paramsObj.pageNumberCName || 'page-number';
        // 触发切换页面的事件
        state.swEvent = paramsObj.swEvent || 'click';
        // 切换页面时调用的函数
        state.onPageChange = typeof paramsObj.onPageChange === 'function' ? paramsObj.onPageChange : null;
        
        // 当需要省略符号占位时，确定 active的位置
        if (state.totalPageCount > state.maxShowBtnCount + 2) {
            state.activePosition = Math.max(1, Math.min(
                Math.ceil(state.maxShowBtnCount / 2),
                state.maxShowBtnCount
            ));
        }
        
        this.renderPageDOM();
    }

    switchPage() {
        let state = this.state;
        let pCNameList = this.selectorEle('.' + state.pCName, true);
        
        // 确保元素存在
        if (!pCNameList || pCNameList.length === 0) return;
        
        pCNameList.forEach(item => {
            item.addEventListener(state.swEvent, e => {
                const currentPageEle = e.target;
                if (this.hasClass(currentPageEle, state.activeCName)) return;
                
                let pageNumber;
                let dataNumberAttr = currentPageEle.getAttribute(state.dataNumberAttr);
                
                if (dataNumberAttr) {
                    // 点击 数字 按钮
                    pageNumber = parseInt(dataNumberAttr, 10);
                } else if (this.hasClass(currentPageEle, state.prevCName)) {
                    // 点击 上一页 按钮
                    if (state.pageNumber > 1) {
                        pageNumber = state.pageNumber - 1;
                    }
                } else if (this.hasClass(currentPageEle, state.nextCName)) {
                    // 点击 下一页 按钮
                    if (state.pageNumber < state.totalPageCount) {
                        pageNumber = state.pageNumber + 1;
                    }
                }
                
                if (pageNumber && !isNaN(pageNumber)) {
                    this.gotoPage(pageNumber);
                }
            });
        });
    }

    gotoPage(pageNumber) {
        let state = this.state;
        if (this.isIllegal(pageNumber)) return;
        
        let evaNumberLi = this.selectorEle('.' + state.pageNumberCName, true);
        let len = evaNumberLi.length;
        
        // 确保有页码元素
        if (!len) return;
        
        // 清除 active 样式
        let activeElement = this.selectorEle(`.${state.pCName}.${state.activeCName}`);
        if (activeElement) {
            this.removeClass(activeElement, state.activeCName);
        }
        
        if (state.activePosition) {
            let rEllipseSign = state.totalPageCount - (state.maxShowBtnCount - state.activePosition) - 1;
            // 左边不需要出现省略符号占位
            if (pageNumber <= state.maxShowBtnCount && (pageNumber < rEllipseSign)) {
                if (evaNumberLi[1] && +evaNumberLi[1].getAttribute(state.dataNumberAttr) > 2) {
                    for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
                        if (evaNumberLi[i]) {
                            evaNumberLi[i].innerText = i + 1;
                            evaNumberLi[i].setAttribute(state.dataNumberAttr, i + 1);
                        }
                    }
                }
                this.hiddenEllipse('.ellipsis-head');
                this.hiddenEllipse('.ellipsis-tail', false);
                if (evaNumberLi[pageNumber - 1]) {
                    this.addClass(evaNumberLi[pageNumber - 1], state.activeCName);
                }
            }
            // 两边都需要出现省略符号占位
            else if (pageNumber > state.maxShowBtnCount && pageNumber < rEllipseSign) {
                // 针对 maxShowBtnCount===1 的特殊处理
                this.hiddenEllipse('.ellipsis-head', pageNumber === 2 && state.maxShowBtnCount === 1);
                this.hiddenEllipse('.ellipsis-tail', false);
                for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
                    if (evaNumberLi[i]) {
                        evaNumberLi[i].innerText = pageNumber + (i - state.activePosition);
                        evaNumberLi[i].setAttribute(state.dataNumberAttr, pageNumber + (i - state.activePosition));
                    }
                }
                if (evaNumberLi[state.activePosition]) {
                    this.addClass(evaNumberLi[state.activePosition], state.activeCName);
                }
            }
            // 右边不需要出现省略符号占位
            else if (pageNumber >= rEllipseSign) {
                this.hiddenEllipse('.ellipsis-tail');
                this.hiddenEllipse('.ellipsis-head', false);
                if (evaNumberLi[len - 2] && +evaNumberLi[len - 2].getAttribute(state.dataNumberAttr) < state.totalPageCount - 1) {
                    for (let i = 1; i < state.maxShowBtnCount + 1; i++) {
                        if (evaNumberLi[i]) {
                            evaNumberLi[i].innerText = state.totalPageCount - (state.maxShowBtnCount - i) - 1;
                            evaNumberLi[i].setAttribute(state.dataNumberAttr, state.totalPageCount - (state.maxShowBtnCount - i) - 1);
                        }
                    }
                }
                let index = (state.maxShowBtnCount + 1) - (state.totalPageCount - pageNumber);
                if (evaNumberLi[index]) {
                    this.addClass(evaNumberLi[index], state.activeCName);
                }
            }
        } else {
            // 不需要省略符号占位
            if (pageNumber - 1 < len && evaNumberLi[pageNumber - 1]) {
                this.addClass(evaNumberLi[pageNumber - 1], state.activeCName);
            }
        }
        state.pageNumber = pageNumber;
        
        // 更新上一页/下一页状态
        this.switchPrevNextAble();
        
        // 触发回调
        if (state.onPageChange) {
            state.onPageChange(state);
        }
    }

    switchPrevNextAble() {
        let state = this.state;
        let prevBtn = this.selectorEle('.' + state.prevCName);
        let nextBtn = this.selectorEle('.' + state.nextCName);
        
        if (!prevBtn || !nextBtn) return;
        
        // 当前页已经是第一页，则禁止 上一页 按钮的可用性
        if (state.pageNumber > 1) {
            if (this.hasClass(prevBtn, state.disbalePrevCName)) {
                this.removeClass(prevBtn, state.disbalePrevCName);
            }
        } else {
            if (!this.hasClass(prevBtn, state.disbalePrevCName)) {
                this.addClass(prevBtn, state.disbalePrevCName);
            }
        }
        
        // 当前页已经是最后一页，则禁止 下一页 按钮的可用性
        if (state.pageNumber >= state.totalPageCount) {
            if (!this.hasClass(nextBtn, state.disbaleNextCName)) {
                this.addClass(nextBtn, state.disbaleNextCName);
            }
        } else {
            if (this.hasClass(nextBtn, state.disbaleNextCName)) {
                this.removeClass(nextBtn, state.disbaleNextCName);
            }
        }
    }

    renderPageDOM() {
        let state = this.state;
        let pageContainer = this.selectorEle(state.container);
        
        // 确保容器存在
        if (!pageContainer) {
            console.error('Page container not found');
            return;
        }
        
        let totalPageCount = state.totalPageCount;
        let pCName = state.pCName;
        let prevCName = state.prevCName;
        let disbalePrevCName = state.disbalePrevCName;
        let pageNumberCName = state.pageNumberCName;
        let activeCName = state.activeCName;
        let dataNumberAttr = state.dataNumberAttr;
        let maxShowBtnCount = state.maxShowBtnCount;
        let nextCName = state.nextCName;
        let disbaleNextCName = state.disbaleNextCName;

        let paginationStr = `
            <ul class="pagination">
            <li class="${pCName} ${prevCName} ${disbalePrevCName}">上一页</li>
            <li class="${pCName} ${pageNumberCName} ${activeCName}" ${dataNumberAttr}='1'>1</li>
            `;
        
        if (totalPageCount > maxShowBtnCount + 2) {
            paginationStr += `
            <li class="${pCName} number-ellipsis ellipsis-head" style="display: none;">...</li>`;
            
            for (let i = 2; i < Math.min(maxShowBtnCount + 2, totalPageCount); i++) {
                paginationStr += `<li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${i}'>${i}</li>`;
            }
            
            paginationStr += `
            <li class="${pCName} number-ellipsis ellipsis-tail">...</li>
            <li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${totalPageCount}'>${totalPageCount}</li>
        `;
        } else if (totalPageCount > 1) {
            for (let i = 2; i <= totalPageCount; i++) {
                paginationStr += `<li class="${pCName} ${pageNumberCName}" ${dataNumberAttr}='${i}'>${i}</li>`;
            }
        }
        
        paginationStr += `<li class="${pCName} ${nextCName}${totalPageCount === 1 ? ' ' + disbaleNextCName : ''}">下一页</li></ul>`;
        pageContainer.innerHTML = paginationStr;
        
        // 切换页码
        this.switchPage();
    }

    isIllegal(pageNumber) {
        let state = this.state;
        return (
            isNaN(pageNumber) ||
            state.pageNumber === pageNumber || 
            Math.ceil(pageNumber) !== pageNumber ||
            pageNumber > state.totalPageCount || 
            pageNumber < 1
        );
    }

    hiddenEllipse(selector) {
        var shouldHidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let element = this.selectorEle(selector);
        if (!element) return;
        element.style.display = shouldHidden ? 'none' : '';
    }

    selectorEle(selector) {
        var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        try {
            return all ? document.querySelectorAll(selector) : document.querySelector(selector);
        } catch (e) {
            console.error(`Invalid selector: ${selector}`, e);
            return all ? [] : null;
        }
    }

    hasClass(eleObj, className) {
        return eleObj && className && eleObj.classList && eleObj.classList.contains(className);
    }

    addClass(eleObj, className) {
        if (eleObj && className && eleObj.classList) {
            eleObj.classList.add(className);
        }
    }

    removeClass(eleObj, className) {
        if (this.hasClass(eleObj, className)) {
            eleObj.classList.remove(className);
        }
    }

    /** 自行添加的修改总页数的方法  */
    setTotalPageCount(totalPageCount) {
        if (typeof totalPageCount !== 'number' || totalPageCount < 1) {
            console.error('totalPageCount must be a positive integer');
            return;
        }
        
        this.state.totalPageCount = Math.max(1, Math.floor(totalPageCount));
        this.state.pageNumber = Math.min(this.state.pageNumber, this.state.totalPageCount);
        
        if (this.state.totalPageCount > this.state.maxShowBtnCount + 2) {
            this.state.activePosition = Math.max(1, Math.min(
                Math.ceil(this.state.maxShowBtnCount / 2),
                this.state.maxShowBtnCount
            ));
        } else {
            delete this.state.activePosition;
        }
        
        this.renderPageDOM();
    }
}