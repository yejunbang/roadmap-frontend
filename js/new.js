// new的原理是什么？通过new的方式创建对象和通过字面量创建有什么区别？

//new:
//1. 创建一个新对象。
//2. 这个新对象会被执行[[原型]]连接, 即继承自 Func.prototype。
//3. 属性和方法被加入到 this 引用的对象中。并执行了构造函数中的方法.
//4. 如果构造函数没有返回其他对象，那么this指向这个新对象，否则this指向构造函数中返回的对象。
// 代码:
function new1(fn) {
  let target = {}
  target.__proto__ = fn.prototype;
  let result = fn.call(target)
  if (result || typeof result === 'object' || typeof result === 'function') {
    return result;
  }
  return target
}


function Person(name) {
  this.name = name
}

let a = new Person();

//字面量创建对象，不会调用 Object构造函数, 简洁且性能更好
let b = Person()