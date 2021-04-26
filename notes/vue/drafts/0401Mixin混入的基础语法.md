# Mixin混入的基础语法

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Mixin混入的基础语法](#mixin混入的基础语法)
    - [混入优先级](#混入优先级)
    - [Mixin作用域](#mixin作用域)
    - [全局Mixin](#全局mixin)
    - [自定义属性](#自定义属性)
      - [修改优先级](#修改优先级)

<!-- /code_chunk_output -->

### 混入优先级
```html
<script>
  const myMixin = {
    data() {
      return {
        number: 1,
      }
    }
  }

  const app = Vue.createApp({
    mixins: [myMixin],
    data() {
      number: 2,
    },
    template: `
      <div>
        <div>{{number}}</div>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

- 组件 data, methods 优先级高于 mixin data, methods 优先级
- 生命周期函数，先执行 mixin 里面的，再执行组件里面的

### Mixin作用域

子组件无法接收 mixins 中间的值。

想用的话，只能子组件里定义 `mixins` 。

### 全局Mixin
```js
app.minin({
  data() {
    return {
      number: 1,
    }
  }
})
```

用 `app.minxin` 方法将 mixin 变成全局的 mixin ，并且无需组件用 `mixins` 接收。

### 自定义属性
```html
<script>
  const myMixin = {
    number: 1
  }

  const app = Vue.createApp({
    mixins: [myMixin],
    number: 2,
    template: `
      <div>
        <div>{{this.$options.number}}</div>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上， `number` 不属于 `data` ，是一个自定义属性。

自定义属性属于 `this.$options` 。

- 自定义的属性，组件中的属性优先级高于 mixin 属性的优先级

#### 修改优先级
```js
app.config.optionMergeStrategies.number = (mixinVal, appValue) => {
  return mixinVal || appValue;
}
```

可以用 `app.config` 修改优先级计算。

在 Vue 3 中，Mixin 已出现替代品（Composition API）， Mixin 维护性并不高，因此老师不太推荐再使用。
