(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.SPie = factory());
}(this, (function () { 'use strict';

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

  var R = 50;
  var max = 500;
  var highest = 478;
  var min = 319;

  var SPie = function () {
      function SPie(dom) {
          classCallCheck(this, SPie);

          this.el = dom;
          this.id = Math.random().toString(36).substr(2);
      }

      createClass(SPie, [{
          key: 'setOption',
          value: function setOption() {
              var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

              this.lastOption = this.option || this.defaultOption;
              this.option = Object.assign(this.defaultOption, option);
              this._processRadius();
              var template = this._getTemplate(this.option);
              this.el.innerHTML = template;
              return this;
          }
      }, {
          key: 'setData',
          value: function setData(data) {
              var _this = this;

              var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

              setTimeout(function () {
                  _this._setPercent(data);
              }, timeout * 1000);
          }
      }, {
          key: '_getTemplate',
          value: function _getTemplate(_ref) {
              var sw = _ref.sw,
                  bgc = _ref.bgc,
                  color = _ref.color,
                  r = _ref.r,
                  animation = _ref.animation;

              var swt = sw * 50;
              return '\n            <div class="svg-pie">\n                <svg viewBox="0 0 ' + R * 2 + ' ' + R * 2 + '" class="svg-pie-circle">\n                    <defs>\n                        <filter id="shadow" x="-1" y="-1" width="300%" height="300%">\n                            <feDropShadow dx="0" dy="2"\n                                stdDeviation="4"\n                                flood-color="' + color + '"\n                                flood-opacity="0.3"/>\n                        </filter>\n                    </defs>\n                    <circle cx="' + R + '" cy="' + R + '" r="' + r * R + '"\n                        stroke="' + bgc + '"\n                        id="circle-' + this.id + '"\n                        stroke-width="' + swt + '"\n                        fill="none"\n                    />\n                    <circle cx="' + R + '" cy="' + R + '" r="' + r * R + '"\n                        id="arc-' + this.id + '"\n                        stroke="' + color + '"\n                        stroke-width="' + (swt - 2) + '"\n                        stroke-linecap="round"\n                        stroke-dasharray="250"\n                        style="stroke-dashoffset:' + (min - 1) + ';\n                        ' + (animation.show ? 'transition:all ' + animation.duration + 's ' + animation.easing : 'none') + '"\n                        fill="none"\n                        filter="url(#shadow)"/>\n                    </svg>\n            </div>';
          }

          /**
           * 通过option中的内半径和外半径计算svg圆的半径与stroke-width
           */

      }, {
          key: '_processRadius',
          value: function _processRadius() {
              var _option$radius = slicedToArray(this.option.radius, 2),
                  r1 = _option$radius[0],
                  r2 = _option$radius[1];

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

      }, {
          key: '_getRad',
          value: function _getRad(p) {
              var minMun = Math.pow(0.1, this.option.precision) * 5;
              if (!p) {
                  return min;
              }
              if (p < minMun) {
                  return min;
              }
              if (p >= 1 - minMun) {
                  return max;
              }
              return p * (highest - min) + min;
          }
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
                  radius: [0.35, 0.8],
                  precision: 4,
                  animation: {
                      show: true,
                      duration: 0.75,
                      easing: 'ease-in-out'
                  },
                  startingPoint: 0
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
