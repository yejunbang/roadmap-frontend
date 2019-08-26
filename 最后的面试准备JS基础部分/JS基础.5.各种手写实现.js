1. call、apply有什么区别？call,aplly和bind的内部是如何实现的？
call 和 apply 的功能相同，区别在于传参的方式不一样。
call传(this，一个个的参数)
apply(this，参数数组)

手写实现：
call: 
Function.prototype.myCall = function(context,...args){
  context = context?context: (typeof window==='undefined'?global:window)
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

const obj = {
  name: 'pogba'
}
function say(age){
  console.log('====output====>>>',this.name);
  console.log('====output====>>>',age);
}
say.myCall(obj,12)


apply:
Function.prototype.myApply = function(context,args){
  if(!context){
    context = typeof window ==='undefined' ? global: window
  }
  const fn = Symbol('fn')
  context[fn] = this
  let result
  if(Array.isArray(args)){
    result = context[fn](...args)
  }else{
    result = context[fn]()
  }
  return result
}
const obj = {
  name: 'pogba'
}
function say(age){
  console.log('====output====>>>',this.name);
  console.log('====output====>>>',age);
}
say.myApply(obj,[12])


bind:
Function.prototype.myBind = function(context,...outArgs){
  if(!context){
    context = typeof window ==='undefined'?global:window
  }
  const fn = Symbol('fn')
  context[fn] = this
  return function Fn(...innerArgs){
    const finalArgs = [...outArgs,...innerArgs]
    if(finalArgs.length<context[fn].length){
      return Fn.apply(null,finalArgs)
    }else{
      return context[fn](...finalArgs)
    }
  }
}
const obj = {
  name: 'pogba'
}
function say(age){
  console.log('====output====>>>',this.name);
  console.log('====output====>>>',age);
}
const a = say.myBind(obj)
a(12)

Function.prototype.bind = function(context) {
  if(typeof this !== "function"){
     throw new TypeError("not a function");
  }
  let self = this;
  let args = [...arguments].slice(1);
  function Fn() {};
  Fn.prototype = this.prototype;
  let bound = function() {
      let res = [...args, ...arguments]; //bind传递的参数和函数调用时传递的参数拼接
      context = this instanceof Fn ? this : context || this;
      return self.apply(context, res);
  }
  //原型链
  bound.prototype = new Fn();
  return bound;
}




new:
(1) 首先创建一个对象
(2) 在执行原型链接
(3) 绑定this
(4) 最后判断有没返回值
const a = new Fn() --> const a = myNew(Fn)
function myNew(Fn,...args){
  const target = {}
  target.__proto__ = Fn.prototype
  const result = Fn.apply(target,args) 
  if(result || typeof result ==='object'||typeof result ==='function'){
    return result
  }
  return target
}

instanceof:
function myInstanceof(left,right){
  let pro = Object.getPrototypeOf(left)
  while(true){
    if(pro===null){
      return false
    }
    if(pro===right.prototype){
      return true
    }
    pro = Object.getPrototypeOf(pro)
  }
}
function Fn(){}
const fn = new Fn()
console.log('====output====>>>',myInstanceof(fn,Fn));

函数柯里化：
function curry(fn, ...outerArgs){
  return function(...innerArgs){
    const finalArgs = [...outerArgs,...innerArgs]
    if(finalArgs.length<fn.length){
      return curry.call(this,fn,...finalArgs)
    }else{
      return fn.apply(this,finalArgs)
    }
  }
}
function sum(a,b,c){
  return a+b+c
}
const add = curry(sum,1)
console.log('====output====>>>',add(2)(3));



