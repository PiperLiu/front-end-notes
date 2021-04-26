# 更加底层的render函数

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [更加底层的render函数](#更加底层的render函数)
    - [希望h1/h2/h3受到标签控制](#希望h1h2h3受到标签控制)
    - [反例：用v-if](#反例用v-if)
    - [用render不用template](#用render不用template)
    - [虚拟DOM](#虚拟dom)

<!-- /code_chunk_output -->

### 希望h1/h2/h3受到标签控制
```js
const app = Vue.createApp({
  template: `
    <my-title>
      hello dell
    </my-title>
  `
});

app.component('my-title', {
  template: `
    <h1>
      <slot />
    </h1>
  `
})

const vm = app.mount('#root');
```

如上，我们希望 `h1` 可以自动改变。

### 反例：用v-if

```js
const app = Vue.createApp({
  template: `
    <my-title level="1">
      hello dell
    </my-title>
  `
});

app.component('my-title', {
  props: ['level']
  template: `
    <h1 v-if="level === 1">
      <slot />
    </h1>
    <h2 v-if="level === 2">
      <slot />
    </h2>
  `
})

const vm = app.mount('#root');
```

如上，我们没法在优雅地在模板中使用简洁的逻辑。

因此我们不是用 template ，用 render 。

### 用render不用template

```js
// render function
// template -> render -> h -> 虚拟DOM（JS对象）-> 真实 DOM -> 展示到页面上
const app = Vue.createApp({
  template: `
    <my-title :level="2">
      hello dell
    </my-title>
  `
});

app.component('my-title', {
  props: ['level'],
  render() {
    const { h } = Vue;
    return h('h' + this.level, {/* 用于 name 等属性 */}, [
      this.$slots.default(),
      h('h4', {}, 'dell')
    ])
  }
})

const vm = app.mount('#root');
```

如上，`h()` 的第三个参数可以是值，也可以是数组。

实际上， template 会在 vue 中被编译成 render() 函数。

### 虚拟DOM
DOM 会被编译成虚拟 DOM ，即一个 DOM 元素的 js 对象映射。这个对象可以跨平台，有很多优势。

