// 函数柯里化：就是把接受多个参数的函数变换成接受一个单一参数的函数，并返回接受余下参数的技术

// sum(1)(2)(3), sum(1)(2, 3)

// 望远镜上的实现：
function curry(fn) {
  let args = Array.prototype.slice.call(arguments, 1);
  return function () {
    let innerArgs = Array.prototype.slice.call(arguments);
    let finalArgs = args.concat(innerArgs);
    return fn.apply(this, finalArgs);
  }
}

function sum(a, b, c) {
  return a + b + c;
}
let a = curry(sum, 1);
// console.log('====output====>>>', a(2, 3));
console.log('====output====>>>', a(2)(3)); // 这样是不行的，望远镜上只能实现一个动态参数，且访问arguments，性能损耗大


// 改良版：
function curry1(fn, ...args) {
  return function () {
    let rest = args.concat([...arguments]);
    if (rest.length < fn.length) {
      return curry1.call(this, fn, ...rest);
    } else {
      return fn.apply(this, rest);
    }
  }
}

function sum(a, b, c, d) {
  return a + b + c + d;
}
let a = curry1(sum, 1);
console.log('====output====>>>', a(2, 3)(4));
console.log('====output====>>>', a(2)(3, 4));
console.log('====output====>>>', a(2)(3)(4));