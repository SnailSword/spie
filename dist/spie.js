(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.SPie = factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /**
   * @file 环形图
   * @author saniac(snailsword@gmail.com)
   */

  var R = 50;

  var SPie = function () {
      function SPie(dom) {
          classCallCheck(this, SPie);

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

      createClass(SPie, [{
          key: 'setOption',


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
          value: function setOption() {
              var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

              this.option = this.defaultOption;
              this._setEffectiveOption(option, this.option);
              this._processRadius();
              var template = this._getTemplate(this.option);
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

      }, {
          key: '_setEffectiveOption',
          value: function _setEffectiveOption(option, defaultOption) {
              var _this = this;

              Object.keys(option).forEach(function (key) {
                  if (_typeof(option[key]) === 'object') {
                      _this._setEffectiveOption(option[key], defaultOption[key]);
                  } else {
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

      }, {
          key: 'setData',
          value: function setData(data) {
              var _this2 = this;

              var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

              setTimeout(function () {
                  _this2._setPercent(data);
              }, timeout * 1000);
          }

          /**
           * 默认参数
           */

      }, {
          key: '_getTemplate',


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
          value: function _getTemplate(_ref) {
              var sw = _ref.sw,
                  bgc = _ref.bgc,
                  color = _ref.color,
                  r = _ref.r,
                  animation = _ref.animation;

              var swt = sw * 50;
              return '\n            <div class="svg-pie">\n                <svg viewBox="0 0 ' + R * 2 + ' ' + R * 2 + '" transtion="salce()" class="svg-pie-circle">\n                    <defs>\n                        <filter\n                            id="shadow-' + this.id + '"\n                            x="-1"\n                            y="-1"\n                            width="300%"\n                            height="300%">\n                            <feDropShadow\n                                dx="0" dy="2"\n                                stdDeviation="4"\n                                flood-color="' + color + '"\n                                flood-opacity="0.3"/>\n                        </filter>\n                    </defs>\n                    <circle\n                        id="circle-' + this.id + '"\n                        cx="' + R + '"\n                        cy="' + R + '"\n                        r="' + r * R + '"\n                        stroke="' + bgc + '"\n                        stroke-width="' + (swt + 0.5) + '"\n                        fill="none"\n                    />\n                    <circle\n                        id="arc-' + this.id + '"\n                        cx="' + R + '"\n                        cy="' + R + '"\n                        r="' + r * R + '"\n                        stroke="' + color + '"\n                        stroke-width="' + swt + '"\n                        stroke-linecap="round"\n                        stroke-dasharray="800"\n                        style="stroke-dashoffset:' + this.min + ';\n                        ' + (animation.show ? 'transition:all ' + animation.duration + 's ' + animation.easing : 'none') + '"\n                        fill="none"\n                        filter="url(#shadow-' + this.id + ')"\n                    />\n                </svg>\n            </div>';
          }

          /**
           * 1. 通过option中的内半径和外半径计算svg圆的半径与stroke-width
           * 2. 计算两端刚好相切时的 offset
           */

      }, {
          key: '_processRadius',
          value: function _processRadius() {
              var _option$radius = slicedToArray(this.option.radius, 2),
                  r1 = _option$radius[0],
                  r2 = _option$radius[1];
              // 线宽


              var sw = Math.abs(r1 - r2);
              // 直径
              var d = r1 + r2;
              // 半径
              var r = d / 2;
              // 周长
              var perimeter = d * Math.PI;

              this.max = 800 - perimeter * R;
              // 两端刚好相切时 实际端点差的那块所对圆心角
              var precisionArc = 2 * Math.asin(sw / 2 / r);
              // 两端刚好相切时 实际端点差的那块所对弧长
              var precisionLength = precisionArc * r * R;
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

      }, {
          key: '_getRad',
          value: function _getRad(p) {
              var precision = this.option.precision;
              var minMun = (Math.pow(0.1, precision) * 5).toFixed(precision);
              if (!p) {
                  return this.min;
              }
              if (p < minMun) {
                  return this.min;
              }
              if (p >= 1 - minMun) {
                  return this.max;
              }
              return this.lowest - p * (this.lowest - this.highest);
          }

          /**
           * 设置_getRad转换后的offset值
           *
           * @param {number} data offset值
           */

      }, {
          key: '_setPercent',
          value: function _setPercent(data) {
              document.getElementById('arc' + '-' + this.id).style.strokeDashoffset = this._getRad(data);
          }
      }, {
          key: 'defaultOption',
          get: function get$$1() {
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
      }], [{
          key: 'init',
          value: function init(dom) {
              return new SPie(dom);
          }
      }]);
      return SPie;
  }();

  return SPie;

})));
