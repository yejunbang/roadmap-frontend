1. object是引用类型，引用类型和基本类型不同的是，原始类型存储的是值，
引用类型存储的是一个指向对象真实内存地址的指针。在 js 中，对象包括Array Object Function RegExp Math等。

JS 所有的函数语句都是在执行栈中执行的，所有的变量也在执行栈中保存着值或引用。
基本类型就存储在栈内存中，保存的是实际值；引用类型存储在堆内存中，在栈中只保存着变量指向内存地址的指针。


2. 类型判断:
(1) 基本类型使用typeof
console.log('====output====>>>',typeof 1); // 'number'
typeof null // 'object', 内存存储信息是000开头的，而000开头的会被判断为object类型

缺点：typeof对引用类型，除了函数返回function，其他都返回object
var fun = () => {}
typeof fun // 'function'

(2)引用类型使用instanceof：
var obj = {}
var arr = []
var fun = () => {}
typeof obj // 'object'
typeof arr // 'object'
typeof fun // 'function'
obj instanceof Object // true
arr instanceof Array // true
fun instanceof Function // true
instanceof本质上是判断右边的构造函数的prototype对象是否存在于左边的原型链上，
是的话返回true。所以不论数组、对象还是函数，... instanceof Object都返回true。

(3) 终极判断：
Object.prototype.toString.call(...)
console.log('====output====>>>',Object.prototype.toString.call(1)); // [object Number]
console.log('====output====>>>',Object.prototype.toString.call({})); // [object Object]


例子：
[] == [] // false
[] == ![] // true

首先!运算符等级高, ![]为false，因为引用类型转Boolean始终为true，取反则为false
存在boolean值，需要转为数字0
console.log('====output====>>>',Number(''));
[]==0 // 调用valueOf(): '', Number('')=>0
0==0





























