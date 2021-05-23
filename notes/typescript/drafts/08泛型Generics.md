# 泛型Generics

<!-- @import "[TOC]" {cmd="toc" depthFrom=3 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [泛型基础示例](#泛型基础示例)
- [约束关系](#约束关系)
  - [用接口继承](#用接口继承)
- [创建泛型类](#创建泛型类)
- [接口也可以接受泛型](#接口也可以接受泛型)

<!-- /code_chunk_output -->

### 泛型基础示例
```ts
// 用 T 统一了输入和输出类型
function echo<T> (arg: T): T {
  return arg
}
console.log(echo(true))
console.log(echo('str'))

function swap<T, U> (tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result = swap(['str', 123])
```

### 约束关系
```ts
function echoWithArr<T> (arg: T[]): T[] {
  console.log(arg.length)  // 并不是所有 T 都有 length
  // 但是我们这里规定了 T[] ，因此 arg 都会有 length
  return arg
}

const arrs = echoWithArr([1, 2, 3])
```

#### 用接口继承
```ts
interface IWithLength {
  length: number  // 必须有 length 这个属性，且类型为 number
}

// T 继承接口 IWithLength
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}

const str = echoWithLength('str')
const obj = echoWithLength({ length: 10, width: 10})
const arr2 = echoWithLength([1, 2, 3])
const number1 = echoWithLength(0)  // 会报错，数字没有 length
```

### 创建泛型类
```ts
class Queue<T> {
  private data = [];
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}
const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())
```

### 接口也可以接受泛型
```ts
interface KeyPair<T, U> {
  key: T
  value: U
}
let kp1: KeyPair<number, string> = { key: 1, value: "string"}
let kp2: KeyPair<string, number> = { key: 'str', value: 2 }
let arr: number[] = [1,2,3]
let arrTwo: Array<number> = [1,2,3]
```

创建了一个“约束类型”的容器。
