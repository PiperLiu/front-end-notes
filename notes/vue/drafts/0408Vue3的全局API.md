# Vue3的全局API

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Vue3的全局API](#vue3的全局api)
    - [Vue2全局API遇到的问题](#vue2全局api遇到的问题)
    - [Vue2与Vue3对比](#vue2与vue3对比)

<!-- /code_chunk_output -->

### Vue2全局API遇到的问题
- 在单元测试中，全局配置非常容易污染全局环境
- 在不同的 apps 中，共享一份有不同配置的 Vue 对象，也变得非常困难

### Vue2与Vue3对比
Vue2：
```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.ignoredElements = [/^app-/]
Vue.use(/*...*/)
Vue.mixin(/*...*/)
Vue.component(/*...*/)
Vue.directive(/*...*/)

Vue.prototype.customProperty = () => {}

new Vue({
  render: h => h(App)
}).$mount('#app')
```

Vue3：
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.isCustomElement = tag => tag.startsWith('app-')
app.use(/*...*/)
app.mixin(/*...*/)
app.component(/*...*/)
app.directive(/*...*/)

app.config.globalProperties.customProperty = () => {}

app.mount('#app')
```
