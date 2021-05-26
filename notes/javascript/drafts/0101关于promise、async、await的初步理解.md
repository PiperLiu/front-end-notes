# 关于promise、async、await的初步理解

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Promise](#promise)
- [async和await](#async和await)

<!-- /code_chunk_output -->


### Promise
```js
const imgAddress = 'https://test.com/assets/a.png

const imgPromise = ( url ) => {
  return new Promise ( ( resolve, reject ) => {
    const img = new Image();
    img.src() = url;
    img.onload = () => {
      resolve ( img );  // then(func) 中 func 的参数是 img
    };
    img.onerror = () => {
      reject( new Error('图片地址有误') );
      // catch(func) 中 func 的参数是 new Error('图片地址有误')
    };
  });
};
// 因为 Promise 定义后会理解执行
// 所以一般让函数返回一个 new Promise() ，来先不执行 Promise

imgPromise( imgAddress )
  .then( img => {
    document.body.appendChild( img );
  })
  .catch( err => {
    document.body.innetHTML = err;
  })
```

- 很好的视频：[JavaScript 你理解Promise吗 - Web前端工程师面试题讲解](https://www.bilibili.com/video/BV1QV411a7Hu)

结合视频，谈谈理解：
- 给出一个承诺：`new Promise()`
  - 承诺解决（resolve）了，则把成功相关的事告诉 `resolve(info)` ，因为成功了，所以将进行下一步（then），下一步干什么要依据（`resolve(info)`）的info
  - 承诺拒绝（reject）了，则把失败相关的事告诉 `reject(error)`，因为失败了，所以将捕获错误（catch），捕获到的东西（`reject(error)`）是error
  - 不管怎样，都会有 `finally`

### async和await
```js
async function test1() {
  return 1;
}
test1();  // Promise {<fulfilled>: 1}

async function test2() {
  return Promise.resolve(1);
}
test2();  // Promise {<fulfilled>: 2} 与 return 1; 等价

async function test3() {
  const p3 = Promise.resolve(3);
  p3.then(data3 => {
    console.log(data3);  // 3
  })
  const p3_ = Promise.resolve(3);
  const data3 = await p3_;
  console.log(data3);  // 3
}
test3();

async function test4() {
  const p4 = Promise.reject(4);
  try {
    const data4 = await p4;  // 无
    console.log(data4);
  } catch (e) {
    console.error(e);  // 报错，并且输出 4
  }
}
test4();
```

- `async` 将返回对象包裹上 `Promise()`
- `x = await p` 与 `p.then(x => {})` 等价，且 `x = await x` 可以取出 `x` 处理，更加解耦清晰
- `catch(e)` 可以铺货到 `await p` 中 `reject(e)` 的 `e`
