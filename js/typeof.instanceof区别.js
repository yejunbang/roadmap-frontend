// js有7中数据类型：null, undefined, Boolean, Number, String, Object, Symbol
// typeof只能判断基本数据类型: undefined, Boolean, Number, String, symbol
typeof null === 'object'
// typeof 一个函数输出 'function'， 其他都为 'object'

// instanceof 可以判断复杂类型，原理是通过原型链判断：
// 手写实现：
// L instanceof R
function instanceof1(L, R) {
  let O = R.prototype;
  L = L.__proto__
  while (true) {
    if (L === null) {
      return false;
    }
    if (O === L) {
      return true;
    }
    L = L.__proto__
  }
}

// 扩展：
// 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法
// 比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。

class judge {
  static[Symbol.hasInstance](data) {
    return typeof data === 'number';
  }
}

console.log('====output====>>>',1 instanceof judge); 