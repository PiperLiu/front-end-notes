# v-once、ref和provide/inject

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [v-once、ref和provide/inject](#v-once-ref和provideinject)
    - [v-once](#v-once)
    - [ref](#ref)
    - [provide / inject](#provide-inject)

<!-- /code_chunk_output -->

### v-once

```html
<body>
  <div id="root"></div>
</body>
<script>
  const app = Vue.createApp({
    data() {
      return { count: 1 }
    },
    template: `
      <div @click="count += 1" v-once>
        {{count}}
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

上例中点击组件不会改变 1 这个值。

v-once 让某个元素标签只渲染一次。

### ref
```html
<body>
  <div id="root"></div>
</body>
<script>
  const app = Vue.createApp({
    data() {
      return { count: 1 }
    },
    mounted() {
      console.log(this.$ref.count)
    }
    template: `
      <div>
        <div ref="count">
          {{count}}
        </div>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

通过 `$ref` 可以获取渲染后的节点。

ref 实际上是获取 Dom 节点的一个语法。

ref 还可用获取组件引用。

```html
<body>
  <div id="root"></div>
</body>
<script>
  const app = Vue.createApp({
    data() {
      return { count: 1 }
    },
    mounted() {
      console.log(this.$ref.common.sayHello());
    }
    template: `
      <div>
        <common-item ref="common" />
      </div>
    `
  });

  app.component('common-item', {
    methods: {
      sayHello() {
        alert('hello');
      }
    },
    template: `<div>hello world</div>`
  });

  const vm = app.mount('#root');
</script>
```

但是这种语法维护性不高，慎重使用。

### provide / inject
```html
<body>
  <div id="root"></div>
</body>
<script>
  // provide / inject
  const app = Vue.createApp({
    data() {
      return { count: 1 }
    },
    provide() {
      return {
        count: this.count,
      }
    },
    template: `
      <div>
        <child :count="count" />
        <button @click="count += 1">Add</button>
      </div>
    `
  });

  app.component('child', {
    props: ['count'],
    template: `<child-child :count="count"/>`
  });

  app.component('child-child', {
    props: ['count'],
    template: `<div>{{count}}</div>`
  });

  const vm = app.mount('#root');
</script>
```

有三级组件：父组件，子组件，孙子组件。孙子组件想用父组件的属性。

能想到的是，一层一层传下去。

很冗余。因此考虑使用 `provide / inject` 。

```html
<body>
  <div id="root"></div>
</body>
<script>
  // provide / inject
  const app = Vue.createApp({
    data() {
      return { count: 1 }
    },
    provide() {
      return {
        count: this.count,
      }
    },
    template: `
      <div>
        <child :count="count" />
        <button @click="count += 1">Add</button>
      </div>
    `
  });

  app.component('child', {
    template: `<child-child />`
  });

  app.component('child-child', {
    inject: ['count'],
    template: `<div>{{count}}</div>`
  });

  const vm = app.mount('#root');
</script>
```

如上，父组件提供 `provide` ，子组件不用管，孙子组件注入 `inject` 。

如果传 `this.xxx` ，需要在 `provide()` 中 `return` 。

上述还存在问题，提供数据是 `一次性的` ，不是双向绑定的，不是响应式的。

因此，当我们点击 button 时，`vm.$data.count` 是会增加，但是孙子组件依旧显示 `1` 。

以后可以应用 vue3 新语法特性解决这个问题。
