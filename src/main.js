/**
 * @file 环形图
 * @author saniac(snailsword@gmail.com)
 */

const R = 50;

export default class SPie {
    constructor(dom) {
        this.el = dom;
        this.id = this.random;
        // 100%时的位置
        this.max = 0;
        // 小于100%时 最大的位置
        this.highest = 0;
        // 0%的位置
        this.min = 800;
        // 大于0%的最小位置
        this.lowest = 800 - 0.1;
    }

    /**
     * 为图表指定容器 生成的图表会自适应容器大小
     *
     * @param {Node} dom 装图表的容器节点
     *
     * @return {SPie} 返回初始化的SPie实例
     */
    static init(dom) {
        return new SPie(dom);
    }

    /**
     * 设置参数
     *
     * @param {Object=} option 配置
     * @param {Array} option.r 内外半径
     * @param {string} option.bgc 背景色
     * @param {string} option.color 环形图颜色
     * @param {number} option.rotateDeg 起始角度
     * @param {number} option.clockwise 是否顺时针转
     * @param {Object} option.animation 动画相关参数
     * @param {Object} option.animation.show 是否开启动画
     * @param {Object} option.animation.duration 动画时长
     * @param {Object} option.animation.easing 动画缓动效果
     *
     * @return {SPie} 返回实例以便链式调用
     */
    setOption(option = {}) {
        this.option = this.defaultOption;
        this._extend(option, this.option);
        this._pretreatRadius()._processRadius();
        this._processStartPoint();
        let template = this._getTemplate(this.option);
        this.el.innerHTML = template;
        return this;
    }

    getOption() {
        return this.option;
    }

    /**
     * 设置数值
     *
     * @param {number} data 环形图数值
     * @param {number} timeout 设置时延
     */
    setData(data, timeout = 0) {
        data = this._percent2number(data);
        setTimeout(() => this._setPercent(data), timeout * 1000);
    }

    /**
     * 深Object.assign 递归地用传入数据覆盖默认数据
     * 防止 animation: {duration: 10} 这种配置覆盖掉 animation: {show: ture}
     *
     * @param {Object} option 每一层的传入的配置
     * @param {Object} defaultOption 每一层的默认配置
     */
    _extend(option, defaultOption) {
        Object.keys(option).forEach(key => {
            if (this._typeOf(option[key]) === 'Object') {
                this._extend(option[key], defaultOption[key]);
            }
            else {
                defaultOption[key] = option[key];
            }
        });
    }

    /**
     * 判断是不是object
     *
     * @param {*} x 带判断的值
     *
     * @return {boolean} 是否为object
     */
    _typeOf(x) {
        return Object.prototype.toString.call(x).slice(8, -1);
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
            startingPoint: 0,
            clockwise: true,
            animation: {
                show: true,
                duration: 1,
                easing: 'ease-in-out'
            },
            sw: 0.2
        };
    }

    /**
     * 根据option的部分参数 生成模板
     *
     * @param {Object} option 配置
     * @param {number} option.sw 线宽
     * @param {string} option.bgc 背景色
     * @param {string} option.color 环形图颜色
     * @param {number} option.r svg圆的半径
     * @param {number} option.rotateDeg 起始角度
     * @param {number} option.clockwise 是否顺时针转
     * @param {Object} option.animation 动画相关参数
     * @param {Object} option.animation.show 是否开启动画
     * @param {Object} option.animation.duration 动画时长
     * @param {Object} option.animation.duration 动画缓动效果
     *
     * @return {string} svg字符串
     */
    _getTemplate({sw, bgc, color, r, rotateDeg, clockwise, animation}) {
        this._checkRepeat();
        const swt = sw * 50;
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
                                dx="0" dy="0"
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
                        transform-origin:50% 50% 0;
                        transform:rotate(${rotateDeg}deg)
                        ${clockwise ? '' : 'scaleY(-1)'};
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
     * 检查是否有重复id 重复的话换一个 虽然几乎不可能重复 但是还是检查一下
     */
    _checkRepeat() {
        if (document.getElementById(`circle-${this.id}`)) {
            this.id = this.random;
            this._checkRepeat();
        }
    }

    /**
     * 生成随机数
     */
    get random() {
        return Math.random().toString(36).substr(2);
    }

    /**
     * 用来兼容百分比形式的输入
     *
     * @param {(number｜string)} n 输入的数据 可以是百分数或数字
     *
     * @return {number} 输出的
     */
    _percent2number(n) {
        if (typeof n === 'string') {
            n = +(n.slice(0, -1)) / 100;
        }
        return n;
    }

    /**
     * 预处理一下 如果有百分比形式的输入转成
     *
     * @return {SPie} 返回实例以便链式调用
     */
    _pretreatRadius() {
        let radius = this.option.radius;
        this.option.radius = radius.map(r => this._percent2number(r));
        return this;
    }

    /**
     * 1. 通过option中的内半径和外半径计算svg圆的半径与stroke-width
     *    如果r1 === r2 或只输入了一个r 用默认线宽作为线宽
     * 2. 计算两端刚好相切时的 offset
     */
    _processRadius() {
        let [r1, r2] = this.option.radius;
        r2 = r2 || r1;
        // 线宽
        const sw = Math.abs(r1 - r2) || this.option.sw;
        // 直径
        const d = r1 + r2;
        // 半径
        const r = d / 2;
        // 周长
        const perimeter = d * Math.PI;

        this.max = 800 - perimeter * R;
        // 两端刚好相切时 实际端点差的那块所对圆心角
        const precisionArc = 2 * Math.asin(sw / 2 / r);
        // 两端刚好相切时 实际端点差的那块所对弧长
        const precisionLength = precisionArc * r * R;
        this.highest = this.max + precisionLength;
        this.option.sw = sw;
        this.option.r = r;
    }

    /**
     * 处理起始点
     * 最高点为0 顺时针旋转 0-360
     */
    _processStartPoint() {
        let {startingPoint} = this.option;
        if (typeof startingPoint === 'string') {
            try {
                if (startingPoint.slice(-3).toLowerCase() === 'deg') {
                    startingPoint = +(startingPoint.slice(0, -3));
                }
                else if (startingPoint.slice(-3).toLowerCase() === 'rad') {
                    const rad = +(startingPoint.slice(0, -3));
                    const ratio = 180 / Math.PI;
                    startingPoint = rad * ratio;
                }
            }
            catch (error) {
                startingPoint = 0;
            }
        }
        this.option.rotateDeg = startingPoint - 90;
    }

    /**
     * 把0-1的输入数字映射到相对offset，最小为min最大为max
     * highest是圆弧两段相切时的offset
     *
     * @param {number} p 0 <= p <= 1 环形图数据
     *
     * @return {number} 相对offset
     */
    _getRad(p) {
        let precision = +this.option.precision | 0;

        if (!p) {
            return this.min;
        }
        // 输入precision不合法的处理
        if (precision <= 0) {
            if (p >= 1) {
                return this.max;
            }
            return this.lowest - p * (this.lowest - this.highest);
        }
        const minMun = (Math.pow(0.1, precision) * 5).toFixed(precision);
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
