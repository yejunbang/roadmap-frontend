Function.prototype.myBind = function (content) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  if (!content) {
    content = typeof window === 'undefined' ? global : window
  }
  content.fn = this
  const outArgs = [...arguments].slice(1)
  return function Fn() {
    let result
    const args = [...outArgs, ...arguments]
    if (this instanceof Fn) {
      result = new content.fn(...args)
    } else {
      result = content.fn(...args)
    }
    delete content.fn
    return result
  }
}

var obj = {
  a: 'obj.a'
}

function foo(x, y, z) {
  this.a = x;
  this.b = y;
  this.c = z;
}
// 原生bind 可以：
// 1. 直接fn.bind(null,1)(2,3)  
// 2. let newFn = new fn.bind(null,1); 
//    let newObj = new newFn(2,3)
var bindFoo = foo.myBind(obj, 1);
// console.log('====output====>>>',bindFoo(2,3));
console.log('====output====>>>', new bindFoo(2, 3));