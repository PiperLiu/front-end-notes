# 0301使用Vue实现基础的CSS过渡与动画效果

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [0301使用Vue实现基础的CSS过渡与动画效果](#0301使用vue实现基础的css过渡与动画效果)
    - [动画](#动画)
    - [过渡](#过渡)

<!-- /code_chunk_output -->

### 动画

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 23</title>
  <style>
    @keyframes leftToRight {
      0% {
        transform: translateX(-100px);
      }
      50% {
        transform: translateX(-50px);
      }
      0% {
        transform: translateX(0px);
      }
    }
    .animation {
      animation: leftToRight 3s;
    }

  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  const app = Vue.createApp({
    data() {
      return {
        animate: {
          animation: true
        }
      }
    },
    methods: {
      handleClick() {
        this.animate.animation = !this.animate.animation;
      }
    },
    template: `
      <div>
        <div class="animate">hello world</div>
        <button @click="handleClick">切换</button>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```

给组件绑定 `:class` ，传入的 `animate` 是一个对象，其中 `animation: true` ，代表给组件增加 class `animation` 。

### 过渡

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 23</title>
  <style>
    /* 这是通过 class 控制
    .transition {
      transition: 3s background-color ease;
    }
    .blue {
      background: blue;
    }
    .green {
      background: green;
    } */

    .transition {
      transition: 3s background-color ease;
    }

  </style>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  const app = Vue.createApp({
    data() {
      return {
        styleObj: {
          background: 'blue'
        }
      }
    },
    methods: {
      handleClick() {
        if(this.styleObj.background === 'blue') {
          this.styleObj.background = 'green';
        } else {
          this.styleObj.background = 'blue'
        }
      }
    },
    template: `
      <div>
        <div class="transition" :style="styleObj">hello world</div>
        <button @click="handleClick">切换</button>
      </div>
    `
  });

  const vm = app.mount('#root');
</script>
```
也可以通过类名控制，但是上面的例子使用 `:style` 直接控制组件的 `style` 。
