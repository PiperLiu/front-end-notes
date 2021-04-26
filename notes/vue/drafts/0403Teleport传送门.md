# Teleport传送门

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Teleport传送门](#teleport传送门)
    - [需求：做个蒙层](#需求做个蒙层)
    - [传送门Teleport](#传送门teleport)

<!-- /code_chunk_output -->

### 需求：做个蒙层
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 30</title>
  <style>
    .area {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 300px;
      background: green;
    }
    .mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #000;
      opacity: 0.5;
      color: #fff;
      font-size: 100px;
    }
  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
  <div id="hello"></div>
</body>
<script>
  // teleport 传送门
  const app = Vue.createApp({
    data() {
      return {
        show: false,
        message: 'hello'
      }
    },
    methods: {
      handleBtnClick() {
        this.show = !this.show;
      }
    },
    template: `
      <div class="area">
        <button @click="handleBtnClick">按钮</button>
        <div class="mask" v-show="show">{{message}}</div>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

如上，我们希望 `div.mask` 成为整个页面的蒙层。但因为 `div.mask` 在 `div.area` 内，所以其 `position: absolute` 都是相对 `div.area` 而言的，只能覆盖整个 `div.area` 。

### 传送门Teleport
用 `<teleport to="body">` 让其中内容挂到 `<body>` 下。

```html
<div class="area">
  <button @click="handleBtnClick">按钮</button>
  <teleport to="body">
    <div class="mask" v-show="show">{{message}}</div>
  </teleport>
</div>
```

如下，还可以挂到 `div#hello` 下。

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 30</title>
  <style>
    .area {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 300px;
      background: green;
    }
    .mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #000;
      opacity: 0.5;
      color: #fff;
      font-size: 100px;
    }
  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
  <div id="hello"></div>
</body>
<script>
  // teleport 传送门
  const app = Vue.createApp({
    data() {
      return {
        show: false,
        message: 'hello'
      }
    },
    methods: {
      handleBtnClick() {
        this.show = !this.show;
      }
    },
    template: `
      <div class="area">
        <button @click="handleBtnClick">按钮</button>
        <teleport to="#hello">
          <div class="mask" v-show="show">{{message}}</div>
        </teleport>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

在组件化时，做模态块、蒙层时，都会用到。
