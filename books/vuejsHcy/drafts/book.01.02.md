# 第 2 章 框架设计的核心要素

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [2.1 提升用户的开发体验](#21-提升用户的开发体验)
- [2.2 控制框架代码的体积](#22-控制框架代码的体积)
- [2.3 框架要做到良好的 Tree-Shaking](#23-框架要做到良好的-tree-shaking)
- [2.4 框架应该输出怎样的构建产物](#24-框架应该输出怎样的构建产物)
  - [IIFE 立即调用的函数表达式](#iife-立即调用的函数表达式)
- [主流浏览器已普遍支持的 ESM](#主流浏览器已普遍支持的-esm)
- [Node.js 使用的 CommonJS 模块](#nodejs-使用的-commonjs-模块)
- [2.5 特性开关](#25-特性开关)
- [2.6 错误处理](#26-错误处理)
- [2.7 良好的 TypeScript 类型支持](#27-良好的-typescript-类型支持)
- [2.8 总结](#28-总结)

<!-- /code_chunk_output -->

### 2.1 提升用户的开发体验

比如，需要有很好的错误处理/信息提示。

在 Chrome DevTools 中，勾选 Console->Enable custom formatters，可以在控制台中看到更加清晰的 Vue3 信息。

### 2.2 控制框架代码的体积

彼时（2022年）这本书还在基于 rollup.js 介绍项目打包；在 2024 年，基于 rust 的 rolldown.js 正在被大力推广。

### 2.3 框架要做到良好的 Tree-Shaking

作者说 Vue3 中会配合 rollup.js 书写大量标记比如 `/*#__PURE__*/` 来告诉打包工具这段代码没有副作用，可以放心 Tree-Shaking 。合理推测 rolldown.js 应该也兼容了这个标记。

### 2.4 框架应该输出怎样的构建产物

可以参考 common.js 简单介绍：
- https://zhuanlan.zhihu.com/p/113009496

#### IIFE 立即调用的函数表达式

```html
<body>
  <script src="/path/to/vue.js"></script>
  <script>
  const { createApp } = Vue;
  // ...
  </script>
</body>
```

为了可以在 script 标签中直接使用 Vue 变量，需要输出一个 IIFE 立即调用的函数表达式（Immediately Invoked Function Expression）。

```javascript
(function() {
  // ...
}())

var Vue = (function(exports) {
  // ...
  exports.createApp = createApp;
  // ...
  return exports;
}({}))
```

这里，作者还详细介绍了想要做到 XX 类输出，如何在 rollup.global.js 中配置，比如改成 `output: { format: 'iife' }` 。这里不多纪录了。

### 主流浏览器已普遍支持的 ESM

```js
<script type="module" src="/path/to/vue.esm-browser.js"></script>
```

### Node.js 使用的 CommonJS 模块

```js
const Vue = require('vue')
```

### 2.5 特性开关

### 2.6 错误处理

### 2.7 良好的 TypeScript 类型支持

### 2.8 总结
