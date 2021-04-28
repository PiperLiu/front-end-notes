# VueCli的使用和单文件组件

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [VueCli的使用和单文件组件](#vuecli的使用和单文件组件)
    - [下载nodejs](#下载nodejs)
      - [安装nrm](#安装nrm)
      - [确认没有安装老版本cli](#确认没有安装老版本cli)
      - [安装4.5.9](#安装459)
    - [创建项目](#创建项目)
      - [vue create](#vue-create)
      - [npm install](#npm-install)
    - [实例：to-do-list](#实例to-do-list)

<!-- /code_chunk_output -->

### 下载nodejs
[nodejs.org](nodejs.org)

```sh
$ node -v
v12.16.1

$ npm -v
6.13.4
```

#### 安装nrm
```
$ npm install nrm -g
```

包含了很多镜像源。

```
$ nrm ls

  npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
* taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/       
  edunpm ----- http://registry.enpmjs.org/
```

如上，我们以及 `use taobao` 了。

```
nrm use taobao
```

#### 确认没有安装老版本cli
```
npm uninstall vue-cli -g
```

#### 安装4.5.9
```
npm install @vue/cli@4.5.9
```

### 创建项目
#### vue create

```
vue create <项目名称>
# 选择配置
cd <项目>
npm run serve  # 启动
```

因为使用 webpack 打包，所以可以用 `import` 这种形式。

#### npm install
把别人的项目拿下来，打多没有 moudles ，我们输入 `npm install` 安装依赖。

### 实例：to-do-list

App.vue
```html
<template>
  <div>
    <input v-model="inputValue" />
    <button class="button" @click="handleAddItem">提交</button>
  </div>
  <ul>
    <list-item
      v-for="(item, index) in list"
      :key="index"
      :msg="item"
    />
  </ul>
</template>

<script>
import { reactive, ref } from 'vue';
import ListItem from './components/ListItem';

export default {
  name: 'App',
  components: { ListItem },
  setup() {
    const inputValue = ref('');
    const list = reactive([]);

    const handleAddItem = () => {
      list.push(inputValue.value);
      inputValue.value = '';
    };
    return { handleAddItem, inputValue, list }
  }
}
</script>

<style>
  .button {
    margin-left: 20px;
    color: red;
  }
</style>
```

组件一般用大写命名，比如 `Listitem.vue` 。

```html
<template>
  <li class="button">{{ msg }}</li>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    msg: String
  }
}
</script>

<style>
</style>
```

父组件样式会不会对子组件产生影响呢？

会的。