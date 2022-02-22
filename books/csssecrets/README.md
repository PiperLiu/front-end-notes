# LeaVerou. (2016). CSS揭秘. 人民邮电出版社.（CSS魔法译）

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [关于 CSS 的浏览器支持与回退](#关于-css-的浏览器支持与回退)
- [Web 标准与 CSS 编码技巧](#web-标准与-css-编码技巧)
- [第2章：背景与边框](#第2章背景与边框)
- [第3章：形状](#第3章形状)
- [第4章：视觉效果](#第4章视觉效果)
- [第5章：字体排印](#第5章字体排印)
- [第6章：用户体验](#第6章用户体验)

<!-- /code_chunk_output -->

### 关于 CSS 的浏览器支持与回退

[./drafts/01webviewer.md](./drafts/01webviewer.md)

- [提供浏览器兼容的网站](./drafts/01webviewer.md#提供浏览器兼容的网站)
- [层叠机制来支持较早的浏览器](./drafts/01webviewer.md#层叠机制来支持较早的浏览器)
- [Modernizr设置辅助类来分别编写样式](./drafts/01webviewer.md#modernizr设置辅助类来分别编写样式)
- [使用 @supports 规则回退](./drafts/01webviewer.md#使用-supports-规则回退)
- [简短的 JavaScript 代码实现回退](./drafts/01webviewer.md#简短的-javascript-代码实现回退)

### Web 标准与 CSS 编码技巧

[./drafts/02css.md](./drafts/02css.md)

- [Web标准杂记](./drafts/02css.md#web标准杂记)
- [尽量减少代码重复（字号决定大小）](./drafts/02css.md#尽量减少代码重复字号决定大小)
- [使用HSLA而非RGBA](./drafts/02css.md#使用hsla而非rgba)
- [继承inherit](./drafts/02css.md#继承inherit)
- [关于响应式网页设计](./drafts/02css.md#关于响应式网页设计)
- [CSS变量是动态的](./drafts/02css.md#css变量是动态的)

### 第2章：背景与边框

[./drafts/03background.md](./drafts/03background.md)

- [盒模型](./drafts/03background.md#盒模型)
- [强大的条纹背景：基于线性渐变](./drafts/03background.md#强大的条纹背景基于线性渐变)
  - [重复的条纹？垂直/斜向的条纹？](./drafts/03background.md#重复的条纹垂直斜向的条纹)
- [基于复杂拼接的条纹](./drafts/03background.md#基于复杂拼接的条纹)
  - [令人惊奇的 CSS3 Patterns Gallery](./drafts/03background.md#令人惊奇的-css3-patterns-gallery)
  - [计算 CSS 体积 bytesizenatters.com](./drafts/03background.md#计算-css-体积-bytesizenatterscom)
  - [网格、波点、棋盘](./drafts/03background.md#网格-波点-棋盘)
- [连续的图像边框](./drafts/03background.md#连续的图像边框)
  - [基于不同的 box](./drafts/03background.md#基于不同的-box)
  - [老式信封、蚂蚁行军边框、脚注](./drafts/03background.md#老式信封-蚂蚁行军边框-脚注)

### 第3章：形状

[./drafts/04shape.md](./drafts/04shape.md)

- [椭圆与 border-radius](./drafts/04shape.md#椭圆与-border-radius)
  - [自适应椭圆](./drafts/04shape.md#自适应椭圆)
  - [使用斜杠范例以及半椭圆](./drafts/04shape.md#使用斜杠范例以及半椭圆)
- [平行四边形](./drafts/04shape.md#平行四边形)
  - [transform中的skew](./drafts/04shape.md#transform中的skew)
  - [菱形图片与clip-path](./drafts/04shape.md#菱形图片与clip-path)
  - [切角效果](./drafts/04shape.md#切角效果)
  - [梯形标签页与简单的饼图](./drafts/04shape.md#梯形标签页与简单的饼图)

### 第4章：视觉效果

[./drafts/05shadow.md](./drafts/05shadow.md)

- [单双侧投影 box-shadow](./drafts/05shadow.md#单双侧投影-box-shadow)
  - [box-shadow 意味着什么？](./drafts/05shadow.md#box-shadow-意味着什么)
  - [单双侧投影技巧](./drafts/05shadow.md#单双侧投影技巧)
- [不规则投影与 filter 中的 drop-shadow](./drafts/05shadow.md#不规则投影与-filter-中的-drop-shadow)
- [染色效果与 filter 技巧以及混合模式 mix-blend-mode 和 background-blend-mode](./drafts/05shadow.md#染色效果与-filter-技巧以及混合模式-mix-blend-mode-和-background-blend-mode)
- [毛玻璃效果与 blur](./drafts/05shadow.md#毛玻璃效果与-blur)
- [基于背景条纹或者伪元素的折角效果](./drafts/05shadow.md#基于背景条纹或者伪元素的折角效果)

### 第5章：字体排印

[./drafts/06fonts.md](./drafts/06fonts.md)

- [连字符断行 hyphens](./drafts/06fonts.md#连字符断行-hyphens)
- [结合伪元素与选择器插入换行](./drafts/06fonts.md#结合伪元素与选择器插入换行)
- [代码块/文本行的斑马条纹（背景渐变实现）](./drafts/06fonts.md#代码块文本行的斑马条纹背景渐变实现)
- [调整 tab 的宽度 tab-size](./drafts/06fonts.md#调整-tab-的宽度-tab-size)
- [连字解决方案（font-variant相关）](./drafts/06fonts.md#连字解决方案font-variant相关)
- [通过@font-face实现字体嵌入并设立范围](./drafts/06fonts.md#通过font-face实现字体嵌入并设立范围)
- [自定义下划线（基于背景实现虚线）](./drafts/06fonts.md#自定义下划线基于背景实现虚线)
- [一些文字特效（凸版印刷、空心字、外发光、凸起、基于SVG的环形文字）](./drafts/06fonts.md#一些文字特效凸版印刷-空心字-外发光-凸起-基于svg的环形文字)

### 第6章：用户体验

[./drafts/07userexperience.md](./drafts/07userexperience.md)

- [选用合适的鼠标光标 cursor](./drafts/07userexperience.md#选用合适的鼠标光标-cursor)
- [扩大可点击区域](./drafts/07userexperience.md#扩大可点击区域)
  - [使用 border 扩大热区 hit-area](./drafts/07userexperience.md#使用-border-扩大热区-hit-area)
  - [利用伪元素扩大热区 hit-area](./drafts/07userexperience.md#利用伪元素扩大热区-hit-area)
- [自定义复选框（使用 clip rect(0,0,0,0) 隐藏原有复选框）](./drafts/07userexperience.md#自定义复选框使用-clip-rect0000-隐藏原有复选框)
- [开关式按钮](./drafts/07userexperience.md#开关式按钮)
- [弱化背景](./drafts/07userexperience.md#弱化背景)
  - [使用 box-shadow](./drafts/07userexperience.md#使用-box-shadow)
  - [使用 dialog 标签与 backdrop 伪元素（不完全支持）](./drafts/07userexperience.md#使用-dialog-标签与-backdrop-伪元素不完全支持)
  - [模糊背景示例：给背景添加类](./drafts/07userexperience.md#模糊背景示例给背景添加类)
- [基于 backgroud-attachment 的滚动提示](./drafts/07userexperience.md#基于-backgroud-attachment-的滚动提示)
- [交互式的图片对比控件](./drafts/07userexperience.md#交互式的图片对比控件)
