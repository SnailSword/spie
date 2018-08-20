# SPie

> 轻量级、无依赖的圆头效果环形图控件

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

新建一个元素，设置好宽高(绘制的环形图将充满该元素)。

```html
<div id="spie-1" style="height: 100px;width: 100px">
```

```js
let s1 = s.init(document.getElementById('spie-1'));
s1.setOption().setData(0.2);
```

或

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

* `radius` (default: `[0.35, 0.8]`)

  内外半径

* `precision` (default: `4`)

  精度 小于`0.1^precision`视为`0`, 大于等于`1-0.1^precision`视为`1`, 这个配置是为了防止出现两端圆弧出现重叠。

* `animation.show` (default: `true`)

  是否开启动画

* `animation.duration` (default: `0.75`)

  动画持续时间

* `animation.easing` (default: `'ease-in-out'`)

  缓动效果 可选值:
  `linear`、`ease`、`ease-in`、`ease-out`、`ease-in-out`、 `cubic-bezier(n,n,n,n)`




#### 设置数据时延 Delay

```js
s.setOption().setData(0.2, 1); // delay 1s
```

