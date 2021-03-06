# 实例：用Composition-API开发to-do-list

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [实例：用Composition-API开发to-do-list](#实例用composition-api开发to-do-list)

<!-- /code_chunk_output -->

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lesson 37</title>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="root"></div>
</body>
<script>
  // 关于 list 操作的内容进行了封装
  const listRelativeEffect = () => {
    const { reactive } = Vue;
    const list = reactive([]);
    const addItemToList = (item) => {
      list.push(item);
    }
    return { list, addItemToList }
  }

  // 关于 inputValue 操作的内容进行了封装
  const inputRelativeEffect = () => {
    const { ref } = Vue;
    const inputValue = ref('');
    const handleInputValueChange = (e) => {
      inputValue.value = e.target.value
    }
    return { inputValue, handleInputValueChange}
  }

  const app = Vue.createApp({
    setup() {
      // 流程调度中转
      const { list, addItemToList } = listRelativeEffect();
      const { inputValue, handleInputValueChange} = inputRelativeEffect();
      return {
        list, addItemToList,
        inputValue, handleInputValueChange
      }
    },
    template: `
      <div>
        <div>
          <input :value="inputValue" @input="handleInputValueChange" />
          <button @click="() => addItemToList(inputValue)">提交</button>
        </div>
        <ul>
          <li v-for="(item, index) in list" :key="index">{{item}}</li>
        </ul>
      </div>
    `,
  });
  
  const vm = app.mount('#root');
</script>
</html>
```

如上，注意：
- 把数据和数据操作摘出来，封装成小的函数，并不完全放在 setup 里
- `<button @click="() => addItemToList(inputValue)">提交</button>` 里面，并不可以 `@click=addItemToList(inputValue)`，因为`@click=函数名`，而非函数被调用。
