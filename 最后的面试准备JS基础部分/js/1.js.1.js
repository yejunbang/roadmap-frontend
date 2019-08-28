1. 基本类型有哪几种？ null 是对象吗？ 基本数据类型和复杂数据类型存储有什么区别？
7 种, null, undefined, Boolean, String, Number, Object, Symbol
基本数据类型存储在栈内存， 存储的是值。
复杂数据类型的值存储在堆内存， 地址（ 指向堆中的值） 存储在栈内存。 当我们把对象赋值给另外一个变量的时候， 复制的是地址， 指向同一块内存空间， 当其中一个对象改变时， 另一个对象也会变化。


2. typeof 是否正确判断类型 ? instanceof呢？ instanceof 的实现原理是什么？
typeof 只能够基本数据类型， 除了null， typeof null === 'object', 因为从逻辑角度出发， null值表示一个空对象指针
typeof 一个函数可以输出 'function', 而除此之外， 输出的全是 object

instanceof 可以准确判断复杂类型， 但是不能判断基本类型
instanceof 是根据原型链判断的
实现原理：
function instance_of(A, B) {
  let bpro = B.prototype
  let apro = Object.getPrototypeOf(A)
  // let apro = A.__proto__
  while (true) {
    if (bpro === null) {
      return false;
    }
    if (apro === bpro) {
      return true;
    }
    apro = Object.getPrototypeOf(apro)
    // apro = apro.__proto__
  }
}
console.log('====output====>>>',instance_of([],Array));


instanceof会默认执行[Symbol.hasInstance]() {}方法
class Primitive {
  static[Symbol.hasInstance](data) {
    return typeof data === 'number'
  }
}
let a = 2
console.log('====output====>>>',a instanceof Primitive);

3. for of , for in 和 forEach,map 的区别
for of: 具有iterator接口就可以使用for of 遍历它的成员，默认的数组，字符串，set，map，部分类数组都实现了iterator接口。可以中断循环
for in: 遍历对象自身和继承的可枚举属性可以中断循环
forEach: 只能遍历数组，没有返回值，不能中断循环
map: 只能遍历数组，返回的修改后的数组，不能中断循环

for of和...扩展运算符 默认的会执行[Symbol.iterator](){}，必须得有next方法，且next返回值具有value，done
let a = {
  [Symbol.iterator](){
    var i = 1;
    return {
      next: function(){
        if(i===4){
          return {value:i,done:true}
        }
        return {value:i++,done:false}
      }
    }
  }
}
for(let b of a){
  console.log('====output====>>>',b);
}

let a = {
  [Symbol.iterator]: function* (){
    yield 1
    yield 2
    yield 3
  }
}
for(let b of a){
  console.log('====output====>>>',b);
}
