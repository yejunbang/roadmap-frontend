function curry2(context, ...args) {
  if (typeof context !== 'function') {
    throw new TypeError('this not a function')
  }
  return function (...innerArgs) {
    let allArgs = args.concat(innerArgs);
    if (allArgs.length < context.length) {
      return curry2.call(this, context, ...allArgs)
    } else {
      return context.apply(this, allArgs);
    }
  }
}

function Add(a, b, c, d, e) {
  return a + b + c + d + e;
}
let a1 = curry2(Add, 1, 2);
console.log('====output====>>>>', a1(3, 4, 5));



let str1, ss, ss2 'sdsd=4d7d619e6; account_uid=1361177947320160506170322436; sad=sdfsdf'.replace(/account_uid=([^\=]+(\;))/ig, function ($1, $2, $3) {
  str1 = $1;
  ss = $2;
  ss2 = $3
})
console.log('====output====>>>>', str1);
console.log('====output====>>>>', ss);
console.log('====output====>>>>', ss2);

var str = 'asdf html-webpack-plugin for "index/index.html" asdfasdf';
console.log('====output====>>>>', str.match(/html-webpack-plugin for \"(.*)\"/ig));
console.log(RegExp.$1)


const api = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}


const obj = {
  [Symbol.hasInstance](foo) {
    return Number(foo) === 2
  }
}
console.log('====output====>>>>', 3 instanceof obj);

const foo = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    return 3;
  }
}
for (let a of foo) {
  console.log('====output====>>>>', a);
}

const foo2 = {
  i: 1,
  [Symbol.toPrimitive](num) {
    return foo2.i++;
  }
}
console.log('====output====>>>>', foo2 == 1 && foo2 == 2 && foo2 == 3);

const foo2 = {
  i: 1,
  valueOf() {
    return foo2.i++;
  }
}
console.log('====output====>>>>', foo2 == 1 && foo2 == 2 && foo2 == 3);

const foo3 = {
  i: 1,
  j: 2,
  k: 3
}
const foo4 = {
  j: 10,
  p: 99,
  e: 100
}

function assign1(target, ...args) {
  if (!target) throw new TypeError('target not an object')
  if (args.length === 0) return target;
  return args.reduce((pre, cur) => {
    if (!cur) throw new TypeError('args have some not an object')
    const keys = [...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)]
    for (let key of keys) {
      pre[key] = cur[key]
    }
    return pre;
  }, target)
}
console.log('====output====>>>>', assign1(foo3, foo4));

function instanceof1(arg1, arg2) {
  let proto = Object.getPrototypeOf(arg1);
  while (proto !== null) {
    if (!proto) return false;
    if (proto === arg2.prototype) return true;
    proto = Object.getPrototypeOf(proto)
  }
  return false;
}
const a = {}
console.log('====output====>>>>', instanceof1(a, {}));

const [a,...b] = [1,2,3,4,5,6]
console.log('====output====>>>>', a);
console.log('====output====>>>>', b);
