# 使用axios发送ajax请求

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [使用axios发送ajax请求](#使用axios发送ajax请求)
    - [](#)

<!-- /code_chunk_output -->

### 安装axios
老师提供了一个能跨域访问的接口。
```
https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register
```

```bash
npm install axios --save
```

在`<script>`里：
```js
import { toRefs } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
export default {
  name: 'Home',
  setup() {
    axios.get('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register')
      .then((response) => {
        const data = response.data.message;
      })
  }
}
```

如上，获取了请求返回的数据。

### 把请求放在vuex里

实际上，把上述逻辑放在 `store/index.js` 好一些。

```js
import { createStore } from 'vuex'
import axios from 'axios';
export default createStore({
  state: { name: 'dell' },
  mutations: {
    changeName(state, str) {
      state.name = str;
    }
  },
  actions: {
    getData(store) {
      axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register')
      .then((response) => {
        const msg = response.data.message;
        store.commit('changeName', msg)
      })
    }
  }
})

```

### 延伸阅读：ajax请求
- [GET 和 POST 到底有什么区别？](https://www.zhihu.com/question/28586791/answer/767316172)