# SPie

> 轻量级、无依赖的圆头效果环形图控件。 [DEMO](https://snailsword.github.io/spie/demo.html)

## 安装 Installation

### npm

```bash
$ npm install spie
```

### 手动安装 Manual

直接下载 `dist/spie.js` 并在 HTML 文件中引入：

```html
<script src="path/to/spie/dist/spie.js"></script>
```

### 使用 Usage

新建一个元素，设置好宽高(绘制的环形图将充满该元素)。

```html
<div id="spie-1" style="height: 100px;width: 100px">
```

```js
let s1 = s.init(document.getElementById('spie-1'));
s1.setOption().setData(0.2);
```

或

```js
let s1 = s.init(document.getElementById('spie-1'));
s1.setOption();
s1.setData(0.2);
```

#### 自定义参数 Custom Options

```js
s.setOption({
    color: '#5fb333'
}).setData(0.2);
```

* `color` (default: `'#108cee'`)

  有数据部分的颜色

* `bgc` (default: `'#fff'`)

  圆环底色

* `radius` (default: `[0.6, 0.8]`)

  内外半径 大的为外半径小的为内半径 顺序无所谓 支持0-1的数字或百分数

* `precision` (default: `4`)

  精度 小于`0.1^precision*5`视为`0`, 大于等于`1-0.1^precision*5`视为`1`, 这个配置是为了在需要显示具体数字时防止出现四舍五入到0或1之后圆环没有对应变空变满。设置为`false`或`0`, 会按正常的百分比计算。

* `startingPoint` (default: `0`)

  起始角度 最高点为0，顺时针算0-360度，支持传弧度制或角度制。数字会按角度制处理，`'30rad'`为弧度制。

* `clockwise` (default: `true`)

  是否顺时针旋转

* `animation.show` (default: `true`)

  是否开启动画

* `animation.duration` (default: `0.75`)

  动画持续时间

* `animation.easing` (default: `'ease-in-out'`)

  缓动效果 可选值:
  `linear`、`ease`、`ease-in`、`ease-out`、`ease-in-out`、 `cubic-bezier(n,n,n,n)`




#### 设置数据时延 Delay

```js
s.setOption().setData(0.2, 1); // delay 1s
```
