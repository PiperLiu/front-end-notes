# 第 3 章 Vue.js 3 的设计思路

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [3.1 声明式地描述 UI](#31-声明式地描述-ui)
- [3.2 初识渲染器](#32-初识渲染器)
- [3.3 组件的本质](#33-组件的本质)
- [3.4 模版的工作原理](#34-模版的工作原理)
- [3.5 Vue.js 是各个模块组成的有机整体](#35-vuejs-是各个模块组成的有机整体)
- [3.6 总结](#36-总结)

<!-- /code_chunk_output -->

### 3.1 声明式地描述 UI

用 Object 描述虚拟 DOM 元素。

可以如下理解：

```js
export default {
  return {
    tag: 'div',
    attrs: { class: 'container' },
    children: [
        { tag: 'h1', text: 'Hello World' }
      ]
  }
}
// 等价于
import { h } from 'vue'

export default {
  render() {
    return h('div', { class: 'container' }, [
      h('h1', 'Hello World'),
    ])
  }
}
```

vue 中使用渲染函数 `h` 返回 Object ，而非直接返回 Object 。

### 3.2 初识渲染器

是 `render` 的 `render` ，比如下面的 function `renderer`：

```js
// 假设有如下虚拟 DOM
const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello')
  },
  children: 'click me'
}

function renderer(vnode, container) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.props) {
    if (/^on/.test(key))
      el.addEventListener(key.slice(2).toLowerCase(), vnode.props[key])
  }
  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el))
  }

  container.appendChild(el)
}
```

如上，将虚拟 DOM 利用 document 创建真实 DOM 。

根节点是 `renderer(vnode, document.body)` 。

### 3.3 组件的本质

组件就是一组 DOM 元素的封装。

### 3.4 模版的工作原理

模版被编译器编译成渲染函数，渲染函数返回虚拟 DOM 。

比如把如下的 template ，编译成 javascript 。
```html
<template>
  <div @click="handler">
    click me
  </div>
</template>

<script>
export default {
  data() { /* ... */ }
  methods: {
    handler: () => { /* ... */ }
  }
}
</script>
```

编译成

```javascript
export default {
  data() { /* ... */ }
  methods: {
    handler: () => { /* ... */ }
  },
  render() {
    return h('div', { onClick: handler }, 'click me')
  }
}
```

### 3.5 Vue.js 是各个模块组成的有机整体

渲染出来的函数还需要考虑数据绑定等等内容，帮助后续 diff 和响应式优化。

### 3.6 总结
