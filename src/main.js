/**
 * @file 环形图
 * @author saniac(snailsword@gmail.com)
 */

const R = 50;

export default class SPie {
    constructor(dom) {
        this.el = dom;
        this.id = Math.random().toString(36).substr(2);
        // 100%时的位置
        this.max = 0;
        // 小于100%时 最大的位置
        this.highest = 0;
        // 0%的位置
        this.min = 800;
        // 大于0%的最小位置
        this.lowest = 800 - 0.1;
    }

    static init(dom) {
        return new SPie(dom);
    }

    /**
     * 设置参数
     *
     * @param {Object} option 配置
     * @param {Array} option.r 内外半径
     * @param {string} option.bgc 背景色
     * @param {string} option.color 环形图颜色
     * @param {Object} option.animation 动画相关参数
     * @param {Object} option.animation.show 是否开启动画
     * @param {Object} option.animation.duration 动画时长
     * @param {Object} option.animation.easing 动画缓动效果
     *
     * @return {SPie} 返回实例以便链式调用
     */
    setOption(option = {}) {
        this.option = this.defaultOption;
        this._setEffectiveOption(option, this.option);
        this._processRadius();
        let template = this._getTemplate(this.option);
        this.el.innerHTML = template;
        return this;
    }

    /**
     * 深Object.assign 递归地用传入数据覆盖默认数据
     * 防止 animation: {duration: 10} 这种配置覆盖掉 animation: {show: ture}
     *
     * @param {Object} option 每一层的传入的配置
     * @param {Object} defaultOption 每一层的默认配置
     */
    _setEffectiveOption(option, defaultOption) {
        Object.keys(option).forEach(key => {
            if (typeof option[key] === 'object') {
                this._setEffectiveOption(option[key], defaultOption[key]);
            }
            else {
                defaultOption[key] = option[key];
            }
        });
    }

    /**
     * 设置数值
     *
     * @param {number} data 环形图数值
     * @param {number} timeout 设置时延
     */
    setData(data, timeout = 0) {
        setTimeout(() => {
            this._setPercent(data);
        }, timeout * 1000);
    }

    /**
     * 默认参数
     */
    get defaultOption() {
        return {
            color: '#108cee',
            bgc: '#fff',
            radius: [0.6, 0.8],
            precision: 4,
            animation: {
                show: true,
                duration: 0.75,
                easing: 'ease-in-out'
            }
        };
    }

    /**
     * 通过option中的内半径和外半径计算svg圆的半径与stroke-width
     *
     * @param {Object} option 配置
     * @param {number} option.sw 线宽
     * @param {string} option.bgc 背景色
     * @param {string} option.color 环形图颜色
     * @param {number} option.r svg圆的半径
     * @param {Object} option.animation 动画相关参数
     * @param {Object} option.animation.show 是否开启动画
     * @param {Object} option.animation.duration 动画时长
     * @param {Object} option.animation.duration 动画缓动效果
     *
     * @return {string} svg字符串
     */
    _getTemplate({sw, bgc, color, r, animation}) {
        let swt = sw * 50;
        return `
            <div class="svg-pie">
                <svg viewBox="0 0 ${R * 2} ${R * 2}" transtion="salce()" class="svg-pie-circle">
                    <defs>
                        <filter
                            id="shadow-${this.id}"
                            x="-1"
                            y="-1"
                            width="300%"
                            height="300%">
                            <feDropShadow
                                dx="0" dy="2"
                                stdDeviation="4"
                                flood-color="${color}"
                                flood-opacity="0.3"/>
                        </filter>
                    </defs>
                    <circle
                        id="circle-${this.id}"
                        cx="${R}"
                        cy="${R}"
                        r="${r * R}"
                        stroke="${bgc}"
                        stroke-width="${swt + 0.5}"
                        fill="none"
                    />
                    <circle
                        id="arc-${this.id}"
                        cx="${R}"
                        cy="${R}"
                        r="${r * R}"
                        stroke="${color}"
                        stroke-width="${swt}"
                        stroke-linecap="round"
                        stroke-dasharray="800"
                        style="stroke-dashoffset:${this.min};
                        ${animation.show
                            ? 'transition:all ' + animation.duration + 's ' + animation.easing
                            : 'none'}"
                        fill="none"
                        filter="url(#shadow-${this.id})"
                    />
                </svg>
            </div>`;
    }

    /**
     * 1. 通过option中的内半径和外半径计算svg圆的半径与stroke-width
     * 2. 计算两端刚好相切时的 offset
     */
    _processRadius() {
        let [r1, r2] = this.option.radius;
        // 线宽
        let sw = Math.abs(r1 - r2);
        // 直径
        let d = r1 + r2;
        // 半径
        let r = d / 2;
        // 周长
        let perimeter = d * Math.PI;

        this.max = 800 - perimeter * R;
        // 两端刚好相切时 实际端点差的那块所对圆心角
        let precisionArc = 2 * Math.asin(sw / 2 / r);
        // 两端刚好相切时 实际端点差的那块所对弧长
        let precisionLength = precisionArc * r * R;
        this.highest = this.max + precisionLength;
        this.option.sw = sw;
        this.option.r = r;
    }

    /**
     * 把0-1的输入数字映射到相对offset，最小为min最大为max
     * highest是圆弧两边不相接的最大offset
     *
     * @param {number} p 0 <= p <= 1 环形图数据
     *
     * @return {number} 相对offset
     */
    _getRad(p) {
        const minMun = Math.pow(0.1, this.option.precision) * 5;
        if (!p) {
            return this.min;
        }
        if (p < minMun) {
            return this.min;
        }
        if (p >= (1 - minMun)) {
            return this.max;
        }
        return this.lowest - p * (this.lowest - this.highest);
    }

    /**
     * 设置_getRad转换后的offset值
     *
     * @param {number} data offset值
     */
    _setPercent(data) {
        document.getElementById('arc' + '-' + this.id)
            .style.strokeDashoffset = this._getRad(data);
    }
}
