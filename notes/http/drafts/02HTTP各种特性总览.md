# HTTP各种特性总览

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [HTTP各种特性总览](#http各种特性总览)
    - [使用浏览器查看 http 请求（从HTTP客户端角度）](#使用浏览器查看-http-请求从http客户端角度)
    - [CORS跨域请求的限制与解决](#cors跨域请求的限制与解决)
      - [用浏览器的script的src](#用浏览器的script的src)
      - [JSONP](#jsonp)
    - [CORS预请求](#cors预请求)
      - [跨域时默认允许的方法只有GET HEAD POST](#跨域时默认允许的方法只有get-head-post)
      - [默认允许的Content-Type只有三个](#默认允许的content-type只有三个)
      - [官方文档：fetch.spec.whatwg.org](#官方文档fetchspecwhatwgorg)
      - [设置Access-Control-Allow-?](#设置access-control-allow-)

<!-- /code_chunk_output -->

### 使用浏览器查看 http 请求（从HTTP客户端角度）

![](./images/20210510http浏览器.png)

浏览器不但发送和接收了 http 请求（作为http客户端），还帮助处理了相关代码。

上图 Response 里是请求返回的内容，就是 `html` 内容。

```bash
$ curl baidu.com
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    81  100    81    0     0    920      0 --:--:-- --:--:-- --:--:--   920<html>
<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">
</html>
```

如上，我们请求 `baidu.com` ，就返回了一个 `<html><meta ...><html>`；这个 `<meta>` 告诉浏览器（浏览器解析内容时识别了`<meta>`），你给我刷新，并且重定向到 `http://www.baidu.com/` 。

如果我们 `curl http://www.baidu.com/` ，则会是一堆 `html` 等相关内容（浏览器可以据此渲染、请求依赖文件）。

### CORS跨域请求的限制与解决
模拟跨域场景，我们启动两个服务，如 [../codes/跨域/server8888](../codes/跨域/server8888) 和 [../codes/跨域/server8887](../codes/跨域/server8887) 。

```js
const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  // 注意默认读取二进制的数，要设置 utf8
  const html = fs.readFileSync('test.html', 'utf8')
  response.witreHead(200, {
    // 如果写成 text/plain ，则浏览器当成字符，不解析 html
    'Content-Type': 'text/html'
  })
  response.end(html)

}).listen(8888)

console.log('server listening on 8888')
```

如果 'Content-Type' 写成 'text/plain' ，则浏览器当成字符，不解析 html 。

![](./images/20210511头.png)

我们考虑一种情况，用 nodejs 跑 8888 服务，然后在 8888 的 `html` 里去请求 8887 。
```js
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://127.0.0.1:8887/')
  xhr.send()
```

浏览器将报错：`Access to XMLHttpRequest at 'http://127.0.0.1:8887/' from origin 'http://127.0.0.1:8888' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`因为我们服务端8887没有允许被跨域访问。

（这里注意：要同时打开 8887 和 8888 两个服务，后者提供 html 给客户端，客户端根据 html 的指令访问前者。）

咱们把8887端口的http头改一下：
```js
response.writeHead(200, {
  'Access-Control-Allow-Origin': '*'
})
response.end('123')
```

![](../codes/跨域/server8887)

则如上，则可以请求到 8887 改一下。且收到了回复（Response）123。

要注意，即便没有设置头`'Access-Control-Allow-Origin': '*'`，我们8887的命令行也会打印 `request come /` ，这说明我们的服务端是对浏览器的请求做了回复的，只不过浏览器没有看到浏览器觉得回复头里 `'Access-Control-Allow-Origin'` 不合规定，于是帮我们拦截掉了请求，并且在浏览器控制台报错。

因此，跨域是浏览器有的限制。浏览器需要服务器同域的内容。

#### 用浏览器的script的src
我们把 8887 改回来：
```js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  response.end('123')

}).listen(8887)

console.log('server listening on 8887')
```

然后我们的 html 请求方式改一下：
```html
<!-- <script>
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://127.0.0.1:8887/')
  xhr.send()
</script> -->
<script src="http://127.0.0.1:8887/"></script>
```

再用 html 访问 8887 则不报错，且 network 中可以收到 8887 来的 123。

浏览器允许 link 、 script 标签等跨域访问。

#### JSONP
> 来源：https://www.runoob.com/json/json-jsonp.html

本章节我们将向大家介绍 JSONP 的知识。

Jsonp(JSON with Padding) 是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。

为什么我们从不同的域（网站）访问数据需要一个特殊的技术( JSONP )呢？这是因为同源策略。

同源策略，它是由 Netscape 提出的一个著名的安全策略，现在所有支持 JavaScript 的浏览器都会使用这个策略。（应该就是不允许跨域）

如果没有跨域限制，那么8888就能通过它发给我们的html里的script肆意访问8887的数据了。

具体参考：为什么浏览器要限制跨域访问? - 林一二的回答 - 知乎 https://www.zhihu.com/question/26379635/answer/534866558

jsonp是一个好的解决方案，参考 https://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html ：
- 1、一个众所周知的问题，Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准；
- 2、不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如`<script>、<img>、<iframe>`）；
- 3、于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理；
- 4、恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；
- 5、这样子解决方案就呼之欲出了，web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。
- 6、客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。
- 7、为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

### CORS预请求

现在我们获取 [../codes/跨域/server9999](../codes/跨域/server9999) 发来的 html（[../codes/跨域/test2.html](../codes/跨域/test2.html)），里面的请求是：
```js
  fetch('http://localhost:9998', {
    method: 'POST',
    headers: {
      'X-Test-Cors': '123'
    }
  })
```

9998 运行被跨域访问：`'Access-Control-Allow-Origin': '*'`

则浏览器也会报错：`Access to fetch at 'http://localhost:9998/' from origin 'http://127.0.0.1:9999' has been blocked by CORS policy: Request header field x-test-cors is not allowed by Access-Control-Allow-Headers in preflight response.`

什么意思？**我们自定义的头x-test-cors在跨域中不被允许。**

#### 跨域时默认允许的方法只有GET HEAD POST

其他方法，浏览器要有预请求去验证。

#### 默认允许的Content-Type只有三个
- text/plain
- multipart/form-data
- application/x-www-form-urlencoded

这三种是浏览器 form 表单可以设置的三种类型。

其他Content-Type也需要预请求去限制。

#### 官方文档：fetch.spec.whatwg.org

可以去这里看允许的请求头：
- https://fetch.spec.whatwg.org/#cors-safelisted-request-header

#### 设置Access-Control-Allow-?

我们可以设置被访问的客户端 9998 ：
```js
http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE'
  })
  response.end('123')

}).listen(9998)
```

如上，我们分别允许自定义头 `'X-Test-Cors'` 以及方法 `'POST, PUT, DELETE'` 对 9998 的访问。

![](./images/20210511预请求.png)

注意到我们在 fetch 前，多了一个请求，这个是预请求。

如果我们设置：`'Access-Control-Max-Age': '1000'`，则代表1000内有一次预请求就不需要再有预请求了。所以，当我们第二次访问呢 9998 时，确实没有预请求了。