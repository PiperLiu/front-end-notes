# 尤雨溪教你写vue 高级vue教程 源码分析 中文字幕翻译完毕

- 🔗B站连接：[https://www.bilibili.com/video/BV1d4411v7UX](https://www.bilibili.com/video/BV1d4411v7UX)
- 🔗课程练习代码：[https://github.com/zhengguorong/vue-advanced-workshop](https://github.com/zhengguorong/vue-advanced-workshop)
  - 😋我的代码在：[https://github.com/PiperLiu/vue-advanced-workshop](https://github.com/PiperLiu/vue-advanced-workshop)
  - 🖨我的作业和批注都在分支 `piper` 里 （`git checkout piper`！）
- 🔗讲义不定时更新：[https://vue-course-doc.vercel.app/](https://vue-course-doc.vercel.app/)

> vue作者，尤雨溪亲自讲解vue高级特性，包括响应系统、自定义插件、render函数、状态管理、路由、表单验证和国际化。

## 目录

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [响应性](#响应性)
- [插件编写](#插件编写)
- [渲染函数](#渲染函数)
- [状态管理](#状态管理)
- [哈希路由基础](#哈希路由基础)
- [表单验证](#表单验证)
- [国际化](#国际化)
- [一些讨论问题](#一些讨论问题)

<!-- /code_chunk_output -->

### 响应性
[./drafts/vue2017.1.md](./drafts/vue2017.1.md)

- [响应性问题](./drafts/vue2017.1.md#响应性问题)
- [getter和setter](./drafts/vue2017.1.md#getter和setter)
- [依赖跟踪（订阅发布模式）](./drafts/vue2017.1.md#依赖跟踪订阅发布模式)
- [实现迷你观察者（简易响应式案例）](./drafts/vue2017.1.md#实现迷你观察者简易响应式案例)

### 插件编写
[./drafts/vue2017.2.md](./drafts/vue2017.2.md)

- [插件简介](./drafts/vue2017.2.md#插件简介)
- [$.options属性](./drafts/vue2017.2.md#options属性)
- [编写一个插件](./drafts/vue2017.2.md#编写一个插件)

### 渲染函数
[./drafts/vue2017.3.md](./drafts/vue2017.3.md)

- [虚拟DOM](./drafts/vue2017.3.md#虚拟dom)
- [Vue的V-DOM学习资源：template-explorer](./drafts/vue2017.3.md#vue的v-dom学习资源template-explorer)
- [整合渲染函数和响应系统](./drafts/vue2017.3.md#整合渲染函数和响应系统)
- [template和jsx对比](./drafts/vue2017.3.md#template和jsx对比)
- [Render Function API](./drafts/vue2017.3.md#render-function-api)
- [动态渲染标签](./drafts/vue2017.3.md#动态渲染标签)
- [动态渲染组件](./drafts/vue2017.3.md#动态渲染组件)
- [函数组件](./drafts/vue2017.3.md#函数组件)
- [高阶函数 higher-order component](./drafts/vue2017.3.md#高阶函数-higher-order-component)

### 状态管理
[./drafts/vue2017.4.md](./drafts/vue2017.4.md)

前端以前是没有状态管理的，直到 Fackbook 提出一个叫 Flux 的概念，才有了状态管理。

- [简单的父组件通过props传递数据实例](./drafts/vue2017.4.md#简单的父组件通过props传递数据实例)
- [通过组件管理数据的实例](./drafts/vue2017.4.md#通过组件管理数据的实例)
- [通过响应式对象管理数据的实例（引出VueX）](./drafts/vue2017.4.md#通过响应式对象管理数据的实例引出vuex)
- [mutaions](./drafts/vue2017.4.md#mutaions)
- [类似Redux的functional](./drafts/vue2017.4.md#类似redux的functional)

### 哈希路由基础
[./drafts/vue2017.5.md](./drafts/vue2017.5.md)

- [基本哈希路由实现](./drafts/vue2017.5.md#基本哈希路由实现)
- [实现一个路由表](./drafts/vue2017.5.md#实现一个路由表)
- [正则表达式](./drafts/vue2017.5.md#正则表达式)
- [动态路由](./drafts/vue2017.5.md#动态路由)

### 表单验证
[./drafts/vue2017.6.md](./drafts/vue2017.6.md)

- [基于标记和基于模型](./drafts/vue2017.6.md#基于标记和基于模型)
- [表单验证实例（插件）](./drafts/vue2017.6.md#表单验证实例插件)

### 国际化
[./drafts/vue2017.7.md](./drafts/vue2017.7.md)

- [三种国际化思路](./drafts/vue2017.7.md#三种国际化思路)
- [国家化$t()实现](./drafts/vue2017.7.md#国家化t实现)

### 一些讨论问题
