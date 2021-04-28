# Vue-Router路由的理解和使用

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Vue-Router路由的理解和使用](#vue-router路由的理解和使用)
    - [创建项目时，记得选择路由Router](#创建项目时记得选择路由router)
    - [main.js多了路由插件](#mainjs多了路由插件)
    - [router-link](#router-link)
    - [router-view](#router-view)
    - [懒加载](#懒加载)

<!-- /code_chunk_output -->

### 创建项目时，记得选择路由Router
```bash
Vue CLI v4.5.12
? Please pick a preset: Manually select features        
? Check the features needed for your project: 
 (*) Choose Vue version
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support        
>(*) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

是否使用 history mode for router ？
- 我们这里不使用，使用哈希路由。

### main.js多了路由插件
```js
import router from './router'

createApp(App).use(router).mount('#app')
```

路由是指：根据url不同，展示不同内容。

### router-link
```js
<router-link to="/">Home</router-link>
```

`router-link` 指跳转路由的标签。

### router-view

`<router-view/>` 负责展示当前路由对应的组件内容。

### 懒加载
在 `router/index.js` 中：
```js
{
    path: '/about',
    name: 'About',
    // 异步加载路由
    componment: () => import('../views/About.vue')
}
```

如上，如此设计 `componment` ，在不访问 `About` 时，就不会加载 `About` 。
