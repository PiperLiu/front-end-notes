# 第 4 章 响应系统的作用与实现

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [4.1 响应式数据与副作用函数](#41-响应式数据与副作用函数)
- [4.2 响应式数据的基本实现](#42-响应式数据的基本实现)
- [4.3 设计一个完善的响应系统](#43-设计一个完善的响应系统)
- [4.4 分支切换与 cleanup](#44-分支切换与-cleanup)

<!-- /code_chunk_output -->

总体而言感觉难度很大，如果思路稍有没跟上，就不太好想。

### 4.1 响应式数据与副作用函数

```javascript
const obj = { text: 'hello world' }
function effect() {
  document.body.innerText = obj.text
}
```

我们希望 `obj.text` 的变化能触发 `effect` 函数的执行。

**注意，上面的 effect 与下文提到的 effect 并不相同。**

### 4.2 响应式数据的基本实现

这里用 Proxy 捕获/拦截 `set` 和 `get` 操作（得益于 ES2015+ ）。

```javascript
const bucket = new Set()

const data = { text: 'hello world' }
const obj = new Proxy(data, {
  get(target, key) {
    ...
  }
  set(target, key, newVal) {
    ...
  }
})
```

这里引入了全局变量 `bucket`，用来存放“副作用”。
- 当读取操作发生时，讲副作用函数收集到 `bucket` 中
- 当修改操作发生时，从 `bucket` 中取出并执行副作用函数

### 4.3 设计一个完善的响应系统

**如下的 effect 函数，才是我们要讨论的 effect ，它用于注册副作用函数。**

```javascript
let activeEffect
function effect(fn) {
  activeEffect = fn
  fn()
}
```

**这里非常不直观，但是对于 JS 开发者来说，用一个全局变量，作为中介，来在函数之间传递数据，是很常见的做法。** 你会看到 `activeEffect` 之后在其他函数中被调用的。无需考虑 race condition 问题，因为 JS 引擎保证了单线程执行。

所以我们可以如下使用 effect 函数：

```javascript
effect(() => {
  document.body.innerText = obj.text
})
```

**必须注意，如上的 `obj.text` 实际上触发了 `Proxy` 中拦截到的 `get` 操作，你会看到下面的 `get` 函数中，直接使用了 `activeEffect` 变量进行赋值。**

```javascript
const obj = new Proxy(data, {
  get(target, key) {
    if (activeEffect) {
      bucket.add(activeEffect)
    }
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    bucket.forEach(fn => fn())
    return true
  }
})
```

上面的代码很简单，显然一个全局的 `bucket` 变量是不可取的，于是这里用 `WeakMap` 来代替，方便针对各个变量分别保存副作用函数。

> WeakMap 与 Map ：简单理解为， WeakMap 指向的对象，不会让垃圾回收器所需要的 ref count 增加。

```javascript
const bucket = new WeakMap()

const obj = new Proxy(data, {
  get(target, key) {
    if (!activeEffect) return target[key]
    let depsMap = bucket.get(target)
    if (!depsMap) {
      bucket.set(target, (depsMap = new Set()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    const depsMap = bucket.get(target)
    if (!depsMap) return
    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())
  }
})
```

对其封装一下操作，这里引出 `track()` 和 `trigger()` 函数，是之后要用到的概念。

```javascript
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    trigger(target, key)
  }
})

function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(fn => fn())
}
```

### 4.4 分支切换与 cleanup

上文的讨论中，没法处理以下逻辑。

```javascript
const data = { ok: true, text: 'hello world' }
const obj = new Proxy(data, { ... })

effect(function effectFn() {
  document.body.innerText = obj.ok ? obj.text : 'default text'
})
```

上述代码存在问题：`obj.ok` 是 `false` 时，再修改 `obj.text` 依然会触发 `effectFn` 的执行，但实际上， `document.body.innerText` 依然显示 `'default text'` ，所以没必要执行副作用函数，造成不必要的性能损耗。

