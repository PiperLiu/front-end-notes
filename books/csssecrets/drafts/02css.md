# Web标准与CSS编码技巧

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Web标准杂记](#web标准杂记)
- [尽量减少代码重复（字号决定大小）](#尽量减少代码重复字号决定大小)
- [使用HSLA而非RGBA](#使用hsla而非rgba)
- [继承inherit](#继承inherit)
- [关于响应式网页设计](#关于响应式网页设计)
- [CSS变量是动态的](#css变量是动态的)

<!-- /code_chunk_output -->

### Web标准杂记

要注意并不存在 CSS3 。

### 尽量减少代码重复（字号决定大小）

```css
font-size: 20px;
/* 行高是 30px 是字号的 1.5 倍 */
line-height: 1.5;

/* 假设父级的字号是 16px */
font-size: 125%;
line-height: 1.5;

/* 还可以使用 em */
padding: .3em .8em;
border: 1px solid #446d88;
```

总结：
- 使用 `em` 或者 `rem`
- 审视哪些值是变化的，哪些值是固定的

### 使用HSLA而非RGBA

- H hue 色相： `0/360` 红色， `120` 绿色， `240` 蓝色
- S saturation 饱和度： `0%` 灰， `100%` 全色
- L lightness 亮度： `0%` 暗， `50%` 普通， `100%` 白
- A alpha 透明度： `0` 到 `1`

原始代码：
```css
button {
  padding: .3em .8em;
  border: 1px solid #446d88;
  background: #58a linear-gradient(#77a0bb, #58a);
  border-radius.2em;
  box-shadow: 0 .05em .25em gray;
  color: white;
  text-shadow: 0 -.05em .05em #335166;
  font-size: 125%;
  line-height: 1.5;
}
```

如果更改 `#58a` ，则也要更改 `linear-gradient(#77a0bb, #58a);` 等叠加/阴影颜色，这样不妥。

因此将叠加/阴影颜色等都用半透明替代：

```css
button {
  padding: .3em .8em;
  border: 1px solid rgba(0,0,0,.1);  /* 改了 */
  background: #58a linear-gradient(hsla(0, 0%, 100%, .2), transparent);  /* 改了 */
  border-radius.2em;
  box-shadow: 0 .05em .25em rgba(0,0,0,.5);  /* 改了 */
  color: white;
  text-shadow: 0 -.05em .05em rgba(0,0,0,.5);  /* 改了 */
  font-size: 125%;
  line-height: 1.5;
}
```

如上，这样只需要更改 `background-color` 就行：

```css
button.cancel {
  background-color: #c00;
}

button.ok {
  background-color: #6b0;
}
```

### 继承inherit

```css
input, select, button { font: inherit; }
a { color: inherit; }
```

### 关于响应式网页设计

每个媒体查询 Media Query 增加成本，应该把其作为最后手段。

以下的建议来避免不必要的媒体查询：
- 使用百分比长度取代固定长度。也可用 `vw vh vmin vmax` 等。
- 需要在较大分辨率下得到固定宽度事，使用 `max-width` 而不是 `width` ，因为这可以更好地适应较小分辨率。
- 不要忘记为替换元素 `img object video iframe` 等设置一个 `max-width: 100%`
- 让视口宽度决定列的数量，比如 `flexbox` 或 `display: inline-block`
- 多列文本时指定 `column-width` 而非 `column-count`

### CSS变量是动态的

原生的 CSS 变量相关方法可以用于计算 `100% - 50px` ，而预处理器可能不能。

```css
ul { --accent-color: purple; }
ol { --accent-color: rebeccapurple; }
li { background: var(--accent-color); }
```

在有序列表中，列表项的背景颜色将是 `rebeccapurple` ，无序列表将是 `purple` 。
