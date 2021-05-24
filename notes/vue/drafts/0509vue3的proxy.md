# vue3的proxy实现响应式

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [vue3的proxy实现响应式](#vue3的proxy实现响应式)
    - [vue3使用proxy](#vue3使用proxy)

<!-- /code_chunk_output -->

### vue3使用proxy
在 vue2 中，有些操作并不能触发响应，比如 `arr[0] = 5` 。此时需要用 `$set` 来自行触发。

而 vue3 中，大量使用 proxy ，似乎可以解决上述问题。

```ts
// vue2
Object.defineProperty(data, 'count', {
  get() {},
  set() {},
})

//vue3
new Proxy(data, {
  get(key) {},
  set(key, value) {},
})
```

如上，`vue2`中，我们必须知道属性的名字，比如`count`，才能捕获相应；`vue3`使用了 es6 的 `proxy` ，无需预先知道 `key` 。
