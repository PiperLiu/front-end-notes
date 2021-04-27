# Provide、Inject、模板ref用法

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Provide、Inject、模板ref用法](#provide-inject-模板ref用法)
    - [provide和inject](#provide和inject)
      - [更好地应用单向数据流](#更好地应用单向数据流)
      - [应用readonly更加安全](#应用readonly更加安全)
    - [模板ref用法](#模板ref用法)

<!-- /code_chunk_output -->

### provide和inject
```js
// provide, inject
const app = Vue.createApp({
  setup() {
    const { provide, ref, readonly } = Vue;
    const name = ref('dell');
    // provide(key值，value值)
    provide('name', ref(name));
    return { }
  },
  template: `
    <div>
      <child />
    </div>
  `,
});

app.component('child', {
  setup() {
    const { inject } = Vue;
    // 如果 'name' 拿不到，那默认值是 'hello'
    const name = inject('name', 'hello');
    const handleClick = () => {
      name.value = 'lee';
    }
    return { name }
  },
  template: '<div @click="handleClick">{{name}}</div>'
})
```

如上：
- 传了值与方法
- 可以在子组件中修改 `name.value` ，但是不合适（在子组件修改父组件值）

#### 更好地应用单向数据流
于是在父组件定义方法，用于修改自身值。

```js
// provide, inject
const app = Vue.createApp({
  setup() {
    const { provide, ref, readonly } = Vue;
    const name = ref('dell');
    // provide(key值，value值)
    provide('name', ref(name));
    provide('changeName', (value) => {
      name.value = value;
    });
    return { }
  },
  template: `
    <div>
      <child />
    </div>
  `,
});

app.component('child', {
  setup() {
    const { inject } = Vue;
    // 如果 'name' 拿不到，那默认值是 'hello'
    const name = inject('name', 'hello');
    const changeName = inject('changeName');
    const handleClick = () => {
      changeName('lee');
    }
    return { name, handleClick }
  },
  template: '<div @click="handleClick">{{name}}</div>'
})
```

#### 应用readonly更加安全

```js
// provide, inject
const app = Vue.createApp({
  setup() {
    const { provide, ref, readonly } = Vue;
    const name = ref('dell');
    // provide(key值，value值)
    provide('name', readonly(name));
    provide('changeName', (value) => {
      name.value = value;
    });
    return { }
  },
  template: `
    <div>
      <child />
    </div>
  `,
});

app.component('child', {
  setup() {
    const { inject } = Vue;
    // 如果 'name' 拿不到，那默认值是 'hello'
    const name = inject('name', 'hello');
    const changeName = inject('changeName');
    const handleClick = (value) => {
      name.value = value;  // 报错
      changeName('lee');  // 可以执行
    }
    return { name, handleClick }
  },
  template: '<div @click="handleClick">{{name}}</div>'
})
```

为什么 `name.value = value;` 行但是 `changeName('lee');` 不行？
- 我们传给子组件的是 `readonly(name)` 不能改
- 但是 `changeName` 是父方法，其中直接对 `name` 进行修改。

### 模板ref用法
这里的 ref 是标签的名字。

```js
// CompositionAPI 的语法下，获取真实的 DOM 元素节点
const app = Vue.createApp({
  setup() {
    const { ref, onMounted } = Vue;
    const hello = ref(null);
    onMounted(() => {
      console.log(hello.value);
    })
    return { hello }
  },
  template: `
    <div>
      <div ref="hello">hello world</div>
    </div>
  `,
});

const vm = app.mount('#root');
```

`const hello = ref(null);` 如上：
- 在标签中定义 `ref=值`
- 在 `setup` 中定义一个 `ref` 常量，必须是空的 `null` 且必须函数名与 `ref=值` 相同
