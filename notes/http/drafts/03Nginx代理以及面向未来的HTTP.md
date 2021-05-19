# Nginx代理以及面向未来的HTTP

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nginx代理以及面向未来的HTTP](#nginx代理以及面向未来的http)
    - [Nginx安装和基础代理配置](#nginx安装和基础代理配置)
      - [代理我们自己的 node 服务](#代理我们自己的-node-服务)
    - [中间代理可以修改内容（http是明文传输）](#中间代理可以修改内容http是明文传输)
    - [Nginx代理配置和代理缓存的用处](#nginx代理配置和代理缓存的用处)
      - [实验测试缓存](#实验测试缓存)

<!-- /code_chunk_output -->

### Nginx安装和基础代理配置
Nginx 是个存粹的 http 代理。

我们在 [http://nginx.org/en/download.html](http://nginx.org/en/download.html) 下载 Nginx 。

在命令行直接 nginx.exe 就可以启动 nignx 。

关于 nginx ，重要的是：
- 其 http 代理功能
- 其缓存功能

#### 代理我们自己的 node 服务
```
D:.
├───conf
├───contrib
│   ├───unicode2nginx
│   └───vim
│       ├───ftdetect
│       ├───ftplugin
│       ├───indent
│       └───syntax
├───docs
├───html
├───logs
└───temp
    ├───client_body_temp
    ├───fastcgi_temp
    ├───proxy_temp
    ├───scgi_temp
    └───uwsgi_temp
```

如上是 nginx 的文件结构，在 conf 中有主配置文件 nginx.conf 。我们可以使用 `include servers/*.conf;` 来把希望 nginx 代理的服务写在 servers/*.conf 文件中。

新建文件夹 servers ，其中新建 test.conf ：

```
server {
  listen       80;  # 因为网络请求默认是80端口，也就是说请求一个域名不带端口，默认访问的就是80
  server_name  test.com;

  location / {
    proxy_pass http://127.0.0.1:8888;
  }
}
```

如上，我们启动 node 服务 8888 ，就可以通过 test.com 访问。（此外还需要配置 host ，否在 test.com 走外网）

Host：
```
127.0.0.1 test.com
```

### 中间代理可以修改内容（http是明文传输）
使用 Nginx 的变量，修改 host 。

```
location / {
  proxy_pass http://127.0.0.1:8888;
  proxy_set_header Host $host;
}
```

node 中：
```js
console.log('request come', request.headers.host);
```

node 的控制台变为了：
```
# 设置 proxy_set_header Host $host; 前
request come 127.0.0.1:8888
# 设置 proxy_set_header Host $host; 后
request come test.com
```

可见，拿到浏览器发请求带过来的 host 。Nginx 为我们修改了头。

### Nginx代理配置和代理缓存的用处
在 test.conf 中：
```
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;
```

如上：
- 设置了缓存的相对路径 cache
- 设置了项目可以有2级目录 levels=1:2
- 设置了缓存在内存中最大占有10MB

#### 实验测试缓存
[../codes/nginx-cache/server](../codes/nginx-cache/server)


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div>This is content, and data is: <span id="data"></span></div>
  <button id="button">click me</button>
</body>
<script>
  var index = 0
  function doRequest () {
    var data = document.getElementById('data')
    data.innerText = ''
    fetch('/data', {
      headers: {
        'X-Test-Cache': index++
      }
    }).then(function (resp) {
      return resp.text()
    }).then(function (text) {
      data.innerText = text
    })
  }
  document.getElementById('button').addEventListener('click', doRequest)
</script>
</html>
```

```js
const http = require('http')
const fs = require('fs')

const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}
http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if (request.url === '/data') {
    response.writeHead(200, {
      'Cache-Control': 'max-age=2, s-maxage=20, private',
      'Vary': 'X-Test-Cache'
    })
    wait(2).then(() => response.end('success'))
  }
}).listen(8888)

console.log('server listening on 8888')
```

如上，为了模拟真实的数据传输，我们设置 `/data` 有2秒的延迟。

如果没有缓存（`'Cache-Control': 'max-age=2'`），则每次都要等待 2 秒接收数据。这是在用浏览器的缓存。

我们在启用别的浏览器。发现 data 不会等待 2 秒。

每一个新的请求都会经过代理。我们在代理服务器已经缓存过了，只要其他用户都会使用这个缓存。
- `s-maxage`是代理缓存专用内容。
- `private`是只有浏览器能缓存

我们的 Vary 参数是：
- 比如我们这里设置是 `X-Test-Cache`
- 表示，只有头信息 `X-Test-Cache` 的值与以前的相同，才会使用缓存
- 实践中，我们会用比如 UserAgent 做这个值
