# HTTP各种特性总览

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [HTTP各种特性总览](#http各种特性总览)
    - [使用浏览器查看 http 请求（从HTTP客户端角度）](#使用浏览器查看-http-请求从http客户端角度)

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
