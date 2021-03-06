
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [01基础知识杂记](#01基础知识杂记)
  - [01基础操作](#01基础操作)
  - [02生命周期](#02生命周期)
  - [03常用模板语法](#03常用模板语法)
  - [04数据，方法，计算属性和侦听器](#04数据方法计算属性和侦听器)
  - [05样式绑定语法](#05样式绑定语法)
  - [06条件渲染](#06条件渲染)
  - [07列表循环渲染](#07列表循环渲染)
  - [08事件绑定](#08事件绑定)
  - [09表单中的双向绑定指令的使用](#09表单中的双向绑定指令的使用)
- [02组件](#02组件)
  - [01组件的定义及复用性，局部组件和全局组件](#01组件的定义及复用性局部组件和全局组件)
  - [02组件间传值及传值校验](#02组件间传值及传值校验)
  - [03单向数据流](#03单向数据流)
  - [04Non-Props属性](#04non-props属性)
  - [05父子组件间如何通过事件进行通信](#05父子组件间如何通过事件进行通信)
  - [06组件间双向绑定高级内容](#06组件间双向绑定高级内容)
  - [07使用插槽和具名插槽解决组件内容传递问题](#07使用插槽和具名插槽解决组件内容传递问题)
  - [08作用域插槽](#08作用域插槽)
  - [09动态组件和异步组件](#09动态组件和异步组件)
  - [10v-once、ref和provide/inject](#10v-once-ref和provideinject)
- [03Vue中的动画](#03vue中的动画)
  - [01使用 Vue 实现基础的 CSS 过渡与动画效果](#01使用-vue-实现基础的-css-过渡与动画效果)
  - [02使用transition标签实现单元素组件的过渡和动画效果](#02使用transition标签实现单元素组件的过渡和动画效果)
  - [03组件和元素切换动画的实现](#03组件和元素切换动画的实现)
  - [04列表动画](#04列表动画)
  - [05状态动画](#05状态动画)
- [04高级语法](#04高级语法)
  - [01Mixin混入的基础语法](#01mixin混入的基础语法)
  - [02开发实现Vue中的自定义指令](#02开发实现vue中的自定义指令)
  - [03Teleport传送门](#03teleport传送门)
  - [04更加底层的render函数](#04更加底层的render函数)
  - [05插件的定义和使用](#05插件的定义和使用)
  - [06数据校验插件开发实例](#06数据校验插件开发实例)
  - [07异步好帮手：Suspense](#07异步好帮手suspense)
  - [08Vue3的全局API](#08vue3的全局api)
- [05Composition API](#05composition-api)
  - [01Setup函数的使用](#01setup函数的使用)
  - [02ref，reactive响应式引用的用法和原理](#02refreactive响应式引用的用法和原理)
  - [03toRef以及context参数](#03toref以及context参数)
  - [04实例：用Composition-API开发to-do-list](#04实例用composition-api开发to-do-list)
  - [05computed方法生成计算属性](#05computed方法生成计算属性)
  - [06watch以及其与watchEffect的差异性](#06watch以及其与watcheffect的差异性)
  - [07生命周期函数的新写法](#07生命周期函数的新写法)
  - [08Provide、Inject、模板ref用法](#08provide-inject-模板ref用法)
  - [09vue3的proxy](#09vue3的proxy)
  - [10将逻辑抽离出来](#10将逻辑抽离出来)
  - [11typescript对vue3的加持](#11typescript对vue3的加持)
- [06Vue项目开发配套工具讲解](#06vue项目开发配套工具讲解)
  - [01VueCli的使用和单文件组件](#01vuecli的使用和单文件组件)
  - [02Vue-Router路由的理解和使用](#02vue-router路由的理解和使用)
  - [03VueX的语法详解](#03vuex的语法详解)
  - [04使用axios发送ajax请求](#04使用axios发送ajax请求)
- [07以实战项目为例](#07以实战项目为例)
  - [01京东到家](#01京东到家)
  - [02（知乎）者也](#02知乎者也)

<!-- /code_chunk_output -->

## 01基础知识杂记
### 01基础操作
[./drafts/0101基础操作.md](./drafts/0101基础操作.md)

- [轻度使用：cdn](./drafts/0101基础操作.md#轻度使用cdn)
- [v-if](./drafts/0101基础操作.md#v-if)
- [v-on](./drafts/0101基础操作.md#v-on)
- [v-for](./drafts/0101基础操作.md#v-for)
- [v-model](./drafts/0101基础操作.md#v-model)
- [v-bind 与 组件的props](./drafts/0101基础操作.md#v-bind-与-组件的props)
- [MVVM简单理解](./drafts/0101基础操作.md#mvvm简单理解)

### 02生命周期
[./drafts/0102生命周期.md](./drafts/0102生命周期.md)

### 03常用模板语法
[./drafts/0103常用模板语法.md](./drafts/0103常用模板语法.md)

- [插值表达式](./drafts/0103常用模板语法.md#插值表达式)
- [v-html](./drafts/0103常用模板语法.md#v-html)
- [v-bind](./drafts/0103常用模板语法.md#v-bind)
- [v-once](./drafts/0103常用模板语法.md#v-once)
- [v-if](./drafts/0103常用模板语法.md#v-if)
- [v-on](./drafts/0103常用模板语法.md#v-on)
- [动态属性[]](./drafts/0103常用模板语法.md#动态属性)
- [修饰符](./drafts/0103常用模板语法.md#修饰符)

### 04数据，方法，计算属性和侦听器
[./drafts/0104数据，方法，计算属性和侦听器.md](./drafts/0104数据，方法，计算属性和侦听器.md)

- [关于 this](./drafts/0104数据，方法，计算属性和侦听器.md#关于-this)
- [计算属性computed与侦听器watch](./drafts/0104数据，方法，计算属性和侦听器.md#计算属性computed与侦听器watch)

### 05样式绑定语法
[./drafts/0105样式绑定.md](./drafts/0105样式绑定.md)

- [样式绑定](./drafts/0105样式绑定.md#样式绑定)
  - [字符串形式](./drafts/0105样式绑定.md#字符串形式)
  - [字典形式](./drafts/0105样式绑定.md#字典形式)
  - [数组形式](./drafts/0105样式绑定.md#数组形式)
  - [父子组件](./drafts/0105样式绑定.md#父子组件)
- [样式操作:style](./drafts/0105样式绑定.md#样式操作style)

### 06条件渲染
[./drafts/0106条件渲染.md](./drafts/0106条件渲染.md)

`v-if` 和 `v-else-if` `v-else` 以及 `v-show` 。

### 07列表循环渲染
[./drafts/0107列表渲染循环.md](./drafts/0107列表渲染循环.md)

- [(value, key, index)](./drafts/0107列表渲染循环.md#value-key-index)
- [复用 dom 元素（:key）](./drafts/0107列表渲染循环.md#复用-dom-元素key)
- [数组的变更函数](./drafts/0107列表渲染循环.md#数组的变更函数)
- [v-for="item in 10"](./drafts/0107列表渲染循环.md#v-foritem-in-10)
- [v-for 与 v-if](./drafts/0107列表渲染循环.md#v-for-与-v-if)
- [template](./drafts/0107列表渲染循环.md#template)

### 08事件绑定
[./drafts/0108事件绑定.md](./drafts/0108事件绑定.md)

- [$event](./drafts/0108事件绑定.md#event)
- [一个事件，多个函数](./drafts/0108事件绑定.md#一个事件多个函数)
- [修饰符](./drafts/0108事件绑定.md#修饰符)
  - [事件修饰符](./drafts/0108事件绑定.md#事件修饰符)
    - [stop](./drafts/0108事件绑定.md#stop)
    - [self](./drafts/0108事件绑定.md#self)
    - [capture](./drafts/0108事件绑定.md#capture)
    - [passive](./drafts/0108事件绑定.md#passive)
    - [prevent](./drafts/0108事件绑定.md#prevent)
    - [once](./drafts/0108事件绑定.md#once)
  - [按键修饰符](./drafts/0108事件绑定.md#按键修饰符)
    - [enter](./drafts/0108事件绑定.md#enter)
    - [其他常用的](./drafts/0108事件绑定.md#其他常用的)
  - [鼠标修饰符](./drafts/0108事件绑定.md#鼠标修饰符)
  - [精确修饰符 exact](./drafts/0108事件绑定.md#精确修饰符-exact)

### 09表单中的双向绑定指令的使用
[./drafts/0109表单中的双向绑定指令的使用.md](./drafts/0109表单中的双向绑定指令的使用.md)

- [input](./drafts/0109表单中的双向绑定指令的使用.md#input)
- [textarea](./drafts/0109表单中的双向绑定指令的使用.md#textarea)
- [checkbox](./drafts/0109表单中的双向绑定指令的使用.md#checkbox)
- [radio](./drafts/0109表单中的双向绑定指令的使用.md#radio)
- [select](./drafts/0109表单中的双向绑定指令的使用.md#select)
- [checkbox true-value](./drafts/0109表单中的双向绑定指令的使用.md#checkbox-true-value)
- [修饰符](./drafts/0109表单中的双向绑定指令的使用.md#修饰符)
  - [lazy](./drafts/0109表单中的双向绑定指令的使用.md#lazy)
  - [number](./drafts/0109表单中的双向绑定指令的使用.md#number)
  - [trim](./drafts/0109表单中的双向绑定指令的使用.md#trim)

## 02组件
### 01组件的定义及复用性，局部组件和全局组件
[./drafts/0201组件的定义及复用性，局部组件和全局组件.md](./drafts/0201组件的定义及复用性，局部组件和全局组件.md)

- [组件的定义](./drafts/0201组件的定义及复用性，局部组件和全局组件.md#组件的定义)
- [全局组件](./drafts/0201组件的定义及复用性，局部组件和全局组件.md#全局组件)
- [局部组件](./drafts/0201组件的定义及复用性，局部组件和全局组件.md#局部组件)

### 02组件间传值及传值校验
[./drafts/0202组件间传值及传值校验.md](./drafts/0202组件间传值及传值校验.md)

- [动态传参](./drafts/0202组件间传值及传值校验.md#动态传参)
- [传值校验](./drafts/0202组件间传值及传值校验.md#传值校验)

### 03单向数据流
[./drafts/0203单向数据流.md](./drafts/0203单向数据流.md)

- [v-bind="params"](./drafts/0203单向数据流.md#v-bindparams)
- [大小写](./drafts/0203单向数据流.md#大小写)
- [子组件能用父组件，但是不能改](./drafts/0203单向数据流.md#子组件能用父组件但是不能改)

### 04Non-Props属性
[./drafts/0204Non-Props属性.md](./drafts/0204Non-Props属性.md)

- [子组件是否接收](./drafts/0204Non-Props属性.md#子组件是否接收)
  - [inheritAttrs](./drafts/0204Non-Props属性.md#inheritattrs)
- [子组件多个根元素](./drafts/0204Non-Props属性.md#子组件多个根元素)

### 05父子组件间如何通过事件进行通信
[./drafts/0205父子组件间如何通过事件进行通信.md](./drafts/0205父子组件间如何通过事件进行通信.md)

- [子组件如何修改父组件值？](./drafts/0205父子组件间如何通过事件进行通信.md#子组件如何修改父组件值)
- [this.$emit](./drafts/0205父子组件间如何通过事件进行通信.md#thisemit)
- [与v-model类似？](./drafts/0205父子组件间如何通过事件进行通信.md#与v-model类似)

### 06组件间双向绑定高级内容
[./drafts/0206组件间双向绑定高级内容.md](./drafts/0206组件间双向绑定高级内容.md)

- [v-model如果对两个数据生效？](/drafts/0206组件间双向绑定高级内容.md#v-model如果对两个数据生效)
- [v-model:](/drafts/0206组件间双向绑定高级内容.md#v-model)
- [v-model自定义修饰符modelModifiers](/drafts/0206组件间双向绑定高级内容.md#v-model自定义修饰符modelmodifiers)

### 07使用插槽和具名插槽解决组件内容传递问题
[./drafts/0207使用插槽和具名插槽解决组件内容传递问题.md](./drafts/0207使用插槽和具名插槽解决组件内容传递问题.md)

- [需求：把DOM查到组件里](./drafts/0207使用插槽和具名插槽解决组件内容传递问题.md#需求把dom查到组件里)
- [slot数据作用域的问题](./drafts/0207使用插槽和具名插槽解决组件内容传递问题.md#slot数据作用域的问题)
- [default](./drafts/0207使用插槽和具名插槽解决组件内容传递问题.md#default)
- [v-slot具名插槽](./drafts/0207使用插槽和具名插槽解决组件内容传递问题.md#v-slot具名插槽)

### 08作用域插槽
[./drafts/0208作用域插槽.md](./drafts/0208作用域插槽.md)

### 09动态组件和异步组件
[./drafts/0209动态组件和异步组件.md](./drafts/0209动态组件和异步组件.md)

- [动态组件](./drafts/0209动态组件和异步组件.md#动态组件)
  - [component :is](./drafts/0209动态组件和异步组件.md#component-is)
  - [缓存keep-alive](./drafts/0209动态组件和异步组件.md#缓存keep-alive)
- [异步组件](./drafts/0209动态组件和异步组件.md#异步组件)

### 10v-once、ref和provide/inject
[./drafts/0210v-once、ref和provide.md](./drafts/0210v-once、ref和provide.md)

- [v-once](./drafts/0210v-once、ref和provide.md#v-once)
- [ref](./drafts/0210v-once、ref和provide.md#ref)
- [provide / inject](./drafts/0210v-once、ref和provide.md#provide-inject)

## 03Vue中的动画
### 01使用 Vue 实现基础的 CSS 过渡与动画效果
[./drafts/0301使用Vue实现基础的CSS过渡与动画效果.md](./drafts/0301使用Vue实现基础的CSS过渡与动画效果.md)

- [动画](./drafts/0301使用Vue实现基础的CSS过渡与动画效果.md#动画)
- [过渡](./drafts/0301使用Vue实现基础的CSS过渡与动画效果.md#过渡)

### 02使用transition标签实现单元素组件的过渡和动画效果
[./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md)

- [v-enter-from与v-enter-active以及v-enter-to等](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md#v-enter-from与v-enter-active以及v-enter-to等)
- [动画](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md#动画)
- [给transition定义name](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md#给transition定义name)
- [动画与过渡结合type="transition"](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md#动画与过渡结合typetransition)
- [duration="1000"](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md#duration1000)
- [js做动画](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md#js做动画)
  - [@enter等勾子](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md#enter等勾子)
  - [done()](./drafts/0302使用transition标签实现单元素组件的过渡和动画效果.md#done)

### 03组件和元素切换动画的实现
[./drafts/0303组件和元素切换动画的实现.md](./drafts/0303组件和元素切换动画的实现.md)

- [多个单元素标签之间的切换](./drafts/0303组件和元素切换动画的实现.md#多个单元素标签之间的切换)
  - [mode="in-out"](./drafts/0303组件和元素切换动画的实现.md#modein-out)
  - [appear](./drafts/0303组件和元素切换动画的实现.md#appear)
- [多个单组件之间的切换](./drafts/0303组件和元素切换动画的实现.md#多个单组件之间的切换)
  - [:is动态组件](./drafts/0303组件和元素切换动画的实现.md#is动态组件)

### 04列表动画
[./drafts/0304列表动画.md](./drafts/0304列表动画.md)

- [transition-group](./drafts/0304列表动画.md#transition-group)
- [v-move](./drafts/0304列表动画.md#v-move)

### 05状态动画
[./drafts/0305状态动画.md](./drafts/0305状态动画.md)

## 04高级语法
### 01Mixin混入的基础语法
[./drafts/0401Mixin混入的基础语法.md](./drafts/0401Mixin混入的基础语法.md)

- [混入优先级](./drafts/0401Mixin混入的基础语法.md#混入优先级)
- [Mixin作用域](./drafts/0401Mixin混入的基础语法.md#mixin作用域)
- [全局Mixin](./drafts/0401Mixin混入的基础语法.md#全局mixin)
- [自定义属性](./drafts/0401Mixin混入的基础语法.md#自定义属性)
  - [修改优先级](./drafts/0401Mixin混入的基础语法.md#修改优先级)

### 02开发实现Vue中的自定义指令
[./drafts/0402开发实现Vue中的自定义指令.md](./drafts/0402开发实现Vue中的自定义指令.md)
- [自定义指令directive](./drafts/0402开发实现Vue中的自定义指令.md#自定义指令directive)
  - [局部指令](./drafts/0402开发实现Vue中的自定义指令.md#局部指令)
  - [其他生命周期函数](./drafts/0402开发实现Vue中的自定义指令.md#其他生命周期函数)
- [例子：pos指令](./drafts/0402开发实现Vue中的自定义指令.md#例子pos指令)
  - [传入参数](./drafts/0402开发实现Vue中的自定义指令.md#传入参数)
  - [mounted()和updated()简写](./drafts/0402开发实现Vue中的自定义指令.md#mounted和updated简写)
  - [binding.arg](./drafts/0402开发实现Vue中的自定义指令.md#bindingarg)

### 03Teleport传送门
Vue3 新特性。

[./drafts/0403Teleport传送门.md](./drafts/0403Teleport传送门.md)

- [需求：做个蒙层](./drafts/0403Teleport传送门.md#需求做个蒙层)
- [传送门Teleport](./drafts/0403Teleport传送门.md#传送门teleport)

### 04更加底层的render函数
[./drafts/0403Teleport传送门.md](./drafts/0403Teleport传送门.md)

- [希望h1/h2/h3受到标签控制](./drafts/0403Teleport传送门.md#希望h1h2h3受到标签控制)
- [反例：用v-if](./drafts/0403Teleport传送门.md#反例用v-if)
- [用render不用template](./drafts/0403Teleport传送门.md#用render不用template)
- [虚拟DOM](./drafts/0403Teleport传送门.md#虚拟dom)

### 05插件的定义和使用
[./drafts/0405插件的定义和使用.md](./drafts/0405插件的定义和使用.md)

- [plugin插件](./drafts/0405插件的定义和使用.md#plugin插件)
- [得到app实例，可以做很多扩展](./drafts/0405插件的定义和使用.md#得到app实例可以做很多扩展)
  - [globalProperties](./drafts/0405插件的定义和使用.md#globalproperties)

### 06数据校验插件开发实例
[./drafts/0406数据校验插件开发实例.md](./drafts/0406数据校验插件开发实例.md)

- [校验数据](./drafts/0406数据校验插件开发实例.md#校验数据)
- [用mixin](./drafts/0406数据校验插件开发实例.md#用mixin)
- [用plugin](./drafts/0406数据校验插件开发实例.md#用plugin)

### 07异步好帮手：Suspense
[./drafts/0407异步好帮手：Suspense.md](./drafts/0407异步好帮手：Suspense.md)

- [Suspense](./drafts/0407异步好帮手：Suspense.md#suspense)
- [Suspense使用实例](./drafts/0407异步好帮手：Suspense.md#suspense使用实例)
- [Suspense使用实例（async）](./drafts/0407异步好帮手：Suspense.md#suspense使用实例async)
- [OnErrorCaptured](./drafts/0407异步好帮手：Suspense.md#onerrorcaptured)

### 08Vue3的全局API
[./drafts/0408Vue3的全局API.md](./drafts/0408Vue3的全局API.md)

- [Vue2全局API遇到的问题](./drafts/0408Vue3的全局API.md#vue2全局api遇到的问题)
- [Vue2与Vue3对比](./drafts/0408Vue3的全局API.md#vue2与vue3对比)

## 05Composition API

### 01Setup函数的使用
[./drafts/0501Setup函数的使用.md](./drafts/0501Setup函数的使用.md)

- [为什么会有CompositionAPI](./drafts/0501Setup函数的使用.md#为什么会有compositionapi)
- [setup](./drafts/0501Setup函数的使用.md#setup)

### 02ref，reactive响应式引用的用法和原理
[./drafts/0502ref，reactive响应式引用的用法和原理.md](./drafts/0502ref，reactive响应式引用的用法和原理.md)

- [非响应式数据](./drafts/0502ref，reactive响应式引用的用法和原理.md#非响应式数据)
- [响应式的引用](./drafts/0502ref，reactive响应式引用的用法和原理.md#响应式的引用)
  - [基础类型数据ref](./drafts/0502ref，reactive响应式引用的用法和原理.md#基础类型数据ref)
  - [坑：不用name.value用name](./drafts/0502ref，reactive响应式引用的用法和原理.md#坑不用namevalue用name)
  - [非基础类型数据reactive](./drafts/0502ref，reactive响应式引用的用法和原理.md#非基础类型数据reactive)
  - [只读readonly](./drafts/0502ref，reactive响应式引用的用法和原理.md#只读readonly)
  - [解构toRefs](./drafts/0502ref，reactive响应式引用的用法和原理.md#解构torefs)
- [响应式应用（TypeScript）](./drafts/0502ref，reactive响应式引用的用法和原理.md#响应式应用typescript)
  - [在reactive中指定类型](./drafts/0502ref，reactive响应式引用的用法和原理.md#在reactive中指定类型)
  - [用...data展开对象在套用toRefs](./drafts/0502ref，reactive响应式引用的用法和原理.md#用data展开对象在套用torefs)

### 03toRef以及context参数
[./drafts/0503toRef以及context参数.md](./drafts/0503toRef以及context参数.md)

- [没存在于响应式对象里](./drafts/0503toRef以及context参数.md#没存在于响应式对象里)
  - [toRef](./drafts/0503toRef以及context参数.md#toref)
- [context参数意义](./drafts/0503toRef以及context参数.md#context参数意义)
  - [attrs是父组件的Non-Props](./drafts/0503toRef以及context参数.md#attrs是父组件的non-props)
  - [slots是插槽](./drafts/0503toRef以及context参数.md#slots是插槽)
  - [emit](./drafts/0503toRef以及context参数.md#emit)

### 04实例：用Composition-API开发to-do-list
把数据和数据操作摘出来，封装成小的函数，并不完全放在 setup 里。

[./drafts/0504实例：用Composition-API开发to-do-list.md](./drafts/0504实例：用Composition-API开发to-do-list.md)

### 05computed方法生成计算属性
[./drafts/0505computed方法生成计算属性.md](./drafts/0505computed方法生成计算属性.md)

- [computed](./drafts/0505computed方法生成计算属性.md#computed)
- [set和get方法](./drafts/0505computed方法生成计算属性.md#set和get方法)
  - [set的param](./drafts/0505computed方法生成计算属性.md#set的param)
  - [实例：一个对象](./drafts/0505computed方法生成计算属性.md#实例一个对象)

### 06watch以及其与watchEffect的差异性
[./drafts/0506watch以及其与watchEffect的差异性.md](./drafts/0506watch以及其与watchEffect的差异性.md)

- [watch](./drafts/0506watch以及其与watchEffect的差异性.md#watch)
  - [具备一定lazy惰性属性](./drafts/0506watch以及其与watchEffect的差异性.md#具备一定lazy惰性属性)
  - [参数可以拿到原始和当前值](./drafts/0506watch以及其与watchEffect的差异性.md#参数可以拿到原始和当前值)
  - [watch可以接收一组数组](./drafts/0506watch以及其与watchEffect的差异性.md#watch可以接收一组数组)
- [watchEffect](./drafts/0506watch以及其与watchEffect的差异性.md#watcheffect)
  - [立即执行，没有惰性immediate](./drafts/0506watch以及其与watchEffect的差异性.md#立即执行没有惰性immediate)
  - [不需要传递侦听的内容](./drafts/0506watch以及其与watchEffect的差异性.md#不需要传递侦听的内容)
  - [watchEffect不能获取数据之前的值](./drafts/0506watch以及其与watchEffect的差异性.md#watcheffect不能获取数据之前的值)
- [取消侦听器](./drafts/0506watch以及其与watchEffect的差异性.md#取消侦听器)
  - [有没有办法把watch变为非惰性?immediate: true](./drafts/0506watch以及其与watchEffect的差异性.md#有没有办法把watch变为非惰性immediate-true)

### 07生命周期函数的新写法
[./drafts/0507生命周期函数的新写法.md](./drafts/0507生命周期函数的新写法.md)

- [onBeforeMount](./drafts/0507生命周期函数的新写法.md#onbeforemount)
- [其他生命周期函数](./drafts/0507生命周期函数的新写法.md#其他生命周期函数)
- [beforeCreate和created不能用](./drafts/0507生命周期函数的新写法.md#beforecreate和created不能用)
- [onRenderTracked](./drafts/0507生命周期函数的新写法.md#onrendertracked)
- [onRenderTriggered](./drafts/0507生命周期函数的新写法.md#onrendertriggered)

### 08Provide、Inject、模板ref用法
[./drafts/0508Provide、Inject、模板ref用法.md](./drafts/0508Provide、Inject、模板ref用法.md)

- [provide和inject](./drafts/0508Provide、Inject、模板ref用法.md#provide和inject)
  - [更好地应用单向数据流](./drafts/0508Provide、Inject、模板ref用法.md#更好地应用单向数据流)
  - [应用readonly更加安全](./drafts/0508Provide、Inject、模板ref用法.md#应用readonly更加安全)
- [模板ref用法](./drafts/0508Provide、Inject、模板ref用法.md#模板ref用法)

### 09vue3的proxy
[./drafts/0509vue3的proxy.md](./drafts/0509vue3的proxy.md)

- [vue3使用proxy](./drafts/0509vue3的proxy.md#vue3使用proxy)

### 10将逻辑抽离出来
[./drafts/0510将逻辑抽离出来.md](./drafts/0510将逻辑抽离出来.md)

- [以封装鼠标事件为例](./drafts/0510将逻辑抽离出来.md#以封装鼠标事件为例)
- [以封装axios为例](./drafts/0510将逻辑抽离出来.md#以封装axios为例)

### 11typescript对vue3的加持
[./drafts/0511typescript对vue3的加持.md](./drafts/0511typescript对vue3的加持.md)

## 06Vue项目开发配套工具讲解

### 01VueCli的使用和单文件组件
[./drafts/0601VueCli的使用和单文件组件.md](./drafts/0601VueCli的使用和单文件组件.md)

- [下载nodejs](./drafts/0601VueCli的使用和单文件组件.md#下载nodejs)
  - [安装nrm](./drafts/0601VueCli的使用和单文件组件.md#安装nrm)
  - [确认没有安装老版本cli](./drafts/0601VueCli的使用和单文件组件.md#确认没有安装老版本cli)
  - [安装4.5.9](./drafts/0601VueCli的使用和单文件组件.md#安装459)
- [创建项目](./drafts/0601VueCli的使用和单文件组件.md#创建项目)
  - [vue create](./drafts/0601VueCli的使用和单文件组件.md#vue-create)
  - [npm install](./drafts/0601VueCli的使用和单文件组件.md#npm-install)
- [实例：to-do-list](./drafts/0601VueCli的使用和单文件组件.md#实例to-do-list)

### 02Vue-Router路由的理解和使用
[./drafts/0602Vue-Router路由的理解和使用.md](./drafts/0602Vue-Router路由的理解和使用.md)
- [创建项目时，记得选择路由Router](./drafts/0602Vue-Router路由的理解和使用.md#创建项目时记得选择路由router)
- [main.js多了路由插件](./drafts/0602Vue-Router路由的理解和使用.md#mainjs多了路由插件)
- [router-link](./drafts/0602Vue-Router路由的理解和使用.md#router-link)
- [router-view](./drafts/0602Vue-Router路由的理解和使用.md#router-view)
- [懒加载](./drafts/0602Vue-Router路由的理解和使用.md#router-view#懒加载)

### 03VueX的语法详解
[./drafts/0603VueX的语法详解.md](./drafts/0603VueX的语法详解.md)

- [创建工程时选择VueX](./drafts/0603VueX的语法详解.md#创建工程时选择vuex)
- [VueX提供了`./store`](./drafts/0603VueX的语法详解.md#vuex提供了store)
- [VueX数据管理框架](./drafts/0603VueX的语法详解.md#vuex数据管理框架)
- [如何在组件里获取](./drafts/0603VueX的语法详解.md#如何在组件里获取)
- [如何修改数据](./drafts/0603VueX的语法详解.md#如何修改数据)
- [异步情况](./drafts/0603VueX的语法详解.md#异步情况)
  - [mutation只能写同步，不能写异步](./drafts/0603VueX的语法详解.md#mutation只能写同步不能写./drafts/0603VueX的语法详解.md异步)
- [CompositionAPI中如何使用VueX](./drafts/0603VueX的语法详解.md#compositionapi中如何使用vuex)

### 04使用axios发送ajax请求
[./drafts/0604使用axios发送ajax请求.md](./drafts/0604使用axios发送ajax请求.md)

## 07以实战项目为例
### 01京东到家
[./drafts/0701京东到家.md](./drafts/0701京东到家.md)

- [项目设计](./drafts/0701京东到家.md#项目设计)
- [项目初始化](./drafts/0701京东到家.md#项目初始化)
- [基础样式](./drafts/0701京东到家.md#基础样式)
  - [normalize.css](./drafts/0701京东到家.md#normalizecss)
  - [设置 rem](./drafts/0701京东到家.md#设置-rem)
- [开发布局](./drafts/0701京东到家.md#开发布局)
  - [BEM的CSS命名规则](./drafts/0701京东到家.md#bem的css命名规则)
  - [iconfont](./drafts/0701京东到家.md#iconfont)
  - [浏览器最小显示12px，所以用transform](./drafts/0701京东到家.md#浏览器最小显示12px所以用transform)
  - [css优先级](./drafts/0701京东到家.md#css优先级)
  - [防止网速慢造成抖动](./drafts/0701京东到家.md#防止网速慢造成抖动)
- [首页组件的合理拆分](./drafts/0701京东到家.md#首页组件的合理拆分)
  - [拆分成多个组件](./drafts/0701京东到家.md#拆分成多个组件)
  - [用v-for, v-html精简页面](./drafts/0701京东到家.md#用v-for-v-html精简页面)
  - [使用scoped约束css作用域](./drafts/0701京东到家.md#使用scoped约束css作用域)
  - [为什么要在组件里写name？Chrome的vue-devtools](./drafts/0701京东到家.md#为什么要在组件里写namechrome的vue-devtools)
- [路由守卫（登录了才跳转首页）](./drafts/0701京东到家.md#路由守卫登录了才跳转首页)
  - [router的beforeEnter和beforeEach(to, from, next)](./drafts/0701京东到家.md#router的beforeenter和beforeeachto-from-next)
  - [Chrome::Application::LocalStorage](./drafts/0701京东到家.md#chromeapplicationlocalstorage)
- [使用axios发送登录Mock请求](./drafts/0701京东到家.md#使用axios发送登录mock请求)
  - [npm install axios --save](./drafts/0701京东到家.md#npm-install-axios-save)
  - [在utils/request.js中封装](./drafts/0701京东到家.md#在utilsrequestjs中封装)
  - [js中oc语法?.](./drafts/0701京东到家.md#js中oc语法)
- [setup与代码拆分逻辑性、可维护性性](./drafts/0701京东到家.md#setup与代码拆分逻辑性-可维护性性)
  - [关于Toast的代码被分散在了Login.vue各处](./drafts/0701京东到家.md#关于toast的代码被分散在了loginvue各处)
  - [setup的职责就是核心逻辑](./drafts/0701京东到家.md#setup的职责就是核心逻辑)
- [将下列路由改为动态路由](./drafts/0701京东到家.md#将下列路由改为动态路由)
- [路由参数的传递](./drafts/0701京东到家.md#路由参数的传递)
- [裂图的隐藏](./drafts/0701京东到家.md#裂图的隐藏)
- [watchEffect的妙用：监听变化自动发送请求](./drafts/0701京东到家.md#watcheffect的妙用监听变化自动发送请求)
- [购物车数据用VueX](./drafts/0701京东到家.md#购物车数据用vuex)
  - [用LocalStorage做持久存储（切换页面不丢失）](./drafts/0701京东到家.md#用localstorage做持久存储切换页面不丢失)
- [路由包裹后，去掉下划线（修改a标签）](./drafts/0701京东到家.md#路由包裹后去掉下划线修改a标签)
- [代码上线](./drafts/0701京东到家.md#代码上线)
- [课程收获](./drafts/0701京东到家.md#课程收获)
  - [让我前端工程入门](./drafts/0701京东到家.md#让我前端工程入门)
  - [还需要巩固的知识](./drafts/0701京东到家.md#还需要巩固的知识)
  - [前端的下一步学习计划](./drafts/0701京东到家.md#前端的下一步学习计划)

### 02（知乎）者也
[./drafts/0702（知乎）者也.md](./drafts/0702（知乎）者也.md)