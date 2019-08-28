1. new的原理是什么？ 通过new的方式创建对象和通过字面量创建有什么区别？
new:

创建一个新对象。
这个新对象会被执行[[原型]] 连接。
属性和方法被加入到 this 引用的对象中。 并执行了构造函数中的方法.
如果函数没有返回其他对象， 那么this指向这个新对象， 否则this指向构造函数中返回的对象

手写：

function new1(func) {
  let target = {}
  target.__proto__ = func.prototype
  let result = func.call(target)
  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result
  }
  return target
}