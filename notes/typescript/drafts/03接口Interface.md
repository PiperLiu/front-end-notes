# 接口Interface

两点理解：
- 对对象的形状（shape）进行描述
- 被称为 Duck Typing （鸭子类型）
  - 只要会游泳、会嘎嘎叫，就被称为鸭子
  - 不关心其本身是什么，而关心其如何被使用

```ts
interface Person {
  // readonly 只读
  readonly id: number;
  name: string;
  age?: number;  // age 可以不声明
}

let viking: Person = {
  id: 1,
  name: 'viking',
  age: 20,
}

let dell: Person = {
  id: 1,
  name: 'viking',
}
```

