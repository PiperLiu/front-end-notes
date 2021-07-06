# 关于 CSS 的浏览器支持与回退

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [提供浏览器兼容的网站](#提供浏览器兼容的网站)
- [层叠机制来支持较早的浏览器](#层叠机制来支持较早的浏览器)
- [Modernizr设置辅助类来分别编写样式](#modernizr设置辅助类来分别编写样式)
- [使用 @supports 规则回退](#使用-supports-规则回退)
- [简短的 JavaScript 代码实现回退](#简短的-javascript-代码实现回退)

<!-- /code_chunk_output -->

### 提供浏览器兼容的网站

- https://caniuse.com/
- https://webplatform.github.io/
- https://developer.mozilla.org/en-US/

### 层叠机制来支持较早的浏览器

```css
/* 防止 linear-gradient 在老浏览器中挂掉导致没有背景 */
background: rgb(255, 128, 0);
background: -moz-linear-gradient(0deg, yellow, red);
background: -o-linear-gradient(0deg, yellow, red);
background: -webkit-linear-gradient(0deg, yellow, red);
/* 应该将标准语法放在最后，来确保最终生效的是是标准语法 */
background: linear-gradient(90deg, yellow, red);
```

### Modernizr设置辅助类来分别编写样式

这里参考了一篇14年的老博客 [Modernizr 的介绍和使用](http://blog.chinaunix.net/uid-21633169-id-4286857.html)。

Modernizr 官网：https://modernizr.com/

Modernizr 如何生效？如果页面支持 `text-shadow` 属性，那么 Modernizr 会添加 `textshadow` 类。如果不支持，那么它用 `no-textshadow` 类作为替代进行添加。

因此，前端开发人员就可以设置两套代码，来应对浏览器提供或者不提供 `text-shadow` 支持的两种情况。

```css
/* 浏览器不支持 text-shaow */
h1 { color: gray }

/* 浏览器支持 text-shaow */
.textshaow h1 {
  color: transparent;
  text-shadow: 0 0 .3rem gray;
}
```

### 使用 @supports 规则回退

除了使用 Modernizr ，也可以使用浏览器自带的 @supports ：

```css
/* 浏览器不支持 text-shaow */
h1 { color: gray }

/* 浏览器支持 text-shaow */
@supports (text-shadow: 0 0 .3rem gray){
    h1 {
    color: transparent;
    text-shadow: 0 0 .3rem gray;
  }
}
```

但是 Lea Verou 指出，上述代码的投影效果只有在即支持 `@supports` 又支持 `text-shadow` 的浏览器中才会生效。因此慎用 `@supports` 。

### 简短的 JavaScript 代码实现回退

思路与 Modernizr 相同，做特性检测，然后添加辅助类。

```js
var root = document.documentElement;  // <html>

if ('textShadow' in root.style) {
  root.classList.add('textshadow')
} else {
  rott.classList.add('no-textshadow')
}
```

如上，我们为 `html` 添加了辅助类：
- 如果浏览器支持 `text-shadow` ，那么添加 `textshadow`
- 如果浏览器不支持 `text-shadow` ，那么添加 `no-textshadow`

上述代码可以被封装为函数：
```js
function testProperty(property) {
  var root = document.documentElement;

  if (property in root.style) {
    root.classList.add(property.toLowerCase());
    return true;
  }

  root.classList.add('no-' + property.toLowerCase());
  return false;
}
```

注意到上述方法只能用来检测属性是否支持，而非属性值。（如下，解释一下属性和属性值，如下代码）

```css
background : linear-gradient(red, tan);
    属性    :     属性值                ;
```

检测属性值是否支持，常见的思路是：赋给对应属性，然后看浏览器是否还保存着这个值。这个方法会改变元素样式，因此可以用隐藏元素防止样式因为检测被改变。

```js
var dummy = document.createElement('p');
dummy.style.backgroundImage = 'linear-gradient(red, tan)';

if (dummy.style.backgroundImage) {
  root.classList.add('lineargradients');
} else {
  root.classList.add('no-lineargradients');
}
```

封装函数如下：
```js
function testValue(id, value, property) {
  var dummy = document.createElement('p');
  dummy.style[property] = value;

  if (dummy.style[property])  // 属性值被浏览器保留
  {
    root.classList.add(id);
    return true;
  }
  
  root.classList.add('no-' + id);
  return false;
}
```

CSS一姐的书真的很有水平，怪不得前端大大们把她的《CSS揭秘》列为必读书目。
