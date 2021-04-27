# computed方法生成计算属性

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [computed方法生成计算属性](#computed方法生成计算属性)
    - [computed](#computed)
    - [set和get方法](#set和get方法)
      - [set的param](#set的param)
      - [实例：一个对象](#实例一个对象)

<!-- /code_chunk_output -->

### computed
```js
// computed 计算属性
  const app = Vue.createApp({
    setup() {
      const { ref, computed } = Vue;
      count = ref(0);
      const handleClick = () => {
        count.value += 1;
      }
      const countAddFive = computed(() => {
        return count.value + 5;
      })

      return { count, countAddFive, handleClick }
    },
    template: `
      <div>
        <span @click="handleClick">{{count}}</span> -- {{countAddFive}}
      </div>
    `,
  });
```

如上，我们就如传统的 `computed` 一样应用计算属性。

实际上，还可用有 set 和 get 方法。

### set和get方法

```js
// computed 计算属性
  const app = Vue.createApp({
    setup() {
      const { ref, computed } = Vue;
      count = ref(0);
      const handleClick = () => {
        countObj.count += 1;
      }
      let countAddFive = computed({
        get: () => {
          return count.value + 5;
        },
        set: () => {
          count.value = 10;
        }
      })

      setTimeout(() => {
        countAddFive.value = 100;
      }, 3000)

      return { count, countAddFive, handleClick }
    },
    template: `
      <div>
        <span @click="handleClick">{{count}}</span> -- {{countAddFive}}
      </div>
    `,
  });
```

如上，因为`countAddFive.value = 100;`和`setTimeout`，三秒后，`set`被调用。

计算属性去获取值时，还是通过 `get` 去读值。

#### set的param
```js
// computed 计算属性
  const app = Vue.createApp({
    setup() {
      const { ref, computed } = Vue;
      count = ref(0);
      const handleClick = () => {
        countObj.count += 1;
      }
      let countAddFive = computed({
        get: () => {
          return count.value + 5;
        },
        set: (param) => {
          count.value = param - 5;
        }
      })

      setTimeout(() => {
        countAddFive.value = 100;
      }, 3000)

      return { count, countAddFive, handleClick }
    },
    template: `
      <div>
        <span @click="handleClick">{{count}}</span> -- {{countAddFive}}
      </div>
    `,
  });
```

我们上面 `countAddFive.value=100` ，也就是调用 `set(100)` ，参数 param 表示的就是 100 这个值。

#### 实例：一个对象
```js
// computed 计算属性
  const app = Vue.createApp({
    setup() {
      const { reactive, computed } = Vue;
      countObj = reactive( {count: 0} );
      const handleClick = () => {
        countObj.count += 1;
      }
      let countAddFive = computed({
        get: () => {
          return countObj.count.value + 5;
        },
        set: () => {
          countObj.count = param - 5;
        }
      })

      setTimeout(() => {
        countAddFive.value = 100;
      }, 3000)

      return { countObj, countAddFive, handleClick }
    },
    template: `
      <div>
        <span @click="handleClick">{{countObj.count}}</span> -- {{countAddFive}}
      </div>
    `,
  });
```
