# 07异步好帮手：Suspense

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [07异步好帮手：Suspense](#07异步好帮手suspense)
    - [Suspense](#suspense)
    - [Suspense使用实例](#suspense使用实例)
    - [Suspense使用实例（async）](#suspense使用实例async)
    - [OnErrorCaptured](#onerrorcaptured)

<!-- /code_chunk_output -->

### Suspense
Suspense 是 Vue3 推出的一个内置特殊组件。

如果使用 Suspense ，要返回一个 promise 。

Suspense 有多个 slot （对应 promise 不同情况）。

### Suspense使用实例
子组件：`AsyncShow.vue`
```html
<template>
  <h1>{{result}}</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          result: 42
        })
      }, 3000)
    })
  }
})
</script>
```

如上，在浏览器中，可以直接使用 `Promise` 返回的结果，比如 `result` 。

在父组件 `App.vue` 中调用：
```html
<Suspense>
  <template #default>
    <div>
      <async-show />
    </div>
  </template>
  <template #fallback>
    <h1>Loading !...</h1>
  </template>
</Suspense>
```

### Suspense使用实例（async）
`DogShow.vue`：
```html
<template>
  <img :src="result && result.message">
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
export default defineComponent({
  async setup() {
    const rawData = await axios.get('https://dog.ceo/api/breeds/image/random')
    return {
      result: rawData.data
    }
  }
})
</script>
```

在父组件 `App.vue` 中调用：
```html
<Suspense>
  <template #default>
    <div>
      <dog-show />
    </div>
  </template>
  <template #fallback>
    <h1>Loading !...</h1>
  </template>
</Suspense>
```

### OnErrorCaptured
在 `App.vue` 的 `script` 中：
```ts
import { OnErrorCaptured } = 'vue'

setup() {
  const error = ref(null)
  onErrorCaptured((e: any) => {
    error.value = e
    return true
  })
  return {
    error
  }
}
```

如上，定义响应式变量 `error` 捕获异常。
