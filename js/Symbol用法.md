# 常规用法：
1. let s = Symbol('sss')
**变量s就是一个独一无二的值**
2. typeof s === 'symbol'

- let s = Symbol(obj) // 会调用obj.toString()
- 不能与其他类型的值进行运算，会报错。例如："your symbol is " + s， `your symbol is ${s}`
- s.toString() // Symbol(sss)
- s.description // sss
- 用做属性名： let a = { [s]: function(){} }
- Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。


3. let s1 = Symbol.for('sss');  //搜索有没有以该参数作为名称的 Symbol 值，有则返回，没有，则新建
4. Symbol.keyFor('sss') // Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key，没有，则返回undefined


# 内置的Symbol值
1. Symbol.hasInstance
> 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
```
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true
```

2. Symbol.iterator
对象的Symbol.iterator属性，指向该对象的默认遍历器方法  
```
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```
对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器  
```
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
}
// 1
// 2
```

3. Symbol.toPrimitive
对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。  
Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。  

  - Number：该场合需要转成数值
  - String：该场合需要转成字符串
  - Default：该场合可以转成数值，也可以转成字符串
```
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

4,5,6.....
