const arr = ['aaa', 'bbb', 'ccc']
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time));
}

function getResult(num) {
  return sleep(1000).then(v => arr[num])
}

// function test() {
//   getResult(0).then(re => console.log('====output====>>>>', re))
// }
// test();

async function test1() {
  console.log('====output====>>>>', 'start');
  arr.forEach(async (item, index) => {
    console.log('====output====>>>>', await getResult(index));
  });
  console.log('====output====>>>>', await getResult(2));
  console.log('====output====>>>>', 'end');
}
test1();



function tt() {
  const arr = [1, 2, 3, 4]
  const sum = arr.reduce((pre, cur, index, arr) => {
    return pre + cur
  }, 10)
  console.log('====output====>>>>', sum);
}
tt();

function ty(object) {
  const a = Object.prototype.toString.call(object);
  console.log('====output====>>>>', a);
  return a.slice(8, -1)
}

console.log('====output====>>>>', ty('s'));


function map1(fn, context) {
  const arr = Array.prototype.slice.call(this)
  return arr.reduce((pre, cur, index) => {
    return [...pre, fn.call(context, cur, index, this)]
  }, [])
}
Array.prototype.map1 = map1
console.log('====output====>>>>', [1, 2, 3, 4, 5].map1((item) => item));

function map2(fn, context) {
  const arr = Array.prototype.slice.call(this)
  const result = []
  for (let i = 0; i < arr.length; i++) {
    result.push(fn.call(context, arr[i], i, this))
  }
  return result;
}
Array.prototype.map2 = map2
console.log('====output====>>>>', [1, 2, 3, 4, 5].map2((item) => item));

function flat1(depth = 1) {
  const arr = Array.prototype.slice.call(this)
  if (depth === 0) return arr;
  return arr.reduce((pre, cur, index) => {
    if (Array.isArray(cur)) {
      return [...pre, ...flat1.call(cur, depth - 1)]
    } else {
      return [...pre, cur]
    }
  }, [])
}
Array.prototype.flat1 = flat1
console.log('====output====>>>>', [1, 2, 3, 4, [33, 44]].flat1(1));

console.log('====output====>>>>', typeof 'sdsd');

function curry1(fn, ...args) {
  return function curry(...innerArgs) {
    const finalArgs = [...args, ...innerArgs]
    if (fn.length === finalArgs.length) {
      return fn.apply(this, finalArgs)
    } else {
      return curry1(fn, ...finalArgs)
    }
  }
}

function add(a, b, c, d) {
  return a + b + c + d;
}
const a = curry1(add, 1, 2)
console.log('====output====>>>>', a(3)(4));


function fabonacci(n) {
  if (n === 1) return 1;
  if (n === 2) return 1;
  return fabonacci(n - 1) + fabonacci(n - 2);
}
console.log('====output====>>>>', fabonacci(3));

function fabonacci2(n) {
  const obj = {}

  function fn(n) {
    if (n === 1 || n === 2) return 1;
    if (!obj[n - 1]) obj[n - 1] = fn(n - 1)
    if (!obj[n - 2]) obj[n - 2] = fn(n - 2)
    return obj[n - 1] + obj[n - 2];
  }
  return fn(n);
}
console.log('====output====>>>>', fabonacci2(3));




function call1(context, ...args) {
  if (!context) {
    context = window;
  }
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result;
}
Object.prototype.call1 = call1

function add(a, b, c) {
  return a + b + c
}

console.log('====output====>>>>', add.call1(this, 1, 2, 3));

function apply1(context, args) {
  if (!context) {
    context = window
  }
  const sy = Symbol('fn')
  context[sy] = this
  let result
  if (Array.isArray(args)) {
    result = context[sy](...args)
  } else {
    result = context[sy](args)
  }
  delete context[sy]
  return result
}
Object.prototype.apply1 = apply1

function add(a, b, c) {
  return a + b + c
}

console.log('====output====>>>>', add.apply1(this, [1, 2, 3]));


function bind1(context, ...args) {
  if (typeof this !== 'function') throw new TypeError('error')
  context.fn = this
  return function (...innerArgs) {
    const finalArgs = [...args, ...innerArgs]
    if (context.fn.length === finalArgs.length) {
      return context.fn(...finalArgs)
    } else {
      return bind1(context, ...finalArgs)
    }
  }
}
Object.prototype.bind1 = bind1

function add(a, b, c) {
  return a + b + c
}
const a = add.bind1(this)
console.log('====output====>>>>', a(2));
