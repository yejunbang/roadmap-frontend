// 1. new的实现原理是什么？
// 1. 创建一个空对象
// 2. 目标对象[[原型]]连接到新对象上
// 3. 执行构造函数方法，把目标对象的this绑定的值apply到新对象上
// 4. 执行构造函数后如果有返回值则new后返回这个值，否返回新创建的对象
function new1(obj, ...args) {
  const target = {}
  target.__proto__ = Object.getPrototypeOf(obj)
  const result = obj.apply(target, args)
  if (result) {
    return result
  }
  return target
}
// 2. 如何正确判断this的指向？
// 谁调用， this就指向谁
// 1. 显示绑定： obj.apply(this), call, bind
// 2. 隐式绑定: dog.eat()
// 3. 默认绑定: say()
// 4. new绑定: const a = new A() 绑定到new上

// 3. 深拷贝和浅拷贝的区别是什么？实现一个深拷贝
// 比如要拷贝一个对象，如果对象里面的有某个字段值是object，引用其他的对象，
// 当浅拷贝时，只是拷贝的这个对象的引用，其他方法修改这个引用对象后，会反应到这个拷贝对象上
// 深拷贝则相反，会新生成一个对象只向它，不受影响。
function deepClone(target, weakMap = new WeakMap()) {
  if (!target) return;
  let result;
  if (getType(target) === 'Object') {
    result = {}
  } else if (getType(target) === 'Array') {
    result = []
  } else {
    return target
  }
  if (weakMap.has(target)) {
    return weakMap.get(target)
  }
  weakMap.set(target, result)
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      if (getType(target[key]) === 'Object' || getType(target) === 'Array') {
        result[key] = deepClone(target[key], weakMap)
      } else {
        result[key] = target[key]
      }
    }
  }
  return result
}

function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

const a = { a: 1, B: 2, c: { d: 4 } }
a.k = a
const b = deepClone(a)
a.c.e = 5
console.log('====output====>>>', a);
console.log('====output====>>>', b);
console.log('====output====>>>', b.k.a);
// 会出现循环引用的问题： a.k = a， 解决： 1. 用es6的WeakMap，Map和WeakMap区别：WeakMap的键只能是对象


// 4. call/apply 的实现原理是什么？
// 隐式绑定
function call1(context, ...args) {
  if (typeof this !== 'function') throw new TypeError('not a functino');
  if (!context) {
    context = window
  }
  const key = Symbol('key')
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

function A(name) {
  this.name = name
}

function say() {
  console.log('====output====>>>', this.name);
}
Object.prototype.call1 = call1
const a = new A('pogba')
say.call1(a)

// 5. 柯里化函数实现

function curry1(context, ...args) {
  if (typeof context !== 'function') throw new TypeError();
  return function (...innerArgs) {
    const finalArgs = [...args, ...innerArgs]
    if (finalArgs.length === context.length) {
      return context(...finalArgs)
    } else {
      return curry1(context, ...finalArgs)
    }
  }
}

function add(a, b, c) {
  return a + b + c
}
const a = curry1(add, 1)
console.log('====output====>>>', a(2)(3));

// 6. 如何让 (a == 1 && a == 2 && a == 3) 的值为true？
// 1. 重写valueOf方法
// 2. 重写Symbol.toPrimitive
const a = {
  i: 1,
  valueOf: function () {
    return a.i++
  }
}
console.log('====output====>>>', a == 1 && a == 2 && a == 3);
const a = {
  [Symbol.toPrimitive]: (function () {
    let i = 1;
    return function () { return i++ };
  })()
}
console.log('====output====>>>', a == 1 && a == 2 && a == 3);

// 7. 什么是BFC？BFC的布局规则是什么？如何创建BFC？
// BFC：块级格式化上下文，是一块独立的渲染区域，自己觉得自己子元素的定位及其他元素的相互作用
// 规则：
// 1. 在BFC内， 盒子依次垂直排列
// 2. 在BFC内， 两个盒子的垂直距离由margin决定， 属于同一个BFC的两个相邻box margin会发生重叠
// 3. 在BFC内， 每个盒子的左外边缘接触内部盒子的左边缘， 即使存在浮动的情况下也是如此， 除非创建一个新的BFC
// 4. BFC的区域不会与float box重叠
// 5. BFC就是页面上一个独立容器， 容器内的子元素不会影响外面元素， 反之亦然
// 6. 计算BFC高度时， 浮动元素也参与计算 (清除浮动)
// 如何创建BFC：
// 1. float 属性不为none
// 2. position为absolute或者fixed
// 3. overflow不为visible的块元素
// 4. display为inline-block, table-cell, table-caption
// BFC作用：
// 1. 防止margin重叠
// 2. 清除浮动
// 3. 自适应多栏布局

// 8. 异步加载JS脚本的方式有哪些？
// <script defer/>
// 1. defer : 执行到代码时会下载，等待渲染完成时，再执行 (h4) (再DOM结构完成，及其他脚本执行完成后执行) 会按顺序加载
// 2. async : 执行到代码时会下载，下载一完成就暂定渲染，执行脚本 (h5) 不能保证顺序
// 3. 动态创建script标签
//  let script = document.createElement('script')
//  script.src = 'xxx.js'
//  document.body.append(script)
// 4. XHR异步加载JS
// let xhr = new XMLHttpRequest();
// xhr.open('get', 'js/xxx.js', true)
// xhr.send();
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     console.log('====output====>>>', xhr.responseText);
//   }
// }

// 9. ES5有几种方式可以实现继承？分别有哪些优缺点？


// 10. 隐藏页面中的某个元素的方法有哪些？
// 11. let、const、var 的区别有哪些？
// 12. 说一说你对JS执行上下文栈和作用域链的理解？
// 13. 防抖函数的作用是什么？请实现一个防抖函数
// 14. 节流函数的作用是什么？有哪些应用场景，请实现一个节流函数
// 15. 什么是闭包？闭包的作用是什么？
// 16. 实现 Promise.all 方法
// 17. 请实现一个 flattenDeep 函数，把嵌套的数组扁平化
// 18. 请实现一个 uniq 函数，实现数组去重
// 19. 可迭代对象有哪些特点
// 20. JSONP 的原理是什么？