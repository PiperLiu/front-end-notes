# HTTP协议基础及发展历史

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [HTTP协议基础及发展历史](#http协议基础及发展历史)
    - [5层网络模型介绍](#5层网络模型介绍)
      - [低三层](#低三层)
      - [传输层](#传输层)
      - [应用层](#应用层)
    - [HTTP发展历史](#http发展历史)
      - [HTTP/0.9](#http09)
      - [HTTP/1.0](#http10)
      - [HTTP/1.1](#http11)
      - [HTTP/2](#http2)
    - [三次握手](#三次握手)
      - [使用WireShark抓包](#使用wireshark抓包)
    - [URI-URL和URN](#uri-url和urn)
      - [URI统一资源标志符](#uri统一资源标志符)
      - [URL统一资源定位器](#url统一资源定位器)
      - [URN永久统一资源定位符](#urn永久统一资源定位符)
    - [HTTP报文格式](#http报文格式)
      - [HTTP方法](#http方法)
      - [HTTP CODE](#http-code)
    - [创建一个最简单的web服务](#创建一个最简单的web服务)

<!-- /code_chunk_output -->

### 5层网络模型介绍

![](./images/20210429五层模型.png)

可以把网络模型拆为五层理解。（在经典的Open System Interconnection Reference Model，OSI模型中，应用层被抽象为3层）

#### 低三层
因为我们做 web 服务，所以基本可以很少了解。

- 物理层：定义物理设备如何传输数据
- 数据链路层：在通信实体间建立数据链路的连接（`01010100 11010101`）
- 网络层：为数据在结点之间传输创建逻辑链路

#### 传输层

- 向用户提供可靠的端到端服务（End-to-End）
- 传输层向高层**屏蔽了下层数据通信的细节**

更多情况下，我们使用 TCP 协议。

#### 应用层
- 为应用软件提供了很多服务
- 构建于TCP协议之上
- 屏蔽网络传输相关细节

### HTTP发展历史
#### HTTP/0.9
- 只有一个命令GET
- 没有HEADER等描述数据的信息
- 服务器发送完毕，就关闭TCP连接

#### HTTP/1.0
- 增加了很多命令（POST等）
- 增加了 status code 和 header
- 多字符集支持、多部分发送、权限、缓存等

#### HTTP/1.1
- 持久连接
- pipeline
- 增加host和其他一些命令

#### HTTP/2
- 所有数据以二进制传输
- 同一个连接里发送多个请求不再需要按照顺序来
- 头信息压缩以及推送等提高效率的功能

### 三次握手
**HTTP不存在`连接`这个概念，只有`请求`和`响应`两个概念。**

请求和响应都是数据包，数据包的通道是 TCP 传输层搞的。

HTTP/1.1是持久连接的，请求后，并不会导致 TCP connection 关闭。

![](./images/20210429三次握手.png)

参考[百度百科](https://baike.baidu.com/item/%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B/5111559?fr=aladdin)：
- 为了建立连接TCP连接，通信双方必须从对方了解如下信息：
  - 1、对方报文发送的开始序号。
  - 2、对方发送数据的缓冲区大小。
  - 3、能被接收的最大报文段长度MSS。
  - 4、被支持的TCP选项。
- 握手过程：
  - 第一次握手：建立连接时，客户端发送syn包（seq=j）到服务器，并进入SYN_SENT状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers）。
  - 第二次握手：服务器收到syn包，必须确认客户端的SYN（ack=j+1），同时自己也发送一个SYN包（seq=k），即SYN+ACK包，此时服务器进入SYN_RECV状态。
  - 第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。

#### 使用WireShark抓包
![](./images/20210429WireShark.png)

如上，三个蓝色的方块圈起的发包是三次握手。

### URI-URL和URN
#### URI统一资源标志符
参考[百度百科](https://baike.baidu.com/item/URI/2901761?fr=aladdin)：

在电脑术语中，统一资源标识符（Uniform Resource Identifier，URI)是一个用于标识某一互联网资源名称的字符串。 该种标识允许用户对任何（包括本地和互联网）的资源通过特定的协议进行交互操作。URI由包括确定语法和相关协议的方案所定义。

Web上可用的每种资源 -HTML文档、图像、视频片段、程序等 - 由一个通用资源标识符（Uniform Resource Identifier, 简称"URI"）进行定位。

- 用来表示互联网上唯一资源
- 包含 URL 和 URN

#### URL统一资源定位器
参考[百度百科](https://baike.baidu.com/item/URL%E6%A0%BC%E5%BC%8F/10056474?fr=aladdin)：

在WWW上，每一信息资源都有统一的且在网上唯一的地址，该地址就叫URL（Uniform Resource Locator,统一资源定位器），它是WWW的统一资源定位标志，就是指网络地址。

比如：
```
http://user:pass@host.com:80/path?query=string#hash
```

如上：
- `http://`还可以是比如`ftp://`
- `user:pass`是用户认证，但这种认真方式基本用不到
- `host.com`域名或者服务器地址，找到服务器在互联网的位置
- `80`端口，定位物理服务器的某一个web服务器
- `/path`路由（与linux文件系统写法一致），但是现在数据大多来自请求数据库，而非访问磁盘
- `query-string`搜索参数
- `#hash`哈希，如果文档很大，我们进入文档某个片段（现在前端经常把哈希作为锚点）

此类格式都叫做URL，比如`ftp`协议。

#### URN永久统一资源定位符
参考[百度百科](https://baike.baidu.com/item/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%90%8D%E7%A7%B0?fromtitle=URN&fromid=2901667)：

统一资源名（URN，Uniform Resource Name）是带有名字的因特网资源。

统一资源名称（URN）是统一资源标识（URI）的历史名字，它使用urn:作为URI scheme。

目前业界没有什么好的解决方案或者应用场景。

### HTTP报文格式
![](./images/20210429报文.png)

如上，报文都有：
- 起始行
- 首部 header
- 主体（响应报文）

如上只是协议，我们实现时可以不按照这个实现，只不过这可能导致不知情的人做了一个他认为安全实际上不安全的操作。

接着分析上文的报文：
- 请求报文
  - `GET 路由 协议版本`
  - header 描述了想要的数据
- 响应报文
  - `协议版本 code code的明文含义`

#### HTTP方法
- 用来定义对于资源的操作
- 常用的有GET、POST等

#### HTTP CODE
- 定义服务器对请求处理结果
- 各个区间的CODE有各自的语义
- 好的HTTP服务可以通过CODE判断结果

### 创建一个最简单的web服务
主要用nodejs。

程序见 [../codes/server.js](../codes/server.js) 。

命令行用的 git bash 。

```js
const http = require('http')

http.createServer(function (request, response) {
  // 来请求
  console.log('request come', request.url)
  // 请求结束返回给请求
  response.end('123')
}).listen(8888)  // 监听端口

console.log('server listening on 8888')
```