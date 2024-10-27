# 第 4 章 响应系统的作用与实现

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [4.1 响应式数据与副作用函数](#41-响应式数据与副作用函数)
- [4.2 响应式数据的基本实现](#42-响应式数据的基本实现)
- [4.3 设计一个完善的响应系统](#43-设计一个完善的响应系统)
- [4.4 分支切换与 cleanup](#44-分支切换与-cleanup)
- [4.5 嵌套的 effect 与 effect 栈](#45-嵌套的-effect-与-effect-栈)
- [4.6 避免无限递归循环](#46-避免无限递归循环)
- [4.7 调度执行](#47-调度执行)
- [4.8 计算属性 computed 与 lazy](#48-计算属性-computed-与-lazy)
- [4.9 watch 的实现原理](#49-watch-的实现原理)
- [4.10 立即执行的 watch 与回调执行时机](#410-立即执行的-watch-与回调执行时机)
- [4.11 过期的副作用](#411-过期的副作用)
- [4.12 总结](#412-总结)

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

这里我们先做一个阶段性总结，防止乱掉：
- `Proxy` 用于捕获/拦截 `get` 和 `set` 操作
  - `get` 操作中调用了 `track` 函数，将当前副作用函数收集到 `bucket` 中
  - `set` 操作中调用了 `trigger` 函数，从 `bucket` 中取出并执行副作用函数
- `effect` 函数用于注册副作用函数
  - 一般而言，传入 `effect` 的 `fn` 函数内部都会触发一次 `get` 操作（而 `fn` 在 `effect` 内部被封装成了 `effectFn` ），在 `get` 函数被调用时， `effectFn` 会被 `track` 收集到 `bucket` 中
  - 对于 `set` 中的 `trigger` 函数，其会调用 `effectFn` 函数（其内部包含了能触发 `get` 操作的 `fn` 函数），所以 `set` 操作也会触发 `track` 收集副作用函数

我们来捋一下 `fn = () => x = obj.ok ? obj.text : 'default text'` 的执行流程：
- 如果 `obj.ok` 为 `true`，当我们写 `obj.text = 'whatever'` 时
  - `obj.text` 的 `set` 中的 `trigger` 首先被调用，其会触发 `effectFn` 函数
  - `effectFn` 函数内会将 `activeEffect` 变量设置为 `effectFn` ，然后执行 `fn`
  - `fn` 内会读取 `obj.ok` 和 `obj.text`，因此会触发二者的 `get` 中的 `track` 函数
  - 从而实现将 `obj.text` 的副作用函数 `effectFn` 收集到二者的 `bucket` 中
  - 显然，以后无论执行 `obj.text` 还是 `obj.ok` 的 `set` 操作，都会触发 `obj.text` 的副作用函数 `effectFn` 的执行
- 但是，如果 `obj.ok` 被设置为 `false` 这个操作出现
  - 其在执行 `fn` 时，并不会触发 `obj.text` 的 `get` 操作
  - 所以此时 `obj.ok` 的 `effectFn` 不会被收集到 `bucket` 中

因此，每一次 `set` 操作其实都会触发 `track` 函数收集副作用函数；因此，我们在 **每次 effectFn 函数执行开始，先把 effectFn 从所在的 bucket 中移除，之后再让 effectFn 通过 activeEffect 变量重新被收集到 bucket 中** ，从而实现刷新副作用函数的目的。

```javascript
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
  // 此外，需要为 effectFn （也就是现在的 activeEffect ） 新增一个属性
  // 让之后 effectFn 需要将自己清理出 bucket 时，知道该清理哪些 bucket
  activeEffect.deps.push(dep)
}

let activeEffect
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
  }
  effectFn.deps = []
  effectFn()
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const dep = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0   // 清空 effectFn 的 deps 数组
}
```

此时，还需要修改 `trigger` 函数，这并非为了设计逻辑，而是为了代码逻辑，否则会有死循环。

```javascript
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  // 为什么这里要新建一个 effectsToRun 对象？
  // 因为 Set.prototype.ForEach 中
  // 如果先 delete 再 add 元素，会导致 ForEach 死循环
  const effectsToRun = new Set(effects)
  effectsToRun.forEach(effectFn => effectFn())
}
```

### 4.5 嵌套的 effect 与 effect 栈

主要用于解决如下问题。

```javascript
effect(function effect1() {
  effect(function effect2() {
    ...
  })
  ...
})
```

在什么场景下会出现这种情况？

```javascript
const Bar = {
  render() { ... }
}
const Foo = {
  render() {
    return <Bar />
  }
}

// 在 Vue 中， render() 函数是在 effect 中执行的
// 相当于如下代码
effect(() => {
  Foo.render()
  effect(() => {
    Bar.render()
  })
})
```

这里的问题是， `activeEffect` 变量会被传错，所谓我们需要把 `activeEffect` 变成栈。这很好理解。

```javascript
let activeEffect
const effectStack = []

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  effectFn()
}
```

### 4.6 避免无限递归循环

主要解决以下问题：

```javascript
effect(() => obj.foo ++ )
// 同理于
effect(() => obj.foo = obj.foo + 1)
```

相当于每次 `effectFn` 执行，都又触发 `track` ，又触发 `trigger` ，又触发 `effectFn` ，如此循环下去。

解决办法：在 `trigger` 内，禁止被收集的副作用函数再次执行（ `activeEffect` 就是被收集的副作用函数，它能够被收集，说明它所属的 `effectFn` 已经被执行过一次了）。

```javascript
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => effectFn())
}
```

### 4.7 调度执行

这里为副作用函数增加了一个 `scheduler` 参数，用于控制副作用函数的执行时机。

```javascript
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

// effect 函数增加 options 参数
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.options = options
  effectFn.deps = []
  effectFn()
}
```

结合 `scheduler` 参数，可以实现较为复杂的效果，比如结合 `Promise` 实现延迟执行或者跳过过渡状态。

```javascript
const data = { foo: 1 }
const obj = new Proxy(data, { ... })

const jobQueue = new Set()
const p = Promise.resolve()

let isFlushing = false
function flushJob() {
  if (isFlushing) return
  isFlushing = true
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false
  })
}

// 在注册函数时，传入 scheduler 参数
effect(() => {
  console.log(obj.foo)
}, {
  scheduler(fn) {
    jobQueue.add(fn)
    flushJob()
  }
})  // 会打印 obj.foo 的初始值 1

obj.foo ++ // 此时 obj.foo 为 2 ，但是不打印
obj.foo ++ // 此时 obj.foo 为 3 ，但是打印
```

注意这里：
- `jobQueue` 是一个 `Set` ，所以里面只有一个 `fn` 函数，不会有重复的函数（虽然被添加了两次，但是 `Set` 内部会自动去重）
- `Promise.resolve()` 返回一个已经解析为 resolve 状态的 Promise 对象。这意味着它立即返回一个已经完成的 Promise ，不需要等待任何异步操作
- 在这个例子中， `flushJob` 函数通过 `p.then(() => {...})` 将任务（即 `jobQueue` 中的函数）添加到微任务队列；这意味着这些任务会在当前执行栈清空后，但在下一个宏任务（如 `setTimeout` 或 `setInterval` ）开始之前执行

### 4.8 计算属性 computed 与 lazy

这里我们总结下前文提到的 `effect` 的作用，因为从现在开始，我们不会再纠结 `track` 和 `trigger` 内部如何实现的了，我们只将 `effect` 作为一个接口使用，它的作用可以描述为：
- 传入一个 `fn` 函数，这个函数必须要有副作用，而且，它必须要能调动 JS 引擎的 `Proxy` 中的 `get` 拦截器，也就是说，它至少是 `() => a = obj.x` 形式的
  - 而在接下里的 `computed` 属性中，你还可以看到它是 `() => obj.a + obj.b` 形式的
  - 对于传入 `obj.a + obj.b` 而言，实际上是通过 `effect` 注册了对 `obj.a` 和 `obj.b` 的拦截，之后所有对 `obj.a` 和 `obj.b` 的读取都会触发相关的 `track` 函数执行，而对 `obj.a` 和 `obj.b` 的修改都会触发相关的 `trigger` 函数执行
- 此外，还可以传入一个可选参数 `options`

`computed` 函数实际上是对 `effect` 函数的进一步封装。首先，我们需要升级 `effect` 函数。

```javascript
// 我们希望 effect 函数能够如下使用
const effectFn = effect(
  () => obj.foo + obj.bar,
  { lazy: true }
)
const value = effectFn()

// 所以，我们需要为 effect 填加两个功能如下
// 1. 能够返回 effectFn
// 2. 能够根据 options.lazy 选项，决定是否立即执行 effectFn
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  effectFn.options = options
  effectFn.deps = []
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
}

// 由此，我们可以实现 computed 函数
// 这里的 getter 可以为 () => obj.a + obj.b 形式的函数
function computed(getter) {
  let value
  let dirty = true

  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {  // getter 中有值被修改时，会触发 scheduler
      if (!dirty) {
        dirty = true  // dirty 用于 cache 结果
        trigger(obj, 'value')  // 为什么要写这里，作用见下文
      }
    }
  })

  const obj = {
    get value() {  // 这里 get 关键字相当于 Python 的 @property
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      track(obj, 'value')  // 为什么要写这里，作用见下文
      return value
    },
  }

  return obj
}

// 这样，我们就可以像这样使用 computed 函数
const data = { foo: 1, bar: 2 }
const obj = new Proxy(data, { ... })
const sumRes = computed(() => obj.foo + obj.bar)

console.log(sumRes.value) // 3
```

为什么要手动写 `track` 和 `trigger` ？
- 假设不加 `track` 和 `trigger` ，你会发现目前的 `obj.value` 还无法做到响应式，如下面的代码

```javascript
const sumRes = computed(() => obj.foo + obj.bar)

effect(() => {
  console.log(sumRes.value)
})

obj.foo ++
```

上述代码中，调用 `obj.foo ++` 之后，通过 `effect` 注册的 `console.log` 函数并不会被执行，因为 `sumRes.value` 实际上还不是响应式的，你会发现在 `computed` 函数内部的 `obj` 连个 `Proxy` 都不是，所以其 `get value()` 方法也不会被自动调用。所以需要手动触发。可以理解为这里的 `obj` 其实是半个响应式数据？

### 4.9 watch 的实现原理

我们希望设计 `watch` 接口如下代码。

```javascript
watch(
  () => obj.foo + obj.bar,  // 这里也可以不用计算属性，只传入 obj / obj.foo 都行
  (newVal, oldVal) => {  // callback 函数，简称 cb
    console.log(`foo + bar changed from ${oldVal} to ${newVal}`)
  },
)

obj.foo ++  // 这时会触发 watch 的 callback 函数
```

`watch` 的实现并不复杂，只要将 `callback` 函数注册到 `effect` 中的 `scheduler` 即可。

```javascript
function watch(source, cb) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)  // 递归遍历到所有的 getter
  }
  let oldValue, newValue
  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      {
        scheduler() {
          newValue = effectFn()
          cb(newValue, oldValue)
          oldValue = newValue
      }
    }
  )
  oldValue = effectFn()
}

// traverse 函数用于递归遍历所有的 getter
function traverse(value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return
  seen.add(value)
  for (const key in value) {
    traverse(value[key], seen)
  }
  return value
}
```

### 4.10 立即执行的 watch 与回调执行时机

这里为 `watch` 新增了 options 选项，其中包括 `immediate` 和 `flush` 两个参数。

```javascript
function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue

  // 将核心任务封装成 job 函数
  const job = () => {
    newValue = effectFn()
    cb(newValue, oldValue)
    oldValue = newValue
  }

  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler: () => {
        if (options.flush === 'post') {
          const p = Promise.resolve()
          p.then(job)
        } else {
          job()
        }
      }
    }
  )

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
}
```

`flush` 的参数包括：
- `post` ，则将 `job` 函数放入微任务队列，等待当前宏任务结束后再执行
- `sync` ，则立即执行 `job` 函数
- `pre` ，还无法实现，这涉及到组建的更新时机

### 4.11 过期的副作用

```javascript
let finalData

watch(obj, async () => {
  const res = await fetchData('/path/to/request')
  finalData = res.data
})
```

如上情况中，有可能导致：
- 第一次修改 `obj` 后，等待 `fetchData` 完成，称之为请求 A
- 第二次修改 `obj` 后，同样等待，称之为请求 B
- B 已经返回了，赋值给 `finalData` 了
- 此时 A 紧接着返回，赋值给 `finalData` 了
- 但是， B 比 A 是更新一次的请求，所以不应该让 A 的结果覆盖 B 的结果

对于这种情况，可以给传入 `watch` 的 `cb` 函数增加一个 `onInvalidate` 参数，用于在副作用失效时执行一些清理操作。

具体而言，应该给 `onInvalidate` 传入一个函数 `fn` ，当这个 `watch` 实例被再次执行时，它会首先调用 `fn` 函数，来清理状态，之后再执行 `cb` 函数。

```javascript
function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }

  let oldValue, newValue

  let cleanup  // 来保存用户在 cb 通过 onInvalidate 传入的函数
  function onInvalidate(fn) {
    cleanup = fn
  }

  const job = () => {
    newValue = effectFn()
    if (cleanup) {
      cleanup()
    }
    cb(newValue, oldValue, onInvalidate)
    oldValue = newValue
  }

  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler: () => {
        if (options.flush === 'post') {
          const p = Promise.resolve()
          p.then(job)
        } else {
          job()
        }
      }
    }
  )

  if (options.immediate) {
    job()
  } else {
    oldValue = effectFn()
  }
}
```

使用 `watch` 接口时，可以像如下这样使用 `onInvalidate` 参数。

```javascript
watch(obj, async (newVal, oldVal, onInvalidate) => {
  let expired = false
  onInvalidate(() => {
    expired = true
  })

  const res = await fetchData('/path/to/request')

  if (!expired) {
    finalData = res.data
  }
})
```

### 4.12 总结
