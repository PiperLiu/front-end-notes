# ref，reactive响应式引用的用法和原理

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ref，reactive响应式引用的用法和原理](#refreactive响应式引用的用法和原理)
    - [非响应式数据](#非响应式数据)
    - [响应式的引用](#响应式的引用)
      - [基础类型数据ref](#基础类型数据ref)
      - [坑：不用name.value用name](#坑不用namevalue用name)
      - [非基础类型数据reactive](#非基础类型数据reactive)
      - [只读readonly](#只读readonly)
      - [解构toRefs](#解构torefs)

<!-- /code_chunk_output -->

### 非响应式数据
```js
const app = Vue.createApp({
  template: `
    <div>{{name}}</div>
  `,
  setup(props, context) {
    let name = 'dell';
    setTimeout(() => {
      name = 'lee'
    }, 2000);
    return { name }
  }
})
```

如上，两秒后，页面上的 `name` 并不会改变，因为 `name` 就是非响应式的数据。或者说，`setup` 仅被调用了一次，至于其子任务 setTimeout 把 `name` 之后怎么改变，也 `return` 不出来。

### 响应式的引用
原理：通过 proxy 对数据进行封装，当数据变化时，触发模板等内容的更新。

#### 基础类型数据ref

```js
const app = Vue.createApp({
  template: `
    <!-- <div>{{name}}</div> -->
    <div>{{name.value}}</div>
  `,
  setup(props, context) {
    const { ref } = Vue;  // ref 来自 Vue
    let name = ref('dell')
    setTimeout(() => {
      // name= 'lee'
      name.value = 'lee'
    }, 2000);
    return { name }
  }
})
```

如上，用 `ref` 把 `dell` 变成 `proxy({value: 'dell'})` 这样的一个响应式引用。

因此，我们再改变 `name` 时，要调用 `name.value` 来改变 `name` 。

#### 坑：不用name.value用name
上述代码不会报错，但是页面上没有显示的东西。

我们应该：
```js
  template: `
    <div>{{name}}</div>
    <!-- <div>{{name.value}}</div> -->
  `,
```

因为 Vue 会自动识别 ref 处理的数据，**在做模板处理时，会进行转换，如果写 `name` 底层会自动做 `name.value` 。**

#### 非基础类型数据reactive
```js
template: `
  <div>{{nameObj.name}}</div>
`,
setup(props, context) {
  const { reactive } = Vue;
  const nameObj = reactive({ name: 'dell' });
  setTimeout(() => {
    nameObj.name = 'lee'
  }, 2000)
  return { nameObj }
}
```

如上，我们对一个对象做了响应式的声明。

```js
template: `
  <div>{{nameObj[0]}}</div>
`,

setup(props, context) {
  const { reactive } = Vue;
  const nameObj = reactive([456]);
  setTimeout(() => {
    nameObj[0] = 123
  }, 2000)
  return { nameObj }
}
```

如上，我们对一个数组做了响应式的声明。

于是我们可以替代写 `data()` 的语法。

#### 只读readonly
```js
template: `
  <div>{{nameObj[0]}}</div>
`,

setup(props, context) {
  const { reactive, readonly } = Vue;
  const nameObj = reactive([456]);
  const copyNameObj = readonly(nameObj);
  setTimeout(() => {
    nameObj[0] = 123;
    copyNameObj[0] = 123;
  }, 2000)
  return { nameObj, copyNameObj }
}
```

readonly 会让 `copyNameObj[0] = 123;` 报错。

#### 解构toRefs
我们希望直接拿出 `nameObj` 中的 `name` 。

```js
template: `
  <div>{{name}}</div>
`,

setup(props, context) {
  const { reactive } = Vue;
  const nameObj = reactive({ name: 'dell' });
  setTimeout(() => {
    nameObj.name = 'lee'
  }, 2000)

  const { name } = nameObj;
  return { name }
}
```

如上，并不会响应式。因为 `nameObj` 是响应式的，但是其中值 `name` 并不是。

可以用 `toRefs` 。

```js
template: `
  <div>{{name}}</div>
`,

setup(props, context) {
  const { reactive } = Vue;
  const nameObj = reactive({ name: 'dell' });
  setTimeout(() => {
    nameObj.name = 'lee'
  }, 2000)

  // toRefs
  // 把 proxy({ name: 'dell' })
  // 变成 { name: proxy({ value: 'dell' }) }
  const { name } = toRefs(nameObj);
  return { name }
}
```
