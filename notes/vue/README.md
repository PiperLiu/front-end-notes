
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