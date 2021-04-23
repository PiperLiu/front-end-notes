# VUE的Non-Props属性

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [VUE的Non-Props属性](#vue的non-props属性)
    - [子组件是否接收](#子组件是否接收)
      - [inheritAttrs](#inheritattrs)
    - [子组件多个根元素](#子组件多个根元素)

<!-- /code_chunk_output -->

### 子组件是否接收
```html
<body>
  <div id="root"></div>
</body>
<script>
  const app = Vue.createApp({
    template: `
      <div>
        <counter msg="hello" />
      </div>
    `
  });

  app.component('counter', {
    props: ['msg'],
    template: `
      <div>Counter</div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，接收 `msg` ，但是不用，则渲染后是`<div>Counter</div>`。

```html
<body>
  <div id="root"></div>
</body>
<script>
  // Non-prop 属性
  const app = Vue.createApp({
    template: `
      <div>
        <counter msg="hello" />
      </div>
    `
  });

  app.component('counter', {
    template: `
      <div>Counter</div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，不接收 `msg` ，则渲染后是`<div msg="hello">Counter</div>`。

#### inheritAttrs

```html
<body>
  <div id="root"></div>
</body>
<script>
  // Non-prop 属性
  const app = Vue.createApp({
    template: `
      <div>
        <counter msg="hello" />
      </div>
    `
  });

  app.component('counter', {
    inheritAttrs: false,
    template: `
      <div>Counter</div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，子组件 `inheritAttrs: false` ，不接收 `msg` ，则渲染后是`<div>Counter</div>`。

什么时候用 `inheritAttrs: true（默认）` 呢？比如在父组件规定子组件样式。

### 子组件多个根元素

```html
<body>
  <div id="root"></div>
</body>
<script>
  // Non-prop 属性
  const app = Vue.createApp({
    template: `
      <div>
        <counter msg="hello" msg1="hello1" />
      </div>
    `
  });

  app.component('counter', {
    // inheritAttrs: false,
    mounted() {
      console.log(this.$attrs.msg);
    },
    template: `
      <div :msg="$attrs.msg">Counter</div>
      <div v-bind="$attrs">Counter</div>
      <div :msg1="$attrs.msg1">Counter</div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，用 `v-bind="$attrs"` 接收父组件 Non-Props 。
