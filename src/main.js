/**
 * @file 环形图
 * @author saniac(snailsword@gmail.com)
 */

const R = 50;
const max = 500;
const highest = 478;
const min = 319;

export default class SPie {
    constructor(dom) {
        this.el = dom;
        this.id = Math.random().toString(36).substr(2);
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
        this.lastOption = this.option || this.defaultOption;
        this.option = Object.assign(this.defaultOption, option);
        this._processRadius();
        let template = this._getTemplate(this.option);
        this.el.innerHTML = template;
        return this;
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
            radius: [0.35, 0.8],
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
                <svg viewBox="0 0 ${R * 2} ${R * 2}" class="svg-pie-circle">
                    <defs>
                        <filter
                            id="shadow"
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
                        stroke-width="${swt}"
                        fill="none"
                    />
                    <circle
                        id="arc-${this.id}"
                        cx="${R}"
                        cy="${R}"
                        r="${r *  R}"
                        stroke="${color}"
                        stroke-width="${swt - 2}"
                        stroke-linecap="round"
                        stroke-dasharray="250"
                        style="stroke-dashoffset:${min - 1};
                        ${animation.show
                            ? 'transition:all ' + animation.duration + 's ' + animation.easing
                            : 'none'}"
                        fill="none"
                        filter="url(#shadow)"
                    />
                </svg>
            </div>`;
    }

    /**
     * 通过option中的内半径和外半径计算svg圆的半径与stroke-width
     */
    _processRadius() {
        let [r1, r2] = this.option.radius;
        this.option.sw = Math.abs(r1 - r2);
        this.option.r = (r1 + r2) / 2;
    }

    /**
     * 把0-1的输入数字映射到相对offset，最小为min最大为max
     * heighest是圆弧两边不相接的最大offset
     *
     * @param {number} p 0 <= p <= 1 环形图数据
     *
     * @return {number} 相对offset
     */
    _getRad(p) {
        const minMun = Math.pow(0.1, this.option.precision) * 5;
        if (!p) {
            return min;
        }
        if (p < minMun) {
            return min;
        }
        if (p >= (1 - minMun)) {
            return max;
        }
        return p * (highest - min) + min;
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
