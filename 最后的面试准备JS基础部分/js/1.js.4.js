1. call、 apply有什么区别？ call, aplly和bind的内部是如何实现的？ 并手写
区别在于传参不一样， 他们传的第一参数是指定的this值， call的第二个及以后的参数是参数列表， apply是数组
不传入参数或者参数为null， 默认指向为 window / global

手写实现： call
Function.prototype.my_call = function (context, ...args) {
  if (!context) {
    context = typeof window === 'undefined' ? global : window
  }
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
let a = {
  name: 'pogba'
}

function test() {
  console.log('====output====>>>', this.name);
}
test.my_call(a)

手写实现: apply
Function.prototype.my_apply = function (context, args) {
  if (!context) {
    context = typeof window === 'undefined' ? global : window
  }
  const fn = Symbol('fn')
  context[fn] = this
  let result
  if (Array.isArray(args)) {
    result = context[fn](...args)
  } else {
    result = context[fn]()
  }
  delete context[fn]
  return result
}
const a = {
  name: 'pogba'
}

function say() {
  console.log('====output====>>>', this.name);
}
say.my_apply(a)

手写实现： bind
Function.prototype.my_bind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  let self = this
  let result = function (...innerArgs) {
    const finalArgs = args.concat(innerArgs)
    return self.apply(context, finalArgs)
  }
  return result
}

let c = {c:3}
function add(a, b) {
  return a + b + this.c
}
// let result = add.bind(c)
let result = add.my_bind(c)
console.log('====output====>>>',result(1,2));