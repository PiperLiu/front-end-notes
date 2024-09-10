# 第 1 章 权衡的艺术

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [1.1 命令式和声明式](#11-命令式和声明式)
- [1.2 性能与可维护性的权衡](#12-性能与可维护性的权衡)
- [1.3 虚拟 DOM 的性能到底如何](#13-虚拟-dom-的性能到底如何)
- [1.4 运行时和编译时](#14-运行时和编译时)
- [1.5 总结](#15-总结)

<!-- /code_chunk_output -->

### 1.1 命令式和声明式

命令式编程： jQuery

声明式编程： `<template @click="handleClick"> ... </template>`

### 1.2 性能与可维护性的权衡

### 1.3 虚拟 DOM 的性能到底如何

### 1.4 运行时和编译时

纯运行时：根据 Object 来 Render

纯编译时：根据 <template> 直接编译成纯 JavaScript

运行时 + 编译时：根据 <template> 编译成 Object ，再在运行时根据 Object 来 Render

### 1.5 总结
