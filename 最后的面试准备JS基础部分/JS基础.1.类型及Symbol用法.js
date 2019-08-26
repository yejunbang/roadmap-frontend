1. 数据类型：
答： 7 种： Null, undefined, Boolean, Number, String, Object, Symbol

引用类型包括： 对象Object， 数据Array， 函数function等

boolean、 string和number可以直接调用引用类型的方法， 因为js引擎在解析时，
会把这三种类型解析为包装对象， 包装对象时引用类型， 可以使用Object.prototye上的方法

'asdf'.toString() - > new String('asdf').toString() - > 'asdf'

1.1 变量声明：
var, let, const区别：
(1) var 定义的变量会提升，let, const不会
(2) let, const定义的变量具有块级作用域
(3) let, const不允许重复声明变量
(4) let, const在声明变量前不能使用，即存在暂时性死区
(5) const声明的变量不能改变，即常量

2. Symbol: 独一无二
const a = Symbol('abc')
// 遍历：
const obj = {
  [a]: 'value'
}
const objectSymbols = Object.getOwnPropertySymbols(obj);
objectSymbols.forEach(key => {
  console.log('====output====>>>', obj[key]);
})

const b = Symbol.for('abc') // search，有则返回，没有，则创建一个新的

//Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

Symbol的很多内置对象很有用：
  (1) Symbol.hasInstance
当其他对象使用instanceof运算符， 判断是否为该对象的实例时， 会调用这个方法。
const obj = {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array
  }
}
console.log('====output====>>>', [1, 2, 3] instanceof obj);
(2) Symbol.match
当执行str.match(myObject) 时， 如果该属性存在， 会调用它， 返回该方法的返回值
const obj = {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}
console.log('====output====>>>', 'e'.match(obj));
(3) Symbol.replace
当该对象被String.prototype.replace方法调用时， 会返回该方法的返回值。
const obj = {
  [Symbol.replace]: (str, newStr) => {
    console.log('====output====>>>', str)
    console.log('====output====>>>', newStr);
    return 'ttttt'
  }
};
console.log('====output====>>>', 'Hello'.replace(obj, 'World'));
(4) Symbol.iterator
对象进行for...of循环和扩展运算符(...) 时， 会调用Symbol.iterator方法， 返回该对象的默认遍历器
Symbol.iterator需要返回一个对象， 对象包含next函数, next函数需要返回 { value: '', done: true }
正常情况下object没有实现iterator接口是不能for...of的。
const obj = {
  [Symbol.iterator]() {
    let i = 1
    return {
      next() {
        if (i===4){
          return {value:i,done:true}
        }else{
          return {value:i++,done:false}
        }
      }
    }
  }
}
// console.log('====output====>>>',...obj);
// for(let value of obj){
//   console.log('====output====>>>',value);
// }
const obj = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  [Symbol.iterator]() {
    let self = this;
    let i=0
    return {
      next() {
        const keys = Object.keys(self);
        if(i===keys.length){
          return {value: self[keys[i++]],done:true}
        }else{
          return {value: self[keys[i++]],done:false}
        }
      }
    }
  }
}
for(let value of obj){
  console.log('====output====>>>',value);
}

// 用generator改写
const obj = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  *[Symbol.iterator]() {
    let self = this;
    let i=0
    const keys = Object.keys(self);
    for(;i<keys.length;){
        yield self[keys[i++]]
    }
  }
}
for(let value of obj){
  console.log('====output====>>>',value);
}

(5) Symbol.toPrimitive
该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

const obj = {
  i: 1,
  [Symbol.toPrimitive](){
    let self = this
    return self.i++
  }
}
console.log('====output====>>>',obj==1&&obj==2&&obj==3);  //true
const obj = {
  i: 1,
  valueOf(){
    let self = this
    return self.i++
  }
}
console.log('====output====>>>',obj==1&&obj==2&&obj==3);  //true
