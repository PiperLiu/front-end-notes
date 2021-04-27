# 06watch以及其与watchEffect的差异性

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [06watch以及其与watchEffect的差异性](#06watch以及其与watcheffect的差异性)
    - [watch](#watch)
      - [具备一定lazy惰性属性](#具备一定lazy惰性属性)
      - [参数可以拿到原始和当前值](#参数可以拿到原始和当前值)
      - [watch可以接收一组数组](#watch可以接收一组数组)
    - [watchEffect](#watcheffect)
      - [立即执行，没有惰性immediate](#立即执行没有惰性immediate)
      - [不需要传递侦听的内容](#不需要传递侦听的内容)
      - [watchEffect不能获取数据之前的值](#watcheffect不能获取数据之前的值)
    - [取消侦听器](#取消侦听器)
      - [有没有办法把watch变为非惰性?immediate: true](#有没有办法把watch变为非惰性immediate-true)

<!-- /code_chunk_output -->

### watch
```js
const app = Vue.createApp({
  setup() {
    const { ref, watch } = Vue;
    const name = ref('dell')
    watch(name, (currentValue, prevValue) => {
    })

    return { name }
  },

  template: `
    <div>
      <div>
        Name: <input v-model="name">
      </div>
      <div>
        Name is {{name}}
      </div>
    </div>
  `
})
```

#### 具备一定lazy惰性属性
只有改变时，才回调 watch 里函数

#### 参数可以拿到原始和当前值
```js
const app = Vue.createApp({
  setup() {
    const { reactive, watch, toRefs } = Vue;
    const nameObj = reactive({name: 'dell'})

    watch(nameObj.name, (currentValue, prevValue) => {
    });  // 会报错

    const { name } = toRefs(nameObj);

    return { name }
  },

  template: `
    <div>
      <div>
        Name: <input v-model="name">
      </div>
      <div>
        Name is {{name}}
      </div>
    </div>
  `
})
```

上述会报错，因为必须监听`一个函数、ref或者 reactive`。

改为一个函数即可。

```js
const app = Vue.createApp({
  setup() {
    const { reactive, watch, toRefs } = Vue;
    const nameObj = reactive({name: 'dell'})

    watch(() => nameObj.name, (currentValue, prevValue) => {
    });

    const { name } = toRefs(nameObj);

    return { name }
  }
})
```

#### watch可以接收一组数组
```js
const app = Vue.createApp({
  setup() {
    const { reactive, watch, toRefs } = Vue;
    const nameObj = reactive({
      name: 'dell', englishName: 'lee'
    })

    watch(() => nameObj.name, (currentValue, prevValue) => {
    });

    watch(() => nameObj.englishName, (currentValue, prevValue) => {
    });

    const { name, englishName } = toRefs(nameObj);

    return { name, englishName }
  }
})
```

上面写了两个 watch 是冗余的，有没有办法写在一起？

watch接收一组数组。

```js
watch([() => nameObj.name, () => nameObj.englishName], ([currentValue, currentEng], [prevValue, prevEng]) => {
});
```

### watchEffect
watchEffect 侦听器，偏向于 effect 。

```js
const app = Vue.createApp({
  setup() {
    const { reactive, watch, watchEffect, toRefs } = Vue;
    const nameObj = reactive({
      name: 'dell', englishName: 'lee'
    })

    watch([() => nameObj.name, () => nameObj.englishName], ([currentValue, currentEng], [prevValue, prevEng]) => {
    });

    watchEffect(() => {
      console.log('abc')  // `abc`直接被打印
    })

    const { name, englishName } = toRefs(nameObj);

    return { name, englishName }
  }
})
```

上述内容中，`abc`直接被打印。

#### 立即执行，没有惰性immediate
```js
const app = Vue.createApp({
  setup() {
    const { reactive, watch, watchEffect, toRefs } = Vue;
    const nameObj = reactive({
      name: 'dell', englishName: 'lee'
    })

    watchEffect(() => {
      console.log(nameObj.name)  // 页面加载后就打印 nameObj.name
    })

    const { name, englishName } = toRefs(nameObj);

    return { name, englishName }
  }
})
```

#### 不需要传递侦听的内容

watchEffect 会自动检测代码中的数据依赖，如果依赖了外部代码，就会侦听这个值。

#### watchEffect不能获取数据之前的值

因此，异步操作放在 watchEffect 就会更方便。

effect 可以理解为一种副作用。

### 取消侦听器
对于 watch 和 watchEffct 都适用。
```js
const stop = watchEffect(() => {
  console.log(nameObj.name);
  setTimeout(() => {
    stop();
  }, 5000);
})
```

如上，调用 watchEffect 实例自己，就是禁用它。

#### 有没有办法把watch变为非惰性?immediate: true
```js
watch([() => nameObj.name, () => nameObj.englishName], ([currentValue, currentEng], [prevValue, prevEng]) => {
}, {
  immediate: true
});
```

watch 可以传第三个参数，进行一些配置。
