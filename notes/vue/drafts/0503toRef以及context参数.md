# toRef以及context参数

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [toRef以及context参数](#toref以及context参数)
    - [没存在于响应式对象里](#没存在于响应式对象里)
      - [toRef](#toref)
    - [context参数意义](#context参数意义)
      - [attrs是父组件的Non-Props](#attrs是父组件的non-props)
      - [slots是插槽](#slots是插槽)
      - [emit](#emit)

<!-- /code_chunk_output -->

### 没存在于响应式对象里
```js
template: `
  <div>{{age}}</div>
`

setup(props, context) {
  const { reactive, toRefs } = Vue;
  const data = reactive({ name: 'dell' });
  const { age } = toRefs(data);
  setTimeout(() => {
    age.value = 'lee'
  }, 2000)
  return { age }
}
```

如上是上节课的解构知识点。

但是， age 没有存在于响应式对象里 ，因此会报错。

#### toRef
```js
template: `
  <div>{{age}}</div>
`

setup(props, context) {
  const { reactive, toRefs } = Vue;
  const data = reactive({ name: 'dell' });
  const age = toRefs(data, 'age');
  setTimeout(() => {
    age.value = 'lee'
  }, 2000)
  return { age }
}
```

如上，当我们希望让对象中`可能没有的响应式属性值`一致具备响应式特性，可以 `toRef` 。

### context参数意义
```js
const app = Vue.createApp({
  template: `
    <child />
  `
})

app.component('child', {
  template: `
    <div>child</div>
  `,
  setup(props, context) {
    const { attrs, slots, emit } = context;
    return { }
  }
})
```

如上，`context` 中包括三个值：`attrs, slots, emit`。

#### attrs是父组件的Non-Props
```js
const app = Vue.createApp({
  template: `
    <child ppp='ppp' />
  `
})

app.component('child', {
  template: `
    <div>child</div>
  `,
  setup(props, context) {
    const { attrs, slots, emit } = context;
    console.log(attrs);  // 可以获取 ppp: "ppp"
    console.log(ppp.ppp);  // ppp
    return { }
  }
})
```

#### slots是插槽
```js
const app = Vue.createApp({
  template: `
    <child>parent</child>
  `
})

app.component('child', {
  template: `
    <div>child</div>
  `,
  setup(props, context) {
    const { attrs, slots, emit } = context;
    console.log(slots);  // 注意到里面有 default() 方法
    console.log(slots.default());  // 返回 virtual DOM
    return { }
  }
})
```

如何利用 `slots.default()` 的虚拟DOM呢？

```js
const app = Vue.createApp({
  template: `
    <child>parent</child>
  `
})

app.component('child', {
  setup(props, context) {
    const { h } = Vue;
    const { attrs, slots, emit } = context;
    return () => { h('div', {}, slots.default()) }
  }
})
```

如上，`return` 返回一个方法，在子组件被模板解析时调用这个 `render` 方法。

#### emit
```js
const app = Vue.createApp({
  methods: {
    handleChange() {
      alert('change');
    }
  },
  template: `
    <child @change="handleChange">parent</child>
  `
})

app.component('child', {
  template: '<div @click="handleClick">123123</div>'
  setup(props, context) {
    const { attrs, slots, emit } = context;
    function handleClick() {
      emit('change');
    }
    return {
      handleClick
    }
  }
})
```

如上，我们触发了与之前同样的 `$emit` 功能。
