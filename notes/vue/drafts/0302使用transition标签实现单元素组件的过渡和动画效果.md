# VUE使用transition标签实现单元素组件的过渡和动画效果

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [VUE使用transition标签实现单元素组件的过渡和动画效果](#vue使用transition标签实现单元素组件的过渡和动画效果)
    - [v-enter-from与v-enter-active以及v-enter-to等](#v-enter-from与v-enter-active以及v-enter-to等)
    - [动画](#动画)
    - [给transition定义name](#给transition定义name)
    - [动画与过渡结合type="transition"](#动画与过渡结合typetransition)
    - [duration="1000"](#duration1000)
    - [js做动画](#js做动画)
      - [@enter等勾子](#enter等勾子)
      - [done()](#done)

<!-- /code_chunk_output -->

### v-enter-from与v-enter-active以及v-enter-to等

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 24</title>
  <style>
    .v-enter-from {
      opacity: 0;
    }
    .v-enter-active {
      transition: opacity 3s ease-out;
    }
    .v-enter-to {
      opacity: 1;
    }
    .v-leave-from {
      opacity: 1;
    }
    .v-leave-active {
      transition: opacity 3s ease-in;
    }
    .v-leave-to {
      opacity: 0;
    }
  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  // 单元素，单组件的入场出场动画
  const app = Vue.createApp({
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show;
      }
    },
    template: `
      <div>
        <transition>
          <div v-if="show">hello world</div>
        </transition>
        <button @click="handleClick">切换</button>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，配合 `v-if` 或者 `v-show` 与 `<transition>` 标签，我们有 `v-enter-to` 、 `v-leave-to` 等已有类别样式可以定义。


### 动画
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 24</title>
  <style>
    @keyframes shake {
      0% {
        transform: translateX(-100px)
      }
      50% {
        transform: translateX(-50px)
      }
      100% {
        transform: translateX(50px)
      }
    }
    .v-leave-active {
      animation: shake 3s;
    }
    .v-enter-active {
      animation: shake 3s;
    }
  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  // 单元素，单组件的入场出场动画
  const app = Vue.createApp({
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show;
      }
    },
    template: `
      <div>
        <transition>
          <div v-if="show">hello world</div>
        </transition>
        <button @click="handleClick">切换</button>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

### 给transition定义name

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 24</title>
  <style>
    @keyframes shake {
      0% {
        transform: translateX(-100px)
      }
      50% {
        transform: translateX(-50px)
      }
      100% {
        transform: translateX(50px)
      }
    }
    .hello-leave-active {
      animation: shake 3s;
    }
    .hello-enter-active {
      animation: shake 3s;
    }
  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  // 单元素，单组件的入场出场动画
  const app = Vue.createApp({
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show;
      }
    },
    template: `
      <div>
        <transition name="hello">
          <div v-if="show">hello world</div>
        </transition>
        <button @click="handleClick">切换</button>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，给`transition`定义名字`hello`，则可以使用自定义的类名`hello-leave-active`。

此外，还可用在标签里定义类名的绑定。

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 24</title>
  <style>
    @keyframes shake {
      0% {
        transform: translateX(-100px)
      }
      50% {
        transform: translateX(-50px)
      }
      100% {
        transform: translateX(50px)
      }
    }
    .bye {
      animation: shake 3s;
    }
    .hello {
      animation: shake 3s;
    }
  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  // 单元素，单组件的入场出场动画
  const app = Vue.createApp({
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show;
      }
    },
    template: `
      <div>
        <transition
          enter-from-class=""
          enter-to-class=""
          enter-active-class="hello"
          leave-from-class=""
          leave-active-class="bye"
          leave-to-class=""
        >
          <div v-if="show">hello world</div>
        </transition>
        <button @click="handleClick">切换</button>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

自定义名字好处？比如可以使用已经定义好的css库。

比如 [https://animate.style/](https://animate.style/)。

### 动画与过渡结合type="transition"
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 24</title>
  <style>
    @keyframes shake {
      0% {
        transform: translateX(-100px)
      }
      50% {
        transform: translateX(-50px)
      }
      100% {
        transform: translateX(50px)
      }
    }
    .v-enter-from {
      color: red;
    }
    .v-leave-active {
      color: red;
      animation: shake 10s;
      transition: all 3s ease-in;
    }
    .v-enter-active {
      animation: shake 10s;
      transition: all 3s ease-in;
    }
  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  // 单元素，单组件的入场出场动画
  const app = Vue.createApp({
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show;
      }
    },
    template: `
      <div>
        <transition type="transition">
          <div v-if="show">hello world</div>
        </transition>
        <button @click="handleClick">切换</button>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，`transition`标签里加入`type="transition"`，表示以过渡为基准，动画时间再长，也要配合着过渡完成。

使用`type="animation"`同理。

### duration="1000"
```js
template: `
  <div>
    <transition duration="1000">
      <div v-if="show">hello world</div>
    </transition>
    <button @click="handleClick">切换</button>
  </div>
`
```
使用 `duration="1000"` 同理。

还可以用 `duration={enter: 1000, leave: 3000}` 。

### js做动画
```js
template: `
  <div>
    <transition :css="false">
      <div v-if="show">hello world</div>
    </transition>
    <button @click="handleClick">切换</button>
  </div>
`
```

如上，首先用 `:css="false"` 禁用 css 动画。

使用一些勾子（类似与生命周期结合）。

#### @enter等勾子

```html
<script>
  // 单元素，单组件的入场出场动画
  const app = Vue.createApp({
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show;
      },
      handleBeforeEnter(el) {
        el.style.color = "red";
      },
      handleEnterActive(el, done) {
        const animation = setInterval(() => {
          const color = el.style.color;
          if(color === 'red') {
            el.style.color = 'green';
          } else {
            el.style.color = 'red';
          }
        }, 1000)
        setTimeout(() => {
          clearInterval(animation);
          done();
        }, 3000)
      },
      handleEnterEnd(el) {
        alert(123);
      }
    },
    template: `
      <div>
        <transition
          :css="false"
          @before-enter="handleBeforeEnter"
          @enter="handleEnterActive"
          @after-enter="handleEnterEnd"
        >
          <div v-show="show">hello world</div>
        </transition>
        <button @click="handleClick">切换</button>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，函数 `handleEnterActive` 调用了 `setInterval` ；传进来的 `done` 参数。

#### done()

在 `handleEnterActive` 里调用 `done()` 才告诉底层，我这个动画 `@enter` 结束了，你可以触发下一个事件 `@after-enter` 了。

并不是所有动画事件都有 `done()` 这个参数。